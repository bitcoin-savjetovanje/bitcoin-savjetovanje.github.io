import { ArrowUpRight, CalendarDays, Check, X } from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { bitcoinConsultationRoute } from "@/content/clientRoutes"
import {
  BUSINESS_AUDIENCE_PATH,
  CONVERSATION_PATH,
  FAMILY_AUDIENCE_PATH,
  PERSONAL_BITCOIN_STANDARD_PATH,
  PERSONAL_AUDIENCE_PATH,
} from "@/content/site"

const serviceVisualsPath = "/images/service-visuals"

const forWhomItems = [
  "imate ozbiljno Bitcoin pitanje koje se stalno vraća",
  "razmišljate o većoj ulozi Bitcoina u svojoj imovini",
  "želite objasniti Bitcoin partneru ili obitelji",
  "vodite posao i želite razjasniti poslovnu riznicu ili kratkoročne obveze",
  "brine vas sigurnost",
  "ne znate kako dug, proračun ili buduća plaćanja utječu na odluku",
  "želite znati treba li vam cijeli osobni Bitcoin standard ili je dovoljan jedan razgovor",
]

const reviewItems = [
  "Bitcoin tezu na jeziku koji možete ponoviti drugima",
  "glavne nedoumice o cijeni, volatilnosti i riziku",
  "odnos duga, proračuna i stvarnog viška",
  "što je operativni novac, a što može biti višak poslovne riznice",
  "ulogu Bitcoina u neto imovini",
  "sigurnost i obiteljski pristup bez dijeljenja osjetljivih podataka",
  "sljedeći razuman korak",
]

const notDoingItems = [
  "nije investicijsko savjetovanje",
  "nema naloga kupnje ili prodaje",
  "ne govorim vam koliko Bitcoina kupiti",
  "ne upravljam vašim sredstvima",
  "ne tražim seed phrase, privatne ključeve, lozinke ili pristup novčaniku",
  "ne dajem porezni ni pravni savjet",
  "odluka ostaje vaša",
]

const outcomes = [
  "jasniju i čvršću Bitcoin tezu koju možete objasniti sebi, partneru, obitelji ili poslovnom partneru",
  "jasniji okvir za jednu odluku koju odgađate",
  "jasnu procjenu da jedno pitanje nije dovoljno i da treba graditi osobni Bitcoin standard",
]

const outcomeImages = [
  `${serviceVisualsPath}/consultation-outcome-thesis.webp`,
  `${serviceVisualsPath}/consultation-outcome-decision.webp`,
  `${serviceVisualsPath}/consultation-outcome-standard.webp`,
]

const consultationScopes = [
  {
    title: "Osobno",
    copy: "Jedna odluka oko Bitcoina, duga, proračuna, neto imovine ili veće kupnje.",
    href: PERSONAL_AUDIENCE_PATH,
    dataLink: "bitcoin-consultation-personal-audience",
    image: `${serviceVisualsPath}/consultation-scope-personal.webp`,
  },
  {
    title: "Obiteljski",
    copy: "Jedno pitanje koje treba objasniti partneru, obitelji ili osobi od povjerenja.",
    href: FAMILY_AUDIENCE_PATH,
    dataLink: "bitcoin-consultation-family-audience",
    image: `${serviceVisualsPath}/consultation-scope-family.webp`,
  },
  {
    title: "Poslovno",
    copy: "Jedna odluka oko poslovne riznice, viška novca, kratkoročnih obveza, sigurnosti ili razdvajanja privatnog i poslovnog Bitcoina.",
    href: BUSINESS_AUDIENCE_PATH,
    dataLink: "bitcoin-consultation-business-audience",
    image: `${serviceVisualsPath}/consultation-scope-business.webp`,
  },
]

const preparationItems = [
  "koju odluku pokušavate donijeti",
  "koja tri pitanja se stalno vraćaju",
  "postoji li dug, poslovna riznica, sigurnosna ili obiteljska tema",
  "što bi vam značilo da nakon razgovora bude jasnije",
]

