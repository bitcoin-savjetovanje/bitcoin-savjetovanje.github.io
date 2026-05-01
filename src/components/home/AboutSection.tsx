import { CalendarDays, Linkedin, Mail } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import {
  BITCOIN_STANDARD_BOOK_URL,
  BOOKING_URL,
  DVADESET_JEDAN_URL,
  EMAIL,
  LINKEDIN_URL,
  PRIMARY_CTA,
  PRACTICAL_BITCOIN_STANDARD_URL,
  SAIFEDEAN_AMMOUS_URL,
  TWENTYONE_URL,
  credibilityLogos,
} from "@/content/site"

export function AboutSection() {
  return (
    <section id="o-meni" className="section-shell section-muted">
      <SectionHeader title="Zašto ja?" />
      <div className="credibility-grid">
        <aside className="profile-panel">
          <img src="/pavao-pahljina.jpg" alt="Pavao Pahljina" />
          <h3>Pavao Pahljina</h3>
          <p>Bitcoin savjetnik · u Bitcoinu od 2014.</p>
          <div className="profile-socials" aria-label="Kontakt i profili">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profil"
            >
              <Linkedin className="size-4" />
            </a>
            <a href={`mailto:${EMAIL}`} aria-label="Email" data-link="email">
              <Mail className="size-4" />
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={PRIMARY_CTA}
              data-cta="about-booking"
            >
              <CalendarDays className="size-4" />
            </a>
          </div>
        </aside>
        <div>
          <div className="credibility-copy">
            <p>
              U Bitcoinu sam od 2014. godine. Iza mene je više od 10.000 sati
              proučavanja Bitcoina i šest godina profesionalnog rada sa{" "}
              <a
                href={SAIFEDEAN_AMMOUS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Saifedeanom Ammousom
              </a>
              , autorom knjige{" "}
              <a
                href={BITCOIN_STANDARD_BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                The Bitcoin Standard
              </a>
              , te gradnja regionalne zajednice{" "}
              <a
                href={DVADESET_JEDAN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                DvadesetJedan
              </a>{" "}
              u sklopu svjetske mreže{" "}
              <a href={TWENTYONE_URL} target="_blank" rel="noopener noreferrer">
                TwentyOne World
              </a>
              .
            </p>
            <p>
              Od 2020. živim na Bitcoin standardu. Primam, držim i trošim
              Bitcoin. Zato razgovor ne kreće od teorije, nego od stvarnog
              života: novca, duga, sigurnosti, obitelji i odluka.
            </p>
            <p>
              Na temelju dosadašnjeg iskustva trenutno radim i na otvorenom
              priručniku{" "}
              <a
                href={PRACTICAL_BITCOIN_STANDARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-link="practical-bitcoin-standard"
              >
                Praktični Bitcoin standard
              </a>
              .
            </p>
            <p>
              Danas moj rad nije nagovaranje na Bitcoin. Moj posao je pomoći vam
              da razumijete što Bitcoin znači za vašu imovinu i koja pravila
              imaju smisla za vas.
            </p>
          </div>
        </div>
        <div
          className="credibility-logo-strip"
          aria-label="Suradnje i projekti"
        >
          {credibilityLogos.map((logo) => (
            <a
              key={logo.name}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {logo.darkSrc ? (
                <>
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className={`${logo.className} credibility-logo-strip__logo--light`}
                  />
                  <img
                    src={logo.darkSrc}
                    alt=""
                    className={`${logo.className} credibility-logo-strip__logo--dark`}
                  />
                </>
              ) : (
                <img
                  src={logo.src}
                  alt={logo.name}
                  className={logo.className}
                />
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
