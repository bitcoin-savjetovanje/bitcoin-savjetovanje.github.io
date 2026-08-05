import { readdirSync, readFileSync, statSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
)
const srcRoot = path.join(projectRoot, "src")
const entryPath = path.join(srcRoot, "entry-client.tsx")
const distRoot = path.join(projectRoot, "dist")

function walk(directory, predicate) {
  return readdirSync(directory).flatMap((entry) => {
    const absolutePath = path.join(directory, entry)

    if (statSync(absolutePath).isDirectory()) {
      return walk(absolutePath, predicate)
    }

    return predicate(absolutePath) ? [absolutePath] : []
  })
}

const sourceFiles = walk(srcRoot, (filePath) => /\.(?:ts|tsx)$/.test(filePath))
const routeCssImports = sourceFiles.flatMap((filePath) => {
  if (filePath === entryPath) {
    return []
  }

  const source = readFileSync(filePath, "utf8")
  const imports = source.match(/^\s*import\s+["'][^"']+\.css["'];?\s*$/gm) ?? []

  return imports.map((cssImport) => ({
    file: path.relative(projectRoot, filePath),
    import: cssImport.trim(),
  }))
})

if (routeCssImports.length > 0) {
  console.error(
    "Route CSS must be imported by src/entry-client.tsx so prerendered navigation cannot flash unstyled content:"
  )

  for (const item of routeCssImports) {
    console.error(`- ${item.file}: ${item.import}`)
  }

  process.exit(1)
}

const entrySource = readFileSync(entryPath, "utf8")
const cssFiles = walk(srcRoot, (filePath) => filePath.endsWith(".css"))
const missingEntryImports = cssFiles.filter((filePath) => {
  const relativePath = path
    .relative(srcRoot, filePath)
    .split(path.sep)
    .join("/")
  const importPath =
    relativePath === "index.css" ? "./index.css" : `@/${relativePath}`

  return !entrySource.includes(`"${importPath}"`)
})

if (missingEntryImports.length > 0) {
  console.error(
    "Every source stylesheet must be imported by src/entry-client.tsx:"
  )

  for (const filePath of missingEntryImports) {
    console.error(`- ${path.relative(projectRoot, filePath)}`)
  }

  process.exit(1)
}

const routeSelectors = new Map([
  ["pavao-pahljina/index.html", [".founder-page"]],
  ["proracun/nulta-razina/index.html", [".budget-zero-page"]],
  ["mogao-sam-kupiti-bitcoin-ranije/index.html", [".missed-bitcoin-page"]],
  ["osobno/index.html", [".personal-v2-page"]],
  [
    "bitcoin-danas/index.html",
    [
      ".bitcoin-today-page",
      ".bitcoin-today-sentiment",
      ".bitcoin-energy-pulse",
    ],
  ],
])

for (const [routeFile, selectors] of routeSelectors) {
  const htmlPath = path.join(distRoot, routeFile)
  const html = readFileSync(htmlPath, "utf8")
  const stylesheetHrefs = [
    ...html.matchAll(
      /<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["'][^>]*>/g
    ),
  ].map((match) => match[1])

  if (stylesheetHrefs.length === 0) {
    console.error(`${routeFile} does not link a stylesheet.`)
    process.exit(1)
  }

  const linkedCss = stylesheetHrefs
    .map((href) =>
      readFileSync(path.join(distRoot, href.replace(/^\//, "")), "utf8")
    )
    .join("\n")

  for (const selector of selectors) {
    if (!linkedCss.includes(selector)) {
      console.error(
        `${routeFile} is missing ${selector} in its initially linked CSS.`
      )
      process.exit(1)
    }
  }
}

console.log(
  `PASS navigation CSS: ${cssFiles.length} source stylesheets load before route hydration.`
)
