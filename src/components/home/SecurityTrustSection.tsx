import { X } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { securityRules } from "@/content/method"

export function SecurityTrustSection() {
  return (
    <section className="section-shell section-muted">
      <div className="case-panel border-primary/25">
        <SectionHeader
          title="Sigurnosno pravilo rada"
          copy="Nikada ne tražim seed phrase, privatne ključeve, lozinke, pristup burzi ili pristup novčaniku. Ne primam Bitcoin na čuvanje. Ne kupujem ni prodajem umjesto vas. Cilj je da vi razumijete i kontrolirate vlastiti sustav."
        />
        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {securityRules.map((rule) => (
            <div key={rule} className="not-for-row">
              <X className="negative-icon size-3.5" />
              <p>{rule}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
