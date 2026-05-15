export function BookCoverCard() {
  return (
    <figure className="book-cover-shell">
      <img
        className="book-cover-card"
        src="/bitcoin-kao-novac-cover.png"
        alt="Naslovnica knjige Bitcoin kao novac: Praktični vodič za život s Bitcoinom"
        width="1024"
        height="1536"
        decoding="async"
      />
      <figcaption className="sr-only">
        Naslovnica knjige Bitcoin kao novac: Praktični vodič za život s
        Bitcoinom
      </figcaption>
    </figure>
  )
}
