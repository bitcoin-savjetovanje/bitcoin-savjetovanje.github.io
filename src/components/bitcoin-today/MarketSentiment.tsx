import { BrainCircuit } from "lucide-react"

import type {
  BitcoinSentimentSnapshot,
  SnapshotGroup,
} from "@/lib/bitcoinSnapshot"

import { EmptyValue, SnapshotMeta } from "./MetricPrimitives"

function sentimentInterpretation(score: number) {
  if (score <= 24) {
    return "Tržišno raspoloženje izrazito je obrambeno, uz pojačan oprez i sklonost izbjegavanju rizika."
  }
  if (score <= 44) {
    return "Sudionici su trenutačno skloniji oprezu nego optimizmu."
  }
  if (score <= 55) {
    return "Raspoloženje nema izraženu prevagu straha ni pohlepe."
  }
  if (score <= 74) {
    return "Optimizam, momentum i sklonost riziku trenutačno su naglašeniji."
  }
  return "Tržišno raspoloženje izrazito je optimistično, uz povećanu sklonost riziku i FOMO ponašanju."
}

export function MarketSentiment({
  group,
}: {
  group?: SnapshotGroup<BitcoinSentimentSnapshot>
}) {
  const sentiment = group?.value ?? null
  const isUnavailable = group?.status === "unavailable"
  const markerPosition = sentiment
    ? Math.min(98, Math.max(2, sentiment.score))
    : null

  return (
    <section
      className="bitcoin-today-sentiment"
      aria-labelledby="bitcoin-today-sentiment-title"
    >
      <div className="bitcoin-today-sentiment__heading">
        <span className="bitcoin-today-icon-medallion" aria-hidden="true">
          <BrainCircuit />
        </span>
        <div>
          <p className="bitcoin-today-sentiment__eyebrow">TRŽIŠNI SENTIMENT</p>
          <h2 id="bitcoin-today-sentiment-title">Indeks straha i pohlepe</h2>
        </div>
      </div>

      <div className="bitcoin-today-sentiment__reading">
        <strong className="tabular-nums">
          {sentiment ? (
            <>
              {sentiment.score} <span>/ 100</span>
            </>
          ) : (
            <EmptyValue status={group?.status} />
          )}
        </strong>
        <p>
          {sentiment?.label ??
            (isUnavailable
              ? "Privremeno nije dostupno"
              : "Čekam dnevno očitanje")}
        </p>
      </div>

      <div className="bitcoin-today-sentiment__meter-wrap">
        <div
          className="bitcoin-today-sentiment__meter"
          role={sentiment ? "meter" : undefined}
          aria-label="Indeks tržišnog straha i pohlepe"
          aria-valuemin={sentiment ? 0 : undefined}
          aria-valuemax={sentiment ? 100 : undefined}
          aria-valuenow={sentiment?.score}
          aria-valuetext={sentiment?.label}
        >
          {markerPosition !== null ? (
            <span
              className="bitcoin-today-sentiment__marker"
              style={{ left: markerPosition + "%" }}
              aria-hidden="true"
            />
          ) : null}
        </div>
        <div className="bitcoin-today-sentiment__scale" aria-hidden="true">
          <span>Strah</span>
          <span>Neutralno</span>
          <span>Pohlepa</span>
        </div>
      </div>

      <p className="bitcoin-today-sentiment__interpretation">
        {sentiment
          ? sentimentInterpretation(sentiment.score)
          : isUnavailable
            ? "Novo očitanje tržišnog raspoloženja trenutačno nije dostupno."
            : "Interpretacija će se prikazati nakon učitavanja podataka."}
      </p>
      <p className="bitcoin-today-sentiment__note">
        Dnevni pokazatelj raspoloženja nije predviđanje cijene ni uputa za
        trgovanje.
      </p>

      <SnapshotMeta
        status={group?.status}
        asOf={group?.asOf}
        sources={group?.sources}
      />
    </section>
  )
}
