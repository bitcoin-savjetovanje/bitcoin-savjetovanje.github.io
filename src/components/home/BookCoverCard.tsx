export function BookCoverCard() {
  return (
    <figure className="book-cover-shell">
      <div
        className="book-cover-card"
        role="img"
        aria-label="Naslovnica knjige Bitcoin kao novac: Praktični vodič za život s Bitcoinom"
      >
        <div className="book-cover-card__spine" aria-hidden="true" />
        <div className="book-cover-card__content">
          <p className="book-cover-card__kicker">
            Od držanja Bitcoina do uređenog sustava odluka
          </p>
          <div className="book-cover-card__coin" aria-hidden="true">
            ₿
          </div>
          <h2>Bitcoin kao novac</h2>
          <p className="book-cover-card__subtitle">
            Praktični vodič za život s Bitcoinom
          </p>
          <p className="book-cover-card__author">Pavao Pahljina</p>
        </div>
      </div>
      <figcaption className="sr-only">
        Naslovnica knjige Bitcoin kao novac: Praktični vodič za život s
        Bitcoinom
      </figcaption>
    </figure>
  )
}
