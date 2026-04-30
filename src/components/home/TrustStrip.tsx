import { trustCards } from "@/content/site"

export function TrustStrip() {
  return (
    <section className="trust-strip" aria-labelledby="trust-strip-heading">
      <h2 id="trust-strip-heading" className="sr-only">
        Kredibilitet
      </h2>
      <div className="mx-auto grid max-w-7xl gap-3 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
        {trustCards.map((item) => (
          <div key={item.title} className="trust-strip__item">
            <h3 className="text-base leading-6 font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {item.copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
