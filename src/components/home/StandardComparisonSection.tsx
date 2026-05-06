import { Check, X } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { standardWithItems, standardWithoutItems } from "@/content/method"

export function StandardComparisonSection() {
  return (
    <section className="section-shell">
      <SectionHeader
        title="Bitcoin sam po sebi nije dovoljan ukoliko nije uređen unutar ukupne neto imovine."
        align="center"
      />
      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <article className="comparison-card border-destructive/25 bg-card">
          <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Bitcoin bez standarda
          </p>
          <h3 className="mt-3">Sentiment vodi odluke.</h3>
          <ul>
            {standardWithoutItems.map((item) => (
              <li key={item}>
                <X className="negative-icon mt-1 size-4 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="comparison-card comparison-card--after">
          <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Bitcoin sa standardom
          </p>
          <h3 className="mt-3">Pravila vode odluke.</h3>
          <ul>
            {standardWithItems.map((item) => (
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
