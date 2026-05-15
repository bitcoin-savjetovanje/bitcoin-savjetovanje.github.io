import { CalendarDays } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { introCallSteps } from "@/content/home"
import { CONVERSATION_PATH, PRIMARY_CTA } from "@/content/site"

export function IntroCallSection() {
  return (
    <section
      id="uvodni-razgovor"
      className="section-shell dark-process-section"
    >
      <div className="dark-process-panel">
        <p className="dark-process-kicker">Uvodni razgovor</p>
        <SectionHeader title="U 15 minuta ne gradimo cijeli sustav. Pronalazimo prvo usko grlo." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {introCallSteps.map((item, index) => (
            <article key={item.title} className="dark-process-card">
              <span>{String(index + 1).padStart(2, "0")}</span>
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
              data-cta="home-process-intro-call"
            >
              <CalendarDays className="size-4" />
              {PRIMARY_CTA}
            </a>
          </Button>
          <p className="text-sm leading-6 text-muted-foreground">
            Razgovor je bez naknade i obveze. Ne morate slati iznose, dokumente,
            lozinke, privatne ključeve ni seed phrase.
          </p>
        </div>
      </div>
    </section>
  )
}
