type StoneSymbolProps = {
  imageSrc: string
  alt?: string
  className?: string
  decorative?: boolean
}

export function StoneSymbol({
  imageSrc,
  alt,
  className,
  decorative = true,
}: StoneSymbolProps) {
  const classes = ["stone-symbol", className].filter(Boolean).join(" ")

  return (
    <span
      className={classes}
      aria-hidden={decorative ? "true" : undefined}
      data-decorative={decorative ? "true" : undefined}
    >
      <img
        className="stone-symbol__image"
        src={imageSrc}
        alt={decorative ? "" : (alt ?? "")}
        loading="lazy"
        decoding="async"
      />
    </span>
  )
}
