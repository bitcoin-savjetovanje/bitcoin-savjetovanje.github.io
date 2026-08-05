import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const dist = path.join(root, "dist")
const problems = []
let checks = 0

const canonicalPath = "/vodici/bitcoin-core-standard/"
const canonicalUrl = `https://bitcoin-savjetovanje.com${canonicalPath}`
const retiredPaths = [
  "/vodici/obiteljski-bitcoin-trezor/",
  "/vodici/bitkey-bitcoin-sigurnost/",
  "/vodici/vremenski-oporavak-bitcoin-trezor/",
]

function read(relativePath) {
  const absolutePath = path.join(dist, relativePath)
  if (!fs.existsSync(absolutePath)) {
    problems.push(`Nedostaje dist/${relativePath}`)
    return ""
  }
  return fs.readFileSync(absolutePath, "utf8")
}

function expect(label, condition) {
  checks += 1
  if (!condition) problems.push(label)
}

function includes(label, text, expected) {
  expect(`${label}: nedostaje ${expected}`, text.includes(expected))
}

function excludes(label, text, forbidden) {
  expect(
    `${label}: sadrži zabranjeni zapis ${forbidden}`,
    !text.includes(forbidden)
  )
}

function occurrenceCount(text, needle) {
  return text.split(needle).length - 1
}

