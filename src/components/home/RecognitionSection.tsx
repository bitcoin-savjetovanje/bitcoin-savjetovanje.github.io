import { CalendarDays } from "lucide-react"

import { StoneSymbol } from "@/components/home/StoneSymbol"
import { Button } from "@/components/ui/button"
import { CONVERSATION_PATH } from "@/content/site"

const recognitionCards = [
  {
    title: "Novac nije jasno raspoređen.",
    copy: "Ne znate koji je novac stvarno slobodan, što mora ostati za kratke obveze i kada Bitcoin odluka postaje prenapeta.",
    iconSrc: "/images/medallions/02-novac.png",
  },
  {
    title: "Obitelj ili posao nisu usklađeni.",
    copy: "Partner, obitelj ili suradnici ne vide istu sliku. Pravila postoje u glavi, ali nisu zapisana i objašnjena.",
    iconSrc: "/images/medallions/12-proracun-i-plan.png",
  },
  {
    title: "Cijena previše pomiče odluke.",
    copy: "Rast stvara euforiju, pad stvara paniku, a nedostaje pisani okvir koji odluke drži mirnima kroz vrijeme.",
    iconSrc: "/images/medallions/25-ciklusi.png",
  },
]

export function RecognitionSection() {
  return (
    <section className="editorial-section recognition-section">
      <div className="recognition-section__copy">
        <p className="section-eyebrow">PREPOZNAJETE LI SE?</p>
        <h2>Imam Bitcoin, ali nemam pravila.</h2>
        <p>
          Ako Bitcoin više nije samo nešto što držite sa strane, tada trebate
          sustav odluka: za proračun, dug, davanje, neto imovinu, vrijeme i
          sigurnost.
        </p>
      </div>

      <div className="recognition-card-grid">
        {recognitionCards.map((card) => (
          <article className="recognition-card" key={card.title}>
            <StoneSymbol
              imageSrc={card.iconSrc}
              className="stone-symbol--small"
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
