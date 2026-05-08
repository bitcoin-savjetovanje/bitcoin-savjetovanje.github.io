const baseUrl = "https://bitcoin-savjetovanje.com"
const bookingUrl = "https://cal.com/btcpavao/uvodni-poziv"
const representativeGuidePath = "/vodici/stvarni-visak/"
const failures = []

const forbiddenVisibleText = [
  "crypto",
  "roi",
  "lead magnet",
  "signal za kupnju",
  "signal za prodaju",
  "custody",
  "self-custody",
  "cash balance",
  "stack",
  "ulaganje u bitcoin kreditom",
  "ako je prinos veći od kamate",
  "pametno zaduživanje",
  "dobar dug",
  "jeftin dug",
]

const pageChecks = [
  {
    path: "/",
    includes: [
      "Prije veće Bitcoin odluke, posložite pitanja, rizike i vlastitu situaciju.",
      "Dođite s bilo kojim Bitcoin pitanjem.",
      "U 15 minuta vidimo što prvo treba razjasniti",
      "U 15 minuta ne rješavamo cijeli plan. Razjasnimo gdje ste sada i koji sljedeći korak ima smisla.",
      "Bitcoin jasnoća",
      "Vaš Bitcoin ostaje vaš.",
      "Praktični Bitcoin standard je radni okvir iza mog savjetovanja.",
      "Vodiči objašnjavaju moj okvir. Razgovor ga primjenjuje na vašu situaciju.",
      "Dogovorite 15-minutni uvodni razgovor",
      'href="#pitanja"',
      'data-cta="hero-questions"',
      "Dovoljno je da imate stvarno pitanje koje utječe na vašu odluku.",
      "što vas najviše brine",
      "što još nedostaje za mirniju odluku",
      "U 15 minuta razjasnimo gdje ste sada, koju odluku pokušavate donijeti i koji bi sljedeći korak imao smisla.",
      "Dobivate jasniju sliku što je stvarna prepreka odluci",
    ],
    textMustNotInclude: [
      "razgovorPromijeni",
      "razgovorPogledajte",
      "pravilaDogovorite",
      "vodičePrimijenite",
      "novcu→",
      "višak?Stvarni",
      "još nije sjelo",
      "glavni čvor",
      "gdje ste zapeli",
      "Tražimo gdje je čvor",
      "pitanje koje vas koči",
    ],
  },
  {
    path: "/razgovor/",
    includes: [
      "Dogovorite 15-minutni uvodni razgovor",
      "Razgovor je bez naknade i bez obveze.",
      "što prvo treba razjasniti",
      "Prije razgovora razmislite o jednom glavnom pitanju.",
      "Dobra pitanja za uvodni razgovor zvuče ovako",
      "Spremni za uvodni razgovor?",
      "Odaberite termin i dođite s jednim stvarnim pitanjem.",
      "Otvorite kalendar i odaberite termin",
      'data-cta="conversation-page-final-calendar"',
      bookingUrl,
    ],
    textMustNotInclude: [
      "još nije sjelo",
      "glavni čvor",
      "gdje ste zapeli",
      "Tražimo gdje je čvor",
      "pitanje koje vas koči",
    ],
  },
  {
    path: "/sigurnost/",
    includes: [
      "početne riječi",
      "privatne ključeve",
      "lozinke",
      "ne čuvam Bitcoin",
    ],
    includesAny: [
      [
        "Bitcoin mora ostati pod vašom kontrolom",
        "Kontrola ostaje kod vas",
      ],
    ],
  },
  {
    path: "/vodici/",
    includes: ["Vodiči"],
    includesAny: [
      [
        "Želite primijeniti okvir na vlastitu situaciju?",
        "Želite ovo primijeniti na svoju situaciju?",
      ],
      [
        "Dogovorite 15-minutni uvodni razgovor",
        "Dogovorite uvodni razgovor",
      ],
    ],
  },
  {
    path: representativeGuidePath,
    includes: [
      'href="/razgovor/"',
      "Vodič objašnjava okvir",
      "Dogovorite uvodni razgovor",
    ],
  },
]

function pass(message) {
  console.log(`PASS ${message}`)
}

