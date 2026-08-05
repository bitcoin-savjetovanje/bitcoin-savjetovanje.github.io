/// <reference types="node" />

import {
  deepStrictEqual,
  equal,
  match,
  ok,
  rejects,
  throws,
} from "node:assert/strict"
import { test } from "node:test"

import {
  ALTERNATIVE_ME_SOURCES,
  buildBitcoinSnapshot,
  buildChainSnapshot,
  buildTrendSnapshot,
  fetchJsonWithTimeout,
  loadCachedResource,
  MEMPOOL_SOURCES,
  normalizeChainPayload,
  normalizeDifficultyPayload,
  normalizeFeesPayload,
  normalizeMiningHistoryPayload,
  normalizePricePayload,
  normalizeSentimentPayload,
  satsForEuros,
  SNAPSHOT_CACHE_POLICY,
  SnapshotResourceError,
  TREND_METHOD_SOURCE,
  type CachedResourceResult,
  type SnapshotCache,
  type SnapshotFetch,
} from "../../functions/_shared/bitcoinSnapshotServer.ts"
import { hForBlock, powerLawMedianPrice } from "./bitcoinWaveCalculator.ts"
import {
  ageBitcoinSnapshot,
  formatSnapshotBtc,
  formatSnapshotEuro,
  formatSnapshotInteger,
  isBitcoinSnapshot,
  type BitcoinChainSnapshot,
  type BitcoinFeesSnapshot,
  type BitcoinPriceSnapshot,
} from "./bitcoinSnapshot.ts"

const NOW = Date.parse("2026-07-20T12:00:00.000Z")

function live<T>(
  value: T,
  sources: string[],
  asOf = "2026-07-20T12:00:00.000Z"
): CachedResourceResult<T> {
  return { value, asOf, status: "live", sources, error: null }
}

function unavailable<T>(sources: string[]): CachedResourceResult<T> {
  return {
    value: null,
    asOf: null,
    status: "unavailable",
    sources,
    error: {
      code: "network",
      message: "Nije dostupno.",
      source: sources[0] ?? "test",
      status: null,
    },
  }
}

const validPricePayload = { EUR: 50_000, USD: 60_000, time: 1_753_000_000 }
const validBlocksPayload = [
  { height: 950_000, timestamp: Math.floor(NOW / 1_000) - 120 },
]
const validFeesPayload = {
  recommended: {
    fastestFee: 12,
    halfHourFee: 8,
    hourFee: 5,
    economyFee: 2,
    minimumFee: 1,
  },
  mempool: { count: 42_000, vsize: 2_100_001, total_fee: 123 },
}
const validDifficultyPayload = {
  difficultyChange: -1.25,
  remainingBlocks: 321,
  estimatedRetargetDate: NOW + 321 * 600_000,
}
const validMiningPayload = {
  currentHashrate: 900e18,
  currentDifficulty: 125e12,
  hashrates: [
    { timestamp: Math.floor(NOW / 1_000) - 2 * 86_400, avgHashrate: 850e18 },
    { timestamp: Math.floor(NOW / 1_000) - 86_400, avgHashrate: 880e18 },
    { timestamp: Math.floor(NOW / 1_000), avgHashrate: 900e18 },
  ],
  difficulty: [
    {
      time: Math.floor(NOW / 1_000) - 3 * 86_400,
      height: 949_536,
      difficulty: 120e12,
      adjustment: 1.01,
    },
    {
      time: Math.floor(NOW / 1_000) - 86_400,
      height: 951_552,
      difficulty: 125e12,
      adjustment: 1.04,
    },
  ],
}

const SENTIMENT_OBSERVED_AT = "2026-07-20T00:00:00.000Z"
const validSentimentPayload = {
  name: "Fear and Greed Index",
  data: [
    {
      value: "29",
      value_classification: "Fear",
      timestamp: String(Date.parse(SENTIMENT_OBSERVED_AT) / 1_000),
      time_until_update: "43200",
    },
  ],
  metadata: { error: null },
}

