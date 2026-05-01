import { GuideCardsGrid } from "@/components/guides/GuideCardsGrid"
import { SectionHeader } from "@/components/layout/SectionHeader"

export function GuidesIndexSection() {
  return (
    <section id="vodici" className="section-shell section-muted">
      <SectionHeader
        title="Vodiči za osobni Bitcoin standard"
        copy="Ako želite razumjeti okvir, čitajte vodiče. Ako ga želite primijeniti na svoju situaciju, rezervirajte razgovor."
        align="center"
      />
      <GuideCardsGrid />
    </section>
  )
}
