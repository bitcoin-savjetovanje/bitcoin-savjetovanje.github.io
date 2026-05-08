import { CalendarDays, Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { questionGroups } from "@/content/home"
import { CONVERSATION_PATH } from "@/content/site"

export function QuestionsSection() {
  return (
    <section id="pitanja" className="section-shell section-muted">
      <SectionHeader
        title="U razgovor možete doći s bilo kojim Bitcoin pitanjem."
        copy="Ne morate poznavati moj okvir. Ne morate čitati knjigu. Ne morate znati stručne izraze. Dovoljno je da imate pitanje koje vam stoji između trenutne nejasnoće i mirnije odluke."
      />
      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {questionGroups.map((group) => (
          <article key={group.title} className="program-card bg-card">
            <h3>{group.title}</h3>
            <ul className="mt-5 grid gap-3 text-base leading-7 text-muted-foreground">
              {group.questions.map((question) => (
                <li key={question} className="flex gap-3">
                  <Check className="positive-icon mt-1 size-4 shrink-0" />
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="mt-8 rounded-xl border border-border/80 bg-card p-5 shadow-sm sm:p-6">
        <p className="max-w-4xl text-base leading-8 text-muted-foreground">
          Uvodni razgovor ne služi tome da u 15 minuta riješimo sve. Služi tome
          da nađemo glavni čvor. Ako mogu pomoći, predložit ću plaćeni sljedeći
          korak. Ako ne mogu, reći ću vam to otvoreno.
        </p>
        <Button asChild className="cta-primary mt-6 rounded-full">
          <a
            href={CONVERSATION_PATH}
            className="justify-center text-center"
            data-cta="questions-intro-call"
          >
            <CalendarDays className="size-4" />
            Dogovorite uvodni razgovor
          </a>
        </Button>
      </div>
    </section>
  )
}
