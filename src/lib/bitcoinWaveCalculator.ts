export const GENESIS_DATE = "2009-01-03"
export const BLOCKS_PER_HALVING = 210_000
export const TARGET_DAYS_PER_HALVING = 1_440
export const MODEL_H_STEP = 0.0025
export const MAX_BLOCK_HEIGHT = 7_108_062
export const MAX_H_VALUE = MAX_BLOCK_HEIGHT / BLOCKS_PER_HALVING

const MILLISECONDS_PER_DAY = 86_400_000
const POWER_LAW_INTERCEPT = 1.47
const POWER_LAW_SLOPE = 5.38
const POWER_LAW_DECAY_BASE = 0.79

export const POWER_LAW_MIN_LEVEL = -3
export const POWER_LAW_MAX_LEVEL = 5

export type PowerLawZone = {
  key: string
  kind: "below" | "between" | "above"
  lowerLevel: number | null
  upperLevel: number | null
}

export type BitcoinWaveObservation = [
  h: number,
  priceUsd: number,
  rootValue: number,
]

export type BitcoinWaveDataset = {
  modelDates: string[]
  observations: BitcoinWaveObservation[]
}

export type BitcoinWaveDateMapper = {
  dateForH: (h: number) => string
  hForDate: (date: string) => number
  dateForDays: (days: number) => string
  daysForDate: (date: string) => number
  maxDate: string
  maxDays: number
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value))
}

function timestampForDate(value: string) {
  return Date.parse(`${value}T00:00:00Z`)
}

function dateForTimestamp(value: number) {
  return new Date(value).toISOString().slice(0, 10)
}

export function addUtcCalendarYears(date: string, years: number) {
  const timestamp = timestampForDate(date)
  if (!Number.isFinite(timestamp) || !Number.isFinite(years)) return null

  const source = new Date(timestamp)
  const targetYear = source.getUTCFullYear() + Math.trunc(years)
  const month = source.getUTCMonth()
  const lastDayOfTargetMonth = new Date(
    Date.UTC(targetYear, month + 1, 0)
  ).getUTCDate()
  const day = Math.min(source.getUTCDate(), lastDayOfTargetMonth)

  return dateForTimestamp(Date.UTC(targetYear, month, day))
}

export function compoundAnnualGrowthRate(
  startValue: number,
  endValue: number,
  years: number
) {
  if (
    !Number.isFinite(startValue) ||
    !Number.isFinite(endValue) ||
    !Number.isFinite(years) ||
    startValue <= 0 ||
    endValue <= 0 ||
    years <= 0
  ) {
    return null
  }

  return Math.expm1((Math.log(endValue) - Math.log(startValue)) / years)
}

export function isBitcoinWaveDataset(
  value: unknown
): value is BitcoinWaveDataset {
  if (!value || typeof value !== "object") return false
  const candidate = value as Partial<BitcoinWaveDataset>
  return (
    Array.isArray(candidate.modelDates) &&
    candidate.modelDates.length > 1 &&
    Array.isArray(candidate.observations) &&
    candidate.observations.length > 0
  )
}

export function createBitcoinWaveDateMapper(
  modelDates: string[]
): BitcoinWaveDateMapper {
  if (modelDates.length < 2) {
    throw new Error("Datumsku mrežu modela nije moguće učitati.")
  }

  const timestamps = modelDates.map(timestampForDate)
  if (timestamps.some((value) => !Number.isFinite(value))) {
    throw new Error("Datumska mreža modela nije ispravna.")
  }

  const firstTimestamp = timestamps[0]
  const lastTimestamp = timestamps.at(-1) as number
  const lastKnownH = (timestamps.length - 1) * MODEL_H_STEP

  const dateForH = (rawH: number) => {
    const h = clamp(rawH, 0, MAX_H_VALUE)
    if (h <= lastKnownH) {
      const rawIndex = h / MODEL_H_STEP
      const leftIndex = Math.min(timestamps.length - 1, Math.floor(rawIndex))
      const rightIndex = Math.min(timestamps.length - 1, Math.ceil(rawIndex))
      if (leftIndex === rightIndex)
        return dateForTimestamp(timestamps[leftIndex])
      const ratio = rawIndex - leftIndex
      return dateForTimestamp(
        timestamps[leftIndex] +
          (timestamps[rightIndex] - timestamps[leftIndex]) * ratio
      )
    }

    return dateForTimestamp(
      lastTimestamp +
        (h - lastKnownH) * TARGET_DAYS_PER_HALVING * MILLISECONDS_PER_DAY
    )
  }

  const hForDate = (date: string) => {
    const rawTimestamp = timestampForDate(date)
    if (!Number.isFinite(rawTimestamp)) return 0
    const timestamp = Math.max(firstTimestamp, rawTimestamp)

    if (timestamp > lastTimestamp) {
      return clamp(
        lastKnownH +
          (timestamp - lastTimestamp) /
            (TARGET_DAYS_PER_HALVING * MILLISECONDS_PER_DAY),
        0,
        MAX_H_VALUE
      )
    }

    let low = 0
    let high = timestamps.length - 1
    while (low < high) {
      const middle = (low + high) >> 1
      if (timestamps[middle] < timestamp) low = middle + 1
      else high = middle
    }

    const rightIndex = low
    const leftIndex = Math.max(0, rightIndex - 1)
    if (leftIndex === rightIndex) return leftIndex * MODEL_H_STEP
    const span = timestamps[rightIndex] - timestamps[leftIndex]
    const ratio = span > 0 ? (timestamp - timestamps[leftIndex]) / span : 0
    return clamp((leftIndex + ratio) * MODEL_H_STEP, 0, MAX_H_VALUE)
  }

  const daysForDate = (date: string) => {
    const timestamp = timestampForDate(date)
    if (!Number.isFinite(timestamp)) return 0
    return Math.round((timestamp - firstTimestamp) / MILLISECONDS_PER_DAY)
  }

  const dateForDays = (rawDays: number) =>
    dateForTimestamp(
      firstTimestamp +
        clamp(Math.round(rawDays), 0, Number.MAX_SAFE_INTEGER) *
          MILLISECONDS_PER_DAY
    )

  const maxDate = dateForH(MAX_H_VALUE)

  return {
    dateForH,
    hForDate,
    dateForDays,
    daysForDate,
    maxDate,
    maxDays: daysForDate(maxDate),
  }
}

