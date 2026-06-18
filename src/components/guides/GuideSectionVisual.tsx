import type { ReactNode } from "react"

import type { GuideSectionVisual as GuideSectionVisualContent } from "@/content/guides"

type GuideSectionVisualProps = {
  visual: GuideSectionVisualContent
}

function ExternalLink({
  href,
  children,
  className,
}: {
  href?: string
  children: ReactNode
  className?: string
}) {
  if (!href) {
    return <div className={className}>{children}</div>
  }

  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

export function GuideSectionVisual({ visual }: GuideSectionVisualProps) {
  if (visual.type === "image-card") {
    return (
      <figure
        className={`guide-section-visual guide-section-visual--image ${
          visual.variant === "full-width"
            ? "guide-section-visual--image-full"
            : ""
        }`}
      >
        <ExternalLink href={visual.href} className="guide-section-image-link">
          <img src={visual.src} alt={visual.alt} loading="lazy" />
        </ExternalLink>
        <figcaption>
          <span>{visual.title}</span>
          {visual.caption}
          {visual.credit ? <small>{visual.credit}</small> : null}
        </figcaption>
      </figure>
    )
  }

  if (visual.type === "image-grid") {
    return (
      <aside
        className="guide-section-visual guide-section-visual--products"
        aria-label={visual.title}
      >
        <div className="guide-section-visual__header">
          <h3>{visual.title}</h3>
          {visual.caption ? <p>{visual.caption}</p> : null}
        </div>
        <div className="guide-product-grid">
          {visual.items.map((item) => (
            <ExternalLink
              key={item.name}
              href={item.href}
              className="guide-product-card"
            >
              <span className="guide-product-card__image">
                <img src={item.src} alt={item.alt} loading="lazy" />
              </span>
              <span className="guide-product-card__body">
                <span className="guide-product-card__name">{item.name}</span>
                {item.description ? (
                  <span className="guide-product-card__description">
                    {item.description}
                  </span>
                ) : null}
                {item.credit ? (
                  <span className="guide-product-card__credit">
                    {item.credit}
                  </span>
                ) : null}
              </span>
            </ExternalLink>
          ))}
        </div>
      </aside>
    )
  }

  return (
    <aside className="guide-section-visual" aria-label={visual.title}>
      <div className="guide-section-visual__header">
        <h3>{visual.title}</h3>
        {visual.caption ? <p>{visual.caption}</p> : null}
      </div>
      <div className="guide-logo-grid">
        {visual.items.map((item) => (
          <ExternalLink
            key={item.name}
            href={item.href}
            className="guide-logo-card"
          >
            <span
              className={`guide-logo-card__mark ${
                item.variant === "wordmark"
                  ? "guide-logo-card__mark--wordmark"
                  : ""
              }`}
            >
              <img src={item.src} alt={item.alt} loading="lazy" />
            </span>
            <span className="guide-logo-card__body">
              <span className="guide-logo-card__name">{item.name}</span>
              {item.description ? (
                <span className="guide-logo-card__description">
                  {item.description}
                </span>
              ) : null}
              {item.credit ? (
                <span className="guide-logo-card__credit">{item.credit}</span>
              ) : null}
            </span>
          </ExternalLink>
        ))}
      </div>
    </aside>
  )
}
