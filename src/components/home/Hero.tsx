import { ArrowDown, CalendarDays } from "lucide-react"

import { BookCoverCard } from "@/components/home/BookCoverCard"
import { Button } from "@/components/ui/button"
import { CONVERSATION_PATH, PRIMARY_CTA } from "@/content/site"

const scopeBadges = ["osobno", "obiteljski", "poslovno"]

export function Hero() {
  return (
    <section className="hero-section border-b border-border/70">
      <div className="hero-shell">
        <div className="hero-copy">
          <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Bitcoin kao novac
          </p>
          <h1 className="hero-title mt-4">
            Od držanja Bitcoina do uređenog sustava odluka.
          </h1>
          <p className="hero-subtitle">
            Za pojedince, obitelji i poduzetnike koji žele Bitcoin shvatiti kao
            novac, a ne samo kao odvojenu imovinu koju drže sa strane.
          </p>
          <ul className="hero-scope-pills" aria-label="Razine primjene okvira">
            {scopeBadges.map((badge) => (
              <li key={badge}>{badge}</li>
            ))}
          </ul>
          <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/80">
            U 15-minutnom uvodnom razgovoru vidimo gdje ste sada, koje je prvo
            usko grlo i ima li smisla nastaviti dublje.
          </p>

          <div className="mt-8 flex w-full max-w-2xl flex-col gap-3 sm:mt-9 lg:max-w-none lg:flex-row lg:items-center">
            <Button
              asChild
              size="lg"
              className="cta-primary h-12 w-full rounded-full px-5 text-base lg:w-auto lg:px-6"
            >
              <a
                href={CONVERSATION_PATH}
                className="justify-center text-center"
                data-cta="home-hero-intro-call"
              >
                <CalendarDays className="size-4" />
                {PRIMARY_CTA}
                <span aria-hidden="true" className="sr-only">
                  {" "}
                </span>
              </a>
            </Button>
            <span className="sr-only"> ili </span>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 w-full rounded-full px-5 text-base lg:w-auto lg:px-6"
            >
              <a
                href="#okvir"
                className="justify-center text-center"
                data-link="home-hero-framework"
              >
                <ArrowDown className="size-4" />
                Pogledajte okvir
              </a>
            </Button>
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-6 font-medium text-muted-foreground">
            Bez naknade i bez obveze. Ne upravljam sredstvima, ne prognoziram
            cijenu i nikada ne tražim seed phrase, privatne ključeve ni pristup
            novčaniku.
          </p>
        </div>
        <div className="hero-book-stage">
          <span className="hero-book-badge">Okvir iz knjige u nastajanju</span>
          <BookCoverCard />
        </div>
      </div>
    </section>
  )
}
