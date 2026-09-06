import { bitcoinSnapshotEndpoint } from "./bitcoinSnapshot.ts"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import {
  projectBitcoinOpportunity,
  type BitcoinOpportunityProjection,
} from "./bitcoinOpportunityCost.ts"
import {
  compareRealEstate,
  projectRealEstate,
  rentGrowthFactor,
  validRealEstateInputs,
  type RealEstateInputs,
} from "./realEstateOpportunityCost.ts"
import {
  addUtcCalendarYears,
  compoundAnnualGrowthRate,
  createBitcoinWaveDateMapper,
  powerLawMedianPrice,
} from "./bitcoinWaveCalculator.ts"

const input: RealEstateInputs = {
  propertyValue: 250_000,
  monthlyRent: 0,
  annualCosts: 0,
  propertyGrowth: 0,
  rentGrowth: 0,
  saleCostRate: 0,
}
function scenario(years = 5, factor = 4): BitcoinOpportunityProjection {
  return {
    years,
    targetDate: "2031-09-06",
    futurePl0Usd: 100_000 * factor,
    growthFactor: factor,
    marketToPl0Cagr: factor ** (1 / years) - 1,
    pl0ToPl0Cagr: 0.2,
    totalChange: factor - 1,
    futureBtcEurModel: 80_000 * factor,
  }
}
function close(actual: number, expected: number) {
  assert.ok(
    Math.abs(actual - expected) <= Math.max(1, Math.abs(expected)) * 1e-10,
    `${actual} != ${expected}`
  )
}

