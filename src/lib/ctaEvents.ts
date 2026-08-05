const CTA_CLICK_EVENT_NAME = "bitcoin-savjetovanje:cta-click"
const INTERACTION_EVENT_NAME = "bitcoin-savjetovanje:interaction"

export const ctaEventRegistry = {
  "pavao-hero-approach": { kind: "cta", surface: "pavao-pahljina" },
  "pavao-hero-conversation": { kind: "cta", surface: "pavao-pahljina" },
  "pavao-situations-consultation": {
    kind: "link",
    surface: "pavao-pahljina",
  },
  "pavao-situations-personal-standard": {
    kind: "link",
    surface: "pavao-pahljina",
  },
  "pavao-public-guide": { kind: "link", surface: "pavao-pahljina" },
  "pavao-public-dvadesetjedan": {
    kind: "link",
    surface: "pavao-pahljina",
  },
  "pavao-public-book": { kind: "link", surface: "pavao-pahljina" },
  "pavao-profile-linkedin": { kind: "link", surface: "pavao-pahljina" },
  "pavao-profile-x": { kind: "link", surface: "pavao-pahljina" },
  "pavao-profile-youtube": { kind: "link", surface: "pavao-pahljina" },
  "pavao-profile-github": { kind: "link", surface: "pavao-pahljina" },
  "pavao-final-conversation": { kind: "cta", surface: "pavao-pahljina" },
  "pavao-final-assessment": { kind: "link", surface: "pavao-pahljina" },
  "home-founder-profile": { kind: "link", surface: "homepage" },
  "conversation-founder-profile": { kind: "link", surface: "razgovor" },
  "bitcoin-consultation-founder-profile": {
    kind: "link",
    surface: "bitcoin-konzultacija",
  },
  "personal-standard-founder-profile": {
    kind: "link",
    surface: "osobni-bitcoin-standard",
  },
  "personal-standard-family": {
    kind: "link",
    surface: "osobni-bitcoin-standard",
  },
  "personal-standard-security-approach": {
    kind: "link",
    surface: "osobni-bitcoin-standard",
  },
  "family-hero-conversation": { kind: "cta", surface: "obitelj" },
  "family-hero-security": { kind: "link", surface: "obitelj" },
  "family-layer-guide-03": { kind: "link", surface: "obitelj" },
  "family-layer-guide-04": { kind: "link", surface: "obitelj" },
  "family-sample-standard-document": { kind: "link", surface: "obitelj" },
  "family-sample-standard-full": { kind: "link", surface: "obitelj" },
  "family-service-consultation": { kind: "link", surface: "obitelj" },
  "family-service-personal-standard": { kind: "link", surface: "obitelj" },
  "family-service-security": { kind: "link", surface: "obitelj" },
  "family-custody-security": { kind: "link", surface: "obitelj" },
  "family-founder-profile": { kind: "link", surface: "obitelj" },
  "family-final-conversation": { kind: "cta", surface: "obitelj" },
  "family-final-sample-standard": { kind: "link", surface: "obitelj" },
  "family-sticky-conversation": { kind: "cta", surface: "obitelj" },
  "security-family-framework": { kind: "link", surface: "sigurnost" },
  "security-hero-risk-anchor": { kind: "cta", surface: "sigurnost" },
  "security-hero-conversation": { kind: "cta", surface: "sigurnost" },
  "security-custody-education": { kind: "link", surface: "sigurnost" },
  "security-plan-document": { kind: "link", surface: "sigurnost" },
  "security-sample-standard-full": { kind: "link", surface: "sigurnost" },
  "security-privacy-policy": { kind: "link", surface: "sigurnost" },
  "security-context-personal": { kind: "link", surface: "sigurnost" },
  "security-context-family": { kind: "link", surface: "sigurnost" },
  "security-context-entrepreneurs": { kind: "link", surface: "sigurnost" },
  "security-context-business": { kind: "link", surface: "sigurnost" },
  "security-service-assessment": { kind: "link", surface: "sigurnost" },
  "security-service-consultation": { kind: "link", surface: "sigurnost" },
  "security-service-personal-standard": {
    kind: "link",
    surface: "sigurnost",
  },
  "security-founder-profile": { kind: "link", surface: "sigurnost" },
  "security-final-conversation": { kind: "cta", surface: "sigurnost" },
  "security-final-sample-standard": { kind: "link", surface: "sigurnost" },
  "security-sticky-conversation": { kind: "cta", surface: "sigurnost" },
  "home-hero-assessment": { kind: "cta", surface: "homepage" },
  "home-hero-conversation": { kind: "cta", surface: "homepage" },
  "home-recognition-assessment": { kind: "cta", surface: "homepage" },
  "home-path-missed-bitcoin": { kind: "cta", surface: "homepage" },
  "home-path-assessment": { kind: "cta", surface: "homepage" },
  "home-path-conversation": { kind: "cta", surface: "homepage" },
  "home-assessment-teaser": { kind: "cta", surface: "homepage" },
  "home-all-seven-areas": { kind: "link", surface: "homepage" },
  "home-sample-standard": { kind: "cta", surface: "homepage" },
  "home-process-program": { kind: "link", surface: "homepage" },
  "home-service-intro-call": { kind: "cta", surface: "homepage" },
  "home-service-consultation-call": { kind: "cta", surface: "homepage" },
  "home-service-consultation-details": {
    kind: "link",
    surface: "homepage",
  },
  "home-service-standard-call": { kind: "cta", surface: "homepage" },
  "home-service-standard-details": { kind: "link", surface: "homepage" },
  "home-guide-missed-bitcoin": { kind: "link", surface: "homepage" },
  "home-guide-personal-standard": { kind: "link", surface: "homepage" },
  "home-guide-security": { kind: "link", surface: "homepage" },
  "home-book": { kind: "link", surface: "homepage" },
  "home-business": { kind: "link", surface: "homepage" },
  "home-final-conversation": { kind: "cta", surface: "homepage" },
  "sticky-mobile-standard-check": { kind: "cta", surface: "homepage" },
  "sticky-mobile-intro-call": { kind: "cta", surface: "global" },
  "sticky-mobile-personal-standard-check": {
    kind: "cta",
    surface: "osobno",
  },
  "personal-hero-assessment": { kind: "cta", surface: "osobno" },
  "personal-hero-program": { kind: "link", surface: "osobno" },
  "personal-area-guide": { kind: "link", surface: "osobno" },
  "personal-document-main-rules": { kind: "link", surface: "osobno" },
  "personal-document-ninety-days": { kind: "link", surface: "osobno" },
  "personal-document-stress-review": { kind: "link", surface: "osobno" },
  "personal-sample-document": { kind: "link", surface: "osobno" },
  "personal-service-assessment": { kind: "cta", surface: "osobno" },
  "personal-service-consultation": { kind: "link", surface: "osobno" },
  "personal-service-program": { kind: "link", surface: "osobno" },
  "personal-founder": { kind: "link", surface: "osobno" },
  "personal-final-assessment": { kind: "cta", surface: "osobno" },
  "personal-final-conversation": { kind: "link", surface: "osobno" },
  "hero-intro-call": { kind: "cta", surface: "homepage" },
  "hero-questions": { kind: "cta", surface: "homepage" },
  "hero-standard-assessment": { kind: "cta", surface: "homepage" },
  "home-standard-assessment": { kind: "cta", surface: "homepage" },
  "hero-personal-standard": { kind: "link", surface: "homepage" },
  "home-personal-standard": { kind: "cta", surface: "homepage" },
  "home-program-conversation": { kind: "cta", surface: "homepage" },
  "home-guide-teaser": { kind: "link", surface: "homepage" },
  "home-guides-index": { kind: "link", surface: "homepage" },
  "home-guides-conversation": { kind: "cta", surface: "homepage" },
  "service-intro-call": { kind: "cta", surface: "homepage" },
  "service-consultation-intro-call": { kind: "cta", surface: "homepage" },
  "service-consultation-details": { kind: "link", surface: "homepage" },
  "service-personal-standard-intro-call": {
    kind: "cta",
    surface: "homepage",
  },
  "service-personal-standard-details": {
    kind: "link",
    surface: "homepage",
  },
  "budget-zero-start": { kind: "cta", surface: "proracun" },
  "budget-standard-check": { kind: "cta", surface: "proracun" },
  "debt-standard-check": { kind: "cta", surface: "dug" },
  "giving-standard-check": { kind: "cta", surface: "davanje" },
  "bitcoin-money-standard-check": {
    kind: "cta",
    surface: "bitcoin-kao-novac",
  },
  "bitcoin-money-monthly-flow-anchor": {
    kind: "cta",
    surface: "bitcoin-kao-novac",
  },
  "bitcoin-money-hero-standard-check": {
    kind: "link",
    surface: "bitcoin-kao-novac",
  },
  "bitcoin-money-net-worth": {
    kind: "link",
    surface: "bitcoin-kao-novac",
  },
  "bitcoin-money-written-rules-sample": {
    kind: "link",
    surface: "bitcoin-kao-novac",
  },
  "bitcoin-money-sample-document": {
    kind: "link",
    surface: "bitcoin-kao-novac",
  },
  "bitcoin-money-sample-standard-page": {
    kind: "link",
    surface: "bitcoin-kao-novac",
  },
  "bitcoin-money-guide-bitcoin-kao-novac": {
    kind: "link",
    surface: "bitcoin-kao-novac",
  },
  "bitcoin-money-guide-bitcoin-nije-kripto-portfelj": {
    kind: "link",
    surface: "bitcoin-kao-novac",
  },
  "bitcoin-money-guide-pozitivni-neto-priljev": {
    kind: "link",
    surface: "bitcoin-kao-novac",
  },
  "bitcoin-money-book": {
    kind: "link",
    surface: "bitcoin-kao-novac",
  },
  "bitcoin-money-consultation": {
    kind: "link",
    surface: "bitcoin-kao-novac",
  },
  "bitcoin-money-personal-standard": {
    kind: "link",
    surface: "bitcoin-kao-novac",
  },
  "bitcoin-money-final-standard-check": {
    kind: "cta",
    surface: "bitcoin-kao-novac",
  },
  "bitcoin-money-intro-conversation": {
    kind: "link",
    surface: "bitcoin-kao-novac",
  },
  "bitcoin-money-sticky-standard-check": {
    kind: "cta",
    surface: "bitcoin-kao-novac",
  },
  "net-worth-standard-check": {
    kind: "cta",
    surface: "bitcoin-i-neto-imovina",
  },
  "net-worth-money-spending-capital": {
    kind: "link",
    surface: "bitcoin-i-neto-imovina",
  },
  "time-volatility-standard-check": {
    kind: "cta",
    surface: "bitcoin-vrijeme-i-volatilnost",
  },
  "custody-security-standard-check": {
    kind: "cta",
    surface: "skrbnistvo-i-sigurnost",
  },
  "custody-hero-models-anchor": {
    kind: "cta",
    surface: "skrbnistvo-i-sigurnost",
  },
  "custody-hero-assessment": {
    kind: "link",
    surface: "skrbnistvo-i-sigurnost",
  },
  "custody-plan-document-image": {
    kind: "link",
    surface: "skrbnistvo-i-sigurnost",
  },
  "custody-sample-standard": {
    kind: "link",
    surface: "skrbnistvo-i-sigurnost",
  },
  "custody-context-personal": {
    kind: "link",
    surface: "skrbnistvo-i-sigurnost",
  },
  "custody-context-family": {
    kind: "link",
    surface: "skrbnistvo-i-sigurnost",
  },
  "custody-context-entrepreneurs": {
    kind: "link",
    surface: "skrbnistvo-i-sigurnost",
  },
  "custody-context-business": {
    kind: "link",
    surface: "skrbnistvo-i-sigurnost",
  },
  "custody-guide-01": {
    kind: "link",
    surface: "skrbnistvo-i-sigurnost",
  },
  "custody-guide-02": {
    kind: "link",
    surface: "skrbnistvo-i-sigurnost",
  },
  "custody-guide-03": {
    kind: "link",
    surface: "skrbnistvo-i-sigurnost",
  },
  "custody-next-assessment": {
    kind: "link",
    surface: "skrbnistvo-i-sigurnost",
  },
  "custody-next-consultation": {
    kind: "link",
    surface: "skrbnistvo-i-sigurnost",
  },
  "custody-next-standard": {
    kind: "link",
    surface: "skrbnistvo-i-sigurnost",
  },
  "custody-final-security-conversation": {
    kind: "link",
    surface: "skrbnistvo-i-sigurnost",
  },
  "custody-sticky-assessment": {
    kind: "cta",
    surface: "skrbnistvo-i-sigurnost",
  },
  "custody-security-approach": {
    kind: "link",
    surface: "skrbnistvo-i-sigurnost",
  },
  "custody-security-final-approach": {
    kind: "link",
    surface: "skrbnistvo-i-sigurnost",
  },
  "assessment-start": {
    kind: "cta",
    surface: "provjera-bitcoin-standarda",
  },
  "assessment-complete": {
    kind: "cta",
    surface: "provjera-bitcoin-standarda",
  },
  "assessment-book-call": {
    kind: "cta",
    surface: "provjera-bitcoin-standarda",
  },
  "standard-check-start": {
    kind: "cta",
    surface: "provjera-bitcoin-standarda",
  },
  "assessment-relevant-guide": {
    kind: "link",
    surface: "provjera-bitcoin-standarda",
  },
  "assessment-business-bitcoin": {
    kind: "link",
    surface: "provjera-bitcoin-standarda",
  },
  "topic-standard-check-conversation": {
    kind: "cta",
    surface: "tematske-stranice",
  },
  "information-cost-intro-call": { kind: "cta", surface: "homepage" },
  "information-cost-consultation": { kind: "link", surface: "homepage" },
  "readiness-intro-call": { kind: "cta", surface: "homepage" },
  "readiness-test-intro-call": { kind: "cta", surface: "homepage" },
  "desktop-rail-intro-call": { kind: "cta", surface: "homepage" },
  "desktop-rail-questions": { kind: "cta", surface: "homepage" },
  "final-intro-call": { kind: "cta", surface: "homepage" },
  "call-calendar": { kind: "cta", surface: "razgovor" },
  "call-cal-booking": { kind: "cta", surface: "razgovor" },
  "call-bitcoin-consultation": { kind: "link", surface: "razgovor" },
  "call-security": { kind: "cta", surface: "razgovor" },
  "conversation-page-calendar": { kind: "cta", surface: "razgovor" },
  "conversation-referral-calendar": { kind: "cta", surface: "razgovor" },
  "conversation-inline-calendar-mobile": { kind: "cta", surface: "razgovor" },
  "conversation-page-final-calendar": { kind: "cta", surface: "razgovor" },
  "conversation-mobile-calendar-open": {
    kind: "cta",
    surface: "razgovor",
  },
  "conversation-calendar-fallback": {
    kind: "cta",
    surface: "razgovor",
  },
  "conversation-bitcoin-consultation": { kind: "link", surface: "razgovor" },
  "conversation-personal-standard": { kind: "link", surface: "razgovor" },
  "conversation-standard-check": { kind: "link", surface: "razgovor" },
  "conversation-sample-standard": { kind: "link", surface: "razgovor" },
  "conversation-guides": { kind: "link", surface: "razgovor" },
  "conversation-page-security": { kind: "cta", surface: "razgovor" },
  "conversation-page-final-security": { kind: "cta", surface: "razgovor" },
  "bitcoin-consultation-intro-call": {
    kind: "cta",
    surface: "bitcoin-konzultacija",
  },
  "bitcoin-consultation-final-intro-call": {
    kind: "cta",
    surface: "bitcoin-konzultacija",
  },
  "bitcoin-consultation-personal-audience": {
    kind: "link",
    surface: "bitcoin-konzultacija",
  },
  "bitcoin-consultation-family-audience": {
    kind: "link",
    surface: "bitcoin-konzultacija",
  },
  "bitcoin-consultation-business-audience": {
    kind: "link",
    surface: "bitcoin-konzultacija",
  },
  "bitcoin-consultation-standard-context": {
    kind: "link",
    surface: "bitcoin-konzultacija",
  },
  "bitcoin-consultation-personal-standard": {
    kind: "link",
    surface: "bitcoin-konzultacija",
  },
  "bitcoin-consultation-security": {
    kind: "link",
    surface: "bitcoin-konzultacija",
  },
  "bitcoin-consultation-hero-conversation": {
    kind: "cta",
    surface: "bitcoin-konzultacija",
  },
  "bitcoin-consultation-questions": {
    kind: "link",
    surface: "bitcoin-konzultacija",
  },
  "bitcoin-consultation-early-standard": {
    kind: "link",
    surface: "bitcoin-konzultacija",
  },
  "bitcoin-consultation-summary-example": {
    kind: "link",
    surface: "bitcoin-konzultacija",
  },
  "bitcoin-consultation-pricing-conversation": {
    kind: "cta",
    surface: "bitcoin-konzultacija",
  },
  "bitcoin-consultation-pricing-standard": {
    kind: "link",
    surface: "bitcoin-konzultacija",
  },
  "bitcoin-consultation-final-conversation": {
    kind: "cta",
    surface: "bitcoin-konzultacija",
  },
  "personal-standard-hero-conversation": {
    kind: "cta",
    surface: "osobni-bitcoin-standard",
  },
  "personal-standard-hero-sample": {
    kind: "link",
    surface: "osobni-bitcoin-standard",
  },
  "personal-standard-deliverable-sample": {
    kind: "link",
    surface: "osobni-bitcoin-standard",
  },
  "personal-standard-consultation": {
    kind: "link",
    surface: "osobni-bitcoin-standard",
  },
  "personal-standard-business": {
    kind: "link",
    surface: "osobni-bitcoin-standard",
  },
  "personal-standard-pricing-conversation": {
    kind: "cta",
    surface: "osobni-bitcoin-standard",
  },
  "personal-standard-pricing-sample": {
    kind: "link",
    surface: "osobni-bitcoin-standard",
  },
  "personal-standard-final-conversation": {
    kind: "cta",
    surface: "osobni-bitcoin-standard",
  },
  "sample-standard-hero-pdf": {
    kind: "cta",
    surface: "osobni-bitcoin-standard-primjer",
  },
  "sample-standard-hero-program": {
    kind: "link",
    surface: "osobni-bitcoin-standard-primjer",
  },
  "sample-standard-preview-context": {
    kind: "link",
    surface: "osobni-bitcoin-standard-primjer",
  },
  "sample-standard-preview-decisions": {
    kind: "link",
    surface: "osobni-bitcoin-standard-primjer",
  },
  "sample-standard-preview-one-page": {
    kind: "link",
    surface: "osobni-bitcoin-standard-primjer",
  },
  "sample-standard-download-pdf": {
    kind: "cta",
    surface: "osobni-bitcoin-standard-primjer",
  },
  "sample-standard-download-program": {
    kind: "link",
    surface: "osobni-bitcoin-standard-primjer",
  },
  "sample-standard-process-program": {
    kind: "link",
    surface: "osobni-bitcoin-standard-primjer",
  },
  "sample-standard-final-program": {
    kind: "cta",
    surface: "osobni-bitcoin-standard-primjer",
  },
  "sample-standard-final-conversation": {
    kind: "link",
    surface: "osobni-bitcoin-standard-primjer",
  },
  "security-intro-call": { kind: "cta", surface: "sigurnost" },
  "security-final-intro-call": { kind: "cta", surface: "sigurnost" },
  "guides-intro-call": { kind: "cta", surface: "vodici" },
  "guides-index-top-intro-call": { kind: "cta", surface: "vodici" },
  "guides-index-intro-call": { kind: "cta", surface: "vodici" },
  "guide-starter-card": { kind: "link", surface: "vodici" },
  "guide-research-card": { kind: "link", surface: "vodici" },
  "guide-sticky-sidebar": { kind: "cta", surface: "vodici" },
  "guide-final-intro-call": { kind: "cta", surface: "vodici" },
  "business-hero-conversation": { kind: "cta", surface: "za-tvrtke" },
  "business-summary-preview": { kind: "link", surface: "za-tvrtke" },
  "business-summary-pdf-download": { kind: "cta", surface: "za-tvrtke" },
  "business-readiness-interest": { kind: "link", surface: "za-tvrtke" },
  "business-employee-education": { kind: "link", surface: "za-tvrtke" },
  "business-employee-education-conversation": {
    kind: "link",
    surface: "za-tvrtke",
  },
  "business-internal-framework": { kind: "link", surface: "za-tvrtke" },
  "business-founder": { kind: "link", surface: "za-tvrtke" },
  "business-regulatory-source": { kind: "link", surface: "za-tvrtke" },
  "business-pricing-conversation": { kind: "cta", surface: "za-tvrtke" },
  "business-email-inquiry": { kind: "link", surface: "za-tvrtke" },
  "business-one-pager-open": { kind: "link", surface: "za-tvrtke" },
  "business-final-conversation": { kind: "cta", surface: "za-tvrtke" },
  "business-entrepreneurs": { kind: "link", surface: "za-tvrtke" },
  "business-custody-context": { kind: "link", surface: "za-tvrtke" },
  "business-one-pager-conversation": {
    kind: "cta",
    surface: "za-tvrtke-one-pager",
  },
  "business-one-pager-main-page": {
    kind: "link",
    surface: "za-tvrtke-one-pager",
  },
  "business-one-pager-founder": {
    kind: "link",
    surface: "za-tvrtke-one-pager",
  },
  "business-one-pager-final-conversation": {
    kind: "cta",
    surface: "za-tvrtke-one-pager",
  },
  "conversation-business-briefing": {
    kind: "link",
    surface: "razgovor",
  },
  "conversation-business-one-pager": {
    kind: "link",
    surface: "razgovor",
  },
  "conversation-business-founder": {
    kind: "link",
    surface: "razgovor",
  },
  "conversation-entrepreneur-consultation": {
    kind: "link",
    surface: "razgovor",
  },
  "conversation-entrepreneur-personal-standard": {
    kind: "link",
    surface: "razgovor",
  },
  "conversation-entrepreneur-business-briefing": {
    kind: "link",
    surface: "razgovor",
  },
  "conversation-entrepreneur-revenue-guide": {
    kind: "link",
    surface: "razgovor",
  },
  "conversation-entrepreneur-separation-guide": {
    kind: "link",
    surface: "razgovor",
  },
  "conversation-entrepreneur-page": {
    kind: "link",
    surface: "razgovor",
  },
  "entrepreneurs-hero-conversation": {
    kind: "cta",
    surface: "poduzetnici",
  },
  "entrepreneurs-hero-business": {
    kind: "link",
    surface: "poduzetnici",
  },
  "entrepreneurs-fit-business": {
    kind: "link",
    surface: "poduzetnici",
  },
  "entrepreneurs-money-layer": {
    kind: "link",
    surface: "poduzetnici",
  },
  "entrepreneurs-consultation": {
    kind: "link",
    surface: "poduzetnici",
  },
  "entrepreneurs-personal-standard": {
    kind: "link",
    surface: "poduzetnici",
  },
  "entrepreneurs-business-briefing": {
    kind: "link",
    surface: "poduzetnici",
  },
  "entrepreneurs-custody-context": {
    kind: "link",
    surface: "poduzetnici",
  },
  "entrepreneurs-guide-revenue": {
    kind: "link",
    surface: "poduzetnici",
  },
  "entrepreneurs-guide-separation": {
    kind: "link",
    surface: "poduzetnici",
  },
  "entrepreneurs-guides-all": {
    kind: "link",
    surface: "poduzetnici",
  },
  "entrepreneurs-founder": {
    kind: "link",
    surface: "poduzetnici",
  },
  "entrepreneurs-final-conversation": {
    kind: "cta",
    surface: "poduzetnici",
  },
  "entrepreneurs-final-business": {
    kind: "link",
    surface: "poduzetnici",
  },
  "footer-bitcoin-consultation": { kind: "link", surface: "footer" },
  "footer-standard-check": { kind: "link", surface: "footer" },
  "footer-about": { kind: "link", surface: "footer" },
  "footer-za-tvrtke": { kind: "link", surface: "footer" },
  "footer-bitcoin-today": { kind: "link", surface: "footer" },
  "missed-bitcoin-hero-next-steps": {
    kind: "cta",
    surface: "mogao-sam-kupiti-bitcoin-ranije",
  },
  "missed-bitcoin-hero-conversation": {
    kind: "cta",
    surface: "mogao-sam-kupiti-bitcoin-ranije",
  },
  "missed-bitcoin-beginner-guide": {
    kind: "link",
    surface: "mogao-sam-kupiti-bitcoin-ranije",
  },
  "missed-bitcoin-standard-check": {
    kind: "cta",
    surface: "mogao-sam-kupiti-bitcoin-ranije",
  },
  "missed-bitcoin-conversation": {
    kind: "cta",
    surface: "mogao-sam-kupiti-bitcoin-ranije",
  },
  "missed-bitcoin-home-entry": { kind: "link", surface: "homepage" },
} as const satisfies Record<
  string,
  {
    kind: "cta" | "link"
    surface: string
  }
