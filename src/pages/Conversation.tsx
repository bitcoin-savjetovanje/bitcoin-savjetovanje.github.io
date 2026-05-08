import { ArrowUpRight, CalendarDays, Check } from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { conversationRoute } from "@/content/routes"
import { BOOKING_URL } from "@/content/site"

const preparationQuestions = [
  "Što pokušavate odlučiti?",
  "Što vam još nije jasno?",
  "Što bi vam dalo više mira?",
  "Je li prepreka razumijevanje Bitcoina, osobna financijska situacija, sigurnost ili obitelj?",
]

const exampleQuestions = [
  "Razmišljam treba li Bitcoin imati veću ulogu u mojoj imovini, ali ne znam odakle krenuti.",
  "Imam Bitcoin, ali partner ili obitelj nije uvjerena.",
  "Ne znam koliko eura ili drugog državnog novca ostaviti.",
  "Brine me sigurnost i ne želim napraviti glupu grešku.",
  "Razumijem Bitcoin djelomično, ali još nemam tezu koju mogu mirno objasniti drugima.",
]

const conversationSteps = [
  "Kažete gdje ste sada.",
  "Prođemo glavno pitanje.",
  "Vidimo što prvo treba razjasniti.",
  "Dogovorimo sljedeći korak ili stanemo.",
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
      <article className="section-shell">
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

        <header className="mt-8 max-w-4xl">
          <h1 className="font-display text-3xl leading-tight font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
            Dogovorite 15-minutni uvodni razgovor.
          </h1>
          <p className="mt-5 text-base leading-8 text-muted-foreground sm:mt-6 sm:text-lg">
            Razgovor je bez naknade i bez obveze. Cilj nije da u 15 minuta
            riješimo cijeli Bitcoin plan, nego da vidimo što prvo treba
            razjasniti i ima li smisla nastaviti.
          </p>
        </header>

        <section className="mt-10 max-w-4xl rounded-2xl border border-primary/25 bg-card p-6 shadow-sm sm:p-8">
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
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="cta-primary h-12 rounded-full px-5 text-base"
            >
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="justify-center text-center"
                data-cta="conversation-page-calendar"
              >
                <CalendarDays className="size-4" />
                Otvorite kalendar i odaberite termin
              </a>
            </Button>{" "}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-full px-5 text-base"
            >
              <a
                href="/sigurnost/"
                className="justify-center text-center"
                data-cta="conversation-page-security"
              >
                Prvo pročitajte sigurnosna pravila
              </a>
            </Button>
          </div>
        </section>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <section className="case-panel">
            <h2 className="text-2xl font-semibold">
              Prije razgovora razmislite o jednom glavnom pitanju.
            </h2>
            <Checklist items={preparationQuestions} />
          </section>

          <section className="case-panel">
            <h2 className="text-2xl font-semibold">Kako razgovor izgleda</h2>
            <ol className="mt-5 list-decimal space-y-3 pl-5 text-base leading-7 text-muted-foreground marker:font-semibold marker:text-primary">
              {conversationSteps.map((step) => (
                <li key={step} className="pl-1">
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <section className="mt-8 rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">Sigurnosna napomena</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
            Ne šaljite početne riječi, privatne ključeve, lozinke, pristup
            računima ni osjetljive dokumente. Ako bude potreban detaljniji rad,
            dogovorit ćemo siguran način razgovora o strukturi bez predaje
            kontrole.
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

        <section className="mt-8 rounded-2xl border border-primary/25 bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold">
            Spremni za uvodni razgovor?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
            Odaberite termin i dođite s jednim stvarnim pitanjem. Ako ima smisla
            nastaviti, dogovorit ćemo sljedeći korak.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="cta-primary h-12 rounded-full px-5 text-base"
            >
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="justify-center text-center"
                data-cta="conversation-page-final-calendar"
              >
                <CalendarDays className="size-4" />
                Otvorite kalendar i odaberite termin
              </a>
            </Button>{" "}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-full px-5 text-base"
            >
              <a
                href="/sigurnost/"
                className="justify-center text-center"
                data-cta="conversation-page-final-security"
              >
                Prvo pročitajte sigurnosna pravila
              </a>
            </Button>
          </div>
        </section>
      </article>
    </>
  )
}