test("A: identical effective growth without rent or costs breaks even at all horizons", () => {
  for (const years of [1, 5, 10, 30]) {
    const btc = scenario(years)
    const result = compareRealEstate(
      { ...input, propertyGrowth: btc.marketToPl0Cagr },
      btc,
      80_000
    )!
    close(result.btcDenominatedChange, 0)
    close(result.propertyVsBitcoin!, 0)
  }
})
test("B: flat property loses BTC purchasing power when BTC grows", () => {
  const result = compareRealEstate(input, scenario(), 80_000)!
  close(result.btcDenominatedChange, -0.75)
  close(result.futurePropertyBtc, input.propertyValue / 320_000)
})
test("C: positive rent improves the result and uses first-year rent before growth", () => {
  const base = projectRealEstate(input, 5)!
  const rented = projectRealEstate(
    { ...input, monthlyRent: 1000, rentGrowth: 0.1 },
    5
  )!
  assert.ok(rented.economicValue > base.economicValue)
  close(
    rented.cumulativeNetRent,
    12000 * (1 + 1.1 + 1.1 ** 2 + 1.1 ** 3 + 1.1 ** 4)
  )
  close(
    projectRealEstate({ ...input, monthlyRent: 1000, rentGrowth: 0.1 }, 1)!
      .cumulativeNetRent,
    12000
  )
})
test("D: costs above rent remain a negative cash flow, including negative economic value", () => {
  close(
    projectRealEstate({ ...input, monthlyRent: 100, annualCosts: 2000 }, 5)!
      .cumulativeNetRent,
    -4000
  )
  const result = compareRealEstate(
    { ...input, annualCosts: 100_000 },
    scenario(),
    80_000
  )!
  assert.ok(result.economicValue < 0)
  assert.ok(result.futurePropertyBtc < 0)
})
test("E: required appreciation reproduces the BTC target with sale costs and growing rent", () => {
  for (const years of [1, 5, 10, 30]) {
    const assumptions = {
      ...input,
      monthlyRent: 900,
      annualCosts: 2500,
      rentGrowth: 0.03,
      saleCostRate: 0.05,
    }
    const result = compareRealEstate(assumptions, scenario(years, 8), 80_000)!
    const equal = projectRealEstate(
      { ...assumptions, propertyGrowth: result.requiredGrowth! },
      years
    )!
    close(equal.economicValue, result.btcScenarioEndValueEur)
  }
})
test("F: required rent reproduces BTC target including rent growth and all annual costs", () => {
  for (const years of [1, 5, 10, 30]) {
    for (const rentGrowth of [0, 1e-12, 0.04, -0.1, -1]) {
      const assumptions = {
        ...input,
        propertyGrowth: 0.03,
        rentGrowth,
        annualCosts: 3500,
        saleCostRate: 0.07,
      }
      const result = compareRealEstate(assumptions, scenario(years, 8), 80_000)!
      assert.ok(result.requiredMonthlyRent > 0)
      const equal = projectRealEstate(
        { ...assumptions, monthlyRent: result.requiredMonthlyRent },
        years
      )!
      close(equal.economicValue, result.btcScenarioEndValueEur)
    }
  }
})
test("G: 100 to 408.12 is 308.12% total change and about 32.48% CAGR", () => {
  close(408.12 / 100 - 1, 3.0812)
  const cagr = compoundAnnualGrowthRate(100, 408.12, 5)!
  assert.ok(Math.abs(cagr - 0.3248) < 0.0001)
  close(100 * (1 + cagr) ** 5, 408.12)
  assert.notEqual(cagr, 3.0812)
})
test("sale costs distinguish gross BTC purchasing power from the actual alternative", () => {
  const result = compareRealEstate(
    { ...input, saleCostRate: 0.1 },
    scenario(5, 1),
    80_000
  )!
  close(result.netSaleProceeds, 225_000)
  close(result.btcDenominatedChange, 0)
  close(result.propertyVsBitcoin!, 1 / 0.9 - 1)
  close(result.btcObtainableToday, 225_000 / 80_000)
})
test("100% sale cost produces no undefined ratio or fictional withdrawable balance", () => {
  const result = compareRealEstate(
    { ...input, saleCostRate: 1 },
    scenario(),
    80_000
  )!
  assert.equal(result.netSaleProceeds, 0)
  assert.equal(result.propertyVsBitcoin, null)
  assert.equal(result.requiredGrowth, -1)
})
test("negative break-even appreciation is valid; rent alone can exceed target", () => {
  const falling = compareRealEstate(input, scenario(5, 0.5), 80_000)!
  assert.ok(falling.requiredGrowth! < 0)
  close(
    projectRealEstate({ ...input, propertyGrowth: falling.requiredGrowth! }, 5)!
      .economicValue,
    falling.btcScenarioEndValueEur
  )
  const excessiveRent = compareRealEstate(
    { ...input, monthlyRent: 100_000 },
    scenario(),
    80_000
  )!
  assert.equal(excessiveRent.requiredGrowth, null)
  const exactRent = compareRealEstate(
    { ...input, monthlyRent: 1_000_000 / 60 },
    scenario(),
    80_000
  )!
  close(exactRent.requiredGrowth!, -1)
})
test("appreciation can make additional rent unnecessary", () => {
  const result = compareRealEstate(
    { ...input, propertyGrowth: 0.5 },
    scenario(),
    80_000
  )!
  assert.ok(result.requiredMonthlyRent < 0)
})
test("zero rent growth, -100% growth and year zero have defined sums", () => {
  assert.equal(rentGrowthFactor(0, 30), 30)
  assert.equal(rentGrowthFactor(-1, 30), 1)
  assert.equal(rentGrowthFactor(0, 0), 0)
  close(
    projectRealEstate({ ...input, monthlyRent: 1000 }, 0)!.economicValue,
    input.propertyValue
  )
  assert.equal(
    projectRealEstate({ ...input, propertyGrowth: -1 }, 1)!.endingPropertyValue,
    0
  )
})
test("invalid and nonfinite inputs or horizons are rejected", () => {
  for (const propertyValue of [0, -1, Infinity, NaN, 1e13])
    assert.equal(validRealEstateInputs({ ...input, propertyValue }), false)
  for (const rate of [-1.01, Infinity, NaN, 11])
    assert.equal(projectRealEstate({ ...input, rentGrowth: rate }, 5), null)
  for (const years of [-1, 1.5, 31, Infinity, NaN])
    assert.equal(projectRealEstate(input, years), null)
  assert.equal(compareRealEstate(input, scenario(), 0), null)
  assert.equal(compareRealEstate(input, scenario(0), 80_000), null)
})

