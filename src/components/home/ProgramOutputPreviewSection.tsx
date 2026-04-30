import { Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { programDocumentItems } from "@/content/method"

export function ProgramOutputPreviewSection() {
  return (
    <section className="section-shell">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-start">
        <SectionHeader
          title="Kako izgleda rezultat programa?"
          copy="Na kraju strukturiranog rada cilj nije još jedan popis informacija, nego osobni dokument koji možete koristiti kroz vrijeme."
        />
        <div className="case-panel">
          <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Osobni Bitcoin okvir
          </p>
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
            preporuku. To je prikaz strukture dokumenta.
          </p>
        </div>
      </div>
    </section>
  )
}