test("normalizira valjane cijene, lanac, naknade, rudarske podatke i sentiment", () => {
  deepStrictEqual(normalizePricePayload(validPricePayload), {
    eur: 50_000,
    usd: 60_000,
    satsPer100Eur: 200_000,
  })

  const chain = normalizeChainPayload(validBlocksPayload)
  equal(chain.height, 950_000)
  equal(chain.subsidyBtc, 3.125)
  equal(chain.blocksToHalving, 100_000)

  deepStrictEqual(normalizeFeesPayload(validFeesPayload), {
    fastest: 12,
    halfHour: 8,
    hour: 5,
    economy: 2,
    minimum: 1,
    mempoolTransactions: 42_000,
    mempoolVbytes: 2_100_001,
    estimatedBlocks: 3,
  })

  const difficulty = normalizeDifficultyPayload(validDifficultyPayload)
  equal(difficulty.adjustmentPercent, -1.25)
  equal(difficulty.remainingBlocks, 321)

  const mining = normalizeMiningHistoryPayload(validMiningPayload)
  equal(mining.currentHashrateEh, 900)
  equal(mining.currentDifficulty, 125e12)
  equal(mining.history.length, 3)
  equal(mining.history[0]?.difficulty, 120e12)
  equal(mining.history[2]?.difficulty, 125e12)

  deepStrictEqual(normalizeSentimentPayload(validSentimentPayload), {
    score: 29,
    label: "Strah",
    observedAt: SENTIMENT_OBSERVED_AT,
  })
})

test("računa satoshije i monetarna pravila na prijelazu halvinga", () => {
  equal(satsForEuros(100, 50_000), 200_000)
  equal(satsForEuros(100, 0), 0)

  const before = buildChainSnapshot(209_999, "2012-11-28T15:20:00.000Z")
  equal(before.subsidyBtc, 50)
  equal(before.supplyBtc, 10_500_000)
  equal(before.blocksToHalving, 1)

  const after = buildChainSnapshot(210_000, "2012-11-28T15:30:00.000Z")
  equal(after.subsidyBtc, 25)
  equal(after.supplyBtc, 10_500_025)
  equal(after.dailyIssuanceBtc, 3_600)
  equal(after.blocksToHalving, 210_000)
})

test("računa PL0 omjer, poziciju i zonu iz zajedničkog modela", () => {
  const chain = buildChainSnapshot(950_000, "2026-07-20T11:58:00.000Z")
  const pl0Usd = powerLawMedianPrice(hForBlock(chain.height))
  const trend = buildTrendSnapshot(
    { eur: pl0Usd * 0.9, usd: pl0Usd, satsPer100Eur: 1 },
    chain
  )

  equal(trend.pl0Usd, pl0Usd)
  ok(Math.abs(trend.ratioToPl0 - 1) < 1e-12)
  ok(Math.abs(trend.bandPosition) < 1e-12)
  equal(trend.zoneLabel, "Između PL0 i PL1")
})

test("odbija djelomične i neispravne upstream odgovore bez type assertiona", () => {
  for (const action of [
    () => normalizePricePayload({ EUR: 50_000 }),
    () => normalizeChainPayload([]),
    () =>
      normalizeFeesPayload({
        recommended: validFeesPayload.recommended,
        mempool: { count: "42000", vsize: 100 },
      }),
    () =>
      normalizeMiningHistoryPayload({
        ...validMiningPayload,
        hashrates: [{ timestamp: "jučer", avgHashrate: 900e18 }],
      }),
    () =>
      normalizeSentimentPayload({
        data: [
          {
            value: "101",
            value_classification: "Fear",
            timestamp: "1752969600",
          },
        ],
        metadata: { error: null },
      }),
    () =>
      normalizeSentimentPayload({
        data: [
          {
            value: "29",
            value_classification: "Bullish",
            timestamp: "1752969600",
          },
        ],
        metadata: { error: null },
      }),
    () =>
      normalizeSentimentPayload({
        data: [],
        metadata: { error: "rate limit" },
      }),
    () =>
      normalizeSentimentPayload({
        data: [
          {
            value: "29",
            value_classification: "Fear",
            timestamp: "9000000000000000",
          },
        ],
        metadata: { error: null },
      }),
  ]) {
    throws(
      action,
      (error: unknown) =>
        error instanceof SnapshotResourceError && error.code === "invalid-data"
    )
  }
})

