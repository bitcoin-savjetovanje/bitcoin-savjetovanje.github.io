import { ArrowUpRight, CalendarDays, Check, FileText, X } from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { personalBitcoinStandardRoute } from "@/content/clientRoutes"
import {
  CONVERSATION_PATH,
  SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH,
} from "@/content/site"

const serviceVisualsPath = "/images/service-visuals"

const programSteps = [
  {
    area: "budget",
    title: "Novac, obveze i stvarni višak",
    copy: "Prvo vidimo što novac već radi i koji je novac stvarno slobodan nakon obveza, budućih troškova i sigurnosne pričuve.",
    image: `${serviceVisualsPath}/standard-process-money-obligations.webp`,
  },
  {
    area: "debt",
    title: "Dug i davanje",
    copy: "Dug pokazuje koji je dio budućnosti već obećan, a davanje pomaže da novac ne postane samo obrana od straha.",
    image: `${serviceVisualsPath}/standard-process-debt-giving.webp`,
  },
  {
    area: "bitcoin",
    title: "Bitcoin kao novac",
    copy: "Bitcoin ne promatramo samo kao ulaganje. Gledamo u kojem obliku držite novčani saldo nakon što ste ga zaradili i kako Bitcoin ulazi u stvarne odluke.",
    image: `${serviceVisualsPath}/standard-process-bitcoin-money.webp`,
  },
  {
    area: "worth",
    title: "Neto imovina, vrijeme i volatilnost",
    copy: "Neto imovinu gledamo kao cjelinu, a rast, padove i cikluse pretvaramo u pravila umjesto u paniku ili euforiju.",
    image: `${serviceVisualsPath}/standard-process-net-worth-volatility.webp`,
  },
  {
    area: "security",
    title: "Sigurnost, obitelj i nasljeđivanje",
    copy: "Sigurnost nije uređaj, nego sustav. Dobar sustav otežava krađu, ali ne smije toliko otežati pristup da vi, obitelj ili ovlaštene osobe izgubite mogućnost oporavka.",
    image: `${serviceVisualsPath}/standard-process-security-family.webp`,
  },
]

const outcomeItems = [
  "pravila za državni novac i Bitcoin",
  "pravila za proračun, dug i davanje",
  "okvir za neto imovinu i veće odluke",
  "pravila za volatilnost i vrijeme",
  "sigurnosna i obiteljska pravila",
  "poslovni sloj ako je primjenjivo",
]

const standardLayers = [
  {
    title: "Privatni i obiteljski sloj",
    copy: "Pravila za državni novac, Bitcoin saldo, dug, davanje, veće kupnje i obiteljske upute.",
    image: `${serviceVisualsPath}/standard-layer-private-family.webp`,
  },
  {
    title: "Poslovni sloj, ako je primjenjivo",
    copy: "Razdvajanje privatnog i poslovnog Bitcoina, operativni fiat sloj i višak poslovne riznice.",
    image: `${serviceVisualsPath}/standard-layer-business.webp`,
  },
  {
    title: "Sigurnosni sloj",
    copy: "Što se nikada ne dijeli, gdje počinje oporavak i tko zna prvi korak.",
    image: `${serviceVisualsPath}/standard-layer-security.webp`,
  },
] as const

const businessLayerItems = [
  {
    title: "Razdvajanje privatnog i poslovnog Bitcoina",
    copy: "Cilj je da privatni i poslovni Bitcoin ne budu pomiješani.",
  },
  {
    title: "Operativni fiat sloj",
    copy: "Porezi, plaće, najam i dobavljači trebaju jasna kratkoročna pravila.",
  },
  {
    title: "Višak poslovne riznice",
    copy: "Tek novac koji nije potreban za bliske obveze može dobiti drugačija Bitcoin pravila.",
  },
  {
    title: "Dug, oprema, zalihe i rast",
    copy: "Bitcoin okvir ne smije biti izgovor za neurednu operativnu disciplinu.",
  },
  {
    title: "Ovlaštene osobe i oporavak",
    copy: "Tvrtka treba znati što se događa ako vlasnik, direktor ili tehnička osoba nije dostupna.",
  },
]

