import {
  ArrowRight,
  ArrowUpRight,
  Bitcoin,
  Check,
  ChevronDown,
  Euro,
  FileCheck2,
  HandCoins,
  Landmark,
  RefreshCcw,
} from "lucide-react"
import {
  useRef,
  type FocusEvent,
  type PointerEvent,
  type SyntheticEvent,
} from "react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { bitcoinMoneyRoute } from "@/content/clientRoutes"
import { findGuide, guideHref, type Guide } from "@/content/guides"
import {
  BITCOIN_CONSULTATION_PATH,
  BITCOIN_STANDARD_CHECK_PATH,
  CONVERSATION_PATH,
  NET_WORTH_PATH,
  OPEN_MANUSCRIPT_URL,
  PERSONAL_BITCOIN_STANDARD_PATH,
  SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH,
} from "@/content/site"
import { trackFirstPartyInteraction } from "@/lib/ctaEvents"

const primaryMoneyFunctions = [
  {
    number: "01",
    title: "Mjera",
    copy: "Trošak promatrate kao količinu Bitcoina ili satoshija koju zahtijeva.",
  },
  {
    number: "02",
    title: "Saldo",
    copy: "Prihod nakon primitka ulazi u primarni Bitcoin saldo.",
  },
  {
    number: "03",
    title: "Proračun",
    copy: "Svaki dio novca dobiva namjenu prije potrošnje.",
  },
  {
    number: "04",
    title: "Potrošnja",
    copy: "Bitcoin se koristi za stvarni život, izravno ili preko operativnih eura.",
  },
] as const

const assetView = [
  "prihod dolazi i ostaje u eurima",
  "Bitcoin se kupuje iz ostatka",
  "uspjeh se mjeri uglavnom u eurima",
  "trošenje Bitcoina doživljava se kao neuspjeh",
  "svaka promjena cijene otvara pitanje kupnje ili prodaje",
  "svakodnevni život ostaje potpuno europski",
  "Bitcoin je dodatak postojećem sustavu",
] as const

const primaryMoneyView = [
  "prihod prema pravilu prelazi u Bitcoin",
  "proračun određuje namjene",
  "euri ostaju samo operativno",
  "Bitcoin se normalno troši",
  "dug, davanje i druga imovina ulaze u istu sliku",
  "pravila vrijede pri rastu i pri padu cijene",
  "euro služi kao platni most, ne kao glavni dugoročni saldo",
] as const

const fullStandardItems = [
  "osobni prihod prelazi u Bitcoin",
  "Bitcoin je glavni novčani saldo",
  "proračun se vodi iz Bitcoin pozicije",
  "u eurima se drži samo ono što je potrebno za bliska plaćanja",
  "stvarni život financira se iz Bitcoina",
  "dug ima jasan plan uklanjanja",
  "sustav ima pisana pravila i datum revizije",
] as const

const transitionItems = [
  "uvođenje proračuna nulte osnove",
  "popis i redoslijed duga",
  "smanjenje dugoročnog europskog salda",
  "postupno povećavanje udjela prihoda koji prelazi u Bitcoin",
  "uređivanje sigurnosti",
  "uključivanje partnera ili obitelji",
  "određivanje ciljnog datuma ili uvjeta završetka prijelaza",
] as const

const monthlyFlow = [
  {
    title: "Osobni prihod stigne",
    copy: "Plaća, isplata vlasniku ili drugi osobni prihod ulazi u novčani sustav. Poslovni novac koji još pripada pravnoj osobi ostaje odvojen.",
  },
  {
    title: "Prihod prelazi u Bitcoin",
    copy: "Prema unaprijed određenom pravilu, odmah ili kroz jasno definiran prijelazni plan.",
  },
  {
    title: "Proračun određuje namjene",
    copy: "Bliska plaćanja, redovita potrošnja, dug, davanje, veći budući troškovi i kapitalne odluke dobivaju mjesto.",
  },
  {
    title: "Održavaju se operativni euri",
    copy: "U eurima se drži iznos potreban za plaćanja koja dospijevaju uskoro, a ne zaseban dugoročni europski novčani fond.",
  },
  {
    title: "Život se financira iz salda",
    copy: "Bitcoin se izravno troši gdje je praktično ili se prema potrebi razmjenjuje u eure.",
  },
  {
    title: "Sustav se ponovno provjerava",
    copy: "Pravila se pregledavaju pri promjeni prihoda, duga, obiteljskih okolnosti, velikih troškova, imovine ili sigurnosti.",
  },
] as const

