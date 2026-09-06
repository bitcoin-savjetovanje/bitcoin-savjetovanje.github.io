import { isBitcoinWaveDataset } from "./bitcoinWaveCalculator.ts"

export const BITCOIN_WAVE_DATASET_PATH =
  "/dugorocni-trend/graf/bitcoin-wave-rootchart-v1.json?v=20260715-h12"

export async function fetchBitcoinWaveDataset(signal: AbortSignal) {
  const response = await fetch(BITCOIN_WAVE_DATASET_PATH, {
    cache: "no-cache",
    signal,
  })
  if (!response.ok) throw new Error(`Podaci modela: HTTP ${response.status}`)
  const value: unknown = await response.json()
  if (!isBitcoinWaveDataset(value)) {
    throw new Error("Podaci modela nisu u očekivanom formatu.")
  }
  return value
}