const deliverableSections = [
  {
    title: "I. Privatni i obiteljski sloj",
    items: [
      "pravilo za državni novac",
      "pravilo za Bitcoin saldo",
      "pravilo za dug",
      "pravilo za veće kupnje",
      "obiteljske upute",
    ],
  },
  {
    title: "II. Poslovni sloj, ako je primjenjivo",
    items: [
      "razdvajanje privatnog i poslovnog Bitcoina",
      "fiat sloj za poreze, plaće i dobavljače",
      "pravilo za višak poslovne riznice",
      "ovlaštene osobe i odobravanje transakcija",
    ],
  },
  {
    title: "III. Sigurnosni sloj",
    items: [
      "što se nikada ne dijeli",
      "gdje počinje plan oporavka",
      "tko zna prvi korak",
      "godišnja provjera",
    ],
  },
]

const notItems = [
  "nije investicijski savjet",
  "nije porezni, pravni ili računovodstveni savjet",
  "nije prognoza cijene",
  "nije trading program",
  "nije upravljanje sredstvima",
  "nije preuzimanje skrbništva",
  "nije traženje seed phrase, privatnih ključeva ili pristupa novčaniku",
]

const programFaqs = [
  {
    question: "Moram li već imati Bitcoin?",
    answer:
      "Ne morate, ali razgovor mora biti povezan sa stvarnom odlukom. Program je najkorisniji kada Bitcoin već ima ili bi mogao imati važnu ulogu u vašem novčanom životu.",
  },
  {
    question: "Može li partner ili član obitelji sudjelovati?",
    answer:
      "Da. To je često korisno, posebno ako se pravila tiču zajedničkog proračuna, sigurnosti, obiteljskog pristupa ili nasljeđivanja.",
  },
  {
    question: "Je li ovo financijski plan?",
    answer:
      "Ne. Ovo je pisani okvir pravila i odluka. Ne dajem porezni, pravni ili licencirani investicijski savjet i ne donosim odluke umjesto vas.",
  },
  {
    question: "Hoćete li mi reći koliko Bitcoina kupiti?",
    answer:
      "Ne. Pomažem vam razumjeti proračun, dug, neto imovinu, sigurnost i posljedice odluka. Odluka ostaje vaša.",
  },
  {
    question: "Radimo li tehničko postavljanje novčanika?",
    answer:
      "U programu možemo razgovarati o sigurnosnoj strukturi i pravilima, ali ne tražim seed phrase, privatne ključeve, lozinke ni pristup uređajima ili novčaniku.",
  },
  {
    question: "Što ako nakon uvodnog razgovora program nema smisla?",
    answer:
      "Tada to otvoreno kažem. Uvodni razgovor služi kao filter i ne mora završiti plaćenim nastavkom.",
  },
  {
    question: "Mogu li prvo uzeti samo Bitcoin konzultaciju?",
    answer:
      "Da. Ako imate jedno ozbiljno pitanje, Bitcoin konzultacija može biti bolji prvi plaćeni korak od punog programa.",
  },
]

function DecorativeServiceImage({
  src,
  className = "",
}: {
  src: string
  className?: string
}) {
  return (
    <img
      className={`service-stone-image ${className}`}
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
    />
  )
}

