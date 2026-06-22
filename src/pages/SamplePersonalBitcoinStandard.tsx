import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Download,
  FileText,
} from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { samplePersonalBitcoinStandardRoute } from "@/content/clientRoutes"
import {
  CONVERSATION_PATH,
  SAMPLE_PERSONAL_BITCOIN_STANDARD_COVER_PATH,
  SAMPLE_PERSONAL_BITCOIN_STANDARD_COVER_WEBP_PATH,
  SAMPLE_PERSONAL_BITCOIN_STANDARD_PDF_PATH,
} from "@/content/site"

const documentAreas = [
  "Proračun i stvarni višak",
  "Dug i razduživanje",
  "Davanje",
  "Bitcoin kao primarni novac",
  "Neto imovina",
  "Volatilnost i pravila odluke",
  "Sigurnost i obitelj",
  "90-dnevni plan provedbe",
]

const previewLines = [
  "Proračun",
  "Dug",
  "Davanje",
  "Bitcoin",
  "Neto imovina",
  "Sigurnost",
]

function SampleDocumentPreview() {
  return (
    <div className="sample-document-preview" aria-label="Pregled PDF primjera">
      <div className="sample-document-preview__sheet">
        <div className="sample-document-preview__header">
          <img src="/bitcoin-logo.png" alt="" aria-hidden="true" />
          <div>
            <p>Ogledni primjer</p>
            <strong>Osobni Bitcoin standard</strong>
          </div>
        </div>
        <div className="sample-document-preview__rule" />
        <div className="sample-document-preview__grid">
          {previewLines.map((line) => (
            <span key={line}>
              <Check aria-hidden="true" />
              {line}
            </span>
          ))}
        </div>
        <div className="sample-document-preview__footer">
          <FileText aria-hidden="true" />
          <span>18 stranica anonimnog primjera</span>
        </div>
      </div>
    </div>
  )
}

function SampleStandardCoverPreview() {
  return (
    <figure className="standard-check-cover-card">
      <picture>
        <source
          srcSet={SAMPLE_PERSONAL_BITCOIN_STANDARD_COVER_WEBP_PATH}
          type="image/webp"
        />
        <img
          src={SAMPLE_PERSONAL_BITCOIN_STANDARD_COVER_PATH}
          alt="Naslovnica PDF-a Primjer osobnog Bitcoin standarda"
          width="1055"
          height="1491"
          loading="eager"
          decoding="async"
        />
      </picture>
      <figcaption>
        <FileText className="size-4" aria-hidden="true" />
        Ogledni dokument
      </figcaption>
    </figure>
  )
}

export function SamplePersonalBitcoinStandard() {
  return (
    <>
      <Seo
        title={samplePersonalBitcoinStandardRoute.title}
        description={samplePersonalBitcoinStandardRoute.description}
        canonical={samplePersonalBitcoinStandardRoute.canonical}
        ogType={samplePersonalBitcoinStandardRoute.ogType}
        schema={samplePersonalBitcoinStandardRoute.schema as object}
      />
      <article className="service-page sample-standard-page">
        <header className="sample-standard-hero hero-section editorial-section">
          <div className="hero-shell">
            <div className="hero-copy sample-standard-hero__copy">
              <p className="hero-eyebrow">OGLEDNI PRIMJER</p>
              <h1 className="hero-title">
                Kako izgleda osobni Bitcoin standard?
              </h1>
              <p className="hero-subtitle">
                Anonimni primjer dokumenta koji pokazuje kako se Bitcoin može
                pretvoriti iz odvojene imovine u jasan sustav odluka.
              </p>
              <div className="sample-standard-actions">
                <Button asChild className="cta-primary home-primary-button">
                  <a
                    href={SAMPLE_PERSONAL_BITCOIN_STANDARD_PDF_PATH}
                    data-cta="sample-standard-pdf"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    Preuzmite PDF primjer
                  </a>
                </Button>
                <a
                  href={CONVERSATION_PATH}
                  className="service-link-button"
                  data-link="sample-standard-conversation"
                >
                  <CalendarDays className="size-4" aria-hidden="true" />
                  Rezervirajte 15-minutni razgovor
                </a>
              </div>
            </div>
            <aside className="sample-standard-hero__visual">
              <SampleStandardCoverPreview />
            </aside>
          </div>
        </header>

        <div className="service-page__inner sample-standard-page__inner">
          <section className="service-section sample-standard-section">
            <div className="service-section__header">
              <p className="service-eyebrow">Struktura dokumenta</p>
              <h2>Što dokument pokazuje</h2>
              <p>
                Ovo nije stvarni klijent i nije financijski, porezni ni pravni
                savjet. Dokument služi kao ogledni primjer strukture: kako nakon
                rada može izgledati pisani sustav odluka za proračun, dug,
                davanje, Bitcoin kao novac, neto imovinu, volatilnost, sigurnost
                i obitelj.
              </p>
            </div>
            <div className="sample-standard-card-grid">
              {documentAreas.map((area) => (
                <article key={area} className="sample-standard-card">
                  <Check className="sample-standard-card__icon" />
                  <h3>{area}</h3>
                </article>
              ))}
            </div>
          </section>

          <section className="service-section sample-standard-audience">
            <div className="service-section__header">
              <h2>Za koga je primjer koristan</h2>
              <p>
                Za osobu koja već ima Bitcoin, ali želi vidjeti kako bi izgledao
                uređeniji sustav odluka. Posebno je koristan ako niste sigurni
                koliko je novca stvarno slobodno, kako tretirati dug, što s
                volatilnošću, kako objasniti Bitcoin obitelji ili kako sigurnost
                pretvoriti u ponovljiv proces.
              </p>
            </div>
          </section>

          <section className="service-section sample-standard-system">
            <div>
              <p className="service-eyebrow">Pisani ishod</p>
              <h2>Ne kupujete samo razgovor. Gradite sustav.</h2>
              <p>
                Razgovor služi tome da se stanje razjasni. Program služi tome da
                se odluke zapišu u obliku pravila koja možete provoditi,
                provjeravati i s vremenom prilagođavati.
              </p>
            </div>
            <SampleDocumentPreview />
          </section>

          <section className="service-section service-final-cta sample-standard-final-cta">
            <div>
              <h2>Želite svoj osobni Bitcoin standard?</h2>
              <p>
                Krenite od kratkog uvodnog razgovora. Bez slanja osjetljivih
                podataka, bez seed phrasea, bez privatnih ključeva i bez
                pristupa novčaniku.
              </p>
            </div>
            <ul className="service-cta-list">
              <li>
                <Button asChild className="cta-primary home-primary-button">
                  <a
                    href={CONVERSATION_PATH}
                    data-cta="sample-standard-final-conversation"
                  >
                    <CalendarDays className="size-4" aria-hidden="true" />
                    Rezervirajte 15-minutni razgovor
                  </a>
                </Button>
              </li>
              <li>
                <a
                  href={SAMPLE_PERSONAL_BITCOIN_STANDARD_PDF_PATH}
                  className="service-link-button"
                  data-link="sample-standard-final-pdf"
                >
                  Preuzmite PDF primjer
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
