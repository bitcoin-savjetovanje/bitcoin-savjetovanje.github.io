import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Activity,
  ArrowLeftRight,
  ArrowRight,
  Bitcoin,
  Blocks,
  CalendarClock,
  CircleGauge,
  Clock3,
  Gauge,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Waves,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  BITCOIN_MONEY_PATH,
  BITCOIN_STANDARD_CHECK_PATH,
  CUSTODY_SECURITY_PATH,
  LONG_TERM_TREND_PATH,
} from "@/content/site"
import {
  ageBitcoinSnapshot,
  fetchBitcoinSnapshot,
  type BitcoinSnapshot,
} from "@/lib/bitcoinSnapshot"
import {
  convertBitsToEuros,
  convertEurosToBits,
  getBitsPerEuro,
  getHalvingCountdown,
  parseLocalizedBitcoinAmount,
} from "@/lib/bitcoinTodayMetrics"

import { MiniLineChart } from "./MiniLineChart"
import { MarketSentiment } from "./MarketSentiment"
import { MiningEnergyPulse } from "./MiningEnergyPulse"
import {
  EmptyValue,
  MethodDetails,
  MetricCard,
  MetricItem,
  SnapshotMeta,
} from "./MetricPrimitives"

const REFRESH_INTERVAL_MS = 60_000

const integerFormatter = new Intl.NumberFormat("hr-HR", {
  maximumFractionDigits: 0,
})
const decimalFormatter = new Intl.NumberFormat("hr-HR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})
const percentageFormatter = new Intl.NumberFormat("hr-HR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
const feeFormatter = new Intl.NumberFormat("hr-HR", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})
const bitFormatter = new Intl.NumberFormat("hr-HR", {
  maximumFractionDigits: 2,
})
const calculatorEurFormatter = new Intl.NumberFormat("hr-HR", {
  useGrouping: false,
  maximumFractionDigits: 2,
})
const calculatorBitFormatter = new Intl.NumberFormat("hr-HR", {
  useGrouping: false,
  maximumFractionDigits: 2,
})
const btcFormatter = new Intl.NumberFormat("hr-HR", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
})
const eurFormatter = new Intl.NumberFormat("hr-HR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
})
const usdFormatter = new Intl.NumberFormat("hr-HR", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})
const dateFormatter = new Intl.DateTimeFormat("hr-HR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Zagreb",
})
const dateTimeFormatter = new Intl.DateTimeFormat("hr-HR", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZone: "Europe/Zagreb",
})

function formatDate(value: string | null | undefined) {
  if (!value) return null
  const date = new Date(value)
  return Number.isFinite(date.getTime()) ? dateFormatter.format(date) : null
}

function formatDateTime(value: string | null | undefined) {
  if (!value) return null
  const date = new Date(value)
  return Number.isFinite(date.getTime()) ? dateTimeFormatter.format(date) : null
}

function formatBlockAge(value: string, now: number | null) {
  if (now === null) return "Računam starost bloka…"
  const timestamp = new Date(value).getTime()
  if (!Number.isFinite(timestamp)) return "Vrijeme bloka nije dostupno"
  const elapsed = Math.max(0, Math.floor((now - timestamp) / 1_000))
  const minutes = Math.floor(elapsed / 60)
  const seconds = elapsed % 60
  if (minutes === 0) return `prije ${seconds} s`
  if (minutes < 60) return `prije ${minutes} min ${seconds} s`
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `prije ${hours} h ${remainingMinutes} min`
}

function formatDifficulty(value: number) {
  if (value >= 1_000_000_000_000) {
    return `${decimalFormatter.format(value / 1_000_000_000_000)} T`
  }
  return integerFormatter.format(value)
}

function formatVirtualMegabytes(value: number) {
  return `${decimalFormatter.format(value / 1_000_000)} virtualnih MB`
}

function formatAdjustment(value: number) {
  const sign = value > 0 ? "+" : value < 0 ? "−" : ""
  return `${sign}${percentageFormatter.format(Math.abs(value))} %`
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) return error.message
  return "Podatke trenutačno nije moguće dohvatiti."
}

