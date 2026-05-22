import { useEffect, useState, type SyntheticEvent } from "react"

type StoneSymbolVariant =
  | "medallion"
  | "problem"
  | "sculpture"
  | "frieze"
  | "offer"
  | "bottleneck"

type StoneSymbolProps = {
  imageSrc: string
  fallbackSrc?: string
  alt?: string
  className?: string
  decorative?: boolean
  variant?: StoneSymbolVariant
  loading?: "lazy" | "eager"
}

export function StoneSymbol({
  imageSrc,
  fallbackSrc,
  alt,
  className,
  decorative = true,
  variant = "medallion",
  loading = "lazy",
}: StoneSymbolProps) {
  const classes = ["stone-symbol", `stone-symbol--${variant}`, className]
    .filter(Boolean)
    .join(" ")
  const [loadedImageSrc, setLoadedImageSrc] = useState<string>()
  const src = fallbackSrc
    ? loadedImageSrc === imageSrc
      ? imageSrc
      : fallbackSrc
    : imageSrc

  useEffect(() => {
    if (!fallbackSrc || !imageSrc || imageSrc === fallbackSrc) {
      return
    }

    let isCancelled = false
    const nextImage = new Image()

    nextImage.onload = () => {
      if (!isCancelled) {
        setLoadedImageSrc(imageSrc)
      }
    }

    nextImage.onerror = () => {
      if (!isCancelled) {
        setLoadedImageSrc(undefined)
      }
    }

    nextImage.src = imageSrc

    return () => {
      isCancelled = true
    }
  }, [fallbackSrc, imageSrc])

  function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
    const image = event.currentTarget

    if (
      !fallbackSrc ||
      image.dataset.fallbackApplied === "true" ||
      image.getAttribute("src") === fallbackSrc
    ) {
      return
    }

    image.dataset.fallbackApplied = "true"
    image.src = fallbackSrc
    setLoadedImageSrc(undefined)
  }

  return (
    <span
      className={classes}
      aria-hidden={decorative ? "true" : undefined}
      data-decorative={decorative ? "true" : undefined}
    >
      <img
        className="stone-symbol__image"
        src={src}
        alt={decorative ? "" : (alt ?? "")}
        loading={loading}
        decoding="async"
        onError={fallbackSrc ? handleImageError : undefined}
      />
    </span>
  )
}
