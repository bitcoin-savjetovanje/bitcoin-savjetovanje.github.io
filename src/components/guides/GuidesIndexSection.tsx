import { GuideCardsGrid } from "@/components/guides/GuideCardsGrid"
import { SectionHeader } from "@/components/layout/SectionHeader"

export function GuidesIndexSection() {
  return (
    <section id="vodici" className="section-shell section-muted">
      <SectionHeader
        title="Vodiči za praktične Bitcoin odluke"
        copy="Kraći tekstovi koji prevode glavne ideje Practical Bitcoin Standarda u konkretne odluke: budžet, dug, neto imovina, skrbništvo i obiteljski pristup."
        align="center"
      />
      <GuideCardsGrid />
    </section>
  )
}
