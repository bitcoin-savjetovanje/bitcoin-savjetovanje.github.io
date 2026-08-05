import { guideHref } from "./guideLinks"
import {
  BUSINESS_AUDIENCE_PATH,
  CONVERSATION_PATH,
  FAMILY_AUDIENCE_PATH,
  PERSONAL_AUDIENCE_PATH,
  SITE_URL,
} from "./site"

export type AudienceSlug = "osobno" | "obitelj" | "poduzetnici"
export type AudienceHeroVisual = "personal" | "family" | "business"

export type AudiencePage = {
  slug: AudienceSlug
  path: string
  eyebrow: string
  title: string
  subtitle: string
  primaryCta: {
    label: string
    href: string
  }
  secondaryCta?: {
    label: string
    href: string
  }
  heroVisual: AudienceHeroVisual
  problemTitle: string
  problems: Array<{
    title: string
    text: string
  }>
  outcomeTitle: string
  outcomes: Array<{
    title: string
    text: string
  }>
  methodTitle: string
  methodSteps: Array<{
    title: string
    text: string
  }>
  guideLinks: Array<{
    label: string
    href: string
  }>
  trustNote: string
  seo: {
    title: string
    description: string
  }
}

export const audienceSafetyBoundaries = [
  "Ne upravljam sredstvima.",
  "Ne tražim privatne ključeve, Bitcoin Core wallet backup datoteke, wallet passphraseove, početne riječi drugih walleta ni pristup novčaniku.",
  "Odluka ostaje vaša.",
  "Za porezna i pravna pitanja trebate odgovarajuće stručnjake.",
] as const

