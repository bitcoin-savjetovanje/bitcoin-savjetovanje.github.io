import { Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { foundationCards } from "@/content/method"

export function FoundationsSection() {
  return (
    <section id="temelji" className="section-shell section-muted">
      <SectionHeader
        title="Prvo red. Zatim sloboda. Zatim darivanje."
        copy="Bitcoin kao novac ima smisla tek kada temelj osobnog sustava ne ovisi o dojmu, dugu ili improvizaciji."
        align="center"
      />
      <div className="mx-auto mt-12 grid max-w-6xl gap-4 lg:grid-cols-3">
        {foundationCards.map((card, index) => (
          <article key={card.title} className="value-card bg-background/70">
            <div className="icon-mark">{index + 1}</div>
            <h3>{card.title}</h3>
            <p>{card.copy}</p>
          </article>
        ))}
      </div>
      <div className="value-summary">
        <div className="mx-auto flex max-w-3xl gap-3 text-left">
          <Check className="positive-icon mt-1 size-5 shrink-0" />
          <p>
            Tek kada ova tri temelja stoje, Bitcoin može prijeći iz “imovine sa
            strane” u novac kojim živite.
          </p>
        </div>
      </div>
    </section>
  )
}
