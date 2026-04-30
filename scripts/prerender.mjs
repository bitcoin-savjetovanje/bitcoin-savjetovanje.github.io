import fs from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"

const root = process.cwd()
const distDir = path.join(root, "dist")
const serverEntry = path.join(distDir, "server", "entry-server.js")
const siteUrl = "https://bitcoin-savjetovanje.com"
const today = new Date().toISOString().slice(0, 10)

const guides = [
  {
    slug: "stvarni-visak",
    title: "Što je stvarni višak i zašto ga većina ljudi krivo procjenjuje?",
    description:
      "Praktičan vodič za razumijevanje stvarnog viška prije odluka o Bitcoinu: budžet, dug, obveze, sigurnosna rezerva i neto imovina.",
  },
  {
    slug: "bitcoin-u-neto-imovini",
    title: "Kako uklopiti Bitcoin u neto imovinu?",
    description:
      "Kako promatrati Bitcoin unutar ukupne neto imovine bez izoliranog gledanja cijene, impulsa ili tuđih pravila.",
  },
  {
    slug: "dug-ili-bitcoin",
    title: "Kada prvo riješiti dug, a kada akumulirati Bitcoin?",
    description:
      "Vodič za mirnije razmišljanje o dugu i Bitcoinu: kamata, rokovi, likvidnost, psihologija i osobni okvir odluka.",
  },
  {
    slug: "dca-nije-dovoljan",
    title: "Zašto DCA nije dovoljan ako nemate budžet?",
    description:
      "DCA može biti korisna navika, ali bez budžeta ne odgovara na pitanja stvarnog viška, duga, likvidnosti i sigurnosti.",
  },
  {
    slug: "obiteljski-pristup-bitcoinu",
    title: "Kako obitelj može pristupiti Bitcoinu ako vam se nešto dogodi?",
    description:
      "Siguran obiteljski pristup Bitcoinu bez dijeljenja seed phrasea naivno ili ostavljanja obitelji bez plana.",
  },
  {
    slug: "novac-kapital-potrosnja",
    title: "Bitcoin kao novac, kapital i potrošnja: praktičan okvir",
    description:
      "Kako razmišljati o Bitcoinu kroz novac, kapital i potrošnju bez špekulativnog jezika i bez univerzalnih pravila.",
  },
]

const faqSchema = [
  {
    question: "Je li ovo financijsko savjetovanje?",
    answer:
      "Ne. Ovo nije licencirano investicijsko, porezno ili pravno savjetovanje. Rad je usmjeren na osobni okvir odlučivanja, razumijevanje Bitcoina, uređenje sigurnosti i jasniji pristup vlastitoj situaciji.",
  },
  {
    question: "Moram li već imati Bitcoin?",
    answer:
      "Ne morate. Usluga je korisna i za ljude koji tek ozbiljno razmišljaju o Bitcoinu i za ljude koji već imaju Bitcoin, ali nemaju jasan plan.",
  },
  {
    question: "Hoćete li mi reći koliko Bitcoina trebam kupiti?",
    answer:
      "Ne kao univerzalnu naredbu. Cilj je izgraditi okvir kroz koji možete donijeti vlastitu odluku u skladu s vašim budžetom, dugom, neto imovinom, vremenskim okvirom i odnosom prema riziku.",
  },
  {
    question: "Je li ovo samo za ljude koji žele biti all-in u Bitcoinu?",
    answer:
      "Ne. Practical Bitcoin Standard je snažan okvir, ali savjetovanje se primjenjuje na vašu situaciju. Za nekoga je sljedeći korak veća izloženost, za nekoga prvo razduživanje, za nekoga jasnija sigurnosna procedura, a za nekoga pravilo kada ne dirati ništa.",
  },
  {
    question: "Radite li s drugim digitalnim imovinama?",
    answer: "Ne. Fokus je isključivo na Bitcoinu.",
  },
  {
    question: "Što ako već kupujem Bitcoin kad imam viška?",
    answer:
      "Tada krećemo od pitanja što je stvarni višak. Gledamo budžet, obveze, sigurnosnu rezervu, dugove i neto imovinu kako biste znali kada višak stvarno postoji i kako ga rasporediti.",
  },
  {
    question: "Kako izgleda rezultat programa?",
    answer:
      "Rezultat je praktičan sustav za odluke: jasnija financijska slika, ciljani raspon izloženosti Bitcoinu, pravila akumulacije i trošenja, sigurnosni model i osobni dokument koji možete koristiti kroz vrijeme.",
  },
  {
    question: "Je li razgovor povjerljiv?",
    answer:
      "Da. Razgovori su povjerljivi. Ne objavljujem osobne podatke, financijsku situaciju ni pojedinosti razgovora.",
  },
  {
    question: "Koliko košta?",
    answer:
      "Uvodni razgovor je bez naknade. Plaćeni savjetodavni razgovor je 200 €. Strukturirani program je 1.500 €.",
  },
  {
    question: "Što je Practical Bitcoin Standard?",
    answer:
      "Practical Bitcoin Standard je otvoreni priručnik koji razvijam kao praktičan okvir za korištenje Bitcoina kao novca u stvarnom životu. Obuhvaća budžet, dug, davanje, neto imovinu, potrošnju, kapital i odluke kroz promjene cijene i vremena.",
  },
]

