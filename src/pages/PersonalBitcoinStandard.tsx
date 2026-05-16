import { CalendarDays, Check, X } from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { personalBitcoinStandardRoute } from "@/content/routes"
import { CONVERSATION_PATH } from "@/content/site"

const programSteps = [
  {
    area: "budget",
    title: "Novac, obveze i stvarni višak",
    copy: "Prvo vidimo što novac već radi i koji je novac stvarno slobodan nakon obveza, budućih troškova i sigurnosne pričuve.",
  },
  {
    area: "debt",
    title: "Dug i davanje",
    copy: "Dug pokazuje koji je dio budućnosti već obećan, a davanje pomaže da novac ne postane samo obrana od straha.",
  },
  {
    area: "bitcoin",
    title: "Bitcoin kao novac",
    copy: "Bitcoin ne promatramo samo kao ulaganje. Gledamo u kojem obliku držite novčani saldo nakon što ste ga zaradili i kako Bitcoin ulazi u stvarne odluke.",
  },
  {
    area: "worth",
    title: "Neto imovina, vrijeme i volatilnost",
    copy: "Neto imovinu gledamo kao cjelinu, a rast, padove i cikluse pretvaramo u pravila umjesto u paniku ili euforiju.",
  },
  {
    area: "security",
    title: "Sigurnost, obitelj i nasljeđivanje",
    copy: "Sigurnost nije uređaj, nego sustav. Dobar sustav otežava krađu, ali ne smije toliko otežati pristup da vi, obitelj ili ovlaštene osobe izgubite mogućnost oporavka.",
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
  },
  {
    title: "Poslovni sloj, ako je primjenjivo",
    copy: "Razdvajanje privatnog i poslovnog Bitcoina, operativni fiat sloj i višak poslovne riznice.",
  },
  {
    title: "Sigurnosni sloj",
    copy: "Što se nikada ne dijeli, gdje počinje oporavak i tko zna prvi korak.",
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
      <article className="section-shell page-flow program-page">
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

        <section className="consultation-outcome-card mt-12">
          <h2 className="text-2xl font-semibold">
            Na kraju programa imate pisani osobni Bitcoin standard.
          </h2>
          <Checklist items={outcomeItems} />
        </section>

        <section className="deliverable-section">
          <div>
            <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Pisani okvir
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.015em] sm:text-3xl">
              Kako izgleda pisani osobni Bitcoin standard?
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Na kraju programa cilj nije imati još jednu bilješku iz razgovora,
              nego pisani okvir pravila koji možete ponovno otvoriti kada se
              promijene prihod, cijena, obiteljska situacija, poslovne obveze
              ili sigurnosne okolnosti.
            </p>
            <p className="mt-5 rounded-xl border border-border/70 bg-background/70 p-4 text-sm leading-6 font-semibold text-foreground">
              Ovo je okvir pravila, ne financijski plan, porezni savjet, pravni
              savjet, računovodstveni savjet ili nalog za kupnju/prodaju.
            </p>
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

        <section className="case-panel">
          <h2 className="text-2xl font-semibold">Tri sloja standarda</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {standardLayers.map((layer, index) => (
              <article key={layer.title} className="program-layer-card">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{layer.title}</h3>
                <p>{layer.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">
            Kako radimo kroz 4–6 tjedana
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
              obiteljsku sigurnost i poslovnu riznicu.
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
        </section>

        <section className="mt-8 rounded-3xl border border-primary/25 bg-card p-6 shadow-sm sm:p-8">
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

        <section className="conversation-final-card">
          <h2 className="text-2xl font-semibold">
            Želite vidjeti ima li program smisla za vas?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
            Prvi korak nije checkout, nego 15-minutni uvodni razgovor.
          </p>
          <Button asChild className="cta-primary mt-6 rounded-full">
            <a
              href={CONVERSATION_PATH}
              className="justify-center text-center"
              data-cta="personal-standard-final-call"
            >
              <CalendarDays className="size-4" />
              Dogovorite uvodni razgovor
            </a>
          </Button>
        </section>
      </article>
    </>
  )
}