const consultationFlow = [
  {
    title: "Prije razgovora",
    copy: "Ne šaljete seed phrase, privatne ključeve, lozinke ni dokumente. Dovoljno je zapisati jednu odluku i pitanja koja se stalno vraćaju.",
    image: `${serviceVisualsPath}/consultation-flow-before.webp`,
  },
  {
    title: "Tijekom razgovora",
    copy: "Razdvajamo Bitcoin tezu, osobnu situaciju, dug, proračun, sigurnost i obiteljski kontekst. Ne tražimo savršen odgovor, nego jasniju sliku.",
    image: `${serviceVisualsPath}/consultation-flow-during.webp`,
  },
  {
    title: "Nakon razgovora",
    copy: "Znate je li jedno pitanje dovoljno razjašnjeno ili ima smisla graditi osobni Bitcoin standard.",
    image: `${serviceVisualsPath}/consultation-flow-after.webp`,
  },
]

const exampleQuestions = [
  "Kako znati ima li Bitcoin preveliku ili premalu ulogu u mojoj imovini?",
  "Kako objasniti Bitcoin partneru bez pritiska i bez žargona?",
  "Što ako imam dug, a istovremeno ne želim izgubiti dugoročni Bitcoin pogled?",
  "Kako složiti sigurnost tako da obitelj ne ostane izgubljena?",
  "Kako razlikovati novac za poreze, plaće i dobavljače od viška poslovne riznice?",
]

