import { X } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"

const debtItems = [
  "Dug povećava buduće odljeve.",
  "Dug smanjuje slobodu.",
  "Dug otežava mirno držanje Bitcoina.",
  "Dug je fiat ponašanje koje Bitcoin standard mora ukloniti.",
]

const spendingPaths = [
  {
    label: "Fiat pravilo",
    steps: ["Potroši danas", "plati sutra", "budućnost gubi slobodu"],
  },
  {
    label: "Bitcoin standard",
    steps: ["Štedi danas", "troši prošli novac", "budućnost ostaje slobodna"],
  },
]

export function DebtSection() {
  return (
    <section className="section-shell section-muted">
      <div className="case-panel border-primary/25">
        <SectionHeader
          title="Dug je budući novac koji ste već potrošili."
          copy="Dug nije samo kamata. Dug je obveza prema budućnosti. Svaka rata uzima dio vašeg budućeg vremena prije nego što ga uopće živite."
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-start">
          <div className="space-y-5 text-base leading-8 text-muted-foreground">
            <p>
              Dok dug postoji, on ulazi u svaku Bitcoin odluku. Može vas
              natjerati da prodate kada ne želite. Može vas spriječiti da
              čekate. Može pretvoriti promjenu kupovne moći u pritisak.
            </p>
            <p className="text-xl leading-8 font-semibold text-foreground">
              Bitcoin standard ne počinje većom kupnjom. Počinje izlaskom iz
              duga.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {debtItems.map((item) => (
              <div key={item} className="not-for-row bg-background/70">
                <X className="negative-icon size-3.5" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {spendingPaths.map((path) => (
            <article
              key={path.label}
              className="rounded-2xl border border-border/80 bg-background/70 p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold">{path.label}</h3>
              <ol className="mt-5 grid gap-3">
                {path.steps.map((step, index) => (
                  <li key={step} className="flex items-center gap-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full border border-border/80 bg-card text-xs font-semibold text-muted-foreground">
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
