import { ArrowUpRight, CalendarDays, Check, X } from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { bitcoinConsultationRoute } from "@/content/routes"
import {
  CONVERSATION_PATH,
  PERSONAL_BITCOIN_STANDARD_PATH,
} from "@/content/site"

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
  "ne prognoziram cijenu",
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

const consultationScopes = [
  {
    title: "Osobno",
    copy: "Jedna odluka oko Bitcoina, duga, proračuna, neto imovine ili veće kupnje.",
  },
  {
    title: "Obiteljski",
    copy: "Jedno pitanje koje treba objasniti partneru, obitelji ili osobi od povjerenja.",
  },
  {
    title: "Poslovno",
    copy: "Jedna odluka oko poslovne riznice, viška novca, kratkoročnih obveza, sigurnosti ili razdvajanja privatnog i poslovnog Bitcoina.",
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
  },
  {
    title: "Tijekom razgovora",
    copy: "Razdvajamo Bitcoin tezu, osobnu situaciju, dug, proračun, sigurnost i obiteljski kontekst. Ne tražimo savršen odgovor, nego jasniju sliku.",
  },
  {
    title: "Nakon razgovora",
    copy: "Znate je li jedno pitanje dovoljno razjašnjeno ili ima smisla graditi osobni Bitcoin standard.",
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
    <ul className="mt-5 grid gap-3 text-base leading-7 text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Icon className={`${iconClass} mt-1 size-4 shrink-0`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function BitcoinConsultation() {
  return (
    <>
      <Seo
        title={bitcoinConsultationRoute.title}
        description={bitcoinConsultationRoute.description}
        canonical={bitcoinConsultationRoute.canonical}
        ogType={bitcoinConsultationRoute.ogType}
        schema={bitcoinConsultationRoute.schema as object}
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
              Bitcoin konzultacija
            </li>
          </ol>
        </nav>

        <header className="consultation-hero mt-8">
          <div>
            <h1 className="font-display text-3xl leading-tight font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
              Bitcoin konzultacija
            </h1>
            <p className="mt-5 text-base leading-8 text-muted-foreground sm:mt-6 sm:text-lg">
              Jedan dubinski razgovor za jedno ozbiljno Bitcoin pitanje koje
              utječe na vašu osobnu, obiteljsku ili poslovnu odluku.
            </p>
          </div>
          <aside
            className="consultation-price-card"
            aria-label="Cijena i sljedeći korak"
          >
            <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Prvi plaćeni korak
            </p>
            <p className="mt-3 text-3xl font-semibold text-foreground">200 €</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              jedan dubinski razgovor
            </p>
            <Button asChild className="cta-primary mt-6 w-full rounded-full">
              <a
                href={CONVERSATION_PATH}
                className="justify-center text-center"
                data-cta="bitcoin-consultation-intro-call"
              >
                <CalendarDays className="size-4" />
                Krenite od uvodnog razgovora
              </a>
            </Button>
          </aside>
        </header>

        <section className="consultation-safety-card">
          <h2 className="text-2xl font-semibold">
            Što zapravo plaćate u Bitcoin konzultaciji?
          </h2>
          <div className="mt-5 grid gap-4 text-base leading-8 text-muted-foreground">
            <p>
              Ne plaćate pristup tajnoj informaciji. Većina osnovnih informacija
              o Bitcoinu javno je dostupna. Plaćate skraćivanje puta između
              pitanja i razumijevanja.
            </p>
            <p>
              Razlika je u tome što javni materijal ne poznaje vašu situaciju.
              Knjiga ne zna imate li dug. Podcast ne zna kako vaša obitelj gleda
              na Bitcoin. Graf ne zna koliko državnog novca trebate ostaviti za
              kratke potrebe. Forum ne zna jeste li poduzetnik, zaposlenik,
              roditelj, vlasnik firme ili netko tko prvi put pokušava urediti
              sigurnost i nasljeđivanje.
            </p>
            <p>
              U razgovoru povezujemo Bitcoin tezu s vašim stvarnim životom:
              proračunom, dugom, vremenom, sigurnošću, obitelji, neto imovinom i
              odlukom koju pokušavate donijeti.
            </p>
            <p>
              Možete sve istraživati sami. To je legitiman put. Ali nije
              besplatan. Plaća se vremenom, pažnjom, šumom i mogućom odgodom.
              Ako je vaše vrijeme vrijedno, dobar razgovor može biti jeftiniji
              put do jasnije odluke.
            </p>
          </div>
          <div className="mt-6 rounded-xl border border-primary/25 bg-primary/5 p-5 text-base leading-7 font-semibold text-foreground shadow-sm">
            Bitcoin je dovoljno široka tema da nitko ne mora znati sve. Važno je
            znati dovoljno za odluku koju stvarno trebate donijeti.
          </div>
        </section>

        <section className="consultation-scope-card">
          <h2 className="text-2xl font-semibold">
            Konzultacija može biti osobna, obiteljska ili poslovna
          </h2>
          <div className="consultation-scope-grid">
            {consultationScopes.map((scope) => (
              <article key={scope.title}>
                <h3>{scope.title}</h3>
                <p>{scope.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="consultation-outcome-card">
          <h2 className="text-2xl font-semibold">
            Nakon Bitcoin konzultacije trebali biste imati jednu od tri stvari
          </h2>
          <div className="consultation-outcome-grid">
            {outcomes.map((outcome, index) => (
              <article key={outcome} className="consultation-outcome-item">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{outcome}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-4xl text-base leading-8 text-muted-foreground">
            Za vlasnika posla to može značiti jasnije pitanje: što pripada
            operativnim obvezama, a što je stvarno višak riznice?
          </p>
        </section>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <section className="case-panel">
            <h2 className="text-2xl font-semibold">Za koga je</h2>
            <Checklist items={forWhomItems} />
          </section>

          <section className="case-panel">
            <h2 className="text-2xl font-semibold">Što možemo proći</h2>
            <Checklist items={reviewItems} />
          </section>
        </div>

        <section className="case-panel mt-8">
          <h2 className="text-2xl font-semibold">
            Bitcoin, ne kripto portfelj
          </h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            U konzultaciji možemo razjasniti zašto Bitcoin u ovom okviru
            tretiramo kao novac, a ostale kriptovalute kao rizične investicije
            koje bi se morale mjeriti u Bitcoinu. Ne savjetujem koje tokene
            kupiti, kada ući, kada izaći ni koliko držati.
          </p>
        </section>

        <section className="consultation-safety-card">
          <h2 className="text-2xl font-semibold">Što ne radimo</h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            Bitcoin konzultacija nije dobar izbor ako tražite kratku uputu kada
            kupiti ili prodati, prognozu cijene, upravljanje sredstvima, porezni
            ili pravni savjet, ili osobu koja će odlučiti umjesto vas.
          </p>
          <Checklist items={notDoingItems} kind="negative" />
        </section>

        <section className="mt-10 rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">
            Prije, tijekom i poslije razgovora
          </h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {consultationFlow.map((step, index) => (
              <article
                key={step.title}
                className="rounded-2xl border border-border/80 bg-background/70 p-5 shadow-sm"
              >
                <span className="grid size-8 place-items-center rounded-full border border-primary/25 bg-primary/10 text-xs font-semibold text-primary">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-base leading-8 text-muted-foreground">
                  {step.copy}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">
            Dobra pitanja za Bitcoin konzultaciju
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
            Najkorisnija pitanja nisu općenita. Dobra su ona koja mijenjaju
            stvarnu odluku, razgovor s obitelji ili sigurnosni okvir.
          </p>
          <Checklist items={exampleQuestions} />
        </section>

        <section className="mt-10 rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">Kako razgovor završava</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
            Na kraju ne dobivate savjet ‘kupi’ ili ‘prodaj’. Dobivate jasniji
            okvir: što je pitanje, gdje je stvarni rizik, koje osobne okolnosti
            mijenjaju odluku i koji bi sljedeći korak bio razuman.
          </p>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="case-panel">
            <h2 className="text-2xl font-semibold">Što pripremiti</h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Ne morate slati dokumente. Dovoljno je prije razgovora zapisati:
            </p>
            <Checklist items={preparationItems} />
          </section>

          <section className="case-panel">
            <h2 className="text-2xl font-semibold">Kada nije za vas</h2>
            <Checklist items={notForItems} kind="negative" />
          </section>
        </div>

        <section className="consultation-comparison">
          <h2 className="text-2xl font-semibold">
            Bitcoin konzultacija ili osobni Bitcoin standard?
          </h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <article className="rounded-xl border border-primary/25 bg-primary/5 p-5 shadow-sm">
              <h3 className="text-xl font-semibold">Bitcoin konzultacija</h3>
              <p className="mt-3 text-base leading-8 text-muted-foreground">
                Bitcoin konzultacija je za jedno ozbiljno pitanje, tezu ili
                odluku koju želite razjasniti u jednom dubinskom razgovoru.
              </p>
            </article>
            <article className="rounded-xl border border-border/80 bg-background/70 p-5 shadow-sm">
              <h3 className="text-xl font-semibold">Osobni Bitcoin standard</h3>
              <p className="mt-3 text-base leading-8 text-muted-foreground">
                Osobni Bitcoin standard je za pisani sustav pravila kroz 4–6
                tjedana: proračun, dug, Bitcoin, neto imovina, sigurnost i
                obitelj.
              </p>
              <a
                href={PERSONAL_BITCOIN_STANDARD_PATH}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
                data-link="bitcoin-consultation-personal-standard"
              >
                Pogledajte osobni Bitcoin standard
                <ArrowUpRight className="size-4" />
              </a>
            </article>
          </div>
          <ul className="mt-6 grid gap-3 text-base leading-7 text-muted-foreground md:grid-cols-2">
            <li>Jedna odluka ili pitanje: Bitcoin konzultacija.</li>
            <li>
              Jasnija Bitcoin teza za sebe ili partnera: Bitcoin konzultacija.
            </li>
            <li>Pisana pravila za cijeli sustav: Osobni Bitcoin standard.</li>
            <li>
              Sigurnost i obiteljski pristup trebaju cijeli plan: Osobni Bitcoin
              standard.
            </li>
          </ul>
        </section>

        <section className="mt-10 rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">
            Kada je dovoljan jedan razgovor
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
            Jedan razgovor može biti dovoljan ako vam treba razjasniti konkretno
            pitanje, jedan dio Bitcoin teze ili sigurnosnu odluku. Ako se pokaže
            da jedno pitanje nije dovoljno, sljedeći korak može biti{" "}
            <a
              href={PERSONAL_BITCOIN_STANDARD_PATH}
              className="font-semibold text-foreground underline-offset-4 hover:text-primary hover:underline"
              data-link="bitcoin-consultation-standard-context"
            >
              osobni Bitcoin standard
            </a>
            .
          </p>
        </section>

        <section className="mt-10 rounded-3xl border border-primary/25 bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">
            Krenite od uvodnog razgovora
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
            Uvodni razgovor služi tome da vidimo je li Bitcoin konzultacija
            pravi sljedeći korak ili je za sada dovoljno stati na kratkoj
            procjeni.
          </p>
          <ul className="mt-6 flex list-none flex-col gap-3 sm:flex-row sm:items-center">
            <li>
              <Button
                asChild
                size="lg"
                className="cta-primary h-12 rounded-full px-5 text-base"
              >
                <a
                  href={CONVERSATION_PATH}
                  className="justify-center text-center"
                  data-cta="bitcoin-consultation-final-intro-call"
                >
                  <CalendarDays className="size-4" />
                  Krenite od uvodnog razgovora
                </a>
              </Button>
            </li>
            <li>
              <a
                href="/sigurnost/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted hover:text-foreground"
                data-cta="bitcoin-consultation-security"
              >
                Pogledajte sigurnosna pravila
                <ArrowUpRight className="size-4" />
              </a>
            </li>
          </ul>
        </section>
      </article>
    </>
  )
}
