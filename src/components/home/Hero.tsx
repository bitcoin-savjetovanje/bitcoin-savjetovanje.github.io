import { CalendarDays, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CONVERSATION_PATH, PRIMARY_CTA } from "@/content/site"

export function Hero() {
  return (
    <section className="hero-section editorial-section">
      <div className="hero-shell">
        <div className="hero-copy">
          <p className="hero-eyebrow">BITCOIN KAO NOVAC</p>
          <h1 className="hero-title">
            Od držanja Bitcoina do uređenog sustava odluka.
          </h1>
          <p className="hero-subtitle">
            Za pojedince, obitelji i poduzetnike koji žele Bitcoin shvatiti kao
            novac, a ne samo kao odvojenu imovinu koju drže sa strane.
          </p>

          <div className="hero-actions">
            <Button
              asChild
              size="lg"
              className="cta-primary home-primary-button"
            >
              <a
                href={CONVERSATION_PATH}
                className="justify-center text-center"
                data-cta="hero-intro-call"
              >
                <CalendarDays className="size-4" />
                {PRIMARY_CTA}
              </a>
            </Button>
          </div>

          <div className="hero-trust-note">
            <ShieldCheck className="size-5" aria-hidden="true" />
            <p>
              Bez naknade i bez obveze. Ne upravljam sredstvima, ne prognoziram
              cijenu i nikada ne tražim seed phrase, privatne ključeve ni
              pristup novčaniku.
            </p>
          </div>
        </div>
        <picture className="hero-image-frame">
          <source
            srcSet="/images/hero-bitcoin-savjetovanje-realistic.webp"
            type="image/webp"
          />
          <img
            src="/images/hero-bitcoin-savjetovanje-realistic.jpg"
            alt="Radna scena Bitcoin savjetovanja s bilježnicom, karticama sustava i knjigom u nastajanju"
            width="1536"
            height="1024"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>
    </section>
  )
}
