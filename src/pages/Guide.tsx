import { Seo } from "@/components/Seo"
import { GuidePage } from "@/components/guides/GuidePage"
import { resolveGuideCover } from "@/content/guideVisuals"
import { findGuide, guideHref } from "@/content/guides"
import { SITE_URL } from "@/content/site"

export function Guide({ slug }: { slug?: string }) {
  const guide = findGuide(slug)
  const missingCanonical = slug
    ? `${SITE_URL}/vodici/${slug}/`
    : `${SITE_URL}/vodici/`

  if (!guide) {
    return (
      <section className="section-shell">
        <Seo
          title="Vodič nije pronađen | Bitcoin Savjetovanje"
          description="Traženi vodič nije pronađen."
          canonical={missingCanonical}
        />
        <div className="case-panel max-w-3xl">
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">
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

  const canonical = `${SITE_URL}${guideHref(guide.slug)}`
  const cover = resolveGuideCover(guide)

  return (
    <>
      <Seo
        title={`${guide.seoTitle ?? guide.title} | Bitcoin Savjetovanje`}
        description={guide.metaDescription}
        canonical={canonical}
        ogTitle={guide.ogTitle ?? guide.title}
        ogDescription={guide.ogDescription ?? guide.metaDescription}
        ogType="article"
        ogImage={`${SITE_URL}${cover.src}`}
        ogImageWidth={1200}
        ogImageHeight={630}
      />
      <GuidePage guide={guide} />
    </>
  )
}
