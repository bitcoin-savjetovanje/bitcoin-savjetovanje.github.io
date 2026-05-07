import { CalendarDays } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { introCallItems } from "@/content/home"
import { BOOKING_URL, PRIMARY_CTA } from "@/content/site"

export function IntroCallSection() {
  return (
    <section id="uvodni-razgovor" className="section-shell">
      <div className="case-panel border-primary/25">
        <SectionHeader
          title="U 15 minuta vidimo gdje sustav najviše škripi."
          copy="Uvodni razgovor nije prodaja Bitcoina, prognoza cijene ni upravljanje vašim novcem. To je kratka provjera: imate li jasan proračun, postoji li dug, znate li stvarni višak, kakvu ulogu ima Bitcoin i postoji li obiteljski sigurnosni plan."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {introCallItems.map((item, index) => (
            <article key={item.title} className="program-card bg-background/70">
              <span className="grid size-8 place-items-center rounded-full border border-primary/25 bg-primary/10 text-xs font-semibold text-primary">
                {index + 1}
              </span>
              <h3 className="mt-4">{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Button asChild className="cta-primary rounded-full">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="intro-call-primary"
            >
              <CalendarDays className="size-4" />
              {PRIMARY_CTA}
            </a>
          </Button>
          <p className="text-sm leading-6 text-muted-foreground">
            Uvodni razgovor je bez naknade i traje 15 minuta.
          </p>
        </div>
      </div>
    </section>
  )
}
