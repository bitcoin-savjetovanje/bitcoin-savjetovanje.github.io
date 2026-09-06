import { useEffect, useMemo, useRef, useState } from "react"
import {
  Bitcoin,
  Blocks,
  Calculator,
  CalendarDays,
  Minus,
  RefreshCw,
  Timer,
  TrendingDown,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { CurrentTrendInterpretation } from "@/components/long-term-trend/CurrentTrendInterpretation"
import {
  BLOCKS_PER_HALVING,
  GENESIS_DATE,
  MAX_BLOCK_HEIGHT,
  MAX_H_VALUE,
  addUtcCalendarYears,
  blockForH,
  blockReward,
  compoundAnnualGrowthRate,
  circulatingSupply,
  closestHistoricalPrice,
  createBitcoinWaveDateMapper,
  hClockTime,
  hForBlock,
  minedPercentage,
  powerLawMedianPrice,
  type BitcoinWaveDataset,
  type BitcoinWaveDateMapper,
} from "@/lib/bitcoinWaveCalculator"
import {
  fetchBitcoinSnapshot,
  type BitcoinSnapshot,
} from "@/lib/bitcoinSnapshot"

import { fetchBitcoinWaveDataset as fetchDataset } from "@/lib/bitcoinWaveData"
const FALLBACK_DATE = "2026-07-17"
const FALLBACK_BLOCK = 958_388
const FALLBACK_PRICE = 62_885
const SNAPSHOT_REFRESH_INTERVAL_MS = 60_000

const PROJECTION_HORIZONS = [
  { years: 1, label: "1 godina" },
  { years: 5, label: "5 godina" },
  { years: 10, label: "10 godina" },
  { years: 30, label: "30 godina" },
] as const

type Selection = {
  date: string
  days: number
  h: number
  block: number
}

type LiveState = {
  date: string
  block: number
  price: number
  isLive: boolean
  priceIsLive: boolean
}

const numberFormatter = new Intl.NumberFormat("hr-HR", {
  maximumFractionDigits: 0,
})

const dateFormatter = new Intl.DateTimeFormat("hr-HR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
})

const percentageFormatter = new Intl.NumberFormat("hr-HR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const inputClassName =
  "h-12 w-full rounded-xl border border-input bg-background px-3.5 text-base font-medium tabular-nums text-foreground shadow-[0_1px_2px_rgba(23,22,18,0.04)] outline-none transition-[border-color,box-shadow] duration-150 focus:border-ring focus:ring-3 focus:ring-ring/20 disabled:cursor-wait disabled:opacity-60"

function formatUsd(value: number | null) {
  if (value === null || !Number.isFinite(value)) return "Nije dostupno"
  const compact = Math.abs(value) >= 1_000_000
  return new Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "USD",
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: value < 100 ? 2 : compact ? 2 : 0,
  }).format(value)
}

