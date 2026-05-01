import { Check, X } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"

const neverAsk = [
  "početne riječi",
  "privatne ključeve",
  "pristup računima",
  "pristup uređajima",
  "slanje Bitcoina meni",
]

const workOn = [
  "modelu skrbništva",
  "pravilima pristupa",
  "obiteljskim uputama",
  "oporavku",
  "smanjenju rizika",
]

export function SecurityTrustSection() {
  return (
    <section className="section-shell section-muted">
      <div className="case-panel border-primary/25">
        <SectionHeader
          title="Sigurnost nije dogma. Sigurnost je sustav."
          copy="Ne tražim ključeve, početne riječi ni pristup računima. Ne čuvam vaš Bitcoin i ne donosim odluke umjesto vas."
        />
        <p className="mt-6 max-w-4xl text-base leading-8 text-muted-foreground">
          Rješenje za skrbništvo biramo prema vašem znanju, sigurnosnim
          navikama, obiteljskoj situaciji i razini spremnosti. Za nekoga je cilj
          samostalno čuvanje. Za nekoga je bolji prijelazni model. Za svakoga je
          cilj isti: manje rizika i više jasnoće.
        </p>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <section className="rounded-2xl border border-border/80 bg-background/70 p-5 shadow-sm">
            <h3 className="text-xl font-semibold">Nikada ne tražim:</h3>
            <div className="mt-5 grid gap-2">
              {neverAsk.map((item) => (
                <div key={item} className="not-for-row bg-card">
                  <X className="negative-icon size-3.5" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-2xl border border-primary/25 bg-background/70 p-5 shadow-sm">
            <h3 className="text-xl font-semibold">Radimo na:</h3>
            <div className="mt-5 grid gap-2">
              {workOn.map((item) => (
                <div key={item} className="not-for-row bg-card">
                  <Check className="positive-icon size-3.5" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <a
          href="/sigurnost/"
          className="mt-6 inline-block text-sm font-semibold text-foreground hover:text-primary"
          data-link="security-rules"
        >
          Pročitajte sigurnosna pravila
        </a>
      </div>
    </section>
  )
}
