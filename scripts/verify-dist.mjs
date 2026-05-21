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
  "/vodici/bitcoin-kao-novac",
  "/vodici/bitcoin-nije-kripto-portfelj",
  "/vodici/pozitivni-neto-priljev",
  "/vodici/dca-nije-dovoljan",
  "/vodici/uskladivanje-kupovne-moci-bitcoina",
  "/vodici/cijena-kao-mjera-vremena",
  "/vodici/pravilo-trecina",
  "/vodici/bitcoin-etfovi-i-riznicke-kompanije",
  "/vodici/sigurnost-ne-smije-ovisiti-samo-o-vama",
  "/vodici/poslovni-bitcoin-nije-privatni-bitcoin",
  "/vodici/obiteljski-bitcoin-trezor",
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
  "images/hero-bitcoin-savjetovanje-realistic.webp",
  "images/hero-bitcoin-savjetovanje-realistic.jpg",
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
  "images/dug-hero.webp",
  "images/dug-hero.jpg",
  "images/davanje-hero.webp",
  "images/davanje-hero.jpg",
  "images/neto-imovina-hero.webp",
  "images/neto-imovina-hero.jpg",
  "images/vrijeme-volatilnost-hero.webp",
  "images/vrijeme-volatilnost-hero.jpg",
  "images/skrbnistvo-sigurnost-hero.webp",
  "images/skrbnistvo-sigurnost-hero.jpg",
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
  [
    "pojedince, obitelji i poduzetnike",
    "business audience framing",
  ],
  [
    "Dogovorite 15-minutni uvodni razgovor",
    "primary intro call CTA copy",
  ],
  ['data-cta="hero-intro-call"', "hero CTA metadata"],
  [
    "Bez naknade i bez obveze. Ne upravljam sredstvima, ne prognoziram cijenu i nikada ne tražim seed phrase, privatne ključeve ni pristup novčaniku.",
    "hero trust note",
  ],
  [
    "hero-bitcoin-savjetovanje-realistic.webp",
    "realistic hero WebP asset",
  ],
  [
    "hero-bitcoin-savjetovanje-realistic.jpg",
    "realistic hero JPEG fallback",
  ],
  [
    "Radna scena Bitcoin savjetovanja s bilježnicom, karticama sustava i knjigom u nastajanju",
    "realistic hero image alt text",
  ],
  ["Imam Bitcoin, ali nemam pravila.", "recognition section title"],
  [
    "Ako Bitcoin više nije samo nešto što držite sa strane",
    "recognition intro copy",
  ],
  ["Ne morate znati koji paket trebate.", "recognition trust copy"],
  ['data-cta="recognition-intro-call"', "recognition CTA metadata"],
  [
    "Okvir iz knjige: 7 područja koja treba urediti",
    "framework section title",
  ],
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
  ["Urediti vlastiti sustav odluka.", "personal level copy"],
  ["OBITELJSKI", "family level label"],
  [
    "Uskladiti vrijednosti i pravila u kući.",
    "family level copy",
  ],
  ["POSLOVNO", "business level label"],
  [
    "Integrirati Bitcoin u poslovni kontekst.",
    "business level copy",
  ],
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
  ["1.500 €", "personal standard price"],
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
  [
    "Bitcoin kao novac:",
    "book section title first line",
  ],
  [
    "Praktični vodič",
    "book section title second line",
  ],
  [
    "Knjiga koja povezuje bezvremenske principe novca s praktičnim koracima za svakodnevni život.",
    "book section copy",
  ],
  ["Uskoro dostupno u pretprodaji", "book preorder checklist item"],
  ["Radna bilježnica uz svako poglavlje", "book workbook checklist item"],
  ["Bez tehničkog žargona, fokus na život", "book plain language checklist item"],
  ["USKORO", "book badge"],
  ["ne čuvam vaš Bitcoin", "footer no custody disclaimer"],
  ["ne tražim seed phrase ili privatne ključeve", "footer seed phrase disclaimer"],
  ['href="/razgovor/"', "homepage CTA to /razgovor/"],
  [
    "https://bitcoin-savjetovanje.com/og-bitcoin-kao-novac.png",
    "book-aligned OG image",
  ],
  ['data-link="footer-security"', "footer security link metadata"],
  ['data-link="footer-privacy"', "footer privacy link metadata"],
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
assertIncludes(
  "index.html",
  homeHtml,
  "framework-stone-symbol",
  "framework stone symbol markup"
)
assertIncludes(
  "index.html",
  homeHtml,
  "service-stone-symbol",
  "service stone symbol markup"
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
  "Okvir iz knjige: 7 područja koja treba urediti",
  "recognition before framework"
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

const budgetHtml = readFile("proracun/index.html")
const budgetChecks = [
  ["Proračun | Bitcoin Savjetovanje", "budget page title"],
  ["DIO I · BEZVREMENSKI RED U NOVCU", "budget eyebrow"],
  ["Novac ne nestaje. Samo odlazi na mjesta kojima nismo dali prioritet.", "budget hero lead"],
  ["Dogovorite uvodni razgovor", "budget hero CTA"],
  ["Pregledajte vodiče", "budget guides CTA"],
  ["Što uređujete kroz proračun", "budget outcomes section title"],
  ["Svakoj jedinici novca dati namjenu", "budget outcome purpose"],
  ["Vidjeti stvarno stanje bez osuđivanja", "budget outcome real state"],
  ["Prepoznati stvarni višak", "budget outcome surplus"],
  ["Proračun nije ograničenje", "budget clarity section title"],
  ["nego jasnoća", "budget clarity continuation"],
  ["Kome je ovo korisno", "budget audience section title"],
  ["Vodiči iz ovog dijela", "budget guides section title"],
  ["Proračun je prvi korak.", "budget principle title"],
  ["Bitcoin ne uklanja potrebu za redom — pojačava je.", "budget principle copy"],
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
  ["DIO II · OSLOBODITI BUDUĆNOST", "debt eyebrow"],
  ["Dug je budući novac koji ste već potrošili.", "debt hero lead"],
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
  ['href="/vodici/ne-zaduzujte-se-za-bitcoin/"', "debt no debt for Bitcoin guide link"],
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
  ["DIO III · OTVORENA RUKA U TVRDOM NOVCU", "giving eyebrow"],
  ["Davanje mijenja odnos prema novcu.", "giving hero lead"],
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
  ["Bitcoin ne uklanja potrebu za davanjem — pojačava je.", "giving principle copy"],
  ["Bitcoin kao novac — knjiga u nastajanju", "giving book panel title"],
  ['href="/vodici/davanje-u-proracunu-nulte-osnove/"', "giving budget guide link"],
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
  assertIncludes("bitcoin-kao-novac/index.html", bitcoinMoneyHtml, expected, label)
}

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
  ["DIO V · BITCOIN I NETO IMOVINA", "net worth eyebrow"],
  [
    "Bitcoin kao primarni novac. Neto imovina kao jedna cjelina.",
    "net worth hero lead",
  ],
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
  [
    'href="/vodici/sigurnost-ne-smije-ovisiti-samo-o-vama/"',
    "liquidity security guide link",
  ],
  ['href="/razgovor/"', "net worth links to conversation"],
  [
    '<link rel="canonical" href="https://bitcoin-savjetovanje.com/bitcoin-i-neto-imovina/" />',
    "net worth canonical URL",
  ],
  ["WebPage", "net worth WebPage schema"],
]

