import { ArrowUpRight, CalendarDays, Download, FileText } from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { bitcoinStandardCheckRoute } from "@/content/clientRoutes"
import {
  BITCOIN_STANDARD_CHECK_COVER_PATH,
  BITCOIN_STANDARD_CHECK_COVER_WEBP_PATH,
  BITCOIN_STANDARD_CHECK_PDF_PATH,
  CONVERSATION_PATH,
} from "@/content/site"

const checkCards = [
  {
    title: "Proračun",
    copy: "Znate li koji je novac stvarno slobodan?",
  },
  {
    title: "Dug",
    copy: "Zauzima li dug vašu budućnost?",
  },
  {
    title: "Davanje",
    copy: "Ima li novac mjesto za velikodušnost?",
  },
  {
    title: "Bitcoin kao novac",
    copy: "Je li Bitcoin odvojena imovina ili dio sustava?",
  },
  {
    title: "Neto imovina",
    copy: "Gledate li imovinu kao jednu cjelinu?",
  },
  {
    title: "Volatilnost",
    copy: "Imate li pravila za rast, pad i čekanje?",
  },
  {
    title: "Sigurnost i obitelj",
    copy: "Zna li netko što treba učiniti ako vi ne možete?",
  },
]

function StandardCheckCoverPreview() {
  return (
    <figure className="standard-check-cover-card">
      <picture>
        <source
          srcSet={BITCOIN_STANDARD_CHECK_COVER_WEBP_PATH}
          type="image/webp"
        />
        <img
          src={BITCOIN_STANDARD_CHECK_COVER_PATH}
          alt="Naslovnica PDF-a 7 provjera osobnog Bitcoin standarda"
          width="848"
          height="1200"
          loading="eager"
          decoding="async"
        />
      </picture>
      <figcaption>
        <FileText className="size-4" aria-hidden="true" />
        Besplatni radni PDF
      </figcaption>
    </figure>
  )
}

export function BitcoinStandardCheck() {
  return (
    <>
      <Seo
        title={bitcoinStandardCheckRoute.title}
        description={bitcoinStandardCheckRoute.description}
        canonical={bitcoinStandardCheckRoute.canonical}
        ogType={bitcoinStandardCheckRoute.ogType}
        schema={bitcoinStandardCheckRoute.schema as object}
      />
      <article className="service-page standard-check-page">
        <header className="standard-check-hero hero-section editorial-section">
          <div className="hero-shell standard-check-hero__shell">
            <div className="hero-copy standard-check-hero__copy">
              <p className="hero-eyebrow">BESPLATNI RADNI PDF</p>
              <h1 className="hero-title">
                7 provjera osobnog Bitcoin standarda
              </h1>
              <p className="hero-subtitle">
                Radni PDF za osobu koja ima Bitcoin, ali želi provjeriti ima li
                stvarna pravila za proračun, dug, davanje, neto imovinu,
                volatilnost, sigurnost i obitelj.
              </p>
              <div className="standard-check-actions">
                <Button asChild className="cta-primary home-primary-button">
                  <a
                    href={BITCOIN_STANDARD_CHECK_PDF_PATH}
                    data-cta="standard-check-pdf"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    Preuzmite PDF
                  </a>
                </Button>
                <a
                  href={CONVERSATION_PATH}
                  className="service-link-button"
                  data-link="standard-check-conversation"
                >
                  <CalendarDays className="size-4" aria-hidden="true" />
                  Rezervirajte 15-minutni razgovor
                </a>
              </div>
            </div>
            <aside className="standard-check-hero__visual">
              <StandardCheckCoverPreview />
            </aside>
          </div>
        </header>

        <div className="service-page__inner standard-check-page__inner">
          <section className="service-section standard-check-section">
            <div className="service-section__header">
              <p className="service-eyebrow">Sedam pitanja za red</p>
              <h2>Što provjeravate?</h2>
            </div>
            <div className="standard-check-card-grid">
              {checkCards.map((card, index) => (
                <article key={card.title} className="standard-check-card">
                  <span className="standard-check-card__number">
                    {index + 1}
                  </span>
                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="service-section standard-check-audience">
            <div className="service-section__header">
              <h2>Za koga je PDF?</h2>
              <p>
                Ovaj PDF je za osobu koja već ima Bitcoin ili ga ozbiljno
                razmatra, ali želi provjeriti postoji li iza toga osobni sustav
                odluka. Nije namijenjen trgovanju, prognoziranju cijene ni
                tehničkom postavljanju novčanika. Služi kao mirna provjera reda.
              </p>
            </div>
          </section>

          <section className="service-section service-final-cta standard-check-final-cta">
            <div>
              <p className="service-eyebrow">Sljedeći korak</p>
              <h2>Što nakon provjere?</h2>
              <p>
                Ako nakon provjere vidite da imate Bitcoin, ali nemate jasna
                pravila, sljedeći korak je kratak uvodni razgovor. Bez slanja
                osjetljivih podataka, bez seed phrasea, bez privatnih ključeva i
                bez pristupa novčaniku.
              </p>
            </div>
            <ul className="service-cta-list">
              <li>
                <Button asChild className="cta-primary home-primary-button">
                  <a
                    href={CONVERSATION_PATH}
                    data-cta="standard-check-final-conversation"
                  >
                    <CalendarDays className="size-4" aria-hidden="true" />
                    Rezervirajte 15-minutni razgovor
                  </a>
                </Button>
              </li>
              <li>
                <a
                  href={BITCOIN_STANDARD_CHECK_PDF_PATH}
                  className="service-link-button"
                  data-link="standard-check-final-pdf"
                >
                  Preuzmite PDF
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
