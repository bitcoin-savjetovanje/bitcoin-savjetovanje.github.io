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
import { debtRoute } from "@/content/clientRoutes"
import {
  CONVERSATION_PATH,
  PRACTICAL_BITCOIN_STANDARD_URL,
} from "@/content/site"

type DebtOutcome = {
  iconSrc: string
  title: string
}

const debtOutcomes: DebtOutcome[] = [
  {
    iconSrc: "/images/stone-symbols/popisati-sve-obveze.webp",
    title: "Popisati sve obveze",
  },
  {
    iconSrc: "/images/stone-symbols/vidjeti-stvarnu-cijenu-duga.webp",
    title: "Vidjeti stvarnu cijenu duga",
  },
  {
    iconSrc: "/images/stone-symbols/osloboditi-buduci-novac.webp",
    title: "Osloboditi budući novac",
  },
  {
    iconSrc: "/images/stone-symbols/vratiti-slobodu-odlucivanja.webp",
    title: "Vratiti slobodu odlučivanja",
  },
  {
    iconSrc: "/images/stone-symbols/smanjiti-stres-i-pritisak.webp",
    title: "Smanjiti stres i pritisak",
  },
  {
    iconSrc: "/images/stone-symbols/postaviti-temelj-za-bitcoin.webp",
    title: "Postaviti temelj za Bitcoin",
  },
]

const freedomItems = [
  "Manje stresa — kada dugovi više ne upravljaju vašim mislima.",
  "Više prostora — za ono što je važno vama i vašima.",
  "Bolje odluke — bez pritiska, iz jasnoće i mira.",
  "Čvršći temelj — za život koji gradite i za Bitcoin.",
]

const audienceItems = [
  {
    Icon: User,
    text: "Pojedincima koji žele prekinuti kaos u obvezama.",
  },
  {
    Icon: Users,
    text: "Obiteljima koje žele vratiti kontrolu nad novcem.",
  },
  {
    Icon: Briefcase,
    text: "Poduzetnicima koji žele jasniji tijek gotovine.",
  },
  {
    Icon: Users,
    text: "Onima koji već imaju Bitcoin, ali ih dug vraća unatrag.",
  },
]

const guideCards = [
  {
    title: "Dug je budući novac koji ste već potrošili",
    copy: "Zašto dug ograničava vaš život i kako ga pretvoriti u slobodu kroz jasne korake.",
    href: "/vodici/dug-je-buduci-novac/",
    imagePosition: "48% 72%",
  },
  {
    title: "Dug ili Bitcoin?",
    copy: "Kako odlučiti gdje ide vaš novac — otplata duga ili ulaganje u budućnost.",
    href: "/vodici/dug-ili-bitcoin/",
    imagePosition: "50% 58%",
  },
  {
    title: "Život bez duga",
    copy: "Praktičan pristup kako živjeti bez duga i izgraditi financijsku slobodu korak po korak.",
    href: "/vodici/ne-zaduzujte-se-za-bitcoin/",
    imagePosition: "18% 44%",
  },
]

const debtPrinciples = [
  "Manje tereta stvara mir.",
  "Više slobode donosi bolji fokus.",
  "Slobodan novac gradi budućnost.",
]

export function Debt() {
  return (
    <>
      <Seo {...debtRoute} />

      <div className="topic-page debt-page">
        <TopicHero
          className="debt-hero-v2"
          theme="debt"
          eyebrow="DIO II · OSLOBODITI BUDUĆNOST"
          title="Dug"
          lead="Dug je budući novac koji ste već potrošili."
          body="Razduživanje nije kazna, nego vraćanje slobode. Smanjivanjem duga vraćate prostor, mir i kapacitet za život koji gradite — i za Bitcoin."
          image={{
            webpSrc: "/images/dug-hero-20260521.webp",
            src: "/images/dug-hero-20260521.jpg",
            alt: "Mediteranska radna scena s planom izlaska iz duga, bilježnicom i otvorenim kamenim lancem",
            width: 1672,
            height: 941,
            objectPosition: "54% 52%",
          }}
          actions={[
            {
              label: "Dogovorite uvodni razgovor",
              href: CONVERSATION_PATH,
              dataCta: "debt-intro-call",
              icon: <CalendarDays className="size-4" aria-hidden="true" />,
            },
            {
              label: "Pregledajte vodiče",
              href: PRACTICAL_BITCOIN_STANDARD_URL,
              dataLink: "debt-guides",
              icon: <BookOpen className="size-4" aria-hidden="true" />,
              variant: "secondary",
            },
          ]}
        />

        <section className="topic-section budget-outcomes-section">
          <h2>Što uređujete kroz dug</h2>
          <div className="budget-outcomes-grid">
            {debtOutcomes.map(({ iconSrc, title }) => (
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
              Razduživanje nije kazna,
              <br />
              nego povratak slobode
            </h2>
            <p className="budget-split-intro">
              Dug nije samo kamata. Dug je budući novac koji više nije slobodan.
            </p>
            <ul className="budget-check-list">
              {freedomItems.map((item) => (
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
          <div className="budget-guides-grid">
            {guideCards.map((guide) => (
              <article className="budget-guide-card" key={guide.title}>
                <div
                  className="budget-guide-card__image debt-guide-card__image"
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
                    <a href={guide.href} data-link="debt-guide-card">
                      Pročitaj vodič
                    </a>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="budget-principle-strip">
          <div className="budget-principle-strip__mark">
            <img src="/bitcoin-logo.png" alt="" aria-hidden="true" />
          </div>
          <div className="budget-principle-strip__copy">
            <h2>Razduživanje je prvi korak.</h2>
            <p>Bitcoin ne uklanja potrebu za redom — pojačava je.</p>
          </div>
          <ul>
            {debtPrinciples.map((principle) => (
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
                <a href="/#knjiga" data-link="debt-book-section">
                  Saznajte više o knjizi
                </a>
              </Button>
              <Button asChild variant="outline" className="home-outline-button">
                <a href={CONVERSATION_PATH} data-cta="debt-book-call">
                  Dogovorite razgovor
                </a>
              </Button>
            </div>
          </div>
        </section>
        <StandardCheckCta dataCta="debt-standard-check" />
      </div>
    </>
  )
}