export function hForBlock(block: number) {
  return clamp(block, 0, MAX_BLOCK_HEIGHT) / BLOCKS_PER_HALVING
}

export function blockForH(h: number) {
  return Math.round(clamp(h, 0, MAX_H_VALUE) * BLOCKS_PER_HALVING)
}

export function powerLawMedianPrice(h: number) {
  return powerLawBandPrice(h, 0)
}

export function powerLawBandPrice(h: number, level: number) {
  if (!Number.isFinite(h) || !Number.isFinite(level) || h <= 0) return 0
  const center = POWER_LAW_INTERCEPT + POWER_LAW_SLOPE * Math.log10(h)
  const decay = POWER_LAW_DECAY_BASE ** (h + 1)
  return 10 ** (center + (level / 3) * decay)
}

export function powerLawBandPosition(h: number, price: number) {
  if (!Number.isFinite(h) || !Number.isFinite(price) || h <= 0 || price <= 0) {
    return null
  }

  const center = POWER_LAW_INTERCEPT + POWER_LAW_SLOPE * Math.log10(h)
  const decay = POWER_LAW_DECAY_BASE ** (h + 1)
  return (3 * (Math.log10(price) - center)) / decay
}

export function powerLawZone(h: number, price: number): PowerLawZone | null {
  const position = powerLawBandPosition(h, price)
  if (position === null) return null

  if (position < POWER_LAW_MIN_LEVEL) {
    return {
      key: `below:${POWER_LAW_MIN_LEVEL}`,
      kind: "below",
      lowerLevel: null,
      upperLevel: POWER_LAW_MIN_LEVEL,
    }
  }

  if (position > POWER_LAW_MAX_LEVEL) {
    return {
      key: `above:${POWER_LAW_MAX_LEVEL}`,
      kind: "above",
      lowerLevel: POWER_LAW_MAX_LEVEL,
      upperLevel: null,
    }
  }

  const lowerLevel = Math.max(
    POWER_LAW_MIN_LEVEL,
    Math.min(POWER_LAW_MAX_LEVEL - 1, Math.floor(position))
  )
  const upperLevel = lowerLevel + 1
  return {
    key: `between:${lowerLevel}:${upperLevel}`,
    kind: "between",
    lowerLevel,
    upperLevel,
  }
}

export function powerLawEquivalentH(price: number) {
  if (!Number.isFinite(price) || price <= 0) return null
  return 10 ** ((Math.log10(price) - POWER_LAW_INTERCEPT) / POWER_LAW_SLOPE)
}

export function hClockTime(h: number) {
  if (!Number.isFinite(h)) return "Nije dostupno"
  const fraction = h - Math.floor(h)
  const totalSeconds = Math.floor(fraction * 86_400)
  const hours = Math.floor(totalSeconds / 3_600)
  const minutes = Math.floor((totalSeconds % 3_600) / 60)
  const seconds = totalSeconds % 60
  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":")
}

export function blockReward(block: number) {
  if (!Number.isFinite(block) || block < 0) return 0
  const epoch = Math.floor(block / BLOCKS_PER_HALVING)
  return 50 / 2 ** epoch
}

export function circulatingSupply(block: number) {
  if (!Number.isFinite(block) || block < 0) return 0
  let remainingBlocks = Math.floor(block) + 1
  let reward = 50
  let supply = 0

  while (remainingBlocks > 0) {
    const blocksInEpoch = Math.min(remainingBlocks, BLOCKS_PER_HALVING)
    supply += blocksInEpoch * reward
    remainingBlocks -= blocksInEpoch
    reward /= 2
  }

  return supply
}

export function minedPercentage(block: number) {
  return (circulatingSupply(block) / 21_000_000) * 100
}

export function closestHistoricalPrice(
  observations: BitcoinWaveObservation[],
  h: number
) {
  if (observations.length === 0 || h < observations[0][0]) return null
  const last = observations.at(-1) as BitcoinWaveObservation
  if (h > last[0]) return null

  let low = 0
  let high = observations.length - 1
  while (low < high) {
    const middle = (low + high) >> 1
    if (observations[middle][0] < h) low = middle + 1
    else high = middle
  }

  const right = observations[low]
  const left = observations[Math.max(0, low - 1)]
  return Math.abs(left[0] - h) <= Math.abs(right[0] - h) ? left[1] : right[1]
}
