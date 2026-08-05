import {
  BLOCKS_PER_HALVING,
  blockReward,
  circulatingSupply,
  hForBlock,
  powerLawBandPosition,
  powerLawMedianPrice,
  powerLawZone,
} from "../../src/lib/bitcoinWaveCalculator.ts"
import type {
  BitcoinChainSnapshot,
  BitcoinFeesSnapshot,
  BitcoinMiningSnapshot,
  BitcoinPriceSnapshot,
  BitcoinSentimentSnapshot,
  BitcoinSnapshot,
  BitcoinTrendSnapshot,
  SnapshotGroup,
  SnapshotStatus,
} from "../../src/lib/bitcoinSnapshot.ts"

const SATOSHIS_PER_BITCOIN = 100_000_000
const BITCOIN_SUPPLY_CAP = 21_000_000
const EXPECTED_BLOCKS_PER_DAY = 144
const EXPECTED_BLOCK_INTERVAL_MS = 10 * 60 * 1_000
const VBYTES_PER_BLOCK = 1_000_000
const HASHES_PER_EXAHASH = 1e18
const SECONDS_PER_DAY = 86_400
const MINING_HISTORY_DAYS = 90
const SENTIMENT_OBSERVATION_FRESH_MS = 24 * 60 * 60_000
const SENTIMENT_OBSERVATION_MAXIMUM_AGE_MS = 48 * 60 * 60_000

export const MEMPOOL_SOURCES = {
  price: "https://mempool.space/api/v1/prices",
  blocks: "https://mempool.space/api/v1/blocks",
  recommendedFees: "https://mempool.space/api/v1/fees/recommended",
  mempool: "https://mempool.space/api/mempool",
  difficulty: "https://mempool.space/api/v1/difficulty-adjustment",
  miningHistory: "https://mempool.space/api/v1/mining/hashrate/6m",
} as const

export const ALTERNATIVE_ME_SOURCES = {
  api: "https://api.alternative.me/fng/?limit=1&format=json",
  attribution: "https://alternative.me/crypto/fear-and-greed-index/",
} as const

export const TREND_METHOD_SOURCE = "/dugorocni-trend/"

export const SNAPSHOT_CACHE_POLICY = {
  fast: { freshSeconds: 60, maximumAgeSeconds: 15 * 60 },
  difficulty: { freshSeconds: 10 * 60, maximumAgeSeconds: 24 * 60 * 60 },
  miningHistory: {
    freshSeconds: 60 * 60,
    maximumAgeSeconds: 24 * 60 * 60,
  },
  sentiment: {
    freshSeconds: 60 * 60,
    maximumAgeSeconds: 24 * 60 * 60,
  },
} as const

export type SnapshotResourceErrorCode =
  | "aborted"
  | "cache"
  | "http"
  | "invalid-data"
  | "invalid-json"
  | "network"
  | "response-too-large"
  | "timeout"

export type SerializedSnapshotResourceError = {
  code: SnapshotResourceErrorCode
  message: string
  source: string
  status: number | null
}

export class SnapshotResourceError extends Error {
  readonly code: SnapshotResourceErrorCode
  readonly source: string
  readonly status: number | null

  constructor(
    code: SnapshotResourceErrorCode,
    source: string,
    message: string,
    status: number | null = null
  ) {
    super(message)
    this.name = "SnapshotResourceError"
    this.code = code
    this.source = source
    this.status = status
  }

  toJSON(): SerializedSnapshotResourceError {
    return {
      code: this.code,
      message: this.message,
      source: this.source,
      status: this.status,
    }
  }
}

export type SnapshotFetch = (
  input: RequestInfo | URL,
  init?: RequestInit
) => Promise<Response>

export type SnapshotCache = {
  match(request: Request): Promise<Response | undefined>
  put(request: Request, response: Response): Promise<void>
}

export type CachedResourceResult<T> = {
  value: T | null
  asOf: string | null
  status: SnapshotStatus
  sources: string[]
  error: SerializedSnapshotResourceError | null
}

type CacheEnvelope = {
  fetchedAt: string
  payload: unknown
}

