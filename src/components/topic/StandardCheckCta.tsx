import { ArrowUpRight, FileCheck2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BITCOIN_STANDARD_CHECK_PATH } from "@/content/site"

export function StandardCheckCta({ dataCta }: { dataCta: string }) {
  return (
    <section className="topic-section topic-standard-check-cta">
      <div className="topic-standard-check-cta__icon" aria-hidden="true">
        <FileCheck2 />
      </div>
      <div>
        <h2>Želite provjeriti svoj Bitcoin standard?</h2>
        <p>Preuzmite besplatni radni PDF i prođite kroz 7 osnovnih provjera.</p>
      </div>
      <Button asChild className="cta-primary home-primary-button">
        <a href={BITCOIN_STANDARD_CHECK_PATH} data-cta={dataCta}>
          Preuzmite PDF
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </Button>
    </section>
  )
}
