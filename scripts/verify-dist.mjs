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
  "/vodici/kredit-je-buduci-novac",
  "/vodici/bitcoin-u-neto-imovini",
  "/vodici/kredit-ili-bitcoin",
  "/vodici/ne-uzimajte-kredit-za-bitcoin",
  "/vodici/sustavno-davanje-u-proracunu-nulte-razine",
  "/vodici/sustavno-davanje-bez-kredita",
  "/vodici/novac-dolazi-od-ljudi",
  "/vodici/bitcoin-kao-novac",
  "/vodici/pozitivni-neto-priljev",
  "/vodici/dca-nije-dovoljan",
  "/vodici/uskladivanje-kupovne-moci-bitcoina",
  "/vodici/cijena-kao-mjera-vremena",
  "/vodici/pravilo-trecina",
  "/vodici/sigurnost-ne-smije-ovisiti-samo-o-vama",
  "/vodici/obiteljski-pristup-bitcoinu",
  "/vodici/novac-kapital-potrosnja",
]

const aliasGuidePaths = [
  {
    oldPath: "/vodici/dug-je-buduci-novac",
    newCanonical:
      "https://bitcoin-savjetovanje.com/vodici/kredit-je-buduci-novac/",
  },
  {
    oldPath: "/vodici/dug-ili-bitcoin",
    newCanonical: "https://bitcoin-savjetovanje.com/vodici/kredit-ili-bitcoin/",
  },
  {
    oldPath: "/vodici/ne-zaduzujte-se-za-bitcoin",
    newCanonical:
      "https://bitcoin-savjetovanje.com/vodici/ne-uzimajte-kredit-za-bitcoin/",
  },
  {
    oldPath: "/vodici/darivanje-u-proracunu",
    newCanonical:
      "https://bitcoin-savjetovanje.com/vodici/sustavno-davanje-u-proracunu-nulte-razine/",
  },
  {
    oldPath: "/vodici/darivanje-bez-duga",
    newCanonical:
      "https://bitcoin-savjetovanje.com/vodici/sustavno-davanje-bez-kredita/",
  },
]

const guideCategories = [
  "Osobni proračun nulte osnove",
  "Život bez duga",
  "Darivanje",
  "Bitcoin kao novac",
  "Neto imovina",
  "Sigurnost i obitelj",
]

const words = (...parts) => parts.join(" ")

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
  ...aliasGuidePaths.map((route) => routeFile(route.oldPath)),
]

requiredFiles.forEach(assertFile)

const forbiddenVisibleText = [
  words("Bitcoin kao novac,", "kapital i potrošnja"),
  words("dugoročnog", "kapitala"),
  words("Bitcoin kao", "kapital"),
  "proračun nulte razine",
  "Dogovorite 15-minutni uvodni razgovor",
  "Strukturirani program",
  "Savjetodavni razgovor",
  "Uvodni razgovor",
  "crypto",
  "ROI",
  "custody",
  "self-custody",
  "cash balance",
  "stack",
  "lead magnet",
  "charity",
  "giving",
  words("dobar", "dug"),
  words("jeftin", "dug"),
  words("pametno", "zaduživanje"),
  words("optimizacija", "duga"),
  words("upravljanje", "dugom"),
  words("kredit kao", "alat"),
  words("dug se može", "isplatiti"),
  words("ako je prinos veći od", "kamate"),
  words("ulaganje u Bitcoin", "kreditom"),
]

for (const absoluteHtmlPath of htmlFiles()) {
  const relativeHtmlPath = path.relative(distDir, absoluteHtmlPath)
  const html = fs.readFileSync(absoluteHtmlPath, "utf8")

  for (const forbidden of forbiddenVisibleText) {
    assertNotIncludes(
      relativeHtmlPath,
      html,
      forbidden,
      `forbidden visible text: ${forbidden}`
    )
  }
}

