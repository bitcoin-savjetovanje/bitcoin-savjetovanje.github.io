import { useMemo, useState } from "react"
import { ArrowDown, ArrowRight } from "lucide-react"
import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { OpportunityChart } from "@/components/opportunity-cost/OpportunityChart"
import { useOpportunityMarket } from "@/components/opportunity-cost/useOpportunityMarket"
import { realEstateBitcoinRoute } from "@/content/clientRoutes"
import { CONVERSATION_PATH } from "@/content/site"
import {
  OPPORTUNITY_HORIZONS,
  projectBitcoinOpportunity,
} from "@/lib/bitcoinOpportunityCost"
import {
  compareRealEstate,
  projectRealEstate,
  validRealEstateInputs,
  type RealEstateInputs,
} from "@/lib/realEstateOpportunityCost"

const initialDraft = {
  propertyValue: "250000",
  monthlyRent: "1000",
  annualCosts: "3000",
  propertyGrowth: "5",
  rentGrowth: "0",
  saleCostRate: "0",
  monthlyExpenses: "",
}
type Field = keyof typeof initialDraft
const fieldDefinitions: {
  key: Field
  label: string
  helper?: string
  min: number
  max: number
  optional?: boolean
}[] = [
  {
    key: "propertyValue",
    label: "Trenutna tržišna vrijednost nekretnine / portfelja (€)",
    min: 0.01,
    max: 1e12,
  },
  {
    key: "monthlyRent",
    label: "Mjesečni bruto najam (€)",
    helper: "Unesite 0 ako nekretninu ne iznajmljujete.",
    min: 0,
    max: 1e12,
  },
  {
    key: "annualCosts",
    label: "Godišnji troškovi nekretnine (€)",
    helper:
      "Održavanje, prazni periodi, upravljanje, osiguranje, porezi i drugi troškovi koje želite uključiti.",
    min: 0,
    max: 1e12,
  },
  {
    key: "propertyGrowth",
    label: "Pretpostavljeni godišnji rast vrijednosti (%)",
    helper:
      "Početnih 5 % samo je primjer, a ne povijesni prosjek. Možete unijeti i pad vrijednosti.",
    min: -100,
    max: 1000,
  },
  {
    key: "rentGrowth",
    label: "Pretpostavljeni godišnji rast najma (%)",
    min: -100,
    max: 1000,
  },
  {
    key: "saleCostRate",
    label: "Procijenjeni trošak prodaje (%)",
    helper:
      "Posredovanje, transakcijski ili drugi troškovi koje želite uključiti u prodaju danas.",
    min: 0,
    max: 100,
  },
  {
    key: "monthlyExpenses",
    label: "Moji prosječni mjesečni troškovi (€)",
    helper:
      "Neobavezno. Otvara usporedbu s vašim sadašnjim životnim troškovima.",
    min: 0.01,
    max: 1e12,
    optional: true,
  },
]
const number = new Intl.NumberFormat("hr-HR", { maximumFractionDigits: 2 })
function formatted(
  value: number | null,
  options: Intl.NumberFormatOptions = {}
) {
  return value === null || !Number.isFinite(value)
    ? "Nije dostupno"
    : new Intl.NumberFormat("hr-HR", {
        maximumFractionDigits: 2,
        ...options,
      }).format(value)
}
const eur = (v: number | null) =>
  formatted(v, { style: "currency", currency: "EUR", maximumFractionDigits: 0 })
const usd = (v: number | null) =>
  formatted(v, { style: "currency", currency: "USD", maximumFractionDigits: 0 })
const btc = (v: number | null) =>
  v === null
    ? "Nije dostupno"
    : `${formatted(v, { maximumFractionDigits: 8 })} BTC`
