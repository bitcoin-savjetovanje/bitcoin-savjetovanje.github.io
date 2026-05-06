export type StandardAreaVisualType =
  | "budget"
  | "debt"
  | "giving"
  | "assets"
  | "power-law"
  | "security"

export type StandardArea = {
  id: string
  number: string
  title: string
  shortTitle: string
  problem: string
  solution: string
  bullets: string[]
  visualType: StandardAreaVisualType
  href: string
  ctaLabel: string
}

export type StandardAreaSegment = {
  eyebrow: string
  title: string
  copy: string
  areas: StandardArea[]
}

export const standardAreaSegments: StandardAreaSegment[] = [
  {
    eyebrow: "Prvi segment",
    title: "Mudrost upravljanja novcem",
    copy: "Prije ozbiljne Bitcoin odluke treba znati što novac već mora napraviti.",
    areas: [
      {
        id: "standard-area-proracun",
        number: "1",
        title: "Proračun",
        shortTitle: "Proračun nulte osnove",
        problem:
          "Novac na računu je samo broj bez konteksta. Novac uređen u proračunu je definiran oportunitetni trošak u dimenziji vremena.",
        solution:
          "Proračun nulte osnove definira plan za cijeli iznos novca kojim raspolažemo.",
        bullets: [
          "sav novac je namijenjen",
          "upravljamo novcem kroz kategorije i vrijeme",
          "što vremenski dulje vodimo proračun, to možemo dalje u budućnost planirati",
        ],
        visualType: "budget",
        href: "/vodici/svaki-euro-ima-namjenu/",
        ctaLabel: "Povezani vodič",
      },
      {
        id: "standard-area-razduzivanje",
        number: "2",
        title: "Razduživanje",
        shortTitle: "Život bez duga",
        problem:
          "Dug je budući novac koji ste već potrošili. Stanje duga je psihološki štetno za uvećanje ukupne imovine.",
        solution:
          "Razduživanje vraća slobodu, jasnoću i mir, i omogućuje pravilno upravljanje volatilnošću Bitcoina.",
        bullets: [
          "Trošite i ulažete novac iz prošlosti, kojemu znate starost.",
          "Svaka odluka proizlazi iz slobode, jasnoće i mira.",
          "Promjene u Bitcoin cijeni prati vaša ispravna reakcija.",
        ],
        visualType: "debt",
        href: "/vodici/dug-je-buduci-novac/",
        ctaLabel: "Povezani vodič",
      },
      {
        id: "standard-area-davanje",
        number: "3",
        title: "Davanje",
        shortTitle: "Davanje",
        problem:
          "Bez planirane i sustavne kategorije za davanje u proračunu, ne ostvarujemo puni potencijal naših prihoda.",
        solution:
          "Kada je proračun uređen i dug eliminiran, sustavno davanje postaje izvor novih prihoda i tolerancije na rizik, te smiruje reakcije na volatilnost Bitcoina.",
        bullets: [
          "dio proračuna dobiva namjenu za transakcije bez očekivanja povrata",
          "uređena i sustavna praksa davanja podiže kapacitet za dizanje prihoda",
          "psihologija odnosa prema novcu i ljudima mijenja se na bolje",
        ],
        visualType: "giving",
        href: "/vodici/davanje-u-proracunu-nulte-osnove/",
        ctaLabel: "Povezani vodič",
      },
    ],
  },
  {
    eyebrow: "Drugi segment",
    title: "Bitcoin standard",
    copy: "Kada smo uspostavili tri temeljna principa mudrosti upravljanja novcem, možemo integrirati Bitcoin u ostatak neto imovine.",
    areas: [
      {
        id: "standard-area-bitcoin-u-imovini",
        number: "4",
        title: "Bitcoin u imovini",
        shortTitle: "Neto imovina",
        problem:
          'Bitcoin se najčešće tretira kao zasebna investicija koju se "ne dira" osim u krajnjoj nuždi. Pomiješani su nam pojmovi štednje/novca, investicije i diverzifikacije.',
        solution:
          "Bitcoin ima jasnu ulogu novca koji se normalno zarađuje, štedi, daje, investira i troši. Promjene cijene Bitcoina znače usklađivanje proračuna.",
        bullets: [
          "razlikujete novac, potrošnju i proizvodnu imovinu",
          "Bitcoin tretiramo kao dio novčane zalihe, ne kao investiciju",
          "pravilo možete objasniti sebi i obitelji",
        ],
        visualType: "assets",
        href: "/vodici/bitcoin-u-neto-imovini/",
        ctaLabel: "Povezani vodič",
      },
      {
        id: "standard-area-bitcoin-power-law",
        number: "5",
        title: "Bitcoin zakon potencije",
        shortTitle: "Cijena i vrijeme",
        problem:
          "Kad nas netko pita koliko će Bitcoin vrijediti u budućnosti, ili ne znamo odgovor ili ovisimo o trenutnom tržišnom sentimentu i narativima.",
        solution:
          "Zakon potencije u Bitcoinu nam kvantificira kojom brzinom cijena Bitcoina raste u vremenu, i postavlja realna i praktična očekivanja. Proračun i ravnoteža neto imovine radi se u skladu s očekivanjima prema dugoročnom trendu.",
        bullets: [
          "dugoročni obrazac umjesto dnevne buke",
          "model nije garancija, ali je vrlo koristan okvir",
          "pravila ostaju važnija od prognoze",
        ],
        visualType: "power-law",
        // TODO: Zamijeniti privremeni vodič budućim landingom ili vodičem za Bitcoin power law okvir.
        href: "/vodici/uskladivanje-kupovne-moci-bitcoina/",
        ctaLabel: "Povezani vodič",
      },
      {
        id: "standard-area-sigurnost-nasljedivanje",
        number: "6",
        title: "Bitcoin sigurnost i nasljeđivanje",
        shortTitle: "Sigurnost i obitelj",
        problem:
          "Ako sustav postoji samo u vašoj glavi, obitelj može ostati bez smjera.",
        solution: "Sigurnosni i nasljedni plan za Bitcoin daje jasnoću i mir.",
        bullets: [
          "uspostavljamo plan za skrbništvo i sigurnost Bitcoina",
          "uređujemo pristup Bitcoinu za obitelj",
          "svi uključeni znaju što napraviti u ključnim situacijama",
        ],
        visualType: "security",
        href: "/vodici/sigurnost-ne-smije-ovisiti-samo-o-vama/",
        ctaLabel: "Povezani vodič",
      },
    ],
  },
]