const homeHtml = readFile("index.html")
const homeChecks = [
  ["Imate Bitcoin. Ali imate li Bitcoin standard?", "new hero title"],
  [
    "problem nije Bitcoin. Problem je sustav oko njega.",
    "hero problem statement",
  ],
  [
    "Dogovorite provjeru osobnog Bitcoin standarda",
    "primary CTA",
  ],
  ["Provjerite gdje ste", "secondary CTA"],
  [
    "15 minuta. Bez naknade. Bez prognoza cijene. Bez upravljanja vašim sredstvima.",
    "hero trust copy",
  ],
  ["Volatilnost otkriva imate li standard.", "volatility section"],
  ["Kad kupovna moć pada", "falling purchasing power card"],
  ["Kad kupovna moć raste", "rising purchasing power card"],
  [
    "Bitcoin nije dovoljan ako ostatak života ostaje na fiat pravilima.",
    "standard contrast title",
  ],
  ["Bitcoin bez standarda", "without standard column"],
  ["Bitcoin sa standardom", "with standard column"],
  ["Prvo red. Zatim sloboda. Zatim darivanje.", "foundations title"],
  ["Proračun nulte osnove", "zero-based budget terminology"],
  ["Život bez duga", "debt-free life terminology"],
  ["Darivanje nije ukras osobnog Bitcoin standarda.", "giving foundation"],
  ["Koliko je vaš Bitcoin standard stvaran?", "self-assessment title"],
  ["Znate li točno što je vaš stvarni višak?", "assessment question"],
  ["Imate li dug koji može prisiliti prodaju Bitcoina?", "debt pressure check"],
  [
    "Zna li obitelj što smije, a što ne smije napraviti sa sigurnosnim postavkama?",
    "family security check",
  ],
  ["Izgradnja osobnog Bitcoin standarda", "main program title"],
  ["4–6 tjedana · 1.500 €", "program price duration"],
  ["Korak 1 - Red u novcu", "program step 1"],
  ["Korak 6 - Sigurnost i obitelj", "program step 6"],
  [
    "Na kraju imate pisani osobni Bitcoin standard",
    "program outcome",
  ],
  [
    "Ovo nije prognoza cijene ni upravljanje vašim Bitcoinom.",
    "not doing title",
  ],
  ["ne dajem trading signale", "no trading signals"],
  ["ne tražim početne riječi", "no recovery words"],
  [
    "Radimo na pravilima po kojima vi donosite bolje odluke.",
    "positive not doing contrast",
  ],
  [
    "Vodiči su za razumijevanje. Razgovor je za primjenu.",
    "guides sales support title",
  ],
  [
    "Bitcoin mora ostati pod vašom kontrolom, ali sustav ne smije ovisiti samo o vama.",
    "security and family title",
  ],
  [
    "početne riječi i privatni ključevi se ne dijele sa savjetnikom",
    "security family rule",
  ],
  [
    "Ne pomažem vam napraviti nešto što sam promatrao izvana.",
    "about authority title",
  ],
  [
    "Pomažem vam postaviti pravila iz prakse koju sam morao naučiti živjeti.",
    "about practice copy",
  ],
  [
    "Provjerite što bi vaš sustav napravio kada Bitcoin napravi bilo što.",
    "final CTA title",
  ],
  ["OfferCatalog", "OfferCatalog schema"],
  [
    '<link rel="canonical" href="https://bitcoin-savjetovanje.com/" />',
    "canonical URL",
  ],
]

for (const [expected, label] of homeChecks) {
  assertIncludes("index.html", homeHtml, expected, label)
}

const homeDataCtas = [
  'data-cta="hero-standard-check"',
  'data-cta="volatility-standard-check"',
  'data-cta="test-standard-check"',
  'data-cta="program-standard-check"',
  'data-cta="guides-standard-check"',
  'data-cta="final-standard-check"',
  'data-cta="header-standard-check"',
  'data-cta="sticky-mobile-standard-check"',
]

for (const dataCta of homeDataCtas) {
  assertIncludes("index.html", homeHtml, dataCta, dataCta)
}

assertNotIncludes("index.html", homeHtml, "FAQPage", "removed FAQPage schema")
assertIncludes("index.html", homeHtml, "/vodici/", "guide index link")
assertIncludes("index.html", homeHtml, "/sigurnost/", "security page link")
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
assertCount("index.html", homeHtml, '<link rel="canonical"', 1, "canonical tag")

if (!home) {
  fail("Route metadata for homepage is missing")
}

const guidesIndexHtml = readFile("vodici/index.html")
const guideIndexChecks = [
  ["Vodiči za osobni Bitcoin standard", "guide index title"],
  [
    "Ako želite razumjeti okvir, čitajte vodiče.",
    "guide index sales support copy",
  ],
  ["Preporučeni redoslijed čitanja", "recommended reading order"],
  ["Ne čitajte sve odjednom. Krenite redom.", "recommended order intro"],
  ["Put prema osobnom Bitcoin standardu", "guide path visual title"],
  [
    "Razina 1: Imate Bitcoin, ali još živite po fiat pravilima",
    "level 1 title",
  ],
  ["Razina 2: Gradite osobni Bitcoin standard", "level 2 title"],
  ["Razina 3: Živite i usavršavate standard", "level 3 title"],
  ["Dug je budući novac koji ste već potrošili", "debt guide title"],
  ["Darivanje mijenja vaš odnos prema novcu", "giving guide"],
  ["Bitcoin je novac", "bitcoin as money guide"],
  ["Pravilo trećina u neto imovini", "thirds rule guide"],
  ["Sigurnost ne smije ovisiti samo o vama", "security guide"],
  [
    '<link rel="canonical" href="https://bitcoin-savjetovanje.com/vodici/" />',
    "guide index canonical URL",
  ],
  ["CollectionPage", "CollectionPage schema"],
  ["ItemList", "ItemList schema"],
  ['data-cta="guides-index-standard-check"', "guide index CTA metadata"],
]

