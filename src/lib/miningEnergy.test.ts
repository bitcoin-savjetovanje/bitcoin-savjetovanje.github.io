/// <reference types="node" />

import { deepStrictEqual, equal, ok } from "node:assert/strict"
import { test } from "node:test"

import {
  estimateGigawattIntuition,
  estimateMiningEnergy,
  GIGAWATT_INTUITION_ASSUMPTIONS,
  MINING_ENERGY_ASSUMPTIONS,
} from "./miningEnergy.ts"

test("pretvara 1.000 EH/s u raspon snage prema učinkovitosti flote", () => {
  const estimate = estimateMiningEnergy(1_000)

  ok(estimate)
  equal(estimate.hashrateEh, 1_000)
  equal(estimate.lowerPowerGw, 15)
  equal(estimate.referencePowerGw, 25)
  equal(estimate.upperPowerGw, 35)
  equal(estimate.referencePlantEquivalent, 25)
  ok(Math.abs(estimate.targetIntervalEnergyGwh - 25 / 6) < 1e-12)
  ok(estimate.waterTonnesPerSecondAt100m > 25_490)
  ok(estimate.waterTonnesPerSecondAt100m < 25_500)
  ok(estimate.poolLiftsPerSecondAt100m > 10.19)
  ok(estimate.poolLiftsPerSecondAt100m < 10.2)
  equal(estimate.ledBulbsEquivalent, 2_500_000_000)
  ok(estimate.krskoNetPowerEquivalent > 35.91)
  ok(estimate.krskoNetPowerEquivalent < 35.92)
})

test("skalira procjenu linearno s hash rateom", () => {
  const estimate = estimateMiningEnergy(500)

  ok(estimate)
  equal(estimate.lowerPowerGw, 7.5)
  equal(estimate.referencePowerGw, 12.5)
  equal(estimate.upperPowerGw, 17.5)
  equal(estimate.referencePlantEquivalent, 12.5)
  ok(Math.abs(estimate.targetIntervalEnergyGwh - 12.5 / 6) < 1e-12)
})

test("odbija nevaljan ili nepozitivan hash rate", () => {
  equal(estimateMiningEnergy(0), null)
  equal(estimateMiningEnergy(-1), null)
  equal(estimateMiningEnergy(Number.NaN), null)
  equal(estimateMiningEnergy(Number.POSITIVE_INFINITY), null)
})

test("prevodi 1 GW u podizanje vode i svakodnevno mjerilo", () => {
  const intuition = estimateGigawattIntuition(1)

  ok(intuition)
  ok(intuition.waterTonnesPerSecond > 1_019)
  ok(intuition.waterTonnesPerSecond < 1_020)
  ok(intuition.poolLiftsPerSecond > 0.407)
  ok(intuition.poolLiftsPerSecond < 0.409)
  ok(intuition.secondsPerPoolLift > 2.45)
  ok(intuition.secondsPerPoolLift < 2.46)
  equal(intuition.ledBulbs, 100_000_000)
  ok(intuition.krskoNetPowerEquivalent > 1.436)
  ok(intuition.krskoNetPowerEquivalent < 1.437)
})

test("odbija nevaljanu snagu za intuitivnu usporedbu", () => {
  equal(estimateGigawattIntuition(0), null)
  equal(estimateGigawattIntuition(-1), null)
  equal(estimateGigawattIntuition(Number.NaN), null)
  equal(estimateGigawattIntuition(Number.POSITIVE_INFINITY), null)
})

test("zaključava javne pretpostavke metodologije", () => {
  deepStrictEqual(MINING_ENERGY_ASSUMPTIONS, {
    efficientFleetJoulesPerTerahash: 15,
    referenceFleetJoulesPerTerahash: 25,
    lessEfficientFleetJoulesPerTerahash: 35,
    referencePlantGigawatts: 1,
    targetBlockIntervalSeconds: 600,
  })

  deepStrictEqual(GIGAWATT_INTUITION_ASSUMPTIONS, {
    standardGravityMetersPerSecondSquared: 9.80665,
    waterLiftHeightMeters: 100,
    waterKilogramsPerCubicMeter: 1_000,
    poolLengthMeters: 50,
    poolWidthMeters: 25,
    poolDepthMeters: 2,
    ledBulbWatts: 10,
    krskoNetMegawatts: 696,
  })
})
