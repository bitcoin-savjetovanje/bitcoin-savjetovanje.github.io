import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"

const root = process.cwd()
const distDir = path.join(root, "dist")
const serverEntry = path.join(root, "dist-ssr", "entry-server.js")
const failures = []

const requiredGuidePaths = [
  "/vodici/svaki-euro-ima-namjenu",
  "/vodici/stvarni-visak",
  "/vodici/prihod-nije-slobodan-novac",
  "/vodici/starost-novca",
  "/vodici/dug-je-buduci-novac",
  "/vodici/bitcoin-u-neto-imovini",
  "/vodici/dug-ili-bitcoin",
  "/vodici/ne-zaduzujte-se-za-bitcoin",
  "/vodici/davanje-u-proracunu-nulte-osnove",
  "/vodici/davanje-bez-duga",
  "/vodici/novac-dolazi-od-ljudi",
  "/vodici/niste-zakasnili-u-bitcoin",
  "/vodici/kada-bitcoin-postane-distrakcija",
  "/vodici/bitcoin-kao-novac",
  "/vodici/bitcoin-nije-kripto-portfelj",
  "/vodici/pozitivni-neto-priljev",
  "/vodici/prihvacanje-bitcoina-u-poslovanju",
  "/vodici/dca-nije-dovoljan",
  "/vodici/od-duga-prema-vlasnistvu",
  "/vodici/uskladivanje-kupovne-moci-bitcoina",
  "/vodici/cijena-kao-mjera-vremena",
  "/vodici/saylor-bitcoin-ciklus-ponuda-potraznja",
  "/vodici/digitalni-kredit-nije-bitcoin",
  "/vodici/bitcoin-kao-stopa-prepreke",
  "/vodici/pravilo-trecina",
  "/vodici/bitcoin-etfovi-i-riznicke-kompanije",
  "/vodici/zaba-bitcoin-etf-certifikat",
  "/vodici/bitcoin-bilanca-pojacana-izlozenost",
  "/vodici/sigurnost-ne-smije-ovisiti-samo-o-vama",
  "/vodici/poslovni-bitcoin-nije-privatni-bitcoin",
  "/vodici/obiteljski-bitcoin-trezor",
  "/vodici/vremenski-oporavak-bitcoin-trezor",
  "/vodici/samostalna-pohrana-ili-skrbnik",
  "/vodici/bitkey-bitcoin-sigurnost",
  "/vodici/obiteljski-pristup-bitcoinu",
  "/vodici/novac-kapital-potrosnja",
]

const aliasGuidePaths = [
  {
    oldPath: "/vodici/kredit-je-buduci-novac",
    newCanonical:
      "https://bitcoin-savjetovanje.com/vodici/dug-je-buduci-novac/",
  },
  {
    oldPath: "/vodici/kredit-ili-bitcoin",
    newCanonical: "https://bitcoin-savjetovanje.com/vodici/dug-ili-bitcoin/",
  },
  {
    oldPath: "/vodici/ne-uzimajte-kredit-za-bitcoin",
    newCanonical:
      "https://bitcoin-savjetovanje.com/vodici/ne-zaduzujte-se-za-bitcoin/",
  },
  {
    oldPath: "/vodici/sustavno-davanje-u-proracunu-nulte-razine",
    newCanonical:
      "https://bitcoin-savjetovanje.com/vodici/davanje-u-proracunu-nulte-osnove/",
  },
  {
    oldPath: "/vodici/sustavno-davanje-bez-kredita",
    newCanonical: "https://bitcoin-savjetovanje.com/vodici/davanje-bez-duga/",
  },
  {
    oldPath: "/vodici/davanje-u-proracunu",
    newCanonical:
      "https://bitcoin-savjetovanje.com/vodici/davanje-u-proracunu-nulte-osnove/",
  },
]

function pass(message) {
  console.log(`PASS ${message}`)
}

function fail(message) {
  failures.push(message)
  console.error(`FAIL ${message}`)
}

function filePath(relativePath) {
  return path.join(distDir, relativePath)
}

function assertFile(relativePath) {
  if (fs.existsSync(filePath(relativePath))) {
    pass(`${relativePath} exists`)
    return true
  }

  fail(`${relativePath} is missing`)
  return false
}

function assertNoFile(relativePath) {
  if (!fs.existsSync(filePath(relativePath))) {
    pass(`${relativePath} does not exist`)
    return true
  }

  fail(`${relativePath} should not exist`)
  return false
}

function readFile(relativePath) {
  if (!assertFile(relativePath)) {
    return ""
  }

  return fs.readFileSync(filePath(relativePath), "utf8")
}

function textWithoutTags(contents) {
  return contents
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
}

function guideVisibleText(contents) {
  return textWithoutTags(
    contents
      .replace(
        /<span[^>]*class="[^"]*glossary-term__title[^"]*"[^>]*>[\s\S]*?<\/span>/gi,
        ""
      )
      .replace(
        /<span[^>]*class="[^"]*glossary-term__description[^"]*"[^>]*>[\s\S]*?<\/span>/gi,
        ""
      )
  )
}

function guideArticleVisibleText(contents) {
  const match = contents.match(
    /<article\b(?=[^>]*data-guide-article)[\s\S]*<\/article>/i
  )

  return guideVisibleText(match?.[0] ?? contents)
}

function htmlFiles(directory = distDir) {
  const entries = fs.readdirSync(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...htmlFiles(entryPath))
      continue
    }

    if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(entryPath)
    }
  }

  return files
}

function assetFiles(extension) {
  const assetsDir = path.join(distDir, "assets")

  if (!fs.existsSync(assetsDir)) {
    return []
  }

  return fs
    .readdirSync(assetsDir)
    .filter((fileName) => fileName.endsWith(extension))
    .map((fileName) => path.join(assetsDir, fileName))
}

function assertIncludes(relativePath, contents, expected, label = expected) {
  if (contents.includes(expected)) {
    pass(`${relativePath} contains ${label}`)
    return
  }

  fail(`${relativePath} is missing ${label}`)
}

function assertSocialImageMeta(
  relativePath,
  contents,
  imageUrl,
  width,
  height,
  label
) {
  assertIncludes(
    relativePath,
    contents,
    `<meta property="og:image" content="${imageUrl}" />`,
    `${label} og:image`
  )
  assertIncludes(
    relativePath,
    contents,
    `<meta property="og:image:width" content="${width}" />`,
    `${label} og:image width`
  )
  assertIncludes(
    relativePath,
    contents,
    `<meta property="og:image:height" content="${height}" />`,
    `${label} og:image height`
  )
  assertIncludes(
    relativePath,
    contents,
    `<meta name="twitter:image" content="${imageUrl}" />`,
    `${label} twitter:image`
  )
}

function assertNotIncludes(relativePath, contents, expected, label = expected) {
  if (!contents.includes(expected)) {
    pass(`${relativePath} does not contain ${label}`)
    return
  }

  fail(`${relativePath} should not contain ${label}`)
}

function assertMatches(
  relativePath,
  contents,
  pattern,
  label = pattern.source
) {
  if (pattern.test(contents)) {
    pass(`${relativePath} matches ${label}`)
    return
  }

  fail(`${relativePath} should match ${label}`)
}

function assertNotMatches(
  relativePath,
  contents,
  pattern,
  label = pattern.source
) {
  if (!pattern.test(contents)) {
    pass(`${relativePath} does not match ${label}`)
    return
  }

  fail(`${relativePath} should not match ${label}`)
}

function assertCount(
  relativePath,
  contents,
  expected,
  count,
  label = expected
) {
  const actual = contents.split(expected).length - 1

  if (actual === count) {
    pass(`${relativePath} contains ${label} ${count} time(s)`)
    return
  }

  fail(`${relativePath} contains ${label} ${actual} time(s), expected ${count}`)
}

function assertBefore(relativePath, contents, first, second, label) {
  const firstIndex = contents.indexOf(first)
  const secondIndex = contents.indexOf(second)

  if (firstIndex === -1) {
    fail(`${relativePath} is missing first item for order check: ${first}`)
    return
  }

  if (secondIndex === -1) {
    fail(`${relativePath} is missing second item for order check: ${second}`)
    return
  }

  if (firstIndex < secondIndex) {
    pass(`${relativePath} keeps order: ${label}`)
    return
  }

  fail(`${relativePath} has wrong order: ${label}`)
}

function assertArrayEquals(relativePath, actual, expected, label) {
  const actualText = JSON.stringify(actual)
  const expectedText = JSON.stringify(expected)

  if (actualText === expectedText) {
    pass(`${relativePath} keeps exact list: ${label}`)
    return
  }

  fail(
    `${relativePath} has wrong list for ${label}: ${actualText}, expected ${expectedText}`
  )
}

function attributeValue(tag, name) {
  const match = tag.match(new RegExp(`${name}="([^"]+)"`))
  return match?.[1] ?? ""
}

function anchorHrefsByDataLink(contents, dataLink) {
  return [...contents.matchAll(/<a\b[^>]*>/g)]
    .map((match) => match[0])
    .filter((tag) => attributeValue(tag, "data-link") === dataLink)
    .map((tag) => attributeValue(tag, "href"))
}

function anchorTextsByDataLink(contents, dataLink) {
  return [...contents.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)]
    .filter((match) => attributeValue(match[1], "data-link") === dataLink)
    .map((match) => textWithoutTags(match[2]).trim().replace(/\s+/g, " "))
}

function canonicalFromHtml(contents) {
  const match = contents.match(/<link rel="canonical" href="([^"]+)" \/>/)
  return match?.[1] ?? ""
}

function routeFile(routePath) {
  if (routePath === "/") {
    return "index.html"
  }

  return path.join(routePath.replace(/^\/+|\/+$/g, ""), "index.html")
}

function guideTitle(routeTitle) {
  return routeTitle.replace(" | Bitcoin Savjetovanje", "")
}

let prerenderRoutes = []

try {
  const serverModule = await import(pathToFileURL(serverEntry).href)
  prerenderRoutes = serverModule.prerenderRoutes ?? []
  pass("SSR route metadata imported")
} catch (error) {
  fail(`Could not import SSR route metadata: ${error.message}`)
}

const routeMap = new Map(prerenderRoutes.map((route) => [route.path, route]))
const routeByCanonical = new Map(
  prerenderRoutes
    .filter((route) => route.includeInSitemap !== false)
    .map((route) => [route.canonical, route])
)

const generatedGuideCoverSlugs = [
  "bitcoin-etfovi-i-riznicke-kompanije",
  "bitcoin-kao-novac",
  "bitcoin-kao-stopa-prepreke",
  "bitcoin-nije-kripto-portfelj",
  "bitcoin-u-neto-imovini",
  "bitkey-bitcoin-sigurnost",
  "cijena-kao-mjera-vremena",
  "davanje-bez-duga",
  "davanje-u-proracunu-nulte-osnove",
  "dca-nije-dovoljan",
  "digitalni-kredit-bitcoin-saylor",
  "digitalni-kredit-nije-bitcoin",
  "dug-je-buduci-novac",
  "dug-ili-bitcoin",
  "kada-bitcoin-postane-distrakcija",
  "ne-zaduzujte-se-za-bitcoin",
  "niste-zakasnili-u-bitcoin",
  "novac-dolazi-od-ljudi",
  "novac-kapital-potrosnja",
  "obiteljski-bitcoin-trezor",
  "obiteljski-pristup-bitcoinu",
  "od-duga-prema-vlasnistvu",
  "poslovni-bitcoin-nije-privatni-bitcoin",
  "pozitivni-neto-priljev",
  "pravilo-trecina",
  "prihod-nije-slobodan-novac",
  "prihvacanje-bitcoina-u-poslovanju",
  "samostalna-pohrana-ili-skrbnik",
  "saylor-bitcoin-ciklus-ponuda-potraznja",
  "sigurnost-ne-smije-ovisiti-samo-o-vama",
  "starost-novca",
  "stvarni-visak",
  "uskladivanje-kupovne-moci-bitcoina",
  "vremenski-oporavak-bitcoin-trezor",
  "zaba-bitcoin-etf-certifikat",
]

for (const route of prerenderRoutes) {
  const relativePath = routeFile(route.path)
  const html = readFile(relativePath)

  assertSocialImageMeta(
    relativePath,
    html,
    route.ogImage,
    route.ogImageWidth,
    route.ogImageHeight,
    `${route.path} social preview image`
  )
}

const home = routeMap.get("/")
const budget = routeMap.get("/proracun/")
const debt = routeMap.get("/dug/")
const giving = routeMap.get("/davanje/")
const bitcoinMoney = routeMap.get("/bitcoin-kao-novac/")
const netWorth = routeMap.get("/bitcoin-i-neto-imovina/")
const timeVolatility = routeMap.get("/bitcoin-vrijeme-i-volatilnost/")
const custodySecurity = routeMap.get("/skrbnistvo-i-sigurnost/")
const conversation = routeMap.get("/razgovor/")
const bitcoinConsultation = routeMap.get("/bitcoin-konzultacija/")
const personalBitcoinStandard = routeMap.get("/osobni-bitcoin-standard/")
const samplePersonalBitcoinStandard = routeMap.get(
  "/primjer-osobnog-bitcoin-standarda/"
)
const bitcoinStandardCheck = routeMap.get("/provjera-bitcoin-standarda/")
const personalAudience = routeMap.get("/osobno/")
const familyAudience = routeMap.get("/obitelj/")
const businessAudience = routeMap.get("/poduzetnici/")
const guidesIndex = routeMap.get("/vodici/")
const security = routeMap.get("/sigurnost/")
const privacy = routeMap.get("/privatnost/")

const requiredFiles = [
  "index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "og-bitcoin-kao-novac.png",
  "og-bitcoin-kao-novac.svg",
  "images/home-hero-20260521.webp",
  "images/home-hero-20260521.jpg",
  "images/social/vodici-og-20260623.jpg",
  "images/stone-symbols/area-01-budget.webp",
  "images/stone-symbols/area-02-debt.webp",
  "images/stone-symbols/area-03-giving.webp",
  "images/stone-symbols/area-04-bitcoin-money.webp",
  "images/stone-symbols/area-05-net-worth.webp",
  "images/stone-symbols/area-06-time-volatility.webp",
  "images/stone-symbols/area-07-security-family.webp",
  "images/stone-symbols/problem-money-not-allocated.webp",
  "images/stone-symbols/problem-family-business-misaligned.webp",
  "images/stone-symbols/problem-price-moving-decisions.webp",
  "images/stone-symbols/audience-personal.webp",
  "images/stone-symbols/audience-family.webp",
  "images/stone-symbols/audience-business.webp",
  "images/stone-symbols/offer-intro-call.webp",
  "images/stone-symbols/offer-consultation.webp",
  "images/stone-symbols/offer-personal-standard.webp",
  "images/stone-symbols/bottleneck-stone-channel.webp",
  "images/hero-bitcoin-savjetovanje-realistic.webp",
  "images/hero-bitcoin-savjetovanje-realistic.jpg",
  "images/bitcoin-savjetovanje-hero-20260601.webp",
  "images/bitcoin-savjetovanje-hero-20260601.jpg",
  "images/razgovor-hero-20260601.webp",
  "images/razgovor-hero-20260601.jpg",
  "images/service-visuals/consultation-hero-20260601.webp",
  "images/service-visuals/consultation-hero-20260601.jpg",
  "images/service-visuals/standard-hero-20260601.webp",
  "images/service-visuals/standard-hero-20260601.jpg",
  "images/audiences/osobno-hero.webp",
  "images/audiences/osobno-hero.png",
  "images/audiences/obitelj-hero.webp",
  "images/audiences/obitelj-hero.png",
  "images/audiences/poduzetnici-hero.webp",
  "images/audiences/poduzetnici-hero.png",
  "images/medallions/02-novac.png",
  "images/medallions/03-dug.png",
  "images/medallions/04-davanje.png",
  "images/medallions/05-neto-imovina.png",
  "images/medallions/06-cilj-i-akcija.png",
  "images/medallions/08-proizvodna-imovina.png",
  "images/medallions/09-likvidnost-i-stednja.png",
  "images/medallions/10-volatilnost-i-rast.png",
  "images/medallions/12-proracun-i-plan.png",
  "images/medallions/14-edukacija.png",
  "images/medallions/15-sigurnost-i-nasljedivanje.png",
  "images/medallions/16-proracun.png",
  "images/medallions/17-primarni-novac.png",
  "images/medallions/18-buduci-novac.png",
  "images/medallions/19-duh-velikodusnosti.png",
  "images/medallions/20-pravilo-trecina.png",
  "images/medallions/21-stvarni-visak.png",
  "images/medallions/25-ciklusi.png",
  "images/medallions/26-mentorstvo.png",
  "images/medallions/27-obiteljski-trezor.png",
  "images/bitcoin-kao-novac-cover.webp",
  "images/bitcoin-kao-novac-cover.jpg",
  "images/proracun-hero.webp",
  "images/proracun-hero.jpg",
  "images/proracun-hero-20260521.webp",
  "images/proracun-hero-20260521.jpg",
  "images/guide-svaki-euro-ima-namjenu-cover.webp",
  "images/guide-svaki-euro-ima-namjenu-cover.jpg",
  "images/stvarni-visak-hero.webp",
  "images/stvarni-visak-hero.png",
  ...generatedGuideCoverSlugs.flatMap((slug) => [
    `images/${slug}-cover-20260625.webp`,
    `images/${slug}-cover-20260625.png`,
  ]),
  "images/dca-nije-dovoljan-hero.webp",
  "images/dca-nije-dovoljan-hero.png",
  "images/dug-je-buduci-novac-hero.webp",
  "images/dug-je-buduci-novac-hero.png",
  "images/dug-ili-bitcoin-hero.webp",
  "images/dug-ili-bitcoin-hero.png",
  "images/ne-zaduzujte-se-za-bitcoin-hero.webp",
  "images/ne-zaduzujte-se-za-bitcoin-hero.png",
  "images/dug-hero.webp",
  "images/dug-hero.jpg",
  "images/dug-hero-20260521.webp",
  "images/dug-hero-20260521.jpg",
  "images/prihod-nije-slobodan-novac-hero-20260603.webp",
  "images/prihod-nije-slobodan-novac-hero-20260603.jpg",
  "images/starost-novca-hero-20260603.webp",
  "images/starost-novca-hero-20260603.jpg",
  "images/davanje-hero.webp",
  "images/davanje-hero.jpg",
  "images/davanje-hero-20260521.webp",
  "images/davanje-hero-20260521.jpg",
  "images/neto-imovina-hero.webp",
  "images/neto-imovina-hero.jpg",
  "images/neto-imovina-hero-20260521.webp",
  "images/neto-imovina-hero-20260521.jpg",
  "images/bitcoin-etfovi-riznicke-kompanije-hero-20260603.webp",
  "images/bitcoin-etfovi-riznicke-kompanije-hero-20260603.jpg",
  "images/leo-heart-root-scale-cycles-20260618.png",
  "images/power-law-pl-minus-3-20310915.png",
  "images/power-law-pl-minus-2-20310915.png",
  "images/power-law-pl0-20310915.png",
  "images/power-law-pl5-20310915.png",
  "images/zaba-bitcoin-etf-certifikat-product-page-20260618.jpg",
  "images/bitcoin-bilanca-pojacana-izlozenost-hero-20260603.webp",
  "images/bitcoin-bilanca-pojacana-izlozenost-hero-20260603.jpg",
  "images/od-duga-prema-vlasnistvu-hero-20260603.webp",
  "images/od-duga-prema-vlasnistvu-hero-20260603.jpg",
  "images/vrijeme-volatilnost-hero.webp",
  "images/vrijeme-volatilnost-hero.jpg",
  "images/vrijeme-volatilnost-hero-20260521.webp",
  "images/vrijeme-volatilnost-hero-20260521.jpg",
  "images/skrbnistvo-sigurnost-hero.webp",
  "images/skrbnistvo-sigurnost-hero.jpg",
  "images/skrbnistvo-sigurnost-hero-20260521.webp",
  "images/skrbnistvo-sigurnost-hero-20260521.jpg",
  "images/sigurnost-povjerenje-hero-20260601.webp",
  "images/sigurnost-povjerenje-hero-20260601.jpg",
  "images/povjerljivost-hero-20260601.webp",
  "images/povjerljivost-hero-20260601.jpg",
  "images/vremenski-oporavak-bitcoin-trezor-hero-20260529.webp",
  "images/vremenski-oporavak-bitcoin-trezor-hero-20260529.jpg",
  "guide-assets/nunchuk-logo.png",
  "guide-assets/liana-logo.svg",
  "downloads/sample-osobni-bitcoin-standard.pdf",
  "downloads/7-provjera-osobnog-bitcoin-standarda.pdf",
  "images/downloads/primjer-osobnog-bitcoin-standarda-cover.webp",
  "images/downloads/primjer-osobnog-bitcoin-standarda-cover.png",
  "images/downloads/7-provjera-osobnog-bitcoin-standarda-cover.webp",
  "images/downloads/7-provjera-osobnog-bitcoin-standarda-cover.png",
  "razgovor/index.html",
  "proracun/index.html",
  "dug/index.html",
  "davanje/index.html",
  "bitcoin-kao-novac/index.html",
  "bitcoin-i-neto-imovina/index.html",
  "bitcoin-vrijeme-i-volatilnost/index.html",
  "skrbnistvo-i-sigurnost/index.html",
  "bitcoin-konzultacija/index.html",
  "osobni-bitcoin-standard/index.html",
  "primjer-osobnog-bitcoin-standarda/index.html",
  "provjera-bitcoin-standarda/index.html",
  "osobno/index.html",
  "obitelj/index.html",
  "poduzetnici/index.html",
  "vodici/index.html",
  "sigurnost/index.html",
  "privatnost/index.html",
  ...requiredGuidePaths.map(routeFile),
  ...aliasGuidePaths.map((route) => routeFile(route.oldPath)),
]