test("ograničava trajanje dohvata i strukturira HTTP i JSON pogreške", async () => {
  const hangingFetch: SnapshotFetch = (_input, init) =>
    new Promise((_resolve, reject) => {
      const abort = () => reject(new Error("aborted"))
      if (init?.signal?.aborted) abort()
      else init?.signal?.addEventListener("abort", abort, { once: true })
    })

  await rejects(
    fetchJsonWithTimeout("https://example.test/slow", {
      fetcher: hangingFetch,
      timeoutMs: 10,
    }),
    (error: unknown) =>
      error instanceof SnapshotResourceError && error.code === "timeout"
  )

  await rejects(
    fetchJsonWithTimeout("https://example.test/rate-limit", {
      fetcher: async () => new Response(null, { status: 429 }),
    }),
    (error: unknown) =>
      error instanceof SnapshotResourceError &&
      error.code === "http" &&
      error.status === 429
  )

  await rejects(
    fetchJsonWithTimeout("https://example.test/malformed", {
      fetcher: async () => new Response("{nije-json"),
    }),
    (error: unknown) =>
      error instanceof SnapshotResourceError && error.code === "invalid-json"
  )
})

class MemoryCache implements SnapshotCache {
  readonly values = new Map<string, Response>()

  async match(request: Request) {
    return this.values.get(request.url)?.clone()
  }

  async put(request: Request, response: Response) {
    this.values.set(request.url, response.clone())
  }
}

test("razlikuje svježi, zastarjeli i prestari cache zapis", async () => {
  const cache = new MemoryCache()
  let fetchCount = 0
  const fetchValue = async () => {
    fetchCount += 1
    return validPricePayload
  }
  const baseOptions = {
    cache,
    cacheKey: "https://example.test/cache/price",
    fetchValue,
    freshSeconds: 60,
    maximumAgeSeconds: 900,
    normalize: normalizePricePayload,
    sources: [MEMPOOL_SOURCES.price],
  }

  const first = await loadCachedResource({ ...baseOptions, nowMs: NOW })
  equal(first.status, "live")
  equal(fetchCount, 1)

  const fresh = await loadCachedResource({
    ...baseOptions,
    nowMs: NOW + 30_000,
  })
  equal(fresh.status, "live")
  equal(fetchCount, 1)

  const failingOptions = {
    ...baseOptions,
    fetchValue: async () => {
      throw new SnapshotResourceError(
        "network",
        MEMPOOL_SOURCES.price,
        "offline"
      )
    },
  }
  const stale = await loadCachedResource({
    ...failingOptions,
    nowMs: NOW + 61_000,
  })
  equal(stale.status, "stale")
  equal(stale.value?.eur, 50_000)

  const expired = await loadCachedResource({
    ...failingOptions,
    nowMs: NOW + 901_000,
  })
  equal(expired.status, "unavailable")
  equal(expired.value, null)
})

test("sentiment ima jednosatni edge cache i najviše 24 sata fallbacka", async () => {
  const cache = new MemoryCache()
  let fetchCount = 0
  const baseOptions = {
    cache,
    cacheKey: "https://example.test/cache/sentiment",
    fetchValue: async () => {
      fetchCount += 1
      return validSentimentPayload
    },
    ...SNAPSHOT_CACHE_POLICY.sentiment,
    normalize: normalizeSentimentPayload,
    sources: [ALTERNATIVE_ME_SOURCES.attribution],
  }

  const first = await loadCachedResource({ ...baseOptions, nowMs: NOW })
  equal(first.status, "live")
  equal(first.value?.observedAt, SENTIMENT_OBSERVED_AT)
  equal(first.asOf, new Date(NOW).toISOString())
  equal(fetchCount, 1)

  const fresh = await loadCachedResource({
    ...baseOptions,
    nowMs: NOW + 60 * 60_000,
  })
  equal(fresh.status, "live")
  equal(fetchCount, 1)

  const rateLimitedOptions = {
    ...baseOptions,
    fetchValue: async () =>
      fetchJsonWithTimeout(ALTERNATIVE_ME_SOURCES.api, {
        fetcher: async () => new Response(null, { status: 429 }),
      }),
  }
  const stale = await loadCachedResource({
    ...rateLimitedOptions,
    nowMs: NOW + 60 * 60_000 + 1,
  })
  equal(stale.status, "stale")
  equal(stale.value?.score, 29)
  equal(stale.error?.status, 429)

  const expired = await loadCachedResource({
    ...rateLimitedOptions,
    nowMs: NOW + 24 * 60 * 60_000 + 1,
  })
  equal(expired.status, "unavailable")
  equal(expired.value, null)
  equal(expired.error?.status, 429)
})

