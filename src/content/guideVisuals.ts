import type { Guide, GuideCategory, GuideCover, GuideTheme } from "./guides"

type ThemeCoverDefaults = {
  src: string
  webpSrc?: string
  position: string
}

const categoryThemes: Record<GuideCategory, GuideTheme> = {
  "Osobni proračun nulte osnove": "budget",
  "Život bez duga": "debt",
  Davanje: "giving",
  "Bitcoin kao novac": "bitcoin",
  "Neto imovina": "worth",
  "Vrijeme i volatilnost": "time",
  "Sigurnost i obitelj": "security",
}

const timeGuideSlugs = new Set([
  "uskladivanje-kupovne-moci-bitcoina",
  "cijena-kao-mjera-vremena",
  "saylor-bitcoin-ciklus-ponuda-potraznja",
])

const defaultCovers: Record<GuideTheme, ThemeCoverDefaults> = {
  budget: {
    webpSrc: "/images/proracun-hero.webp",
    src: "/images/proracun-hero.jpg",
    position: "50% 58%",
  },
  debt: {
    webpSrc: "/images/dug-hero.webp",
    src: "/images/dug-hero.jpg",
    position: "50% 62%",
  },
  giving: {
    webpSrc: "/images/davanje-hero.webp",
    src: "/images/davanje-hero.jpg",
    position: "50% 60%",
  },
  bitcoin: {
    webpSrc: "/images/hero-bitcoin-savjetovanje-realistic.webp",
    src: "/images/hero-bitcoin-savjetovanje-realistic.jpg",
    position: "56% 52%",
  },
  worth: {
    webpSrc: "/images/neto-imovina-hero.webp",
    src: "/images/neto-imovina-hero.jpg",
    position: "48% 56%",
  },
  time: {
    webpSrc: "/images/vrijeme-volatilnost-hero.webp",
    src: "/images/vrijeme-volatilnost-hero.jpg",
    position: "46% 56%",
  },
  security: {
    webpSrc: "/images/skrbnistvo-sigurnost-hero.webp",
    src: "/images/skrbnistvo-sigurnost-hero.jpg",
    position: "52% 54%",
  },
}

const artPromptsBySlug: Record<string, string> = {
  "svaki-euro-ima-namjenu":
    "Mediterranean limestone desk scene, zero-based budget worksheet, pencil marks, olive branch, warm side light, sea visible in the distance, carved stone Bitcoin symbol as money, calm editorial book-cover mood.",
  "stvarni-visak":
    "Warm Mediterranean stone table with envelopes for obligations and a small clear surplus area, linen paper, sea light, no charts, no trading interface, editorial nonfiction cover style.",
  "dug-je-buduci-novac":
    "Limestone relief showing a broken chain beside a future calendar page, quiet Mediterranean light, handwritten debt plan, sober book-cover composition, no finance dashboard.",
  "dug-ili-bitcoin":
    "Mediterranean stone decision scene with two paths: debt repayment ledger and carved Bitcoin-as-money symbol, warm paper, restrained editorial lighting, no price chart.",
  "davanje-u-proracunu-nulte-osnove":
    "Open hand over a limestone table with a giving line in a budget notebook, olive and sea tones, warm side light, gentle editorial cover, no crypto visuals.",
  "bitcoin-kao-novac":
    "Carved limestone Bitcoin money symbol on a Mediterranean table beside a household budget notebook and sea light, not a coin, calm book-cover image.",
  "bitcoin-nije-kripto-portfelj":
    "Editorial Mediterranean still life separating one carved Bitcoin money symbol from scattered generic speculative tokens kept in shadow, stone and paper textures, no trading charts.",
  "novac-kapital-potrosnja":
    "Three limestone blocks labeled as money, capital and consumption through objects not text, Mediterranean desk, warm side light, quiet nonfiction cover composition.",
  "pravilo-trecina":
    "Mediterranean limestone composition divided into three calm areas for Bitcoin money, productive assets and liquid state money, book-cover lighting, no dashboard.",
  "uskladivanje-kupovne-moci-bitcoina":
    "Mediterranean stone and paper scene showing purchasing power through household objects and time, carved Bitcoin symbol, warm side light, no speculative price graph.",
  "saylor-bitcoin-ciklus-ponuda-potraznja":
    "Mediterranean limestone table with three calm blocks: mining supply, institutional capital flows, and household rules, carved Bitcoin money symbol, warm side light, no price chart, editorial nonfiction cover.",
  "sigurnost-ne-smije-ovisiti-samo-o-vama":
    "Limestone security plan with separated keys, family note, warm Mediterranean light, calm inheritance and recovery mood, no exposed secret words.",
  "obiteljski-bitcoin-trezor":
    "Family Bitcoin treasury as carved stone layers, separate locations implied by envelopes and keys, Mediterranean table, warm side light, editorial cover image.",
}

const coverOverridesBySlug: Record<string, Partial<GuideCover>> = {
  "svaki-euro-ima-namjenu": {
    webpSrc: "/images/guide-svaki-euro-ima-namjenu-cover.webp",
    src: "/images/guide-svaki-euro-ima-namjenu-cover.jpg",
    alt: "Mediteranska kamena scena s proračunskom bilježnicom za vodič Svaki euro ima namjenu",
    position: "50% 52%",
    caption:
      "Svaki euro dobiva namjenu prije nego što Bitcoin odluka postane stvarno slobodna.",
  },
}

export function resolveGuideTheme(guide: Guide): GuideTheme {
  if (guide.theme) {
    return guide.theme
  }

  if (timeGuideSlugs.has(guide.slug)) {
    return "time"
  }

  return categoryThemes[guide.category]
}

export function resolveGuideCover(guide: Guide): GuideCover {
  const theme = resolveGuideTheme(guide)
  const fallback = defaultCovers[theme]
  const override = coverOverridesBySlug[guide.slug]
  const artPrompt = guide.cover?.artPrompt ?? artPromptsBySlug[guide.slug]

  return {
    ...fallback,
    ...override,
    ...guide.cover,
    alt:
      guide.cover?.alt ??
      override?.alt ??
      `Mediteranska kamena scena za vodič ${guide.title}`,
    caption:
      guide.cover?.caption ??
      override?.caption ??
      "Privremeni cover koristi postojeći hero asset dok se ne izradi zasebna naslovnica vodiča.",
    artPrompt,
  }
}