const notForItems = [
  "tražite kratku uputu kada kupiti ili prodati",
  "želite prognozu cijene",
  "tražite upravljanje sredstvima",
  "tražite porezni ili pravni savjet",
  "želite da netko odluči umjesto vas",
  "želite nekome predati osjetljive sigurnosne podatke",
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
        <li key={item}>
          <Icon className={`${iconClass} service-checklist__icon`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function BitcoinConsultation() {
  return (
    <>
      <Seo {...bitcoinConsultationRoute} />
      <article className="service-page service-page--consultation">
        <header className="service-hero hero-section editorial-section">
          <div className="hero-shell">
            <div className="hero-copy service-hero__content">
              <p className="hero-eyebrow">Bitcoin konzultacija</p>
              <h1 className="hero-title">Bitcoin konzultacija</h1>
              <p className="hero-subtitle service-hero__lead">
                Jedan dubinski razgovor za jedno ozbiljno Bitcoin pitanje koje
                utječe na vašu osobnu, obiteljsku ili poslovnu odluku.
              </p>
              <p className="service-hero__note">
                Jedan dubinski razgovor, ali tek nakon uvodnog razgovora.
              </p>
              <div className="service-hero__actions">
                <Button asChild className="cta-primary home-primary-button">
                  <a
                    href={CONVERSATION_PATH}
                    className="justify-center text-center"
                    data-cta="bitcoin-consultation-intro-call"
                  >
                    <CalendarDays className="size-4" aria-hidden="true" />
                    Krenite od uvodnog razgovora
                  </a>
                </Button>
              </div>
            </div>

            <aside
              className="hero-image-frame service-hero__visual"
              aria-label="Bitcoin konzultacija"
            >
              <picture className="service-hero__picture">
                <source
                  srcSet={`${serviceVisualsPath}/consultation-hero-20260601.webp`}
                  type="image/webp"
                />
                <img
                  className="service-hero__image"
                  src={`${serviceVisualsPath}/consultation-hero-20260601.jpg`}
                  alt="Mediteranski stol s bilježnicom i karticama za Bitcoin konzultaciju."
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </picture>
            </aside>
          </div>
        </header>

        <div className="service-page__inner">
          <section className="service-section service-section--split">
            <div className="service-editorial-column">
              <h2>Što zapravo plaćate u Bitcoin konzultaciji?</h2>
              <div className="service-copy-stack">
                <p>
                  Ne plaćate pristup tajnoj informaciji. Većina osnovnih
                  informacija o Bitcoinu javno je dostupna. Plaćate skraćivanje
                  puta između pitanja i razumijevanja.
                </p>
                <p>
                  Razlika je u tome što javni materijal ne poznaje vašu
                  situaciju. Knjiga ne zna imate li dug. Podcast ne zna kako
                  vaša obitelj gleda na Bitcoin. Graf ne zna koliko državnog
                  novca trebate ostaviti za kratke potrebe. Forum ne zna jeste
                  li poduzetnik, zaposlenik, roditelj, vlasnik firme ili netko
                  tko prvi put pokušava urediti sigurnost i nasljeđivanje.
                </p>
                <p>
                  U razgovoru povezujemo Bitcoin tezu s vašim stvarnim životom:
                  proračunom, dugom, vremenom, sigurnošću, obitelji, neto
                  imovinom i odlukom koju pokušavate donijeti.
                </p>
                <p>
                  Možete sve istraživati sami. To je legitiman put. Ali nije
                  besplatan. Plaća se vremenom, pažnjom, šumom i mogućom
                  odgodom. Ako je vaše vrijeme vrijedno, dobar razgovor može
                  biti jeftiniji put do jasnije odluke.
                </p>
              </div>
              <div className="service-emphasis-card">
                Bitcoin je dovoljno široka tema da nitko ne mora znati sve.
                Važno je znati dovoljno za odluku koju stvarno trebate donijeti.
              </div>
            </div>

            <aside className="service-side-panel">
              <DecorativeServiceImage
                className="service-side-panel__image"
                src={`${serviceVisualsPath}/consultation-outcome-decision.webp`}
              />
              <ul className="service-side-list">
                <li>skraćivanje puta</li>
                <li>povezivanje s vašom situacijom</li>
                <li>jasnija odluka</li>
              </ul>
            </aside>
          </section>

          <section className="service-section service-section--warm">
            <div className="service-section__header">
              <h2>Konzultacija može biti osobna, obiteljska ili poslovna</h2>
            </div>
            <div className="service-card-grid">
              {consultationScopes.map((scope) => (
                <a
                  key={scope.title}
                  href={scope.href}
                  className="service-card service-card--link"
                  data-link={scope.dataLink}
                >
                  <DecorativeServiceImage
                    className="service-card__image"
                    src={scope.image}
                  />
                  <h3 className="service-card__title">{scope.title}</h3>
                  <p className="service-card__copy">{scope.copy}</p>
                </a>
              ))}
            </div>
          </section>

          <section className="service-section">
            <div className="service-section__header">
              <h2>
                Nakon Bitcoin konzultacije trebali biste imati jednu od tri
                stvari
              </h2>
            </div>
            <div className="service-number-grid">
              {outcomes.map((outcome, index) => (
                <article key={outcome} className="service-number-card">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <DecorativeServiceImage
                    className="service-card__image"
                    src={outcomeImages[index]}
                  />
                  <p>{outcome}</p>
                </article>
              ))}
            </div>
            <p className="service-section__support">
              Za vlasnika posla to može značiti jasnije pitanje: što pripada
              operativnim obvezama, a što je stvarno višak riznice?
            </p>
          </section>

          <section className="service-section">
            <div className="service-checklist-grid">
              <article className="service-checklist-panel">
                <h2>Za koga je</h2>
                <Checklist items={forWhomItems} />
              </article>

              <article className="service-checklist-panel">
                <h2>Što možemo proći</h2>
                <Checklist items={reviewItems} />
              </article>
            </div>
          </section>

          <section className="service-section service-quiet-panel">
            <div>
              <h2>Bitcoin, ne kripto portfelj</h2>
              <p>
                U konzultaciji možemo razjasniti zašto Bitcoin u ovom okviru
                tretiramo kao novac, a ostale kriptovalute kao rizične
                investicije koje bi se morale mjeriti u Bitcoinu. Ne savjetujem
                koje tokene kupiti, kada ući, kada izaći ni koliko držati.
              </p>
            </div>
            <DecorativeServiceImage
              className="service-quiet-panel__image"
              src={`${serviceVisualsPath}/consultation-outcome-standard.webp`}
            />
          </section>

          <section className="service-section service-warning-panel">
            <h2>Što ne radimo</h2>
            <p>
              Bitcoin konzultacija nije dobar izbor ako tražite kratku uputu
              kada kupiti ili prodati, prognozu cijene, upravljanje sredstvima,
              porezni ili pravni savjet, ili osobu koja će odlučiti umjesto vas.
            </p>
            <Checklist items={notDoingItems} kind="negative" />
          </section>

          <section className="service-section service-section--warm">
            <div className="service-section__header">
              <h2>Prije, tijekom i poslije razgovora</h2>
            </div>
            <div className="service-timeline">
              {consultationFlow.map((step, index) => (
                <article key={step.title} className="service-timeline-card">
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

          <section className="service-section service-question-panel">
            <h2>Dobra pitanja za Bitcoin konzultaciju</h2>
            <p>
              Najkorisnija pitanja nisu općenita. Dobra su ona koja mijenjaju
              stvarnu odluku, razgovor s obitelji ili sigurnosni okvir.
            </p>
            <ul className="service-question-list">
              {exampleQuestions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </section>

          <section className="service-section">
            <div className="service-end-grid">
              <article className="service-checklist-panel">
                <h2>Kako razgovor završava</h2>
                <p>
                  Na kraju ne dobivate savjet ‘kupi’ ili ‘prodaj’. Dobivate
                  jasniji okvir: što je pitanje, gdje je stvarni rizik, koje
                  osobne okolnosti mijenjaju odluku i koji bi sljedeći korak bio
                  razuman.
                </p>
              </article>

              <article className="service-checklist-panel">
                <h2>Što pripremiti</h2>
                <p>
                  Ne morate slati dokumente. Dovoljno je prije razgovora
                  zapisati:
                </p>
                <Checklist items={preparationItems} />
              </article>

              <article className="service-checklist-panel">
                <h2>Kada nije za vas</h2>
                <Checklist items={notForItems} kind="negative" />
              </article>

              <article className="service-checklist-panel">
                <h2>Kada je dovoljan jedan razgovor</h2>
                <p>
                  Jedan razgovor može biti dovoljan ako vam treba razjasniti
                  konkretno pitanje, jedan dio Bitcoin teze ili sigurnosnu
                  odluku. Ako se pokaže da jedno pitanje nije dovoljno, sljedeći
                  korak može biti{" "}
                  <a
                    href={PERSONAL_BITCOIN_STANDARD_PATH}
                    data-link="bitcoin-consultation-standard-context"
                  >
                    osobni Bitcoin standard
                  </a>
                  .
                </p>
              </article>
            </div>
          </section>

          <section className="service-section service-section--warm">
            <div className="service-comparison">
              <h2>Bitcoin konzultacija ili osobni Bitcoin standard?</h2>
              <div className="service-comparison__grid">
                <article>
                  <h3>Bitcoin konzultacija</h3>
                  <p>
                    Bitcoin konzultacija je za jedno ozbiljno pitanje, tezu ili
                    odluku koju želite razjasniti u jednom dubinskom razgovoru.
                  </p>
                </article>
                <article>
                  <h3>Osobni Bitcoin standard</h3>
                  <p>
                    Osobni Bitcoin standard je za pisani sustav pravila kroz 4–6
                    tjedana: proračun, dug, Bitcoin, neto imovina, sigurnost i
                    obitelj.
                  </p>
                  <a
                    href={PERSONAL_BITCOIN_STANDARD_PATH}
                    data-link="bitcoin-consultation-personal-standard"
                  >
                    Pogledajte osobni Bitcoin standard
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </article>
              </div>
              <ul className="service-comparison__notes">
                <li>Jedna odluka ili pitanje: Bitcoin konzultacija.</li>
                <li>
                  Jasnija Bitcoin teza za sebe ili partnera: Bitcoin
                  konzultacija.
                </li>
                <li>
                  Pisana pravila za cijeli sustav: Osobni Bitcoin standard.
                </li>
                <li>
                  Sigurnost i obiteljski pristup trebaju cijeli plan: Osobni
                  Bitcoin standard.
                </li>
              </ul>
            </div>
          </section>

          <section className="service-section service-final-cta">
            <div>
              <h2>Krenite od uvodnog razgovora</h2>
              <p>
                Uvodni razgovor služi tome da vidimo je li Bitcoin konzultacija
                pravi sljedeći korak ili je za sada dovoljno stati na kratkoj
                procjeni.
              </p>
              <p className="service-price-note">
                Bitcoin konzultacija je prvi plaćeni korak: 200 € za jedan
                dubinski razgovor. Ne kupuje se odmah. Prvo vidimo ima li
                smisla.
              </p>
            </div>
            <ul className="service-cta-list">
              <li>
                <Button
                  asChild
                  size="lg"
                  className="cta-primary home-primary-button"
                >
                  <a
                    href={CONVERSATION_PATH}
                    className="justify-center text-center"
                    data-cta="bitcoin-consultation-final-intro-call"
                  >
                    <CalendarDays className="size-4" aria-hidden="true" />
                    Krenite od uvodnog razgovora
                  </a>
                </Button>
              </li>
              <li>
                <a
                  href="/sigurnost/"
                  className="service-link-button"
                  data-cta="bitcoin-consultation-security"
                >
                  Pogledajte sigurnosna pravila
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
