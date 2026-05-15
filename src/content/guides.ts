import { PRIMARY_CTA } from "./site"

export type GuideSection = {
  heading: string
  body: string[]
  items?: string[]
  visual?: GuideSectionVisual
  link?: {
    before: string
    label: string
    href: string
    after?: string
  }
}

export type GuideSectionVisual =
  | {
      type: "logo-grid"
      title: string
      caption?: string
      items: Array<{
        name: string
        description?: string
        src: string
        alt: string
        href?: string
        credit?: string
      }>
    }
  | {
      type: "image-card"
      title: string
      caption: string
      src: string
      alt: string
      href?: string
      credit?: string
    }
  | {
      type: "image-grid"
      title: string
      caption?: string
      items: Array<{
        name: string
        description?: string
        src: string
        alt: string
        href?: string
        credit?: string
      }>
    }

export type GuideVisual =
  | {
      type: "sequence"
      title: string
      steps: string[]
      caption?: string
    }
  | {
      type: "equation"
      title: string
      parts: string[]
      result: string
      caption?: string
    }
  | {
      type: "split"
      title: string
      leftLabel: string
      leftItems: string[]
      rightLabel: string
      rightItems: string[]
      caption?: string
    }
  | {
      type: "cycle"
      title: string
      nodes: string[]
      center?: string
      caption?: string
    }
  | {
      type: "trend"
      title: string
      states: Array<{ label: string; description: string }>
      caption?: string
    }
  | {
      type: "thirds"
      title: string
      columns: Array<{ label: string; description: string }>
      caption?: string
    }
  | {
      type: "network"
      title: string
      center: string
      nodes: string[]
      caption?: string
    }
  | {
      type: "safety"
      title: string
      zones: Array<{ label: string; description: string }>
      caption?: string
    }

export const guideCategories = [
  "Osobni proračun nulte osnove",
  "Život bez duga",
  "Davanje",
  "Bitcoin kao novac",
  "Neto imovina",
  "Sigurnost i obitelj",
] as const

export type GuideCategory = (typeof guideCategories)[number]
export type GuideDifficulty = "Početno" | "Srednje" | "Napredno"
export type GuideFreshness = "stabilno" | "često se mijenja"

export const guideCategoryDescriptions: Record<GuideCategory, string> = {
  "Osobni proračun nulte osnove":
    "Prvi korak je red. Svaki euro dobiva namjenu prije Bitcoin odluke.",
  "Život bez duga":
    "Dug nije samo obveza. Dug je stanje koje s vremenom pojačava nemir, osjećaj zarobljenosti i zbunjenost. Bitcoin standard počinje izlaskom iz duga i prestankom trošenja budućeg novca.",
  Davanje: "Nakon izlaska iz duga, dio novca dobiva namjenu za druge ljude.",
  "Bitcoin kao novac":
    "Bitcoin se promatra kao novac i novčana zaliha, uz pravila za vrijeme, kupovnu moć i proračun nulte osnove.",
  "Neto imovina":
    "Novac, potrošna dobra i proizvodna imovina imaju različite uloge.",
  "Sigurnost i obitelj":
    "Bitcoin mora ostati pod vašom kontrolom, ali sustav ne smije ovisiti samo o vama.",
}

export type Guide = {
  slug: string
  previousSlugs?: string[]
  title: string
  seoTitle?: string
  metaDescription: string
  excerpt: string
  category: GuideCategory
  difficulty?: GuideDifficulty
  freshness?: GuideFreshness
  safetyNote?: string
  order: number
  featured?: boolean
  publishedAt: string
  updatedAt: string
  practicalQuestion: string
  relatedSlugs: string[]
  visual?: GuideVisual
  sections: GuideSection[]
  finalCta: string
  finalCtaPrompt?: string
  extraCta?: {
    title: string
    text: string
    label: string
    href: string
    dataCta: string
  }
}

const advancedSecuritySafetyNote =
  "Ovo nije početna preporuka za svakoga. Napredniji sigurnosni sustav može smanjiti neke rizike, ali može povećati rizik gubitka pristupa ako osoba nije spremna za njega. Prvo treba razumjeti što se nikada ne dijeli, tko smije znati što i kako se pristup oporavlja bez predaje kontrole."

