import { BookOpen, CalendarDays } from "lucide-react"

import { Seo } from "@/components/Seo"
import { StoneSymbol } from "@/components/home/StoneSymbol"
import { StandardCheckCta } from "@/components/topic/StandardCheckCta"
import { Button } from "@/components/ui/button"
import { findGuide, guideHref, type Guide } from "@/content/guides"
import { resolveGuideCover } from "@/content/guideVisuals"
import { bitcoinMoneyRoute } from "@/content/clientRoutes"
import {
  CONVERSATION_PATH,
  PRACTICAL_BITCOIN_STANDARD_URL,
} from "@/content/site"

const outcomes = [
  {
    iconSrc: "/images/stone-symbols/odvojiti-novac-od-spekulacije.webp",
    title: "Odvojiti novac od špekulacije",
  },
  {
    iconSrc: "/images/stone-symbols/postaviti-bitcoin-kao-primarni-saldo.webp",
    title: "Postaviti Bitcoin kao primarni saldo",
  },
  {
    iconSrc:
      "/images/stone-symbols/uskladiti-drzavni-novac-i-kratke-obveze.webp",
    title: "Uskladiti državni novac i kratke obveze",
  },
  {
    iconSrc: "/images/stone-symbols/donositi-odluke-bez-trgovanja.webp",
    title: "Donositi odluke bez trgovanja",
  },
  {
    iconSrc: "/images/stone-symbols/objasniti-bitcoin-obitelji-ili-poslu.webp",
    title: "Objasniti Bitcoin obitelji ili poslu",
  },
  {
    iconSrc: "/images/stone-symbols/povezati-proracun-dug-i-neto-imovinu.webp",
    title: "Povezati proračun, dug i neto imovinu",
  },
]

const investmentView = [
  "pitanje je kada ući i izaći",
  "cijena vodi emocije",
  "portfelj traži stalnu usporedbu",
  "odluke ostaju odvojene od života",
]

const moneyView = [
  "pitanje je što je novčani saldo",
  "proračun vodi odluke",
  "dug, davanje i neto imovina ulaze u istu sliku",
  "pravila zamjenjuju paniku i euforiju",
]

const guideSlugs = [
  "bitcoin-kao-novac",
  "bitcoin-nije-kripto-portfelj",
  "pozitivni-neto-priljev",
  "niste-zakasnili-u-bitcoin",
] as const

const bitcoinMoneyGuides = guideSlugs
  .map((slug) => findGuide(slug))
  .filter((guide): guide is Guide => Boolean(guide))

const principles = [
  "Proračun pokazuje što novac mora napraviti.",
  "Dug pokazuje koliko je budućnosti već zauzeto.",
  "Bitcoin pokazuje gdje želite držati novčani saldo kroz vrijeme.",
]

