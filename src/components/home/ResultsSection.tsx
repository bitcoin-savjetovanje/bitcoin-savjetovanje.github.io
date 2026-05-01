import { Check, X } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { afterWorkItems, beforeWorkItems } from "@/content/method"

export function ResultsSection() {
  return (
    <section className="section-shell section-muted">
      <SectionHeader title="Na kraju imate pravila." align="center" />
      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <article className="comparison-card">
          <h3>Prije</h3>
          <ul>
            {beforeWorkItems.map((item) => (
              <li key={item}>
                <X className="negative-icon mt-1 size-4 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="comparison-card comparison-card--after">
          <h3>Nakon</h3>
          <ul>
            {afterWorkItems.map((item) => (
              <li key={item}>
                <Check className="positive-icon mt-1 size-4 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}
