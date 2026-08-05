import {
  BITCOIN_ADVICE_PATH,
  BITCOIN_CONSULTATION_PATH,
  BITCOIN_MONEY_PATH,
  BITCOIN_STANDARD_CHECK_PATH,
  BITCOIN_TODAY_PATH,
  BUDGET_PATH,
  BUDGET_ZERO_PATH,
  BUSINESS_BITCOIN_PATH,
  BUSINESS_BITCOIN_ONE_PAGER_PATH,
  CONVERSATION_PATH,
  CUSTODY_SECURITY_PATH,
  DEBT_PATH,
  GIVING_PATH,
  MISSED_BITCOIN_PATH,
  NET_WORTH_PATH,
  PAVAO_PAHLJINA_PATH,
  PERSONAL_BITCOIN_STANDARD_PATH,
  PRIVACY_PATH,
  SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH,
  SITE_UPDATED_AT,
  SITE_URL,
  TIME_VOLATILITY_PATH,
  LONG_TERM_TREND_PATH,
  bitcoinAdviceSeo,
  bitcoinConsultationSeo,
  bitcoinMoneySeo,
  bitcoinStandardCheckSeo,
  bitcoinTodaySeo,
  budgetSeo,
  budgetZeroSeo,
  businessBitcoinSeo,
  businessBitcoinOnePagerSeo,
  conversationSeo,
  custodySecuritySeo,
  debtSeo,
  givingSeo,
  guidesIndexSeo,
  homeSeo,
  missedBitcoinSeo,
  netWorthSeo,
  personalBitcoinStandardSeo,
  pavaoPahljinaSeo,
  privacySeo,
  samplePersonalBitcoinStandardSeo,
  securitySeo,
  timeVolatilitySeo,
  longTermTrendSeo,
} from "./site"
import { type SocialImageMeta, socialImages } from "./socialImages"

export type ClientRouteType =
  | "home"
  | "pavao-pahljina"
  | "budget"
  | "budget-zero"
  | "debt"
  | "giving"
  | "bitcoin-money"
  | "net-worth"
  | "time-volatility"
  | "long-term-trend"
  | "bitcoin-today"
  | "custody-security"
  | "bitcoin-advice"
  | "missed-bitcoin"
  | "business-bitcoin"
  | "business-bitcoin-one-pager"
  | "conversation"
  | "bitcoin-consultation"
  | "personal-bitcoin-standard"
  | "sample-personal-bitcoin-standard"
  | "bitcoin-standard-check"
  | "guides-index"
  | "security"
  | "privacy"
  | "not-found"

export type ClientRouteMeta = {
  path: string
  title: string
  description: string
  canonical: string
  type: ClientRouteType
  lastmod: string
  ogType: "website" | "article"
  ogImage: string
  ogImageWidth: number
  ogImageHeight: number
  schema?: object
}

function clientRoute({
  path,
  title,
  description,
  canonical,
  type,
  ogImage,
  ogImageWidth,
  ogImageHeight,
}: {
  path: string
  title: string
  description: string
  canonical: string
  type: ClientRouteType
} & SocialImageMeta): ClientRouteMeta {
  return {
    path,
    title,
    description,
    canonical,
    type,
    lastmod: SITE_UPDATED_AT,
    ogType: "website",
    ogImage,
    ogImageWidth,
    ogImageHeight,
  }
}

export const homeRoute = clientRoute({
  path: "/",
  title: homeSeo.title,
  description: homeSeo.description,
  canonical: `${SITE_URL}/`,
  type: "home",
  ...socialImages.home,
})

export const pavaoPahljinaRoute = clientRoute({
  path: PAVAO_PAHLJINA_PATH,
  title: pavaoPahljinaSeo.title,
  description: pavaoPahljinaSeo.description,
  canonical: pavaoPahljinaSeo.canonical,
  type: "pavao-pahljina",
  ...socialImages.pavaoPahljina,
})

export const guidesIndexRoute = clientRoute({
  path: "/vodici/",
  title: guidesIndexSeo.title,
  description: guidesIndexSeo.description,
  canonical: guidesIndexSeo.canonical,
  type: "guides-index",
  ...socialImages.guidesIndex,
})

export const budgetRoute = clientRoute({
  path: BUDGET_PATH,
  title: budgetSeo.title,
  description: budgetSeo.description,
  canonical: budgetSeo.canonical,
  type: "budget",
  ...socialImages.budget,
})

export const budgetZeroRoute = clientRoute({
  path: BUDGET_ZERO_PATH,
  title: budgetZeroSeo.title,
  description: budgetZeroSeo.description,
  canonical: budgetZeroSeo.canonical,
  type: "budget-zero",
  ...socialImages.budget,
})

export const debtRoute = clientRoute({
  path: DEBT_PATH,
  title: debtSeo.title,
  description: debtSeo.description,
  canonical: debtSeo.canonical,
  type: "debt",
  ...socialImages.debt,
})

export const givingRoute = clientRoute({
  path: GIVING_PATH,
  title: givingSeo.title,
  description: givingSeo.description,
  canonical: givingSeo.canonical,
  type: "giving",
  ...socialImages.giving,
})

export const bitcoinMoneyRoute = clientRoute({
  path: BITCOIN_MONEY_PATH,
  title: bitcoinMoneySeo.title,
  description: bitcoinMoneySeo.description,
  canonical: bitcoinMoneySeo.canonical,
  type: "bitcoin-money",
  ...socialImages.bitcoinMoney,
})

