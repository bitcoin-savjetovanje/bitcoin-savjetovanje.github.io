export const MINING_ENERGY_ASSUMPTIONS = {
  efficientFleetJoulesPerTerahash: 15,
  referenceFleetJoulesPerTerahash: 25,
  lessEfficientFleetJoulesPerTerahash: 35,
  referencePlantGigawatts: 1,
  targetBlockIntervalSeconds: 10 * 60,
} as const

export const GIGAWATT_INTUITION_ASSUMPTIONS = {
  standardGravityMetersPerSecondSquared: 9.80665,
  waterLiftHeightMeters: 100,
  waterKilogramsPerCubicMeter: 1_000,
  poolLengthMeters: 50,
  poolWidthMeters: 25,
  poolDepthMeters: 2,
  ledBulbWatts: 10,
  krskoNetMegawatts: 696,
} as const

export type GigawattIntuition = {
  powerGw: number
  waterTonnesPerSecond: number
  poolLiftsPerSecond: number
  secondsPerPoolLift: number
  ledBulbs: number
  krskoNetPowerEquivalent: number
}

export type MiningEnergyEstimate = {
  hashrateEh: number
  lowerPowerGw: number
  referencePowerGw: number
  upperPowerGw: number
  referencePlantEquivalent: number
  targetIntervalEnergyGwh: number
  waterTonnesPerSecondAt100m: number
  poolLiftsPerSecondAt100m: number
  ledBulbsEquivalent: number
  krskoNetPowerEquivalent: number
}

/**
 * Prevodi električnu snagu u idealizirani mehanički rad podizanja vode.
 *
 * Račun koristi P = m × g × h / t i pretpostavlja pretvorbu bez gubitaka.
 * Bazen je namjerno definiran dimenzijama 50 × 25 × 2 m kako usporedba ne bi
 * ovisila o neizrečenoj pretpostavci volumena.
 */
export function estimateGigawattIntuition(
  powerGw: number
): GigawattIntuition | null {
  if (!Number.isFinite(powerGw) || powerGw <= 0) return null

  const powerWatts = powerGw * 1_000_000_000
  const waterKilogramsPerSecond =
    powerWatts /
    (GIGAWATT_INTUITION_ASSUMPTIONS.standardGravityMetersPerSecondSquared *
      GIGAWATT_INTUITION_ASSUMPTIONS.waterLiftHeightMeters)
  const waterTonnesPerSecond = waterKilogramsPerSecond / 1_000
  const poolTonnes =
    GIGAWATT_INTUITION_ASSUMPTIONS.poolLengthMeters *
    GIGAWATT_INTUITION_ASSUMPTIONS.poolWidthMeters *
    GIGAWATT_INTUITION_ASSUMPTIONS.poolDepthMeters *
    (GIGAWATT_INTUITION_ASSUMPTIONS.waterKilogramsPerCubicMeter / 1_000)
  const poolLiftsPerSecond = waterTonnesPerSecond / poolTonnes

  return {
    powerGw,
    waterTonnesPerSecond,
    poolLiftsPerSecond,
    secondsPerPoolLift: 1 / poolLiftsPerSecond,
    ledBulbs: powerWatts / GIGAWATT_INTUITION_ASSUMPTIONS.ledBulbWatts,
    krskoNetPowerEquivalent:
      (powerGw * 1_000) / GIGAWATT_INTUITION_ASSUMPTIONS.krskoNetMegawatts,
  }
}

/**
 * Pretvara hash rate u ilustrativnu električnu snagu.
 *
 * 1 EH/s = 1.000.000 TH/s, a J/TH × TH/s = J/s = W.
 * Procjena zato ovisi o pretpostavljenoj učinkovitosti rudarske flote i nije
 * mjerenje stvarne potrošnje električne energije.
 */
export function estimateMiningEnergy(
  hashrateEh: number
): MiningEnergyEstimate | null {
  if (!Number.isFinite(hashrateEh) || hashrateEh <= 0) return null

  const powerGw = (joulesPerTerahash: number) =>
    (hashrateEh * joulesPerTerahash) / 1_000
  const referencePowerGw = powerGw(
    MINING_ENERGY_ASSUMPTIONS.referenceFleetJoulesPerTerahash
  )
  const intuition = estimateGigawattIntuition(referencePowerGw)

  if (!intuition) return null

  return {
    hashrateEh,
    lowerPowerGw: powerGw(
      MINING_ENERGY_ASSUMPTIONS.efficientFleetJoulesPerTerahash
    ),
    referencePowerGw,
    upperPowerGw: powerGw(
      MINING_ENERGY_ASSUMPTIONS.lessEfficientFleetJoulesPerTerahash
    ),
    referencePlantEquivalent:
      referencePowerGw / MINING_ENERGY_ASSUMPTIONS.referencePlantGigawatts,
    targetIntervalEnergyGwh:
      referencePowerGw *
      (MINING_ENERGY_ASSUMPTIONS.targetBlockIntervalSeconds / (60 * 60)),
    waterTonnesPerSecondAt100m: intuition.waterTonnesPerSecond,
    poolLiftsPerSecondAt100m: intuition.poolLiftsPerSecond,
    ledBulbsEquivalent: intuition.ledBulbs,
    krskoNetPowerEquivalent: intuition.krskoNetPowerEquivalent,
  }
}
