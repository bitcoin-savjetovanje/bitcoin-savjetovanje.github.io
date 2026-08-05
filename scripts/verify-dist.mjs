import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"

const root = process.cwd()
const distDir = path.join(root, "dist")
const publicDir = path.join(root, "public")
const serverEntry = path.join(root, "dist-ssr", "entry-server.js")
const failures = []
let checks = 0

const canonicalExceptions = new Set(["dugorocni-trend/graf/index.html"])
const oldConsultationRoutes = [
  "/bitcoin-jasnoca/",
  "https://bitcoin-savjetovanje.com/bitcoin-jasnoca/",
]
const retiredSecurityGuideSlugs = [
  "obiteljski-bitcoin-trezor",
  "bitkey-bitcoin-sigurnost",
  "vremenski-oporavak-bitcoin-trezor",
]
const securityRedirects = retiredSecurityGuideSlugs.flatMap((slug) => [
  [`/vodici/${slug}`, "/vodici/bitcoin-core-standard/", "301"],
  [`/vodici/${slug}/`, "/vodici/bitcoin-core-standard/", "301"],
])
const fallbackRedirects = new Map([
  [
    "/downloads/7-provjera-osobnog-bitcoin-standarda.pdf",
    "/provjera-bitcoin-standarda/",
  ],
  ["/osobni-bitcoin-standard/primjer/", "/primjer-osobnog-bitcoin-standarda/"],
  ...securityRedirects.map(([source, target]) => [source, target]),
])

function check(condition, message) {
  checks += 1

  if (!condition) {
    failures.push(message)
  }
}

function exists(relativePath) {
  return fs.existsSync(path.join(distDir, relativePath))
}

function read(relativePath) {
  const absolutePath = path.join(distDir, relativePath)
  check(fs.existsSync(absolutePath), `${relativePath} is missing`)
  return fs.existsSync(absolutePath)
    ? fs.readFileSync(absolutePath, "utf8")
    : ""
}

function walkFiles(directory) {
  if (!fs.existsSync(directory)) {
    return []
  }

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name)
    return entry.isDirectory() ? walkFiles(entryPath) : [entryPath]
  })
}

function routeFile(routePath) {
  if (routePath === "/") {
    return "index.html"
  }

  return path.join(routePath.replace(/^\/+|\/+$/g, ""), "index.html")
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function attributeValue(tag, name) {
  const match = tag.match(
    new RegExp(`${escapeRegExp(name)}\\s*=\\s*["']([^"']*)["']`, "i")
  )
  return match?.[1] ?? ""
}

function decodeHtml(value) {
  return value
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
}

function tagByAttribute(html, tagName, attribute, expected) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))]
    .map((match) => match[0])
    .find((tag) => attributeValue(tag, attribute) === expected)
}

function metaContent(html, attribute, expected) {
  const tag = tagByAttribute(html, "meta", attribute, expected)
  return tag ? decodeHtml(attributeValue(tag, "content")) : ""
}

function canonicalFromHtml(html) {
  const tag = tagByAttribute(html, "link", "rel", "canonical")
  return tag ? decodeHtml(attributeValue(tag, "href")) : ""
}

function titleFromHtml(html) {
  return decodeHtml(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "")
}

