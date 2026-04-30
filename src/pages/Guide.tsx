import { Seo } from "@/components/Seo"
import { GuidePage } from "@/components/guides/GuidePage"
import { findGuide } from "@/content/guides"
import { findGuideRouteMeta } from "@/content/routes"
import { SITE_URL } from "@/content/site"

export function Guide({ slug }: { slug?: string }) {
  const guide = findGuide(slug)

  if (!guide) {
    return (
      <section className="section-shell">
        <Seo
          title="Vodič nije pronađen | Bitcoin Savjetovanje"
          description="Traženi vodič nije pronađen."
          canonical={`${SITE_URL}/vodici/${slug ?? ""}`}
        />
        <div className="case-panel max-w-3xl">
          <h1 className="font-display text-4xl font-semibold">
            Vodič nije pronađen
          </h1>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            Stranica koju tražite ne postoji ili je premještena.
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

  const canonical = `${SITE_URL}/vodici/${guide.slug}`
  const route = findGuideRouteMeta(guide.slug)

  return (
    <>
      <Seo
        title={route?.title ?? `${guide.title} | Bitcoin Savjetovanje`}
        description={route?.description ?? guide.metaDescription}
        canonical={route?.canonical ?? canonical}
        ogType={route?.ogType ?? "article"}
        schema={(route?.schema ?? {}) as object}
      />
      <GuidePage guide={guide} />
    </>
  )
}
