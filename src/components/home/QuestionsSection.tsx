import { Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { conversationAudienceGroups } from "@/content/home"

export function QuestionsSection() {
  return (
    <section id="pitanja" className="section-shell">
      <SectionHeader
        title="Za koga je ovaj razgovor?"
        copy="Ovaj razgovor ima smisla ako se prepoznajete u jednoj od ovih rečenica."
      />
      <div className="audience-group-grid">
        {conversationAudienceGroups.map((group) => (
          <section
            key={group.label}
            className="audience-group"
            data-area={group.area}
            aria-label={`Razina: ${group.label}`}
          >
            <p className="audience-group__label">{group.label}</p>
            <div className="audience-group__cards">
              {group.cards.map((card) => (
                <article
                  key={card.title}
                  className="audience-card"
                  data-area={group.area}
                >
                  <Check className="positive-icon size-5" />
                  <h3 className="mt-4">{card.title}</h3>
                  <p>{card.copy}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}