const data = JSON.parse(
  readFileSync(
    new URL(
      "../../public/dugorocni-trend/graf/bitcoin-wave-rootchart-v1.json",
      import.meta.url
    ),
    "utf8"
  )
)
const mapper = createBitcoinWaveDateMapper(data.modelDates)
const market = {
  date: "2026-09-06",
  priceUsd: 100_000,
  priceEur: 80_000,
  currentH: 4.6,
}
test("shared PL0 date mapper and CAGR helpers supply all projection horizons", () => {
  for (const years of [1, 5, 10, 30]) {
    const result = projectBitcoinOpportunity(market, mapper, years)!
    assert.ok(result)
    const target = addUtcCalendarYears(market.date, years)!
    close(result.futurePl0Usd, powerLawMedianPrice(mapper.hForDate(target)))
    close(result.growthFactor, result.futurePl0Usd / market.priceUsd)
    close(
      result.marketToPl0Cagr,
      compoundAnnualGrowthRate(market.priceUsd, result.futurePl0Usd, years)!
    )
    close(
      result.pl0ToPl0Cagr,
      compoundAnnualGrowthRate(
        powerLawMedianPrice(market.currentH),
        result.futurePl0Usd,
        years
      )!
    )
    close(result.futureBtcEurModel, market.priceEur * result.growthFactor)
    assert.notEqual(result.marketToPl0Cagr, result.pl0ToPl0Cagr)
  }
})
test("no future FX forecast: changing current EUR price leaves EUR scenario multiplier unchanged", () => {
  const first = projectBitcoinOpportunity(market, mapper, 5)!
  const second = projectBitcoinOpportunity(
    { ...market, priceEur: 70_000 },
    mapper,
    5
  )!
  close(first.growthFactor, second.growthFactor)
  close(
    compareRealEstate(input, first, market.priceEur)!.btcScenarioEndValueEur,
    compareRealEstate(input, second, 70_000)!.btcScenarioEndValueEur
  )
})
test("invalid market data and out-of-model target dates never produce projections", () => {
  for (const priceUsd of [0, -1, NaN, Infinity])
    assert.equal(
      projectBitcoinOpportunity({ ...market, priceUsd }, mapper, 5),
      null
    )
  assert.equal(
    projectBitcoinOpportunity({ ...market, date: "invalid" }, mapper, 5),
    null
  )
  assert.equal(
    projectBitcoinOpportunity({ ...market, date: mapper.maxDate }, mapper, 30),
    null
  )
  assert.equal(projectBitcoinOpportunity(market, mapper, 0), null)
})
test("calendar-year projections preserve leap-day handling", () => {
  const leapMarket = { ...market, date: "2028-02-29" }
  assert.equal(
    projectBitcoinOpportunity(leapMarket, mapper, 1)!.targetDate,
    "2029-02-28"
  )
})

test("static GitHub Pages uses the existing canonical snapshot API only on the exact host", () => {
  assert.equal(
    bitcoinSnapshotEndpoint("bitcoin-savjetovanje.github.io"),
    "https://bitcoin-savjetovanje.com/api/bitcoin-snapshot"
  )
  for (const host of [
    "",
    "localhost",
    "bitcoin-savjetovanje.com",
    "bitcoin-savjetovanje.github.io.example.org",
  ]) {
    assert.equal(bitcoinSnapshotEndpoint(host), "/api/bitcoin-snapshot")
  }
})