export function BitcoinMoney() {
  return (
    <>
      <Seo
        title={bitcoinMoneyRoute.title}
        description={bitcoinMoneyRoute.description}
        canonical={bitcoinMoneyRoute.canonical}
        ogType={bitcoinMoneyRoute.ogType}
        schema={bitcoinMoneyRoute.schema as object}
      />

      <div className="topic-page bitcoin-money-page">
        <section className="topic-hero bitcoin-money-hero">
          <div className="topic-hero__copy">
            <p className="topic-eyebrow">DIO IV · PRIMARNI NOVAC</p>
            <h1>Bitcoin kao novac</h1>
            <p className="topic-hero__lead">
              Ako Bitcoin shvatite kao novac, pitanje više nije samo kada
              kupiti, nego kako urediti život oko boljeg novca.
            </p>
            <p className="topic-hero__body">
              Bitcoin kao novac ne znači da svaki račun plaćate izravno u
              Bitcoinu. Znači da jasno znate u kojem obliku držite svoj novčani
              saldo nakon što ste ga zaradili, koji dio mora ostati u državnom
              novcu za kratke obveze i koji dio može nositi dugoročnu monetarnu
              ulogu.
            </p>
            <div className="topic-hero__actions">
              <Button
                asChild
                size="lg"
                className="cta-primary home-primary-button"
              >
                <a href={CONVERSATION_PATH} data-cta="bitcoin-money-intro-call">
                  <CalendarDays className="size-4" aria-hidden="true" />
                  Dogovorite uvodni razgovor
                </a>
              </Button>
              <Button asChild variant="outline" className="home-outline-button">
                <a
                  href={PRACTICAL_BITCOIN_STANDARD_URL}
                  data-link="bitcoin-money-guides"
                >
                  <BookOpen className="size-4" aria-hidden="true" />
                  Pregledajte vodiče
                </a>
              </Button>
            </div>
          </div>

          <div
            className="topic-hero__image"
            role="img"
            aria-label="Mediteranska kamena scena s Bitcoinom kao novcem, bilježnicom i pogledom na more"
          />
        </section>

        <section className="topic-section budget-outcomes-section">
          <h2>Što uređujete kada Bitcoin postane novac</h2>
          <div className="budget-outcomes-grid">
            {outcomes.map(({ iconSrc, title }) => (
              <article className="budget-outcome-card" key={title}>
                <StoneSymbol
                  imageSrc={iconSrc}
                  className="stone-symbol--small topic-outcome-stone-symbol"
                />
                <h3>{title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="topic-section budget-split-section bitcoin-money-split">
          <article>
            <h2>Bitcoin nije samo još jedna investicija.</h2>
            <h3>Ako Bitcoin gledate kao ulaganje</h3>
            <ul className="budget-check-list">
              {investmentView.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article>
            <h2>Bolji okvir mijenja pitanje.</h2>
            <h3>Ako Bitcoin gledate kao novac</h3>
            <ul className="budget-check-list">
              {moneyView.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="topic-section budget-guides-section">
          <h2>Vodiči iz ovog dijela</h2>
          <div className="budget-guides-grid bitcoin-money-guides-grid">
            {bitcoinMoneyGuides.map((guide) => {
              const cover = resolveGuideCover(guide)

              return (
                <article
                  className="budget-guide-card bitcoin-money-guide-card"
                  key={guide.slug}
                >
                  <picture className="topic-guide-cover" aria-hidden="true">
                    {cover.webpSrc ? (
                      <source srcSet={cover.webpSrc} type="image/webp" />
                    ) : null}
                    <img
                      src={cover.src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: cover.position }}
                    />
                  </picture>
                  <div>
                    <h3>{guide.title}</h3>
                    <p>{guide.excerpt}</p>
                    <Button
                      asChild
                      variant="outline"
                      className="home-outline-button"
                    >
                      <a
                        href={guideHref(guide.slug)}
                        data-link="bitcoin-money-guide-card"
                      >
                        Pročitaj vodič
                      </a>
                    </Button>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="budget-principle-strip bitcoin-money-principle-strip">
          <div className="budget-principle-strip__mark">
            <img src="/bitcoin-logo.png" alt="" aria-hidden="true" />
          </div>
          <div className="budget-principle-strip__copy">
            <h2>Bitcoin može biti primarni novac.</h2>
            <p>Ali bolji novac traži bolja pravila.</p>
          </div>
          <ul>
            {principles.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>
        </section>

        <section className="budget-book-panel">
          <picture>
            <source
              srcSet="/images/bitcoin-kao-novac-cover.webp"
              type="image/webp"
            />
            <img
              src="/images/bitcoin-kao-novac-cover.jpg"
              alt="Cover knjige Bitcoin kao novac"
              width="1024"
              height="1535"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <div>
            <p className="topic-eyebrow">KNJIGA U NASTAJANJU</p>
            <h2>Bitcoin kao novac — knjiga u nastajanju</h2>
            <p>
              Ovi vodiči dio su sustava iz knjige “Bitcoin kao novac”. Knjiga
              povezuje bezvremenske principe novca s praktičnim koracima za
              svakodnevni život.
            </p>
            <div className="budget-book-panel__actions">
              <Button asChild className="cta-primary home-primary-button">
                <a href="/#knjiga" data-link="bitcoin-money-book-section">
                  Saznajte više o knjizi
                </a>
              </Button>
              <Button asChild variant="outline" className="home-outline-button">
                <a href={CONVERSATION_PATH} data-cta="bitcoin-money-book-call">
                  Dogovorite razgovor
                </a>
              </Button>
            </div>
          </div>
        </section>
        <StandardCheckCta dataCta="bitcoin-money-standard-check" />
      </div>
    </>
  )
}
