import { CalendarDays, Mail } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import {
  BITCOIN_STANDARD_BOOK_URL,
  BOOKING_URL,
  DVADESET_JEDAN_URL,
  EMAIL,
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
        title="Ne pomažem vam postaviti teoriju koju nisam živio."
        copy="Bitcoin standard treba izdržati običan život, ne samo dobru ideju."
      />
      <div className="credibility-grid">
        <aside className="profile-panel">
          <img src="/pavao-pahljina.jpg" alt="Pavao Pahljina" />
          <h3>Pavao Pahljina</h3>
          <p>Bitcoin savjetnik · u Bitcoinu od 2014.</p>
          <div className="profile-socials" aria-label="Kontakt i profili">
            <a href={`mailto:${EMAIL}`} aria-label="Email" data-link="email">
              <Mail className="size-4" />
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={PRIMARY_CTA}
              data-cta="about-standard-check"
            >
              <CalendarDays className="size-4" />
            </a>
          </div>
        </aside>
        <div>
          <div className="credibility-copy">
            <p>
              U Bitcoinu sam od 2014. Od 2020. živim na Bitcoin standardu. Radio
              sam u Bitcoin industriji i sa{" "}
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
              . Praktični Bitcoin standard nastao je iz pokušaja da Bitcoin ne
              bude samo nešto što držim, nego novac s kojim stvarno živim.
            </p>
            <p>
              Moj posao nije reći vam što će cijena napraviti. Moj posao je
              pomoći vam zapisati pravila po kojima ćete vi donositi bolje
              odluke.
            </p>
            <p>
              Dio tog rada javno razvijam kroz{" "}
              <a
                href={PRACTICAL_BITCOIN_STANDARD_URL}
                data-link="practical-bitcoin-standard"
              >
                Praktični Bitcoin standard
              </a>{" "}
              i{" "}
              <a
                href={DVADESET_JEDAN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                DvadesetJedan
              </a>{" "}
              zajednicu u sklopu mreže{" "}
              <a href={TWENTYONE_URL} target="_blank" rel="noopener noreferrer">
                TwentyOne World
              </a>
              .
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
