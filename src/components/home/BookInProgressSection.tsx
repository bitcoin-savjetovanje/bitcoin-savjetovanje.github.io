import { Check } from "lucide-react"

import { BookCoverCard } from "@/components/home/BookCoverCard"

const bookBullets = [
  "Od držanja Bitcoina do uređenog sustava odluka",
  "Radna bilježnica uz svako poglavlje",
  "Bez tehničkog žargona, fokus na život, obitelj i posao",
]

export function BookInProgressSection() {
  return (
    <section id="knjiga" className="section-shell book-progress-section">
      <div className="book-progress-copy">
        <p className="section-kicker">Knjiga u nastajanju</p>
        <h2>Bitcoin kao novac: Praktični vodič za život s Bitcoinom</h2>
        <p>
          Knjiga koja povezuje bezvremenske principe novca s praktičnim koracima
          za svakodnevni život.
        </p>
        <ul>
          {bookBullets.map((item) => (
            <li key={item}>
              <Check className="size-4" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="book-progress-visual">
        <span>U nastajanju</span>
        <BookCoverCard />
      </div>
    </section>
  )
}
