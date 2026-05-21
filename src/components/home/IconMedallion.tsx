import { type LucideIcon } from "lucide-react"

type IconMedallionProps = {
  Icon?: LucideIcon
  className?: string
  imageSrc?: string
  isBitcoin?: boolean
}

export function IconMedallion({
  Icon,
  className,
  imageSrc,
  isBitcoin = false,
}: IconMedallionProps) {
  return (
    <span
      className={["icon-medallion", className].filter(Boolean).join(" ")}
      data-image={imageSrc ? "true" : undefined}
      aria-hidden="true"
    >
      {imageSrc ? (
        <img className="icon-medallion__image" src={imageSrc} alt="" />
      ) : isBitcoin ? (
        <span className="icon-medallion__bitcoin">₿</span>
      ) : Icon ? (
        <Icon className="icon-medallion__glyph" />
      ) : null}
    </span>
  )
}
