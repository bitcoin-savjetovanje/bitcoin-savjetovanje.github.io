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

  return path.join(routePath.slice(1), "index.html")
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

const requiredFiles = [
  "index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  ...requiredGuidePaths.map(routeFile),
]

requiredFiles.forEach(assertFile)

const home = routeMap.get("/")
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
    "guide canonical URL"
  )
  assertIncludes(relativePath, html, '"@type":"Article"', "Article schema")
  assertIncludes(
    relativePath,
    html,
    "Dogovorite 15-minutni uvodni razgovor",
    "primary CTA"
  )
  assertCount(relativePath, html, '<link rel="canonical"', 1, "canonical tag")
}

const sitemap = readFile("sitemap.xml")
if (home) {
  assertIncludes("sitemap.xml", sitemap, home.canonical, "homepage URL")
}

for (const guidePath of requiredGuidePaths) {
  const route = routeMap.get(guidePath)

  if (!route) {
    continue
  }

  assertIncludes("sitemap.xml", sitemap, route.canonical, `${guidePath} URL`)
  assertIncludes(
    "sitemap.xml",
    sitemap,
    `<lastmod>${route.lastmod}</lastmod>`,
    `${guidePath} lastmod`
  )
  assertCount("sitemap.xml", sitemap, route.canonical, 1, `${guidePath} URL`)
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
