import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"

const root = process.cwd()
const distDir = path.join(root, "dist")
const serverEntry = path.join(distDir, "server", "entry-server.js")
const failures = []

const requiredGuidePaths = [
  "/vodici/stvarni-visak",
  "/vodici/bitcoin-u-neto-imovini",
  "/vodici/dug-ili-bitcoin",
  "/vodici/dca-nije-dovoljan",
  "/vodici/obiteljski-pristup-bitcoinu",
  "/vodici/novac-kapital-potrosnja",
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
  "Bitcoin plan za ljude koji već imaju kapital",
  "homepage hero text"
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
  "Vodiči za praktične Bitcoin odluke",
  "guide index title"
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
assertIncludes("sigurnost/index.html", securityHtml, "seed phrase", "seed phrase copy")
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
