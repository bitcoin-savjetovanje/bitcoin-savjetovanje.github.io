import {
  BookOpen,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Shield,
  User,
  Users,
} from "lucide-react"

import { Seo } from "@/components/Seo"
import { StoneSymbol } from "@/components/home/StoneSymbol"
import { StandardCheckCta } from "@/components/topic/StandardCheckCta"
import { TopicHero } from "@/components/topic/TopicHero"
import { Button } from "@/components/ui/button"
import { custodySecurityRoute } from "@/content/routes"
import {
  CONVERSATION_PATH,
  PRACTICAL_BITCOIN_STANDARD_URL,
} from "@/content/site"

type CustodyOutcome = {
  iconSrc: string
  title: string
  copy: string
}

const custodyOutcomes: CustodyOutcome[] = [
  {
    iconSrc: "/images/medallions/15-sigurnost-i-nasljedivanje.png",
    title: "Vi ste banka",
    copy: "Vi kontrolirate svoje privatne ključeve i odluke.",
  },
  {
    iconSrc: "/images/medallions/27-obiteljski-trezor.png",
    title: "Slojevi zaštite",
    copy: "Koristite više slojeva da jedan propust ne znači gubitak.",
  },
  {
    iconSrc: "/images/medallions/15-sigurnost-i-nasljedivanje.png",
    title: "Smanjite rizik",
    copy: "Ne dijelite više informacija nego što je potrebno.",
  },
  {
    iconSrc: "/images/medallions/12-proracun-i-plan.png",
    title: "Planirajte unaprijed",
    copy: "Dobar plan danas sprječava paniku sutra.",
  },
  {
    iconSrc: "/images/medallions/27-obiteljski-trezor.png",
    title: "Uključite obitelj",
    copy: "Prave osobe trebaju znati prave stvari u pravo vrijeme.",
  },
  {
    iconSrc: "/images/medallions/25-ciklusi.png",
    title: "Redovito provjeravajte",
    copy: "Sigurnost je proces, ne jednokratna postavka.",
  },
]

const custodyItems = [
  {
    title: "Samo-kontrola donosi slobodu — ali i odgovornost.",
    copy: "Bez treće strane, vi ste potpuno odgovorni za sigurnost svoje imovine.",
  },
  {
    title:
      "Rizici su stvarni i raznoliki — krađa, malware, phishing, požar, poplava, kvar uređaja, zaborav, smrt.",
  },
  {
    title:
      "Pogreška je nepovratna — Bitcoin transakcije se ne mogu vratiti niti poništiti.",
  },
  {
    title: "Planirani sustav štiti vas i vaše",
    copy: "— posebno u teškim trenucima kada najviše treba jednostavnost.",
  },
]

const audienceItems = [
  {
    Icon: User,
    text: "Pojedincima koji žele sigurno čuvati Bitcoin dugoročno.",
  },
  {
    Icon: Users,
    text: "Obiteljima koje žele jasan plan nasljeđivanja.",
  },
  {
    Icon: Briefcase,
    text: "Poduzetnicima i timovima koji upravljaju Bitcoin trezorima.",
  },
  {
    Icon: Users,
    text: "Osobama koje žele reducirati rizik i mirno spavati.",
  },
]

const guideCards = [
  {
    title: "Slojevi skrbništva",
    copy: "Kako strukturirati Bitcoin imovinu u slojeve prema namjeni i riziku.",
    href: "/vodici/samostalna-pohrana-ili-skrbnik/",
    imagePosition: "20% 52%",
  },
  {
    title: "Backup i oporavak",
    copy: "Kako sigurno napraviti i pohraniti backup fraze te testirati oporavak.",
    href: "/vodici/sigurnost-ne-smije-ovisiti-samo-o-vama/",
    imagePosition: "74% 54%",
  },
  {
    title: "Plan nasljeđivanja",
    copy: "Korak po korak vodič za prijenos pristupa vašim nasljednicima.",
    href: "/vodici/obiteljski-pristup-bitcoinu/",
    imagePosition: "38% 62%",
  },
]

export function CustodySecurity() {
  return (
    <>
      <Seo
        title={custodySecurityRoute.title}
        description={custodySecurityRoute.description}
        canonical={custodySecurityRoute.canonical}
        ogType={custodySecurityRoute.ogType}
        schema={custodySecurityRoute.schema as object}
      />

      <div className="topic-page custody-security-page">
        <TopicHero
          className="custody-security-hero-v2"
          theme="security"
          eyebrow="DIO VII · SIGURNOST I NASLJEĐIVANJE"
          title="Bitcoin skrbništvo i sigurnost"
          lead="Ako samo vi znate pristupiti Bitcoinu, sustav još nije dovršen."
          body="Skrbništvo nije samo čuvanje privatnih ključeva — ono je sustav u kojem je vaša Bitcoin imovina sigurna od krađe, pogreške, požara, poplave, bolesti, zaborava i smrti."
          image={{
            webpSrc: "/images/skrbnistvo-sigurnost-hero-20260521.webp",
            src: "/images/skrbnistvo-sigurnost-hero-20260521.jpg",
            alt: "Mediteranska radna scena Bitcoin skrbništva sa sigurnosnim planom, kamenim sefom i ključevima",
            width: 1672,
            height: 941,
            objectPosition: "52% 52%",
          }}
          actions={[
            {
              label: "Dogovorite uvodni razgovor",
              href: CONVERSATION_PATH,
              dataCta: "custody-security-intro-call",
              icon: <CalendarDays className="size-4" aria-hidden="true" />,
            },
            {
              label: "Pregledajte vodiče",
              href: PRACTICAL_BITCOIN_STANDARD_URL,
              dataLink: "custody-security-guides",
              icon: <BookOpen className="size-4" aria-hidden="true" />,
              variant: "secondary",
            },
          ]}
        />

        <section className="topic-section budget-outcomes-section">
          <h2>Temeljna načela sigurnosti</h2>
          <div className="budget-outcomes-grid">
            {custodyOutcomes.map(({ iconSrc, title, copy }) => (
              <article
                className="budget-outcome-card custody-principle-card"
                key={title}
              >
                <StoneSymbol
                  imageSrc={iconSrc}
                  className="stone-symbol--small topic-outcome-stone-symbol"
                />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="topic-section budget-split-section">
          <article>
            <h2>Zašto je skrbništvo ključno?</h2>
            <ul className="budget-check-list custody-check-list">
              {custodyItems.map((item) => (
                <li key={item.title}>
                  <CheckCircle2 aria-hidden="true" />
                  <span>
                    <strong>{item.title}</strong>
                    {item.copy ? <> {item.copy}</> : null}
                  </span>
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
          <div className="budget-guides-grid custody-guides-grid">
            {guideCards.map((guide) => (
              <article className="budget-guide-card" key={guide.title}>
                <div
                  className="budget-guide-card__image custody-guide-card__image"
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
                    <a
                      href={guide.href}
                      data-link="custody-security-guide-card"
                    >
                      Pročitaj vodič
                    </a>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="custody-final-panel">
          <div className="custody-final-panel__icon" aria-hidden="true">
            <Shield />
          </div>
          <div>
            <h2>Vaša Bitcoin imovina nije samo za vas.</h2>
            <p>
              To je povjerenje koje treba zaštititi danas, da bi služilo u
              budućnosti.
            </p>
          </div>
          <Button asChild className="cta-primary home-primary-button">
            <a href={CONVERSATION_PATH} data-cta="custody-security-final-call">
              Dogovorite razgovor
            </a>
          </Button>
        </section>
        <StandardCheckCta dataCta="custody-security-standard-check" />
      </div>
    </>
  )
}
