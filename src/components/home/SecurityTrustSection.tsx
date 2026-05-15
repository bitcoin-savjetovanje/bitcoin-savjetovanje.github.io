import { ArrowUpRight, Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"

const trustItems = [
  "odluka ostaje vaša",
  "sigurnosni detalji se ne šalju",
  "razgovor počinje pravilima, ne pristupom",
]

export function SecurityTrustSection() {
  return (
    <section id="sigurnost-povjerenje" className="section-shell">
      <div className="case-panel border-primary/25">
        <SectionHeader
          title="Bitcoin ostaje pod vašom kontrolom."
          copy="Ne upravljam sredstvima, ne tražim pristup novčaniku i nikada ne tražim seed phrase, privatne ključeve ili lozinke."
        />
        <ul className="trust-mini-list">
          {trustItems.map((item) => (
            <li key={item}>
              <Check className="positive-icon size-4" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <a
          href="/sigurnost/"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
          data-link="security-rules"
          data-cta="home-security-page"
        >
          Kako pristupam sigurnosti
          <ArrowUpRight className="size-4" />
        </a>
      </div>
    </section>
  )
}
