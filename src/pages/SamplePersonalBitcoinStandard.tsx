import {
  ArrowUpRight,
  CalendarDays,
  Check,
  FileText,
  ShieldCheck,
} from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { samplePersonalBitcoinStandardRoute } from "@/content/clientRoutes"
import {
  CONVERSATION_PATH,
  PERSONAL_BITCOIN_STANDARD_PATH,
} from "@/content/site"

const resultSections = [
  {
    title: "Hijerarhija odluka",
    copy: "Što se rješava prvo, što može čekati i koja odluka otvara prostor za sljedeću.",
  },
  {
    title: "Pravila za novac i obveze",
    copy: "Dogovoreni okvir za proračun, pričuvu, dug i ulogu Bitcoina u stvarnim odlukama.",
  },
  {
    title: "Razriješene kontradikcije",
    copy: "Mjesta na kojima su se ciljevi natjecali za isti novac, vrijeme ili pozornost.",
  },
  {
    title: "Uloge relevantnih ljudi",
    copy: "Tko mora razumjeti pravilo, tko sudjeluje u odluci i tko zna prvi sigurnosni korak.",
  },
  {
    title: "Stres-test",
    copy: "Kako se sustav ponaša pri gubitku prihoda, većem trošku ili snažnoj promjeni kupovne moći.",
  },
  {
    title: "Provedba i revizija",
    copy: "Prvi redoslijed koraka te bilješka što treba provjeriti nakon 30 dana primjene.",
  },
] as const

const processDecisions = [
  "što je stvarna pričuva, a što novac koji samo trenutačno nema oznaku",
  "koja obveza smanjuje slobodu odlučivanja prije svake nove Bitcoin odluke",
  "koja pravila zahtijevaju zajednički dogovor partnera",
  "što se mijenja ako prihod privremeno padne ili nastane velik trošak",
  "može li druga odgovorna osoba objasniti prvi sigurnosni korak bez pristupa tajnama",
] as const

function ResultPreview() {
  return (
    <div
      className="sample-document-preview"
      role="img"
      aria-label="Skraćeni HTML prikaz rezultata"
    >
      <div className="sample-document-preview__sheet">
        <div className="sample-document-preview__header">
          <img
            src="/bitcoin-logo.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <div>
            <p>Skraćeni prikaz</p>
            <strong>Osobni Bitcoin standard</strong>
          </div>
        </div>
        <div className="sample-document-preview__rule" />
        <div className="sample-document-preview__grid">
          {resultSections.map((section) => (
            <span key={section.title}>
              <Check aria-hidden="true" />
              {section.title}
            </span>
          ))}
        </div>
        <div className="sample-document-preview__footer">
          <ShieldCheck aria-hidden="true" />
          Struktura rezultata, ne predložak za kopiranje
        </div>
      </div>
    </div>
  )
}

