import { CalendarDays, Mail } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import {
  BITCOIN_STANDARD_BOOK_URL,
  CONVERSATION_PATH,
  DVADESET_JEDAN_URL,
  EMAIL,
  PRACTICAL_BITCOIN_STANDARD_URL,
  SAIFEDEAN_AMMOUS_URL,
  TWENTYONE_URL,
  credibilityLogos,
} from "@/content/site"

export function AboutSection() {
  return (
    <section id="o-meni" className="section-shell section-muted">
      <SectionHeader
        title="Razgovarate s nekim tko Bitcoin ne objašnjava izvana."
        copy="Najčešće pomažem ljudima upravo ondje gdje knjige i podcasti stanu: kada opća Bitcoin teza mora postati osobna odluka."
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
              Ovdje ne pogađamo sljedeći pomak cijene. Radimo na tome da
              razumijete Bitcoin, vlastitu situaciju i pravila koja vam pomažu
              donositi mirnije odluke.
            </p>
            <p>
              Pomažem vam razumjeti Bitcoin i vlastitu situaciju dovoljno jasno
              da sami donesete mirnu odluku o ulozi Bitcoina u vašem novcu,
              imovini i obitelji.
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
              aria-label={logo.name}
            >
              {logo.darkSrc ? (
                <>
                  <img
                    src={logo.src}
                    alt=""
                    aria-hidden="true"
                    className={`${logo.className} credibility-logo-strip__logo--light`}
                  />
                  <img
                    src={logo.darkSrc}
                    alt=""
                    aria-hidden="true"
                    className={`${logo.className} credibility-logo-strip__logo--dark`}
                  />
                </>
              ) : (
                <img
                  src={logo.src}
                  alt=""
                  aria-hidden="true"
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
