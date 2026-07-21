import { ArrowDown, CheckCircle2, Clock3, LockKeyhole } from "lucide-react"

import { BitcoinStandardAssessment } from "@/components/assessment/BitcoinStandardAssessment"
import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { bitcoinStandardCheckRoute } from "@/content/clientRoutes"

const assessmentFacts = [
  { value: "21", label: "kratka tvrdnja" },
  { value: "Bez", label: "registracije i slanja" },
  { value: "Lokalno", label: "rezultat u pregledniku" },
] as const

export function BitcoinStandardCheck() {
  return (
    <>
      <Seo {...bitcoinStandardCheckRoute} />
      <article className="service-page standard-check-page">
        <header className="standard-check-hero hero-section editorial-section">
          <div className="hero-shell standard-check-hero__shell">
            <div className="hero-copy standard-check-hero__copy">
              <p className="hero-eyebrow">BESPLATNA PROVJERA · OKO 3 MINUTE</p>
              <h1 className="hero-title">
                Koliko je uređen vaš osobni Bitcoin standard?
              </h1>
              <p className="hero-subtitle">
                Odgovorite na 21 kratku tvrdnju bez registracije i bez slanja
                odgovora. Dobit ćete ukupnu sliku, najslabije područje i jedan
                konkretan prvi korak.
              </p>
              <div className="standard-check-actions">
                <Button asChild className="cta-primary home-primary-button">
                  <a href="#provjera" data-cta="standard-check-start">
                    Započnite besplatnu provjeru
                    <ArrowDown className="size-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
              <p className="standard-check-hero__privacy">
                <LockKeyhole aria-hidden="true" />
                Odgovori i rezultat ostaju samo u ovom otvorenom prozoru
                preglednika.
              </p>
            </div>

            <aside
              className="standard-assessment-hero-card"
              aria-label="Kako provjera radi"
            >
              <div className="standard-assessment-hero-card__header">
                <span>
                  <CheckCircle2 aria-hidden="true" />
                </span>
                <div>
                  <p>Mirna samoprocjena</p>
                  <h2>Od osjećaja do prvog pravila</h2>
                </div>
              </div>
              <dl className="standard-assessment-hero-card__facts">
                {assessmentFacts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="standard-assessment-hero-card__footer">
                <Clock3 aria-hidden="true" />
                <p>
                  Na kraju dobivate ukupnu procjenu, sedam podrezultata,
                  najslabije područje i jedan prvi korak.
                </p>
              </div>
            </aside>
          </div>
        </header>

        <div className="service-page__inner standard-check-page__inner">
          <BitcoinStandardAssessment />
        </div>
      </article>
    </>
  )
}
