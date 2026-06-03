import { ArrowUpRight, CalendarDays, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  CONVERSATION_PATH,
  SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH,
} from "@/content/site"

export function SampleStandardSection() {
  return (
    <section className="editorial-section sample-standard-teaser">
      <div className="sample-standard-teaser__copy">
        <p className="section-eyebrow">OGLEDNI PRIMJER</p>
        <h2>Pogledajte kako izgleda osobni Bitcoin standard</h2>
        <p>
          Anonimni primjer dokumenta pokazuje što znači pretvoriti Bitcoin iz
          odvojene imovine u sustav odluka: proračun, dug, davanje, Bitcoin kao
          novac, neto imovina, volatilnost, sigurnost i obitelj.
        </p>
      </div>
      <div className="sample-standard-teaser__panel" aria-hidden="true">
        <FileText />
        <span>Ogledni dokument</span>
        <strong>Osobni Bitcoin standard</strong>
        <i />
        <p>pravila za stvarne odluke</p>
      </div>
      <div className="sample-standard-teaser__actions">
        <Button asChild className="cta-primary home-primary-button">
          <a
            href={SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH}
            data-cta="home-sample-standard"
          >
            Pogledajte primjer
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </Button>
        <a
          href={CONVERSATION_PATH}
          className="service-link-button"
          data-link="home-sample-standard-conversation"
        >
          <CalendarDays className="size-4" aria-hidden="true" />
          Rezervirajte razgovor
        </a>
      </div>
    </section>
  )
}
