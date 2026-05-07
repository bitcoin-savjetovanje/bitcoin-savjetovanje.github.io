const baseUrl = "https://bitcoin-savjetovanje.com"
const failures = []
const words = (...parts) => parts.join(" ")

const forbiddenVisibleText = [
  words("Bitcoin kao novac,", "kapital i potrošnja"),
  words("dugoročnog", "kapitala"),
  "proračun nulte razine",
  "Strukturirani program",
  "Savjetodavni razgovor",
  words("Bitcoin kao", "kapital"),
  "crypto",
  "ROI",
  "custody",
  "self-custody",
  "cash balance",
  "stack",
  "lead magnet",
  "charity",
  "giving",
  "umjesto nas",
  "ne potpisujem transakcije za nas",
  "Darivanje",
  "darivanje",
  "fair value",
  "undervalued",
  "overvalued",
  "signal za kupnju",
  "signal za prodaju",
  "Ako je iza",
  words("dobar", "dug"),
  words("jeftin", "dug"),
  words("pametno", "zaduživanje"),
  words("optimizacija", "duga"),
  words("upravljanje", "dugom"),
  words("kredit kao", "alat"),
  words("dug se može", "isplatiti"),
  words("ako je prinos veći od", "kamate"),
  words("ulaganje u Bitcoin", "kreditom"),
]

const pageChecks = [
  {
    path: "/",
    includes: [
      "Imate Bitcoin. Sada trebate pravila.",
      "Bitcoin standard se vidi kad dođe pritisak.",
      "Metoda je šira od kupnje Bitcoina.",
      "U 15 minuta vidimo gdje sustav najviše škripi.",
      "Osobni Bitcoin standard je dokument s pravilima.",
      "Cijena kao mjera vremena",
      "Od kratke provjere do pisanog standarda",
      "Izgradnja osobnog Bitcoin standarda",
      "Vaš Bitcoin ostaje pod vašom kontrolom.",
      "Ne pomažem vam postaviti teoriju koju nisam živio.",
      "Želite prvo čitati?",
      "Provjerite gdje ste u odnosu na osobni Bitcoin standard.",
      "Dubinska provjera osobnog Bitcoin standarda",
      "Je li ovo financijsko savjetovanje?",
      "Moram li već imati Bitcoin?",
      "Hoćete li upravljati mojim sredstvima?",
      "Dogovorite 15-minutni uvodni razgovor",
    ],
  },
  {
    path: "/vodici/",
    includes: [
      "Vodiči za osobni Bitcoin standard",
      "Krenite s ova tri vodiča.",
      "Razina 1: Imate Bitcoin, ali još živite po fiat pravilima",
      "Razina 2: Gradite osobni Bitcoin standard",
      "Razina 3: Živite i usavršavate standard",
    ],
  },
  {
    path: "/sigurnost/",
    includes: [
      "Bitcoin mora ostati pod vašom kontrolom",
      "početne riječi",
      "privatne ključeve",
      "ne čuvam Bitcoin",
      "što obitelj smije napraviti",
    ],
  },
  {
    path: "/vodici/dug-je-buduci-novac/",
    includes: ["Dug je budući novac koji ste već potrošili"],
  },
  {
    path: "/vodici/dug-ili-bitcoin/",
    includes: ["Dug ili Bitcoin?"],
  },
  {
    path: "/vodici/ne-zaduzujte-se-za-bitcoin/",
    includes: ["Ne zadužujte se za Bitcoin"],
  },
  {
    path: "/vodici/davanje-u-proracunu-nulte-osnove/",
    includes: ["Davanje mijenja vaš odnos prema novcu"],
  },
  {
    path: "/vodici/davanje-bez-duga/",
    includes: ["Davanje bez duga"],
  },
  {
    path: "/vodici/uskladivanje-kupovne-moci-bitcoina/",
    includes: ["Kada kupovna moć pada", "Kada kupovna moć raste"],
  },
  {
    path: "/vodici/cijena-kao-mjera-vremena/",
    includes: [
      "Cijena kao mjera vremena",
      "Ispod trenda: manja potrošnja i veći priljevi",
    ],
  },
  {
    path: "/vodici/kredit-je-buduci-novac/",
    includes: [
      '<link rel="canonical" href="https://bitcoin-savjetovanje.com/vodici/dug-je-buduci-novac/" />',
    ],
  },
  {
    path: "/vodici/kredit-ili-bitcoin/",
    includes: [
      '<link rel="canonical" href="https://bitcoin-savjetovanje.com/vodici/dug-ili-bitcoin/" />',
    ],
  },
  {
    path: "/vodici/ne-uzimajte-kredit-za-bitcoin/",
    includes: [
      '<link rel="canonical" href="https://bitcoin-savjetovanje.com/vodici/ne-zaduzujte-se-za-bitcoin/" />',
    ],
  },
  {
    path: "/vodici/sustavno-davanje-u-proracunu-nulte-razine/",
    includes: [
      '<link rel="canonical" href="https://bitcoin-savjetovanje.com/vodici/davanje-u-proracunu-nulte-osnove/" />',
    ],
  },
  {
    path: "/vodici/sustavno-davanje-bez-kredita/",
    includes: [
      '<link rel="canonical" href="https://bitcoin-savjetovanje.com/vodici/davanje-bez-duga/" />',
    ],
  },
  {
    path: "/vodici/davanje-u-proracunu/",
    includes: [
      '<link rel="canonical" href="https://bitcoin-savjetovanje.com/vodici/davanje-u-proracunu-nulte-osnove/" />',
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

for (const check of pageChecks) {
  const url = `${baseUrl}${check.path}`

  try {
    const html = await fetchText(url)
    pass(`${url} returned HTTP 200`)

    for (const expected of check.includes) {
      if (html.includes(expected)) {
        pass(`${url} contains ${expected}`)
      } else {
        fail(`${url} is missing ${expected}`)
      }
    }

    for (const forbidden of forbiddenVisibleText) {
      if (html.includes(forbidden)) {
        fail(`${url} contains forbidden visible text: ${forbidden}`)
      } else {
        pass(`${url} does not contain forbidden visible text: ${forbidden}`)
      }
    }
  } catch (error) {
    fail(`${url} could not be verified: ${error.message}`)
  }
}

try {
  const sitemap = await fetchText(`${baseUrl}/sitemap.xml`)
  pass(`${baseUrl}/sitemap.xml returned HTTP 200`)

  for (const expectedUrl of [
    `${baseUrl}/`,
    `${baseUrl}/vodici/`,
    `${baseUrl}/sigurnost/`,
    `${baseUrl}/vodici/dug-je-buduci-novac/`,
    `${baseUrl}/vodici/dug-ili-bitcoin/`,
    `${baseUrl}/vodici/ne-zaduzujte-se-za-bitcoin/`,
    `${baseUrl}/vodici/davanje-u-proracunu-nulte-osnove/`,
    `${baseUrl}/vodici/davanje-bez-duga/`,
    `${baseUrl}/vodici/uskladivanje-kupovne-moci-bitcoina/`,
  ]) {
    if (sitemap.includes(`<loc>${expectedUrl}</loc>`)) {
      pass(`sitemap contains ${expectedUrl}`)
    } else {
      fail(`sitemap is missing ${expectedUrl}`)
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
    if (sitemap.includes(`<loc>${removedUrl}</loc>`)) {
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