requiredFiles.forEach(assertFile)
assertNoFile("bitcoin-jasnoca/index.html")

const forbiddenText = [
  "crypto",
  "ROI",
  "lead magnet",
  "signal za kupnju",
  "signal za prodaju",
  "custody",
  "self-custody",
  "cash balance",
  "stack",
  "ulaganje u Bitcoin kreditom",
  "ako je prinos veći od kamate",
  "pametno zaduživanje",
  "dobar dug",
  "jeftin dug",
  "pogađamo cijenu",
  "pošaljite seed phrase",
  "pošaljite privatne ključeve",
  "pošaljite lozinku",
  "pristup vašem novčaniku",
  "regulated investment advice",
  "asset management",
  "trading signal",
  "trading signali",
  "garantirani povrat",
  "sigurna zarada",
  "reći ću vam koliko kupiti",
  "reći ću vam koliko Bitcoina kupiti",
  "optimiziramo porez",
  "porezna optimizacija",
  "pravni model za Bitcoin",
  "Praktični Bitcoin standard",
  "vodičei",
  "vodiče iD",
  "conviction",
  "Conviction",
]

const forbiddenPublicCopy = [
  "ne trebaju mi svi klijenti",
  "razbiti jedan krivi prigovor",
  "krivi prigovor",
  "najvažnije prigovore",
  "glupu grešku",
  "partner ili obitelj nije uvjerena",
  "dođite s bilo kojim bitcoin pitanjem",
  "u razgovor možete doći s bilo kojim bitcoin pitanjem",
  "bitcoin jasnoća",
  "bitcoin jasnoca",
  "što je bitcoin jasnoća?",
  "dogovorite 15-minutni uvodni razgovorpogledajte",
  "uvodni razgovorpogledajte",
  "dogovorite razgovorpogledajte",
  "razgovoršto je bitcoin jasnoća",
  "uvodni razgovoršto je bitcoin jasnoća",
  "razgovoršto je bitcoin konzultacija",
  "uvodni razgovoršto je bitcoin konzultacija",
  "praviladogovorite",
  "vodičeprimijenite",
  "1. 1 uvodni razgovor",
  "2. 2 bitcoin konzultacija",
  "3. 3 osobni bitcoin standard",
  "3. 3",
  "1. 1 proračun",
  "2. 2 dug",
  "budući odljevi",
  "neto priljev",
  "pozitivan neto priljev: temelj bitcoin standarda",
  "priljevi su novac koji ulazi. odljevi su novac koji izlazi. neto priljev je razlika.",
  "priljevi i odljevi",
  "neuređenog eura",
  "manje je glume",
  "dug hrani nemir",
  "psihološko-duhovna stanja",
  "duh ropstva",
  "duhovno se gušite",
  "metafizička imovina",
  "gorak lijek",
  "svake kune",
  "ne povećavam bitcoin odluke",
  "ovo se odnosi na vašu situaciju?",
  "crvena zastava",
  "nejasna imovina",
  "razbiti",
  "prigovor",
  "gdje ste zapeli",
  "monetarna teza",
  "vidimo ima li smisla za vas",
  "jedna točka kvara",
  "točka kvara",
  "točku kvara",
  "točke kvara",
  "novcu→",
]

for (const absoluteHtmlPath of htmlFiles()) {
  const relativeHtmlPath = path.relative(distDir, absoluteHtmlPath)
  const html = fs.readFileSync(absoluteHtmlPath, "utf8")
  const visibleText = textWithoutTags(html)
  const lowerVisibleText = visibleText.toLowerCase()

  for (const forbidden of forbiddenText) {
    assertNotIncludes(
      relativeHtmlPath,
      visibleText,
      forbidden,
      `forbidden text: ${forbidden}`
    )
  }

  for (const forbidden of forbiddenPublicCopy) {
    assertNotIncludes(
      relativeHtmlPath,
      lowerVisibleText,
      forbidden,
      `forbidden public copy: ${forbidden}`
    )
  }

  for (const match of visibleText.matchAll(/seed phrase/gi)) {
    const start = Math.max(0, match.index - 180)
    const end = Math.min(visibleText.length, match.index + 180)
    const context = visibleText.slice(start, end).toLowerCase()
    const allowed =
      context.includes("nikada") ||
      context.includes("nikad") ||
      context.includes("ne traž") ||
      context.includes("neće traž") ||
      context.includes("ne šalj") ||
      context.includes("ne šalju") ||
      context.includes("ne šaljete") ||
      context.includes("ne treb") ||
      context.includes("ne dijel") ||
      context.includes("ne smije") ||
      context.includes("ne smiju") ||
      context.includes("ne unosimo") ||
      context.includes("ne dirati") ||
      context.includes("nije traženje") ||
      context.includes("ne morate slati") ||
      context.includes("bez traženja") ||
      context.includes("bez dijeljenja") ||
      context.includes("bez predaje") ||
      context.includes("bez seed") ||
      context.includes("što nikada")

    if (allowed) {
      pass(`${relativeHtmlPath} mentions seed phrase only in safety context`)
    } else {
      fail(`${relativeHtmlPath} mentions seed phrase outside safety context`)
    }
  }

  for (const match of visibleText.matchAll(
    /porezni savjet|pravni savjet|računovodstveni savjet/gi
  )) {
    const start = Math.max(0, match.index - 180)
    const end = Math.min(visibleText.length, match.index + 180)
    const context = visibleText.slice(start, end).toLowerCase()
    const allowed =
      context.includes("nije") ||
      context.includes("je li ovo") ||
      context.includes("ne financijski plan") ||
      context.includes("ne mogu dati") ||
      context.includes("ne dajem") ||
      context.includes("moja uloga nije") ||
      context.includes("ne uključuje") ||
      context.includes("ne uključuju") ||
      context.includes("trebate odgovarajuće stručnjake") ||
      context.includes("provjeriti s odgovarajućim stručnjacima") ||
      context.includes("granice savjetovanja")

    if (allowed) {
      pass(
        `${relativeHtmlPath} mentions ${match[0]} only as an advice boundary`
      )
    } else {
      fail(
        `${relativeHtmlPath} mentions ${match[0]} outside an advice boundary`
      )
    }
  }

  assertNotIncludes(
    relativeHtmlPath,
    html,
    'alt="Image"',
    "generic image alt text"
  )
  assertNotIncludes(
    relativeHtmlPath,
    html,
    'alt="image"',
    "lowercase generic image alt text"
  )
  assertNotIncludes(
    relativeHtmlPath,
    html,
    'alt="Slika"',
    "generic Croatian image alt text"
  )
  assertNotIncludes(
    relativeHtmlPath,
    html,
    'alt="Logo"',
    "generic logo alt text"
  )
}

const homeHtml = readFile("index.html")
const homeText = textWithoutTags(homeHtml)
const ctaEventsSource = path.join(root, "src", "lib", "ctaEvents.ts")
const clientBundleText = assetFiles(".js")
  .map((assetPath) => fs.readFileSync(assetPath, "utf8"))
  .join("\n")
const cssBundleText = assetFiles(".css")
  .map((assetPath) => fs.readFileSync(assetPath, "utf8"))
  .join("\n")

if (fs.existsSync(ctaEventsSource)) {
  pass("src/lib/ctaEvents.ts exists")
} else {
  fail("src/lib/ctaEvents.ts is missing")
}

assertIncludes(
  "dist/assets/*.js",
  clientBundleText,
  "bitcoin-savjetovanje:cta-click",
  "CTA click CustomEvent name"
)
assertIncludes(
  "dist/assets/*.css",
  cssBundleText,
  "proracun-hero.webp",
  "budget hero WebP CSS reference"
)
assertIncludes(
  "dist/assets/*.css",
  cssBundleText,
  "proracun-hero.jpg",
  "budget hero JPEG CSS reference"
)
assertIncludes(
  "dist/assets/*.css",
  cssBundleText,
  "dug-hero.webp",
  "debt hero WebP CSS reference"
)
assertIncludes(
  "dist/assets/*.css",
  cssBundleText,
  "dug-hero.jpg",
  "debt hero JPEG CSS reference"
)
assertIncludes(
  "dist/assets/*.css",
  cssBundleText,
  "davanje-hero.webp",
  "giving hero WebP CSS reference"
)
assertIncludes(
  "dist/assets/*.css",
  cssBundleText,
  "davanje-hero.jpg",
  "giving hero JPEG CSS reference"
)
assertIncludes(
  "dist/assets/*.css",
  cssBundleText,
  "neto-imovina-hero.webp",
  "net worth hero WebP CSS reference"
)
assertIncludes(
  "dist/assets/*.css",
  cssBundleText,
  "neto-imovina-hero.jpg",
  "net worth hero JPEG CSS reference"
)
assertIncludes(
  "dist/assets/*.css",
  cssBundleText,
  "vrijeme-volatilnost-hero.webp",
  "time volatility hero WebP CSS reference"
)
assertIncludes(
  "dist/assets/*.css",
  cssBundleText,
  "vrijeme-volatilnost-hero.jpg",
  "time volatility hero JPEG CSS reference"
)
assertIncludes(
  "dist/assets/*.css",
  cssBundleText,
  "skrbnistvo-sigurnost-hero.webp",
  "custody security hero WebP CSS reference"
)
assertIncludes(
  "dist/assets/*.css",
  cssBundleText,
  "skrbnistvo-sigurnost-hero.jpg",
  "custody security hero JPEG CSS reference"
)
assertIncludes(
  "dist/assets/*.css",
  cssBundleText,
  ".site-header__brand,.site-header__brand *",
  "header brand excluded from global sans-serif body text rule"
)
assertIncludes(
  "dist/assets/*.css",
  cssBundleText,
  ".site-header__brand span{font-family:Georgia,ui-serif,serif!important}",
  "header brand text remains serif"
)

const homeChecks = [
  ["Bitcoin Savjetovanje — osobni Bitcoin standard", "updated home title"],
  ["BITCOIN SAVJETOVANJE", "editorial header brand"],
  ["O pristupu", "header approach nav label"],
  ["Usluge", "header services nav label"],
  ["Knjiga", "header book nav label"],
  ["O meni", "header about nav label"],
  ["Česta pitanja", "header FAQ nav label"],
  ["Kontakt", "header contact nav label"],
  ["Dogovorite razgovor", "header CTA copy"],
  ["BITCOIN KAO NOVAC", "hero eyebrow"],
  ["Od držanja Bitcoina", "hero title first line"],
  ["do uređenog sustava", "hero title second line"],
  ["odluka.", "hero title third line"],
  ["pojedince, obitelji i poduzetnike", "business audience framing"],
  ["Dogovorite 15-minutni uvodni razgovor", "primary intro call CTA copy"],
  ['data-cta="hero-intro-call"', "hero CTA metadata"],
  [
    "Bez naknade i bez obveze. Ne upravljam sredstvima i nikada ne tražim seed phrase, privatne ključeve ni pristup novčaniku.",
    "hero trust note",
  ],
  ["home-hero-20260521.webp", "sculpted home hero WebP asset"],
  ["home-hero-20260521.jpg", "sculpted home hero JPEG fallback"],
  [
    "Mediteranska radna scena sa sedam kamenih skulptura osobnog Bitcoin standarda",
    "sculpted home hero image alt text",
  ],
  ["Imam Bitcoin, ali nemam pravila.", "recognition section title"],
  [
    "Ne znate korak po korak što učiniti s novcem, dugom, viškom, neto imovinom, volatilnošću i sigurnošću.",
    "recognition intro copy",
  ],
  ["Ne morate znati koji paket trebate.", "recognition trust copy"],
  ['data-cta="recognition-intro-call"', "recognition CTA metadata"],
  [
    "Provjerite je li vaš Bitcoin standard stvaran",
    "home standard check title",
  ],
  [
    "Preuzmite radni PDF “7 provjera osobnog Bitcoin standarda”",
    "home standard check copy",
  ],
  ['href="/provjera-bitcoin-standarda/"', "home standard check href"],
  ['data-cta="home-standard-check"', "home standard check CTA metadata"],
  [
    'data-link="home-standard-check-conversation"',
    "home standard check conversation metadata",
  ],
  [
    "Pogledajte kako izgleda osobni Bitcoin standard",
    "home sample standard title",
  ],
  [
    "Anonimni primjer dokumenta pokazuje što znači pretvoriti Bitcoin iz odvojene imovine u sustav odluka",
    "home sample standard copy",
  ],
  ['href="/primjer-osobnog-bitcoin-standarda/"', "home sample standard href"],
  ['data-cta="home-sample-standard"', "home sample standard CTA metadata"],
  [
    'data-link="home-sample-standard-conversation"',
    "home sample standard conversation metadata",
  ],
  ["Okvir iz knjige: 7 područja koja treba urediti", "framework section title"],
  ["framework-sculpture-grid", "framework sculpture grid markup"],
  ["framework-sculpture-image", "framework sculpture image markup"],
  ["area-01-budget.webp", "framework budget sculpture asset"],
  ["area-07-security-family.webp", "framework security sculpture asset"],
  ['href="/proracun/"', "framework budget card href"],
  ["Proračun", "framework budget item"],
  ["vidjeti novac", "framework compact budget idea"],
  ['href="/dug/"', "framework debt card href"],
  ["Dug", "framework debt item"],
  ["osloboditi budućnost", "framework compact debt idea"],
  ['href="/davanje/"', "framework giving card href"],
  ["Davanje", "framework giving item"],
  ["otvoriti ruku", "framework giving idea"],
  ['href="/bitcoin-kao-novac/"', "framework Bitcoin money card href"],
  ["Bitcoin kao novac", "framework Bitcoin money item"],
  ["primarni saldo", "framework Bitcoin idea"],
  ['href="/bitcoin-i-neto-imovina/"', "framework net worth card href"],
  ["Neto imovina", "framework net worth item"],
  ["bilanca kao cjelina", "framework net worth idea"],
  [
    'href="/bitcoin-vrijeme-i-volatilnost/"',
    "framework time volatility card href",
  ],
  ["Vrijeme i volatilnost", "framework time volatility item"],
  ["pravila kroz cikluse", "framework time idea"],
  ['href="/skrbnistvo-i-sigurnost/"', "framework custody security card href"],
  ["Sigurnost i obitelj", "framework security family item"],
  ["zaštititi pristup", "framework security idea"],
  ["Tri razine. Jedan princip.", "three levels title"],
  ["OSOBNO", "personal level label"],
  [
    "Urediti proračun, dug, stvarni višak, neto imovinu i reakcije na volatilnost.",
    "personal level copy",
  ],
  ['href="/osobno/"', "personal audience href"],
  ["OBITELJSKI", "family level label"],
  [
    "Uskladiti jezik, sigurnost, prvi korak oporavka i nasljeđivanje.",
    "family level copy",
  ],
  ['href="/obitelj/"', "family audience href"],
  ["POSLOVNO", "business level label"],
  [
    "Razdvojiti poslovni novac, obveze, pričuvu, višak i Bitcoin riznicu.",
    "business level copy",
  ],
  ['href="/poduzetnici/"', "business audience href"],
  ["Odaberite kontekst koji vam je najbliži.", "three levels context CTA copy"],
  ["Osobni put", "personal audience CTA"],
  ["Obiteljski put", "family audience CTA"],
  ["Poslovni put", "business audience CTA"],
  ["U 15 minuta ne gradimo", "services intro first line"],
  ["cijeli sustav.", "services intro second line"],
  ["Pronalazimo prvo usko grlo.", "services intro third line"],
  ["Ne morate sami izabrati paket.", "services funnel microcopy"],
  ["Uvodni razgovor", "intro offer title"],
  ["0 €", "intro offer price"],
  [
    "15 minuta da se upoznamo, razumijemo kontekst i vidimo je li suradnja smislena.",
    "intro offer copy",
  ],
  ['data-cta="service-intro-call"', "intro service CTA metadata"],
  ["Bitcoin konzultacija", "Bitcoin consultation offer title"],
  ["200 €", "Bitcoin consultation price"],
  [
    "60 minuta rada na vašem kontekstu. Jasni prijedlozi i konkretni koraci koje možete odmah primijeniti.",
    "Bitcoin consultation offer copy",
  ],
  ['href="/bitcoin-konzultacija/"', "Bitcoin consultation detail href"],
  [
    'data-cta="service-consultation-intro-call"',
    "Bitcoin consultation intro CTA metadata",
  ],
  [
    'data-link="service-consultation-details"',
    "Bitcoin consultation detail metadata",
  ],
  ["Pogledajte detalje", "paid service detail link copy"],
  ["Osobni Bitcoin standard", "personal standard offer title"],
  ["1.500 EUR", "personal standard price"],
  [
    "Cjelovit, pisani okvir vašeg sustava: pravila, procesi i plan za provedbu u vašem životu ili poslovanju.",
    "personal standard offer copy",
  ],
  ['href="/osobni-bitcoin-standard/"', "personal standard detail href"],
  [
    'data-cta="service-personal-standard-intro-call"',
    "personal standard intro CTA metadata",
  ],
  [
    'data-link="service-personal-standard-details"',
    "personal standard detail metadata",
  ],
  ["Pavao Pahljina", "about section name"],
  [
    "Pomažem pojedincima, obiteljima i poduzetnicima urediti sustav odluka u kojem Bitcoin ima ulogu novca.",
    "about section first paragraph",
  ],
  [
    "Ne dajem financijske savjete niti upravljam sredstvima. Radim s principima, procesima i disciplinom koja traje.",
    "about section boundary paragraph",
  ],
  ["Saznajte više o meni", "about CTA copy"],
  ['alt="Pavao Pahljina"', "about portrait alt text"],
  ["Knjiga u nastajanju", "book section eyebrow"],
  ["Bitcoin kao novac:", "book section title first line"],
  ["Praktični vodič", "book section title second line"],
  [
    "Knjiga koja povezuje bezvremenske principe novca s praktičnim koracima za svakodnevni život.",
    "book section copy",
  ],
  ["Uskoro dostupno u pretprodaji", "book preorder checklist item"],
  ["Radna bilježnica uz svako poglavlje", "book workbook checklist item"],
  [
    "Bez tehničkog žargona, fokus na život",
    "book plain language checklist item",
  ],
  ["USKORO", "book badge"],
  ["ne čuvam vaš Bitcoin", "footer no custody disclaimer"],
  [
    "ne tražim seed phrase ili privatne ključeve",
    "footer seed phrase disclaimer",
  ],
  ['href="/razgovor/"', "homepage CTA to /razgovor/"],
  [
    "https://bitcoin-savjetovanje.com/images/home-hero-20260521.jpg",
    "homepage hero social preview image",
  ],
  ['data-link="footer-security"', "footer security link metadata"],
  ['data-link="footer-privacy"', "footer privacy link metadata"],
  ['data-link="footer-osobno"', "footer personal audience link metadata"],
  ['data-link="footer-obitelj"', "footer family audience link metadata"],
  ['data-link="footer-poduzetnici"', "footer business audience link metadata"],
  [
    '<link rel="canonical" href="https://bitcoin-savjetovanje.com/" />',
    "home canonical URL",
  ],
  ["OfferCatalog", "OfferCatalog schema"],
  ["Uvodni razgovor", "intro offer schema/content"],
  ["Osobni Bitcoin standard", "personal standard schema/content"],
]

