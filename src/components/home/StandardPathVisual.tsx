const standardPathSteps = [
  "Proračun nulte razine",
  "Kredit",
  "Sustavno davanje",
  "Bitcoin kao novac",
  "Upravljanje promjenama kupovne moći",
  "Ravnoteža u neto imovini",
  "Sigurnost i obitelj",
]

export function StandardPathVisual({ compact = false }: { compact?: boolean }) {
  const listClass = compact
    ? "mt-7 grid gap-2.5 lg:grid-cols-7"
    : "mt-7 grid gap-2.5"
  const connectorClass = compact
    ? "absolute top-8 bottom-[-0.75rem] left-4 w-px bg-border lg:top-4 lg:right-[-0.75rem] lg:bottom-auto lg:left-8 lg:h-px lg:w-auto"
    : "absolute top-8 bottom-[-0.75rem] left-4 w-px bg-border"

  return (
    <div
      className={
        compact
          ? "rounded-2xl border border-border/80 bg-background/70 p-4 shadow-sm sm:p-5"
          : "relative mx-auto w-full max-w-[460px] rounded-3xl border border-border/80 bg-card p-5 shadow-sm sm:p-7"
      }
      role="img"
      aria-label="Redoslijed osobnog Bitcoin standarda: proračun nulte razine, kredit, sustavno davanje, Bitcoin kao novac, upravljanje promjenama kupovne moći, ravnoteža u neto imovini, sigurnost i obitelj"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Osobni Bitcoin standard
          </p>
          <h2 className="mt-2 text-2xl leading-tight font-semibold tracking-[-0.02em] text-foreground">
            Jedan redoslijed.
          </h2>
        </div>
        <div className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full border border-primary/30 bg-primary/10">
          <img
            src="/bitcoin-logo.png"
            alt=""
            className="size-full rounded-full object-cover"
            aria-hidden="true"
          />
        </div>
      </div>

      <ol className={listClass}>
        {standardPathSteps.map((step, index) => (
          <li key={step} className="relative flex items-center gap-3">
            {index < standardPathSteps.length - 1 ? (
              <span aria-hidden="true" className={connectorClass} />
            ) : null}
            <span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full border border-primary/30 bg-background text-xs font-semibold text-primary shadow-sm">
              {index + 1}
            </span>
            <span className="min-w-0 rounded-xl border border-border/75 bg-background/70 px-3 py-2 text-sm leading-5 font-semibold text-foreground shadow-sm lg:flex lg:min-h-14 lg:items-center">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
