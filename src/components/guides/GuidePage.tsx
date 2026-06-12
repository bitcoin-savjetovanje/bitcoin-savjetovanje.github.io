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

function linkSecurityProps(href: string) {
  if (/^https?:\/\//.test(href)) {
    return {
      target: "_blank",
      rel: "noopener noreferrer",
    }
  }

  return {}
}

function renderLinkAfter(after?: string) {
  if (!after) {
    return null
  }

  if (/^[.,;:!?)]/.test(after)) {
    return after
  }

  return ` ${after}`
}

export function GuidePage({ guide }: { guide: Guide }) {
  const [readingProgress, setReadingProgress] = useState(0)
  const guideTheme = resolveGuideTheme(guide)
  const relatedGuides = guide.relatedSlugs
    .map((slug) => findGuide(slug))
    .filter((item): item is Guide => Boolean(item))
  const sectionLinks = [
    ...guide.sections
      .filter((section) => !section.hideFromToc)
      .map((section) => ({
        heading: section.heading,
        id: slugifyHeading(section.heading),
      })),
    ...(guide.tocExtraLinks ?? []),
  ]
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
      <header className="guide-hero hero-section editorial-section">
        <div className="hero-shell guide-hero__shell">
          <div className="hero-copy guide-hero__copy">
            <p className="hero-eyebrow">{guide.eyebrow ?? guide.category}</p>
            <h1 className="hero-title">{guide.title}</h1>
            <p className="guide-hero__reading-time">
              Vrijeme čitanja: {estimateGuideReadingMinutes(guide)} min
            </p>
            <GuideMetaBadges guide={guide} />
            <p className="hero-subtitle guide-hero__excerpt">{guide.excerpt}</p>
            {guide.heroPrimaryCta || guide.heroSecondaryCta ? (
              <div className="guide-hero__actions">
                {guide.heroPrimaryCta ? (
                  <Button
                    asChild
                    size="lg"
                    className="cta-primary home-primary-button"
                  >
                    <a
                      href={guide.heroPrimaryCta.href}
                      className="justify-center text-center"
                      data-cta={guide.heroPrimaryCta.dataCta}
                    >
                      <CalendarDays className="size-4" />
                      {guide.heroPrimaryCta.label}
                    </a>
                  </Button>
                ) : null}
                {guide.heroSecondaryCta ? (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="guide-hero__secondary-button"
                  >
                    <a
                      href={guide.heroSecondaryCta.href}
                      className="justify-center text-center"
                      data-cta={guide.heroSecondaryCta.dataCta}
                    >
                      {guide.heroSecondaryCta.label}
                    </a>
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>
          <GuideCoverFigure guide={guide} className="hero-image-frame" />
        </div>
      </header>
      <div className="guide-content-shell">
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
        {guide.intro ? (
          <section className="guide-content-section guide-intro-section">
            <div>
              {guide.intro.map((paragraph) => (
                <p key={paragraph}>{renderWithGlossary(paragraph)}</p>
              ))}
            </div>
          </section>
        ) : null}
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
                    {section.callout ? (
                      <blockquote className="guide-callout">
                        <p>{renderWithGlossary(section.callout)}</p>
                      </blockquote>
                    ) : null}
                    {section.dataCards ? (
                      <div className="guide-data-grid">
                        {section.dataCards.map((item) => (
                          <article className="guide-data-card" key={item.value}>
                            <strong>{item.value}</strong>
                            <span>{renderWithGlossary(item.label)}</span>
                          </article>
                        ))}
                      </div>
                    ) : null}
                    {section.table ? (
                      <div className="guide-table-wrap">
                        <table className="guide-table">
                          <thead>
                            <tr>
                              {section.table.columns.map((column) => (
                                <th key={column} scope="col">
                                  {column}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.table.rows.map((row, rowIndex) => (
                              <tr key={row.join("-")}>
                                {row.map((cell, cellIndex) => (
                                  <td key={`${rowIndex}-${cellIndex}`}>
                                    {renderWithGlossary(cell)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : null}
                    {section.cards ? (
                      <div className="guide-card-grid">
                        {section.cards.map((card) => (
                          <article
                            className="guide-section-card"
                            key={card.title}
                          >
                            <h3>{card.title}</h3>
                            {card.text ? (
                              <p>{renderWithGlossary(card.text)}</p>
                            ) : null}
                          </article>
                        ))}
                      </div>
                    ) : null}
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
                          {...linkSecurityProps(section.link.href)}
                        >
                          {section.link.label}
                        </a>
                        {renderLinkAfter(section.link.after)}
                      </p>
                    ) : null}
                    {section.links ? (
                      <ul className="guide-source-list">
                        {section.links.map((item) => (
                          <li key={item.href}>
                            <a
                              href={item.href}
                              {...linkSecurityProps(item.href)}
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {section.subsections ? (
                      <div className="guide-subsection-list">
                        {section.subsections.map((subsection) => (
                          <section
                            key={subsection.heading}
                            className="guide-subsection"
                          >
                            <h3>{subsection.heading}</h3>
                            {subsection.body.map((paragraph) => (
                              <p key={paragraph}>
                                {renderWithGlossary(paragraph)}
                              </p>
                            ))}
                            {subsection.callout ? (
                              <blockquote className="guide-callout">
                                <p>{renderWithGlossary(subsection.callout)}</p>
                              </blockquote>
                            ) : null}
                            {subsection.table ? (
                              <div className="guide-table-wrap">
                                <table className="guide-table">
                                  <thead>
                                    <tr>
                                      {subsection.table.columns.map(
                                        (column) => (
                                          <th key={column} scope="col">
                                            {column}
                                          </th>
                                        )
                                      )}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {subsection.table.rows.map(
                                      (row, rowIndex) => (
                                        <tr key={row.join("-")}>
                                          {row.map((cell, cellIndex) => (
                                            <td
                                              key={`${rowIndex}-${cellIndex}`}
                                            >
                                              {renderWithGlossary(cell)}
                                            </td>
                                          ))}
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            ) : null}
                            {subsection.cards ? (
                              <div className="guide-card-grid">
                                {subsection.cards.map((card) => (
                                  <article
                                    className="guide-section-card"
                                    key={card.title}
                                  >
                                    <h4>{card.title}</h4>
                                    {card.text ? (
                                      <p>{renderWithGlossary(card.text)}</p>
                                    ) : null}
                                  </article>
                                ))}
                              </div>
                            ) : null}
                            {subsection.items ? (
                              <ul className="grid gap-2 pl-5">
                                {subsection.items.map((item) => (
                                  <li key={item} className="list-disc pl-1">
                                    {renderWithGlossary(item)}
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                            {subsection.link ? (
                              <p>
                                {subsection.link.before}{" "}
                                <a
                                  href={subsection.link.href}
                                  className="font-semibold text-foreground underline decoration-primary/40 underline-offset-4 hover:text-primary"
                                  {...linkSecurityProps(subsection.link.href)}
                                >
                                  {subsection.link.label}
                                </a>
                                {renderLinkAfter(subsection.link.after)}
                              </p>
                            ) : null}
                            {subsection.links ? (
                              <ul className="guide-source-list">
                                {subsection.links.map((item) => (
                                  <li key={item.href}>
                                    <a
                                      href={item.href}
                                      {...linkSecurityProps(item.href)}
                                    >
                                      {item.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </section>
                        ))}
                      </div>
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
            {guide.faq?.length ? (
              <section id="faq" className="guide-faq-section scroll-mt-24">
                <h2>FAQ</h2>
                <div className="guide-faq-list">
                  {guide.faq.map((item) => (
                    <details className="guide-faq-item" key={item.question}>
                      <summary>{item.question}</summary>
                      <p>{renderWithGlossary(item.answer)}</p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}
            {guide.disclaimer ? (
              <section className="guide-disclaimer-note">
                <p>{renderWithGlossary(guide.disclaimer)}</p>
              </section>
            ) : null}
            {guide.extraCta ? (
              <div
                id={guide.extraCta.id}
                className="guide-extra-cta-card scroll-mt-24"
              >
                <h2>{guide.extraCta.title}</h2>
                <p>{guide.extraCta.text}</p>
                {guide.extraCta.items ? (
                  <ul>
                    {guide.extraCta.items.map((item) => (
                      <li key={item}>{renderWithGlossary(item)}</li>
                    ))}
                  </ul>
                ) : null}
                {guide.extraCta.finalText ? (
                  <p>{renderWithGlossary(guide.extraCta.finalText)}</p>
                ) : null}
                <a href={guide.extraCta.href} data-cta={guide.extraCta.dataCta}>
                  {guide.extraCta.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            ) : null}
            {guide.hideDefaultFinalCta ? null : (
              <div className="guide-final-cta-card">
                <h2>
                  {guide.finalCtaTitle ??
                    "Želite ovo primijeniti na svoju situaciju?"}
                </h2>
                <p>
                  {guide.finalCtaPrompt ? `${guide.finalCtaPrompt} ` : null}
                  Vodič objašnjava okvir. Uvodni razgovor pomaže vidjeti koji
                  dio se odnosi na vas.
                </p>
                <div className="guide-final-cta-card__actions">
                  <Button
                    asChild
                    className="cta-primary w-full rounded-full sm:w-auto"
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
                  {guide.finalSecondaryCta ? (
                    <Button
                      asChild
                      variant="outline"
                      className="guide-final-cta-card__secondary w-full rounded-full sm:w-auto"
                    >
                      <a
                        href={guide.finalSecondaryCta.href}
                        className="justify-center text-center"
                        data-cta={guide.finalSecondaryCta.dataCta}
                      >
                        {guide.finalSecondaryCta.label}
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
            )}
          </div>
          <GuideStickyCta readingProgress={readingProgress} />
        </div>
      </div>
    </article>
  )
}
