import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BITCOIN_ADVICE_PATH } from "@/content/site"

const bookItems = [
  "Uskoro dostupno u pretprodaji",
  "Radna bilježnica uz svako poglavlje",
  "Bez tehničkog žargona, fokus na život",
]

function BookCoverVisual() {
  return (
    <figure className="book-cover-visual">
      <picture>
        <source
          srcSet="/images/bitcoin-kao-novac-cover.webp"
          type="image/webp"
        />
        <img
          src="/images/bitcoin-kao-novac-cover.jpg"
          alt="Cover knjige Bitcoin kao novac"
          width="1024"
          height="1535"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <span>USKORO</span>
    </figure>
  )
}

export function AboutBookSection() {
  return (
    <section className="editorial-section about-book-section">
      <article id="o-meni" className="about-editorial-card">
        <div className="about-editorial-copy">
          <p className="section-eyebrow">O meni</p>
          <h2>Pavao Pahljina</h2>
          <p>
            Pomažem pojedincima, obiteljima i poduzetnicima urediti sustav
            odluka u kojem Bitcoin ima ulogu novca.
          </p>
          <p>
            Ne dajem financijske savjete niti upravljam sredstvima. Radim s
            principima, procesima i disciplinom koja traje.
          </p>
          <Button asChild variant="outline" className="home-outline-button">
            <a href={BITCOIN_ADVICE_PATH} data-link="about-more">
              Saznajte više o meni
            </a>
          </Button>
        </div>
        <img
          src="/pavao-pahljina.jpg"
          alt="Pavao Pahljina"
          width="640"
          height="640"
          decoding="async"
        />
      </article>

      <article id="knjiga" className="book-editorial-card">
        <div className="book-editorial-copy">
          <p className="section-eyebrow">Knjiga u nastajanju</p>
          <h2>
            Bitcoin kao novac:
            <br />
            Praktični vodič
          </h2>
          <p>
            Knjiga koja povezuje bezvremenske principe novca s praktičnim
            koracima za svakodnevni život.
          </p>
          <ul>
            {bookItems.map((item) => (
              <li key={item}>
                <Check className="size-3.5" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <BookCoverVisual />
      </article>
    </section>
  )
}