function formatProjectedUsd(value: number | null) {
  if (value === null || !Number.isFinite(value)) return "—"
  return new Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

function formatCompoundRate(value: number | null) {
  if (value === null || !Number.isFinite(value)) return "—"
  if (Math.abs(value) < 0.000_000_5) return "0,00 %"
  const sign = value > 0 ? "+" : "−"
  return `${sign}${percentageFormatter.format(Math.abs(value) * 100)} %`
}

function formatDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`))
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value))
}

function selectionForH(mapper: BitcoinWaveDateMapper, rawH: number): Selection {
  const h = clamp(rawH, 0, MAX_H_VALUE)
  const date = mapper.dateForH(h)
  return {
    date,
    days: mapper.daysForDate(date),
    h,
    block: blockForH(h),
  }
}

function initialSelection(): Selection {
  return {
    date: FALLBACK_DATE,
    days: Math.round(
      (Date.parse(`${FALLBACK_DATE}T00:00:00Z`) -
        Date.parse(`${GENESIS_DATE}T00:00:00Z`)) /
        86_400_000
    ),
    h: hForBlock(FALLBACK_BLOCK),
    block: FALLBACK_BLOCK,
  }
}

function snapshotDate(
  snapshot: BitcoinSnapshot | null,
  mapper: BitcoinWaveDateMapper
) {
  const generatedDate = snapshot?.generatedAt.slice(0, 10)
  const today = generatedDate || new Date().toISOString().slice(0, 10)
  return today <= mapper.maxDate ? today : mapper.maxDate
}

function snapshotStatus(snapshot: BitcoinSnapshot | null) {
  if (!snapshot) {
    return "Rezervna tržišna snimka · podaci modela su dostupni"
  }

  const hasPrice = snapshot.price.value !== null
  const hasChain = snapshot.chain.value !== null
  if (hasPrice && hasChain) {
    return snapshot.price.status === "live" && snapshot.chain.status === "live"
      ? "Podaci uživo · jedinstvena Bitcoin snimka"
      : "Zadnja valjana Bitcoin snimka · dio podataka može kasniti"
  }

  if (hasPrice || hasChain) {
    return "Djelomična Bitcoin snimka · nedostupne vrijednosti imaju rezervu"
  }

  return "Rezervna tržišna snimka · podaci modela su dostupni"
}

function ResultItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border-b border-border/60 py-3 last:border-b-0">
      <dt className="text-sm leading-5 text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-base font-semibold break-words text-foreground tabular-nums">
        {value}
      </dd>
    </div>
  )
}

export function HTimeCalculator() {
  const [dataset, setDataset] = useState<BitcoinWaveDataset | null>(null)
  const [mapper, setMapper] = useState<BitcoinWaveDateMapper | null>(null)
  const [selection, setSelection] = useState<Selection>(initialSelection)
  const [liveState, setLiveState] = useState<LiveState>({
    date: FALLBACK_DATE,
    block: FALLBACK_BLOCK,
    price: FALLBACK_PRICE,
    isLive: false,
    priceIsLive: false,
  })
  const [status, setStatus] = useState("Učitavanje podataka modela…")
  const [hDraft, setHDraft] = useState<string | null>(null)
  const [daysDraft, setDaysDraft] = useState<string | null>(null)
  const liveStateRef = useRef(liveState)
  const selectionRef = useRef(selection)

  useEffect(() => {
    liveStateRef.current = liveState
  }, [liveState])

  useEffect(() => {
    selectionRef.current = selection
  }, [selection])

  useEffect(() => {
    const controller = new AbortController()

    async function loadCalculator() {
      const [datasetResult, snapshotResult] = await Promise.allSettled([
        fetchDataset(controller.signal),
        fetchBitcoinSnapshot(controller.signal),
      ])
      if (controller.signal.aborted) return

      if (datasetResult.status !== "fulfilled") {
        setStatus(
          "Kalkulator trenutačno ne može učitati datumsku mrežu modela."
        )
        return
      }

      const loadedDataset = datasetResult.value
      const loadedMapper = createBitcoinWaveDateMapper(loadedDataset.modelDates)
      const snapshot =
        snapshotResult.status === "fulfilled" ? snapshotResult.value : null
      const chain = snapshot?.chain.value
      const priceSnapshot = snapshot?.price.value
      const block = chain
        ? clamp(Math.round(chain.height), 0, MAX_BLOCK_HEIGHT)
        : FALLBACK_BLOCK
      const price = priceSnapshot?.usd ?? FALLBACK_PRICE
      const isLive =
        snapshot?.chain.status === "live" && snapshot.price.status === "live"
      const priceIsLive = snapshot?.price.status === "live"
      const date = snapshotDate(snapshot, loadedMapper)

      setDataset(loadedDataset)
      setMapper(loadedMapper)
      setLiveState({ date, block, price, isLive, priceIsLive })
      setSelection({
        date,
        days: loadedMapper.daysForDate(date),
        h: hForBlock(block),
        block,
      })
      setStatus(snapshotStatus(snapshot))
    }

    void loadCalculator()
    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (!mapper) return

    const controller = new AbortController()
    const refreshSnapshot = async () => {
      try {
        const snapshot = await fetchBitcoinSnapshot(controller.signal)
        if (controller.signal.aborted) return
        const price = snapshot.price.value
        const chain = snapshot.chain.value
        const date = snapshotDate(snapshot, mapper)
        const current = liveStateRef.current
        const nextState: LiveState = {
          ...current,
          date,
          block: chain
            ? clamp(Math.round(chain.height), 0, MAX_BLOCK_HEIGHT)
            : current.block,
          price: price?.usd ?? current.price,
          isLive:
            snapshot.chain.status === "live" &&
            snapshot.price.status === "live",
          priceIsLive: snapshot.price.status === "live",
        }
        const followsCurrentSnapshot =
          selectionRef.current.date === current.date &&
          selectionRef.current.block === current.block

        liveStateRef.current = nextState
        setLiveState(nextState)
        if (followsCurrentSnapshot) {
          const nextSelection = {
            date: nextState.date,
            days: mapper.daysForDate(nextState.date),
            h: hForBlock(nextState.block),
            block: nextState.block,
          }
          selectionRef.current = nextSelection
          setSelection(nextSelection)
        }
        setStatus(snapshotStatus(snapshot))
      } catch {
        if (controller.signal.aborted) return
        const current = liveStateRef.current
        const nextState = {
          ...current,
          isLive: false,
          priceIsLive: false,
        }
        liveStateRef.current = nextState
        setLiveState(nextState)
        setStatus("Zadnja valjana Bitcoin snimka · osvježavanje nije uspjelo")
      }
    }

    const intervalId = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        void refreshSnapshot()
      }
    }, SNAPSHOT_REFRESH_INTERVAL_MS)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void refreshSnapshot()
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.clearInterval(intervalId)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      controller.abort()
    }
  }, [mapper])

  const results = useMemo(() => {
    const historicalPrice = dataset
      ? closestHistoricalPrice(dataset.observations, selection.h)
      : null
    const isCurrentLivePoint =
      selection.date === liveState.date && selection.block === liveState.block
    const marketPrice = isCurrentLivePoint ? liveState.price : historicalPrice
    const epoch = Math.floor(selection.block / BLOCKS_PER_HALVING)
    const halvingDate = mapper?.dateForH(epoch) ?? GENESIS_DATE
    const daysSinceHalving = Math.max(
      0,
      (mapper?.daysForDate(selection.date) ?? selection.days) -
        (mapper?.daysForDate(halvingDate) ?? 0)
    )
    const supply = circulatingSupply(selection.block)

    return {
      marketPrice,
      marketPriceLabel:
        marketPrice === null && selection.date > liveState.date
          ? "Budući datum"
          : formatUsd(marketPrice),
      medianPrice: powerLawMedianPrice(selection.h),
      epoch,
      halvingLabel: `Halving ${epoch}${epoch >= 5 ? " (procjena)" : ""}`,
      daysSinceHalving,
      reward: blockReward(selection.block),
      supply,
      mined: minedPercentage(selection.block),
    }
  }, [dataset, liveState, mapper, selection])

  const projections = useMemo(
    () =>
      PROJECTION_HORIZONS.map(({ years, label }) => {
        const targetDate = addUtcCalendarYears(liveState.date, years)
        if (!mapper || !targetDate || targetDate > mapper.maxDate) {
          return {
            years,
            label,
            targetDate,
            targetPrice: null,
            annualRate: null,
          }
        }

        const targetH = mapper.hForDate(targetDate)
        const targetPrice = powerLawMedianPrice(targetH)
        return {
          years,
          label,
          targetDate,
          targetPrice,
          annualRate: compoundAnnualGrowthRate(
            liveState.price,
            targetPrice,
            years
          ),
        }
      }),
    [liveState.date, liveState.price, mapper]
  )

  const applyDate = (date: string) => {
    if (!mapper) return
    const h = mapper.hForDate(date)
    setSelection({
      date,
      days: mapper.daysForDate(date),
      h,
      block: blockForH(h),
    })
  }

  const applyDays = (rawDays: number) => {
    if (!mapper || !Number.isFinite(rawDays)) return
    const days = clamp(Math.round(rawDays), 0, mapper.maxDays)
    const date = mapper.dateForDays(days)
    const h = mapper.hForDate(date)
    setSelection({ date, days, h, block: blockForH(h) })
  }

  const applyH = (rawH: number) => {
    if (!mapper || !Number.isFinite(rawH)) return
    setSelection(selectionForH(mapper, rawH))
  }

  const applyBlock = (rawBlock: number) => {
    if (!mapper || !Number.isFinite(rawBlock)) return
    const block = clamp(Math.round(rawBlock), 0, MAX_BLOCK_HEIGHT)
    const h = hForBlock(block)
    const date = mapper.dateForH(h)
    setSelection({
      date,
      days: mapper.daysForDate(date),
      h,
      block,
    })
  }

  const resetToToday = () => {
    if (!mapper) return
    setSelection({
      date: liveState.date,
      days: mapper.daysForDate(liveState.date),
      h: hForBlock(liveState.block),
      block: liveState.block,
    })
    setHDraft(null)
    setDaysDraft(null)
  }

  const calculatorReady = mapper !== null

  return (
    <section
      id="h-time-kalkulator"
      className="scroll-mt-24 border-b border-border/70 bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mb-8 max-w-3xl sm:mb-10">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
            <Calculator className="size-4" aria-hidden="true" />
            Interaktivni izračun
          </div>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-balance text-foreground sm:text-4xl">
            H-time kalkulator
          </h2>
          <p className="mt-4 text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
            Povežite datum, broj dana od geneze, h-vrijednost i visinu bloka.
            Promjena bilo kojeg unosa odmah usklađuje sve ostale vrijednosti.
          </p>
        </div>

        <div className="rounded-[32px] bg-card p-4 shadow-[var(--shadow-border),0_24px_70px_-42px_rgba(46,38,26,0.35)] sm:rounded-[36px] sm:p-5">
          <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="rounded-2xl bg-muted/55 p-5 sm:p-6">
              <div className="flex flex-col gap-3 border-b border-border/70 pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Unesite vrijeme ili blok
                  </h3>
                  <p
                    className="mt-1.5 text-sm leading-6 text-muted-foreground"
                    role="status"
                    aria-live="polite"
                  >
                    <span
                      className={`mr-2 inline-block size-2 rounded-full ${
                        liveState.isLive ? "bg-emerald-600" : "bg-amber-600"
                      }`}
                      aria-hidden="true"
                    />
                    {status}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="min-h-10 self-start"
                  onClick={resetToToday}
                  disabled={!calculatorReady}
                >
                  <RefreshCw className="size-4" aria-hidden="true" />
                  Danas
                </Button>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <CalendarDays
                      className="size-4 text-primary"
                      aria-hidden="true"
                    />
                    Odaberite datum
                  </span>
                  <input
                    className={inputClassName}
                    type="date"
                    lang="hr"
                    min={GENESIS_DATE}
                    max={mapper?.maxDate ?? FALLBACK_DATE}
                    value={selection.date}
                    onChange={(event) => applyDate(event.target.value)}
                    disabled={!calculatorReady}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Timer className="size-4 text-primary" aria-hidden="true" />
                    Dani od geneze
                  </span>
                  <input
                    className={inputClassName}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={mapper?.maxDays ?? selection.days}
                    step={1}
                    value={daysDraft ?? String(selection.days)}
                    onFocus={(event) => {
                      setDaysDraft(String(selection.days))
                      event.currentTarget.select()
                    }}
                    onChange={(event) => {
                      setDaysDraft(event.target.value)
                      applyDays(Number(event.target.value))
                    }}
                    onBlur={() => setDaysDraft(null)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") event.currentTarget.blur()
                    }}
                    disabled={!calculatorReady}
                  />
                </label>

                <label className="block sm:col-span-2 lg:col-span-1 xl:col-span-2">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Bitcoin
                      className="size-4 text-primary"
                      aria-hidden="true"
                    />
                    Unesite h-vrijednost
                  </span>
                  <input
                    className={inputClassName}
                    type="number"
                    inputMode="decimal"
                    min={0}
                    max={MAX_H_VALUE}
                    step={0.0007}
                    value={hDraft ?? selection.h.toFixed(4)}
                    onFocus={(event) => {
                      setHDraft(selection.h.toFixed(4))
                      event.currentTarget.select()
                    }}
                    onChange={(event) => {
                      setHDraft(event.target.value)
                      applyH(Number(event.target.value))
                    }}
                    onBlur={() => setHDraft(null)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") event.currentTarget.blur()
                    }}
                    disabled={!calculatorReady}
                  />
                </label>
              </div>

              <label className="mt-6 block border-t border-border/70 pt-6">
                <span className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm font-semibold text-foreground">
                  <span className="flex items-center gap-2">
                    <Blocks
                      className="size-4 text-primary"
                      aria-hidden="true"
                    />
                    Visina bloka
                  </span>
                  <output className="rounded-full bg-background px-3 py-1.5 text-sm font-semibold tabular-nums shadow-[var(--shadow-border)]">
                    {numberFormatter.format(selection.block)}
                  </output>
                </span>
                <input
                  className="h-11 w-full cursor-pointer accent-primary disabled:cursor-wait disabled:opacity-60"
                  type="range"
                  min={0}
                  max={MAX_BLOCK_HEIGHT}
                  step={100}
                  value={selection.block}
                  onChange={(event) => applyBlock(Number(event.target.value))}
                  disabled={!calculatorReady}
                  aria-label="Visina bloka"
                />
                <span className="mt-1 flex justify-between text-xs text-muted-foreground tabular-nums">
                  <span>0</span>
                  <span>{numberFormatter.format(MAX_BLOCK_HEIGHT)}</span>
                </span>
              </label>
            </div>

            <div className="p-1 sm:p-2" aria-live="polite">
              <div className="flex items-center gap-2 px-1 pb-4">
                <Calculator
                  className="size-5 text-primary"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-semibold text-foreground">
                  Rezultati izračuna
                </h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="bg-forest-soft rounded-2xl p-5 shadow-[var(--shadow-border)] dark:bg-primary/10">
                  <p className="text-sm font-medium text-muted-foreground">
                    Tržišna cijena BTC-a
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.025em] break-words text-foreground tabular-nums">
                    {results.marketPriceLabel}
                  </p>
                </div>
                <div className="bg-brass-soft rounded-2xl p-5 shadow-[var(--shadow-border)] dark:bg-primary/10">
                  <p className="text-sm font-medium text-muted-foreground">
                    Središnja vrijednost modela (PL0)
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.025em] break-words text-foreground tabular-nums">
                    {formatUsd(results.medianPrice)}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <dl className="rounded-2xl bg-background px-5 py-2 shadow-[var(--shadow-border)]">
                  <ResultItem
                    label="Datum"
                    value={formatDate(selection.date)}
                  />
                  <ResultItem
                    label="Približan blok"
                    value={numberFormatter.format(selection.block)}
                  />
                  <ResultItem
                    label="h-vrijednost"
                    value={selection.h.toFixed(5)}
                  />
                </dl>

                <dl className="rounded-2xl bg-background px-5 py-2 shadow-[var(--shadow-border)]">
                  <ResultItem
                    label="Posljednji halving"
                    value={results.halvingLabel}
                  />
                  <ResultItem
                    label="h-vrijeme"
                    value={hClockTime(selection.h)}
                  />
                  <ResultItem
                    label="Dani od posljednjeg halvinga"
                    value={numberFormatter.format(results.daysSinceHalving)}
                  />
                  <ResultItem
                    label="Dani od geneze"
                    value={numberFormatter.format(selection.days)}
                  />
                </dl>

                <dl className="rounded-2xl bg-background px-5 py-2 shadow-[var(--shadow-border)]">
                  <ResultItem
                    label="Nagrada po bloku"
                    value={`${new Intl.NumberFormat("hr-HR", {
                      maximumFractionDigits: 8,
                    }).format(results.reward)} BTC`}
                  />
                  <ResultItem
                    label="Količina u optjecaju"
                    value={`${numberFormatter.format(Math.floor(results.supply))} BTC`}
                  />
                  <ResultItem
                    label="Iskopano od 21 milijun"
                    value={`${results.mined.toFixed(6).replace(".", ",")} %`}
                  />
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div
          id="pl0-projekcije"
          className="mt-10 scroll-mt-24 border-t border-border/70 pt-10 sm:mt-12 sm:pt-12"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                <TrendingUp className="size-4" aria-hidden="true" />
                Automatske projekcije
              </div>
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-balance text-foreground sm:text-3xl">
                Složena godišnja stopa do PL0
              </h3>
              <p className="mt-3 text-base leading-7 text-pretty text-muted-foreground sm:text-lg">
                Kolika bi prosječna godišnja stopa promjene bila potrebna da
                današnja cijena na ciljni datum dosegne središnju PL0 putanju
                modela.
              </p>
            </div>

            <div className="min-w-0 rounded-2xl bg-muted/55 p-5 shadow-[var(--shadow-border)] sm:p-6 lg:min-w-[290px]">
              <p className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                Današnje polazište
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.025em] break-words text-foreground tabular-nums">
                {formatProjectedUsd(liveState.price)}
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {formatDate(liveState.date)} ·{" "}
                {liveState.priceIsLive
                  ? "cijena uživo, osvježavanje svake minute"
                  : "rezervna tržišna snimka"}
              </p>
            </div>
          </div>

          <div
            className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4"
            aria-live="polite"
          >
            {projections.map((projection) => {
              const isPositive =
                projection.annualRate !== null && projection.annualRate > 0
              const isNegative =
                projection.annualRate !== null && projection.annualRate < 0
              const DirectionIcon = isNegative
                ? TrendingDown
                : isPositive
                  ? TrendingUp
                  : Minus
              const cardTone = isNegative
                ? "bg-[var(--negative-red-muted)]"
                : isPositive
                  ? "bg-[var(--forest-soft)] dark:bg-emerald-950/30"
                  : "bg-muted/55"
              const rateTone = isNegative
                ? "text-destructive"
                : isPositive
                  ? "text-primary"
                  : "text-foreground"

              return (
                <article
                  key={projection.years}
                  className={`${cardTone} min-w-0 rounded-2xl p-5 shadow-[var(--shadow-border)] sm:p-6`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="font-semibold text-foreground">
                      {projection.label} unaprijed
                    </h4>
                    <DirectionIcon
                      className={`size-5 shrink-0 ${rateTone}`}
                      aria-hidden="true"
                    />
                  </div>

                  <p
                    className={`mt-5 text-3xl font-semibold tracking-[-0.035em] break-words tabular-nums ${rateTone}`}
                  >
                    {formatCompoundRate(projection.annualRate)}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    godišnje složeno (CAGR)
                  </p>

                  <dl className="mt-5 border-t border-border/60 pt-4">
                    <div>
                      <dt className="text-xs font-medium text-muted-foreground">
                        Ciljna PL0 vrijednost
                      </dt>
                      <dd className="mt-1 text-lg font-semibold break-words text-foreground tabular-nums">
                        {formatProjectedUsd(projection.targetPrice)}
                      </dd>
                    </div>
                    <div className="mt-4">
                      <dt className="text-xs font-medium text-muted-foreground">
                        Ciljni datum
                      </dt>
                      <dd className="mt-1 text-sm font-semibold break-words text-foreground tabular-nums">
                        {projection.targetDate
                          ? formatDate(projection.targetDate)
                          : "Nije dostupno"}
                      </dd>
                    </div>
                  </dl>
                </article>
              )
            })}
          </div>

          <p className="mt-5 max-w-4xl text-sm leading-6 text-pretty text-muted-foreground">
            Stopa je matematički odnos današnje tržišne cijene i buduće PL0
            vrijednosti modela. Nije prognoza tržišnog prinosa niti jamstvo
            buduće cijene.
          </p>
        </div>

        <CurrentTrendInterpretation
          dataset={dataset}
          mapper={mapper}
          date={liveState.date}
          block={liveState.block}
          price={liveState.price}
          priceIsLive={liveState.priceIsLive}
        />
      </div>
    </section>
  )
}
