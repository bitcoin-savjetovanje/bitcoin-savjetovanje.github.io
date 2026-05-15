import { ArrowRight } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { frameworkAreas } from "@/content/home"

export function FrameworkSection() {
  return (
    <section id="okvir" className="section-shell section-muted">
      <SectionHeader
        title="Okvir iz knjige: 7 područja koja treba urediti"
        copy="Bitcoin kao novac nije samo odluka o kupnji. Ako Bitcoin postaje dio vašeg novčanog života, tada se moraju posložiti i druga pitanja: što novac radi, koji je dug već zauzeo budućnost, koliko možete davati, koji dio vrijednosti treba biti u Bitcoinu, kako gledati volatilnost i tko zna što napraviti ako se vama nešto dogodi."
      />

      <ol className="framework-map" aria-label="Mapa osobnog Bitcoin standarda">
        {frameworkAreas.map((area, index) => (
          <li key={area.title} className="framework-map__item">
            <span>{area.title}</span>
            {index < frameworkAreas.length - 1 ? (
              <ArrowRight className="framework-map__arrow" aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>

      <div className="framework-card-grid">
        {frameworkAreas.map((area, index) => (
          <article key={area.title} className="program-card h-full">
            <span className="framework-card-index">{index + 1}</span>
            <h3>{area.title}</h3>
            <p>{area.copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
