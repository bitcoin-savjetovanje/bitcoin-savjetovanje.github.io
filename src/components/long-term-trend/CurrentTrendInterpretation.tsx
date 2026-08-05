import { useMemo } from "react"
import { CalendarClock, Gauge, History, Landmark } from "lucide-react"

import {
  MAX_H_VALUE,
  POWER_LAW_MAX_LEVEL,
  POWER_LAW_MIN_LEVEL,
  hForBlock,
  powerLawBandPosition,
  powerLawBandPrice,
  powerLawEquivalentH,
  powerLawZone,
  type BitcoinWaveDataset,
  type BitcoinWaveDateMapper,
  type PowerLawZone,
} from "@/lib/bitcoinWaveCalculator"

const MILLISECONDS_PER_DAY = 86_400_000

const dateFormatter = new Intl.DateTimeFormat("hr-HR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
})

const numberFormatter = new Intl.NumberFormat("hr-HR", {
  maximumFractionDigits: 0,
})

const percentageFormatter = new Intl.NumberFormat("hr-HR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

const ratioFormatter = new Intl.NumberFormat("hr-HR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const priceFormatter = new Intl.NumberFormat("hr-HR", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

const GAUGE_SEGMENTS = [
  { startLevel: -3, endLevel: -2, color: "oklch(0.48 0.065 220)" },
  { startLevel: -2, endLevel: -1, color: "oklch(0.6 0.07 220)" },
  { startLevel: -1, endLevel: 0, color: "oklch(0.72 0.06 220)" },
  { startLevel: 0, endLevel: 1, color: "oklch(0.47 0.07 155)" },
  { startLevel: 1, endLevel: 2, color: "oklch(0.58 0.07 125)" },
  { startLevel: 2, endLevel: 3, color: "oklch(0.68 0.09 85)" },
  { startLevel: 3, endLevel: 4, color: "oklch(0.62 0.1 50)" },
  { startLevel: 4, endLevel: 5, color: "var(--bitcoin-orange)" },
]

const GAUGE_LEVELS = Array.from(
  { length: POWER_LAW_MAX_LEVEL - POWER_LAW_MIN_LEVEL + 1 },
  (_, index) => POWER_LAW_MIN_LEVEL + index
)

const GAUGE_CENTER_X = 160
const GAUGE_CENTER_Y = 154
const GAUGE_RADIUS = 124
const GAUGE_START_ANGLE = 180
const GAUGE_SWEEP_ANGLE = 180

function gaugePoint(angle: number, radius = GAUGE_RADIUS) {
  const radians = (angle * Math.PI) / 180
  return {
    x: GAUGE_CENTER_X + radius * Math.cos(radians),
    y: GAUGE_CENTER_Y + radius * Math.sin(radians),
  }
}

function gaugeArcPath(startAngle: number, endAngle: number) {
  const start = gaugePoint(startAngle)
  const end = gaugePoint(endAngle)
  return `M ${start.x} ${start.y} A ${GAUGE_RADIUS} ${GAUGE_RADIUS} 0 0 1 ${end.x} ${end.y}`
}

function gaugePositionForLevel(level: number) {
  const clampedLevel = Math.min(
    POWER_LAW_MAX_LEVEL,
    Math.max(POWER_LAW_MIN_LEVEL, level)
  )

  if (clampedLevel <= 0) {
    return (
      ((clampedLevel - POWER_LAW_MIN_LEVEL) / (0 - POWER_LAW_MIN_LEVEL)) * 50
    )
  }

  return 50 + (clampedLevel / POWER_LAW_MAX_LEVEL) * 50
}

function gaugeAngleForLevel(level: number) {
  return (
    GAUGE_START_ANGLE + (gaugePositionForLevel(level) / 100) * GAUGE_SWEEP_ANGLE
  )
}

type HistoricalZoneStats = {
  matchingDays: number
  totalDays: number
  share: number
  firstDate: string
  lastDate: string
  latestRunDays: number | null
  latestRunStartDate: string | null
}

type CurrentTrendInterpretationProps = {
  dataset: BitcoinWaveDataset | null
  mapper: BitcoinWaveDateMapper | null
  date: string
  block: number
  price: number
  priceIsLive: boolean
}

function levelLabel(level: number) {
  return level < 0 ? `PL−${Math.abs(level)}` : `PL${level}`
}

function zoneLabel(zone: PowerLawZone | null) {
  if (!zone) return "zona nije dostupna"
  if (zone.kind === "below") return `ispod ${levelLabel(POWER_LAW_MIN_LEVEL)}`
  if (zone.kind === "above") return `iznad ${levelLabel(POWER_LAW_MAX_LEVEL)}`
  return `između ${levelLabel(zone.lowerLevel as number)} i ${levelLabel(
    zone.upperLevel as number
  )}`
}

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`))
}

function formatPercent(value: number) {
  return `${percentageFormatter.format(Math.abs(value) * 100)} %`
}

function plural(value: number, forms: [string, string, string]) {
  const lastTwo = value % 100
  const last = value % 10
  if (last === 1 && lastTwo !== 11) return forms[0]
  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return forms[1]
  return forms[2]
}

function approximateDuration(firstDate: string, secondDate: string) {
  const first = Date.parse(`${firstDate}T00:00:00Z`)
  const second = Date.parse(`${secondDate}T00:00:00Z`)
  if (!Number.isFinite(first) || !Number.isFinite(second)) return "—"

  const days = Math.abs(Math.round((second - first) / MILLISECONDS_PER_DAY))
  if (days < 45) return `${days} ${plural(days, ["dan", "dana", "dana"])}`

  const months = Math.max(1, Math.round(days / 30.4375))
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  if (years === 0) {
    return `${months} ${plural(months, ["mjesec", "mjeseca", "mjeseci"])}`
  }

  const yearText = `${years} ${plural(years, ["godinu", "godine", "godina"])}`
  if (remainingMonths === 0) return yearText
  return `${yearText} i ${remainingMonths} ${plural(remainingMonths, [
    "mjesec",
    "mjeseca",
    "mjeseci",
  ])}`
}

function historicalZoneStats(
  dataset: BitcoinWaveDataset,
  mapper: BitcoinWaveDateMapper,
  currentZoneKey: string
): HistoricalZoneStats | null {
  const observations = dataset.observations.filter(
    ([h, price]) => Number.isFinite(h) && Number.isFinite(price) && price > 0
  )
  if (observations.length < 2) return null

  const intervals: Array<{
    key: string
    days: number
    startDate: string
  }> = []
  let totalDays = 0
  let matchingDays = 0

  for (let index = 0; index < observations.length - 1; index += 1) {
    const [leftH, leftPrice] = observations[index]
    const [rightH, rightPrice] = observations[index + 1]
    const startDate = mapper.dateForH(leftH)
    const endDate = mapper.dateForH(rightH)
    const start = Date.parse(`${startDate}T00:00:00Z`)
    const end = Date.parse(`${endDate}T00:00:00Z`)
    const days = (end - start) / MILLISECONDS_PER_DAY
    if (!Number.isFinite(days) || days <= 0) continue

    const midpointH = (leftH + rightH) / 2
    const midpointPrice = Math.sqrt(leftPrice * rightPrice)
    const intervalZone = powerLawZone(midpointH, midpointPrice)
    if (!intervalZone) continue

    intervals.push({ key: intervalZone.key, days, startDate })
    totalDays += days
    if (intervalZone.key === currentZoneKey) matchingDays += days
  }

  if (totalDays <= 0 || intervals.length === 0) return null

  let latestRunDays: number | null = null
  let latestRunStartDate: string | null = null
  if (intervals.at(-1)?.key === currentZoneKey) {
    latestRunDays = 0
    for (let index = intervals.length - 1; index >= 0; index -= 1) {
      const interval = intervals[index]
      if (interval.key !== currentZoneKey) break
      latestRunDays += interval.days
      latestRunStartDate = interval.startDate
    }
  }

  return {
    matchingDays,
    totalDays,
    share: matchingDays / totalDays,
    firstDate: mapper.dateForH(observations[0][0]),
    lastDate: mapper.dateForH(observations.at(-1)![0]),
    latestRunDays,
    latestRunStartDate,
  }
}

export function CurrentTrendInterpretation({
  dataset,
  mapper,
  date,
  block,
  price,
  priceIsLive,
}: CurrentTrendInterpretationProps) {
  const interpretation = useMemo(() => {
    if (!mapper || !Number.isFinite(price) || price <= 0) return null

    const h = hForBlock(block)
    const pl0 = powerLawBandPrice(h, 0)
    const lowerBand = powerLawBandPrice(h, POWER_LAW_MIN_LEVEL)
    const position = powerLawBandPosition(h, price)
    const zone = powerLawZone(h, price)
    const equivalentH = powerLawEquivalentH(price)
    const equivalentDate =
      equivalentH !== null && equivalentH >= 0 && equivalentH <= MAX_H_VALUE
        ? mapper.dateForH(equivalentH)
        : null
    const deviationFromPl0 = pl0 > 0 ? price / pl0 - 1 : null
    const ratioToPl0 = pl0 > 0 ? price / pl0 : null
    const lowerBandDistance = lowerBand > 0 ? lowerBand / price - 1 : null
    const history =
      dataset && zone ? historicalZoneStats(dataset, mapper, zone.key) : null

    return {
      h,
      pl0,
      lowerBand,
      position,
      zone,
      equivalentDate,
      deviationFromPl0,
      ratioToPl0,
      lowerBandDistance,
      history,
    }
  }, [block, dataset, mapper, price])

  if (!interpretation) return null

  const {
    pl0,
    lowerBand,
    position,
    zone,
    equivalentDate,
    deviationFromPl0,
    ratioToPl0,
    lowerBandDistance,
    history,
  } = interpretation
  const isBelowTrend = (deviationFromPl0 ?? 0) < -0.01
  const isAboveTrend = (deviationFromPl0 ?? 0) > 0.01
  const gaugeValue =
    position === null
      ? null
      : Math.min(POWER_LAW_MAX_LEVEL, Math.max(POWER_LAW_MIN_LEVEL, position))
  const gaugePosition =
    gaugeValue === null ? 50 : gaugePositionForLevel(gaugeValue)
  const gaugeNeedleAngle = -90 + (gaugePosition / 100) * GAUGE_SWEEP_ANGLE
  const pl0GaugeLabel = gaugePoint(gaugeAngleForLevel(0), GAUGE_RADIUS - 40)
  const historicalDays = history ? Math.round(history.matchingDays) : null
  const latestRunDays =
    history?.latestRunDays === null || history?.latestRunDays === undefined
      ? null
      : Math.round(history.latestRunDays)
  const deviationLabel =
    deviationFromPl0 === null
      ? "—"
      : Math.abs(deviationFromPl0) < 0.0005
        ? "na PL0"
        : `${formatPercent(deviationFromPl0)} ${
            deviationFromPl0 < 0 ? "ispod" : "iznad"
          } PL0`

  const timingText = (() => {
    if (!equivalentDate) {
      return "Ekvivalentni datum PL0 nalazi se izvan javno prikazanog raspona modela."
    }
    const equivalentTimestamp = Date.parse(`${equivalentDate}T00:00:00Z`)
    const currentTimestamp = Date.parse(`${date}T00:00:00Z`)
    const differenceDays = Math.round(
      Math.abs(equivalentTimestamp - currentTimestamp) / MILLISECONDS_PER_DAY
    )
    if (differenceDays <= 14) {
      return `Središnja PL0 putanja približno je na današnjoj tržišnoj cijeni (${formatDate(
        equivalentDate
      )}).`
    }
    const duration = approximateDuration(date, equivalentDate)
    if (equivalentTimestamp < currentTimestamp) {
      return `Središnja PL0 putanja istu je vrijednost imala ${formatDate(
        equivalentDate
      )} Prema ritmu modela, tržišna je cijena oko ${duration} iza današnje PL0 koordinate.`
    }
    return `Središnja PL0 putanja ovu vrijednost doseže ${formatDate(
      equivalentDate
    )} Prema ritmu modela, tržišna je cijena oko ${duration} ispred današnje PL0 koordinate.`
  })()

  const planningText = isBelowTrend
    ? "U odnosu na sam model, današnja kupnja odvija se ispod središnje PL0 putanje. To može biti koristan kontekst za plan redovite akumulacije, ali nije dovoljan razlog za povećanje kupnje ili odgađanje važnih troškova."
    : isAboveTrend
      ? "U odnosu na sam model, današnja kupnja odvija se iznad središnje PL0 putanje. To može biti koristan kontekst za tempo akumulacije, ali ne znači da cijena mora pasti niti da kupnju treba zaustaviti."
      : "Tržišna cijena trenutačno je blizu središnje PL0 putanje. Sam položaj uz PL0 ne daje smjer budućeg kretanja niti određuje tempo akumulacije."

  return (
    <div
      id="trenutna-interpretacija"
      className="mt-10 scroll-mt-24 border-t border-border/70 pt-10 sm:mt-12 sm:pt-12"
    >
      <div className="max-w-3xl">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
          <Gauge className="size-4" aria-hidden="true" />
          Položaj u modelu
        </div>
        <h3 className="text-2xl font-semibold tracking-[-0.03em] text-balance text-foreground sm:text-3xl">
          Trenutačna interpretacija cijene prema dugoročnom trendu
        </h3>
        <p className="mt-3 text-base leading-7 text-pretty text-muted-foreground sm:text-lg">
          Tekstualno očitanje tržišne cijene prema središnjoj PL0 putanji,
          donjem prikazanom pojasu i povijesti iste zone modela.
        </p>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <article className="min-w-0 rounded-[28px] bg-card p-5 shadow-[var(--shadow-border)] sm:p-6">
          <p className="text-xl leading-8 font-semibold text-pretty text-foreground sm:text-2xl sm:leading-9">
            Trenutačna cijena od{" "}
            <span className="tabular-nums">{priceFormatter.format(price)}</span>{" "}
            nalazi se <span className="text-primary">{zoneLabel(zone)}</span>.
          </p>
          <p className="mt-3 text-base leading-7 text-pretty text-muted-foreground">
            To je{" "}
            <strong className="font-semibold text-foreground tabular-nums">
              {deviationLabel}
            </strong>{" "}
            središnje putanje od{" "}
            <span className="font-medium text-foreground tabular-nums">
              {priceFormatter.format(pl0)}
            </span>
            . Oznake PL su deterministički pojasevi modela.
          </p>

          <dl className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="min-w-0 rounded-2xl bg-[var(--sea-soft)] p-5 shadow-[var(--shadow-border)] sm:p-6">
              <dt className="text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                Omjer prema PL0
              </dt>
              <dd className="mt-2 text-2xl font-semibold tracking-[-0.025em] break-words text-foreground tabular-nums">
                {ratioToPl0 === null
                  ? "—"
                  : `${ratioFormatter.format(ratioToPl0)}×`}
              </dd>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                trenutačne PL0 vrijednosti
              </p>
            </div>

            <div className="min-w-0 rounded-2xl bg-[var(--forest-soft)] p-5 shadow-[var(--shadow-border)] sm:p-6">
              <dt className="text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                Donji prikazani pojas
              </dt>
              <dd className="mt-2 text-2xl font-semibold tracking-[-0.025em] break-words text-foreground tabular-nums">
                {priceFormatter.format(lowerBand)}
              </dd>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {lowerBandDistance === null
                  ? "Udaljenost nije dostupna"
                  : `${formatPercent(lowerBandDistance)} ${
                      lowerBandDistance < 0 ? "ispod" : "iznad"
                    } tržišne cijene`}
              </p>
            </div>

            <div className="min-w-0 rounded-2xl bg-[var(--brass-soft)] p-5 shadow-[var(--shadow-border)] sm:p-6">
              <dt className="text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                Ista povijesna zona
              </dt>
              <dd className="mt-2 text-2xl font-semibold tracking-[-0.025em] break-words text-foreground tabular-nums">
                {history ? formatPercent(history.share) : "—"}
              </dd>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {historicalDays === null
                  ? "Povijest nije dostupna"
                  : `oko ${numberFormatter.format(historicalDays)} dana snimke`}
              </p>
            </div>
          </dl>

          <div className="mt-4 rounded-2xl bg-muted/55 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <CalendarClock
                className="mt-0.5 size-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <h4 className="font-semibold text-foreground">
                  PL0 ekvivalentni datum
                </h4>
                <p className="mt-1.5 text-sm leading-6 text-pretty text-muted-foreground sm:text-base sm:leading-7">
                  {timingText}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-2xl bg-[var(--sea-mist)] p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Landmark
                className="mt-0.5 size-5 shrink-0 text-[var(--sea-deep)]"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <h4 className="font-semibold text-foreground">
                  Kontekst za planiranje, ne signal
                </h4>
                <p className="mt-1.5 text-sm leading-6 text-pretty text-muted-foreground sm:text-base sm:leading-7">
                  {planningText}
                </p>
              </div>
            </div>
          </div>
        </article>

        <aside className="min-w-0 rounded-[28px] bg-muted/55 p-5 shadow-[var(--shadow-border)] sm:p-6">
          <div className="flex items-center gap-2">
            <Gauge className="size-5 text-primary" aria-hidden="true" />
            <h4
              id="current-pl-gauge-title"
              className="font-semibold text-foreground"
            >
              Položaj unutar PL raspona
            </h4>
          </div>
          <p
            id="current-pl-gauge-description"
            className="mt-2 text-sm leading-6 text-pretty text-muted-foreground"
          >
            Pokazivač smješta cijenu između najniže i najviše prikazane PL
            linije. Boja opisuje položaj, ne preporučenu radnju.
          </p>

          <div
            className="mt-5"
            role="meter"
            aria-labelledby="current-pl-gauge-title"
            aria-describedby="current-pl-gauge-description"
            aria-valuemin={POWER_LAW_MIN_LEVEL}
            aria-valuemax={POWER_LAW_MAX_LEVEL}
            aria-valuenow={gaugeValue ?? undefined}
            aria-valuetext={zoneLabel(zone)}
          >
            <svg
              className="mx-auto block h-auto w-full max-w-[390px]"
              viewBox="0 0 320 184"
              aria-hidden="true"
            >
              <path
                d={gaugeArcPath(
                  GAUGE_START_ANGLE,
                  GAUGE_START_ANGLE + GAUGE_SWEEP_ANGLE
                )}
                fill="none"
                stroke="var(--border)"
                strokeWidth="30"
                strokeLinecap="round"
                opacity="0.72"
              />

              {GAUGE_SEGMENTS.map((segment, index) => {
                const startAngle = gaugeAngleForLevel(segment.startLevel)
                const endAngle = gaugeAngleForLevel(segment.endLevel)
                return (
                  <path
                    key={`${segment.startLevel}:${segment.endLevel}`}
                    d={gaugeArcPath(startAngle, endAngle)}
                    fill="none"
                    stroke={segment.color}
                    strokeWidth="24"
                    strokeLinecap={
                      index === 0 || index === GAUGE_SEGMENTS.length - 1
                        ? "round"
                        : "butt"
                    }
                  />
                )
              })}

              {GAUGE_LEVELS.map((level) => {
                const angle = gaugeAngleForLevel(level)
                const inner = gaugePoint(angle, GAUGE_RADIUS - 14)
                const outer = gaugePoint(angle, GAUGE_RADIUS + 14)
                return (
                  <line
                    key={level}
                    x1={inner.x}
                    y1={inner.y}
                    x2={outer.x}
                    y2={outer.y}
                    stroke={
                      level === 0 ? "var(--foreground)" : "var(--background)"
                    }
                    strokeWidth={level === 0 ? 3.5 : 2.5}
                    opacity={level === 0 ? 0.94 : 0.9}
                  />
                )
              })}

              <g
                transform={`rotate(${gaugeNeedleAngle} ${GAUGE_CENTER_X} ${GAUGE_CENTER_Y})`}
              >
                <path
                  d={`M ${GAUGE_CENTER_X - 4.5} ${GAUGE_CENTER_Y + 4} L ${GAUGE_CENTER_X} ${GAUGE_CENTER_Y - 92} L ${GAUGE_CENTER_X + 4.5} ${GAUGE_CENTER_Y + 4} Z`}
                  fill="var(--foreground)"
                />
              </g>

              <circle
                cx={GAUGE_CENTER_X}
                cy={GAUGE_CENTER_Y}
                r="13"
                fill="var(--background)"
                stroke="var(--foreground)"
                strokeWidth="4"
              />
              <circle
                cx={GAUGE_CENTER_X}
                cy={GAUGE_CENTER_Y}
                r="4"
                fill="var(--primary)"
              />

              <text
                x="22"
                y="178"
                fill="var(--muted-foreground)"
                fontSize="14"
                fontWeight="600"
              >
                {levelLabel(POWER_LAW_MIN_LEVEL)}
              </text>
              <text
                x={pl0GaugeLabel.x}
                y={pl0GaugeLabel.y}
                fill="var(--muted-foreground)"
                fontSize="14"
                fontWeight="600"
                textAnchor="middle"
              >
                PL0
              </text>
              <text
                x="298"
                y="178"
                fill="var(--muted-foreground)"
                fontSize="14"
                fontWeight="600"
                textAnchor="end"
              >
                {levelLabel(POWER_LAW_MAX_LEVEL)}
              </text>
            </svg>
          </div>

          <div className="mt-6 rounded-2xl bg-background p-5 shadow-[var(--shadow-border)] sm:p-6">
            <p className="text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
              Trenutačna zona
            </p>
            <p className="mt-2 text-xl font-semibold text-balance text-foreground">
              {zoneLabel(zone)}
            </p>
          </div>

          <div className="mt-3 rounded-2xl bg-background p-5 shadow-[var(--shadow-border)] sm:p-6">
            <div className="flex items-start gap-3">
              <History
                className="mt-0.5 size-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <h4 className="font-semibold text-foreground">
                  Povijest iste zone
                </h4>
                {history ? (
                  <div className="mt-2 space-y-2 text-sm leading-6 text-pretty text-muted-foreground">
                    <p>
                      U zaključanoj snimci od {formatDate(history.firstDate)} do{" "}
                      {formatDate(history.lastDate)} ista zona zauzima oko{" "}
                      <strong className="font-semibold text-foreground tabular-nums">
                        {numberFormatter.format(historicalDays ?? 0)} dana
                      </strong>
                      , odnosno{" "}
                      <strong className="font-semibold text-foreground tabular-nums">
                        {formatPercent(history.share)}
                      </strong>{" "}
                      promatranog vremena s pozitivno zabilježenom cijenom.
                    </p>
                    <p>
                      {latestRunDays !== null && history.latestRunStartDate
                        ? `Posljednji zabilježeni neprekinuti boravak trajao je oko ${numberFormatter.format(
                            latestRunDays
                          )} dana, od ${formatDate(
                            history.latestRunStartDate
                          )} do ${formatDate(history.lastDate)}`
                        : "Posljednja povijesna snimka završila je u drugoj PL zoni od trenutačne."}
                    </p>
                  </div>
                ) : (
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Povijesna usporedba trenutačno nije dostupna.
                  </p>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>

      <p className="mt-5 max-w-5xl text-sm leading-6 text-pretty text-muted-foreground">
        {priceIsLive
          ? `Očitanje ${formatDate(date)} · tržišna cijena uživo · model PL0–PL raspona.`
          : `Očitanje ${formatDate(date)} · rezervna tržišna snimka · model PL0–PL raspona.`}{" "}
        PL−3 je najniža prikazana power-law linija, a ne zajamčeno tržišno dno.
        Ovaj prikaz nije financijski savjet niti signal za kupnju ili prodaju.
      </p>
    </div>
  )
}