const home = {
  path: "/",
  title:
    "Bitcoin Savjetovanje | Bitcoin plan za kapital, neto imovinu i pravila odluka",
  description:
    "Bitcoin savjetovanje za ljude koji imaju kapital ili Bitcoin, ali nemaju jasna pravila za budžet, dug, neto imovinu, skrbništvo i odluke kroz vrijeme.",
  schema: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Bitcoin Savjetovanje",
        url: `${siteUrl}/`,
        inLanguage: "hr-HR",
      },
      {
        "@type": "ProfessionalService",
        name: "Bitcoin Savjetovanje",
        url: `${siteUrl}/`,
        areaServed: ["Hrvatska", "Online"],
        founder: { "@type": "Person", name: "Pavao Pahljina" },
        serviceType: "Bitcoin education and advisory framework",
        description:
          "Edukativan i savjetodavan okvir za Bitcoin odluke, budžet, dug, neto imovinu, skrbništvo i sigurnost. Nije licencirano financijsko, porezno ili pravno savjetovanje.",
      },
      {
        "@type": "OfferCatalog",
        name: "Bitcoin Savjetovanje programi",
        itemListElement: [
          { "@type": "Offer", name: "Uvodni razgovor", price: "0", priceCurrency: "EUR" },
          { "@type": "Offer", name: "Plaćeni savjetodavni razgovor", price: "200", priceCurrency: "EUR" },
          { "@type": "Offer", name: "Strukturirani program", price: "1500", priceCurrency: "EUR" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqSchema.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  },
}

const routes = [
  home,
  ...guides.map((guide) => ({
    path: `/vodici/${guide.slug}`,
    title: `${guide.title} | Bitcoin Savjetovanje`,
    description: guide.description,
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      author: { "@type": "Person", name: "Pavao Pahljina" },
      publisher: { "@type": "Organization", name: "Bitcoin Savjetovanje" },
      mainEntityOfPage: `${siteUrl}/vodici/${guide.slug}`,
      inLanguage: "hr-HR",
    },
  })),
]

const notFoundRoute = {
  path: "/404",
  title: "Stranica nije pronađena | Bitcoin Savjetovanje",
  description: "Stranica koju tražite ne postoji.",
  schema: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Stranica nije pronađena",
    url: `${siteUrl}/404`,
    inLanguage: "hr-HR",
  },
}

function canonical(routePath) {
  return routePath === "/" ? `${siteUrl}/` : `${siteUrl}${routePath}`
}

function injectHead(html, route) {
  const routeCanonical = canonical(route.path)
  const schema = `<script type="application/ld+json" data-route-schema="true">${JSON.stringify(route.schema)}</script>`

  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${route.description}" />`
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${routeCanonical}" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${route.title}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${route.description}" />`
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:url" content="${routeCanonical}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" content="${route.title}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${route.description}" />`
    )
    .replace("<!--route-schema-->", schema)
}

function outputPath(routePath) {
  if (routePath === "/") {
    return path.join(distDir, "index.html")
  }

  return path.join(distDir, routePath, "index.html")
}

function sitemap() {
  const urls = routes
    .map(
      (route) => `  <url>
    <loc>${canonical(route.path)}</loc>
    <lastmod>${today}</lastmod>
  </url>`
    )
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

const template = await fs.readFile(path.join(distDir, "index.html"), "utf8")
const { render } = await import(pathToFileURL(serverEntry).href)

await Promise.all(
  routes.map(async (route) => {
    const appHtml = render(route.path)
    const html = injectHead(
      template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`),
      route
    )
    const filePath = outputPath(route.path)
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, html)
  })
)

const notFoundHtml = injectHead(
  template.replace(
    '<div id="root"></div>',
    `<div id="root">${render(notFoundRoute.path)}</div>`
  ),
  notFoundRoute
)
await fs.writeFile(path.join(distDir, "404.html"), notFoundHtml)

await fs.writeFile(
  path.join(distDir, "robots.txt"),
  `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`
)
await fs.writeFile(path.join(distDir, "sitemap.xml"), sitemap())