const roles = [
  {
    Icon: Bitcoin,
    title: "Novac",
    copy: "Ono iz čega mjerite, planirate i financirate život. U ovom okviru: Bitcoin.",
    examples: ["primarni Bitcoin saldo", "buduća razmjena"],
  },
  {
    Icon: HandCoins,
    title: "Potrošnja",
    copy: "Dobra i usluge koje koristite i trošite.",
    examples: [
      "stanovanje i hrana",
      "prijevoz i zdravlje",
      "obrazovanje i slobodno vrijeme",
    ],
  },
  {
    Icon: Landmark,
    title: "Kapital",
    copy: "Imovina koja može proizvoditi, služiti poslovnoj svrsi ili stvarati buduću vrijednost.",
    examples: ["posao", "produktivna nekretnina", "oprema"],
  },
] as const

const exampleFlow = [
  "Osobni prihod stigne na europski račun.",
  "Prihod prema njezinu unaprijed zapisanom pravilu prelazi u Bitcoin.",
  "Proračun nulte osnove određuje namjene za troškove, dug, davanje i buduća plaćanja.",
  "Iznos za račune koji dospijevaju uskoro prelazi u operativne eure.",
  "Najam, režije, hrana i prijevoz plaćaju se uobičajenim platnim kanalima.",
  "Dug i davanje provode se prema pravilima, ne prema onome što slučajno ostane.",
  "Preostali Bitcoin nije investicijski ostatak, nego primarni saldo za buduće namjene.",
] as const

const writtenRuleGroups = [
  {
    title: "Prihod",
    items: [
      "što se događa kada prihod stigne",
      "postoji li prijelazni plan",
      "kada se pravilo ponovno provjerava",
    ],
  },
  {
    title: "Operativni euri",
    items: [
      "koja plaćanja moraju biti pokrivena",
      "za koje vremensko razdoblje",
      "kada se saldo dopunjava",
    ],
  },
  {
    title: "Redovita potrošnja",
    items: [
      "kako se financira svakodnevni život",
      "koje su proračunske kategorije",
      "kako se postupa pri većem odstupanju",
    ],
  },
  {
    title: "Dug",
    items: [
      "svaki dug je negativni dio bilance i zahtjev na budući prihod",
      "kojim redoslijedom se uklanja",
      "što može promijeniti plan",
      "kako izgleda cilj bilance bez duga",
    ],
  },
  {
    title: "Davanje",
    items: ["odabrano pravilo", "način provedbe", "datum revizije"],
  },
  {
    title: "Veliki troškovi",
    items: [
      "tko sudjeluje u odluci",
      "kada se trošak unaprijed financira",
      "utjecaj na cijelu neto imovinu",
    ],
  },
  {
    title: "Sigurnost i kontinuitet",
    items: [
      "tko zna prvi korak",
      "što se dokumentira, a što nikada ne zapisuje",
      "kada se sustav testira",
    ],
  },
] as const

const stressScenarios = [
  {
    title: "Velik pad cijene",
    items: [
      "postoji li proračun za redoviti život",
      "počinje li se panično mijenjati cijeli sustav",
      "diktira li dug ponašanje",
      "postoji li previsoka razina bliskih obveza",
    ],
  },
  {
    title: "Nagli rast cijene",
    items: [
      "povećava li se potrošnja bez pravila",
      "nastaje li euforija",
      "ima li smisla unaprijed financirati poznati trošak",
      "mijenja li se stvarna okolnost ili samo cijena",
    ],
  },
  {
    title: "Pad prihoda",
    items: [
      "kako se prilagođava proračun",
      "koji troškovi prvi padaju",
      "kako se nastavlja razduživanje",
      "kako se prilagođavaju operativni euri i davanje",
    ],
  },
  {
    title: "Veliki trošak",
    items: [
      "kako se odlučuje o nekretnini, automobilu, zdravlju ili obrazovanju",
      "kako trošak utječe na cijelu neto imovinu",
      "treba li se dio unaprijed financirati",
      "tko mora sudjelovati u odluci",
    ],
  },
] as const

