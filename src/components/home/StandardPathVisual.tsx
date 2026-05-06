import { Check, X } from "lucide-react"

const stressRows = [
  {
    label: "Pad kupovne moći",
    without: "panika ili prodaja pod pritiskom",
    with: "provjera proračuna, duga i stvarnog viška",
  },
  {
    label: "Rast kupovne moći",
    without: "euforija i improvizacija",
    with: "budući troškovi, ciljevi i davanje",
  },
  {
    label: "Obitelj i sigurnost",
    without: "plan postoji samo u glavi",
    with: "pravila su zapisana i objašnjiva",
  },
]

export function StandardPathVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "rounded-2xl border border-border/80 bg-background/70 p-4 shadow-sm sm:p-5"
          : "relative mx-auto w-full max-w-[500px] rounded-3xl border border-border/80 bg-card p-5 shadow-sm sm:p-7"
      }
      role="img"
      aria-label="Stres-test osobnog Bitcoin standarda kroz pad kupovne moći, rast kupovne moći te sigurnost i obitelj"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Stres-test standarda
          </p>
          <h2 className="mt-2 text-2xl leading-tight font-semibold tracking-[-0.02em] text-foreground">
            Što radite kad Bitcoin napravi bilo što?
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

      <div className="mt-6 grid gap-3">
        {stressRows.map((row) => (
          <article
            key={row.label}
            className="rounded-xl border border-border/75 bg-background/70 p-3 shadow-sm sm:p-4"
          >
            <h3 className="text-sm font-semibold text-foreground">
              {row.label}
            </h3>
            <div className="mt-3 grid gap-2">
              <div className="flex gap-2 rounded-lg bg-card/82 px-3 py-2 text-sm leading-5 text-muted-foreground">
                <X className="negative-icon mt-0.5 size-3.5 shrink-0" />
                <span>{row.without}</span>
              </div>
              <div className="flex gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-sm leading-5 font-medium text-foreground">
                <Check className="positive-icon mt-0.5 size-3.5 shrink-0" />
                <span>{row.with}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