function Checklist({
  items,
  kind = "positive",
  className = "",
}: {
  items: string[]
  kind?: "positive" | "negative"
  className?: string
}) {
  const Icon = kind === "positive" ? Check : X
  const iconClass = kind === "positive" ? "positive-icon" : "negative-icon"
  const listClass = [
    "service-checklist",
    kind === "negative" ? "service-checklist--negative" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <ul className={listClass}>
      {items.map((item) => (
        <li
          key={item}
          className={item.includes("seed phrase") ? "is-sensitive" : undefined}
        >
          <Icon className={`${iconClass} service-checklist__icon`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function PersonalBitcoinStandard() {
  return (
    <>
      <Seo
        title={personalBitcoinStandardRoute.title}
        description={personalBitcoinStandardRoute.description}
        canonical={personalBitcoinStandardRoute.canonical}
        ogType={personalBitcoinStandardRoute.ogType}
        schema={personalBitcoinStandardRoute.schema as object}
      />
      <article className="service-page service-page--standard">
        <header className="service-hero hero-section editorial-section">
          <div className="hero-shell">
            <div className="hero-copy service-hero__content">
              <p className="hero-eyebrow">Program</p>
              <h1 className="hero-title">Osobni Bitcoin standard</h1>
              <p className="hero-subtitle service-hero__lead">
                4–6 tjedana rada na pisanom sustavu odluka za život s Bitcoinom.
              </p>
              <p>
                Osobni Bitcoin standard nije samo posjedovanje Bitcoina. To je
                pisani okvir pravila za proračun, dug, davanje, Bitcoin kao
                novac, neto imovinu, volatilnost, sigurnost, obiteljski pristup
                i po potrebi poslovnu riznicu.
              </p>
              <p className="service-hero__note">
                Program se ne kupuje preko checkouta. Prvi korak je razgovor.
              </p>
              <div className="service-hero__actions">
                <Button asChild className="cta-primary home-primary-button">
                  <a
                    href={CONVERSATION_PATH}
                    className="justify-center text-center"
                    data-cta="personal-standard-hero-call"
                  >
                    <CalendarDays className="size-4" aria-hidden="true" />
                    Dogovorite razgovor
                  </a>
                </Button>
              </div>
            </div>

            <aside
              className="hero-image-frame service-hero__visual"
              aria-label="Vizual osobnog Bitcoin standarda"
            >
              <picture className="service-hero__picture">
                <source
                  srcSet={`${serviceVisualsPath}/standard-hero-20260601.webp`}
                  type="image/webp"
                />
                <img
                  className="service-hero__image"
                  src={`${serviceVisualsPath}/standard-hero-20260601.jpg`}
                  alt="Mediteranska scena s otvorenom knjigom osobnog Bitcoin standarda i simbolima za obitelj, sigurnost, imovinu i davanje."
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </picture>
            </aside>
          </div>
        </header>

        <div className="service-page__inner">
          <section className="service-section service-section--split service-written-standard">
            <div className="service-editorial-column">
              <p className="service-eyebrow">pisani okvir</p>
              <h2>Na kraju programa imate pisani osobni Bitcoin standard.</h2>
              <Checklist
                items={outcomeItems}
                className="service-checklist--two"
              />
            </div>
            <aside className="service-written-standard__visual">
              <p>pisani okvir</p>
              <DecorativeServiceImage
                className="service-written-standard__image"
                src={`${serviceVisualsPath}/standard-written-frame.webp`}
              />
            </aside>
          </section>

          <section className="service-section service-document-section">
            <div className="service-section__header">
              <p className="service-eyebrow">Pisani okvir</p>
              <h2>Kako izgleda pisani osobni Bitcoin standard?</h2>
              <p>
                Na kraju programa cilj nije imati još jednu bilješku iz
                razgovora, nego pisani okvir pravila koji možete ponovno
                otvoriti kada se promijene prihod, cijena, obiteljska situacija,
                poslovne obveze ili sigurnosne okolnosti.
              </p>
            </div>
            <div className="service-document-panel">
              <div className="service-document-panel__intro">
                <h3>Osobni Bitcoin standard</h3>
                <p>
                  Ovo je okvir pravila, ne financijski plan, porezni savjet,
                  pravni savjet, računovodstveni savjet ili nalog za
                  kupnju/prodaju.
                </p>
              </div>
              <div className="service-document-columns">
                {deliverableSections.map((section) => (
                  <section
                    key={section.title}
                    className="service-document-column"
                  >
                    <h3>{section.title}</h3>
                    <ul>
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </div>
          </section>

          <section className="service-section service-final-cta service-sample-standard-cta">
            <div
              className="service-sample-standard-cta__icon"
              aria-hidden="true"
            >
              <FileText />
            </div>
            <div>
              <h2>Ne kupujete samo razgovor. Dobivate pisani sustav odluka.</h2>
              <p>
                Program završava konkretnim dokumentom: vašim osobnim Bitcoin
                standardom. U njemu su zapisana pravila za novac, dug, davanje,
                Bitcoin, neto imovinu, volatilnost, sigurnost i obiteljski
                pristup. Ovdje možete pogledati ogledni primjer takvog
                dokumenta.
              </p>
            </div>
            <ul className="service-cta-list">
              <li>
                <Button asChild className="cta-primary home-primary-button">
                  <a
                    href={SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH}
                    data-cta="personal-standard-sample"
                  >
                    Preuzmite ogledni primjer
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </Button>
              </li>
            </ul>
          </section>

          <section className="service-section service-section--warm">
            <div className="service-section__header">
              <h2>Tri sloja standarda</h2>
            </div>
            <div className="service-card-grid">
              {standardLayers.map((layer) => (
                <article key={layer.title} className="service-card">
                  <DecorativeServiceImage
                    className="service-card__image"
                    src={layer.image}
                  />
                  <h3 className="service-card__title">{layer.title}</h3>
                  <p className="service-card__copy">{layer.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="service-section">
            <div className="service-section__header">
              <h2>Kako radimo kroz 4–6 tjedana</h2>
            </div>
            <div className="service-process-grid">
              {programSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="service-process-card"
                  data-area={step.area}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <DecorativeServiceImage
                    className="service-card__image"
                    src={step.image}
                  />
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="service-section service-section--split service-business-standard">
            <div className="service-editorial-column">
              <p className="service-eyebrow">Poslovni sloj</p>
              <h2>Ako vodite posao, standard ima i poslovni sloj</h2>
              <p>
                Kod poduzetnika Bitcoin odluka ne smije pomiješati privatni
                život, obiteljsku sigurnost i poslovnu riznicu.
              </p>
              <div className="service-business-list">
                {businessLayerItems.map((item, index) => (
                  <article key={item.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </article>
                ))}
              </div>
            </div>
            <aside className="service-business-standard__visual">
              <DecorativeServiceImage
                className="service-business-standard__image"
                src={`${serviceVisualsPath}/standard-business-treasury.webp`}
              />
            </aside>
          </section>

          <section className="service-section service-final-cta service-final-cta--pricing">
            <div>
              <h2>Cijena i ulaz</h2>
              <p>
                Program traje 4–6 tjedana i cijena je 1.500 EUR. Ne kreće se
                izravno preko checkouta. Prvi korak je 15-minutni uvodni
                razgovor u kojem vidimo ima li program smisla za vašu situaciju.
              </p>
            </div>
            <div
              className="service-pricing-summary"
              aria-label="Sažetak cijene"
            >
              <p>Program</p>
              <strong>1.500 EUR</strong>
              <span>4–6 tjedana</span>
              <em>Ne kupuje se odmah. Prvo vidimo ima li smisla.</em>
            </div>
            <ul className="service-cta-list">
              <li>
                <Button asChild className="cta-primary home-primary-button">
                  <a
                    href={CONVERSATION_PATH}
                    className="justify-center text-center"
                    data-cta="personal-standard-pricing-call"
                  >
                    <CalendarDays className="size-4" aria-hidden="true" />
                    Dogovorite uvodni razgovor
                  </a>
                </Button>
              </li>
            </ul>
          </section>

          <section className="service-section service-warning-panel">
            <h2>Ovo nije</h2>
            <Checklist items={notItems} kind="negative" />
          </section>

          <section className="service-section service-faq-section">
            <h2>Česta pitanja o programu</h2>
            <div className="service-faq-list">
              {programFaqs.map((faq) => (
                <details key={faq.question} className="faq-item">
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="service-section service-final-cta service-final-cta--quiet">
            <div>
              <h2>Želite vidjeti ima li program smisla za vas?</h2>
              <p>Prvi korak nije checkout, nego 15-minutni uvodni razgovor.</p>
            </div>
            <ul className="service-cta-list">
              <li>
                <Button asChild className="cta-primary home-primary-button">
                  <a
                    href={CONVERSATION_PATH}
                    className="justify-center text-center"
                    data-cta="personal-standard-final-call"
                  >
                    <CalendarDays className="size-4" aria-hidden="true" />
                    Dogovorite uvodni razgovor
                  </a>
                </Button>
              </li>
            </ul>
          </section>
        </div>
      </article>
    </>
  )
}
