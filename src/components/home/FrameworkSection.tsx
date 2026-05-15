import { ArrowRight } from "lucide-react"

import { SectionHeader } from "@/components/layout/SectionHeader"
import { frameworkApplicationLayers, frameworkAreas } from "@/content/home"

export function FrameworkSection() {
  return (
    <section id="okvir" className="section-shell section-muted">
      <SectionHeader
        title="Okvir iz knjige: 7 područja koja treba urediti"
        copy="Bitcoin kao novac nije samo odluka o kupnji. Ako Bitcoin postaje dio vašeg novčanog života, tada se moraju posložiti i druga pitanja: što novac radi, koji je dug već zauzeo budućnost, koliko možete davati, koji dio vrijednosti treba biti u Bitcoinu, kako gledati volatilnost i tko zna što napraviti ako se vama nešto dogodi."
      />

      <ol className="framework-map" aria-label="Mapa osobnog Bitcoin standarda">
        {frameworkAreas.map((area, index) => (
          <li
            key={area.title}
            className="framework-map__item"
            data-area={area.area}
          >
            <span className="framework-map__number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="framework-map__title">{area.title}</span>
            {index < frameworkAreas.length - 1 ? (
              <ArrowRight className="framework-map__arrow" aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>

      <div className="framework-card-grid">
        {frameworkAreas.map((area, index) => (
          <article
            key={area.title}
            className="framework-area-card"
            data-area={area.area}
          >
            <span className="framework-card-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="framework-area-card__idea">{area.idea}</p>
            <h3>{area.title}</h3>
            <p>{area.copy}</p>
          </article>
        ))}
      </div>

      <div className="framework-application-panel">
        <div>
          <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Primjena okvira
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.015em]">
            Tri razine istog okvira
          </h3>
          <p className="mt-3 max-w-3xl text-base leading-8 text-muted-foreground">
            Isti redoslijed pitanja može uređivati osobni novac, obiteljske
            odluke i poslovnu riznicu. Razlika je u tome tko snosi posljedice i
            koje obveze prvo moraju ostati pokrivene.
          </p>
        </div>
        <div className="framework-application-grid">
          {frameworkApplicationLayers.map((layer) => (
            <article key={layer.title} data-area={layer.area}>
              <span>{layer.title}</span>
              <p>{layer.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
