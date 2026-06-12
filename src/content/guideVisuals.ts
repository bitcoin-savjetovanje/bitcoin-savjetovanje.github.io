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
  Poslovanje: "bitcoin",
}

const timeGuideSlugs = new Set([
  "uskladivanje-kupovne-moci-bitcoina",
  "cijena-kao-mjera-vremena",
  "saylor-bitcoin-ciklus-ponuda-potraznja",
  "ne-cekajte-savrseno-dno-bitcoina",
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
  "bitcoin-bilanca-pojacana-izlozenost":
    "Mediterranean limestone table with a carved Bitcoin money symbol, balance sheet papers, dividend envelopes, and layered capital instruments arranged around the Bitcoin reserve, warm sea light, calm editorial cover, no price chart.",
  "bitcoin-kao-stopa-prepreke":
    "Mediterranean limestone desk with a carved Bitcoin money symbol in the center and surrounding household, business, investment and net worth decision notes, warm sea light, calm nonfiction cover.",
  "od-duga-prema-vlasnistvu":
    "Mediterranean stone table split between debt obligations and ownership reserve, broken chain, simple ledger, carved Bitcoin money symbol, warm sober editorial cover.",
  "digitalni-kredit-nije-bitcoin":
    "Mediterranean limestone still life separating a carved Bitcoin money symbol from a paper contract and intermediary seal, calm editorial cover, no price chart, no product branding.",
  "digitalni-kredit-bitcoin-saylor":
    "Mediterranean limestone table with a carved Bitcoin base layer, subtle bridge of credit papers toward institutional capital, calm sea light, no security branding, no trading dashboard, editorial nonfiction cover.",
  "sigurnost-ne-smije-ovisiti-samo-o-vama":
    "Limestone security plan with separated keys, family note, warm Mediterranean light, calm inheritance and recovery mood, no exposed secret words.",
  "obiteljski-bitcoin-trezor":
    "Family Bitcoin treasury as carved stone layers, separate locations implied by envelopes and keys, Mediterranean table, warm side light, editorial cover image.",
  "vremenski-oporavak-bitcoin-trezor":
    "Mediterranean limestone family Bitcoin vault with three separated keys and a subtle time marker opening a recovery path later, warm side light, no exposed secret words, editorial nonfiction cover.",
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
  "stvarni-visak": {
    webpSrc: undefined,
    src: "/images/stvarni-visak-hero.png",
    alt: "Mediteranska kamena scena s proračunskom bilježnicom, odvojenim novcem i Bitcoin simbolom za vodič Što je stvarni višak?",
    position: "68% 52%",
    caption:
      "Stvarni višak postaje vidljiv tek nakon što obveze, pričuva i budući troškovi dobiju svoje mjesto.",
  },
  "dca-nije-dovoljan": {
    webpSrc: undefined,
    src: "/images/dca-nije-dovoljan-hero.png",
    alt: "Mediteranska kamena scena s redovitom kupnjom Bitcoina i praznim okvirom za pravila za vodič Zašto redovita kupnja nije cijeli sustav?",
    position: "68% 52%",
    caption:
      "Redovita kupnja može biti korisna navika, ali ne zamjenjuje proračun, stvarni višak i pisana pravila.",
  },
  "dug-je-buduci-novac": {
    webpSrc: undefined,
    src: "/images/dug-je-buduci-novac-hero.png",
    alt: "Mediteranska kamena scena s lancem, kalendarom i Bitcoin simbolom za vodič Dug je budući novac koji ste već potrošili",
    position: "68% 52%",
    caption:
      "Dug troši budući novac danas i s vremenom počinje odlučivati umjesto vas.",
  },
  "dug-ili-bitcoin": {
    webpSrc: undefined,
    src: "/images/dug-ili-bitcoin-hero.png",
    alt: "Mediteranska kamena scena s vagom između duga i Bitcoina za vodič Dug ili Bitcoin?",
    position: "68% 52%",
    caption:
      "Odluka između duga i Bitcoina nije samo računica, nego pitanje mira, jasnoće i slobode.",
  },
  "ne-zaduzujte-se-za-bitcoin": {
    webpSrc: undefined,
    src: "/images/ne-zaduzujte-se-za-bitcoin-hero.png",
    alt: "Mediteranska kamena scena s lancem, budućim novcem i Bitcoin simbolom za vodič Ne zadužujte se za Bitcoin",
    position: "68% 52%",
    caption:
      "Bitcoin standard ne kupuje novac budućim novcem, nego čeka stvarni višak.",
  },
  "prihod-nije-slobodan-novac": {
    webpSrc: "/images/prihod-nije-slobodan-novac-hero-20260603.webp",
    src: "/images/prihod-nije-slobodan-novac-hero-20260603.jpg",
    alt: "Mediteranska kamena scena s poslovnom bilježnicom, računima, omotnicom i Bitcoin simbolom za vodič Prihod nije slobodan novac",
    position: "62% 52%",
    caption:
      "Prihod nije slobodan dok se ne vide porezi, plaće, dobavljači, pričuva i stvarni vlasnički višak.",
  },
  "starost-novca": {
    webpSrc: "/images/starost-novca-hero-20260603.webp",
    src: "/images/starost-novca-hero-20260603.jpg",
    alt: "Mediteranska kamena scena s proračunskom bilježnicom, pješčanim satom i Bitcoin simbolom za vodič Starost novca",
    position: "62% 52%",
    caption:
      "Što duže novac preživi prije potrošnje, to odluke o Bitcoinu imaju više vremena i manje pritiska.",
  },
  "bitcoin-etfovi-i-riznicke-kompanije": {
    webpSrc: "/images/bitcoin-etfovi-riznicke-kompanije-hero-20260603.webp",
    src: "/images/bitcoin-etfovi-riznicke-kompanije-hero-20260603.jpg",
    alt: "Mediteranska kamena scena s Bitcoinom, burzovnim fondovima i rizničkim kompanijama",
    position: "50% 50%",
    caption:
      "Bitcoin, burzovni fond i riznička kompanija nisu isti sloj iste odluke.",
  },
  "bitcoin-bilanca-pojacana-izlozenost": {
    webpSrc: "/images/bitcoin-bilanca-pojacana-izlozenost-hero-20260603.webp",
    src: "/images/bitcoin-bilanca-pojacana-izlozenost-hero-20260603.jpg",
    alt: "Mediteranska kamena scena s Bitcoin bilancom, slojevima kapitala i pojačanom izloženošću",
    position: "50% 50%",
    caption:
      "Što je instrument udaljeniji od Bitcoina, to su važniji bilanca, pravila i izdavatelj.",
  },
  "od-duga-prema-vlasnistvu": {
    webpSrc: "/images/od-duga-prema-vlasnistvu-hero-20260603.webp",
    src: "/images/od-duga-prema-vlasnistvu-hero-20260603.jpg",
    alt: "Mediteranska kamena scena s bilježnicom, ključem i Bitcoin simbolom za vodič Od društva duga prema društvu vlasništva",
    position: "58% 52%",
    caption:
      "Prijelaz iz duga prema vlasništvu počinje jasnim pravilima, stvarnim viškom i novcem koji ostaje pod vašom kontrolom.",
  },
  "vremenski-oporavak-bitcoin-trezor": {
    webpSrc: "/images/vremenski-oporavak-bitcoin-trezor-hero-20260529.webp",
    src: "/images/vremenski-oporavak-bitcoin-trezor-hero-20260529.jpg",
    alt: "Mediteranska scena s Bitcoin trezorom, pješčanim satom i tri ključa za vodič o vremenskom oporavku",
    position: "50% 52%",
    caption:
      "Danas vrijedi 2 od 3, a nakon roka može se otvoriti oporavni put koji obitelj mora razumjeti prije nego što zatreba.",
  },
  "ne-cekajte-savrseno-dno-bitcoina": {
    webpSrc: "/images/vrijeme-volatilnost-hero-20260521.webp",
    src: "/images/vrijeme-volatilnost-hero-20260521.jpg",
    alt: "Mirna mediteranska scena koja simbolizira Bitcoin odluke bez pogađanja savršenog dna.",
    position: "52% 52%",
    caption:
      "Ciklusi su koristan kontekst, ali osobni Bitcoin plan ne smije ovisiti o pogađanju jednog kvartala.",
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
