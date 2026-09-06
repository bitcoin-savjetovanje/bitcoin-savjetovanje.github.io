export type SnapshotStatus = "live" | "stale" | "unavailable"

export type SnapshotGroup<T> = {
  value: T | null
  asOf: string | null
  status: SnapshotStatus
  sources: string[]
}

export type BitcoinPriceSnapshot = {
  eur: number
  usd: number
  satsPer100Eur: number
}

export type BitcoinChainSnapshot = {
  height: number
  lastBlockAt: string
  subsidyBtc: number
  supplyBtc: number
  minedPercent: number
  dailyIssuanceBtc: number
  blocksToHalving: number
  estimatedHalvingAt: string
}

export type BitcoinFeesSnapshot = {
  fastest: number
  halfHour: number
  hour: number
  economy: number
  minimum: number
  mempoolTransactions: number
  mempoolVbytes: number
  estimatedBlocks: number
}

export type BitcoinMiningHistoryPoint = {
  at: string
  hashrateEh: number
  difficulty: number
}

export type BitcoinMiningSnapshot = {
  hashrateEh: number
  difficulty: number
  adjustmentPercent: number
  remainingBlocks: number
  estimatedRetargetAt: string
  history: BitcoinMiningHistoryPoint[]
}

export type BitcoinTrendSnapshot = {
  pl0Usd: number
  ratioToPl0: number
  bandPosition: number
  zoneLabel: string
}

export type BitcoinSentimentSnapshot = {
  score: number
  label: string
}

export type BitcoinSnapshot = {
  generatedAt: string
  price: SnapshotGroup<BitcoinPriceSnapshot>
  chain: SnapshotGroup<BitcoinChainSnapshot>
  fees: SnapshotGroup<BitcoinFeesSnapshot>
  mining: SnapshotGroup<BitcoinMiningSnapshot>
  trend: SnapshotGroup<BitcoinTrendSnapshot>
  sentiment: SnapshotGroup<BitcoinSentimentSnapshot>
}

const FAST_GROUP_FRESH_MS = 60_000
const FAST_GROUP_MAXIMUM_AGE_MS = 15 * 60_000
const MINING_GROUP_FRESH_MS = 10 * 60_000
const MINING_GROUP_MAXIMUM_AGE_MS = 24 * 60 * 60_000
const SENTIMENT_GROUP_FRESH_MS = 24 * 60 * 60_000
const SENTIMENT_GROUP_MAXIMUM_AGE_MS = 48 * 60 * 60_000

function ageSnapshotGroup<T>(
  group: SnapshotGroup<T>,
  nowMs: number,
  freshMs: number,
  maximumAgeMs: number
): SnapshotGroup<T> {
  if (group.value === null || !group.asOf || group.status === "unavailable") {
    return group
  }

  const measuredAt = Date.parse(group.asOf)
  if (!Number.isFinite(measuredAt) || !Number.isFinite(nowMs)) return group

  const ageMs = Math.max(0, nowMs - measuredAt)
  if (ageMs > maximumAgeMs) {
    return {
      value: null,
      asOf: null,
      status: "unavailable",
      sources: group.sources,
    }
  }

  if (group.status === "live" && ageMs > freshMs) {
    return { ...group, status: "stale" }
  }

  return group
}

export function ageBitcoinSnapshot(
  snapshot: BitcoinSnapshot,
  nowMs: number
): BitcoinSnapshot {
  return {
    ...snapshot,
    price: ageSnapshotGroup(
      snapshot.price,
      nowMs,
      FAST_GROUP_FRESH_MS,
      FAST_GROUP_MAXIMUM_AGE_MS
    ),
    chain: ageSnapshotGroup(
      snapshot.chain,
      nowMs,
      FAST_GROUP_FRESH_MS,
      FAST_GROUP_MAXIMUM_AGE_MS
    ),
    fees: ageSnapshotGroup(
      snapshot.fees,
      nowMs,
      FAST_GROUP_FRESH_MS,
      FAST_GROUP_MAXIMUM_AGE_MS
    ),
    mining: ageSnapshotGroup(
      snapshot.mining,
      nowMs,
      MINING_GROUP_FRESH_MS,
      MINING_GROUP_MAXIMUM_AGE_MS
    ),
    trend: ageSnapshotGroup(
      snapshot.trend,
      nowMs,
      FAST_GROUP_FRESH_MS,
      FAST_GROUP_MAXIMUM_AGE_MS
    ),
    sentiment: ageSnapshotGroup(
      snapshot.sentiment,
      nowMs,
      SENTIMENT_GROUP_FRESH_MS,
      SENTIMENT_GROUP_MAXIMUM_AGE_MS
    ),
  }
}

