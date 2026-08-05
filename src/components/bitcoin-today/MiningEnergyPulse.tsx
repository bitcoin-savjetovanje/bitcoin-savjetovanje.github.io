import { useId, type CSSProperties } from "react"
import {
  ArrowUp,
  Factory,
  Gauge,
  Lightbulb,
  Timer,
  Waves,
  Zap,
} from "lucide-react"

import {
  estimateGigawattIntuition,
  estimateMiningEnergy,
  MINING_ENERGY_ASSUMPTIONS,
} from "@/lib/miningEnergy"
import type { SnapshotStatus } from "@/lib/bitcoinSnapshot"

const decimalFormatter = new Intl.NumberFormat("hr-HR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

const integerFormatter = new Intl.NumberFormat("hr-HR", {
  maximumFractionDigits: 0,
})

const twoDecimalFormatter = new Intl.NumberFormat("hr-HR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const billionPluralRules = new Intl.PluralRules("hr-HR")

function formatBulbScale(value: number): string {
  if (value >= 1_000_000_000) {
    const billions = Number((value / 1_000_000_000).toFixed(1))
    const pluralCategory = billionPluralRules.select(billions)
    const unit =
      pluralCategory === "one"
        ? "milijarda"
        : pluralCategory === "few"
          ? "milijarde"
          : "milijardi"

    return `${decimalFormatter.format(billions)} ${unit}`
  }

  return `${integerFormatter.format(value / 1_000_000)} milijuna`
}

type PowerCellStyle = CSSProperties & {
  "--bitcoin-energy-cell-fill": string
  "--bitcoin-energy-cell-delay": string
}

type PowerCell = {
  key: number
  style: PowerCellStyle
}

export type MiningEnergyPulseProps = {
  hashrateEh: number | null | undefined
  status?: SnapshotStatus
}

function buildPowerCells(powerGw: number): {
  gigawattsPerCell: number
  cells: PowerCell[]
} {
  const maximumCellCount = 36
  const gigawattsPerCell = Math.max(1, Math.ceil(powerGw / maximumCellCount))
  const cellCount = Math.ceil(powerGw / gigawattsPerCell)

  return {
    gigawattsPerCell,
    cells: Array.from({ length: cellCount }, (_, index) => {
      const representedBeforeCell = index * gigawattsPerCell
      const cellFill = Math.min(
        1,
        Math.max(0, (powerGw - representedBeforeCell) / gigawattsPerCell)
      )

      const style: PowerCellStyle = {
        "--bitcoin-energy-cell-fill": `${cellFill * 100}%`,
        "--bitcoin-energy-cell-delay": `${(index % 12) * -170}ms`,
      }

      return {
        key: index,
        style,
      }
    }),
  }
}

export function MiningEnergyPulse({
  hashrateEh,
  status,
}: MiningEnergyPulseProps) {
  const titleId = useId()
  const intuitionTitleId = useId()
  const emptyLabel = status === "unavailable" ? "Privremeno nije dostupno" : "—"
  const oneGigawatt = estimateGigawattIntuition(1)
  const estimate =
    typeof hashrateEh === "number" ? estimateMiningEnergy(hashrateEh) : null
  const powerCells = estimate
    ? buildPowerCells(estimate.referencePowerGw)
    : null

  return (
    <figure className="bitcoin-energy-pulse" aria-labelledby={titleId}>
      <header className="bitcoin-energy-pulse__header">
        <div>
          <p className="bitcoin-energy-pulse__eyebrow">
            ILUSTRATIVNA PRETVORBA
          </p>
          <h3 id={titleId}>Energetski puls mreže</h3>
          <p>
            Hash rate možemo prevesti u približnu električnu snagu ako
            pretpostavimo koliko je učinkovita ukupna rudarska flota.
          </p>
        </div>
        <span className="bitcoin-energy-pulse__icon" aria-hidden="true">
          <Zap />
        </span>
      </header>

      <div className="bitcoin-energy-pulse__body">
        <div className="bitcoin-energy-pulse__visual">
          <div className="bitcoin-energy-pulse__reading">
            <span>Referentna procjena pri 25 J/TH</span>
            <strong
              className={`tabular-nums${estimate ? "" : "bitcoin-energy-pulse__reading--empty"}`}
            >
              {estimate
                ? `≈ ${decimalFormatter.format(estimate.referencePowerGw)} GW`
                : emptyLabel}
            </strong>
          </div>

          {powerCells ? (
            <>
              <div className="bitcoin-energy-pulse__cells" aria-hidden="true">
                {powerCells.cells.map((cell) => (
                  <span key={cell.key} style={cell.style}>
                    <i />
                  </span>
                ))}
              </div>
              <p className="bitcoin-energy-pulse__legend">
                Svaki segment predstavlja približno{" "}
                <strong className="tabular-nums">
                  {integerFormatter.format(powerCells.gigawattsPerCell)} GW
                </strong>{" "}
                kontinuirane snage.
              </p>
            </>
          ) : (
            <div className="bitcoin-energy-pulse__empty">
              {status === "unavailable"
                ? "Energetska procjena trenutačno nije dostupna."
                : "Procjena će se prikazati kada stigne hash rate."}
            </div>
          )}
        </div>

        <dl className="bitcoin-energy-pulse__metrics">
          <div>
            <dt>
              <span
                className="bitcoin-energy-pulse__metric-icon"
                aria-hidden="true"
              >
                <Gauge />
              </span>
              Raspon snage
            </dt>
            <dd className="tabular-nums">
              {estimate
                ? `${decimalFormatter.format(estimate.lowerPowerGw)}–${decimalFormatter.format(estimate.upperPowerGw)} GW`
                : emptyLabel}
            </dd>
            <dd className="bitcoin-energy-pulse__metric-note">
              Pri ilustrativnih 15–35 J/TH
            </dd>
          </div>
          <div>
            <dt>
              <span
                className="bitcoin-energy-pulse__metric-icon"
                aria-hidden="true"
              >
                <Waves />
              </span>
              Bazeni na 100 m
            </dt>
            <dd className="tabular-nums">
              {estimate
                ? `≈ ${decimalFormatter.format(estimate.poolLiftsPerSecondAt100m)} / s`
                : emptyLabel}
            </dd>
            <dd className="bitcoin-energy-pulse__metric-note">
              Idealizirani bazeni dimenzija 50 × 25 × 2 m
            </dd>
          </div>
          <div>
            <dt>
              <span
                className="bitcoin-energy-pulse__metric-icon"
                aria-hidden="true"
              >
                <Timer />
              </span>
              Energija u 10 minuta
            </dt>
            <dd className="tabular-nums">
              {estimate
                ? `≈ ${decimalFormatter.format(estimate.targetIntervalEnergyGwh)} GWh`
                : emptyLabel}
            </dd>
            <dd className="bitcoin-energy-pulse__metric-note">
              Pri ciljnom, a ne stvarnom intervalu jednog bloka
            </dd>
          </div>
        </dl>
      </div>

      <section
        className="bitcoin-energy-pulse__intuition"
        aria-labelledby={intuitionTitleId}
      >
        <header className="bitcoin-energy-pulse__intuition-header">
          <p>1 GW, TRI PRIZORA</p>
          <h4 id={intuitionTitleId}>Koliko je zapravo velik jedan gigavat?</h4>
          <span>
            Gigavat je milijarda vata u istom trenutku. Broj je apstraktan;
            pokret, svjetlo i poznata građevina daju mu mjerilo.
          </span>
        </header>

        <div className="bitcoin-energy-pulse__stories">
          <article className="bitcoin-energy-story bitcoin-energy-story--water">
            <div
              className="bitcoin-energy-story__water-stage"
              role="img"
              aria-label="Animirana usporedba podizanja bazena od razine tla do visine od 100 metara"
            >
              <span className="bitcoin-energy-story__height bitcoin-energy-story__height--top">
                100 m
              </span>
              <span className="bitcoin-energy-story__height bitcoin-energy-story__height--bottom">
                0 m
              </span>
              <div className="bitcoin-energy-story__shaft" aria-hidden="true">
                <span className="bitcoin-energy-story__pool bitcoin-energy-story__pool--one">
                  <Waves />
                </span>
                <span className="bitcoin-energy-story__pool bitcoin-energy-story__pool--two">
                  <Waves />
                </span>
                <span className="bitcoin-energy-story__pool bitcoin-energy-story__pool--three">
                  <Waves />
                </span>
                <span className="bitcoin-energy-story__lift-arrow">
                  <ArrowUp />
                </span>
              </div>
              <div
                className="bitcoin-energy-story__water-floor"
                aria-hidden="true"
              >
                <Waves />
                <Waves />
                <Waves />
              </div>
            </div>
            <div className="bitcoin-energy-story__copy">
              <p className="bitcoin-energy-story__kicker">Misaoni pokus</p>
              <h5>Bazen na vrhu zgrade</h5>
              <p className="bitcoin-energy-story__equation tabular-nums">
                <span>1 GW</span>
                <b>
                  ≈{" "}
                  {oneGigawatt
                    ? integerFormatter.format(oneGigawatt.waterTonnesPerSecond)
                    : "—"}{" "}
                  t vode / s
                </b>
              </p>
              <p className="bitcoin-energy-story__description">
                Dovoljno za podizanje cijelog bazena 50 × 25 × 2 m na 100 metara
                svake približno 2,5 sekunde.
              </p>
              <div className="bitcoin-energy-story__live">
                <span>
                  <i aria-hidden="true" /> Trenutačna referentna procjena
                </span>
                <strong className="tabular-nums">
                  {estimate
                    ? `≈ ${decimalFormatter.format(estimate.poolLiftsPerSecondAt100m)} bazena / s`
                    : emptyLabel}
                </strong>
              </div>
              <small>Idealizirana pretvorba bez gubitaka.</small>
            </div>
          </article>

          <article className="bitcoin-energy-story bitcoin-energy-story--bulbs">
            <div className="bitcoin-energy-story__image" aria-hidden="true">
              <img
                src="/images/bitcoin-today/gigavat-led-polje-v1.webp"
                alt=""
                width="1200"
                height="800"
                loading="lazy"
                decoding="async"
              />
              <span className="bitcoin-energy-story__light-wave" />
              <span className="bitcoin-energy-story__spark bitcoin-energy-story__spark--one" />
              <span className="bitcoin-energy-story__spark bitcoin-energy-story__spark--two" />
              <span className="bitcoin-energy-story__spark bitcoin-energy-story__spark--three" />
              <span className="bitcoin-energy-story__media-icon">
                <Lightbulb />
              </span>
            </div>
            <div className="bitcoin-energy-story__copy">
              <p className="bitcoin-energy-story__kicker">More svjetla</p>
              <h5>Sto milijuna žarulja</h5>
              <p className="bitcoin-energy-story__equation tabular-nums">
                <span>1 GW</span>
                <b>= 100.000.000 LED žarulja</b>
              </p>
              <p className="bitcoin-energy-story__description">
                Kada bi sve žarulje od 10 W bile upaljene istodobno — polje
                svjetla koje je gotovo nemoguće prebrojiti.
              </p>
              <div className="bitcoin-energy-story__live">
                <span>
                  <i aria-hidden="true" /> Trenutačna referentna procjena
                </span>
                <strong className="tabular-nums">
                  {estimate
                    ? `≈ ${formatBulbScale(estimate.ledBulbsEquivalent)} žarulja`
                    : emptyLabel}
                </strong>
              </div>
              <small>Pretpostavljena nazivna snaga jedne žarulje: 10 W.</small>
            </div>
          </article>

          <article className="bitcoin-energy-story bitcoin-energy-story--krsko">
            <div className="bitcoin-energy-story__image" aria-hidden="true">
              <img
                src="/images/bitcoin-today/gigavat-ne-krsko-v1.webp"
                alt=""
                width="1200"
                height="800"
                loading="lazy"
                decoding="async"
              />
              <div className="bitcoin-energy-story__power-rings">
                <span />
                <span />
                <span />
              </div>
              <span className="bitcoin-energy-story__current" />
              <span className="bitcoin-energy-story__media-icon">
                <Factory />
              </span>
            </div>
            <div className="bitcoin-energy-story__copy">
              <p className="bitcoin-energy-story__kicker">Lokalno mjerilo</p>
              <h5>Snaga NE Krško</h5>
              <p className="bitcoin-energy-story__equation tabular-nums">
                <span>1 GW</span>
                <b>
                  ≈{" "}
                  {oneGigawatt
                    ? twoDecimalFormatter.format(
                        oneGigawatt.krskoNetPowerEquivalent
                      )
                    : "—"}{" "}
                  × neto snage
                </b>
              </p>
              <p className="bitcoin-energy-story__description">
                Jedan gigavat odgovara približno 1,44 puta službeno navedenoj
                neto snazi elektrane od 696 MW.
              </p>
              <div className="bitcoin-energy-story__live">
                <span>
                  <i aria-hidden="true" /> Trenutačna referentna procjena
                </span>
                <strong className="tabular-nums">
                  {estimate
                    ? `≈ ${decimalFormatter.format(estimate.krskoNetPowerEquivalent)} × neto snage`
                    : emptyLabel}
                </strong>
              </div>
              <small>
                Stilizirana ilustracija; usporedba snage, ne izvora energije.{" "}
                <a
                  href="https://www.nek.si/hr/pogon/tehnicki-podaci"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Izvor: NE Krško
                </a>
                .
              </small>
            </div>
          </article>
        </div>
      </section>

      <div className="bitcoin-energy-pulse__formula">
        <span>Hash rate</span>
        <b aria-hidden="true">×</b>
        <span>J/TH flote</span>
        <b aria-hidden="true">=</b>
        <span>električna snaga</span>
      </div>

      <figcaption>
        Ovo nije izravno mjerenje potrošnje i ne govori koristi li mreža hidro,
        nuklearnu, fosilnu ili drugu energiju. Prikazuje samo red veličine
        ulazne snage uz zadane pretpostavke učinkovitosti.
      </figcaption>

      <details className="bitcoin-energy-pulse__details">
        <summary>Metodologija i ograničenja</summary>
        <div>
          <p>
            Račun koristi odnos 1 EH/s = 1.000.000 TH/s i činjenicu da je J/TH ×
            TH/s jednak vatima. Referentna sredina je{" "}
            {MINING_ENERGY_ASSUMPTIONS.referenceFleetJoulesPerTerahash} J/TH, uz
            prikaz raspona od{" "}
            {MINING_ENERGY_ASSUMPTIONS.efficientFleetJoulesPerTerahash} do{" "}
            {MINING_ENERGY_ASSUMPTIONS.lessEfficientFleetJoulesPerTerahash}{" "}
            J/TH.
          </p>
          <p>
            Usporedba s vodom koristi P = m × g × h / t, standardnu gravitaciju
            i idealnu pretvorbu bez gubitaka. Bazen je ovdje izričito definiran
            dimenzijama 50 × 25 × 2 m. Usporedba sa svjetlom pretpostavlja LED
            žarulje nazivne snage 10 W.
          </p>
          <p>
            Stvarna učinkovitost i pomoćna potrošnja rudarskih lokacija nisu
            javno poznate. NE Krško služi samo kao lokalna usporedba električne
            snage prema službenoj neto vrijednosti od 696 MW; ne tvrdi da rudari
            koriste tu elektranu ili nuklearnu energiju. Za širi metodološki
            kontekst pogledajte{" "}
            <a
              href="https://ccaf.io/cbnsi/cbeci/methodology"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cambridgeov CBECI model
            </a>
            .
          </p>
        </div>
      </details>
    </figure>
  )
}
