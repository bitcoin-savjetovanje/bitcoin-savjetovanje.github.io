import { resolveGuideCover } from "@/content/guideVisuals"
import type { Guide } from "@/content/guides"

type GuideCoverFigureProps = {
  guide: Guide
  className?: string
}

export function GuideCoverFigure({ guide, className }: GuideCoverFigureProps) {
  const cover = resolveGuideCover(guide)

  return (
    <figure
      className={["guide-cover-figure", className].filter(Boolean).join(" ")}
    >
      <picture>
        {cover.webpSrc ? (
          <source srcSet={cover.webpSrc} type="image/webp" />
        ) : null}
        <img
          src={cover.src}
          alt={cover.alt}
          style={{ objectPosition: cover.position }}
          loading="lazy"
          decoding="async"
        />
      </picture>
      {cover.caption ? <figcaption>{cover.caption}</figcaption> : null}
    </figure>
  )
}
