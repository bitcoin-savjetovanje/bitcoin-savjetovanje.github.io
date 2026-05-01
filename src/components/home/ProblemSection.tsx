import { Check, X } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { problemQuestions } from "@/content/method"

const problemSignals = [
  "Kupujete kada cijena pritisne.",
  "Čekate kada se pojavi strah.",
  "Dug i budući troškovi ulaze u odluke.",
  "Proračun ne pokazuje stvarni višak.",
  "Bitcoin stoji kao imovina sa strane, a ne kao novac u sustavu.",
]

export function ProblemSection() {
  return (
    <section className="section-shell">
      <div className="case-panel">
        <SectionHeader
          title="Imate Bitcoin, ali možda još živite po fiat pravilima."
          copy="Problem nije manjak informacija. Problem je što Bitcoin još nema mjesto u vašem životu kao novac."
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
          Ne trebate još buke. Trebate osobni Bitcoin standard.
        </p>
      </div>
    </section>
  )
}
