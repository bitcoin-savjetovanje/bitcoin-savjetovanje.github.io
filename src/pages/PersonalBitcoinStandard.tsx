import { ArrowUpRight, CalendarDays, Check, FileText, X } from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { personalBitcoinStandardRoute } from "@/content/clientRoutes"
import { offerFacts } from "@/content/offers"
import {
  CONVERSATION_PATH,
  SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH,
} from "@/content/site"

const serviceVisualsPath = "/images/service-visuals"

const publicLimits = [
  "koje je vaše prvo stvarno usko grlo",
  "kojim redoslijedom rješavati dug, pričuvu, Bitcoin, potrošnju i proizvodnu imovinu",
  "koja se vaša pravila međusobno sukobljavaju",
  "kako uključiti partnera, obitelj ili poslovne suradnike",
  "kako pravila reagiraju u nepovoljnim scenarijima",
  "jesu li pravila provediva u stvarnom životu",
  "što treba promijeniti nakon prvih 30 dana primjene",
] as const

const processStages = [
  {
    label: "Prije početka",
    title: "Priprema stvarnog konteksta",
    area: "budget",
    items: [
      "pripremni upitnik",
      "pregled sadašnjeg stanja",
      "popis otvorenih pitanja i odluka",
    ],
  },
  {
    label: "Radni razgovor 1",
    title: "Proračun, priljevi, odljevi, dug i stvarni višak",
    area: "budget",
    items: ["vidljiv novčani tok", "obveze i pričuva", "prvi prioritet"],
  },
  {
    label: "Radni razgovor 2",
    title: "Davanje, Bitcoin kao novac i promjene kupovne moći",
    area: "bitcoin",
    items: ["uloga novca", "pravila bez trgovanja", "odgovor na rast i pad"],
  },
  {
    label: "Radni razgovor 3",
    title: "Neto imovina, potrošna i proizvodna imovina te pravila ravnoteže",
    area: "worth",
    items: [
      "bilanca kao cjelina",
      "suprotstavljeni ciljevi",
      "pravila ravnoteže",
    ],
  },
  {
    label: "Radni razgovor 4",
    title: "Sigurnost, skrbništvo, obitelj i nasljeđivanje",
    area: "security",
    items: ["stvarne prijetnje", "oporavak", "uloge drugih ljudi"],
  },
  {
    label: "Između razgovora",
    title: "Od uvida prema provedivom pravilu",
    area: "debt",
    items: [
      "kratki konkretni zadaci",
      "provjera otvorenih Bitcoin pitanja",
      "dorada pravila i razjašnjavanje proturječnosti",
    ],
  },
  {
    label: "Nakon radnih razgovora",
    title: "Stres-test i redoslijed provedbe",
    area: "time",
    items: [
      "osobni dokument s pravilima",
      "mapa prioriteta i stres-test",
      "redoslijed provedbe i završni pregled",
    ],
  },
  {
    label: "Nakon 30 dana",
    title: "Revizija nakon stvarne primjene",
    area: "security",
    items: [
      "provjera što je provedeno",
      "utvrđivanje što nije radilo",
      "revizija pravila gdje je potrebna",
    ],
  },
] as const

const outcomeItems = [
  "jasna hijerarhija odluka",
  "razriješene kontradikcije",
  "pravila za stvarne situacije",
  "dogovor s relevantnim ljudima",
  "stres-test nepovoljnih scenarija",
  "provedbeni redoslijed",
  "pisani osobni Bitcoin standard",
  "revizija nakon stvarne primjene",
] as const

const fitItems = [
  "već imate Bitcoin ili ozbiljno razmatrate njegovu veću ulogu",
  "odluke utječu na obitelj, posao ili značajniju imovinu",
  "ne trebate još sadržaja, nego redoslijed i pravila",
  "spremni ste ozbiljno pogledati vlastite brojke, obveze i rizike",
  "želite sustav koji se može objasniti drugoj osobi",
] as const

const notForItems = [
  "tražite kratkoročno predviđanje cijene ili upute za trgovanje",
  "želite da netko preuzme ključeve ili upravlja Bitcoinom umjesto vas",
  "želite univerzalnu formulu bez razgovora o stvarnoj situaciji",
  "ne želite razmotriti kako odluke utječu na relevantnog partnera, člana obitelji ili suradnika",
  "ne želite provesti dogovorene korake",
] as const

const serviceBoundaries = [
  "nije investicijski savjet",
  "nije porezni, pravni ili računovodstveni savjet",
  "nije prognoza cijene ni program trgovanja",
  "ne uključuje upravljanje sredstvima ili preuzimanje skrbništva",
  "ne traži početne riječi, privatne ključeve, lozinke ili pristup novčaniku",
] as const

