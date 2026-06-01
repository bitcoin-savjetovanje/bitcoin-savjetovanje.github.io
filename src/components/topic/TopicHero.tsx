import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"

export type TopicHeroAction = {
  label: string
  href: string
  dataCta?: string
  dataLink?: string
  icon?: ReactNode
  variant?: "primary" | "secondary"
}

export type TopicHeroImage = {
  src: string
  webpSrc?: string
  alt: string
  width?: number
  height?: number
  objectPosition?: string
  className?: string
}

type TopicHeroProps = {
  eyebrow: string
  title: string
  lead: string
  body: string
  image: TopicHeroImage
  actions: TopicHeroAction[]
  className?: string
  theme?:
    | "budget"
    | "debt"
    | "giving"
    | "bitcoin"
    | "worth"
    | "time"
    | "security"
}

export function TopicHero({
  eyebrow,
  title,
  lead,
  body,
  image,
  actions,
  className,
  theme,
}: TopicHeroProps) {
  const classNames = ["topic-hero-v2", className].filter(Boolean).join(" ")

  return (
    <section
      className={`${classNames} hero-section editorial-section`}
      data-topic-theme={theme}
    >
      <div className="hero-shell topic-hero-v2__shell">
        <div className="hero-copy topic-hero-v2__copy">
          <p className="hero-eyebrow topic-hero-v2__eyebrow">{eyebrow}</p>
          <h1 className="hero-title topic-hero-v2__title">{title}</h1>
          <p className="hero-subtitle topic-hero-v2__lead">{lead}</p>
          <p className="topic-hero-v2__body">{body}</p>
          <div className="hero-actions topic-hero-v2__actions">
            {actions.map((action) => {
              const isPrimary = action.variant !== "secondary"

              return (
                <Button
                  asChild
                  className={
                    isPrimary
                      ? "cta-primary home-primary-button"
                      : "home-outline-button"
                  }
                  key={`${action.href}-${action.label}`}
                  size={isPrimary ? "lg" : "default"}
                  variant={isPrimary ? "default" : "outline"}
                >
                  <a
                    href={action.href}
                    data-cta={action.dataCta}
                    data-link={action.dataLink}
                  >
                    {action.icon}
                    {action.label}
                  </a>
                </Button>
              )
            })}
          </div>
        </div>

        <figure className="hero-image-frame topic-hero-v2__media">
          <picture>
            {image.webpSrc ? (
              <source srcSet={image.webpSrc} type="image/webp" />
            ) : null}
            <img
              className={image.className}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              style={
                image.objectPosition
                  ? { objectPosition: image.objectPosition }
                  : undefined
              }
            />
          </picture>
        </figure>
      </div>
    </section>
  )
}
