import { ArrowUpRight, CalendarDays, Check } from "lucide-react"

import { CalBookingLink } from "@/components/CalBookingLink"
import { CalInlineEmbed } from "@/components/CalInlineEmbed"
import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { conversationRoute } from "@/content/routes"
import { BITCOIN_CONSULTATION_PATH } from "@/content/site"

const preparationQuestions = [
  "Što pokušavate odlučiti?",
  "Što vam još nije jasno?",
  "Što bi vam dalo više mira?",
  "Je li prepreka razumijevanje Bitcoina, osobna financijska situacija, sigurnost ili obitelj?",
]

const exampleQuestions = [
  "Razmišljam treba li Bitcoin imati veću ulogu u mojoj imovini, ali ne znam odakle krenuti.",
  "Imam Bitcoin, ali partner ili obitelj još nisu sigurni.",
  "Ne znam koliko eura ili drugog državnog novca ostaviti.",
  "Brine me sigurnost i ne želim pogriješiti s čuvanjem Bitcoina.",
  "Razumijem Bitcoin djelomično, ali još nemam tezu koju mogu mirno objasniti drugima.",
]

const conversationSteps = [
  "Kažete gdje ste sada.",
  "Razjasnimo glavno pitanje.",
  "Vidimo što nedostaje za sljedeći korak.",
  "Dogovorimo sljedeći korak ili zaključimo da je za sada dovoljno.",
]

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 grid gap-3 text-base leading-7 text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check className="positive-icon mt-1 size-4 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function Conversation() {
  return (
    <>
      <Seo
        title={conversationRoute.title}
        description={conversationRoute.description}
        canonical={conversationRoute.canonical}
        ogType={conversationRoute.ogType}
        schema={conversationRoute.schema as object}
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
              Razgovor
            </li>
          </ol>
        </nav>

        <header className="page-hero page-hero--compact mt-8">
          <h1 className="font-display text-3xl leading-tight font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
            Dogovorite 15-minutni uvodni razgovor.
          </h1>
          <p className="mt-5 text-base leading-8 text-muted-foreground sm:mt-6 sm:text-lg">
            Razgovor je bez naknade i bez obveze. Cilj nije da u 15 minuta
            riješimo cijeli Bitcoin plan, nego da vidimo što prvo treba
            razjasniti i koji bi sljedeći korak bio razuman.
          </p>
        </header>

        <section className="conversation-calendar-card">
          <h2 className="text-2xl font-semibold">
            Dobra pitanja za uvodni razgovor zvuče ovako:
          </h2>
          <ul className="mt-5 grid gap-3 text-base leading-7 text-muted-foreground">
            {exampleQuestions.map((question) => (
              <li key={question} className="flex gap-3">
                <Check className="positive-icon mt-1 size-4 shrink-0" />
                <span>{question}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-base leading-7 font-medium text-foreground">
            Ne morate doći pripremljeni kao stručnjak. Dovoljno je da dođete s
            jednim stvarnim pitanjem.
          </p>
          <ul className="conversation-cta-list mt-8">
            <li>
              <Button
                asChild
                size="lg"
                className="cta-primary h-11 w-full rounded-full px-4 text-sm sm:h-12 sm:w-auto sm:px-5 sm:text-base"
              >
                <CalBookingLink
                  className="justify-start text-left sm:justify-center sm:text-center"
                  data-cta="conversation-page-calendar"
                >
                  <CalendarDays className="size-4" />
                  Otvorite kalendar i odaberite termin
                </CalBookingLink>
              </Button>
            </li>
            <li>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 w-full rounded-full px-4 text-sm sm:h-12 sm:w-auto sm:px-5 sm:text-base"
              >
                <a
                  href="/sigurnost/"
                  className="justify-start text-left sm:justify-center sm:text-center"
                  data-cta="conversation-page-security"
                >
                  Prvo pročitajte sigurnosna pravila
                </a>
              </Button>
            </li>
          </ul>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Otvorit će se kalendar. Odaberite termin i u bilješku napišite jedno
            pitanje koje želite razjasniti.
          </p>
        </section>

        <section className="conversation-referral-card">
          <h2 className="text-2xl font-semibold">
            Ako vam je netko poslao ovu stranicu
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
            Ne morate znati je li razgovor pravi za vas. Dovoljno je da imate
            jedno stvarno Bitcoin pitanje koje utječe na vašu odluku — oko
            Bitcoin teze, cijene, duga, sigurnosti, obitelji ili uloge Bitcoina
            u imovini.
          </p>
          <p className="mt-5 text-base leading-7 font-medium text-foreground">
            U bilješku kod odabira termina možete napisati:
          </p>
          <Checklist
            items={[
              "Koju odluku pokušavate donijeti?",
              "Što vam još nije jasno ili što vas najviše brine?",
              "Dolazite li sami ili s partnerom/članom obitelji?",
            ]}
          />
          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            Ne šaljite seed phrase, privatne ključeve, lozinke, screenshotove
            novčanika, iznose ni osjetljive dokumente.
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="mt-6 h-11 w-full rounded-full px-4 text-sm sm:w-auto sm:px-5 sm:text-base"
          >
            <a
              href="#kalendar"
              className="justify-center text-center"
              data-cta="conversation-referral-calendar"
            >
              <CalendarDays className="size-4" />
              Odaberite termin
            </a>
          </Button>
        </section>

        <CalInlineEmbed />

        <div className="conversation-two-column">
          <section className="case-panel">
            <h2 className="text-2xl font-semibold">
              Prije razgovora razmislite o jednom glavnom pitanju.
            </h2>
            <Checklist items={preparationQuestions} />
          </section>

          <section className="case-panel">
            <h2 className="text-2xl font-semibold">Kako razgovor izgleda</h2>
            <ol className="conversation-stepper">
              {conversationSteps.map((step) => (
                <li key={step}>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <section className="safety-note-card">
          <h2 className="text-2xl font-semibold">Sigurnosna napomena</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
            Ne šaljite seed phrase, privatne ključeve, lozinke, pristup računima
            ni osjetljive dokumente. Ako bude potreban detaljniji rad, dogovorit
            ćemo siguran način razgovora o strukturi bez predaje kontrole.
          </p>
          <a
            href="/sigurnost/"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
            data-link="conversation-security-rules"
          >
            Sigurnosna pravila
            <ArrowUpRight className="size-4" />
          </a>
        </section>

        <section className="conversation-outcomes-card mt-8 rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">
            Što se može dogoditi nakon razgovora?
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
            Nakon razgovora moguća su tri ishoda: kratak odgovor je dovoljan,
            sljedeći korak je{" "}
            <a
              href={BITCOIN_CONSULTATION_PATH}
              className="font-semibold text-foreground underline-offset-4 hover:text-primary hover:underline"
              data-link="conversation-bitcoin-consultation"
            >
              Bitcoin konzultacija
            </a>
            , ili vrijedi razgovarati o osobnom Bitcoin standardu. Ne mora svaki
            uvodni razgovor završiti plaćenim nastavkom.
          </p>
        </section>

        <section className="conversation-final-card">
          <h2 className="text-2xl font-semibold">
            Spremni za uvodni razgovor?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
            Odaberite termin i dođite s jednim stvarnim pitanjem. Ne morate
            imati gotov plan — cilj je vidjeti što treba razjasniti prvo.
          </p>
          <ul className="conversation-cta-list mt-6">
            <li>
              <Button
                asChild
                size="lg"
                className="cta-primary h-11 w-full rounded-full px-4 text-sm sm:h-12 sm:w-auto sm:px-5 sm:text-base"
              >
                <CalBookingLink
                  className="justify-start text-left sm:justify-center sm:text-center"
                  data-cta="conversation-page-final-calendar"
                >
                  <CalendarDays className="size-4" />
                  Otvorite kalendar i odaberite termin
                </CalBookingLink>
              </Button>
            </li>
            <li>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 w-full rounded-full px-4 text-sm sm:h-12 sm:w-auto sm:px-5 sm:text-base"
              >
                <a
                  href="/sigurnost/"
                  className="justify-start text-left sm:justify-center sm:text-center"
                  data-cta="conversation-page-final-security"
                >
                  Prvo pročitajte sigurnosna pravila
                </a>
              </Button>
            </li>
          </ul>
        </section>
      </article>
    </>
  )
}
