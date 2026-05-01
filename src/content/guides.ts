import { PRIMARY_CTA } from "./site"

export type GuideSection = {
  heading: string
  body: string[]
}

export const guideCategories = [
  "Osobni proračun",
  "Život bez duga",
  "Darivanje",
  "Bitcoin kao novac",
  "Neto imovina",
  "Sigurnost i obitelj",
] as const

export type GuideCategory = (typeof guideCategories)[number]

export const guideCategoryDescriptions: Record<GuideCategory, string> = {
  "Osobni proračun":
    "Prvi korak je red. Svaki euro dobiva namjenu prije Bitcoin odluke.",
  "Život bez duga":
    "Dug je budući novac koji ste već potrošili. Bitcoin standard počinje izlaskom iz duga.",
  Darivanje: "Nakon izlaska iz duga, dio novca dobiva namjenu za druge ljude.",
  "Bitcoin kao novac":
    "Bitcoin se promatra kao novac i novčana zaliha, ne kao imovina sa strane.",
  "Neto imovina":
    "Novac, potrošna dobra i proizvodna imovina imaju različite uloge.",
  "Sigurnost i obitelj":
    "Bitcoin mora ostati pod vašom kontrolom, ali sustav ne smije ovisiti samo o vama.",
}

export type Guide = {
  slug: string
  title: string
  metaDescription: string
  excerpt: string
  category: GuideCategory
  order: number
  featured?: boolean
  publishedAt: string
  updatedAt: string
  practicalQuestion: string
  relatedSlugs: string[]
  sections: GuideSection[]
  finalCta: string
}

