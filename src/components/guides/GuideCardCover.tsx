import { resolveGuideCover } from "@/content/guideVisuals"
import type { Guide } from "@/content/guides"

type GuideCardCoverProps = {
  guide: Guide
  className?: string
}

export function GuideCardCover({
  guide,
  className = "topic-guide-cover",
}: GuideCardCoverProps) {
  const cover = resolveGuideCover(guide)

  return (
    <picture className={className} aria-hidden="true">
      {cover.webpSrc ? (
        <source srcSet={cover.webpSrc} type="image/webp" />
      ) : null}
      <img
        src={cover.src}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ objectPosition: cover.position }}
      />
    </picture>
  )
}
