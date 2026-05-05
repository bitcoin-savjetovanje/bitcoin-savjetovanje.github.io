import { ArrowUpRight } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"

const moneyStates = [
  {
    label: "Život u dugu",
    steps: [
      "budući novac",
      "nemir",
      "zbunjenost",
      "ropstvo",
      "odluke pod pritiskom",
    ],
  },
  {
    label: "Život bez duga",
    steps: ["prošli novac", "mir", "jasnoća", "sloboda", "odluke bez očaja"],
  },
]

export function DebtSection() {
  return (
    <section className="section-shell section-muted">
      <div className="case-panel border-primary/25">
        <SectionHeader
          title="Dug nije samo broj. Dug je stanje."
          copy="Kamata, rata i rok nisu nevažni, ali nisu glavno pitanje. Glavno pitanje je koliko dugo živite u stanju duga i što to stanje radi vašim odlukama."
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-start">
          <div className="space-y-5 text-base leading-8 text-muted-foreground">
            <p>
              Dug nije samo financijska stavka u bilanci. Život u dugu i život
              bez duga dva su različita psihološko-duhovna stanja. Jedno hrani
              nemir, ropstvo i zbunjenost. Drugo hrani slobodu, mir i jasnoću.
            </p>
            <p className="text-xl leading-8 font-semibold text-foreground">
              Vrijeme zalijeva stanje u kojem živite.
            </p>
            <a
              href="/vodici/dug-je-buduci-novac/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
              data-link="debt-guide"
            >
              Pročitajte vodič o životu bez duga
              <ArrowUpRight className="size-4" />
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {moneyStates.map((state) => (
              <article
                key={state.label}
                className="rounded-2xl border border-border/80 bg-background/70 p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold">{state.label}</h3>
                <ol className="mt-5 grid gap-3">
                  {state.steps.map((step, index) => (
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
      </div>
    </section>
  )
}