export const audiencePages = [
  {
    slug: "osobno",
    path: PERSONAL_AUDIENCE_PATH,
    eyebrow: "ZA POJEDINCE KOJI VEĆ IMAJU BITCOIN",
    title: "Bitcoin imate. Sada uredite kako iz njega živite.",
    subtitle:
      "Za osobu koja želi prijeći s povremenog kupovanja i držanja na sustav u kojem su prihod, proračun, dug, davanje, trošenje, imovina i sigurnost uređeni iz Bitcoin pozicije.",
    primaryCta: {
      label: "Provjerite svoj osobni Bitcoin standard",
      href: "/provjera-bitcoin-standarda/",
    },
    secondaryCta: {
      label: "Pogledajte privatni program",
      href: "/osobni-bitcoin-standard/",
    },
    heroVisual: "personal",
    problemTitle: "Tri stanja osobnog Bitcoin sustava",
    problems: [
      {
        title: "Bitcoin je još uvijek imovina sa strane.",
        text: "Prihod i troškovi ostaju u eurima, a Bitcoin se kupuje povremeno ili iz ostatka.",
      },
      {
        title: "Bitcoin je glavni saldo, ali pravila nisu zapisana.",
        text: "Operativni euri, dug, davanje i veliki troškovi nemaju zajednički sustav.",
      },
      {
        title: "Bitcoin je postao i odgovornost.",
        text: "Imovina, obitelj i sigurnost traže stres-test, osobu od povjerenja i plan kontinuiteta.",
      },
    ],
    outcomeTitle: "Što uređeni sustav povezuje",
    outcomes: [
      {
        title: "Bitcoin postaje primarni novac.",
        text: "Prihod se prema pravilu pretvara u Bitcoin, a euri ostaju operativni oblik za bliska plaćanja.",
      },
      {
        title: "Proračun, dug i davanje dobivaju red.",
        text: "Svaki dio novca dobiva namjenu, a cilj duga ostaje bilanca bez duga.",
      },
      {
        title: "Neto imovina dobiva jednu sliku.",
        text: "Bitcoin, nekretnine, posao, druga imovina i dug promatraju se zajedno, uz različite uloge.",
      },
      {
        title: "Sigurnost uključuje kontinuitet.",
        text: "Osoba od povjerenja zna prvi korak, a pravila imaju datum revizije.",
      },
    ],
    methodTitle: "Sedam područja osobnog Bitcoin standarda",
    methodSteps: [
      {
        title: "Proračun nulte osnove",
        text: "Svaki dio novca dobiva namjenu prije potrošnje.",
      },
      {
        title: "Dug",
        text: "Dug se promatra kao negativni dio bilance i zahtjev na budući prihod.",
      },
      {
        title: "Davanje",
        text: "Davanje postaje sastavni dio novčanog sustava.",
      },
      {
        title: "Bitcoin kao primarni novac",
        text: "Prihod, operativni euri i stvarni troškovi dobivaju zajednička pravila.",
      },
      {
        title: "Neto imovina",
        text: "Bitcoin, nekretnine, posao, druga imovina i dug promatraju se u jednoj bilanci.",
      },
      {
        title: "Vrijeme i volatilnost",
        text: "Dugoročni trend daje kontekst, a pravila imaju datum revizije.",
      },
      {
        title: "Sigurnost i kontinuitet",
        text: "Skrbništvo, osoba od povjerenja i prvi korak oporavka prilagođavaju se stvarnim rizicima.",
      },
    ],
    guideLinks: [
      { label: "Proračun nulte osnove", href: "/proracun/" },
      { label: "Dug ili Bitcoin", href: guideHref("dug-ili-bitcoin") },
      { label: "Bitcoin kao novac", href: guideHref("bitcoin-kao-novac") },
      {
        label: "Skrbništvo i sigurnost",
        href: "/skrbnistvo-i-sigurnost/",
      },
    ],
    trustNote:
      "Bez upravljanja sredstvima, preuzimanja skrbništva i pristupa vašem novčaniku.",
    seo: {
      title: "Bitcoin kao primarni novac za pojedinca | Bitcoin Savjetovanje",
      description:
        "Za pojedince koji žele povezati prihod, proračun, dug, davanje, trošenje, imovinu i sigurnost u sustav za život s Bitcoinom kao primarnim novcem.",
    },
  },
  {
    slug: "obitelj",
    path: FAMILY_AUDIENCE_PATH,
    eyebrow: "BITCOIN U OBITELJI",
    title:
      "Bitcoin ne smije ovisiti o razumijevanju, sjećanju i dostupnosti jedne osobe.",
    subtitle:
      "Za parove i obitelji koji žele povezati prihod, proračun nulte osnove, dug, korištenje Bitcoina, sigurnost i plan za slučaj nedostupnosti.",
    primaryCta: {
      label: "Razjasnite obiteljsko Bitcoin pitanje",
      href: `${CONVERSATION_PATH}?tema=obitelj`,
    },
    secondaryCta: {
      label: "Pogledajte sigurnosni pristup",
      href: "/sigurnost/",
    },
    heroVisual: "family",
    problemTitle: "Obiteljski rizik često nije tehnički",
    problems: [
      {
        title: "Jedna osoba nosi previše znanja.",
        text: "Ako samo jedna osoba zna što postoji, gdje je, zašto je važno i koji je prvi korak, obiteljski Bitcoin sustav još nije dovršen.",
      },
      {
        title: "Razgovori o Bitcoinu stvaraju napetost.",
        text: "Jedna osoba vidi dugoročni novac, druga vidi rizik, cijenu, tehniku ili nepoznatu odgovornost.",
      },
      {
        title: "Sigurnost je tehnička, ali obitelj treba ljudski plan.",
        text: "Uređaji, riječi i procedure ne znače puno ako nitko osim vas ne zna što smije, a što ne smije napraviti.",
      },
    ],
    outcomeTitle: "Što obitelj dobiva",
    outcomes: [
      {
        title: "Obitelj dobiva zajednički jezik.",
        text: "Bitcoin se može objasniti bez pritiska, žargona i potrebe da svi znaju sve.",
      },
      {
        title: "Partner razumije osnovnu sliku bez tehničkog opterećenja.",
        text: "Fokus je na ulogama, granicama i odluci, ne na dokazivanju tko je u pravu.",
      },
      {
        title: "Postoji prvi korak oporavka bez otkrivanja tajni.",
        text: "Obitelj zna odakle početi, ali ne dobiva podatke koje nitko ne smije dijeliti.",
      },
      {
        title: "Nasljeđivanje ulazi u financijsku arhitekturu.",
        text: "Plan se priprema za zaborav, bolest, smrt i dobronamjernu pogrešku.",
      },
    ],
    methodTitle: "Kako slažemo obiteljski okvir",
    methodSteps: [
      {
        title: "Zajednički jezik",
        text: "Objasniti Bitcoin bez žargona i bez pritiska.",
      },
      {
        title: "Obiteljski proračun",
        text: "Razlikovati obveze, višak i dugoročni novac.",
      },
      {
        title: "Sigurnosni okvir",
        text: "Razdvojiti ono što obitelj treba znati od onoga što nitko ne smije otkriti.",
      },
      {
        title: "Uloge i odgovornosti",
        text: "Odrediti tko zna prvi korak, tko zna dokumente i tko zna koga kontaktirati.",
      },
      {
        title: "Nasljeđivanje",
        text: "Pripremiti sustav za zaborav, bolest, smrt i dobronamjernu pogrešku.",
      },
    ],
    guideLinks: [
      { label: "Sigurnost i povjerljivost", href: "/sigurnost/" },
      { label: "Vodiči", href: "/vodici/" },
      {
        label: "Bitcoin Core Standard za dugoročnu štednju",
        href: guideHref("bitcoin-core-standard"),
      },
      {
        label: "Osobni Bitcoin standard",
        href: "/osobni-bitcoin-standard/",
      },
    ],
    trustNote:
      "Ne tražim privatne ključeve, Bitcoin Core wallet backup datoteke, wallet passphraseove, početne riječi drugih walleta, iznose ni pristup novčaniku. Radimo na jeziku, pravilima, postupcima i sigurnosnoj arhitekturi.",
    seo: {
      title: "Bitcoin u obitelji | Zajednička pravila, sigurnost i kontinuitet",
      description:
        "Za parove i obitelji koji žele povezati prihod, dug, korištenje Bitcoina, sigurnost i prvi korak oporavka u razumljiv obiteljski Bitcoin standard.",
    },
  },
  {
    slug: "poduzetnici",
    path: BUSINESS_AUDIENCE_PATH,
    eyebrow: "BITCOIN ZA PODUZETNIKE",
    title: "Najprije razdvojite novac posla od novca vlasnika.",
    subtitle:
      "Za poduzetnike kod kojih se privatne i poslovne odluke susreću u istoj osobi, ali ne smiju završiti u istoj bilanci, novčaniku ili sigurnosnom postupku.",
    primaryCta: {
      label: "Razjasnite jednu poslovnu Bitcoin odluku",
      href: `${CONVERSATION_PATH}?tema=poduzetnik`,
    },
    secondaryCta: {
      label: "Pogledajte briefing za tvrtke",
      href: "/za-tvrtke/",
    },
    heroVisual: "business",
    problemTitle: "Gdje granica između poslovanja i vlasnika najčešće puca",
    problems: [
      {
        title: "Uplata na poslovni račun nema određenu namjenu.",
        text: "Novac na računu još treba razdvojiti prema porezima, plaćama, dobavljačima, zalihama, opremi, pričuvama i drugim obvezama.",
      },
      {
        title: "Privatni i poslovni Bitcoin se miješaju.",
        text: "Bez jasne granice nastaju nejasna računovodstvena, pravna, sigurnosna i vlasnička pitanja.",
      },
      {
        title: "Samo vlasnik razumije cijeli sustav.",
        text: "Poslovanje ovisi o jednoj osobi, njezinim uređajima, pamćenju, ovlastima i dostupnosti.",
      },
    ],
    outcomeTitle: "Što treba jasno razdvojiti",
    outcomes: [
      {
        title: "Operativni novac poslovanja.",
        text: "Novac za bliske obveze i normalno poslovanje ostaje odvojen od dugoročnih odluka.",
      },
      {
        title: "Dugoročni poslovni saldo.",
        text: "Svrha, vremenski horizont, odgovorne osobe i način odobravanja uređuju se prije Bitcoin odluke.",
      },
      {
        title: "Osobna bilanca vlasnika.",
        text: "Privatna imovina i osobni Bitcoin standard ostaju odvojeni od bilance i dokumentacije društva.",
      },
      {
        title: "Ovlasti, sigurnost i kontinuitet.",
        text: "Predlaganje, odobravanje, izvršenje, evidencija i nadzor postaju prepoznate poslovne uloge.",
      },
    ],
    methodTitle: "Redoslijed razjašnjavanja poslovne Bitcoin odluke",
    methodSteps: [
      {
        title: "Namjena novca",
        text: "Odrediti koji je novac potreban za bliske poslovne obveze.",
      },
      {
        title: "Vremenski horizont",
        text: "Razjasniti svrhu i trajanje dugoročnog poslovnog salda.",
      },
      {
        title: "Bilanca vlasnika",
        text: "Odvojiti osobni novac i privatni Bitcoin od sredstava poslovanja.",
      },
      {
        title: "Stručna pitanja",
        text: "Pripremiti pitanja za računovođu, pravnika, poreznog ili drugog stručnjaka.",
      },
      {
        title: "Ovlasti i sigurnost",
        text: "Prepoznati odgovornosti, odobrenja i kontinuitet bez izlaganja tajni.",
      },
    ],
    guideLinks: [
      {
        label: "Prihod nije slobodan novac",
        href: guideHref("prihod-nije-slobodan-novac"),
      },
      {
        label: "Poslovni Bitcoin nije privatni Bitcoin",
        href: guideHref("poslovni-bitcoin-nije-privatni-bitcoin"),
      },
      { label: "Vodiči", href: "/vodici/" },
      { label: "Bitcoin konzultacija", href: "/bitcoin-konzultacija/" },
      {
        label: "Osobni Bitcoin standard",
        href: "/osobni-bitcoin-standard/",
      },
    ],
    trustNote:
      "Bitcoin Savjetovanje ne upravlja poslovnim sredstvima, ne preuzima skrbništvo i ne donosi odluke umjesto vas.",
    seo: {
      title: "Bitcoin za poduzetnike | Odvojite poslovni i osobni novac",
      description:
        "Za poduzetnike koji žele jasno razdvojiti poslovne obveze, dugoročni poslovni saldo, privatni Bitcoin, ovlasti i sigurnost prije poslovne Bitcoin odluke.",
    },
  },
] satisfies AudiencePage[]

export const audiencePagesBySlug = Object.fromEntries(
  audiencePages.map((page) => [page.slug, page])
) as Record<AudienceSlug, AudiencePage>

export function audienceCanonical(page: AudiencePage) {
  return `${SITE_URL}${page.path}`
}
