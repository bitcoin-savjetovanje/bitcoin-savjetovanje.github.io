import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"

const root = process.cwd()
const distDir = path.join(root, "dist")
const serverEntry = path.join(distDir, "server", "entry-server.js")
const failures = []

const requiredGuidePaths = [
  "/vodici/svaki-euro-ima-namjenu",
  "/vodici/stvarni-visak",
  "/vodici/starost-novca",
  "/vodici/dug-je-buduci-novac",
  "/vodici/bitcoin-u-neto-imovini",
  "/vodici/dug-ili-bitcoin",
  "/vodici/ne-zaduzujte-se-za-bitcoin",
  "/vodici/darivanje-u-proracunu",
  "/vodici/darivanje-bez-duga",
  "/vodici/bitcoin-kao-novac",
  "/vodici/pozitivni-neto-priljev",
  "/vodici/dca-nije-dovoljan",
  "/vodici/uskladivanje-kupovne-moci-bitcoina",
  "/vodici/pravilo-trecina",
  "/vodici/sigurnost-ne-smije-ovisiti-samo-o-vama",
  "/vodici/obiteljski-pristup-bitcoinu",
  "/vodici/novac-kapital-potrosnja",
]

const guideCategories = [
  "Osobni proračun",
  "Život bez duga",
  "Darivanje",
  "Bitcoin kao novac",
  "Neto imovina",
  "Sigurnost i obitelj",
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

function readFile(relativePath) {
  if (!assertFile(relativePath)) {
    return ""
  }

  return fs.readFileSync(filePath(relativePath), "utf8")
}

function assertIncludes(relativePath, contents, expected, label = expected) {
  if (contents.includes(expected)) {
    pass(`${relativePath} contains ${label}`)
    return
  }

  fail(`${relativePath} is missing ${label}`)
}

function assertNotIncludes(relativePath, contents, expected, label = expected) {
  if (!contents.includes(expected)) {
    pass(`${relativePath} does not contain ${label}`)
    return
  }

  fail(`${relativePath} should not contain ${label}`)
}

function assertCount(relativePath, contents, expected, count, label = expected) {
  const actual = contents.split(expected).length - 1

  if (actual === count) {
    pass(`${relativePath} contains ${label} ${count} time(s)`)
    return
  }

  fail(`${relativePath} contains ${label} ${actual} time(s), expected ${count}`)
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
const home = routeMap.get("/")
const guidesIndex = routeMap.get("/vodici/")
const security = routeMap.get("/sigurnost/")

const requiredFiles = [
  "index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "vodici/index.html",
  "sigurnost/index.html",
  ...requiredGuidePaths.map(routeFile),
]

requiredFiles.forEach(assertFile)

const homeHtml = readFile("index.html")
assertIncludes(
  "index.html",
  homeHtml,
  "Imate Bitcoin? Izgradite osobni Bitcoin standard.",
  "homepage hero text"
)
assertIncludes(
  "index.html",
  homeHtml,
  "Bitcoin nije samo imovina koju držite. Bitcoin je novac.",
  "homepage Bitcoin as money copy"
)
assertIncludes(
  "index.html",
  homeHtml,
  "Dug je budući novac koji ste već potrošili.",
  "debt section title"
)
assertIncludes(
  "index.html",
  homeHtml,
  "Bitcoin standard ne počinje većom kupnjom. Počinje izlaskom iz duga.",
  "debt section punchline"
)
assertIncludes(
  "index.html",
  homeHtml,
  "Darivanje mijenja vaš odnos prema novcu.",
  "giving section title"
)
assertIncludes(
  "index.html",
  homeHtml,
  "Prvo dolazi red. Zatim izlazak iz duga. Tek tada darivanje.",
  "giving section order copy"
)
assertIncludes(
  "index.html",
  homeHtml,
  "Bez očekivanja povrata",
  "giving section no return card"
)
assertIncludes(
  "index.html",
  homeHtml,
  "Iz uređenog proračuna",
  "giving section budget card"
)
assertIncludes(
  "index.html",
  homeHtml,
  "Prema ljudima",
  "giving section people card"
)
assertIncludes(
  "index.html",
  homeHtml,
  "Praktični Bitcoin standard ne pita samo koliko imate",
  "giving section punchline"
)
assertIncludes("index.html", homeHtml, "osobni proračun", "personal budget copy")
assertIncludes("index.html", homeHtml, "kupovna moć", "purchasing power copy")
assertIncludes(
  "index.html",
  homeHtml,
  "Praktični Bitcoin standard",
  "Praktični Bitcoin standard copy"
)
assertIncludes(
  "index.html",
  homeHtml,
  "Dogovorite 15-minutni uvodni razgovor",
  "primary CTA"
)
assertIncludes("index.html", homeHtml, "FAQPage", "FAQPage schema")
assertIncludes("index.html", homeHtml, "OfferCatalog", "OfferCatalog schema")
assertIncludes(
  "index.html",
  homeHtml,
  "Praktični Bitcoin standard ima redoslijed.",
  "method section title"
)
assertIncludes(
  "index.html",
  homeHtml,
  "Na kraju imate svoj osobni Bitcoin standard.",
  "program output preview section"
)
assertIncludes(
  "index.html",
  homeHtml,
  "Osobni Bitcoin standard",
  "program document preview"
)
assertIncludes(
  "index.html",
  homeHtml,
  "Ovo nije primjer stvarnog klijenta i ne sadrži financijsku preporuku",
  "program output clarification"
)
assertIncludes(
  "index.html",
  homeHtml,
  "Što se dogodi nakon klika?",
  "booking steps section"
)
assertIncludes(
  "index.html",
  homeHtml,
  "Odaberete termin",
  "booking steps first step"
)
assertIncludes(
  "index.html",
  homeHtml,
  "Vaš Bitcoin ostaje vaš.",
  "security expectations section"
)
assertIncludes(
  "index.html",
  homeHtml,
  "Živim standard koji pomažem postaviti.",
  "about section title"
)
assertIncludes(
  "index.html",
  homeHtml,
  "Mogu li se zadužiti kako bih kupio Bitcoin?",
  "debt FAQ question"
)
assertIncludes(
  "index.html",
  homeHtml,
  "To je fiat ponašanje primijenjeno na Bitcoin",
  "fiat debt FAQ copy"
)
assertIncludes(
  "index.html",
  homeHtml,
  "Pročitajte sigurnosna pravila",
  "security page link copy"
)
assertIncludes("index.html", homeHtml, "/vodici/", "guide index link")
assertIncludes("index.html", homeHtml, "/sigurnost/", "security page link")
assertIncludes(
  "index.html",
  homeHtml,
  'data-cta="hero-booking"',
  "hero booking CTA metadata"
)
assertIncludes(
  "index.html",
  homeHtml,
  'data-cta="header-booking"',
  "header booking CTA metadata"
)
assertIncludes(
  "index.html",
  homeHtml,
  'data-cta="offers-program"',
  "program offer CTA metadata"
)
assertIncludes(
  "index.html",
  homeHtml,
  'data-cta="final-booking"',
  "final booking CTA metadata"
)
assertIncludes(
  "index.html",
  homeHtml,
  'data-cta="sticky-mobile-booking"',
  "sticky mobile CTA metadata"
)
assertIncludes(
  "index.html",
  homeHtml,
  'data-link="security-rules"',
  "security rules link metadata"
)
assertIncludes(
  "index.html",
  homeHtml,
  'data-link="footer-security"',
  "footer security link metadata"
)
assertIncludes(
  "index.html",
  homeHtml,
  '<link rel="canonical" href="https://bitcoin-savjetovanje.com/" />',
  "canonical URL"
)
assertCount("index.html", homeHtml, '<link rel="canonical"', 1, "canonical tag")

if (!home) {
  fail("Route metadata for homepage is missing")
}

const guidesIndexHtml = readFile("vodici/index.html")
assertIncludes(
  "vodici/index.html",
  guidesIndexHtml,
  "Vodiči za osobni Bitcoin standard",
  "guide index title"
)
assertIncludes(
  "vodici/index.html",
  guidesIndexHtml,
  "Preporučeni redoslijed",
  "recommended reading order"
)
assertIncludes(
  "vodici/index.html",
  guidesIndexHtml,
  "Ne znate odakle krenuti?",
  "recommended order intro"
)
for (const category of guideCategories) {
  assertIncludes(
    "vodici/index.html",
    guidesIndexHtml,
    category,
    `${category} category`
  )
}
assertIncludes(
  "vodici/index.html",
  guidesIndexHtml,
  "Svaki euro ima namjenu",
  "first recommended guide"
)
assertIncludes(
  "vodici/index.html",
  guidesIndexHtml,
  "Dug je budući novac koji ste već potrošili",
  "debt guide"
)
assertIncludes(
  "vodici/index.html",
  guidesIndexHtml,
  "Darivanje mijenja vaš odnos prema novcu",
  "giving guide"
)
assertIncludes(
  "vodici/index.html",
  guidesIndexHtml,
  "Darivanje bez duga",
  "debt-free giving guide"
)
assertIncludes(
  "vodici/index.html",
  guidesIndexHtml,
  "Redoslijed je važan",
  "giving order note"
)
assertIncludes(
  "vodici/index.html",
  guidesIndexHtml,
  "Nakon izlaska iz duga, dio novca dobiva namjenu za druge ljude.",
  "giving category description"
)
assertIncludes(
  "vodici/index.html",
  guidesIndexHtml,
  "Bitcoin je novac",
  "bitcoin as money guide"
)
assertIncludes(
  "vodici/index.html",
  guidesIndexHtml,
  "Pravilo trećina u neto imovini",
  "thirds rule guide"
)
assertIncludes(
  "vodici/index.html",
  guidesIndexHtml,
  "Sigurnost ne smije ovisiti samo o vama",
  "security guide"
)
assertIncludes(
  "vodici/index.html",
  guidesIndexHtml,
  '<link rel="canonical" href="https://bitcoin-savjetovanje.com/vodici/" />',
  "guide index canonical URL"
)
assertIncludes("vodici/index.html", guidesIndexHtml, "CollectionPage", "CollectionPage schema")
assertIncludes("vodici/index.html", guidesIndexHtml, "ItemList", "ItemList schema")
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

const securityHtml = readFile("sigurnost/index.html")
assertIncludes(
  "sigurnost/index.html",
  securityHtml,
  "Sigurnost i povjerljivost",
  "security title"
)
assertIncludes("sigurnost/index.html", securityHtml, "Nikada ne tražim", "never ask section")
assertIncludes(
  "sigurnost/index.html",
  securityHtml,
  "početne riječi za oporavak",
  "recovery words copy"
)
assertIncludes(
  "sigurnost/index.html",
  securityHtml,
  "privatne ključeve",
  "private keys copy"
)
assertIncludes(
  "sigurnost/index.html",
  securityHtml,
  '<link rel="canonical" href="https://bitcoin-savjetovanje.com/sigurnost/" />',
  "security canonical URL"
)
assertIncludes(
  "sigurnost/index.html",
  securityHtml,
  "Dogovorite 15-minutni uvodni razgovor",
  "primary CTA"
)
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
  assertIncludes(relativePath, html, "U ovom vodiču", "table of contents")
  assertIncludes(relativePath, html, "Praktično pitanje", "practical question")
  assertIncludes(relativePath, html, "Povezani vodiči", "related guides")
  assertIncludes(
    relativePath,
    html,
    'data-link="related-guide"',
    "related guide link metadata"
  )
  assertIncludes(
    relativePath,
    html,
    "Dogovorite 15-minutni uvodni razgovor",
    "primary CTA"
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

const purchasingPowerGuidePath =
  "vodici/uskladivanje-kupovne-moci-bitcoina/index.html"
const purchasingPowerGuideHtml = readFile(purchasingPowerGuidePath)
assertIncludes(
  purchasingPowerGuidePath,
  purchasingPowerGuideHtml,
  "Usklađivanje kupovne moći",
  "purchasing power guide title"
)

const moneyCapitalGuidePath = "vodici/novac-kapital-potrosnja/index.html"
const moneyCapitalGuideHtml = readFile(moneyCapitalGuidePath)
assertIncludes(
  moneyCapitalGuidePath,
  moneyCapitalGuideHtml,
  "Novac, potrošnja i proizvodna imovina",
  "money production guide title"
)
assertIncludes(
  moneyCapitalGuidePath,
  moneyCapitalGuideHtml,
  "Bitcoin je novac",
  "money production guide Bitcoin as money copy"
)

const debtGuidePath = "vodici/dug-ili-bitcoin/index.html"
const debtGuideHtml = readFile(debtGuidePath)
assertIncludes(debtGuidePath, debtGuideHtml, "Dug je budući novac", "debt guide copy")
assertIncludes(debtGuidePath, debtGuideHtml, "život bez duga", "debt guide standard copy")
assertIncludes(
  purchasingPowerGuidePath,
  purchasingPowerGuideHtml,
  "Kupovna moć",
  "purchasing power guide copy"
)
assertIncludes(
  purchasingPowerGuidePath,
  purchasingPowerGuideHtml,
  '<link rel="canonical" href="https://bitcoin-savjetovanje.com/vodici/uskladivanje-kupovne-moci-bitcoina/" />',
  "purchasing power guide canonical URL"
)

const newGuideChecks = [
  {
    path: "vodici/svaki-euro-ima-namjenu/index.html",
    title: "Svaki euro ima namjenu",
    copy: "Proračun nije kazna",
  },
  {
    path: "vodici/starost-novca/index.html",
    title: "Starost novca",
    copy: "Stariji novac daje prostor",
  },
  {
    path: "vodici/dug-je-buduci-novac/index.html",
    title: "Dug je budući novac koji ste već potrošili",
    copy: "Dug je fiat ponašanje",
  },
  {
    path: "vodici/ne-zaduzujte-se-za-bitcoin/index.html",
    title: "Ne zadužujte se za Bitcoin",
    copy: "Zašto je to fiat ponašanje",
  },
  {
    path: "vodici/darivanje-u-proracunu/index.html",
    title: "Darivanje mijenja vaš odnos prema novcu",
    copy: "Darivanje nije ostatak",
  },
  {
    path: "vodici/darivanje-bez-duga/index.html",
    title: "Darivanje bez duga",
    copy: "Dug i darivanje ne stvaraju isti duh",
  },
  {
    path: "vodici/bitcoin-kao-novac/index.html",
    title: "Bitcoin je novac",
    copy: "Bitcoin nije proizvodna imovina",
  },
  {
    path: "vodici/pozitivni-neto-priljev/index.html",
    title: "Pozitivan neto priljev",
    copy: "Priljevi i odljevi",
  },
  {
    path: "vodici/pravilo-trecina/index.html",
    title: "Pravilo trećina u neto imovini",
    copy: "Najmanje trećina u novcu",
  },
  {
    path: "vodici/sigurnost-ne-smije-ovisiti-samo-o-vama/index.html",
    title: "Sigurnost ne smije ovisiti samo o vama",
    copy: "Informacija nije isto što i pristup",
  },
  {
    path: "vodici/novac-kapital-potrosnja/index.html",
    title: "Novac, potrošnja i proizvodna imovina",
    copy: "Bitcoin kao novac",
  },
]

for (const guideCheck of newGuideChecks) {
  const guideHtml = readFile(guideCheck.path)

  assertIncludes(guideCheck.path, guideHtml, guideCheck.title, "guide title")
  assertIncludes(guideCheck.path, guideHtml, guideCheck.copy, "guide copy")
}

const givingGuidePath = "vodici/darivanje-u-proracunu/index.html"
const givingGuideHtml = readFile(givingGuidePath)
assertIncludes(
  givingGuidePath,
  givingGuideHtml,
  "Darivanje mijenja vaš odnos prema novcu",
  "renamed giving guide title"
)
assertIncludes(
  givingGuidePath,
  givingGuideHtml,
  "Darivanje nije ostatak",
  "renamed giving guide first section"
)
assertIncludes(
  givingGuidePath,
  givingGuideHtml,
  "Bez očekivanja povrata",
  "renamed giving guide no return section"
)
assertIncludes(
  givingGuidePath,
  givingGuideHtml,
  "Darivanje vas okreće prema ljudima",
  "renamed giving guide people section"
)
assertIncludes(
  givingGuidePath,
  givingGuideHtml,
  "Velikodušnost mijenja način rada",
  "renamed giving guide work section"
)

const debtFreeGivingGuidePath = "vodici/darivanje-bez-duga/index.html"
const debtFreeGivingGuideHtml = readFile(debtFreeGivingGuidePath)
assertIncludes(
  debtFreeGivingGuidePath,
  debtFreeGivingGuideHtml,
  "Darivanje bez duga",
  "debt-free giving guide title"
)
assertIncludes(
  debtFreeGivingGuidePath,
  debtFreeGivingGuideHtml,
  "Dug i darivanje ne stvaraju isti duh",
  "debt-free giving guide first section"
)
assertIncludes(
  debtFreeGivingGuidePath,
  debtFreeGivingGuideHtml,
  "Prvo sloboda, zatim velikodušnost",
  "debt-free giving guide freedom section"
)
assertIncludes(
  debtFreeGivingGuidePath,
  debtFreeGivingGuideHtml,
  "Praktično pitanje",
  "debt-free giving guide practical question"
)
assertIncludes(
  debtFreeGivingGuidePath,
  debtFreeGivingGuideHtml,
  "Povezani vodiči",
  "debt-free giving guide related guides"
)
assertIncludes(
  debtFreeGivingGuidePath,
  debtFreeGivingGuideHtml,
  '"@type":"Article"',
  "debt-free giving Article schema"
)
assertIncludes(
  debtFreeGivingGuidePath,
  debtFreeGivingGuideHtml,
  "BreadcrumbList",
  "debt-free giving BreadcrumbList schema"
)
assertIncludes(
  debtFreeGivingGuidePath,
  debtFreeGivingGuideHtml,
  '<link rel="canonical" href="https://bitcoin-savjetovanje.com/vodici/darivanje-bez-duga/" />',
  "debt-free giving canonical URL"
)

const sitemap = readFile("sitemap.xml")
for (const route of prerenderRoutes) {
  const routeLoc = `<loc>${route.canonical}</loc>`

  assertIncludes("sitemap.xml", sitemap, routeLoc, `${route.path} URL`)
  assertIncludes(
    "sitemap.xml",
    sitemap,
    `<lastmod>${route.lastmod}</lastmod>`,
    `${route.path} lastmod`
  )
  assertCount("sitemap.xml", sitemap, routeLoc, 1, `${route.path} URL`)
}

for (const guidePath of requiredGuidePaths) {
  const route = routeMap.get(guidePath)

  if (!route) {
    continue
  }

  const nonSlashLoc = `<loc>${route.canonical.replace(/\/$/, "")}</loc>`
  assertNotIncludes(
    "sitemap.xml",
    sitemap,
    nonSlashLoc,
    `${guidePath} non-slash URL`
  )
}

const robots = readFile("robots.txt")
assertIncludes("robots.txt", robots, "User-agent: *", "user agent rule")
assertIncludes(
  "robots.txt",
  robots,
  "Sitemap: https://bitcoin-savjetovanje.com/sitemap.xml",
  "sitemap location"
)

if (failures.length > 0) {
  console.error(`\nverify-dist failed with ${failures.length} problem(s):`)
  failures.forEach((message) => console.error(`- ${message}`))
  process.exit(1)
}

console.log("\nverify-dist passed")