const sampleDocumentPages = [
  {
    title: "Jedna stranica glavnih pravila",
    description:
      "Primarni novac, operativni euri, prihod, potrošnja, dug, davanje i datum revizije na jednoj operativnoj stranici.",
    image: "/images/sample-standard/ogledni-standard-v1.webp",
    alt: "Petnaesta stranica izmišljenog oglednog osobnog Bitcoin standarda s pravilima za primarni novac, proračun, dug, davanje, prihod, trošenje, imovinu, sigurnost i reviziju.",
    href: "/downloads/sample-osobni-bitcoin-standard.pdf#page=16",
    page: "15",
  },
  {
    title: "Tok provedbe",
    description:
      "Prvi korak, redoslijed, rok, odgovornost i dokaz provedbe raspoređeni kroz prvih 30, 60 i 90 dana.",
    image: "/images/sample-standard/ogledni-standard-plan-90-dana.webp",
    alt: "Četrnaesta stranica izmišljenog oglednog osobnog Bitcoin standarda s planom provedbe za prvih 30, 60 i 90 dana.",
    href: "/downloads/sample-osobni-bitcoin-standard.pdf#page=15",
    page: "14",
  },
  {
    title: "Stres-test",
    description:
      "Pad i rast cijene, promjena prihoda, veliki trošak i nedostupnost glavne osobe dobivaju unaprijed provjerene odgovore.",
    image: "/images/sample-standard/ogledni-standard-stres-test.webp",
    alt: "Trinaesta stranica izmišljenog oglednog osobnog Bitcoin standarda sa stres-testovima cijene, prihoda, velikog troška i kontinuiteta.",
    href: "/downloads/sample-osobni-bitcoin-standard.pdf#page=14",
    page: "13",
  },
] as const

const guideSlugs = [
  "bitcoin-kao-novac",
  "bitcoin-nije-kripto-portfelj",
  "pozitivni-neto-priljev",
] as const

const bitcoinMoneyGuides = guideSlugs
  .map((slug) => findGuide(slug))
  .filter((guide): guide is Guide => Boolean(guide))

const nextSteps = [
  {
    eyebrow: "Još ne znate gdje nema jasnog pravila",
    title: "Besplatna provjera Bitcoin standarda",
    copy: "Deset pitanja pokazuje prvo područje koje treba urediti. Provjera traje oko tri minute, ne traži e-adresu i odgovore drži samo u radnoj memoriji otvorene stranice.",
    facts: ["10 pitanja", "oko 3 minute", "bez e-adrese"],
    label: "Napravite besplatnu provjeru",
    href: BITCOIN_STANDARD_CHECK_PATH,
    dataCta: "bitcoin-money-final-standard-check",
    featured: true,
  },
  {
    eyebrow: "Imate jedno konkretno pitanje",
    title: "Bitcoin konzultacija",
    copy: "Za operativne eure, veliki trošak, dug u prijelazu, razgovor s partnerom ili početak prijelaza bez neodređenog DCA plana.",
    facts: ["60 minuta", "200 €", "priprema", "pisani sažetak"],
    label: "Pogledajte Bitcoin konzultaciju",
    href: BITCOIN_CONSULTATION_PATH,
    dataLink: "bitcoin-money-consultation",
  },
  {
    eyebrow: "Trebate povezati cijeli sustav",
    title: "Osobni Bitcoin standard",
    copy: "Za situacije koje povezuju prihod, proračun, dug, davanje, Bitcoin kao novac, neto imovinu, vrijeme, sigurnost i obitelj.",
    facts: ["4–6 tjedana", "1.500 €", "pisani standard", "provedba i revizija"],
    label: "Pogledajte Osobni Bitcoin standard",
    href: PERSONAL_BITCOIN_STANDARD_PATH,
    dataLink: "bitcoin-money-personal-standard",
  },
] as const

