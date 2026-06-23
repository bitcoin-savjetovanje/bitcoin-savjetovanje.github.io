import {
  BookOpen,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  User,
  Users,
} from "lucide-react"

import { Seo } from "@/components/Seo"
import { StoneSymbol } from "@/components/home/StoneSymbol"
import { StandardCheckCta } from "@/components/topic/StandardCheckCta"
import { TopicHero } from "@/components/topic/TopicHero"
import { Button } from "@/components/ui/button"
import { netWorthRoute } from "@/content/clientRoutes"
import {
  CONVERSATION_PATH,
  PRACTICAL_BITCOIN_STANDARD_URL,
} from "@/content/site"

type NetWorthOutcome = {
  iconSrc: string
  title: string
}

const netWorthOutcomes: NetWorthOutcome[] = [
  {
    iconSrc: "/images/stone-symbols/graditi-produktivnu-imovinu.webp",
    title: "Promatrati neto imovinu kao jednu cjelinu",
  },
  {
    iconSrc: "/images/stone-symbols/odrzavati-likvidnost-i-sigurnost.webp",
    title: "Primijeniti Pravilo trećina",
  },
  {
    iconSrc:
      "/images/stone-symbols/rebalansirati-prema-vrijednostima-i-ciljevima.webp",
    title: "Graditi produktivnu imovinu",
  },
  {
    iconSrc:
      "/images/stone-symbols/donositi-odluke-s-jasnocom-i-smirenoscu.webp",
    title: "Održavati likvidnost i sigurnost",
  },
  {
    iconSrc: "/images/stone-symbols/primijeniti-pravilo-trecina.webp",
    title: "Rebalansirati prema vrijednostima i ciljevima",
  },
  {
    iconSrc:
      "/images/stone-symbols/promatrati-neto-imovinu-kao-jednu-cjelinu.webp",
    title: "Donositi odluke s jasnoćom i smirenošću",
  },
]

const systemItems = [
  "Sve što posjedujete (imovina) minus sve što dugujete (obveze) čini vašu neto imovinu.",
  "Bitcoin je vaša temeljna novčana imovina — čvrst, neutralan, nepodložan inflaciji.",
  "Produktivna imovina stvara prihod i povećava vašu vrijednost kroz vrijeme.",
  "Likvidni novac daje vam fleksibilnost i smirenost za odluke.",
]

const audienceItems = [
  {
    Icon: User,
    text: "Pojedincima koji žele jasan okvir za upravljanje imovinom.",
  },
  {
    Icon: Users,
    text: "Obiteljima koje planiraju budućnost i žele zaštititi vrijednosti.",
  },
  {
    Icon: Briefcase,
    text: "Poduzetnicima koji žele ravnotežu između rasta i sigurnosti.",
  },
  {
    Icon: Users,
    text: "Onima koji žele Bitcoin koristiti kao temelj dugoročne financijske slobode.",
  },
]

const guideCards = [
  {
    title: "Neto imovina kao jedna cjelina",
    copy: "Kako promatrati cjelokupnu sliku i donositi bolje odluke za dugoročnu slobodu.",
    href: "/vodici/bitcoin-u-neto-imovini/",
    imagePosition: "7% 64%",
  },
  {
    title: "Pravilo trećina",
    copy: "Jednostavno pravilo za ravnotežu između Bitcoina, produktivne imovine i likvidnog novca.",
    href: "/vodici/pravilo-trecina/",
    imagePosition: "58% 43%",
  },
  {
    title: "Produktivna imovina",
    copy: "Što je to, kako je odabrati i kako je koristiti za izgradnju budućih prilika.",
    href: "/vodici/pozitivni-neto-priljev/",
    imagePosition: "47% 74%",
  },
]

const netWorthPrinciples = [
  "Jasan cilj vodi odluke.",
  "Diverzifikacija smanjuje rizik.",
  "Rebalansiranje čuva ravnotežu.",
  "Vrijednosti daju smjer.",
]

export function NetWorth() {
  return (
    <>
      <Seo {...netWorthRoute} />

      <div className="topic-page net-worth-page">
        <TopicHero
          className="net-worth-hero-v2"
          theme="worth"
          eyebrow="DIO V · BITCOIN I NETO IMOVINA"
          title="Bitcoin i neto imovina"
          lead="Bitcoin kao primarni novac. Neto imovina kao jedna cjelina."
          body="Uredite svoj financijski život s jasnim pravilima. Primijenite Pravilo trećina kako biste gradili, štitili i koristili svoju neto imovinu na zdrav i održiv način."
          image={{
            webpSrc: "/images/neto-imovina-hero-20260521.webp",
            src: "/images/neto-imovina-hero-20260521.jpg",
            alt: "Mediteranska radna scena s planom neto imovine, pravilom trećina i pogledom na more",
            width: 1672,
            height: 941,
            objectPosition: "56% 52%",
          }}
          actions={[
            {
              label: "Dogovorite uvodni razgovor",
              href: CONVERSATION_PATH,
              dataCta: "net-worth-intro-call",
              icon: <CalendarDays className="size-4" aria-hidden="true" />,
            },
            {
              label: "Pregledajte vodiče",
              href: PRACTICAL_BITCOIN_STANDARD_URL,
              dataLink: "net-worth-guides",
              icon: <BookOpen className="size-4" aria-hidden="true" />,
              variant: "secondary",
            },
          ]}
        />

        <section className="topic-section budget-outcomes-section">
          <h2>Što ćete urediti kroz Bitcoin i neto imovinu</h2>
          <div className="budget-outcomes-grid">
            {netWorthOutcomes.map(({ iconSrc, title }) => (
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
              Neto imovina nije skup računa,
              <br />
              nego jedan sustav
            </h2>
            <ul className="budget-check-list">
              {systemItems.map((item) => (
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
          <div className="budget-guides-grid net-worth-guides-grid">
            {guideCards.map((guide) => (
              <article className="budget-guide-card" key={guide.title}>
                <div
                  className="budget-guide-card__image net-worth-guide-card__image"
                  style={{ backgroundPosition: guide.imagePosition }}
                  aria-hidden="true"
                />
                <div>
                  <h3>{guide.title}</h3>
                  <p>{guide.copy}</p>
                  <Button
                    asChild
                    variant="outline"
                    className="home-outline-button"
                  >
                    <a href={guide.href} data-link="net-worth-guide-card">
                      Pročitaj vodič
                    </a>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="budget-principle-strip net-worth-principle-strip">
          <div className="budget-principle-strip__mark">
            <img src="/bitcoin-logo.png" alt="" aria-hidden="true" />
          </div>
          <div className="budget-principle-strip__copy">
            <h2>Bitcoin je prvi korak.</h2>
            <p>Neto imovina je put prema slobodi.</p>
          </div>
          <ul>
            {netWorthPrinciples.map((principle) => (
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
                <a href="/#knjiga" data-link="net-worth-book-section">
                  Saznajte više o knjizi
                </a>
              </Button>
              <Button asChild variant="outline" className="home-outline-button">
                <a href={CONVERSATION_PATH} data-cta="net-worth-book-call">
                  Dogovorite razgovor
                </a>
              </Button>
            </div>
          </div>
        </section>
        <StandardCheckCta dataCta="net-worth-standard-check" />
      </div>
    </>
  )
}
