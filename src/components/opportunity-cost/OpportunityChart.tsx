import { useId } from "react"

export type OpportunitySeries = {
  label: string
  values: number[]
  startValue?: number
  dashed?: boolean
}

export function OpportunityChart({
  title,
  description,
  series,
  years,
  unit,
}: {
  title: string
  description: string
  series: OpportunitySeries[]
  years: number
  unit: string
}) {
  const id = useId()
  const values = series.flatMap((item) =>
    item.startValue === undefined
      ? item.values
      : [item.startValue, ...item.values]
  )
  if (!values.length || !values.every(Number.isFinite)) return null
  const low = Math.min(0, ...values)
  const high = Math.max(1, ...values)
  const span = high - low
  const y = (value: number) => 240 - ((value - low) / span) * 220
  const format = (value: number) =>
    new Intl.NumberFormat("hr-HR", {
      notation: Math.abs(value) >= 100_000 ? "compact" : "standard",
      maximumFractionDigits: unit === "BTC" ? 3 : 1,
    }).format(value)
  return (
    <figure className="oc-chart">
      <figcaption>
        <h3 id={`${id}-title`}>{title}</h3>
        <p id={`${id}-description`}>{description}</p>
      </figcaption>
      <p className="oc-chart-unit">{unit}</p>
      <div className="oc-chart-plot">
        <div className="oc-chart-axis" aria-hidden="true">
          {[high, (high + low) / 2, low].map((value, index) => (
            <span key={index}>{format(value)}</span>
          ))}
        </div>
        <svg
          viewBox="0 0 600 260"
          preserveAspectRatio="none"
          role="img"
          aria-labelledby={`${id}-title ${id}-description`}
        >
          {[high, (high + low) / 2, low].map((value, index) => (
            <line
              key={index}
              x1="0"
              x2="600"
              y1={y(value)}
              y2={y(value)}
              className="oc-chart-grid"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {low < 0 && (
            <line
              x1="0"
              x2="600"
              y1={y(0)}
              y2={y(0)}
              className="oc-chart-grid"
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
            />
          )}
          {series.map((item) => (
            <polyline
              key={item.label}
              fill="none"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
              className={item.dashed ? "oc-line-bitcoin" : "oc-line-property"}
              strokeDasharray={item.dashed ? "7 5" : undefined}
              points={[
                ...(item.startValue === undefined
                  ? []
                  : [`0,${y(item.startValue)}`]),
                ...item.values.map(
                  (value, index) => `${(index / years) * 600},${y(value)}`
                ),
              ].join(" ")}
            />
          ))}
        </svg>
      </div>
      <div className="oc-chart-x" aria-hidden="true">
        <span>Danas</span>
        <span>
          Za {years} {years === 1 ? "godinu" : "godina"}
        </span>
      </div>
      <ul className="oc-chart-legend">
        {series.map((item) => (
          <li key={item.label}>
            <span
              className={item.dashed ? "oc-key oc-key-bitcoin" : "oc-key"}
              aria-hidden="true"
            />
            {item.label}
          </li>
        ))}
      </ul>
      <a href="#usporedba-razdoblja" className="oc-link">
        Brojčani pregled za 1, 5, 10 i 30 godina
      </a>
    </figure>
  )
}
