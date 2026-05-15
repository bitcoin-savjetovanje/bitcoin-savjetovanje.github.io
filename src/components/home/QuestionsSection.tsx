import { Check } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { conversationAudienceGroups } from "@/content/home"

export function QuestionsSection() {
  return (
    <section id="pitanja" className="section-shell">
      <SectionHeader
        title="Za koga je ovaj razgovor?"
        copy="Dovoljno je jedno konkretno pitanje. Ono može biti osobno, obiteljsko ili poslovno."
      />
      <div className="audience-group-grid">
        {conversationAudienceGroups.map((group) => (
          <article
            key={group.title}
            className="audience-card"
            data-area={group.area}
          >
            <h3>{group.title}</h3>
            <p>{group.copy}</p>
            <ul>
              {group.bullets.map((bullet) => (
                <li key={bullet}>
                  <Check className="positive-icon size-4" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
