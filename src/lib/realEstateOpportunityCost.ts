import type { BitcoinOpportunityProjection } from "./bitcoinOpportunityCost.ts"

export type RealEstateInputs = {
  propertyValue: number
  monthlyRent: number
  annualCosts: number
  propertyGrowth: number
  rentGrowth: number
  saleCostRate: number
}

/** Rates are fractions. Bounds keep input errors and overflow out of every output. */
export function validRealEstateInputs(input: RealEstateInputs) {
  return (
    Object.values(input).every(Number.isFinite) &&
    input.propertyValue > 0 &&
    input.propertyValue <= 1e12 &&
    input.monthlyRent >= 0 &&
    input.monthlyRent <= 1e12 &&
    input.annualCosts >= 0 &&
    input.annualCosts <= 1e12 &&
    input.propertyGrowth >= -1 &&
    input.propertyGrowth <= 10 &&
    input.rentGrowth >= -1 &&
    input.rentGrowth <= 10 &&
    input.saleCostRate >= 0 &&
    input.saleCostRate <= 1
  )
}

/** Explicit annual sum remains stable at zero and near-zero rent growth. */
export function rentGrowthFactor(rate: number, years: number) {
  if (
    !Number.isFinite(rate) ||
    rate < -1 ||
    rate > 10 ||
    !Number.isInteger(years) ||
    years < 0 ||
    years > 30
  )
    return null
  let sum = 0
  for (let year = 0; year < years; year++) sum += (1 + rate) ** year
  return sum
}

export function projectRealEstate(input: RealEstateInputs, years: number) {
  if (!validRealEstateInputs(input)) return null
  const rentFactor = rentGrowthFactor(input.rentGrowth, years)
  if (rentFactor === null) return null
  const endingPropertyValue =
    input.propertyValue * (1 + input.propertyGrowth) ** years
  const cumulativeNetRent =
    12 * input.monthlyRent * rentFactor - input.annualCosts * years
  return {
    endingPropertyValue,
    cumulativeNetRent,
    economicValue: endingPropertyValue + cumulativeNetRent,
    rentFactor,
  }
}

export function compareRealEstate(
  input: RealEstateInputs,
  btc: BitcoinOpportunityProjection,
  currentBtcEur: number
) {
  const property = projectRealEstate(input, btc.years)
  if (
    !property ||
    !Number.isFinite(currentBtcEur) ||
    currentBtcEur <= 0 ||
    !Number.isFinite(btc.growthFactor) ||
    btc.growthFactor <= 0 ||
    !Number.isFinite(btc.futureBtcEurModel) ||
    btc.futureBtcEurModel <= 0 ||
    btc.years <= 0
  )
    return null
  const netSaleProceeds = input.propertyValue * (1 - input.saleCostRate)
  const btcScenarioEndValueEur = netSaleProceeds * btc.growthFactor
  const currentPropertyBtc = input.propertyValue / currentBtcEur
  const futurePropertyBtc = property.economicValue / btc.futureBtcEurModel
  const requiredEndPropertyValue =
    btcScenarioEndValueEur - property.cumulativeNetRent
  // Below zero there is no nonnegative terminal property value solving equality.
  const requiredGrowth =
    requiredEndPropertyValue < 0
      ? null
      : (requiredEndPropertyValue / input.propertyValue) ** (1 / btc.years) - 1
  const requiredMonthlyRent =
    (btcScenarioEndValueEur -
      property.endingPropertyValue +
      input.annualCosts * btc.years) /
    (12 * property.rentFactor)
  return {
    ...property,
    netSaleProceeds,
    btcScenarioEndValueEur,
    btcObtainableToday: netSaleProceeds / currentBtcEur,
    currentPropertyBtc,
    futurePropertyBtc,
    btcDenominatedChange: futurePropertyBtc / currentPropertyBtc - 1,
    propertyVsBitcoin:
      btcScenarioEndValueEur > 0
        ? property.economicValue / btcScenarioEndValueEur - 1
        : null,
    opportunityGapEur: property.economicValue - btcScenarioEndValueEur,
    requiredGrowth,
    requiredMonthlyRent,
  }
}