for (const [expected, label] of homeChecks) {
  assertIncludes("index.html", homeHtml, expected, label)
}

const homeNavLinks = [
  ['href="/#okvir"', "approach nav link"],
  ['href="/#ponude"', "services nav link"],
  ['href="/#knjiga"', "book nav link"],
  ['href="/#o-meni"', "about nav link"],
  ['href="/razgovor/#pitanja"', "FAQ nav link"],
  ['href="/razgovor/"', "contact nav link"],
]

for (const [expected, label] of homeNavLinks) {
  assertIncludes("index.html", homeHtml, expected, label)
}

assertNotIncludes(
  "index.html",
  homeHtml,
  "Power law",
  "Power law as homepage hook"
)
assertNotIncludes(
  "index.html",
  homeHtml,
  "power law",
  "power law as homepage hook"
)
assertNotIncludes(
  "index.html",
  homeHtml,
  "Izgradite osobni Bitcoin standard",
  "old method-first hero headline"
)
assertNotIncludes(
  "index.html",
  homeHtml,
  "Imate Bitcoin. Sada trebate pravila.",
  "old hero title"
)
assertNotIncludes(
  "index.html",
  homeText,
  "Dođite s bilo kojim Bitcoin pitanjem",
  "old hero supporting sentence"
)
assertNotIncludes(
  "index.html",
  homeText,
  "Za koga je ovaj razgovor?",
  "old audience section heading"
)
assertNotIncludes(
  "index.html",
  homeHtml,
  'href="https://cal.com/btcpavao/uvodni-bitcoin-razgovor"',
  "direct external booking link on homepage"
)
assertNotMatches(
  "index.html",
  homeHtml,
  /<div\b(?=[^>]*bitcoin-stress-test-visual)(?=[^>]*role="img")[^>]*>/,
  "role=img on readable hero visual"
)
assertNotIncludes(
  "index.html",
  homeHtml,
  "framework-stone-symbol",
  "old framework stone symbol markup"
)
assertNotIncludes(
  "index.html",
  homeHtml,
  "service-stone-symbol",
  "old service stone symbol markup"
)
assertIncludes(
  "index.html",
  homeHtml,
  "recognition-stone-image",
  "recognition stone image markup"
)
assertIncludes(
  "index.html",
  homeHtml,
  "three-levels-stone-image",
  "three levels stone image markup"
)
assertIncludes(
  "index.html",
  homeHtml,
  "offer-stone-image",
  "offer stone image markup"
)
assertIncludes(
  "index.html",
  homeHtml,
  "offers-bottleneck-stone-image",
  "bottleneck stone image markup"
)
assertNotIncludes(
  "index.html",
  homeText,
  "razgovorPromijeni",
  "joined header CTA and theme text"
)
assertNotIncludes(
  "index.html",
  homeText,
  "razgovorPogledajte",
  "joined hero CTA text"
)
assertNotIncludes(
  "index.html",
  homeText,
  "uvodni razgovorPogledajte",
  "joined primary and secondary hero CTA text"
)
assertNotIncludes(
  "index.html",
  homeText,
  "razgovorŠto je Bitcoin konzultacija",
  "joined offer CTA and detail link text"
)
assertNotIncludes(
  "index.html",
  homeText,
  "uvodni razgovorŠto je Bitcoin konzultacija",
  "joined Bitcoin konzultacija offer controls"
)
assertNotIncludes(
  "index.html",
  homeText,
  "pravilaDogovorite",
  "joined security CTA text"
)
assertNotIncludes(
  "index.html",
  homeText,
  "vodičePrimijenite",
  "joined guides CTA text"
)
assertNotIncludes(
  "index.html",
  homeText,
  "novcu→",
  "joined method path arrow text"
)
assertNotIncludes(
  "index.html",
  homeText,
  "višak?Stvarni",
  "joined home guide teaser text"
)
assertNotIncludes(
  "index.html",
  homeHtml,
  'alt="Image"',
  "generic image alt text"
)
assertNotIncludes(
  "index.html",
  homeHtml,
  'alt="image"',
  "lowercase generic image alt text"
)
assertNotIncludes(
  "index.html",
  homeHtml,
  'alt="Slika"',
  "generic Croatian image alt text"
)
assertNotIncludes("index.html", homeHtml, 'alt="Logo"', "generic logo alt text")
assertNotIncludes(
  "index.html",
  homeText,
  "vodičei",
  "joined guides and conjunction text"
)
assertNotIncludes(
  "index.html",
  homeText,
  "vodiče iD",
  "joined guides and DvadesetJedan text"
)
assertNotIncludes(
  "index.html",
  homeText,
  "Odabrano pitanje:",
  "default selected question text"
)

for (const awkwardPhrase of [
  "još nije sjelo",
  "glavni čvor",
  "gdje ste zapeli",
  "Tražimo gdje je čvor",
  "pitanje koje vas koči",
]) {
  assertNotIncludes(
    "index.html",
    homeText,
    awkwardPhrase,
    `awkward public copy: ${awkwardPhrase}`
  )
}

assertCount("index.html", homeHtml, '<link rel="canonical"', 1, "canonical tag")
assertBefore(
  "index.html",
  homeHtml,
  "Okvir iz knjige: 7 područja koja treba urediti",
  "Tri razine. Jedan princip.",
  "framework before levels"
)
assertBefore(
  "index.html",
  homeHtml,
  "Tri razine. Jedan princip.",
  "U 15 minuta ne gradimo",
  "levels before services"
)
assertBefore(
  "index.html",
  homeHtml,
  "Saznajte više o meni",
  "Knjiga u nastajanju",
  "about before book"
)
assertBefore(
  "index.html",
  homeHtml,
  "Od držanja Bitcoina",
  "Imam Bitcoin, ali nemam pravila.",
  "hero before recognition"
)
assertBefore(
  "index.html",
  homeHtml,
  "Imam Bitcoin, ali nemam pravila.",
  "Provjerite je li vaš Bitcoin standard stvaran",
  "recognition before standard check"
)
assertBefore(
  "index.html",
  homeHtml,
  "Provjerite je li vaš Bitcoin standard stvaran",
  "Pogledajte kako izgleda osobni Bitcoin standard",
  "standard check before sample standard"
)
assertBefore(
  "index.html",
  homeHtml,
  "Pogledajte kako izgleda osobni Bitcoin standard",
  "Okvir iz knjige: 7 područja koja treba urediti",
  "sample standard before framework"
)
assertBefore(
  "index.html",
  homeHtml,
  "Ne morate sami izabrati paket.",
  "Pomažem pojedincima, obiteljima i poduzetnicima urediti sustav odluka",
  "services before about"
)

if (!home) {
  fail("Route metadata for homepage is missing")
}

function assertStandardCheckCta(relativePath, html, dataCta) {
  assertIncludes(
    relativePath,
    html,
    "Želite provjeriti svoj Bitcoin standard?",
    "standard check CTA title"
  )
  assertIncludes(
    relativePath,
    html,
    "Preuzmite besplatni radni PDF i prođite kroz 7 osnovnih provjera.",
    "standard check CTA copy"
  )
  assertIncludes(
    relativePath,
    html,
    'href="/provjera-bitcoin-standarda/"',
    "standard check CTA href"
  )
  assertIncludes(
    relativePath,
    html,
    `data-cta="${dataCta}"`,
    "standard check CTA metadata"
  )
}

const budgetHtml = readFile("proracun/index.html")
const budgetChecks = [
  ["Proračun | Bitcoin Savjetovanje", "budget page title"],
  ["topic-hero-v2", "budget v2 hero markup"],
  ["DIO I · BEZVREMENSKI RED U NOVCU", "budget eyebrow"],
  [
    "Novac ne nestaje. Samo odlazi na mjesta kojima nismo dali prioritet.",
    "budget hero lead",
  ],
  ["/images/proracun-hero-20260521.webp", "budget hero versioned WebP image"],
  ["/images/proracun-hero-20260521.jpg", "budget hero versioned JPEG image"],
  ["Mediteranska radna scena s proračunom", "budget hero image alt"],
  ["Dogovorite uvodni razgovor", "budget hero CTA"],
  ['data-cta="budget-intro-call"', "budget intro CTA tracking"],
  ["Pregledajte vodiče", "budget guides CTA"],
  ['data-link="budget-guides"', "budget guides link tracking"],
  ["Što uređujete kroz proračun", "budget outcomes section title"],
  ["Svakoj jedinici novca dati namjenu", "budget outcome purpose"],
  ["Vidjeti stvarno stanje bez osuđivanja", "budget outcome real state"],
  ["Prepoznati stvarni višak", "budget outcome surplus"],
  ["Proračun nije ograničenje", "budget clarity section title"],
  ["nego jasnoća", "budget clarity continuation"],
  ["Kome je ovo korisno", "budget audience section title"],
  ["Vodiči iz ovog dijela", "budget guides section title"],
  ["Proračun je prvi korak.", "budget principle title"],
  [
    "Bitcoin ne uklanja potrebu za redom — pojačava je.",
    "budget principle copy",
  ],
  ["Bitcoin kao novac — knjiga u nastajanju", "budget book panel title"],
  ['href="/vodici/svaki-euro-ima-namjenu/"', "budget guide link"],
  ['href="/vodici/stvarni-visak/"', "budget surplus guide link"],
  ['href="/razgovor/"', "budget links to conversation"],
  [
    '<link rel="canonical" href="https://bitcoin-savjetovanje.com/proracun/" />',
    "budget canonical URL",
  ],
  ["WebPage", "budget WebPage schema"],
]

for (const [expected, label] of budgetChecks) {
  assertIncludes("proracun/index.html", budgetHtml, expected, label)
}
assertStandardCheckCta(
  "proracun/index.html",
  budgetHtml,
  "budget-standard-check"
)

assertCount(
  "proracun/index.html",
  budgetHtml,
  '<link rel="canonical"',
  1,
  "canonical tag"
)

if (!budget) {
  fail("Route metadata for /proracun/ is missing")
}

const debtHtml = readFile("dug/index.html")
const debtChecks = [
  ["Dug | Bitcoin Savjetovanje", "debt page title"],
  ["topic-hero-v2", "debt v2 hero markup"],
  ["DIO II · OSLOBODITI BUDUĆNOST", "debt eyebrow"],
  ["Dug je budući novac koji ste već potrošili.", "debt hero lead"],
  ["/images/dug-hero-20260521.webp", "debt hero versioned WebP image"],
  ["/images/dug-hero-20260521.jpg", "debt hero versioned JPEG image"],
  ["Mediteranska radna scena s planom izlaska iz duga", "debt hero image alt"],
  ['data-cta="debt-intro-call"', "debt intro CTA tracking"],
  ['data-link="debt-guides"', "debt guides link tracking"],
  ["Dogovorite uvodni razgovor", "debt hero CTA"],
  ["Pregledajte vodiče", "debt guides CTA"],
  ["Što uređujete kroz dug", "debt outcomes section title"],
  ["Popisati sve obveze", "debt outcome obligations"],
  ["Vidjeti stvarnu cijenu duga", "debt outcome real cost"],
  ["Osloboditi budući novac", "debt outcome future money"],
  ["Postaviti temelj za Bitcoin", "debt outcome Bitcoin foundation"],
  ["Razduživanje nije kazna", "debt freedom section title"],
  ["nego povratak slobode", "debt freedom continuation"],
  ["Kome je ovo korisno", "debt audience section title"],
  ["Vodiči iz ovog dijela", "debt guides section title"],
  ["Razduživanje je prvi korak.", "debt principle title"],
  ["Bitcoin ne uklanja potrebu za redom — pojačava je.", "debt principle copy"],
  ["Bitcoin kao novac — knjiga u nastajanju", "debt book panel title"],
  ['href="/vodici/dug-je-buduci-novac/"', "debt future money guide link"],
  ['href="/vodici/dug-ili-bitcoin/"', "debt or Bitcoin guide link"],
  [
    'href="/vodici/ne-zaduzujte-se-za-bitcoin/"',
    "debt no debt for Bitcoin guide link",
  ],
  ['href="/razgovor/"', "debt links to conversation"],
  [
    '<link rel="canonical" href="https://bitcoin-savjetovanje.com/dug/" />',
    "debt canonical URL",
  ],
  ["WebPage", "debt WebPage schema"],
]

for (const [expected, label] of debtChecks) {
  assertIncludes("dug/index.html", debtHtml, expected, label)
}
assertStandardCheckCta("dug/index.html", debtHtml, "debt-standard-check")

assertCount(
  "dug/index.html",
  debtHtml,
  '<link rel="canonical"',
  1,
  "canonical tag"
)

if (!debt) {
  fail("Route metadata for /dug/ is missing")
}

const givingHtml = readFile("davanje/index.html")
const givingChecks = [
  ["Davanje | Bitcoin Savjetovanje", "giving page title"],
  ["topic-hero-v2", "giving v2 hero markup"],
  ["DIO III · OTVORENA RUKA U TVRDOM NOVCU", "giving eyebrow"],
  ["Davanje mijenja odnos prema novcu.", "giving hero lead"],
  ["/images/davanje-hero-20260521.webp", "giving hero versioned WebP image"],
  ["/images/davanje-hero-20260521.jpg", "giving hero versioned JPEG image"],
  ["Mediteranska radna scena s bilježnicom davanja", "giving hero image alt"],
  ['data-cta="giving-intro-call"', "giving intro CTA tracking"],
  ['data-link="giving-guides"', "giving guides link tracking"],
  ["Dogovorite uvodni razgovor", "giving hero CTA"],
  ["Pregledajte vodiče", "giving guides CTA"],
  ["Što uređujete kroz davanje", "giving outcomes section title"],
  ["Davanje učiniti pravilom", "giving outcome rule"],
  ["Jačati zahvalnost i mir", "giving outcome gratitude"],
  ["Širiti kapacitet za stvaranje", "giving outcome capacity"],
  ["Davanje nije višak", "giving rule section title"],
  ["nego pravilo", "giving rule continuation"],
  ["Kome je ovo korisno", "giving audience section title"],
  ["Vodiči iz ovog dijela", "giving guides section title"],
  ["Davanje je dio reda.", "giving principle title"],
  [
    "Bitcoin ne uklanja potrebu za davanjem — pojačava je.",
    "giving principle copy",
  ],
  ["Bitcoin kao novac — knjiga u nastajanju", "giving book panel title"],
  [
    'href="/vodici/davanje-u-proracunu-nulte-osnove/"',
    "giving budget guide link",
  ],
  ['href="/vodici/davanje-bez-duga/"', "giving without debt guide link"],
  ['href="/vodici/novac-dolazi-od-ljudi/"', "giving people guide link"],
  ['href="/razgovor/"', "giving links to conversation"],
  [
    '<link rel="canonical" href="https://bitcoin-savjetovanje.com/davanje/" />',
    "giving canonical URL",
  ],
  ["WebPage", "giving WebPage schema"],
]

for (const [expected, label] of givingChecks) {
  assertIncludes("davanje/index.html", givingHtml, expected, label)
}
assertStandardCheckCta(
  "davanje/index.html",
  givingHtml,
  "giving-standard-check"
)

assertCount(
  "davanje/index.html",
  givingHtml,
  '<link rel="canonical"',
  1,
  "canonical tag"
)

if (!giving) {
  fail("Route metadata for /davanje/ is missing")
}

const bitcoinMoneyHtml = readFile("bitcoin-kao-novac/index.html")
const bitcoinMoneyChecks = [
  ["Bitcoin kao novac | Bitcoin Savjetovanje", "Bitcoin money page title"],
  ["DIO IV · PRIMARNI NOVAC", "Bitcoin money eyebrow"],
  ["Bitcoin kao novac", "Bitcoin money h1"],
  [
    "Ako Bitcoin shvatite kao novac, pitanje više nije samo kada kupiti",
    "Bitcoin money hero lead",
  ],
  [
    "koji dio mora ostati u državnom novcu za kratke obveze",
    "Bitcoin money state money copy",
  ],
  ["Dogovorite uvodni razgovor", "Bitcoin money hero CTA"],
  ["Pregledajte vodiče", "Bitcoin money guides CTA"],
  ["Odvojiti novac od špekulacije", "Bitcoin money outcome"],
  ["Postaviti Bitcoin kao primarni saldo", "Bitcoin primary balance outcome"],
  ["Bitcoin nije samo još jedna investicija.", "Bitcoin split title"],
  ["Ako Bitcoin gledate kao ulaganje", "investment contrast title"],
  ["Ako Bitcoin gledate kao novac", "money contrast title"],
  ["Vodiči iz ovog dijela", "Bitcoin money guides section"],
  ['href="/vodici/bitcoin-kao-novac/"', "Bitcoin money guide link"],
  [
    'href="/vodici/bitcoin-nije-kripto-portfelj/"',
    "Bitcoin not crypto guide link",
  ],
  ['href="/vodici/pozitivni-neto-priljev/"', "inflow guide link"],
  ['href="/vodici/niste-zakasnili-u-bitcoin/"', "not late guide link"],
  ["Bitcoin može biti primarni novac.", "Bitcoin principle title"],
  ["Ali bolji novac traži bolja pravila.", "Bitcoin principle copy"],
  [
    '<link rel="canonical" href="https://bitcoin-savjetovanje.com/bitcoin-kao-novac/" />',
    "Bitcoin money canonical URL",
  ],
  ['data-cta="bitcoin-money-intro-call"', "Bitcoin money CTA metadata"],
  ['data-link="bitcoin-money-guides"', "Bitcoin money guides metadata"],
]

for (const [expected, label] of bitcoinMoneyChecks) {
  assertIncludes(
    "bitcoin-kao-novac/index.html",
    bitcoinMoneyHtml,
    expected,
    label
  )
}
assertStandardCheckCta(
  "bitcoin-kao-novac/index.html",
  bitcoinMoneyHtml,
  "bitcoin-money-standard-check"
)

assertCount(
  "bitcoin-kao-novac/index.html",
  bitcoinMoneyHtml,
  '<link rel="canonical"',
  1,
  "canonical tag"
)

if (!bitcoinMoney) {
  fail("Route metadata for /bitcoin-kao-novac/ is missing")
}

const netWorthHtml = readFile("bitcoin-i-neto-imovina/index.html")
const netWorthChecks = [
  ["Bitcoin i neto imovina | Bitcoin Savjetovanje", "net worth page title"],
  ["topic-hero-v2", "net worth v2 hero markup"],
  ["DIO V · BITCOIN I NETO IMOVINA", "net worth eyebrow"],
  [
    "Bitcoin kao primarni novac. Neto imovina kao jedna cjelina.",
    "net worth hero lead",
  ],
  [
    "/images/neto-imovina-hero-20260521.webp",
    "net worth hero versioned WebP image",
  ],
  [
    "/images/neto-imovina-hero-20260521.jpg",
    "net worth hero versioned JPEG image",
  ],
  [
    "Mediteranska radna scena s planom neto imovine",
    "net worth hero image alt",
  ],
  ['data-cta="net-worth-intro-call"', "net worth intro CTA tracking"],
  ['data-link="net-worth-guides"', "net worth guides link tracking"],
  ["Dogovorite uvodni razgovor", "net worth hero CTA"],
  ["Pregledajte vodiče", "net worth guides CTA"],
  [
    "Što ćete urediti kroz Bitcoin i neto imovinu",
    "net worth outcomes section title",
  ],
  ["Promatrati neto imovinu kao jednu cjelinu", "net worth whole picture"],
  ["Primijeniti Pravilo trećina", "net worth thirds rule"],
  ["Graditi produktivnu imovinu", "net worth productive assets"],
  ["Održavati likvidnost i sigurnost", "net worth liquidity security"],
  ["Neto imovina nije skup računa", "net worth system section title"],
  ["nego jedan sustav", "net worth system continuation"],
  ["Kome je ovo korisno", "net worth audience section title"],
  ["Vodiči iz ovog dijela", "net worth guides section title"],
  ["Bitcoin je prvi korak.", "net worth principle title"],
  ["Neto imovina je put prema slobodi.", "net worth principle copy"],
  ["Bitcoin kao novac — knjiga u nastajanju", "net worth book panel title"],
  ['href="/vodici/bitcoin-u-neto-imovini/"', "net worth guide link"],
  ['href="/vodici/pravilo-trecina/"', "thirds guide link"],
  ['href="/vodici/pozitivni-neto-priljev/"', "productive assets guide link"],
  ['href="/razgovor/"', "net worth links to conversation"],
  [
    '<link rel="canonical" href="https://bitcoin-savjetovanje.com/bitcoin-i-neto-imovina/" />',
    "net worth canonical URL",
  ],
  ["WebPage", "net worth WebPage schema"],
]