test("gradi valjanu snimku i izolira djelomične kvarove", () => {
  const price = normalizePricePayload(validPricePayload)
  const chain = normalizeChainPayload(validBlocksPayload)
  const fees = normalizeFeesPayload(validFeesPayload)
  const difficulty = normalizeDifficultyPayload(validDifficultyPayload)
  const miningHistory = normalizeMiningHistoryPayload(validMiningPayload)
  const sentiment = normalizeSentimentPayload(validSentimentPayload)

  const snapshot = buildBitcoinSnapshot({
    generatedAt: new Date(NOW).toISOString(),
    price: live(price, [MEMPOOL_SOURCES.price]),
    chain: live(chain, [MEMPOOL_SOURCES.blocks]),
    fees: live(fees, [
      MEMPOOL_SOURCES.recommendedFees,
      MEMPOOL_SOURCES.mempool,
    ]),
    difficulty: live(difficulty, [MEMPOOL_SOURCES.difficulty]),
    miningHistory: live(miningHistory, [MEMPOOL_SOURCES.miningHistory]),
    sentiment: live(sentiment, [ALTERNATIVE_ME_SOURCES.attribution]),
  })
  equal(isBitcoinSnapshot(snapshot), true)
  ok(snapshot.trend.value)
  equal(snapshot.trend.sources.includes(TREND_METHOD_SOURCE), true)
  equal(snapshot.mining.value?.history.length, 3)
  equal(snapshot.sentiment.value?.score, 29)
  equal(snapshot.sentiment.value?.label, "Strah")
  equal(snapshot.sentiment.asOf, SENTIMENT_OBSERVED_AT)
  deepStrictEqual(snapshot.sentiment.sources, [
    ALTERNATIVE_ME_SOURCES.attribution,
  ])
  equal(
    isBitcoinSnapshot({
      ...snapshot,
      sentiment: {
        ...snapshot.sentiment,
        value: { score: 101, label: "Nepostojeća vrijednost" },
      },
    }),
    false
  )

  const partial = buildBitcoinSnapshot({
    generatedAt: new Date(NOW).toISOString(),
    price: unavailable<BitcoinPriceSnapshot>([MEMPOOL_SOURCES.price]),
    chain: live<BitcoinChainSnapshot>(chain, [MEMPOOL_SOURCES.blocks]),
    fees: live<BitcoinFeesSnapshot>(fees, [
      MEMPOOL_SOURCES.recommendedFees,
      MEMPOOL_SOURCES.mempool,
    ]),
    difficulty: unavailable([MEMPOOL_SOURCES.difficulty]),
    miningHistory: live(miningHistory, [MEMPOOL_SOURCES.miningHistory]),
    sentiment: unavailable([ALTERNATIVE_ME_SOURCES.attribution]),
  })
  equal(isBitcoinSnapshot(partial), true)
  equal(partial.price.status, "unavailable")
  equal(partial.fees.status, "live")
  equal(partial.mining.status, "unavailable")
  equal(partial.trend.status, "unavailable")
  equal(partial.sentiment.status, "unavailable")
})

