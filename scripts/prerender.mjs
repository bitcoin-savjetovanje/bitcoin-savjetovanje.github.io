import fs from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"

const root = process.cwd()
const distDir = path.join(root, "dist")
const serverEntry = path.join(distDir, "server", "entry-server.js")
const templatePath = path.join(distDir, "index.html")

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/"/g, "&quot;")
}

function safeJson(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c")
}

function stripRouteHead(html) {
  return html
    .replace(/\s*<title>[\s\S]*?<\/title>/gi, "")
    .replace(/\s*<meta\s+[^>]*name=["']description["'][^>]*\/?>/gi, "")
    .replace(/\s*<link\s+[^>]*rel=["']canonical["'][^>]*\/?>/gi, "")
    .replace(
      /\s*<meta\s+[^>]*property=["']og:(title|description|type|url|image|image:width|image:height)["'][^>]*\/?>/gi,
      ""
    )
    .replace(
      /\s*<meta\s+[^>]*name=["']twitter:(title|description|image)["'][^>]*\/?>/gi,
      ""
    )
    .replace(
      /\s*<script\s+[^>]*type=["']application\/ld\+json["'][^>]*data-route-schema=["']true["'][^>]*>[\s\S]*?<\/script>/gi,
      ""
    )
    .replace(/\s*<!--route-schema-->\s*/g, "")
}

function routeHead(route) {
  const title = escapeHtml(route.title)
  const description = escapeAttribute(route.description)
  const canonical = escapeAttribute(route.canonical)
  const ogImage = escapeAttribute(route.ogImage)
  const ogType = escapeAttribute(route.ogType)
  const width = escapeAttribute(route.ogImageWidth)
  const height = escapeAttribute(route.ogImageHeight)

  return `    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${escapeAttribute(route.title)}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="${width}" />
    <meta property="og:image:height" content="${height}" />
    <meta name="twitter:title" content="${escapeAttribute(route.title)}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${ogImage}" />
    <script type="application/ld+json" data-route-schema="true">${safeJson(route.schema)}</script>`
}

function injectHead(html, route) {
  return stripRouteHead(html).replace("</head>", `${routeHead(route)}\n  </head>`)
}

function injectApp(template, appHtml) {
  return template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  )
}

function outputPath(routePath) {
  if (routePath === "/") {
    return path.join(distDir, "index.html")
  }

  return path.join(distDir, routePath, "index.html")
}

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function sitemap(routes) {
  const seen = new Set()
  const urls = routes
    .filter((route) => {
      if (seen.has(route.canonical)) {
        return false
      }

      seen.add(route.canonical)
      return true
    })
    .map(
      (route) => `  <url>
    <loc>${xmlEscape(route.canonical)}</loc>
    <lastmod>${xmlEscape(route.lastmod)}</lastmod>
  </url>`
    )
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

const template = await fs.readFile(templatePath, "utf8")
const { render, prerenderRoutes, notFoundRoute } = await import(
  pathToFileURL(serverEntry).href
)

await Promise.all(
  prerenderRoutes.map(async (route) => {
    const appHtml = render(route.path)
    const html = injectHead(injectApp(template, appHtml), route)
    const filePath = outputPath(route.path)
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, html)
  })
)

const notFoundHtml = injectHead(
  injectApp(template, render(notFoundRoute.path)),
  notFoundRoute
)
await fs.writeFile(path.join(distDir, "404.html"), notFoundHtml)

await fs.writeFile(
  path.join(distDir, "robots.txt"),
  `User-agent: *
Allow: /

Sitemap: https://bitcoin-savjetovanje.com/sitemap.xml
`
)
await fs.writeFile(path.join(distDir, "sitemap.xml"), sitemap(prerenderRoutes))
