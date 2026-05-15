import { Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { conversationProblemCards } from "@/content/home"

const audienceAreas = [
  "bitcoin",
  "worth",
  "debt",
  "budget",
  "giving",
  "security",
  "time",
]

export function QuestionsSection() {
  return (
    <section id="pitanja" className="section-shell">
      <SectionHeader
        title="Za koga je ovaj razgovor?"
        copy="Ovaj razgovor ima smisla ako se prepoznajete u jednoj od ovih rečenica."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {conversationProblemCards.map((card, index) => (
          <article
            key={card.title}
            className="audience-card"
            data-area={audienceAreas[index % audienceAreas.length]}
          >
            <Check className="positive-icon size-5" />
            <h3 className="mt-4">{card.title}</h3>
            <p>{card.copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
