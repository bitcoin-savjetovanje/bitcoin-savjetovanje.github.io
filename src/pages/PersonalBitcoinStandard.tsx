import { CalendarDays, Check, X } from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { personalBitcoinStandardRoute } from "@/content/routes"
import { CONVERSATION_PATH } from "@/content/site"

const audienceItems = [
  "Imate Bitcoin, ali nemate jasna pravila kada kupovati, držati, trošiti ili rebalansirati.",
  "Želite Bitcoin promatrati kao novac, a ne samo kao imovinu sa strane.",
  "Imate dug ili veće buduće obveze koje utječu na Bitcoin odluke.",
  "Vodite posao i trebate razdvojiti privatni Bitcoin, poslovnu riznicu i kratkoročne obveze.",
  "Partner ili obitelj nisu na istoj razini razumijevanja.",
  "Brine vas sigurnost, pristup, nasljeđivanje ili ovisnost o jednoj osobi.",
  "Ne želite prepustiti odluku nekome drugome, nego želite vlastiti okvir.",
]

const programSteps = [
  {
    area: "budget",
    title: "Proračun, priljevi, odljevi i stvarni višak",
    copy: "Prvo vidimo što novac već radi. Stvarni višak nije stanje na računu, nego novac koji ostaje nakon obveza, budućih troškova, duga, davanja i sigurnosne pričuve.",
  },
  {
    area: "debt",
    title: "Dug i sloboda odlučivanja",
    copy: "Dug je budući novac koji ste već potrošili. Dok dug postoji, dio budućnosti već je obećan. U programu se zato jasno vidi kako dug mijenja Bitcoin odluke.",
  },
  {
    area: "giving",
    title: "Davanje kao stalna praksa",
    copy: "Davanje nije moralni ukras. Ono oblikuje odnos prema novcu, ljudima, riziku i sposobnosti stvaranja vrijednosti.",
  },
  {
    area: "bitcoin",
    title: "Bitcoin kao novac",
    copy: "Bitcoin ne promatramo samo kao ulaganje. Gledamo u kojem obliku držite novčani saldo nakon što ste ga zaradili i kako Bitcoin ulazi u stvarne odluke.",
  },
  {
    area: "worth",
    title: "Neto imovina i pravilo trećina",
    copy: "Novac, potrošna dobra i proizvodna imovina imaju različite uloge. Cilj nije ignorirati ostatak bilance, nego vidjeti neto imovinu kao jednu cjelinu.",
  },
  {
    area: "time",
    title: "Vrijeme, rast i volatilnost",
    copy: "Ne pokušavamo pogoditi kratkoročnu cijenu. Cilj je pretvoriti rast, cikluse i volatilnost u pravila za odluke dok vrijeme prolazi.",
  },
  {
    area: "security",
    title: "Sigurnost, obitelj i nasljeđivanje",
    copy: "Sigurnost nije uređaj, nego sustav. Dobar sustav otežava krađu, ali ne smije toliko otežati pristup da vi, obitelj ili ovlaštene osobe izgubite mogućnost oporavka.",
  },
]

const outcomeItems = [
  "pravila za državni novac i Bitcoin",
  "pravila za proračun i stvarni višak",
  "plan odnosa prema dugu",
  "pravila davanja",
  "okvir za Bitcoin kao primarni novac",
  "pravila za privatni, obiteljski i po potrebi poslovni sloj",
  "pravila za neto imovinu i veće kupnje",
  "okvir za rast, padove i volatilnost",
  "sigurnosna i obiteljska pravila",
  "popis onoga što se nikada ne dijeli",
]

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
  {
    title: "Granice savjetovanja",
    copy: "Porezni, pravni i računovodstveni dio treba provjeriti s odgovarajućim stručnjacima.",
  },
]

