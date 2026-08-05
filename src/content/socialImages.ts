import { SITE_URL } from "./site"

export type SocialImageMeta = {
  ogImage: string
  ogImageWidth: number
  ogImageHeight: number
}

type SocialImageAsset = {
  path: string
  width: number
  height: number
}

function socialImage({
  path,
  width,
  height,
}: SocialImageAsset): SocialImageMeta {
  return {
    ogImage: `${SITE_URL}${path}`,
    ogImageWidth: width,
    ogImageHeight: height,
  }
}

export const socialImages = {
  default: socialImage({
    path: "/images/home-hero-20260521.jpg",
    width: 1536,
    height: 1024,
  }),
  home: socialImage({
    path: "/images/bitcoin-savjetovanje-system-og-20260723.webp",
    width: 1200,
    height: 630,
  }),
  pavaoPahljina: socialImage({
    path: "/pavao-pahljina.webp",
    width: 800,
    height: 800,
  }),
  guidesIndex: socialImage({
    path: "/images/social/vodici-og-20260623.jpg",
    width: 1200,
    height: 630,
  }),
  budget: socialImage({
    path: "/images/proracun-hero-20260521.jpg",
    width: 1672,
    height: 941,
  }),
  debt: socialImage({
    path: "/images/dug-hero-20260521.jpg",
    width: 1672,
    height: 941,
  }),
  giving: socialImage({
    path: "/images/davanje-hero-20260521.jpg",
    width: 1672,
    height: 941,
  }),
  bitcoinMoney: socialImage({
    path: "/images/bitcoin-primary-money-flow-og-20260724.webp",
    width: 1200,
    height: 630,
  }),
  netWorth: socialImage({
    path: "/images/neto-imovina-hero-20260521.jpg",
    width: 1672,
    height: 941,
  }),
  timeVolatility: socialImage({
    path: "/images/vrijeme-volatilnost-hero-20260521.jpg",
    width: 1672,
    height: 941,
  }),
  custodySecurity: socialImage({
    path: "/images/custody/bitcoin-skrbnistvo-oporavak-og-20260724.webp",
    width: 1200,
    height: 630,
  }),
  bitcoinAdvice: socialImage({
    path: "/images/bitcoin-savjetovanje-hero-20260601.jpg",
    width: 1672,
    height: 941,
  }),
  missedBitcoin: socialImage({
    path: "/images/niste-zakasnili-u-bitcoin-cover-20260625.jpg",
    width: 1774,
    height: 887,
  }),
  businessBitcoin: socialImage({
    path: "/images/guide-sections/bitcoin-etfovi-riznice-tri-odluke-20260701.webp",
    width: 1672,
    height: 941,
  }),
  conversation: socialImage({
    path: "/images/razgovor-hero-20260601.jpg",
    width: 1672,
    height: 941,
  }),
  bitcoinConsultation: socialImage({
    path: "/images/consultation/bitcoin-konzultacija-og-20260723.webp",
    width: 1200,
    height: 630,
  }),
  personalBitcoinStandard: socialImage({
    path: "/images/program/personal-standard-og-20260723.webp",
    width: 1200,
    height: 630,
  }),
  samplePersonalBitcoinStandard: socialImage({
    path: "/images/sample-standard/ogledni-standard-og.webp",
    width: 1200,
    height: 630,
  }),
  bitcoinStandardCheck: socialImage({
    path: "/images/provjera-bitcoin-standarda-og-20260722.webp",
    width: 1200,
    height: 630,
  }),
  security: socialImage({
    path: "/images/security/bitcoin-sigurnost-ravnoteza-og-20260724.webp",
    width: 1200,
    height: 630,
  }),
  privacy: socialImage({
    path: "/images/povjerljivost-hero-20260601.jpg",
    width: 1672,
    height: 941,
  }),
  audiences: {
    osobno: socialImage({
      path: "/images/audiences/osobno-hero.jpg",
      width: 1672,
      height: 941,
    }),
    obitelj: socialImage({
      path: "/images/audiences/obitelj-og-20260724.webp",
      width: 1200,
      height: 630,
    }),
    poduzetnici: socialImage({
      path: "/images/audiences/poduzetnici-slojevi-hero-20260724.jpg",
      width: 1672,
      height: 941,
    }),
  },
} as const