const programFaqs = [
  {
    question: "Moram li već imati Bitcoin?",
    answer:
      "Ne morate, ali program mora biti povezan sa stvarnom odlukom. Najkorisniji je kada Bitcoin već ima ili bi mogao imati važnu ulogu u vašem novčanom životu.",
  },
  {
    question: "Može li partner ili član obitelji sudjelovati?",
    answer:
      "Da. To je često nužan dio rada ako se pravila tiču zajedničkog proračuna, sigurnosti, obiteljskog pristupa ili nasljeđivanja.",
  },
  {
    question: "Je li pisani standard glavni proizvod?",
    answer:
      "Ne. Dokument bilježi odluke, prioritete, stres-test i provedbeni redoslijed nastale tijekom privatnog rada. Dokument je zapis procesa, ne njegova zamjena.",
  },
  {
    question: "Hoćete li mi reći koliko Bitcoina kupiti?",
    answer:
      "Ne. Pomažem vam razumjeti proračun, dug, neto imovinu, sigurnost, kompromise i posljedice odluka. Odluka ostaje vaša.",
  },
  {
    question: "Radimo li tehničko postavljanje novčanika?",
    answer:
      "Možemo razjasniti sigurnosni model, kriterije i redoslijed sigurnih koraka. Ne tražim početne riječi, privatne ključeve, lozinke ni pristup uređajima ili novčaniku.",
  },
  {
    question: "Mogu li prvo uzeti samo Bitcoin konzultaciju?",
    answer:
      "Da. Ako imate jedno ozbiljno pitanje, konzultacija od 60 minuta može biti razumniji prvi plaćeni korak od cjelovitog programa.",
  },
] as const