const deliverableSections = [
  {
    title: "I. Privatni i obiteljski sloj",
    items: [
      "pravilo za državni novac",
      "pravilo za Bitcoin saldo",
      "pravilo za dug",
      "pravilo za davanje",
      "pravilo za veće kupnje",
      "pravilo za pad cijene",
      "pravilo za rast cijene",
      "obiteljske upute",
    ],
  },
  {
    title: "II. Poslovni sloj, ako je primjenjivo",
    items: [
      "razdvajanje privatnog i poslovnog Bitcoina",
      "fiat sloj za poreze, plaće i dobavljače",
      "pravilo za višak poslovne riznice",
      "poslovni dug, oprema i zalihe",
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
      "U programu možemo razgovarati o sigurnosnoj strukturi i pravilima, ali ne tražim seed phrase, privatne ključeve, lozinke ni pristup uređajima ili walletu.",
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

function Checklist({
  items,
  kind = "positive",
}: {
  items: string[]
  kind?: "positive" | "negative"
}) {
  const Icon = kind === "positive" ? Check : X
  const iconClass = kind === "positive" ? "positive-icon" : "negative-icon"

  return (
    <ul className="mt-5 grid gap-3 text-base leading-7 text-muted-foreground md:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Icon className={`${iconClass} mt-1 size-4 shrink-0`} />
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
      <article className="section-shell page-flow">
        <nav
          aria-label="Breadcrumb"
          className="text-sm font-medium text-muted-foreground"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <a href="/" className="hover:text-primary">
                Početna
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              Osobni Bitcoin standard
            </li>
          </ol>
        </nav>

        <header className="consultation-hero mt-8">
          <div>
            <h1 className="font-display text-3xl leading-tight font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
              Osobni Bitcoin standard
            </h1>
            <p className="mt-5 text-base leading-8 text-muted-foreground sm:mt-6 sm:text-lg">
              4–6 tjedana rada na pisanom sustavu odluka za život s Bitcoinom.
            </p>
            <p className="mt-5 max-w-4xl text-base leading-8 text-muted-foreground">
              Osobni Bitcoin standard nije samo posjedovanje Bitcoina. To je
              pisani okvir pravila za proračun, dug, davanje, Bitcoin kao novac,
              neto imovinu, volatilnost, sigurnost, obiteljski pristup i po
              potrebi poslovnu riznicu.
            </p>
          </div>
          <aside
            className="consultation-price-card"
            aria-label="Cijena i ulaz u program"
          >
            <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Program
            </p>
            <p className="mt-3 text-3xl font-semibold text-foreground">
              1.500 €
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              4–6 tjedana
            </p>
            <Button
              asChild
              className="cta-primary mt-6 h-12 w-full rounded-full px-5 text-base"
            >
              <a
                href={CONVERSATION_PATH}
                className="justify-center text-center"
                data-cta="personal-standard-hero-call"
              >
                <CalendarDays className="size-4" />
                Dogovorite razgovor
              </a>
            </Button>
          </aside>
        </header>

        <section className="case-panel mt-12">
          <h2 className="text-2xl font-semibold">Za koga je program</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
            Za osobu, par, obitelj ili vlasnika posla koji ne želi samo odgovor
            na jedno Bitcoin pitanje, nego želi jasna pravila za novac, dug,
            Bitcoin, neto imovinu, sigurnost i obiteljski pristup.
          </p>
          <Checklist items={audienceItems} />
        </section>

        <section className="mt-12 rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">
            Što radimo kroz 4–6 tjedana
          </h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {programSteps.map((step, index) => (
              <article
                key={step.title}
                className="program-step-card"
                data-area={step.area}
              >
                <span className="program-step-card__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-base leading-8 text-muted-foreground">
                  {step.copy}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="consultation-outcome-card">
          <h2 className="text-2xl font-semibold">
            Na kraju programa imate pisani osobni Bitcoin standard.
          </h2>
          <Checklist items={outcomeItems} />
        </section>

        <section className="program-business-section">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Poslovni sloj
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.015em] sm:text-3xl">
              Ako vodite posao, standard ima i poslovni sloj
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Kod poduzetnika Bitcoin odluka ne smije pomiješati privatni život,
              obiteljsku sigurnost i poslovnu riznicu. U poslovnom sloju gledamo
              novčani tok, poreze, plaće, dobavljače, pričuvu, vlasničku
              isplatu, poslovni dug, višak riznice i sigurnosna pravila ako
              vlasnik ili direktor nije dostupan.
            </p>
          </div>
          <div className="program-business-grid">
            {businessLayerItems.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <Button asChild className="cta-primary mt-7 rounded-full">
            <a
              href={CONVERSATION_PATH}
              className="justify-center text-center"
              data-cta="personal-standard-business-call"
            >
              <CalendarDays className="size-4" />
              Razgovarajmo o vašoj situaciji
            </a>
          </Button>
        </section>

        <section className="deliverable-section">
          <div>
            <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Pisani okvir
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.015em] sm:text-3xl">
              Kako izgleda pisani osobni Bitcoin standard?
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
              Na kraju programa cilj nije imati još jednu bilješku iz razgovora,
              nego pisani okvir pravila koji možete ponovno otvoriti kada se
              promijene prihod, cijena, obiteljska situacija, poslovne obveze
              ili sigurnosne okolnosti.
            </p>
            <p className="mt-5 rounded-xl border border-border/70 bg-background/70 p-4 text-sm leading-6 font-semibold text-foreground">
              Ovo je okvir pravila, ne financijski plan, porezni savjet, pravni
              savjet, računovodstveni savjet ili nalog za kupnju/prodaju.
            </p>
            <Button asChild className="cta-primary mt-6 rounded-full">
              <a
                href={CONVERSATION_PATH}
                className="justify-center text-center"
                data-cta="personal-standard-deliverable-call"
              >
                <CalendarDays className="size-4" />
                Krenite od uvodnog razgovora
              </a>
            </Button>
          </div>
          <aside className="deliverable-mockup" aria-label="Mockup dokumenta">
            <span className="deliverable-stamp">pisani okvir</span>
            <div className="deliverable-tabs" aria-hidden="true">
              <span>privatno/obitelj</span>
              <span>posao</span>
            </div>
            <h3>Osobni Bitcoin standard</h3>
            {deliverableSections.map((section) => (
              <section key={section.title} className="deliverable-layer">
                <h4>{section.title}</h4>
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </aside>
        </section>

        <section className="mt-8 rounded-2xl border border-primary/25 bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">Cijena i ulaz</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
            Program traje 4–6 tjedana i cijena je 1.500 €. Ne kreće se izravno
            preko checkouta. Prvi korak je 15-minutni uvodni razgovor u kojem
            vidimo ima li program smisla za vašu situaciju.
          </p>
          <Button asChild className="cta-primary mt-6 rounded-full">
            <a
              href={CONVERSATION_PATH}
              className="justify-center text-center"
              data-cta="personal-standard-pricing-call"
            >
              <CalendarDays className="size-4" />
              Dogovorite uvodni razgovor
            </a>
          </Button>
        </section>

        <section className="consultation-safety-card">
          <h2 className="text-2xl font-semibold">Ovo nije</h2>
          <Checklist items={notItems} kind="negative" />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Česta pitanja o programu</h2>
          <div className="mt-6 divide-y divide-border/70 border-y border-border/70">
            {programFaqs.map((faq) => (
              <details key={faq.question} className="faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </article>
    </>
  )
}
