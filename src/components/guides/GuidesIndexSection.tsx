import { CalendarDays } from "lucide-react"

import { GuideCardsGrid } from "@/components/guides/GuideCardsGrid"
import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { BOOKING_URL, PRIMARY_CTA } from "@/content/site"

export function GuidesIndexSection() {
  return (
    <section id="vodici" className="section-shell section-muted">
      <SectionHeader
        title="Vodiči su za razumijevanje. Razgovor je za primjenu."
        copy="Ako želite razumjeti okvir, čitajte vodiče. Ako ga želite primijeniti na vlastiti proračun, dug, davanje, Bitcoin, neto imovinu i obitelj, dogovorite provjeru."
        align="center"
      />
      <GuideCardsGrid />
      <div className="mt-10 text-center">
        <Button asChild className="cta-primary rounded-full">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="guides-standard-check"
          >
            <CalendarDays className="size-4" />
            {PRIMARY_CTA}
          </a>
        </Button>
      </div>
    </section>
  )
}