function Checklist({
  items,
  kind = "positive",
}: {
  items: readonly string[]
  kind?: "positive" | "negative"
}) {
  const Icon = kind === "positive" ? Check : X

  return (
    <ul
      className={`service-checklist ${
        kind === "negative" ? "service-checklist--negative" : ""
      }`}
    >
      {items.map((item) => (
        <li key={item}>
          <Icon
            className={`${
              kind === "positive" ? "positive-icon" : "negative-icon"
            } service-checklist__icon`}
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function PersonalBitcoinStandard() {
  return (
    <>
      <Seo {...personalBitcoinStandardRoute} />
      <article className="service-page service-page--standard">
        <header className="service-hero hero-section editorial-section">
          <div className="hero-shell">
            <div className="hero-copy service-hero__content">
              <p className="hero-eyebrow">Privatni program</p>
              <h1 className="hero-title">
                Osobni Bitcoin standard: 4–6 tjedana privatnog rada na odlukama
              </h1>
              <p className="hero-subtitle service-hero__lead">
                Ne kupujete tajne informacije ni generički predložak. Kroz
                strukturirani proces donosimo, testiramo i provodimo pravila
                koja odgovaraju vašem proračunu, dugu, imovini, obitelji, poslu
                i sigurnosnim rizicima.
              </p>
              <p className="service-hero__note">
                Pisani standard bilježi donesene odluke. Ne može zamijeniti
                proces kojim se do njih dolazi.
              </p>
              <div className="service-hero__actions">
                <Button asChild className="cta-primary home-primary-button">
                  <a
                    href={CONVERSATION_PATH}
                    className="justify-center text-center"
                    data-cta="personal-standard-hero-call"
                  >
                    <CalendarDays className="size-4" aria-hidden="true" />
                    Rezervirajte razgovor
                  </a>
                </Button>
              </div>
            </div>

            <aside
              className="hero-image-frame service-hero__visual"
              aria-label="Sažetak programa Osobni Bitcoin standard"
            >
              <picture className="service-hero__picture">
                <source
                  srcSet={`${serviceVisualsPath}/standard-hero-20260601.webp`}
                  type="image/webp"
                />
                <img
                  className="service-hero__image"
                  src={`${serviceVisualsPath}/standard-hero-20260601.jpg`}
                  alt="Radni stol s otvorenom knjigom i simbolima za obitelj, sigurnost i imovinu."
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </picture>
              <div className="service-hero__summary-card">
                <p>Privatni program</p>
                <strong>{offerFacts.personalStandard.price}</strong>
                <span>{offerFacts.personalStandard.duration}</span>
                <em>Prioritizacija, stres-test, provedba i revizija.</em>
              </div>
            </aside>
          </div>
        </header>

        <div className="service-page__inner">
          <section className="service-section service-section--split">
            <div className="service-editorial-column">
              <p className="service-eyebrow">Okvir i odluka</p>
              <h2>
                Vodiči pokazuju okvir. Privatni rad pretvara okvir u odluke.
              </h2>
              <p>
                Možete samostalno naučiti načela. Privatni rad počinje ondje
                gdje se ta načela sudare s ograničenim novcem, obvezama,
                odnosima, sigurnosnim rizicima i vremenom. Tada više nije
                dovoljno znati što je razumno općenito; treba odrediti što je
                prvo, što može čekati i što je provedivo za vas.
              </p>
            </div>
            <aside className="service-side-panel">
              <FileText aria-hidden="true" />
              <h3>Dokument je zapis procesa, ne njegova zamjena.</h3>
              <p>
                Njegova vrijednost je u odlukama koje može jasno sačuvati i
                kasnije pomoći revidirati.
              </p>
            </aside>
          </section>

          <section className="service-section service-section--warm">
            <div className="service-section__header">
              <p className="service-eyebrow">Granica javnog sadržaja</p>
              <h2>Što ne možete dobiti iz članka ili PDF-a</h2>
              <p>
                Članak može pošteno objasniti načelo i kompromise. Ne poznaje
                vašu bilancu, ljude koji ovise o vama ni posljedice pogrešnog
                redoslijeda.
              </p>
            </div>
            <Checklist items={publicLimits} />
          </section>

          <section className="service-section">
            <div className="service-section__header">
              <p className="service-eyebrow">Strukturirani proces</p>
              <h2>Kako radimo kroz {offerFacts.personalStandard.duration}</h2>
            </div>
            <div className="service-process-grid">
              {processStages.map((stage, index) => (
                <article
                  key={stage.label}
                  className="service-process-card"
                  data-area={stage.area}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p className="service-eyebrow mt-4">{stage.label}</p>
                  <h3>{stage.title}</h3>
                  <ul className="service-checklist">
                    {stage.items.map((item) => (
                      <li key={item}>
                        <Check
                          className="positive-icon service-checklist__icon"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="service-section service-section--warm">
            <div className="service-section__header">
              <p className="service-eyebrow">Ishodi programa</p>
              <h2>Što ostaje nakon privatnog rada</h2>
            </div>
            <div className="service-number-grid">
              {outcomeItems.map((item, index) => (
                <article key={item} className="service-number-card">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </article>
              ))}
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
              <h2>Kako izgleda rezultat rada</h2>
              <p>
                Javni HTML primjer pokazuje strukturu i vrstu odluka, ali nije
                predložak za kopiranje. Pisani standard je sedmi ishod procesa,
                nakon prioritizacije, razrješenja proturječnosti, stres-testa i
                provedbenog redoslijeda.
              </p>
            </div>
            <ul className="service-cta-list">
              <li>
                <Button asChild variant="outline">
                  <a
                    href={SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH}
                    data-link="personal-standard-result-example"
                  >
                    Pogledajte kako izgleda rezultat
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </Button>
              </li>
            </ul>
          </section>

          <section className="service-section">
            <div className="service-checklist-grid">
              <article className="service-checklist-panel">
                <h2>Za koga je program</h2>
                <Checklist items={fitItems} />
              </article>
              <article className="service-checklist-panel">
                <h2>Kada program vjerojatno nije pravi korak</h2>
                <p>
                  To ne znači da je samostalni put pogrešan. Znači samo da ovaj
                  oblik privatnog rada traži stvaran kontekst i provedbu.
                </p>
                <Checklist items={notForItems} kind="negative" />
              </article>
            </div>
          </section>

          <section className="service-section service-warning-panel">
            <h2>Granice usluge</h2>
            <Checklist items={serviceBoundaries} kind="negative" />
          </section>

          <section className="service-section service-final-cta service-final-cta--pricing">
            <div>
              <h2>Cijena i ulaz</h2>
              <p>
                Program traje {offerFacts.personalStandard.duration} i cijena je{" "}
                {offerFacts.personalStandard.price}. Ne kreće se preko
                checkouta. Prvi korak je 15-minutni uvodni razgovor u kojem
                vidimo ima li program smisla za vašu situaciju.
              </p>
            </div>
            <div
              className="service-pricing-summary"
              role="group"
              aria-label="Sažetak cijene i trajanja"
            >
              <p>Osobni Bitcoin standard</p>
              <strong>{offerFacts.personalStandard.price}</strong>
              <span>{offerFacts.personalStandard.duration}</span>
              <em>Privatni proces, provedba i 30-dnevna revizija.</em>
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
                    Rezervirajte razgovor
                  </a>
                </Button>
              </li>
            </ul>
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
              <p>
                Uvodni razgovor je filter, ne obveza. Ako je za vaše pitanje
                dovoljna jedna konzultacija ili besplatan vodič, to ćemo jasno
                odvojiti od cjelovitog programa.
              </p>
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
                    Rezervirajte razgovor
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
