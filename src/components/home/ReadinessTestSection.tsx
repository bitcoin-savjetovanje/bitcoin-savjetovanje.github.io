import { CalendarDays } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { CONVERSATION_PATH } from "@/content/site"

const questions = [
  "Znam koji je novac stvarno slobodan za Bitcoin odluku.",
  "Nemam dug koji stvara pritisak na odluke.",
  "Znam koliko eura ili drugog državnog novca trebam ostaviti za kratke potrebe.",
  "Mogu objasniti ulogu Bitcoina partneru ili obitelji.",
  "Znam što bih napravio nakon pada Bitcoina od 50%.",
  "Moja obitelj zna što ne smije napraviti sa seed phrase.",
] as const

const answerOptions = [
  { value: "da", label: "Da" },
  { value: "nesiguran", label: "Nisam siguran" },
  { value: "ne", label: "Ne" },
] as const

type Answer = (typeof answerOptions)[number]["value"]

function resultCopy(answers: Partial<Record<string, Answer>>) {
  const answered = Object.keys(answers).length

  if (answered < questions.length) {
    return "Odgovorite na pitanja i dobit ćete kratku provjeru gdje možda nedostaje jasnoća."
  }

  const uncertainCount = Object.values(answers).filter(
    (answer) => answer === "nesiguran" || answer === "ne"
  ).length

  if (uncertainCount === 0) {
    return "Već imate dosta jasnoće. Uvodni razgovor i dalje može pomoći ako postoji konkretno pitanje."
  }

  if (uncertainCount <= 2) {
    return "Uvodni razgovor vjerojatno vrijedi jer postoji nekoliko stvari koje treba razjasniti."
  }

  return "Uvodni razgovor vjerojatno vrijedi. Najkorisnije bi bilo prvo odabrati jednu odluku ili pitanje koje želite posložiti."
}

export function ReadinessTestSection() {
  const [answers, setAnswers] = useState<Partial<Record<string, Answer>>>({})

  return (
    <section className="section-shell">
      <div className="readiness-layout">
        <div className="case-panel">
          <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Brza provjera
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight font-semibold text-foreground sm:text-4xl">
            Provjerite ima li uvodni razgovor smisla
          </h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
            Odgovorite na nekoliko pitanja. Ovo nije dijagnoza ni financijski
            savjet — samo brza provjera gdje možda nedostaje jasnoća.
          </p>

          <div className="readiness-question-grid">
            {questions.map((question, index) => {
              const questionId = `readiness-question-${index}`

              return (
                <div
                  key={question}
                  className="readiness-question"
                  role="group"
                  aria-labelledby={questionId}
                >
                  <p id={questionId} className="readiness-question__label">
                    {question}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {answerOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className="readiness-answer"
                        aria-pressed={answers[question] === option.value}
                        onClick={() =>
                          setAnswers((current) => ({
                            ...current,
                            [question]: option.value,
                          }))
                        }
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="readiness-result">
            <h3 className="text-xl font-semibold">Rezultat</h3>
            <p className="mt-3 text-base leading-8 text-muted-foreground">
              {resultCopy(answers)}
            </p>
            <Button asChild className="cta-primary mt-5 rounded-full">
              <a
                href={CONVERSATION_PATH}
                className="justify-center text-center"
                data-cta="readiness-test-intro-call"
              >
                <CalendarDays className="size-4" />
                Dogovorite uvodni razgovor
              </a>
            </Button>
          </div>
        </div>

        <aside className="desktop-conversion-rail" aria-label="Uvodni razgovor">
          <div className="desktop-conversion-rail__card">
            <h3>Imate Bitcoin pitanje?</h3>
            <p>U 15 minuta, bez naknade, možemo razjasniti prvi korak.</p>
            <a
              href={CONVERSATION_PATH}
              className="cta-primary mt-5 inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold"
              data-cta="desktop-rail-intro-call"
            >
              <CalendarDays className="size-4" />
              Dogovorite razgovor
              <span aria-hidden="true" className="sr-only">
                {" "}
              </span>
            </a>
            <a
              href="#pitanja"
              className="mt-3 inline-flex text-sm font-semibold text-foreground hover:text-primary"
              data-cta="desktop-rail-questions"
            >
              Pogledajte pitanja
            </a>
          </div>
        </aside>
      </div>
    </section>
  )
}
