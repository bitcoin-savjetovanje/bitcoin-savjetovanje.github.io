import { ArrowUpRight, CalendarDays, Check, ShieldCheck } from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import {
  audiencePages,
  audiencePagesBySlug,
  audienceSafetyBoundaries,
  type AudienceHeroVisual,
  type AudiencePage as AudiencePageContent,
  type AudienceSlug,
} from "@/content/audiences"
import { SITE_URL } from "@/content/site"

const heroVisuals: Record<
  AudienceHeroVisual,
  {
    src: string
    webpSrc: string
    alt: string
    className: string
  }
> = {
  personal: {
    src: "/images/audiences/osobno-hero.png",
    webpSrc: "/images/audiences/osobno-hero.webp",
    alt: "Mediteranski stol s bilježnicom, Bitcoin kovanicom i osobnim financijskim simbolima.",
    className: "audience-hero__image--personal",
  },
  family: {
    src: "/images/audiences/obitelj-hero.png",
    webpSrc: "/images/audiences/obitelj-hero.webp",
    alt: "Par za stolom pregledava obiteljska pravila uz trezor, ključeve i Bitcoin kovanicu.",
    className: "audience-hero__image--family",
  },
  business: {
    src: "/images/audiences/poduzetnici-hero.png",
    webpSrc: "/images/audiences/poduzetnici-hero.webp",
    alt: "Mediteranski radni stol s poslovnim dokumentima, ladicama obveza i Bitcoin kovanicom.",
    className: "audience-hero__image--business",
  },
}

const audienceOgImageFileBySlug: Record<AudienceSlug, string> = {
  osobno: "osobno-hero.png",
  obitelj: "obitelj-hero.png",
  poduzetnici: "poduzetnici-hero.png",
}

