import { CalendarDays } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { introCallSteps } from "@/content/home"
import { CONVERSATION_PATH, PRIMARY_CTA } from "@/content/site"

export function IntroCallSection() {
  return (
    <section id="uvodni-razgovor" className="section-shell">
      <div className="case-panel border-primary/25">
        <SectionHeader title="U 15 minuta ne rješavamo cijeli plan. Razjasnimo gdje ste sada i koji sljedeći korak ima smisla." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {introCallSteps.map((item, index) => (
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
              href={CONVERSATION_PATH}
              className="justify-center text-center"
              data-cta="intro-section-call"
            >
              <CalendarDays className="size-4" />
              {PRIMARY_CTA}
            </a>
          </Button>
          <p className="text-sm leading-6 text-muted-foreground">
            Bez naknade. Bez obveze. Ne morate slati iznose, dokumente, lozinke,
            privatne ključeve ni seed phrase.
          </p>
        </div>
      </div>
    </section>
  )
}
