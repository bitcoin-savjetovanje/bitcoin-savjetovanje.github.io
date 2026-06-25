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
import { budgetRoute } from "@/content/clientRoutes"
import { findGuide, guideHref } from "@/content/guides"
import {
  CONVERSATION_PATH,
  PRACTICAL_BITCOIN_STANDARD_URL,
} from "@/content/site"

const budgetOutcomes = [
  {
    iconSrc: "/images/stone-symbols/svakoj-jedinici-novca-dati-namjenu.webp",
    title: "Svakoj jedinici novca dati namjenu",
  },
  {
    iconSrc: "/images/stone-symbols/vidjeti-stvarno-stanje-bez-osudivanja.webp",
    title: "Vidjeti stvarno stanje bez osuđivanja",
  },
  {
    iconSrc: "/images/stone-symbols/prepoznati-stvarni-visak.webp",
    title: "Prepoznati stvarni višak",
  },
  {
    iconSrc:
      "/images/stone-symbols/uciniti-oportunitetni-trosak-vidljivim.webp",
    title: "Učiniti oportunitetni trošak vidljivim",
  },
  {
    iconSrc: "/images/stone-symbols/uskladivati-odluke-kroz-vrijeme.webp",
    title: "Usklađivati odluke kroz vrijeme",
  },
  {
    iconSrc: "/images/stone-symbols/proracun-za-pojedinca-obitelj-posao.webp",
    title: "Proračun za pojedinca, obitelj i posao",
  },
]

const clarityItems = [
  "Jasna slika — točno znate kamo novac ide i gdje curi.",
  "Bolje odluke — kad je novac svrstan, odluke su lakše, a ne teže.",
  "Više slobode — plan donosi prostor za ono što vam je stvarno važno.",
  "Otpornost — dobar proračun stvara mir u neizvjesnim vremenima.",
]

const audienceItems = [
  {
    Icon: User,
    text: "Pojedincima koji žele prekinuti kaos u financijama.",
  },
  {
    Icon: Users,
    text: "Obiteljima koje žele zajednički plan i manje nesuglasica.",
  },
  {
    Icon: Briefcase,
    text: "Poduzetnicima koji žele jasniji pregled i bolji tijek gotovine.",
  },
  {
    Icon: Users,
    text: "Onima koji već imaju Bitcoin, ali još nemaju sustav donošenja odluka.",
  },
]

const guideCards = [
  {
    slug: "svaki-euro-ima-namjenu",
    title: "Proračun nije kazna, nego jasnoća",
    copy: "Zašto proračun donosi slobodu umjesto ograničenja i kako promijeniti način na koji gledate na novac.",
  },
  {
    slug: "svaki-euro-ima-namjenu",
    title: "Svakoj jedinici novca dati namjenu",
    copy: "Praktičan postupak kako rasporediti prihod i svakom euru dati svrhu.",
  },
  {
    slug: "stvarni-visak",
    title: "Stvarni višak nije ono što ostane na računu",
    copy: "Kako prepoznati višak nakon planiranja i usmjeriti ga prema onome što vam je važno.",
  },
]

const budgetPrinciples = [
  "Red u novcu stvara mir.",
  "Mir u odlukama donosi slobodu.",
  "Sloboda omogućuje dugoročnu izgradnju.",
]

export function Budget() {
  return (
    <>
      <Seo {...budgetRoute} />

      <div className="topic-page budget-page">
        <TopicHero
          className="budget-hero-v2"
          theme="budget"
          eyebrow="DIO I · BEZVREMENSKI RED U NOVCU"
          title="Proračun"
          lead="Novac ne nestaje. Samo odlazi na mjesta kojima nismo dali prioritet."
          body="Proračun nije odricanje. To je alat jasnoće koji vam pokazuje gdje vaš novac trenutno ide, što vam je stvarno važno i kako odluke uskladiti s vašim ciljevima — danas i kroz vrijeme. Proračun nije ograničenje. Proračun je pogled."
          image={{
            webpSrc: "/images/proracun-hero-20260521.webp",
            src: "/images/proracun-hero-20260521.jpg",
            alt: "Mediteranska radna scena s proračunom, bilježnicom i pogledom na more",
            width: 1672,
            height: 941,
            objectPosition: "70% 52%",
          }}
          actions={[
            {
              label: "Dogovorite uvodni razgovor",
              href: CONVERSATION_PATH,
              dataCta: "budget-intro-call",
              icon: <CalendarDays className="size-4" aria-hidden="true" />,
            },
            {
              label: "Pregledajte vodiče",
              href: PRACTICAL_BITCOIN_STANDARD_URL,
              dataLink: "budget-guides",
              icon: <BookOpen className="size-4" aria-hidden="true" />,
              variant: "secondary",
            },
          ]}
        />

        <section className="topic-section budget-outcomes-section">
          <h2>Što uređujete kroz proračun</h2>
          <div className="budget-outcomes-grid">
            {budgetOutcomes.map(({ iconSrc, title }) => (
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
              Proračun nije ograničenje,
              <br />
              nego jasnoća
            </h2>
            <ul className="budget-check-list">
              {clarityItems.map((item) => (
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
                        data-link="budget-guide-card"
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

        <section className="budget-principle-strip">
          <div className="budget-principle-strip__mark">
            <img src="/bitcoin-logo.png" alt="" aria-hidden="true" />
          </div>
          <div className="budget-principle-strip__copy">
            <h2>Proračun je prvi korak.</h2>
            <p>Bitcoin ne uklanja potrebu za redom — pojačava je.</p>
          </div>
          <ul>
            {budgetPrinciples.map((principle) => (
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
                <a href="/#knjiga" data-link="budget-book-section">
                  Saznajte više o knjizi
                </a>
              </Button>
              <Button asChild variant="outline" className="home-outline-button">
                <a href={CONVERSATION_PATH} data-cta="budget-book-call">
                  Dogovorite razgovor
                </a>
              </Button>
            </div>
          </div>
        </section>
        <StandardCheckCta dataCta="budget-standard-check" />
      </div>
    </>
  )
}
