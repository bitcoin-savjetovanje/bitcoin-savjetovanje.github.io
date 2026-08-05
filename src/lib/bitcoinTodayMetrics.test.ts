import assert from "node:assert/strict"
import test from "node:test"

import {
  BITS_PER_BTC,
  SATS_PER_BIT,
  convertBitsToEuros,
  convertEurosToBits,
  getBitsPerEuro,
  getHalvingCountdown,
  parseLocalizedBitcoinAmount,
} from "./bitcoinTodayMetrics.ts"

test("definira bit kao 100 satoshija po omjeru 1 BTC = 1.000.000 bitova", () => {
  assert.equal(BITS_PER_BTC, 1_000_000)
  assert.equal(SATS_PER_BIT, 100)
  assert.equal(BITS_PER_BTC * SATS_PER_BIT, 100_000_000)
})

test("pretvara eure u bitove i bitove natrag u eure", () => {
  const btcEur = 50_000
  assert.equal(getBitsPerEuro(btcEur), 20)
  assert.equal(convertEurosToBits(100, btcEur), 2_000)
  assert.equal(convertBitsToEuros(2_000, btcEur), 100)
})

test("ne vraća konverziju za nevaljanu cijenu ili negativan unos", () => {
  assert.equal(getBitsPerEuro(0), null)
  assert.equal(convertEurosToBits(-1, 50_000), null)
  assert.equal(convertBitsToEuros(-1, 50_000), null)
})

test("čita hrvatske tisućice i decimalni zarez bez zabune s decimalnom točkom", () => {
  assert.equal(parseLocalizedBitcoinAmount("1.000"), 1_000)
  assert.equal(parseLocalizedBitcoinAmount("1.234,56"), 1_234.56)
  assert.equal(parseLocalizedBitcoinAmount("1,5"), 1.5)
  assert.equal(parseLocalizedBitcoinAmount("1.5"), 1.5)
  assert.equal(parseLocalizedBitcoinAmount("-1"), null)
})

test("countdown rastavlja preostalo vrijeme i zaustavlja se na nuli", () => {
  const now = Date.parse("2028-01-01T00:00:00.000Z")
  const target = "2028-01-03T03:04:05.000Z"

  assert.deepEqual(getHalvingCountdown(target, now), {
    totalSeconds: 183_845,
    days: 2,
    hours: 3,
    minutes: 4,
    seconds: 5,
  })
  assert.deepEqual(getHalvingCountdown(target, Date.parse(target) + 1_000), {
    totalSeconds: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
})
