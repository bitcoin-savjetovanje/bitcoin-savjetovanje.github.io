import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

type SnapshotStatus = "live" | "stale" | "unavailable"

const statusLabels: Record<SnapshotStatus, string> = {
  live: "Ažurno",
  stale: "Zastarjelo",
  unavailable: "Nedostupno",
}

const measuredAtFormatter = new Intl.DateTimeFormat("hr-HR", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Zagreb",
})

function formatMeasuredAt(value: string | null | undefined) {
  if (!value) return null
  const date = new Date(value)
  if (!Number.isFinite(date.getTime())) return null
  return measuredAtFormatter.format(date)
}

function sourceLabel(source: string) {
  if (source === "/dugorocni-trend/") {
    return "Bitcoin Savjetovanje (PL0 metodologija)"
  }

  try {
    const url = new URL(source)
    if (
      url.hostname === "alternative.me" ||
      url.hostname.endsWith(".alternative.me")
    ) {
      return "Alternative.me"
    }
    if (url.hostname === "mempool.space") {
      const mempoolLabels: Record<string, string> = {
        "/api/v1/prices": "mempool.space · cijena",
        "/api/v1/blocks": "mempool.space · blokovi",
        "/api/v1/fees/recommended": "mempool.space · naknade",
        "/api/mempool": "mempool.space · mempool",
        "/api/v1/difficulty-adjustment": "mempool.space · prilagodba težine",
        "/api/v1/mining/hashrate/6m": "mempool.space · rudarski podaci",
      }
      return mempoolLabels[url.pathname] ?? "mempool.space"
    }
    return url.hostname.replace(/^www\./, "")
  } catch {
    return source
  }
}

function SourceList({ sources }: { sources: string[] }) {
  const uniqueSources = [...new Set(sources.filter(Boolean))]
  if (uniqueSources.length === 0) {
    return <span>Izvori će se prikazati uz podatke.</span>
  }

  return (
    <span className="bitcoin-today-source-list">
      {uniqueSources.map((source, index) => {
        const isExternalUrl = /^https?:\/\//i.test(source)
        const isInternalUrl = source.startsWith("/")
        return (
          <span key={source}>
            {index > 0 ? ", " : null}
            {isExternalUrl ? (
              <a href={source} target="_blank" rel="noopener noreferrer">
                {sourceLabel(source)}
              </a>
            ) : isInternalUrl ? (
              <a href={source}>{sourceLabel(source)}</a>
            ) : (
              sourceLabel(source)
            )}
          </span>
        )
      })}
    </span>
  )
}

export function SnapshotMeta({
  status,
  asOf,
  sources,
}: {
  status?: SnapshotStatus
  asOf?: string | null
  sources?: string[]
}) {
  const measuredAt = formatMeasuredAt(asOf)

  if (!status) {
    return (
      <div className="bitcoin-today-meta bitcoin-today-meta--waiting">
        Čekam podatke
      </div>
    )
  }

  return (
    <div className="bitcoin-today-meta">
      <span className={`bitcoin-today-status bitcoin-today-status--${status}`}>
        <span aria-hidden="true" />
        {statusLabels[status]}
      </span>
      {measuredAt ? (
        <time dateTime={asOf ?? undefined}>Mjereno {measuredAt}</time>
      ) : null}
      {sources?.length ? (
        <span className="bitcoin-today-card-source">
          {new Set(sources).size > 1 ? "Izvori" : "Izvor"}:{" "}
          <SourceList sources={sources} />
        </span>
      ) : null}
    </div>
  )
}

export function MetricCard({
  icon: Icon,
  label,
  value,
  secondary,
  status,
  asOf,
  sources,
  className = "",
}: {
  icon: LucideIcon
  label: string
  value: ReactNode
  secondary?: ReactNode
  status?: SnapshotStatus
  asOf?: string | null
  sources?: string[]
  className?: string
}) {
  return (
    <article className={`bitcoin-today-metric-card ${className}`.trim()}>
      <div className="bitcoin-today-metric-card__heading">
        <span className="bitcoin-today-icon-medallion" aria-hidden="true">
          <Icon />
        </span>
        <h3>{label}</h3>
      </div>
      <div className="bitcoin-today-metric-card__value tabular-nums">
        {value}
      </div>
      {secondary ? (
        <div className="bitcoin-today-metric-card__secondary">{secondary}</div>
      ) : null}
      <SnapshotMeta status={status} asOf={asOf} sources={sources} />
    </article>
  )
}

export function MetricItem({
  label,
  value,
  note,
}: {
  label: string
  value: ReactNode
  note?: ReactNode
}) {
  return (
    <div className="bitcoin-today-metric-item">
      <dt>{label}</dt>
      <dd className="tabular-nums">{value}</dd>
      {note ? <p>{note}</p> : null}
    </div>
  )
}

export function MethodDetails({
  methodology,
  limitation,
  sources,
}: {
  methodology: ReactNode
  limitation: ReactNode
  sources: string[]
}) {
  return (
    <details className="bitcoin-today-details">
      <summary>Metodologija, izvori i ograničenja</summary>
      <div className="bitcoin-today-details__body">
        <div>
          <h3>Metodologija</h3>
          <p>{methodology}</p>
        </div>
        <div>
          <h3>Ograničenja</h3>
          <p>{limitation}</p>
        </div>
        <div>
          <h3>Izvori</h3>
          <p>
            <SourceList sources={sources} />
          </p>
        </div>
      </div>
    </details>
  )
}

export function EmptyValue({
  label,
  status,
}: {
  label?: string
  status?: SnapshotStatus
}) {
  const isUnavailable = status === "unavailable"
  const resolvedLabel =
    label ?? (isUnavailable ? "Privremeno nije dostupno" : "Podatak se učitava")

  return (
    <span
      className={`bitcoin-today-empty-value${isUnavailable ? "bitcoin-today-empty-value--unavailable" : ""}`}
      aria-label={resolvedLabel}
    >
      {isUnavailable ? resolvedLabel : "—"}
    </span>
  )
}
