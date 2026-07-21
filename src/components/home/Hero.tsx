import { ArrowUpRight, CalendarDays, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  CONVERSATION_PATH,
  PERSONAL_BITCOIN_STANDARD_PATH,
} from "@/content/site"

export function Hero() {
  return (
    <section className="home-hero hero-section editorial-section">
      <div className="hero-shell">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            Privatno Bitcoin savjetovanje za ljude koji već imaju Bitcoin,
            imovinu ili odgovornost za druge.
          </p>
          <h1 className="hero-title">
            Imate Bitcoin? Izgradite osobni Bitcoin standard.
          </h1>
          <p className="hero-subtitle">
            Javni vodiči pokazuju moj okvir razmišljanja. Privatni rad pretvara
            taj okvir u odluke koje odgovaraju vašem proračunu, obvezama,
            imovini, obitelji i sigurnosnim rizicima.
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
                Rezervirajte razgovor
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="home-outline-button"
            >
              <a
                href={PERSONAL_BITCOIN_STANDARD_PATH}
                className="justify-center text-center"
                data-link="hero-personal-standard"
              >
                Pogledajte kako program radi
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>

          <div className="hero-trust-note">
            <ShieldCheck className="size-5" aria-hidden="true" />
            <ul>
              <li>Ne tražim privatne ključeve ni početne riječi.</li>
              <li>Ne upravljam vašim Bitcoinom i ne čuvam ga.</li>
              <li>Ne prodajem financijske proizvode.</li>
              <li>Ne donosim odluke umjesto vas.</li>
            </ul>
          </div>
        </div>
        <picture className="hero-image-frame">
          <source srcSet="/images/home-hero-20260521.webp" type="image/webp" />
          <img
            src="/images/home-hero-20260521.jpg"
            alt="Mediteranska radna scena sa sedam kamenih skulptura osobnog Bitcoin standarda"
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
