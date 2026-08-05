import {
  ALTERNATIVE_ME_SOURCES,
  MEMPOOL_SOURCES,
  SNAPSHOT_CACHE_POLICY,
  buildBitcoinSnapshot,
  fetchJsonWithTimeout,
  loadCachedResource,
  normalizeChainPayload,
  normalizeDifficultyPayload,
  normalizeFeesPayload,
  normalizeMiningHistoryPayload,
  normalizePricePayload,
  normalizeSentimentPayload,
  snapshotResourceErrors,
  type SnapshotCache,
} from "../_shared/bitcoinSnapshotServer.ts"

const CACHE_VERSION = "v1"

function cacheKey(request: Request, group: string) {
  const url = new URL(request.url)
  url.pathname = `/__bitcoin-snapshot-cache/${CACHE_VERSION}/${group}`
  url.search = ""
  return url.toString()
}

function defaultCache(): SnapshotCache | null {
  try {
    return caches.default
  } catch {
    return null
  }
}

function snapshotState(statuses: string[]) {
  if (statuses.every((status) => status === "unavailable")) {
    return "unavailable"
  }
  if (statuses.some((status) => status !== "live")) return "partial"
  return "live"
}

export const onRequestGet: PagesFunction = async (context) => {
  const nowMs = Date.now()
  const cache = defaultCache()
  const schedule = (promise: Promise<void>) => context.waitUntil(promise)
  const signal = context.request.signal

  try {
    const [price, chain, fees, difficulty, miningHistory, sentiment] =
      await Promise.all([
        loadCachedResource({
          cache,
          cacheKey: cacheKey(context.request, "price"),
          fetchValue: () =>
            fetchJsonWithTimeout(MEMPOOL_SOURCES.price, { signal }),
          ...SNAPSHOT_CACHE_POLICY.fast,
          normalize: normalizePricePayload,
          nowMs,
          schedule,
          sources: [MEMPOOL_SOURCES.price],
        }),
        loadCachedResource({
          cache,
          cacheKey: cacheKey(context.request, "chain"),
          fetchValue: () =>
            fetchJsonWithTimeout(MEMPOOL_SOURCES.blocks, {
              maximumBytes: 1_500_000,
              signal,
            }),
          ...SNAPSHOT_CACHE_POLICY.fast,
          normalize: normalizeChainPayload,
          nowMs,
          schedule,
          sources: [MEMPOOL_SOURCES.blocks],
        }),
        loadCachedResource({
          cache,
          cacheKey: cacheKey(context.request, "fees"),
          fetchValue: async () => {
            const [recommended, mempool] = await Promise.all([
              fetchJsonWithTimeout(MEMPOOL_SOURCES.recommendedFees, { signal }),
              fetchJsonWithTimeout(MEMPOOL_SOURCES.mempool, { signal }),
            ])
            return { recommended, mempool }
          },
          ...SNAPSHOT_CACHE_POLICY.fast,
          normalize: normalizeFeesPayload,
          nowMs,
          schedule,
          sources: [MEMPOOL_SOURCES.recommendedFees, MEMPOOL_SOURCES.mempool],
        }),
        loadCachedResource({
          cache,
          cacheKey: cacheKey(context.request, "difficulty"),
          fetchValue: () =>
            fetchJsonWithTimeout(MEMPOOL_SOURCES.difficulty, { signal }),
          ...SNAPSHOT_CACHE_POLICY.difficulty,
          normalize: normalizeDifficultyPayload,
          nowMs,
          schedule,
          sources: [MEMPOOL_SOURCES.difficulty],
        }),
        loadCachedResource({
          cache,
          cacheKey: cacheKey(context.request, "mining-history"),
          fetchValue: () =>
            fetchJsonWithTimeout(MEMPOOL_SOURCES.miningHistory, { signal }),
          ...SNAPSHOT_CACHE_POLICY.miningHistory,
          normalize: normalizeMiningHistoryPayload,
          nowMs,
          schedule,
          sources: [MEMPOOL_SOURCES.miningHistory],
        }),
        loadCachedResource({
          cache,
          cacheKey: cacheKey(context.request, "sentiment"),
          fetchValue: () =>
            fetchJsonWithTimeout(ALTERNATIVE_ME_SOURCES.api, { signal }),
          ...SNAPSHOT_CACHE_POLICY.sentiment,
          normalize: normalizeSentimentPayload,
          nowMs,
          schedule,
          sources: [ALTERNATIVE_ME_SOURCES.attribution],
        }),
      ])

    const parts = {
      generatedAt: new Date(nowMs).toISOString(),
      price,
      chain,
      fees,
      difficulty,
      miningHistory,
      sentiment,
    }
    const snapshot = buildBitcoinSnapshot(parts)
    const resourceErrors = snapshotResourceErrors(parts)
    for (const error of resourceErrors) {
      console.warn(
        JSON.stringify({ event: "bitcoin_snapshot_resource_error", ...error })
      )
    }

    const state = snapshotState([
      snapshot.price.status,
      snapshot.chain.status,
      snapshot.fees.status,
      snapshot.mining.status,
      snapshot.trend.status,
      snapshot.sentiment.status,
    ])

    return Response.json(snapshot, {
      headers: {
        "Cache-Control": "no-store",
        "X-Bitcoin-Snapshot-State": state,
      },
    })
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "bitcoin_snapshot_handler_error",
        message:
          error instanceof Error ? error.message : "Neočekivana pogreška.",
      })
    )

    return Response.json(
      {
        error: {
          code: "snapshot-failed",
          message: "Bitcoin podaci trenutačno nisu dostupni.",
        },
      },
      {
        status: 500,
        headers: { "Cache-Control": "no-store" },
      }
    )
  }
}
