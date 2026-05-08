import { CalendarDays, Check } from "lucide-react"
import { useState } from "react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import { questionGroups } from "@/content/home"
import { CONVERSATION_PATH } from "@/content/site"

export function QuestionsSection() {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null)

  return (
    <section id="pitanja" className="section-shell section-muted">
      <SectionHeader
        title="U razgovor možete doći s jednim stvarnim Bitcoin pitanjem."
        copy="Ne morate poznavati moj okvir. Ne morate čitati knjigu. Ne morate znati stručne izraze. Dovoljno je da imate stvarno pitanje koje utječe na vašu odluku. Ne morate unaprijed znati je li vaše pitanje dovoljno veliko. To je upravo ono što uvodni razgovor treba pokazati."
      />
      <div className="questions-grid">
        {questionGroups.map((group) => (
          <article key={group.title} className="question-group-card">
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
      <div className="question-response-card">
        <h3 className="text-xl font-semibold">
          {selectedQuestion
            ? "Ovo je dobro pitanje za uvodni razgovor."
            : "Odaberite pitanje koje vam je najbliže."}
        </h3>
        {selectedQuestion ? (
          <p className="mt-3 text-base leading-8 text-muted-foreground">
            Odabrano pitanje: {selectedQuestion}
          </p>
        ) : null}
        <p className="mt-2 text-base leading-8 text-muted-foreground">
          {selectedQuestion
            ? "U 15 minuta vidimo je li dovoljan kratak odgovor ili vrijedi ići dublje."
            : "Nakon odabira vidjet ćete zašto je to dobro pitanje za uvodni razgovor."}
        </p>
        {selectedQuestion ? (
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
        ) : null}
      </div>
      <div className="question-note-card">
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
