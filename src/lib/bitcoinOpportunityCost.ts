import {
  addUtcCalendarYears,
  compoundAnnualGrowthRate,
  powerLawMedianPrice,
  type BitcoinWaveDateMapper,
} from "./bitcoinWaveCalculator.ts"

export const OPPORTUNITY_HORIZONS = [1, 5, 10, 30] as const

export type BitcoinOpportunityMarket = {
  date: string
  priceUsd: number
  priceEur: number
  currentH: number
}

export type BitcoinOpportunityProjection = {
  years: number
  targetDate: string
  futurePl0Usd: number
  growthFactor: number
  marketToPl0Cagr: number
  pl0ToPl0Cagr: number
  totalChange: number
  futureBtcEurModel: number
}

/** Calendar-year endpoints; today's market, not today's PL0, funds the scenario. */
export function projectBitcoinOpportunity(
  market: BitcoinOpportunityMarket,
  mapper: BitcoinWaveDateMapper,
  years: number
): BitcoinOpportunityProjection | null {
  if (
    ![market.priceUsd, market.priceEur, market.currentH, years].every(
      Number.isFinite
    ) ||
    market.priceUsd <= 0 ||
    market.priceEur <= 0 ||
    market.currentH <= 0 ||
    !Number.isInteger(years) ||
    years <= 0 ||
    years > 30 ||
    !Number.isFinite(Date.parse(`${market.date}T00:00:00Z`))
  )
    return null
  const targetDate = addUtcCalendarYears(market.date, years)
  if (!targetDate || targetDate > mapper.maxDate) return null
  const futurePl0Usd = powerLawMedianPrice(mapper.hForDate(targetDate))
  const currentPl0 = powerLawMedianPrice(market.currentH)
  const marketToPl0Cagr = compoundAnnualGrowthRate(
    market.priceUsd,
    futurePl0Usd,
    years
  )
  const pl0ToPl0Cagr = compoundAnnualGrowthRate(currentPl0, futurePl0Usd, years)
  const growthFactor = futurePl0Usd / market.priceUsd
  const futureBtcEurModel = market.priceEur * growthFactor
  if (
    marketToPl0Cagr === null ||
    pl0ToPl0Cagr === null ||
    ![growthFactor, futureBtcEurModel].every((v) => Number.isFinite(v) && v > 0)
  )
    return null
  return {
    years,
    targetDate,
    futurePl0Usd,
    growthFactor,
    marketToPl0Cagr,
    pl0ToPl0Cagr,
    totalChange: growthFactor - 1,
    futureBtcEurModel,
  }
}
