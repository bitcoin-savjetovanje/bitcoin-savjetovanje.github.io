import { SectionHeader } from "@/components/layout/SectionHeader"
import { frameworkAreas } from "@/content/home"

export function FrameworkSection() {
  return (
    <section id="okvir" className="section-shell section-muted">
      <SectionHeader
        title="Okvir iz knjige: 7 područja koja treba urediti"
        copy="Bitcoin kao novac nije samo odluka o kupnji. Okvir prvo uvodi red u novac, dug i davanje, a zatim u Bitcoin, neto imovinu, vrijeme i sigurnost."
      />

      <div
        className="framework-card-grid framework-card-grid--compact"
        aria-label="Mapa osobnog Bitcoin standarda"
      >
        {frameworkAreas.map((area, index) => (
          <article
            key={area.title}
            className="framework-area-card"
            data-area={area.area}
          >
            <span className="framework-card-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{area.title}</h3>
            <p className="framework-area-card__idea">{area.idea}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
