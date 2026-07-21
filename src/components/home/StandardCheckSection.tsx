import { ArrowUpRight, CheckCircle2, LockKeyhole } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BITCOIN_STANDARD_CHECK_PATH } from "@/content/site"

export function StandardCheckSection() {
  return (
    <section className="editorial-section standard-check-teaser">
      <div className="standard-check-teaser__copy">
        <p className="section-eyebrow">BESPLATNA PROVJERA · OKO 3 MINUTE</p>
        <h2>Prvo pronađite usko grlo</h2>
        <p>
          Besplatna provjera pomaže vam vidjeti koje područje trenutačno najviše
          slabi vaš sustav. Kroz 21 tvrdnju dobit ćete ukupnu sliku, najslabije
          područje i jedan konkretan prvi korak — bez registracije, bez slanja
          odgovora i bez generičkog programa provedbe za svih sedam područja.
        </p>
        <div className="standard-check-teaser__actions">
          <Button asChild className="cta-primary home-primary-button">
            <a
              href={BITCOIN_STANDARD_CHECK_PATH}
              data-cta="home-standard-assessment"
            >
              Pokrenite provjeru
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
      <aside className="standard-check-teaser__panel">
        <CheckCircle2 aria-hidden="true" />
        <span>Rezultat ostaje u pregledniku</span>
        <strong>Ukupna slika. Jedno usko grlo. Jedan prvi korak.</strong>
        <p>
          <LockKeyhole className="mr-2 inline size-4" aria-hidden="true" />
          Odgovori se ne šalju i ne spremaju na server.
        </p>
      </aside>
    </section>
  )
}