for (const [expected, label] of netWorthChecks) {
  assertIncludes(
    "bitcoin-i-neto-imovina/index.html",
    netWorthHtml,
    expected,
    label
  )
}
assertStandardCheckCta(
  "bitcoin-i-neto-imovina/index.html",
  netWorthHtml,
  "net-worth-standard-check"
)

assertCount(
  "bitcoin-i-neto-imovina/index.html",
  netWorthHtml,
  'class="budget-guide-card"',
  3,
  "net worth guide card count"
)

assertNotIncludes(
  "bitcoin-i-neto-imovina/index.html",
  netWorthHtml,
  "Likvidnost i sigurnost</h3>",
  "net worth fourth guide card title"
)

assertNotIncludes(
  "bitcoin-i-neto-imovina/index.html",
  netWorthHtml,
  'href="/vodici/sigurnost-ne-smije-ovisiti-samo-o-vama/"',
  "net worth fourth guide card link"
)

assertCount(
  "bitcoin-i-neto-imovina/index.html",
  netWorthHtml,
  '<link rel="canonical"',
  1,
  "canonical tag"
)

if (!netWorth) {
  fail("Route metadata for /bitcoin-i-neto-imovina/ is missing")
}

const timeVolatilityHtml = readFile("bitcoin-vrijeme-i-volatilnost/index.html")
const timeVolatilityChecks = [
  [
    "Bitcoin, vrijeme i volatilnost | Bitcoin Savjetovanje",
    "time volatility page title",
  ],
  ["topic-hero-v2", "time volatility v2 hero markup"],
  ["DIO VI · BITCOIN VRIJEME I VOLATILNOST", "time volatility eyebrow"],
  [
    "Dugoročni trend daje okvir. Volatilnost traži pravila.",
    "time volatility hero lead",
  ],
  [
    "/images/vrijeme-volatilnost-hero-20260521.webp",
    "time volatility hero versioned WebP image",
  ],
  [
    "/images/vrijeme-volatilnost-hero-20260521.jpg",
    "time volatility hero versioned JPEG image",
  ],
  [
    "Mediteranska radna scena s pravilima kroz cikluse",
    "time volatility hero image alt",
  ],
  [
    'data-cta="time-volatility-intro-call"',
    "time volatility intro CTA tracking",
  ],
  [
    'data-link="time-volatility-guides"',
    "time volatility guides link tracking",
  ],
  ["Dogovorite uvodni razgovor", "time volatility hero CTA"],
  ["Pregledajte vodiče", "time volatility guides CTA"],
  [
    "Što uređujete kroz vrijeme i volatilnost",
    "time volatility outcomes section title",
  ],
  ["Razumjeti dugoročni trend", "time volatility trend outcome"],
  ["Odvojiti trend od buke", "time volatility noise outcome"],
  ["Smanjiti strah i euforiju", "time volatility fear outcome"],
  ["Uskladiti odluke kroz cikluse", "time volatility cycles outcome"],
  ["Volatilnost nije greška", "time volatility rules section title"],
  ["nego cijena rasta", "time volatility rules continuation"],
  ["Kome je ovo korisno", "time volatility audience section title"],
  ["Vodiči iz ovog dijela", "time volatility guides section title"],
  [
    "Vrijeme je saveznik. Volatilnost je učitelj.",
    "time volatility principle title",
  ],
  [
    "Bitcoin ne uklanja neizvjesnost — daje vam pravila za nju.",
    "time volatility principle copy",
  ],
  [
    "Bitcoin kao novac — knjiga u nastajanju",
    "time volatility book panel title",
  ],
  [
    'href="/vodici/uskladivanje-kupovne-moci-bitcoina/"',
    "time volatility purchasing power guide link",
  ],
  [
    'href="/vodici/cijena-kao-mjera-vremena/"',
    "time volatility price as time guide link",
  ],
  [
    'href="/vodici/saylor-bitcoin-ciklus-ponuda-potraznja/"',
    "time volatility Saylor guide link",
  ],
  ['href="/vodici/dca-nije-dovoljan/"', "time volatility DCA guide link"],
  ['href="/razgovor/"', "time volatility links to conversation"],
  [
    '<link rel="canonical" href="https://bitcoin-savjetovanje.com/bitcoin-vrijeme-i-volatilnost/" />',
    "time volatility canonical URL",
  ],
  ["WebPage", "time volatility WebPage schema"],
]

for (const [expected, label] of timeVolatilityChecks) {
  assertIncludes(
    "bitcoin-vrijeme-i-volatilnost/index.html",
    timeVolatilityHtml,
    expected,
    label
  )
}
assertStandardCheckCta(
  "bitcoin-vrijeme-i-volatilnost/index.html",
  timeVolatilityHtml,
  "time-volatility-standard-check"
)

assertCount(
  "bitcoin-vrijeme-i-volatilnost/index.html",
  timeVolatilityHtml,
  'class="budget-guide-card"',
  4,
  "time volatility guide card count"
)

assertNotIncludes(
  "bitcoin-vrijeme-i-volatilnost/index.html",
  timeVolatilityHtml,
  'href="/vodici/pravilo-trecina/"',
  "time volatility unrelated net worth guide link"
)

assertCount(
  "bitcoin-vrijeme-i-volatilnost/index.html",
  timeVolatilityHtml,
  '<link rel="canonical"',
  1,
  "canonical tag"
)

if (!timeVolatility) {
  fail("Route metadata for /bitcoin-vrijeme-i-volatilnost/ is missing")
}

const custodySecurityHtml = readFile("skrbnistvo-i-sigurnost/index.html")
const custodySecurityChecks = [
  [
    "Bitcoin skrbništvo i sigurnost | Bitcoin Savjetovanje",
    "custody security page title",
  ],
  ["topic-hero-v2", "custody security v2 hero markup"],
  ["DIO VII · SIGURNOST I NASLJEĐIVANJE", "custody security eyebrow"],
  [
    "Ako samo vi znate pristupiti Bitcoinu, sustav još nije dovršen.",
    "custody security hero lead",
  ],
  [
    "Skrbništvo nije samo čuvanje privatnih ključeva",
    "custody security hero body",
  ],
  [
    "/images/skrbnistvo-sigurnost-hero-20260521.webp",
    "custody security hero versioned WebP image",
  ],
  [
    "/images/skrbnistvo-sigurnost-hero-20260521.jpg",
    "custody security hero versioned JPEG image",
  ],
  [
    "Mediteranska radna scena Bitcoin skrbništva",
    "custody security hero image alt",
  ],
  [
    'data-cta="custody-security-intro-call"',
    "custody security intro CTA tracking",
  ],
  [
    'data-link="custody-security-guides"',
    "custody security guides link tracking",
  ],
  ["Dogovorite uvodni razgovor", "custody security hero CTA"],
  ["Pregledajte vodiče", "custody security guides CTA"],
  ["Temeljna načela sigurnosti", "custody security principles section title"],
  ["Vi ste banka", "custody security self custody principle"],
  ["Slojevi zaštite", "custody security layers principle"],
  ["Smanjite rizik", "custody security risk principle"],
  ["Planirajte unaprijed", "custody security planning principle"],
  ["Uključite obitelj", "custody security family principle"],
  ["Redovito provjeravajte", "custody security review principle"],
  ["Zašto je skrbništvo ključno?", "custody security why section title"],
  ["Samo-kontrola donosi slobodu", "custody security self control copy"],
  ["Rizici su stvarni i raznoliki", "custody security risks copy"],
  ["Pogreška je nepovratna", "custody security irreversible copy"],
  ["Planirani sustav štiti vas i vaše", "custody security planned system copy"],
  ["Kome je ovo korisno", "custody security audience section title"],
  [
    "Pojedincima koji žele sigurno čuvati Bitcoin dugoročno.",
    "custody security individual audience",
  ],
  [
    "Obiteljima koje žele jasan plan nasljeđivanja.",
    "custody security family audience",
  ],
  ["Vodiči iz ovog dijela", "custody security guides section title"],
  ["Slojevi skrbništva", "custody security guide layers"],
  ["Backup i oporavak", "custody security guide backup"],
  ["Plan nasljeđivanja", "custody security guide inheritance"],
  [
    "Vaša Bitcoin imovina nije samo za vas.",
    "custody security final panel title",
  ],
  [
    "To je povjerenje koje treba zaštititi danas, da bi služilo u budućnosti.",
    "custody security final panel copy",
  ],
  [
    'href="/vodici/samostalna-pohrana-ili-skrbnik/"',
    "custody security custody layers guide link",
  ],
  [
    'href="/vodici/sigurnost-ne-smije-ovisiti-samo-o-vama/"',
    "custody security backup guide link",
  ],
  [
    'href="/vodici/obiteljski-pristup-bitcoinu/"',
    "custody security inheritance guide link",
  ],
  ['href="/razgovor/"', "custody security links to conversation"],
  [
    '<link rel="canonical" href="https://bitcoin-savjetovanje.com/skrbnistvo-i-sigurnost/" />',
    "custody security canonical URL",
  ],
  ["WebPage", "custody security WebPage schema"],
]

for (const [expected, label] of custodySecurityChecks) {
  assertIncludes(
    "skrbnistvo-i-sigurnost/index.html",
    custodySecurityHtml,
    expected,
    label
  )
}
assertStandardCheckCta(
  "skrbnistvo-i-sigurnost/index.html",
  custodySecurityHtml,
  "custody-security-standard-check"
)

assertCount(
  "skrbnistvo-i-sigurnost/index.html",
  custodySecurityHtml,
  'class="budget-guide-card"',
  3,
  "custody security guide card count"
)

assertNotIncludes(
  "skrbnistvo-i-sigurnost/index.html",
  custodySecurityHtml,
  "Sigurnosna provjera",
  "custody security fourth guide card title"
)

assertNotIncludes(
  "skrbnistvo-i-sigurnost/index.html",
  custodySecurityHtml,
  'href="/vodici/obiteljski-bitcoin-trezor/"',
  "custody security fourth guide card link"
)

assertCount(
  "skrbnistvo-i-sigurnost/index.html",
  custodySecurityHtml,
  '<link rel="canonical"',
  1,
  "canonical tag"
)

if (!custodySecurity) {
  fail("Route metadata for /skrbnistvo-i-sigurnost/ is missing")
}

const conversationHtml = readFile("razgovor/index.html")
const conversationText = textWithoutTags(conversationHtml)
const conversationChecks = [
  ["Dogovorite 15-minutni uvodni razgovor", "conversation page title"],
  [
    "Vidimo gdje ste na putu od držanja Bitcoina do sustava odluka — osobno, obiteljski ili poslovno.",
    "conversation scope subheadline",
  ],
  ["/images/razgovor-hero-20260601.webp", "conversation hero WebP image"],
  ["/images/razgovor-hero-20260601.jpg", "conversation hero JPEG fallback"],
  [
    "Mediteranska scena s kalendarom, pitanjem i simbolima za uvodni Bitcoin razgovor.",
    "conversation hero image alt text",
  ],
  [
    "Najbolji razgovori počinju jednom konkretnom odlukom",
    "conversation decision prompt",
  ],
  ["Pokušavam odlučiti", "booking note prompt"],
  ["Ne šaljite seed phrase", "conversation sensitive data warning"],
  ["stvarni višak riznice", "conversation business treasury example"],
  ["učvrstiti Bitcoin tezu", "conversation Bitcoin thesis example"],
  ["Odaberite termin za uvodni razgovor.", "inline calendar section title"],
  [
    'data-cal-inline="uvodni-bitcoin-razgovor"',
    "inline calendar wrapper metadata",
  ],
  [
    'data-cta="conversation-inline-calendar-fallback"',
    "inline calendar fallback CTA metadata",
  ],
  [
    'data-cta="conversation-inline-calendar-mobile"',
    "inline calendar mobile modal CTA metadata",
  ],
  [
    "Još primjera pitanja, ako trebate pomoć",
    "question examples after calendar",
  ],
  ["Osobna pitanja", "personal questions accordion"],
  ["Obiteljska pitanja", "family questions accordion"],
  ["Poslovna pitanja", "business questions accordion"],
  [
    "Ne znam kako odvojiti privatni Bitcoin od poslovnog Bitcoina.",
    "conversation private business Bitcoin question",
  ],
  [
    "Što se može dogoditi nakon razgovora?",
    "conversation outcome section title",
  ],
  ["Nakon razgovora moguća su tri ishoda", "conversation outcome options copy"],
  [
    "Ne mora svaki uvodni razgovor završiti plaćenim nastavkom.",
    "conversation no forced paid continuation copy",
  ],
  ["Želite vidjeti krajnji rezultat?", "conversation sample standard title"],
  [
    "anonimni ogledni primjer osobnog Bitcoin standarda",
    "conversation sample standard copy",
  ],
  [
    'href="/primjer-osobnog-bitcoin-standarda/"',
    "conversation sample standard href",
  ],
  [
    'data-cta="conversation-sample-standard"',
    "conversation sample standard CTA metadata",
  ],
  ["Spremni za uvodni razgovor?", "conversation final CTA title"],
  ["Ne morate imati gotov plan", "conversation final CTA plan reassurance"],
  [
    '<link rel="canonical" href="https://bitcoin-savjetovanje.com/razgovor/" />',
    "conversation canonical URL",
  ],
  ["WebPage", "conversation WebPage schema"],
  [
    "https://cal.com/btcpavao/uvodni-bitcoin-razgovor",
    "existing external booking URL",
  ],
  ['data-cal-namespace="uvodni-bitcoin-razgovor"', "Cal embed namespace"],
  ['data-cal-link="btcpavao/uvodni-bitcoin-razgovor"', "Cal embed link"],
  ['data-cal-mode="modal"', "Cal booking CTA modal mode"],
  ["data-cal-config=", "Cal embed config attribute"],
  ["month_view", "Cal embed month view config"],
  ['data-cta="conversation-page-calendar"', "calendar CTA metadata"],
  [
    'data-link="conversation-bitcoin-consultation"',
    "Bitcoin konzultacija page link",
  ],
  ['href="/bitcoin-konzultacija/"', "Bitcoin konzultacija href"],
  ['data-link="conversation-personal-standard"', "personal standard page link"],
  ['href="/osobni-bitcoin-standard/"', "personal standard href"],
  [
    'data-cta="conversation-page-final-calendar"',
    "final calendar CTA metadata",
  ],
  [
    'data-link="conversation-page-final-security"',
    "final security link metadata",
  ],
]

for (const [expected, label] of conversationChecks) {
  assertIncludes("razgovor/index.html", conversationHtml, expected, label)
}