function schemaFromHtml(html) {
  const match = html.match(
    /<script\b[^>]*data-route-schema=["']true["'][^>]*>([\s\S]*?)<\/script>/i
  )

  if (!match) {
    return null
  }

  try {
    return JSON.parse(match[1])
  } catch {
    return undefined
  }
}

function siteAssetPath(url) {
  try {
    const parsed = new URL(url, "https://bitcoin-savjetovanje.com")

    if (parsed.hostname !== "bitcoin-savjetovanje.com") {
      return null
    }

    return decodeURIComponent(parsed.pathname).replace(/^\//, "")
  } catch {
    return null
  }
}

function referenceExists(reference) {
  const cleanReference = decodeHtml(reference).split("#")[0].split("?")[0]

  if (!cleanReference || cleanReference === "/") {
    return exists("index.html")
  }

  if (!cleanReference.startsWith("/") || cleanReference.startsWith("//")) {
    return true
  }

  if (cleanReference.startsWith("/api/")) {
    const functionPath = path.join(
      root,
      "functions",
      `${cleanReference.replace(/^\/api\//, "api/")}.ts`
    )
    return fs.existsSync(functionPath)
  }

  const relativePath = decodeURIComponent(cleanReference).replace(/^\//, "")
  const directPath = path.join(distDir, relativePath)

  if (fs.existsSync(directPath) && fs.statSync(directPath).isFile()) {
    return true
  }

  return fs.existsSync(path.join(directPath, "index.html"))
}

function rootReferences(html) {
  const references = []

  for (const match of html.matchAll(
    /<(?:a|img|script|link|iframe|source)\b[^>]*>/gi
  )) {
    const tag = match[0]

    for (const name of ["href", "src"]) {
      const value = attributeValue(tag, name)
      if (value.startsWith("/")) {
        references.push(value)
      }
    }

    const srcSet = attributeValue(tag, "srcset")
    if (srcSet) {
      references.push(
        ...srcSet
          .split(",")
          .map((candidate) => candidate.trim().split(/\s+/)[0])
          .filter((candidate) => candidate.startsWith("/"))
      )
    }
  }

  return references
}

check(fs.existsSync(distDir), "dist directory is missing")
check(fs.existsSync(serverEntry), "dist-ssr/entry-server.js is missing")

let prerenderRoutes = []

try {
  const serverModule = await import(pathToFileURL(serverEntry).href)
  prerenderRoutes = serverModule.prerenderRoutes ?? []
} catch (error) {
  failures.push(`Could not import SSR route metadata: ${error.message}`)
}

check(prerenderRoutes.length >= 70, "SSR route metadata is unexpectedly small")

for (const route of prerenderRoutes) {
  const relativePath = routeFile(route.path)
  const html = read(relativePath)
  const prefix = `${relativePath}:`

  check(
    titleFromHtml(html) === route.title,
    `${prefix} title does not match route metadata`
  )
  check(
    metaContent(html, "name", "description") === route.description,
    `${prefix} description does not match route metadata`
  )
  check(
    canonicalFromHtml(html) === route.canonical,
    `${prefix} canonical does not match route metadata`
  )
  check(
    metaContent(html, "property", "og:title") ===
      (route.ogTitle ?? route.title),
    `${prefix} og:title does not match route metadata`
  )
  check(
    metaContent(html, "property", "og:description") ===
      (route.ogDescription ?? route.description),
    `${prefix} og:description does not match route metadata`
  )
  check(
    metaContent(html, "property", "og:type") === route.ogType,
    `${prefix} og:type does not match route metadata`
  )
  check(
    metaContent(html, "property", "og:url") === route.canonical,
    `${prefix} og:url does not match route metadata`
  )
  check(
    metaContent(html, "property", "og:image") === route.ogImage,
    `${prefix} og:image does not match route metadata`
  )
  check(
    metaContent(html, "property", "og:image:width") ===
      String(route.ogImageWidth),
    `${prefix} og:image width does not match route metadata`
  )
  check(
    metaContent(html, "property", "og:image:height") ===
      String(route.ogImageHeight),
    `${prefix} og:image height does not match route metadata`
  )
  check(
    metaContent(html, "name", "twitter:title") ===
      (route.ogTitle ?? route.title),
    `${prefix} twitter:title does not match route metadata`
  )
  check(
    metaContent(html, "name", "twitter:description") ===
      (route.ogDescription ?? route.description),
    `${prefix} twitter:description does not match route metadata`
  )
  check(
    metaContent(html, "name", "twitter:image") === route.ogImage,
    `${prefix} twitter:image does not match route metadata`
  )

  const routeSchema = schemaFromHtml(html)
  check(routeSchema !== null, `${prefix} route schema is missing`)
  check(routeSchema !== undefined, `${prefix} route schema is not valid JSON`)
  check(
    routeSchema !== null &&
      routeSchema !== undefined &&
      JSON.stringify(routeSchema) === JSON.stringify(route.schema),
    `${prefix} route schema does not match route metadata`
  )

  const ogAsset = siteAssetPath(route.ogImage)
  check(
    ogAsset === null || exists(ogAsset),
    `${prefix} og:image asset is missing`
  )
  check(
    route.canonical === "https://bitcoin-savjetovanje.com/404" ||
      route.canonical.endsWith("/"),
    `${prefix} canonical does not use the trailing-slash convention`
  )
}

const sitemap = read("sitemap.xml")
const sitemapLocations = [...sitemap.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map(
  (match) => decodeHtml(match[1])
)
const expectedSitemapLocations = [
  ...new Set(
    prerenderRoutes
      .filter((route) => route.includeInSitemap !== false)
      .map((route) => route.canonical)
  ),
]

check(
  new Set(sitemapLocations).size === sitemapLocations.length,
  "sitemap.xml contains duplicate URLs"
)

for (const canonical of expectedSitemapLocations) {
  check(
    sitemapLocations.includes(canonical),
    `sitemap.xml is missing ${canonical}`
  )
}

for (const canonical of sitemapLocations) {
  check(
    expectedSitemapLocations.includes(canonical),
    `sitemap.xml contains unexpected URL ${canonical}`
  )
}

for (const route of prerenderRoutes.filter(
  (candidate) => candidate.includeInSitemap === false
)) {
  check(
    !sitemap.includes(
      `<loc>https://bitcoin-savjetovanje.com${route.path.replace(/\/$/, "")}/</loc>`
    ),
    `sitemap.xml contains alias route ${route.path}`
  )
}

const robots = read("robots.txt")
check(
  robots.includes("User-agent: *"),
  "robots.txt is missing the global user agent"
)
check(robots.includes("Allow: /"), "robots.txt does not allow the site")
check(
  robots.includes("Sitemap: https://bitcoin-savjetovanje.com/sitemap.xml"),
  "robots.txt is missing the canonical sitemap URL"
)

const redirects = read("_redirects")
const redirectRows = redirects
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"))
  .map((line) => line.split(/\s+/))

for (const [source, target, status] of securityRedirects) {
  check(
    redirectRows.some(
      ([rowSource, rowTarget, rowStatus]) =>
        rowSource === source && rowTarget === target && rowStatus === status
    ),
    `_redirects is missing ${source} -> ${target} ${status}`
  )
}

const notFound = read("404.html")

for (const [source, target] of fallbackRedirects) {
  check(notFound.includes(source), `404.html redirect map is missing ${source}`)
  check(
    notFound.includes(target),
    `404.html redirect map is missing target ${target}`
  )
}

const htmlFiles = walkFiles(distDir).filter((file) => file.endsWith(".html"))
check(
  htmlFiles.length >= prerenderRoutes.length + 2,
  "Generated HTML inventory is unexpectedly small"
)

for (const htmlPath of htmlFiles) {
  const relativePath = path.relative(distDir, htmlPath)
  const html = fs.readFileSync(htmlPath, "utf8")

  if (relativePath !== "404.html" && !canonicalExceptions.has(relativePath)) {
    const canonical = canonicalFromHtml(html)
    check(canonical !== "", `${relativePath} is missing a canonical URL`)
    check(
      canonical === "https://bitcoin-savjetovanje.com/404" ||
        canonical.endsWith("/"),
      `${relativePath} canonical does not use the trailing-slash convention`
    )
  }

  for (const legacyPath of oldConsultationRoutes) {
    if (relativePath !== "404.html") {
      check(
        !html.includes(legacyPath),
        `${relativePath} contains retired consultation route ${legacyPath}`
      )
    }
  }

  for (const reference of new Set(rootReferences(html))) {
    check(
      referenceExists(reference),
      `${relativePath} references missing internal target ${reference}`
    )
  }
}

const fullscreenChart = read("dugorocni-trend/graf/index.html")
check(
  titleFromHtml(fullscreenChart).replace(/\s+/g, " ").trim() ===
    "Dugoročni trend Bitcoina — graf preko cijelog zaslona | Bitcoin Savjetovanje",
  "Fullscreen chart utility has lost its document title"
)
check(
  metaContent(fullscreenChart, "name", "robots") === "noindex,follow",
  "Fullscreen chart utility must remain noindex,follow"
)
check(
  canonicalFromHtml(fullscreenChart) ===
    "https://bitcoin-savjetovanje.com/dugorocni-trend/",
  "Fullscreen chart utility must canonicalize to its parent content page"
)

const activeHtmlFiles = htmlFiles.filter((htmlPath) => {
  const relativePath = path.relative(distDir, htmlPath)
  return (
    relativePath !== "404.html" &&
    !retiredSecurityGuideSlugs.some(
      (slug) => relativePath === `vodici/${slug}/index.html`
    )
  )
})

for (const htmlPath of activeHtmlFiles) {
  const relativePath = path.relative(distDir, htmlPath)
  const html = fs.readFileSync(htmlPath, "utf8")

  for (const slug of retiredSecurityGuideSlugs) {
    check(
      !html.includes(`href="/vodici/${slug}`),
      `${relativePath} links to retired guide ${slug}`
    )
  }
}

const pageMarkers = new Map([
  [
    "index.html",
    [
      "Bitcoin već imate. Sada uredite sustav za život s njim.",
      "Imam Bitcoin, ali nemam jasna pravila.",
      "Kako izgleda uređen osobni Bitcoin standard?",
      "Koliko dubine treba vašoj odluci?",
      'data-cta="home-hero-assessment"',
      'data-link="home-process-program"',
      'data-link="home-service-consultation-details"',
      'data-link="home-service-standard-details"',
    ],
  ],
  [
    "proracun/index.html",
    [
      "Proračun nije ograničenje,",
      "nego jasnoća",
      "Želite provjeriti svoj Bitcoin standard?",
      'data-link="budget-guides"',
    ],
  ],
  [
    "osobni-bitcoin-standard/index.html",
    [
      "Uredite vlastiti Bitcoin standard u jasnom pisanom sustavu odluka",
      "Kako radimo kroz 4–6 tjedana?",
      "Prvi korak nije kupnja programa.",
      'data-link="personal-standard-hero-sample"',
      'data-link="personal-standard-security-approach"',
    ],
  ],
  [
    "provjera-bitcoin-standarda/index.html",
    [
      "Imate li Bitcoin ili imate sustav za život s Bitcoinom?",
      "Privatnost je dio dizajna provjere",
      "Trebate procjenu za tvrtku?",
      'data-link="assessment-business-bitcoin"',
    ],
  ],
  [
    "vodici/index.html",
    [
      "Vodiči za knjigu Bitcoin kao novac",
      "Bitcoin Core Standard za dugoročnu štednju",
      "guide-roadmap-card--featured",
      'href="/vodici/bitcoin-core-standard/"',
    ],
  ],
  [
    "vodici/bitcoin-core-standard/index.html",
    [
      "Bitcoin Core Standard za dugoročnu štednju",
      'data-guide-slug="bitcoin-core-standard"',
      "Standard u jednoj minuti",
      "Službeni izvori",
    ],
  ],
  [
    "sigurnost/index.html",
    [
      "Bitcoin Core Standard",
      'href="/vodici/bitcoin-core-standard/"',
      'data-link="security-bitcoin-core-standard"',
    ],
  ],
])

for (const [relativePath, markers] of pageMarkers) {
  const html = read(relativePath)

  for (const marker of markers) {
    check(
      html.includes(marker),
      `${relativePath} is missing current marker: ${marker}`
    )
  }
}

for (const requiredSource of [
  "functions/api/bitcoin-snapshot.ts",
  "functions/_shared/bitcoinSnapshotServer.ts",
  "tsconfig.functions.json",
  "scripts/verify-bitcoin-core-standard.mjs",
]) {
  check(
    fs.existsSync(path.join(root, requiredSource)),
    `${requiredSource} is missing from the source tree`
  )
}

for (const publicPath of walkFiles(publicDir)) {
  const relativePath = path.relative(publicDir, publicPath)
  const builtPath = path.join(distDir, relativePath)

  check(
    fs.existsSync(builtPath),
    `dist is missing public artifact ${relativePath}`
  )

  if (fs.existsSync(builtPath)) {
    check(
      fs.statSync(publicPath).size === fs.statSync(builtPath).size,
      `dist public artifact size differs for ${relativePath}`
    )
  }
}

for (const requiredArtifact of [
  "downloads/sample-osobni-bitcoin-standard.pdf",
  "downloads/ogledni-sazetak-bitcoin-briefinga-za-upravu.pdf",
  "images/sample-standard/ogledni-standard-sigurnost.webp",
  "_headers",
  "_redirects",
]) {
  check(
    exists(requiredArtifact),
    `Required live artifact is missing: ${requiredArtifact}`
  )
}

if (failures.length > 0) {
  console.error(`verify-dist failed with ${failures.length} problem(s):`)
  failures.forEach((message) => console.error(`- ${message}`))
  process.exit(1)
}

console.log(`PASS verify-dist: ${checks} checks.`)
