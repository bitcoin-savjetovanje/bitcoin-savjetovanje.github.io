import { Seo } from "@/components/Seo"
import { notFoundRoute } from "@/content/clientRoutes"

export function NotFound() {
  return (
    <section className="section-shell">
      <Seo {...notFoundRoute} />
      <div className="case-panel max-w-3xl">
        <h1 className="font-display text-4xl font-semibold">
          Stranica nije pronađena
        </h1>
        <p className="mt-4 text-base leading-8 text-muted-foreground">
          Provjerite adresu ili se vratite na početnu stranicu.
        </p>
        <a
          href="/"
          className="mt-6 inline-block font-semibold text-foreground hover:text-primary"
        >
          Natrag na početnu
        </a>
      </div>
    </section>
  )
}
