const baseUrl = "https://bitcoin-savjetovanje.com"
const bookingUrl = "https://cal.com/btcpavao/uvodni-poziv"
const representativeGuidePath = "/vodici/stvarni-visak/"
const positiveMoneyGuidePath = "/vodici/pozitivni-neto-priljev/"
const debtChoiceGuidePath = "/vodici/dug-ili-bitcoin/"
const bitcoinMoneyGuidePath = "/vodici/bitcoin-kao-novac/"
const thirdsGuidePath = "/vodici/pravilo-trecina/"
const familyGuidePath = "/vodici/obiteljski-pristup-bitcoinu/"
const securityGuidePath = "/vodici/sigurnost-ne-smije-ovisiti-samo-o-vama/"
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
  "ne trebaju mi svi klijenti",
  "razbiti jedan krivi prigovor",
  "krivi prigovor",
  "najvažnije prigovore",
  "glupu grešku",
  "partner ili obitelj nije uvjerena",
  "dogovorite 15-minutni uvodni razgovorpogledajte",
  "uvodni razgovorpogledajte",
  "razgovoršto je bitcoin jasnoća",
  "praviladogovorite",
  "vodičeprimijenite",
  "1. 1 proračun",
  "2. 2 dug",
  "budući odljevi",
  "pozitivan neto priljev: temelj bitcoin standarda",
  "priljevi su novac koji ulazi. odljevi su novac koji izlazi. neto priljev je razlika.",
  "priljevi i odljevi",
  "neuređenog eura",
  "manje je glume",
  "psihološko-duhovna stanja",
  "duh ropstva",
  "duhovno se gušite",
  "gorak lijek",
  "svake kune",
  "ne povećavam bitcoin odluke",
  "crvena zastava",
  "vidimo ima li smisla za vas",
  "početne riječi",
  "početnih riječi",
  "jedna točka kvara",
  "točka kvara",
  "točku kvara",
  "točke kvara",
  "novcu→",
]

