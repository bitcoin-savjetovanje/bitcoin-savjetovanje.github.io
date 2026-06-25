import {
  BookOpen,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  User,
  Users,
} from "lucide-react"

import { Seo } from "@/components/Seo"
import { GuideCardCover } from "@/components/guides/GuideCardCover"
import { StoneSymbol } from "@/components/home/StoneSymbol"
import { StandardCheckCta } from "@/components/topic/StandardCheckCta"
import { TopicHero } from "@/components/topic/TopicHero"
import { Button } from "@/components/ui/button"
import { timeVolatilityRoute } from "@/content/clientRoutes"
import { findGuide, guideHref } from "@/content/guides"
import {
  CONVERSATION_PATH,
  PRACTICAL_BITCOIN_STANDARD_URL,
} from "@/content/site"

type TimeVolatilityOutcome = {
  iconSrc: string
  title: string
}

const timeVolatilityOutcomes: TimeVolatilityOutcome[] = [
  {
    iconSrc: "/images/stone-symbols/razumjeti-dugorocni-trend.webp",
    title: "Razumjeti dugoročni trend",
  },
  {
    iconSrc: "/images/stone-symbols/odvojiti-trend-od-buke.webp",
    title: "Odvojiti trend od buke",
  },
  {
    iconSrc: "/images/stone-symbols/smanjiti-strah-i-euforiju.webp",
    title: "Smanjiti strah i euforiju",
  },
  {
    iconSrc: "/images/stone-symbols/uskladiti-odluke-kroz-cikluse.webp",
    title: "Uskladiti odluke kroz cikluse",
  },
  {
    iconSrc: "/images/stone-symbols/planirati-s-vremenskim-horizontom.webp",
    title: "Planirati s vremenskim horizontom",
  },
  {
    iconSrc: "/images/stone-symbols/koristiti-volatilnost-kao-okvir.webp",
    title: "Koristiti volatilnost kao okvir",
  },
]

const volatilityItems = [
  "Kratkoročna kretanja nisu isto što i dugoročni trend.",
  "Power Law nije obećanje, nego okvir za očekivanja.",
  "Pravila smanjuju impulzivne odluke i vraćaju mir.",
  "Vrijeme pretvara volatilnost u saveznika discipline.",
]

const audienceItems = [
  {
    Icon: User,
    text: "Pojedincima koji žele manje panike i više reda u odlukama.",
  },
  {
    Icon: Users,
    text: "Obiteljima koje dugoročno planiraju štednju i sigurnost.",
  },
  {
    Icon: Briefcase,
    text: "Poduzetnicima koji moraju uskladiti pričuvu, rizik i vrijeme.",
  },
  {
    Icon: Users,
    text: "Onima koji već imaju Bitcoin, ali još nemaju pravila kroz cikluse.",
  },
]

const guideCards = [
  {
    slug: "uskladivanje-kupovne-moci-bitcoina",
    title: "Zašto Bitcoin raste kroz vrijeme",
    copy: "Kako ograničena ponuda i vrijeme oblikuju dugoročni trend.",
  },
  {
    slug: "cijena-kao-mjera-vremena",
    title: "Power Law nije kristalna kugla",
    copy: "Kako koristiti model kao okvir, a ne kao obećanje.",
  },
  {
    slug: "saylor-bitcoin-ciklus-ponuda-potraznja",
    title: "Saylor: ponuda, potražnja i Bitcoin ciklus",
    copy: "Zašto stari četverogodišnji obrazac nije dovoljan kada kapitalni tokovi postanu važniji.",
  },
  {
    slug: "dca-nije-dovoljan",
    title: "Kako koristiti volatilnost u svoju korist",
    copy: "Praktična pravila za ponašanje kroz rastove i padove.",
  },
]

const timeVolatilityPrinciples = [
  "Dugoročni trend daje okvir.",
  "Pravila smiruju odluke.",
  "Ciklusi traže disciplinu.",
  "Vrijeme pojačava jasnoću.",
]