export type BitcoinSnapshotErrorCode =
  | "aborted"
  | "http"
  | "invalid-response"
  | "network"

export class BitcoinSnapshotError extends Error {
  readonly code: BitcoinSnapshotErrorCode
  readonly status: number | null

  constructor(
    code: BitcoinSnapshotErrorCode,
    message: string,
    status: number | null = null
  ) {
    super(message)
    this.name = "BitcoinSnapshotError"
    this.code = code
    this.status = status
  }
}

type ValueValidator<T> = (value: unknown) => value is T

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value)
}

function isNonNegativeNumber(value: unknown): value is number {
  return isFiniteNumber(value) && value >= 0
}

function isNonNegativeInteger(value: unknown): value is number {
  return isNonNegativeNumber(value) && Number.isInteger(value)
}

function isIsoDate(value: unknown): value is string {
  return typeof value === "string" && Number.isFinite(Date.parse(value))
}

function isStatus(value: unknown): value is SnapshotStatus {
  return value === "live" || value === "stale" || value === "unavailable"
}

function isSources(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((source) => typeof source === "string")
  )
}

function isSnapshotGroup<T>(
  value: unknown,
  isValue: ValueValidator<T>
): value is SnapshotGroup<T> {
  if (!isRecord(value)) return false
  if (!isStatus(value.status) || !isSources(value.sources)) return false
  if (value.asOf !== null && !isIsoDate(value.asOf)) return false

  if (value.value === null) {
    return value.status === "unavailable" && value.asOf === null
  }

  return (
    value.status !== "unavailable" &&
    value.asOf !== null &&
    isValue(value.value)
  )
}

function isPriceSnapshot(value: unknown): value is BitcoinPriceSnapshot {
  return (
    isRecord(value) &&
    isNonNegativeNumber(value.eur) &&
    isNonNegativeNumber(value.usd) &&
    isNonNegativeInteger(value.satsPer100Eur)
  )
}

function isChainSnapshot(value: unknown): value is BitcoinChainSnapshot {
  return (
    isRecord(value) &&
    isNonNegativeInteger(value.height) &&
    isIsoDate(value.lastBlockAt) &&
    isNonNegativeNumber(value.subsidyBtc) &&
    isNonNegativeNumber(value.supplyBtc) &&
    isNonNegativeNumber(value.minedPercent) &&
    isNonNegativeNumber(value.dailyIssuanceBtc) &&
    isNonNegativeInteger(value.blocksToHalving) &&
    isIsoDate(value.estimatedHalvingAt)
  )
}

function isFeesSnapshot(value: unknown): value is BitcoinFeesSnapshot {
  return (
    isRecord(value) &&
    isNonNegativeNumber(value.fastest) &&
    isNonNegativeNumber(value.halfHour) &&
    isNonNegativeNumber(value.hour) &&
    isNonNegativeNumber(value.economy) &&
    isNonNegativeNumber(value.minimum) &&
    isNonNegativeInteger(value.mempoolTransactions) &&
    isNonNegativeInteger(value.mempoolVbytes) &&
    isNonNegativeInteger(value.estimatedBlocks)
  )
}

function isMiningHistoryPoint(
  value: unknown
): value is BitcoinMiningHistoryPoint {
  return (
    isRecord(value) &&
    isIsoDate(value.at) &&
    isNonNegativeNumber(value.hashrateEh) &&
    isNonNegativeNumber(value.difficulty)
  )
}