const guideEntries: Guide[] = [
  {
    slug: "svaki-euro-ima-namjenu",
    title: "Svaki euro ima namjenu",
    metaDescription:
      "Vodič o osobnom proračunu nulte osnove i zašto Bitcoin odluke počinju tek kada svaki euro ima jasnu namjenu.",
    excerpt:
      "Osobni Bitcoin standard ne počinje pitanjem koliko Bitcoina kupiti. Počinje pitanjem zna li svaki euro što treba raditi.",
    category: "Osobni proračun nulte osnove",
    difficulty: "Početno",
    freshness: "stabilno",
    order: 10,
    featured: true,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Možete li za svaki euro koji imate reći što treba napraviti prije nego što odlučite kupiti Bitcoin?",
    relatedSlugs: [
      "stvarni-visak",
      "starost-novca",
      "davanje-u-proracunu-nulte-osnove",
    ],
    visual: {
      type: "sequence",
      title: "Od prihoda do reda",
      steps: ["novac ulazi", "namjena", "0 neraspoređeno"],
      caption:
        "Osobni proračun nulte osnove počinje kada svaki euro dobije posao.",
    },
    sections: [
      {
        heading: "Proračun nulte osnove nije kazna",
        body: [
          "Mnogi ljudi osobni proračun nulte osnove čuju kao zabranu. Kao popis stvari koje više ne smiju raditi. U osobnom Bitcoin standardu proračun nulte osnove ima drukčiju ulogu: ne služi kao kazna, nego kao način da se uvede red. Pokazuje što vaš novac treba napraviti prije nego što ga potrošite, darujete, čuvate ili pretvorite u Bitcoin.",
          "Bez proračuna nulte osnove, odluka izgleda slobodno, ali često nije slobodna. Novac na računu stvara osjećaj prostora. Onda dođe rata, popravak, porez, zdravstveni trošak ili obiteljska potreba. Ono što je izgledalo kao višak odjednom postaje novac koji je već trebao imati namjenu.",
        ],
      },
      {
        heading: "Svaki euro već ima posao",
        body: [
          "Svaki euro koji imate već nekamo ide. Ako mu vi ne date posao, posao će mu dati navika, hitnost ili tuđi zahtjev. Zato proračun nulte osnove počinje jednostavnom rečenicom: svaki euro mora dobiti namjenu. Ne zato da biste sve potrošili, nego zato da ništa ne ostane nejasno.",
          "Jedan dio novca ide na redovne troškove. Jedan dio na izlazak iz duga. Jedan dio na buduća plaćanja. Jedan dio na sigurnosnu zalihu. Jedan dio može ići na davanje. Tek nakon toga možete mirno reći koji dio novca stvarno može postati Bitcoin odluka. Red dolazi prije kupnje.",
        ],
      },
      {
        heading: "Bez namjene nema stvarnog viška",
        body: [
          "Stvarni višak nije iznos koji vidite na računu. Stvarni višak je novac koji je slobodan nakon što su poznati troškovi, obveze, dugovi i budući troškovi. Ako novac za dva mjeseca mora platiti nešto važno, on nije višak. On samo čeka svoj red.",
          "Zato je opasno kupovati Bitcoin samo zato što se danas čini da ima prostora. Možda prostor postoji. Možda ne postoji. Proračun nulte osnove je način da to prestane biti dojam. On pokazuje koji novac možete rasporediti bez toga da sutra morate prodati Bitcoin ili se zadužiti za nešto što ste mogli vidjeti unaprijed.",
        ],
      },
      {
        heading: "Bitcoin odluka počinje prije kupnje",
        body: [
          "Bitcoin odluka ne počinje na burzi. Počinje u proračunu nulte osnove. Počinje pitanjem: što ovaj novac već mora napraviti? Ako odgovor nije jasan, kupnja nije zrela odluka. Može biti dobra namjera, ali nije dio osobnog Bitcoin standarda.",
          "Kada proračun nulte osnove postoji, kupnja postaje mirnija. Ne morate pogađati osjećaj. Vidite koliko novca ima namjenu, koliko ga treba čekati i koliko ga je stvarno slobodno. Tada Bitcoin ulazi u sustav kao novac, a ne kao pokušaj bijega od neuređenog proračuna.",
        ],
      },
      {
        heading: "Pravilo koje treba zapisati",
        body: [
          "Prvo pravilo može biti vrlo jednostavno: ne donosim Bitcoin odluku dok svaki euro nema namjenu. To pravilo ne govori koliko trebate kupiti. Ono štiti redoslijed. Prvo proračun nulte osnove, zatim stvarni višak, tek onda kupnja, čekanje ili trošenje.",
          "Ako to pravilo možete objasniti sebi i obitelji, već ste napravili velik korak. Bitcoin standard nije samo posjedovanje Bitcoina. Počinje kada novac prestane lutati i kada svaka odluka ima mjesto u pisanom sustavu.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako ne znate koji je novac stvarno slobodan za Bitcoin odluku, to vrijedi razjasniti u uvodnom razgovoru.",
  },
  {
    slug: "stvarni-visak",
    title: "Što je stvarni višak?",
    metaDescription:
      "Vodič o tome kako osobni proračun nulte osnove, dug, buduća plaćanja i novčana zaliha pokazuju koji je novac stvarno slobodan za Bitcoin odluke.",
    excerpt:
      "Stvarni višak je novac koji je slobodan tek nakon što svaki euro ima namjenu i nakon što su buduća plaćanja vidljiva.",
    category: "Osobni proračun nulte osnove",
    difficulty: "Početno",
    freshness: "stabilno",
    order: 15,
    publishedAt: "2026-04-30",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Koji novac danas zovete viškom, a možda već pripada budućem trošku?",
    relatedSlugs: [
      "svaki-euro-ima-namjenu",
      "starost-novca",
      "dca-nije-dovoljan",
    ],
    visual: {
      type: "equation",
      title: "Što ostaje nakon obveza",
      parts: ["novac koji ulazi", "obveze", "buduća plaćanja"],
      result: "stvarni višak",
      caption:
        "Višak nije stanje na računu. Višak je ono što ostaje nakon namjena.",
    },
    sections: [
      {
        heading: "Višak nije stanje na računu",
        body: [
          "Novac koji stoji na računu može izgledati slobodno. Ali račun ne zna što dolazi. Ne zna za registraciju auta, porez, popravak, školarinu, put, liječnika ili mjesec u kojem prihod kasni. Zbog toga stanje na računu nije isto što i stvarni višak.",
          "Stvarni višak postoji tek nakon što su vidljivi osobni proračun nulte osnove, dug, buduća plaćanja i sigurnosna zaliha. Sve prije toga je samo dojam. A dojam je loš temelj za Bitcoin odluke.",
          "Drugim riječima, stvarni višak je novac bez druge namjene: ne pripada budućem plaćanju, ne treba za izlazak iz duga i ne slabi sigurnosnu zalihu.",
        ],
      },
      {
        heading: "Novac može biti zauzet i kada miruje",
        body: [
          "Novac ne mora biti potrošen da bi već bio zauzet. Može čekati obvezu. Može čekati račun. Može čekati mjesec u kojem će troškovi biti veći od prihoda. Ako ga tada nazovete viškom, sami sebi stvarate budući pritisak.",
          "Osobni Bitcoin standard zato traži da se buduća plaćanja vide unaprijed. Kada se vide, odluka je mirnija. Možda kupujete manje Bitcoina nego što ste mislili, ali ono što kupite ne ugrožava sustav.",
        ],
      },
      {
        heading: "Dug mijenja značenje viška",
        body: [
          "Ako postoji dug, višak se mora gledati strože. Dug je budući novac koji ste već potrošili. On ima pravo na dio budućih prihoda prije nego što vi donesete novu odluku. Zato dug može učiniti da novac koji izgleda slobodno zapravo nije slobodan.",
          "To ne znači da osoba u dugu nikada ne smije kupovati Bitcoin, nego da stanje duga mora biti u slici. Ako ga nema u slici, dug odlučuje skriveno. A skriveni dug često odlučuje u najgorem trenutku.",
        ],
      },
      {
        heading: "Višak mora preživjeti vrijeme",
        body: [
          "Dobar test je vrijeme. Ako isti novac može mirno preživjeti nekoliko mjeseci bez toga da ugrozi obveze, vjerojatnije je da je stvarno slobodan. Ako nestaje čim dođe prvi veći trošak, nije višak. Bio je samo kratka pauza između dva plaćanja.",
          "Zato osobni proračun nulte osnove ne smije gledati samo ovaj mjesec. Treba gledati i ono što dolazi. Bitcoin odluka koja ne vidi budućnost lako postane odluka koju morate popravljati prodajom, zaduživanjem ili stresom.",
        ],
      },
      {
        heading: "Jednostavno pravilo",
        body: [
          "Pravilo može glasiti: stvarni višak je novac bez druge namjene: ne pripada budućem plaćanju, ne treba za izlazak iz duga i ne slabi sigurnosnu zalihu. Sve ostalo još nije višak.",
          "Kada ovo zapišete, Bitcoin odluke postaju čišće. Manje je nagađanja, manje hitnosti i manje potrebe da cijena odlučuje umjesto vas. Prvo znate što je slobodno. Tek onda odlučujete što s tim novcem.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako niste sigurni koji je novac stvarno višak, a koji već pripada budućim obvezama, uvodni razgovor može pomoći da to stavimo u jasniju sliku.",
  },
  {
    slug: "starost-novca",
    title: "Starost novca: koliko dugo vaš novac preživi?",
    metaDescription:
      "Vodič o starosti novca, budućim plaćanjima i zašto mirnije Bitcoin odluke traže novac koji nije odmah pod pritiskom.",
    excerpt:
      "Novac koji mora odmah nestati ne daje slobodu. Što je novac stariji, to je lakše donositi mirne Bitcoin odluke.",
    category: "Osobni proračun nulte osnove",
    difficulty: "Početno",
    freshness: "stabilno",
    order: 20,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Koliko dana vaš novac u prosjeku preživi prije nego što ga morate potrošiti?",
    relatedSlugs: [
      "svaki-euro-ima-namjenu",
      "stvarni-visak",
      "dug-ili-bitcoin",
    ],
    visual: {
      type: "sequence",
      title: "Novac kroz vrijeme",
      steps: ["danas", "30 dana", "90 dana"],
      caption:
        "Što duže novac preživi prije potrošnje, to odluke postaju mirnije.",
    },
    sections: [
      {
        heading: "Novac koji odmah nestaje",
        body: [
          "Ako novac stigne danas i nestane sutra, on ne daje mnogo slobode. Možda pokriva trošak, ali ne stvara prostor. Živite blizu sljedećeg računa. Svako novo plaćanje traži brzu odluku, a svaka promjena cijene Bitcoina izgleda važnije nego što možda jest.",
          "Takav život nije uvijek posljedica neodgovornosti. Ponekad je posljedica malog prihoda, visokih troškova, duga ili obiteljskih okolnosti. Ali dok novac odmah nestaje, Bitcoin odluke su pod pritiskom. Nije dovoljno imati uvjerenje. Treba imati vrijeme.",
        ],
      },
      {
        heading: "Stariji novac daje prostor",
        body: [
          "Starost novca pokazuje koliko dugo novac može ostati u vašem sustavu prije nego što mora otići. Ako današnje troškove plaćate novcem koji je stigao prije mjesec dana, imate više prostora nego osoba koja svaki račun čeka s novom uplatom.",
          "Taj prostor mijenja odluke. Lakše je čekati. Lakše je reći ne potrošnji. Lakše je ne prodati Bitcoin zbog troška koji ste mogli predvidjeti. Stariji novac ne uklanja životne probleme, ali smanjuje hitnost.",
          "Mjerite starost novca jednostavno: koliko dana prođe između trenutka kada novac dođe i trenutka kada mora otići. Cilj nije savršen broj, nego postupno povećanje prostora za mirnije odluke.",
        ],
      },
      {
        heading: "Buduća plaćanja moraju biti vidljiva",
        body: [
          "Starost novca ne raste samo tako da trošite manje. Raste kada buduća plaćanja postanu vidljiva. Godišnje osiguranje, veći servis, porez, oprema za posao i obiteljski troškovi trebaju dobiti mjesto prije nego se pojave.",
          "Ako ta plaćanja nisu zapisana, iznenađuju nas svaki put. Tada novac koji ste mislili koristiti za Bitcoin odjednom mora pokriti nešto drugo. Nije problem u Bitcoinu. Problem je u tome što budući novac nije bio imenovan na vrijeme.",
        ],
      },
      {
        heading: "Zašto ovo mijenja Bitcoin odluke",
        body: [
          "Bitcoin traži sposobnost čekanja. Ako svaka uplata odmah mora pokriti nekoliko obveza, teško je čekati. Kupnja može biti prenapeta, prodaja može biti prebrza, a pad kupovne moći može izgledati kao osobna kriza.",
          "Kada novac ima veću starost, Bitcoin odluka ima mirniji temelj. Možete gledati osobni proračun nulte osnove, dug i neto imovinu bez osjećaja da svaka promjena traži hitan potez. Tada osobni Bitcoin standard počinje biti stvaran, a ne samo ideja.",
        ],
      },
      {
        heading: "Kako zapisati prvo pravilo",
        body: [
          "Prvo pravilo može biti jednostavno: dio novca koji ulazi ne diram dok ne pokrije poznata buduća plaćanja. Tek kada su ta plaćanja vidljiva, gledam stvarni višak i Bitcoin odluku. To pravilo stvara vrijeme.",
          "Nije potrebno početi savršeno. Dovoljno je mjeriti koliko dana novac preživi i postupno povećavati taj broj. Svaki dodatni dan smanjuje pritisak. A manji pritisak znači bolje odluke.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako novac nestane čim dođe prvi veći trošak, uvodni razgovor može pomoći vidjeti gdje sustav nema dovoljno vremena.",
  },
  {
    slug: "dca-nije-dovoljan",
    title: "Zašto redovita kupnja nije cijeli sustav?",
    metaDescription:
      "Redovita kupnja može biti korisna navika, ali ne zamjenjuje osobni proračun nulte osnove, stvarni višak, dug, kupovnu moć i pisana pravila.",
    excerpt:
      "Redovita kupnja može smanjiti impulzivnost, ali ne zamjenjuje osobni proračun nulte osnove, stvarni višak i pravila kupovne moći.",
    category: "Osobni proračun nulte osnove",
    difficulty: "Srednje",
    freshness: "stabilno",
    order: 25,
    publishedAt: "2026-04-30",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Znate li zašto je vaš trenutni iznos redovite kupnje baš takav i kada bi se trebao promijeniti?",
    relatedSlugs: [
      "svaki-euro-ima-namjenu",
      "stvarni-visak",
      "uskladivanje-kupovne-moci-bitcoina",
    ],
    sections: [
      {
        heading: "Dobra navika nije cijeli sustav",
        body: [
          "Redovita kupnja Bitcoina može biti korisna. Smanjuje impulzivne odluke i uklanja potrebu da svaki mjesec iznova odlučujete. Ali dobra navika nije isto što i osobni Bitcoin standard. Ona ne zna jeste li u dugu, imate li budući trošak, premalu zalihu ili obiteljsku obvezu.",
          "Ako redovita kupnja stoji odvojeno od proračuna nulte osnove, ona može skrivati problem. Iznos se ponavlja, osjećaj discipline postoji, ali nitko ne provjerava ima li novac stvarno pravo otići u Bitcoin. Automatizam ne smije zamijeniti red.",
        ],
      },
      {
        heading: "Iznos mora imati razlog",
        body: [
          "Ne gledajte samo kupujete li redovito. Važnije je zašto kupujete baš taj iznos. Je li nastao iz stvarnog viška? Je li stanje duga vidljivo? Jesu li buduća plaćanja vidljiva? Je li sigurnosna zaliha dovoljna?",
          "Ako ne možete odgovoriti u jednoj jasnoj rečenici, iznos možda nije pravilo. Možda je navika. Navika može biti korisna, ali bez razloga ne može nositi ozbiljne Bitcoin odluke kroz vrijeme.",
        ],
      },
      {
        heading: "Proračun nulte osnove dolazi prije kupnje",
        body: [
          "Osobni Bitcoin standard počinje osobnim proračunom nulte osnove. Prvo se vidi svaki euro, svaki dug, svako veće buduće plaćanje i svaki dio novčane zalihe. Tek zatim se određuje koliko novca može ići u Bitcoin.",
          "Ovaj redoslijed štiti od dvije pogreške. Prva je kupnja novcem koji već pripada drugoj obvezi. Druga je premala kupnja iz straha, iako stvarni višak postoji. Proračun nulte osnove ne služi zabrani. Služi jasnoći.",
        ],
      },
      {
        heading: "Kupovna moć mijenja pravilo",
        body: [
          "Isti iznos kupnje ne znači isto u svakom trenutku. Troškovi se mijenjaju. Prihodi se mijenjaju. Kupovna moć Bitcoina se mijenja. Zato pravilo redovite kupnje treba povremeno provjeriti.",
          "Provjera ne znači stalno reagirati na cijenu. Znači pitati je li iznos još u skladu s proračunom nulte osnove, stanjem duga, neto imovinom i budućim plaćanjima. Ponekad je dobro nastaviti. Ponekad je bolje čekati. Ponekad je zrelije prvo izaći iz duga.",
        ],
      },
      {
        heading: "Pravilo za promjenu",
        body: [
          "Dobro pravilo kaže kada se kupnja mijenja. Primjerice: nakon novog duga, promjene prihoda, otplate duga, većeg troška ili promjene uloge Bitcoina u neto imovini. Bez tih uvjeta, odluka se mijenja tek kada emocije postanu jake.",
          "Redovita kupnja može ostati dio sustava. Ali ne smije biti sustav. Osobni Bitcoin standard traži da znate kada kupujete, kada čekate i zašto ne dirate novac koji ima drugu namjenu.",
          "Ako ne znate kada bi se iznos redovite kupnje trebao promijeniti, to vrijedi razjasniti u uvodnom razgovoru.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako ne znate kada bi se iznos redovite kupnje trebao promijeniti, to vrijedi razjasniti u uvodnom razgovoru.",
  },
  {
    slug: "dug-je-buduci-novac",
    previousSlugs: ["kredit-je-buduci-novac"],
    title: "Dug je budući novac koji ste već potrošili",
    metaDescription:
      "Vodič o dugu kao budućem novcu koji ste već potrošili, životu bez duga, vremenu provedenom u dugu i zašto dug može odlučivati umjesto vas.",
    excerpt:
      "Dug nije samo financijska stavka. Dug je budući novac koji ste već potrošili i stanje koje oblikuje odluke.",
    category: "Život bez duga",
    difficulty: "Početno",
    freshness: "stabilno",
    order: 30,
    featured: true,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Koliko ćete vremena do kraja života provesti u jednom od ova dva stanja: u dugu ili bez duga?",
    relatedSlugs: [
      "dug-ili-bitcoin",
      "ne-zaduzujte-se-za-bitcoin",
      "davanje-bez-duga",
    ],
    visual: {
      type: "split",
      title: "Dva stanja novca",
      leftLabel: "Život u dugu",
      leftItems: [
        "budući novac",
        "nemir",
        "zbunjenost",
        "osjećaj zarobljenosti",
      ],
      rightLabel: "Život bez duga",
      rightItems: ["prošli novac", "mir", "jasnoća", "sloboda"],
      caption: "Vrijeme zalijeva stanje u kojem živite.",
    },
    sections: [
      {
        heading: "Dug nije samo broj",
        body: [
          "Dug se najčešće promatra matematički: kolika je kamata, kolika je rata, koliko traje otplata i može li se zadržavanje duga isplatiti u usporedbi s nečim drugim. Taj pogled vidi tablicu, ali propušta čovjeka.",
          "Dug nije samo financijska stavka u bilanci. Dug je stanje. Dok dug postoji, dio budućeg rada već je obećan prije nego što je odrađen. Zato dug ne stoji sa strane Bitcoin odluke. On je već u njoj.",
        ],
      },
      {
        heading: "Dva stanja odlučivanja",
        body: [
          "Biti u dugu i biti bez duga nisu samo dvije različite bilance. To su dva različita stanja odlučivanja. Jedno oblikuje osobu kroz pritisak, rokove i obveze. Drugo oblikuje osobu kroz mir, jasnoću i slobodu.",
          "Svako stanje s vremenom raste. Ako ste u dugu, vrijeme često pojačava osjećaj zarobljenosti, nemira i zbunjenosti. Ako ste bez duga, vrijeme jača osjećaj slobode, mira i jasnoće.",
        ],
      },
      {
        heading: "Dubina duga",
        body: [
          "Dubina duga označava odnos između vrijednosti duga i vrijednosti imovine. Plitak dug može izgledati bezazleno. Ako je dug mali u odnosu na imovinu, lako ga je opravdati jer se čini da je sve pod kontrolom.",
          "Ali kada dug postane dublji, mijenja se osjećaj. Na dvadeset, pedeset ili osamdeset posto imovine težina se više ne promatra samo u tablici. Ako dug prijeđe vrijednost imovine, čovjek je pod vodom. Tada se ne radi samo o financijskom pritisku. Odlučivanje postaje sve više pod pritiskom i tražite malo zraka, mira i jasnoće.",
        ],
      },
      {
        heading: "Vrijeme provedeno u dugu",
        body: [
          "Druga dimenzija duga još je važnija: vrijeme provedeno u dugu. Ako na svojoj bilanci imate obvezu prema nekome, nalazite se u stanju duga. Tada pitanje nije samo koliko dugujete, nego koliko dugo to stanje nosite.",
          "Vrijeme pojačava stanje u kojem živite. Petnaest godina plitkog duga može stvoriti snažan osjećaj zarobljenosti, nemira i zbunjenosti. Dva tjedna bez duga je dragocjeno, ali to je tek početak slobode, mira i jasnoće. Treba joj vrijeme i zaštita.",
        ],
      },
      {
        heading: "Zašto dug stvara zbunjenost",
        body: [
          "Dug stvara pogrešno vrednovanje kroz vrijeme. Zaduživanjem kupujete sadašnje dobro budućim novcem. Danas vidite automobil, uređaj, putovanje ili komfor. Ali odluku zapravo donosite o budućem novcu, budućim okolnostima i budućoj verziji sebe.",
          "Budući novac još nemate. Buduće okolnosti ne poznajete. Buduća verzija nas možda neće vrednovati istu stvar jednako. Zato je dug izvor zbunjenosti: sadašnju želju miješa s nepoznatom budućnošću.",
        ],
      },
      {
        heading: "Kako plitak dug postaje dubok dug",
        body: [
          "Opasnost plitkog duga je u tome što izgleda bezazleno. Čovjek godinama nosi malu obvezu, uredno plaća i izvana sve izgleda mirno. Ali sve to vrijeme zalijeva isti korijen.",
          "Kasnije lakše prihvati veći dug jer je stanje duga već postalo normalno. Mala obveza postane veća obveza. Veća obveza postane pritisak. Pritisak postane nemir. A nemir počne tražiti izlaz koji često pogorša situaciju.",
        ],
      },
      {
        heading: "Dug i Bitcoin: opasna kombinacija",
        body: [
          "Bitcoin može biti snažan oblik štednje, ali Bitcoin i dug su opasna kombinacija. Ne zato što je Bitcoin problem, nego zato što stanje duga mijenja vaše odluke.",
          "Kad dug postane težak, čovjek može pokušati istrgovati izlaz iz problema. Umjesto da prihvati težak, ali čistiji put, može početi tražiti brze dobitke, riskirati s Bitcoinom i donositi odluke iz očaja. Dug tada više nije samo financijski teret. On postaje izvor ponašanja koje produbljuje problem.",
        ],
      },
      {
        heading: "Kamata nije glavna stvar",
        body: [
          "Visoka kamata može ubrzati štetu, ali kamata nije glavna stvar. Ponekad je najopasniji dug baš onaj koji možete nositi godinama jer ne boli dovoljno brzo da nas probudi.",
          "Dug koji se čini podnošljivim može polako oblikovati osobu. Što dulje ostajete u stanju duga, to je teže izaći. Ako ne izađete voljno, postoji opasnost da ćete izaći prisilno: kroz prodaju pod pritiskom, likvidaciju, bankrot ili veliki životni lom.",
        ],
      },
      {
        heading: "Stanje bez duga",
        body: [
          "Stanje bez duga znači da kupujete samo novcem koji već imate. Ne trošite budući novac. Ne obećavate budući rad sadašnjoj želji. Vaše odluke više ne dolaze iz pritiska obveze prema nekome drugome.",
          "Desetljeća bez duga stvaraju duboko ukorijenjen osjećaj slobode, mira i jasnoće. Takva osoba ima veći kapacitet za razuman rizik jer ne riskira iz očaja. Ima veću slobodu jer nikome ne duguje.",
        ],
      },
      {
        heading: "Praktičan zaključak",
        body: [
          "Zato je cilj jednostavan: izađite iz duga što je brže moguće i ostanite bez duga zauvijek. Ne trošite budući novac. Kupujte samo novcem koji već imate.",
          "Ako ste u dugu, prihvatite težak, ali čistiji put: smanjite standard, prodajte što treba prodati, likvidirajte dio imovine ako je potrebno i očistite bilancu. To može boljeti kratkoročno, ali vraća zrak, mir i jasnoću.",
          "Kad postanete bez duga, tek tada gradite pravi temelj za sljedeću praksu: davanje. Nakon što se smanji osjećaj zarobljenosti, nemira i zbunjenosti, možete početi graditi velikodušnost.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako dug utječe na vaše Bitcoin odluke, uvodni razgovor može pomoći da ga stavimo u jasnu sliku.",
  },
  {
    slug: "dug-ili-bitcoin",
    previousSlugs: ["kredit-ili-bitcoin"],
    title: "Dug ili Bitcoin?",
    metaDescription:
      "Vodič o tome zašto se odluka između duga i Bitcoina ne donosi samo matematički, nego iz stanja mira, jasnoće i slobode.",
    excerpt:
      "Ne odlučujete između duga i Bitcoina samo matematički. Odlučujete između dva stanja.",
    category: "Život bez duga",
    difficulty: "Srednje",
    freshness: "stabilno",
    order: 35,
    publishedAt: "2026-04-30",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Je li vaša Bitcoin odluka donesena iz mira i jasnoće ili iz pritiska duga?",
    relatedSlugs: [
      "dug-je-buduci-novac",
      "ne-zaduzujte-se-za-bitcoin",
      "stvarni-visak",
    ],
    sections: [
      {
        heading: "Pogrešno pitanje",
        body: [
          "Pogrešno pitanje glasi: je li kamata na dug niža od moguće buduće kupovne moći Bitcoina? Takav matematički pogled propušta stanje osobe koja odlučuje.",
          "Ne odlučujete između duga i Bitcoina samo matematički. Odlučujete između dva stanja. Dug povećava nemir i skraćuje vrijeme za odluku. Bitcoin traži mir, vrijeme i jasnoću.",
        ],
      },
      {
        heading: "Bitcoin traži sposobnost čekanja",
        body: [
          "Bitcoin može biti snažan oblik štednje, ali štednja traži sposobnost čekanja. Čekanje traži mir. Dug smanjuje mir, skraćuje vremenski horizont i čini svaku promjenu kupovne moći osobnijom nego što treba biti.",
          "Ako odluku donosite iz stanja duga, pitanje više nije samo što mislite o Bitcoinu. Pitanje je koliko dugo možete nositi obvezu, rok i nemir bez očajnih poteza.",
        ],
      },
      {
        heading: "Dug može natjerati prodaju",
        body: [
          "Rata ne čeka. Obveza ne pita za cijenu Bitcoina. Ako dug postoji, on može natjerati prodaju u trenutku kada biste inače čekali.",
          "Tada ne prodajete zato što je to mirna odluka. Prodajete zato što budući novac koji ste već potrošili sada traži naplatu. Dug sužava izbor prije nego što odluka postane mirna.",
        ],
      },
      {
        heading: "Ne pokušavajte istrgovati izlaz",
        body: [
          "Najopasniji trenutak dolazi kada čovjek pokuša istrgovati izlaz iz duga. Tada Bitcoin više nije novac koji se drži iz mira, nego sredstvo očajnog spašavanja bilance.",
          "Ne koristite Bitcoin za panično popravljanje stanja duga. Ne tražite brzi izlaz kroz trgovanje. Ako je dug postao težak, problem treba riješiti u bilanci, proračunu nulte osnove i životnom standardu.",
        ],
      },
      {
        heading: "Težak, ali čistiji put",
        body: [
          "Težak, ali čistiji put može biti smanjiti standard, prodati što treba prodati, očistiti bilancu i vratiti zrak, mir i jasnoću. Nije ugodno, ali vraća odluke iz očaja u red.",
          "Pravilo je jednostavno: ako dug stvara nemir, prvo dug. Bitcoin standard počinje kada ne trošite budući novac. Nakon izlaska iz duga Bitcoin odluke postaju mirnije jer više ne pokušavate spasiti sadašnjost budućim novcem.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako imate dug i niste sigurni treba li prvo čistiti bilancu ili nastaviti s Bitcoinom, to vrijedi razjasniti u uvodnom razgovoru.",
  },
  {
    slug: "ne-zaduzujte-se-za-bitcoin",
    previousSlugs: ["ne-uzimajte-kredit-za-bitcoin"],
    title: "Ne zadužujte se za Bitcoin",
    metaDescription:
      "Zašto kupnja Bitcoina budućim novcem nije Bitcoin standard, nego fiat ponašanje primijenjeno na Bitcoin.",
    excerpt:
      "Zadužiti se za Bitcoin znači pokušati kupiti novac budućim novcem. To nije Bitcoin standard.",
    category: "Život bez duga",
    difficulty: "Srednje",
    freshness: "stabilno",
    order: 40,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Pokušavate li kupiti Bitcoin novcem koji još niste zaradili?",
    relatedSlugs: ["dug-je-buduci-novac", "dug-ili-bitcoin", "stvarni-visak"],
    visual: {
      type: "split",
      title: "Dva puta prema Bitcoinu",
      leftLabel: "Dug",
      leftItems: ["obveza", "pritisak", "prisilna odluka"],
      rightLabel: "Stvarni višak",
      rightItems: ["sloboda", "pravilo", "mirno čekanje"],
      caption: "Bitcoin kupujete iz stvarnog viška, ne iz budućeg novca.",
    },
    sections: [
      {
        heading: "Bitcoin nije opravdanje za dug",
        body: [
          "Zadužiti se za Bitcoin znači pokušati kupiti novac budućim novcem. To nije Bitcoin standard, nego fiat ponašanje primijenjeno na Bitcoin.",
          "Bitcoin nije opravdanje za dug. Ako se pravilo slomi zato što vjerujete u buduću cijenu, tada Bitcoin više nije novac u sustavu. Postaje razlog za trošenje novca koji još niste zaradili.",
        ],
      },
      {
        heading: "Ne kupujte novac budućim novcem",
        body: [
          "Ne trošite budući novac, čak ni za Bitcoin. Bitcoin traži mir, vrijeme i jasnoću. Dug traži rok, naplatu i odluke pod pritiskom.",
          "Kupnja Bitcoina iz stvarnog viška ima drukčiji karakter. Ako cijena padne, možete čekati. Ako kupujete iz duga, čekanje ima mjesečnu cijenu koja se javlja bez obzira na vaše uvjerenje.",
        ],
      },
      {
        heading: "Dug mijenja vaše odluke",
        body: [
          "Ne zato što je Bitcoin problem, nego zato što stanje duga mijenja vaše odluke. Dug pojačava nemir, osjećaj zarobljenosti i zbunjenost. Kada se to stanje spoji s promjenjivom kupovnom moći Bitcoina, odluke lako postanu očajne.",
          "Tada se više ne pitate što je ispravno pravilo, nego što će nas izvući do sljedeće rate. Umjesto slobode dobivate pritisak obučen u Bitcoin jezik.",
        ],
      },
      {
        heading: "Volatilnost i dug proizvode očaj",
        body: [
          "Promjenjiva kupovna moć Bitcoina sama po sebi traži strpljenje. Dug joj dodaje sat koji otkucava. Ako cijena padne, rata ostaje. Ako prihod kasni, obveza ostaje. Ako se pojavi trošak, dug ostaje.",
          "Zato volatilnost i dug proizvode očaj. Osoba počinje tražiti brze dobitke, pokušava pogoditi kretanje i gubi sposobnost mirnog čekanja.",
        ],
      },
      {
        heading: "Ne pokušavajte istrgovati izlaz",
        body: [
          "Ne pokušavajte istrgovati izlaz iz duga. Ne koristite Bitcoin kao očajno spašavanje bilance. Ako dug stvara pritisak, potreban je plan izlaska iz stanja duga, a ne veća oklada.",
          "Ako već imate dug i Bitcoin, to ne znači da je odgovor automatski prodati sve. Znači da dug mora biti vidljiv u odluci.",
          "Pravilo je kratko: Bitcoin kupujete iz stvarnog viška, ne iz budućeg novca. Ako želite više Bitcoina, prvo smanjite troškove, povećajte prihode, očistite bilancu i prestanite trošiti budući novac.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako već imate dug i Bitcoin, odgovor nije uvijek automatski isti. Uvodni razgovor može pomoći da dug bude vidljiv u odluci.",
  },
  {
    slug: "davanje-u-proracunu-nulte-osnove",
    previousSlugs: [
      "sustavno-davanje-u-proracunu-nulte-razine",
      "davanje-u-proracunu",
    ],
    title: "Davanje mijenja vaš odnos prema novcu",
    metaDescription:
      "Vodič o davanju u osobnom Bitcoin standardu: bez očekivanja povrata, nakon izlaska iz duga i iz uređenog proračuna nulte osnove.",
    excerpt:
      "Davanje nije ostatak novca niti moralni pritisak. U osobnom Bitcoin standardu ono dolazi nakon reda i izlaska iz duga.",
    category: "Davanje",
    difficulty: "Početno",
    freshness: "stabilno",
    order: 50,
    featured: true,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Imate li u osobnom proračunu nulte osnove prostor za davanje koje ne očekuje ništa natrag?",
    relatedSlugs: [
      "davanje-bez-duga",
      "novac-dolazi-od-ljudi",
      "svaki-euro-ima-namjenu",
    ],
    visual: {
      type: "cycle",
      title: "Krug davanja",
      nodes: ["ljudi", "vrijednost", "prihod", "davanje"],
      center: "velikodušnost",
      caption: "Davanje nas vraća ljudima, a novac dolazi od ljudi.",
    },
    sections: [
      {
        heading: "Davanje nije ostatak",
        body: [
          "Davanje nije ono što se dogodi ako nešto slučajno ostane. Ako je samo ostatak, tada ovisi o raspoloženju, krivnji ili pritisku trenutka. Jedan mjesec postoji, drugi mjesec nestane. Nema pravilo i nema mir.",
          "Ne radi se o dokazivanju dobrote novcem. Ova praksa ima smisla tek kada proračun i dug ne stvaraju pritisak.",
          "U osobnom Bitcoin standardu davanje dobiva mjesto u osobnom proračunu nulte osnove. Ne zato da bi netko dokazao dobrotu, nego zato da novac prestane biti nejasan. Svaki euro treba namjenu. Dio novca, kada je temelj uređen, može dobiti namjenu za druge ljude.",
        ],
      },
      {
        heading: "Davanje dolazi nakon izlaska iz duga",
        body: [
          "Dug stvara pritisak. Dug traži buduća plaćanja. Dug može učiniti da i dobra odluka postane izvor nemira. Zato davanje u ovom okviru ne smije usporiti izlazak iz duga niti prikriti neuređen proračun nulte osnove.",
          "Redoslijed je važan. Prvo osobni proračun nulte osnove. Zatim život bez duga. Tek tada redovito davanje. Osoba u dugu i dalje može pomoći nekome, ali davanje kao praksa osobnog Bitcoin standarda dolazi iz reda i slobode, a ne iz pritiska.",
        ],
      },
      {
        heading: "Bez očekivanja povrata",
        body: [
          "Ako očekujete povrat, ne govorimo više o davanju, nego o dogovoru, razmjeni ili skrivenoj obvezi. Davanje u ovom okviru ne traži da primatelj vrati uslugu, zahvalnost, naklonost ili buduću korist.",
          "To čuva dostojanstvo primatelja. Dar ne smije postati nevidljiv dug. Ako poklon stvara obvezu, više nije čist dar. Zato pravilo mora biti jasno: darujem bez očekivanja povrata i bez stvaranja pritiska na osobu koja prima.",
        ],
      },
      {
        heading: "Davanje nas okreće prema ljudima",
        body: [
          "Davanje nije zato što ste nešto uzeli od društva. Pošteno zarađen novac već znači da ste nekome pružili vrijednost. Netko je dobrovoljno dao svoj novac jer je ono što ste ponudili bilo vrijedno.",
          "Davanje zato ima drukčiju ulogu. Ono nas okreće izvan sebe. Podsjeća da novac nije samo obrana od straha, nego i način odnosa prema ljudima. Kada dio proračuna nulte osnove dobije namjenu za druge, novac postaje manje zatvoren i više usmjeren na služenje.",
        ],
      },
      {
        heading: "Velikodušnost mijenja način rada",
        body: [
          "Velikodušna osoba lakše sluša. Lakše vidi što drugoj osobi stvarno treba. Lakše prima povratnu informaciju, pregovara bez sitničavosti i gradi odnose koji traju. To ne jamči veći prihod. Ali povećava sposobnost stvaranja vrijednosti.",
          "Zato davanje nije sporedna stavka proračuna nulte osnove. Ono vježba smjer iz kojeg dolazi pošten prihod: prema ljudima, njihovim problemima i vrijednosti koju možete stvoriti. Bolji novac ne bi smio čovjeka učiniti tvrđim. Trebao bi mu dati više reda i više slobode za velikodušnost.",
        ],
      },
      {
        heading: "Prvo pravilo davanja",
        body: [
          "Pravilo može biti jednostavno: kada osobni proračun nulte osnove ima red i dug više ne stvara pritisak, dio novca dobiva namjenu za davanje bez očekivanja povrata. Ne iz krivnje. Ne zbog povrata. Nego zato što novac treba služiti i drugima.",
          "Manji i češći darovi često su bolji od velikih i rijetkih. Lakše ih je održati, manje stvaraju pritisak i više nalikuju praksi. Cilj nije dokazati veličinu dara. Cilj je vježbati velikodušnost bez novog duga, bez skrivenih očekivanja i bez narušavanja proračuna nulte osnove.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako vam davanje zvuči važno, ali ne znate kako ga uklopiti bez pritiska, to je dobar razlog za razgovor.",
  },
  {
    slug: "davanje-bez-duga",
    previousSlugs: ["sustavno-davanje-bez-kredita"],
    title: "Davanje bez duga",
    metaDescription:
      "Vodič o tome zašto davanje u osobnom Bitcoin standardu dolazi nakon osobnog proračuna nulte osnove i izlaska iz duga.",
    excerpt:
      "Kad se smanji osjećaj zarobljenosti, nemira i zbunjenosti, možete graditi praksu velikodušnosti.",
    category: "Davanje",
    difficulty: "Početno",
    freshness: "stabilno",
    order: 55,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Pokušavate li graditi velikodušnost dok dug još stvara osjećaj zarobljenosti, nemira i zbunjenosti?",
    relatedSlugs: [
      "davanje-u-proracunu-nulte-osnove",
      "novac-dolazi-od-ljudi",
      "dug-je-buduci-novac",
    ],
    visual: {
      type: "sequence",
      title: "Redoslijed je važan",
      steps: ["red", "bez duga", "davanje"],
      caption: "Davanje ne dolazi iz pritiska, nego iz slobode.",
    },
    sections: [
      {
        heading: "Davanje ne dolazi iz stanja duga",
        body: [
          "Davanje ne dolazi iz stanja duga kao pravilo ovog okvira. Dug često pojačava osjećaj zarobljenosti, nemira i zbunjenosti. Davanje treba graditi drukčiji smjer: velikodušnost, slobodu i otvorenost prema ljudima.",
          "Ovdje ne govorimo o tome da osoba u dugu nikada ne smije nikome pomoći. Govorimo o redovitoj proračunskoj praksi davanja kao dijelu osobnog Bitcoin standarda. Ta praksa treba počivati na redu, ne na pritisku.",
          "Ako darujete dok još živite u stanju duga, dar lako postane novi izvor pritiska. Umjesto mira pojavljuje se otpor. Umjesto velikodušnosti pojavljuje se krivnja. Zato je redoslijed važan.",
        ],
      },
      {
        heading: "Prvo sloboda, mir i jasnoća",
        body: [
          "Nakon izlaska iz duga stanje bez duga je mlada biljka. Treba joj vrijeme, voda i zaštita. Ne treba je odmah opteretiti novom praksom koja će vratiti nemir.",
          "Prvo prestajete trošiti budući novac. Prvo čistite bilancu. Prvo vraćate zrak, mir i jasnoću. Tek tada davanje može postati praksa koja raste iz slobode.",
        ],
      },
      {
        heading: "Tek tada velikodušnost",
        body: [
          "Kad postanete bez duga, tek tada gradite pravi temelj za sljedeću praksu: davanje. Nakon što se smanji osjećaj zarobljenosti, nemira i zbunjenosti, možete početi graditi velikodušnost.",
          "Davanje dolazi nakon što prestanete trošiti budući novac. Tada nije bijeg od krivnje, nije dokazivanje i nije pokušaj popravljanja osjećaja. Postaje praksa odnosa prema ljudima.",
        ],
      },
      {
        heading: "Davanje nije dug",
        body: [
          "Davanje nije dug, skriveni dogovor ni način da kod primatelja stvorite obvezu. Ako očekujete povrat, više ne darujete. Tada stvarate račun.",
          "Dar je dar samo ako ne traži povrat i ne stvara pritisak. To čuva dostojanstvo primatelja i čuva vaš odnos prema novcu.",
        ],
      },
      {
        heading: "Prvi mali dar",
        body: [
          "Kada se temelj uredi, početak može biti malen. To je često i bolje: velikodušnost se ne mora dokazivati veličinom. Često je bolje darivati manje i češće nego rijetko napraviti veliki potez koji optereti proračun nulte osnove.",
          "Prvi mali dar uči nas primijetiti osobu, potrebu i trenutak. Uči nas dati bez unutarnjeg računa. Uči nas da novac ima ljudsku stranu. Više je vježba nego predstava.",
        ],
      },
      {
        heading: "Praktično pravilo",
        body: [
          "Zapišite pravilo: davanje ne smije stvarati novi dug, ne smije usporiti izlazak iz starog duga i ne smije očekivati povrat. Ako to pravilo nije zadovoljeno, davanje čeka.",
          "To možda zvuči strogo, ali čuva velikodušnost. Davanje koje počiva na dugu lako postane gorčina. Davanje koje počiva na redu može trajati. Prvo sloboda. Zatim velikodušnost. Tek tada davanje postaje dio osobnog Bitcoin standarda.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako želite pomagati drugima, ali dug još stvara pritisak, razgovor može pomoći razlikovati spontanu pomoć od stalne proračunske prakse.",
  },
  {
    slug: "novac-dolazi-od-ljudi",
    title: "Novac dolazi od ljudi",
    metaDescription:
      "Vodič o tome kako davanje, odnosi s ljudima i stvaranje vrijednosti povećavaju sposobnost za budući prihod.",
    excerpt:
      "Prihod ne dolazi iz apstraktnog sustava. Prihod dolazi od ljudi kojima ste pružili vrijednost.",
    category: "Davanje",
    difficulty: "Početno",
    freshness: "stabilno",
    order: 57,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion: "Kome vaš rad danas stvarno pomaže?",
    relatedSlugs: [
      "davanje-u-proracunu-nulte-osnove",
      "davanje-bez-duga",
      "pozitivni-neto-priljev",
    ],
    visual: {
      type: "network",
      title: "Novac dolazi od ljudi",
      center: "vrijednost",
      nodes: ["kupac", "klijent", "poslodavac", "obitelj", "zajednica"],
      caption: "Novac dolazi kroz dobrovoljnu razmjenu s ljudima.",
    },
    sections: [
      {
        heading: "Novac nije odvojen od ljudi",
        body: [
          "Novac ne dolazi iz magle, aplikacije ili apstraktnog sustava. U stvarnom životu dolazi kroz dobrovoljnu razmjenu s ljudima. Netko vidi vrijednost u onome što nudite i odluči dati svoj novac jer ono što prima vrijedi više od novca koji predaje.",
          "Misao je jednostavna, ali važna. Kada gledate samo saldo, lako zaboravite da iza svakog eura koji ulazi postoji osoba, obitelj, kupac, klijent ili zajednica. Osobni Bitcoin standard zato ne zatvara čovjeka u stanje na računu. Vraća ga pitanju: kome stvaram vrijednost?",
        ],
      },
      {
        heading: "Prihod je potvrda vrijednosti",
        body: [
          "Pošten prihod nije dokaz da ste nekome nešto uzeli. On je potvrda da ste nekome pružili vrijednost. Druga osoba mogla je zadržati svoj novac. Nije morala platiti. Platila je zato što je procijenila da joj ono što dobiva pomaže više od novca koji daje.",
          "Zato odnos prema prihodu ne treba počivati na krivnji. Treba počivati na odgovornosti. Ako novac dolazi od ljudi, tada veća sposobnost stvaranja prihoda traži veću sposobnost služenja ljudima: bolje slušanje, jasniji rad, pošteniju isporuku i manje očaja u razgovorima.",
        ],
      },
      {
        heading: "Davanje nije vraćanje duga društvu",
        body: [
          "Davanje ne treba opisivati kao vraćanje društvu. Pošteno zarađen novac već znači da ste nekome pružili vrijednost u dobrovoljnoj razmjeni. Niste prvo nešto uzeli pa sada morate vratiti. To stvara pogrešan ton i pretvara davanje u moralni račun.",
          "Davanje ima drukčiju ulogu. Ono je praksa kojom želite postati osoba koja može stvarati više vrijednosti. Davanje ne kupuje povrat. Davanje gradi osobu koja može stvoriti veći povrat. Bez jamstva, bez potraživanja i bez pritiska na onoga tko prima.",
        ],
      },
      {
        heading: "Davanje širi pogled",
        body: [
          "Kada je sav novac zatvoren u vlastiti strah, pogled se sužava. Vidite samo svoje račune, svoje ciljeve i svoje rizike. To je razumljivo, posebno ako postoji dug ili neuređen proračun nulte osnove. Ali dugoročno takav pogled slabi sposobnost stvaranja vrijednosti.",
          "Redovito davanje, nakon reda i izlaska iz duga, širi pogled. Uči nas primijetiti ljude, potrebe i male prilike za služenje. Ne zato da biste odmah nešto dobili natrag, nego zato da novac ne postane zid između nas i stvarnog svijeta.",
        ],
      },
      {
        heading: "Velikodušnost mijenja razgovore",
        body: [
          "Velikodušna osoba ulazi u poslovne i ljudske razgovore drukčije. Manje očajno. Više otvoreno. Lakše sluša. Lakše prima primjedbu. Lakše pregovara jer ne mora iz svakog razgovora izvući najviše za sebe u tom trenutku.",
          "To ne znači da velikodušnost jamči veći prihod. Ne jamči. Ali povećava kapacitet za stvaranje vrijednosti. Ljudi lakše vjeruju osobi koja nije stisnuta oko svakog eura i svakog ustupka. A novac, kada dolazi pošteno, dolazi od ljudi kojima ste pomogli.",
        ],
      },
      {
        heading: "Bitcoin standard nije bijeg od ljudi",
        body: [
          "Bitcoin kao novac ne znači povlačenje iz svijeta. Ne znači da se čovjek zatvara u hladno čuvanje kupovne moći i prestaje gledati ljude. Dobar novac treba dati više jasnoće, više strpljenja i više slobode za stvaranje vrijednosti u svijetu.",
          "Bitcoin standard nije bijeg u novčanik. Ako je Bitcoin bolji novac, trebao bi vam pomoći da jasnije služite ljudima, ne da se od njih zatvorite.",
          "Zato davanje ima mjesto u osobnom Bitcoin standardu. Prvo red. Zatim izlazak iz duga. Tek tada davanje. Ne kao predstava, ne kao krivnja i ne kao ulaganje s očekivanim povratom. Kao praksa koja nas vraća ljudima od kojih novac i dolazi.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako želite da Bitcoin standard ne zatvori odnos prema ljudima, nego ga učini jasnijim, to je pitanje koje ne treba ostati samo u glavi.",
  },
  {
    slug: "niste-zakasnili-u-bitcoin",
    title: "Niste zakasnili u Bitcoin",
    seoTitle: "Niste zakasnili u Bitcoin",
    metaDescription:
      "Prije deset godina Bitcoin je bio jeftiniji u državnom novcu, ali je razumijevanje bilo skuplje u vremenu. Danas je lakše doći do jasnog okvira za odluku i primjenu.",
    excerpt:
      "Bitcoin je prije bio jeftiniji, ali je razumijevanje bilo skuplje. Danas je lakše doći do jasnog okvira za odluku, proračun, dug, sigurnost i ulogu Bitcoina u imovini.",
    category: "Bitcoin kao novac",
    difficulty: "Početno",
    freshness: "stabilno",
    order: 58,
    publishedAt: "2026-05-13",
    updatedAt: "2026-05-13",
    practicalQuestion:
      "Gledate li samo cijenu koju ste propustili ili i cijenu razumijevanja koju danas možete skratiti?",
    relatedSlugs: [
      "bitcoin-kao-novac",
      "dca-nije-dovoljan",
      "uskladivanje-kupovne-moci-bitcoina",
      "svaki-euro-ima-namjenu",
    ],
    visual: {
      type: "split",
      title: "Cijena i razumijevanje",
      leftLabel: "Prije",
      leftItems: [
        "niža cijena",
        "manje signala",
        "više šuma",
        "dulji put do razumijevanja",
      ],
      rightLabel: "Danas",
      rightItems: [
        "više materijala",
        "više iskustva",
        "jasniji okvir",
        "brža primjena",
      ],
      caption:
        "Ranije nije značilo nužno lakše. Cijena je bila niža, ali je razumijevanje bilo skuplje.",
    },
    sections: [
      {
        heading: "Niža cijena nije isto što i bolji trenutak",
        body: [
          "Jedna od najčešćih rečenica koju ljudi izgovore kada počnu ozbiljnije gledati Bitcoin glasi: “Da sam barem ušao ranije.” Na prvi pogled, ta rečenica zvuči razumno. Bitcoin je nekada vrijedio nekoliko dolara, zatim nekoliko stotina dolara, zatim nekoliko tisuća dolara. Tko danas gleda povijesni graf, lako može steći dojam da je pravi trenutak već prošao.",
          "Ali taj pogled propušta najvažniji dio priče. Kada sam prvi put kupio Bitcoin u srpnju 2014., cijena je bila oko 600 dolara po Bitcoinu. Kupio sam oko 20 dolara vrijednosti Bitcoina, više kao pokus nego kao ozbiljan financijski korak. Cijena je bila niska, ali moje razumijevanje nije bilo dovoljno za veliku odluku.",
          "Nije dovoljno da je cijena niska. Trebate znati što radite, zašto to radite, koliko rizika preuzimate, što očekujete i što ćete napraviti ako cijena snažno poraste ili snažno padne. Niska cijena bez razumijevanja često ne vodi do dobre odluke. Vodi do pokusa, zaborava, panike, prerane prodaje ili potpunog odustajanja.",
        ],
      },
      {
        heading: "Prije je signal bio slabiji",
        body: [
          "Godine 2014. nije bilo ni približno toliko kvalitetnog Bitcoin sadržaja kao danas. Bilo je manje knjiga, manje dobrih razgovora, manje jasnih objašnjenja i manje ljudi koji su prošli više ciklusa. Netko tko je tada htio doći do ozbiljnog razumijevanja morao je sam prolaziti kroz mnogo šuma.",
          "Godine 2017. šuma je bilo još više: altcoini, ICO-ovi, kratke priče o brzom bogaćenju i stalno miješanje Bitcoina s ostatkom digitalne imovine. Tek nakon toga, osobito od 2018., počeo se jasnije razvijati Bitcoin-only signal kroz knjige, podcaste i ozbiljnije razgovore.",
          "Danas je situacija drukčija. Bitcoin je zreliji. Materijala ima više. Iskustva ima više. Puno toga što je prije bilo nejasno danas se može objasniti brže, jednostavnije i praktičnije. Ranije je cijena bila niža, ali je put do razumijevanja bio skuplji.",
        ],
      },
      {
        heading: "Razumijevanje ima svoju cijenu",
        body: [
          "Informacije o Bitcoinu često su besplatne. Možete čitati knjige, slušati podcaste, gledati predavanja i razgovarati s ljudima. Ali to ne znači da je put besplatan. Plaćate ga vremenom.",
          "Ako trebate stotine sati da razdvojite signal od šuma, taj put ima cijenu. Ako godinama odgađate odluku jer još niste sigurni, i to ima cijenu. Ako napravite pogrešne korake jer niste imali redoslijed, i to ima cijenu.",
          "Zato pitanje “zašto bih platio razgovor ako mogu sam učiti” nije potpuno. Bolje pitanje glasi: koliko me košta da do istog stupnja jasnoće dođem sam? Za nekoga tko ima ozbiljan posao, obitelj, imovinu, obveze ili firmu, vrijeme nije neograničeno.",
        ],
      },
      {
        heading: "Ne morate postati Bitcoin stručnjak za sve",
        body: [
          "Kod Bitcoina postoji česta pogreška: ljudi misle da moraju razumjeti sve prije nego što ga mogu koristiti. Ne moraju.",
          "Da biste vozili auto, ne morate biti automobilski inženjer. Ne morate znati projektirati motor, proizvoditi gume ili popravljati elektroniku. Trebate znati kako sigurno koristiti auto: kako krenuti, kočiti, skretati, gledati retrovizore i doći od točke A do točke B.",
          "Slično vrijedi i za mobitel. Milijarde ljudi koriste mobitele svaki dan, a vrlo mali broj njih može objasniti kako rade čipovi, antene, operativni sustav i proizvodni lanac. To ih ne sprječava da imaju veliku korist od tehnologije.",
          "S Bitcoinom je slično. Dobro je razumjeti osnovnu Bitcoin tezu. Dobro je razumjeti zašto novac postoji, zašto državni novac gubi kupovnu moć, zašto je Bitcoin ograničen i zašto se privatni ključevi ne dijele. Ali ne morate postati stručnjak za svaki dio Bitcoin sustava. Trebate znati dovoljno da ga koristite mudro.",
        ],
      },
      {
        heading: "Važnije pitanje: što ćete napraviti s Bitcoinom?",
        body: [
          "Najvažnije pitanje nije koliko duboko možete objasniti svaki tehnički dio Bitcoina. Najvažnije pitanje je: što ćete napraviti s Bitcoinom u vlastitom životu?",
          "Hoće li Bitcoin biti samo imovina koju držite sa strane? Hoće li postati dio vaše novčane zalihe? Koliko državnog novca trebate ostaviti za kratke potrebe? Imate li dug? Vodite li proračun? Znate li što je stvarni višak? Kako ćete reagirati ako kupovna moć Bitcoina padne? Što ćete napraviti ako snažno poraste? Kako je Bitcoin uklopljen u vašu neto imovinu? Zna li obitelj što smije i što ne smije napraviti?",
          "To su praktična pitanja. Ona često imaju veću vrijednost od dodatnih sati teorijskog proučavanja. Možete imati veliko tehničko razumijevanje Bitcoina, a svejedno donositi loše osobne odluke. Možete razumjeti proof of work, ali ne voditi proračun. Možete znati objasniti rudarenje, ali imati dug koji vas prisiljava na prodaju u lošem trenutku.",
        ],
        link: {
          before: "Za početak osobnog okvira pročitajte vodič ",
          label: "Svaki euro ima namjenu",
          href: "/vodici/svaki-euro-ima-namjenu/",
          after: ".",
        },
      },
      {
        heading: "Prvo red, zatim Bitcoin kao novac",
        body: [
          "U autoškoli ne počinjete s dubokom teorijom motora. Prvo učite kako se auto koristi. Gdje je kočnica. Kako se kreće. Kako se gleda mrtvi kut. Kako se ulazi u promet. Kako se sigurno zaustavlja.",
          "Slično je i s Bitcoinom kao novcem. Na početku morate svjesno urediti osnovne stvari: proračun, dug, stvarni višak, buduća plaćanja, sigurnost i pravila za obitelj. Možda se čini da to nema izravne veze s Bitcoinom, ali ima. Bez toga Bitcoinova volatilnost može pojačati nered koji već postoji.",
          "Ako ne znate koji novac ima koju namjenu, ne znate ni koji novac stvarno može postati Bitcoin. Ako imate dug, dio vaše budućnosti već je potrošen. Ako obitelj ne zna što ne smije napraviti sa seed phrase, sigurnost ovisi o sreći. Ako ne znate što ćete napraviti pri velikom rastu ili padu, cijena će voditi odluku umjesto pravila.",
          "Zato je redoslijed važan: prvo proračun, zatim izlazak iz duga, zatim davanje, zatim Bitcoin kao novac, neto imovina, volatilnost, sigurnost i obitelj.",
        ],
        link: {
          before: "Kada dođete do pitanja uloge Bitcoina, nastavite s vodičem ",
          label: "Bitcoin je novac",
          href: "/vodici/bitcoin-kao-novac/",
          after: ".",
        },
      },
      {
        heading: "Danas je lakše početi nego prije",
        body: [
          "Netko tko danas ulazi u Bitcoin ima prednost koju raniji korisnici nisu imali. Ne mora sam prolaziti kroz isti kaos. Ne mora godinama skupljati fragmente. Ne mora ponavljati sve pogreške. Ne mora postati stručnjak za svaku tehničku i industrijsku granu Bitcoina.",
          "Može krenuti jasnije. Može naučiti osnovnu Bitcoin tezu, razumjeti zašto je Bitcoin novac u procesu monetizacije, vidjeti zašto je volatilnost prirodan dio tog procesa i naučiti kako ga uklopiti u vlastiti proračun, dug, neto imovinu i sigurnosni plan.",
          "Bitcoin savjetovanje nije zamjena za učenje. Nije ni prečac kojim se preskače odgovornost. Ono je skraćivanje puta između pitanja i primjene. Cilj nije da izađete iz razgovora kao Bitcoin stručnjak za sve. Cilj je da izađete s jasnijim sljedećim korakom.",
        ],
      },
      {
        heading: "Zaključak",
        body: [
          "Niste zakasnili u Bitcoin samo zato što je cijena danas viša nego što je bila prije deset godina. Prije je cijena bila niža, ali je razumijevanje bilo skuplje. Danas je cijena viša, ali je put do jasnog okvira kraći. To je važna razlika.",
          "Bitcoin nije samo nešto što treba razumjeti. Bitcoin je novac koji treba znati uklopiti u vlastiti život. Ne morate znati sve. Ali trebate znati dovoljno da donesete mirnije odluke o novcu, dugu, imovini, sigurnosti i obitelji.",
          "Ako imate jedno stvarno Bitcoin pitanje koje utječe na odluku, to je dovoljno dobar početak.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako imate osjećaj da ste zakasnili u Bitcoin, uvodni razgovor može pomoći razjasniti što danas stvarno trebate napraviti.",
  },
  {
    slug: "bitcoin-nije-kripto-portfelj",
    title: "Bitcoin nije kripto portfelj",
    seoTitle: "Bitcoin nije kripto portfelj",
    metaDescription:
      "Bitcoin u ovom okviru tretiramo kao novac. Sve ostalo, ako se uopće razmatra, treba promatrati kao rizičnu investiciju koja mora ostvariti pozitivan povrat u Bitcoinu.",
    excerpt:
      "Bitcoin nije jedna stavka u kripto portfelju. U osobnom Bitcoin standardu Bitcoin je novac, a sve ostalo je eventualno rizična investicija s vlastitim troškom, rizikom i mjerilom povrata u Bitcoinu.",
    category: "Bitcoin kao novac",
    difficulty: "Početno",
    freshness: "stabilno",
    order: 59,
    publishedAt: "2026-05-13",
    updatedAt: "2026-05-13",
    practicalQuestion:
      "Mjerite li druge kriptovalute u eurima ili u Bitcoinu koji ste mogli zadržati?",
    relatedSlugs: [
      "bitcoin-kao-novac",
      "niste-zakasnili-u-bitcoin",
      "novac-kapital-potrosnja",
      "bitcoin-u-neto-imovini",
      "pravilo-trecina",
      "dca-nije-dovoljan",
    ],
    visual: {
      type: "split",
      title: "Novac i investicija",
      leftLabel: "Bitcoin kao novac",
      leftItems: [
        "novčana zaliha",
        "mjerilo povrata",
        "dugoročna teza o novcu",
        "pravila koja se teško mijenjaju",
      ],
      rightLabel: "Kriptovalute kao investicija",
      rightItems: [
        "veći specifični rizik",
        "potreba za tezom ulaska i izlaska",
        "oportunitetni trošak proučavanja",
        "povrat se mora mjeriti u Bitcoinu",
      ],
      caption:
        "Ako Bitcoin tretirate kao novac, tada se i sve druge investicije moraju mjeriti u Bitcoinu.",
    },
    sections: [
      {
        heading: "Najčešće pitanje: što je s ostalim kriptovalutama?",
        body: [
          "Jedno od čestih pitanja u Bitcoin razgovorima glasi: “Razumijem Bitcoin, ali što je s ostalim kriptovalutama?” Pitanje je razumljivo. Netko čuje za Ethereum, Solanu, stablecoine, decentralizirane financije, nove mreže, nove tokene i projekte koji obećavaju brže transakcije, bolju korisničku jednostavnost ili veći rast.",
          "Onda se prirodno pojavi misao: možda ne bih trebao imati samo Bitcoin. Možda bih trebao imati kripto portfelj. Najčešći oblik te ideje zvuči ovako: većina u Bitcoinu, manji dio u ostalim kriptovalutama.",
          "Na prvi pogled to zvuči razumno. U klasičnom financijskom jeziku, to se može nazvati diverzifikacijom. Ali na Bitcoin standardu pitanje treba postaviti drukčije. Bitcoin u ovom okviru ne tretiramo kao jednu od kriptovaluta. Tretiramo ga kao novac.",
        ],
      },
      {
        heading: "Bitcoin kao novac, ostalo kao investicija",
        body: [
          "Ako Bitcoin tretirate kao novac, tada se mijenja način razmišljanja. Ne pitate samo: “Može li neka druga kriptovaluta narasti više u eurima?” Pitate: “Ako ulažem svoj Bitcoin u nešto drugo, mogu li ostvariti pozitivan povrat u Bitcoinu nakon rizika, vremena i pogrešaka?”",
          "To je puno stroži kriterij. Ako ste na državnom novcu, lako je mjeriti sve u eurima ili dolarima. Ali ako Bitcoin postaje vaš primarni novac, tada se i investicije moraju mjeriti u Bitcoinu. Nije dovoljno da neka imovina naraste u eurima. Mora nadmašiti Bitcoin.",
          "To vrijedi za nekretnine, dionice, posao, zlato, obveznice, fondove, privatne investicije i kriptovalute. Ako uložite Bitcoin u nešto drugo, pitanje je jednostavno: vraća li vam se više Bitcoina nego što ste uložili, uz rizik koji ste preuzeli?",
        ],
        link: {
          before: "Za temelj te razlike pročitajte i vodič ",
          label: "Bitcoin je novac",
          href: "/vodici/bitcoin-kao-novac/",
          after: ".",
        },
      },
      {
        heading: "Zašto “može narasti više” nije dovoljna teza",
        body: [
          "Naravno da neka kriptovaluta može u nekom razdoblju narasti više od Bitcoina. Manji projekti počinju od manje tržišne vrijednosti. Ako privuku dovoljno pažnje, likvidnosti i narativa, mogu u kratkom vremenu snažno porasti. To nije sporno.",
          "Ali to nije dovoljna investicijska teza. Pitanja su: kada ulazite, kada izlazite, koliko držite, u kojem omjeru, što mora biti istina da biste ostali, što mora biti istina da biste prodali i što radite ako projekt naraste u eurima, ali padne u odnosu na Bitcoin?",
          "Najvažnije pitanje često je još jednostavnije: koliko vremena morate potrošiti da biste uopće znali što radite? Ulaganje u kriptovalute nije samo pitanje novca. To je pitanje vremena, pažnje, znanja, praćenja tržišta, razumijevanja rizika, procjene timova, tehnologije, strukture tokena, likvidnosti, regulatornog rizika i izlazne strategije.",
          "Za veliku većinu ljudi to nije usputna diverzifikacija. To je druga djelatnost.",
        ],
      },
      {
        heading: "Bitcoin ima drukčiju ulogu",
        body: [
          "Bitcoin nije samo projekt s tokenom. Bitcoin je monetarna mreža koja pokušava postati bolji novac. Zato se Bitcoin ne može razumjeti samo kao “najveća kriptovaluta”. Njegova teza je drukčija.",
          "Bitcoin ima strogo ograničenu ponudu, proof of work, globalnu mrežu čvorova i monetarni fokus koji se ne mijenja svakim novim tržišnim narativom. Pravila Bitcoina nalikuju pravilima igre koju ljudi sve šire prihvaćaju upravo zato što se pravila ne mijenjaju lako.",
          "Dobra usporedba je šah. Šah ima pravila. Ako ih promijenite, možda ste izmislili novu igru, ali više ne igrate isti šah. Snaga šaha nije u tome što se pravila stalno prilagođavaju novim željama igrača, nego u tome što ljudi diljem svijeta znaju koju igru igraju.",
          "Bitcoinova snaga dolazi iz slične jasnoće. Znamo pravila igre. Znamo da je ukupna ponuda ograničena. Znamo kako se nove jedinice stvaraju. Znamo tko provjerava pravila. Znamo da je promjena temeljnih pravila iznimno teška.",
          "Kod mnogih drugih kriptovaluta upravo je promjenjivost dio privlačnosti. Mogu se nadograđivati, mijenjati, prilagođavati i eksperimentirati. To može stvoriti inovacije, ali stvara i drukčiju vrstu rizika. Zato ih ne treba stavljati u istu mentalnu kategoriju kao Bitcoin.",
        ],
      },
      {
        heading: "Diverzifikacija ili razvodnjavanje?",
        body: [
          "Kada netko kaže da ima “80% Bitcoin i 20% kriptovalute”, to može zvučati razumno. Ali treba pitati: što tih 20% stvarno radi? Smanjuje li rizik ili uvodi nove rizike koje osoba ne razumije dovoljno?",
          "Ako je Bitcoin novac, a ostale kriptovalute rizične investicije, tada taj omjer nije samo diverzifikacija. To je odluka da dio novca izložite investicijama koje moraju nadmašiti Bitcoin.",
          "To može imati smisla za osobu koja se profesionalno bavi tim tržištem, ima jasnu tezu, razumije rizike, zna što prati i zna kada izlazi. Ali za osobu koja ima posao, obitelj, firmu, dug, nekretninu, sigurnosna pitanja i ograničeno vrijeme, to može biti skupi zaobilazni put.",
          "Ponekad ljudi ne diverzificiraju zato što su sigurni u bolju tezu, nego zato što se boje da će propustiti nešto drugo. To nije strategija. To je nemir.",
        ],
      },
      {
        heading: "Mjerite povrat u Bitcoinu",
        body: [
          "Ako želite razmišljati ozbiljno, mjerite sve u Bitcoinu. Neka kriptovaluta može rasti u eurima, a padati u Bitcoinu. U tom slučaju, na Bitcoin standardu niste ostvarili pozitivan povrat. Samo ste preuzeli dodatni rizik i završili s manje Bitcoina nego što biste imali da niste ništa radili.",
          "To je strogo mjerilo, ali je pošteno. Ako Bitcoin tretirate kao najbolji novac koji imate, tada svaka investicija mora odgovoriti na pitanje: zašto ne bih samo držao Bitcoin?",
          "To ne znači da nikada ne smijete ulagati. Novac se može trošiti, štedjeti, davati i ulagati. Ali ulaganje mora imati tezu, očekivani povrat, rizik i vremenski okvir. I mora biti mjereno u novcu koji vam je najvažniji.",
          "Ako je taj novac Bitcoin, tada je mjerilo Bitcoin.",
        ],
        link: {
          before: "Za širi pogled na novac, kapital i potrošnju pročitajte ",
          label: "Novac, kapital i potrošnja",
          href: "/vodici/novac-kapital-potrosnja/",
          after: ".",
        },
      },
      {
        heading: "Za većinu ljudi bolji je fokus",
        body: [
          "Postoji jednostavna misao koju mnogi Bitcoineri ponavljaju: usavršavaj svoj posao i štedi u Bitcoinu. To nije pravilo za svakoga u svakoj situaciji, ali sadrži važnu intuiciju.",
          "Za većinu ljudi najveća tržišna prednost nije u tome da pokušaju pronaći sljedeću kriptovalutu koja će privremeno nadmašiti Bitcoin. Njihova prednost je u vlastitom poslu, zanimanju, firmi, vještini, mreži odnosa i sposobnosti stvaranja vrijednosti.",
          "Ako već imate područje u kojem imate znanje, ugled, iskustvo i sposobnost stvaranja prihoda, često je mudrije dodatno razvijati to područje nego trošiti vrijeme na tržište u kojem nemate prednost.",
          "Drugim riječima: možda je najbolja investicija upravo ono u čemu već imate stvarnu prednost. A višak koji nastaje iz tog rada možete štedjeti u Bitcoinu.",
        ],
      },
      {
        heading: "Kada ulaganje u kriptovalute može imati smisla?",
        body: [
          "Ulaganje u kriptovalute može imati smisla za vrlo mali broj ljudi. Ako netko želi profesionalno proučavati kripto tržišta, raditi u toj industriji, razumjeti projekte, pratiti likvidnost, tehnologiju, timove, regulatorni rizik, ulaze i izlaze, to je zaseban posao.",
          "Tada govorimo o investicijskoj djelatnosti, ne o usputnoj kupnji nekoliko tokena. To je slično kao da netko želi ulagati u industriju nafte, biotehnologiju, rudarske kompanije ili rizični kapital. Može se. Ali za to treba specifično znanje, vrijeme i prednost.",
          "Ako tu prednost nemate, ne morate se sramiti što ne sudjelujete. Dovoljno je urediti Bitcoin.",
        ],
      },
      {
        heading: "Što savjetovanje ovdje može i ne može napraviti",
        body: [
          "Ovo je Bitcoin savjetovanje. Ne savjetujem ulaganje u druge kriptovalute. Ne govorim koji token kupiti, kada ući, kada izaći ni koliko držati.",
          "Ono što mogu napraviti jest pomoći vam postaviti okvir: što znači tretirati Bitcoin kao novac, kako mjeriti investicije u Bitcoinu, kako razumjeti oportunitetni trošak ulaska u druga tržišta, kako razlikovati novac od rizične investicije i kako prvo urediti proračun, dug, neto imovinu, sigurnost i obitelj.",
          "Nakon toga, što ćete napraviti sa svojim novcem ostaje vaša odluka. Ali odluka će biti jasnija ako prvo znate što je Bitcoin u vašem sustavu.",
        ],
      },
      {
        heading: "Zaključak",
        body: [
          "Bitcoin nije kripto portfelj. Bitcoin je, u ovom okviru, novac. Sve ostalo je eventualno investicija, s vlastitim rizicima, troškovima, neizvjesnošću i potrebom za posebnom tezom.",
          "Možda će neki projekti rasti brže od Bitcoina u određenim razdobljima. Možda će neki stvoriti stvarnu vrijednost. Možda će neki nestati. Ali to ne mijenja osnovno pitanje: imate li dovoljno znanja, vremena i prednosti da u tome ostvarite pozitivan povrat u Bitcoinu?",
          "Ako nemate, nije nužno da nešto propuštate. Možda upravo izbjegavate skupi zaobilazni put.",
          "Za većinu ljudi prvi korak nije kripto portfelj. Prvi korak je razumjeti Bitcoin kao novac, urediti vlastiti proračun, izaći iz duga, zaštititi pristup i znati što Bitcoin treba raditi u njihovoj neto imovini.",
          "Ako imate pitanje o tome gdje Bitcoin završava, a gdje počinje rizična investicija, to je dobro pitanje za uvodni razgovor.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako niste sigurni gdje Bitcoin završava, a gdje počinje rizična investicija, to je dobro pitanje za uvodni razgovor.",
  },
  {
    slug: "bitcoin-kao-novac",
    title: "Bitcoin je novac",
    metaDescription:
      "Vodič o tome zašto okvir Bitcoin kao novac promatra Bitcoin kao novac, a ne kao investiciju sa strane.",
    excerpt:
      "Bitcoin nije samo imovina koju držite. U osobnom Bitcoin standardu Bitcoin ima ulogu novca.",
    category: "Bitcoin kao novac",
    difficulty: "Srednje",
    freshness: "stabilno",
    order: 60,
    featured: true,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Je li vaš Bitcoin novac u sustavu ili imovina koja stoji sa strane?",
    relatedSlugs: [
      "uskladivanje-kupovne-moci-bitcoina",
      "cijena-kao-mjera-vremena",
      "novac-kapital-potrosnja",
    ],
    visual: {
      type: "thirds",
      title: "Gdje pripada Bitcoin?",
      columns: [
        {
          label: "novac",
          description: "Bitcoin kao novčana zaliha",
        },
        {
          label: "potrošnja",
          description: "dobra za izravnu uporabu",
        },
        {
          label: "proizvodna imovina",
          description: "dobra koja stvaraju vrijednost",
        },
      ],
      caption: "U ovom okviru Bitcoin ima ulogu novca.",
    },
    sections: [
      {
        heading: "Što znači da je Bitcoin novac",
        body: [
          "Novac nije samo ono čime danas plaćate kavu. Novac je dobro koje držite radi buduće razmjene. Njegova bitna vrijednost je kupovna moć kroz vrijeme. U tom smislu okvir Bitcoin kao novac promatra Bitcoin kao novac.",
          "To mijenja pitanje. Ne pitate samo koliko vrijedi danas. Pitate što vam omogućuje sutra. Koliko budućih odluka može pokriti? Koji dio života može zaštititi od impulsa, duga i loše potrošnje?",
        ],
      },
      {
        heading: "Kupovna moć važnija je od broja jedinica",
        body: [
          "Broj jedinica je važan, ali nije dovoljan. Ista količina Bitcoina može imati različitu kupovnu moć u različitim trenucima. Ako gledate samo broj, možete propustiti stvarnu promjenu.",
          "Zato osobni Bitcoin standard povezuje Bitcoin s proračunom nulte osnove. Pita koliko mjeseci troškova pokriva, koja buduća plaćanja može izdržati i što se mijenja kada kupovna moć raste ili pada. Novac se razumije kroz život, ne samo kroz saldo.",
        ],
      },
      {
        heading: "Zašto Bitcoin nije proizvodna imovina",
        body: [
          "Proizvodna imovina povećava produktivnost. To može biti alat, znanje, posao, oprema, zemljište, sustav ili odnos koji stvara vrijednost. Bitcoin u ovom okviru nema tu ulogu. Bitcoin je novac.",
          "Ako Bitcoin nazovete proizvodnom imovinom, miješate pojmove. Tada očekujete da radi posao koji mu ne pripada. Bitcoin čuva kupovnu moć i omogućuje buduću razmjenu. Proizvodna imovina stvara vrijednost. Obje stvari mogu biti važne, ali nisu iste.",
        ],
      },
      {
        heading: "Kada Bitcoin postaje dio proračuna nulte osnove",
        body: [
          "Bitcoin postaje dio proračuna nulte osnove kada dobije namjenu. Koji dio ne dirate? Koji dio promatrate kao novčanu zalihu? Koji dio smije služiti budućem plaćanju? Koji uvjet mora postojati da biste ga potrošili?",
          "Bez tih pravila, Bitcoin stoji sa strane. Može biti važan, ali nije povezan s ostatkom života. Kada pravila postoje, Bitcoin ulazi u osobni sustav. Tada nije samo imovina koju gledate. Tada je novac s ulogom.",
        ],
      },
      {
        heading: "Pravilo za vlastiti sustav",
        body: [
          "Prvo pravilo može glasiti: Bitcoin promatram kao novac, a ne kao kratkoročnu okladu. Zato ga povezujem s proračunom nulte osnove, dugom, budućim plaćanjima, sigurnošću i obitelji.",
          "To pravilo ne govori koliko Bitcoina trebate imati. Govori što Bitcoin jest u vašem sustavu. A bez toga ni veća količina ne stvara osobni Bitcoin standard.",
          "Ako ne možete objasniti sebi ili partneru je li Bitcoin za vas novac, štednja, imovina ili nešto četvrto, to je jedno od najvažnijih pitanja za razgovor.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako ne možete objasniti sebi ili partneru je li Bitcoin za vas novac, štednja, imovina ili nešto četvrto, to je jedno od najvažnijih pitanja za razgovor.",
  },
  {
    slug: "pozitivni-neto-priljev",
    title: "Novac koji ostaje",
    metaDescription:
      "Zašto Bitcoin standard počinje time da vaš mjesec može stajati na vlastitim nogama: prihodi, troškovi, dug i novac koji ostaje.",
    excerpt:
      "Bitcoin standard počinje kada mjesec može stajati na vlastitim nogama.",
    category: "Bitcoin kao novac",
    difficulty: "Srednje",
    freshness: "stabilno",
    order: 70,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Ostaje li vam redovito novac nakon troškova, bez oslanjanja na rast cijene Bitcoina?",
    relatedSlugs: [
      "svaki-euro-ima-namjenu",
      "bitcoin-kao-novac",
      "uskladivanje-kupovne-moci-bitcoina",
    ],
    visual: {
      type: "equation",
      title: "Temelj rasta",
      parts: ["novac ulazi", "novac izlazi"],
      result: "novac koji ostaje",
      caption:
        "Bitcoin standard počinje kada mjesec može stajati na vlastitim nogama.",
    },
    sections: [
      {
        heading: "Novac koji ostaje",
        body: [
          "Novac ulazi kroz plaću, posao, klijente, prodaju ili druge izvore. Novac izlazi kroz troškove, račune, dug, obiteljske potrebe i odluke. Ako redovito ulazi više novca nego što izlazi, sustav diše. Ako redovito izlazi više nego što ulazi, sustav se oslanja na dug, prodaju imovine ili nadu.",
          "Gledajte prosjek, ne samo jedan mjesec. Dobar početak je usporediti novac koji ulazi i novac koji izlazi kroz zadnja tri mjeseca.",
          "Osobni Bitcoin standard traži da novac ostaje zato što Bitcoin kao novac treba miran temelj. Ako proračun nulte osnove stalno curi, Bitcoin postaje prva stvar koju morate dirati kada se pojavi pritisak.",
        ],
      },
      {
        heading: "Zašto mjesec koji se troši nije standard",
        body: [
          "Ako redovito izlazi više novca nego što ulazi, sustav se troši. Možda to nije odmah vidljivo. Možda ga skriva dug, štednja ili rast cijene Bitcoina. Ali ako troškovi stalno pobjeđuju prihode, osobni Bitcoin standard nije stabilan.",
          "To nije moralna osuda, nego tehnička stvarnost osobnog novca. Ne možete dugoročno živjeti kao da budući novac uvijek može spasiti sadašnji nered. Dugoročni standard traži da sadašnji mjesec nosi sam sebe.",
        ],
      },
      {
        heading: "Pet načina da više novca ostane u sustavu",
        body: [
          "Prvi način je smanjiti koliko novca izlazi. Drugi je povećati koliko novca ulazi. Treći je izaći iz duga. Četvrti je smanjiti potrošnju koja ne stvara vrijednost. Peti je usmjeriti vrijeme, znanje i proizvodnu imovinu prema većoj sposobnosti stvaranja vrijednosti.",
          "Nijedan od tih koraka nije spektakularan. Ali svi jačaju Bitcoin standard. Više novca koji ostaje znači da Bitcoin ne mora služiti kao hitna zakrpa. Može služiti kao novac koji čuva kupovnu moć kroz vrijeme.",
        ],
      },
      {
        heading: "Kako Bitcoin mijenja novčanu zalihu",
        body: [
          "Kada u sustavu ostaje novac, dio viška može postati novčana zaliha u Bitcoinu. Ne mora sav višak ići u Bitcoin, ali Bitcoin može dobiti jasnu ulogu novca u sustavu.",
          "Ako novčana zaliha raste samo zato što cijena raste, sustav može biti krhak. Ako raste zato što novac redovito ostaje i zato što svaki euro ima namjenu, temelj je jači. Tada rast nije samo tržišni događaj, nego posljedica reda.",
        ],
      },
      {
        heading: "Prvo pravilo koje treba zapisati",
        body: [
          "Prvo pravilo može glasiti: ne povećavam ulogu Bitcoina u svojem sustavu ako mi redovito ne ostaje novac nakon troškova, bez oslanjanja na rast cijene. Prvo popravljam prihode, troškove i stanje duga.",
          "To pravilo možda zvuči jednostavno. Upravo zato je korisno. Bitcoin standard počinje kada mjesec može stajati na vlastitim nogama.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako ne znate raste li vaš sustav zbog reda ili samo zbog tržišta, uvodni razgovor može pomoći da to stavimo u jasniju sliku.",
  },
  {
    slug: "uskladivanje-kupovne-moci-bitcoina",
    title: "Usklađivanje kupovne moći: što raditi kad Bitcoin raste ili pada?",
    seoTitle: "Kad Bitcoin raste ili pada",
    metaDescription:
      "Vodič o tome kako uskladiti osobni proračun nulte osnove s promjenama kupovne moći Bitcoina, bez pogađanja cijene i impulzivnih odluka.",
    excerpt:
      "Kada se kupovna moć Bitcoina mijenja, ne pogađate tržište. Usklađujete osobni proračun nulte osnove.",
    category: "Bitcoin kao novac",
    difficulty: "Napredno",
    freshness: "stabilno",
    order: 75,
    publishedAt: "2026-04-30",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Kada bi se kupovna moć vašeg Bitcoina snažno promijenila, biste li znali koje kategorije proračuna nulte osnove treba provjeriti?",
    relatedSlugs: [
      "cijena-kao-mjera-vremena",
      "bitcoin-kao-novac",
      "pozitivni-neto-priljev",
    ],
    visual: {
      type: "trend",
      title: "Kupovna moć mijenja proračun nulte osnove",
      states: [
        {
          label: "raste",
          description: "rasporediti višak",
        },
        {
          label: "miruje",
          description: "držati pravila",
        },
        {
          label: "pada",
          description: "smanjiti troškove",
        },
      ],
      caption: "Ne pogađate tržište. Usklađujete proračun nulte osnove.",
    },
    sections: [
      {
        heading: "Cijena nije naredba",
        body: [
          "Kada Bitcoin raste, lako se pojavi osjećaj da morate nešto napraviti. Kada pada, isti osjećaj dolazi iz straha. U oba slučaja cijena se ponaša kao naredba. Osobni Bitcoin standard odbija taj redoslijed.",
          "Cijena može biti povod za provjeru, ali ne smije biti gospodar odluke. Prvo gledate osobni proračun nulte osnove, dug, buduća plaćanja, novčanu zalihu i pravila. Tek nakon toga odlučujete mijenja li se išta.",
        ],
      },
      {
        heading: "Kupovna moć je stvarni podatak",
        body: [
          "Ne zanima nas samo koliko Bitcoin vrijedi u eurima. Zanima nas što njegova kupovna moć može pokriti. Koliko mjeseci troškova? Koje buduće troškove? Koji dio sigurnosne zalihe? Koji dio neto imovine?",
          "Kada gledate kupovnu moć, broj postaje povezan sa životom. Rast i pad više nisu samo vijesti. Postaju promjene koje možete usporediti s proračunom nulte osnove. To smanjuje paniku i smanjuje pohlepu.",
        ],
      },
      {
        heading: "Kada kupovna moć pada",
        body: [
          "Kada kupovna moć pada, prvo se gledaju troškovi. Koji troškovi stvaraju pritisak? Postoji li dug? Je li sigurnosna zaliha dovoljna? Koje buduće plaćanje dolazi brzo?",
          "Pad ne znači automatski prodaju. Možda ne treba napraviti ništa. Ali ako proračun nulte osnove ne može izdržati pad, problem nije samo cijena. Problem je sustav koji nema dovoljno prostora.",
        ],
      },
      {
        heading: "Ako kupovna moć pada, provjerite",
        body: [
          "Pad kupovne moći nije zapovijed za prodaju, nego poziv da mirno provjerite osnovne dijelove sustava.",
        ],
        items: [
          "troškove",
          "dug",
          "sigurnosnu zalihu",
          "buduće troškove",
          "treba li smanjiti potrošnju",
        ],
      },
      {
        heading: "Kada kupovna moć raste",
        body: [
          "Rast kupovne moći može biti jednako opasan kao pad. Može stvoriti osjećaj da je sve dopušteno: veća potrošnja, slabiji oprez, novi dug ili odluke bez pravila.",
          "U osobnom Bitcoin standardu rast dobiva namjenu. Možda se bolje pokrivaju buduća plaćanja. Možda se jača novčana zaliha. Možda se preispituje neto imovina. Ali rast ne smije automatski postati nered.",
        ],
      },
      {
        heading: "Ako kupovna moć raste, provjerite",
        body: [
          "Rast kupovne moći također traži pravila. Cilj nije euforija, nego raspored koji čuva mir.",
        ],
        items: [
          "buduća plaćanja",
          "davanje",
          "neto imovinu",
          "potrošnu i proizvodnu imovinu",
          "sigurnost",
        ],
      },
      {
        heading: "Pravilo za provjeru",
        body: [
          "Dobro pravilo može glasiti: kada se kupovna moć Bitcoina znatno promijeni, prvo pregledavam proračun nulte osnove, dug, buduća plaćanja i novčanu zalihu. Ne kupujem ni ne prodajem samo zato što me cijena pomaknula.",
          "Takvo pravilo vraća odluku vama. Bitcoin ostaje novac u sustavu, a ne izvor stalne hitnosti. Usklađivanje kupovne moći nije pogađanje, nego održavanje reda.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako ne znate što biste napravili nakon velikog pada ili rasta kupovne moći, to vrijedi razjasniti u uvodnom razgovoru.",
  },
  {
    slug: "cijena-kao-mjera-vremena",
    title: "Cijena kao mjera vremena",
    metaDescription:
      "Vodič o tome kako dugoročni potencijski trend Bitcoina pomaže razmišljati o vremenu, kupovnoj moći i osobnom proračunu nulte osnove.",
    excerpt:
      "Ne pokušavamo pogoditi kratkoročnu cijenu. Gledamo odnos cijene, vremena i proračuna nulte osnove.",
    category: "Bitcoin kao novac",
    difficulty: "Napredno",
    freshness: "stabilno",
    order: 77,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-07",
    practicalQuestion:
      "Ako je kupovna moć Bitcoina šest mjeseci ispred ili ispod dugoročnog trenda, što se mijenja u vašem proračunu nulte osnove?",
    relatedSlugs: [
      "uskladivanje-kupovne-moci-bitcoina",
      "bitcoin-kao-novac",
      "pozitivni-neto-priljev",
    ],
    visual: {
      type: "trend",
      title: "Cijena kao vrijeme",
      states: [
        {
          label: "iznad trenda",
          description: "riješiti buduća plaćanja",
        },
        {
          label: "blizu trenda",
          description: "držati pravila",
        },
        {
          label: "ispod trenda",
          description: "smanjiti potrošnju",
        },
      ],
      caption: "Dugoročni trend je pomoćni signal, ne prognoza cijene.",
    },
    sections: [
      {
        heading: "Ne pogađamo kratkoročno kretanje",
        body: [
          "Ne koristimo cijenu za prognozu. Koristimo je kao signal za provjeru proračuna.",
          "Cilj osobnog Bitcoin standarda nije pogoditi sutrašnju, mjesečnu ili godišnju cijenu. To bi odluku opet predalo tržištu. Danas biste se osjećali pametno, sutra prestrašeno, a pravila bi se mijenjala prema svakoj promjeni kupovne moći.",
          "Pitanje je jednostavnije: što trenutna kupovna moć znači za proračun nulte osnove? Može li pokriti poznata buduća plaćanja? Mijenja li odnos između novčane zalihe, duga i stvarnog viška? Treba li nešto ranije riješiti ili treba samo držati pravila?",
        ],
      },
      {
        heading: "Dugoročni trend nije jamstvo",
        body: [
          "Dugoročni potencijski obrazac (Bitcoin power law) nije obećanje cijene ni plan za kratkoročnu kupnju ili prodaju. Koristan je kao pomoćni način razmišljanja o odnosu cijene i vremena, posebno kada želite vidjeti je li kupovna moć ispred, blizu ili ispod dugoročnog ritma.",
          "Takav pogled može biti koristan samo ako ostane na svome mjestu. Ne smije zamijeniti osobni proračun nulte osnove. Ne smije potisnuti dug. Ne smije stvoriti osjećaj sigurnosti koji ne postoji. Dugoročni trend je signal za provjeru, ne zapovijed.",
        ],
      },
      {
        heading: "Iznad trenda: buduća plaćanja",
        body: [
          "Ako je kupovna moć ispred očekivanog ritma, ne znači da treba slaviti bez pravila. Znači da možete mirno pogledati buduća plaćanja. Postoji li trošak koji će ionako doći? Postoji li nužna kupnja koju treba riješiti? Postoji li pritisak koji se može smanjiti ranije?",
          "U tom slučaju dio budućih plaćanja možda se može riješiti ranije: unaprijed plaćeni troškovi, nužne kupnje ili smanjenje budućeg pritiska. Ali odluka i dalje mora proći kroz proračun nulte osnove. Rast kupovne moći ne smije postati dopuštenje za nered.",
        ],
      },
      {
        heading: "Ispod trenda: manja potrošnja i veći prihodi",
        body: [
          "Ako je kupovna moć ispod dugoročnog trenda, odgovor nije panika. Odgovor je povratak osnovama. Smanjuju se potrošni troškovi, jačaju prihodi i Bitcoin se akumulira iz stvarnog viška, bez oslanjanja na dug i bez žurbe.",
          "Taj trenutak često pokazuje koliko je sustav stvarno čvrst. Ako je proračun nulte osnove jasan, znate što možete nastaviti. Ako nije jasan, prvo ga uređujete. Ako prihodi nisu dovoljni, radite na sposobnosti stvaranja vrijednosti. Cijena tada ne vodi život, nego otkriva gdje treba više reda.",
        ],
      },
      {
        heading: "Tržišni sentiment ne smije voditi odluke",
        body: [
          "Kada prevlada pohlepa, ljudi kupuju više. Kada prevlada strah, staju. To je normalno ljudsko ponašanje, ali nije osobni Bitcoin standard. Tržišni sentiment može biti koristan podatak, ali ne smije biti upravljač.",
          "Zato pravila moraju biti jača od sentimenta. Ako ste blizu dugoročnog ritma, ne mijenjate sustav samo zato što se raspoloženje promijenilo. Ako ste iznad ili ispod, prvo gledate proračun nulte osnove, dug, buduća plaćanja i stvarni višak. Tek tada odlučujete.",
        ],
      },
      {
        heading: "Proračun nulte osnove ostaje glavni alat",
        body: [
          "Dugoročni trend je pomoćni signal. Osobni proračun nulte osnove ostaje glavni alat. On govori koji novac već ima namjenu, koji dug traži buduća plaćanja, koliko je stvarni višak i koji dio Bitcoina ima ulogu novčane zalihe.",
          "Zato cijena može biti mjera vremena, ali ne i zamjena za red. Ako je kupovna moć ispred, možda nešto rješavate ranije. Ako je ispod, jačate prihode i smanjujete troškove. Ako je blizu, držite pravila. U sva tri slučaja proračun nulte osnove odlučuje prvi.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako cijena previše upravlja vašim odlukama, razgovor može pomoći da je pretvorite u signal za provjeru, ne zapovijed.",
  },
  {
    slug: "novac-kapital-potrosnja",
    title: "Novac, potrošna dobra i proizvodna imovina",
    metaDescription:
      "Vodič o tri uloge imovine: novcu, potrošnim dobrima i proizvodnoj imovini, te o tome zašto Bitcoin pripada ulozi novca.",
    excerpt:
      "Ne služi svaka imovina istoj svrsi. Bitcoin je novac. Potrošna dobra i proizvodna imovina imaju druga pravila.",
    category: "Neto imovina",
    difficulty: "Srednje",
    freshness: "stabilno",
    order: 80,
    featured: true,
    publishedAt: "2026-04-30",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Koji dio vaše neto imovine je novac, koji dio potrošna dobra, a koji dio proizvodna imovina?",
    relatedSlugs: [
      "bitcoin-kao-novac",
      "bitcoin-u-neto-imovini",
      "uskladivanje-kupovne-moci-bitcoina",
    ],
    visual: {
      type: "thirds",
      title: "Tri uloge neto imovine",
      columns: [
        {
          label: "novac",
          description: "kupovna moć za buduću razmjenu",
        },
        {
          label: "potrošna dobra",
          description: "dobra za izravnu uporabu",
        },
        {
          label: "proizvodna imovina",
          description: "dobra koja povećavaju produktivnost",
        },
      ],
      caption: "Ne služi svaka imovina istoj svrsi.",
    },
    sections: [
      {
        heading: "Tri različite uloge",
        body: [
          "Neto imovina nije jedna masa. U njoj postoje različite uloge. Jedan dio je novac: dobro koje se drži radi buduće razmjene. Jedan dio su potrošna dobra: stvari koje koristite i koje često traže održavanje. Jedan dio je proizvodna imovina: dobra koja povećavaju produktivnost ili stvaraju vrijednost.",
          "Ako te uloge pomiješate, odluke postaju loše. Možete se osjećati bogato zbog skupih potrošnih dobara, a zapravo imati malo novca. Možete imati proizvodnu imovinu, ali premalo sigurnosti. Možete imati Bitcoin, ali ga promatrati kao nešto izvan sustava.",
        ],
      },
      {
        heading: "Bitcoin kao novac",
        body: [
          "Bitcoin je novac u ovom okviru. Njegova uloga nije da bude alat koji proizvodi prihod. Njegova uloga je čuvati kupovnu moć i služiti budućoj razmjeni. Zato ga ne treba miješati s proizvodnom imovinom.",
          "Kada Bitcoin dobije ulogu novca, pitanja postaju jasnija. Koji dio čuvate? Koji dio može služiti budućem plaćanju? Kada se kupovna moć preispituje? Kako se pravila objašnjavaju obitelji?",
        ],
      },
      {
        heading: "Potrošna dobra",
        body: [
          "Potrošna dobra nisu loša. Dom, auto, oprema i stvari koje koristite mogu biti važni. Ali potrošna dobra često vežu novac i stvaraju buduća plaćanja. Ne stvaraju nužno slobodu.",
          "Zato ih treba gledati trijezno. Ne samo koliko vrijede danas, nego koliko traže sutra. Održavanje, porez, vrijeme, osiguranje i zamjena dijelovi su stvarne cijene. Ako se to ne vidi, potrošnja lako izgleda kao imovina koja ne traži ništa.",
        ],
      },
      {
        heading: "Proizvodna imovina",
        body: [
          "Proizvodna imovina su dobra koja povećavaju produktivnost. To može biti posao, alat, znanje, oprema, sustav, zemljište ili odnos koji stvara vrijednost. Ona ima drugu ulogu od novca i potrošnih dobara.",
          "Primjerice: vještina, alat, posao, poslovni sustav, odnos s klijentima ili imovina koja povećava sposobnost stvaranja novca.",
          "Bitcoin ne zamjenjuje potrebu za proizvodnom imovinom. Možete imati dobar novac, a i dalje trebate sposobnost stvaranja vrijednosti. Osobni Bitcoin standard zato ne pita samo koliko Bitcoina imate, nego i kako stvarate prihod.",
        ],
      },
      {
        heading: "Zašto miješanje pojmova stvara loše odluke",
        body: [
          "Ako novac, potrošnju i proizvodnu imovinu stavite u isti koš, gubite jasnoću. Tada možete prodati novac za potrošnju koja će stvarati trošak. Ili zanemariti proizvodnu imovinu koja bi povećala prihode. Ili misliti da Bitcoin treba raditi ono što radi posao.",
          "Dobro pravilo počinje podjelom: što je novac, što je potrošnja, a što proizvodna imovina? Kada je to jasno, neto imovina prestaje biti zbroj stvari. Postaje sustav s pravilima.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako ne znate gdje završava novac, a počinje potrošna ili proizvodna imovina, to je pitanje koje ne treba ostati samo u glavi.",
  },
  {
    slug: "bitcoin-u-neto-imovini",
    title: "Kako uklopiti Bitcoin u neto imovinu?",
    metaDescription:
      "Vodič o tome kako promatrati Bitcoin u neto imovini kroz novac, potrošna dobra, proizvodnu imovinu, dug i osobna pravila.",
    excerpt:
      "Bitcoin ne stoji izvan ostatka imovine. Njegova uloga postaje jasnija kada znate što je novac, što je potrošnja, a što proizvodna imovina.",
    category: "Neto imovina",
    difficulty: "Srednje",
    freshness: "stabilno",
    order: 85,
    publishedAt: "2026-04-30",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Znate li koju ulogu Bitcoin ima u vašoj neto imovini danas?",
    relatedSlugs: [
      "novac-kapital-potrosnja",
      "pravilo-trecina",
      "bitcoin-kao-novac",
    ],
    sections: [
      {
        heading: "Bitcoin nije odvojen od života",
        body: [
          "Bitcoin odluke postaju nejasne kada se Bitcoin promatra kao zaseban svijet. Iznos na novčaniku ne govori dovoljno. Njegovo značenje ovisi o dugu, prihodima, obitelji, novčanoj zalihi, potrošnim dobrima i proizvodnoj imovini.",
          "Dvije osobe mogu imati isti iznos Bitcoina. Jedna ima dug, nestabilan prihod i velike buduće troškove. Druga nema dug, redovito joj ostaje novac nakon troškova i ima jasna pravila. Isti Bitcoin saldo u ta dva života nema istu ulogu.",
          "Neto imovina daje širu sliku. Ona pokazuje što posjedujete i što dugujete. Tek tada se može razumno pitati koju ulogu Bitcoin ima. Je li novac? Je li novčana zaliha? Je li dio budućeg plana? Ili samo stoji sa strane bez pravila?",
        ],
      },
      {
        heading: "Uloga dolazi prije postotka",
        body: [
          "Ljudi često žele znati koliki postotak neto imovine treba biti u Bitcoinu. Ali postotak bez uloge nije plan. Osoba bez duga, s jasnim prihodima i stabilnom zalihom nije u istoj situaciji kao osoba s kratkim rokovima i velikim dugom.",
          "Prvo pitanje glasi: što Bitcoin radi u sustavu? Čuva kupovnu moć? Služi kao novčana zaliha? Ne dira se osim pod posebnim uvjetima? Kada je uloga jasna, tek tada postotak može imati značenje.",
        ],
      },
      {
        heading: "Pravilo trećina kao ogledalo",
        body: [
          "U okviru osobnog Bitcoin standarda pravilo trećina služi kao provjera ravnoteže. Najmanje trećina u novcu, najviše trećina u potrošnim dobrima i najviše trećina u proizvodnoj imovini. To nije naredba za svaku osobu.",
          "Vrijednost pravila je u pitanju koje postavlja: je li jedna kategorija zauzela previše prostora? Ako potrošna dobra rastu, dug pritišće ili novca nema dovoljno, Bitcoin odluka ne može se gledati izolirano.",
        ],
      },
      {
        heading: "Dug mijenja cijelu sliku",
        body: [
          "Dug smanjuje neto imovinu i povećava buduća plaćanja. Zato osoba s istim iznosom Bitcoina može imati potpuno drukčiji položaj ako ima velik dug. Dug može prisiliti na prodaju upravo onda kada Bitcoin želite držati.",
          "Zato se Bitcoin u neto imovini ne može ozbiljno promatrati bez duga. Dug pokazuje koliko je sustav slobodan, a koliko već obećan budućnosti.",
        ],
      },
      {
        heading: "Pravilo koje možete objasniti",
        body: [
          "Dobra Bitcoin uloga u neto imovini može se objasniti u nekoliko rečenica. Zašto Bitcoin postoji? Što ne dirate? Kada se pravilo preispituje? Kako dug, potrošnja i proizvodna imovina utječu na odluku?",
          "Ako to ne možete objasniti, problem nije u broju. Problem je u nejasnom sustavu. Osobni Bitcoin standard pretvara broj u pravilo koje možete živjeti i objasniti.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako znate koliko Bitcoina imate, ali ne znate koju ulogu ima u neto imovini, to je dobar razlog za razgovor.",
  },
  {
    slug: "pravilo-trecina",
    title: "Pravilo trećina u neto imovini",
    metaDescription:
      "Vodič o pravilu trećina u osobnom Bitcoin standardu: najmanje trećina u novcu, najviše trećina u potrošnji i proizvodnoj imovini.",
    excerpt:
      "Pravilo trećina nije naredba, nego ogledalo koje pokazuje je li vaša neto imovina u ravnoteži.",
    category: "Neto imovina",
    difficulty: "Napredno",
    freshness: "stabilno",
    order: 90,
    featured: true,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Koja kategorija u vašoj neto imovini zauzima previše prostora?",
    relatedSlugs: [
      "bitcoin-u-neto-imovini",
      "novac-kapital-potrosnja",
      "bitcoin-kao-novac",
    ],
    visual: {
      type: "thirds",
      title: "Provjera ravnoteže",
      columns: [
        {
          label: "najmanje trećina",
          description: "novac",
        },
        {
          label: "najviše trećina",
          description: "potrošna dobra",
        },
        {
          label: "najviše trećina",
          description: "proizvodna imovina",
        },
      ],
      caption: "Pravilo trećina je ogledalo, ne naredba.",
    },
    sections: [
      {
        heading: "Zašto ravnoteža uopće treba pravilo",
        body: [
          "Bez pravila, neto imovina lako postane zbroj stvari. Malo novca, malo potrošnje, malo duga, malo Bitcoina, malo posla. Sve izgleda poznato, ali nije jasno ima li ravnoteže.",
          "Pravilo trećina u okviru osobnog Bitcoin standarda nije univerzalna naredba. Ono je ogledalo. Pomaže vidjeti je li previše neto imovine vezano u potrošnji, premalo u novcu ili nedovoljno u proizvodnoj imovini.",
          "Ne preporučujem kupnju ili prodaju određene imovine. Pravilo trećina služi za provjeru ravnoteže, ne kao formula koju treba slijepo provesti.",
        ],
      },
      {
        heading: "Najmanje trećina u novcu",
        body: [
          "Novac je dobro koje držite radi buduće razmjene. U ovom okviru Bitcoin ima ulogu novca. Najmanje trećina u novcu znači da sustav treba dovoljno kupovne moći koja nije vezana u potrošnim dobrima ili proizvodnoj imovini.",
          "Ne mora svaka osoba odmah imati isti udio. Važnije je pitati imate li dovoljno novca za buduće odluke. Ako je novca premalo, svaka promjena života može nas prisiliti na loš potez.",
        ],
      },
      {
        heading: "Najviše trećina u potrošnim dobrima",
        body: [
          "Potrošna dobra mogu biti važna, ali ne smiju pojesti sustav. Dom, auto, oprema i stvari koje koristite mogu stvarati udobnost, ali često traže održavanje, porez, osiguranje i pažnju.",
          "Ako potrošna dobra zauzimaju previše prostora, neto imovina može izgledati velika, a sloboda mala. Pravilo trećina tada ne osuđuje. Samo pokazuje da potrošnja možda nosi više težine nego što ste mislili.",
        ],
      },
      {
        heading: "Najviše trećina u proizvodnoj imovini",
        body: [
          "Proizvodna imovina su dobra koja povećavaju produktivnost ili stvaraju vrijednost. To može biti posao, alat, znanje, oprema ili sustav koji povećava prihode. Ona je važna jer novac sam po sebi ne stvara rad.",
          "Ali i proizvodna imovina može biti preteška ako traži previše vremena, duga ili rizika. Zato pravilo trećina ne kaže da proizvodne imovine mora biti što više. Kaže da treba imati jasnu svrhu i granicu.",
        ],
      },
      {
        heading: "Kada pravilo treba preispitati",
        body: [
          "Pravilo treba preispitati kada se promijeni život: novi dug, prodaja imovine, veća kupnja, promjena prihoda, rast ili pad kupovne moći Bitcoina, nova obiteljska odgovornost ili promjena sigurnosnog modela.",
          "Ako je gotovo sve vezano u domu, autu ili poslu, pitanje nije što sada prodati, nego imate li dovoljno novca za buduće odluke.",
          "Preispitivanje ne znači da morate nešto kupiti ili prodati. Možda je zaključak da ne dirate ništa. Ali tada znate zašto. Tako se imovina koja se samo dogodila razlikuje od osobnog Bitcoin standarda.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako želite provjeriti ravnotežu neto imovine bez pretvaranja toga u slijepu formulu, to vrijedi razjasniti u razgovoru.",
  },
  {
    slug: "bitcoin-etfovi-i-riznicke-kompanije",
    title:
      "Bitcoin ETF-ovi i rizničke kompanije: gdje prestaje Bitcoin, a počinje kapital",
    seoTitle:
      "Bitcoin ETF-ovi i rizničke kompanije: gdje prestaje Bitcoin, a počinje kapital",
    metaDescription:
      "Vodič koji objašnjava razliku između bitcoina u vlastitoj pohrani, ETF-ova, burzi i Bitcoin rizničkih kompanija poput Strategyja i MSTR-a.",
    excerpt:
      "ETF-ovi, brokeri, burze i Bitcoin rizničke kompanije mogu imati mjesto u imovini, ali nisu isto što i bitcoin u vlastitom posjedu.",
    category: "Neto imovina",
    difficulty: "Napredno",
    freshness: "često se mijenja",
    order: 92,
    publishedAt: "2026-05-12",
    updatedAt: "2026-05-12",
    practicalQuestion:
      "Znate li posjedujete li bitcoin, vrijednosni papir, potraživanje ili kapitalnu izloženost povezanu s Bitcoinom?",
    relatedSlugs: [
      "samostalna-pohrana-ili-skrbnik",
      "novac-kapital-potrosnja",
      "bitcoin-u-neto-imovini",
    ],
    visual: {
      type: "thirds",
      title: "Tri oblika Bitcoin izloženosti",
      columns: [
        {
          label: "bitcoin",
          description: "novac pod osobnom kontrolom",
        },
        {
          label: "ETF ili burza",
          description: "financijska izloženost uz skrbnika",
        },
        {
          label: "riznička kompanija",
          description: "kapitalno dobro povezano s Bitcoinom",
        },
      ],
      caption:
        "Edukativni okvir za razmišljanje, bez investicijskog, poreznog ili pravnog savjeta.",
    },
    sections: [
      {
        heading: "Bitcoin pitanje je postalo šire",
        body: [
          "Nakon 2024. godine pitanje Bitcoina u osobnoj imovini postalo je šire.",
          "Prije su glavne opcije bile jednostavnije: kupiti bitcoin na burzi, ostaviti ga tamo ili ga povući u vlastiti novčanik.",
          "Danas postoji više slojeva. Postoje Bitcoin ETF-ovi. Postoje brokerski računi. Postoje burze. Postoje kompanije koje drže Bitcoin u vlastitoj riznici. Postoje povlaštene dionice i drugi proizvodi povezani s kompanijama koje koriste Bitcoin kao temelj kapitalne strukture.",
          "Ti proizvodi, naravno, nisu isto što i Bitcoin.",
          "Ali znači da osoba ili obitelj danas može imati različite oblike izloženosti Bitcoinu.",
          "Neki oblici pripadaju području novca pod osobnom kontrolom. Neki pripadaju području kapitalnih dobara. Neki su prijelazna rješenja. Neki su prikladni samo za osobe koje razumiju dodatne rizike.",
          "Zato ih treba jasno razdvojiti.",
        ],
      },
      {
        heading: "Spot Bitcoin ETF-ovi",
        body: [
          "U siječnju 2024. američka Komisija za vrijednosne papire odobrila je uvrštenje i trgovanje više spot Bitcoin proizvoda kojima se trguje na burzi. Time je Bitcoin ušao u standardni brokerski i institucionalni okvir na način koji prije nije postojao u SAD-u.",
          "Među najpoznatijim proizvodima su BlackRock iShares Bitcoin Trust — IBIT, Fidelity Wise Origin Bitcoin Fund — FBTC, Bitwise Bitcoin ETF — BITB, ARK 21Shares Bitcoin ETF — ARKB, Franklin Bitcoin ETF — EZBC, Invesco Galaxy Bitcoin ETF — BTCO, VanEck Bitcoin Trust — HODL, WisdomTree Bitcoin Fund — BTCW i Grayscale Bitcoin Trust — GBTC.",
          "Za osobu koja već ima brokerski račun i portfelj vrijednosnih papira, to je velika promjena.",
          "Bitcoin više nije dostupan samo kroz burze za kriptoimovinu ili vlastiti novčanik. Može biti i dio portfelja vrijednosnih papira.",
          "Prednosti postoje, ali i mane.",
        ],
        visual: {
          type: "logo-grid",
          title: "ETF je vrijednosni papir, ne vlastiti ključ",
          caption:
            "Logotipi izdavatelja pomažu vidjeti da ovdje govorimo o financijskim proizvodima unutar brokerskog sustava, a ne o bitcoinu u vlastitom novčaniku.",
          items: [
            {
              name: "BlackRock",
              description: "iShares Bitcoin Trust, IBIT",
              src: "/guide-assets/blackrock-logo.svg",
              alt: "BlackRock logo",
              href: "https://www.blackrock.com/",
              credit: "Logo: Wikimedia Commons",
            },
            {
              name: "Fidelity",
              description: "Wise Origin Bitcoin Fund, FBTC",
              src: "/guide-assets/fidelity-logo.svg",
              alt: "Fidelity logo",
              href: "https://www.fidelity.com/",
              credit: "Logo: Wikimedia Commons",
            },
            {
              name: "Grayscale",
              description: "Grayscale Bitcoin Trust, GBTC",
              src: "/guide-assets/grayscale-logo.svg",
              alt: "Grayscale logo",
              href: "https://www.grayscale.com/",
              credit: "Logo: Wikimedia Commons",
            },
          ],
        },
      },
      {
        heading: "Prednosti Bitcoin ETF-a",
        body: [
          "Prva prednost je jednostavnost. Ako obitelj već ima brokerski račun, vrijednosne papire i naviku ulaganja kroz brokera, Bitcoin ETF je razumljiviji od seed riječi, hardverskih novčanika i višepotpisnih sustava.",
          "Druga prednost je administracija. ETF se uklapa u brokerske izvještaje, portfelj, nasljeđivanje vrijednosnih papira i uobičajene investicijske procese.",
          "Treća prednost je skrbnička infrastruktura. Kod velikih izdavatelja postoje revizori, skrbnici, brokeri, regulatori, tržišni sudionici i javna izvješća. To ne uklanja rizik, ali znači da proizvod ne ovisi o jednoj osobi koja kod kuće čuva papirić.",
          "Četvrta prednost je psihološka. Za obitelj koja se boji samostalne pohrane, ETF može biti prvi korak prema razumijevanju Bitcoina.",
          "ETF ne uklanja volatilnost Bitcoina. On uklanja dio operativne složenosti.",
        ],
      },
      {
        heading: "Mane Bitcoin ETF-a",
        body: [
          "Glavna mana je jasna: nemate privatne ključeve. Imate vrijednosni papir.",
          "To može biti korisno, samo ga ne treba izjednačiti s bitcoinom u vlastitom posjedu.",
          "ETF ne daje istu otpornost na cenzuru. Ne možete poslati bitcoin iz ETF-a izravno drugoj osobi. Ne možete koristiti Bitcoin mrežu bez posrednika.",
          "Ovisite o brokeru, izdavatelju, skrbniku, tržišnoj infrastrukturi, regulatornom okruženju i pravilima proizvoda.",
          "Također, ETF ima troškove, strukturu, pravila, moguće razlike između tržišne cijene i vrijednosti imovine u pozadini te pravni okvir koji nije isti kao izravno držanje bitcoina.",
          "Za hrvatske i europske ulagače postoji još jedan praktičan sloj: američki ETF-ovi nisu nužno dostupni svakom malom ulagaču u Europskoj uniji. Konkretna dostupnost ovisi o brokeru, statusu klijenta, jurisdikciji i dokumentaciji proizvoda.",
          "Shvatite ovo kao okvir za razmišljanje, a ne kao porezni, pravni ili investicijski savjet.",
        ],
      },
      {
        heading: "ETF kao dio obiteljskog portfelja",
        body: [
          "Za obitelj koja već ima portfelj vrijednosnih papira, ETF može imati mjesto.",
          "Primjerice, obitelj može imati dio imovine u dionicama, dio u obveznicama ili novčanim fondovima, dio u nekretnini, dio u bitcoinu u vlastitoj pohrani i dio u Bitcoin ETF-u.",
          "To može biti razumno ako je jasno zašto se svaki dio drži.",
          "ETF može biti dio koji je administrativno lakši, uklopljen u postojeći brokerski sustav i obitelji razumljiviji.",
          "Vlastiti bitcoin može biti dio koji daje suverenost, otpornost na cenzuru i kontrolu.",
          "Ti dijelovi ne moraju imati istu funkciju.",
        ],
      },
      {
        heading: "Burze i mjenjačnice",
        body: [
          "Burza ili mjenjačnica često je prvi dodir s Bitcoinom, i u tome nema ništa neobično.",
          "Problem nastaje kada burza postane trajna pohrana velikog iznosa bez jasnog razloga.",
          "Burza je korisna za kupnju, prodaju i likvidnost. Ali ako dugoročno držite bitcoin na burzi, preuzimate rizik burze.",
          "Rizik može biti poslovni rizik, regulatorni rizik, sigurnosni rizik, rizik zamrzavanja računa, rizik povlačenja sredstava, rizik da burza nema ono što tvrdi i rizik da obitelj ne zna pristupiti računu.",
          "Zato se ne treba pitati je li burza uvijek loša, nego zašto je taj iznos tamo i koliko dugo treba ostati tamo.",
          "Mali iznos radi likvidnosti može imati smisla. Velik dugoročni iznos bez plana obično nema.",
        ],
      },
      {
        heading: "Bitcoin rizničke kompanije",
        body: [
          "Zadnjih godina nastao je još jedan sloj: kompanije koje drže Bitcoin kao ključnu imovinu u svojoj riznici.",
          "Najpoznatiji primjer je Strategy, ranije MicroStrategy, s oznakom MSTR.",
          "Ova kompanija nije samo dionica softverske firme. Tržište je sve više gleda kao kompaniju čija je kapitalna struktura izgrađena oko Bitcoina.",
          "MSTR ipak nije bitcoin.",
          "MSTR je dionica kompanije. Ali vrijednost i rizik kompanije snažno su povezani s Bitcoinom.",
        ],
        visual: {
          type: "logo-grid",
          title: "Riznička kompanija nije isto što i bitcoin",
          caption:
            "Logo pomaže razdvojiti pojmove: Strategy je kompanija i vrijednosni papir, dok je bitcoin novac pod vlastitom kontrolom samo kada držite ključeve.",
          items: [
            {
              name: "Strategy",
              description: "kompanija s Bitcoin riznicom i oznakom MSTR",
              src: "/guide-assets/strategy-logo.svg",
              alt: "Strategy logo",
              href: "https://www.strategy.com/",
              credit: "Logo: Strategy",
            },
          ],
        },
      },
      {
        heading: "Rafinerija nafte kao usporedba",
        body: [
          "Michael Saylor često koristi usporedbu s rafinerijom.",
          "Rafinerija ne prodaje samo sirovu naftu. Ona uzima naftu kao ulaznu sirovinu i iz nje proizvodi benzin, dizel, kerozin, motorna ulja, plastiku i kemijske proizvode.",
          "Svaki proizvod ima drugačiju namjenu, kupca, cijenu, rizik i potražnju.",
          "Slična ideja stoji iza Bitcoin rizničke kompanije. Bitcoin je osnovna sirovina. Kompanija zatim koristi kapitalna tržišta da oko tog Bitcoina stvori različite vrijednosne papire: običnu dionicu, povlaštene dionice, kreditne instrumente i proizvode s različitim profilom prinosa i volatilnosti.",
          "Neki ulagači žele snažniju izloženost Bitcoinu. Neki žele prihod. Neki žele manju volatilnost. Neki žele likvidan vrijednosni papir u brokerskom računu. Neki žele proizvod koji se ponaša drukčije od samog Bitcoina.",
          "U tome je smisao usporedbe s rafinerijom. Samo treba biti jasno: ovdje više ne govorimo o čistom Bitcoinu, nego o kapitalnoj strukturi kompanije koja Bitcoin koristi kao temelj.",
        ],
      },
      {
        heading: "MSTR kao pojačana izloženost Bitcoinu",
        body: [
          "Dionica MSTR-a često se ponaša kao pojačana izloženost Bitcoinu.",
          "Kada Bitcoin raste, MSTR može rasti jače. Kada Bitcoin pada, MSTR može padati jače.",
          "Razlog je što kompanija ne drži samo bitcoin pasivno. Ona koristi dug, izdavanje dionica, povlaštene instrumente i tržišnu premiju kako bi povećavala količinu bitcoina po dionici.",
          "Takav pristup može stvoriti dodatnu vrijednost, ali i dodatni rizik.",
          "MSTR nije bitcoin. MSTR je dionica kompanije s poslovnom, financijskom, tržišnom i upravljačkom složenošću.",
          "Zato ga ne treba promatrati kao zamjenu za bitcoin u vlastitom posjedu. Više ima smisla promatrati ga kao kapitalno dobro povezano s Bitcoinom.",
        ],
      },
      {
        heading: "STRC: Stretch kao drukčiji proizvod",
        body: [
          "STRC je Strategyjev Stretch, promjenjiva povlaštena dionica bez dospijeća.",
          "Strategy ga opisuje kao kratkoročni visokoprinosni kreditni proizvod koji trenutačno plaća 11,50% godišnje dividende u gotovini, mjesečno, s promjenjivom stopom koja se prilagođava kako bi se trgovanje održavalo oko 100 dolara nominalne vrijednosti i smanjila volatilnost cijene.",
          "Tu treba biti vrlo oprezan. Trenutna stopa od 11,50% nije zajamčena zauvijek. Stopa se može mijenjati. Dividenda se isplaćuje samo ako je proglasi nadležno tijelo kompanije i ako postoje zakonski raspoloživa sredstva.",
          "Drugim riječima: nije riječ o obveznici bez rizika, novcu ili bitcoinu u vlastitom posjedu.",
          "Strategy je predložio češću, polumjesečnu isplatu dividendi, s ciljem poboljšanja likvidnosti i stabilnosti cijene.",
          "Zato ga treba čitati drukčije od obične dionice MSTR-a. MSTR privlači veću volatilnost, dok STRC pokušava ponuditi profil bliži nominalnoj vrijednosti od 100 dolara i redovitom novčanom toku.",
          "U pojednostavljenom jeziku: MSTR je više pojačana dionica povezana s Bitcoinom, a STRC je više prihodovni proizvod povezan s kapitalnom strukturom Bitcoin kompanije.",
          "Ne preporučujem kupnju ili prodaju; ovdje samo razdvajam pojmove.",
        ],
      },
      {
        heading: "Zašto bi obitelj gledala STRC?",
        body: [
          "Neka obitelj možda ne želi samo držati bitcoin. Možda želi dio portfelja koji ima novčani tok. Možda želi manju volatilnost od MSTR-a. Možda želi vrijednosni papir koji se pokušava održavati oko 100 dolara.",
          "Možda joj 10% godišnjeg prinosa, ako bi se takav prinos u nekom razdoblju stabilizirao, izgleda kao zanimljiv dio kapitalnog portfelja.",
          "Ali tu treba biti vrlo oprezan. Dividenda nije isto što i sigurnost. Visok prinos nikada ne dolazi bez rizika.",
          "STRC ima rizike: rizik Strategyja kao kompanije, rizik Bitcoin cijene, rizik kapitalne strukture, rizik sposobnosti isplate dividendi, rizik promjene tržišnih uvjeta, rizik likvidnosti, rizik regulatornih promjena, rizik da se cijena ne održi oko 100 dolara i rizik da ulagač ne razumije senioritet i uvjete instrumenta.",
          "Zato STRC ne bih stavio u kategoriju novca, nego u kategoriju kapitalnih dobara, odnosno vrijednosnih papira.",
          "Može imati mjesto u portfelju. Ali nije zamjena za bitcoin pod osobnom kontrolom.",
        ],
      },
      {
        heading: "Gdje ovo pripada u osobnom Bitcoin standardu?",
        body: [
          "U okviru osobnog Bitcoin standarda razlikujemo novac, kapitalna dobra i potrošačka dobra.",
          "Bitcoin u vlastitom posjedu najčišće pripada dijelu novca.",
          "ETF, MSTR, STRC i slični proizvodi više pripadaju dijelu kapitala, odnosno proizvodne imovine ili financijskih instrumenata.",
          "Ta razlika je važna. Kad osoba kaže da ima bitcoin, prvo treba pitati u kojem obliku.",
          "Bitcoin u vlastitoj pohrani nije isto što i Bitcoin ETF. Bitcoin ETF nije isto što i MSTR. MSTR nije isto što i STRC. STRC nije isto što i bitcoin u višepotpisnom trezoru.",
          "Svi ti oblici mogu biti povezani s Bitcoinom. Ali nemaju istu funkciju.",
        ],
        link: {
          before: "Za temeljnu podjelu uloga imovine pročitajte vodič",
          label: "Novac, potrošna dobra i proizvodna imovina",
          href: "/vodici/novac-kapital-potrosnja/",
          after: "jer je to osnova ove razlike.",
        },
      },
      {
        heading: "Kako razmišljati o riziku i prinosu?",
        body: [
          "Kod svakog od ovih proizvoda treba pitati što točno posjedujem, tko drži bitcoin, tko ima ključeve, gdje je rizik skrbnika, gdje je pravni rizik i gdje je tržišni rizik.",
          "Treba pitati postoji li prihod, odakle dolazi taj prihod, što se događa ako Bitcoin padne 50%, što se događa ako tržište izgubi povjerenje, što se događa ako kompanija ne može izdavati nove instrumente i što se događa ako obitelj mora naslijediti taj proizvod.",
          "Nije dovoljno gledati samo očekivani prinos. Treba gledati što se događa u lošem scenariju.",
        ],
      },
      {
        heading: "Kako ovo može izgledati u osobnom planu?",
        body: [
          "Primjer obiteljskog plana mogao bi izgledati ovako: dio bitcoina u vlastitoj pohrani kao novac, dio izloženosti kroz ETF u brokerskom portfelju, manji dio kroz Bitcoin rizničke kompanije kao kapitalni rizik, mali dio na burzi samo radi likvidnosti i jasan plan prijelaza prema većoj samostalnoj pohrani ako znanje i obiteljska spremnost porastu.",
          "Navedeno nije preporuka, nego primjer kako razmišljati o ulogama različitih dijelova imovine.",
          "Svačija situacija je drukčija. Netko nema obitelj. Netko ima malu djecu. Netko ima supružnika koji ne želi ništa znati o Bitcoinu. Netko ima postojeći portfelj vrijednosnih papira. Netko ima firmu. Netko ima većinu neto imovine u nekretnini. Netko ima dug. Netko tek počinje.",
          "Zato plan ne može biti isti.",
        ],
        link: {
          before: "Za razliku između samostalne pohrane i skrbnika pogledajte",
          label: "Samostalna pohrana ili skrbnik",
          href: "/vodici/samostalna-pohrana-ili-skrbnik/",
          after: "kao povezani okvir odluke.",
        },
      },
      {
        heading: "Uloga savjetovanja",
        body: [
          "U Bitcoin savjetovanju možemo razgovarati o ovim pitanjima bez ideološkog pritiska.",
          "Ne moramo odmah zaključiti da sve mora biti u samostalnoj pohrani. Ne moramo zaključiti ni da je ETF dovoljan.",
          "Prvo treba razumjeti koliki je iznos, što je cilj, koji je vremenski horizont, koliko obitelj razumije, postoji li brokerski portfelj, postoji li postojeći porezni ili pravni okvir, koliko osoba želi tehničke odgovornosti, koliko je važna otpornost na cenzuru, koliko je važna jednostavnost nasljeđivanja, koliko je važna likvidnost i koliko je važan prihod.",
          "Ja ne mogu dati investicijski, porezni ili pravni savjet o tome što točno kupiti, držati ili prodati.",
          "Ali mogu pomoći razjasniti logiku. Mogu pomoći razlikovati novac od kapitala. Mogu pomoći vidjeti gdje skrbnik ima mjesto, a gdje je nepotreban rizik. Mogu pomoći napraviti plan prijelaza. Mogu pomoći da odluka bude mirnija.",
        ],
        link: {
          before: "Ako želite razgovarati o vlastitoj situaciji, krenite od",
          label: "uvodnog Bitcoin razgovora",
          href: "/razgovor/",
          after: "bez potrebe da unaprijed imate gotov odgovor.",
        },
      },
      {
        heading: "Zaključak",
        body: [
          "Bitcoin nije samo jedna odluka. Nije samo kupiti ili ne kupiti. Nije samo burza ili hardverski novčanik. Nije samo ETF ili vlastiti ključevi.",
          "Za ozbiljnu osobu i obitelj, Bitcoin postaje pitanje strukture imovine.",
          "Jedan dio može biti novac pod osobnom kontrolom. Jedan dio može biti kapitalna izloženost. Jedan dio može biti prijelazno rješenje. Jedan dio može biti neprikladan, ako rizik nije shvaćen.",
          "ETF-ovi, burze i Bitcoin rizničke kompanije imaju svoje mjesto. Ali samo ako znamo što jesu.",
          "Nisu isto što i bitcoin u vlastitom posjedu. Nisu isto što i obiteljski višepotpisni trezor. Nisu nužno loši. Nisu nužno dobri.",
          "To su alati, a alati imaju smisla samo kada znamo zašto ih koristimo.",
        ],
        link: {
          before: "Za primjer vlastitog obiteljskog sustava pročitajte",
          label: "obiteljski Bitcoin trezor",
          href: "/vodici/obiteljski-bitcoin-trezor/",
          after: "kao kontrast financijskoj izloženosti Bitcoinu.",
        },
      },
    ],
    finalCta: "Dogovorite uvodni Bitcoin razgovor",
    finalCtaPrompt:
      "Ako imate Bitcoin izloženost kroz ETF, burzu, brokera ili Bitcoin rizničku kompaniju, vrijedi razjasniti što točno posjedujete i koju ulogu to ima u vašoj neto imovini.",
  },
  {
    slug: "obiteljski-bitcoin-trezor",
    title: "Obiteljski Bitcoin trezor: sigurnost, oporavak i nasljeđivanje",
    seoTitle: "Obiteljski Bitcoin trezor: sigurnost, oporavak i nasljeđivanje",
    metaDescription:
      "Vodič za obitelji koje žele složiti Bitcoin sigurnost tako da sredstva ne ovise o jednoj osobi, jednom uređaju ili jednoj lokaciji.",
    excerpt:
      "Bitcoin mora ostati pod vašom kontrolom, ali ne smije ovisiti samo o jednoj osobi, jednom uređaju ili jednom papiriću.",
    category: "Sigurnost i obitelj",
    difficulty: "Napredno",
    freshness: "stabilno",
    safetyNote: advancedSecuritySafetyNote,
    order: 102,
    featured: true,
    publishedAt: "2026-05-12",
    updatedAt: "2026-05-12",
    practicalQuestion:
      "Može li vaša obitelj razumjeti i oporaviti Bitcoin sustav bez panike, nagađanja i predaje kontrole pogrešnoj osobi?",
    relatedSlugs: [
      "sigurnost-ne-smije-ovisiti-samo-o-vama",
      "obiteljski-pristup-bitcoinu",
      "bitcoin-u-neto-imovini",
    ],
    visual: {
      type: "safety",
      title: "Obiteljski trezor",
      zones: [
        {
          label: "ključevi",
          description: "jedan ključ nije dovoljan za pomicanje sredstava",
        },
        {
          label: "lokacije",
          description: "jedna lokacija nije dovoljna za gubitak svega",
        },
        {
          label: "upute",
          description: "obitelj zna što ne smije napraviti u panici",
        },
      ],
      caption:
        "Nije univerzalni recept, nego primjer za razmišljanje o obiteljskoj sigurnosti.",
    },
    sections: [
      {
        heading: "Bitcoin sloboda ima drugu stranu",
        body: [
          "Bitcoin donosi slobodu koju prije nismo imali. Možete držati novac bez banke. Možete ga poslati bez dopuštenja. Možete ga čuvati izvan financijskog sustava. Možete ga prenijeti preko granice kao informaciju. Možete ga ostaviti obitelji.",
          "Ali ta sloboda ima drugu stranu. Ako krivo složite sigurnost, nitko vam ne može vratiti izgubljene ključeve. Ako sve ovisi o vama, obitelj možda neće moći doći do bitcoina ako vam se nešto dogodi. Ako sve stavite na jedno mjesto, jedan požar, jedna krađa ili jedna greška mogu uništiti godine štednje.",
          "Zato veći iznos bitcoina ne treba promatrati kao aplikaciju na mobitelu. Treba ga promatrati kao obiteljski trezor. Ne trezor u banci. Ne trezor kojemu drugi imaju ključ. Nego osobni sustav u kojem su jasno odvojeni ključevi, uređaji, pričuvne kopije, upute, obiteljski plan, tehnička pomoć i nasljeđivanje.",
          "Cilj nije napraviti sustav koji izgleda pametno. Cilj je napraviti sustav koji preživi stvarni život.",
        ],
      },
      {
        heading: "Prvo pitanje nije koji uređaj kupiti",
        body: [
          "Većina ljudi sigurnost Bitcoina počinje pitanjem: koji hardverski novčanik kupiti? To nije loše pitanje. Ali nije prvo pitanje.",
          "Prvo pitanje glasi: što se mora dogoditi ako ja više nisam tu? Ako je odgovor da nitko ne zna, sustav nije dobar. Ako je odgovor da je sve u vašoj glavi, sustav nije dobar. Ako su seed riječi negdje skrivene, ali nitko ne zna gdje, sustav nije dobar.",
          "Ako obitelj zna da postoji plan, zna gdje su upute, zna koga kontaktirati i zna što ne smije napraviti, tada sustav počinje imati smisla.",
          "Bitcoin sigurnost nije samo zaštita od lopova. Bitcoin sigurnost je i zaštita od zaborava, požara, smrti, panike, loših uputa i obiteljske nejasnoće.",
        ],
      },
      {
        heading: "Jednostavna slika: sef s tri ključa",
        body: [
          "Za veći obiteljski iznos dobar model je višepotpisni sustav 2 od 3. To znači da postoje tri ključa, a za pomicanje bitcoina trebaju bilo koja dva.",
          "Ako imate ključ A i ključ B, možete pomaknuti bitcoin. Ako imate ključ A i ključ C, možete pomaknuti bitcoin. Ako imate ključ B i ključ C, možete pomaknuti bitcoin. Ali jedan ključ sam po sebi nije dovoljan.",
          "To je kao obiteljski sef koji se ne može otvoriti jednim ključem. Trebaju dva od tri.",
          "U stvarnom životu stvari nestaju. Uređaj se može pokvariti. Jedna lokacija može izgorjeti. Jedan papir može biti izgubljen. Jedna osoba može postati nedostupna. Jedan proizvođač uređaja može nestati. Jedan član obitelji može pogriješiti.",
          "Kod jednog ključa, jedna ozbiljna greška može biti kraj. Kod 2 od 3 sustava, jedna greška ne mora biti kraj.",
        ],
      },
      {
        heading: "Predloženi sustav",
        body: [
          "Za ozbiljan obiteljski Bitcoin trezor primjer sustava može izgledati tehnički, ali ideja je jednostavna: jedno računalo provjerava Bitcoin mrežu, drugo služi za rad sa Sparrowom, a tri hardverska novčanika čuvaju ključeve.",
          "Lenovo mini PC služi za provjeru Bitcoin mreže. ThinkPad služi za otvaranje Sparrowa i pripremu transakcija. Tri hardverska novčanika čuvaju ključeve. Sparrow povezuje sve u jedan obiteljski trezor.",
          "Sparrow ne treba biti mjesto gdje nastaju ili žive privatni ključevi. Njegova uloga je koordinacija.",
        ],
        items: [
          "Lenovo mini PC",
          "Debian",
          "Bitcoin Core",
          "Fulcrum",
          "ThinkPad laptop",
          "Linux Mint",
          "Sparrow",
          "COLDCARD Q",
          "BitBox02 Bitcoin-only",
          "Foundation Passport Core",
          "višepotpisni novčanik 2 od 3",
        ],
        visual: {
          type: "logo-grid",
          title: "Softverski sloj obiteljskog trezora",
          caption:
            "Ovi logotipi ne znače preporuku proizvoda za svaku obitelj. Služe da se tehnički pojmovi lakše povežu s konkretnim alatima u primjeru sustava.",
          items: [
            {
              name: "Debian",
              description: "stabilan poslužiteljski operativni sustav",
              src: "/guide-assets/debian-logo.svg",
              alt: "Debian logo",
              href: "https://www.debian.org/",
              credit: "Logo: Debian Open Use",
            },
            {
              name: "Bitcoin Core",
              description: "program koji samostalno provjerava Bitcoin mrežu",
              src: "/guide-assets/bitcoin-core-logo.svg",
              alt: "Bitcoin Core logo",
              href: "https://bitcoincore.org/",
              credit: "Logo: Bitcoin Core",
            },
            {
              name: "Linux Mint",
              description: "pristupačniji Linux za obiteljsko Bitcoin računalo",
              src: "/guide-assets/linux-mint-logo.svg",
              alt: "Linux Mint logo",
              href: "https://linuxmint.com/",
              credit: "Logo: Linux Mint, CC BY 3.0",
            },
            {
              name: "Sparrow",
              description: "koordinacijski novčanik za prikaz i potpisivanje",
              src: "/guide-assets/sparrow-wallet-logo.png",
              alt: "Sparrow Wallet logo",
              href: "https://sparrowwallet.com/",
              credit: "Logo: Sparrow Wallet",
            },
          ],
        },
      },
      {
        heading: "Zašto ne samo aplikacija na mobitelu?",
        body: [
          "Mobitel je dobar za mali iznos. Mobitel nije dobar za obiteljski trezor.",
          "Na mobitelu su poruke, e-mail, fotografije, aplikacije, poveznice, lažne poruke, ažuriranja, svakodnevna nepažnja i previše navika. Mobitel je stalno povezan s internetom. Često ga nosimo svugdje. Djeca ga diraju. Pada na pod. Može biti ukraden. Može biti kompromitiran.",
          "Za manji iznos koji koristite svakodnevno, mobilni novčanik može imati smisla. Za obiteljski Bitcoin trezor, ne.",
          "Obiteljski trezor treba biti dosadan. Treba se koristiti rijetko. Treba biti odvojen od svakodnevnog života.",
        ],
      },
      {
        heading: "Uloga mini računala",
        body: [
          "Lenovo mini PC nije novčanik. On ne čuva bitcoin. Ne čuva seed riječi. Ne potpisuje transakcije.",
          "Njegova uloga je druga: služi da sami provjeravate Bitcoin mrežu i da ne morate pitati tuđi poslužitelj koliko bitcoina imate.",
          "Na njemu rade Bitcoin Core i Fulcrum. Bitcoin Core preuzima i provjerava Bitcoin lanac blokova. Fulcrum služi kao privatni Electrum poslužitelj koji Sparrowu brzo odgovara na pitanja: koje adrese imaju povijest, koji su UTXO-i dostupni i kakvo je stanje novčanika.",
          "Za ozbiljan dugoročan sustav ima smisla koristiti mini PC s barem 2 TB NVMe diskom, žičnom mrežom i stabilnim napajanjem.",
          "Mini računalo ne mora biti posebno snažno. Važnije je da bude stabilno, tiho, pouzdano i da godinama može raditi jednu stvar.",
        ],
      },
      {
        heading: "Zašto privatni Electrum poslužitelj?",
        body: [
          "Ako Sparrow koristite preko javnog poslužitelja, taj poslužitelj ne može ukrasti bitcoin. Nema privatne ključeve. Ali može vidjeti previše.",
          "Može vidjeti koje adrese provjeravate. Može povezati vaše UTXO-e. Može znati kada otvarate novčanik. Ako ne koristite dodatnu zaštitu, može povezati upite s vašom mrežnom adresom.",
          "Kod malog iznosa to možda nije presudno. Kod većeg obiteljskog trezora jest.",
          "Bolji model je: Sparrow → vaš Fulcrum → vaš Bitcoin Core → Bitcoin mreža.",
          "To znači da vaš novčanik ne pita nepoznati javni poslužitelj što posjedujete. Pita vaš vlastiti poslužitelj.",
        ],
      },
      {
        heading: "Uloga ThinkPada",
        body: [
          "ThinkPad s Linux Mintom je obiteljsko Bitcoin računalo. Na njemu je Sparrow.",
          "To računalo ne služi za posao, e-mail, dopisivanje, YouTube, društvene mreže, bankarstvo i svakodnevno surfanje. Ako postane svakodnevno računalo, sigurnosna korist se smanjuje.",
          "Njegova uloga je jednostavna: otvoriti Sparrow, spojiti se na privatni Fulcrum, vidjeti stanje trezora, pripremiti transakciju, potpisati je s dva hardverska novčanika, zatvoriti Sparrow i ugasiti računalo.",
          "Za poslužitelj ima smisla koristiti Debian. Za laptop koji netko stvarno treba otvoriti i koristiti, Linux Mint je pristupačniji izbor.",
          "Ovo računalo treba biti dovoljno jednostavno da ga član obitelji može upaliti i slijediti upute. Ne treba biti tehnički eksperiment.",
        ],
      },
      {
        heading: "Uloga Sparrowa",
        body: [
          "Sparrow je kontrolna ploča. On pokazuje stanje, adrese, transakcije, UTXO-e, naknade i strukturu novčanika. On priprema transakciju.",
          "Ali Sparrow ne bi trebao čuvati privatne ključeve za obiteljski trezor.",
          "Dobar model je jednostavan: Sparrow vidi i priprema, hardverski novčanici potpisuju, privatni ključevi ostaju izvan računala.",
          "Zato je Sparrow dobar za obiteljski trezor: dovoljno je moćan za ozbiljan sustav, ali ne mora biti mjesto najvećeg rizika.",
        ],
      },
      {
        heading: "Tri hardverska novčanika",
        body: [
          "Za 2 od 3 sustav ima smisla koristiti tri različita proizvođača: COLDCARD Q, BitBox02 Bitcoin-only i Foundation Passport Core.",
          "Ne zato što su to jedini mogući uređaji. Nego zato što daju dobar omjer sigurnosti, različitosti i praktičnosti.",
          "Ne bih kupio tri ista uređaja. Ne želite da cijeli obiteljski trezor ovisi o jednom proizvođaču, jednom ugrađenom softveru, jednom načinu rada i jednom mogućem problemu.",
          "Tri različita uređaja smanjuju ovisnost o jednoj točki kvara.",
        ],
        visual: {
          type: "image-grid",
          title: "Tri različita potpisnika",
          caption:
            "Kod obiteljskog 2 od 3 sustava uređaji nisu ukras. Svaki je jedan neovisan ključ u istom trezoru.",
          items: [
            {
              name: "COLDCARD Q",
              description: "stroži potpisnik za osobu koja vodi sustav",
              src: "/guide-assets/coldcard-q.png",
              alt: "COLDCARD Q hardverski novčanik",
              href: "https://coldcard.com/q",
              credit: "Slika: COLDCARD",
            },
            {
              name: "BitBox02 Bitcoin-only",
              description: "jednostavniji obiteljski potpisnik",
              src: "/guide-assets/bitbox02-bitcoin-only.png",
              alt: "BitBox02 Bitcoin-only hardverski novčanik",
              href: "https://bitbox.swiss/bitbox02/bitcoin-only/",
              credit: "Slika: BitBox",
            },
            {
              name: "Passport Core",
              description: "treći QR potpisnik za airgapped rad",
              src: "/guide-assets/passport-core.webp",
              alt: "Foundation Passport Core hardverski novčanik",
              href: "https://foundation.xyz/passport-core/",
              credit: "Slika: Foundation",
            },
          ],
        },
      },
      {
        heading: "COLDCARD Q",
        body: [
          "COLDCARD Q bih koristio kao glavni sigurnosni potpisnik. To je uređaj za osobu koja razumije Bitcoin i želi stroži način rada. Ima fizičku tipkovnicu, veći ekran, QR čitač, microSD utore i može raditi na baterije.",
          "Njegova uloga u obitelji može biti ključ A: glavni sigurnosni ključ, najbolje kod osobe koja vodi sustav. Ne mora ga svaki član obitelji koristiti svakodnevno.",
          "COLDCARD je odličan, ali nije najjednostavniji uređaj za početnika. Zato ne bih cijeli obiteljski plan gradio tako da ga svi moraju znati koristiti pod stresom.",
        ],
      },
      {
        heading: "BitBox02 Bitcoin-only",
        body: [
          "BitBox02 Bitcoin-only bih koristio kao najjednostavniji obiteljski potpisnik. Prednost Bitcoin-only inačice je manja složenost. Manje mogućnosti znači manje stvari koje mogu zbuniti korisnika.",
          "Njegova uloga može biti ključ B: jednostavniji obiteljski ključ, dobar za člana obitelji koji ne želi tehnički kompleksan uređaj i koristi se preko USB-a sa Sparrowom.",
          "BitBox02 nije najstroži airgapped uređaj, ali je praktičan i razumljiv. U 2 od 3 sustavu to je prednost.",
        ],
      },
      {
        heading: "Foundation Passport Core",
        body: [
          "Passport Core bih koristio kao treći ključ. Njegova prednost je airgapped rad preko QR kodova. To znači da za potpisivanje ne mora biti izravno spojen kabelom na računalo.",
          "Njegova uloga može biti ključ C: treći obiteljski ključ, dobar za airgapped QR potpisivanje i dobar za nasljedni plan.",
          "Passport je dobar jer je vizualno razumljiviji od COLDCARD-a, a ipak ostaje ozbiljan uređaj.",
          "Ako Passport Core trenutačno nije dostupan, to ne ruši cijeli plan. Važno je razumjeti zašto je odabran: ne zato što sustav ovisi baš o Passportu, nego zato što treba treći neovisan ključ koji je dovoljno siguran, razumljiv i odvojen od prva dva proizvođača.",
          "O tome više u napomeni pri kraju vodiča.",
        ],
      },
      {
        heading: "Zašto 2 od 3, a ne 3 od 3?",
        body: [
          "3 od 3 izgleda sigurnije, ali u stvarnom životu često nije. Ako su potrebna sva tri ključa, gubitak jednog ključa znači problem.",
          "Kod 2 od 3 sustava gubitak jednog ključa nije kraj. Ako se jedan uređaj pokvari, ako jedna lokacija izgori ili ako jedna pričuvna kopija nestane, i dalje postoje dva ključa.",
          "Za obitelj je to važno. Cilj nije samo spriječiti krađu. Cilj je spriječiti i gubitak pristupa.",
        ],
      },
      {
        heading: "Što su seed riječi?",
        body: [
          "Seed riječi su pričuvna kopija ključa. Hardverski novčanik je uređaj. Može se pokvariti, izgubiti ili prestati raditi. Seed riječi omogućuju da se isti ključ obnovi na novom uređaju.",
          "Zato seed riječi treba čuvati ozbiljnije od samog uređaja.",
          "Bitcoin nije na uređaju. Bitcoin je na Bitcoin mreži. Uređaj čuva ključ kojim se može potpisati transakcija. Seed riječi su pričuvna kopija tog ključa.",
        ],
      },
      {
        heading: "Kako se backupaju seed riječi?",
        body: [
          "Seed riječi se backupaju fizički. Ne digitalno.",
          "Za ozbiljan obiteljski sustav, seed se prvo zapiše na papir radi provjere, a zatim se trajno spremi na metalni backup.",
          "Papir je dobar za početak, ali može izgorjeti, smočiti se ili propasti. Metalni backup je bolji za dugoročnu pohranu.",
          "Seed riječi nikada ne idu u mobitel, cloud, e-mail ili fotografiju.",
        ],
        items: [
          "ne slikati mobitelom",
          "ne spremati u bilješke na mobitelu",
          "ne spremati u Google Drive",
          "ne slati e-mailom",
          "ne stavljati u upravitelj lozinki",
          "ne printati preko tuđeg printera",
          "ne diktirati preko telefona",
        ],
      },
      {
        heading: "Što znači da seed ne bude na istoj lokaciji kao uređaj?",
        body: [
          "To znači da hardverski novčanik i njegove seed riječi ne držite zajedno. Loš primjer je ladica doma u kojoj stoje COLDCARD Q, COLDCARD seed riječi i upute. Ako lopov pronađe tu ladicu, pronašao je previše.",
          "Bolji primjer je da kod kuće stoji COLDCARD Q, a na drugoj lokaciji COLDCARD seed backup. Uređaj i njegov backup trebaju biti razdvojeni.",
          "Ako netko ukrade uređaj, nema njegov seed. Ako netko pronađe seed, nema ostale ključeve. Kod 2 od 3 sustava jedan seed nije dovoljan za krađu, ali svejedno ne treba olakšavati napad.",
        ],
      },
      {
        heading: "Konkretan primjer raspodjele u Hrvatskoj",
        body: [
          "Zamislimo realnu obitelj u Hrvatskoj. Postoji glavni dom. Postoji druga obiteljska lokacija. Postoji bankovni sef ili odvjetnik. Postoji još jedna lokacija kod pouzdane osobe ili u drugom gradu.",
          "Raspodjela može izgledati i drukčije. Važno je glavno pravilo: ne držati sve na jednom mjestu.",
        ],
        items: [
          "Lokacija A, dom: Lenovo mini PC, ThinkPad, COLDCARD Q, obiteljska uputa bez seed riječi i kopija Sparrow descriptora.",
          "Lokacija B, bankovni sef: BitBox02, COLDCARD seed backup i zapečaćena uputa za nasljednike.",
          "Lokacija C, odvjetnik ili osoba od povjerenja: Passport Core, BitBox02 seed backup i kontakt tehničke osobe.",
          "Lokacija D, druga obiteljska lokacija: Passport seed backup, dodatna kopija Sparrow descriptora i tehnički dodatak.",
        ],
      },
      {
        heading: "Što je Sparrow descriptor?",
        body: [
          "Kod 2 od 3 sustava nisu dovoljna samo tri seeda. Treba znati kako su ta tri ključa spojena u jedan novčanik.",
          "Tu služi Sparrow descriptor, wallet policy ili izvoz novčanika.",
          "On opisuje strukturu novčanika.",
          "Descriptor sam po sebi ne bi trebao biti dovoljan za krađu, jer ne sadrži privatne ključeve. Ali otkriva privatnost novčanika. Zato ga ne treba držati javno ili u cloud folderu.",
          "Za nasljeđivanje je iznimno važan. Bez njega nasljednici mogu imati seedove, ali ne znati kako rekonstruirati novčanik.",
        ],
        items: [
          "ovo je 2 od 3 višepotpisni novčanik",
          "ovo su javni ključevi",
          "ovo su fingerprinti",
          "ovo su derivation pathovi",
          "ovo je tip adresa",
          "ovo je način na koji se novčanik rekonstruira",
        ],
      },
      {
        heading: "Kako izgleda primanje bitcoina?",
        body: [
          "Primanje je jednostavno. Za primanje ne trebaju hardverski novčanici.",
          "Kod ozbiljnog iznosa ne žuri se. Prvo mali test. Zatim veći prijenos.",
        ],
        items: [
          "Upalite ThinkPad.",
          "Otvorite Sparrow.",
          "Sparrow se spoji na vaš Fulcrum.",
          "Kliknete Receive.",
          "Sparrow pokaže novu adresu.",
          "Provjerite adresu.",
          "Pošaljete mali testni iznos.",
          "Pričekate potvrdu.",
          "Tek zatim šaljete veći iznos.",
        ],
      },
      {
        heading: "Kako izgleda slanje bitcoina?",
        body: [
          "Slanje traži dva potpisa. Primjerice, koristite COLDCARD i BitBox.",
          "Ako COLDCARD nije dostupan, možete koristiti BitBox i Passport. Ako BitBox nije dostupan, možete koristiti COLDCARD i Passport. Ako Passport nije dostupan, možete koristiti COLDCARD i BitBox. U tome je poanta 2 od 3 sustava.",
        ],
        items: [
          "Upalite ThinkPad.",
          "Otvorite Sparrow.",
          "Sparrow pokaže stanje trezora.",
          "Unesete adresu primatelja.",
          "Provjerite adresu više puta.",
          "Sparrow pripremi nepotpisanu transakciju.",
          "COLDCARD potpiše transakciju.",
          "BitBox potpiše transakciju.",
          "Sparrow pošalje transakciju u Bitcoin mrežu.",
          "Zapišete što ste napravili.",
        ],
      },
      {
        heading: "Što ako izgori dom?",
        body: [
          "Ako izgori dom, možda ste izgubili ThinkPad, Lenovo mini PC i COLDCARD Q. Ali niste izgubili bitcoin.",
          "I dalje mogu postojati BitBox02 na lokaciji B, Passport Core na lokaciji C, COLDCARD seed backup na lokaciji B, BitBox seed backup na lokaciji C, Passport seed backup na lokaciji D i Sparrow descriptor na lokaciji D.",
          "Tada kupite novi laptop, instalirate Sparrow, učitate descriptor i koristite dva dostupna ključa za premještanje sredstava u novi sustav.",
          "Bitcoin nije nestao jer jedna lokacija nije bila dovoljna za uništenje cijelog sustava.",
        ],
      },
      {
        heading: "Što ako netko ukrade jedan uređaj?",
        body: [
          "Ako netko ukrade COLDCARD, nema dovoljno za krađu. Treba mu još jedan ključ. Ako netko ukrade jedan seed backup, opet nema dovoljno za krađu.",
          "Razlika u odnosu na jednostavni novčanik je ogromna: tamo jedan seed znači sve.",
          "Ali to ne znači da kompromitaciju ignorirate. Ako posumnjate da je jedan ključ otkriven, treba mirno napraviti novi sustav i premjestiti sredstva u novi 2 od 3 trezor.",
        ],
      },
      {
        heading: "Što ako se vama nešto dogodi?",
        body: [
          "Najvažniji test dolazi tek ako se vama nešto dogodi. Obitelj tada ne smije ostati s rečenicom: znamo da postoji bitcoin, ali ne znamo što sada.",
          "Zato mora postojati obiteljski dokument. Taj dokument ne mora sadržavati seed riječi. Dapače, ne bi trebao sadržavati sve što je potrebno za krađu. Ali mora objasniti sustav.",
          "Obitelj ne mora odmah razumjeti UTXO, PSBT, descriptor i derivation path. Ali mora znati što ne smije napraviti.",
        ],
        items: [
          "Ova obitelj ima Bitcoin trezor složen kao 2 od 3 višepotpisni sustav.",
          "Za pomicanje sredstava trebaju dva od tri ključa.",
          "Ključ A: COLDCARD Q.",
          "Ključ B: BitBox02 Bitcoin-only.",
          "Ključ C: Passport Core.",
          "Ne unositi seed riječi u mobitel.",
          "Ne slikati seed riječi.",
          "Ne slati seed riječi nikome.",
          "Ne tražiti pomoć na Telegramu.",
          "Ne vjerovati nikome tko se javlja kao podrška.",
          "Ne žuriti.",
          "Prvo otvoriti upute, zatim kontaktirati osobu X i odvjetnika Y.",
        ],
      },
      {
        heading: "Dvije razine dokumentacije",
        body: [
          "Za obiteljski Bitcoin trezor trebaju dvije vrste uputa.",
          "Obiteljska uputa pisana je jednostavnim jezikom. Sadrži što postoji, što se ne smije napraviti, gdje su opće lokacije, koga kontaktirati, koji je redoslijed koraka i zašto ne treba žuriti. Ne sadrži sve seed riječi i ne sadrži sve privatne tajne na jednom mjestu.",
          "Tehnički dodatak pisan je za osobu koja zna Sparrow i Bitcoin. Ne piše se za svakodnevno čitanje, nego za oporavak u izvanrednoj situaciji.",
        ],
        items: [
          "naziv novčanika",
          "2 od 3 struktura",
          "tip adresa",
          "fingerprinti",
          "xpubovi",
          "derivation pathovi",
          "descriptor novčanika",
          "Sparrow izvoz novčanika",
          "upute za uvoz u Sparrow",
          "upute za spajanje na privatni Fulcrum",
          "upute za potpisivanje s dva uređaja",
        ],
      },
      {
        heading: "Gdje stoji obiteljska uputa?",
        body: [
          "Obiteljska uputa može stajati doma, u bankovnom sefu, kod odvjetnika, kod javnog bilježnika ili kod osobe od povjerenja.",
          "Ali treba paziti: nitko ne smije imati sve dijelove sam.",
          "Dobar plan dopušta obitelji pristup u slučaju smrti, ali ne dopušta jednoj osobi jednostavnu krađu.",
        ],
      },
      {
        heading: "Što s odvjetnikom ili javnim bilježnikom?",
        body: [
          "U Hrvatskoj je realno koristiti odvjetnika, javnog bilježnika ili bankovni sef kao dio obiteljskog plana.",
          "Ali treba biti jasan: većina odvjetnika i javnih bilježnika ne razumije Bitcoin višepotpisni sustav. Zato im se ne daje tehnička odgovornost koju ne mogu nositi.",
          "Njihova uloga može biti čuvati zapečaćenu uputu, potvrditi identitet nasljednika, otvoriti dokument u slučaju smrti ili držati jedan fizički dio plana.",
          "Ne bih očekivao da odvjetnik zna rekonstruirati Sparrow novčanik. Za to treba posebna tehnička osoba od povjerenja.",
        ],
      },
      {
        heading: "Tehnička osoba od povjerenja",
        body: [
          "Dobro je imati jednu osobu koja razumije Bitcoin dovoljno da pomogne obitelji. Ali ta osoba ne bi trebala sama imati pristup sredstvima.",
          "Ta razlika je važna: tehnička osoba zna pomoći, ali nema dva ključa, nema sve seedove i nema potpunu kontrolu.",
          "Tako obitelj ima pomoć, ali ne stvara se nova točka povjerenja.",
        ],
      },
      {
        heading: "Treba li koristiti passphrase?",
        body: [
          "Za obiteljski sustav bio bih oprezan. Passphrase može povećati sigurnost, ali može uništiti nasljeđivanje.",
          "Ako passphrase zna samo jedna osoba i ta osoba umre, obitelj može imati uređaje, seedove i upute, ali i dalje izgubiti pristup.",
          "Kod 2 od 3 sustava već postoji jaka sigurnost. Zato bih u prvoj verziji radije imao čist 2 od 3 bez dodatne passphrase komplikacije.",
          "Passphrase ima smisla tek ako je i njezin oporavak savršeno dokumentiran. Za većinu obitelji vrijedi pravilo: bolji je sustav koji obitelj stvarno može oporaviti nego savršeno tvrd sustav koji nitko ne zna koristiti.",
        ],
      },
      {
        heading: "Godišnja provjera",
        body: [
          "Obiteljski Bitcoin trezor treba provjeriti barem jednom godišnje. Ne zato što Bitcoin treba održavanje. Bitcoin mreža radi bez vas. Ali vaši uređaji, dokumenti, lokacije i ljudi trebaju provjeru.",
          "Može se napraviti i mali test s malim iznosom. Ne provjeravate sustav zato da stalno mičete veliki bitcoin, nego da znate da oporavak i potpisivanje stvarno rade.",
        ],
        items: [
          "Lenovo mini PC se pali",
          "Bitcoin Core radi",
          "Fulcrum radi",
          "ThinkPad se pali",
          "Sparrow se otvara",
          "novčanik pokazuje očekivano stanje",
          "COLDCARD se pali",
          "BitBox se pali",
          "Passport se pali",
          "zna se gdje su seed backupi",
          "obiteljska uputa je ažurna",
          "tehnička osoba je dostupna",
          "lokacije su i dalje valjane",
        ],
      },
      {
        heading: "Najveće greške",
        body: [
          "Najveće greške nisu uvijek tehničke. Najveće greške su često ljudske.",
          "Dobar sustav smanjuje potrebu za improvizacijom.",
        ],
        items: [
          "svi seedovi u istoj kuverti",
          "sva tri uređaja u istoj ladici",
          "seed riječi fotografirane mobitelom",
          "seed riječi spremljene u mrežnu pohranu",
          "Sparrow bez descriptora",
          "passphrase koju zna samo jedna osoba",
          "obitelj ne zna da plan postoji",
          "obitelj zna da bitcoin postoji, ali ne zna što ne smije napraviti",
          "tehnička osoba ima previše kontrole",
          "sve se radi u panici",
        ],
      },
      {
        heading: "Kako ovo objasniti obitelji?",
        body: [
          "Ne treba početi s tehnologijom. Treba reći jednostavno: imamo obiteljski Bitcoin sef. Ne otvara se jednim ključem. Postoje tri ključa, a trebaju dva. Jedan ključ sam po sebi nije dovoljan.",
          "Ako se meni nešto dogodi, postoje upute. Ne smijete slikati riječi, slati ih nikome ni unositi ih u aplikacije. Ne treba žuriti. Prvo se čitaju upute i zove se osoba navedena u dokumentu.",
          "Obitelj ne mora odmah znati sve. Ali mora znati da sustav postoji i da se ne smije dirati panično.",
        ],
      },
      {
        heading: "Napomena o odabiru uređaja i softvera",
        body: [
          "U ovom vodiču predložen je konkretan sustav: Lenovo mini PC, Debian, Bitcoin Core, Fulcrum, ThinkPad, Linux Mint, Sparrow, COLDCARD Q, BitBox02 Bitcoin-only i Foundation Passport Core.",
          "To nije jedini mogući sustav, nego jedan razuman primjer koji pokušava spojiti sigurnost, jednostavnost, dugoročnu održivost i obiteljsku razumljivost.",
          "Kod ovakvog plana nije dovoljno pitati koji je proizvod najsigurniji na papiru. Treba pitati može li se sustav održavati godinama, može li ga obitelj razumjeti, postoje li upute, postoje li zamjene ako nešto nije dostupno i može li se sustav oporaviti bez jedne osobe.",
        ],
      },
      {
        heading: "Zašto Lenovo mini PC?",
        body: [
          "Lenovo mini PC je odabran jer je dosadan poslovni hardver.",
          "Za Bitcoin Core i Fulcrum ne treba gaming računalo, jaka grafička kartica ni najnoviji procesor. Važnije je da uređaj bude stabilan, tih, popravljiv, dovoljno snažan i prikladan za rad godinama.",
          "Alternativno, tu ulogu mogu imati HP EliteDesk Mini, Dell OptiPlex Micro, Intel NUC ili drugi kvalitetan mini PC.",
          "Važnije od marke je da uređaj ima dovoljno prostora, dobar SSD, dovoljno radne memorije, stabilnu mrežu i da se ne koristi za svakodnevni rad.",
        ],
      },
      {
        heading: "Zašto Debian na mini računalu?",
        body: [
          "Debian je odabran zato što je dobar poslužiteljski sustav: stabilan, konzervativan i predvidljiv.",
          "Na mini računalu ne treba lijepo radno okruženje. Ono treba vrtjeti Bitcoin Core i Fulcrum.",
          "Alternativno, može se koristiti Ubuntu Server, Fedora Server, Linux Mint ako korisnik želi grafičko sučelje ili gotov node sustav poput Start9 ili Umbrel.",
          "Za tehnički čistiji dugoročni poslužitelj, Debian ima smisla. Za korisnika kojem treba jednostavniji početak, gotov node sustav može biti praktičniji.",
        ],
      },
      {
        heading: "Zašto Bitcoin Core i Fulcrum?",
        body: [
          "Bitcoin Core je temelj: on samostalno provjerava Bitcoin mrežu.",
          "Fulcrum služi da Sparrow brzo i privatno čita stanje novčanika preko vašeg vlastitog poslužitelja.",
          "Alternativno, umjesto Fulcruma mogu se koristiti i drugi Electrum poslužitelji, primjerice electrs. Za jednostavnije sustave, Sparrow se može spojiti i izravno na Bitcoin Core, iako privatni Electrum poslužitelj obično daje bolji korisnički doživljaj.",
          "Nije presudno da to bude baš Fulcrum. Presudno je da novčanik ne ovisi o javnom poslužitelju koji vidi vašu povijest i adrese.",
        ],
      },
      {
        heading: "Zašto ThinkPad?",
        body: [
          "ThinkPad je odabran jer je poslovni laptop, ima dobru Linux podršku, dobru tipkovnicu i dobar omjer trajnosti i praktičnosti.",
          "Na tom računalu obitelj otvara Sparrow, provjerava stanje i potpisuje transakcije.",
          "Alternativno, to može biti drugi ThinkPad, Framework laptop, Dell Latitude, HP EliteBook ili MacBook ako obitelj bolje poznaje macOS.",
          "Važno je da to bude odvojeno računalo koje se ne koristi za svakodnevni kaos: e-mail, poruke, društvene mreže, nasumična preuzimanja i sve ostalo što povećava rizik.",
        ],
      },
      {
        heading: "Zašto Linux Mint na ThinkPadu?",
        body: [
          "Linux Mint je odabran jer je jednostavan za korištenje, dovoljno stabilan i razumljiv osobi koja nije duboko tehnička.",
          "Za poslužitelj je bolji Debian. Za obiteljski laptop na kojem se stvarno sjedi i koristi Sparrow, Linux Mint je pristupačniji.",
          "Alternativno, mogu se koristiti Ubuntu, Debian s grafičkim sučeljem, Fedora ili macOS ako se koristi MacBook.",
          "Važno je da sustav bude čist, ažuran i odvojen od svakodnevne uporabe.",
        ],
      },
      {
        heading: "Zašto Sparrow?",
        body: [
          "Sparrow je odabran jer je vrlo dobar koordinacijski novčanik za ozbiljniji Bitcoin sustav.",
          "On dobro radi s hardverskim novčanicima, višepotpisnim sustavima, PSBT transakcijama, vlastitim nodeom i privatnim Electrum poslužiteljem.",
          "Alternativno, moguće je koristiti i Electrum, koji je star, ozbiljan i dokazan novčanik. Ipak, za obiteljski višepotpisni sustav Sparrow je često jasniji jer bolje prikazuje strukturu novčanika, UTXO-e i postupak potpisivanja.",
        ],
      },
      {
        heading: "Zašto COLDCARD Q?",
        body: [
          "COLDCARD Q je odabran kao najtvrđi sigurnosni potpisnik.",
          "Dobar je za osobu koja vodi sustav i želi veću kontrolu. Ima airgapped rad, microSD, QR mogućnosti, dobar ekran i fizičku tipkovnicu.",
          "Alternativno, može se koristiti i COLDCARD Mk4 ili drugi ozbiljan Bitcoin-only uređaj.",
        ],
      },
      {
        heading: "Zašto BitBox02 Bitcoin-only?",
        body: [
          "BitBox02 Bitcoin-only je odabran jer je jednostavniji i obiteljski razumljiviji.",
          "U ovakvom sustavu dobro je imati barem jedan uređaj koji ne izgleda kao tehnički projekt. BitBox02 je dobar drugi ključ jer je jednostavan, Bitcoin-only i dobro radi sa Sparrowom.",
          "Alternativno, tu ulogu može imati i drugi jednostavniji Bitcoin hardverski novčanik, ali treba paziti da dobro radi sa Sparrowom i višepotpisnim sustavom.",
        ],
      },
      {
        heading: "Zašto Passport Core?",
        body: [
          "Passport Core je odabran kao treći airgapped QR ključ.",
          "Dobar je za obiteljski plan jer je ozbiljan, Bitcoin-only, vizualno razumljiv i ne mora se izravno spajati kabelom na računalo.",
          "Ali ako Passport Core nije dostupan, to ne mijenja glavnu logiku sustava. Treći ključ može biti i drugi uređaj.",
        ],
      },
      {
        heading: "Ako Passport Core nije dostupan",
        body: [
          "Ako Passport Core nije dostupan, prvi praktični izbor za obiteljsku zamjenu bio bi Blockstream Jade Plus.",
          "U tom slučaju sustav izgleda ovako: COLDCARD Q, BitBox02 Bitcoin-only i Blockstream Jade Plus.",
          "Jade Plus je gotov uređaj, podržava airgapped QR rad i lakše ga je uklopiti u obiteljsku dokumentaciju nego ručno sastavljene uređaje.",
          "Ako se želi više otvorenosti i ručne provjerljivosti, moguće su i naprednije zamjene: Specter DIY i SeedSigner.",
          "Specter DIY je ručno sastavljen potpisni uređaj koji može imati smisla za tehnički naprednu osobu. Dobar je za učenje, provjerljivost i airgapped rad, ali traži više discipline pri sastavljanju, postavljanju i održavanju.",
          "SeedSigner je još posebniji jer ne sprema seed trajno na uređaju. Seed se učita privremeno, najčešće preko QR koda, koristi se za potpisivanje i briše se kada se uređaj ugasi. Sigurnosno je zanimljiv, ali obiteljski zahtjevniji jer nasljednik mora razumjeti kako učitati seed i koristiti uređaj bez improvizacije.",
          "Zato bih redoslijed za obiteljski trezor postavio ovako: Passport Core, Blockstream Jade Plus, Specter DIY, SeedSigner.",
          "Za tehnički naprednu osobu koja želi učiti, sama provjeravati i graditi, Specter DIY i SeedSigner mogu biti vrlo zanimljivi. Za obiteljsku jednostavnost, Jade Plus je bolja zamjena.",
        ],
        visual: {
          type: "image-grid",
          title: "Zamjena ako treći uređaj nije dostupan",
          caption:
            "Zamjena uređaja ne mijenja načelo: treći ključ treba biti dovoljno neovisan, razumljiv i dokumentiran za obitelj.",
          items: [
            {
              name: "Blockstream Jade Plus",
              description: "praktična obiteljska zamjena za treći ključ",
              src: "/guide-assets/jade-plus.png",
              alt: "Blockstream Jade Plus hardverski novčanik",
              href: "https://blockstream.com/jade/jade-plus/",
              credit: "Slika: Blockstream",
            },
          ],
        },
      },
      {
        heading: "Glavna poruka ove napomene",
        body: [
          "Ni jedan dio ovog sustava nije svetinja.",
          "Može se promijeniti proizvođač računala. Može se promijeniti Linux distribucija. Može se promijeniti Electrum poslužitelj. Može se promijeniti treći hardverski novčanik.",
          "Ali ne bih mijenjao glavnu logiku: odvojeno računalo za Bitcoin node, odvojeno računalo za Sparrow, privatni ključevi na hardverskim novčanicima, 2 od 3 višepotpisni sustav, tri različita proizvođača, odvojene lokacije, fizičke pričuvne kopije, Sparrow descriptor, obiteljske upute i godišnja provjera.",
          "Tu je srž sustava: proizvodi su zamjenjivi, načelo nije.",
        ],
      },
      {
        heading: "Zašto je ovo dio osobnog Bitcoin standarda?",
        body: [
          "Bitcoin standard nije samo odluka da imate bitcoin. To znači dati novcu jasno mjesto u životu.",
          "Prvo dolazi proračun. Zatim izlazak iz duga. Zatim davanje. Zatim ravnoteža u neto imovini. Zatim pitanje sigurnosti, obitelji i nasljeđivanja.",
          "Ako bitcoin postane značajan dio neto imovine, sigurnost više nije samo tehnička tema. Postaje obiteljsko pitanje.",
          "Tko zna da bitcoin postoji? Tko zna što treba napraviti? Tko ima previše pristupa? Tko nema dovoljno informacija? Što se događa u slučaju smrti? Što se događa u slučaju požara? Što se događa ako jedan uređaj nestane? Što se događa ako obitelj ne zna razlikovati pravi Sparrow od lažne aplikacije?",
          "Takva pitanja pripadaju osobnom Bitcoin standardu.",
        ],
      },
      {
        heading: "Zaključak",
        body: [
          "Za veći obiteljski iznos ne bih koristio jedan mobitel, jednu aplikaciju, jedan seed i jednu ladicu.",
          "Koristio bih sustav: Lenovo mini PC s Bitcoin Coreom i Fulcrumom, ThinkPad s Linux Mintom i Sparrowom, COLDCARD Q, BitBox02 Bitcoin-only, Passport Core ili Blockstream Jade Plus, 2 od 3 višepotpisni novčanik, odvojene lokacije, metalni seed backupi, Sparrow descriptor, obiteljsku uputu, tehnički dodatak i godišnju provjeru.",
          "Najjednostavnije rečeno: Bitcoin mora ostati pod vašom kontrolom, ali ne smije ovisiti samo o vama.",
          "Tu počinje razlika između “imam bitcoin” i obiteljskog Bitcoin trezora.",
        ],
      },
      {
        heading: "Završna napomena",
        body: [
          "Ovaj vodič nije poziv da svaka osoba odmah složi ovakav sustav.",
          "Za manji iznos, ovakav sustav može biti previše.",
          "Za osobu koja tek uči, prvo treba razumjeti osnove: što je seed, što je hardverski novčanik, što znači potpisati transakciju i kako izgleda oporavak.",
          "Ali za obitelj kojoj bitcoin postaje značajan dio neto imovine, sigurnost više nije samo pitanje uređaja.",
          "Pitanje je: može li vaša obitelj razumjeti i oporaviti sustav bez panike?",
          "Ako je odgovor ne, sustav još nije dovršen.",
        ],
      },
    ],
    finalCta: "Dogovorite uvodni Bitcoin razgovor",
    finalCtaPrompt:
      "Ako imate značajniji iznos u Bitcoinu, sigurnost više nije samo pitanje uređaja. Pitanje je može li vaša obitelj razumjeti i oporaviti sustav bez panike.",
  },
  {
    slug: "samostalna-pohrana-ili-skrbnik",
    title:
      "Samostalna pohrana ili skrbnik: kako razmišljati o Bitcoin sigurnosti",
    seoTitle:
      "Samostalna pohrana ili skrbnik: kako razmišljati o Bitcoin sigurnosti",
    metaDescription:
      "Vodič koji objašnjava kada ima smisla držati Bitcoin u vlastitoj pohrani, kada kod skrbnika i kako razmišljati o prijelaznom planu bez ideološkog pritiska.",
    excerpt:
      "Samostalna pohrana je važan cilj, ali nije uvijek najbolji prvi korak za svaku osobu, obitelj i iznos.",
    category: "Sigurnost i obitelj",
    difficulty: "Napredno",
    freshness: "često se mijenja",
    safetyNote: advancedSecuritySafetyNote,
    order: 103,
    publishedAt: "2026-05-12",
    updatedAt: "2026-05-12",
    practicalQuestion:
      "Koji oblik čuvanja bitcoina ima smisla za vašu razinu znanja, obitelj, iznos i stvarne rizike?",
    relatedSlugs: [
      "obiteljski-bitcoin-trezor",
      "bitkey-bitcoin-sigurnost",
      "bitcoin-etfovi-i-riznicke-kompanije",
    ],
    visual: {
      type: "split",
      title: "Dvije vrste rizika",
      leftLabel: "samostalna pohrana",
      leftItems: [
        "izravna kontrola privatnih ključeva",
        "veća osobna odgovornost",
        "potreban obiteljski plan",
      ],
      rightLabel: "pohrana kod skrbnika",
      rightItems: [
        "jednostavniji početak",
        "ovisnost o instituciji",
        "izloženost bez punih Bitcoin svojstava",
      ],
      caption:
        "Edukativni okvir za razmišljanje, bez investicijskog, poreznog ili pravnog savjeta.",
    },
    sections: [
      {
        heading: "Dobar Bitcoin plan ne počinje sloganom",
        body: [
          "U Bitcoinu se često čuje rečenica: ako nemate svoje ključeve, nemate svoj bitcoin.",
          "Ta rečenica ima važnu ulogu. Ona podsjeća da Bitcoin nije isto što i stanje na računu kod burze, brokera ili druge institucije. Ako netko drugi drži ključeve, vi ne držite bitcoin izravno. Imate potraživanje, udio, izloženost ili obećanje da će vam netko drugi omogućiti pristup.",
          "To treba razumjeti, ali iz toga ne slijedi da je samostalna pohrana uvijek najbolji prvi korak za svaku osobu, u svakoj fazi i za svaki iznos.",
          "Bitcoin sigurnost nije ideološko pitanje, nego praktično.",
          "Pitanje glasi: koji oblik čuvanja bitcoina ima smisla za ovu osobu, ovu obitelj, ovaj iznos, ovu razinu znanja i ovu životnu situaciju?",
          "Za nekoga je najbolji prvi korak povući bitcoin u vlastiti novčanik. Za nekoga je bolji prvi korak smanjiti iznos na burzi, ali ne prelaziti odmah u složeni obiteljski sustav.",
          "Za nekoga ima smisla dio držati samostalno, a dio kroz brokera, fond ili drugu skrbničku strukturu. Za nekoga je trenutačno bolje imati izloženost Bitcoinu kroz vrijednosni papir nego preuzeti tehničku odgovornost koju ne razumije.",
          "Dobar Bitcoin plan ne počinje sloganom. Počinje procjenom stvarnosti.",
        ],
      },
      {
        heading: "Što znači samostalna pohrana?",
        body: [
          "Samostalna pohrana znači da vi kontrolirate privatne ključeve.",
          "Bitcoin pritom ne stoji na uređaju. On je na Bitcoin mreži, a uređaj, seed riječi ili višepotpisni sustav omogućuju vam potpisivanje transakcije.",
          "Prednost samostalne pohrane je velika: ne ovisite o burzi, brokeru, banci, fondu ili tome hoće li vam netko dopustiti isplatu. Imate otpornost na cenzuru, možete premjestiti bitcoin bez dopuštenja i možete ga čuvati izvan financijskog sustava.",
          "Upravo su to posebna svojstva Bitcoina.",
          "Ali samostalna pohrana nosi i odgovornost. Ako izgubite seed, nema korisničke podrške koja vam može vratiti sredstva. Ako seed spremite u oblak, napravili ste digitalni rizik. Ako sve ovisi o vama, obitelj možda neće moći doći do sredstava.",
          "Ako je sustav presložen, nitko ga neće znati koristiti u stresu. Ako nemate plan nasljeđivanja, tehnički ispravna samostalna pohrana može postati obiteljski problem.",
          "Zato samostalna pohrana nije samo pitanje uređaja, nego cijelog sustava.",
        ],
      },
      {
        heading: "Što znači pohrana kod skrbnika?",
        body: [
          "Pohrana kod skrbnika znači da privatne ključeve ne držite vi.",
          "U praksi to može biti burza ili mjenjačnica, brokerski račun, fond kojim se trguje na burzi, institucionalni skrbnik, financijski proizvod koji ima Bitcoin u pozadini ili kompanija koja drži Bitcoin u vlastitoj riznici.",
          "Ti oblici nisu međusobno jednaki. Burza na kojoj kupujete bitcoin i ostavljate ga tamo nije isto što i regulirani fond kojim se trguje na burzi. Brokerski račun nije isto što i vlastiti novčanik. Bitcoin ETF nije isto što i bitcoin u vašem višepotpisnom trezoru.",
          "Ali zajednička crta je ova: vi nemate izravnu kontrolu nad privatnim ključevima.",
          "To je mana, premda u nekim situacijama takav oblik može imati i prednosti.",
        ],
      },
      {
        heading: "Kada pohrana kod skrbnika ima smisla?",
        body: [
          "Pohrana kod skrbnika može imati smisla kada osoba još nije spremna za samostalnu pohranu.",
          "Primjerice, osoba tek uči Bitcoin, ne razumije seed riječi, nema sigurnu lokaciju za pričuvnu kopiju, nema jasan obiteljski plan, ima velik strah od tehničke pogreške ili već ima brokerski račun i portfelj vrijednosnih papira.",
          "Možda želi izloženost Bitcoinu u postojećem investicijskom okviru, jednostavnije izvještavanje ili dio imovine u obliku koji obitelj već razumije.",
          "Ne znači da je skrbnik bolji, nego da u određenoj fazi može biti razumniji.",
          "Loše izvedena samostalna pohrana nije automatski bolja od dobrog skrbničkog rješenja.",
          "Ako netko ima ozbiljan iznos bitcoina na hardverskom novčaniku, ali seed drži u istoj ladici, obitelj ne zna ništa, nema upute i sve ovisi o jednoj osobi, taj sustav možda izgleda suvereno, ali nije dobro posložen.",
          "S druge strane, osoba koja ima dio izloženosti kroz ozbiljnog brokera ili fond možda nema punu Bitcoin suverenost, ali ima sustav koji njezina obitelj razumije i zna naslijediti.",
          "Cilj savjetovanja nije gurati svakoga u istu kutiju, nego razumjeti rizik.",
        ],
      },
      {
        heading: "Kada pohrana kod skrbnika nije dovoljna?",
        body: [
          "Pohrana kod skrbnika nije dovoljna ako želite ona svojstva zbog kojih je Bitcoin poseban.",
          "Primjerice: otpornost na cenzuru, mogućnost slanja bez dopuštenja, držanje novca izvan bankarskog sustava, zaštitu od zamrzavanja računa, izravnu kontrolu nad privatnim ključevima, mogućnost prijenosa vrijednosti bez posrednika i dugoročnu neovisnost o financijskim institucijama.",
          "Ako držite Bitcoin kroz skrbnika, nemate sve to.",
          "Možda imate izloženost cijeni. Možda imate regulirani instrument. Možda imate jednostavnije porezno i administrativno okruženje.",
          "Ali nemate potpuno isto svojstvo kao kada držite bitcoin u vlastitom posjedu.",
          "Bitcoin u vlastitoj pohrani i izloženost Bitcoinu kroz vrijednosni papir nisu ista stvar. Mogu imati mjesto u istoj strategiji, ali nisu isto.",
        ],
      },
      {
        heading: "Problem s ideološkim pristupom",
        body: [
          "Ideološki pristup kaže: svi moraju odmah u samostalnu pohranu.",
          "To zvuči čisto, ali u praksi može biti neodgovorno.",
          "Ako osoba ne zna što radi, može izgubiti sredstva. Ako obitelj ne zna da bitcoin postoji, nasljednici mogu izgubiti pristup. Ako se velik iznos prebaci u samostalnu pohranu bez plana, rizik se možda nije smanjio. Samo se promijenio.",
          "Prije je rizik bio skrbnik. Sada je rizik korisnik.",
          "Napredak postoji samo ako je korisnik spreman.",
          "Bitcoin ne oprašta tehničku nepažnju.",
          "Zato je moja pozicija drukčija: samostalna pohrana je cilj za ozbiljnu Bitcoin imovinu, ali prijelaz prema njoj mora biti promišljen.",
          "Ne mora sve biti odmah. Ne mora sve biti u jednom obliku. Ne mora svaka osoba imati isti put.",
        ],
      },
      {
        heading: "Tri razine Bitcoina u osobnoj imovini",
        body: [
          "U praksi, korisno je razlikovati tri razine.",
          "Prva razina je Bitcoin kao izloženost. Ovdje osoba želi sudjelovati u promjeni cijene Bitcoina, ali ne želi držati ključeve. To može biti ETF, brokerski proizvod, dionica kompanije s Bitcoin riznicom ili drugi vrijednosni papir. Prednost je jednostavnost. Mana je izostanak izravne kontrole.",
          "Druga razina je Bitcoin kao osobni novac. Ovdje osoba drži bitcoin u vlastitom novčaniku. To može biti jednostavan hardverski novčanik ili napredniji višepotpisni sustav. Prednost je izravna kontrola. Mana je veća odgovornost.",
          "Treća razina je Bitcoin kao obiteljski standard. Ovdje Bitcoin više nije samo investicija, nego značajan dio neto imovine i obiteljskog plana.",
          "Tu se mora razmišljati o proračunu, dugu, davanju, ravnoteži neto imovine, sigurnosti, nasljeđivanju i ulozi Bitcoina u odnosu na kapitalna i potrošačka dobra.",
          "Na toj razini pitanje više nije gdje kupiti bitcoin, nego kako bitcoin uklopiti u život tako da sustav bude razumljiv, održiv i prenosiv na obitelj.",
        ],
      },
      {
        heading: "Hibridni pristup",
        body: [
          "Za mnoge ljude najbolji odgovor nije sve kod skrbnika ili sve u samostalnoj pohrani. Najbolji odgovor može biti hibrid.",
          "Primjer: manji operativni iznos u mobilnom novčaniku, glavni dugoročni iznos u vlastitoj pohrani, dio izloženosti kroz ETF u brokerskom portfelju, dio kroz proizvodnu imovinu ili kapitalna dobra povezana s Bitcoinom i jasan plan prijelaza prema većoj samostalnoj pohrani.",
          "To nije kontradikcija, nego priznanje da različiti dijelovi imovine mogu imati različite uloge.",
          "Bitcoin koji držite u vlastitoj pohrani ima ulogu novca pod vašom kontrolom. Bitcoin ETF u brokerskom računu ima ulogu financijske izloženosti. Dionica Bitcoin rizničke kompanije ima ulogu kapitalnog dobra ili poslovnog rizika.",
          "Nisu iste stvari, ali sve mogu biti dio šire slike.",
        ],
        link: {
          before: "Za razliku između tih slojeva korisno je pročitati i vodič",
          label:
            "Bitcoin ETF-ovi i rizničke kompanije: gdje prestaje Bitcoin, a počinje kapital",
          href: "/vodici/bitcoin-etfovi-i-riznicke-kompanije/",
          after:
            "jer razdvaja bitcoin u vlastitoj pohrani od financijske izloženosti Bitcoinu.",
        },
      },
      {
        heading: "Plan prijelaza",
        body: [
          "U savjetovanju se može napraviti plan prijelaza. Ne mora se sve riješiti u jednom danu.",
          "Prva faza je razumjeti stanje: gdje je bitcoin sada, tko ima pristup, tko zna da postoji, koliki je iznos, koja je svrha tog iznosa, što bi se dogodilo u slučaju smrti, što bi se dogodilo u slučaju gubitka uređaja i koliko obitelj razumije.",
          "Druga faza je smanjiti očite rizike: ne držati prevelik iznos na burzi bez razloga, ne držati seed digitalno, ne držati sve na jednoj lokaciji, ne imati sustav koji zna samo jedna osoba i zapisati osnovne upute.",
          "Treća faza je podijeliti uloge: što je novac, što je kapital, što je potrošnja, što je kratkoročna likvidnost, što je dugoročna štednja, što je obiteljski trezor i što je prijelazna izloženost.",
          "Četvrta faza je izgraditi konačni sustav: vlastita pohrana za dio koji treba biti pod osobnom kontrolom, skrbnička rješenja samo ondje gdje imaju jasnu ulogu, obiteljske upute, nasljedni plan i godišnja provjera.",
          "To je sporiji i razumniji pristup od impulzivne kupnje uređaja. Poanta je složiti sustav, ne samo dodati još jedan komad opreme.",
        ],
      },
      {
        heading: "ETF, burza i vlastiti novčanik nisu neprijatelji",
        body: [
          "Često se o ovim opcijama govori kao da jedna mora isključiti drugu. Ali u stvarnom životu to nije tako.",
          "Osoba može imati nešto bitcoina u vlastitom posjedu, nešto izloženosti kroz ETF, brokerski račun za vrijednosne papire, mali operativni novčanik i dugoročni obiteljski trezor.",
          "Važno je da svaka stvar ima jasnu funkciju.",
          "Problem nastaje kada ljudi ne znaju što imaju. Misle da imaju bitcoin, a zapravo imaju potraživanje prema burzi. Misle da imaju sigurnost, a zapravo imaju jedan seed u ladici. Misle da imaju investiciju, a zapravo imaju visokorizični proizvod koji ne razumiju.",
          "Misle da imaju obiteljski plan, a zapravo obitelj ne zna ništa.",
          "Dobar plan počinje imenovanjem stvari pravim imenom.",
        ],
        link: {
          before: "Za tehnički ozbiljniji model vlastite pohrane pročitajte",
          label: "obiteljski Bitcoin trezor",
          href: "/vodici/obiteljski-bitcoin-trezor/",
          after: "kao primjer dugoročnog obiteljskog sustava.",
        },
      },
      {
        heading: "Uloga savjetovanja",
        body: [
          "Moja uloga nije da svima kažem isto.",
          "Moja uloga nije da nekoga ideološki guram prema samostalnoj pohrani prije nego je spreman.",
          "Moja uloga nije dati investicijski, porezni ili pravni savjet o tome što točno kupiti, prodati ili prijaviti.",
          "Moja uloga je pomoći osobi razumjeti koje opcije postoje, koji rizici dolaze s kojom opcijom, što je novac, a što kapital, što je stvarna kontrola, a što izloženost, što obitelj može razumjeti, gdje skrbnik ima mjesto, gdje je skrbnik rizik i kako postupno prijeći prema boljem sustavu.",
          "Bitcoin savjetovanje nije samo pitanje uređaja, nego odluke.",
          "I često je najbolja odluka ona koja ne izgleda ideološki najčišće, nego ona koju konkretna osoba i konkretna obitelj mogu stvarno provesti.",
        ],
      },
      {
        heading: "Zaključak",
        body: [
          "Samostalna pohrana je jedan od najvažnijih darova koje Bitcoin nudi.",
          "Ali samostalna pohrana bez znanja, obiteljskog plana i pričuvne kopije ne donosi slobodu, nego novi rizik.",
          "Pohrana kod skrbnika nije isto što i držanje bitcoina u vlastitom posjedu, ali može imati svoje mjesto.",
          "ETF, broker, burza, hardverski novčanik i višepotpisni sustav nisu ista stvar. Svaki oblik ima drugačiju ulogu.",
          "Umjesto pitanja je li skrbnik uvijek loš, važnije je pitati: koji rizik preuzimam, što dobivam zauzvrat i ima li to mjesto u mom Bitcoin standardu?",
          "Takav razgovor vrijedi voditi prije nego se napravi veliki korak.",
        ],
      },
    ],
    finalCta: "Dogovorite uvodni Bitcoin razgovor",
    finalCtaPrompt:
      "Ako niste sigurni treba li vaš Bitcoin biti u samostalnoj pohrani, kod skrbnika ili u prijelaznom sustavu, prvo treba razumjeti vašu stvarnu situaciju, obitelj i rizike.",
  },
  {
    slug: "bitkey-bitcoin-sigurnost",
    title: "Bitkey: jednostavniji put do obiteljske Bitcoin sigurnosti?",
    seoTitle: "Bitkey: jednostavniji put do obiteljske Bitcoin sigurnosti?",
    metaDescription:
      "Vodič koji objašnjava kada Bitkey ima smisla, gdje su njegovi kompromisi i kako ga usporediti s burzom, običnim hardverskim novčanikom i vlastitim obiteljskim Bitcoin trezorom.",
    excerpt:
      "Bitkey uklanja seed riječi i uvodi 2 od 3 sigurnosni model, ali nije isto što i vlastiti Bitcoin trezor sa Sparrowom, vlastitim nodeom i neovisnim ključevima.",
    category: "Sigurnost i obitelj",
    difficulty: "Napredno",
    freshness: "često se mijenja",
    safetyNote: advancedSecuritySafetyNote,
    order: 104,
    publishedAt: "2026-05-12",
    updatedAt: "2026-05-12",
    practicalQuestion:
      "Je li Bitkey dovoljno dobar za vaš iznos, vašu obitelj i rizike koje stvarno pokušavate smanjiti?",
    relatedSlugs: [
      "obiteljski-bitcoin-trezor",
      "sigurnost-ne-smije-ovisiti-samo-o-vama",
      "obiteljski-pristup-bitcoinu",
    ],
    visual: {
      type: "safety",
      title: "Bitkey model",
      zones: [
        {
          label: "mobitel",
          description: "jedan ključ i svakodnevno korisničko iskustvo",
        },
        {
          label: "uređaj",
          description: "hardverski ključ za potvrdu transakcija",
        },
        {
          label: "Bitkey",
          description: "poslužiteljski ključ za oporavak i pomoćne funkcije",
        },
      ],
      caption:
        "Bitkey može biti odličan kompromis, ali nije isto što i potpuno vlastiti višepotpisni trezor.",
    },
    sections: [
      {
        heading: "Zašto uopće govoriti o Bitkeyu?",
        body: [
          "Većina ljudi ne izgubi bitcoin zato što je Bitcoin zakazao. Izgube ga zato što su loše čuvali pristup.",
          "Jedan papir. Jedan mobitel. Jedna aplikacija. Jedna lozinka. Jedna ladica. Jedna osoba koja jedina zna što treba napraviti.",
          "Kod malog iznosa to može biti prihvatljiv rizik. Kod većeg iznosa, a posebno kod obiteljskog bitcoina, to više nije dovoljno.",
          "Zato se sve češće pojavljuju rješenja koja pokušavaju riješiti najveći problem osobnog čuvanja bitcoina: kako zadržati kontrolu, a istovremeno ne napraviti sustav koji obična obitelj ne može razumjeti.",
          "Jedno od takvih rješenja je Bitkey.",
          "Bitkey nije burza. Nije običan mobilni novčanik. Nije ni klasični hardverski novčanik sa seed riječima.",
          "Bitkey je pokušaj da se napravi srednji put: dovoljno jednostavan za normalnog korisnika, a sigurniji od modela u kojem sve ovisi o jednom seedu ili jednom uređaju.",
        ],
      },
      {
        heading: "Što je Bitkey?",
        body: [
          "Bitkey je Bitcoin-only sustav za čuvanje bitcoina koji se sastoji od mobilne aplikacije, hardverskog uređaja i poslužiteljskog ključa koji služi za oporavak i pomoćne sigurnosne funkcije.",
          "Bitkey koristi 2 od 3 višepotpisni model. To znači da postoje tri ključa, a za pomicanje bitcoina trebaju bilo koja dva.",
          "Jedan ključ je na hardverskom uređaju. Jedan ključ je u mobilnoj aplikaciji. Jedan ključ je na Bitkey poslužitelju.",
          "Razlika u odnosu na burzu je velika. Na burzi vi nemate ključeve. Burza kontrolira bitcoin, a vi imate potraživanje prema burzi.",
          "Kod Bitkeya, model je drukčiji. Bitkey drži jedan od tri ključa, ali taj jedan ključ nije dovoljan da pomakne sredstva. Za svaku transakciju trebaju dva ključa.",
          "Važno je to razlikovati od modela u kojem sve ključeve držite potpuno samostalno.",
        ],
        visual: {
          type: "image-card",
          title: "Bitkey kao gotov proizvod.",
          caption:
            "Za razliku od vlastitog Sparrow sustava, Bitkey je integriran proizvod: aplikacija, uređaj i oporavak dolaze kao jedan paket.",
          src: "/guide-assets/bitkey-device.png",
          alt: "Bitkey hardverski uređaj",
          href: "https://bitkey.world/",
          credit: "Slika: Bitkey",
        },
      },
      {
        heading: "Zašto je Bitkey zanimljiv?",
        body: [
          "Bitkey je zanimljiv zato što napada jedan od najvećih praktičnih problema u Bitcoinu: što obična osoba radi sa seed riječima?",
          "Kod većine hardverskih novčanika dobijete 12 ili 24 riječi. Te riječi su pričuvna kopija vašeg novčanika.",
          "Ako ih izgubite, možete izgubiti pristup. Ako ih netko nađe, može ukrasti bitcoin. Ako ih spremite u cloud, napravili ste digitalni rizik.",
          "Ako ih sakrijete predobro, obitelj ih možda nikada neće pronaći. Ako ih ostavite u ladici, lopov ih može pronaći. Ako ih zna samo jedna osoba, nasljednici mogu ostati bez pristupa.",
          "Bitkey pokušava ukloniti taj problem tako da uopće ne koristi klasične seed riječi. Umjesto jednog moćnog seeda, koristi tri odvojena ključa i više puteva oporavka.",
          "Dijagnoza je dobra: mnogi ljudi nisu spremni čuvati jedan papir deset ili dvadeset godina. Još manje su spremni objasniti obitelji što taj papir znači.",
        ],
      },
      {
        heading: "Kako Bitkey funkcionira u jednostavnim riječima?",
        body: [
          "Zamislite da postoje tri ključa: ključ u mobitelu, ključ u Bitkey uređaju i ključ kod Bitkeya.",
          "Za slanje bitcoina trebaju dva od tri. U normalnoj situaciji korisnik koristi mobitel i hardverski uređaj.",
          "Ako izgubi mobitel, može koristiti hardverski uređaj i Bitkeyev oporavak. Ako izgubi hardverski uređaj, može koristiti aplikaciju i Bitkeyev oporavak.",
          "Ako izgubi i mobitel i uređaj, Bitkey ima poseban postupak s kontaktima za oporavak.",
          "Bitkey također ima Emergency Exit Kit, koji služi kao izlazni plan ako korisnik mora premjestiti sredstva bez oslanjanja na Bitkey poslužitelje.",
          "To je praktično jer je Bitkey napravljen za stvarne greške: izgubljen mobitel, izgubljen uređaj, zaboravljen plan, obitelj koja ne zna gdje je seed. Tu je njegova snaga.",
        ],
      },
      {
        heading: "Što je novo kod Bitkeya?",
        body: [
          "Bitkey je 2026. predstavio novu verziju hardverskog uređaja.",
          "Novi Bitkey zadržava 2 od 3 višepotpisni model, nema seed riječi, ima biometrijski pristup, oporavak za gubitak mobitela, uređaja ili oba, ugrađeno nasljeđivanje i Emergency Exit Kit.",
          "Novi hardver ima ekran, što je važan korak jer korisnik može provjeravati što odobrava izravno na uređaju, a ne samo gledati mobitel.",
          "To ne uklanja sve kompromise, ali poboljšava model.",
        ],
      },
      {
        heading: "Bitkey i nasljeđivanje",
        body: [
          "Bitkey je posebno zanimljiv zato što ima ugrađenu funkciju nasljeđivanja, što je rijetko kod Bitcoin novčanika.",
          "Većina rješenja kaže: evo vam seed, snađite se. Ali nasljeđivanje nije samo pitanje gdje je seed.",
          "Nasljeđivanje znači tko zna da bitcoin postoji, tko može pokrenuti postupak, koliko dugo se čeka, kako se sprječava lažni zahtjev, kako se nasljedniku daje pristup bez da ga ima prerano, što se događa ako vlasnik ipak nije umro i što se događa ako netko pokuša zloupotrijebiti postupak.",
          "Bitkeyev model nasljeđivanja pokušava riješiti upravo taj problem: nasljednik ne dobiva pristup odmah, vlasnik ima vrijeme za zaustavljanje postupka, a prijenos se događa tek nakon definiranog razdoblja.",
          "Za obiteljski kontekst to je vrlo zanimljivo, uz važan uvjet: ako želite koristiti Bitkey za nasljeđivanje, treba pripremiti i osobu koja će jednog dana biti korisnik tog plana.",
          "Drugim riječima, nije dovoljno da vi kupite uređaj. Obitelj mora znati da plan postoji. Nasljednik mora razumjeti što treba napraviti. I mora biti jasno što se događa ako se promijene obiteljske okolnosti.",
        ],
      },
      {
        heading: "Za koga je Bitkey dobar?",
        body: [
          "Bitkey ima smisla za osobu koja kaže: želim držati bitcoin izvan burze, ali ne želim samostalno voditi složen sigurnosni sustav.",
          "Takvih ljudi ima puno.",
          "Za takvu osobu Bitkey može biti velik korak naprijed. Posebno u Hrvatskoj, gdje većina ljudi neće sama složiti vlastiti Bitcoin node, privatni Electrum poslužitelj, Sparrow i višepotpisni sustav s tri različita hardverska novčanika.",
          "Za tu osobu Bitkey može biti puno bolji od dvije najčešće loše opcije: bitcoin na burzi ili jedan seed u ladici.",
          "Tu je najjači argument za Bitkey.",
        ],
        items: [
          "ne želi držati bitcoin na burzi",
          "boji se seed riječi",
          "ne zna sama složiti Sparrow, hardverske novčanike i vlastiti node",
          "želi Bitcoin-only rješenje",
          "želi bolju sigurnost od obične aplikacije na mobitelu",
          "želi oporavak ako izgubi mobitel ili uređaj",
          "želi jednostavniji put prema obiteljskom nasljeđivanju",
        ],
      },
      {
        heading: "Za koga Bitkey nije idealan?",
        body: [
          "Bitkey nije idealan za osobu koja želi maksimalnu samostalnost.",
          "Ako želite vlastiti Bitcoin Core, vlastiti Electrum poslužitelj, Sparrow, tri neovisna hardverska novčanika, vlastitu dokumentaciju, vlastite lokacije i potpunu kontrolu nad svim ključevima, Bitkey nije isti model.",
          "Bitkeyev treći ključ nalazi se na Bitkey poslužitelju. Model je bolji od običnog skrbništva, ali i dalje postoji ovisnost o Bitkey i Block infrastrukturi.",
          "Za neke korisnike to je prihvatljiv kompromis. Za druge nije.",
          "Ako je cilj najviši stupanj neovisnosti, tada bih radije složio vlastiti obiteljski Bitcoin trezor.",
        ],
        items: [
          "Sparrow",
          "vlastiti Bitcoin Core",
          "vlastiti Fulcrum",
          "COLDCARD Q",
          "BitBox02 Bitcoin-only",
          "Passport Core ili Jade Plus",
          "2 od 3 višepotpisni sustav",
          "odvojene lokacije",
          "obiteljske upute",
        ],
        link: {
          before: "Detaljnije o tom modelu opisuje vodič",
          label: "obiteljski Bitcoin trezor",
          href: "/vodici/obiteljski-bitcoin-trezor/",
          after:
            "koji pokazuje kako izgleda vlastiti sustav sa Sparrowom, vlastitim nodeom i neovisnim ključevima.",
        },
      },
      {
        heading: "Bitkey nije isto što i vlastiti višepotpisni trezor",
        body: [
          "Ovdje je najvažnija razlika. Bitkey i vlastiti 2 od 3 sustav mogu na papiru zvučati slično.",
          "Oba koriste tri ključa. Oba traže dva potpisa. Oba smanjuju rizik da jedna greška odmah znači gubitak svega.",
          "Ali nisu isti.",
          "Kod vlastitog sustava vi birate sve: koji su uređaji, gdje su ključevi, gdje su pričuvne kopije, na koji se node spajate, koji se softver koristi, kako izgleda dokumentacija, tko zna što i što se događa u slučaju smrti.",
          "Kod Bitkeya dobar dio toga dolazi upakiran u proizvod. Dobivate jednostavnost, ali dio suverenosti mijenjate za gotov sustav.",
          "Vlastiti sustav je kao da sami dizajnirate obiteljski trezor. Bitkey je kao gotov trezor s ugrađenim pravilima, oporavkom i korisničkim iskustvom.",
          "Za mnoge ljude gotov trezor je bolji od loše složenog vlastitog trezora. Ali nije isto što i potpuno vlastiti sustav.",
        ],
      },
      {
        heading: "Privatnost",
        body: [
          "Kod vlastitog Sparrow sustava s vlastitim Bitcoin Coreom i Fulcrumom, vaš novčanik ne mora pitati tuđe poslužitelje koje adrese i UTXO-e imate.",
          "Za privatnost je to velika prednost.",
          "Kod Bitkeya koristite Bitkeyevu aplikaciju i infrastrukturu. To ne znači da je Bitkey isto što i burza.",
          "Ali u savjetodavnom kontekstu treba reći jednostavno: privatnost Bitkeya vjerojatno je bolja od držanja bitcoina na burzi, ali nije isto što i vlastiti node i vlastiti poslužitelj.",
          "To nije napad na Bitkey, nego razlika između gotovog proizvoda i vlastite infrastrukture.",
        ],
      },
      {
        heading: "Najveća prednost Bitkeya",
        body: [
          "Najveća prednost Bitkeya je što rješava stvaran ljudski problem.",
          "Većina ljudi neće pravilno čuvati seed. Većina ljudi neće redovito testirati oporavak. Većina ljudi neće napraviti obiteljsku uputu. Većina ljudi neće znati što je descriptor. Većina ljudi neće imati tri lokacije, tri uređaja i godišnju provjeru.",
          "Bitkey kaže: pokušajmo maknuti tu složenost iz ruku korisnika.",
          "Za osobu koja bi inače ostala na burzi ili držala jedan seed na loš način, to može biti veliko poboljšanje.",
        ],
      },
      {
        heading: "Najveći kompromis Bitkeya",
        body: [
          "Najveći kompromis je povjerenje u proizvodni sustav.",
          "Ne povjerenje u smislu da Bitkey može sam ukrasti sredstva. Prema njihovom modelu, jedan ključ nije dovoljan.",
          "Nego povjerenje u širi sustav: aplikaciju, oporavak, poslužiteljski ključ, oblak za pričuvnu kopiju aplikacijskog ključa, nasljedni postupak, dostupnost Bitkey usluge, pravila proizvoda i dugoročnu održivost kompanije.",
          "Bitkey ima Emergency Exit Kit, što je važno jer smanjuje rizik ovisnosti o Bitkey poslužiteljima.",
          "Ali opet, prosječan korisnik mora znati da taj izlaz postoji i mora razumjeti kada i kako bi se koristio. Ako korisnik ne zna koristiti vlastiti izlaz iz sustava, on praktično i dalje ovisi o dobrom korisničkom iskustvu aplikacije.",
        ],
      },
      {
        heading: "Bitkey u hrvatskom obiteljskom kontekstu",
        body: [
          "U Hrvatskoj je realno da jedna osoba u obitelji razumije Bitcoin, a ostali članovi samo djelomično.",
          "To stvara problem. Ako ta osoba složi složen višepotpisni sustav, ali obitelj ne zna što je napravljeno, sustav je možda tehnički dobar, ali obiteljski loš.",
          "Bitkey može biti zanimljiv upravo za takvu obitelj. Ne zato što je najtvrđi mogući model. Nego zato što je manje vjerojatno da će obitelj potpuno pogriješiti.",
          "U praksi, Bitkey može biti razuman za supružnika koji ne želi učiti Sparrow, roditelje koji ne žele čuvati seed riječi, osobu koja želi otići s burze, obitelj kojoj treba jednostavan nasljedni plan i korisnika kojemu je vlastiti node previše.",
          "Ali za vrlo velik iznos i za osobu koja želi osobni Bitcoin standard bez oslanjanja na tuđu infrastrukturu, Bitkey nije kraj puta. Može biti prijelazna stepenica.",
        ],
      },
      {
        heading: "Bitkey protiv burze",
        body: [
          "Bitkey je puno bolji od burze za osobu koja želi stvarnu osobnu kontrolu.",
          "Na burzi ne držite ključeve. Kod Bitkeya držite dva od tri ključa, a kompanija ne može sama premjestiti sredstva.",
        ],
      },
      {
        heading: "Bitkey protiv običnog hardverskog novčanika",
        body: [
          "Bitkey može biti bolji od loše korištenog hardverskog novčanika.",
          "Ako netko kupi hardverski novčanik, zapiše seed na papir i stavi ga u ladicu, to nije ozbiljan obiteljski plan.",
          "Bitkey barem uklanja jedan moćni seed kao jedini presudni rizik i uvodi više puteva oporavka.",
          "Ali dobro korišten hardverski novčanik, s jasnom pričuvnom kopijom i uputama, može biti suvereniji.",
        ],
      },
      {
        heading: "Bitkey protiv Sparrow 2 od 3 sustava",
        body: [
          "Sparrow 2 od 3 sustav s vlastitim nodeom je jači za osobu koja želi punu kontrolu.",
          "Bitkey je bolji za osobu koja želi jednostavnost.",
          "Zato nije dovoljno pitati što je objektivno najbolje. Važnije je pitati koji sustav će ova konkretna osoba stvarno znati koristiti i oporaviti.",
        ],
      },
      {
        heading: "Moj sud",
        body: [
          "Bitkey mi se sviđa.",
          "Ne kao zamjena za najbolji mogući osobni Bitcoin trezor, nego kao dobar odgovor na stvarni problem: većina ljudi nije spremna za potpunu samostalnu skrb.",
          "Ako je izbor bitcoin na burzi ili Bitkey, izabrao bih Bitkey. Ako je izbor jedan seed u ladici ili Bitkey, za mnoge obitelji bih opet izabrao Bitkey.",
          "Ako je izbor dobro složen Sparrow, vlastiti node i 2 od 3 s tri neovisna hardverska novčanika ili Bitkey, za veći obiteljski iznos bih izabrao vlastiti sustav.",
          "To je bitna razlika. Bitkey nije loše rješenje samo zato što ima kompromise; svaki ih sustav ima. Dobar je onda kada su ti kompromisi svjesno prihvaćeni.",
        ],
      },
      {
        heading: "Kada bih preporučio Bitkey?",
        body: [
          "Preporučio bih ga osobi koja ne želi držati bitcoin na burzi, ne vjeruje si da će dobro čuvati seed riječi, ne želi učiti složen višepotpisni sustav, želi nešto što obitelj može razumjeti, želi Bitcoin-only rješenje i prihvaća da dio oporavka ovisi o Bitkey sustavu.",
          "To je pošten profil korisnika, i za takvu osobu Bitkey može biti vrlo dobar izbor.",
        ],
      },
      {
        heading: "Kada ga ne bih preporučio kao glavni trezor?",
        body: [
          "Ne bih ga stavio kao glavni trezor za osobu koja želi svoj Bitcoin Core, svoj Electrum poslužitelj, tri neovisna hardverska novčanika, nijedan ključ kod kompanije, vlastitu dokumentaciju nasljeđivanja i maksimalnu neovisnost.",
          "Za tu osobu Bitkey je previše zatvoren kao sustav, čak i ako je bolji od burze.",
        ],
      },
      {
        heading: "Zaključak",
        body: [
          "Bitkey je jedan od zanimljivijih pokušaja da se Bitcoin sigurnost približi normalnim ljudima.",
          "Njegova glavna vrijednost nije u tome da bude najsamostalniji mogući model, nego u pokušaju da riješi ono gdje ljudi najčešće griješe: seed riječi, oporavak, izgubljene uređaje i nasljeđivanje.",
          "Za manji i srednji iznos, ili za osobu koja tek prelazi s burze prema osobnom čuvanju bitcoina, Bitkey može biti vrlo razuman izbor.",
          "Za veći obiteljski iznos i puni osobni Bitcoin standard, i dalje bih preferirao vlastiti sustav: Sparrow, vlastiti Bitcoin Core, privatni Fulcrum, 2 od 3 višepotpisni novčanik, tri neovisna hardverska novčanika, odvojene lokacije i obiteljske upute.",
          "Najkraće: Bitkey je bolji od burze i bolji od loše izvedenog novčanika s jednim potpisom. Ali nije bolji od dobro izvedenog obiteljskog Bitcoin trezora.",
        ],
      },
      {
        heading: "Završna napomena",
        body: [
          "Ako razmišljate o Bitkeyu, pravo pitanje nije: je li Bitkey savršen?",
          "Pravo pitanje je: u odnosu na što ga uspoređujete?",
          "Ako ga uspoređujete s burzom, Bitkey je veliki korak naprijed. Ako ga uspoređujete s jednim seedom u ladici, Bitkey može biti praktičniji i sigurniji za mnoge obitelji.",
          "Ako ga uspoređujete s potpuno vlastitim 2 od 3 sustavom, vlastitim nodeom i jasno dokumentiranim nasljeđivanjem, Bitkey je jednostavniji, ali manje neovisan.",
          "Bitcoin sigurnost nije potraga za savršenim proizvodom, nego za sustavom koji konkretna osoba i konkretna obitelj mogu razumjeti, održavati i oporaviti bez panike.",
        ],
      },
    ],
    finalCta: "Dogovorite uvodni Bitcoin razgovor",
    finalCtaPrompt:
      "Ako niste sigurni je li Bitkey dovoljan za vaš iznos, obitelj i razinu rizika, prvo treba razjasniti što točno pokušavate zaštititi i od čega.",
  },
  {
    slug: "obiteljski-pristup-bitcoinu",
    title: "Kako obitelj može pristupiti Bitcoinu ako vam se nešto dogodi?",
    seoTitle: "Bitcoin nasljeđivanje i obitelj",
    metaDescription:
      "Kako razmišljati o obiteljskom pristupu Bitcoinu bez otkrivanja osjetljivih podataka, žurbe i prepuštanja kontrole.",
    excerpt:
      "Ako Bitcoin ima važnu ulogu u neto imovini, osobni sustav mora biti razumljiv osobi od povjerenja u izvanrednim okolnostima.",
    category: "Sigurnost i obitelj",
    difficulty: "Napredno",
    freshness: "stabilno",
    safetyNote: advancedSecuritySafetyNote,
    order: 105,
    publishedAt: "2026-04-30",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Bi li osoba od povjerenja znala što napraviti, a što nikada ne napraviti, ako vam se nešto dogodi?",
    relatedSlugs: [
      "sigurnost-ne-smije-ovisiti-samo-o-vama",
      "bitcoin-kao-novac",
      "bitcoin-u-neto-imovini",
    ],
    visual: {
      type: "safety",
      title: "Obiteljski pristup",
      zones: [
        {
          label: "što postoji",
          description: "osnovna informacija",
        },
        {
          label: "što ne dirati",
          description: "seed phrase i privatni ključevi se ne dijele",
        },
        {
          label: "kome se javiti",
          description: "osoba ili uputa za pomoć",
        },
      ],
      caption: "Informacija nije isto što i pristup.",
    },
    sections: [
      {
        heading: "Nije dovoljno da samo vi znate",
        body: [
          "Ako Bitcoin ima ozbiljnu ulogu u neto imovini, sustav nije dovršen ako postoji samo u vašoj glavi. Vi možda znate gdje je što, ali osoba od povjerenja može ostati bez osnovnog smjera u izvanrednoj situaciji.",
          "Obitelji ne treba dati pristup svemu. Treba joj dati put: što postoji, gdje su opće upute, kome se smije javiti i što se nikada ne smije napraviti.",
        ],
      },
      {
        heading: "Informacija nije isto što i pristup",
        body: [
          "Informacija može glasiti da Bitcoin postoji i da postoje upute. Kontrola znači mogućnost pomicanja Bitcoina. Te dvije stvari ne smiju se miješati.",
          "Dobar obiteljski pristup daje dovoljno informacija da osoba ne bude izgubljena, ali ne izlaže osjetljive podatke bez potrebe. Tu se traži ravnoteža između kontinuiteta i sigurnosti.",
        ],
      },
      {
        heading: "Seed phrase se nikada ne dijeli",
        body: [
          "Seed phrase, privatni ključevi i lozinke ne dijele se olako. Ako se pošalju porukom, fotografiraju ili upišu na pogrešno mjesto, šteta može biti trajna.",
          "Obitelj treba znati da nitko ozbiljan neće tražiti seed phrase u poruci, pozivu ili mrežnom obrascu. To pravilo mora biti kratko, jasno i zapisano.",
        ],
      },
      {
        heading: "Što obitelj smije znati",
        body: [
          "Osoba od povjerenja može znati da Bitcoin postoji, da je dio neto imovine, gdje se nalaze opće upute i koga smije kontaktirati. Može znati i što ne smije napraviti.",
          "Ne mora znati sve tehničke detalje. Ne mora imati pristup odmah. Cilj je da u teškom trenutku ne krene krivim putem i ne preda kontrolu nepoznatoj osobi.",
        ],
      },
      {
        heading: "Pravila prije krize",
        body: [
          "Obiteljski pristup treba postaviti prije krize. U krizi ljudi žure, boje se i traže brze odgovore. Tada su pogreške najskuplje.",
          "Zato osobni Bitcoin standard uključuje kratke upute, jasne zabrane i osobu od povjerenja. Kontrola ostaje kod vlasnika, ali sustav ne ovisi samo o jednoj osobi.",
        ],
      },
      {
        heading: "Minimalna obiteljska uputa",
        body: [
          "Upute ne moraju biti duge da bi bile korisne. Važno je da prva pravila budu kratka, jasna i razumljiva u stresnom trenutku.",
        ],
        items: [
          "Bitcoin postoji i dio je neto imovine.",
          "Seed phrase, privatni ključevi i lozinke ne šalju se nikome.",
          "U izvanrednoj situaciji prvo se čitaju upute i kontaktira osoba od povjerenja.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako obitelj zna da Bitcoin postoji, ali nema jasne upute što smije i ne smije napraviti, to je pitanje koje ne treba ostati samo u glavi.",
  },
  {
    slug: "sigurnost-ne-smije-ovisiti-samo-o-vama",
    title: "Sigurnost ne smije ovisiti samo o vama",
    metaDescription:
      "Vodič o sigurnosti i obiteljskom pristupu Bitcoinu: kontrola ostaje kod vas, ali sustav ne smije ovisiti samo o vama.",
    excerpt:
      "Vaš Bitcoin mora ostati pod vašom kontrolom. Ali ako nitko ne zna što napraviti u izvanrednoj situaciji, sustav nije dovršen.",
    category: "Sigurnost i obitelj",
    difficulty: "Srednje",
    freshness: "stabilno",
    order: 100,
    featured: true,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Bi li osoba od povjerenja znala što napraviti, a što nikada ne napraviti, ako vam se nešto dogodi?",
    relatedSlugs: [
      "obiteljski-pristup-bitcoinu",
      "bitcoin-kao-novac",
      "bitcoin-u-neto-imovini",
    ],
    visual: {
      type: "safety",
      title: "Sigurnost s jasnim oporavkom",
      zones: [
        {
          label: "kontrola",
          description: "Bitcoin ostaje pod vašom kontrolom",
        },
        {
          label: "upute",
          description: "osoba od povjerenja zna što ne smije napraviti",
        },
        {
          label: "pristup",
          description: "put postoji, ali ne otkriva osjetljive podatke",
        },
      ],
      caption: "Sigurnost mora biti razumljiva i obitelji.",
    },
    sections: [
      {
        heading: "Kontrola ostaje kod vas",
        body: [
          "Sigurnost u osobnom Bitcoin standardu počinje od jednostavne granice: kontrola ostaje kod vas. Nitko ne treba seed phrase, privatne ključeve, lozinke ili pristup računu da bi s vama razgovarao o sustavu.",
          "Ali kontrola ne znači izolaciju. Ako nitko ne zna što postoji, gdje su opće upute i što nikada ne smije napraviti, sustav ovisi samo o vama. Za ozbiljnu neto imovinu to nije dovoljno.",
        ],
      },
      {
        heading: "Jedna osoba nije sustav",
        body: [
          "Ako sve znate samo vi, nastaje situacija u kojoj jedna greška znači gubitak pristupa. Bolest, nesreća, smrt ili obična pogreška mogu ostaviti obitelj bez smjera.",
          "Dobar sustav ne predaje kontrolu drugima, ali uklanja potpunu ovisnost o jednoj osobi. Postoje upute, osobe od povjerenja i jasna pravila opreza. Takav pristup praktično nadograđuje Bitcoin standard.",
        ],
      },
      {
        heading: "Informacija nije isto što i pristup",
        body: [
          "Osoba od povjerenja može imati informaciju bez pristupa. Može znati da Bitcoin postoji, gdje su opće upute i koga smije kontaktirati, ali ne mora imati mogućnost pomicanja Bitcoina.",
          "Ta razlika čuva sigurnost. Potpuna tajnost može uništiti kontinuitet. Preširoko dijeljenje može uništiti kontrolu. Između toga postoji uređen put.",
        ],
      },
      {
        heading: "Što obitelj smije znati",
        body: [
          "Obitelj smije znati osnovni kontekst: Bitcoin postoji, dio je neto imovine, ne treba žuriti, postoje upute i postoje stvari koje nitko ne smije tražiti. Za prvi korak, toliko je dovoljno.",
          "Ne mora znati sve detalje. Ne mora čuvati osjetljive podatke ako za to nije spremna. Cilj nije prebaciti odgovornost, nego ukloniti paniku i pogrešne prve poteze.",
        ],
      },
      {
        heading: "Što nitko ne smije tražiti",
        body: [
          "Nitko ne smije tražiti seed phrase, privatne ključeve, lozinke, pristup burzi, pristup novčaniku ili slanje Bitcoina na svoju adresu radi čuvanja. Ta pravila trebaju biti kratka i razumljiva.",
          "Ako osoba od povjerenja zapamti samo jedno, neka zapamti ovo: prvo stati, ne žuriti, ne slati osjetljive podatke i ne vjerovati nikome tko traži kontrolu. Sigurnost počinje jasnim ne.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako Bitcoin postoji, ali obitelj ne zna što napraviti u izvanrednoj situaciji, uvodni razgovor može pomoći da to stavimo u jasniju sliku.",
    extraCta: {
      title: "Širi sigurnosni okvir",
      text: "Za širi sigurnosni okvir pročitajte i sigurnosnu stranicu.",
      label: "Pročitajte sigurnosna pravila",
      href: "/sigurnost/",
      dataCta: "guide-security-page",
    },
  },
]

export const guides = [...guideEntries].sort((first, second) => {
  if (first.order !== second.order) {
    return first.order - second.order
  }

  return first.title.localeCompare(second.title, "hr")
})

export type GuidesIndexPrimaryItem = {
  slug: string
  title: string
  category: string
  excerpt: string
}

export const guidesIndexPrimaryItems: GuidesIndexPrimaryItem[] = [
  {
    slug: "svaki-euro-ima-namjenu",
    title: "Svaki euro ima namjenu",
    category: "Proračun",
    excerpt:
      "Proračun nulte osnove pokazuje koji novac je stvarno slobodan za Bitcoin odluku.",
  },
  {
    slug: "dug-je-buduci-novac",
    title: "Dug je budući novac koji ste već potrošili",
    category: "Dug",
    excerpt:
      "Bitcoin i dug ne smiju se promatrati samo matematički. Dug mijenja stanje osobe koja odlučuje.",
  },
  {
    slug: "davanje-u-proracunu-nulte-osnove",
    title: "Davanje mijenja vaš odnos prema novcu",
    category: "Davanje",
    excerpt:
      "Nakon reda i izlaska iz duga, dio novca dobiva namjenu za druge ljude.",
  },
  {
    slug: "bitcoin-kao-novac",
    title: "Bitcoin je novac",
    category: "Bitcoin kao novac",
    excerpt:
      "Bitcoin nije samo imovina koju držite. U osobnom Bitcoin standardu ima ulogu novca.",
  },
  {
    slug: "niste-zakasnili-u-bitcoin",
    title: "Niste zakasnili u Bitcoin",
    category: "Bitcoin kao novac",
    excerpt:
      "Bitcoin je prije bio jeftiniji, ali je razumijevanje bilo skuplje.",
  },
  {
    slug: "bitcoin-nije-kripto-portfelj",
    title: "Bitcoin nije kripto portfelj",
    category: "Bitcoin kao novac",
    excerpt:
      "Bitcoin je novac, a ostale kriptovalute su eventualno rizične investicije koje treba mjeriti u Bitcoinu.",
  },
  {
    slug: "cijena-kao-mjera-vremena",
    title: "Cijena kao mjera vremena",
    category: "Kupovna moć",
    excerpt:
      "Dugoročni trend je pomoćni signal, ne prognoza cijene. Proračun odlučuje prvi.",
  },
  {
    slug: "bitcoin-u-neto-imovini",
    title: "Bitcoin i ravnoteža neto imovine",
    category: "Neto imovina",
    excerpt:
      "Novac, potrošna dobra i proizvodna imovina imaju različite uloge.",
  },
  {
    slug: "sigurnost-ne-smije-ovisiti-samo-o-vama",
    title: "Sigurnost i obiteljski plan",
    category: "Sigurnost i obitelj",
    excerpt:
      "Bitcoin mora ostati pod vašom kontrolom, ali sustav ne smije ovisiti samo o vama.",
  },
]

export const guidesIndexAdditionalGroups = [
  {
    title: "Proračun",
    slugs: ["stvarni-visak", "starost-novca", "dca-nije-dovoljan"],
  },
  {
    title: "Dug",
    slugs: ["dug-ili-bitcoin", "ne-zaduzujte-se-za-bitcoin"],
  },
  {
    title: "Davanje",
    slugs: ["davanje-bez-duga", "novac-dolazi-od-ljudi"],
  },
  {
    title: "Bitcoin kao novac",
    slugs: [
      "niste-zakasnili-u-bitcoin",
      "bitcoin-nije-kripto-portfelj",
      "pozitivni-neto-priljev",
      "uskladivanje-kupovne-moci-bitcoina",
    ],
  },
  {
    title: "Neto imovina",
    slugs: [
      "novac-kapital-potrosnja",
      "bitcoin-etfovi-i-riznicke-kompanije",
      "pravilo-trecina",
    ],
  },
  {
    title: "Sigurnost i obitelj",
    slugs: [
      "obiteljski-bitcoin-trezor",
      "samostalna-pohrana-ili-skrbnik",
      "bitkey-bitcoin-sigurnost",
      "obiteljski-pristup-bitcoinu",
    ],
  },
] as const

export const guidesIndexOrderedSlugs = [
  "svaki-euro-ima-namjenu",
  "stvarni-visak",
  "starost-novca",
  "dca-nije-dovoljan",
  "dug-je-buduci-novac",
  "dug-ili-bitcoin",
  "ne-zaduzujte-se-za-bitcoin",
  "davanje-u-proracunu-nulte-osnove",
  "davanje-bez-duga",
  "novac-dolazi-od-ljudi",
  "niste-zakasnili-u-bitcoin",
  "bitcoin-kao-novac",
  "bitcoin-nije-kripto-portfelj",
  "pozitivni-neto-priljev",
  "uskladivanje-kupovne-moci-bitcoina",
  "cijena-kao-mjera-vremena",
  "novac-kapital-potrosnja",
  "bitcoin-u-neto-imovini",
  "pravilo-trecina",
  "bitcoin-etfovi-i-riznicke-kompanije",
  "sigurnost-ne-smije-ovisiti-samo-o-vama",
  "obiteljski-bitcoin-trezor",
  "samostalna-pohrana-ili-skrbnik",
  "bitkey-bitcoin-sigurnost",
  "obiteljski-pristup-bitcoinu",
]

export const recommendedGuideSlugs = [
  "svaki-euro-ima-namjenu",
  "stvarni-visak",
  "starost-novca",
  "dug-je-buduci-novac",
  "dug-ili-bitcoin",
  "davanje-u-proracunu-nulte-osnove",
  "niste-zakasnili-u-bitcoin",
  "bitcoin-kao-novac",
  "bitcoin-nije-kripto-portfelj",
  "uskladivanje-kupovne-moci-bitcoina",
  "pravilo-trecina",
  "bitcoin-etfovi-i-riznicke-kompanije",
  "sigurnost-ne-smije-ovisiti-samo-o-vama",
  "obiteljski-bitcoin-trezor",
  "samostalna-pohrana-ili-skrbnik",
  "bitkey-bitcoin-sigurnost",
  "obiteljski-pristup-bitcoinu",
]

export const featuredGuides = guides.filter((guide) => guide.featured)

export function guideHref(slug: string) {
  return `/vodici/${slug}/`
}

export const guideRoutes = guides.map((guide) => guideHref(guide.slug))

export function findGuide(slug: string | undefined) {
  return guides.find(
    (guide) => guide.slug === slug || guide.previousSlugs?.includes(slug ?? "")
  )
}

export function guidesByCategory(category: GuideCategory) {
  return guides.filter((guide) => guide.category === category)
}
