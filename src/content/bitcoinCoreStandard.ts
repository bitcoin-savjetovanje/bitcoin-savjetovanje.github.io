import type { Guide } from "./guides"
import { PRIMARY_CTA } from "./site"

const bitcoinCoreStandardSafetyNote =
  "Ovaj vodič opisuje sigurnosnu arhitekturu, a ne gotovu konfiguraciju za kopiranje. Složeniji sustav nije automatski sigurniji: prije značajnog iznosa cijeli postupak treba provjeriti na signetu, testnetu ili s beznačajnim iznosom. Savjetovanje nikada ne traži privatni ključ, Bitcoin Core wallet backup datoteku, wallet passphrase, početne riječi ni pristup uređaju."

export const bitcoinCoreStandardGuide: Guide = {
  slug: "bitcoin-core-standard",
  previousSlugs: [
    "obiteljski-bitcoin-trezor",
    "bitkey-bitcoin-sigurnost",
    "vremenski-oporavak-bitcoin-trezor",
  ],
  title: "Bitcoin Core Standard za dugoročnu štednju",
  eyebrow: "DUGOROČNA SIGURNOST I OBITELJSKI TREZOR",
  seoTitle: "Bitcoin Core Standard za dugoročnu štednju",
  ogTitle: "Bitcoin Core Standard za dugoročnu štednju",
  ogDescription:
    "Kako odvojiti offline potpisivanje, watch-only praćenje, vlastiti node, PSBT i oporavak za dugoročnu Bitcoin štednju.",
  metaDescription:
    "Kako koristiti Bitcoin Core, offline Linux potpisnike, watch-only wallet, PSBT i provjerene sigurnosne kopije za dugoročnu Bitcoin štednju i obiteljski trezor.",
  excerpt:
    "Kako odvojiti generiranje ključeva, praćenje stanja, potpisivanje, emitiranje i oporavak bez oslanjanja na specijalizirani hardverski novčanik.",
  category: "Sigurnost i obitelj",
  difficulty: "Napredno",
  freshness: "stabilno",
  theme: "security",
  safetyNote: bitcoinCoreStandardSafetyNote,
  securityReviewDate: "4. kolovoza 2026.",
  order: 101,
  readingMinutes: 17,
  featured: true,
  publishedAt: "2026-08-04",
  updatedAt: "2026-08-04",
  practicalQuestion:
    "Možete li objasniti gdje nastaju privatni ključevi, što se sigurnosno kopira i kako se sustav obnavlja kada jedan dio zakaže?",
  relatedSlugs: [
    "samostalna-pohrana-ili-skrbnik",
    "sigurnost-ne-smije-ovisiti-samo-o-vama",
    "obiteljski-pristup-bitcoinu",
  ],
  cover: {
    webpSrc: "/images/skrbnistvo-sigurnost-hero.webp",
    src: "/images/skrbnistvo-sigurnost-hero.jpg",
    alt: "Mirna mediteranska scena o odvajanju Bitcoin sigurnosti, oporavka i obiteljskih uloga",
    position: "52% 54%",
    caption:
      "Bitcoin Core Standard odvaja potpisivanje, koordinaciju, provjeru mreže i oporavak u jasno dokumentirane uloge.",
  },
  visual: {
    type: "network",
    title: "Pet odvojenih uloga jednog sustava",
    center: "Bitcoin Core Standard",
    nodes: [
      "Offline potpisnik",
      "Watch-only koordinator",
      "Vlastiti Bitcoin Core node",
      "Sigurnosne kopije i oporavak",
      "Dokumentirane obiteljske uloge",
    ],
    caption:
      "Ovo nije proizvod ni popis uređaja. To je arhitektura u kojoj svaki dio ima ograničenu i razumljivu zadaću.",
  },
  summary: {
    title: "Standard u jednoj minuti",
    items: [
      "Privatni ključevi nastaju i ostaju na namjenskom offline Linux potpisniku s provjerenom instalacijom Bitcoin Corea.",
      "Odvojeni online uređaj koristi watch-only wallet, priprema PSBT, prati stanje i emitira završenu transakciju bez privatnih ključeva.",
      "Za glavni koordinator i budući oporavak prednost ima vlastiti potpuno sinkronizirani archival full node.",
      "Primarni korisnički backup nije BIP39 popis riječi, nego provjerena Bitcoin Core wallet backup datoteka uz odvojeno čuvanu wallet passphrase.",
      "Prije značajnog iznosa moraju biti dokazani normalni rad, kvar uređaja i potpuna obnova na odvojenom sustavu.",
    ],
  },
  intro: [
    "Nedavni incident s generiranjem entropije na specijaliziranom potpisnom uređaju bio je povod da ponovno procijenim vanjske ovisnosti, firmware, zatvorene sigurnosne elemente i postupke nastanka privatnih ključeva. Nije jedini argument i nije dokaz da su svi hardverski novčanici nesigurni.",
    "Nakon te procjene, za dugoročnu štednju, glavni osobni saldo i obiteljski trezor odlučio sam preporučivati Bitcoin Core Standard. Cilj nije tvrditi da su svi drugi alati loši niti da je Bitcoin Core nepogrešiv. Cilj je smanjiti broj komponenti kojima korisnik mora vjerovati te osloniti se na sustav koji se može jasnije pregledati, dokumentirati, sigurnosno kopirati i oporaviti.",
    "Opći laptop i Linux također imaju supply-chain, hardverske i softverske rizike. Ovaj pristup ih ne uklanja. Smanjuje ovisnost o specijaliziranom potpisnom uređaju, njegovu firmwareu, zatvorenim elementima i postupku generiranja ključeva koji korisnik teško može procijeniti.",
  ],
  sections: [
    {
      heading: "Zašto se preporuka mijenja",
      body: [
        "Kod dugoročne štednje najvažnije nije pronaći uređaj s najboljim marketingom, nego razumjeti gdje nastaje tajna, što mora ostati offline, tko provjerava mrežu i iz čega se sustav može obnoviti nakon više godina.",
        "Bitcoin Core Standard zato daje prednost minimiziranju povjerenja, manjem broju specijaliziranih vanjskih komponenti i dugoročnoj provjerljivosti. Uloge se odvajaju tako da kvar ili kompromitacija jednog dijela ne moraju automatski dati napadaču kontrolu niti vlasniku oduzeti mogućnost oporavka.",
        "Promjena preporuke nije optužnica protiv ljudi koji koriste drukčije alate. To je urednička i savjetodavna odluka za vrlo određenu namjenu: dugoročnu štednju, cold storage, glavni osobni sustav i obiteljski trezor.",
      ],
      calloutTitle: "Precizna granica preporuke",
      callout:
        "Mali iznosi za svakodnevnu uporabu imaju drukčiji model rizika i bit će obrađeni zasebno. Ovaj vodič ne preporučuje operativni novčanik za plaćanja.",
    },
    {
      heading: "Što je Bitcoin Core Standard",
      body: [
        "Bitcoin Core Standard nije uređaj, marka ni gotov paket. To je raspored odgovornosti između nekoliko dijelova koji se mogu neovisno razumjeti i provjeriti.",
        "Offline potpisnik čuva privatni ključ. Online watch-only koordinator vidi javne podatke walleta i priprema transakcije. Vlastiti Bitcoin Core node provjerava pravila mreže i blockchain. Sigurnosne kopije omogućuju obnovu, a obiteljske upute određuju tko zna prvi korak bez okupljanja svih tajni na jednom mjestu.",
      ],
      cards: [
        {
          title: "1. Offline potpisnik",
          text: "Namjenski Linux uređaj s Bitcoin Core walletom i privatnim ključem, bez izravne internetske veze tijekom generiranja ključeva i potpisivanja.",
        },
        {
          title: "2. Watch-only koordinator",
          text: "Odvojeni online wallet koji prati adrese i stanje te priprema, prima i finalizira PSBT bez privatnih ključeva.",
        },
        {
          title: "3. Vlastiti node",
          text: "Potpuno validirajući Bitcoin Core node koji ne prepušta provjeru salda i transakcija tuđem poslužitelju.",
        },
        {
          title: "4. Backup i oporavak",
          text: "Više provjerenih wallet backup datoteka, odvojeno čuvana wallet passphrase i uvježbana obnova.",
        },
        {
          title: "5. Obiteljske uloge",
          text: "Jasna uputa tko zna da sustav postoji, tko zna prvi korak i tko nikada ne smije dobiti sve dijelove bez razloga.",
        },
      ],
    },
    {
      heading: "Offline Linux laptop",
      body: [
        "Potpisnik je namjenski laptop s čistom instalacijom Linuxa i provjerenom instalacijom Bitcoin Corea. Tijekom generiranja ključeva i potpisivanja nema izravnu vezu s internetom. Njegova zadaća nije pregled weba, e-pošta ni svakodnevni rad.",
        "Blockchain na offline potpisniku ne mora biti sinkroniziran. Potpisniku je potreban vlastiti wallet i dovoljno podataka o transakciji da može provjeriti i potpisati ono za što ima ključ. Praćenje blockchaina pripada online koordinatoru i nodeu.",
        "Stariji laptop može biti dovoljan jer potpisivanje nije računalno zahtjevno. Ipak, disk, radna memorija, tipkovnica, zaslon, baterija, napajanje i mogućnost pouzdanog pokretanja moraju se provjeriti. Jeftin ne znači neprovjeren, nestabilan ili pred kvarom.",
        "Instalacijski medij i Bitcoin Core paket trebaju doći iz službenog izvora, uz provjeru potpisa i integriteta prema aktualnim službenim uputama. Taj korak treba dokumentirati, ali ovaj vodič namjerno ne objavljuje slijed klikova za stvarni wallet.",
      ],
      items: [
        "jedna jasna namjena uređaja",
        "offline rad tijekom osjetljivih operacija",
        "provjerena instalacija Linuxa i Bitcoin Corea",
        "provjereno stanje hardvera i napajanja",
        "bez privatnih ključeva na online koordinatoru",
      ],
    },
    {
      heading: "Online koordinator i vlastiti node",
      body: [
        "Online koordinator ne mora imati privatne ključeve. Njegov watch-only wallet prati adrese, transakcije i stanje, priprema nepotpisanu transakciju u PSBT formatu, prima potpise te nakon provjere finalizira i emitira transakciju.",
        "Koordinator treba koristiti vlastiti sinkronizirani Bitcoin Core node. Za glavni sustav i budući oporavak prednost dajem archival full nodeu, odnosno nodeu koji čuva sve validirane blokove. To pojednostavnjuje ponovno skeniranje povijesti walleta kada se obnavlja stara sigurnosna kopija.",
        "Pruned node također potpuno validira blockchain. Razlika je u tome što nakon validacije briše stare blokove kako bi smanjio potreban prostor. Ako potrebni blokovi više nisu lokalno dostupni, Bitcoin Core odbija rescan ispod pruneheighta. Tada su potrebni ponovno preuzimanje odnosno reindex na nodeu koji čuva povijesne blokove ili wallet backup koji već sadrži relevantnu evidentiranu povijest.",
      ],
      table: {
        columns: ["Uloga", "Što smije imati", "Što ne treba imati"],
        rows: [
          [
            "Offline potpisnik",
            "privatni ključ i vlastiti wallet",
            "internetsku vezu tijekom generiranja i potpisivanja",
          ],
          [
            "Online koordinator",
            "watch-only konfiguraciju i podatke za PSBT",
            "privatni ključ potreban za trošenje",
          ],
          [
            "Archival full node",
            "sve validirane blokove i mrežnu provjeru",
            "privatni ključ walleta samo zato što provjerava mrežu",
          ],
        ],
      },
    },
    {
      heading: "Jedan potpis i 2-od-3 multisig",
      body: [
        "Bitcoin Core Standard može se primijeniti s jednim potpisom ili kao 2-od-3 multisig. Multisig nije obvezan i nije automatski sigurniji. Dodatni ključevi, uređaji, backupi i uloge stvaraju više mjesta na kojima se može pogriješiti.",
      ],
      subsections: [
        {
          heading: "Model 1 — jedan potpis",
          body: [
            "Jedan offline Bitcoin Core potpisnik čuva privatni ključ, a jedan online watch-only koordinator prati wallet i priprema PSBT. Više backup datoteka enkriptiranog walleta čuva se na odvojenim lokacijama, dok se wallet passphrase čuva zasebno.",
            "Ovaj model ima jednostavniji put oporavka i manje operativnih dijelova, ali zadržava jednu kriptografsku točku kontrole. Zato kvaliteta backupa, odvajanje passphrasea i testirana obnova nose veliku težinu.",
          ],
          items: [
            "jedan offline Bitcoin Core potpisnik",
            "jedan online watch-only koordinator",
            "više provjerenih wallet backup kopija",
            "odvojeno čuvana wallet passphrase",
            "jednostavniji oporavak i jedna kriptografska točka kontrole",
          ],
        },
        {
          heading: "Model 2 — 2-od-3 multisig",
          body: [
            "Tri neovisna offline uređaja imaju po jedan signer wallet s vlastitim HD privatnim materijalom. Za provjeru transakcije i rekonstrukciju politike svaki sudionik održava i odgovarajući watch-only multisig wallet s cijelom javnom politikom. Online koordinator ima dodatnu watch-only kopiju iste politike, prati stanje i koordinira PSBT.",
            "Za slanje su dovoljna bilo koja dva potpisa. Gubitak jednog signera zato ne mora blokirati pristup, a jedan kompromitirani ključ sam nije dovoljan za trošenje. Cijena je veća operativna složenost: treba sačuvati ne samo pojedinačne wallete nego i javnu politiku, uloge, dokumentaciju i dokazan put rekonstrukcije.",
          ],
          items: [
            "tri odvojena offline Bitcoin Core potpisnika",
            "signer wallet svakog sudionika sadrži samo njegov vlastiti privatni ključni materijal",
            "zaseban backup signer walleta i odgovarajućeg watch-only multisig walleta svakog sudionika",
            "online watch-only koordinator s dodatnom kopijom javne multisig politike",
            "bilo koja dva potpisa dovoljna su za slanje",
          ],
          calloutTitle: "Složenost mora imati razlog",
          callout:
            "Ako osoba ili obitelj ne mogu objasniti prag potpisa, obnovu svakog walleta i rekonstrukciju javne politike, jednostavniji model može biti sigurniji.",
        },
      ],
    },
    {
      heading: "Kako Bitcoin Core generira ključeve",
      body: [
        "Bitcoin Core za kriptografski osjetljive operacije koristi vlastiti generator jakih slučajnih vrijednosti. Kod stvaranja privatnog ključa koristi se strong-random put, a stanje generatora miješa entropiju iz više izvora, uključujući operacijski sustav i dodatne podatke koje program prikuplja tijekom rada.",
        "To nije model u kojem kvaliteta privatnog ključa ovisi samo o jednom čipu, jednom pozivu ili jednom izvoru entropije. Ipak, iz toga ne slijedi da je entropija garantirano savršena ili da kompromitiran operacijski sustav i hardver postaju nevažni.",
        "U ovom workflowu korisnik ne mora ručno proizvoditi BIP39 riječi. Bitcoin Core može interno koristiti hijerarhijski izvedene ključeve i descriptore, ali korisnički plan oporavka temelji se na wallet backup datoteci, a ne na ručno sastavljenom popisu riječi.",
      ],
      calloutTitle: "Tehnička skromnost",
      callout:
        "Bitcoin Core smanjuje ovisnost o zasebnom specijaliziranom generatoru ključeva. Ne uklanja potrebu za provjerenim operacijskim sustavom, hardverom, instalacijskim paketom i sigurnim postupkom.",
    },
    {
      heading: "Nema korisničkog BIP39 backupa",
      body: [
        "Mnogi drugi Bitcoin walleti korisniku daju 12 ili 24 BIP39 riječi. U ovom Bitcoin Core workflowu korisnik ne dobiva niti ručno zapisuje BIP39 popis riječi kao primarnu sigurnosnu kopiju.",
        "Primarna sigurnosna kopija je Bitcoin Core wallet backup datoteka. Nije ispravno pretpostaviti da se svaki backup mora zvati wallet.dat: pri izradi backupa bira se odredišni naziv datoteke.",
        "Wallet passphrase štiti privatni ključni materijal u enkriptiranom walletu. Ne treba tvrditi da zbog toga svaka informacija u cijeloj wallet bazi postaje nečitljiva. Wallet passphrase također nije BIP39 passphrase i ne može zamijeniti samu backup datoteku.",
        "Backup datoteka bez dostupne wallet passphrase i passphrase bez odgovarajuće backup datoteke nisu dovoljan plan oporavka. Oba dijela moraju biti očuvana, ali ne na istome mjestu i ne na način koji jednoj slučajnoj osobi daje trenutačnu kontrolu.",
      ],
      table: {
        columns: ["Dio", "Uloga u oporavku", "Česta pogreška"],
        rows: [
          [
            "Wallet backup datoteka",
            "sadrži podatke potrebne za obnovu konkretnog Bitcoin Core walleta",
            "pretpostaviti da je dovoljna bilo koja kopija aktivne baze",
          ],
          [
            "Wallet passphrase",
            "štiti privatni ključni materijal enkriptiranog walleta",
            "zamijeniti je za BIP39 passphrase ili za sam backup",
          ],
          [
            "Watch-only konfiguracija",
            "omogućuje praćenje i rekonstrukciju javne politike",
            "tretirati je kao privatni ključ ili jedini backup signera",
          ],
        ],
      },
    },
    {
      heading: "Strategija sigurnosnih kopija",
      body: [
        "Backup se izrađuje Bitcoin Coreovom podržanom wallet funkcijom, a ne nasumičnim kopiranjem aktivne baze podataka dok program radi. Kopija se zatim označava, provjerava i čuva tako da se zna kojem walletu i kojoj ulozi pripada.",
        "Potrebno je više provjerenih kopija u različitim domenama kvara: požar, poplava, krađa, kvar medija i nedostupnost jedne lokacije ne smiju uništiti sve primjerke. Wallet passphrase čuva se odvojeno od wallet backup datoteka.",
        "Cloud može biti samo opcionalna lokacija za snažno enkriptiranu kopiju unutar pažljivo procijenjenog modela prijetnji. Nije zadana preporuka i ne smije postati jedino mjesto čuvanja.",
        "Obnova se testira na zasebnom uređaju i s testnim sredstvima. Nakon encryptwallet postupka, promjene wallet passphrasea, uvoza descriptora, migracije walleta ili druge operacije za koju službena dokumentacija izričito traži novi backup, odmah se izrađuje novi backup i ponovno provjerava plan.",
        "Za moderni deterministički wallet nije potrebno ponavljati zastarjelo pravilo da se novi backup nužno radi nakon svake transakcije. I dalje se radi nakon promjene koja nije obuhvaćena postojećom kopijom ili kada to zahtijeva dokumentirani postupak walleta.",
      ],
      items: [
        "najmanje dvije odvojene i provjerene fizičke kopije",
        "različite lokacije i različite domene kvara",
        "wallet passphrase odvojena od backup datoteka",
        "jasna oznaka kojem signer walletu kopija pripada",
        "zapis datuma izrade i posljednje uspješne obnove",
        "novi backup nakon relevantnih migracija i promjena",
      ],
    },
    {
      heading: "PSBT tijek rada",
      body: [
        "PSBT je standardizirani format kojim se podaci o djelomično pripremljenoj ili potpisanoj Bitcoin transakciji prenose između koordinatora i potpisnika. PSBT nije privatni ključ, ali može sadržavati osjetljive podatke o walletu i transakciji pa prijenosni medij pripada modelu prijetnji.",
        "U ispravno provedenom postupku na nekompromitiranom signer uređaju privatni ključ ne prenosi se s offline potpisnika. Potpisnik ipak ne smije potpisati naslijepo: prije potvrde treba provjeriti primatelja, iznos, naknadu i change izlaz, odnosno povrat vlastitom walletu.",
      ],
      orderedItems: [
        "Online watch-only koordinator pripremi nepotpisanu transakciju i PSBT.",
        "PSBT se kontroliranim prijenosnim medijem prenese na offline potpisnik.",
        "Potpisnik prikaže i potpiše ono što njegov wallet može potpisati.",
        "Kod multisiga PSBT prolazi kroz potreban broj neovisnih potpisnika.",
        "Potpisi se vrate online koordinatoru bez iznošenja privatnih ključeva.",
        "Koordinator provjeri, finalizira i emitira završenu transakciju preko vlastitog nodea.",
      ],
      calloutTitle: "Prvi pokušaj nije s glavnim sredstvima",
      callout:
        "Cijeli krug najprije se izvodi na signetu, testnetu ili s beznačajnim iznosom, uključujući namjerno simuliran kvar i obnovu.",
    },
    {
      heading: "Oporavak i nasljeđivanje",
      body: [
        "Oporavak nije jedna tajna. Plan mora razlikovati privatni ključ, wallet backup datoteku, wallet passphrase, watch-only konfiguraciju, tehničke upute i obiteljsku uputu za prvi korak.",
        "Obitelj ne treba na jednome mjestu dobiti sve potrebno za trenutačno pomicanje sredstava. Treba znati da sustav postoji, što ne smije napraviti, kako sačuvati uređaje i dokumente te kome se javiti prije bilo kakve transakcije.",
        "Tehnički plan mora pokriti kvar jednog laptopa, gubitak jedne kopije, nedostupnu lokaciju, smrt ili bolest glavne osobe, zamjenu uređaja i obnovu na novom potpuno sinkroniziranom nodeu. Jednom godišnje provjeravaju se dokumentacija, osobe, uređaji, lokacije i dokazani put oporavka.",
      ],
      cards: [
        {
          title: "Tajna",
          text: "Privatni ključ ili drugi podatak koji izravno omogućuje potpisivanje. Ne ulazi u opću obiteljsku uputu.",
        },
        {
          title: "Wallet backup datoteka",
          text: "Kopija konkretnog enkriptiranog signer walleta koja sama bez odgovarajuće passphrase nije cijeli operativni plan.",
        },
        {
          title: "Wallet passphrase",
          text: "Čuva se odvojeno i ne miješa s BIP39 passphraseom.",
        },
        {
          title: "Watch-only konfiguracija",
          text: "Javni podaci potrebni za praćenje i, posebno kod multisiga, prepoznavanje politike.",
        },
        {
          title: "Tehničke upute",
          text: "Opisuju uloge, verzije, provjere i slijed oporavka bez objave svih tajni.",
        },
        {
          title: "Obiteljski prvi korak",
          text: "Kratka, neskrivena uputa koja zaustavlja paniku i vodi prema unaprijed provjerenoj pomoći.",
        },
      ],
      link: {
        before: "Za obiteljsku podjelu informacija pročitajte",
        label: "Kako obitelj može pristupiti Bitcoinu ako vam se nešto dogodi?",
        href: "/vodici/obiteljski-pristup-bitcoinu/",
        after: ".",
      },
    },
    {
      heading: "Za koga ovaj model nije",
      body: [
        "Ovo nije početna preporuka za osobu koja još ne zna provjeriti adresu, iznos, naknadu i sigurnosnu kopiju. Nije preporuka za mali dnevni iznos i ne znači da svatko treba multisig.",
        "Složeniji sustav može povećati rizik trajnog gubitka. Osoba koja ne može samostalno ponoviti cijeli postupak s testnim sredstvima još nije spremna prenijeti značajan iznos.",
        "Vodič opisuje arhitekturu i pitanja koja treba dokazati. Ne zamjenjuje osobnu procjenu prijetnji, tehničku provjeru konkretne izvedbe, pravno nasljeđivanje ni profesionalnu procjenu kada su posljedice pogreške velike.",
      ],
      items: [
        "nije operativni wallet za svakodnevna plaćanja",
        "nije obvezni multisig recept",
        "nije zamjena za testiranje oporavka",
        "nije tvrdnja da Bitcoin Core uklanja sve rizike",
        "nije razlog da se značajan iznos premješta bez pripreme",
      ],
    },
    {
      heading: "Službeni izvori za tehničku provjeru",
      body: [
        "Tehničke tvrdnje u ovom vodiču provjerene su prema aktualnoj službenoj Bitcoin Core RPC dokumentaciji i izvornom kodu. Poveznice služe za provjeru koncepata, ne kao poziv da se naredbe kopiraju nad stvarnim sredstvima.",
      ],
      showSecurityReviewDate: true,
      links: [
        {
          label: "Bitcoin Core 31.1 — službena objava",
          href: "https://bitcoincore.org/en/releases/31.1/",
        },
        {
          label: "createwallet — descriptor i watch-only walleti",
          href: "https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/createwallet/",
        },
        {
          label: "backupwallet — podržana izrada wallet backupa",
          href: "https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/backupwallet/",
        },
        {
          label: "restorewallet — obnova walleta iz backupa",
          href: "https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/restorewallet/",
        },
        {
          label: "encryptwallet — zaštita privatnog ključnog materijala",
          href: "https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/encryptwallet/",
        },
        {
          label: "importdescriptors — uvoz i rescan descriptora",
          href: "https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/importdescriptors/",
        },
        {
          label: "walletcreatefundedpsbt — priprema i financiranje PSBT-a",
          href: "https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/walletcreatefundedpsbt/",
        },
        {
          label: "walletprocesspsbt — dopuna i potpisivanje PSBT-a",
          href: "https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/walletprocesspsbt/",
        },
        {
          label: "finalizepsbt — finalizacija bez emitiranja",
          href: "https://bitcoincore.org/en/doc/31.0.0/rpc/rawtransactions/finalizepsbt/",
        },
        {
          label: "rescanblockchain — granice dostupnih blokova",
          href: "https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/rescanblockchain/",
        },
        {
          label: "Managing Wallets — backup i enkripcijski detalji",
          href: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
        },
        {
          label: "PSBT — službeni Bitcoin Core pregled uloga",
          href: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/psbt.md",
        },
        {
          label: "Descriptor multisig — primjer i backup obveze",
          href: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md#basic-multisig-example",
        },
        {
          label: "Stvaranje descriptor wallet ključa — wallet.cpp",
          href: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/wallet.cpp#L3311-L3324",
        },
        {
          label: "Strong-random put privatnog ključa — key.cpp",
          href: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/key.cpp#L157-L163",
        },
        {
          label: "OS slučajnost, događaji i vrijeme — random.cpp",
          href: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/random.cpp#L455-L472",
        },
        {
          label: "Strong-random završni put — random.cpp",
          href: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/random.cpp#L568-L570",
        },
        {
          label: "Pruned rescan ograničenje — transactions.cpp",
          href: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/rpc/transactions.cpp#L885-L889",
        },
      ],
    },
    {
      heading: "Zaključak",
      body: [
        "Bitcoin Core Standard ne pokušava pronaći savršen uređaj. Pokušava jasno odvojiti uloge, smanjiti broj skrivenih ovisnosti i osigurati da vlasnik razumije što kontrolira, što sigurnosno kopira i kako će se sustav oporaviti kada jedan dio zakaže.",
        "Vrijednost standarda nije u tome da izgleda napredno. Vrijednost je u tome da se normalni rad i oporavak mogu objasniti, dokumentirati i dokazati prije nego što posljedice pogreške postanu ozbiljne.",
      ],
    },
  ],
  faq: [
    {
      question:
        "Mora li offline Bitcoin Core potpisnik sinkronizirati blockchain?",
      answer:
        "Ne, pod uvjetom da PSBT i signer wallet sadrže sve podatke potrebne za provjeru i potpisivanje. Sinkronizaciju i praćenje povijesti obavlja odvojeni online koordinator povezan s vlastitim nodeom.",
    },
    {
      question: "Dobiva li korisnik 12 ili 24 riječi?",
      answer:
        "Ne u ovom workflowu. Primarni korisnički backup je Bitcoin Core wallet backup datoteka, uz odvojeno čuvanu wallet passphrase kada je wallet enkriptiran.",
    },
    {
      question: "Je li pruned node nesiguran?",
      answer:
        "Nije. Pruned node potpuno validira blockchain, ali briše stare blokove nakon validacije. To može otežati kasniji rescan stare povijesti walleta ako potrebni blokovi više nisu lokalno dostupni.",
    },
    {
      question: "Je li 2-od-3 multisig uvijek bolji od jednog potpisa?",
      answer:
        "Nije. Može smanjiti posljedice gubitka ili kompromitacije jednog ključa, ali uvodi više uređaja, backupa, javnih podataka i operativnih koraka. Za osobu koja ga ne može pouzdano održavati može biti rizičniji.",
    },
  ],
  disclaimer:
    "Ovaj vodič je edukativan. Ne objavljuje privatne descriptore, stvarne adrese, gotove konfiguracije ni slijed naredbi za wallet sa stvarnim sredstvima. Pravna pitanja nasljeđivanja i vlasništva rješavaju se s odgovarajućim pravnim stručnjakom.",
  finalCta: PRIMARY_CTA,
  finalCtaTitle: "Želite provjeriti razumijete li cijeli put oporavka?",
  finalCtaPrompt:
    "U uvodnom razgovoru možemo razdvojiti vaše uloge, prijetnje i pitanja koja treba dokazati prije značajnog iznosa. Ne šaljete i ne pokazujete privatne ključeve, wallet backup datoteke, wallet passphrase, početne riječi, iznose ni pristup uređajima.",
  finalCtaNote:
    "Savjetovanje ne prima, ne čuva i ne rekonstruira vaše tajne niti ikada preuzima kontrolu nad bitcoinom.",
}

