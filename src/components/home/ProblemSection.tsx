import { Check, X } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { problemQuestions } from "@/content/method"

const problemSignals = [
  "Kupujete više kada cijena raste i tržišni sentiment prijeđe u pohlepu.",
  "Kada tržišni sentiment prijeđe u strah, želite stati.",
  "Dug ostaje izvan odluke, iako je već odlučuje.",
  "Ne znate gdje stoje novac, dug i imovina.",
  "Bitcoin stoji kao imovina sa strane, a ne kao novac u sustavu.",
]

export function ProblemSection() {
  return (
    <section className="section-shell">
      <div className="case-panel">
        <SectionHeader
          title={
            <>
              Imate Bitcoin, ali možda još živite po <em>fiat</em> pravilima.
            </>
          }
          copy="Problem nije manjak informacija, nego to što Bitcoin još nema mjesto u vašem životu kao novac."
        />
        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {problemSignals.map((item) => (
            <div key={item} className="not-for-row bg-background/70">
              <X className="negative-icon size-3.5" />
              <p>{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {problemQuestions.map((question) => (
            <div key={question} className="check-row">
              <Check className="positive-icon mt-1 size-4" />
              <p>{question}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-xl leading-8 font-semibold text-foreground">
          Bez pravila, sentiment vodi vaš Bitcoin. Ne trebate još šuma. Trebate
          osobni Bitcoin standard.
        </p>
      </div>
    </section>
  )
}
