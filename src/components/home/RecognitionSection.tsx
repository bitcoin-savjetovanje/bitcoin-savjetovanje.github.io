import { CalendarDays } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CONVERSATION_PATH } from "@/content/site"

const recognitionCards = [
  {
    title: "Novac nije jasno raspoređen.",
    copy: "Ne znate koji je novac stvarno slobodan, što mora ostati za kratke obveze i kada Bitcoin odluka postaje prenapeta.",
    image: "/images/stone-symbols/problem-money-not-allocated.webp",
  },
  {
    title: "Obitelj ili posao nisu usklađeni.",
    copy: "Partner, obitelj ili suradnici ne vide istu sliku. Pravila postoje u glavi, ali nisu zapisana i objašnjena.",
    image: "/images/stone-symbols/problem-family-business-misaligned.webp",
  },
  {
    title: "Cijena previše pomiče odluke.",
    copy: "Rast stvara euforiju, pad stvara paniku, a nedostaje pisani okvir koji odluke drži mirnima kroz vrijeme.",
    image: "/images/stone-symbols/problem-price-moving-decisions.webp",
  },
]

export function RecognitionSection() {
  return (
    <section className="editorial-section recognition-section">
      <div className="recognition-section__copy">
        <p className="section-eyebrow">PREPOZNAJETE LI SE?</p>
        <h2>Imam Bitcoin, ali nemam pravila.</h2>
        <p>
          Ne znate korak po korak što učiniti s novcem, dugom, viškom, neto
          imovinom, volatilnošću i sigurnošću.
        </p>
      </div>

      <div className="recognition-card-grid">
        {recognitionCards.map((card) => (
          <article className="recognition-card" key={card.title}>
            <img
              className="recognition-stone-image"
              src={card.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
            <h3>{card.title}</h3>
            <p>{card.copy}</p>
          </article>
        ))}
      </div>

      <div className="recognition-section__cta">
        <Button asChild className="cta-primary home-primary-button">
          <a href={CONVERSATION_PATH} data-cta="recognition-intro-call">
            <CalendarDays className="size-4" aria-hidden="true" />
            Razjasnimo prvo usko grlo
          </a>
        </Button>
        <p>
          Ne morate znati koji paket trebate. Uvodni razgovor služi tome da
          vidimo ima li nastavak smisla.
        </p>
      </div>
    </section>
  )
}