function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
}: {
  id?: string
  eyebrow?: string
  title: string
  lead?: string
}) {
  return (
    <div className="bitcoin-money-section-heading">
      {eyebrow ? <p className="bitcoin-money-eyebrow">{eyebrow}</p> : null}
      <h2 id={id}>{title}</h2>
      {lead ? <p>{lead}</p> : null}
    </div>
  )
}

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="bitcoin-money-check-list">
      {items.map((item) => (
        <li key={item}>
          <Check aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function BitcoinMoney() {
  const trackedInteractions = useRef(new Set<string>())

  function trackOnce(id: string) {
    if (trackedInteractions.current.has(id)) {
      return
    }

    trackedInteractions.current.add(id)
    trackFirstPartyInteraction(id)
  }

  function trackPointer(id: string, event: PointerEvent<HTMLElement>) {
    void event
    trackOnce(id)
  }

  function trackFocus(id: string, event: FocusEvent<HTMLElement>) {
    if (event.currentTarget.contains(event.target)) {
      trackOnce(id)
    }
  }

  function trackExample(event: SyntheticEvent<HTMLDetailsElement>) {
    if (event.currentTarget.open) {
      trackOnce("bitcoin-money-example-open")
    }
  }

  return (
    <>
      <Seo {...bitcoinMoneyRoute} />

      <article className="bitcoin-money-page">
        <header className="bitcoin-money-hero">
          <div className="bitcoin-money-shell bitcoin-money-hero__copy">
            <p className="bitcoin-money-eyebrow">DIO IV · PRIMARNI NOVAC</p>
            <h1>Bitcoin kao primarni novac mijenja odakle donosite odluke.</h1>
            <p className="bitcoin-money-hero__lead">
              U punom Bitcoin standardu osobni prihod po primitku prelazi u
              Bitcoin. Euri ostaju samo kao operativni saldo za bliska plaćanja,
              a proračun, potrošnja i neto imovina polaze iz primarnog Bitcoin
              salda.
            </p>

            <p className="bitcoin-money-hero__flow-line">
              <span>prihod</span>
              <ArrowRight aria-hidden="true" />
              <span>Bitcoin saldo</span>
              <ArrowRight aria-hidden="true" />
              <span>proračun</span>
              <ArrowRight aria-hidden="true" />
              <span>operativni euri</span>
              <ArrowRight aria-hidden="true" />
              <span>stvarni život</span>
            </p>

            <div className="bitcoin-money-hero__actions">
              <Button
                asChild
                size="lg"
                className="bitcoin-money-primary-button"
              >
                <a
                  href="#mjesecni-tok"
                  data-cta="bitcoin-money-monthly-flow-anchor"
                >
                  Pogledajte kako to izgleda u praksi
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
              <a
                className="bitcoin-money-text-link"
                href={BITCOIN_STANDARD_CHECK_PATH}
                data-link="bitcoin-money-hero-standard-check"
              >
                Provjerite svoj Bitcoin standard
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>

            <p className="bitcoin-money-hero__clarification">
              To ne znači da svaki račun mora biti plaćen izravno Bitcoinom.
              Znači da Bitcoin predstavlja glavni novčani saldo iz kojeg se euri
              pribavljaju kada su potrebni za plaćanje.
            </p>
          </div>

          <figure className="bitcoin-money-shell bitcoin-money-hero-visual">
            <img
              src="/images/bitcoin-primary-money-flow-hero-20260724.webp"
              alt="Mediteranski urednički prikaz toka od prihoda, preko primarnog Bitcoin salda i proračunskih namjena, do malog operativnog salda i svakodnevnih troškova."
              width="1731"
              height="909"
              loading="eager"
              decoding="async"
            />
            <figcaption>
              <ol aria-label="Tok primarnog novca">
                <li>
                  <span>01</span>
                  <strong>Prihod</strong>
                </li>
                <li>
                  <span>02</span>
                  <strong>Primarni Bitcoin saldo</strong>
                </li>
                <li>
                  <span>03</span>
                  <strong>Proračunske namjene</strong>
                </li>
                <li>
                  <span>04</span>
                  <strong>Operativni euri</strong>
                </li>
                <li>
                  <span>05</span>
                  <strong>Stvarni život</strong>
                </li>
              </ol>
            </figcaption>
          </figure>
        </header>

        <section
          className="bitcoin-money-section bitcoin-money-definition"
          aria-labelledby="primarni-novac-title"
          onPointerDown={(event) =>
            trackPointer("bitcoin-money-definition-engaged", event)
          }
          onFocusCapture={(event) =>
            trackFocus("bitcoin-money-definition-engaged", event)
          }
        >
          <div className="bitcoin-money-shell">
            <SectionHeading
              id="primarni-novac-title"
              eyebrow="DEFINICIJA"
              title="Primarni novac je saldo iz kojeg planirate, mjerite i trošite"
              lead="Primarni novac nije samo imovina koju smatrate najvrjednijom. To je novčani saldo iz kojeg određujete namjenu prihoda, financirate troškove, procjenjujete dug i mjerite odnos prema drugoj imovini."
            />

            <div className="bitcoin-money-functions">
              {primaryMoneyFunctions.map((item) => (
                <article key={item.title}>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>

            <blockquote className="bitcoin-money-callout">
              Obveza može glasiti u eurima, a odluka se svejedno može donositi
              iz Bitcoin salda.
            </blockquote>
          </div>
        </section>

        <section
          className="bitcoin-money-section bitcoin-money-comparison"
          aria-labelledby="comparison-title"
          onPointerDown={(event) =>
            trackPointer("bitcoin-money-comparison-engaged", event)
          }
          onFocusCapture={(event) =>
            trackFocus("bitcoin-money-comparison-engaged", event)
          }
        >
          <div className="bitcoin-money-shell">
            <SectionHeading
              id="comparison-title"
              title="Držati Bitcoin i živjeti iz Bitcoin pozicije nisu ista stvar"
              lead="Bitcoin može imati investicijsku vrijednost, ali njegova primarna uloga u ovom sustavu jest novac. Razlika se vidi u ponašanju i novčanom toku."
            />

            <div className="bitcoin-money-comparison__grid">
              <article>
                <p className="bitcoin-money-card-label">Izdvojena imovina</p>
                <h3>Bitcoin stoji uz europski novčani sustav</h3>
                <CheckList items={assetView} />
              </article>
              <article className="bitcoin-money-comparison__primary">
                <p className="bitcoin-money-card-label">Primarni novac</p>
                <h3>Život i odluke polaze iz Bitcoin salda</h3>
                <CheckList items={primaryMoneyView} />
              </article>
            </div>

            <blockquote className="bitcoin-money-callout">
              Bitcoin kao primarni novac nije dodatak europskom sustavu. To je
              promjena početne novčane pozicije.
            </blockquote>
          </div>
        </section>

        <section
          className="bitcoin-money-section bitcoin-money-transition"
          aria-labelledby="transition-title"
          onPointerDown={(event) =>
            trackPointer("bitcoin-money-transition-engaged", event)
          }
          onFocusCapture={(event) =>
            trackFocus("bitcoin-money-transition-engaged", event)
          }
        >
          <div className="bitcoin-money-shell">
            <SectionHeading
              id="transition-title"
              eyebrow="CILJ I PUT"
              title="Konačni standard može biti jasan i kada prijelaz traje"
            />

            <div className="bitcoin-money-transition__grid">
              <article>
                <span className="bitcoin-money-transition__icon">
                  <FileCheck2 aria-hidden="true" />
                </span>
                <p className="bitcoin-money-card-label">Konačni sustav</p>
                <h3>Puni Bitcoin standard</h3>
                <CheckList items={fullStandardItems} />
              </article>
              <article>
                <span className="bitcoin-money-transition__icon">
                  <RefreshCcw aria-hidden="true" />
                </span>
                <p className="bitcoin-money-card-label">Privremeni proces</p>
                <h3>Prijelazni plan</h3>
                <CheckList items={transitionItems} />
              </article>
            </div>

            <p className="bitcoin-money-transition__note">
              Prijelaz nije trajno opravdanje da euro ostane primarni novac.
              Njegova je svrha sigurno i jasno dovršiti promjenu sustava.
              Redoslijed i rok ovise o stvarnim okolnostima, ali cilj, razlog,
              mjerila napretka i uvjet završetka moraju biti jasni.
            </p>
          </div>
        </section>

        <section
          className="bitcoin-money-section bitcoin-money-monthly"
          id="mjesecni-tok"
          aria-labelledby="monthly-flow-title"
          onPointerDown={(event) =>
            trackPointer("bitcoin-money-monthly-flow-engaged", event)
          }
          onFocusCapture={(event) =>
            trackFocus("bitcoin-money-monthly-flow-engaged", event)
          }
        >
          <div className="bitcoin-money-shell">
            <SectionHeading
              id="monthly-flow-title"
              eyebrow="U PRAKSI"
              title="Kako izgleda jedan mjesečni tok novca?"
              lead="Puni standard nije jednokratna kupnja. To je ponavljajući tok u kojem prihod dobiva namjenu, život se financira, a pravila se ponovno provjeravaju."
            />

            <ol className="bitcoin-money-monthly__flow">
              {monthlyFlow.map((step, index) => (
                <li key={step.title}>
                  <span className="bitcoin-money-monthly__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </li>
              ))}
            </ol>

            <blockquote className="bitcoin-money-callout bitcoin-money-callout--dark">
              Trošenje Bitcoina nije izlazak iz Bitcoin standarda. To je
              normalna uporaba primarnog novca u ponavljajućem toku prihoda,
              namjene, potrošnje i revizije.
            </blockquote>
          </div>
        </section>

        <section className="bitcoin-money-section bitcoin-money-denomination">
          <div className="bitcoin-money-shell bitcoin-money-denomination__grid">
            <div>
              <SectionHeading title="Europski račun i Bitcoin odluka mogu postojati istodobno" />
              <ul className="bitcoin-money-editorial-list">
                <li>Račun može glasiti u eurima.</li>
                <li>
                  Proračunska kategorija može se promatrati u satoshijima.
                </li>
                <li>
                  Trošak se može mjeriti prema dijelu Bitcoin salda koji
                  zahtijeva.
                </li>
                <li>Euro se pribavlja kada se približi plaćanje.</li>
                <li>
                  Dugoročni trend može dati vremenski kontekst, ali ne izdaje
                  nalog.
                </li>
                <li>Konačna odluka polazi iz stvarne životne potrebe.</li>
              </ul>
            </div>

            <aside className="bitcoin-money-rent-example">
              <span>
                <Euro aria-hidden="true" />
              </span>
              <p className="bitcoin-money-card-label">Primjer odluke</p>
              <blockquote>
                Ako mjesečni najam glasi 800 €, pitanje nije samo „imam li 800
                €?”. Pitanje je koliki dio primarnog Bitcoin salda taj trošak
                zahtijeva, je li predviđen proračunom i kada se potreban iznos
                pretvara u eure.
              </blockquote>
            </aside>
          </div>

          <div className="bitcoin-money-shell">
            <p className="bitcoin-money-plain-note">
              Voditi financije u Bitcoinu ne znači ignorirati ugovore, poreze,
              cijene ili račune izražene u eurima. Znači da euro više nije
              glavni saldo iz kojeg mjerite vlastiti novac. Ova stranica ne daje
              porezne upute.
            </p>
          </div>
        </section>

        <section
          className="bitcoin-money-section bitcoin-money-roles"
          id="novac-potrosnja-kapital"
          aria-labelledby="roles-title"
          onPointerDown={(event) =>
            trackPointer("bitcoin-money-roles-engaged", event)
          }
          onFocusCapture={(event) =>
            trackFocus("bitcoin-money-roles-engaged", event)
          }
        >
          <div className="bitcoin-money-shell">
            <SectionHeading
              id="roles-title"
              eyebrow="NETO IMOVINA"
              title="Bitcoin kao primarni novac ne znači da sva imovina mora biti Bitcoin"
            />

            <div className="bitcoin-money-roles__grid">
              {roles.map(({ Icon, title, copy, examples }) => (
                <article key={title}>
                  <Icon aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <ul>
                    {examples.map((example) => (
                      <li key={example}>{example}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="bitcoin-money-roles__footer">
              <p>
                Nekretnina, posao ili druga kapitalna imovina ne postaju novac
                samo zato što imaju tržišnu vrijednost.
              </p>
              <a
                href={NET_WORTH_PATH}
                className="bitcoin-money-text-link"
                data-link="bitcoin-money-net-worth"
              >
                Pogledajte Bitcoin i neto imovinu
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="bitcoin-money-section bitcoin-money-example">
          <div className="bitcoin-money-shell">
            <SectionHeading
              eyebrow="KONKRETAN PRIMJER"
              title="Plaću prima u eurima, ali novčani sustav vodi iz Bitcoina"
              lead="Sljedeći prikaz je potpuno izmišljen. Pokazuje oblik toka, ne iznos ili pravilo koje bi odgovaralo svakoj osobi."
            />

            <details onToggle={trackExample}>
              <summary>
                <span>
                  <strong>IZMIŠLJENI OGLEDNI PRIMJER</strong>
                  <span>
                    Ana prima plaću u eurima, ima redovite račune, dug, davanje
                    i većinu troškova plaća karticom.
                  </span>
                </span>
                <span className="bitcoin-money-example__summary-icon">
                  <ChevronDown aria-hidden="true" />
                </span>
              </summary>

              <div className="bitcoin-money-example__body">
                <ol>
                  {exampleFlow.map((step, index) => (
                    <li key={step}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>

                <aside>
                  <p className="bitcoin-money-card-label">
                    Veliki budući trošak
                  </p>
                  <p>
                    Godišnje osiguranje koje dospijeva za šest mjeseci dobiva
                    proračunsku namjenu u Bitcoinu. Potreban iznos u eure se
                    pretvara tek kada se približi plaćanje ili kada pisano
                    pravilo to nalaže.
                  </p>
                </aside>
              </div>
            </details>
          </div>
        </section>

        <section className="bitcoin-money-section bitcoin-money-rules">
          <div className="bitcoin-money-shell">
            <SectionHeading
              eyebrow="PISANI SUSTAV"
              title="Primarni novac bez pisanih pravila lako ponovno postaje samo pozicija"
              lead="Svako pravilo mora biti dovoljno jasno da ga možete provesti, objasniti drugoj relevantnoj osobi i ponovno provjeriti na dogovoreni datum."
            />

            <div className="bitcoin-money-rules__grid">
              {writtenRuleGroups.map((group, index) => (
                <article key={group.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{group.title}</h3>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            <a
              className="bitcoin-money-inline-card-link"
              href={SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH}
              data-link="bitcoin-money-written-rules-sample"
            >
              <FileCheck2 aria-hidden="true" />
              <span>
                <strong>
                  Pogledajte kako ta pravila izgledaju kada su zapisana
                </strong>
                <span>Otvorite izmišljeni ogledni osobni Bitcoin standard</span>
              </span>
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="bitcoin-money-section bitcoin-money-stress">
          <div className="bitcoin-money-shell">
            <SectionHeading
              eyebrow="PROVJERA SUSTAVA"
              title="Vrijedi li sustav kada se promijene cijena i životne okolnosti?"
              lead="Stres-test ne pokušava predvidjeti budućnost. Provjerava hoće li pravila ostati razumljiva kada se promijene uvjeti."
            />

            <div className="bitcoin-money-stress__grid">
              {stressScenarios.map((scenario, index) => (
                <article key={scenario.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{scenario.title}</h3>
                  <ul>
                    {scenario.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <blockquote className="bitcoin-money-callout">
              Bitcoin kao primarni novac nije sustav za izbjegavanje
              volatilnosti. To je sustav za donošenje razumljivih odluka unatoč
              volatilnosti.
            </blockquote>
          </div>
        </section>

        <section className="bitcoin-money-section bitcoin-money-result">
          <div className="bitcoin-money-shell">
            <SectionHeading
              eyebrow="OGLEDNI REZULTAT"
              title="Primarni Bitcoin saldo postaje stvaran tek kada odluke postanu provjerljiva pravila"
              lead="Ovo su stvarne stranice izmišljenog oglednog dokumenta. Klikom se otvara cijeli PDF na odgovarajućoj stranici."
            />

            <div className="bitcoin-money-result__pages">
              {sampleDocumentPages.map((page) => (
                <figure key={page.title}>
                  <a
                    href={page.href}
                    target="_blank"
                    rel="noreferrer"
                    data-link="bitcoin-money-sample-document"
                    aria-label={`Otvorite cijeli ogledni dokument na stranici ${page.page}: ${page.title}`}
                  >
                    <img
                      src={page.image}
                      alt={page.alt}
                      width="1191"
                      height="1684"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                  <figcaption>
                    <span>Stranica {page.page}</span>
                    <h3>{page.title}</h3>
                    <p>{page.description}</p>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="bitcoin-money-result__footer">
              <p>
                Ogledni dokument pokazuje oblik rezultata, ne univerzalne
                zaključke za svaku osobu.
              </p>
              <a
                className="bitcoin-money-text-link"
                href={SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH}
                data-link="bitcoin-money-sample-standard-page"
              >
                Pogledajte izmišljeni ogledni osobni Bitcoin standard
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="bitcoin-money-section bitcoin-money-guides">
          <div className="bitcoin-money-shell">
            <SectionHeading
              eyebrow="POVEZANI VODIČI"
              title="Tri objašnjenja za dublji nastavak"
            />

            <div className="bitcoin-money-guides__list">
              {bitcoinMoneyGuides.map((guide, index) => (
                <a
                  href={guideHref(guide.slug)}
                  key={guide.slug}
                  data-link={`bitcoin-money-guide-${guide.slug}`}
                >
                  <span className="bitcoin-money-guides__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="bitcoin-money-guides__copy">
                    <strong>{guide.title}</strong>
                    <span>{guide.excerpt}</span>
                  </span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bitcoin-money-section bitcoin-money-book">
          <div className="bitcoin-money-shell bitcoin-money-book__panel">
            <picture>
              <source
                srcSet="/images/bitcoin-kao-novac-cover.webp"
                type="image/webp"
              />
              <img
                src="/images/bitcoin-kao-novac-cover.jpg"
                alt="Naslovnica knjige u nastajanju Bitcoin kao novac."
                width="1024"
                height="1535"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div>
              <p className="bitcoin-money-eyebrow">KNJIGA U NASTAJANJU</p>
              <h2>Ovo je središnja teza knjige Bitcoin kao novac</h2>
              <p>
                Knjiga povezuje proračun, dug, davanje, Bitcoin kao primarni
                novac, neto imovinu, vrijeme i sigurnost u jedan praktičan
                okvir.
              </p>
              <a
                className="bitcoin-money-text-link"
                href={OPEN_MANUSCRIPT_URL}
                target="_blank"
                rel="noreferrer"
                data-link="bitcoin-money-book"
              >
                Pogledajte knjigu u nastajanju
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="bitcoin-money-section bitcoin-money-next">
          <div className="bitcoin-money-shell">
            <SectionHeading
              eyebrow="SLJEDEĆI KORAK"
              title="Razumjeti načelo nije isto što i primijeniti ga na vlastiti život"
              lead="Odaberite najmanji oblik pomoći koji odgovara pitanju koje je pred vama."
            />

            <div className="bitcoin-money-next__grid">
              {nextSteps.map((step) => (
                <article
                  key={step.title}
                  className={
                    "featured" in step && step.featured
                      ? "bitcoin-money-next__featured"
                      : undefined
                  }
                >
                  <p className="bitcoin-money-card-label">{step.eyebrow}</p>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                  <ul aria-label={`Sažetak: ${step.title}`}>
                    {step.facts.map((fact) => (
                      <li key={fact}>{fact}</li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant={
                      "featured" in step && step.featured
                        ? "default"
                        : "outline"
                    }
                    className={
                      "featured" in step && step.featured
                        ? "bitcoin-money-primary-button"
                        : "bitcoin-money-outline-button"
                    }
                  >
                    <a
                      href={step.href}
                      {...("dataCta" in step
                        ? { "data-cta": step.dataCta }
                        : { "data-link": step.dataLink })}
                    >
                      {step.label}
                      <ArrowRight aria-hidden="true" />
                    </a>
                  </Button>
                </article>
              ))}
            </div>

            <p className="bitcoin-money-next__note">
              Ne morate unaprijed znati koji vam oblik rada treba. Besplatna
              provjera ili{" "}
              <a
                href={`${CONVERSATION_PATH}?tema=bitcoin-kao-novac`}
                data-link="bitcoin-money-intro-conversation"
              >
                uvodni razgovor
              </a>{" "}
              služe upravo tome.
            </p>
          </div>
        </section>
      </article>
    </>
  )
}
