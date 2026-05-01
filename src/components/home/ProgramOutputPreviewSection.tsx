import { Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { programDocumentItems } from "@/content/method"

const programWorkSteps = [
  "upitnik",
  "4 razgovora",
  "osobni dokument",
  "30 dana provjere",
]

export function ProgramOutputPreviewSection() {
  return (
    <section className="section-shell">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-start">
        <SectionHeader
          title="Na kraju imate svoj osobni Bitcoin standard."
          copy="Ne još jednu teoriju. Ne još jedan popis savjeta. Jedan dokument koji pokazuje kako vaš novac, dug, darivanje, Bitcoin, potrošnja, proizvodna imovina i sigurnost rade zajedno."
        />
        <div className="case-panel">
          <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Osobni Bitcoin standard
          </p>
          <div
            className="mt-5 rounded-2xl border border-border/80 bg-background/70 p-4 shadow-sm"
            aria-label="4–6 tjedana rada"
          >
            <h3 className="text-lg font-semibold">4–6 tjedana rada</h3>
            <ol className="mt-4 grid gap-2 sm:grid-cols-4">
              {programWorkSteps.map((step, index) => (
                <li
                  key={step}
                  className="rounded-xl border border-border/75 bg-card p-3 text-sm font-semibold text-foreground shadow-sm"
                >
                  <span className="text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-2 block">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {programDocumentItems.map((item) => (
              <div key={item} className="check-row bg-background/70">
                <Check className="positive-icon mt-1 size-4 shrink-0" />
                <p>{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-6 text-muted-foreground">
            Ovo nije primjer stvarnog klijenta i ne sadrži financijsku
            preporuku. To je prikaz strukture osobnog standarda.
          </p>
        </div>
      </div>
    </section>
  )
}