for (const [expected, label] of netWorthChecks) {
  assertIncludes("bitcoin-i-neto-imovina/index.html", netWorthHtml, expected, label)
}

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
  ["DIO VI · BITCOIN VRIJEME I VOLATILNOST", "time volatility eyebrow"],
  [
    "Dugoročni trend daje okvir. Volatilnost traži pravila.",
    "time volatility hero lead",
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
  ['href="/vodici/dca-nije-dovoljan/"', "time volatility DCA guide link"],
  ['href="/vodici/pravilo-trecina/"', "time volatility thirds guide link"],
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
  ["DIO VII · SIGURNOST I NASLJEĐIVANJE", "custody security eyebrow"],
  [
    "Ako samo vi znate pristupiti Bitcoinu, sustav još nije dovršen.",
    "custody security hero lead",
  ],
  [
    "Skrbništvo nije samo čuvanje privatnih ključeva",
    "custody security hero body",
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
  ["Sigurnosna provjera", "custody security guide check"],
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
  [
    'href="/vodici/obiteljski-bitcoin-trezor/"',
    "custody security check guide link",
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
  ["Još primjera pitanja, ako trebate pomoć", "question examples after calendar"],
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
  [
    'data-link="conversation-personal-standard"',
    "personal standard page link",
  ],
  ['href="/osobni-bitcoin-standard/"', "personal standard href"],
  ['data-cta="conversation-page-final-calendar"', "final calendar CTA metadata"],
  ['data-link="conversation-page-final-security"', "final security link metadata"],
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
  ["ne prognoziram cijenu", "Bitcoin konzultacija no price prediction copy"],
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
  ["1.500 €", "personal standard price"],
  [
    "pisani osobni Bitcoin standard",
    "personal standard written outcome copy",
  ],
  [
    "4–6 tjedana rada na pisanom sustavu odluka za život s Bitcoinom.",
    "personal standard hero lead",
  ],
  [
    "Program se ne kupuje preko checkouta. Prvi korak je razgovor.",
    "personal standard no checkout microcopy",
  ],
  [
    "Ne kupuje se odmah. Prvo vidimo ima li smisla.",
    "personal standard no immediate purchase microcopy",
  ],
  [
    "Na kraju programa imate pisani osobni Bitcoin standard",
    "personal standard outcome section",
  ],
  ["poslovni sloj ako je primjenjivo", "personal standard compact business outcome"],
  [
    "Kako izgleda pisani osobni Bitcoin standard?",
    "personal standard deliverable mockup section",
  ],
  ["Tri sloja standarda", "personal standard layers section"],
  [
    "Privatni i obiteljski sloj",
    "personal standard private family layer",
  ],
  [
    "Poslovni sloj, ako je primjenjivo",
    "personal standard business layer",
  ],
  ["Sigurnosni sloj", "personal standard security layer"],
  [
    "Kako radimo kroz 4–6 tjedana",
    "personal standard program steps section",
  ],
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
  ["nije porezni, pravni ili računovodstveni savjet", "no tax legal accounting advice"],
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
  [
    "Ako želite samo početak, krenite ovdje",
    "guide index starting point copy",
  ],
  ["Svaki euro ima namjenu", "starter guide 1"],
  ["Dug ili Bitcoin?", "starter guide 2"],
  ["Bitcoin kao novac", "starter guide 3"],
  ["Kad to prođete, nastavite kroz cijelu mapu.", "starter transition copy"],
  ["Ako vodite posao, krenite ovdje", "guide business path title"],
  ["Prihod nije slobodan novac", "business income guide title"],
  [
    "Poslovni Bitcoin nije privatni Bitcoin",
    "business Bitcoin guide title",
  ],
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
    "/vodici/dug-ili-bitcoin/",
    "/vodici/ne-zaduzujte-se-za-bitcoin/",
    "/vodici/davanje-u-proracunu-nulte-osnove/",
    "/vodici/davanje-bez-duga/",
    "/vodici/novac-dolazi-od-ljudi/",
    "/vodici/niste-zakasnili-u-bitcoin/",
    "/vodici/bitcoin-kao-novac/",
    "/vodici/bitcoin-nije-kripto-portfelj/",
    "/vodici/pozitivni-neto-priljev/",
    "/vodici/novac-kapital-potrosnja/",
    "/vodici/bitcoin-u-neto-imovini/",
    "/vodici/pravilo-trecina/",
    "/vodici/bitcoin-etfovi-i-riznicke-kompanije/",
    "/vodici/uskladivanje-kupovne-moci-bitcoina/",
    "/vodici/cijena-kao-mjera-vremena/",
    "/vodici/sigurnost-ne-smije-ovisiti-samo-o-vama/",
    "/vodici/poslovni-bitcoin-nije-privatni-bitcoin/",
    "/vodici/obiteljski-bitcoin-trezor/",
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
  ["seed phrase", "privacy seed phrase copy"],
  ["privatne ključeve", "privacy private keys copy"],
  ["Povjerljivost razgovora", "privacy confidentiality section"],
  ["Opći, anonimizirani uvidi", "privacy anonymized insights copy"],
  ["Za dogovor termina koristi se Cal.com", "privacy tools section"],
  ["Brisanje ili izmjena podataka", "privacy deletion section"],
  [
    "Seed phrase i privatni ključevi se nikada ne šalju",
    "privacy safety rule",
  ],
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
  assertIncludes(relativePath, html, "guide-meta-badges", "guide metadata badges")
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
      "Imate poslovnu Bitcoin odluku? Dogovorite uvodni razgovor.",
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
      'href="/vodici/samostalna-pohrana-ili-skrbnik/"',
      'href="/vodici/obiteljski-bitcoin-trezor/"',
      'href="/razgovor/"',
      "Ako imate Bitcoin izloženost kroz ETF, burzu, brokera ili Bitcoin rizničku kompaniju",
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

    assertIncludes(guideCheck.path, contents, expected, `guide copy: ${expected}`)
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
