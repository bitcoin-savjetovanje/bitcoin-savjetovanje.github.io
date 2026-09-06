import { useEffect, useState } from "react"
import {
  ageBitcoinSnapshot,
  fetchBitcoinSnapshot,
  type BitcoinSnapshot,
} from "@/lib/bitcoinSnapshot"
import { fetchBitcoinWaveDataset } from "@/lib/bitcoinWaveData"
import {
  createBitcoinWaveDateMapper,
  hForBlock,
  type BitcoinWaveDateMapper,
} from "@/lib/bitcoinWaveCalculator"

/** Only public market/model data is requested; no calculator inputs enter this hook. */
export function useOpportunityMarket() {
  const [snapshot, setSnapshot] = useState<BitcoinSnapshot | null>(null)
  const [mapper, setMapper] = useState<BitcoinWaveDateMapper | null>(null)
  const [now, setNow] = useState<number | null>(null)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    let busy = false
    let loadedMapper: BitcoinWaveDateMapper | null = null
    async function refresh() {
      if (busy) return
      busy = true
      try {
        const [nextSnapshot, nextMapper] = await Promise.all([
          fetchBitcoinSnapshot(controller.signal, window.location.hostname),
          loadedMapper
            ? Promise.resolve(loadedMapper)
            : fetchBitcoinWaveDataset(controller.signal).then((data) =>
                createBitcoinWaveDateMapper(data.modelDates)
              ),
        ])
        if (controller.signal.aborted) return
        loadedMapper = nextMapper
        setMapper(nextMapper)
        setSnapshot(nextSnapshot)
        setError(false)
      } catch {
        if (!controller.signal.aborted) setError(true)
      } finally {
        busy = false
        if (!controller.signal.aborted) setNow(Date.now())
      }
    }
    void refresh()
    const clock = window.setInterval(() => setNow(Date.now()), 15_000)
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") void refresh()
    }, 60_000)
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        setNow(Date.now())
        void refresh()
      }
    }
    document.addEventListener("visibilitychange", onVisible)
    return () => {
      controller.abort()
      window.clearInterval(clock)
      window.clearInterval(interval)
      document.removeEventListener("visibilitychange", onVisible)
    }
  }, [attempt])
  const aged =
    snapshot && now !== null ? ageBitcoinSnapshot(snapshot, now) : null
  const price = aged?.price.value
  const chain = aged?.chain.value
  const market =
    price && price.eur > 0 && price.usd > 0 && chain && chain.height > 0 && aged
      ? {
          date: aged.generatedAt.slice(0, 10),
          priceUsd: price.usd,
          priceEur: price.eur,
          currentH: hForBlock(chain.height),
        }
      : null
  return {
    market,
    mapper,
    asOf: aged?.price.asOf ?? null,
    stale:
      error || aged?.price.status === "stale" || aged?.chain.status === "stale",
    unavailable: error || (snapshot !== null && !market),
    refresh: () => setAttempt((value) => value + 1),
  }
}
