import { useId } from "react"

type ChartPoint = {
  at: string
  value: number
}

const dateFormatter = new Intl.DateTimeFormat("hr-HR", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
})

function formatDate(value: string) {
  const date = new Date(value)
  return Number.isFinite(date.getTime()) ? dateFormatter.format(date) : value
}

export function MiniLineChart({
  title,
  description,
  points,
  formatValue,
  tone = "primary",
}: {
  title: string
  description: string
  points: ChartPoint[]
  formatValue: (value: number) => string
  tone?: "primary" | "secondary"
}) {
  const titleId = useId()
  const descriptionId = useId()
  const cleanPoints = points.filter(
    (point) =>
      Number.isFinite(point.value) &&
      Number.isFinite(new Date(point.at).getTime())
  )

  if (cleanPoints.length < 2) {
    return (
      <figure className="bitcoin-today-chart bitcoin-today-chart--empty">
        <figcaption>
          <span>{title}</span>
          <small>90 dana</small>
        </figcaption>
        <div role="status">Povijesni niz trenutačno nije dostupan.</div>
      </figure>
    )
  }

  const width = 640
  const height = 190
  const paddingX = 8
  const paddingY = 14
  const values = cleanPoints.map((point) => point.value)
  const minimum = Math.min(...values)
  const maximum = Math.max(...values)
  const span = maximum - minimum
  const innerWidth = width - paddingX * 2
  const innerHeight = height - paddingY * 2
  const path = cleanPoints
    .map((point, index) => {
      const x = paddingX + (index / (cleanPoints.length - 1)) * innerWidth
      const normalized = span === 0 ? 0.5 : (point.value - minimum) / span
      const y = paddingY + (1 - normalized) * innerHeight
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(" ")
  const firstPoint = cleanPoints[0]
  const lastPoint = cleanPoints.at(-1) as ChartPoint

  return (
    <figure className={`bitcoin-today-chart bitcoin-today-chart--${tone}`}>
      <figcaption>
        <span>{title}</span>
        <small>posljednjih 90 dana</small>
      </figcaption>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-labelledby={`${titleId} ${descriptionId}`}
        preserveAspectRatio="none"
      >
        <title id={titleId}>{title}</title>
        <desc id={descriptionId}>{description}</desc>
        {[0.25, 0.5, 0.75].map((position) => (
          <line
            key={position}
            className="bitcoin-today-chart__grid"
            x1={paddingX}
            x2={width - paddingX}
            y1={paddingY + innerHeight * position}
            y2={paddingY + innerHeight * position}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <path
          className="bitcoin-today-chart__line"
          d={path}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="bitcoin-today-chart__axis" aria-hidden="true">
        <span>{formatDate(firstPoint.at)}</span>
        <span>{formatValue(lastPoint.value)}</span>
        <span>{formatDate(lastPoint.at)}</span>
      </div>
    </figure>
  )
}