assertCount(
  "razgovor/index.html",
  conversationHtml,
  'data-cal-link="btcpavao/uvodni-bitcoin-razgovor"',
  4,
  "Cal embed booking triggers"
)
assertMatches(
  "razgovor/index.html",
  conversationHtml,
  /<a\b(?=[^>]*href="https:\/\/cal\.com\/btcpavao\/uvodni-bitcoin-razgovor")(?=[^>]*data-cta="header-intro-call")(?=[^>]*data-cal-link="btcpavao\/uvodni-bitcoin-razgovor")[^>]*>/,
  "conversation header CTA opens Cal booking directly"
)
assertMatches(
  "razgovor/index.html",
  conversationHtml,
  /<a\b(?=[^>]*href="https:\/\/cal\.com\/btcpavao\/uvodni-bitcoin-razgovor")(?=[^>]*data-cal-link="btcpavao\/uvodni-bitcoin-razgovor")[^>]*>/,
  "Cal booking CTA real href fallback"
)
assertNotMatches(
  "razgovor/index.html",
  conversationHtml,
  /<a\b(?=[^>]*data-cal-link="btcpavao\/uvodni-bitcoin-razgovor")(?=[^>]*href="javascript:)[^>]*>/,
  "JavaScript-only Cal booking CTA"
)
assertNotMatches(
  "razgovor/index.html",
  conversationHtml,
  /<a\b(?=[^>]*href="https:\/\/cal\.com\/btcpavao\/uvodni-bitcoin-razgovor")(?=[^>]*target="_blank")[^>]*>/,
  "Cal booking links opening in a new tab"
)

assertIncludes(
  "razgovor/index.html",
  conversationText,
  "sljedeći korak je Bitcoin konzultacija",
  "Bitcoin konzultacija next step copy"
)

for (const awkwardPhrase of [
  "još nije sjelo",
  "glavni čvor",
  "gdje ste zapeli",
  "Tražimo gdje je čvor",
  "pitanje koje vas koči",
]) {
  assertNotIncludes(
    "razgovor/index.html",
    conversationText,
    awkwardPhrase,
    `awkward public copy: ${awkwardPhrase}`
  )
}

assertCount(
  "razgovor/index.html",
  conversationHtml,
  '<link rel="canonical"',
  1,
  "canonical tag"
)

if (!conversation) {
  fail("Route metadata for /razgovor/ is missing")
}

const bitcoinAdviceHtml = readFile("bitcoin-savjetovanje/index.html")
const bitcoinAdviceChecks = [
  ["Bitcoin savjetovanje Hrvatska", "Bitcoin advice hero eyebrow"],
  [
    "Bitcoin savjetovanje jedan-na-jedan za put od držanja Bitcoina do sustava odluka.",
    "Bitcoin advice hero title",
  ],
  [
    "/images/bitcoin-savjetovanje-hero-20260601.webp",
    "Bitcoin advice hero WebP image",
  ],
  [
    "/images/bitcoin-savjetovanje-hero-20260601.jpg",
    "Bitcoin advice hero JPEG fallback",
  ],
  [
    "Mediteranska scena s Bitcoin simbolom i oznakama za proračun, neto imovinu, obitelj, posao i sigurnost.",
    "Bitcoin advice hero image alt text",
  ],
  [
    '<link rel="canonical" href="https://bitcoin-savjetovanje.com/bitcoin-savjetovanje/" />',
    "Bitcoin advice canonical URL",
  ],
]

for (const [expected, label] of bitcoinAdviceChecks) {
  assertIncludes(
    "bitcoin-savjetovanje/index.html",
    bitcoinAdviceHtml,
    expected,
    label
  )
}

const bitcoinConsultationHtml = readFile("bitcoin-konzultacija/index.html")
const bitcoinConsultationChecks = [
  ["Bitcoin konzultacija", "Bitcoin konzultacija page title"],
  ["200 €", "Bitcoin konzultacija price"],
  ["jedan dubinski razgovor", "Bitcoin konzultacija duration"],
  [
    "Jedan dubinski razgovor za jedno ozbiljno Bitcoin pitanje",
    "Bitcoin konzultacija short description",
  ],
  [
    "Jedan dubinski razgovor, ali tek nakon uvodnog razgovora.",
    "Bitcoin konzultacija intro-first microcopy",
  ],
  [
    "/images/service-visuals/consultation-hero-20260601.webp",
    "Bitcoin konzultacija new hero WebP image",
  ],
  [
    "/images/service-visuals/consultation-hero-20260601.jpg",
    "Bitcoin konzultacija new hero JPEG fallback",
  ],
  [
    "Mediteranski stol s bilježnicom i karticama za Bitcoin konzultaciju.",
    "Bitcoin konzultacija hero image alt text",
  ],
  [
    "Ne kupuje se odmah. Prvo vidimo ima li smisla.",
    "Bitcoin konzultacija no immediate purchase microcopy",
  ],
  [
    "Nakon Bitcoin konzultacije trebali biste imati jednu od tri stvari",
    "Bitcoin konzultacija outcomes section",
  ],
  [
    "jasniju i čvršću Bitcoin tezu",
    "Bitcoin konzultacija thesis strengthening outcome",
  ],
  [
    "Konzultacija može biti osobna, obiteljska ili poslovna",
    "Bitcoin konzultacija business scope section",
  ],
  ["poslovne riznice", "Bitcoin konzultacija business treasury copy"],
  ["Što pripremiti", "Bitcoin konzultacija preparation section"],
  ["Kada nije za vas", "Bitcoin konzultacija not for section"],
  [
    "Bitcoin konzultacija ili osobni Bitcoin standard?",
    "Bitcoin konzultacija comparison section",
  ],
  ["Kako razgovor završava", "Bitcoin konzultacija ending section"],
  [
    "Na kraju ne dobivate savjet",
    "Bitcoin konzultacija no buy-sell advice copy",
  ],
  ["nema naloga kupnje ili prodaje", "no order copy"],
  ["kupi", "Bitcoin konzultacija no-buy framing"],
  ["prodaj", "Bitcoin konzultacija no-sell framing"],
  ["gdje je stvarni rizik", "Bitcoin konzultacija risk framing"],
  ["sljedeći korak bio razuman", "Bitcoin konzultacija reasonable next step"],
  [
    "Bitcoin konzultacija je za jedno ozbiljno pitanje",
    "Bitcoin konzultacija comparison left copy",
  ],
  [
    "Osobni Bitcoin standard je za pisani sustav pravila",
    "Bitcoin konzultacija comparison right copy",
  ],
  [
    'href="/osobni-bitcoin-standard/"',
    "Bitcoin konzultacija links to personal standard",
  ],
  [
    'data-link="bitcoin-consultation-personal-standard"',
    "Bitcoin konzultacija personal standard metadata",
  ],
  ["Krenite od uvodnog razgovora", "Bitcoin konzultacija primary CTA"],
  ["ne tražim seed phrase", "Bitcoin konzultacija no seed phrase copy"],
  [
    "ne upravljam vašim sredstvima",
    "Bitcoin konzultacija no asset management copy",
  ],
  [
    'data-cta="bitcoin-consultation-intro-call"',
    "Bitcoin konzultacija intro CTA metadata",
  ],
  [
    'data-cta="bitcoin-consultation-final-intro-call"',
    "Bitcoin konzultacija final intro CTA metadata",
  ],
  [
    'data-cta="bitcoin-consultation-security"',
    "Bitcoin konzultacija security CTA metadata",
  ],
  [
    '<link rel="canonical" href="https://bitcoin-savjetovanje.com/bitcoin-konzultacija/" />',
    "Bitcoin konzultacija canonical URL",
  ],
]

for (const [expected, label] of bitcoinConsultationChecks) {
  assertIncludes(
    "bitcoin-konzultacija/index.html",
    bitcoinConsultationHtml,
    expected,
    label
  )
}

assertCount(
  "bitcoin-konzultacija/index.html",
  bitcoinConsultationHtml,
  '<link rel="canonical"',
  1,
  "canonical tag"
)

if (!bitcoinConsultation) {
  fail("Route metadata for /bitcoin-konzultacija/ is missing")
}

const personalStandardHtml = readFile("osobni-bitcoin-standard/index.html")
const personalStandardChecks = [
  ["Osobni Bitcoin standard", "personal standard title"],
  ["4–6 tjedana", "personal standard duration"],
  ["1.500 EUR", "personal standard price"],
  ["pisani osobni Bitcoin standard", "personal standard written outcome copy"],
  [
    "4–6 tjedana rada na pisanom sustavu odluka za život s Bitcoinom.",
    "personal standard hero lead",
  ],
  [
    "Program se ne kupuje preko checkouta. Prvi korak je razgovor.",
    "personal standard no checkout microcopy",
  ],
  [
    "/images/service-visuals/standard-hero-20260601.webp",
    "personal standard hero WebP image",
  ],
  [
    "/images/service-visuals/standard-hero-20260601.jpg",
    "personal standard hero JPEG fallback",
  ],
  [
    "Mediteranska scena s otvorenom knjigom osobnog Bitcoin standarda i simbolima za obitelj, sigurnost, imovinu i davanje.",
    "personal standard hero image alt text",
  ],
  [
    "Ne kupuje se odmah. Prvo vidimo ima li smisla.",
    "personal standard no immediate purchase microcopy",
  ],
  [
    "Na kraju programa imate pisani osobni Bitcoin standard",
    "personal standard outcome section",
  ],
  [
    "poslovni sloj ako je primjenjivo",
    "personal standard compact business outcome",
  ],
  [
    "Kako izgleda pisani osobni Bitcoin standard?",
    "personal standard deliverable mockup section",
  ],
  [
    "Ne kupujete samo razgovor. Dobivate pisani sustav odluka.",
    "personal standard sample section title",
  ],
  [
    "Program završava konkretnim dokumentom",
    "personal standard sample section copy",
  ],
  [
    'href="/primjer-osobnog-bitcoin-standarda/"',
    "personal standard sample href",
  ],
  [
    'data-cta="personal-standard-sample"',
    "personal standard sample CTA metadata",
  ],
  ["Tri sloja standarda", "personal standard layers section"],
  ["Privatni i obiteljski sloj", "personal standard private family layer"],
  ["Poslovni sloj, ako je primjenjivo", "personal standard business layer"],
  ["Sigurnosni sloj", "personal standard security layer"],
  ["Kako radimo kroz 4–6 tjedana", "personal standard program steps section"],
  ["Novac, obveze i stvarni višak", "budget step"],
  ["Dug i davanje", "debt giving step"],
  ["Bitcoin kao novac", "Bitcoin money step"],
  ["Neto imovina, vrijeme i volatilnost", "net worth volatility step"],
  ["Sigurnost, obitelj i nasljeđivanje", "security family step"],
  [
    "Ako vodite posao, standard ima i poslovni sloj",
    "personal standard business section",
  ],
  ["privatni i poslovni Bitcoin", "personal standard private business Bitcoin"],
  ["poreze, plaće", "personal standard payroll tax business copy"],
  ["višak poslovne riznice", "personal standard business treasury surplus"],
  [
    "Ovo je okvir pravila, ne financijski plan",
    "personal standard not financial plan disclaimer",
  ],
  ["Cijena i ulaz", "price and entry section"],
  ["Ovo nije", "not this section"],
  ["nije investicijski savjet", "no investment advice"],
  [
    "nije porezni, pravni ili računovodstveni savjet",
    "no tax legal accounting advice",
  ],
  ["nije traženje seed phrase", "no seed phrase request"],
  ["Česta pitanja o programu", "program FAQ"],
  ['href="/razgovor/"', "personal standard links to conversation"],
  [
    'data-cta="personal-standard-hero-call"',
    "personal standard hero CTA metadata",
  ],
  [
    'data-cta="personal-standard-pricing-call"',
    "personal standard pricing CTA metadata",
  ],
  [
    'data-cta="personal-standard-final-call"',
    "personal standard final CTA metadata",
  ],
  [
    '<link rel="canonical" href="https://bitcoin-savjetovanje.com/osobni-bitcoin-standard/" />',
    "personal standard canonical URL",
  ],
  ["Service", "personal standard Service schema"],
]

for (const [expected, label] of personalStandardChecks) {
  assertIncludes(
    "osobni-bitcoin-standard/index.html",
    personalStandardHtml,
    expected,
    label
  )
}

assertCount(
  "osobni-bitcoin-standard/index.html",
  personalStandardHtml,
  '<link rel="canonical"',
  1,
  "canonical tag"
)

if (!personalBitcoinStandard) {
  fail("Route metadata for /osobni-bitcoin-standard/ is missing")
}

const samplePersonalStandardHtml = readFile(
  "primjer-osobnog-bitcoin-standarda/index.html"
)
const samplePersonalStandardChecks = [
  ["OGLEDNI PRIMJER", "sample standard eyebrow"],
  ["Kako izgleda osobni Bitcoin standard?", "sample standard page title"],
  [
    "Anonimni primjer dokumenta koji pokazuje kako se Bitcoin može pretvoriti iz odvojene imovine u jasan sustav odluka.",
    "sample standard hero subtitle",
  ],
  [
    'href="/downloads/sample-osobni-bitcoin-standard.pdf"',
    "sample standard PDF href",
  ],
  ['data-cta="sample-standard-pdf"', "sample standard PDF CTA metadata"],
  [
    'data-link="sample-standard-conversation"',
    "sample standard conversation metadata",
  ],
  [
    "/images/downloads/primjer-osobnog-bitcoin-standarda-cover.webp",
    "sample standard cover WebP image",
  ],
  [
    "/images/downloads/primjer-osobnog-bitcoin-standarda-cover.png",
    "sample standard cover fallback image",
  ],
  ["Što dokument pokazuje", "sample standard structure section"],
  [
    "Ovo nije stvarni klijent i nije financijski, porezni ni pravni savjet.",
    "sample standard no advice disclaimer",
  ],
  ["Proračun i stvarni višak", "sample standard budget card"],
  ["Dug i razduživanje", "sample standard debt card"],
  ["Bitcoin kao primarni novac", "sample standard Bitcoin money card"],
  ["90-dnevni plan provedbe", "sample standard implementation plan card"],
  ["Za koga je primjer koristan", "sample standard audience section"],
  [
    "kako sigurnost pretvoriti u ponovljiv proces",
    "sample standard audience copy",
  ],
  [
    "Ne kupujete samo razgovor. Gradite sustav.",
    "sample standard system section",
  ],
  ["Želite svoj osobni Bitcoin standard?", "sample standard final CTA title"],
  [
    "Bez slanja osjetljivih podataka, bez seed phrasea, bez privatnih ključeva i bez pristupa novčaniku.",
    "sample standard safety CTA copy",
  ],
  [
    'data-cta="sample-standard-final-conversation"',
    "sample standard final conversation metadata",
  ],
  [
    '<link rel="canonical" href="https://bitcoin-savjetovanje.com/primjer-osobnog-bitcoin-standarda/" />',
    "sample standard canonical URL",
  ],
  ["Primjer osobnog Bitcoin standarda", "sample standard WebPage schema"],
]

for (const [expected, label] of samplePersonalStandardChecks) {
  assertIncludes(
    "primjer-osobnog-bitcoin-standarda/index.html",
    samplePersonalStandardHtml,
    expected,
    label
  )
}

assertCount(
  "primjer-osobnog-bitcoin-standarda/index.html",
  samplePersonalStandardHtml,
  '<link rel="canonical"',
  1,
  "canonical tag"
)

if (!samplePersonalBitcoinStandard) {
  fail("Route metadata for /primjer-osobnog-bitcoin-standarda/ is missing")
}

const standardCheckHtml = readFile("provjera-bitcoin-standarda/index.html")
const standardCheckChecks = [
  ["BESPLATNI RADNI PDF", "standard check eyebrow"],
  ["7 provjera osobnog Bitcoin standarda", "standard check page title"],
  [
    "Radni PDF za osobu koja ima Bitcoin, ali želi provjeriti ima li stvarna pravila za proračun, dug, davanje, neto imovinu, volatilnost, sigurnost i obitelj.",
    "standard check hero subtitle",
  ],
  [
    'href="/downloads/7-provjera-osobnog-bitcoin-standarda.pdf"',
    "standard check PDF href",
  ],
  ['data-cta="standard-check-pdf"', "standard check PDF CTA metadata"],
  [
    'data-link="standard-check-conversation"',
    "standard check conversation metadata",
  ],
  [
    "/images/downloads/7-provjera-osobnog-bitcoin-standarda-cover.webp",
    "standard check cover WebP image",
  ],
  [
    "/images/downloads/7-provjera-osobnog-bitcoin-standarda-cover.png",
    "standard check cover image",
  ],
  ["Što provjeravate?", "standard check cards section"],
  ["Znate li koji je novac stvarno slobodan?", "standard check budget card"],
  ["Zauzima li dug vašu budućnost?", "standard check debt card"],
  [
    "Je li Bitcoin odvojena imovina ili dio sustava?",
    "standard check Bitcoin money card",
  ],
  [
    "Zna li netko što treba učiniti ako vi ne možete?",
    "standard check security family card",
  ],
  ["Za koga je PDF?", "standard check audience section"],
  [
    "Nije namijenjen trgovanju, prognoziranju cijene ni tehničkom postavljanju novčanika.",
    "standard check boundary copy",
  ],
  ["Što nakon provjere?", "standard check next step section"],
  [
    "Bez slanja osjetljivih podataka, bez seed phrasea, bez privatnih ključeva i bez pristupa novčaniku.",
    "standard check safety CTA copy",
  ],
  [
    'data-cta="standard-check-final-conversation"',
    "standard check final conversation metadata",
  ],
  [
    '<link rel="canonical" href="https://bitcoin-savjetovanje.com/provjera-bitcoin-standarda/" />',
    "standard check canonical URL",
  ],
  ["7 provjera osobnog Bitcoin standarda", "standard check WebPage schema"],
]

for (const [expected, label] of standardCheckChecks) {
  assertIncludes(
    "provjera-bitcoin-standarda/index.html",
    standardCheckHtml,
    expected,
    label
  )
}

assertCount(
  "provjera-bitcoin-standarda/index.html",
  standardCheckHtml,
  '<link rel="canonical"',
  1,
  "canonical tag"
)

if (!bitcoinStandardCheck) {
  fail("Route metadata for /provjera-bitcoin-standarda/ is missing")
}

const audiencePageChecks = [
  {
    routePath: "/osobno/",
    relativePath: "osobno/index.html",
    routeMeta: personalAudience,
    checks: [
      [
        "Osobni Bitcoin standard za pojedinca | Bitcoin Savjetovanje",
        "personal audience page title",
      ],
      ["OSOBNI BITCOIN STANDARD ZA POJEDINCA", "personal audience eyebrow"],
      ["Imate Bitcoin. Sada trebate pravila.", "personal audience hero title"],
      [
        "Uredite proračun, dug, stvarni višak, neto imovinu i reakcije na volatilnost",
        "personal audience hero lead",
      ],
      [
        "/images/audiences/osobno-hero.webp",
        "personal audience WebP hero source",
      ],
      ["/images/audiences/osobno-hero.png", "personal audience hero image"],
      [
        "Mediteranski stol s bilježnicom, Bitcoin kovanicom i osobnim financijskim simbolima.",
        "personal audience hero alt",
      ],
      ["Gdje osobni Bitcoin okvir najčešće puca", "personal problem section"],
      ["Ne znate koji je novac stvarno slobodan.", "personal problem card"],
      ["Što postaje jasnije", "personal outcome section"],
      [
        "Volatilnost postaje povratna informacija, ne zapovijed.",
        "personal outcome",
      ],
      ["Kako slažemo osobni okvir", "personal method section"],
      ["Cijena kao mjera vremena", "personal fallback guide link label"],
      ['href="/vodici/dug-ili-bitcoin/"', "personal debt guide fallback href"],
      [
        'href="/vodici/bitcoin-kao-novac/"',
        "personal Bitcoin money guide href",
      ],
      ['data-cta="audience-osobno-primary"', "personal hero CTA metadata"],
      ['data-cta="audience-osobno-final"', "personal final CTA metadata"],
      [
        '<link rel="canonical" href="https://bitcoin-savjetovanje.com/osobno/" />',
        "personal audience canonical URL",
      ],
      ["Service", "personal audience Service schema"],
    ],
  },
  {
    routePath: "/obitelj/",
    relativePath: "obitelj/index.html",
    routeMeta: familyAudience,
    checks: [
      [
        "Obiteljski Bitcoin standard | Bitcoin Savjetovanje",
        "family audience page title",
      ],
      ["OBITELJSKI BITCOIN STANDARD", "family audience eyebrow"],
      [
        "Bitcoin ne smije živjeti samo u glavi jedne osobe.",
        "family audience hero title",
      ],
      [
        "Pretvorite osobno razumijevanje Bitcoina u obiteljski jezik",
        "family audience hero lead",
      ],
      [
        "/images/audiences/obitelj-hero.webp",
        "family audience WebP hero source",
      ],
      ["/images/audiences/obitelj-hero.png", "family audience hero image"],
      [
        "Par za stolom pregledava obiteljska pravila uz trezor, ključeve i Bitcoin kovanicu.",
        "family audience hero alt",
      ],
      ["Obiteljski rizik često nije tehnički", "family problem section"],
      ["Jedna osoba nosi previše znanja.", "family problem card"],
      ["Što obitelj dobiva", "family outcome section"],
      ["Postoji prvi korak oporavka bez otkrivanja tajni.", "family outcome"],
      ["Kako slažemo obiteljski okvir", "family method section"],
      ['href="/sigurnost/"', "family security page link"],
      [
        'href="/vodici/obiteljski-bitcoin-trezor/"',
        "family guide fallback href",
      ],
      ['href="/osobni-bitcoin-standard/"', "family standard link"],
      ['data-cta="audience-obitelj-primary"', "family hero CTA metadata"],
      ['data-cta="audience-obitelj-final"', "family final CTA metadata"],
      [
        '<link rel="canonical" href="https://bitcoin-savjetovanje.com/obitelj/" />',
        "family audience canonical URL",
      ],
      ["Service", "family audience Service schema"],
    ],
  },
  {
    routePath: "/poduzetnici/",
    relativePath: "poduzetnici/index.html",
    routeMeta: businessAudience,
    checks: [
      [
        "Bitcoin standard za poduzetnike | Bitcoin Savjetovanje",
        "business audience page title",
      ],
      ["BITCOIN STANDARD ZA PODUZETNIKE", "business audience eyebrow"],
      [
        "Prije poslovnog Bitcoina treba urediti poslovni novac.",
        "business audience hero title",
      ],
      [
        "Razdvojite poreze, plaće, dobavljače, pričuvu, višak",
        "business audience hero lead",
      ],
      [
        "/images/audiences/poduzetnici-hero.webp",
        "business audience WebP hero source",
      ],
      [
        "/images/audiences/poduzetnici-hero.png",
        "business audience hero image",
      ],
      [
        "Mediteranski radni stol s poslovnim dokumentima, ladicama obveza i Bitcoin kovanicom.",
        "business audience hero alt",
      ],
      ["Poslovni Bitcoin počinje prije kupnje", "business problem section"],
      ["Prihod nije slobodan novac.", "business problem card"],
      ["Što poslovni okvir razdvaja", "business outcome section"],
      [
        "Znate kada Bitcoin odluka pripada poslu, a kada vlasniku.",
        "business outcome",
      ],
      ["Kako slažemo poslovni okvir", "business method section"],
      [
        'href="/vodici/prihod-nije-slobodan-novac/"',
        "business revenue guide href",
      ],
      [
        'href="/vodici/poslovni-bitcoin-nije-privatni-bitcoin/"',
        "business private/company guide href",
      ],
      ['href="/bitcoin-konzultacija/"', "business consultation link"],
      ['data-cta="audience-poduzetnici-primary"', "business hero CTA metadata"],
      ['data-cta="audience-poduzetnici-final"', "business final CTA metadata"],
      [
        '<link rel="canonical" href="https://bitcoin-savjetovanje.com/poduzetnici/" />',
        "business audience canonical URL",
      ],
      ["Service", "business audience Service schema"],
    ],
  },
]

for (const audiencePage of audiencePageChecks) {
  const html = readFile(audiencePage.relativePath)

  for (const [expected, label] of audiencePage.checks) {
    assertIncludes(audiencePage.relativePath, html, expected, label)
  }

  assertIncludes(
    audiencePage.relativePath,
    html,
    'href="/razgovor/"',
    `${audiencePage.routePath} links to conversation`
  )
  assertIncludes(
    audiencePage.relativePath,
    html,
    "Ne tražim seed phrase, privatne ključeve ni pristup novčaniku.",
    `${audiencePage.routePath} safety boundary`
  )
  assertIncludes(
    audiencePage.relativePath,
    html,
    "Za porezna i pravna pitanja trebate odgovarajuće stručnjake.",
    `${audiencePage.routePath} tax/legal boundary`
  )
  assertCount(
    audiencePage.relativePath,
    html,
    '<link rel="canonical"',
    1,
    "canonical tag"
  )

  if (!audiencePage.routeMeta) {
    fail(`Route metadata for ${audiencePage.routePath} is missing`)
  }
}

const guidesIndexHtml = readFile("vodici/index.html")
const guidesIndexText = textWithoutTags(guidesIndexHtml)
const guideIndexChecks = [
  ["Vodiči za knjigu Bitcoin kao novac", "guide index title"],
  [
    "Vodiči objašnjavaju okvir za život s Bitcoinom kao novcem",
    "guide index subtitle",
  ],
  ['href="/razgovor/"', "guide index links to conversation page"],
  ['data-link="guide-card"', "guide index card link metadata"],
  ['data-link="guide-starter-card"', "guide starter card link metadata"],
  ["starter-guide-card__image", "guide index starter cover markup"],
  ["guide-roadmap-card__image", "guide index roadmap cover markup"],
  ["advanced-guide-card__image", "guide index advanced cover markup"],
  ['data-cta="guides-index-top-intro-call"', "guide index top CTA metadata"],
  ['data-cta="guides-index-intro-call"', "guide index final CTA metadata"],
  ['href="#pocetak"', "guide section nav start"],
  ['href="#poduzetnici"', "guide section nav entrepreneurs"],
  ['href="#mapa"', "guide section nav map"],
  ['href="#napredno"', "guide section nav advanced"],
  ["Ako želite samo početak, krenite ovdje", "guide index starting point copy"],
  ["Svaki euro ima namjenu", "starter guide 1"],
  ["Dug ili Bitcoin?", "starter guide 2"],
  ["Bitcoin kao novac", "starter guide 3"],
  ["Kad to prođete, nastavite kroz cijelu mapu.", "starter transition copy"],
  ["Ako vodite posao, krenite ovdje", "guide business path title"],
  ["Prihod nije slobodan novac", "business income guide title"],
  ["Poslovni Bitcoin nije privatni Bitcoin", "business Bitcoin guide title"],
  ["Cijela mapa vodiča", "guide full map section"],
  ["Napredno / često se mijenja", "guide advanced contextual section"],
  [
    "Ove teme ovise o alatima, pravilima i tržišnim okolnostima.",
    "guide advanced dependency note",
  ],
  ["Proračun", "guide roadmap budget"],
  ["Dug", "guide roadmap debt"],
  ["Davanje", "guide roadmap giving"],
  ["Bitcoin kao novac", "guide roadmap Bitcoin money"],
  ["Neto imovina", "guide roadmap net worth"],
  ["Vrijeme i volatilnost", "guide roadmap time volatility"],
  ["Sigurnost i obitelj", "guide roadmap security family"],
  [
    "Bitcoin kao stopa prepreke za financijske odluke",
    "guide hurdle rate title",
  ],
  ["Od društva duga prema društvu vlasništva", "guide ownership society title"],
  ["Digitalni kredit nije Bitcoin", "guide digital credit title"],
  ['href="#proracun"', "budget category chip"],
  ['href="#dug"', "debt category chip"],
  ['href="#davanje"', "giving category chip"],
  ['href="#bitcoin"', "Bitcoin category chip"],
  ['href="#neto-imovina"', "net worth category chip"],
  ['href="#vrijeme-volatilnost"', "time volatility category chip"],
  ['href="#sigurnost"', "security category chip"],
  ['id="proracun"', "budget roadmap target id"],
  ['id="dug"', "debt roadmap target id"],
  ['id="davanje"', "giving roadmap target id"],
  ['id="bitcoin"', "Bitcoin roadmap target id"],
  ['id="neto-imovina"', "net worth roadmap target id"],
  ['id="vrijeme-volatilnost"', "time volatility roadmap target id"],
  ['id="sigurnost"', "security roadmap target id"],
  [
    "Uvodni razgovor pomaže vidjeti koji dio okvira je za vas trenutno najvažniji.",
    "guide index final CTA copy",
  ],
  [
    '<link rel="canonical" href="https://bitcoin-savjetovanje.com/vodici/" />',
    "guide index canonical URL",
  ],
  ["CollectionPage", "CollectionPage schema"],
  ["ItemList", "ItemList schema"],
  ['href="/#ponude"', "guide index services nav link"],
  [">Usluge<", "guide index services nav label"],
]

for (const [expected, label] of guideIndexChecks) {
  assertIncludes("vodici/index.html", guidesIndexHtml, expected, label)
}

for (const [expected, label] of [
  [
    ".guides-index-hero__shell{grid-template-columns:minmax(31rem,.9fr) minmax(420px,1.1fr)",
    "guide index hero uses homepage split shell",
  ],
  [
    ".guides-index-hero__book img{border:1px solid var(--book-border);border-radius:.22rem .5rem .5rem .22rem;width:min(18rem,54%)",
    "guide index book cover is larger in homepage hero frame",
  ],
  [
    ".starter-guides-panel{max-width:none}",
    "starter guide panel is full width",
  ],
  [".guides-roadmap{max-width:none}", "guide roadmap is full width"],
  [
    ".guides-roadmap__groups{grid-template-columns:1fr",
    "guide roadmap groups stack as full-width rows",
  ],
  [
    ".guides-roadmap__list{grid-template-columns:repeat(3,minmax(0,1fr))",
    "guide roadmap cards use three columns per row",
  ],
  [
    ".guide-roadmap-card{border:1px solid var(--area-color);padding:clamp(.9rem,1.45vw,1.1rem)}",
    "guide roadmap cards are visible",
  ],
]) {
  assertIncludes("dist/assets/*.css", cssBundleText, expected, label)
}

for (const [forbidden, label] of [
  ["Otvoreni rukopis knjige", "old open manuscript CTA"],
  ["Vodiči za osobni Bitcoin standard", "old guide index title"],
  ["Roadmap kroz okvir", "old guide roadmap title"],
]) {
  assertNotIncludes("vodici/index.html", guidesIndexHtml, forbidden, label)
}

for (const duplicateNumbering of [
  "1. 1 Proračun",
  "2. 2 Dug",
  "3. 3 Davanje",
]) {
  assertNotIncludes(
    "vodici/index.html",
    guidesIndexText,
    duplicateNumbering,
    `duplicate guide numbering: ${duplicateNumbering}`
  )
}

assertCount(
  "vodici/index.html",
  guidesIndexHtml,
  '<link rel="canonical"',
  1,
  "canonical tag"
)

if (!guidesIndex) {
  fail("Route metadata for guide index is missing")
}

assertArrayEquals(
  "vodici/index.html",
  anchorHrefsByDataLink(guidesIndexHtml, "guide-card"),
  [
    "/vodici/svaki-euro-ima-namjenu/",
    "/vodici/stvarni-visak/",
    "/vodici/prihod-nije-slobodan-novac/",
    "/vodici/starost-novca/",
    "/vodici/dca-nije-dovoljan/",
    "/vodici/dug-je-buduci-novac/",
    "/vodici/od-duga-prema-vlasnistvu/",
    "/vodici/dug-ili-bitcoin/",
    "/vodici/ne-zaduzujte-se-za-bitcoin/",
    "/vodici/davanje-u-proracunu-nulte-osnove/",
    "/vodici/davanje-bez-duga/",
    "/vodici/novac-dolazi-od-ljudi/",
    "/vodici/niste-zakasnili-u-bitcoin/",
    "/vodici/kada-bitcoin-postane-distrakcija/",
    "/vodici/bitcoin-kao-novac/",
    "/vodici/bitcoin-nije-kripto-portfelj/",
    "/vodici/pozitivni-neto-priljev/",
    "/vodici/digitalni-kredit-nije-bitcoin/",
    "/vodici/prihvacanje-bitcoina-u-poslovanju/",
    "/vodici/novac-kapital-potrosnja/",
    "/vodici/bitcoin-u-neto-imovini/",
    "/vodici/bitcoin-kao-stopa-prepreke/",
    "/vodici/pravilo-trecina/",
    "/vodici/bitcoin-etfovi-i-riznicke-kompanije/",
    "/vodici/zaba-bitcoin-etf-certifikat/",
    "/vodici/bitcoin-bilanca-pojacana-izlozenost/",
    "/vodici/uskladivanje-kupovne-moci-bitcoina/",
    "/vodici/cijena-kao-mjera-vremena/",
    "/vodici/saylor-bitcoin-ciklus-ponuda-potraznja/",
    "/vodici/ne-cekajte-savrseno-dno-bitcoina/",
    "/vodici/sigurnost-ne-smije-ovisiti-samo-o-vama/",
    "/vodici/poslovni-bitcoin-nije-privatni-bitcoin/",
    "/vodici/obiteljski-bitcoin-trezor/",
    "/vodici/vremenski-oporavak-bitcoin-trezor/",
    "/vodici/samostalna-pohrana-ili-skrbnik/",
    "/vodici/bitkey-bitcoin-sigurnost/",
    "/vodici/obiteljski-pristup-bitcoinu/",
  ],
  "guide index card href order"
)

const securityHtml = readFile("sigurnost/index.html")
const securityChecks = [
  ["Sigurnost i povjerljivost", "security title"],
  [
    "Bitcoin mora ostati pod vašom kontrolom, ali pristup ne smije ovisiti samo o jednoj osobi, jednom uređaju ili jednom papiru.",
    "security family intro",
  ],
  [
    "/images/sigurnost-povjerenje-hero-20260601.webp",
    "security hero WebP image",
  ],
  [
    "/images/sigurnost-povjerenje-hero-20260601.jpg",
    "security hero JPEG fallback",
  ],
  [
    "Mediteranska scena s kamenim omotnicama, ključem i Bitcoin pečatom kao simbol sigurnosti i povjerljivosti.",
    "security hero image alt text",
  ],
  ["Dobra sigurnost ima dvije strane", "security two sides title"],
  [
    "Mora otežati krađu, ali ne smije toliko otežati pristup",
    "security two-sided access copy",
  ],
  [
    "Sigurnost nije natjecanje u tome tko ima najkompliciraniji sustav.",
    "security complexity copy",
  ],
  [
    "Seed phrase se nikada ne dijeli. Dobar savjetnik vam pomaže urediti okvir bez preuzimanja kontrole.",
    "security principle box",
  ],
  [
    "nitko ne smije dobiti kontrolu nad vašim Bitcoinom bez vašeg znanja",
    "security no control without knowledge copy",
  ],
  [
    "vaša obitelj ne smije ostati potpuno izgubljena",
    "security family continuity copy",
  ],
  ["Ako Bitcoin pripada poslu", "security business Bitcoin panel"],
  [
    "Poslovni Bitcoin ne smije ovisiti samo o vlasniku",
    "security business dependency copy",
  ],
  ["Nikada ne tražim", "never ask section"],
  ["Možemo urediti", "security can organize section"],
  ["Procjenjujemo rizike", "security risk section"],
  ["Odluka ostaje vaša", "security decision stays yours section"],
  [
    "seed phrase se nikada ne traži — 12 ili 24 riječi za oporavak novčanika",
    "seed phrase explanation",
  ],
  ["način čuvanja prikladan za vašu situaciju", "plain custody wording"],
  [
    "kako složiti oporavak tako da ne ovisi o jednoj osobi, uređaju ili lokaciji",
    "natural recovery dependency copy",
  ],
  ["ne tražim seed phrase ni privatne ključeve", "no seed phrase ask copy"],
  [
    "Za rad nije potrebno dijeliti seed phrase",
    "confidentiality seed phrase copy",
  ],
  [
    "U uvodnom razgovoru ne radimo tehničke promjene.",
    "security technical note title",
  ],
  ["privatne ključeve", "private keys copy"],
  ["lozinke", "passwords copy"],
  ["pristup burzi", "exchange access copy"],
  ["pristup novčaniku", "wallet access copy"],
  ["pristup uređajima", "device access copy"],
  ["kontrolu nad vašim Bitcoinom", "no control copy"],
  ["ne čuvam Bitcoin", "no Bitcoin custody copy"],
  ['href="/razgovor/"', "security page links to conversation"],
  ['data-cta="security-intro-call"', "security CTA metadata"],
  ["Razgovarajmo o sigurnosti bez predaje kontrole", "security CTA copy"],
  [
    '<link rel="canonical" href="https://bitcoin-savjetovanje.com/sigurnost/" />',
    "security canonical URL",
  ],
]

for (const [expected, label] of securityChecks) {
  assertIncludes("sigurnost/index.html", securityHtml, expected, label)
}

assertCount(
  "sigurnost/index.html",
  securityHtml,
  '<link rel="canonical"',
  1,
  "canonical tag"
)

if (!security) {
  fail("Route metadata for security page is missing")
}

const privacyHtml = readFile("privatnost/index.html")
const privacyChecks = [
  ["Privatnost i podaci", "privacy page title"],
  [
    "Za rezervaciju termina obično su dovoljni ime, email, termin i kratka bilješka",
    "privacy booking data copy",
  ],
  ["/images/povjerljivost-hero-20260601.webp", "privacy hero WebP image"],
  ["/images/povjerljivost-hero-20260601.jpg", "privacy hero JPEG fallback"],
  [
    "Mediteranska scena s omotnicom, bilježnicom i pregradom kao simbol privatnosti i povjerljivog razgovora.",
    "privacy hero image alt text",
  ],
  ["seed phrase", "privacy seed phrase copy"],
  ["privatne ključeve", "privacy private keys copy"],
  ["Povjerljivost razgovora", "privacy confidentiality section"],
  ["Opći, anonimizirani uvidi", "privacy anonymized insights copy"],
  ["Za dogovor termina koristi se Cal.com", "privacy tools section"],
  ["Brisanje ili izmjena podataka", "privacy deletion section"],
  ["Seed phrase i privatni ključevi se nikada ne šalju", "privacy safety rule"],
  ['href="/razgovor/"', "privacy page links to conversation"],
  ['data-cta="privacy-intro-call"', "privacy CTA metadata"],
  [
    '<link rel="canonical" href="https://bitcoin-savjetovanje.com/privatnost/" />',
    "privacy canonical URL",
  ],
]

for (const [expected, label] of privacyChecks) {
  assertIncludes("privatnost/index.html", privacyHtml, expected, label)
}

assertCount(
  "privatnost/index.html",
  privacyHtml,
  '<link rel="canonical"',
  1,
  "canonical tag"
)

if (!privacy) {
  fail("Route metadata for privacy page is missing")
}

const defaultGuideFinalCtaTitle = "Želite ovo primijeniti na svoju situaciju?"
const implementationCtaGuidePath = "/vodici/prihvacanje-bitcoina-u-poslovanju"
const exactPasteGuidePath = "/vodici/zaba-bitcoin-etf-certifikat"
const guideFinalCtaTitles = new Map([
  [
    "/vodici/bitcoin-kao-stopa-prepreke",
    "Imate Bitcoin? Izgradite osobni Bitcoin standard.",
  ],
  [
    "/vodici/od-duga-prema-vlasnistvu",
    "Imate Bitcoin? Izgradite osobni Bitcoin standard.",
  ],
  [
    "/vodici/digitalni-kredit-nije-bitcoin",
    "Imate Bitcoin? Izgradite osobni Bitcoin standard.",
  ],
  [
    "/vodici/bitcoin-bilanca-pojacana-izlozenost",
    "Želite razumjeti što Bitcoin znači za vašu bilancu?",
  ],
  [
    "/vodici/vremenski-oporavak-bitcoin-trezor",
    "Želite provjeriti je li vaš obiteljski Bitcoin trezor stvarno razumljiv?",
  ],
  [
    "/vodici/kada-bitcoin-postane-distrakcija",
    "Želite provjeriti služi li vam Bitcoin kao novac?",
  ],
])

for (const guidePath of requiredGuidePaths) {
  const route = routeMap.get(guidePath)
  const relativePath = routeFile(guidePath)
  const html = readFile(relativePath)

  if (!route) {
    fail(`Route metadata for ${guidePath} is missing`)
    continue
  }

  assertIncludes(relativePath, html, guideTitle(route.title), "guide title")
  assertIncludes(
    relativePath,
    html,
    `<link rel="canonical" href="${route.canonical}" />`,
    "guide canonical URL with trailing slash"
  )
  assertIncludes(relativePath, html, '"@type":"Article"', "Article schema")
  assertIncludes(relativePath, html, "BreadcrumbList", "BreadcrumbList schema")
  assertIncludes(relativePath, html, "Vrijeme čitanja", "reading time")
  assertIncludes(
    relativePath,
    html,
    "guide-meta-badges",
    "guide metadata badges"
  )
  assertIncludes(relativePath, html, "U ovom vodiču", "table of contents")
  if (guidePath === exactPasteGuidePath) {
    assertNotIncludes(
      relativePath,
      html,
      "Praktično pitanje",
      "no added practical question"
    )
    assertNotIncludes(
      relativePath,
      html,
      "Povezani vodiči",
      "no added related guides"
    )
    assertNotIncludes(
      relativePath,
      html,
      'data-link="related-guide"',
      "no added related guide metadata"
    )
    assertNotIncludes(
      relativePath,
      html,
      "64.362 / 298.818",
      "no reversed lower Power Law formula"
    )
    assertNotIncludes(
      relativePath,
      html,
      "64.362 / 404.820",
      "no reversed median Power Law formula"
    )
    assertNotIncludes(
      relativePath,
      html,
      "Očitanje Leo Heartova modela korišteno u Power Law usporedbi.",
      "no misleading Power Law screenshot caption"
    )
    assertNotIncludes(
      relativePath,
      html,
      "Privremeni cover",
      "no internal temporary cover note"
    )
  } else {
    assertIncludes(
      relativePath,
      html,
      "Praktično pitanje",
      "practical question"
    )
    assertIncludes(relativePath, html, "Povezani vodiči", "related guides")
    assertIncludes(
      relativePath,
      html,
      'data-link="related-guide"',
      "related guide link metadata"
    )
  }
  if (guidePath === implementationCtaGuidePath) {
    assertIncludes(
      relativePath,
      html,
      "Želite prihvaćati Bitcoin u svojem poslovanju?",
      "guide implementation CTA title"
    )
    assertIncludes(
      relativePath,
      html,
      "Uvođenje Bitcoin plaćanja može biti jednostavno, ali rješenje treba odgovarati vašoj stvarnoj situaciji.",
      "guide implementation CTA text"
    )
    assertIncludes(
      relativePath,
      html,
      'data-cta="guide-business-bitcoin-payments-final"',
      "guide implementation CTA metadata"
    )
    assertNotIncludes(
      relativePath,
      html,
      'data-cta="guide-final-intro-call"',
      "hidden generic final CTA metadata"
    )
  } else if (guidePath === exactPasteGuidePath) {
    assertIncludes(
      relativePath,
      html,
      "Razmišljate kako se proizvod povezan s Bitcoinom uklapa u vašu imovinu?",
      "Zaba guide final CTA title"
    )
    assertIncludes(
      relativePath,
      html,
      "Ne morate unaprijed imati spreman odgovor.",
      "Zaba guide final CTA text"
    )
    assertIncludes(
      relativePath,
      html,
      "Razgovor je bez naknade i obveze. Ne upravljam vašim novcem i odluka uvijek ostaje vaša.",
      "Zaba guide final CTA note"
    )
    assertIncludes(
      relativePath,
      html,
      'data-cta="guide-final-intro-call"',
      "Zaba guide final CTA metadata"
    )
  } else {
    assertIncludes(
      relativePath,
      html,
      guideFinalCtaTitles.get(guidePath) ?? defaultGuideFinalCtaTitle,
      "guide final CTA title"
    )
    assertIncludes(
      relativePath,
      html,
      "Vodič objašnjava okvir. Uvodni razgovor pomaže vidjeti koji dio se odnosi na vas.",
      "guide final CTA text"
    )
    assertIncludes(
      relativePath,
      html,
      'data-cta="guide-final-intro-call"',
      "guide final CTA metadata"
    )
  }
  assertNotIncludes(
    relativePath,
    html,
    'data-cta="guide-rail-intro-call"',
    "removed duplicate guide rail CTA metadata"
  )
  assertNotIncludes(
    relativePath,
    html,
    "Ovo se odnosi na vašu situaciju?",
    "duplicate guide rail title"
  )
  assertIncludes(
    relativePath,
    html,
    'data-cta="guide-sticky-sidebar"',
    "guide sticky sidebar CTA metadata"
  )
  assertIncludes(
    relativePath,
    html,
    "Uvodni Bitcoin razgovor",
    "guide sticky sidebar title"
  )
  assertIncludes(
    relativePath,
    html,
    "Razgovor je bez naknade i obveze; sredstva ostaju isključivo pod vašom kontrolom.",
    "guide sticky sidebar footnote"
  )
  assertIncludes(
    relativePath,
    html,
    'href="/razgovor/"',
    "guide final CTA href"
  )
  assertIncludes(
    relativePath,
    html,
    "https://bitcoin-savjetovanje.com/vodici/",
    "guide index breadcrumb URL"
  )
  assertCount(relativePath, html, '<link rel="canonical"', 1, "canonical tag")
  assertIncludes(
    "vodici/index.html",
    guidesIndexHtml,
    `href="${route.path}/"`,
    `${guidePath} trailing-slash link`
  )
}

for (const alias of aliasGuidePaths) {
  const relativePath = routeFile(alias.oldPath)
  const html = readFile(relativePath)

  assertIncludes(
    relativePath,
    html,
    `<link rel="canonical" href="${alias.newCanonical}" />`,
    "alias canonical URL"
  )
}

for (const guidePath of requiredGuidePaths) {
  const relativePath = routeFile(guidePath)
  const html = readFile(relativePath)

  assertIncludes(relativePath, html, "guide-cover-figure", "guide cover markup")
  assertIncludes(relativePath, html, "data-guide-theme", "guide theme marker")
}

const optimizedGuideCoverChecks = [
  {
    path: "/vodici/stvarni-visak",
    webp: "/images/stvarni-visak-cover-20260625.webp",
    fallback: "/images/stvarni-visak-cover-20260625.png",
  },
  {
    path: "/vodici/dca-nije-dovoljan",
    webp: "/images/dca-nije-dovoljan-cover-20260625.webp",
    fallback: "/images/dca-nije-dovoljan-cover-20260625.png",
  },
  {
    path: "/vodici/dug-je-buduci-novac",
    webp: "/images/dug-je-buduci-novac-cover-20260625.webp",
    fallback: "/images/dug-je-buduci-novac-cover-20260625.png",
  },
  {
    path: "/vodici/dug-ili-bitcoin",
    webp: "/images/dug-ili-bitcoin-cover-20260625.webp",
    fallback: "/images/dug-ili-bitcoin-cover-20260625.png",
  },
  {
    path: "/vodici/ne-zaduzujte-se-za-bitcoin",
    webp: "/images/ne-zaduzujte-se-za-bitcoin-cover-20260625.webp",
    fallback: "/images/ne-zaduzujte-se-za-bitcoin-cover-20260625.png",
  },
]

for (const cover of optimizedGuideCoverChecks) {
  const relativePath = routeFile(cover.path)
  const html = readFile(relativePath)

  assertIncludes(
    relativePath,
    html,
    `<source srcSet="${cover.webp}"`,
    "optimized guide cover WebP source"
  )
  assertIncludes(
    relativePath,
    html,
    `<img src="${cover.fallback}"`,
    "optimized guide cover fallback"
  )
}

const focusedGuideChecks = [
  {
    path: "vodici/stvarni-visak/index.html",
    checks: [
      "Što je stvarni višak?",
      "Višak nije stanje na računu",
      "Drugim riječima, stvarni višak je novac bez druge namjene",
      "ne pripada budućem plaćanju",
      "Manje je nagađanja",
    ],
  },
  {
    path: "vodici/prihod-nije-slobodan-novac/index.html",
    checks: [
      "Prihod nije slobodan novac",
      "Prihod nije isto što i dobit",
      "Dobit nije isto što i slobodan novac",
      "Poslovni Bitcoin okvir počinje razlikovanjem operativnog novca i viška riznice.",
      "Ovo nije računovodstveni ili porezni savjet.",
      '<source srcSet="/images/prihod-nije-slobodan-novac-cover-20260625.webp"',
      '<img src="/images/prihod-nije-slobodan-novac-cover-20260625.png" alt="Mediteranska kamena poslovna scena s bilježnicom, računima, pričuvom i Bitcoin simbolom za vodič Prihod nije slobodan novac"',
      "Prihod nije slobodan dok se ne vide porezi, plaće, dobavljači, pričuva i stvarni vlasnički višak.",
      "Imate poslovnu Bitcoin odluku? Dogovorite uvodni razgovor.",
    ],
  },
  {
    path: "vodici/starost-novca/index.html",
    checks: [
      "Starost novca: koliko dugo vaš novac preživi?",
      "Novac koji odmah nestaje",
      "Stariji novac daje prostor",
      '<source srcSet="/images/starost-novca-cover-20260625.webp"',
      '<img src="/images/starost-novca-cover-20260625.png" alt="Mediteranska kamena scena s proračunskom bilježnicom, pješčanim satom i Bitcoin simbolom za vodič Starost novca"',
      "Što duže novac preživi prije potrošnje, to odluke o Bitcoinu imaju više vremena i manje pritiska.",
    ],
  },
  {
    path: "vodici/pozitivni-neto-priljev/index.html",
    checks: [
      "Novac koji ostaje",
      "Bitcoin standard počinje kada mjesec može stajati na vlastitim nogama.",
      "Novac ulazi kroz plaću, posao, klijente, prodaju ili druge izvore.",
      "Pet načina da više novca ostane u sustavu",
      "Prvo popravljam prihode, troškove i stanje duga.",
    ],
  },
  {
    path: "vodici/dug-ili-bitcoin/index.html",
    checks: [
      "Dug ili Bitcoin?",
      "Ne pokušavajte istrgovati izlaz",
      "Dug povećava nemir i skraćuje vrijeme za odluku.",
      "Dug sužava izbor prije nego što odluka postane mirna.",
      "Težak, ali čistiji put",
      "Ako imate dug i niste sigurni treba li prvo čistiti bilancu ili nastaviti s Bitcoinom",
    ],
  },
  {
    path: "vodici/bitcoin-kao-novac/index.html",
    checks: [
      "Bitcoin je novac",
      "Bitcoin nije proizvodna imovina",
      "Ako ne možete objasniti sebi ili partneru je li Bitcoin za vas novac",
    ],
  },
  {
    path: "vodici/bitcoin-kao-stopa-prepreke/index.html",
    checks: [
      "Bitcoin kao stopa prepreke za financijske odluke",
      "je li ova odluka bolja od držanja Bitcoina?",
      "Stopa prepreke traži jasan razlog za odricanje od kupovne moći.",
      "Bitcoin ne uklanja ulaganje",
      "Potrošnja pod Bitcoin standardom",
      "Posao kao proizvodna imovina",
      "Neto imovina kao jedna cjelina",
      "Imate Bitcoin? Izgradite osobni Bitcoin standard.",
    ],
  },
  {
    path: "vodici/od-duga-prema-vlasnistvu/index.html",
    checks: [
      "Od društva duga prema društvu vlasništva",
      "Dug je budući novac koji ste već potrošili.",
      "Društvo duga",
      "Dug kao gubitak izbora",
      "Društvo vlasništva",
      "Praktični prijelaz",
      '<source srcSet="/images/od-duga-prema-vlasnistvu-cover-20260625.webp"',
      '<img src="/images/od-duga-prema-vlasnistvu-cover-20260625.png" alt="Mediteranska kamena scena s bilježnicom, ključem i Bitcoin simbolom za vodič Od društva duga prema društvu vlasništva"',
      "Prijelaz iz duga prema vlasništvu počinje jasnim pravilima, stvarnim viškom i novcem koji ostaje pod vašom kontrolom.",
      "Imate Bitcoin? Izgradite osobni Bitcoin standard.",
    ],
  },
  {
    path: "vodici/digitalni-kredit-nije-bitcoin/index.html",
    checks: [
      "Digitalni kredit nije Bitcoin",
      "Bitcoin je novac, digitalni kredit je ugovor",
      "Prvo pitanje nije koliki je prinos.",
      "Pet razlika između Bitcoina i digitalnog kredita",
      "Kako ga smjestiti u neto imovinu",
      "Predvidljivost nije isto što i sigurnost",
      "Imate Bitcoin? Izgradite osobni Bitcoin standard.",
    ],
  },
  {
    path: "vodici/cijena-kao-mjera-vremena/index.html",
    checks: [
      "Cijena kao mjera vremena",
      "Ne koristimo cijenu za prognozu. Koristimo je kao signal za provjeru proračuna.",
      "Dugoročni trend je pomoćni signal. Osobni proračun nulte osnove ostaje glavni alat.",
    ],
  },
  {
    path: "vodici/saylor-bitcoin-ciklus-ponuda-potraznja/index.html",
    checks: [
      "Bitcoin više ne pokreće samo prepolovljenje rudarske nagrade",
      "Ovaj vodič nije investicijski, porezni ni pravni savjet.",
      "Izvorni razgovor",
      "Od ponude prema potražnji",
      "Kalendar nije strategija.",
      "Volatilnost nije naredba. Volatilnost je povod za provjeru vlastitih pravila.",
      "STRC je zanimljiv primjer toga kako se oko Bitcoin kapitala grade financijski instrumenti.",
      "Ne preslikavajte kapitalnu strategiju javne kompanije na kućni proračun.",
      "Ne koristite budući novac kako biste kupili novac.",
      "Ako je obveza kratka i poznata",
      "Dobar osobni Bitcoin standard mora preživjeti i snažan rast i dubok pad.",
      "Prvo razvrstajte ono što posjedujete",
      "Bitcoin možda više ne pokreće samo prepolovljenje rudarske nagrade.",
      'href="/vodici/bitcoin-etfovi-i-riznicke-kompanije/"',
      'href="/vodici/uskladivanje-kupovne-moci-bitcoina/"',
      'href="/vodici/cijena-kao-mjera-vremena/"',
      'href="/vodici/ne-zaduzujte-se-za-bitcoin/"',
      'href="/vodici/sigurnost-ne-smije-ovisiti-samo-o-vama/"',
      'href="/vodici/pravilo-trecina/"',
      "Ako imate Bitcoin, burzovne fondove, dionice ili druge financijske instrumente povezane s Bitcoinom",
    ],
  },
  {
    path: "vodici/pravilo-trecina/index.html",
    checks: [
      "Ne preporučujem kupnju ili prodaju određene imovine.",
      "Ako je gotovo sve vezano u domu, autu ili poslu",
      "Ako želite provjeriti ravnotežu neto imovine bez pretvaranja toga u slijepu formulu",
    ],
  },
  {
    path: "vodici/bitcoin-etfovi-i-riznicke-kompanije/index.html",
    checks: [
      "Bitcoin ETF-ovi i rizničke kompanije: gdje prestaje Bitcoin, a počinje kapital",
      "BlackRock iShares Bitcoin Trust",
      "STRC je Strategyjev Stretch",
      "11,50%",
      "Strategy je predložio češću, polumjesečnu isplatu dividendi",
      "Često se mijenja",
      "Napomena: ovaj vodič govori o temi čiji se detalji mogu mijenjati.",
      '<source srcSet="/images/bitcoin-etfovi-i-riznicke-kompanije-cover-20260625.webp"',
      '<img src="/images/bitcoin-etfovi-i-riznicke-kompanije-cover-20260625.png" alt="Mediteranska kamena scena s Bitcoinom, burzovnim fondom i rizničkom kompanijom za vodič o Bitcoin instrumentima"',
      "Bitcoin, burzovni fond i riznička kompanija nisu isti sloj iste odluke.",
      'href="/vodici/samostalna-pohrana-ili-skrbnik/"',
      'href="/vodici/obiteljski-bitcoin-trezor/"',
      'href="/razgovor/"',
      "Ako imate Bitcoin izloženost kroz ETF, burzu, brokera ili Bitcoin rizničku kompaniju",
    ],
  },
  {
    path: "vodici/zaba-bitcoin-etf-certifikat/index.html",
    checks: [
      "Zabin Bitcoin ETF certifikat: zaštita glavnice, troškovi i ograničenje prinosa",
      "Zabin Bitcoin ETF certifikat: zaštita glavnice, troškovi i oportunitetni trošak",
      '<meta property="og:title" content="Zabin Bitcoin certifikat: koliko košta zaštita glavnice?"',
      '<meta name="description" content="Što kupujete Zabinim Bitcoin ETF certifikatom',
      "Sažetak u 30 sekundi",
      "Iznos za izračun isplate iznosi 1.000 USD.",
      "Maksimalni prinos na stvarno uplaćenih 1.020 USD iznosi 47,06%",
      "Kupac ne posjeduje Bitcoin ni udjel u IBIT-u",
      "Objavljeno i provjereno: 18. lipnja 2026.",
      "Razdoblje upisa: 12. lipnja – 20. srpnja 2026.",
      "Zaštita glavnice ima cijenu",
      "neosigurano potraživanje prema UniCreditu",
      "23. rujna 2031.",
      "Power Law kao ilustracija oportunitetnog troška",
      "Važna metodološka napomena",
      "Certifikat svoj prinos računa prema promjeni zaključne cijene IBIT-a između 21. srpnja 2026. i 16. rujna 2031.",
      "Leo Heartov model",
      "64.362 USD",
      "66.990",
      "101.508",
      "298.818 USD",
      "404.820 USD",
      "298.818 ÷ 64.362 − 1 = 364,28%",
      "404.820 ÷ 64.362 − 1 = 528,97%",
      "364,28%",
      "528,97%",
      "0,15848 BTC",
      "47.356 USD",
      "64.155 USD",
      "68,3%",
      "76,6%",
      "To nije naknada koju banka naplaćuje niti zajamčeni gubitak.",
      "Trošak proizvoda uključen u prodajnu cijenu",
      "Vidljivi agio iznosi 2%",
      '<button type="button" class="glossary-term" aria-label="Objasni pojam: Agio"',
      "Ali nije Bitcoin s besplatnom zaštitnom mrežom.",
      "Zabin certifikat je dobra vijest za Bitcoin.",
      "dobiva pravo na minimalnu isplatu od 1.000 USD po certifikatu",
      "prihvaća troškove, ograničenu likvidnost i mogućnost gubitka pri izlasku prije dospijeća",
      "Izvori i dokumenti",
      "Dokument s ključnim informacijama, ažuriran 8. lipnja 2026.",
      "Informacije o troškovima, naknadama i negativnom ciljanom tržištu, 12. lipnja 2026.",
      "Brojke, dokumenti i dostupnost proizvoda provjereni su 18. lipnja 2026.",
      "Razmišljate kako se proizvod povezan s Bitcoinom uklapa u vašu imovinu?",
      "Dogovorite uvodni razgovor",
      '<source srcSet="/images/zaba-bitcoin-etf-certifikat-cover-20260625.webp"',
      '<img src="/images/zaba-bitcoin-etf-certifikat-product-page-20260618.jpg" alt="Screenshot službene stranice Zagrebačke banke s naslovom Certifikat sa 100% zaštitom glavnice – Bitcoin ETF"',
      "Službena stranica proizvoda",
      'href="https://bitcoinwave.net/rootchart.htm"',
      'href="https://www.zaba.hr/home/certifikat-sa-100-zastitom-glavnice-kripto"',
      'href="https://www.ishares.com/us/products/333011/ishares-bitcoin-trust-etf"',
      "Power Law scenariji za rujan 2031.",
      "Screenshoti su očitanja za 15. rujna 2031.; izračuni u tekstu koriste 16. rujna 2031.",
      '<img src="/images/power-law-pl-minus-3-20310915.png" alt="Power Law graf s PL-3 linijom i očitanjem oko 256.469 USD za rujan 2031."',
      '<img src="/images/power-law-pl-minus-2-20310915.png" alt="Power Law graf s PL-2 linijom i očitanjem oko 298.523 USD za rujan 2031."',
      '<img src="/images/power-law-pl0-20310915.png" alt="Power Law graf s PL0 medijalnom linijom i očitanjem oko 404.449 USD za rujan 2031."',
      '<img src="/images/power-law-pl5-20310915.png" alt="Power Law graf s PL5 linijom i očitanjem oko 864.129 USD za rujan 2031."',
      "PL-3: tri standardne devijacije ispod trenda",
      "PL-2: dvije standardne devijacije ispod trenda",
      "PL0: medijalni trend",
      "PL5: ultra bullish scenarij",
    ],
  },
  {
    path: "vodici/bitcoin-bilanca-pojacana-izlozenost/index.html",
    checks: [
      "Bitcoin, bilanca i pojačana izloženost",
      "Bitcoin nije isto što i instrument izgrađen na Bitcoinu",
      "Ovaj vodič nije investicijski savjet, nije porezni savjet, nije pravni savjet ni računovodstveni savjet.",
      '<source srcSet="/images/bitcoin-bilanca-pojacana-izlozenost-hero-20260603.webp"',
      '<img src="/images/bitcoin-bilanca-pojacana-izlozenost-hero-20260603.jpg" alt="Mediteranska kamena scena s Bitcoin bilancom, slojevima kapitala i pojačanom izloženošću"',
      "Što je instrument udaljeniji od Bitcoina, to su važniji bilanca, pravila i izdavatelj.",
      "Što je sloj udaljeniji od Bitcoina",
      "Četiri sloja izloženosti",
      "Bitcoin kao novac ne znači da se nikada ne koristi.",
      "Prinos bez razumijevanja bilance nije ulaganje. To je nada.",
      "Drugi rizik ima smisla tek kada je prvi strogo ograničen.",
      "SATA koristim kao primjer instrumenta",
      "STRC je drugi primjer instrumenta",
      "Dnevna dividenda nije jamstvo sigurnosti.",
      "Stabilnija cijena oko nominalne vrijednosti nije isto što i uklanjanje rizika.",
      "Stresno ispitivanje nije pesimizam.",
      "U silaznom tržištu gradi se kapacitet. U uzlaznom tržištu smanjuje se krhkost.",
      "Digitalni kredit je dužnički instrument",
      "Nizozemska istočnoindijska kompanija",
      "Prije nego kupite instrument povezan s Bitcoinom",
      "povrat izražen u Bitcoinu",
      "Bitcoin traži više reda, ne manje.",
      "Dogovorite 15-minutni razgovor",
      'href="/vodici/svaki-euro-ima-namjenu/"',
      'href="/vodici/uskladivanje-kupovne-moci-bitcoina/"',
      'href="/vodici/digitalni-kredit-nije-bitcoin/"',
      'href="/vodici/bitcoin-u-neto-imovini/"',
      'href="/vodici/sigurnost-ne-smije-ovisiti-samo-o-vama/"',
    ],
  },
  {
    path: "vodici/sigurnost-ne-smije-ovisiti-samo-o-vama/index.html",
    checks: [
      "Sigurnost ne smije ovisiti samo o vama",
      "Informacija nije isto što i pristup",
      "Za širi sigurnosni okvir pročitajte i sigurnosnu stranicu.",
      'data-cta="guide-security-page"',
    ],
  },
  {
    path: "vodici/poslovni-bitcoin-nije-privatni-bitcoin/index.html",
    checks: [
      "Poslovni Bitcoin nije privatni Bitcoin",
      "Poslovni Bitcoin ne bi trebao biti pomiješan s privatnim Bitcoinom",
      "Poslovni Bitcoin treba evidenciju, ovlaštene osobe, pravila odobravanja transakcija i plan nedostupnosti ključne osobe.",
      "Seed phrase, privatni ključevi i lozinke nikada se ne stavljaju u dokumente",
      "Nitko ne mora imati sve informacije",
      "Razgovarajmo o poslovnom Bitcoin okviru.",
    ],
  },
  {
    path: "vodici/obiteljski-bitcoin-trezor/index.html",
    checks: [
      "Obiteljski Bitcoin trezor: sigurnost, oporavak i nasljeđivanje",
      "Nije univerzalni recept, nego primjer za razmišljanje o obiteljskoj sigurnosti.",
      "Seed riječi nikada ne idu u mobitel, cloud, e-mail ili fotografiju.",
      "višepotpisni sustav 2 od 3",
      "Ovo nije početna preporuka za svakoga.",
      "Ako Passport Core nije dostupan",
      "Blockstream Jade Plus",
      "Dogovorite uvodni Bitcoin razgovor",
      "Ako imate značajniji iznos u Bitcoinu, sigurnost više nije samo pitanje uređaja.",
    ],
  },
  {
    path: "vodici/vremenski-oporavak-bitcoin-trezor/index.html",
    checks: [
      "Vremenski oporavak u obiteljskom Bitcoin trezoru",
      "Vrijeme čitanja: 10 min",
      "2 od 3 sada. Oporavak kasnije.",
      "Ovaj vodič nije investicijski, porezni ni pravni savjet.",
      "To nije promjena u aplikaciji, podsjetnik u kalendaru, niti dogovor među ljudima.",
      "2 od 3 vrijedi odmah, a nakon roka dodatno se otvara oporavni put.",
      "Bitcoin ne zna vaše obiteljske odnose, bolest, smrt, izgubljen uređaj",
      "Bitcoin skript traži dva potpisa",
      "CHECKLOCKTIMEVERIFY i BIP 65",
      "BIP 68 i CHECKSEQUENCEVERIFY iz BIP 112",
      "Zašto 1 od 3 nakon roka može biti opasno",
      "Bolji model: posebni oporavni ključ",
      "Seed fraza nije dovoljna.",
      "descriptor, BSMS ili ekvivalentnu konfiguraciju",
      "Ako koristite apsolutni vremenski uvjet i rok istekne, oporavni put ostaje dostupan",
      "Vremenski oporavak nije postavi i zaboravi",
      "Izvori i dodatno čitanje",
      "Tu je razlika između tehnički zanimljivog novčanika i stvarnog obiteljskog Bitcoin trezora.",
      'href="/vodici/obiteljski-bitcoin-trezor/"',
      'href="/vodici/obiteljski-pristup-bitcoinu/"',
      'href="/vodici/samostalna-pohrana-ili-skrbnik/"',
      'href="/sigurnost/"',
      'href="/skrbnistvo-i-sigurnost/"',
      'href="/vodici/sigurnost-ne-smije-ovisiti-samo-o-vama/"',
      'href="https://bips.dev/65/"',
      'href="https://bips.dev/68/"',
      'href="https://bips.dev/112/"',
      'href="https://nunchuk.io/blog/miniscript101"',
      'href="https://nunchuk.io/blog/miniscript-programmable-bitcoin"',
      'href="https://nunchuk.io/blog/miniscript-wallet-recovery"',
      'href="https://wizardsardine.com/liana/support/"',
      "Želite provjeriti je li vaš obiteljski Bitcoin trezor stvarno razumljiv?",
      "Ako već imate Bitcoin, ali niste sigurni treba li vam obični 2 od 3 trezor",
      "Dogovorite 15-minutni uvodni razgovor",
    ],
  },
  {
    path: "vodici/samostalna-pohrana-ili-skrbnik/index.html",
    checks: [
      "Samostalna pohrana ili skrbnik: kako razmišljati o Bitcoin sigurnosti",
      "Samostalna pohrana je važan cilj",
      "pohrana kod skrbnika",
      "Često se mijenja",
      "Ovo nije početna preporuka za svakoga.",
      'href="/vodici/obiteljski-bitcoin-trezor/"',
      'href="/vodici/bitcoin-etfovi-i-riznicke-kompanije/"',
      "Dogovorite uvodni Bitcoin razgovor",
      "Ako niste sigurni treba li vaš Bitcoin biti u samostalnoj pohrani",
    ],
  },
  {
    path: "vodici/bitkey-bitcoin-sigurnost/index.html",
    checks: [
      "Bitkey: jednostavniji put do obiteljske Bitcoin sigurnosti?",
      "Bitkey uklanja seed riječi i uvodi 2 od 3 sigurnosni model",
      "nije isto što i vlastiti Bitcoin trezor sa Sparrowom",
      'href="/vodici/obiteljski-bitcoin-trezor/"',
      "Emergency Exit Kit",
      "Često se mijenja",
      "Ovo nije početna preporuka za svakoga.",
      "Dogovorite uvodni Bitcoin razgovor",
      "Ako niste sigurni je li Bitkey dovoljan za vaš iznos",
    ],
  },
  {
    path: "vodici/obiteljski-pristup-bitcoinu/index.html",
    checks: [
      "Minimalna obiteljska uputa",
      "Ovo nije početna preporuka za svakoga.",
      "Bitcoin postoji i dio je neto imovine.",
      "Ako obitelj zna da Bitcoin postoji, ali nema jasne upute što smije i ne smije napraviti",
    ],
  },
]

for (const guideCheck of focusedGuideChecks) {
  const html = readFile(guideCheck.path)
  const visibleText = guideVisibleText(html)

  for (const expected of guideCheck.checks) {
    const contents =
      expected.includes("<") ||
      expected.startsWith("href=") ||
      expected.startsWith("data-")
        ? html
        : visibleText

    assertIncludes(
      guideCheck.path,
      contents,
      expected,
      `guide copy: ${expected}`
    )
  }
}

const balanceAmplificationGuidePath =
  "vodici/bitcoin-bilanca-pojacana-izlozenost/index.html"
const balanceAmplificationGuideHtml = readFile(balanceAmplificationGuidePath)
const balanceAmplificationArticleText = guideArticleVisibleText(
  balanceAmplificationGuideHtml
)
const balanceAmplificationLowerText =
  balanceAmplificationArticleText.toLowerCase()
const balanceAmplificationGlossaryCount =
  balanceAmplificationGuideHtml.match(/class="glossary-term"/g)?.length ?? 0

if (balanceAmplificationGlossaryCount >= 20) {
  pass(
    `${balanceAmplificationGuidePath} contains several glossary explanations`
  )
} else {
  fail(
    `${balanceAmplificationGuidePath} contains ${balanceAmplificationGlossaryCount} glossary explanations, expected at least 20`
  )
}

assertIncludes(
  balanceAmplificationGuidePath,
  balanceAmplificationGuideHtml,
  '<link rel="canonical" href="https://bitcoin-savjetovanje.com/vodici/bitcoin-bilanca-pojacana-izlozenost/" />',
  "balance amplification guide canonical URL with trailing slash"
)

for (const [expected, label] of [
  ['aria-label="Objasni pojam: Bilanca"', "Bilanca glossary"],
  ['aria-label="Objasni pojam: Bitcoin riznica"', "Bitcoin riznica glossary"],
  ['aria-label="Objasni pojam: Obična dionica"', "Obična dionica glossary"],
  [
    'aria-label="Objasni pojam: Povlaštena dionica"',
    "Povlaštena dionica glossary",
  ],
  ['aria-label="Objasni pojam: Dividenda"', "Dividenda glossary"],
  ['aria-label="Objasni pojam: Dnevna dividenda"', "Dnevna dividenda glossary"],
  ['aria-label="Objasni pojam: Likvidnost"', "Likvidnost glossary"],
  [
    'aria-label="Objasni pojam: Nominalna vrijednost"',
    "Nominalna vrijednost glossary",
  ],
  ['aria-label="Objasni pojam: Izdavatelj"', "Izdavatelj glossary"],
  [
    'aria-label="Objasni pojam: Kapitalna struktura"',
    "Kapitalna struktura glossary",
  ],
  ['aria-label="Objasni pojam: Tržišta kapitala"', "Tržišta kapitala glossary"],
  ['aria-label="Objasni pojam: Poluga"', "Poluga glossary"],
  ['aria-label="Objasni pojam: Zalog"', "Zalog glossary"],
  [
    'aria-label="Objasni pojam: Neopterećeni Bitcoin"',
    "Neopterećeni Bitcoin glossary",
  ],
  ['aria-label="Objasni pojam: Zid dospijeća"', "Zid dospijeća glossary"],
  [
    'aria-label="Objasni pojam: Omjer pojačane izloženosti"',
    "Omjer pojačane izloženosti glossary",
  ],
  ['aria-label="Objasni pojam: Digitalni kredit"', "Digitalni kredit glossary"],
  [
    'aria-label="Objasni pojam: Dužnički instrument"',
    "Dužnički instrument glossary",
  ],
  ['aria-label="Objasni pojam: Kreditni rizik"', "Kreditni rizik glossary"],
  [
    'aria-label="Objasni pojam: Stresno ispitivanje"',
    "Stresno ispitivanje glossary",
  ],
  ['aria-label="Objasni pojam: Novčana pričuva"', "Novčana pričuva glossary"],
  [
    'aria-label="Objasni pojam: Pričuva za dividende"',
    "Pričuva za dividende glossary",
  ],
  [
    'aria-label="Objasni pojam: Oportunitetni trošak"',
    "Oportunitetni trošak glossary",
  ],
  [
    'aria-label="Objasni pojam: Povrat izražen u Bitcoinu"',
    "Povrat izražen u Bitcoinu glossary",
  ],
  ['aria-label="Objasni pojam: SATA"', "SATA glossary"],
]) {
  assertIncludes(
    balanceAmplificationGuidePath,
    balanceAmplificationGuideHtml,
    expected,
    label
  )
}

for (const forbidden of [
  "seta",
  "upside",
  "downside",
  "leverage",
  "equity",
  "treasury",
  "yield",
  "bull market",
  "bear market",
  "framework",
  "stack",
  "hurdle rate",
  "game changer",
  "bullish",
  "hype",
]) {
  assertNotIncludes(
    balanceAmplificationGuidePath,
    balanceAmplificationLowerText,
    forbidden,
    `balance amplification forbidden wording: ${forbidden}`
  )
}

assertCount(
  balanceAmplificationGuidePath,
  balanceAmplificationGuideHtml,
  'data-cta="guide-final-intro-call"',
  1,
  "balance amplification final CTA"
)

const timedRecoveryGuidePath =
  "vodici/vremenski-oporavak-bitcoin-trezor/index.html"
const timedRecoveryGuideHtml = readFile(timedRecoveryGuidePath)
const timedRecoveryArticleText = guideArticleVisibleText(timedRecoveryGuideHtml)
const timedRecoveryArticleLowerText = timedRecoveryArticleText.toLowerCase()
const timedRecoveryGlossaryCount =
  timedRecoveryGuideHtml.match(/class="glossary-term"/g)?.length ?? 0

if (timedRecoveryGlossaryCount >= 8) {
  pass(`${timedRecoveryGuidePath} contains several glossary explanations`)
} else {
  fail(
    `${timedRecoveryGuidePath} contains ${timedRecoveryGlossaryCount} glossary explanations, expected at least 8`
  )
}

assertIncludes(
  timedRecoveryGuidePath,
  timedRecoveryGuideHtml,
  '<link rel="canonical" href="https://bitcoin-savjetovanje.com/vodici/vremenski-oporavak-bitcoin-trezor/" />',
  "timed recovery guide canonical URL with trailing slash"
)
for (const [expected, label] of [
  ['aria-label="Objasni pojam: Bitcoin skript"', "Bitcoin skript glossary"],
  ['aria-label="Objasni pojam: Seed fraza"', "Seed fraza glossary"],
  [
    'aria-label="Objasni pojam: BSMS (Bitcoin Secure Multisig Setup)"',
    "BSMS glossary",
  ],
  [
    'aria-label="Objasni pojam: CHECKSEQUENCEVERIFY"',
    "CHECKSEQUENCEVERIFY glossary",
  ],
  ['aria-label="Objasni pojam: BIP 112"', "BIP 112 glossary"],
]) {
  assertIncludes(
    timedRecoveryGuidePath,
    timedRecoveryGuideHtml,
    expected,
    label
  )
}

for (const [expected, label] of [
  [
    "/images/vremenski-oporavak-bitcoin-trezor-cover-20260625.webp",
    "timed recovery guide cover WebP image",
  ],
  [
    "/images/vremenski-oporavak-bitcoin-trezor-cover-20260625.png",
    "timed recovery guide cover PNG image",
  ],
  [
    "Mediteranska scena s obiteljskim Bitcoin trezorom, odvojenim ključevima i vremenskim oporavkom",
    "timed recovery guide cover alt text",
  ],
  [
    "Danas vrijedi 2 od 3, a nakon roka može se otvoriti oporavni put",
    "timed recovery guide cover caption",
  ],
  ["Alati spomenuti u vodiču", "tool logo visual title"],
  ["/guide-assets/nunchuk-logo.png", "Nunchuk logo asset"],
  ["/guide-assets/liana-logo.svg", "Liana logo asset"],
  ["Nunchuk logotip", "Nunchuk logo alt text"],
  ["Liana logotip", "Liana logo alt text"],
  [
    'data-guide-slug="vremenski-oporavak-bitcoin-trezor"',
    "timed recovery guide slug attribute",
  ],
]) {
  assertIncludes(
    timedRecoveryGuidePath,
    timedRecoveryGuideHtml,
    expected,
    label
  )
}

assertCount(
  timedRecoveryGuidePath,
  timedRecoveryGuideHtml,
  'data-cta="guide-final-intro-call"',
  1,
  "timed recovery final CTA"
)

assertArrayEquals(
  "vodici/obiteljski-bitcoin-trezor/index.html",
  anchorTextsByDataLink(
    readFile("vodici/obiteljski-bitcoin-trezor/index.html"),
    "next-guide"
  ),
  ["Vremenski oporavak u obiteljskom Bitcoin trezoru"],
  "family vault next guide points to timed recovery"
)

assertArrayEquals(
  timedRecoveryGuidePath,
  anchorTextsByDataLink(timedRecoveryGuideHtml, "next-guide"),
  ["Samostalna pohrana ili skrbnik: kako razmišljati o Bitcoin sigurnosti"],
  "timed recovery next guide points to custody choice"
)

assertBefore(
  "vodici/index.html",
  guidesIndexHtml,
  "/vodici/obiteljski-bitcoin-trezor/",
  "/vodici/vremenski-oporavak-bitcoin-trezor/",
  "family vault before timed recovery guide"
)
assertBefore(
  "vodici/index.html",
  guidesIndexHtml,
  "/vodici/vremenski-oporavak-bitcoin-trezor/",
  "/vodici/samostalna-pohrana-ili-skrbnik/",
  "timed recovery before custody choice guide"
)

const timedRecoveryForbiddenTerms = [
  "fomo",
  "fear & greed",
  "falling knife",
  "dca",
  "trading",
  "crypto",
  "altcoin",
  "web3",
  "custody",
  "seed phrase",
  "self-custody",
  "risk tolerance",
  "roi",
  "mindset",
  "framework",
  "cash balance",
  "stacking",
  "hype",
  "roadmap",
  "lead magnet",
  "giving",
  "charity",
]

for (const forbidden of timedRecoveryForbiddenTerms) {
  assertNotIncludes(
    timedRecoveryGuidePath,
    timedRecoveryArticleLowerText,
    forbidden,
    `timed recovery forbidden wording: ${forbidden}`
  )
}

assertNotMatches(
  timedRecoveryGuidePath,
  timedRecoveryArticleLowerText,
  /(^|[^a-z])stack([^a-z]|$)/,
  "timed recovery forbidden wording: stack"
)

assertCount(
  timedRecoveryGuidePath,
  timedRecoveryArticleLowerText,
  "multisig",
  1,
  "timed recovery limited multisig mention"
)

const saylorGuidePath =
  "vodici/saylor-bitcoin-ciklus-ponuda-potraznja/index.html"
const saylorGuideHtml = readFile(saylorGuidePath)
const saylorGuideVisibleText = guideVisibleText(saylorGuideHtml)
const saylorGuideLowerText = saylorGuideVisibleText.toLowerCase()
const saylorGlossaryCount =
  saylorGuideHtml.match(/class="glossary-term"/g)?.length ?? 0

if (saylorGlossaryCount >= 6) {
  pass(`${saylorGuidePath} contains several glossary explanations`)
} else {
  fail(
    `${saylorGuidePath} contains ${saylorGlossaryCount} glossary explanations, expected at least 6`
  )
}

for (const [expected, label] of [
  [
    '<link rel="canonical" href="https://bitcoin-savjetovanje.com/vodici/saylor-bitcoin-ciklus-ponuda-potraznja/" />',
    "Saylor guide canonical URL with trailing slash",
  ],
  [
    '<iframe src="https://www.youtube-nocookie.com/embed/IZ9_xK1peIs"',
    "Saylor guide privacy-friendly video URL",
  ],
  [
    'title="Razgovor s Michaelom Saylorom o Bitcoinu, potražnji i ciklusima"',
    "Saylor guide video title",
  ],
  ['loading="lazy"', "Saylor guide lazy video loading"],
  ['class="guide-video-card__frame"', "Saylor guide responsive video frame"],
]) {
  assertIncludes(saylorGuidePath, saylorGuideHtml, expected, label)
}

for (const forbidden of [
  "halving",
  "embed",
  "tooltip",
  "crypto",
  "kripto",
  "custody",
  "self-custody",
  "cash balance",
  "lead magnet",
  "yield",
  "leverage",
  "peg",
  "working capital",
]) {
  assertNotIncludes(
    saylorGuidePath,
    saylorGuideLowerText,
    forbidden,
    `Saylor guide forbidden wording: ${forbidden}`
  )
}

assertNotIncludes(
  saylorGuidePath,
  saylorGuideVisibleText,
  "ROI",
  "Saylor guide forbidden wording: ROI"
)
assertNotMatches(
  saylorGuidePath,
  saylorGuideLowerText,
  /(^|[^a-z])stack([^a-z]|$)/,
  "Saylor guide forbidden wording: stack"
)
assertNotIncludes(
  saylorGuidePath,
  saylorGuideHtml,
  "autoplay",
  "Saylor guide video autoplay"
)

assertArrayEquals(
  "vodici/svaki-euro-ima-namjenu/index.html",
  anchorTextsByDataLink(
    readFile("vodici/svaki-euro-ima-namjenu/index.html"),
    "next-guide"
  ),
  ["Što je stvarni višak?"],
  "next guide link text is title only"
)

const svakiEuroGuideHtml = readFile("vodici/svaki-euro-ima-namjenu/index.html")
assertIncludes(
  "vodici/svaki-euro-ima-namjenu/index.html",
  svakiEuroGuideHtml,
  "/images/guide-svaki-euro-ima-namjenu-cover.webp",
  "svaki euro guide cover WebP image"
)
assertIncludes(
  "vodici/svaki-euro-ima-namjenu/index.html",
  svakiEuroGuideHtml,
  "/images/guide-svaki-euro-ima-namjenu-cover.jpg",
  "svaki euro guide cover JPEG image"
)
assertIncludes(
  "vodici/svaki-euro-ima-namjenu/index.html",
  svakiEuroGuideHtml,
  "Mediteranska kamena scena s proračunskom bilježnicom",
  "svaki euro guide cover alt text"
)

assertArrayEquals(
  "vodici/dug-ili-bitcoin/index.html",
  anchorTextsByDataLink(
    readFile("vodici/dug-ili-bitcoin/index.html"),
    "related-guide"
  ),
  [
    "Dug je budući novac koji ste već potrošili",
    "Ne zadužujte se za Bitcoin",
    "Što je stvarni višak?",
  ],
  "related guide link text is title only"
)

const sitemap = readFile("sitemap.xml")
const sitemapUrls = [
  ...sitemap.matchAll(
    /<loc>(https:\/\/bitcoin-savjetovanje\.com[^<]+)<\/loc>/g
  ),
].map((match) => match[1])
const expectedSitemapUrls = [...routeByCanonical.keys()]

assertArrayEquals(
  "sitemap.xml",
  sitemapUrls,
  expectedSitemapUrls,
  "sitemap URLs match route canonicals"
)

for (const route of [
  "/",
  "/razgovor/",
  "/bitcoin-kao-novac/",
  "/bitcoin-konzultacija/",
  "/osobni-bitcoin-standard/",
  "/primjer-osobnog-bitcoin-standarda/",
  "/provjera-bitcoin-standarda/",
  "/osobno/",
  "/obitelj/",
  "/poduzetnici/",
  "/vodici/",
  "/sigurnost/",
  "/privatnost/",
]) {
  assertIncludes(
    "sitemap.xml",
    sitemap,
    `<loc>https://bitcoin-savjetovanje.com${route}</loc>`,
    `${route} sitemap URL`
  )
}

assertNotIncludes(
  "sitemap.xml",
  sitemap,
  "https://bitcoin-savjetovanje.com/bitcoin-jasnoca/",
  "/bitcoin-jasnoca/ sitemap URL"
)

for (const guidePath of requiredGuidePaths) {
  assertIncludes(
    "sitemap.xml",
    sitemap,
    `<loc>https://bitcoin-savjetovanje.com${guidePath}/</loc>`,
    `${guidePath} sitemap URL`
  )
}

for (const alias of aliasGuidePaths) {
  assertNotIncludes(
    "sitemap.xml",
    sitemap,
    `<loc>https://bitcoin-savjetovanje.com${alias.oldPath}/</loc>`,
    `${alias.oldPath} alias sitemap URL`
  )
}

for (const relativeHtmlPath of htmlFiles().map((htmlPath) =>
  path.relative(distDir, htmlPath)
)) {
  const html = fs.readFileSync(filePath(relativeHtmlPath), "utf8")
  const canonical = canonicalFromHtml(html)

  for (const oldConsultationRoute of [
    "/bitcoin-jasnoca/",
    "bitcoin-jasnoca",
    "https://bitcoin-savjetovanje.com/bitcoin-jasnoca/",
  ]) {
    assertNotIncludes(
      relativeHtmlPath,
      html,
      oldConsultationRoute,
      `old Bitcoin consultation route: ${oldConsultationRoute}`
    )
  }

  if (!canonical) {
    fail(`${relativeHtmlPath} is missing canonical URL`)
    continue
  }

  if (
    canonical.startsWith("https://bitcoin-savjetovanje.com/") &&
    canonical !== "https://bitcoin-savjetovanje.com/404" &&
    !canonical.endsWith("/") &&
    !canonical.endsWith("/404")
  ) {
    fail(`${relativeHtmlPath} canonical does not use trailing slash`)
  } else {
    pass(
      `${relativeHtmlPath} canonical uses expected trailing-slash convention`
    )
  }
}

if (failures.length > 0) {
  console.error(`\nverify-dist failed with ${failures.length} problem(s):`)
  failures.forEach((message) => console.error(`- ${message}`))
  process.exit(1)
}

console.log("\nverify-dist passed")
