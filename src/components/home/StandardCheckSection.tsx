import { ArrowDown, CheckCircle2, LockKeyhole } from "lucide-react"
import { useState } from "react"

import { QuickBitcoinStandardAssessment } from "@/components/assessment/QuickBitcoinStandardAssessment"
import { Button } from "@/components/ui/button"

export function StandardCheckSection() {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false)

  if (isAssessmentOpen) {
    return <QuickBitcoinStandardAssessment embedded />
  }

  return (
    <section className="editorial-section standard-check-teaser">
      <div className="standard-check-teaser__copy">
        <p className="section-eyebrow">BESPLATNA PROVJERA · OKO 3 MINUTE</p>
        <h2>Prvo pronađite usko grlo</h2>
        <p>
          Besplatna provjera pomaže vam vidjeti imate li samo Bitcoin ili uređen
          sustav za život s Bitcoinom. Kroz 10 pitanja dobit ćete prvi fokus i
          konkretan sljedeći korak — bez registracije i bez slanja odgovora.
        </p>
        <div className="standard-check-teaser__actions">
          <Button
            type="button"
            className="cta-primary home-primary-button"
            data-cta="home-standard-assessment"
            onClick={() => setIsAssessmentOpen(true)}
          >
            Pokrenite provjeru
            <ArrowDown className="size-4" aria-hidden="true" />
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