function routeFileForHref(href) {
  const pathname = href.split(/[?#]/, 1)[0]
  if (!pathname || pathname === "/") return path.join(dist, "index.html")
  if (pathname.endsWith("/")) {
    return path.join(dist, pathname.slice(1), "index.html")
  }
  return path.join(dist, pathname.slice(1))
}

const core = read("vodici/bitcoin-core-standard/index.html")
const guidesIndex = read("vodici/index.html")
const security = read("sigurnost/index.html")
const family = read("obitelj/index.html")
const custody = read("skrbnistvo-i-sigurnost/index.html")
const familyGuide = read("vodici/obiteljski-pristup-bitcoinu/index.html")
const continuityGuide = read(
  "vodici/sigurnost-ne-smije-ovisiti-samo-o-vama/index.html"
)
const redirects = read("_redirects")
const sitemap = read("sitemap.xml")
const fallback404 = read("404.html")

includes(
  "Core SEO title",
  core,
  "<title>Bitcoin Core Standard za dugoročnu štednju | Bitcoin Savjetovanje</title>"
)
includes(
  "Core meta opis",
  core,
  '<meta name="description" content="Kako koristiti Bitcoin Core, offline Linux potpisnike, watch-only wallet, PSBT i provjerene sigurnosne kopije za dugoročnu Bitcoin štednju i obiteljski trezor." />'
)
includes(
  "Core canonical",
  core,
  `<link rel="canonical" href="${canonicalUrl}" />`
)
expect(
  "Core stranica mora imati točno jedan canonical",
  occurrenceCount(core, '<link rel="canonical"') === 1
)
expect(
  "Core stranica mora imati točno jedan title",
  occurrenceCount(core, "<title>") === 1
)
expect(
  "Core stranica mora imati točno jedan H1",
  occurrenceCount(core, "<h1") === 1
)
includes(
  "Core Open Graph naslov",
  core,
  '<meta property="og:title" content="Bitcoin Core Standard za dugoročnu štednju" />'
)
for (const schemaType of [
  '"@type":"Article"',
  '"@type":"BreadcrumbList"',
  '"@type":"FAQPage"',
]) {
  includes("Core strukturirani podaci", core, schemaType)
}
includes("Core datum objave", core, '"datePublished":"2026-08-04"')
includes("Core datum izmjene", core, '"dateModified":"2026-08-04"')
includes("Core slug", core, 'data-guide-slug="bitcoin-core-standard"')

for (const heading of [
  "Zašto se preporuka mijenja",
  "Offline Linux laptop",
  "Online koordinator i vlastiti node",
  "Jedan potpis i 2-od-3 multisig",
  "Kako Bitcoin Core generira ključeve",
  "Nema korisničkog BIP39 backupa",
  "Strategija sigurnosnih kopija",
  "PSBT tijek rada",
  "Oporavak i nasljeđivanje",
  "Za koga ovaj model nije",
]) {
  includes("Core sadržaj", core, heading)
}

for (const source of [
  "https://bitcoincore.org/en/releases/31.1/",
  "https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/createwallet/",
  "https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/backupwallet/",
  "https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/restorewallet/",
  "https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/encryptwallet/",
  "https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/importdescriptors/",
  "https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/walletcreatefundedpsbt/",
  "https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/walletprocesspsbt/",
  "https://bitcoincore.org/en/doc/31.0.0/rpc/rawtransactions/finalizepsbt/",
  "https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/rescanblockchain/",
  "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
  "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/psbt.md",
  "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md#basic-multisig-example",
  "https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/wallet.cpp#L3311-L3324",
  "https://github.com/bitcoin/bitcoin/blob/v31.1/src/key.cpp#L157-L163",
  "https://github.com/bitcoin/bitcoin/blob/v31.1/src/random.cpp#L455-L472",
  "https://github.com/bitcoin/bitcoin/blob/v31.1/src/random.cpp#L568-L570",
  "https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/rpc/transactions.cpp#L885-L889",
]) {
  includes("Core službeni izvor", core, `href="${source}"`)
}

for (const forbidden of [
  "Sparrow",
  "Fulcrum",
  "BitBox",
  "Passport",
  "Jade",
  "COLDCARD",
  "Bitkey",
  "Nunchuk",
  "Liana",
  "bitcoin-cli",
  "xprv",
  "wpkh(",
  "tr(",
  "TODO",
]) {
  excludes("Core kanonski vodič", core, forbidden)
}

includes(
  "Prethodni vodič",
  core,
  'href="/vodici/sigurnost-ne-smije-ovisiti-samo-o-vama/" data-link="previous-guide"'
)
includes(
  "Sljedeći vodič",
  core,
  'href="/vodici/samostalna-pohrana-ili-skrbnik/" data-link="next-guide"'
)
includes(
  "Sigurnosni CTA",
  core,
  "Savjetovanje ne prima, ne čuva i ne rekonstruira vaše tajne"
)

includes(
  "Istaknuta kartica",
  guidesIndex,
  'class="guide-roadmap-card guide-roadmap-card--featured"'
)
includes("Oznaka kartice", guidesIndex, "Preporučeni standard")
includes("Core kartica", guidesIndex, `href="${canonicalPath}"`)
for (const retiredPath of retiredPaths) {
  excludes("Indeks vodiča", guidesIndex, `href="${retiredPath}"`)
}

for (const [label, html] of [
  ["Sigurnost", security],
  ["Obitelj", family],
  ["Skrbništvo i sigurnost", custody],
  ["Obiteljski pristup", familyGuide],
  ["Kontinuitet", continuityGuide],
]) {
  includes(`${label} poveznica`, html, `href="${canonicalPath}"`)
}
includes(
  "Sigurnosna tracking oznaka",
  security,
  'data-link="security-bitcoin-core-standard"'
)

const redirectLines = new Set(redirects.trim().split(/\r?\n/))
for (const retiredPath of retiredPaths) {
  for (const sourcePath of [retiredPath.slice(0, -1), retiredPath]) {
    const expected = `${sourcePath} ${canonicalPath} 301`
    expect(`Nedostaje 301 pravilo: ${expected}`, redirectLines.has(expected))
  }
}

includes("Sitemap canonical", sitemap, `<loc>${canonicalUrl}</loc>`)
for (const retiredPath of retiredPaths) {
  excludes(
    "Sitemap",
    sitemap,
    `<loc>https://bitcoin-savjetovanje.com${retiredPath}</loc>`
  )
  includes(
    "404 fallback preusmjerenje",
    fallback404,
    `${JSON.stringify(retiredPath)}:${JSON.stringify(canonicalPath)}`
  )

  const aliasHtml = read(path.join(retiredPath.slice(1), "index.html"))
  includes(
    "Alias canonical",
    aliasHtml,
    `<link rel="canonical" href="${canonicalUrl}" />`
  )
}

const internalHrefs = new Set(
  [...core.matchAll(/href="(\/[^"#]+)"/g)].map((match) => match[1])
)
for (const href of internalHrefs) {
  expect(
    `Mrtva interna poveznica iz Core vodiča: ${href}`,
    fs.existsSync(routeFileForHref(href))
  )
}

if (problems.length) {
  console.error(
    `Bitcoin Core Standard provjera nije prošla (${problems.length}):`
  )
  for (const problem of problems) console.error(`- ${problem}`)
  process.exit(1)
}

console.log(`PASS Bitcoin Core Standard: ${checks} provjera.`)