function AudienceHero({ page }: { page: AudiencePageContent }) {
  const visual = heroVisuals[page.heroVisual]

  return (
    <header className="service-hero audience-hero hero-section editorial-section">
      <div className="hero-shell">
        <div className="hero-copy service-hero__content">
          <p className="hero-eyebrow">{page.eyebrow}</p>
          <h1 className="hero-title">{page.title}</h1>
          <p className="hero-subtitle service-hero__lead">{page.subtitle}</p>
          <p className="service-hero__note">{page.trustNote}</p>
          <div className="service-hero__actions">
            <Button asChild className="cta-primary home-primary-button">
              <a
                href={page.primaryCta.href}
                className="justify-center text-center"
                data-cta={`audience-${page.slug}-primary`}
              >
                <CalendarDays className="size-4" aria-hidden="true" />
                {page.primaryCta.label}
              </a>
            </Button>
            {page.secondaryCta ? (
              <a
                href={page.secondaryCta.href}
                className="service-link-button"
                data-link={`audience-${page.slug}-secondary`}
              >
                {page.secondaryCta.label}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>

        <aside
          className="hero-image-frame service-hero__visual audience-hero__visual"
          aria-label={page.title}
        >
          <picture className="service-hero__picture audience-hero__picture">
            <source srcSet={visual.webpSrc} type="image/webp" />
            <img
              className={`service-hero__image audience-hero__image ${visual.className}`}
              src={visual.src}
              alt={visual.alt}
              width="1672"
              height="941"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        </aside>
      </div>
    </header>
  )
}

function CardGrid({
  items,
  variant,
}: {
  items: AudiencePageContent["problems"] | AudiencePageContent["outcomes"]
  variant: "problems" | "outcomes"
}) {
  return (
    <div
      className={`audience-card-grid audience-card-grid--${variant}`}
      data-audience-grid={variant}
    >
      {items.map((item) => (
        <article key={item.title} className="audience-card">
          {variant === "outcomes" ? (
            <Check className="audience-card__icon positive-icon" />
          ) : null}
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  )
}

function GuideLinks({ page }: { page: AudiencePageContent }) {
  return (
    <div className="audience-guide-grid">
      {page.guideLinks.map((link) => (
        <a
          key={`${link.href}-${link.label}`}
          href={link.href}
          className="audience-guide-link"
          data-link={`audience-${page.slug}-guide`}
        >
          <span>{link.label}</span>
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}

function CrossLinks({ page }: { page: AudiencePageContent }) {
  const relatedPages = audiencePages.filter(
    (relatedPage) => relatedPage.slug !== page.slug
  )

  return (
    <div className="audience-crosslinks">
      <p>Drugi konteksti</p>
      <div>
        {relatedPages.map((relatedPage) => (
          <a
            key={relatedPage.slug}
            href={relatedPage.path}
            data-link={`audience-${page.slug}-crosslink`}
          >
            {relatedPage.eyebrow}
          </a>
        ))}
      </div>
    </div>
  )
}

export function AudiencePage({ slug }: { slug: AudienceSlug }) {
  const page = audiencePagesBySlug[slug]
  const canonical = `${SITE_URL}${page.path}`
  const ogImage = `${SITE_URL}/images/audiences/${audienceOgImageFileBySlug[slug]}`

  return (
    <>
      <Seo
        title={page.seo.title}
        description={page.seo.description}
        canonical={canonical}
        ogImage={ogImage}
        ogImageWidth={1672}
        ogImageHeight={941}
      />
      <article className={`service-page audience-page audience-page--${slug}`}>
        <AudienceHero page={page} />

        <div className="service-page__inner audience-page__inner">
          <section className="service-section audience-section">
            <div className="service-section__header">
              <p className="service-eyebrow">Problem</p>
              <h2>{page.problemTitle}</h2>
            </div>
            <CardGrid items={page.problems} variant="problems" />
          </section>

          <section className="service-section service-section--warm audience-section">
            <div className="service-section__header">
              <p className="service-eyebrow">Ishod</p>
              <h2>{page.outcomeTitle}</h2>
            </div>
            <CardGrid items={page.outcomes} variant="outcomes" />
          </section>

          <section className="service-section audience-section">
            <div className="service-section__header">
              <p className="service-eyebrow">Metoda</p>
              <h2>{page.methodTitle}</h2>
            </div>
            <ol className="audience-method-list">
              {page.methodSteps.map((step, index) => (
                <li key={step.title} className="audience-method-step">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="service-section audience-section audience-guides-section">
            <div className="service-section__header">
              <p className="service-eyebrow">Vodiči</p>
              <h2>Za dublje čitanje</h2>
              <p>
                Ovi vodiči proširuju okvir stranice i vode prema postojećim
                dijelovima osobnog Bitcoin standarda.
              </p>
            </div>
            <GuideLinks page={page} />
          </section>

          <section className="service-section audience-section">
            <div className="service-final-cta audience-final-cta">
              <div>
                <p className="service-eyebrow">Sljedeći korak</p>
                <h2>Odaberite kontekst i krenite od razgovora.</h2>
                <p>
                  U uvodnom razgovoru ne pokušavamo riješiti sve. Provjeravamo
                  koji je prvi razuman korak za vaš osobni, obiteljski ili
                  poslovni okvir.
                </p>
              </div>
              <ul className="service-cta-list">
                <li>
                  <Button asChild className="cta-primary home-primary-button">
                    <a
                      href={page.primaryCta.href}
                      className="justify-center text-center"
                      data-cta={`audience-${page.slug}-final`}
                    >
                      <CalendarDays className="size-4" aria-hidden="true" />
                      {page.primaryCta.label}
                    </a>
                  </Button>
                </li>
              </ul>
            </div>

            <div className="audience-boundaries">
              <ShieldCheck className="audience-boundaries__icon" />
              <div>
                <h2>Granice rada</h2>
                <p>{page.trustNote}</p>
                <ul>
                  {audienceSafetyBoundaries.map((boundary) => (
                    <li key={boundary}>{boundary}</li>
                  ))}
                </ul>
              </div>
            </div>

            <CrossLinks page={page} />
          </section>
        </div>
      </article>
    </>
  )
}
