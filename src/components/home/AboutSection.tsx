import { CalendarDays, Mail } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import {
  CONVERSATION_PATH,
  DVADESET_JEDAN_URL,
  EMAIL,
  PRACTICAL_BITCOIN_STANDARD_URL,
} from "@/content/site"

export function AboutSection() {
  return (
    <section id="o-meni" className="section-shell section-muted">
      <SectionHeader
        title="Razgovarate s nekim tko Bitcoin povezuje sa stvarnim odlukama."
        copy="Najkorisniji razgovori počinju ondje gdje knjige i podcasti stanu: kada opća Bitcoin teza mora postati osobna, obiteljska ili poslovna odluka."
      />
      <div className="credibility-grid">
        <aside className="profile-panel">
          <img src="/pavao-pahljina.jpg" alt="Portret Pavla Pahljine" />
          <h3>Pavao Pahljina</h3>
          <p>Bitcoin savjetnik · u Bitcoinu od 2014.</p>
          <div className="profile-socials" aria-label="Kontakt i profili">
            <a href={`mailto:${EMAIL}`} aria-label="Email" data-link="email">
              <Mail className="size-4" />
            </a>
            <a
              href={CONVERSATION_PATH}
              aria-label="Dogovorite razgovor"
              data-cta="about-intro-call"
            >
              <CalendarDays className="size-4" />
            </a>
          </div>
        </aside>
        <div>
          <div className="credibility-copy">
            <p>
              Prije punog rada u Bitcoinu bio sam suosnivač i direktor STEMI-ja.
              Zato Bitcoin savjetovanje ne gledam samo kao teoriju novca, nego
              kroz stvarne odluke o cash flowu, riziku, ljudima, obvezama i
              vremenu.
            </p>
            <p>
              Danas radim s ljudima koji žele prijeći iz “imam Bitcoin” u “imam
              pravila za život s Bitcoinom”.
            </p>
            <p>
              Dio okvira javno razvijam kroz{" "}
              <a
                href={PRACTICAL_BITCOIN_STANDARD_URL}
                data-link="bitcoin-as-money-guides"
              >
                vodiče
              </a>
              i{" "}
              <a
                href={DVADESET_JEDAN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                DvadesetJedan
              </a>{" "}
              zajednicu.
            </p>
            <a
              href={CONVERSATION_PATH}
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
              data-cta="about-intro-call"
            >
              <CalendarDays className="size-4" />
              Dogovorite razgovor
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