for (const [expected, label] of guideIndexChecks) {
  assertIncludes("vodici/index.html", guidesIndexHtml, expected, label)
}

for (const category of guideCategories) {
  assertIncludes(
    "vodici/index.html",
    guidesIndexHtml,
    category,
    `${category} category`
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

const securityHtml = readFile("sigurnost/index.html")
const securityChecks = [
  ["Sigurnost i povjerljivost", "security title"],
  [
    "Bitcoin mora ostati pod vašom kontrolom, ali sustav ne smije ovisiti samo o vama.",
    "security family intro",
  ],
  ["Nikada ne tražim", "never ask section"],
  ["početne riječi", "recovery words copy"],
  ["privatne ključeve", "private keys copy"],
  ["što obitelj smije napraviti", "family allowed actions"],
  ["što obitelj nikada ne smije napraviti", "family forbidden actions"],
  ["ne čuvam Bitcoin", "no Bitcoin custody copy"],
  ['data-cta="security-standard-check"', "security CTA metadata"],
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
    "Dogovorite provjeru osobnog Bitcoin standarda",
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

const focusedGuideChecks = [
  {
    path: "vodici/svaki-euro-ima-namjenu/index.html",
    checks: ["Svaki euro ima namjenu", "Proračun nulte osnove nije kazna"],
  },
  {
    path: "vodici/stvarni-visak/index.html",
    checks: ["Što je stvarni višak?", "Višak nije stanje na računu"],
  },
  {
    path: "vodici/kredit-je-buduci-novac/index.html",
    checks: [
      "Dug je budući novac koji ste već potrošili",
      "Dva stanja novca",
      "Vrijeme zalijeva stanje",
      "izađite iz duga što je brže moguće",
    ],
  },
  {
    path: "vodici/kredit-ili-bitcoin/index.html",
    checks: ["Dug ili Bitcoin?", "Ne pokušavajte istrgovati izlaz"],
  },
  {
    path: "vodici/sustavno-davanje-u-proracunu-nulte-razine/index.html",
    checks: [
      "Darivanje mijenja vaš odnos prema novcu",
      "Darivanje nije ostatak",
      "Bez očekivanja povrata",
    ],
  },
  {
    path: "vodici/bitcoin-kao-novac/index.html",
    checks: ["Bitcoin je novac", "Bitcoin nije proizvodna imovina"],
  },
  {
    path: "vodici/uskladivanje-kupovne-moci-bitcoina/index.html",
    checks: [
      "Usklađivanje kupovne moći",
      "Kada kupovna moć pada",
      "Kada kupovna moć raste",
    ],
  },
  {
    path: "vodici/pravilo-trecina/index.html",
    checks: ["Pravilo trećina u neto imovini", "Najmanje trećina u novcu"],
  },
  {
    path: "vodici/sigurnost-ne-smije-ovisiti-samo-o-vama/index.html",
    checks: [
      "Sigurnost ne smije ovisiti samo o vama",
      "Informacija nije isto što i pristup",
    ],
  },
  {
    path: "vodici/obiteljski-pristup-bitcoinu/index.html",
    checks: ["Obiteljski pristup", "što ne dirati"],
  },
]

for (const guideCheck of focusedGuideChecks) {
  const html = readFile(guideCheck.path)

  for (const expected of guideCheck.checks) {
    assertIncludes(guideCheck.path, html, expected, `guide copy: ${expected}`)
  }
}

const sitemap = readFile("sitemap.xml")

for (const route of ["/", "/vodici/", "/sigurnost/"]) {
  assertIncludes(
    "sitemap.xml",
    sitemap,
    `<loc>https://bitcoin-savjetovanje.com${route}</loc>`,
    `${route} sitemap URL`
  )
}

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

if (failures.length > 0) {
  console.error(`\nverify-dist failed with ${failures.length} problem(s):`)
  failures.forEach((message) => console.error(`- ${message}`))
  process.exit(1)
}

console.log("\nverify-dist passed")