test("javni snapshot određuje svježinu sentimenta prema vremenu očitanja", () => {
  const sentiment = normalizeSentimentPayload(validSentimentPayload)
  const baseParts = {
    price: unavailable<BitcoinPriceSnapshot>([MEMPOOL_SOURCES.price]),
    chain: unavailable<BitcoinChainSnapshot>([MEMPOOL_SOURCES.blocks]),
    fees: unavailable<BitcoinFeesSnapshot>([
      MEMPOOL_SOURCES.recommendedFees,
      MEMPOOL_SOURCES.mempool,
    ]),
    difficulty: live(normalizeDifficultyPayload(validDifficultyPayload), [
      MEMPOOL_SOURCES.difficulty,
    ]),
    miningHistory: live(normalizeMiningHistoryPayload(validMiningPayload), [
      MEMPOOL_SOURCES.miningHistory,
    ]),
    sentiment: live(sentiment, [ALTERNATIVE_ME_SOURCES.attribution]),
  }

  const stale = buildBitcoinSnapshot({
    ...baseParts,
    generatedAt: new Date(
      Date.parse(SENTIMENT_OBSERVED_AT) + 24 * 60 * 60_000 + 1
    ).toISOString(),
  })
  equal(stale.sentiment.status, "stale")
  equal(stale.sentiment.value?.score, 29)

  const unavailableSnapshot = buildBitcoinSnapshot({
    ...baseParts,
    generatedAt: new Date(
      Date.parse(SENTIMENT_OBSERVED_AT) + 48 * 60 * 60_000 + 1
    ).toISOString(),
  })
  equal(unavailableSnapshot.sentiment.status, "unavailable")
  equal(unavailableSnapshot.sentiment.value, null)
  equal(unavailableSnapshot.sentiment.asOf, null)
})

test("na klijentu stari statuse i skriva podatke nakon dopuštene granice", () => {
  const snapshot = buildBitcoinSnapshot({
    generatedAt: new Date(NOW).toISOString(),
    price: live(normalizePricePayload(validPricePayload), [
      MEMPOOL_SOURCES.price,
    ]),
    chain: live(normalizeChainPayload(validBlocksPayload), [
      MEMPOOL_SOURCES.blocks,
    ]),
    fees: live(normalizeFeesPayload(validFeesPayload), [
      MEMPOOL_SOURCES.recommendedFees,
      MEMPOOL_SOURCES.mempool,
    ]),
    difficulty: live(normalizeDifficultyPayload(validDifficultyPayload), [
      MEMPOOL_SOURCES.difficulty,
    ]),
    miningHistory: live(normalizeMiningHistoryPayload(validMiningPayload), [
      MEMPOOL_SOURCES.miningHistory,
    ]),
    sentiment: live(normalizeSentimentPayload(validSentimentPayload), [
      ALTERNATIVE_ME_SOURCES.attribution,
    ]),
  })

  const afterOneMinute = ageBitcoinSnapshot(snapshot, NOW + 61_000)
  equal(afterOneMinute.price.status, "stale")
  equal(afterOneMinute.chain.status, "stale")
  equal(afterOneMinute.fees.status, "stale")
  equal(afterOneMinute.trend.status, "stale")
  equal(afterOneMinute.mining.status, "live")
  equal(afterOneMinute.sentiment.status, "live")

  const afterSixteenMinutes = ageBitcoinSnapshot(snapshot, NOW + 16 * 60_000)
  equal(afterSixteenMinutes.price.status, "unavailable")
  equal(afterSixteenMinutes.price.value, null)
  equal(afterSixteenMinutes.mining.status, "stale")
  equal(afterSixteenMinutes.sentiment.status, "live")

  const afterOneDay = ageBitcoinSnapshot(snapshot, NOW + 24 * 60 * 60_000 + 1)
  equal(afterOneDay.mining.status, "unavailable")
  equal(afterOneDay.mining.value, null)
  equal(afterOneDay.sentiment.status, "stale")

  const afterFortyEightHoursFromMeasurement = ageBitcoinSnapshot(
    snapshot,
    Date.parse(SENTIMENT_OBSERVED_AT) + 48 * 60 * 60_000 + 1
  )
  equal(afterFortyEightHoursFromMeasurement.sentiment.status, "unavailable")
  equal(afterFortyEightHoursFromMeasurement.sentiment.value, null)
})

test("formatira ključne vrijednosti u hrvatskom zapisu", () => {
  equal(formatSnapshotInteger(958_917), "958.917")
  equal(formatSnapshotBtc(3.125), "3,125 BTC")
  match(formatSnapshotEuro(57_319).replace(/\s/g, " "), /57\.319 €/)
})
