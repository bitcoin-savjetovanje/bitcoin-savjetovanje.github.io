export function BookCoverCard() {
  return (
    <figure className="book-cover-shell">
      <picture>
        <source
          srcSet="/images/bitcoin-kao-novac-cover.webp"
          type="image/webp"
        />
        <img
          className="book-cover-card"
          src="/images/bitcoin-kao-novac-cover.jpg"
          alt="Naslovnica knjige Bitcoin kao novac: Praktični vodič za život s Bitcoinom"
          width="1024"
          height="1536"
          decoding="async"
        />
      </picture>
      <figcaption className="sr-only">
        Naslovnica knjige Bitcoin kao novac: Praktični vodič za život s
        Bitcoinom
      </figcaption>
    </figure>
  )
}
