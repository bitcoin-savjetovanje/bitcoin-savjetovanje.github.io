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
  [
    "Prijeđite iz “imam Bitcoin” u osobni Bitcoin standard.",
    "new hero title",
  ],
  [
    "Nije dovoljno imati Bitcoin. Trebate plan za pad, rast, trošak, dug i obitelj — prije nego što vas život natjera da odlučujete pod pritiskom.",
    "new hero subtitle",
  ],
  [
    "Pomažem vam urediti pravila za život s Bitcoinom",
    "new hero body copy",
  ],
  [
    "Tri provjere: promjena cijene, stanje imovine, plan za obitelj.",
    "hero stress-test visual",
  ],
  [
    "Kako reagirate kad se Bitcoin tečaj promijeni?",
    "hero stress-test price point",
  ],
  [
    "Strah u padu, euforija u rastu",
    "hero stress-test price copy",
  ],
  [
    "Je li vaša ukupna imovina u ravnoteži?",
    "hero stress-test assets point",
  ],
  [
    "Gdje je Bitcoin u sklopu vaše ukupne imovine",
    "hero stress-test money copy",
  ],
  [
    "Kako ste uredili skrbništvo i pristup Bitcoinu za vašu obitelj?",
    "hero stress-test family point",
  ],
  [
    "Imate li jasan plan i protokol za upravljanje Bitcoinom",
    "hero stress-test family copy",
  ],
  [
    "Dogovorite uvodni poziv",
    "primary CTA",
  ],
  ["Provjerite gdje ste", "secondary CTA"],
  [
    "15 minuta. Bez naknade.",
    "hero trust copy",
  ],
  [
    "Bitcoin sam po sebi nije dovoljan ukoliko nije uređen unutar ukupne neto imovine.",
    "standard contrast title",
  ],
  ["Bitcoin bez standarda", "without standard column"],
  ["Bitcoin sa standardom", "with standard column"],
  [
    "Osobni Bitcoin standard u 6 područja",
    "standard areas section title",
  ],
  ["Mudrost upravljanja novcem", "money wisdom segment"],
  ["Bitcoin standard", "bitcoin standard segment"],
  ["Proračun", "budget standard area"],
  ["Razduživanje", "debt reduction standard area"],
  ["Davanje", "giving standard area"],
  ["Bitcoin u imovini", "bitcoin assets standard area"],
  [
    "Pomiješani su nam pojmovi štednje/novca, investicije i diverzifikacije.",
    "bitcoin assets problem copy",
  ],
  [
    "Promjene cijene Bitcoina znače usklađivanje proračuna.",
    "bitcoin assets solution copy",
  ],
  ["Bitcoin zakon potencije", "bitcoin power law standard area"],
  [
    "Proračun i ravnoteža neto imovine radi se u skladu s očekivanjima prema dugoročnom trendu.",
    "bitcoin power law solution copy",
  ],
  [
    "Bitcoin sigurnost i nasljeđivanje",
    "bitcoin security inheritance standard area",
  ],
  ["Prvo kontrola. Zatim sloboda. Zatim davanje.", "foundations title"],
  ["Proračun nulte osnove", "zero-based budget terminology"],
  ["Život bez duga", "debt-free life terminology"],
  ["Davanje nije ukras osobnog Bitcoin standarda.", "giving foundation"],
  ["novac dolazi kroz ljude", "giving differentiator copy"],
  ["Koliko je vaš Bitcoin standard stvaran?", "self-assessment title"],
  [
    "Znate li koju namjenu ima sav novac kojim raspolažete?",
    "assessment question",
  ],
  [
    "Znate li kako reagirati na promjenu cijene Bitcoina dok postoji dug?",
    "debt pressure check",
  ],
  [
    "Znaju li svi uključeni što napraviti u ključnim situacijama?",
    "family security check",
  ],
  ["Izgradnja osobnog Bitcoin standarda", "main program title"],
  ["4–6 tjedana · 1.500 €", "program price duration"],
  ["Korak 1 - Red u novcu", "program step 1"],
  [
    "Proračun nulte osnove, prihodi, rashodi, budući troškovi i stvarni višak.",
    "program step 1 copy",
  ],
  ["Korak 3 - Sustavno davanje", "program step 3"],
  ["Korak 5 - Ravnoteža neto imovine", "program step 5"],
  [
    "Korak 6 - Plan skrbništva/sigurnosti i pristup Bitcoinu za obitelj",
    "program step 6",
  ],
  [
    "Niste sigurni jeste li spremni za cijeli program?",
    "program entry options title",
  ],
  [
    "Dubinska provjera osobnog Bitcoin standarda",
    "deep standard check offer",
  ],
  [
    "Na kraju imate pisani osobni Bitcoin standard",
    "program outcome",
  ],
  [
    "Ne pomažem vam napraviti nešto što sam promatrao izvana.",
    "about authority title",
  ],
  [
    "Pomažem vam postaviti pravila iz prakse koju sam morao naučiti živjeti.",
    "about practice copy",
  ],
  ["Je li ovo financijsko savjetovanje?", "FAQ financial advice question"],
  ["Moram li već imati Bitcoin?", "FAQ Bitcoin ownership question"],
  ["Što ako imam dug?", "FAQ debt question"],
  [
    "Hoćete li mi reći koliko Bitcoina kupiti ili prodati?",
    "FAQ buy sell question",
  ],
  [
    "Zašto je davanje dio Bitcoin standarda?",
    "FAQ giving question",
  ],
  [
    "Provjerite gdje ste u odnosu na uređeni Bitcoin standard.",
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
  'data-cta="test-standard-check"',
  'data-cta="program-standard-check"',
  'data-cta="final-standard-check"',
  'data-cta="header-standard-check"',
  'data-cta="sticky-mobile-standard-check"',
  'data-cta="standard-area-booking"',
]

for (const dataCta of homeDataCtas) {
  assertIncludes("index.html", homeHtml, dataCta, dataCta)
}

const homeDataLinks = [
  'data-link="standard-area-proracun"',
  'data-link="standard-area-razduzivanje"',
  'data-link="standard-area-davanje"',
  'data-link="standard-area-bitcoin-u-imovini"',
  'data-link="standard-area-bitcoin-power-law"',
  'data-link="standard-area-sigurnost-nasljedivanje"',
]

for (const dataLink of homeDataLinks) {
  assertIncludes("index.html", homeHtml, dataLink, dataLink)
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
    "Dogovorite uvodni poziv",
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