export const selfCustodyOrCustodianGuide: Guide = {
  slug: "samostalna-pohrana-ili-skrbnik",
  title:
    "Samostalna pohrana ili skrbnik: kako razmišljati o Bitcoin sigurnosti",
  seoTitle:
    "Samostalna pohrana ili skrbnik: kako razmišljati o Bitcoin sigurnosti",
  metaDescription:
    "Kako razlikovati samostalnu pohranu, skrbnika i prijelazni model te gdje se Bitcoin Core Standard uklapa u dugoročnu štednju.",
  excerpt:
    "Samostalna pohrana je važan cilj, ali nije automatski najbolji prvi korak za svaku osobu, namjenu i iznos.",
  category: "Sigurnost i obitelj",
  difficulty: "Srednje",
  freshness: "stabilno",
  theme: "security",
  safetyNote: bitcoinCoreStandardSafetyNote,
  order: 102,
  readingMinutes: 8,
  publishedAt: "2026-05-12",
  updatedAt: "2026-08-04",
  practicalQuestion:
    "Koji oblik čuvanja bitcoina odgovara vašoj razini znanja, namjeni sredstava i posljedicama mogućeg gubitka?",
  relatedSlugs: [
    "bitcoin-core-standard",
    "sigurnost-ne-smije-ovisiti-samo-o-vama",
    "obiteljski-pristup-bitcoinu",
  ],
  visual: {
    type: "split",
    title: "Kontrola i ovisnost nisu ista stvar",
    leftLabel: "Samostalna pohrana",
    leftItems: [
      "vlastita kontrola privatnih ključeva",
      "vlastiti plan backupa i oporavka",
      "veća osobna operativna odgovornost",
    ],
    rightLabel: "Skrbnik",
    rightItems: [
      "pružatelj kontrolira tehnički pristup",
      "oporavak računa prema njegovim pravilima",
      "ovisnost o solventnosti, dostupnosti i uvjetima",
    ],
    caption:
      "Pravo pitanje nije koji naziv zvuči sigurnije, nego tko kontrolira ključeve i tko može provesti oporavak.",
  },
  summary: {
    title: "Brza orijentacija",
    items: [
      "Samostalna pohrana daje izravnu kontrolu, ali odgovornost za backup, oporavak i kontinuitet ostaje vlasniku.",
      "Skrbnik smanjuje tehnički teret, ali uvodi račun, pružatelja i njegova pravila kao vanjske ovisnosti.",
      "Za dugoročnu štednju ova stranica preporučuje Bitcoin Core Standard tek kada osoba može testirati cijeli postupak bez značajnog iznosa.",
      "Mali dnevni iznosi imaju drukčiji model rizika i nisu predmet ove preporuke.",
    ],
  },
  sections: [
    {
      heading: "Dvije različite odgovornosti",
      body: [
        "Kod samostalne pohrane vlasnik kontrolira privatne ključeve. Bitcoin nije u laptopu, wallet datoteci ili papiru; ti elementi omogućuju potpisivanje transakcije na Bitcoin mreži.",
        "Kod skrbnika korisnik ima račun i potraživanje prema pružatelju. Pružatelj upravlja tehničkim pristupom, oporavkom računa, pravilima povlačenja i dijelom sigurnosnog postupka.",
        "Nijedan naziv sam po sebi ne rješava rizik. Loše izvedena samostalna pohrana može završiti trajnim gubitkom, a skrbnički model može završiti blokiranim pristupom, promjenom pravila ili gubitkom pružatelja.",
      ],
    },
    {
      heading: "Gdje se uklapa Bitcoin Core Standard",
      body: [
        "Za dugoročnu štednju, glavni osobni saldo i obiteljski trezor preporučujem Bitcoin Core Standard: offline Bitcoin Core potpisnik, online watch-only koordinator, vlastiti node, PSBT te provjerene wallet backup datoteke s odvojeno čuvanom wallet passphrase.",
        "To nije preporuka za svaku osobu ili svaki iznos. Osoba mora razumjeti adresu, naknadu, change izlaz, backup i obnovu. Prije značajnog iznosa mora moći ponoviti cijeli postupak na testnoj mreži ili s beznačajnim iznosom.",
      ],
      link: {
        before: "Cijelu arhitekturu objašnjava vodič",
        label: "Bitcoin Core Standard za dugoročnu štednju",
        href: "/vodici/bitcoin-core-standard/",
        after: ".",
      },
    },
    {
      heading: "Početne riječi nisu univerzalna pretpostavka",
      body: [
        "Mnogi drugi walleti koriste BIP39 početne riječi kao korisnički backup. Zato i dalje vrijedi opće pravilo da se početne riječi, privatni ključevi i dodatne pristupne lozinke ne šalju nikome.",
        "U opisanom Bitcoin Core workflowu primarni korisnički backup nije popis riječi. To je Bitcoin Core wallet backup datoteka, uz zasebno čuvanu wallet passphrase kada je wallet enkriptiran. Wallet backup i passphrase također se nikada ne šalju savjetniku.",
      ],
    },
    {
      heading: "Prijelaz ne treba biti nagao",
      body: [
        "Osoba koja još ne može samostalno provjeriti i obnoviti wallet ne treba premjestiti cijelu dugoročnu štednju samo zato što samostalna pohrana zvuči suverenije.",
        "Razuman prijelaz počinje učenjem, testnim walletom, pisanom dokumentacijom i malim iznosom. Tek kada su normalni rad, kvar i oporavak dokazani, može se odlučivati o većem saldu.",
      ],
      orderedItems: [
        "Popisati gdje se bitcoin nalazi i kojoj namjeni služi.",
        "Odabrati model prema znanju, posljedicama gubitka i obiteljskim ulogama.",
        "Postaviti i testirati sustav bez značajnog iznosa.",
        "Obnoviti wallet na zasebnom uređaju i provjeriti dokumentaciju.",
        "Tek zatim razmotriti povećavanje salda ili složenosti.",
      ],
    },
    {
      heading: "Dugoročni saldo i dnevna uporaba nisu isto",
      body: [
        "Dugoročni saldo treba preživjeti godine, kvar uređaja i nedostupnost glavne osobe. Zato ima smisla strože odvajanje offline potpisa, koordinacije, nodea i backupa.",
        "Mali iznosi za svakodnevnu uporabu traže brži pristup i drukčiji odnos praktičnosti i rizika. Taj model bit će obrađen zasebno i nije razlog da se cold-storage arhitektura pretvori u svakodnevni wallet.",
      ],
    },
    {
      heading: "Obitelj i prvi korak",
      body: [
        "Samostalna pohrana nije dovršena ako samo jedna osoba zna da sustav postoji i kako se obnavlja. Obitelji treba neskrivena uputa s prvim korakom, zabranama i kontaktom za pomoć.",
        "Ta uputa ne treba sadržavati privatni ključ, wallet backup datoteku, wallet passphrase, BIP39 riječi drugih walleta ni potpune lokacije. Informacija o sustavu nije isto što i trenutačna kontrola nad sredstvima.",
      ],
      link: {
        before: "Za taj dio pročitajte",
        label: "Kako obitelj može pristupiti Bitcoinu ako vam se nešto dogodi?",
        href: "/vodici/obiteljski-pristup-bitcoinu/",
        after: ".",
      },
    },
    {
      heading: "Zaključak",
      body: [
        "Samostalna pohrana daje mogućnost izravne kontrole, ali njezina vrijednost ovisi o tome može li se sustav razumjeti, sigurnosno kopirati i oporaviti.",
        "Za ozbiljnu dugoročnu štednju Bitcoin Core Standard je preporučeni smjer ove stranice. Za osobu koja još nije spremna provesti i dokazati cijeli postupak, sljedeći korak nije improvizacija nego učenje i testiranje bez značajnog iznosa.",
      ],
    },
  ],
  finalCta: PRIMARY_CTA,
  finalCtaTitle: "Želite razdvojiti dugoročni saldo od dnevne uporabe?",
  finalCtaPrompt:
    "U uvodnom razgovoru možemo razjasniti namjenu, razinu znanja i pitanja koja treba testirati. Ne šaljete iznose, privatne ključeve, wallet backup datoteke, wallet passphrase, početne riječi ni pristup uređajima.",
}
