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
      <SectionHeader
        title="Ne savjetujem o sustavu koji ne živim."
        copy="Okvir je nastao iz stvarnog života: proračuna, duga, rada, sigurnosti i korištenja Bitcoina kao novca."
      />
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
              U Bitcoinu sam od 2014. Od 2020. živim na Bitcoin standardu. Radio
              sam šest godina sa{" "}
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
              . Gradim{" "}
              <a
                href={DVADESET_JEDAN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                DvadesetJedan
              </a>{" "}
              zajednicu u sklopu svjetske mreže{" "}
              <a href={TWENTYONE_URL} target="_blank" rel="noopener noreferrer">
                TwentyOne World
              </a>
              .
            </p>
            <p>
              Pišem otvoreni priručnik{" "}
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
              Moj posao nije nagovoriti vas da kupite Bitcoin. Moj posao je
              pomoći vam urediti novac, dug, imovinu i pravila oko Bitcoina.
            </p>
            <div className="grid gap-2 pt-2 sm:grid-cols-2">
              {[
                "živim na Bitcoin standardu",
                "radio sam sa Saifedeanom Ammousom",
                "radim na Bitcoin edukaciji i sadržaju",
                "metoda je nastala iz prakse",
              ].map((item) => (
                <div key={item} className="check-row bg-background/70">
                  <p>{item}</p>
                </div>
              ))}
            </div>
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
