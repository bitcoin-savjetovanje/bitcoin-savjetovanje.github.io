import { CalendarDays, Check, Mail } from "lucide-react"

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

const experienceHighlights = [
  { label: "10.000+ sati u Bitcoinu" },
  { label: "Bitcoin standard od 2020." },
  { label: "6 godina rada sa Saifedeanom Ammousom" },
  {
    label: "suosnivač i bivši direktor STEMI-ja",
    href: "https://www.linkedin.com/company/stemi---learning-by-creating/",
  },
]

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

          <div className="mt-8 rounded-2xl border border-border/80 bg-card/82 p-5 shadow-sm sm:p-6">
            <h3 className="text-xl font-semibold text-foreground">
              Iskustvo iza razgovora
            </h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {experienceHighlights.map((item) => (
                <div
                  key={item.label}
                  className="flex gap-3 rounded-lg border border-border/70 bg-background/70 px-3.5 py-3 text-sm leading-6 font-medium text-foreground"
                >
                  <Check className="positive-icon mt-1 size-3.5 shrink-0" />
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-foreground no-underline hover:text-primary"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-5 text-base leading-7 text-muted-foreground lg:grid-cols-2">
              <div className="space-y-4">
                <p>
                  U Bitcoinu sam od 2014., a od 2018. ga proučavam ozbiljno i
                  sustavno. Od 2020. živim na Bitcoin standardu. U tom razdoblju
                  proveo sam više od 10.000 sati u Bitcoinu: kroz vlastito
                  učenje, rad u industriji, razgovore, seminare, zajednicu i
                  praktičnu primjenu.
                </p>
                <p>
                  Šest godina radio sam sa Saifedeanom Ammousom, autorom knjige{" "}
                  <a
                    href={BITCOIN_STANDARD_BOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-foreground no-underline hover:text-primary"
                  >
                    The Bitcoin Standard
                  </a>
                  , na njegovoj internetskoj akademiji, tečajevima, seminarima,
                  podcastu i izdavanju knjiga. Sudjelovao sam u radu oko knjiga
                  koje su došle nakon{" "}
                  <a
                    href="https://saifedean.com/tbs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-foreground no-underline hover:text-primary"
                  >
                    The Bitcoin Standard
                  </a>
                  :{" "}
                  <a
                    href="https://saifedean.com/tfs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-foreground no-underline hover:text-primary"
                  >
                    The Fiat Standard
                  </a>
                  ,{" "}
                  <a
                    href="https://saifedean.com/poe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-foreground no-underline hover:text-primary"
                  >
                    Principles of Economics
                  </a>{" "}
                  i{" "}
                  <a
                    href="https://saifedean.com/tgs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-foreground no-underline hover:text-primary"
                  >
                    The Gold Standard
                  </a>
                  .
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  Prije Bitcoina bio sam suosnivač i direktor{" "}
                  <a
                    href="https://www.linkedin.com/company/stemi---learning-by-creating/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-foreground no-underline hover:text-primary"
                  >
                    STEMI-ja
                  </a>
                  . To iskustvo mi je dalo praktičan pogled na poduzetništvo,
                  prodaju, vođenje tima, kapital, rizik i donošenje odluka.
                </p>
                <p>
                  Od 2022. gradim regionalnu Bitcoin otvorenu zajednicu{" "}
                  <a
                    href={DVADESET_JEDAN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-foreground no-underline hover:text-primary"
                  >
                    DvadesetJedan
                  </a>{" "}
                  kao dio svjetske mreže zajednica{" "}
                  <a
                    href={TWENTYONE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-foreground no-underline hover:text-primary"
                  >
                    TwentyOne World
                  </a>
                  .
                </p>
                <p>
                  To iskustvo danas koristim kako bih Bitcoin spustio iz teorije
                  u stvarne odluke o novcu, dugu, imovini, sigurnosti i
                  obitelji.
                </p>
              </div>
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