>

export type CtaEventName = typeof CTA_CLICK_EVENT_NAME
export type KnownCtaId = keyof typeof ctaEventRegistry
export type CtaElementKind = "cta" | "link"

export type CtaClickEventDetail = {
  kind: CtaElementKind
  id: string
  href: string
  path: string
  label: string
}

export type FirstPartyInteractionValue = string | number | boolean

export type FirstPartyInteractionDetail = {
  id: string
  path: string
  metadata: Readonly<Record<string, FirstPartyInteractionValue>>
}

let initialized = false

function normalizeLabel(text: string | null) {
  return text?.replace(/\s+/g, " ").trim().slice(0, 120) ?? ""
}

export function readCtaEventDetail(
  element: Element
): CtaClickEventDetail | null {
  const ctaId = element.getAttribute("data-cta")
  const linkId = element.getAttribute("data-link")
  const id = ctaId ?? linkId

  if (!id || typeof window === "undefined") {
    return null
  }

  return {
    kind: ctaId ? "cta" : "link",
    id,
    href: element instanceof HTMLAnchorElement ? element.href : "",
    path: window.location.pathname,
    label: normalizeLabel(element.textContent),
  }
}

export function initCtaClickEvents() {
  if (initialized || typeof window === "undefined") {
    return
  }

  initialized = true

  // First-party event infrastructure only. This dispatches a browser event and
  // does not transmit data, set cookies, or store anything.
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
      return
    }

    const clickedElement = event.target.closest("[data-cta], [data-link]")

    if (!clickedElement) {
      return
    }

    const detail = readCtaEventDetail(clickedElement)

    if (!detail) {
      return
    }

    window.dispatchEvent(
      new CustomEvent<CtaClickEventDetail>(CTA_CLICK_EVENT_NAME, { detail })
    )

    if (import.meta.env.DEV) {
      console.info(CTA_CLICK_EVENT_NAME, detail)
    }
  })
}

export function trackFirstPartyInteraction(
  id: string,
  metadata: Readonly<Record<string, FirstPartyInteractionValue>> = {}
) {
  if (typeof window === "undefined") {
    return
  }

  const detail: FirstPartyInteractionDetail = {
    id,
    path: window.location.pathname,
    metadata,
  }

  // First-party event infrastructure only. No answer values, cookies or
  // personal financial data are persisted or transmitted here.
  window.dispatchEvent(
    new CustomEvent<FirstPartyInteractionDetail>(INTERACTION_EVENT_NAME, {
      detail,
    })
  )

  if (import.meta.env.DEV) {
    console.info(INTERACTION_EVENT_NAME, detail)
  }
}

export { CTA_CLICK_EVENT_NAME, INTERACTION_EVENT_NAME }
