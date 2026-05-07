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
  "/vodici/davanje-u-proracunu-nulte-osnove",
  "/vodici/davanje-bez-duga",
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
    newCanonical:
      "https://bitcoin-savjetovanje.com/vodici/davanje-bez-duga/",
  },
  {
    oldPath: "/vodici/davanje-u-proracunu",
    newCanonical:
      "https://bitcoin-savjetovanje.com/vodici/davanje-u-proracunu-nulte-osnove/",
  },
]

const guideCategories = [
  "Osobni proračun nulte osnove",
  "Život bez duga",
  "Davanje",
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
  "Strukturirani program",
  "Savjetodavni razgovor",
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
const homeForbiddenVisibleText = [
  "FOMO",
  "Fear & Greed",
  "falling knife",
  "DCA",
  "trading",
  "crypto",
  "altcoin",
  "web3",
  "custody",
  "seed phrase",
  "self-custody",
  "risk tolerance",
  "ROI",
  "mindset",
  "framework",
  "cash balance",
  "stack",
  "stacking",
  "hype",
  "roadmap",
  "lead magnet",
  "giving",
  "charity",
  "trading signali",
  "uvodni poziv",
]

for (const forbidden of homeForbiddenVisibleText) {
  assertNotIncludes(
    "index.html",
    homeHtml,
    forbidden,
    `homepage forbidden text: ${forbidden}`
  )
}

const homeChecks = [
  ["Bitcoin Savjetovanje | Osobni Bitcoin standard", "home SEO title"],
  [
    "Imate Bitcoin. Sada trebate pravila.",
    "hero title",
  ],
  [
    "Bitcoin nije problem. Problem je kada odluke o novcu, dugu, troškovima, sigurnosti i obitelji nisu zapisane prije pritiska.",
    "hero subtitle",
  ],
  [
    "Pomažem vam izgraditi osobni Bitcoin standard",
    "hero body copy",
  ],
  [
    "Dogovorite 15-minutni uvodni razgovor",
    "primary CTA",
  ],
  [
    "15 minuta. Bez naknade. Bez obveze.",
    "hero intro call helper",
  ],
  [
    "Bez prognoza cijene. Bez upravljanja vašim sredstvima. Bez traženja početnih riječi.",
    "hero security microcopy",
  ],
  [
    "Bitcoin standard se vidi kad dođe pritisak.",
    "stress-test section title",
  ],
  [
    "Kada Bitcoin padne",
    "stress-test fall card",
  ],
  [
    "Kada Bitcoin naraste",
    "stress-test rise card",
  ],
  [
    "Kada se dogodi život",
    "stress-test life card",
  ],
  [
    "Metoda je šira od kupnje Bitcoina.",
    "method hint title",
  ],
  [
    "Proračun",
    "method path budget",
  ],
  [
    "Dug",
    "method path debt",
  ],
  [
    "Darivanje",
    "method path giving",
  ],
  [
    "Bitcoin",
    "method path bitcoin",
  ],
  [
    "Neto imovina",
    "method path net worth",
  ],
  [
    "Sigurnost",
    "method path security",
  ],
  [
    "Obitelj",
    "method path family",
  ],
  [
    "U 15 minuta vidimo gdje sustav najviše škripi.",
    "intro call section title",
  ],
  [
    "Uvodni razgovor nije prodaja Bitcoina, prognoza cijene ni upravljanje vašim novcem.",
    "intro call boundary copy",
  ],
  [
    "Uvodni razgovor je bez naknade i traje 15 minuta.",
    "intro call helper copy",
  ],
  [
    "Osobni Bitcoin standard je dokument s pravilima.",
    "personal standard title",
  ],
  [
    "što svaki euro treba napraviti",
    "personal standard budget rule",
  ],
  [
    "što obitelj treba znati bez predaje kontrole",
    "personal standard family rule",
  ],
  ["Izgradnja osobnog Bitcoin standarda", "main program title"],
  ["4–6 tjedana · 1.500 €", "program price duration"],
  [
    "Za ljude koji ne žele samo još jedan razgovor o Bitcoinu, nego pisana pravila za vlastiti život.",
    "program positioning copy",
  ],
  [
    "pisani osobni Bitcoin standard",
    "program written standard outcome",
  ],
  [
    "sigurnosni i obiteljski plan",
    "program security outcome",
  ],
  [
    "Dubinska provjera osobnog Bitcoin standarda",
    "deep standard check offer",
  ],
  [
    "Vaš Bitcoin ostaje pod vašom kontrolom.",
    "security section title",
  ],
  [
    "Pročitajte sigurnosna pravila",
    "security page link",
  ],
  [
    "Ne pomažem vam postaviti teoriju koju nisam živio.",
    "about authority title",
  ],
  [
    "Moj posao nije reći vam što će cijena napraviti.",
    "about boundary copy",
  ],
  ["Želite prvo čitati?", "guides teaser title"],
  [
    "Vodiči objašnjavaju okvir. Razgovor ga primjenjuje na vašu situaciju.",
    "guides teaser copy",
  ],
  ["Svaki euro ima namjenu", "first guide teaser"],
  [
    "Dug je budući novac koji ste već potrošili",
    "second guide teaser",
  ],
  ["Bitcoin je novac", "third guide teaser"],
  ["Pogledajte sve vodiče", "all guides link"],
  [
    "Što dobivam u uvodnom razgovoru?",
    "FAQ intro call question",
  ],
  ["Je li ovo financijsko savjetovanje?", "FAQ financial advice question"],
  ["Moram li već imati Bitcoin?", "FAQ Bitcoin ownership question"],
  [
    "Hoćete li upravljati mojim sredstvima?",
    "FAQ custody/control question",
  ],
  [
    "Provjerite gdje ste u odnosu na osobni Bitcoin standard.",
    "final CTA title",
  ],
  [
    "Uvodni razgovor traje 15 minuta, bez naknade i bez obveze.",
    "final CTA copy",
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
  'data-cta="hero-intro-call"',
  'data-cta="stress-test-intro-call"',
  'data-cta="method-intro-call"',
  'data-cta="intro-call-primary"',
  'data-cta="program-intro-call"',
  'data-cta="security-intro-call"',
  'data-cta="guides-intro-call"',
  'data-cta="final-intro-call"',
  'data-cta="header-standard-check"',
  'data-cta="sticky-mobile-standard-check"',
]

for (const dataCta of homeDataCtas) {
  assertIncludes("index.html", homeHtml, dataCta, dataCta)
}

const homeDataLinks = [
  'data-link="security-rules"',
  'data-link="home-guide-teaser"',
  'data-link="home-guides-index"',
]

for (const dataLink of homeDataLinks) {
  assertIncludes("index.html", homeHtml, dataLink, dataLink)
}

const removedHomepageCopy = [
  "Osobni Bitcoin standard u 6 područja",
  "Koliko je vaš Bitcoin standard stvaran?",
  "Znate li koju namjenu ima sav novac kojim raspolažete?",
  "Bitcoin zakon potencije",
  "Rješenje",
  "trading plan",
]

for (const removedCopy of removedHomepageCopy) {
  assertNotIncludes(
    "index.html",
    homeHtml,
    removedCopy,
    `removed homepage copy: ${removedCopy}`
  )
}

assertNotIncludes("index.html", homeHtml, "FAQPage", "removed FAQPage schema")
assertIncludes("index.html", homeHtml, "/vodici/", "guide index link")
assertIncludes("index.html", homeHtml, "/sigurnost/", "security page link")
assertIncludes(
  "index.html",
  homeHtml,
  'data-link="footer-security"',
  "footer security link metadata"
)
assertCount("index.html", homeHtml, '<link rel="canonical"', 1, "canonical tag")
assertCount(
  "index.html",
  homeHtml,
  "Provjerite gdje ste u odnosu na osobni Bitcoin standard.",
  1,
  "final CTA title"
)

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
  ["Krenite s ova tri vodiča.", "three starter guides title"],
  [
    "Ako pročitate samo tri vodiča, krenite ovdje.",
    "three starter guides copy",
  ],
  [
    "Razina 1: Imate Bitcoin, ali još živite po fiat pravilima",
    "level 1 title",
  ],
  ["Razina 2: Gradite osobni Bitcoin standard", "level 2 title"],
  ["Razina 3: Živite i usavršavate standard", "level 3 title"],
  ["Dug je budući novac koji ste već potrošili", "debt guide title"],
  ["Davanje mijenja vaš odnos prema novcu", "giving guide"],
  ["Bitcoin je novac", "bitcoin as money guide"],
  ["Pravilo trećina u neto imovini", "thirds rule guide"],
  ["Sigurnost ne smije ovisiti samo o vama", "security guide"],
  ["Svi vodiči po području", "secondary guide categories"],
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
    path: "vodici/dug-je-buduci-novac/index.html",
    checks: [
      "Dug je budući novac koji ste već potrošili",
      "Dva stanja novca",
      "Vrijeme zalijeva stanje",
      "izađite iz duga što je brže moguće",
    ],
  },
  {
    path: "vodici/dug-ili-bitcoin/index.html",
    checks: ["Dug ili Bitcoin?", "Ne pokušavajte istrgovati izlaz"],
  },
  {
    path: "vodici/davanje-u-proracunu-nulte-osnove/index.html",
    checks: [
      "Davanje mijenja vaš odnos prema novcu",
      "Davanje nije ostatak",
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