export function TimeVolatility() {
  return (
    <>
      <Seo {...timeVolatilityRoute} />

      <div className="topic-page time-volatility-page">
        <TopicHero
          className="time-volatility-hero-v2"
          theme="time"
          eyebrow="DIO VI · BITCOIN VRIJEME I VOLATILNOST"
          title="Bitcoin, vrijeme i volatilnost"
          lead="Dugoročni trend daje okvir. Volatilnost traži pravila."
          body="Kada razumijete vrijeme, cikluse i volatilnost, Bitcoin prestaje biti izvor stalne napetosti. Dobivate mirniji okvir za odluke, realnija očekivanja i jasnija pravila za ponašanje kroz rastove i padove."
          image={{
            webpSrc: "/images/vrijeme-volatilnost-hero-20260521.webp",
            src: "/images/vrijeme-volatilnost-hero-20260521.jpg",
            alt: "Mediteranska radna scena s pravilima kroz cikluse, pješčanim satom i pogledom na more",
            width: 1672,
            height: 941,
            objectPosition: "52% 52%",
          }}
          actions={[
            {
              label: "Dogovorite uvodni razgovor",
              href: CONVERSATION_PATH,
              dataCta: "time-volatility-intro-call",
              icon: <CalendarDays className="size-4" aria-hidden="true" />,
            },
            {
              label: "Pregledajte vodiče",
              href: PRACTICAL_BITCOIN_STANDARD_URL,
              dataLink: "time-volatility-guides",
              icon: <BookOpen className="size-4" aria-hidden="true" />,
              variant: "secondary",
            },
          ]}
        />

        <section className="topic-section budget-outcomes-section">
          <h2>Što uređujete kroz vrijeme i volatilnost</h2>
          <div className="budget-outcomes-grid">
            {timeVolatilityOutcomes.map(({ iconSrc, title }) => (
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

        <section className="topic-section budget-split-section">
          <article>
            <h2>
              Volatilnost nije greška,
              <br />
              nego cijena rasta
            </h2>
            <ul className="budget-check-list">
              {volatilityItems.map((item) => (
                <li key={item}>
                  <CheckCircle2 aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article>
            <h2>Kome je ovo korisno</h2>
            <ul className="budget-audience-list">
              {audienceItems.map(({ Icon, text }) => (
                <li key={text}>
                  <Icon aria-hidden="true" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="topic-section budget-guides-section">
          <h2>Vodiči iz ovog dijela</h2>
          <div className="budget-guides-grid time-volatility-guides-grid">
            {guideCards.map((card) => {
              const guide = findGuide(card.slug)

              if (!guide) {
                return null
              }

              return (
                <article className="budget-guide-card" key={card.title}>
                  <GuideCardCover guide={guide} />
                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.copy}</p>
                    <Button
                      asChild
                      variant="outline"
                      className="home-outline-button"
                    >
                      <a
                        href={guideHref(guide.slug)}
                        data-link="time-volatility-guide-card"
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

        <section className="budget-principle-strip time-volatility-principle-strip">
          <div className="budget-principle-strip__mark">
            <img src="/bitcoin-logo.png" alt="" aria-hidden="true" />
          </div>
          <div className="budget-principle-strip__copy">
            <h2>Vrijeme je saveznik. Volatilnost je učitelj.</h2>
            <p>Bitcoin ne uklanja neizvjesnost — daje vam pravila za nju.</p>
          </div>
          <ul>
            {timeVolatilityPrinciples.map((principle) => (
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
                <a href="/#knjiga" data-link="time-volatility-book-section">
                  Saznajte više o knjizi
                </a>
              </Button>
              <Button asChild variant="outline" className="home-outline-button">
                <a
                  href={CONVERSATION_PATH}
                  data-cta="time-volatility-book-call"
                >
                  Dogovorite razgovor
                </a>
              </Button>
            </div>
          </div>
        </section>
        <StandardCheckCta dataCta="time-volatility-standard-check" />
      </div>
    </>
  )
}
