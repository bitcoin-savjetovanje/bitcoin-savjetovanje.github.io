import { ArrowUpRight, ClipboardCheck, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BITCOIN_STANDARD_CHECK_PATH, CONVERSATION_PATH } from "@/content/site"

export function Hero() {
  return (
    <header className="home-hero hero-section editorial-section home-v2-hero-legacy">
      <div className="hero-shell">
        <div className="hero-copy home-v2-hero__copy">
          <p className="home-v2-eyebrow">PRIVATNO BITCOIN SAVJETOVANJE</p>
          <h1>Bitcoin već imate. Sada uredite sustav za život s njim.</h1>
          <p className="home-v2-hero__lead">
            Povezujemo prihod, proračun, dug, imovinu, trošenje i sigurnost tako
            da Bitcoin više nije izdvojena pozicija koju samo držite, nego
            primarni novac iz kojeg donosite odluke.
          </p>

          <div className="home-v2-hero__actions">
            <Button asChild size="lg" className="home-v2-primary-button">
              <a
                href={BITCOIN_STANDARD_CHECK_PATH}
                data-cta="home-hero-assessment"
              >
                <ClipboardCheck aria-hidden="true" />
                Napravite besplatnu provjeru
              </a>
            </Button>
            <a
              href={CONVERSATION_PATH}
              className="home-v2-text-link"
              data-cta="home-hero-conversation"
            >
              Već imate jasno pitanje? Dogovorite uvodni razgovor.
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>

          <p className="home-v2-trust-note">
            <ShieldCheck aria-hidden="true" />
            <span>
              Bez naknade i bez obveze. Ne upravljam vašim sredstvima i nikada
              ne tražim privatne ključeve, Bitcoin Core wallet backup datoteke,
              wallet passphraseove, početne riječi drugih walleta ni pristup
              novčaniku.
            </span>
          </p>
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
    </header>
  )
}
