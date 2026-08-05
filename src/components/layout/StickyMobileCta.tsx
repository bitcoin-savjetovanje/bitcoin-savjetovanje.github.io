import { BITCOIN_STANDARD_CHECK_PATH, CONVERSATION_PATH } from "@/content/site"

type StickyMobileCtaProps = {
  visible: boolean
  variant?:
    | "assessment"
    | "bitcoin-money"
    | "conversation"
    | "custody"
    | "family"
    | "personal"
    | "security"
}

const stickyCtaContent = {
  assessment: {
    href: BITCOIN_STANDARD_CHECK_PATH,
    label: "Napravite provjeru",
    dataCta: "sticky-mobile-standard-check",
  },
  "bitcoin-money": {
    href: BITCOIN_STANDARD_CHECK_PATH,
    label: "Provjerite svoj standard",
    dataCta: "bitcoin-money-sticky-standard-check",
  },
  conversation: {
    href: CONVERSATION_PATH,
    label: "Dogovorite razgovor",
    dataCta: "sticky-mobile-intro-call",
  },
  custody: {
    href: BITCOIN_STANDARD_CHECK_PATH,
    label: "Provjerite svoj standard",
    dataCta: "custody-sticky-assessment",
  },
  family: {
    href: `${CONVERSATION_PATH}?tema=obitelj`,
    label: "Obiteljski razgovor",
    dataCta: "family-sticky-conversation",
  },
  personal: {
    href: BITCOIN_STANDARD_CHECK_PATH,
    label: "Provjerite svoj standard",
    dataCta: "sticky-mobile-personal-standard-check",
  },
  security: {
    href: `${CONVERSATION_PATH}?tema=sigurnost`,
    label: "Sigurnosni razgovor",
    dataCta: "security-sticky-conversation",
  },
} as const

export function StickyMobileCta({
  visible,
  variant = "conversation",
}: StickyMobileCtaProps) {
  const content = stickyCtaContent[variant]

  return (
    <div
      className={`sticky-mobile-cta ${visible ? "is-visible" : ""} lg:hidden`}
      aria-hidden={!visible}
      data-variant={variant}
    >
      <a
        href={content.href}
        className="cta-primary flex h-10 min-w-0 items-center justify-center rounded-full px-4 text-center text-xs font-semibold whitespace-nowrap sm:text-sm"
        data-cta={content.dataCta}
        tabIndex={visible ? undefined : -1}
      >
        {content.label}
      </a>
    </div>
  )
}