const guideEntries: Guide[] = [
  {
    slug: "svaki-euro-ima-namjenu",
    title: "Svaki euro ima namjenu",
    metaDescription:
      "Vodič o osobnom proračunu nulte osnove i zašto Bitcoin odluke počinju tek kada svaki euro ima jasnu namjenu.",
    excerpt:
      "Praktični Bitcoin standard ne počinje pitanjem koliko Bitcoina kupiti. Počinje pitanjem zna li svaki euro što treba raditi.",
    category: "Osobni proračun",
    order: 10,
    featured: true,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Možete li za svaki euro koji imate reći što treba napraviti prije nego što odlučite kupiti Bitcoin?",
    relatedSlugs: ["stvarni-visak", "starost-novca", "darivanje-u-proracunu"],
    sections: [
      {
        heading: "Proračun nije kazna",
        body: [
          "Mnogi ljudi osobni proračun čuju kao zabranu. Kao popis stvari koje više ne smiju raditi. U Praktičnom Bitcoin standardu proračun ima drukčiju ulogu. On nije kazna. On je red. Pokazuje što vaš novac treba napraviti prije nego što ga potrošite, darujete, čuvate ili pretvorite u Bitcoin.",
          "Bez proračuna, odluka izgleda slobodno, ali često nije slobodna. Novac na računu stvara osjećaj prostora. Onda dođe rata, popravak, porez, zdravstveni trošak ili obiteljska potreba. Ono što je izgledalo kao višak odjednom postaje novac koji je već trebao imati namjenu.",
        ],
      },
      {
        heading: "Svaki euro već ima posao",
        body: [
          "Svaki euro koji imate već nekamo ide. Ako mu vi ne date posao, posao će mu dati navika, hitnost ili tuđi zahtjev. Zato proračun nulte osnove počinje jednostavnom rečenicom: svaki euro mora dobiti namjenu. Ne zato da biste sve potrošili, nego zato da ništa ne ostane nejasno.",
          "Jedan dio novca ide na redovne troškove. Jedan dio na dug. Jedan dio na buduće odljeve. Jedan dio na sigurnosnu zalihu. Jedan dio može ići na darivanje. Tek nakon toga možete mirno reći koji dio novca stvarno može postati Bitcoin odluka. Red dolazi prije kupnje.",
        ],
      },
      {
        heading: "Bez namjene nema stvarnog viška",
        body: [
          "Stvarni višak nije iznos koji vidite na računu. Stvarni višak je novac koji je slobodan nakon što su poznati odljevi, obveze, dugovi i budući troškovi. Ako novac za dva mjeseca mora platiti nešto važno, on nije višak. On samo čeka svoj red.",
          "Zato je opasno kupovati Bitcoin samo zato što se danas čini da ima prostora. Možda prostor postoji. Možda ne postoji. Proračun je način da to prestane biti dojam. On pokazuje koji novac možete rasporediti bez toga da sutra morate prodati Bitcoin ili se zadužiti za nešto što ste mogli vidjeti unaprijed.",
        ],
      },
      {
        heading: "Bitcoin odluka počinje prije kupnje",
        body: [
          "Bitcoin odluka ne počinje na burzi. Počinje u proračunu. Počinje pitanjem: što ovaj novac već mora napraviti? Ako odgovor nije jasan, kupnja nije zrela odluka. Može biti dobra namjera, ali nije dio osobnog Bitcoin standarda.",
          "Kada proračun postoji, kupnja postaje mirnija. Ne morate pogađati osjećaj. Vidite koliko novca ima namjenu, koliko ga treba čekati i koliko ga je stvarno slobodno. Tada Bitcoin ulazi u sustav kao novac, a ne kao impulzivan bijeg od neuređenog eura.",
        ],
      },
      {
        heading: "Pravilo koje treba zapisati",
        body: [
          "Prvo pravilo može biti vrlo jednostavno: ne donosim Bitcoin odluku dok svaki euro nema namjenu. To pravilo ne govori koliko trebate kupiti. Ono štiti redoslijed. Prvo proračun, zatim stvarni višak, tek onda kupnja, čekanje ili trošenje.",
          "Ako to pravilo možete objasniti sebi i obitelji, već ste napravili velik korak. Bitcoin standard nije samo posjedovanje Bitcoina. Počinje kada novac prestane lutati i kada svaka odluka ima mjesto u pisanom sustavu.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
  {
    slug: "stvarni-visak",
    title: "Što je stvarni višak?",
    metaDescription:
      "Vodič o tome kako osobni proračun, dug, budući odljevi i novčana zaliha pokazuju koji je novac stvarno slobodan za Bitcoin odluke.",
    excerpt:
      "Stvarni višak je novac koji je slobodan tek nakon što svaki euro ima namjenu i nakon što su budući odljevi vidljivi.",
    category: "Osobni proračun",
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
    sections: [
      {
        heading: "Višak nije stanje na računu",
        body: [
          "Novac koji stoji na računu može izgledati slobodno. Ali račun ne zna što dolazi. Ne zna za registraciju auta, porez, popravak, školarinu, put, liječnika ili mjesec u kojem prihod kasni. Zbog toga stanje na računu nije isto što i stvarni višak.",
          "Stvarni višak postoji tek nakon što su vidljivi osobni proračun, dug, budući odljevi i sigurnosna zaliha. Sve prije toga je samo dojam. A dojam je loš temelj za Bitcoin odluke.",
        ],
      },
      {
        heading: "Novac može biti zauzet i kada miruje",
        body: [
          "Novac ne mora biti potrošen da bi već bio zauzet. Može čekati obvezu. Može čekati račun. Može čekati mjesec u kojem će troškovi biti veći od priljeva. Ako ga tada nazovete viškom, sami sebi stvarate budući pritisak.",
          "Praktični Bitcoin standard zato traži da se budući odljevi vide unaprijed. Kada se vide, odluka je mirnija. Možda kupujete manje Bitcoina nego što ste mislili, ali ono što kupite ne ugrožava sustav.",
        ],
      },
      {
        heading: "Dug mijenja značenje viška",
        body: [
          "Ako postoji dug, višak se mora gledati strože. Dug je budući novac koji ste već potrošili. On ima pravo na dio budućih priljeva prije nego što vi donesete novu odluku. Zato dug može učiniti da novac koji izgleda slobodno zapravo nije slobodan.",
          "To ne znači da osoba s dugom nikada ne smije kupovati Bitcoin. Znači da dug mora biti u slici. Ako ga nema u slici, dug odlučuje skriveno. A skriveni dug često odlučuje u najgorem trenutku.",
        ],
      },
      {
        heading: "Višak mora preživjeti vrijeme",
        body: [
          "Dobar test je vrijeme. Ako isti novac može mirno preživjeti nekoliko mjeseci bez toga da ugrozi obveze, vjerojatnije je da je stvarno slobodan. Ako nestaje čim dođe prvi veći trošak, nije višak. Bio je samo kratka pauza između dva odljeva.",
          "Zato osobni proračun ne smije gledati samo ovaj mjesec. Treba gledati i ono što dolazi. Bitcoin odluka koja ne vidi budućnost lako postane odluka koju morate popravljati prodajom, dugom ili stresom.",
        ],
      },
      {
        heading: "Jednostavno pravilo",
        body: [
          "Pravilo može glasiti: višak je samo novac koji nema drugu namjenu, ne pripada budućem odljevu, ne treba za dug i ne slabi sigurnosnu zalihu. Sve ostalo još nije višak.",
          "Kada ovo zapišete, Bitcoin odluke postaju čišće. Manje je glume, manje hitnosti i manje potrebe da cijena odlučuje umjesto vas. Prvo znate što je slobodno. Tek onda odlučujete što s tim novcem.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
  {
    slug: "starost-novca",
    title: "Starost novca: koliko dugo vaš novac preživi?",
    metaDescription:
      "Vodič o starosti novca, budućim odljevima i zašto mirnije Bitcoin odluke traže novac koji nije odmah pod pritiskom.",
    excerpt:
      "Novac koji mora odmah nestati ne daje slobodu. Što je novac stariji, to je lakše donositi mirne Bitcoin odluke.",
    category: "Osobni proračun",
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
    sections: [
      {
        heading: "Novac koji odmah nestaje",
        body: [
          "Ako novac stigne danas i nestane sutra, on ne daje mnogo slobode. Možda pokriva trošak, ali ne stvara prostor. Živite blizu sljedećeg računa. Svaki novi odljev traži brzu odluku, a svaka promjena cijene Bitcoina izgleda važnije nego što možda jest.",
          "Takav život nije uvijek posljedica neodgovornosti. Ponekad je posljedica malog prihoda, visokih troškova, duga ili obiteljskih okolnosti. Ali dok novac odmah nestaje, Bitcoin odluke su pod pritiskom. Nije dovoljno imati uvjerenje. Treba imati vrijeme.",
        ],
      },
      {
        heading: "Stariji novac daje prostor",
        body: [
          "Starost novca pokazuje koliko dugo novac može ostati u vašem sustavu prije nego što mora otići. Ako današnje troškove plaćate novcem koji je stigao prije mjesec dana, imate više prostora nego osoba koja svaki račun čeka s novom uplatom.",
          "Taj prostor mijenja odluke. Lakše je čekati. Lakše je reći ne potrošnji. Lakše je ne prodati Bitcoin zbog troška koji ste mogli predvidjeti. Stariji novac ne uklanja životne probleme, ali smanjuje hitnost.",
        ],
      },
      {
        heading: "Budući odljevi moraju biti vidljivi",
        body: [
          "Starost novca ne raste samo tako da trošite manje. Raste kada budući odljevi postanu vidljivi. Godišnje osiguranje, veći servis, porez, oprema za posao i obiteljski troškovi trebaju dobiti mjesto prije nego se pojave.",
          "Ako ti odljevi nisu zapisani, iznenađuju vas svaki put. Tada novac koji ste mislili koristiti za Bitcoin odjednom mora pokriti nešto drugo. Nije problem u Bitcoinu. Problem je u tome što budući novac nije bio imenovan na vrijeme.",
        ],
      },
      {
        heading: "Zašto ovo mijenja Bitcoin odluke",
        body: [
          "Bitcoin traži sposobnost čekanja. Ako svaka uplata odmah mora pokriti nekoliko obveza, teško je čekati. Kupnja može biti prenapeta, prodaja može biti prebrza, a pad kupovne moći može izgledati kao osobna kriza.",
          "Kada novac ima veću starost, Bitcoin odluka ima mirniji temelj. Možete gledati osobni proračun, dug i neto imovinu bez osjećaja da svaka promjena traži hitan potez. To je bliže osobnom Bitcoin standardu.",
        ],
      },
      {
        heading: "Kako zapisati prvo pravilo",
        body: [
          "Prvo pravilo može biti jednostavno: dio priljeva ne dodirujem dok ne pokrije poznate buduće odljeve. Tek kada su ti odljevi vidljivi, gledam stvarni višak i Bitcoin odluku. To pravilo stvara vrijeme.",
          "Nije potrebno početi savršeno. Dovoljno je mjeriti koliko dana novac preživi i postupno povećavati taj broj. Svaki dodatni dan smanjuje pritisak. A manji pritisak znači bolje odluke.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
  {
    slug: "dca-nije-dovoljan",
    title: "Zašto redovita kupnja nije dovoljna?",
    metaDescription:
      "Redovita kupnja može biti korisna navika, ali ne zamjenjuje osobni proračun, stvarni višak, dug, kupovnu moć i pisana pravila.",
    excerpt:
      "Redovita kupnja može smanjiti impulzivnost, ali ne zamjenjuje osobni proračun, stvarni višak i pravila kupovne moći.",
    category: "Osobni proračun",
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
          "Redovita kupnja Bitcoina može biti korisna. Smanjuje impulzivne odluke i uklanja potrebu da svaki mjesec iznova odlučujete. Ali dobra navika nije isto što i osobni Bitcoin standard. Ona ne zna imate li dug, budući trošak, premalu zalihu ili obiteljsku obvezu.",
          "Ako redovita kupnja stoji odvojeno od proračuna, ona može skrivati problem. Iznos se ponavlja, osjećaj discipline postoji, ali nitko ne provjerava ima li novac stvarno pravo otići u Bitcoin. Automatizam ne smije zamijeniti red.",
        ],
      },
      {
        heading: "Iznos mora imati razlog",
        body: [
          "Pitanje nije samo kupujete li redovito. Pitanje je zašto kupujete baš taj iznos. Je li nastao iz stvarnog viška? Je li dug pod kontrolom? Jesu li budući odljevi vidljivi? Je li sigurnosna zaliha dovoljna?",
          "Ako ne možete odgovoriti u jednoj jasnoj rečenici, iznos možda nije pravilo. Možda je navika. Navika može biti korisna, ali bez razloga ne može nositi ozbiljne Bitcoin odluke kroz vrijeme.",
        ],
      },
      {
        heading: "Proračun dolazi prije kupnje",
        body: [
          "Praktični Bitcoin standard počinje osobnim proračunom. Prvo se vidi svaki euro, svaki dug, svaki veći budući odljev i svaki dio novčane zalihe. Tek zatim se određuje koliko novca može ići u Bitcoin.",
          "Ovaj redoslijed štiti od dvije pogreške. Prva je kupnja novcem koji već pripada drugoj obvezi. Druga je premala kupnja iz straha, iako stvarni višak postoji. Proračun ne služi zabrani. Služi jasnoći.",
        ],
      },
      {
        heading: "Kupovna moć mijenja pravilo",
        body: [
          "Isti iznos kupnje ne znači isto u svakom trenutku. Troškovi se mijenjaju. Prihodi se mijenjaju. Kupovna moć Bitcoina se mijenja. Zato pravilo redovite kupnje treba povremeno provjeriti.",
          "Provjera ne znači stalno reagirati na cijenu. Znači pitati je li iznos još u skladu s proračunom, dugom, neto imovinom i budućim odljevima. Ponekad je dobro nastaviti. Ponekad je bolje čekati. Ponekad je zrelije prvo riješiti dug.",
        ],
      },
      {
        heading: "Pravilo za promjenu",
        body: [
          "Dobro pravilo kaže kada se kupnja mijenja. Primjerice: nakon novog duga, promjene prihoda, otplate duga, većeg troška ili promjene uloge Bitcoina u neto imovini. Bez tih uvjeta, odluka se mijenja tek kada emocije postanu jake.",
          "Redovita kupnja može ostati dio sustava. Ali ne smije biti sustav. Osobni Bitcoin standard traži da znate kada kupujete, kada čekate i zašto ne dirate novac koji ima drugu namjenu.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
  {
    slug: "dug-je-buduci-novac",
    title: "Dug je budući novac koji ste već potrošili",
    metaDescription:
      "Vodič o dugu kao budućem novcu, fiat ponašanju i glavnoj zapreci mirnom korištenju Bitcoina kao novca.",
    excerpt:
      "Dug nije samo kamata. Dug je obveza prema budućnosti koja ulazi u svaku Bitcoin odluku.",
    category: "Život bez duga",
    order: 30,
    featured: true,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion: "Koji dug najviše odlučuje umjesto vas?",
    relatedSlugs: [
      "dug-ili-bitcoin",
      "ne-zaduzujte-se-za-bitcoin",
      "darivanje-bez-duga",
    ],
    sections: [
      {
        heading: "Dug nije samo broj",
        body: [
          "Dug se često prikazuje kao broj u tablici. Iznos, kamata, rok, rata. To je korisno, ali nije dovoljno. Dug nije samo broj. Dug je budući novac koji više nije slobodan. Dio vašeg budućeg rada već je obećan prije nego što ste ga odradili.",
          "Zato dug ne stoji sa strane Bitcoin odluke. On je u njoj. Dok dug postoji, on traži odljeve. Traži pažnju. Traži sigurnost. Može se činiti da odlučujete slobodno, ali dug već sužava prostor u kojem odlučujete.",
        ],
      },
      {
        heading: "Dug je budući novac",
        body: [
          "Kada se zadužite, trošite novac koji još niste zaradili. Danas dobivate stvar, uslugu ili likvidnost, ali sutra dolazi obveza. Taj sutrašnji novac više nema punu slobodu. Već ima vlasnika, rok i uvjet.",
          "Dug je fiat ponašanje jer normalizira život iz budućnosti. U fiat sustavu takvo ponašanje izgleda normalno: danas trošite, sutra plaćate. Praktični Bitcoin standard ide suprotnim putem. Prvo uređuje sadašnji novac, zatim uklanja dug, pa tek onda gradi mirniji odnos prema Bitcoinu kao novcu.",
        ],
      },
      {
        heading: "Zašto dug odlučuje prije vas",
        body: [
          "Dug odlučuje prije vas zato što ne čeka vaš osjećaj. Rata dolazi bez obzira na cijenu Bitcoina, posao, zdravlje ili raspoloženje. Kada kupovna moć padne ili prihod zakasni, dug ne nestaje. On traži novac.",
          "Tada Bitcoin može postati prva stvar koju dirate, iako to niste htjeli. Ne zato što je plan bio loš, nego zato što dug nije bio dovoljno ozbiljno shvaćen. Dug smanjuje vrijeme. A kada je vremena malo, odluke postaju grublje.",
        ],
      },
      {
        heading: "Zašto dug i Bitcoin ne idu zajedno",
        body: [
          "Bitcoin kao novac traži strpljenje. Dug traži rok. Bitcoin vas uči čekanju. Dug vas gura prema hitnosti. Te dvije sile mogu živjeti u istom životu, ali nisu neutralne. Ako dug raste, Bitcoin standard slabi.",
          "Najveća opasnost nije samo kamata. Najveća opasnost je prisila. Dug može natjerati osobu da proda Bitcoin u trenutku kada to ne želi. Zato izlazak iz duga nije sporedna optimizacija. To je temelj osobnog Bitcoin standarda.",
        ],
      },
      {
        heading: "Prvi korak prema izlasku",
        body: [
          "Prvi korak nije sram. Prvi korak je popis. Koliko duga postoji? Koji je rok? Kolika je rata? Koji dug stvara najveći pritisak? Koji dug bi, ako nestane, najviše povećao slobodu odlučivanja?",
          "Kada dug postane vidljiv, može dobiti plan izlaska. Tada Bitcoin odluke više ne stoje iznad stvarnosti. One stoje u stvarnosti. I baš zato postaju jače.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
  {
    slug: "dug-ili-bitcoin",
    title: "Zašto dug i Bitcoin ne idu zajedno?",
    metaDescription:
      "Vodič o tome zašto dug smanjuje slobodu odlučivanja i zašto Praktični Bitcoin standard počinje životom bez duga.",
    excerpt:
      "Dug je budući novac koji ste već potrošili. Zato može smanjiti slobodu držanja Bitcoina baš onda kada vam je sloboda najpotrebnija.",
    category: "Život bez duga",
    order: 35,
    publishedAt: "2026-04-30",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Bi li vas postojeći dug mogao prisiliti da prodate Bitcoin u trenutku kada to ne želite?",
    relatedSlugs: [
      "dug-je-buduci-novac",
      "ne-zaduzujte-se-za-bitcoin",
      "stvarni-visak",
    ],
    sections: [
      {
        heading: "Dug i Bitcoin vuku u suprotnim smjerovima",
        body: [
          "Bitcoin kao novac traži strpljenje, nižu vremensku sklonost i sposobnost čekanja. Dug traži rok, ratu i budući odljev. Bitcoin vam može dati prostor. Dug taj prostor smanjuje.",
          "Zato dug i Bitcoin ne idu zajedno kao da su neutralne stavke u tablici. Dug mijenja način na koji doživljavate promjene kupovne moći. Može od mirne odluke napraviti hitnu odluku.",
        ],
      },
      {
        heading: "Dug može natjerati na prodaju",
        body: [
          "Najveći problem duga nije samo kamata. Problem je prisila. Ako imate dug, malu novčanu zalihu i kratak rok, pad kupovne moći Bitcoina može vas natjerati na prodaju upravo onda kada ne želite prodati.",
          "Tada cijena ne odlučuje sama. Odlučuje dug. Zato se u Praktičnom Bitcoin standardu dug ne gura pod tepih. On dolazi rano, prije pitanja o većoj kupnji.",
        ],
      },
      {
        heading: "Dug je fiat ponašanje",
        body: [
          "Fiat sustav normalizira život iz budućnosti. Danas trošite, sutra plaćate. To ponašanje lako uđe u osobni život: veći stil života, više obveza, manje slobode.",
          "Kada se isto ponašanje primijeni na Bitcoin, nastaje krhki sustav. Osoba pokušava doći do novca koji traži strpljenje pomoću duga koji traži hitnost. To nije Praktični Bitcoin standard.",
        ],
      },
      {
        heading: "Razduživanje je Bitcoin odluka",
        body: [
          "Ponekad je najbolja Bitcoin odluka ne kupiti više Bitcoina, nego smanjiti dug. To ne zvuči uzbudljivo. Ali povećava slobodu. Smanjuje buduće odljeve. Smanjuje rizik prisilne prodaje.",
          "U tom okviru, život bez duga nije sporedna tema. To je uvjet da Bitcoin odluke ne budu stalno pod pritiskom prošlih potrošačkih odluka.",
          "Život bez duga ne znači da je sve riješeno. Ali znači da više novca ostaje pod vašom namjenom. A novac koji nije već obećan budućnosti lakše može postati dio osobnog Bitcoin standarda.",
        ],
      },
      {
        heading: "Redoslijed koji štiti",
        body: [
          "Koristan redoslijed glasi: osobni proračun, plan izlaska iz duga, stvarni višak, Bitcoin kao novac. Ako taj redoslijed preskočite, dug može ostati skriveni zapovjednik cijelog sustava.",
          "Dobro pravilo može biti jednostavno: dok određeni dug postoji, kupnja ne prelazi unaprijed zapisan dio stvarnog viška. Kada se dug smanji, pravilo se preispituje. Tako dug prestaje odlučivati umjesto vas.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
  {
    slug: "ne-zaduzujte-se-za-bitcoin",
    title: "Ne zadužujte se za Bitcoin",
    metaDescription:
      "Vodič o tome zašto zaduživanje radi kupnje Bitcoina nije Praktični Bitcoin standard, nego fiat ponašanje primijenjeno na Bitcoin.",
    excerpt:
      "Zadužiti se za Bitcoin znači koristiti fiat pravila za ulazak u Bitcoin. Praktični Bitcoin standard ide suprotnim putem.",
    category: "Život bez duga",
    order: 40,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Biste li istu Bitcoin odluku donijeli da ne očekujete rast cijene?",
    relatedSlugs: ["dug-je-buduci-novac", "dug-ili-bitcoin", "stvarni-visak"],
    sections: [
      {
        heading: "Zašto zvuči primamljivo",
        body: [
          "Zadužiti se za Bitcoin može zvučati logično kada vjerujete da će kupovna moć Bitcoina rasti. Dug ima poznatu cijenu, a Bitcoin možda ima veću buduću vrijednost. Na papiru to može izgledati kao pametan potez.",
          "Ali osobni Bitcoin standard ne živi na papiru. Živi u mjesecima u kojima dolaze računi, obitelj, troškovi, padovi cijene, promjene prihoda i umor. Pitanje nije samo može li matematika uspjeti. Pitanje je možete li živjeti s pritiskom ako ne uspije na vrijeme.",
        ],
      },
      {
        heading: "Zašto je to fiat ponašanje",
        body: [
          "Fiat ponašanje kaže: uzmi iz budućnosti da bi trošio danas. Bitcoin standard kaže suprotno: prvo uredite novac koji imate, izađite iz duga i tek onda gradite iz stvarnog viška. To je velika razlika.",
          "Kada se zadužite za Bitcoin, pokušavate ući u čvršći novac pomoću slabog pravila. Dug uvodi rok i prisilu. Bitcoin traži vrijeme i mir. Ako se te dvije stvari pomiješaju, dug često pobijedi upravo kada tržište postane teško.",
        ],
      },
      {
        heading: "Što dug radi vašoj sposobnosti čekanja",
        body: [
          "Dug smanjuje sposobnost čekanja. Ako cijena padne, rata ostaje. Ako prihod kasni, rata ostaje. Ako se pojavi trošak, rata ostaje. Sve to može natjerati osobu da proda Bitcoin ne zato što želi, nego zato što mora.",
          "Zato zaduživanje radi kupnje Bitcoina nije samo veći rizik. To je promjena karaktera odluke. Bitcoin prestaje biti novac koji držite strpljivo i postaje oklada koja mora uspjeti prije nego dug postane pretežak.",
        ],
      },
      {
        heading: "Bolji redoslijed",
        body: [
          "Bolji redoslijed je sporiji i jači: osobni proračun, život bez duga, stvarni višak, Bitcoin kao novac. Taj redoslijed možda ne izgleda uzbudljivo, ali smanjuje krhkost. Ne ovisi o tome da cijena brzo potvrdi vašu odluku.",
          "Kada kupujete iz stvarnog viška, možete čekati. Kada kupujete iz duga, čekanje ima cijenu koja se svaki mjesec javlja kao obveza. To je razlika između standarda i pritiska.",
        ],
      },
      {
        heading: "Pravilo koje štiti od pogreške",
        body: [
          "Pravilo može glasiti: ne koristim novi dug za kupnju Bitcoina. Ako želim više Bitcoina, prvo tražim veći stvarni višak: smanjenje odljeva, veći priljev, izlazak iz duga ili jasniju namjenu novca.",
          "To pravilo ne napada ambiciju. Štiti je. Bitcoin standard nije dokaz hrabrosti kroz dug. To je sustav u kojem novac, dug, potrošnja i sigurnost imaju pravila koja možete izdržati kroz vrijeme.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
  {
    slug: "darivanje-u-proracunu",
    title: "Darivanje mijenja vaš odnos prema novcu",
    metaDescription:
      "Vodič o darivanju u Praktičnom Bitcoin standardu: bez očekivanja povrata, nakon izlaska iz duga i iz uređenog proračuna.",
    excerpt:
      "Darivanje nije ostatak novca niti moralni pritisak. U Praktičnom Bitcoin standardu ono dolazi nakon reda i izlaska iz duga.",
    category: "Darivanje",
    order: 50,
    featured: true,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Imate li u osobnom proračunu prostor za darivanje koje ne očekuje ništa natrag?",
    relatedSlugs: [
      "darivanje-bez-duga",
      "svaki-euro-ima-namjenu",
      "dug-je-buduci-novac",
    ],
    sections: [
      {
        heading: "Darivanje nije ostatak",
        body: [
          "Darivanje nije ono što se dogodi ako nešto slučajno ostane. Ako je samo ostatak, tada ovisi o raspoloženju, krivnji ili pritisku trenutka. Jedan mjesec postoji, drugi mjesec nestane. Nema pravilo i nema mir.",
          "U Praktičnom Bitcoin standardu darivanje dobiva mjesto u osobnom proračunu. Ne zato da bi netko dokazao dobrotu, nego zato da novac prestane biti nejasan. Svaki euro treba namjenu. Dio novca, kada je temelj uređen, može dobiti namjenu za druge ljude.",
        ],
      },
      {
        heading: "Darivanje dolazi nakon izlaska iz duga",
        body: [
          "Dug stvara pritisak. Dug traži buduće odljeve. Dug može učiniti da i dobra odluka postane izvor nemira. Zato darivanje u ovom okviru ne smije usporiti izlazak iz duga niti prikriti neuređen proračun.",
          "Redoslijed je važan. Prvo osobni proračun. Zatim život bez duga. Tek tada redovito darivanje. To ne znači da osoba s dugom ne smije nikada pomoći nikome. Znači da darivanje kao praksa osobnog Bitcoin standarda dolazi iz reda i slobode, a ne iz pritiska.",
        ],
      },
      {
        heading: "Bez očekivanja povrata",
        body: [
          "Ako očekujete povrat, to nije darivanje. To je kredit, dogovor, razmjena ili skrivena obveza. Darivanje u ovom okviru ne traži da primatelj vrati uslugu, zahvalnost, naklonost ili buduću korist.",
          "To čuva dostojanstvo primatelja. Dar ne smije postati nevidljiv dug. Ako poklon stvara obvezu, više nije čist dar. Zato pravilo mora biti jasno: darujem bez očekivanja povrata i bez stvaranja pritiska na osobu koja prima.",
        ],
      },
      {
        heading: "Darivanje vas okreće prema ljudima",
        body: [
          "Darivanje nije zato što ste nešto uzeli od društva. Pošteno zarađen novac već znači da ste nekome pružili vrijednost. Netko je dobrovoljno dao svoj novac jer je ono što ste ponudili bilo vrijedno.",
          "Darivanje zato ima drukčiju ulogu. Ono vas okreće izvan sebe. Podsjeća da novac nije samo obrana od straha, nego i način odnosa prema ljudima. Kada dio proračuna dobije namjenu za druge, novac postaje manje zatvoren i više usmjeren na služenje.",
        ],
      },
      {
        heading: "Velikodušnost mijenja način rada",
        body: [
          "Velikodušna osoba lakše sluša. Lakše vidi što drugoj osobi stvarno treba. Lakše prima povratnu informaciju, pregovara bez sitničavosti i gradi odnose koji traju. To ne jamči veći prihod. Ali povećava sposobnost stvaranja vrijednosti.",
          "Zato darivanje nije sporedna proračunska stavka. Ono vježba smjer iz kojeg dolazi pošten prihod: prema ljudima, njihovim problemima i vrijednosti koju možete stvoriti. Bolji novac ne bi smio čovjeka učiniti tvrđim. Trebao bi mu dati više reda i više slobode za velikodušnost.",
        ],
      },
      {
        heading: "Prvo pravilo darivanja",
        body: [
          "Pravilo može biti jednostavno: kada osobni proračun ima red i dug ima plan izlaska ili je uklonjen, dio novca dobiva namjenu za darivanje bez očekivanja povrata. Ne iz krivnje. Ne zbog povrata. Nego zato što novac treba služiti i drugima.",
          "Manji i češći darovi često su bolji od velikih i rijetkih. Lakše ih je održati, manje stvaraju pritisak i više nalikuju praksi. Cilj nije dokazati veličinu dara. Cilj je vježbati velikodušnost bez novog duga, bez skrivenih očekivanja i bez narušavanja proračuna.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
  {
    slug: "darivanje-bez-duga",
    title: "Darivanje bez duga",
    metaDescription:
      "Vodič o tome zašto darivanje u Praktičnom Bitcoin standardu dolazi nakon osobnog proračuna i izlaska iz duga.",
    excerpt:
      "Darivanje ne smije dolaziti iz pritiska, krivnje ili duga. U Praktičnom Bitcoin standardu ono dolazi iz reda i slobode.",
    category: "Darivanje",
    order: 55,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Koji dug prvo mora izaći iz vašeg života da biste mogli darivati bez unutarnjeg otpora?",
    relatedSlugs: [
      "darivanje-u-proracunu",
      "dug-je-buduci-novac",
      "svaki-euro-ima-namjenu",
    ],
    sections: [
      {
        heading: "Dug i darivanje ne stvaraju isti duh",
        body: [
          "Dug vuče prema pritisku. Traži ratu, rok i budući odljev. Čak i kada ga ne vidite svaki dan, on stoji u pozadini i čeka svoj novac. Zato osoba s dugom često ne odlučuje potpuno slobodno. Dio budućnosti već je obećan.",
          "Darivanje treba dolaziti iz drukčijeg mjesta. Iz slobode, reda i želje da novac služi i drugim ljudima. Ako osoba daruje dok je dug neuređen, darivanje lako postaje izvor otpora. Umjesto velikodušnosti pojavi se krivnja, a umjesto mira novi pritisak.",
        ],
      },
      {
        heading: "Darivanje ne smije usporiti izlazak iz duga",
        body: [
          "Praktični Bitcoin standard ne traži da osoba zanemari dug. Dug je fiat ponašanje i budući novac koji je već potrošen. Zato se ne smije tretirati kao usputna stavka. Dug treba vidjeti, imenovati i postupno ukloniti.",
          "Darivanje ne smije biti razlog da dug ostane dulje nego što treba. Ako darivanje usporava izlazak iz duga, temelj još nije spreman. To nije osuda. To je redoslijed. Prvo smanjiti buduće odljeve. Prvo vratiti slobodu odlučivanja.",
        ],
      },
      {
        heading: "Prvo sloboda, zatim velikodušnost",
        body: [
          "Kada osobni proračun ima red i dug ima plan izlaska, darivanje dobiva zdravo mjesto. Tada više ne dolazi iz pritiska. Ne služi popravljanju osjećaja. Ne služi dokazivanju pred drugima. Postaje praksa.",
          "Ta praksa mijenja odnos prema novcu. Novac više nije samo štit od straha. Postaje sredstvo kojim možete vidjeti druge ljude i njihove potrebe. To je važan dio osobnog Bitcoin standarda: bolji novac treba služiti boljem životu, a ne samo većem stanju na računu.",
        ],
      },
      {
        heading: "Kako pripremiti kategoriju darivanja",
        body: [
          "Kategoriju darivanja možete pripremiti i prije nego što je provodite u punom obliku. Možete zapisati kada počinje, iz kojeg dijela proračuna dolazi i što se nikada ne smije dogoditi. To pravilo štiti i vas i primatelja.",
          "Primjer je jednostavan: darivanje počinje kada su osnovni odljevi pokriveni, dug ima jasan plan izlaska i novac za darivanje ne dolazi iz novog duga. Dar je dar samo ako ne traži povrat i ne stvara skrivenu obvezu.",
        ],
      },
      {
        heading: "Prvi mali dar",
        body: [
          "Kada se temelj uredi, početak može biti malen. To je dobro. Velikodušnost se ne mora dokazivati veličinom. Često je bolje darivati manje i češće nego rijetko napraviti veliki potez koji optereti proračun.",
          "Prvi mali dar uči vas primijetiti osobu, potrebu i trenutak. Uči vas dati bez unutarnjeg računa. Uči vas da novac ima ljudsku stranu. To je vježba, a ne predstava.",
        ],
      },
      {
        heading: "Praktično pravilo",
        body: [
          "Zapišite pravilo: darivanje ne smije stvarati novi dug, ne smije usporiti izlazak iz starog duga i ne smije očekivati povrat. Ako to pravilo nije zadovoljeno, darivanje čeka.",
          "To možda zvuči strogo, ali čuva velikodušnost. Darivanje koje počiva na dugu lako postane gorčina. Darivanje koje počiva na redu može trajati. Prvo sloboda. Zatim velikodušnost. Tek tada darivanje postaje dio osobnog Bitcoin standarda.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
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
      "novac-kapital-potrosnja",
      "bitcoin-u-neto-imovini",
    ],
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
          "Zato osobni Bitcoin standard povezuje Bitcoin s proračunom. Pita koliko mjeseci troškova pokriva, koje buduće odljeve može izdržati i što se mijenja kada kupovna moć raste ili pada. Novac se razumije kroz život, ne samo kroz saldo.",
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
        heading: "Kada Bitcoin postaje dio proračuna",
        body: [
          "Bitcoin postaje dio proračuna kada dobije namjenu. Koji dio ne dirate? Koji dio promatrate kao novčanu zalihu? Koji dio smije služiti budućem odljevu? Koji uvjet mora postojati da biste ga potrošili?",
          "Bez tih pravila, Bitcoin stoji sa strane. Može biti važan, ali nije povezan s ostatkom života. Kada pravila postoje, Bitcoin ulazi u osobni sustav. Tada nije samo imovina koju gledate. Tada je novac s ulogom.",
        ],
      },
      {
        heading: "Pravilo za vlastiti sustav",
        body: [
          "Prvo pravilo može glasiti: Bitcoin promatram kao novac, a ne kao kratkoročnu okladu. Zato ga povezujem s proračunom, dugom, budućim odljevima, sigurnošću i obitelji.",
          "To pravilo ne govori koliko Bitcoina trebate imati. Govori što Bitcoin jest u vašem sustavu. A bez toga ni veća količina ne stvara osobni Bitcoin standard.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
  {
    slug: "pozitivni-neto-priljev",
    title: "Pozitivan neto priljev: temelj Bitcoin standarda",
    metaDescription:
      "Vodič o tome zašto Praktični Bitcoin standard traži pozitivan neto priljev: veće priljeve od odljeva i rast novčane zalihe u Bitcoinu.",
    excerpt:
      "Bitcoin standard ne počinje većim rizikom. Počinje time da vaši priljevi redovito budu veći od odljeva.",
    category: "Bitcoin kao novac",
    order: 70,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Je li vaš prosječni mjesečni neto priljev pozitivan bez oslanjanja na rast cijene Bitcoina?",
    relatedSlugs: [
      "svaki-euro-ima-namjenu",
      "bitcoin-kao-novac",
      "uskladivanje-kupovne-moci-bitcoina",
    ],
    sections: [
      {
        heading: "Priljevi i odljevi",
        body: [
          "Priljevi su novac koji ulazi. Odljevi su novac koji izlazi. Neto priljev je razlika. Ako redovito ulazi više nego što izlazi, sustav diše. Ako redovito izlazi više nego što ulazi, sustav se oslanja na dug, prodaju imovine ili nadu.",
          "Praktični Bitcoin standard traži pozitivan neto priljev zato što Bitcoin kao novac treba miran temelj. Ako proračun stalno curi, Bitcoin postaje prva stvar koju morate dirati kada se pojavi pritisak.",
        ],
      },
      {
        heading: "Zašto negativan neto priljev nije standard",
        body: [
          "Negativan neto priljev znači da se sustav troši. Možda to nije odmah vidljivo. Možda ga skriva dug, štednja ili rast cijene Bitcoina. Ali ako odljevi stalno pobjeđuju priljeve, osobni Bitcoin standard nije stabilan.",
          "To nije moralna osuda. To je tehnička stvarnost osobnog novca. Ne možete dugoročno živjeti kao da budući novac uvijek može spasiti sadašnji nered. Dugoročni standard traži da sadašnji mjesec nosi sam sebe.",
        ],
      },
      {
        heading: "Pet načina za povećanje neto priljeva",
        body: [
          "Prvi način je smanjiti odljeve. Drugi je povećati priljeve. Treći je ukloniti dug. Četvrti je smanjiti potrošnju koja ne stvara vrijednost. Peti je usmjeriti vrijeme, znanje i proizvodnu imovinu prema većoj sposobnosti stvaranja vrijednosti.",
          "Nijedan od tih koraka nije spektakularan. Ali svi jačaju Bitcoin standard. Veći neto priljev znači da Bitcoin ne mora služiti kao hitna zakrpa. Može služiti kao novac koji čuva kupovnu moć kroz vrijeme.",
        ],
      },
      {
        heading: "Kako Bitcoin mijenja novčanu zalihu",
        body: [
          "Kada postoji pozitivan neto priljev, dio viška može postati novčana zaliha u Bitcoinu. To ne znači da sav višak mora ići u Bitcoin. Znači da Bitcoin može dobiti jasnu ulogu novca u sustavu.",
          "Ako novčana zaliha raste samo zato što cijena raste, sustav može biti krhak. Ako raste zato što su priljevi veći od odljeva i zato što svaki euro ima namjenu, temelj je jači. Tada rast nije samo tržišni događaj, nego posljedica reda.",
        ],
      },
      {
        heading: "Prvo pravilo koje treba zapisati",
        body: [
          "Prvo pravilo može glasiti: ne povećavam Bitcoin odluke ako prosječni neto priljev nije pozitivan bez oslanjanja na rast cijene. Prvo popravljam priljeve, odljeve i dug.",
          "To pravilo možda zvuči jednostavno. Upravo zato je korisno. Bitcoin standard ne počinje većim rizikom. Počinje mjesecom koji može stajati na vlastitim nogama.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
  {
    slug: "uskladivanje-kupovne-moci-bitcoina",
    title: "Usklađivanje kupovne moći: što raditi kad Bitcoin raste ili pada?",
    metaDescription:
      "Vodič o tome kako uskladiti osobni proračun s promjenama kupovne moći Bitcoina, bez pogađanja cijene i impulzivnih odluka.",
    excerpt:
      "Kada se kupovna moć Bitcoina mijenja, ne pogađate tržište. Usklađujete osobni proračun.",
    category: "Bitcoin kao novac",
    order: 75,
    publishedAt: "2026-04-30",
    updatedAt: "2026-05-01",
    practicalQuestion:
      "Kada bi se kupovna moć vašeg Bitcoina snažno promijenila, biste li znali koje kategorije proračuna treba provjeriti?",
    relatedSlugs: [
      "bitcoin-kao-novac",
      "pozitivni-neto-priljev",
      "bitcoin-u-neto-imovini",
    ],
    sections: [
      {
        heading: "Cijena nije naredba",
        body: [
          "Kada Bitcoin raste, lako se pojavi osjećaj da morate nešto napraviti. Kada pada, isti osjećaj dolazi iz straha. U oba slučaja cijena se ponaša kao naredba. Praktični Bitcoin standard odbija taj redoslijed.",
          "Cijena može biti povod za provjeru, ali ne smije biti gospodar odluke. Prvo gledate osobni proračun, dug, buduće odljeve, novčanu zalihu i pravila. Tek nakon toga odlučujete mijenja li se išta.",
        ],
      },
      {
        heading: "Kupovna moć je stvarni podatak",
        body: [
          "Ne zanima vas samo koliko Bitcoin vrijedi u eurima. Zanima vas što njegova kupovna moć može pokriti. Koliko mjeseci odljeva? Koje buduće troškove? Koji dio sigurnosne zalihe? Koji dio neto imovine?",
          "Kada gledate kupovnu moć, broj postaje povezan sa životom. Rast i pad više nisu samo vijesti. Postaju promjene koje možete usporediti s proračunom. To smanjuje paniku i smanjuje pohlepu.",
        ],
      },
      {
        heading: "Kada kupovna moć pada",
        body: [
          "Kada kupovna moć pada, prvo se gledaju odljevi. Koji troškovi stvaraju pritisak? Postoji li dug? Je li sigurnosna zaliha dovoljna? Koji budući odljev dolazi brzo?",
          "Pad ne znači automatski prodaju. Možda ne treba napraviti ništa. Ali ako proračun ne može izdržati pad, problem nije samo cijena. Problem je sustav koji nema dovoljno prostora.",
        ],
      },
      {
        heading: "Kada kupovna moć raste",
        body: [
          "Rast kupovne moći može biti jednako opasan kao pad. Može stvoriti osjećaj da je sve dopušteno: veća potrošnja, slabiji oprez, novi dug ili odluke bez pravila.",
          "U osobnom Bitcoin standardu rast dobiva namjenu. Možda se bolje pokrivaju budući odljevi. Možda se jača novčana zaliha. Možda se preispituje neto imovina. Ali rast ne smije automatski postati nered.",
        ],
      },
      {
        heading: "Pravilo za provjeru",
        body: [
          "Dobro pravilo može glasiti: kada se kupovna moć Bitcoina znatno promijeni, prvo pregledavam proračun, dug, buduće odljeve i novčanu zalihu. Ne kupujem ni ne prodajem samo zato što me cijena pomaknula.",
          "Takvo pravilo vraća odluku vama. Bitcoin ostaje novac u sustavu, a ne izvor stalne hitnosti. Usklađivanje kupovne moći nije pogađanje. To je održavanje reda.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
  {
    slug: "novac-kapital-potrosnja",
    title: "Novac, potrošnja i proizvodna imovina",
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
      "Koji dio vaše neto imovine je novac, koji dio potrošnja, a koji dio proizvodna imovina?",
    relatedSlugs: [
      "bitcoin-kao-novac",
      "bitcoin-u-neto-imovini",
      "uskladivanje-kupovne-moci-bitcoina",
    ],
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
          "Kada Bitcoin dobije ulogu novca, pitanja postaju jasnija. Koji dio čuvate? Koji dio može služiti budućem odljevu? Kada se kupovna moć preispituje? Kako se pravila objašnjavaju obitelji?",
        ],
      },
      {
        heading: "Potrošna dobra",
        body: [
          "Potrošna dobra nisu loša. Dom, auto, oprema i stvari koje koristite mogu biti važni. Ali potrošna dobra često vežu novac i stvaraju buduće odljeve. Ne stvaraju nužno slobodu.",
          "Zato ih treba gledati trijezno. Ne samo koliko vrijede danas, nego koliko traže sutra. Održavanje, porez, vrijeme, osiguranje i zamjena dijelovi su stvarne cijene. Ako se to ne vidi, potrošnja lako izgleda kao imovina koja ne traži ništa.",
        ],
      },
      {
        heading: "Proizvodna imovina",
        body: [
          "Proizvodna imovina su kapitalna dobra koja povećavaju produktivnost. To može biti posao, alat, znanje, oprema, sustav, zemljište ili odnos koji stvara vrijednost. Ona ima drugu ulogu od novca i potrošnih dobara.",
          "Bitcoin ne zamjenjuje potrebu za proizvodnom imovinom. Možete imati dobar novac, a i dalje trebate sposobnost stvaranja vrijednosti. Osobni Bitcoin standard zato ne pita samo koliko Bitcoina imate, nego i kako stvarate priljeve.",
        ],
      },
      {
        heading: "Zašto miješanje pojmova stvara loše odluke",
        body: [
          "Ako novac, potrošnju i proizvodnu imovinu stavite u isti koš, gubite jasnoću. Tada možete prodati novac za potrošnju koja će stvarati trošak. Ili zanemariti proizvodnu imovinu koja bi povećala priljeve. Ili misliti da Bitcoin treba raditi ono što radi posao.",
          "Dobro pravilo počinje podjelom: što je novac, što je potrošnja, a što proizvodna imovina? Kada je to jasno, neto imovina prestaje biti zbroj stvari. Postaje sustav s pravilima.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
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
          "Neto imovina daje širu sliku. Ona pokazuje što posjedujete i što dugujete. Tek tada se može razumno pitati koju ulogu Bitcoin ima. Je li novac? Je li novčana zaliha? Je li dio budućeg plana? Ili samo stoji sa strane bez pravila?",
        ],
      },
      {
        heading: "Uloga dolazi prije postotka",
        body: [
          "Ljudi često žele znati koliki postotak neto imovine treba biti u Bitcoinu. Ali postotak bez uloge nije plan. Osoba bez duga, s jasnim priljevima i stabilnom zalihom nije u istoj situaciji kao osoba s kratkim rokovima i velikim dugom.",
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
          "Dug smanjuje neto imovinu i povećava buduće odljeve. Zato osoba s istim iznosom Bitcoina može imati potpuno drukčiji položaj ako ima velik dug. Dug može prisiliti na prodaju upravo onda kada Bitcoin želite držati.",
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
    sections: [
      {
        heading: "Zašto ravnoteža uopće treba pravilo",
        body: [
          "Bez pravila, neto imovina lako postane zbroj stvari. Malo novca, malo potrošnje, malo dugova, malo Bitcoina, malo posla. Sve izgleda poznato, ali nije jasno ima li ravnoteže.",
          "Pravilo trećina u okviru Praktičnog Bitcoin standarda nije univerzalna naredba. Ono je ogledalo. Pomaže vidjeti je li previše neto imovine vezano u potrošnji, premalo u novcu ili nedovoljno u proizvodnoj imovini.",
        ],
      },
      {
        heading: "Najmanje trećina u novcu",
        body: [
          "Novac je dobro koje držite radi buduće razmjene. U ovom okviru Bitcoin ima ulogu novca. Najmanje trećina u novcu znači da sustav treba dovoljno kupovne moći koja nije vezana u potrošnim dobrima ili proizvodnoj imovini.",
          "To ne znači da svaka osoba mora odmah imati isti udio. Znači da se treba pitati imate li dovoljno novca za buduće odluke. Ako je novca premalo, svaka promjena života može vas prisiliti na loš potez.",
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
          "Proizvodna imovina su kapitalna dobra koja povećavaju produktivnost ili stvaraju vrijednost. To može biti posao, alat, znanje, oprema ili sustav koji povećava priljeve. Ona je važna jer novac sam po sebi ne stvara rad.",
          "Ali i proizvodna imovina može biti preteška ako traži previše vremena, duga ili rizika. Zato pravilo trećina ne kaže da proizvodne imovine mora biti što više. Kaže da treba imati jasnu svrhu i granicu.",
        ],
      },
      {
        heading: "Kada pravilo treba preispitati",
        body: [
          "Pravilo treba preispitati kada se promijeni život: novi dug, prodaja imovine, veća kupnja, promjena prihoda, rast ili pad kupovne moći Bitcoina, nova obiteljska odgovornost ili promjena sigurnosnog modela.",
          "Preispitivanje ne znači da morate nešto kupiti ili prodati. Možda je zaključak da ne dirate ništa. Ali tada znate zašto. To je razlika između imovine koja se samo dogodila i osobnog Bitcoin standarda.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
  {
    slug: "obiteljski-pristup-bitcoinu",
    title: "Kako obitelj može pristupiti Bitcoinu ako vam se nešto dogodi?",
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
          "Informacija može glasiti da Bitcoin postoji i da postoje upute. Pristup znači sposobnost pomicanja sredstava. Te dvije stvari ne smiju se miješati.",
          "Dobar obiteljski pristup daje dovoljno informacija da osoba ne bude izgubljena, ali ne izlaže osjetljive podatke bez potrebe. To je ravnoteža između kontinuiteta i sigurnosti.",
        ],
      },
      {
        heading: "Početne riječi se ne dijele",
        body: [
          "Početne riječi, privatni ključevi i lozinke ne dijele se olako. Ako se pošalju porukom, fotografiraju ili upišu na pogrešno mjesto, šteta može biti trajna.",
          "Obitelj treba znati da nitko ozbiljan neće tražiti početne riječi u poruci, pozivu ili mrežnom obrascu. To pravilo mora biti kratko, jasno i zapisano.",
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
    ],
    finalCta: PRIMARY_CTA,
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
    sections: [
      {
        heading: "Kontrola ostaje kod vas",
        body: [
          "Sigurnost u osobnom Bitcoin standardu počinje od jednostavne granice: kontrola ostaje kod vas. Nitko ne treba početne riječi, privatne ključeve, lozinke ili pristup računu da bi s vama razgovarao o sustavu.",
          "Ali kontrola ne znači izolaciju. Ako nitko ne zna što postoji, gdje su opće upute i što nikada ne smije napraviti, sustav ovisi samo o vama. To nije dovoljno za ozbiljnu neto imovinu.",
        ],
      },
      {
        heading: "Jedna osoba nije sustav",
        body: [
          "Ako sve znate samo vi, tada vaša nedostupnost postaje jedna točka kvara. Bolest, nesreća, smrt ili obična pogreška mogu ostaviti obitelj bez smjera.",
          "Dobar sustav ne predaje kontrolu drugima, ali uklanja potpunu ovisnost o jednoj osobi. Postoje upute, osobe od povjerenja i jasna pravila opreza. To je praktična nadogradnja Bitcoin standarda.",
        ],
      },
      {
        heading: "Informacija nije isto što i pristup",
        body: [
          "Osoba od povjerenja može imati informaciju bez pristupa. Može znati da Bitcoin postoji, gdje su opće upute i koga smije kontaktirati, ali ne mora imati mogućnost pomicanja sredstava.",
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
          "Nitko ne smije tražiti početne riječi, privatne ključeve, lozinke, pristup burzi, pristup novčaniku ili slanje Bitcoina na svoju adresu radi čuvanja. Ta pravila trebaju biti kratka i razumljiva.",
          "Ako osoba od povjerenja zapamti samo jedno, neka zapamti ovo: prvo stati, ne žuriti, ne slati osjetljive podatke i ne vjerovati nikome tko traži kontrolu. Sigurnost počinje jasnim ne.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
]

export const guides = [...guideEntries].sort((first, second) => {
  if (first.order !== second.order) {
    return first.order - second.order
  }

  return first.title.localeCompare(second.title, "hr")
})

export const recommendedGuideSlugs = [
  "svaki-euro-ima-namjenu",
  "dug-je-buduci-novac",
  "darivanje-u-proracunu",
  "bitcoin-kao-novac",
  "uskladivanje-kupovne-moci-bitcoina",
  "pravilo-trecina",
  "sigurnost-ne-smije-ovisiti-samo-o-vama",
]

export const featuredGuides = guides.filter((guide) => guide.featured)

export function guideHref(slug: string) {
  return `/vodici/${slug}/`
}

export const guideRoutes = guides.map((guide) => guideHref(guide.slug))

export function findGuide(slug: string | undefined) {
  return guides.find((guide) => guide.slug === slug)
}

export function guidesByCategory(category: GuideCategory) {
  return guides.filter((guide) => guide.category === category)
}
