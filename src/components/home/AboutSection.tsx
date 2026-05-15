import { CalendarDays, Mail } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import {
  CONVERSATION_PATH,
  DVADESET_JEDAN_URL,
  EMAIL,
  BITCOIN_STANDARD_AUDIO_URL,
  PRACTICAL_BITCOIN_STANDARD_URL,
  SAIFEDEAN_AMMOUS_URL,
  SAIF_HOUSE_URL,
  STEMI_URL,
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
              U Bitcoin sam prvi put eksperimentalno ušao 2014., 2018. ga počeo
              ozbiljno proučavati, a od 2020. živim na potpunom Bitcoin
              standardu. Uz rad u Bitcoin industriji, proveo sam preko 10000
              sati proučavajući Bitcoin sa svih aspekata. Pitanje koje me
              najviše zanima jest: što se mijenja kada Bitcoin počnete shvaćati
              kao novac oko kojega treba urediti stvarni život?
            </p>
            <p>
              Prije punog rada u Bitcoinu bio sam suosnivač i direktor{" "}
              <a href={STEMI_URL} target="_blank" rel="noopener noreferrer">
                STEMI-ja
              </a>
              . Zato Bitcoin savjetovanje ne gledam samo kao teoriju novca, nego
              kroz stvarne odluke o novčanom toku, riziku, ljudima, obvezama i
              vremenu.
            </p>
            <p>
              U Bitcoin industriji radio sam sa{" "}
              <a
                href={SAIFEDEAN_AMMOUS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Saifedeanom Ammousom
              </a>
              , autorom knjige Bitcoin Standard, na njegovoj online akademiji,{" "}
              <a
                href={BITCOIN_STANDARD_AUDIO_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                podcastima
              </a>{" "}
              i{" "}
              <a
                href={SAIF_HOUSE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                izdavačkoj kući
              </a>
              . To iskustvo spaja Bitcoin teoriju, edukaciju i stvarne
              operativne odluke.
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
                <strong>Preko 10000 sati</strong>
                <span>
                  Od 2018. sustavno proučavanje Bitcoina, monetarne ekonomije i
                  sigurnosti.
                </span>
              </article>
              <article>
                <strong>Poduzetništvo</strong>
                <span>
                  Suosnivač i bivši direktor{" "}
                  <a href={STEMI_URL} target="_blank" rel="noopener noreferrer">
                    STEMI-ja
                  </a>
                  .
                </span>
              </article>
              <article>
                <strong>Bitcoin industrija</strong>
                <span>
                  Rad sa Saifedeanom Ammousom na akademiji, podcastima i
                  izdavačkoj kući.
                </span>
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
