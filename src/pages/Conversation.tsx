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

const conversationSteps = [
  "Kažete gdje ste sada.",
  "Prođemo glavno pitanje.",
  "Vidimo što nedostaje.",
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
            riješimo cijeli Bitcoin plan, nego da vidimo gdje ste zapeli i ima
            li smisla nastaviti.
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
            </Button>
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
        </header>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <section className="case-panel">
            <h2 className="text-2xl font-semibold">
              Prije razgovora razmislite o jednom glavnom pitanju.
            </h2>
            <Checklist items={preparationQuestions} />
          </section>

          <section className="case-panel">
            <h2 className="text-2xl font-semibold">Kako razgovor izgleda</h2>
            <ol className="mt-5 grid gap-3 text-base leading-7 text-muted-foreground">
              {conversationSteps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-primary/25 bg-primary/10 text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
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
      </article>
    </>
  )
}