export function SamplePersonalBitcoinStandard() {
  return (
    <>
      <Seo {...samplePersonalBitcoinStandardRoute} />
      <article className="sample-standard-page service-page">
        <header className="sample-standard-hero hero-section editorial-section">
          <div className="hero-shell">
            <div className="hero-copy">
              <p className="hero-eyebrow">Primjer rezultata</p>
              <h1 className="hero-title">Kako izgleda rezultat rada</h1>
              <p className="hero-subtitle">
                Ovo nije predložak za samostalno kopiranje, nego skraćeni prikaz
                strukture i vrste odluka koje nastaju tijekom programa.
              </p>
              <div className="sample-standard-actions">
                <Button asChild className="cta-primary home-primary-button">
                  <a
                    href={PERSONAL_BITCOIN_STANDARD_PATH}
                    data-link="result-example-program"
                  >
                    Pogledajte program
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </Button>
                <a
                  href={CONVERSATION_PATH}
                  className="service-link-button"
                  data-cta="result-example-conversation"
                >
                  <CalendarDays className="size-4" aria-hidden="true" />
                  Rezervirajte razgovor
                </a>
              </div>
            </div>
            <div className="sample-standard-hero__visual">
              <ResultPreview />
            </div>
          </div>
        </header>

        <div className="service-page__inner sample-standard-page__inner">
          <section className="service-section service-section--split">
            <div className="service-editorial-column">
              <p className="service-eyebrow">Zamišljena situacija prije rada</p>
              <h2>Informacija postoji, ali redoslijed nije dogovoren</h2>
              <p>
                Ana i Marko imaju Bitcoin, redovita primanja, stambeni dug,
                djecu i više budućih obveza. Mnogo su čitali, ali pri svakoj
                većoj promjeni cijene ponovno otvaraju ista pitanja: što je
                pričuva, što prvo otplatiti, koliko likvidnosti trebaju i kako
                uključiti obitelj u sigurnost.
              </p>
              <p>
                Njihov problem nije nedostatak sadržaja. Nedostaju zajednička
                hijerarhija odluka, provediva pravila i dogovor kako ih
                revidirati kada se okolnosti promijene.
              </p>
            </div>
            <aside className="service-side-panel">
              <FileText aria-hidden="true" />
              <h3>Prije programa</h3>
              <p>
                Dobra načela postoje odvojeno, ali ne tvore sustav koji obje
                osobe mogu objasniti i provesti.
              </p>
            </aside>
          </section>

          <section className="service-section sample-standard-section">
            <div className="service-section__header">
              <p className="service-eyebrow">Sažeti sadržaj</p>
              <h2>Što pisani standard na kraju bilježi</h2>
              <p>
                Dokument bilježi odluke donesene tijekom rada. Ne pokušava
                unaprijed zadati ista pravila svim ljudima.
              </p>
            </div>
            <div className="sample-standard-card-grid">
              {resultSections.map((section) => (
                <article key={section.title} className="sample-standard-card">
                  <Check
                    className="sample-standard-card__icon"
                    aria-hidden="true"
                  />
                  <h3>{section.title}</h3>
                  <p>{section.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="service-section service-section--warm">
            <div className="service-checklist-grid">
              <article className="service-checklist-panel">
                <p className="service-eyebrow">Djelomično redigiran primjer</p>
                <h2>Jedno osobno pravilo</h2>
                <div className="service-emphasis-card">
                  Prije nove Bitcoin odluke kućanstvo provjerava pričuvu od
                  [redigirano], obveze do [redigirano] i dogovoreni prag
                  [redigirano]. Ako jedan uvjet nije ispunjen, prvi korak je
                  [redigirano], a ne automatska kupnja ili prodaja.
                </div>
                <p>
                  Redigirani dijelovi ovise o stvarnim obvezama, stabilnosti
                  prihoda, ljudima uključenima u odluku i sposobnosti provedbe.
                </p>
              </article>

              <article className="service-checklist-panel">
                <p className="service-eyebrow">Bilješke iz procesa</p>
                <h2>Što je trebalo odlučiti</h2>
                <ul className="service-checklist">
                  {processDecisions.map((decision) => (
                    <li key={decision}>
                      <Check
                        className="positive-icon service-checklist__icon"
                        aria-hidden="true"
                      />
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          <section className="service-section">
            <div className="service-section__header">
              <p className="service-eyebrow">Načelo i osobno pravilo</p>
              <h2>Isto načelo ne znači isti odgovor</h2>
            </div>
            <div className="service-comparison__grid">
              <article className="service-checklist-panel">
                <h3>Generičko načelo</h3>
                <p>
                  Održavajte dovoljno likvidnosti da zbog kratkoročne obveze ne
                  morate donositi Bitcoin odluku pod pritiskom.
                </p>
              </article>
              <article className="service-checklist-panel">
                <h3>Osobno pravilo</h3>
                <p>
                  Za ovu obitelj „dovoljno” znači [redigirano], provjerava se
                  [redigirano], a promjena pravila zahtijeva [redigirano]. Ti
                  elementi nastaju iz njihove bilance, odnosa i rizika.
                </p>
              </article>
            </div>
          </section>

          <section className="service-section sample-standard-audience">
            <div className="service-section__header">
              <p className="service-eyebrow">Zašto je primjer skraćen</p>
              <h2>Struktura je javna. Osobna provedba nije univerzalna.</h2>
              <p>
                Javni primjer namjerno pokazuje strukturu, ali ne i cijeli
                provedbeni sustav. Ista pravila ne mogu se odgovorno primijeniti
                na dvije različite obitelji, bilance ili sigurnosne situacije.
                To nije skrivanje znanja, nego pošteno odvajanje načela od
                osobne prosudbe.
              </p>
            </div>
          </section>

          <section className="service-section service-final-cta">
            <div>
              <h2>Želite pretvoriti okvir u vlastite odluke?</h2>
              <p>
                Program povezuje prioritizaciju, stres-test, provedbu i
                30-dnevnu reviziju. Ako imate samo jedno primarno pitanje,
                konzultacija može biti dovoljan sljedeći korak.
              </p>
            </div>
            <ul className="service-cta-list">
              <li>
                <Button asChild className="cta-primary home-primary-button">
                  <a
                    href={CONVERSATION_PATH}
                    data-cta="result-example-final-conversation"
                  >
                    <CalendarDays className="size-4" aria-hidden="true" />
                    Rezervirajte razgovor
                  </a>
                </Button>
              </li>
              <li>
                <a
                  href={PERSONAL_BITCOIN_STANDARD_PATH}
                  className="service-link-button"
                  data-link="result-example-final-program"
                >
                  Pogledajte program
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </section>
        </div>
      </article>
    </>
  )
}
