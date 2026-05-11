import { PRIMARY_CTA } from "./site"

export type GuideSection = {
  heading: string
  body: string[]
  items?: string[]
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

const guideEntries: Guide[] = [
  {
    slug: "svaki-euro-ima-namjenu",
    title: "Svaki euro ima namjenu",
    metaDescription:
      "Vodič o osobnom proračunu nulte osnove i zašto Bitcoin odluke počinju tek kada svaki euro ima jasnu namjenu.",
    excerpt:
      "Praktični Bitcoin standard ne počinje pitanjem koliko Bitcoina kupiti. Počinje pitanjem zna li svaki euro što treba raditi.",
    category: "Osobni proračun nulte osnove",
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
          "Mnogi ljudi osobni proračun nulte osnove čuju kao zabranu. Kao popis stvari koje više ne smiju raditi. U Praktičnom Bitcoin standardu proračun nulte osnove ima drukčiju ulogu. On nije kazna. On je red. Pokazuje što vaš novac treba napraviti prije nego što ga potrošite, darujete, čuvate ili pretvorite u Bitcoin.",
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
          "Praktični Bitcoin standard zato traži da se buduća plaćanja vide unaprijed. Kada se vide, odluka je mirnija. Možda kupujete manje Bitcoina nego što ste mislili, ali ono što kupite ne ugrožava sustav.",
        ],
      },
      {
        heading: "Dug mijenja značenje viška",
        body: [
          "Ako postoji dug, višak se mora gledati strože. Dug je budući novac koji ste već potrošili. On ima pravo na dio budućih prihoda prije nego što vi donesete novu odluku. Zato dug može učiniti da novac koji izgleda slobodno zapravo nije slobodan.",
          "To ne znači da osoba u dugu nikada ne smije kupovati Bitcoin. Znači da stanje duga mora biti u slici. Ako ga nema u slici, dug odlučuje skriveno. A skriveni dug često odlučuje u najgorem trenutku.",
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
          "Kada novac ima veću starost, Bitcoin odluka ima mirniji temelj. Možete gledati osobni proračun nulte osnove, dug i neto imovinu bez osjećaja da svaka promjena traži hitan potez. To je bliže osobnom Bitcoin standardu.",
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
          "Pitanje nije samo kupujete li redovito. Pitanje je zašto kupujete baš taj iznos. Je li nastao iz stvarnog viška? Je li stanje duga vidljivo? Jesu li buduća plaćanja vidljiva? Je li sigurnosna zaliha dovoljna?",
          "Ako ne možete odgovoriti u jednoj jasnoj rečenici, iznos možda nije pravilo. Možda je navika. Navika može biti korisna, ali bez razloga ne može nositi ozbiljne Bitcoin odluke kroz vrijeme.",
        ],
      },
      {
        heading: "Proračun nulte osnove dolazi prije kupnje",
        body: [
          "Praktični Bitcoin standard počinje osobnim proračunom nulte osnove. Prvo se vidi svaki euro, svaki dug, svako veće buduće plaćanje i svaki dio novčane zalihe. Tek zatim se određuje koliko novca može ići u Bitcoin.",
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
          "Pogrešno pitanje glasi: je li kamata na dug niža od moguće buduće kupovne moći Bitcoina? To je matematički pogled koji propušta stanje osobe koja odlučuje.",
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
          "Težak, ali čistiji put može biti smanjiti standard, prodati što treba prodati, očistiti bilancu i vratiti zrak, mir i jasnoću. To nije ugodno, ali vraća odluke iz očaja u red.",
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
          "Zadužiti se za Bitcoin znači pokušati kupiti novac budućim novcem. To nije Bitcoin standard. To je fiat ponašanje primijenjeno na Bitcoin.",
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
          "Tada se više ne pitate što je ispravno pravilo, nego što će nas izvući do sljedeće rate. To nije sloboda. To je pritisak obučen u Bitcoin jezik.",
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
      "Vodič o davanju u Praktičnom Bitcoin standardu: bez očekivanja povrata, nakon izlaska iz duga i iz uređenog proračuna nulte osnove.",
    excerpt:
      "Davanje nije ostatak novca niti moralni pritisak. U Praktičnom Bitcoin standardu ono dolazi nakon reda i izlaska iz duga.",
    category: "Davanje",
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
          "Ovo nije poziv da dokazujete dobrotu novcem. Ovo je praksa koja ima smisla tek kada proračun i dug ne stvaraju pritisak.",
          "U Praktičnom Bitcoin standardu davanje dobiva mjesto u osobnom proračunu nulte osnove. Ne zato da bi netko dokazao dobrotu, nego zato da novac prestane biti nejasan. Svaki euro treba namjenu. Dio novca, kada je temelj uređen, može dobiti namjenu za druge ljude.",
        ],
      },
      {
        heading: "Davanje dolazi nakon izlaska iz duga",
        body: [
          "Dug stvara pritisak. Dug traži buduća plaćanja. Dug može učiniti da i dobra odluka postane izvor nemira. Zato davanje u ovom okviru ne smije usporiti izlazak iz duga niti prikriti neuređen proračun nulte osnove.",
          "Redoslijed je važan. Prvo osobni proračun nulte osnove. Zatim život bez duga. Tek tada redovito davanje. To ne znači da osoba u dugu ne smije nikada pomoći nikome. Znači da davanje kao praksa osobnog Bitcoin standarda dolazi iz reda i slobode, a ne iz pritiska.",
        ],
      },
      {
        heading: "Bez očekivanja povrata",
        body: [
          "Ako očekujete povrat, to nije davanje. To je dogovor, razmjena ili skrivena obveza. Davanje u ovom okviru ne traži da primatelj vrati uslugu, zahvalnost, naklonost ili buduću korist.",
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
      "Vodič o tome zašto davanje u Praktičnom Bitcoin standardu dolazi nakon osobnog proračuna nulte osnove i izlaska iz duga.",
    excerpt:
      "Kad se smanji osjećaj zarobljenosti, nemira i zbunjenosti, možete graditi praksu velikodušnosti.",
    category: "Davanje",
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
          "Kada se temelj uredi, početak može biti malen. To je dobro. Velikodušnost se ne mora dokazivati veličinom. Često je bolje darivati manje i češće nego rijetko napraviti veliki potez koji optereti proračun nulte osnove.",
          "Prvi mali dar uči nas primijetiti osobu, potrebu i trenutak. Uči nas dati bez unutarnjeg računa. Uči nas da novac ima ljudsku stranu. To je vježba, a ne predstava.",
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
          "To je jednostavna, ali važna misao. Kada gledate samo saldo, lako zaboravite da iza svakog eura koji ulazi postoji osoba, obitelj, kupac, klijent ili zajednica. Osobni Bitcoin standard zato ne zatvara čovjeka u stanje na računu. Vraća ga pitanju: kome stvaram vrijednost?",
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
    slug: "bitcoin-kao-novac",
    title: "Bitcoin je novac",
    metaDescription:
      "Vodič o tome zašto Praktični Bitcoin standard promatra Bitcoin kao novac, a ne kao investiciju sa strane.",
    excerpt:
      "Bitcoin nije samo imovina koju držite. U Praktičnom Bitcoin standardu Bitcoin ima ulogu novca.",
    category: "Bitcoin kao novac",
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
          "Novac nije samo ono čime danas plaćate kavu. Novac je dobro koje držite radi buduće razmjene. Njegova bitna vrijednost je kupovna moć kroz vrijeme. U tom smislu Praktični Bitcoin standard promatra Bitcoin kao novac.",
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
          "Praktični Bitcoin standard traži da novac ostaje zato što Bitcoin kao novac treba miran temelj. Ako proračun nulte osnove stalno curi, Bitcoin postaje prva stvar koju morate dirati kada se pojavi pritisak.",
        ],
      },
      {
        heading: "Zašto mjesec koji se troši nije standard",
        body: [
          "Ako redovito izlazi više novca nego što ulazi, sustav se troši. Možda to nije odmah vidljivo. Možda ga skriva dug, štednja ili rast cijene Bitcoina. Ali ako troškovi stalno pobjeđuju prihode, osobni Bitcoin standard nije stabilan.",
          "To nije moralna osuda. To je tehnička stvarnost osobnog novca. Ne možete dugoročno živjeti kao da budući novac uvijek može spasiti sadašnji nered. Dugoročni standard traži da sadašnji mjesec nosi sam sebe.",
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
          "Kada u sustavu ostaje novac, dio viška može postati novčana zaliha u Bitcoinu. To ne znači da sav višak mora ići u Bitcoin. Znači da Bitcoin može dobiti jasnu ulogu novca u sustavu.",
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
          "Kada Bitcoin raste, lako se pojavi osjećaj da morate nešto napraviti. Kada pada, isti osjećaj dolazi iz straha. U oba slučaja cijena se ponaša kao naredba. Praktični Bitcoin standard odbija taj redoslijed.",
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
          "Pad kupovne moći nije zapovijed za prodaju. To je poziv da mirno provjerite osnovne dijelove sustava.",
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
          "Takvo pravilo vraća odluku vama. Bitcoin ostaje novac u sustavu, a ne izvor stalne hitnosti. Usklađivanje kupovne moći nije pogađanje. To je održavanje reda.",
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
          "Dugoročni potencijski obrazac (Bitcoin power law) nije obećanje cijene. Nije plan za kratkoročnu kupnju ili prodaju. To je pomoćni način razmišljanja o odnosu cijene i vremena, posebno kada želite vidjeti je li kupovna moć ispred, blizu ili ispod dugoročnog ritma.",
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
          "U okviru Praktičnog Bitcoin standarda pravilo trećina služi kao provjera ravnoteže. Najmanje trećina u novcu, najviše trećina u potrošnim dobrima i najviše trećina u proizvodnoj imovini. To nije naredba za svaku osobu.",
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
      "Vodič o pravilu trećina u Praktičnom Bitcoin standardu: najmanje trećina u novcu, najviše trećina u potrošnji i proizvodnoj imovini.",
    excerpt:
      "Pravilo trećina nije naredba. To je ogledalo koje pokazuje je li vaša neto imovina u ravnoteži.",
    category: "Neto imovina",
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
          "Pravilo trećina u okviru Praktičnog Bitcoin standarda nije univerzalna naredba. Ono je ogledalo. Pomaže vidjeti je li previše neto imovine vezano u potrošnji, premalo u novcu ili nedovoljno u proizvodnoj imovini.",
          "Ovo nije preporuka da kupujete ili prodajete određenu imovinu. Pravilo trećina je pitanje za provjeru ravnoteže, ne formula koju treba slijepo provesti.",
        ],
      },
      {
        heading: "Najmanje trećina u novcu",
        body: [
          "Novac je dobro koje držite radi buduće razmjene. U ovom okviru Bitcoin ima ulogu novca. Najmanje trećina u novcu znači da sustav treba dovoljno kupovne moći koja nije vezana u potrošnim dobrima ili proizvodnoj imovini.",
          "To ne znači da svaka osoba mora odmah imati isti udio. Znači da se treba pitati imate li dovoljno novca za buduće odluke. Ako je novca premalo, svaka promjena života može nas prisiliti na loš potez.",
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
          "Preispitivanje ne znači da morate nešto kupiti ili prodati. Možda je zaključak da ne dirate ništa. Ali tada znate zašto. To je razlika između imovine koja se samo dogodila i osobnog Bitcoin standarda.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
    finalCtaPrompt:
      "Ako želite provjeriti ravnotežu neto imovine bez pretvaranja toga u slijepu formulu, to vrijedi razjasniti u razgovoru.",
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
          description: "seed phrase i privatni ključevi",
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
          "To ne znači da obitelji treba dati pristup svemu. Znači da treba postojati put: što postoji, gdje su opće upute, kome se smije javiti i što se nikada ne smije napraviti.",
        ],
      },
      {
        heading: "Informacija nije isto što i pristup",
        body: [
          "Informacija može glasiti da Bitcoin postoji i da postoje upute. Kontrola znači mogućnost pomicanja Bitcoina. Te dvije stvari ne smiju se miješati.",
          "Dobar obiteljski pristup daje dovoljno informacija da osoba ne bude izgubljena, ali ne izlaže osjetljive podatke bez potrebe. To je ravnoteža između kontinuiteta i sigurnosti.",
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
          "Ali kontrola ne znači izolaciju. Ako nitko ne zna što postoji, gdje su opće upute i što nikada ne smije napraviti, sustav ovisi samo o vama. To nije dovoljno za ozbiljnu neto imovinu.",
        ],
      },
      {
        heading: "Jedna osoba nije sustav",
        body: [
          "Ako sve znate samo vi, nastaje situacija u kojoj jedna greška znači gubitak pristupa. Bolest, nesreća, smrt ili obična pogreška mogu ostaviti obitelj bez smjera.",
          "Dobar sustav ne predaje kontrolu drugima, ali uklanja potpunu ovisnost o jednoj osobi. Postoje upute, osobe od povjerenja i jasna pravila opreza. To je praktična nadogradnja Bitcoin standarda.",
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
          "Obitelj smije znati osnovni kontekst: Bitcoin postoji, dio je neto imovine, ne treba žuriti, postoje upute i postoje stvari koje nitko ne smije tražiti. To je dovoljno za prvi korak.",
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
    slugs: ["pozitivni-neto-priljev", "uskladivanje-kupovne-moci-bitcoina"],
  },
  {
    title: "Neto imovina",
    slugs: ["novac-kapital-potrosnja", "pravilo-trecina"],
  },
  {
    title: "Sigurnost i obitelj",
    slugs: ["obiteljski-pristup-bitcoinu"],
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
  "bitcoin-kao-novac",
  "pozitivni-neto-priljev",
  "uskladivanje-kupovne-moci-bitcoina",
  "cijena-kao-mjera-vremena",
  "novac-kapital-potrosnja",
  "bitcoin-u-neto-imovini",
  "pravilo-trecina",
  "sigurnost-ne-smije-ovisiti-samo-o-vama",
  "obiteljski-pristup-bitcoinu",
]

export const recommendedGuideSlugs = [
  "svaki-euro-ima-namjenu",
  "stvarni-visak",
  "starost-novca",
  "dug-je-buduci-novac",
  "dug-ili-bitcoin",
  "davanje-u-proracunu-nulte-osnove",
  "bitcoin-kao-novac",
  "uskladivanje-kupovne-moci-bitcoina",
  "pravilo-trecina",
  "sigurnost-ne-smije-ovisiti-samo-o-vama",
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