function fail(message) {
  failures.push(message)
  console.error(`FAIL ${message}`)
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "bitcoin-savjetovanje-live-verifier/1.0",
    },
  })

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`)
  }

  return response.text()
}

function textWithoutTags(contents) {
  return contents
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
}

function canonicalFromHtml(contents) {
  const match = contents.match(/<link rel="canonical" href="([^"]+)" \/>/)
  return match?.[1] ?? ""
}

function assertIncludes(url, contents, expected) {
  if (contents.includes(expected)) {
    pass(`${url} contains ${expected}`)
    return
  }

  fail(`${url} is missing ${expected}`)
}

function assertIncludesAny(url, contents, options) {
  if (options.some((expected) => contents.includes(expected))) {
    pass(`${url} contains one expected equivalent phrase`)
    return
  }

  fail(`${url} is missing all equivalent phrases: ${options.join(" | ")}`)
}

function assertTextDoesNotInclude(url, text, forbidden) {
  if (!text.includes(forbidden)) {
    pass(`${url} visible text does not contain ${forbidden}`)
    return
  }

  fail(`${url} visible text contains forbidden text: ${forbidden}`)
}

function assertCanonical(url, html, expectedCanonical) {
  const canonical = canonicalFromHtml(html)

  if (canonical === expectedCanonical) {
    pass(`${url} canonical is ${expectedCanonical}`)
  } else {
    fail(
      `${url} canonical is ${
        canonical || "missing"
      }, expected ${expectedCanonical}`
    )
  }

  if (canonical.endsWith("/")) {
    pass(`${url} canonical uses trailing slash`)
  } else {
    fail(`${url} canonical does not use trailing slash`)
  }

  return canonical
}

const pageCanonicals = []

for (const check of pageChecks) {
  const url = `${baseUrl}${check.path}`

  try {
    const html = await fetchText(url)
    const visibleText = textWithoutTags(html).toLowerCase()
    pass(`${url} returned HTTP 200`)

    for (const expected of check.includes ?? []) {
      assertIncludes(url, html, expected)
    }

    for (const options of check.includesAny ?? []) {
      assertIncludesAny(url, html, options)
    }

    for (const forbidden of check.textMustNotInclude ?? []) {
      assertTextDoesNotInclude(url, textWithoutTags(html), forbidden)
    }

    for (const forbidden of forbiddenVisibleText) {
      assertTextDoesNotInclude(url, visibleText, forbidden)
    }

    pageCanonicals.push(assertCanonical(url, html, `${baseUrl}${check.path}`))
  } catch (error) {
    fail(`${url} could not be verified: ${error.message}`)
  }
}

try {
  const sitemap = await fetchText(`${baseUrl}/sitemap.xml`)
  pass(`${baseUrl}/sitemap.xml returned HTTP 200`)

  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1]
  )

  for (const expectedUrl of [
    `${baseUrl}/`,
    `${baseUrl}/razgovor/`,
    `${baseUrl}/vodici/`,
    `${baseUrl}/sigurnost/`,
  ]) {
    if (sitemapUrls.includes(expectedUrl)) {
      pass(`sitemap contains ${expectedUrl}`)
    } else {
      fail(`sitemap is missing ${expectedUrl}`)
    }
  }

  for (const canonical of pageCanonicals.filter(Boolean)) {
    if (sitemapUrls.includes(canonical)) {
      pass(`sitemap contains checked canonical ${canonical}`)
    } else {
      fail(`sitemap is missing checked canonical ${canonical}`)
    }
  }

  for (const sitemapUrl of sitemapUrls) {
    if (sitemapUrl.endsWith("/")) {
      pass(`sitemap URL uses trailing slash: ${sitemapUrl}`)
    } else {
      fail(`sitemap URL does not use trailing slash: ${sitemapUrl}`)
    }
  }

  for (const removedUrl of [
    `${baseUrl}/vodici/kredit-je-buduci-novac/`,
    `${baseUrl}/vodici/kredit-ili-bitcoin/`,
    `${baseUrl}/vodici/ne-uzimajte-kredit-za-bitcoin/`,
    `${baseUrl}/vodici/sustavno-davanje-u-proracunu-nulte-razine/`,
    `${baseUrl}/vodici/sustavno-davanje-bez-kredita/`,
    `${baseUrl}/vodici/davanje-u-proracunu/`,
  ]) {
    if (sitemapUrls.includes(removedUrl)) {
      fail(`sitemap still contains alias URL ${removedUrl}`)
    } else {
      pass(`sitemap does not contain alias URL ${removedUrl}`)
    }
  }
} catch (error) {
  fail(`${baseUrl}/sitemap.xml could not be verified: ${error.message}`)
}

if (failures.length > 0) {
  console.error(`\nverify-live failed with ${failures.length} problem(s):`)
  failures.forEach((message) => console.error(`- ${message}`))
  process.exit(1)
}

console.log("\nverify-live passed")