function isMiningSnapshot(value: unknown): value is BitcoinMiningSnapshot {
  return (
    isRecord(value) &&
    isNonNegativeNumber(value.hashrateEh) &&
    isNonNegativeNumber(value.difficulty) &&
    isFiniteNumber(value.adjustmentPercent) &&
    isNonNegativeInteger(value.remainingBlocks) &&
    isIsoDate(value.estimatedRetargetAt) &&
    Array.isArray(value.history) &&
    value.history.every(isMiningHistoryPoint)
  )
}

function isTrendSnapshot(value: unknown): value is BitcoinTrendSnapshot {
  return (
    isRecord(value) &&
    isNonNegativeNumber(value.pl0Usd) &&
    isNonNegativeNumber(value.ratioToPl0) &&
    isFiniteNumber(value.bandPosition) &&
    typeof value.zoneLabel === "string"
  )
}

function isSentimentSnapshot(
  value: unknown
): value is BitcoinSentimentSnapshot {
  return (
    isRecord(value) &&
    isNonNegativeInteger(value.score) &&
    value.score <= 100 &&
    typeof value.label === "string" &&
    value.label.length > 0
  )
}

export function isBitcoinSnapshot(value: unknown): value is BitcoinSnapshot {
  return (
    isRecord(value) &&
    isIsoDate(value.generatedAt) &&
    isSnapshotGroup(value.price, isPriceSnapshot) &&
    isSnapshotGroup(value.chain, isChainSnapshot) &&
    isSnapshotGroup(value.fees, isFeesSnapshot) &&
    isSnapshotGroup(value.mining, isMiningSnapshot) &&
    isSnapshotGroup(value.trend, isTrendSnapshot) &&
    isSnapshotGroup(value.sentiment, isSentimentSnapshot)
  )
}

function apiErrorMessage(value: unknown) {
  if (!isRecord(value) || !isRecord(value.error)) return null
  return typeof value.error.message === "string" ? value.error.message : null
}

/** GitHub Pages has no Functions runtime; reuse the canonical site's public API. */
export function bitcoinSnapshotEndpoint(hostname = "") {
  return hostname === "bitcoin-savjetovanje.github.io"
    ? "https://bitcoin-savjetovanje.com/api/bitcoin-snapshot"
    : "/api/bitcoin-snapshot"
}

export async function fetchBitcoinSnapshot(
  signal?: AbortSignal,
  hostname = ""
): Promise<BitcoinSnapshot> {
  let response: Response

  try {
    response = await fetch(bitcoinSnapshotEndpoint(hostname), {
      headers: { Accept: "application/json" },
      signal,
    })
  } catch (error) {
    if (signal?.aborted) {
      throw new BitcoinSnapshotError("aborted", "Dohvat je prekinut.")
    }

    throw new BitcoinSnapshotError(
      "network",
      error instanceof Error
        ? error.message
        : "Nije moguće dohvatiti Bitcoin podatke."
    )
  }

  let payload: unknown
  try {
    payload = await response.json()
  } catch {
    throw new BitcoinSnapshotError(
      "invalid-response",
      "Bitcoin podaci nisu u očekivanom formatu.",
      response.status
    )
  }

  if (!response.ok) {
    throw new BitcoinSnapshotError(
      "http",
      apiErrorMessage(payload) ?? `Bitcoin API: HTTP ${response.status}`,
      response.status
    )
  }

  if (!isBitcoinSnapshot(payload)) {
    throw new BitcoinSnapshotError(
      "invalid-response",
      "Bitcoin podaci nisu u očekivanom formatu.",
      response.status
    )
  }

  return payload
}

const hrIntegerFormatter = new Intl.NumberFormat("hr-HR", {
  maximumFractionDigits: 0,
})

const hrBitcoinFormatter = new Intl.NumberFormat("hr-HR", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 8,
})

const hrEuroFormatter = new Intl.NumberFormat("hr-HR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
})

export function formatSnapshotInteger(value: number) {
  return hrIntegerFormatter.format(value)
}

export function formatSnapshotBtc(value: number) {
  return `${hrBitcoinFormatter.format(value)} BTC`
}

export function formatSnapshotEuro(value: number) {
  return hrEuroFormatter.format(value)
}
