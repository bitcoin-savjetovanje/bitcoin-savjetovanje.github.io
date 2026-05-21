import { ArrowRight, Check } from "lucide-react"
import type { ReactNode } from "react"

import type { GuideVisual as GuideVisualContent } from "@/content/guides"

type GuideVisualProps = {
  visual: GuideVisualContent
}

const tileClass = "guide-visual-tile"

function VisualShell({
  visual,
  children,
}: {
  visual: GuideVisualContent
  children: ReactNode
}) {
  return (
    <article
      className="guide-visual-card"
      aria-label={`Prikaz vodiča: ${visual.title}`}
    >
      <div className="max-w-3xl">
        <h2>{visual.title}</h2>
        {visual.caption ? <p>{visual.caption}</p> : null}
      </div>
      <div className="mt-6">{children}</div>
    </article>
  )
}

function SequenceVisual({
  steps,
  emphasized = false,
}: {
  steps: string[]
  emphasized?: boolean
}) {
  return (
    <div className="grid gap-3 sm:flex sm:items-center" role="list">
      {steps.map((step, index) => (
        <div key={`${step}-${index}`} className="contents">
          <div
            role="listitem"
            className={`${tileClass} flex h-full min-h-20 items-center justify-center text-center text-base font-semibold text-foreground ${emphasized ? "border-primary/30" : ""}`}
          >
            {step}
          </div>
          {index < steps.length - 1 ? (
            <div
              className="flex items-center justify-center py-2 text-muted-foreground sm:hidden"
              aria-hidden="true"
            >
              ↓
            </div>
          ) : null}
          {index < steps.length - 1 ? (
            <div
              className="hidden px-3 text-muted-foreground sm:grid sm:place-items-center"
              aria-hidden="true"
            >
              <ArrowRight className="size-4" />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}

function EquationVisual({
  parts,
  result,
}: {
  parts: string[]
  result: string
}) {
  const connector = parts.length === 2 ? ">" : "−"

  return (
    <div className="grid gap-3 sm:flex sm:items-center">
      {parts.map((part, index) => (
        <div key={`${part}-${index}`} className="grid gap-3 sm:contents">
          <div
            className={`${tileClass} text-center font-semibold text-foreground`}
          >
            {part}
          </div>
          {index < parts.length - 1 ? (
            <div
              className="grid place-items-center text-lg font-semibold text-muted-foreground"
              aria-hidden="true"
            >
              {connector}
            </div>
          ) : null}
        </div>
      ))}
      <div
        className="grid place-items-center text-lg font-semibold text-muted-foreground"
        aria-hidden="true"
      >
        =
      </div>
      <div
        className={`${tileClass} border-primary/30 text-center font-semibold text-foreground`}
      >
        {result}
      </div>
    </div>
  )
}

function SplitVisual({
  leftLabel,
  leftItems,
  rightLabel,
  rightItems,
}: Extract<GuideVisualContent, { type: "split" }>) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[
        { label: leftLabel, items: leftItems },
        { label: rightLabel, items: rightItems },
      ].map((side) => (
        <div key={side.label} className={tileClass}>
          <h3 className="text-lg font-semibold">{side.label}</h3>
          <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted-foreground">
            {side.items.map((item) => (
              <li key={item} className="flex gap-2">
                <Check className="positive-icon mt-1 size-3.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function CycleVisual({
  nodes,
  center,
}: Extract<GuideVisualContent, { type: "cycle" }>) {
  return (
    <div className="grid gap-4">
      {center ? (
        <div className="mx-auto rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary">
          {center}
        </div>
      ) : null}
      <SequenceVisual steps={nodes} emphasized />
    </div>
  )
}

function TrendVisual({
  states,
}: Extract<GuideVisualContent, { type: "trend" }>) {
  const svgLabels = states.slice(0, 3)

  return (
    <div className="grid gap-5 lg:grid-cols-[0.95fr_1fr] lg:items-center">
      <div
        className="rounded-2xl border border-border/80 bg-background/70 p-5 text-foreground shadow-sm"
        aria-hidden="true"
      >
        <svg viewBox="0 0 420 180" className="h-auto w-full">
          <path
            d="M38 132 C120 116 184 88 252 67 C304 51 346 44 384 36"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-primary"
          />
          <circle
            cx="250"
            cy="68"
            r="5.5"
            className="fill-foreground stroke-background"
            strokeWidth="3"
          />
          <text
            x="236"
            y="52"
            fill="currentColor"
            fontSize="13"
            fontWeight="600"
          >
            danas
          </text>
          <text x="300" y="42" fill="currentColor" fontSize="13">
            {svgLabels[0]?.label}
          </text>
          <text x="190" y="94" fill="currentColor" fontSize="13">
            {svgLabels[1]?.label}
          </text>
          <text x="62" y="140" fill="currentColor" fontSize="13">
            {svgLabels[2]?.label}
          </text>
        </svg>
      </div>
      <div className="grid gap-3">
        {states.map((state) => (
          <div key={state.label} className={tileClass}>
            <h3 className="text-base font-semibold">{state.label}</h3>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {state.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ThirdsVisual({
  columns,
}: Extract<GuideVisualContent, { type: "thirds" }>) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {columns.map((column) => (
        <div
          key={`${column.label}-${column.description}`}
          className={tileClass}
        >
          <h3 className="text-base font-semibold">{column.label}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {column.description}
          </p>
        </div>
      ))}
    </div>
  )
}

function NetworkVisual({
  center,
  nodes,
}: Extract<GuideVisualContent, { type: "network" }>) {
  return (
    <div className="grid gap-4">
      <div className="mx-auto rounded-full border border-primary/30 bg-primary/10 px-6 py-3 text-base font-semibold text-primary">
        {center}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {nodes.map((node) => (
          <div key={node} className={`${tileClass} text-center font-semibold`}>
            {node}
          </div>
        ))}
      </div>
    </div>
  )
}

function SafetyVisual({
  zones,
}: Extract<GuideVisualContent, { type: "safety" }>) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {zones.map((zone, index) => (
        <div key={zone.label} className={tileClass}>
          <span className="text-sm font-semibold text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 text-base font-semibold">{zone.label}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {zone.description}
          </p>
        </div>
      ))}
    </div>
  )
}

export function GuideVisual({ visual }: GuideVisualProps) {
  return (
    <VisualShell visual={visual}>
      {visual.type === "sequence" ? (
        <SequenceVisual steps={visual.steps} />
      ) : null}
      {visual.type === "equation" ? (
        <EquationVisual parts={visual.parts} result={visual.result} />
      ) : null}
      {visual.type === "split" ? <SplitVisual {...visual} /> : null}
      {visual.type === "cycle" ? <CycleVisual {...visual} /> : null}
      {visual.type === "trend" ? <TrendVisual {...visual} /> : null}
      {visual.type === "thirds" ? <ThirdsVisual {...visual} /> : null}
      {visual.type === "network" ? <NetworkVisual {...visual} /> : null}
      {visual.type === "safety" ? <SafetyVisual {...visual} /> : null}
    </VisualShell>
  )
}
