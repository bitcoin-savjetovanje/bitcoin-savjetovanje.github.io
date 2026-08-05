export const BITS_PER_BTC = 1_000_000
export const SATS_PER_BIT = 100

export type HalvingCountdown = {
  totalSeconds: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

function isNonNegativeFinite(value: number) {
  return Number.isFinite(value) && value >= 0
}

export function parseLocalizedBitcoinAmount(value: string) {
  const compact = value.trim().replace(/\s/g, "")
  if (!compact) return null

  const usesCroatianGrouping = /^\d{1,3}(\.\d{3})+$/.test(compact)
  const normalized = compact.includes(",")
    ? compact.replaceAll(".", "").replace(",", ".")
    : usesCroatianGrouping
      ? compact.replaceAll(".", "")
      : compact
  const parsed = Number(normalized)

  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null
}

export function getBitsPerEuro(btcEur: number) {
  if (!Number.isFinite(btcEur) || btcEur <= 0) return null
  return BITS_PER_BTC / btcEur
}

export function convertEurosToBits(euros: number, btcEur: number) {
  if (!isNonNegativeFinite(euros)) return null
  const rate = getBitsPerEuro(btcEur)
  return rate === null ? null : euros * rate
}

export function convertBitsToEuros(bits: number, btcEur: number) {
  if (!isNonNegativeFinite(bits) || !Number.isFinite(btcEur) || btcEur <= 0) {
    return null
  }
  return (bits / BITS_PER_BTC) * btcEur
}

export function getHalvingCountdown(
  estimatedHalvingAt: string,
  nowMs: number
): HalvingCountdown | null {
  const targetMs = Date.parse(estimatedHalvingAt)
  if (!Number.isFinite(targetMs) || !Number.isFinite(nowMs)) return null

  const totalSeconds = Math.max(0, Math.floor((targetMs - nowMs) / 1_000))
  const days = Math.floor(totalSeconds / 86_400)
  const hours = Math.floor((totalSeconds % 86_400) / 3_600)
  const minutes = Math.floor((totalSeconds % 3_600) / 60)
  const seconds = totalSeconds % 60

  return { totalSeconds, days, hours, minutes, seconds }
}