const guideCoverDimensionsByPath: Record<
  string,
  { width: number; height: number }
> = {
  "/images/proracun-hero.jpg": { width: 1672, height: 941 },
  "/images/dug-hero.jpg": { width: 1672, height: 941 },
  "/images/davanje-hero.jpg": { width: 1672, height: 941 },
  "/images/hero-bitcoin-savjetovanje-realistic.jpg": {
    width: 1536,
    height: 1024,
  },
  "/images/neto-imovina-hero.jpg": { width: 1672, height: 941 },
  "/images/vrijeme-volatilnost-hero.jpg": { width: 1672, height: 941 },
  "/images/skrbnistvo-sigurnost-hero.jpg": { width: 1672, height: 941 },
  "/images/guide-svaki-euro-ima-namjenu-cover.jpg": {
    width: 1536,
    height: 1024,
  },
  "/images/stvarni-visak-cover-20260625.png": { width: 1774, height: 887 },
  "/images/dca-nije-dovoljan-cover-20260625.png": {
    width: 1774,
    height: 887,
  },
  "/images/dug-je-buduci-novac-cover-20260625.png": {
    width: 1774,
    height: 887,
  },
  "/images/ne-zaduzujte-se-za-bitcoin-cover-20260625.png": {
    width: 1774,
    height: 887,
  },
  "/images/prihod-nije-slobodan-novac-cover-20260625.png": {
    width: 1774,
    height: 887,
  },
  "/images/starost-novca-cover-20260625.png": {
    width: 1774,
    height: 887,
  },
  "/images/bitcoin-etfovi-i-riznicke-kompanije-cover-20260625.png": {
    width: 1774,
    height: 887,
  },
  "/images/od-duga-prema-vlasnistvu-cover-20260625.png": {
    width: 1774,
    height: 887,
  },
  "/images/stvarni-visak-hero.png": { width: 1774, height: 887 },
  "/images/dca-nije-dovoljan-hero.png": { width: 1774, height: 887 },
  "/images/dug-je-buduci-novac-hero.png": { width: 1774, height: 887 },
  "/images/dug-ili-bitcoin-hero.png": { width: 1774, height: 887 },
  "/images/ne-zaduzujte-se-za-bitcoin-hero.png": {
    width: 1774,
    height: 887,
  },
  "/images/prihod-nije-slobodan-novac-hero-20260603.jpg": {
    width: 1672,
    height: 941,
  },
  "/images/starost-novca-hero-20260603.jpg": {
    width: 1672,
    height: 941,
  },
  "/images/bitcoin-etfovi-riznicke-kompanije-hero-20260603.jpg": {
    width: 1672,
    height: 941,
  },
  "/images/bitcoin-bilanca-pojacana-izlozenost-hero-20260603.jpg": {
    width: 1672,
    height: 941,
  },
  "/images/od-duga-prema-vlasnistvu-hero-20260603.jpg": {
    width: 1672,
    height: 941,
  },
  "/images/guide-bip110/01-naslovna-slika-mediteranski.webp": {
    width: 1672,
    height: 941,
  },
  "/images/vrijeme-volatilnost-hero-20260521.jpg": {
    width: 1672,
    height: 941,
  },
}

export function guideCoverSocialImage(path: string): SocialImageMeta {
  const dimensions = guideCoverDimensionsByPath[path] ?? {
    width: 1200,
    height: 630,
  }

  return socialImage({
    path,
    width: dimensions.width,
    height: dimensions.height,
  })
}
