import { CONVERSATION_PATH } from "@/content/site"

type StickyMobileCtaProps = {
  visible: boolean
}

export function StickyMobileCta({ visible }: StickyMobileCtaProps) {
  return (
    <div
      className={`sticky-mobile-cta ${visible ? "is-visible" : ""} lg:hidden`}
      aria-hidden={!visible}
    >
      <a
        href={CONVERSATION_PATH}
        className="cta-primary flex h-11 min-w-0 items-center justify-center rounded-full px-3 text-center text-xs font-semibold whitespace-nowrap sm:text-sm"
        data-cta="sticky-mobile-intro-call"
        tabIndex={visible ? undefined : -1}
      >
        Dogovorite razgovor
      </a>
    </div>
  )
}