const pct = (v: number | null) =>
  formatted(v, {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
const duration = (years: number) =>
  years === 1 ? "1 godina" : `${years} godina`
function Metric({
  label,
  value,
  emphasis = false,
}: {
  label: string
  value: string
  emphasis?: boolean
}) {
  return (
    <div className={emphasis ? "oc-metric oc-metric-emphasis" : "oc-metric"}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

export function RealEstateBitcoin() {
  const [draft, setDraft] = useState(initialDraft)
  const [years, setYears] = useState<number>(5)
  const { market, mapper, asOf, stale, unavailable, refresh } =
    useOpportunityMarket()
  const errors = fieldDefinitions.filter((field) => {
    const raw = draft[field.key]
    if (field.optional && raw === "") return false
    const value = Number(raw)
    return (
      raw.trim() === "" ||
      !Number.isFinite(value) ||
      value < field.min ||
      value > field.max
    )
  })
  const input: RealEstateInputs = {
    propertyValue: Number(draft.propertyValue),
    monthlyRent: Number(draft.monthlyRent),
    annualCosts: Number(draft.annualCosts),
    propertyGrowth: Number(draft.propertyGrowth) / 100,
    rentGrowth: Number(draft.rentGrowth) / 100,
    saleCostRate: Number(draft.saleCostRate) / 100,
  }
  const valid =
    !errors.some((field) => field.key !== "monthlyExpenses") &&
    validRealEstateInputs(input)
  const annualRent = 12 * input.monthlyRent
  const annualNetRent = annualRent - input.annualCosts
  const netSale = input.propertyValue * (1 - input.saleCostRate)
  const projections = useMemo(
    () =>
      market && mapper
        ? Array.from({ length: 30 }, (_, i) =>
            projectBitcoinOpportunity(market, mapper, i + 1)
          )
        : [],
    [market, mapper]
  )
  const rows =
    valid && market
      ? OPPORTUNITY_HORIZONS.map((year) => {
          const projection = projections[year - 1]
          const result = projection
            ? compareRealEstate(input, projection, market.priceEur)
            : null
          return { year, projection, result }
        })
      : []
  const selected = rows.find((row) => row.year === years)
  const result = selected?.result
  const projection = selected?.projection
  const chartRows =
    result && market
      ? Array.from({ length: years + 1 }, (_, year) => {
          const property = projectRealEstate(input, year)!
          const point = year === 0 ? null : projections[year - 1]
          if (year > 0 && !point) return null
          const factor = point?.growthFactor ?? 1
          return {
            propertyIndex: (property.economicValue / input.propertyValue) * 100,
            bitcoinIndex: factor * (1 - input.saleCostRate) * 100,
            propertyBtc: property.economicValue / (market.priceEur * factor),
          }
        })
      : []
  const chartReady =
    chartRows.length > 0 && chartRows.every((row) => row !== null)
  const expenses = Number(draft.monthlyExpenses)
  const showExpenses =
    valid &&
    draft.monthlyExpenses !== "" &&
    !errors.some((field) => field.key === "monthlyExpenses")
  const renderField = (field: (typeof fieldDefinitions)[number]) => {
    const invalid = errors.some((error) => error.key === field.key)
    return (
      <div className="oc-field" key={field.key}>
        <label htmlFor={`oc-${field.key}`}>{field.label}</label>
        <input
          id={`oc-${field.key}`}
          type="number"
          inputMode="decimal"
          lang="hr"
          step="any"
          min={field.min}
          max={field.max}
          required={!field.optional}
          value={draft[field.key]}
          aria-invalid={invalid}
          aria-describedby={`oc-${field.key}-help`}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              [field.key]: event.target.value,
            }))
          }
        />
        <p
          id={`oc-${field.key}-help`}
          className={invalid ? "oc-input-error" : undefined}
        >
          {invalid
            ? `Molimo unesite broj od ${number.format(field.min)} do ${number.format(field.max)}.`
            : field.helper}
        </p>
      </div>
    )
  }
  return (
    <>
      <Seo {...realEstateBitcoinRoute} />
      <div className="oc-page">
        <section className="oc-hero">
          <div className="oc-container oc-hero-grid">
            <div>
              <p className="oc-eyebrow">Kalkulator oportunitetnog troška</p>
              <h1>Nekretnina ili Bitcoin?</h1>
              <p className="oc-lead">
                Nije važno samo koliko će nekretnina vrijediti u eurima. Važno
                je i koliko će vrijediti u Bitcoinu.
              </p>
              <p>
                Unesite tržišnu vrijednost, prihod od najma i troškove.
                Kalkulator pokazuje koliko bi nekretnina morala rasti i
                zarađivati da bi kroz vrijeme zadržala vrijednost u odnosu na
                Bitcoinov dugoročni trend.
              </p>
              <p className="oc-callout">
                Model nije prognoza cijene. On pokazuje posljedice zadanih
                pretpostavki.
              </p>
              <div className="oc-actions">
                <Button asChild size="lg" className="cta-primary">
                  <a href="#izracun">
                    Izračunajte <ArrowDown aria-hidden="true" />
                  </a>
                </Button>
                <a href="/dugorocni-trend/" className="oc-link">
                  Pogledajte dugoročni trend Bitcoina
                </a>
              </div>
            </div>
            <img
              src="/images/dugorocni-trend-hero-v1.webp"
              width="1536"
              height="1024"
              alt="Bilježnica s dugoročnom krivuljom i satovi na kamenoj terasi uz more"
              fetchPriority="high"
            />
          </div>
        </section>

        <section id="izracun" className="oc-container oc-section">
          <div className="oc-section-intro">
            <p className="oc-eyebrow">01 · Vaše pretpostavke</p>
            <h2>Jedna nekretnina ili cijeli portfelj</h2>
            <p>
              Za više nekretnina unesite zbroj vrijednosti, najamnina i troškova
              te zajedničku pretpostavku rasta. Početni iznosi služe kao
              primjer.
            </p>
          </div>
          <form
            className="oc-input-panel"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="oc-input-grid">
              {fieldDefinitions.slice(0, 4).map(renderField)}
            </div>
            <details className="oc-details">
              <summary>Dodatne pretpostavke i životni troškovi</summary>
              <div className="oc-input-grid oc-advanced">
                {fieldDefinitions.slice(4).map(renderField)}
              </div>
            </details>
            <div className="oc-input-footer">
              <p>Unesene vrijednosti obrađuju se samo u vašem pregledniku.</p>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setDraft(initialDraft)
                  setYears(5)
                }}
              >
                Vrati početne vrijednosti
              </Button>
            </div>
          </form>
          <p className="oc-debt-note">
            Ovaj izračun pretpostavlja da je nekretnina bez{" "}
            <a href="/dug/" className="oc-link">
              duga
            </a>
            . Kredit mijenja novčani tok, kapital i rizik te zahtijeva zaseban
            izračun.
          </p>
          {valid ? (
            <dl className="oc-current-metrics">
              <Metric
                label="Današnja vrijednost"
                value={eur(input.propertyValue)}
              />
              <Metric label="Bruto godišnji najam" value={eur(annualRent)} />
              <Metric label="Neto godišnji najam" value={eur(annualNetRent)} />
              <Metric
                label="Neto prinos od najma danas"
                value={pct(annualNetRent / input.propertyValue)}
              />
              <Metric
                label="Današnja protuvrijednost u BTC-u"
                value={btc(
                  market ? input.propertyValue / market.priceEur : null
                )}
                emphasis
              />
            </dl>
          ) : (
            <p role="status" className="oc-callout">
              Molimo provjerite označene unose kako bi se izračun mogao
              prikazati.
            </p>
          )}
          <div className="oc-market-note" role="status">
            {market && mapper ? (
              <p>
                {stale
                  ? "Zadnja valjana snimka; podaci mogu kasniti."
                  : "Aktualna Bitcoin snimka."}{" "}
                BTC: {eur(market.priceEur)} / {usd(market.priceUsd)}.{" "}
                {asOf &&
                  `Vrijeme cijene: ${new Intl.DateTimeFormat("hr-HR", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Zagreb" }).format(new Date(asOf))} (Zagreb).`}{" "}
                Osvježavanje svake minute.
              </p>
            ) : (
              <p>
                {unavailable
                  ? "Trenutačno nisu dostupni svi tržišni podaci potrebni za Bitcoin usporedbu. Vaši unosi ostaju sačuvani dok je stranica otvorena."
                  : "Učitavanje aktualne cijene Bitcoina i podataka PL0 modela…"}
              </p>
            )}
            {(unavailable || stale) && (
              <Button type="button" variant="outline" onClick={refresh}>
                Ponovi dohvat podataka
              </Button>
            )}
          </div>
        </section>

        <section className="oc-results-section">
          <div className="oc-container oc-section">
            <p className="oc-eyebrow">02 · Vrijednost kroz vrijeme</p>
            <h2>Koliko će Bitcoina ova nekretnina kupiti?</h2>
            <div
              className="oc-horizons"
              role="group"
              aria-label="Razdoblje usporedbe"
            >
              {OPPORTUNITY_HORIZONS.map((year) => (
                <Button
                  key={year}
                  type="button"
                  variant={years === year ? "default" : "outline"}
                  aria-pressed={years === year}
                  aria-controls="oc-selected-result"
                  onClick={() => setYears(year)}
                >
                  {duration(year)}
                </Button>
              ))}
            </div>
            <p className="sr-only" role="status">
              {result
                ? `Razdoblje: ${duration(years)}. Nekretnina i neto najam: ${btc(result.futurePropertyBtc)}. Ukupna promjena izražena u Bitcoinu: ${pct(result.btcDenominatedChange)}.`
                : "Bitcoin usporedba još nije dostupna."}
            </p>
            <div id="oc-selected-result">
              {result && projection ? (
                <>
                  <p className="oc-result-date">
                    Scenarij do{" "}
                    {new Intl.DateTimeFormat("hr-HR", {
                      dateStyle: "long",
                      timeZone: "UTC",
                    }).format(new Date(`${projection.targetDate}T00:00:00Z`))}
                  </p>
                  <div className="oc-scenarios">
                    <article className="oc-scenario">
                      <p className="oc-eyebrow">Nekretnina</p>
                      <h3>Vrijednost i neto najam</h3>
                      <dl>
                        <Metric
                          label="Buduća tržišna vrijednost"
                          value={eur(result.endingPropertyValue)}
                        />
                        <Metric
                          label="Kumulativni neto prihod od najma"
                          value={eur(result.cumulativeNetRent)}
                        />
                        <Metric
                          label="Ukupni ekonomski rezultat"
                          value={eur(result.economicValue)}
                          emphasis
                        />
                        <Metric
                          label="Protuvrijednost po budućoj modeliranoj cijeni BTC-a"
                          value={btc(result.futurePropertyBtc)}
                        />
                      </dl>
                    </article>
                    <article className="oc-scenario oc-scenario-bitcoin">
                      <p className="oc-eyebrow">Bitcoin</p>
                      <h3>Prodaja danas, saldo u BTC-u</h3>
                      <dl>
                        <Metric
                          label="Neto iznos nakon prodaje danas"
                          value={eur(result.netSaleProceeds)}
                        />
                        <Metric
                          label="BTC koji se može dobiti danas"
                          value={btc(result.btcObtainableToday)}
                        />
                        <Metric
                          label="Buduća PL0 vrijednost jednog BTC-a"
                          value={usd(projection.futurePl0Usd)}
                        />
                        <Metric
                          label="Modelirana završna EUR-protuvrijednost salda"
                          value={eur(result.btcScenarioEndValueEur)}
                          emphasis
                        />
                      </dl>
                    </article>
                  </div>
                  <div className="oc-comparison">
                    <p>
                      Prema ovim pretpostavkama, nekretnina bi za {years}{" "}
                      {years === 1 ? "godinu" : "godina"}, zajedno s neto
                      najmom, predstavljala{" "}
                      <strong>{btc(result.futurePropertyBtc)}</strong> kupovne
                      moći, u odnosu na{" "}
                      <strong>{btc(result.currentPropertyBtc)}</strong> danas.
                    </p>
                    <dl>
                      <Metric
                        label="Promjena vrijednosti izražene u Bitcoinu · ukupna promjena"
                        value={pct(result.btcDenominatedChange)}
                        emphasis
                      />
                      <Metric
                        label="Razlika prema Bitcoin scenariju nakon troška prodaje · ukupna promjena"
                        value={pct(result.propertyVsBitcoin)}
                      />
                    </dl>
                    {result.economicValue < 0 && (
                      <p>
                        Negativan rezultat znači da kumulativni gubitak od najma
                        premašuje preostalu vrijednost nekretnine; nije riječ o
                        negativnoj tržišnoj cijeni nekretnine.
                      </p>
                    )}
                    {result.netSaleProceeds === 0 && (
                      <p>
                        Trošak prodaje od 100 % ne ostavlja Bitcoin saldo.
                        Postotna razlika prema tom saldu nije definirana.
                      </p>
                    )}
                    <p className="oc-fine">
                      Prva usporedba polazi od današnje bruto vrijednosti
                      imovine. Druga uspoređuje ukupni rezultat s Bitcoin saldom
                      kupljenim nakon troška prodaje. Modelirana cijena za
                      preračun: {eur(projection.futureBtcEurModel)} po BTC-u.
                    </p>
                  </div>
                  <dl className="oc-rates">
                    <Metric
                      label="BTC: današnja tržišna cijena → budući PL0 · godišnje složeno (CAGR)"
                      value={pct(projection.marketToPl0Cagr)}
                    />
                    <Metric
                      label="Rast same PL0 putanje · godišnje složeno (CAGR), samo kontekst"
                      value={pct(projection.pl0ToPl0Cagr)}
                    />
                    <Metric
                      label="BTC: današnja tržišna cijena → budući PL0 · ukupna promjena"
                      value={pct(projection.totalChange)}
                    />
                  </dl>
                  <div className="oc-break-even">
                    <p className="oc-eyebrow">Točka pokrića</p>
                    <h3>Što bi nekretnina trebala ostvariti da drži korak?</h3>
                    <div className="oc-break-grid">
                      <div>
                        <h4>Potreban godišnji rast vrijednosti</h4>
                        {result.requiredGrowth === null ? (
                          <p>
                            Neto najam već premašuje Bitcoin scenarij čak i uz
                            završnu vrijednost nekretnine od nula eura. Ne
                            postoji stopa rasta koja daje točnu jednakost uz
                            nenegativnu vrijednost nekretnine.
                          </p>
                        ) : (
                          <>
                            <p className="oc-big-number">
                              {pct(result.requiredGrowth)}
                            </p>
                            <p>godišnje složeno (CAGR)</p>
                            <p>
                              Uz zadane pretpostavke o najmu i troškovima,
                              nekretnina bi trebala{" "}
                              {result.requiredGrowth < 0
                                ? "gubiti"
                                : "povećavati"}{" "}
                              vrijednost po ovoj godišnjoj stopi da bi ukupnim
                              rezultatom držala korak s Bitcoin scenarijem.
                            </p>
                            {result.requiredGrowth < 0 && (
                              <p>
                                Negativna stopa znači da bi točku pokrića
                                dosegnula i uz takav pad vrijednosti.
                              </p>
                            )}
                          </>
                        )}
                      </div>
                      <div>
                        <h4>Potreban početni mjesečni bruto najam</h4>
                        {result.requiredMonthlyRent <= 0 ? (
                          <p>
                            Prema zadanoj stopi rasta vrijednosti, dodatni najam
                            nije potreban za dostizanje ove točke pokrića.
                          </p>
                        ) : (
                          <>
                            <p className="oc-big-number">
                              {eur(result.requiredMonthlyRent)}
                            </p>
                            <p>
                              Uz pretpostavljeni rast vrijednosti od{" "}
                              {pct(input.propertyGrowth)} godišnje, početni
                              mjesečni najam trebao bi biti približno ovaj
                              iznos. Uključeni su rast najma od{" "}
                              {pct(input.rentGrowth)} godišnje i godišnji
                              troškovi od {eur(input.annualCosts)}.
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p className="oc-callout">
                  Usporedba za odabrano razdoblje prikazat će se kada su unosi i
                  tržišni podaci dostupni.
                </p>
              )}
            </div>

            {chartReady && (
              <div className="oc-charts">
                <OpportunityChart
                  title="Vrijednost kroz vrijeme"
                  years={years}
                  unit="Indeks · danas = 100"
                  description="Polazište obiju putanja ista je današnja vrijednost imovine, prikazana indeksom 100. Bitcoin saldo odmah se umanjuje za zadani trošak prodaje, vidljiv kao početni pad linije."
                  series={[
                    {
                      label: "Nekretnina + kumulativni neto najam",
                      values: chartRows.map((row) => row!.propertyIndex),
                    },
                    {
                      label: "Bitcoin prema PL0 scenariju",
                      values: chartRows.map((row) => row!.bitcoinIndex),
                      startValue: 100,
                      dashed: true,
                    },
                  ]}
                />
                <OpportunityChart
                  title="Nekretnina izražena u Bitcoinu"
                  years={years}
                  unit="BTC"
                  description="Koliko BTC-a predstavlja nekretnina zajedno s kumulativnim neto najmom, po modeliranoj cijeni za pojedinu godinu."
                  series={[
                    {
                      label: "BTC-protuvrijednost nekretnine i najma",
                      values: chartRows.map((row) => row!.propertyBtc),
                    },
                  ]}
                />
              </div>
            )}
            {chartReady && (
              <p className="oc-fine">
                Linije povezuju godišnje scenarije; ne predviđaju glatko
                kretanje tržišne cijene. Današnja točka koristi tržišnu cijenu,
                a buduće točke PL0. Kretanje do tih točaka nije modelirano.
              </p>
            )}

            <div id="usporedba-razdoblja" className="oc-table-section">
              <h3>Sva četiri razdoblja na jednom mjestu</h3>
              <div
                className="oc-table-scroll"
                tabIndex={0}
                role="region"
                aria-label="Tablica usporedbe razdoblja; može se pomicati vodoravno"
              >
                <table>
                  <caption>
                    Vrijednosti prema vašim pretpostavkama. Obje stope rasta
                    BTC-a označavaju godišnje složeno (CAGR). Razlika je ukupna
                    promjena prema Bitcoin scenariju nakon troška prodaje.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Razdoblje</th>
                      <th scope="col">
                        BTC: tržišna cijena → PL0
                        <br />
                        godišnje složeno (CAGR)
                      </th>
                      <th scope="col">
                        Rast same PL0 putanje
                        <br />
                        godišnje složeno (CAGR)
                      </th>
                      <th scope="col">Vrijednost nekretnine</th>
                      <th scope="col">Kumulativni neto najam</th>
                      <th scope="col">Ukupna vrijednost nekretnine i najma</th>
                      <th scope="col">
                        Bitcoin scenarij (EUR-protuvrijednost)
                      </th>
                      <th scope="col">
                        Razlika prema Bitcoinu
                        <br />
                        ukupna promjena
                      </th>
                      <th scope="col">Nekretnina i najam izraženi u BTC-u</th>
                    </tr>
                  </thead>
                  <tbody>
                    {OPPORTUNITY_HORIZONS.map((year) => {
                      const row = rows.find((item) => item.year === year)
                      return (
                        <tr key={year} data-selected={year === years}>
                          <th scope="row">{duration(year)}</th>
                          <td>
                            {pct(row?.projection?.marketToPl0Cagr ?? null)}
                          </td>
                          <td>{pct(row?.projection?.pl0ToPl0Cagr ?? null)}</td>
                          <td>
                            {eur(row?.result?.endingPropertyValue ?? null)}
                          </td>
                          <td>{eur(row?.result?.cumulativeNetRent ?? null)}</td>
                          <td>{eur(row?.result?.economicValue ?? null)}</td>
                          <td>
                            {eur(row?.result?.btcScenarioEndValueEur ?? null)}
                          </td>
                          <td>{pct(row?.result?.propertyVsBitcoin ?? null)}</td>
                          <td>{btc(row?.result?.futurePropertyBtc ?? null)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="oc-container oc-section oc-education">
          <p className="oc-eyebrow">03 · Novac za život</p>
          <h2>Najam je prihod. Rast kupovne moći nije najamnina.</h2>
          <p>
            Nekretnina koju iznajmljujete može stvarati razmjerno predvidiv
            novčani tok. Bitcoin ne isplaćuje najamninu. Kada ga držite kao
            novac, životne troškove plaćate iz samog novčanog salda.
          </p>
          <p>
            Rast kupovne moći Bitcoina može povećati ono što tim saldom možete
            kupiti. No to nije ugovoreni prinos i neće dolaziti ravnomjerno
            svakog mjeseca. Plaćanjem troškova trošite dio BTC-a, a ovaj osnovni
            scenarij ne oduzima takvu osobnu potrošnju.
          </p>
          <p>
            Zato pitanje „Gdje je moj mjesečni Bitcoin prinos?” ne opisuje ono
            što se događa. Korisnije je pitati: koliki je moj novčani saldo,
            koliko mu se kupovna moć može promijeniti, koliki su moji stvarni
            troškovi i koliko salda trebam potrošiti?
          </p>
          {showExpenses && (
            <div className="oc-personal">
              <h3>Što ovo znači za moj život?</h3>
              {annualNetRent >= 0 ? (
                <p>
                  Trenutni neto prihod od najma pokriva približno{" "}
                  <strong>
                    {formatted(annualNetRent / expenses, {
                      maximumFractionDigits: 1,
                    })}{" "}
                    mjeseci
                  </strong>{" "}
                  vaših sadašnjih troškova godišnje.
                </p>
              ) : (
                <p>
                  Nekretnina ima godišnji neto odljev od{" "}
                  <strong>{eur(-annualNetRent)}</strong>, što odgovara dodatnom
                  opterećenju od{" "}
                  {formatted(-annualNetRent / expenses, {
                    maximumFractionDigits: 1,
                  })}{" "}
                  mjeseci vaših sadašnjih troškova.
                </p>
              )}
              {netSale > 0 && annualNetRent >= 0 ? (
                <p>
                  Da biste danas iz Bitcoin salda izvukli isti godišnji iznos
                  kao iz neto najma, taj iznos predstavlja{" "}
                  <strong>{pct(annualNetRent / netSale)}</strong> početnog
                  Bitcoin salda.
                </p>
              ) : (
                <p>
                  {netSale === 0
                    ? "Nakon zadanog troška prodaje ne ostaje početni Bitcoin saldo pa omjer nije definiran."
                    : `Matematički odnos neto najma i početnog Bitcoin salda iznosi ${pct(annualNetRent / netSale)}. Negativan najam predstavlja trošak, a ne prihod koji treba nadomjestiti.`}
                </p>
              )}
              <p>
                Ovo nije preporučena stopa povlačenja, nego samo matematički
                odnos današnjeg neto najma i početnog novčanog salda.
              </p>
            </div>
          )}
        </section>

        <section className="oc-container oc-assumptions">
          <details className="oc-details">
            <summary>Što ovaj model ne zna?</summary>
            <div className="oc-assumptions-copy">
              <p>
                PL0 je matematički model, a ne obećanje. Buduća tržišna cijena
                Bitcoina može znatno odstupati od te putanje. Bitcoin ima
                volatilnost te rizike čuvanja i sigurnosti.
              </p>
              <p>
                Bitcoinov scenarij primjenjuje promjenu između današnje tržišne
                cijene BTC-a i buduće PL0 vrijednosti na početni iznos u eurima.
                Budući tečaj EUR/USD nije modeliran. Inflacija eura nije zasebno
                modelirana.
              </p>
              <p>
                Troškovi održavanja, upravljanja, osiguranja i porezi uključeni
                su samo ako ih unesete. Prazni periodi uključeni su samo ako ih
                odrazite u najamnini ili troškovima; isti gubitak nemojte
                uračunati dvaput. Godišnji troškovi ostaju nominalno jednaki
                kroz razdoblje.
              </p>
              <p>
                Trošak prodaje primjenjuje se samo na hipotetsku prodaju danas.
                Završna vrijednost nekretnine tržišna je vrijednost prije
                eventualne prodaje na kraju razdoblja. Transakcijski troškovi
                uključeni su samo u mjeri u kojoj ih unesete.
              </p>
              <p>
                Model pretpostavlja nekretninu bez duga. Krediti, kamate i
                otplata glavnice nisu uključeni.
              </p>
              <p>
                Ukupni rezultat nekretnine zbroj je završne tržišne vrijednosti
                i kumulativnog neto najma. Prihod od najma ne reinvestira se, ne
                ukamaćuje i ne troši u osnovnom izračunu. Ovo nije IRR niti
                diskontirani novčani tok: najam primljen prve godine u stvarnom
                životu nema istu ekonomsku vrijednost kao najam primljen desete
                godine.
              </p>
              <p>
                Nekretnina može imati osobnu, stambenu ili poslovnu korist koju
                ovaj izračun ne prikazuje. Porezne, pravne i računovodstvene
                posljedice ovise o vašim okolnostima i nadležnosti.
              </p>
            </div>
          </details>
        </section>

        <section className="oc-container oc-section oc-conclusion">
          <h2>Oportunitetni trošak postaje vidljiv</h2>
          <p>
            Imovina može rasti u eurima i istodobno padati izražena u Bitcoinu.
            To ne znači automatski da je treba prodati. Nekretnina može stvarati
            prihod, imati osobnu ili poslovnu funkciju i biti vrijedan dio neto
            imovine.
          </p>
          <p>
            Ali ako je Bitcoin vaš primarni novac, postoji još jedno pitanje
            koje vrijedi postaviti: koliko Bitcoina ova imovina danas
            predstavlja — i koliko će ga predstavljati kroz vrijeme ako se vaše
            pretpostavke ostvare?
          </p>
          <h3>Želite proći svoju neto imovinu i pravila zajedno?</h3>
          <Button asChild size="lg" className="cta-primary">
            <a href={CONVERSATION_PATH}>
              Rezervirajte razgovor <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </section>
      </div>
    </>
  )
}