function useBitcoinSnapshot() {
  const [snapshot, setSnapshot] = useState<BitcoinSnapshot | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const activeRequest = useRef<AbortController | null>(null)

  const refresh = useCallback(async () => {
    activeRequest.current?.abort()
    const controller = new AbortController()
    activeRequest.current = controller
    setIsRefreshing(true)

    try {
      const nextSnapshot = await fetchBitcoinSnapshot(controller.signal)
      if (activeRequest.current !== controller) return
      setSnapshot(nextSnapshot)
      setError(null)
    } catch (requestError) {
      if (controller.signal.aborted || activeRequest.current !== controller) {
        return
      }
      setError(getErrorMessage(requestError))
    } finally {
      if (activeRequest.current === controller) {
        activeRequest.current = null
        setIsRefreshing(false)
      }
    }
  }, [])

  useEffect(() => {
    void refresh()

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") void refresh()
    }, REFRESH_INTERVAL_MS)

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") void refresh()
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      window.clearInterval(interval)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      activeRequest.current?.abort()
    }
  }, [refresh])

  return { snapshot, isRefreshing, error, refresh }
}

function useCurrentTime() {
  const [now, setNow] = useState<number | null>(() =>
    typeof window === "undefined" ? null : Date.now()
  )

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1_000)
    return () => window.clearInterval(interval)
  }, [])

  return now
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="bitcoin-today-section-intro">
      <p className="bitcoin-today-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

function GuideLink({ href, children }: { href: string; children: string }) {
  return (
    <a className="bitcoin-today-guide-link" href={href}>
      <span>{children}</span>
      <ArrowRight aria-hidden="true" />
    </a>
  )
}

