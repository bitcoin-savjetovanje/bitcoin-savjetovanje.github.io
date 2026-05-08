import { CalendarDays, Check } from "lucide-react"
import { useState } from "react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { questionGroups } from "@/content/home"
import { CONVERSATION_PATH } from "@/content/site"

export function QuestionsSection() {
  const firstQuestion = questionGroups[0]?.questions[0] ?? ""
  const [selectedQuestion, setSelectedQuestion] = useState(firstQuestion)

  return (
    <section id="pitanja" className="section-shell section-muted">
      <SectionHeader
        title="U razgovor možete doći s bilo kojim Bitcoin pitanjem."
        copy="Ne morate poznavati moj okvir. Ne morate čitati knjigu. Ne morate znati stručne izraze. Dovoljno je da imate stvarno pitanje koje utječe na vašu odluku. Ne morate unaprijed znati je li vaše pitanje dovoljno veliko. To je upravo ono što uvodni razgovor treba pokazati."
      />
      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {questionGroups.map((group) => (
          <article key={group.title} className="program-card bg-card">
            <h3>{group.title}</h3>
            <ul className="mt-5 grid gap-3 text-base leading-7 text-muted-foreground">
              {group.questions.map((question) => (
                <li key={question}>
                  <button
                    type="button"
                    className="question-choice"
                    aria-pressed={selectedQuestion === question}
                    onClick={() => setSelectedQuestion(question)}
                  >
                    <Check className="positive-icon mt-1 size-4 shrink-0" />
                    <span>{question}</span>
                  </button>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="mt-6 rounded-xl border border-primary/25 bg-card p-5 shadow-sm sm:p-6">
        <h3 className="text-xl font-semibold">
          Ovo je dobro pitanje za uvodni razgovor.
        </h3>
        <p className="mt-3 text-base leading-8 text-muted-foreground">
          Odabrano pitanje: {selectedQuestion}
        </p>
        <p className="mt-2 text-base leading-8 text-muted-foreground">
          U 15 minuta vidimo je li dovoljan kratak odgovor ili vrijedi ići
          dublje.
        </p>
        <Button asChild className="cta-primary mt-5 rounded-full">
          <a
            href={CONVERSATION_PATH}
            className="justify-center text-center"
            data-cta="question-selected-intro-call"
          >
            <CalendarDays className="size-4" />
            Dogovorite razgovor s ovim pitanjem
          </a>
        </Button>
      </div>
      <div className="mt-8 rounded-xl border border-border/80 bg-card p-5 shadow-sm sm:p-6">
        <p className="max-w-4xl text-base leading-8 text-muted-foreground">
          Uvodni razgovor ne služi tome da u 15 minuta riješimo sve. Služi tome
          da prepoznamo što prvo treba razjasniti. Ako mogu pomoći, predložit ću
          plaćeni sljedeći korak. Ako ne mogu, reći ću vam to otvoreno.
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