type DifficultyResource = {
  adjustmentPercent: number
  remainingBlocks: number
  estimatedRetargetAt: string
}

type MiningHistoryResource = {
  currentHashrateEh: number
  currentDifficulty: number
  history: BitcoinMiningSnapshot["history"]
}

type SentimentResource = BitcoinSentimentSnapshot & {
  observedAt: string
}

type LoadCachedResourceOptions<T> = {
  cache: SnapshotCache | null
  cacheKey: string
  fetchValue: () => Promise<unknown>
  freshSeconds: number
  maximumAgeSeconds: number
  normalize: (value: unknown) => T
  nowMs: number
  schedule?: (promise: Promise<void>) => void
  sources: string[]
}

type BitcoinSnapshotParts = {
  generatedAt: string
  price: CachedResourceResult<BitcoinPriceSnapshot>
  chain: CachedResourceResult<BitcoinChainSnapshot>
  fees: CachedResourceResult<BitcoinFeesSnapshot>
  difficulty: CachedResourceResult<DifficultyResource>
  miningHistory: CachedResourceResult<MiningHistoryResource>
  sentiment: CachedResourceResult<SentimentResource>
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

function invalidData(source: string, message: string): never {
  throw new SnapshotResourceError("invalid-data", source, message)
}

function requiredNumber(
  value: Record<string, unknown>,
  key: string,
  source: string,
  options: {
    allowNegative?: boolean
    integer?: boolean
    positive?: boolean
  } = {}
) {
  const candidate = value[key]
  if (
    typeof candidate !== "number" ||
    !Number.isFinite(candidate) ||
    (options.positive
      ? candidate <= 0
      : !options.allowNegative && candidate < 0) ||
    (options.integer && !Number.isInteger(candidate))
  ) {
    return invalidData(source, `Polje ${key} nije ispravan broj.`)
  }
  return candidate
}

function requiredArray(
  value: Record<string, unknown>,
  key: string,
  source: string
) {
  const candidate = value[key]
  if (!Array.isArray(candidate)) {
    return invalidData(source, `Polje ${key} nije ispravan niz.`)
  }
  return candidate
}

function requiredIntegerLike(
  value: Record<string, unknown>,
  key: string,
  source: string
) {
  const candidate = value[key]
  const parsed =
    typeof candidate === "string" && /^\d+$/.test(candidate)
      ? Number(candidate)
      : candidate

  if (
    typeof parsed !== "number" ||
    !Number.isFinite(parsed) ||
    !Number.isSafeInteger(parsed) ||
    parsed < 0
  ) {
    return invalidData(source, `Polje ${key} nije ispravan cijeli broj.`)
  }

  return parsed
}

function asRecord(value: unknown, source: string) {
  if (!isRecord(value)) {
    return invalidData(source, "Odgovor nije objekt.")
  }
  return value
}

function asUnixDate(seconds: number, source: string) {
  const timestamp = seconds * 1_000
  const date = new Date(timestamp)
  if (!Number.isFinite(timestamp) || !Number.isFinite(date.getTime())) {
    return invalidData(source, "Vrijeme mjerenja nije ispravno.")
  }
  return date.toISOString()
}

function serializeResourceError(error: unknown, source: string) {
  if (error instanceof SnapshotResourceError) return error.toJSON()
  return new SnapshotResourceError(
    "network",
    source,
    error instanceof Error ? error.message : "Dohvat nije uspio."
  ).toJSON()
}

export function satsForEuros(euros: number, bitcoinPriceEur: number) {
  if (
    !Number.isFinite(euros) ||
    !Number.isFinite(bitcoinPriceEur) ||
    euros < 0 ||
    bitcoinPriceEur <= 0
  ) {
    return 0
  }
  return Math.round((euros / bitcoinPriceEur) * SATOSHIS_PER_BITCOIN)
}

export function normalizePricePayload(value: unknown): BitcoinPriceSnapshot {
  const source = MEMPOOL_SOURCES.price
  const record = asRecord(value, source)
  const eur = requiredNumber(record, "EUR", source, { positive: true })
  const usd = requiredNumber(record, "USD", source, { positive: true })

  return {
    eur,
    usd,
    satsPer100Eur: satsForEuros(100, eur),
  }
}

function croatianSentimentLabel(value: unknown, source: string) {
  switch (value) {
    case "Extreme Fear":
      return "Ekstremni strah"
    case "Fear":
      return "Strah"
    case "Neutral":
      return "Neutralno"
    case "Greed":
      return "Pohlepa"
    case "Extreme Greed":
      return "Ekstremna pohlepa"
    default:
      return invalidData(source, "Klasifikacija sentimenta nije prepoznata.")
  }
}

export function normalizeSentimentPayload(value: unknown): SentimentResource {
  const source = ALTERNATIVE_ME_SOURCES.api
  const record = asRecord(value, source)
  const metadata = asRecord(record.metadata, source)
  if (!("error" in metadata) || metadata.error !== null) {
    return invalidData(source, "Alternative.me je vratio pogrešku.")
  }

  const data = requiredArray(record, "data", source)
  if (data.length === 0) {
    return invalidData(source, "Indeks straha i pohlepe nema podataka.")
  }

  const latest = asRecord(data[0], source)
  const score = requiredIntegerLike(latest, "value", source)
  if (score > 100) {
    return invalidData(
      source,
      "Vrijednost sentimenta mora biti između 0 i 100."
    )
  }

  const timestamp = requiredIntegerLike(latest, "timestamp", source)
  if (timestamp <= 0) {
    return invalidData(source, "Vrijeme mjerenja sentimenta nije ispravno.")
  }

  return {
    score,
    label: croatianSentimentLabel(latest.value_classification, source),
    observedAt: asUnixDate(timestamp, source),
  }
}

export function buildChainSnapshot(
  height: number,
  lastBlockAt: string
): BitcoinChainSnapshot {
  const lastBlockTimestamp = Date.parse(lastBlockAt)
  if (
    !Number.isInteger(height) ||
    height < 0 ||
    !Number.isFinite(lastBlockTimestamp)
  ) {
    return invalidData(
      MEMPOOL_SOURCES.blocks,
      "Visina ili vrijeme posljednjeg bloka nisu ispravni."
    )
  }

  const nextHalvingHeight =
    (Math.floor(height / BLOCKS_PER_HALVING) + 1) * BLOCKS_PER_HALVING
  const blocksToHalving = nextHalvingHeight - height
  const subsidyBtc = blockReward(height)
  const supplyBtc = Math.min(BITCOIN_SUPPLY_CAP, circulatingSupply(height))

  return {
    height,
    lastBlockAt: new Date(lastBlockTimestamp).toISOString(),
    subsidyBtc,
    supplyBtc,
    minedPercent: (supplyBtc / BITCOIN_SUPPLY_CAP) * 100,
    dailyIssuanceBtc: subsidyBtc * EXPECTED_BLOCKS_PER_DAY,
    blocksToHalving,
    estimatedHalvingAt: new Date(
      lastBlockTimestamp + blocksToHalving * EXPECTED_BLOCK_INTERVAL_MS
    ).toISOString(),
  }
}

export function normalizeChainPayload(value: unknown): BitcoinChainSnapshot {
  const source = MEMPOOL_SOURCES.blocks
  if (!Array.isArray(value) || value.length === 0) {
    return invalidData(source, "Popis blokova je prazan ili neispravan.")
  }

  const latestBlock = asRecord(value[0], source)
  const height = requiredNumber(latestBlock, "height", source, {
    integer: true,
  })
  const timestamp = requiredNumber(latestBlock, "timestamp", source, {
    integer: true,
    positive: true,
  })

  return buildChainSnapshot(height, asUnixDate(timestamp, source))
}

export function normalizeFeesPayload(value: unknown): BitcoinFeesSnapshot {
  const source = MEMPOOL_SOURCES.recommendedFees
  const container = asRecord(value, source)
  const recommended = asRecord(container.recommended, source)
  const mempool = asRecord(container.mempool, MEMPOOL_SOURCES.mempool)
  const mempoolTransactions = requiredNumber(
    mempool,
    "count",
    MEMPOOL_SOURCES.mempool,
    { integer: true }
  )
  const mempoolVbytes = requiredNumber(
    mempool,
    "vsize",
    MEMPOOL_SOURCES.mempool,
    { integer: true }
  )

  return {
    fastest: requiredNumber(recommended, "fastestFee", source),
    halfHour: requiredNumber(recommended, "halfHourFee", source),
    hour: requiredNumber(recommended, "hourFee", source),
    economy: requiredNumber(recommended, "economyFee", source),
    minimum: requiredNumber(recommended, "minimumFee", source),
    mempoolTransactions,
    mempoolVbytes,
    estimatedBlocks: Math.ceil(mempoolVbytes / VBYTES_PER_BLOCK),
  }
}

export function normalizeDifficultyPayload(value: unknown): DifficultyResource {
  const source = MEMPOOL_SOURCES.difficulty
  const record = asRecord(value, source)
  const estimatedRetargetDate = requiredNumber(
    record,
    "estimatedRetargetDate",
    source,
    { integer: true, positive: true }
  )

  return {
    adjustmentPercent: requiredNumber(record, "difficultyChange", source, {
      allowNegative: true,
    }),
    remainingBlocks: requiredNumber(record, "remainingBlocks", source, {
      integer: true,
    }),
    estimatedRetargetAt: new Date(estimatedRetargetDate).toISOString(),
  }
}

export function normalizeMiningHistoryPayload(
  value: unknown
): MiningHistoryResource {
  const source = MEMPOOL_SOURCES.miningHistory
  const record = asRecord(value, source)
  const currentHashrate = requiredNumber(record, "currentHashrate", source, {
    positive: true,
  })
  const currentDifficulty = requiredNumber(
    record,
    "currentDifficulty",
    source,
    { positive: true }
  )
  const rawHashrates = requiredArray(record, "hashrates", source)
  const rawDifficulties = requiredArray(record, "difficulty", source)

  if (rawHashrates.length === 0) {
    return invalidData(source, "Rudarska povijest je prazna.")
  }

  const hashrates = rawHashrates
    .map((entry) => {
      const point = asRecord(entry, source)
      return {
        timestamp: requiredNumber(point, "timestamp", source, {
          integer: true,
          positive: true,
        }),
        hashrate: requiredNumber(point, "avgHashrate", source, {
          positive: true,
        }),
      }
    })
    .sort((left, right) => left.timestamp - right.timestamp)

  const difficulties = rawDifficulties
    .map((entry) => {
      const point = asRecord(entry, source)
      return {
        timestamp: requiredNumber(point, "time", source, {
          integer: true,
          positive: true,
        }),
        difficulty: requiredNumber(point, "difficulty", source, {
          positive: true,
        }),
      }
    })
    .sort((left, right) => left.timestamp - right.timestamp)

  const newestTimestamp = hashrates.at(-1)?.timestamp
  if (newestTimestamp === undefined) {
    return invalidData(source, "Rudarska povijest je prazna.")
  }
  const cutoff = newestTimestamp - (MINING_HISTORY_DAYS - 1) * SECONDS_PER_DAY

  let difficultyIndex = 0
  const firstDifficulty = difficulties[0]?.difficulty ?? currentDifficulty
  const history = hashrates
    .filter((point) => point.timestamp >= cutoff)
    .map((point) => {
      while (
        difficultyIndex + 1 < difficulties.length &&
        difficulties[difficultyIndex + 1].timestamp <= point.timestamp
      ) {
        difficultyIndex += 1
      }
      const difficultyPoint = difficulties[difficultyIndex]
      const difficulty =
        difficultyPoint && difficultyPoint.timestamp <= point.timestamp
          ? difficultyPoint.difficulty
          : firstDifficulty

      return {
        at: asUnixDate(point.timestamp, source),
        hashrateEh: point.hashrate / HASHES_PER_EXAHASH,
        difficulty,
      }
    })

  return {
    currentHashrateEh: currentHashrate / HASHES_PER_EXAHASH,
    currentDifficulty,
    history,
  }
}

function powerLawLevelLabel(level: number) {
  if (level < 0) return `PL−${Math.abs(level)}`
  return `PL${level}`
}

export function buildTrendSnapshot(
  price: BitcoinPriceSnapshot,
  chain: BitcoinChainSnapshot
): BitcoinTrendSnapshot {
  const h = hForBlock(chain.height)
  const pl0Usd = powerLawMedianPrice(h)
  const bandPosition = powerLawBandPosition(h, price.usd)
  const zone = powerLawZone(h, price.usd)

  if (pl0Usd <= 0 || bandPosition === null || zone === null) {
    return invalidData(
      MEMPOOL_SOURCES.price,
      "Dugoročni model nije moguće izračunati."
    )
  }

  let zoneLabel: string
  if (zone.kind === "below") {
    zoneLabel = `Ispod ${powerLawLevelLabel(zone.upperLevel ?? 0)}`
  } else if (zone.kind === "above") {
    zoneLabel = `Iznad ${powerLawLevelLabel(zone.lowerLevel ?? 0)}`
  } else {
    zoneLabel = `Između ${powerLawLevelLabel(
      zone.lowerLevel ?? 0
    )} i ${powerLawLevelLabel(zone.upperLevel ?? 0)}`
  }

  return {
    pl0Usd,
    ratioToPl0: price.usd / pl0Usd,
    bandPosition,
    zoneLabel,
  }
}

function parseCacheEnvelope(value: unknown, source: string): CacheEnvelope {
  const record = asRecord(value, source)
  if (
    typeof record.fetchedAt !== "string" ||
    !Number.isFinite(Date.parse(record.fetchedAt)) ||
    !("payload" in record)
  ) {
    return invalidData(source, "Predmemorirani zapis nije ispravan.")
  }

  return { fetchedAt: record.fetchedAt, payload: record.payload }
}

async function readJsonWithLimit(
  response: Response,
  source: string,
  maximumBytes: number
): Promise<unknown> {
  if (!response.body) {
    throw new SnapshotResourceError(
      "invalid-json",
      source,
      "Odgovor nema sadržaj."
    )
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  const chunks: string[] = []
  let bytesRead = 0

  try {
    while (true) {
      const result = await reader.read()
      if (result.done) break
      bytesRead += result.value.byteLength
      if (bytesRead > maximumBytes) {
        await reader.cancel()
        throw new SnapshotResourceError(
          "response-too-large",
          source,
          "Odgovor je veći od dopuštene granice."
        )
      }
      chunks.push(decoder.decode(result.value, { stream: true }))
    }
    chunks.push(decoder.decode())
  } finally {
    reader.releaseLock()
  }

  try {
    const parsed: unknown = JSON.parse(chunks.join(""))
    return parsed
  } catch {
    throw new SnapshotResourceError(
      "invalid-json",
      source,
      "Odgovor nije ispravan JSON."
    )
  }
}

export async function fetchJsonWithTimeout(
  source: string,
  options: {
    fetcher?: SnapshotFetch
    maximumBytes?: number
    signal?: AbortSignal
    timeoutMs?: number
  } = {}
) {
  const fetcher = options.fetcher ?? fetch
  const timeoutMs = options.timeoutMs ?? 7_000
  const maximumBytes = options.maximumBytes ?? 1_000_000
  const controller = new AbortController()
  let didTimeOut = false

  const abortFromParent = () => controller.abort()
  if (options.signal?.aborted) controller.abort()
  else
    options.signal?.addEventListener("abort", abortFromParent, { once: true })

  const timeout = setTimeout(() => {
    didTimeOut = true
    controller.abort()
  }, timeoutMs)

  try {
    const response = await fetcher(source, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    })
    if (!response.ok) {
      throw new SnapshotResourceError(
        "http",
        source,
        `HTTP ${response.status}`,
        response.status
      )
    }
    return await readJsonWithLimit(response, source, maximumBytes)
  } catch (error) {
    if (error instanceof SnapshotResourceError) throw error
    if (didTimeOut) {
      throw new SnapshotResourceError(
        "timeout",
        source,
        `Dohvat je istekao nakon ${timeoutMs} ms.`
      )
    }
    if (options.signal?.aborted) {
      throw new SnapshotResourceError("aborted", source, "Dohvat je prekinut.")
    }
    throw new SnapshotResourceError(
      "network",
      source,
      error instanceof Error ? error.message : "Mrežni dohvat nije uspio."
    )
  } finally {
    clearTimeout(timeout)
    options.signal?.removeEventListener("abort", abortFromParent)
  }
}

async function readCachedValue<T>(
  cache: SnapshotCache,
  cacheRequest: Request,
  normalize: (value: unknown) => T,
  source: string
) {
  const response = await cache.match(cacheRequest)
  if (!response) return null
  const envelope = parseCacheEnvelope(
    await readJsonWithLimit(response, source, 2_000_000),
    source
  )
  return {
    fetchedAt: envelope.fetchedAt,
    value: normalize(envelope.payload),
  }
}

function logCacheFailure(error: unknown, source: string) {
  const details =
    error instanceof SnapshotResourceError
      ? error.toJSON()
      : new SnapshotResourceError(
          "cache",
          source,
          error instanceof Error
            ? error.message
            : "Cache operacija nije uspjela."
        ).toJSON()
  console.error(
    JSON.stringify({ event: "bitcoin_snapshot_cache_error", ...details })
  )
}

export async function loadCachedResource<T>(
  options: LoadCachedResourceOptions<T>
): Promise<CachedResourceResult<T>> {
  const source = options.sources[0] ?? "bitcoin-snapshot"
  const cacheRequest = new Request(options.cacheKey, { method: "GET" })
  let cached: { fetchedAt: string; value: T } | null = null

  if (options.cache) {
    try {
      cached = await readCachedValue(
        options.cache,
        cacheRequest,
        options.normalize,
        source
      )
    } catch (error) {
      logCacheFailure(error, source)
    }
  }

  const cachedAgeSeconds = cached
    ? Math.max(0, (options.nowMs - Date.parse(cached.fetchedAt)) / 1_000)
    : Number.POSITIVE_INFINITY

  if (cached && cachedAgeSeconds <= options.freshSeconds) {
    return {
      value: cached.value,
      asOf: cached.fetchedAt,
      status: "live",
      sources: options.sources,
      error: null,
    }
  }

  try {
    const payload = await options.fetchValue()
    const value = options.normalize(payload)
    const fetchedAt = new Date(options.nowMs).toISOString()

    if (options.cache) {
      const response = Response.json(
        { fetchedAt, payload } satisfies CacheEnvelope,
        {
          headers: {
            "Cache-Control": `public, max-age=${options.maximumAgeSeconds}`,
          },
        }
      )
      const cacheWrite = options.cache
        .put(cacheRequest, response)
        .catch((error: unknown) => logCacheFailure(error, source))
      if (options.schedule) options.schedule(cacheWrite)
      else await cacheWrite
    }

    return {
      value,
      asOf: fetchedAt,
      status: "live",
      sources: options.sources,
      error: null,
    }
  } catch (error) {
    const serializedError = serializeResourceError(error, source)
    if (cached && cachedAgeSeconds <= options.maximumAgeSeconds) {
      return {
        value: cached.value,
        asOf: cached.fetchedAt,
        status: "stale",
        sources: options.sources,
        error: serializedError,
      }
    }

    return {
      value: null,
      asOf: null,
      status: "unavailable",
      sources: options.sources,
      error: serializedError,
    }
  }
}

function snapshotGroup<T>(resource: CachedResourceResult<T>): SnapshotGroup<T> {
  return {
    value: resource.value,
    asOf: resource.asOf,
    status: resource.status,
    sources: resource.sources,
  }
}

function worstStatus(...statuses: SnapshotStatus[]): SnapshotStatus {
  if (statuses.includes("unavailable")) return "unavailable"
  if (statuses.includes("stale")) return "stale"
  return "live"
}

function oldestDate(...dates: Array<string | null>) {
  const available = dates.filter((date): date is string => date !== null)
  if (available.length === 0) return null
  return available.reduce((oldest, date) =>
    Date.parse(date) < Date.parse(oldest) ? date : oldest
  )
}

function uniqueSources(...groups: Array<{ sources: string[] }>) {
  return [...new Set(groups.flatMap((group) => group.sources))]
}

function unavailableGroup<T>(sources: string[]): SnapshotGroup<T> {
  return { value: null, asOf: null, status: "unavailable", sources }
}

function sentimentSnapshotGroup(
  resource: CachedResourceResult<SentimentResource>,
  generatedAt: string
): SnapshotGroup<BitcoinSentimentSnapshot> {
  if (!resource.value) {
    return unavailableGroup<BitcoinSentimentSnapshot>(resource.sources)
  }

  const generatedAtMs = Date.parse(generatedAt)
  const observedAtMs = Date.parse(resource.value.observedAt)
  const observationAgeMs = Math.max(0, generatedAtMs - observedAtMs)

  if (
    Number.isFinite(observationAgeMs) &&
    observationAgeMs > SENTIMENT_OBSERVATION_MAXIMUM_AGE_MS
  ) {
    return unavailableGroup<BitcoinSentimentSnapshot>(resource.sources)
  }

  const observationStatus: SnapshotStatus =
    Number.isFinite(observationAgeMs) &&
    observationAgeMs > SENTIMENT_OBSERVATION_FRESH_MS
      ? "stale"
      : "live"

  return {
    value: {
      score: resource.value.score,
      label: resource.value.label,
    },
    asOf: resource.value.observedAt,
    status: worstStatus(resource.status, observationStatus),
    sources: resource.sources,
  }
}

export function buildBitcoinSnapshot(
  parts: BitcoinSnapshotParts
): BitcoinSnapshot {
  const price = snapshotGroup(parts.price)
  const chain = snapshotGroup(parts.chain)
  const fees = snapshotGroup(parts.fees)
  const sentiment = sentimentSnapshotGroup(parts.sentiment, parts.generatedAt)
  const miningSources = uniqueSources(parts.difficulty, parts.miningHistory)

  let mining: SnapshotGroup<BitcoinMiningSnapshot>
  if (!parts.difficulty.value || !parts.miningHistory.value) {
    mining = unavailableGroup(miningSources)
  } else {
    mining = {
      value: {
        hashrateEh: parts.miningHistory.value.currentHashrateEh,
        difficulty: parts.miningHistory.value.currentDifficulty,
        adjustmentPercent: parts.difficulty.value.adjustmentPercent,
        remainingBlocks: parts.difficulty.value.remainingBlocks,
        estimatedRetargetAt: parts.difficulty.value.estimatedRetargetAt,
        history: parts.miningHistory.value.history,
      },
      asOf: oldestDate(parts.difficulty.asOf, parts.miningHistory.asOf),
      status: worstStatus(parts.difficulty.status, parts.miningHistory.status),
      sources: miningSources,
    }
  }

  const trendSources = [
    ...uniqueSources(parts.price, parts.chain),
    TREND_METHOD_SOURCE,
  ]
  let trend: SnapshotGroup<BitcoinTrendSnapshot>
  if (!price.value || !chain.value) {
    trend = unavailableGroup(trendSources)
  } else {
    try {
      trend = {
        value: buildTrendSnapshot(price.value, chain.value),
        asOf: oldestDate(price.asOf, chain.asOf),
        status: worstStatus(price.status, chain.status),
        sources: trendSources,
      }
    } catch {
      trend = unavailableGroup(trendSources)
    }
  }

  return {
    generatedAt: parts.generatedAt,
    price,
    chain,
    fees,
    mining,
    trend,
    sentiment,
  }
}

export function snapshotResourceErrors(parts: BitcoinSnapshotParts) {
  return [
    parts.price.error,
    parts.chain.error,
    parts.fees.error,
    parts.difficulty.error,
    parts.miningHistory.error,
    parts.sentiment.error,
  ].filter((error): error is SerializedSnapshotResourceError => error !== null)
}