export function BitcoinTodayDashboard() {
  const { snapshot, isRefreshing, error, refresh } = useBitcoinSnapshot()
  const now = useCurrentTime()
  const displaySnapshot = useMemo(
    () =>
      snapshot && now !== null ? ageBitcoinSnapshot(snapshot, now) : snapshot,
    [now, snapshot]
  )
  const price = displaySnapshot?.price.value ?? null
  const chain = displaySnapshot?.chain.value ?? null
  const fees = displaySnapshot?.fees.value ?? null
  const mining = displaySnapshot?.mining.value ?? null
  const trend = displaySnapshot?.trend.value ?? null
  const generatedAt = formatDateTime(snapshot?.generatedAt)
  const availableGroups = displaySnapshot
    ? [
        displaySnapshot.price,
        displaySnapshot.chain,
        displaySnapshot.fees,
        displaySnapshot.mining,
        displaySnapshot.trend,
        displaySnapshot.sentiment,
      ].filter(
        (group) => group.status !== "unavailable" && group.value !== null
      ).length
    : 0
  const allDataUnavailable = Boolean(displaySnapshot && availableGroups === 0)
  const hasPartialData = Boolean(
    displaySnapshot && availableGroups > 0 && availableGroups < 6
  )
  const miningHistory = useMemo(() => mining?.history ?? [], [mining?.history])
  const gaugePosition = trend
    ? Math.min(100, Math.max(0, ((trend.bandPosition + 3) / 8) * 100))
    : null
  const [converterInput, setConverterInput] = useState<{
    source: "eur" | "bits"
    value: string
  }>({ source: "eur", value: "100" })
  const converterNumber = parseLocalizedBitcoinAmount(converterInput.value)
  const converterHasError =
    converterInput.value !== "" && converterNumber === null
  const convertedNumber =
    price && converterNumber !== null
      ? converterInput.source === "eur"
        ? convertEurosToBits(converterNumber, price.eur)
        : convertBitsToEuros(converterNumber, price.eur)
      : null
  const eurInputValue =
    converterInput.source === "eur"
      ? converterInput.value
      : convertedNumber === null
        ? ""
        : calculatorEurFormatter.format(convertedNumber)
  const bitInputValue =
    converterInput.source === "bits"
      ? converterInput.value
      : convertedNumber === null
        ? ""
        : calculatorBitFormatter.format(convertedNumber)
  const bitsPerEuro = price ? getBitsPerEuro(price.eur) : null
  const halvingCountdown =
    chain && now !== null
      ? getHalvingCountdown(chain.estimatedHalvingAt, now)
      : null

  const headerStatus = isRefreshing
    ? snapshot
      ? "Osvježavam podatke…"
      : "Dohvaćam prve podatke…"
    : generatedAt
      ? `Osvježeno ${generatedAt}`
      : "Čekam prve podatke"

  return (
    <div className="bitcoin-today-page">
      <section className="bitcoin-today-hero">
        <div className="bitcoin-today-shell">
          <div className="bitcoin-today-hero__copy">
            <p className="bitcoin-today-eyebrow">MREŽA · NOVAC · KONTEKST</p>
            <h1>Bitcoin danas</h1>
            <p className="bitcoin-today-hero__lead">
              Ključni podaci o Bitcoinu, objašnjeni bez trgovačke buke.
              Pogledajte što se upravo događa na mreži i zašto je to važno u
              dugoročnom okviru.
            </p>
          </div>

          <div className="bitcoin-today-refresh-panel" aria-live="polite">
            <div>
              <span
                className={`bitcoin-today-refresh-panel__indicator${isRefreshing ? "is-refreshing" : ""}`}
                aria-hidden="true"
              />
              <span>{headerStatus}</span>
            </div>
            <Button
              type="button"
              variant="outline"
              className="bitcoin-today-refresh-button"
              onClick={() => void refresh()}
              disabled={isRefreshing}
            >
              <RefreshCw
                className={isRefreshing ? "is-spinning" : undefined}
                aria-hidden="true"
              />
              {isRefreshing ? "Osvježavam" : "Osvježi"}
            </Button>
          </div>

          {error ? (
            <div className="bitcoin-today-notice" role="status">
              <strong>
                {allDataUnavailable
                  ? "Podaci uživo trenutačno nisu dostupni."
                  : snapshot
                    ? "Zadržani su posljednji dostupni podaci."
                    : "Podaci uživo trenutačno nisu dostupni."}
              </strong>{" "}
              <span>{error}</span>
            </div>
          ) : allDataUnavailable ? (
            <div className="bitcoin-today-notice" role="status">
              Podaci su privremeno nedostupni. Pokušajte ponovno za koju minutu.
            </div>
          ) : hasPartialData ? (
            <div className="bitcoin-today-notice" role="status">
              Dio izvora trenutačno nije dostupan. Ostale cjeline nastavljaju se
              neovisno osvježavati.
            </div>
          ) : null}

          <div
            className="bitcoin-today-summary-grid"
            aria-busy={isRefreshing && !snapshot}
          >
            <MetricCard
              icon={Bitcoin}
              label="Cijena Bitcoina"
              value={
                price ? (
                  eurFormatter.format(price.eur)
                ) : (
                  <EmptyValue status={displaySnapshot?.price.status} />
                )
              }
              secondary={
                price ? (
                  <span className="bitcoin-today-price-equivalence">
                    <strong>
                      1 € ={" "}
                      {bitsPerEuro === null
                        ? "—"
                        : `${bitFormatter.format(bitsPerEuro)} bitova`}
                    </strong>
                    <span>
                      Za 100 € danas:{" "}
                      {integerFormatter.format(price.satsPer100Eur)} sats
                    </span>
                    <small>1 bit = 100 satoshija</small>
                  </span>
                ) : (
                  <span className="bitcoin-today-price-equivalence">
                    <strong>1 € = — bitova</strong>
                    <span>Protuvrijednost se prikazuje uz aktualnu cijenu</span>
                    <small>1 bit = 100 satoshija</small>
                  </span>
                )
              }
              status={displaySnapshot?.price.status}
              asOf={displaySnapshot?.price.asOf}
              sources={displaySnapshot?.price.sources}
            />
            <MetricCard
              icon={Blocks}
              label="Posljednji blok"
              value={
                chain ? (
                  `#${integerFormatter.format(chain.height)}`
                ) : (
                  <EmptyValue status={displaySnapshot?.chain.status} />
                )
              }
              secondary={
                chain
                  ? formatBlockAge(chain.lastBlockAt, now)
                  : "Visina i starost posljednjeg bloka"
              }
              status={displaySnapshot?.chain.status}
              asOf={displaySnapshot?.chain.asOf}
              sources={displaySnapshot?.chain.sources}
            />
            <MetricCard
              icon={Gauge}
              label="Preporučena naknada"
              value={
                fees ? (
                  `${feeFormatter.format(fees.halfHour)} sat/vB`
                ) : (
                  <EmptyValue status={displaySnapshot?.fees.status} />
                )
              }
              secondary={
                fees ? (
                  <>
                    Prioritet: {feeFormatter.format(fees.fastest)} · ekonomično:{" "}
                    {feeFormatter.format(fees.economy)} sat/vB
                  </>
                ) : (
                  "Procjena za potvrdu unutar približno 30 minuta"
                )
              }
              status={displaySnapshot?.fees.status}
              asOf={displaySnapshot?.fees.asOf}
              sources={displaySnapshot?.fees.sources}
            />
            <MetricCard
              icon={Waves}
              label="Stanje mempoola"
              value={
                fees ? (
                  `${integerFormatter.format(fees.mempoolTransactions)} transakcija`
                ) : (
                  <EmptyValue status={displaySnapshot?.fees.status} />
                )
              }
              secondary={
                fees
                  ? `${formatVirtualMegabytes(fees.mempoolVbytes)} · oko ${integerFormatter.format(fees.estimatedBlocks)} blokova`
                  : "Transakcije koje čekaju potvrdu"
              }
              status={displaySnapshot?.fees.status}
              asOf={displaySnapshot?.fees.asOf}
              sources={displaySnapshot?.fees.sources}
            />
          </div>

          <div className="bitcoin-today-market-tools">
            <section
              className="bitcoin-today-converter"
              aria-labelledby="bitcoin-today-converter-title"
            >
              <div className="bitcoin-today-converter__intro">
                <span
                  className="bitcoin-today-icon-medallion"
                  aria-hidden="true"
                >
                  <ArrowLeftRight />
                </span>
                <div>
                  <p className="bitcoin-today-converter__eyebrow">
                    Brzi pretvarač
                  </p>
                  <h2 id="bitcoin-today-converter-title">Euri i bitovi</h2>
                  <p>
                    Unesite iznos u bilo koje polje. Računamo prema trenutačnom
                    BTC/EUR tečaju.
                  </p>
                </div>
              </div>

              <div className="bitcoin-today-converter__fields">
                <label>
                  <span>Euri</span>
                  <span className="bitcoin-today-converter__input-wrap">
                    <input
                      type="text"
                      inputMode="decimal"
                      autoComplete="off"
                      spellCheck={false}
                      value={eurInputValue}
                      placeholder={price ? "0" : "Čekam cijenu"}
                      aria-describedby="bitcoin-today-converter-help"
                      aria-invalid={
                        converterInput.source === "eur" && converterHasError
                      }
                      aria-errormessage={
                        converterInput.source === "eur" && converterHasError
                          ? "bitcoin-today-converter-error"
                          : undefined
                      }
                      onFocus={() => {
                        if (converterInput.source !== "eur" && price) {
                          setConverterInput({
                            source: "eur",
                            value: eurInputValue,
                          })
                        }
                      }}
                      onChange={(event) =>
                        setConverterInput({
                          source: "eur",
                          value: event.target.value,
                        })
                      }
                    />
                    <span aria-hidden="true">€</span>
                  </span>
                </label>

                <ArrowLeftRight
                  className="bitcoin-today-converter__arrow"
                  aria-hidden="true"
                />

                <label>
                  <span>Bitovi</span>
                  <span className="bitcoin-today-converter__input-wrap">
                    <input
                      type="text"
                      inputMode="decimal"
                      autoComplete="off"
                      spellCheck={false}
                      value={bitInputValue}
                      placeholder={price ? "0" : "Čekam cijenu"}
                      aria-describedby="bitcoin-today-converter-help"
                      aria-invalid={
                        converterInput.source === "bits" && converterHasError
                      }
                      aria-errormessage={
                        converterInput.source === "bits" && converterHasError
                          ? "bitcoin-today-converter-error"
                          : undefined
                      }
                      onFocus={() => {
                        if (converterInput.source !== "bits" && price) {
                          setConverterInput({
                            source: "bits",
                            value: bitInputValue,
                          })
                        }
                      }}
                      onChange={(event) =>
                        setConverterInput({
                          source: "bits",
                          value: event.target.value,
                        })
                      }
                    />
                    <span aria-hidden="true">bitova</span>
                  </span>
                </label>
              </div>

              <p
                id="bitcoin-today-converter-help"
                className="bitcoin-today-converter__help"
              >
                {converterHasError ? (
                  <span
                    id="bitcoin-today-converter-error"
                    className="bitcoin-today-converter__error"
                  >
                    Unesite nenegativan broj koristeći decimalni zarez ili
                    točku.
                  </span>
                ) : null}
                1 BTC = 1.000.000 bitova = 100.000.000 satoshija · 1 bit = 100
                satoshija
              </p>
              <SnapshotMeta
                status={displaySnapshot?.price.status}
                asOf={displaySnapshot?.price.asOf}
                sources={displaySnapshot?.price.sources}
              />
            </section>

            <MarketSentiment group={displaySnapshot?.sentiment} />
          </div>

          <div className="bitcoin-today-explainer">
            <div>
              <p className="bitcoin-today-explainer__label">Što ovo znači?</p>
              <p>
                Cijena pokazuje trenutačni tržišni odnos, a indeks straha i
                pohlepe sažima šire tržišno raspoloženje. Blok potvrđuje ritam
                mreže, dok naknade i mempool opisuju potražnju za prostorom u
                sljedećim blokovima. Nijedna od tih brojki sama po sebi nije
                preporuka za kupnju ni prodaju.
              </p>
            </div>
            <GuideLink href={CUSTODY_SECURITY_PATH}>
              Skrbništvo i sigurnost
            </GuideLink>
          </div>

          <MethodDetails
            methodology="Cijena je tržišna snimka u EUR i USD. Pretvarač koristi odnos 1 BTC = 1.000.000 bitova, odnosno 1 bit = 100 satoshija. Dnevni indeks straha i pohlepe preuzima kompozitno očitanje tržišnog raspoloženja. Procjene naknada temelje se na trenutačnom mempoolu, starost bloka računa se lokalno od vremenske oznake posljednjeg potvrđenog bloka, a približan broj blokova dijeljenjem ukupne virtualne veličine s 1.000.000 vB."
            limitation="Cijene ovise o izvoru i trenutku mjerenja. Indeks sentimenta nije dio Bitcoin protokola, predviđanje cijene ni signal za trgovanje. Naknade su procjene, ne jamstvo potvrde; stvarni trošak ovisi o veličini transakcije, a broj potrebnih blokova o sastavu transakcija koje rudari uključe."
            sources={[
              ...(displaySnapshot?.price.sources ?? []),
              ...(displaySnapshot?.chain.sources ?? []),
              ...(displaySnapshot?.fees.sources ?? []),
              ...(displaySnapshot?.sentiment.sources ?? []),
            ]}
          />
        </div>
      </section>

      <section className="bitcoin-today-section bitcoin-today-section--muted">
        <div className="bitcoin-today-shell">
          <SectionIntro
            eyebrow="MONETARNA PRAVILA"
            title="Bitcoinov monetarni sat"
            description="Ponuda napreduje blok po blok prema unaprijed poznatom maksimumu. Ovdje se ne procjenjuje monetarna politika — ovdje se prati njezino izvršavanje."
          />

          <div className="bitcoin-today-section-grid bitcoin-today-section-grid--monetary">
            <div className="bitcoin-today-metric-panel">
              <dl className="bitcoin-today-metric-list">
                <MetricItem
                  label="Izdana količina"
                  value={
                    chain ? (
                      `${btcFormatter.format(chain.supplyBtc)} BTC`
                    ) : (
                      <EmptyValue status={displaySnapshot?.chain.status} />
                    )
                  }
                  note="Procijenjena cirkulirajuća ponuda"
                />
                <MetricItem
                  label="Iskopano od 21 milijun"
                  value={
                    chain ? (
                      `${percentageFormatter.format(chain.minedPercent)} %`
                    ) : (
                      <EmptyValue status={displaySnapshot?.chain.status} />
                    )
                  }
                />
                <MetricItem
                  label="Subvencija po bloku"
                  value={
                    chain ? (
                      `${btcFormatter.format(chain.subsidyBtc)} BTC`
                    ) : (
                      <EmptyValue status={displaySnapshot?.chain.status} />
                    )
                  }
                />
                <MetricItem
                  label="Približna dnevna emisija"
                  value={
                    chain ? (
                      `${btcFormatter.format(chain.dailyIssuanceBtc)} BTC`
                    ) : (
                      <EmptyValue status={displaySnapshot?.chain.status} />
                    )
                  }
                  note="Pri ciljnom prosjeku od 144 bloka dnevno"
                />
              </dl>

              <div className="bitcoin-today-supply-progress">
                <div className="bitcoin-today-supply-progress__labels">
                  <span>0 BTC</span>
                  <span>21.000.000 BTC</span>
                </div>
                <div
                  className="bitcoin-today-supply-progress__track"
                  role="progressbar"
                  aria-label="Udio izdane količine Bitcoina"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={chain?.minedPercent}
                >
                  {chain ? (
                    <span
                      style={{
                        width: `${Math.min(100, Math.max(0, chain.minedPercent))}%`,
                      }}
                    />
                  ) : null}
                </div>
              </div>
            </div>

            <aside className="bitcoin-today-countdown-panel">
              <span className="bitcoin-today-icon-medallion" aria-hidden="true">
                <CalendarClock />
              </span>
              <p className="bitcoin-today-countdown-panel__eyebrow">
                Do sljedećeg halvinga
              </p>
              <div
                className="bitcoin-today-countdown-clock tabular-nums"
                role="timer"
                aria-live="off"
                aria-label={
                  halvingCountdown
                    ? `${integerFormatter.format(halvingCountdown.days)} dana, ${halvingCountdown.hours} sati, ${halvingCountdown.minutes} minuta i ${halvingCountdown.seconds} sekundi do procijenjenog halvinga`
                    : displaySnapshot?.chain.status === "unavailable"
                      ? "Procjena vremena do halvinga privremeno nije dostupna"
                      : "Čekam procijenjeno vrijeme do sljedećeg halvinga"
                }
              >
                {[
                  [halvingCountdown?.days, "dana"],
                  [halvingCountdown?.hours, "sati"],
                  [halvingCountdown?.minutes, "min"],
                  [halvingCountdown?.seconds, "sek"],
                ].map(([value, label]) => (
                  <span key={String(label)} aria-hidden="true">
                    <strong>
                      {typeof value === "number"
                        ? integerFormatter.format(value)
                        : "—"}
                    </strong>
                    <small>{label}</small>
                  </span>
                ))}
              </div>
              <p className="bitcoin-today-countdown-panel__blocks tabular-nums">
                {chain ? (
                  <>
                    Još približno{" "}
                    <strong>
                      {integerFormatter.format(chain.blocksToHalving)} blokova
                    </strong>
                  </>
                ) : (
                  <EmptyValue status={displaySnapshot?.chain.status} />
                )}
              </p>
              <div className="bitcoin-today-countdown-panel__date">
                <span>Procijenjeni datum</span>
                <strong className="tabular-nums">
                  {formatDate(chain?.estimatedHalvingAt) ?? "—"}
                </strong>
              </div>
              <p className="bitcoin-today-countdown-panel__note">
                Datum je približan jer stvarni blokovi ne stižu točno svakih
                deset minuta.
              </p>
            </aside>
          </div>

          <SnapshotMeta
            status={displaySnapshot?.chain.status}
            asOf={displaySnapshot?.chain.asOf}
            sources={displaySnapshot?.chain.sources}
          />

          <div className="bitcoin-today-explainer">
            <div>
              <p className="bitcoin-today-explainer__label">Što ovo znači?</p>
              <p>
                Bitcoinova ponuda nije prilagodljiva raspoloženju tržišta.
                Subvencija se prepolovljuje svakih 210.000 blokova, pa se nova
                emisija kroz vrijeme smanjuje prema konačnoj granici.
              </p>
            </div>
            <GuideLink href={BITCOIN_MONEY_PATH}>Bitcoin kao novac</GuideLink>
          </div>

          <MethodDetails
            methodology="Ponuda i subvencija izvode se iz visine bloka i Bitcoinovog rasporeda emisije. Dnevna emisija množi važeću subvenciju s ciljnih 144 bloka dnevno."
            limitation="Izračun ponude ne pokušava procijeniti izgubljene kovanice. Datum halvinga je projekcija temeljena na trenutačnom ritmu blokova i mijenjat će se."
            sources={displaySnapshot?.chain.sources ?? []}
          />
        </div>
      </section>

      <section className="bitcoin-today-section">
        <div className="bitcoin-today-shell">
          <SectionIntro
            eyebrow="SIGURNOST MREŽE"
            title="Rad koji čuva zajedničku knjigu"
            description="Hash rate opisuje procijenjenu računalnu snagu usmjerenu na Bitcoin, a težina održava ritam blokova blizu ciljanih deset minuta."
          />

          <div className="bitcoin-today-network-metrics">
            <MetricCard
              icon={Activity}
              label="Procijenjeni hash rate"
              value={
                mining ? (
                  `${decimalFormatter.format(mining.hashrateEh)} EH/s`
                ) : (
                  <EmptyValue status={displaySnapshot?.mining.status} />
                )
              }
              secondary="Izvedena procjena, ne izravno mjerenje"
              status={displaySnapshot?.mining.status}
              asOf={displaySnapshot?.mining.asOf}
              sources={displaySnapshot?.mining.sources}
            />
            <MetricCard
              icon={ShieldCheck}
              label="Težina mreže"
              value={
                mining ? (
                  formatDifficulty(mining.difficulty)
                ) : (
                  <EmptyValue status={displaySnapshot?.mining.status} />
                )
              }
              secondary="Trenutačni cilj proof-of-worka"
              status={displaySnapshot?.mining.status}
              asOf={displaySnapshot?.mining.asOf}
              sources={displaySnapshot?.mining.sources}
            />
            <MetricCard
              icon={CircleGauge}
              label="Sljedeća prilagodba"
              value={
                mining ? (
                  formatAdjustment(mining.adjustmentPercent)
                ) : (
                  <EmptyValue status={displaySnapshot?.mining.status} />
                )
              }
              secondary={
                mining
                  ? `Za ${integerFormatter.format(mining.remainingBlocks)} blokova`
                  : "Procjena promjene težine"
              }
              status={displaySnapshot?.mining.status}
              asOf={displaySnapshot?.mining.asOf}
              sources={displaySnapshot?.mining.sources}
            />
            <MetricCard
              icon={Clock3}
              label="Procijenjena prilagodba"
              value={
                formatDate(mining?.estimatedRetargetAt) ?? (
                  <EmptyValue status={displaySnapshot?.mining.status} />
                )
              }
              secondary="Približan datum završetka epohe težine"
              status={displaySnapshot?.mining.status}
              asOf={displaySnapshot?.mining.asOf}
              sources={displaySnapshot?.mining.sources}
            />
          </div>

          <div className="bitcoin-today-chart-grid">
            <MiniLineChart
              title="Hash rate"
              description="Procijenjeni hash rate Bitcoin mreže kroz posljednjih 90 dana."
              points={miningHistory.map((point) => ({
                at: point.at,
                value: point.hashrateEh,
              }))}
              formatValue={(value) => `${decimalFormatter.format(value)} EH/s`}
            />
            <MiniLineChart
              title="Težina mreže"
              description="Težina rudarenja na Bitcoin mreži kroz posljednjih 90 dana."
              points={miningHistory.map((point) => ({
                at: point.at,
                value: point.difficulty,
              }))}
              formatValue={formatDifficulty}
              tone="secondary"
            />
          </div>

          <MiningEnergyPulse
            hashrateEh={mining?.hashrateEh}
            status={displaySnapshot?.mining.status}
          />

          <div className="bitcoin-today-explainer">
            <div>
              <p className="bitcoin-today-explainer__label">Što ovo znači?</p>
              <p>
                Više angažiranog računalnog rada povećava trošak napada na
                povijest transakcija. Težina se zatim prilagođava svaka 2.016
                bloka kako bi se, unatoč promjeni hash ratea, očuvao stabilan
                ritam izdavanja blokova.
              </p>
            </div>
          </div>

          <MethodDetails
            methodology="Hash rate se procjenjuje iz pronađenih blokova i trenutačne težine; povijesni niz prikazuje približno posljednjih 90 dana. Prilagodba težine procjenjuje se iz dosadašnjeg ritma epohe."
            limitation="Hash rate nije moguće izravno prebrojiti i kratkoročno oscilira zbog statističke slučajnosti pronalaska blokova. Procjena prilagodbe može se promijeniti prije završetka epohe."
            sources={displaySnapshot?.mining.sources ?? []}
          />
        </div>
      </section>

      <section className="bitcoin-today-section bitcoin-today-section--muted">
        <div className="bitcoin-today-shell">
          <SectionIntro
            eyebrow="DUGOROČNI KONTEKST"
            title="Gdje je cijena prema PL0 modelu"
            description="PL0 je središnja putanja dugoročnog power-law modela. Ona daje mjerilo za odnos cijene i vremena, ali nije cilj cijene niti predviđanje."
          />

          <div className="bitcoin-today-trend-panel">
            <div className="bitcoin-today-trend-panel__summary">
              <div>
                <span>PL0 danas</span>
                <strong className="tabular-nums">
                  {trend ? (
                    usdFormatter.format(trend.pl0Usd)
                  ) : (
                    <EmptyValue status={displaySnapshot?.trend.status} />
                  )}
                </strong>
              </div>
              <div>
                <span>Tržišna cijena / PL0</span>
                <strong className="tabular-nums">
                  {trend ? (
                    `${decimalFormatter.format(trend.ratioToPl0)}×`
                  ) : (
                    <EmptyValue status={displaySnapshot?.trend.status} />
                  )}
                </strong>
              </div>
              <div>
                <span>Zona modela</span>
                <strong>
                  {trend?.zoneLabel ?? (
                    <EmptyValue status={displaySnapshot?.trend.status} />
                  )}
                </strong>
              </div>
            </div>

            <div className="bitcoin-today-gauge-wrap">
              <div className="bitcoin-today-gauge__labels" aria-hidden="true">
                <span>PL−3</span>
                <span>PL0</span>
                <span>PL+5</span>
              </div>
              <div
                className="bitcoin-today-gauge"
                role={trend ? "meter" : undefined}
                aria-label="Položaj tržišne cijene u rasponu power-law modela"
                aria-valuemin={trend ? -3 : undefined}
                aria-valuemax={trend ? 5 : undefined}
                aria-valuenow={
                  trend
                    ? Math.min(5, Math.max(-3, trend.bandPosition))
                    : undefined
                }
              >
                <span
                  className="bitcoin-today-gauge__center"
                  aria-hidden="true"
                />
                {gaugePosition !== null ? (
                  <span
                    className="bitcoin-today-gauge__marker"
                    style={{ left: `${gaugePosition}%` }}
                    aria-hidden="true"
                  />
                ) : null}
              </div>
              <p className="bitcoin-today-gauge__position tabular-nums">
                {trend
                  ? `Položaj: PL${trend.bandPosition >= 0 ? "+" : ""}${decimalFormatter.format(trend.bandPosition)}`
                  : "Položaj će se prikazati nakon učitavanja podataka."}
              </p>
            </div>
          </div>

          <SnapshotMeta
            status={displaySnapshot?.trend.status}
            asOf={displaySnapshot?.trend.asOf}
            sources={displaySnapshot?.trend.sources}
          />

          <div className="bitcoin-today-explainer">
            <div>
              <p className="bitcoin-today-explainer__label">Što ovo znači?</p>
              <p>
                Omjer iznad 1× znači da je tržišna cijena iznad središnje PL0
                putanje, a omjer ispod 1× da je ispod nje. Model pomaže
                smjestiti današnju cijenu u širi vremenski kontekst, ne govori
                što vi trebate napraviti.
              </p>
            </div>
            <GuideLink href={LONG_TERM_TREND_PATH}>
              Otvorite puni dugoročni graf
            </GuideLink>
          </div>

          <MethodDetails
            methodology="PL0 vrijednost računa se postojećom metodologijom Bitcoin Wave power-law modela iz trenutačne visine bloka. Omjer uspoređuje USD tržišnu cijenu sa središnjom putanjom."
            limitation="Matematički model pojednostavljuje stvarno tržište. Ne predviđa buduću cijenu, nije financijski savjet i nije jamstvo budućih rezultata."
            sources={[
              ...(displaySnapshot?.trend.sources ?? []),
              ...(displaySnapshot?.price.sources ?? []),
            ]}
          />
        </div>
      </section>

      <section className="bitcoin-today-final">
        <div className="bitcoin-today-shell">
          <div className="bitcoin-today-final__panel">
            <span className="bitcoin-today-icon-medallion" aria-hidden="true">
              <Sparkles />
            </span>
            <div>
              <h2>Brojke opisuju Bitcoin. Ne opisuju vašu situaciju.</h2>
              <p>
                Vaš Bitcoin standard ovisi o novčanom toku, dugu, obvezama,
                vremenskom horizontu, skrbništvu i ljudima koji ovise o vama.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="cta-primary bitcoin-today-final__cta"
            >
              <a
                href={BITCOIN_STANDARD_CHECK_PATH}
                data-cta="bitcoin-today-standard-check"
              >
                Provjerite svoj Bitcoin standard
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
