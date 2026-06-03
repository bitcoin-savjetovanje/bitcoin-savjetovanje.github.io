import { ArrowUpRight, CalendarDays, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  BITCOIN_STANDARD_CHECK_COVER_PATH,
  BITCOIN_STANDARD_CHECK_PATH,
  CONVERSATION_PATH,
} from "@/content/site"

export function StandardCheckSection() {
  return (
    <section className="editorial-section standard-check-teaser">
      <div className="standard-check-teaser__copy">
        <p className="section-eyebrow">BESPLATNI RADNI PDF</p>
        <h2>Provjerite je li vaš Bitcoin standard stvaran</h2>
        <p>
          Preuzmite radni PDF “7 provjera osobnog Bitcoin standarda” i prođite
          kroz ključna pitanja: proračun, dug, davanje, Bitcoin kao novac, neto
          imovina, volatilnost, sigurnost i obitelj.
        </p>
        <div className="standard-check-teaser__actions">
          <Button asChild className="cta-primary home-primary-button">
            <a
              href={BITCOIN_STANDARD_CHECK_PATH}
              data-cta="home-standard-check"
            >
              Preuzmite PDF
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </Button>
          <a
            href={CONVERSATION_PATH}
            className="service-link-button"
            data-link="home-standard-check-conversation"
          >
            <CalendarDays className="size-4" aria-hidden="true" />
            Rezervirajte razgovor
          </a>
        </div>
      </div>
      <figure className="standard-check-cover-card">
        <img
          src={BITCOIN_STANDARD_CHECK_COVER_PATH}
          alt="Naslovnica PDF-a 7 provjera osobnog Bitcoin standarda"
          width="1055"
          height="1491"
          loading="lazy"
          decoding="async"
        />
        <figcaption>
          <FileText className="size-4" aria-hidden="true" />
          Besplatni radni PDF
        </figcaption>
      </figure>
    </section>
  )
}