const pageChecks = [
  {
    path: "/",
    includes: [
      "Prije veće Bitcoin odluke, posložite pitanja, rizike i vlastitu situaciju.",
      "Dođite s bilo kojim Bitcoin pitanjem.",
      "U 15 minuta vidimo što prvo treba razjasniti",
      "postoji li konkretan način da pomognem",
      "što još nije jasno u Bitcoin tezi",
      "Ne morate unaprijed znati je li vaše pitanje dovoljno veliko",
      "U 15 minuta ne rješavamo cijeli plan. Razjasnimo gdje ste sada i koji bi sljedeći korak bio razuman.",
      "Ako nakon uvodnog razgovora postoji konkretan način da pomognem",
      "Bitcoin jasnoća",
      "Krenite od uvodnog razgovora",
      "Vaš Bitcoin ostaje vaš.",
      "Bez zahtjeva za seed phrase.",
      "Seed phrase se nikada ne dijeli.",
      "razgovor treba odmah prekinuti",
      "Dobijete iskrenu procjenu.",
      "Ako plaćeni nastavak nije koristan za vašu situaciju, reći ću vam to otvoreno.",
      "Nekome treba razjasniti jedan dio Bitcoin teze koji još nije dovoljno čvrst.",
      "Razumijete dio priče, ali još nemate jasan odgovor na pitanja koja se stalno vraćaju.",
      "kako odabrati način čuvanja Bitcoina",
      "kako spriječiti da pristup Bitcoinu ovisi o jednoj osobi, uređaju ili lokaciji",
      "Pregled osobne slike: dug, proračun, sigurnost, obitelj i struktura imovine",
      "ne čuvam vaš Bitcoin",
      "ne tražim seed phrase ili privatne ključeve",
      "Praktični Bitcoin standard je radni okvir iza mog savjetovanja.",
      "Vodiči objašnjavaju okvir. Razgovor ga primjenjuje na vašu situaciju.",
      "Dogovorite 15-minutni uvodni razgovor",
      'href="#pitanja"',
      'data-cta="hero-questions"',
      "Dovoljno je da imate stvarno pitanje koje utječe na vašu odluku.",
      "što vas najviše brine",
      "što još nedostaje za mirniju odluku",
      "U 15 minuta razjasnimo gdje ste sada, koju odluku pokušavate donijeti i koji bi sljedeći korak bio razuman.",
      "Dobivate jasniju sliku što je stvarna prepreka odluci",
      "Provjerite ima li uvodni razgovor smisla",
      "Ovo je dobro pitanje za uvodni razgovor.",
      "Što se mijenja kada postoji osobni okvir?",
      'data-cta="readiness-test-intro-call"',
      'data-cta="question-selected-intro-call"',
      'data-cta="before-after-intro-call"',
      'data-cta="desktop-rail-intro-call"',
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
      "Razjasnimo glavno pitanje.",
      "Vidimo što nedostaje za sljedeći korak.",
      "Što se može dogoditi nakon razgovora?",
      "sljedeći korak može biti Bitcoin jasnoća",
      "Dogovorimo sljedeći korak ili zaključimo da je za sada dovoljno.",
      "Spremni za uvodni razgovor?",
      "Odaberite termin i dođite s jednim stvarnim pitanjem.",
      "Ne morate imati gotov plan",
      "Ako postoji konkretan način da pomognem, dogovorit ćemo sljedeći korak.",
      "Imam Bitcoin, ali partner ili obitelj još nisu sigurni.",
      "Brine me sigurnost i ne želim pogriješiti s čuvanjem Bitcoina.",
      "Ne šaljite seed phrase, privatne ključeve, lozinke",
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
    path: "/bitcoin-jasnoca/",
    includes: [
      "Bitcoin jasnoća",
      "200 €",
      "jedan dubinski razgovor",
      "Nakon Bitcoin jasnoće najčešće imate",
      "Što pripremiti",
      "Kada nije za vas",
      "Krenite od uvodnog razgovora",
      "ne tražim seed phrase",
      "ne prognoziram cijenu",
      "ne upravljam vašim sredstvima",
    ],
  },
  {
    path: "/sigurnost/",
    includes: [
      "Dobar sigurnosni okvir ima dva cilja.",
      "Seed phrase se nikada ne dijeli. Dobar savjetnik vam pomaže urediti okvir bez preuzimanja kontrole.",
      "nitko ne smije dobiti kontrolu nad vašim Bitcoinom bez vašeg znanja",
      "vaša obitelj ne smije ostati potpuno izgubljena",
      "seed phrase — 12 ili 24 riječi za oporavak novčanika",
      "privatne ključeve",
      "lozinke",
      "ne čuvam Bitcoin",
      "način čuvanja prikladan za vašu situaciju",
      "kako složiti oporavak tako da ne ovisi o jednoj osobi, uređaju ili lokaciji",
      "ne tražim seed phrase ni privatne ključeve",
      "Za rad nije potrebno dijeliti seed phrase",
      "Razgovarajmo o sigurnosti bez predaje kontrole",
      "Možemo urediti",
      "Procjenjujemo rizike",
      "Odluka ostaje vaša",
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
    includes: [
      "Vodiči",
      'data-link="guide-card"',
      "Ako niste sigurni gdje krenuti, krenite od proračuna.",
      "Korak 1 — Red u novcu",
      "Korak 2 — Dug i sloboda odluke",
      "Korak 3 — Davanje",
      "Korak 4 — Bitcoin kao novac",
      "Korak 5 — Neto imovina",
      "Korak 6 — Sigurnost i obitelj",
      'href="#proracun"',
      'href="#dug"',
      'href="#davanje"',
      'href="#bitcoin"',
      'href="#neto-imovina"',
      'href="#sigurnost"',
      "Uvodni razgovor pomaže vidjeti koji dio okvira je za vas trenutno najvažniji.",
    ],
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
      "Drugim riječima, stvarni višak je novac bez druge namjene",
      "ne pripada budućem plaćanju",
      "Manje je nagađanja",
    ],
  },
  {
    path: positiveMoneyGuidePath,
    includes: [
      "Kad više novca ulazi nego što izlazi",
      "Novac ulazi kroz plaću, posao, klijente, prodaju ili druge izvore.",
      "Pet načina da više novca ostane u sustavu",
      "Prvo popravljam prihode, troškove i stanje duga.",
    ],
  },
  {
    path: debtChoiceGuidePath,
    includes: [
      "Težak, ali čistiji put",
      "Ako imate dug i niste sigurni treba li prvo čistiti bilancu ili nastaviti s Bitcoinom",
    ],
  },
  {
    path: bitcoinMoneyGuidePath,
    includes: [
      "Ako ne možete objasniti sebi ili partneru je li Bitcoin za vas novac",
    ],
  },
  {
    path: thirdsGuidePath,
    includes: [
      "Ovo nije preporuka da kupujete ili prodajete određenu imovinu.",
      "Ako želite provjeriti ravnotežu neto imovine bez pretvaranja toga u slijepu formulu",
    ],
  },
  {
    path: familyGuidePath,
    includes: [
      "Minimalna obiteljska uputa",
      "Ako obitelj zna da Bitcoin postoji, ali nema jasne upute što smije i ne smije napraviti",
    ],
  },
  {
    path: securityGuidePath,
    includes: [
      "Sigurnost ne smije ovisiti samo o vama",
      "Seed phrase se nikada ne dijeli",
      "Nitko ne smije tražiti seed phrase",
      "Za širi sigurnosni okvir pročitajte i sigurnosnu stranicu.",
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

function assertHtmlDoesNotInclude(url, html, forbidden) {
  if (!html.includes(forbidden)) {
    pass(`${url} HTML does not contain ${forbidden}`)
    return
  }

  fail(`${url} HTML contains forbidden markup: ${forbidden}`)
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

    assertHtmlDoesNotInclude(url, html, 'alt="Image"')

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
    `${baseUrl}/bitcoin-jasnoca/`,
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
