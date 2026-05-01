import { Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { problemQuestions } from "@/content/method"

export function ProblemSection() {
  return (
    <section className="section-shell">
      <div className="case-panel">
        <SectionHeader
          title="Ne trebate još informacija. Trebate sustav."
          copy="Ako imate Bitcoin, ali ne znate što napraviti kada cijena raste ili pada, problem nisu informacije. Problem su nezapisana pravila."
        />
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {problemQuestions.map((question) => (
            <div key={question} className="check-row">
              <Check className="positive-icon mt-1 size-4" />
              <p>{question}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
