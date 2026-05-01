import { GuideCardsGrid } from "@/components/guides/GuideCardsGrid"
import { SectionHeader } from "@/components/layout/SectionHeader"

export function GuidesIndexSection() {
  return (
    <section id="vodici" className="section-shell section-muted">
      <SectionHeader
        title="Vodiči za praktične Bitcoin odluke"
        copy="Ako želite prvo čitati, počnite ovdje. Ako želite pravila za svoju situaciju, rezervirajte uvodni razgovor."
        align="center"
      />
      <GuideCardsGrid />
    </section>
  )
}
