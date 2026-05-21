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
import { TopicHero } from "@/components/topic/TopicHero"
import { Button } from "@/components/ui/button"
import { givingRoute } from "@/content/routes"
import {
  CONVERSATION_PATH,
  PRACTICAL_BITCOIN_STANDARD_URL,
} from "@/content/site"

type GivingOutcome = {
  iconSrc: string
  title: string
}

const givingOutcomes: GivingOutcome[] = [
  {
    iconSrc: "/images/medallions/04-davanje.png",
    title: "Davanje učiniti pravilom",
  },
  {
    iconSrc: "/images/medallions/19-duh-velikodusnosti.png",
    title: "Jačati zahvalnost i mir",
  },
  {
    iconSrc: "/images/medallions/06-cilj-i-akcija.png",
    title: "Širiti kapacitet za stvaranje",
  },
  {
    iconSrc: "/images/medallions/05-neto-imovina.png",
    title: "Vratiti novcu mjeru",
  },
  {
    iconSrc: "/images/medallions/26-mentorstvo.png",
    title: "Učiniti odnose vidljivima",
  },
  {
    iconSrc: "/images/medallions/27-obiteljski-trezor.png",
    title: "Davanje za pojedinca, obitelj i posao",
  },
]

const ruleItems = [
  "Više zahvalnosti — redovito davanje vraća pažnju na ono što već imate.",
  "Više mira — novac prestaje biti samo obrana od straha.",
  "Više širine — otvorena ruka širi kapacitet za stvaranje vrijednosti.",
  "Zdraviji odnos prema novcu — tvrdi novac, meko srce.",
]

const audienceItems = [
  {
    Icon: User,
    text: "Pojedincima koji žele uvesti davanje u svoj sustav odluka.",
  },
  {
    Icon: Users,
    text: "Obiteljima koje žele zajedno odrediti pravilo davanja.",
  },
  {
    Icon: Briefcase,
    text: "Poduzetnicima koji žele spojiti vrijednosti i novac.",
  },
  {
    Icon: Users,
    text: "Onima koji već imaju Bitcoin, ali žele urediti i odnos prema novcu.",
  },
]

const guideCards = [
  {
    title: "Davanje mijenja odnos prema novcu",
    copy: "Zašto tvrdi novac traži otvorenu ruku i kako davanje vraća mjeru novcu.",
    href: "/vodici/davanje-u-proracunu-nulte-osnove/",
    imagePosition: "48% 72%",
  },
  {
    title: "Što se smatra davanjem",
    copy: "Kako razlikovati spontanu pomoć od namjernog, uređenog davanja.",
    href: "/vodici/davanje-bez-duga/",
    imagePosition: "76% 70%",
  },
  {
    title: "Kako uvesti kategoriju Davanje",
    copy: "Praktičan korak kako davanje postaje dio proračuna i sustava.",
    href: "/vodici/novac-dolazi-od-ljudi/",
    imagePosition: "50% 62%",
  },
]

const givingPrinciples = [
  "Zahvalnost gradi mir.",
  "Otvorena ruka gradi odnose.",
  "Davanje vraća novcu mjeru.",
]

export function Giving() {
  return (
    <>
      <Seo
        title={givingRoute.title}
        description={givingRoute.description}
        canonical={givingRoute.canonical}
        ogType={givingRoute.ogType}
        schema={givingRoute.schema as object}
      />

      <div className="topic-page giving-page">
        <TopicHero
          className="giving-hero-v2"
          theme="giving"
          eyebrow="DIO III · OTVORENA RUKA U TVRDOM NOVCU"
          title="Davanje"
          lead="Davanje mijenja odnos prema novcu."
          body="Davanje nije višak nego pravilo. Redovito davanje vraća novcu mjeru, čovjeku mir, a odnosima širinu. Kada je davanje dio sustava, jačamo kapacitet za stvaranje vrijednosti. Tvrdi novac ne smije proizvesti tvrdo srce."
          image={{
            webpSrc: "/images/davanje-hero-20260521.webp",
            src: "/images/davanje-hero-20260521.jpg",
            alt: "Mediteranska radna scena s bilježnicom davanja, kamenim reljefom otvorene ruke i pogledom na more",
            width: 1672,
            height: 941,
            objectPosition: "54% 52%",
          }}
          actions={[
            {
              label: "Dogovorite uvodni razgovor",
              href: CONVERSATION_PATH,
              dataCta: "giving-intro-call",
              icon: <CalendarDays className="size-4" aria-hidden="true" />,
            },
            {
              label: "Pregledajte vodiče",
              href: PRACTICAL_BITCOIN_STANDARD_URL,
              dataLink: "giving-guides",
              icon: <BookOpen className="size-4" aria-hidden="true" />,
              variant: "secondary",
            },
          ]}
        />

        <section className="topic-section budget-outcomes-section">
          <h2>Što uređujete kroz davanje</h2>
          <div className="budget-outcomes-grid">
            {givingOutcomes.map(({ iconSrc, title }) => (
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
              Davanje nije višak,
              <br />
              nego pravilo
            </h2>
            <ul className="budget-check-list">
              {ruleItems.map((item) => (
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
                  className="budget-guide-card__image giving-guide-card__image"
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
                    <a href={guide.href} data-link="giving-guide-card">
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
            <h2>Davanje je dio reda.</h2>
            <p>Bitcoin ne uklanja potrebu za davanjem — pojačava je.</p>
          </div>
          <ul>
            {givingPrinciples.map((principle) => (
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
                <a href="/#knjiga" data-link="giving-book-section">
                  Saznajte više o knjizi
                </a>
              </Button>
              <Button asChild variant="outline" className="home-outline-button">
                <a href={CONVERSATION_PATH} data-cta="giving-book-call">
                  Dogovorite razgovor
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
