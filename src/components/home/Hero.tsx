import { CalendarDays, ShieldCheck } from "lucide-react"

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

          <div className="mt-8 flex w-full max-w-2xl flex-col gap-3 sm:mt-9 lg:max-w-none lg:flex-row lg:items-center">
            <Button
              asChild
              size="lg"
              className="cta-primary h-12 w-full rounded-md px-5 text-base shadow-sm lg:w-auto lg:px-6"
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
          </div>
          <div className="hero-trust-note">
            <ShieldCheck className="size-5" aria-hidden="true" />
            <p>
              Bez naknade i bez obveze. Ne upravljam sredstvima, ne prognoziram
              cijenu i nikada ne tražim seed phrase, privatne ključeve ni
              pristup novčaniku.
            </p>
          </div>
        </div>
        <div className="hero-book-stage" aria-label="Knjiga Bitcoin kao novac">
          <div className="hero-workbook-card" aria-hidden="true">
            <span>Radna bilježnica</span>
            <small>za život s Bitcoinom</small>
          </div>
          <BookCoverCard />
        </div>
      </div>
    </section>
  )
}
