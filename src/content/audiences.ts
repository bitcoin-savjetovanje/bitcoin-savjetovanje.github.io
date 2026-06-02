import { guideHref } from "./guides"
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
  "Ne prognoziram cijenu.",
  "Ne tražim seed phrase, privatne ključeve ni pristup novčaniku.",
  "Odluka ostaje vaša.",
  "Za porezna i pravna pitanja trebate odgovarajuće stručnjake.",
] as const

export const audiencePages = [
  {
    slug: "osobno",
    path: PERSONAL_AUDIENCE_PATH,
    eyebrow: "OSOBNI BITCOIN STANDARD ZA POJEDINCA",
    title: "Imate Bitcoin. Sada trebate pravila.",
    subtitle:
      "Uredite proračun, dug, stvarni višak, neto imovinu i reakcije na volatilnost kako Bitcoin ne bi bio odvojena imovina sa strane, nego dio mirnijeg sustava odluka.",
    primaryCta: {
      label: "Dogovorite 15-minutni razgovor",
      href: CONVERSATION_PATH,
    },
    secondaryCta: {
      label: "Pogledajte vodiče",
      href: "/vodici/",
    },
    heroVisual: "personal",
    problemTitle: "Gdje osobni Bitcoin okvir najčešće puca",
    problems: [
      {
        title: "Ne znate koji je novac stvarno slobodan.",
        text: "Na računu postoji saldo, ali nije jasno što pripada obvezama, što je stvarni višak, a što samo privremeni mir prije sljedećeg troška.",
      },
      {
        title: "Dug zauzima budućnost.",
        text: "Kredit, minus, leasing ili kartica ne izgledaju dramatično dok Bitcoin raste, ali pod pritiskom cijene dug počinje diktirati odluke.",
      },
      {
        title: "Volatilnost previše pomiče ponašanje.",
        text: "Rast stvara euforiju, pad stvara paniku, a bez pisanih pravila svaka cijena izgleda kao nova odluka.",
      },
    ],
    outcomeTitle: "Što postaje jasnije",
    outcomes: [
      {
        title: "Jasnije vidite stvarni višak.",
        text: "Odluka o Bitcoinu dolazi nakon obveza, pričuve i budućih troškova.",
      },
      {
        title: "Znate gdje Bitcoin pripada u osobnoj bilanci.",
        text: "Bitcoin se ne promatra odvojeno od duga, troškova i neto imovine.",
      },
      {
        title: "Imate pravila za kupnju, držanje, trošenje i čekanje.",
        text: "Pravila se pišu prije pritiska, ne usred euforije ili panike.",
      },
      {
        title: "Volatilnost postaje povratna informacija, ne zapovijed.",
        text: "Cijena može otvoriti pitanje, ali ne mora upravljati ponašanjem.",
      },
    ],
    methodTitle: "Kako slažemo osobni okvir",
    methodSteps: [
      {
        title: "Proračun",
        text: "Vidjeti što sadašnji novac treba napraviti.",
      },
      {
        title: "Dug",
        text: "Osloboditi budući novac.",
      },
      {
        title: "Neto imovina",
        text: "Gledati Bitcoin u cjelini, ne izolirano.",
      },
      {
        title: "Vrijeme i volatilnost",
        text: "Zapisati pravila prije sljedećeg ciklusa.",
      },
      {
        title: "Sigurnost",
        text: "Napraviti prvi osobni sigurnosni okvir bez izlaganja tajni.",
      },
    ],
    guideLinks: [
      { label: "Stvarni višak", href: guideHref("stvarni-visak") },
      { label: "Dug ili Bitcoin", href: guideHref("dug-ili-bitcoin") },
      { label: "Bitcoin kao novac", href: guideHref("bitcoin-kao-novac") },
      {
        label: "Cijena kao mjera vremena",
        href: guideHref("cijena-kao-mjera-vremena"),
      },
    ],
    trustNote:
      "Ne upravljam vašim sredstvima, ne prognoziram cijenu i ne tražim seed phrase, privatne ključeve ni pristup novčaniku.",
    seo: {
      title: "Osobni Bitcoin standard za pojedinca | Bitcoin Savjetovanje",
      description:
        "Za pojedince koji imaju Bitcoin, ali žele jasnija pravila za proračun, dug, stvarni višak, neto imovinu, volatilnost i sigurnost.",
    },
  },
  {
    slug: "obitelj",
    path: FAMILY_AUDIENCE_PATH,
    eyebrow: "OBITELJSKI BITCOIN STANDARD",
    title: "Bitcoin ne smije živjeti samo u glavi jedne osobe.",
    subtitle:
      "Pretvorite osobno razumijevanje Bitcoina u obiteljski jezik, sigurnosni okvir i pravila koja smanjuju napetost, čuvaju pristup i pripremaju nasljeđivanje.",
    primaryCta: {
      label: "Dogovorite obiteljski razgovor",
      href: CONVERSATION_PATH,
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
        label: "Obiteljski Bitcoin trezor",
        href: guideHref("obiteljski-bitcoin-trezor"),
      },
      {
        label: "Osobni Bitcoin standard",
        href: "/osobni-bitcoin-standard/",
      },
    ],
    trustNote:
      "Ne tražim seed phrase, privatne ključeve, lozinke, iznose ni pristup novčaniku. Radimo na jeziku, pravilima, postupcima i sigurnosnoj arhitekturi.",
    seo: {
      title: "Obiteljski Bitcoin standard | Bitcoin Savjetovanje",
      description:
        "Za parove i obitelji koje žele zajednički jezik, sigurnosni okvir i nasljedni plan za Bitcoin bez tehničkog pritiska i bez izlaganja tajni.",
    },
  },
  {
    slug: "poduzetnici",
    path: BUSINESS_AUDIENCE_PATH,
    eyebrow: "BITCOIN STANDARD ZA PODUZETNIKE",
    title: "Prije poslovnog Bitcoina treba urediti poslovni novac.",
    subtitle:
      "Razdvojite poreze, plaće, dobavljače, pričuvu, višak, vlasničke odluke i privatni Bitcoin prije nego Bitcoin postane dio poslovne riznice.",
    primaryCta: {
      label: "Dogovorite poslovni razgovor",
      href: CONVERSATION_PATH,
    },
    secondaryCta: {
      label: "Pogledajte poslovne vodiče",
      href: "/vodici/",
    },
    heroVisual: "business",
    problemTitle: "Poslovni Bitcoin počinje prije kupnje",
    problems: [
      {
        title: "Prihod nije slobodan novac.",
        text: "Novac na poslovnom računu često već pripada porezima, plaćama, dobavljačima, zalihama, opremi, pričuvama ili budućim obvezama.",
      },
      {
        title: "Privatni i poslovni Bitcoin se miješaju.",
        text: "Bez jasne granice lako nastane porezna, računovodstvena, sigurnosna i obiteljska magla.",
      },
      {
        title: "Riznica bez pravila pojačava stres.",
        text: "Bitcoin može biti snažan novac, ali u poslu najprije treba znati koji novac smije postati dugoročni saldo.",
      },
    ],
    outcomeTitle: "Što poslovni okvir razdvaja",
    outcomes: [
      {
        title: "Jasnije razlikujete poslovni prihod, obveze i višak.",
        text: "Novac za poreze, plaće, dobavljače i pričuvu ne ulazi u isti koš kao vlasnički višak.",
      },
      {
        title: "Znate kada Bitcoin odluka pripada poslu, a kada vlasniku.",
        text: "Privatna imovina i poslovna riznica dobivaju jasniju granicu.",
      },
      {
        title: "Poslovna riznica dobiva pravila, a ne impulzivnu kupnju.",
        text: "Prvo se uređuje novčani tok, zatim uloga dugoročnog salda.",
      },
      {
        title: "Ovlaštene osobe i sigurnosni postupci postaju dio sustava.",
        text: "Pristup, odobravanje i odgovornosti promatraju se kao poslovni proces.",
      },
    ],
    methodTitle: "Kako slažemo poslovni okvir",
    methodSteps: [
      {
        title: "Novčani tok",
        text: "Razdvojiti prihod od stvarno slobodnog novca.",
      },
      {
        title: "Obveze",
        text: "Porezi, plaće, dobavljači, zalihe, oprema i pričuva.",
      },
      {
        title: "Vlasnički višak",
        text: "Odvojiti poslovne odluke od privatne imovine.",
      },
      {
        title: "Poslovna riznica",
        text: "Definirati kada i zašto Bitcoin ulazi u bilancu.",
      },
      {
        title: "Sigurnost i ovlaštenja",
        text: "Urediti pristup, odgovornosti i postupak bez izlaganja tajni.",
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
      "Ovo nije računovodstveno, porezno, pravno ni investicijsko savjetovanje. Ne upravljam poslovnom riznicom i ne donosim odluke umjesto vas. Pomažem vam urediti okvir pitanja, procesa i odgovornosti.",
    seo: {
      title: "Bitcoin standard za poduzetnike | Bitcoin Savjetovanje",
      description:
        "Za vlasnike posla koji žele razdvojiti poslovni novac, obveze, pričuvu, višak, privatni Bitcoin i poslovnu Bitcoin riznicu.",
    },
  },
] satisfies AudiencePage[]

export const audiencePagesBySlug = Object.fromEntries(
  audiencePages.map((page) => [page.slug, page])
) as Record<AudienceSlug, AudiencePage>

export function audienceCanonical(page: AudiencePage) {
  return `${SITE_URL}${page.path}`
}
