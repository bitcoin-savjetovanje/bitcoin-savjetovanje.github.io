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

function textWithoutTags(contents) {
  return contents
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
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

function assertNotIncludes(relativePath, contents, expected, label = expected) {
  if (!contents.includes(expected)) {
    pass(`${relativePath} does not contain ${label}`)
    return
  }

  fail(`${relativePath} should not contain ${label}`)
}

function assertMatches(relativePath, contents, pattern, label = pattern.source) {
  if (pattern.test(contents)) {
    pass(`${relativePath} matches ${label}`)
    return
  }

  fail(`${relativePath} should match ${label}`)
}

function assertNotMatches(relativePath, contents, pattern, label = pattern.source) {
  if (!pattern.test(contents)) {
    pass(`${relativePath} does not match ${label}`)
    return
  }

  fail(`${relativePath} should not match ${label}`)
}

function assertCount(relativePath, contents, expected, count, label = expected) {
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
  return [
    ...contents.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g),
  ]
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
const home = routeMap.get("/")
const conversation = routeMap.get("/razgovor/")
const bitcoinClarity = routeMap.get("/bitcoin-jasnoca/")
const guidesIndex = routeMap.get("/vodici/")
const security = routeMap.get("/sigurnost/")

const requiredFiles = [
  "index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "razgovor/index.html",
  "bitcoin-jasnoca/index.html",
  "vodici/index.html",
  "sigurnost/index.html",
  ...requiredGuidePaths.map(routeFile),
  ...aliasGuidePaths.map((route) => routeFile(route.oldPath)),
]

requiredFiles.forEach(assertFile)

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
  "pošaljite privatne ključeve",
  "pristup vašem novčaniku",
  "regulated investment advice",
  "asset management",
  "trading signal",
  "trading signali",
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
  "dogovorite 15-minutni uvodni razgovorpogledajte",
  "uvodni razgovorpogledajte",
  "dogovorite razgovorpogledajte",
  "razgovoršto je bitcoin jasnoća",
  "uvodni razgovoršto je bitcoin jasnoća",
  "praviladogovorite",
  "vodičeprimijenite",
  "1. 1 uvodni razgovor",
  "2. 2 bitcoin jasnoća",
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
  "vidimo ima li smisla za vas",
  "početne riječi",
  "početnih riječi",
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

const homeChecks = [
  [
    "Prije veće Bitcoin odluke, posložite pitanja, rizike i vlastitu situaciju.",
    "new hero title",
  ],
  [
    "Dođite s jednim stvarnim Bitcoin pitanjem koje utječe na vašu odluku. U 15 minuta vidimo što prvo treba razjasniti i koji bi sljedeći korak bio razuman.",
    "full updated hero supporting sentence",
  ],
  [
    "Dođite s jednim stvarnim Bitcoin pitanjem koje utječe na vašu odluku.",
    "updated hero supporting sentence",
  ],
  [
    "U 15 minuta vidimo što prvo treba razjasniti i koji bi sljedeći korak bio razuman.",
    "hero intro call framing",
  ],
  [
    "što još nije jasno u Bitcoin tezi",
    "hero intro card Bitcoin thesis copy",
  ],
  [
    "Ne morate unaprijed znati je li vaše pitanje dovoljno veliko",
    "questions reassurance copy",
  ],
  [
    "U 15 minuta ne rješavamo cijeli plan. Razjasnimo gdje ste sada i koji bi sljedeći korak bio razuman.",
    "intro call title",
  ],
  [
    "Ako nakon uvodnog razgovora vrijedi ići dublje, postoje dva plaćena puta.",
    "offer section title",
  ],
  ["Bitcoin jasnoća", "renamed 200 EUR offer"],
  ["Krenite od uvodnog razgovora", "standard offer CTA copy"],
  ["Vaš Bitcoin ostaje vaš", "security trust title"],
  ["Bez zahtjeva za seed phrase.", "seed phrase trust copy"],
  ["Seed phrase se nikada ne dijeli.", "seed phrase red flag copy"],
  ["razgovor treba odmah prekinuti", "seed phrase stop conversation copy"],
  [
    "Dobijete iskrenu procjenu.",
    "warmer honest assessment title",
  ],
  [
    "Ako plaćeni nastavak nije koristan za vašu situaciju, reći ću vam to otvoreno.",
    "warmer honest assessment copy",
  ],
  [
    "Nekome još nije jasna Bitcoin teza.",
    "intro call Bitcoin thesis copy",
  ],
  [
    "Nekome treba razjasniti jedan dio odluke koji još nije dovoljno čvrst.",
    "intro call Bitcoin thesis copy",
  ],
  [
    "Jasniji odgovori na pitanja koja se stalno vraćaju",
    "Bitcoin jasnoća question copy",
  ],
  [
    "Cilj je vidjeti gdje ste, što prvo treba razjasniti i koji bi sljedeći korak bio razuman.",
    "final CTA calmer body",
  ],
  [
    "Razumijete dio priče, ali još nemate jasan odgovor na pitanja koja se stalno vraćaju.",
    "conversation problem card copy",
  ],
  [
    "kako odabrati način čuvanja Bitcoina",
    "plain homepage Bitcoin custody wording",
  ],
  [
    "kako spriječiti da pristup Bitcoinu ovisi o jednoj osobi, uređaju ili lokaciji",
    "natural security recovery copy",
  ],
  [
    "Pregled osobne slike: dug, proračun, sigurnost, obitelj i struktura imovine",
    "Bitcoin jasnoća offer framing",
  ],
  ["ne čuvam vaš Bitcoin", "footer no custody disclaimer"],
  [
    "ne tražim seed phrase ili privatne ključeve",
    "footer seed phrase disclaimer",
  ],
  [
    "Praktični Bitcoin standard je radni okvir iza mog savjetovanja.",
    "method reframing",
  ],
  [
    "Vodiči objašnjavaju okvir. Razgovor ga primjenjuje na vašu situaciju.",
    "guides conversion copy",
  ],
  [
    "Pomažem vam razumjeti Bitcoin i vlastitu situaciju dovoljno jasno",
    "positioning sentence",
  ],
  [
    "Dogovorite 15-minutni uvodni razgovor",
    "primary intro call CTA copy",
  ],
  [
    "Pogledajte pitanja koja možemo proći",
    "hero secondary CTA copy",
  ],
  ['href="/razgovor/"', "homepage CTA to /razgovor/"],
  ['href="#pitanja"', "hero secondary CTA href"],
  ['data-cta="hero-intro-call"', "hero CTA metadata"],
  ['data-cta="hero-questions"', "hero questions metadata"],
  [
    "U razgovor možete doći s jednim stvarnim Bitcoin pitanjem.",
    "updated questions section heading",
  ],
  [
    "Dovoljno je da imate stvarno pitanje koje utječe na vašu odluku.",
    "questions section copy polish",
  ],
  ["što vas najviše brine", "conversation problem worry copy"],
  [
    "što još nedostaje za mirniju odluku",
    "conversation problem decision copy",
  ],
  [
    "U 15 minuta razjasnimo gdje ste sada, koju odluku pokušavate donijeti i koji bi sljedeći korak bio razuman.",
    "hero intro card copy",
  ],
  [
    "Dobivate jasniju sliku što zapravo stoji iza odluke",
    "FAQ intro call outcome copy",
  ],
  [
    "Provjerite ima li uvodni razgovor smisla",
    "readiness test title",
  ],
  [
    "Odaberite pitanje koje vam je najbliže.",
    "neutral question selector title",
  ],
  [
    "Nakon odabira vidjet ćete zašto je to dobro pitanje za uvodni razgovor.",
    "neutral question selector instruction",
  ],
  [
    "Što se mijenja kada postoji osobni okvir?",
    "before after section title",
  ],
  [
    'data-cta="readiness-test-intro-call"',
    "readiness test CTA metadata",
  ],
  [
    'data-cta="before-after-intro-call"',
    "before after CTA metadata",
  ],
  [
    'data-cta="desktop-rail-intro-call"',
    "desktop conversion rail CTA metadata",
  ],
  [
    'data-cta="desktop-rail-questions"',
    "desktop conversion rail questions CTA metadata",
  ],
  ["Imate Bitcoin pitanje?", "desktop conversion rail title"],
  ['data-cta="questions-intro-call"', "questions CTA metadata"],
  ['data-cta="intro-section-call"', "intro section CTA metadata"],
  ['data-cta="offer-intro-call"', "intro offer CTA metadata"],
  ['data-cta="offer-bitcoin-jasnoca"', "Bitcoin jasnoća CTA metadata"],
  [
    'data-link="offer-bitcoin-clarity-details"',
    "Bitcoin jasnoća detail link metadata",
  ],
  ['data-cta="offer-personal-standard"', "standard offer CTA metadata"],
  ['data-cta="home-security-page"', "home security CTA metadata"],
  ['data-cta="home-guides-call"', "home guides call CTA metadata"],
  ['data-cta="final-intro-call"', "final CTA metadata"],
  ['data-link="home-guide-teaser"', "home guide link metadata"],
  ['data-link="footer-security"', "footer security link metadata"],
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
  ['href="/#pitanja"', "questions nav link"],
  ['href="/#uvodni-razgovor"', "intro call nav link"],
  ['href="/#ponude"', "program/offers nav link"],
  ['href="/sigurnost/"', "security nav link"],
  ['href="/#o-meni"', "about nav link"],
  ['href="/razgovor/"', "conversation nav link"],
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
  "U razgovor možete doći s bilo kojim Bitcoin pitanjem",
  "old questions section heading"
)
assertNotIncludes(
  "index.html",
  homeHtml,
  'href="https://cal.com/btcpavao/uvodni-poziv"',
  "direct external booking link on homepage"
)
assertNotMatches(
  "index.html",
  homeHtml,
  /<div\b(?=[^>]*bitcoin-stress-test-visual)(?=[^>]*role="img")[^>]*>/,
  "role=img on readable hero visual"
)
assertIncludes(
  "index.html",
  homeHtml,
  'src="/bitcoin-logo.png" alt="" aria-hidden="true"',
  "decorative Bitcoin logo alt text"
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
  "razgovorŠto je Bitcoin jasnoća",
  "joined offer CTA and detail link text"
)
assertNotIncludes(
  "index.html",
  homeText,
  "uvodni razgovorŠto je Bitcoin jasnoća",
  "joined Bitcoin jasnoća offer controls"
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
assertNotIncludes(
  "index.html",
  homeHtml,
  'alt="Logo"',
  "generic logo alt text"
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
assertArrayEquals(
  "index.html",
  anchorHrefsByDataLink(homeHtml, "home-guide-teaser"),
  [
    "/vodici/stvarni-visak/",
    "/vodici/dug-ili-bitcoin/",
    "/vodici/bitcoin-kao-novac/",
    "/vodici/cijena-kao-mjera-vremena/",
    "/vodici/sigurnost-ne-smije-ovisiti-samo-o-vama/",
  ],
  "home guide teaser href order"
)
assertBefore(
  "index.html",
  homeHtml,
  "Možda vam ne treba još jedan video o Bitcoinu.",
  "U razgovor možete doći s jednim stvarnim Bitcoin pitanjem.",
  "problem before questions"
)
assertBefore(
  "index.html",
  homeHtml,
  "U razgovor možete doći s jednim stvarnim Bitcoin pitanjem.",
  "U 15 minuta ne rješavamo cijeli plan. Razjasnimo gdje ste sada i koji bi sljedeći korak bio razuman.",
  "questions before intro call"
)
assertBefore(
  "index.html",
  homeHtml,
  "Ako nakon uvodnog razgovora vrijedi ići dublje, postoje dva plaćena puta.",
  "Vaš Bitcoin ostaje vaš.",
  "offers before security"
)
assertBefore(
  "index.html",
  homeHtml,
  "Razgovarate s nekim tko Bitcoin ne objašnjava izvana.",
  "Ako nastavimo dublje, koristim okvir Praktičnog Bitcoin standarda.",
  "about before method"
)

if (!home) {
  fail("Route metadata for homepage is missing")
}

const conversationHtml = readFile("razgovor/index.html")
const conversationText = textWithoutTags(conversationHtml)
const conversationChecks = [
  [
    "Dogovorite 15-minutni uvodni razgovor",
    "conversation page title",
  ],
  [
    "Otvorite kalendar i odaberite termin",
    "calendar CTA label",
  ],
  [
    "što prvo treba razjasniti",
    "conversation clarification framing",
  ],
  [
    "Dobra pitanja za uvodni razgovor zvuče ovako",
    "conversation example questions",
  ],
  [
    "Razjasnimo glavno pitanje.",
    "conversation main question step",
  ],
  [
    "Vidimo što nedostaje za sljedeći korak.",
    "conversation next step clarity",
  ],
  [
    "Spremni za uvodni razgovor?",
    "conversation final CTA title",
  ],
  [
    "Što se može dogoditi nakon razgovora?",
    "conversation outcome section title",
  ],
  [
    "Nakon razgovora moguća su tri ishoda",
    "conversation outcome options copy",
  ],
  [
    "Ne mora svaki uvodni razgovor završiti plaćenim nastavkom.",
    "conversation no forced paid continuation copy",
  ],
  [
    "Dogovorimo sljedeći korak ili zaključimo da je za sada dovoljno.",
    "conversation step enough copy",
  ],
  [
    "Odaberite termin i dođite s jednim stvarnim pitanjem.",
    "conversation final CTA body",
  ],
  [
    "Otvorit će se kalendar. Odaberite termin",
    "conversation calendar help text",
  ],
  [
    "Odaberite termin za uvodni razgovor.",
    "inline calendar section title",
  ],
  ['data-cal-inline="uvodni-poziv"', "inline calendar wrapper metadata"],
  [
    'data-cta="conversation-inline-calendar-fallback"',
    "inline calendar fallback CTA metadata",
  ],
  [
    "Ne morate imati gotov plan",
    "conversation final CTA plan reassurance",
  ],
  [
    "Imam Bitcoin, ali partner ili obitelj još nisu sigurni.",
    "conversation family example question",
  ],
  [
    "Brine me sigurnost i ne želim pogriješiti s čuvanjem Bitcoina.",
    "conversation security example question",
  ],
  [
    "Ne šaljite seed phrase, privatne ključeve, lozinke",
    "conversation safety note",
  ],
  [
    "https://cal.com/btcpavao/uvodni-poziv",
    "existing external booking URL",
  ],
  ['data-cal-namespace="uvodni-poziv"', "Cal embed namespace"],
  ['data-cal-link="btcpavao/uvodni-poziv"', "Cal embed link"],
  ["data-cal-config=", "Cal embed config attribute"],
  ["month_view", "Cal embed month view config"],
  ['data-cta="conversation-page-calendar"', "calendar CTA metadata"],
  ['data-cta="conversation-page-security"', "security CTA metadata"],
  ['data-link="conversation-bitcoin-clarity"', "Bitcoin clarity page link"],
  [
    'data-cta="conversation-page-final-calendar"',
    "final calendar CTA metadata",
  ],
  [
    'data-cta="conversation-page-final-security"',
    "final security CTA metadata",
  ],
  [
    '<link rel="canonical" href="https://bitcoin-savjetovanje.com/razgovor/" />',
    "conversation canonical URL",
  ],
  ["WebPage", "conversation WebPage schema"],
]

for (const [expected, label] of conversationChecks) {
  assertIncludes("razgovor/index.html", conversationHtml, expected, label)
}

assertCount(
  "razgovor/index.html",
  conversationHtml,
  'data-cal-link="btcpavao/uvodni-poziv"',
  3,
  "Cal embed booking triggers"
)
assertMatches(
  "razgovor/index.html",
  conversationHtml,
  /<a\b(?=[^>]*href="https:\/\/cal\.com\/btcpavao\/uvodni-poziv")(?=[^>]*data-cta="header-intro-call")(?=[^>]*data-cal-link="btcpavao\/uvodni-poziv")[^>]*>/,
  "conversation header CTA opens Cal booking directly"
)
assertMatches(
  "razgovor/index.html",
  conversationHtml,
  /<a\b(?=[^>]*href="https:\/\/cal\.com\/btcpavao\/uvodni-poziv")(?=[^>]*data-cal-link="btcpavao\/uvodni-poziv")[^>]*>/,
  "Cal booking CTA real href fallback"
)
assertNotMatches(
  "razgovor/index.html",
  conversationHtml,
  /<a\b(?=[^>]*data-cal-link="btcpavao\/uvodni-poziv")(?=[^>]*href="javascript:)[^>]*>/,
  "JavaScript-only Cal booking CTA"
)
assertNotMatches(
  "razgovor/index.html",
  conversationHtml,
  /<a\b(?=[^>]*href="https:\/\/cal\.com\/btcpavao\/uvodni-poziv")(?=[^>]*target="_blank")[^>]*>/,
  "Cal booking links opening in a new tab"
)

assertIncludes(
  "razgovor/index.html",
  conversationText,
  "sljedeći korak je Bitcoin jasnoća",
  "Bitcoin jasnoća next step copy"
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

const bitcoinClarityHtml = readFile("bitcoin-jasnoca/index.html")
const bitcoinClarityChecks = [
  ["Bitcoin jasnoća", "Bitcoin clarity page title"],
  ["200 €", "Bitcoin clarity price"],
  ["jedan dubinski razgovor", "Bitcoin clarity duration"],
  [
    "Nakon Bitcoin jasnoće najčešće imate",
    "Bitcoin clarity outcomes section",
  ],
  ["Što pripremiti", "Bitcoin clarity preparation section"],
  ["Kada nije za vas", "Bitcoin clarity not for section"],
  [
    "Bitcoin jasnoća ili osobni Bitcoin standard?",
    "Bitcoin clarity comparison section",
  ],
  ["Kako razgovor završava", "Bitcoin clarity ending section"],
  ["Na kraju ne dobivate savjet", "Bitcoin clarity no buy-sell advice copy"],
  ["što je stvarni rizik", "Bitcoin clarity risk framing"],
  [
    "Bitcoin jasnoća je za jedno ozbiljno pitanje",
    "Bitcoin clarity comparison left copy",
  ],
  [
    "Osobni Bitcoin standard je za pisani sustav pravila",
    "Bitcoin clarity comparison right copy",
  ],
  ["Krenite od uvodnog razgovora", "Bitcoin clarity primary CTA"],
  ["ne tražim seed phrase", "Bitcoin clarity no seed phrase copy"],
  ["ne prognoziram cijenu", "Bitcoin clarity no price prediction copy"],
  [
    "ne upravljam vašim sredstvima",
    "Bitcoin clarity no asset management copy",
  ],
  [
    'data-cta="bitcoin-clarity-intro-call"',
    "Bitcoin clarity intro CTA metadata",
  ],
  [
    'data-cta="bitcoin-clarity-security"',
    "Bitcoin clarity security CTA metadata",
  ],
  [
    '<link rel="canonical" href="https://bitcoin-savjetovanje.com/bitcoin-jasnoca/" />',
    "Bitcoin clarity canonical URL",
  ],
]

for (const [expected, label] of bitcoinClarityChecks) {
  assertIncludes("bitcoin-jasnoca/index.html", bitcoinClarityHtml, expected, label)
}

assertCount(
  "bitcoin-jasnoca/index.html",
  bitcoinClarityHtml,
  '<link rel="canonical"',
  1,
  "canonical tag"
)

if (!bitcoinClarity) {
  fail("Route metadata for /bitcoin-jasnoca/ is missing")
}

const guidesIndexHtml = readFile("vodici/index.html")
const guidesIndexText = textWithoutTags(guidesIndexHtml)
const guideIndexChecks = [
  ["Vodiči za osobni Bitcoin standard", "guide index title"],
  [
    "Ako želite primjenu na vlastitu situaciju, dogovorite 15-minutni uvodni razgovor.",
    "guide index conversion copy",
  ],
  ['href="/razgovor/"', "guide index links to conversation page"],
  ['data-link="guide-card"', "guide index card link metadata"],
  ['data-cta="guides-index-top-intro-call"', "guide index top CTA metadata"],
  ['data-cta="guides-index-intro-call"', "guide index final CTA metadata"],
  [
    "Ne morate čitati sve odjednom. Ako ne znate gdje krenuti, krenite od proračuna.",
    "guide index starting point copy",
  ],
  ["Korak 1 — Red u novcu", "guide roadmap step 1"],
  ["Korak 2 — Dug i sloboda odluke", "guide roadmap step 2"],
  ["Korak 3 — Davanje", "guide roadmap step 3"],
  ["Korak 4 — Bitcoin kao novac", "guide roadmap step 4"],
  ["Korak 5 — Neto imovina", "guide roadmap step 5"],
  ["Korak 6 — Sigurnost i obitelj", "guide roadmap step 6"],
  ['href="#proracun"', "budget category chip"],
  ['href="#dug"', "debt category chip"],
  ['href="#davanje"', "giving category chip"],
  ['href="#bitcoin"', "Bitcoin category chip"],
  ['href="#neto-imovina"', "net worth category chip"],
  ['href="#sigurnost"', "security category chip"],
  ['id="proracun"', "budget roadmap target id"],
  ['id="dug"', "debt roadmap target id"],
  ['id="davanje"', "giving roadmap target id"],
  ['id="bitcoin"', "Bitcoin roadmap target id"],
  ['id="neto-imovina"', "net worth roadmap target id"],
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
]

for (const [expected, label] of guideIndexChecks) {
  assertIncludes("vodici/index.html", guidesIndexHtml, expected, label)
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
    "/vodici/starost-novca/",
    "/vodici/dca-nije-dovoljan/",
    "/vodici/dug-je-buduci-novac/",
    "/vodici/dug-ili-bitcoin/",
    "/vodici/ne-zaduzujte-se-za-bitcoin/",
    "/vodici/davanje-u-proracunu-nulte-osnove/",
    "/vodici/davanje-bez-duga/",
    "/vodici/novac-dolazi-od-ljudi/",
    "/vodici/bitcoin-kao-novac/",
    "/vodici/pozitivni-neto-priljev/",
    "/vodici/uskladivanje-kupovne-moci-bitcoina/",
    "/vodici/cijena-kao-mjera-vremena/",
    "/vodici/novac-kapital-potrosnja/",
    "/vodici/bitcoin-u-neto-imovini/",
    "/vodici/pravilo-trecina/",
    "/vodici/sigurnost-ne-smije-ovisiti-samo-o-vama/",
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
    "Dobar sigurnosni okvir ima dva cilja.",
    "security two goals title",
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
  ["Nikada ne tražim", "never ask section"],
  ["Možemo urediti", "security can organize section"],
  ["Procjenjujemo rizike", "security risk section"],
  ["Odluka ostaje vaša", "security decision stays yours section"],
  [
    "seed phrase — 12 ili 24 riječi za oporavak novčanika",
    "seed phrase explanation",
  ],
  [
    "način čuvanja prikladan za vašu situaciju",
    "plain custody wording",
  ],
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
  [
    "Razgovarajmo o sigurnosti bez predaje kontrole",
    "security CTA copy",
  ],
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
    "Želite ovo primijeniti na svoju situaciju?",
    "guide final CTA title"
  )
  assertIncludes(
    relativePath,
    html,
    "Vodič objašnjava okvir. Uvodni razgovor pomaže vidjeti koji dio se odnosi na vas.",
    "guide final CTA text"
  )
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
    'data-cta="guide-final-intro-call"',
    "guide final CTA metadata"
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
    path: "vodici/cijena-kao-mjera-vremena/index.html",
    checks: [
      "Cijena kao mjera vremena",
      "Ne koristimo cijenu za prognozu. Koristimo je kao signal za provjeru proračuna.",
      "Dugoročni trend je pomoćni signal. Osobni proračun nulte osnove ostaje glavni alat.",
    ],
  },
  {
    path: "vodici/pravilo-trecina/index.html",
    checks: [
      "Ovo nije preporuka da kupujete ili prodajete određenu imovinu.",
      "Ako je gotovo sve vezano u domu, autu ili poslu",
      "Ako želite provjeriti ravnotežu neto imovine bez pretvaranja toga u slijepu formulu",
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
    path: "vodici/obiteljski-pristup-bitcoinu/index.html",
    checks: [
      "Minimalna obiteljska uputa",
      "Bitcoin postoji i dio je neto imovine.",
      "Ako obitelj zna da Bitcoin postoji, ali nema jasne upute što smije i ne smije napraviti",
    ],
  },
]

for (const guideCheck of focusedGuideChecks) {
  const html = readFile(guideCheck.path)

  for (const expected of guideCheck.checks) {
    assertIncludes(guideCheck.path, html, expected, `guide copy: ${expected}`)
  }
}

assertArrayEquals(
  "vodici/svaki-euro-ima-namjenu/index.html",
  anchorTextsByDataLink(
    readFile("vodici/svaki-euro-ima-namjenu/index.html"),
    "next-guide"
  ),
  ["Što je stvarni višak?"],
  "next guide link text is title only"
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
  ...sitemap.matchAll(/<loc>(https:\/\/bitcoin-savjetovanje\.com[^<]+)<\/loc>/g),
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
  "/bitcoin-jasnoca/",
  "/vodici/",
  "/sigurnost/",
]) {
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

for (const relativeHtmlPath of htmlFiles().map((htmlPath) =>
  path.relative(distDir, htmlPath)
)) {
  const html = fs.readFileSync(filePath(relativeHtmlPath), "utf8")
  const canonical = canonicalFromHtml(html)

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
    pass(`${relativeHtmlPath} canonical uses expected trailing-slash convention`)
  }
}

if (failures.length > 0) {
  console.error(`\nverify-dist failed with ${failures.length} problem(s):`)
  failures.forEach((message) => console.error(`- ${message}`))
  process.exit(1)
}

console.log("\nverify-dist passed")
