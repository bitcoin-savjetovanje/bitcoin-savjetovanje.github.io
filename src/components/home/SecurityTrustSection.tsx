import { Check, X } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"

const neverAsk = [
  "početne riječi",
  "privatne ključeve",
  "lozinke",
  "pristup računima",
  "slanje Bitcoina meni na čuvanje",
]

const familyRules = [
  "obitelj zna što smije napraviti",
  "obitelj zna što nikada ne smije napraviti",
  "početne riječi i privatni ključevi se ne dijele sa savjetnikom",
  "postoji jasan plan bez predaje kontrole",
  "upute su razumljive i u izvanrednoj situaciji",
]

export function SecurityTrustSection() {
  return (
    <section id="sigurnost" className="section-shell section-muted">
      <div className="case-panel border-primary/25">
        <SectionHeader
          title="Bitcoin mora ostati pod vašom kontrolom, ali sustav ne smije ovisiti samo o vama."
          copy="Cilj nije da netko drugi ima kontrolu. Cilj je da obitelj zna pravila, da ne otkriva osjetljive podatke i da u krizi ne napravi prvi pogrešan korak."
        />
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
              {familyRules.map((item) => (
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
