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
        title="Pavao Pahljina"
        copy="Bitcoin savjetnik · u Bitcoinu od 2014."
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
              Bitcoin sam počeo proučavati 2014., a s vremenom sam ga prestao
              gledati samo kao imovinu koju se drži sa strane. Pitanje koje me
              najviše zanima jest: što se mijenja kada Bitcoin počnete shvaćati
              kao novac oko kojega treba urediti stvarni život?
            </p>
            <p>
              Prije punog rada u Bitcoinu bio sam suosnivač i direktor STEMI-ja.
              Zato Bitcoin savjetovanje ne gledam samo kao teoriju novca, nego
              kroz stvarne odluke o cash flowu, riziku, ljudima, obvezama i
              vremenu.
            </p>
            <p>
              Danas radim s ljudima koji žele prijeći iz “imam Bitcoin” u “imam
              pravila za život s Bitcoinom”. To može značiti osobni proračun,
              obiteljski dogovor, poslovnu riznicu, sigurnosni okvir ili
              učvršćivanje Bitcoin teze prije veće odluke.
            </p>
            <p>
              Dio okvira javno razvijam kroz{" "}
              <a
                href={PRACTICAL_BITCOIN_STANDARD_URL}
                data-link="bitcoin-as-money-guides"
              >
                vodiče
              </a>
              {" i "}
              <a
                href={DVADESET_JEDAN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                DvadesetJedan
              </a>
              {" zajednicu."} Širi sustav oblikujem u knjizi “Bitcoin kao novac:
              Praktični vodič za život s Bitcoinom”.
            </p>
            <div className="credibility-badges" aria-label="Kratki kontekst">
              <article>
                <strong>Od 2014.</strong>
                <span>Praktično iskustvo s Bitcoinom kroz više ciklusa.</span>
              </article>
              <article>
                <strong>Poduzetništvo</strong>
                <span>Suosnivač i bivši direktor STEMI-ja.</span>
              </article>
              <article>
                <strong>Knjiga i vodiči</strong>
                <span>
                  Okvir iz knjige Bitcoin kao novac razvija se kroz javne vodiče
                  i savjetovanje.
                </span>
              </article>
            </div>
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
