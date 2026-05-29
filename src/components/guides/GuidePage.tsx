import { ArrowRight, CalendarDays } from "lucide-react"
import { useEffect, useState } from "react"

import { GuideCoverFigure } from "@/components/guides/GuideCoverFigure"
import { GuideVisual } from "@/components/guides/GuideVisual"
import { GuideMetaBadges } from "@/components/guides/GuideMetaBadges"
import { GuideSectionVisual } from "@/components/guides/GuideSectionVisual"
import { GuideStickyCta } from "@/components/guides/GuideStickyCta"
import { GuideVideoEmbed } from "@/components/guides/GuideVideoEmbed"
import { Button } from "@/components/ui/button"
import { resolveGuideTheme } from "@/content/guideVisuals"
import { findGuide, guideHref, guides, type Guide } from "@/content/guides"
import { CONVERSATION_PATH } from "@/content/site"
import {
  estimateGuideReadingMinutes,
  slugifyHeading,
} from "@/utils/readingTime"
import { renderWithGlossary } from "@/utils/glossary"

export function GuidePage({ guide }: { guide: Guide }) {
  const [readingProgress, setReadingProgress] = useState(0)
  const guideTheme = resolveGuideTheme(guide)
  const relatedGuides = guide.relatedSlugs
    .map((slug) => findGuide(slug))
    .filter((item): item is Guide => Boolean(item))
  const sectionLinks = guide.sections.map((section) => ({
    heading: section.heading,
    id: slugifyHeading(section.heading),
  }))
  const nextGuide = guides.find((item) => item.order > guide.order)

  useEffect(() => {
    function updateProgress() {
      const article = document.querySelector<HTMLElement>(
        "[data-guide-article]"
      )

      if (!article) {
        setReadingProgress(0)
        return
      }

      const start = article.offsetTop
      const end = start + article.offsetHeight - window.innerHeight
      const distance = Math.max(end - start, 1)
      const current = Math.min(Math.max(window.scrollY - start, 0), distance)

      setReadingProgress(Math.round((current / distance) * 100))
    }

    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)
    updateProgress()

    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  }, [])

  return (
    <article
      className="guide-editorial-page"
      data-guide-article
      data-guide-slug={guide.slug}
      data-guide-theme={guideTheme}
    >
      <div className="reading-progress" aria-hidden="true">
        <span style={{ width: `${readingProgress}%` }} />
      </div>
      <nav aria-label="Breadcrumb" className="guide-breadcrumb">
        <ol>
          <li>
            <a href="/">Početna</a>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <a href="/vodici/">Vodiči</a>
          </li>
          <li aria-hidden="true" className="guide-breadcrumb__optional">
            /
          </li>
          <li aria-current="page" className="guide-breadcrumb__optional">
            {guide.title}
          </li>
        </ol>
      </nav>
      <a href="/vodici/" className="guide-back-link">
        Natrag na vodiče
      </a>
      <header className="guide-hero">
        <div className="guide-hero__copy">
          <p className="topic-eyebrow">{guide.category}</p>
          <h1>{guide.title}</h1>
          <p className="guide-hero__reading-time">
            Vrijeme čitanja: {estimateGuideReadingMinutes(guide)} min
          </p>
          <GuideMetaBadges guide={guide} />
          <p className="guide-hero__excerpt">{guide.excerpt}</p>
        </div>
        <GuideCoverFigure guide={guide} />
      </header>
      {guide.freshness === "često se mijenja" ? (
        <section className="guide-info-note">
          <p>
            Napomena: ovaj vodič govori o temi čiji se detalji mogu mijenjati.
            Prije odluke provjerite aktualne uvjete i izvore.
          </p>
        </section>
      ) : null}
      {guide.safetyNote ? (
        <section className="guide-safety-note">
          <p>{guide.safetyNote}</p>
        </section>
      ) : null}
      {guide.video ? <GuideVideoEmbed video={guide.video} /> : null}
      {guide.visual ? <GuideVisual visual={guide.visual} /> : null}
      {sectionLinks.length > 0 ? (
        <nav aria-labelledby="guide-toc-heading" className="guide-toc-card">
          <h2 id="guide-toc-heading">U ovom vodiču</h2>
          <ol>
            {sectionLinks.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.heading}</a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      <div className="guide-layout">
        <div className="min-w-0">
          <div className="space-y-12">
            {guide.sections.map((section) => (
              <section
                key={section.heading}
                id={slugifyHeading(section.heading)}
                className="guide-content-section scroll-mt-24"
              >
                <h2>{section.heading}</h2>
                <div>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{renderWithGlossary(paragraph)}</p>
                  ))}
                  {section.items ? (
                    <ul className="grid gap-2 pl-5">
                      {section.items.map((item) => (
                        <li key={item} className="list-disc pl-1">
                          {renderWithGlossary(item)}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.link ? (
                    <p>
                      {section.link.before}{" "}
                      <a
                        href={section.link.href}
                        className="font-semibold text-foreground underline decoration-primary/40 underline-offset-4 hover:text-primary"
                      >
                        {section.link.label}
                      </a>
                      {section.link.after ? ` ${section.link.after}` : null}
                    </p>
                  ) : null}
                  {section.links ? (
                    <ul className="guide-source-list">
                      {section.links.map((item) => (
                        <li key={item.href}>
                          <a href={item.href}>{item.label}</a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.visual ? (
                    <GuideSectionVisual visual={section.visual} />
                  ) : null}
                </div>
              </section>
            ))}
          </div>
          {guide.practicalQuestion ? (
            <section id="prakticno-pitanje" className="guide-question-card">
              <h2>Praktično pitanje</h2>
              <p>{guide.practicalQuestion}</p>
            </section>
          ) : null}
          {nextGuide ? (
            <section className="guide-next-card">
              <p>Sljedeći vodič u redoslijedu</p>
              <h2>
                <a href={guideHref(nextGuide.slug)} data-link="next-guide">
                  {nextGuide.title}
                </a>
                <ArrowRight
                  className="mt-1 size-5 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
              </h2>
              <p>{nextGuide.excerpt}</p>
            </section>
          ) : null}
          {relatedGuides.length > 0 ? (
            <section className="guide-related-section">
              <h2>Povezani vodiči</h2>
              <p>
                Ako želite nastaviti istim smjerom, krenite od ovih tekstova.
              </p>
              <ul>
                {relatedGuides.map((relatedGuide) => (
                  <li key={relatedGuide.slug}>
                    <article className="guide-related-card">
                      <h3>
                        <a
                          href={guideHref(relatedGuide.slug)}
                          data-link="related-guide"
                        >
                          {relatedGuide.title}
                        </a>
                      </h3>
                      <p>{relatedGuide.excerpt}</p>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {guide.extraCta ? (
            <div className="guide-extra-cta-card">
              <h2>{guide.extraCta.title}</h2>
              <p>{guide.extraCta.text}</p>
              <a href={guide.extraCta.href} data-cta={guide.extraCta.dataCta}>
                {guide.extraCta.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          ) : null}
          <div className="guide-final-cta-card">
            <h2>
              {guide.finalCtaTitle ??
                "Želite ovo primijeniti na svoju situaciju?"}
            </h2>
            <p>
              {guide.finalCtaPrompt ? `${guide.finalCtaPrompt} ` : null}
              Vodič objašnjava okvir. Uvodni razgovor pomaže vidjeti koji dio se
              odnosi na vas.
            </p>
            <Button
              asChild
              className="cta-primary mt-6 w-full rounded-full sm:w-auto"
            >
              <a
                href={CONVERSATION_PATH}
                className="justify-center text-center"
                data-cta="guide-final-intro-call"
              >
                <CalendarDays className="size-4" />
                {guide.finalCta}
              </a>
            </Button>
          </div>
        </div>
        <GuideStickyCta readingProgress={readingProgress} />
      </div>
    </article>
  )
}