export const netWorthRoute = clientRoute({
  path: NET_WORTH_PATH,
  title: netWorthSeo.title,
  description: netWorthSeo.description,
  canonical: netWorthSeo.canonical,
  type: "net-worth",
  ...socialImages.netWorth,
})

export const timeVolatilityRoute = clientRoute({
  path: TIME_VOLATILITY_PATH,
  title: timeVolatilitySeo.title,
  description: timeVolatilitySeo.description,
  canonical: timeVolatilitySeo.canonical,
  type: "time-volatility",
  ...socialImages.timeVolatility,
})

export const longTermTrendRoute = clientRoute({
  path: LONG_TERM_TREND_PATH,
  title: longTermTrendSeo.title,
  description: longTermTrendSeo.description,
  canonical: longTermTrendSeo.canonical,
  type: "long-term-trend",
  ...socialImages.timeVolatility,
})

export const bitcoinTodayRoute = clientRoute({
  path: BITCOIN_TODAY_PATH,
  title: bitcoinTodaySeo.title,
  description: bitcoinTodaySeo.description,
  canonical: bitcoinTodaySeo.canonical,
  type: "bitcoin-today",
  ...socialImages.timeVolatility,
})

export const custodySecurityRoute = clientRoute({
  path: CUSTODY_SECURITY_PATH,
  title: custodySecuritySeo.title,
  description: custodySecuritySeo.description,
  canonical: custodySecuritySeo.canonical,
  type: "custody-security",
  ...socialImages.custodySecurity,
})

export const bitcoinAdviceRoute = clientRoute({
  path: BITCOIN_ADVICE_PATH,
  title: bitcoinAdviceSeo.title,
  description: bitcoinAdviceSeo.description,
  canonical: bitcoinAdviceSeo.canonical,
  type: "bitcoin-advice",
  ...socialImages.bitcoinAdvice,
})

export const missedBitcoinRoute = clientRoute({
  path: MISSED_BITCOIN_PATH,
  title: missedBitcoinSeo.title,
  description: missedBitcoinSeo.description,
  canonical: missedBitcoinSeo.canonical,
  type: "missed-bitcoin",
  ...socialImages.missedBitcoin,
})

export const businessBitcoinRoute = clientRoute({
  path: BUSINESS_BITCOIN_PATH,
  title: businessBitcoinSeo.title,
  description: businessBitcoinSeo.description,
  canonical: businessBitcoinSeo.canonical,
  type: "business-bitcoin",
  ...socialImages.businessBitcoin,
})

export const businessBitcoinOnePagerRoute = clientRoute({
  path: BUSINESS_BITCOIN_ONE_PAGER_PATH,
  title: businessBitcoinOnePagerSeo.title,
  description: businessBitcoinOnePagerSeo.description,
  canonical: businessBitcoinOnePagerSeo.canonical,
  type: "business-bitcoin-one-pager",
  ...socialImages.businessBitcoin,
})

export const conversationRoute = clientRoute({
  path: CONVERSATION_PATH,
  title: conversationSeo.title,
  description: conversationSeo.description,
  canonical: conversationSeo.canonical,
  type: "conversation",
  ...socialImages.conversation,
})

export const bitcoinConsultationRoute = clientRoute({
  path: BITCOIN_CONSULTATION_PATH,
  title: bitcoinConsultationSeo.title,
  description: bitcoinConsultationSeo.description,
  canonical: bitcoinConsultationSeo.canonical,
  type: "bitcoin-consultation",
  ...socialImages.bitcoinConsultation,
})

export const personalBitcoinStandardRoute = clientRoute({
  path: PERSONAL_BITCOIN_STANDARD_PATH,
  title: personalBitcoinStandardSeo.title,
  description: personalBitcoinStandardSeo.description,
  canonical: personalBitcoinStandardSeo.canonical,
  type: "personal-bitcoin-standard",
  ...socialImages.personalBitcoinStandard,
})

export const samplePersonalBitcoinStandardRoute = clientRoute({
  path: SAMPLE_PERSONAL_BITCOIN_STANDARD_PATH,
  title: samplePersonalBitcoinStandardSeo.title,
  description: samplePersonalBitcoinStandardSeo.description,
  canonical: samplePersonalBitcoinStandardSeo.canonical,
  type: "sample-personal-bitcoin-standard",
  ...socialImages.samplePersonalBitcoinStandard,
})

export const bitcoinStandardCheckRoute = clientRoute({
  path: BITCOIN_STANDARD_CHECK_PATH,
  title: bitcoinStandardCheckSeo.title,
  description: bitcoinStandardCheckSeo.description,
  canonical: bitcoinStandardCheckSeo.canonical,
  type: "bitcoin-standard-check",
  ...socialImages.bitcoinStandardCheck,
})

export const securityRoute = clientRoute({
  path: "/sigurnost/",
  title: securitySeo.title,
  description: securitySeo.description,
  canonical: securitySeo.canonical,
  type: "security",
  ...socialImages.security,
})

export const privacyRoute = clientRoute({
  path: PRIVACY_PATH,
  title: privacySeo.title,
  description: privacySeo.description,
  canonical: privacySeo.canonical,
  type: "privacy",
  ...socialImages.privacy,
})

export const notFoundRoute = clientRoute({
  path: "/404",
  title: "Stranica nije pronađena | Bitcoin Savjetovanje",
  description: "Stranica koju tražite ne postoji.",
  canonical: `${SITE_URL}/404`,
  type: "not-found",
  ...socialImages.default,
})
