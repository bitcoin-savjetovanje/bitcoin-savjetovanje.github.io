export type GlossaryTerm = {
  id: string
  priority?: number
  terms: string[]
  title: string
  description: string
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "seed-rijeci",
    terms: [
      "seed fraza",
      "seed fraze",
      "seed frazu",
      "seed frazom",
      "seed riječi",
      "seed phrase",
      "recovery phrase",
    ],
    title: "Početne riječi",
    description:
      "BIP39 popis riječi koji mnogi walleti koriste kao korisnički backup. Tko ima riječi, može obnoviti pripadajuće ključeve, zato se ne smiju slikati ni slati. U opisanom Bitcoin Core workflowu nisu primarni korisnički backup.",
  },
  {
    id: "bitcoin-core-standard",
    priority: 100,
    terms: ["Bitcoin Core Standard", "Bitcoin Core Standarda"],
    title: "Bitcoin Core Standard",
    description:
      "Sigurnosna arhitektura za dugoročnu Bitcoin štednju koja koristi Bitcoin Core, odvojene offline potpisnike, watch-only koordinaciju, vlastiti node, PSBT i provjerene sigurnosne kopije.",
  },
  {
    id: "offline-signer",
    priority: 80,
    terms: [
      "offline signer",
      "offline signera",
      "offline potpisnik",
      "offline potpisnika",
      "offline potpisnici",
    ],
    title: "Offline signer (offline potpisnik)",
    description:
      "Uređaj koji čuva privatni ključ i potpisuje transakcije bez izravne veze s internetom tijekom osjetljivih operacija.",
  },
  {
    id: "watch-only-wallet",
    priority: 80,
    terms: [
      "watch-only wallet",
      "watch-only walleta",
      "watch-only koordinator",
      "watch-only koordinatoru",
      "watch-only konfiguracija",
      "watch-only konfiguraciju",
    ],
    title: "Watch-only wallet",
    description:
      "Wallet koji može pratiti adrese, stanje i transakcije, ali nema privatne ključeve potrebne za trošenje.",
  },
  {
    id: "archival-full-node",
    priority: 80,
    terms: ["archival full node", "archival full nodeu", "arhivski puni node"],
    title: "Archival full node",
    description:
      "Bitcoin node koji čuva sve validirane blokove i omogućuje kasnije ponovno skeniranje povijesti walleta bez ponovnog preuzimanja obrisanih blokova.",
  },
  {
    id: "pruned-node",
    priority: 80,
    terms: ["pruned node", "pruned nodea", "pruned nodeu"],
    title: "Pruned node",
    description:
      "Potpuno validirajući Bitcoin node koji radi uz ograničen prostor tako da stare blokove nakon validacije briše. Nije polovičan node, ali može otežati naknadno skeniranje stare povijesti walleta.",
  },
  {
    id: "wallet-backup-datoteka",
    priority: 90,
    terms: [
      "Bitcoin Core wallet backup datoteka",
      "Bitcoin Core wallet backup datoteke",
      "wallet backup datoteka",
      "wallet backup datoteke",
      "wallet backupi",
    ],
    title: "Wallet backup datoteka",
    description:
      "Sigurnosna kopija Bitcoin Core wallet baze koja sadrži podatke potrebne za obnovu tog walleta. Sadržaj i naziv ovise o vrsti walleta; datoteka se ne mora zvati wallet.dat.",
  },
  {
    id: "wallet-passphrase",
    priority: 90,
    terms: ["wallet passphrase", "wallet passphraseom", "wallet passphraseove"],
    title: "Wallet passphrase",
    description:
      "Lozinka kojom Bitcoin Core štiti privatni ključni materijal walleta. Nije BIP39 passphrase i nije sama po sebi zamjena za wallet backup.",
  },
  {
    id: "pricuvna-kopija",
    terms: [
      "backup",
      "backupi",
      "backupom",
      "pričuvna kopija",
      "pričuvne kopije",
      "pričuvnom kopijom",
    ],
    title: "Backup (pričuvna kopija)",
    description:
      "Rezervni primjerak važnog podatka ili ključa. Kod Bitcoina to nije običan dokument, nego nešto što može omogućiti oporavak pristupa novcu.",
  },
  {
    id: "privatni-kljuc",
    terms: [
      "privatni ključ",
      "privatne ključeve",
      "privatnih ključeva",
      "privatnim ključem",
      "privatni ključevi",
    ],
    title: "Privatni ključ",
    description:
      "Tajni podatak kojim se potpisuje Bitcoin transakcija. Možete ga zamisliti kao ključ sefa: tko ga ima, može pomaknuti bitcoin.",
  },
  {
    id: "javni-kljuc",
    terms: [
      "javni ključ",
      "javnog ključa",
      "javne ključeve",
      "javnih ključeva",
      "javni ključevi",
    ],
    title: "Javni ključ",
    description:
      "Podatak iz kojeg se mogu izvesti adrese i provjeriti potpisi. Javni ključ ne smije trošiti bitcoin, ali može otkrivati privatnost ako se neoprezno dijeli.",
  },
  {
    id: "visepotpisni-sustav",
    terms: [
      "višepotpisni sustav",
      "višepotpisni novčanik",
      "multisig",
      "2 od 3",
      "2-of-3",
    ],
    title: "Višepotpisni sustav",
    description:
      "Novčanik koji traži više od jednog potpisa za slanje bitcoina. Primjer 2 od 3 znači da postoje tri ključa, a za slanje trebaju bilo koja dva.",
  },
  {
    id: "descriptor",
    priority: 30,
    terms: ["wallet descriptor", "descriptor", "deskriptor", "opisnik"],
    title: "Descriptor (opis novčanika)",
    description:
      "Standardizirani opis ključeva i skripti iz kojih wallet izvodi adrese. Javni descriptor ne sadrži privatni ključ, dok privatni descriptor može sadržavati privatni materijal i zato se ne dijeli.",
  },
  {
    id: "derivation-path",
    priority: 40,
    terms: [
      "derivation path",
      "derivacijski put",
      "put izvedbe",
      "derivation pathovi",
      "derivation pathove",
    ],
    title: "Derivation path (put izvedbe)",
    description:
      "Pravilo koje govori kojim se redom iz jednog glavnog ključa izvode pojedini računi i adrese. Kao oznaka police i ladice u velikom arhivu ključeva.",
  },
  {
    id: "xpub",
    terms: ["xpub", "xpubovi", "xpubove", "xpubovima"],
    title: "Xpub",
    description:
      "Prošireni javni ključ. Omogućuje prikaz adresa i stanja novčanika, ali ne omogućuje trošenje bitcoina. Ipak ga treba čuvati jer otkriva privatnost.",
  },
  {
    id: "utxo",
    terms: ["UTXO", "UTXO-i", "UTXO-e", "UTXO-a"],
    title: "UTXO",
    description:
      "Pojedini komad bitcoina koji još nije potrošen. Možete ga zamisliti kao novčanicu ili kovanicu u novčaniku, samo u Bitcoin sustavu.",
  },
  {
    id: "psbt",
    terms: ["PSBT", "PSBT-a", "PSBT transakcija", "PSBT transakcije"],
    title: "PSBT",
    description:
      "Standardizirani format za prijenos djelomično pripremljene ili potpisane Bitcoin transakcije između koordinatora i potpisnika. Nije privatni ključ, ali može otkrivati osjetljive podatke o walletu.",
  },
  {
    id: "bitcoin-skript",
    priority: 45,
    terms: [
      "Bitcoin skript",
      "Bitcoin skripta",
      "Bitcoin skriptu",
      "izlazna skripta",
      "izlaznih skripti",
      "skriptne mogućnosti",
      "skriptne putove",
      "skripta",
      "skripti",
    ],
    title: "Bitcoin skript",
    description:
      "Skup pravila koji određuje pod kojim se uvjetima bitcoin može potrošiti, primjerice koji potpisi, ključevi ili vremenski rokovi moraju vrijediti.",
  },
  {
    id: "digitalni-potpis",
    priority: 35,
    terms: [
      "digitalni potpis",
      "digitalnog potpisa",
      "digitalne potpise",
      "potpise",
      "potpis",
    ],
    title: "Digitalni potpis",
    description:
      "Matematički dokaz da je vlasnik privatnog ključa odobrio transakciju. Čvorovi ga mogu provjeriti bez otkrivanja privatnog ključa.",
  },
  {
    id: "miniscript",
    priority: 35,
    terms: ["Miniscript", "Miniscripta", "Miniscriptom"],
    title: "Miniscript",
    description:
      "Način zapisivanja naprednih Bitcoin pravila za trošenje. Olakšava provjeru politika s više potpisa, rokovima i oporavnim putevima.",
  },
  {
    id: "bsms",
    terms: ["BSMS", "BSMS-a"],
    title: "BSMS (Bitcoin Secure Multisig Setup)",
    description:
      "Engleska kratica za standard koji opisuje kako je višepotpisni Bitcoin trezor sastavljen. Pomaže da drugi alat razumije javne ključeve, prag potpisa i pravila oporavka.",
  },
  {
    id: "nunchuk",
    terms: ["Nunchuk", "Nunchuka", "Nunchukom"],
    title: "Nunchuk",
    description:
      "Bitcoin novčanik i usluga koja podržava višepotpisne sustave i naprednije politike, uključujući Miniscript. Nije dio aktualnog Bitcoin Core Standarda ove stranice.",
  },
  {
    id: "liana",
    terms: ["Liana", "Liane", "Liani"],
    title: "Liana",
    description:
      "Bitcoin novčanik usmjeren na oporavak pomoću vremenskih uvjeta i Miniscripta. Nije dio aktualnog Bitcoin Core Standarda ove stranice.",
  },
  {
    id: "checklocktimeverify",
    terms: ["CHECKLOCKTIMEVERIFY"],
    title: "CHECKLOCKTIMEVERIFY",
    description:
      "Bitcoin pravilo koje može učiniti jedan put trošenja valjanim tek nakon određenog bloka ili vremena.",
  },
  {
    id: "checksequenceverify",
    terms: ["CHECKSEQUENCEVERIFY"],
    title: "CHECKSEQUENCEVERIFY",
    description:
      "Bitcoin pravilo koje se koristi za relativne rokove, primjerice kada uvjet ovisi o tome koliko dugo određeni UTXO miruje.",
  },
  {
    id: "bip-65",
    terms: ["BIP 65"],
    title: "BIP 65",
    description:
      "Prijedlog koji je u Bitcoin uveo CHECKLOCKTIMEVERIFY, pravilo za apsolutne vremenske uvjete.",
  },
  {
    id: "bip-68",
    terms: ["BIP 68"],
    title: "BIP 68",
    description:
      "Prijedlog koji opisuje relativne vremenske uvjete vezane uz starost nepotrošenog izlaza.",
  },
  {
    id: "bip-112",
    terms: ["BIP 112"],
    title: "BIP 112",
    description:
      "Prijedlog koji je u Bitcoin uveo CHECKSEQUENCEVERIFY, pravilo za relativne rokove u skriptu.",
  },
  {
    id: "bip-110",
    priority: 100,
    terms: ["BIP-110"],
    title: "BIP-110",
    description:
      "Prijedlog da se na ograničeno vrijeme postrože neka Bitcoinova pravila za podatke u transakcijama. Prijedlog nije isto što i prihvaćeno pravilo mreže.",
  },
  {
    id: "bip",
    priority: 20,
    terms: ["BIP", "BIP-ovi", "BIP-ovima"],
    title: "BIP",
    description:
      "Dokument kojim se predlaže ili opisuje poboljšanje Bitcoina. BIP može biti samo ideja, dovršena specifikacija ili već prihvaćen standard.",
  },
  {
    id: "soft-fork",
    priority: 50,
    terms: ["soft fork", "soft forka", "soft forkove", "soft forkovi"],
    title: "Soft fork",
    description:
      "Promjena koja postrožuje pravila tako da novi čvorovi prihvaćaju uži skup blokova, dok stari čvorovi te blokove još mogu smatrati valjanima.",
  },
  {
    id: "hard-fork",
    priority: 50,
    terms: ["hard fork", "hard forka", "hard forkovi"],
    title: "Hard fork",
    description:
      "Promjena pravila koja nije kompatibilna sa starim pravilima. Ako svi ne prijeđu na ista pravila, mreža se može trajno podijeliti na dva lanca.",
  },
  {
    id: "konsenzus",
    priority: 25,
    terms: [
      "konsenzus",
      "konsenzusa",
      "konsenzusu",
      "konsenzusni",
      "konsenzusna",
      "konsenzusno",
      "konsenzusnih",
    ],
    title: "Konsenzus",
    description:
      "Temeljna pravila po kojima čvorovi odlučuju jesu li transakcija i blok valjani. Čvor koji provodi drukčija pravila može završiti na drugom lancu.",
  },
  {
    id: "politika-prosljedivanja",
    priority: 45,
    terms: [
      "politika prosljeđivanja",
      "politike prosljeđivanja",
      "pravilima prosljeđivanja",
      "relejna politika",
      "relejne politike",
      "relejnoj politici",
      "prosljeđivanje transakcija",
      "prosljeđivanja transakcija",
    ],
    title: "Politika prosljeđivanja",
    description:
      "Lokalna pravila po kojima čvor odlučuje koje nepotvrđene transakcije čuva i šalje dalje. Ona ne određuju je li transakcija u bloku konsenzusno valjana.",
  },
  {
    id: "mempool",
    priority: 45,
    terms: ["mempool", "mempoola", "mempoolu"],
    title: "Mempool",
    description:
      "Privremeni spremnik nepotvrđenih transakcija na pojedinom čvoru. Svaki čvor može imati malo drukčiji sadržaj mempoola.",
  },
  {
    id: "op-return",
    priority: 60,
    terms: ["OP_RETURN", "OP_RETURN-a"],
    title: "OP_RETURN",
    description:
      "Dio Bitcoin transakcije kojim se u lanac može zapisati mala količina podataka, a taj izlaz nije moguće potrošiti kao bitcoin.",
  },
  {
    id: "witness",
    priority: 45,
    terms: [
      "witness",
      "witnessa",
      "witness podaci",
      "witness podataka",
      "witness verzije",
      "witness verzija",
    ],
    title: "Witness podaci",
    description:
      "Dio transakcije u kojem se uglavnom nalaze potpisi i drugi dokazi da je trošenje dopušteno. SegWit ih odvaja od osnovnog dijela transakcije.",
  },
  {
    id: "taproot",
    priority: 50,
    terms: [
      "Taproot",
      "Taproota",
      "Taprootov",
      "Taprootove",
      "Taproot annex",
      "kontrolnih blokova",
      "kontrolni blok",
    ],
    title: "Taproot",
    description:
      "Bitcoinova nadogradnja koja omogućuje učinkovitije potpise i naprednije uvjete trošenja. Annex i kontrolni blokovi posebni su dijelovi tih konstrukcija.",
  },
  {
    id: "operacijski-kod",
    priority: 55,
    terms: [
      "operacijski kod",
      "operacijske kodove",
      "OP_SUCCESS",
      "OP_IF",
      "OP_NOTIF",
    ],
    title: "Operacijski kod",
    description:
      "Pojedina naredba u Bitcoinovu skriptnom jeziku. Govori čvoru koju provjeru treba izvršiti prije nego što dopusti trošenje.",
  },
  {
    id: "rudarska-signalizacija",
    priority: 35,
    terms: [
      "rudarska signalizacija",
      "rudarske signalizacije",
      "rudarskoj signalizaciji",
      "signalizira BIP-110",
      "signaliziraju podršku",
      "signalizacija rudara",
      "obvezno signaliziranje",
    ],
    title: "Rudarska signalizacija",
    description:
      "Oznaka u blokovima kojom rudari javno pokazuju spremnost za određenu promjenu. Signal nije sam po sebi konačna odluka cijele mreže.",
  },
  {
    id: "manjinski-lanac",
    priority: 40,
    terms: [
      "manjinski lanac",
      "manjinskog lanca",
      "manjinskom lancu",
      "rascjep",
      "rascjepa",
      "rascjepu",
    ],
    title: "Manjinski lanac i rascjep",
    description:
      "Odvojeni lanac koji slijedi manji dio mreže nakon neslaganja o pravilima. Tada dvije skupine više ne priznaju iste blokove kao Bitcoin.",
  },
  {
    id: "p2p-mreza",
    priority: 35,
    terms: [
      "P2P mreža",
      "P2P mrežu",
      "P2P distribucija",
      "P2P distribucije",
      "P2P",
    ],
    title: "P2P mreža",
    description:
      "Mreža ravnopravnih računala koja podatke razmjenjuju izravno, bez jednog središnjeg poslužitelja koji upravlja cijelim sustavom.",
  },
  {
    id: "arhivski-cvor",
    priority: 35,
    terms: [
      "arhivski čvor",
      "arhivski čvorovi",
      "arhivskih čvorova",
      "početna sinkronizacija",
      "početne sinkronizacije",
    ],
    title: "Arhivski čvor i početna sinkronizacija",
    description:
      "Arhivski čvor čuva punu povijest blokova. Početna sinkronizacija je prvo preuzimanje i provjera te povijesti kada se čvor pokrene.",
  },
  {
    id: "vanjski-ucinak",
    priority: 20,
    terms: ["vanjski učinak", "vanjskog učinka", "negativan vanjski učinak"],
    title: "Vanjski učinak",
    description:
      "Trošak ili korist koju neka aktivnost stvara drugima, iako oni nisu izravno sudjelovali u dogovoru ni plaćanju.",
  },
  {
    id: "schellingova-tocka",
    priority: 45,
    terms: ["Schellingova točka", "Schellingove točke"],
    title: "Schellingova točka",
    description:
      "Rješenje oko kojeg se ljudi mogu uskladiti bez središnjeg zapovjednika jer ga svi očekuju kao prirodnu zajedničku polaznu točku.",
  },
  {
    id: "asic",
    priority: 45,
    terms: ["ASIC", "ASIC uređajima", "ASIC uređaji"],
    title: "ASIC",
    description:
      "Specijalizirani uređaj napravljen gotovo isključivo za Bitcoin rudarenje. Mnogo je učinkovitiji od običnog računala za taj posao.",
  },
  {
    id: "dokaz-rada",
    priority: 45,
    terms: [
      "dokaz rada",
      "dokaza rada",
      "dokazu rada",
      "algoritam dokaza rada",
    ],
    title: "Dokaz rada",
    description:
      "Mehanizam kojim rudari troše računalni rad i energiju da bi predložili novi blok. Čvorovi zatim provjeravaju je li taj rad valjan.",
  },
  {
    id: "tezina-bloka",
    priority: 40,
    terms: [
      "težina bloka",
      "težine bloka",
      "težine blokova",
      "jedinica težine",
      "jedinice težine",
    ],
    title: "Težina bloka",
    description:
      "Bitcoinova mjera količine podataka u bloku. Potpisni podaci računaju se povoljnije od osnovnih podataka, pa težina nije isto što i broj bajtova.",
  },
  {
    id: "virtualni-bajt",
    priority: 55,
    terms: ["vB", "virtualna veličina", "virtualne veličine"],
    title: "Virtualni bajt (vB)",
    description:
      "Jedinica koja približno pokazuje koliko mjesta transakcija zauzima nakon što se uračuna Bitcoinovo pravilo težine. Naknade se često izražavaju po vB-u.",
  },
  {
    id: "segwit",
    priority: 45,
    terms: ["SegWit", "SegWita", "SegWit transakcija", "SegWit transakcije"],
    title: "SegWit",
    description:
      "Bitcoinova nadogradnja koja odvaja potpise od osnovnog dijela transakcije. Time je poboljšala kapacitet i omogućila sigurniju gradnju Lightninga.",
  },
  {
    id: "on-chain",
    priority: 35,
    terms: [
      "on-chain",
      "izvan lanca",
      "izvanlančani",
      "izvanlančana",
      "u Bitcoinovu lancu",
      "na Bitcoinovu lancu",
    ],
    title: "On-chain i izvan lanca",
    description:
      "On-chain znači da je zapis izravno potvrđen u Bitcoinovu lancu. Izvan lanca znači da se aktivnost odvija drugdje, a Bitcoin se koristi za konačnu provjeru ili namirenje.",
  },
  {
    id: "osnovni-i-drugi-sloj",
    priority: 35,
    terms: [
      "osnovni sloj",
      "osnovnog sloja",
      "osnovnom sloju",
      "drugi sloj",
      "drugog sloja",
      "drugom sloju",
      "dodatni sloj",
      "dodatnih slojeva",
    ],
    title: "Osnovni i drugi sloj",
    description:
      "Osnovni sloj je sam Bitcoinov lanac. Drugi sloj obrađuje mnogo aktivnosti izvan njega, ali se za konačnu sigurnost ili namirenje oslanja na Bitcoin.",
  },
  {
    id: "agregacija",
    priority: 25,
    terms: [
      "agregacija",
      "agregirati",
      "agregira",
      "grupirana namirenja",
      "grupirati svoju aktivnost",
      "grupira velik broj",
    ],
    title: "Agregacija",
    description:
      "Spajanje mnogo pojedinačnih radnji u manji broj sažetih zapisa. Time se štedi oskudan prostor na Bitcoinovu osnovnom sloju.",
  },
  {
    id: "konacno-namirenje",
    priority: 35,
    terms: [
      "konačno namirenje",
      "konačnog namirenja",
      "konačnom namirenju",
      "konačnih namirenja",
      "neto namirenje",
      "neto namirenja",
    ],
    title: "Konačno namirenje",
    description:
      "Trenutak kada je prijenos konačno zabilježen na Bitcoinovu lancu i više ne ovisi samo o obećanju banke, operatora ili drugog sustava.",
  },
  {
    id: "platni-kanal",
    priority: 30,
    terms: [
      "platni kanal",
      "platni kanali",
      "platnih kanala",
      "kanal za plaćanje",
      "kanali za plaćanje",
    ],
    title: "Platni kanal",
    description:
      "Veza u kojoj sudionici mogu obaviti mnogo plaćanja bez zapisivanja svakoga na Bitcoin. Na lanac obično izlaze pri otvaranju, zatvaranju ili sporu.",
  },
  {
    id: "ark",
    priority: 45,
    terms: ["Ark", "Arka", "Arku", "Ark-slični"],
    title: "Ark",
    description:
      "Predloženi Bitcoin sustav koji grupira prava mnogih korisnika u mali broj zapisa na lancu, uz mogućnost da korisnik pod određenim uvjetima sam povuče sredstva.",
  },
  {
    id: "vtxo",
    priority: 55,
    terms: ["VTXO", "VTXO-i", "VTXO-e"],
    title: "VTXO",
    description:
      "Virtualni UTXO u Arku. Predstavlja korisnikovo pravo na bitcoin izvan osnovnog lanca, uz unaprijed pripremljen put za izlaz na Bitcoin.",
  },
  {
    id: "unilateralni-izlaz",
    priority: 45,
    terms: [
      "unilateralni izlaz",
      "unilateralnog izlaza",
      "unilateralnom izlazu",
      "unilateralnim izlazom",
    ],
    title: "Unilateralni izlaz",
    description:
      "Mogućnost da korisnik sam povuče svoja sredstva na Bitcoin, bez dopuštenja operatora ili drugih sudionika sustava.",
  },
  {
    id: "bitvm",
    priority: 55,
    terms: ["BitVM", "BitVM-a", "BitVM2", "BitVM sustav"],
    title: "BitVM",
    description:
      "Pristup kojim se složeni izračun provjerava kroz spor i dokaz prijevare, umjesto da Bitcoin izravno izvršava cijeli program.",
  },
  {
    id: "most",
    priority: 25,
    terms: [
      "Bitcoin most",
      "Bitcoin mostovi",
      "BitVM most",
      "BitVM mostom",
      "mostovi",
      "mostom",
    ],
    title: "Most",
    description:
      "Sustav koji povezuje bitcoin s drugim slojem ili mrežom. Korisnik zaključava ili predstavlja bitcoin drugdje, pa sigurnost ovisi o pravilima tog mosta.",
  },
  {
    id: "rollup",
    priority: 50,
    terms: [
      "rollup",
      "rollupa",
      "rollupu",
      "rollupovi",
      "rollupova",
      "rollupove",
    ],
    title: "Rollup",
    description:
      "Sustav koji grupira mnogo transakcija i na osnovni sloj objavljuje sažetak ili dokaz promjene stanja. Tako jedan zapis može predstavljati velik broj radnji.",
  },
  {
    id: "kriptografski-hash",
    priority: 50,
    terms: [
      "kriptografski hash",
      "kriptografskog hasha",
      "hash",
      "hasha",
      "sažetak promjene stanja",
      "sažeta promjena stanja",
    ],
    title: "Kriptografski hash",
    description:
      "Kratak digitalni otisak podataka. Vrlo mala promjena ulaza daje drugi otisak, pa hash može dokazati da se podaci nisu promijenili.",
  },
  {
    id: "korijen-stanja",
    priority: 45,
    terms: ["korijen stanja", "korijena stanja", "korijenu stanja"],
    title: "Korijen stanja",
    description:
      "Jedan kratki kriptografski sažetak cijelog stanja sustava. Može potvrditi konzistentnost, ali sam ne sadrži sve podatke potrebne za obnovu stanja.",
  },
  {
    id: "dostupnost-podataka",
    priority: 45,
    terms: [
      "dostupnost podataka",
      "dostupnosti podataka",
      "dostupnošću podataka",
      "dostupni podaci",
      "dostupnih podataka",
    ],
    title: "Dostupnost podataka",
    description:
      "Jamstvo da korisnici mogu doći do podataka potrebnih za provjeru i obnovu sustava, a ne samo do kratkog sažetka koji objavi operator.",
  },
  {
    id: "sekvencer",
    priority: 45,
    terms: ["sekvencer", "sekvencera", "sekvencerom"],
    title: "Sekvencer",
    description:
      "Sudionik koji prima i raspoređuje transakcije drugog sloja. Ako je samo jedan, može usporavati, preuređivati ili cenzurirati transakcije.",
  },
  {
    id: "dokaz-prijevare",
    priority: 40,
    terms: [
      "dokaz prijevare",
      "dokaza prijevare",
      "proof sustav",
      "proof sustava",
      "dokaziva tvrdnja",
    ],
    title: "Dokaz prijevare",
    description:
      "Kriptografski dokaz kojim se pokazuje da je operator objavio netočan rezultat. Sustav tada može odbaciti tvrdnju ili kazniti prekršitelja.",
  },
  {
    id: "rudarski-bazen",
    priority: 40,
    terms: [
      "rudarski bazen",
      "rudarski bazeni",
      "rudarskim bazenima",
      "veliki bazeni",
      "velikih bazena",
    ],
    title: "Rudarski bazen",
    description:
      "Skupina rudara koja udružuje računalnu snagu i dijeli zaradu. Bazen obično bira koje će transakcije pokušati uključiti u blok.",
  },
  {
    id: "blokovska-subvencija",
    priority: 45,
    terms: [
      "blokovska subvencija",
      "blokovske subvencije",
      "blokovskom subvencijom",
      "subvencija bloka",
      "subvencije",
      "subvenciju",
      "subvencioniranih bitcoina",
    ],
    title: "Blokovska subvencija",
    description:
      "Novi bitcoin koji protokol dodjeljuje rudaru za valjan blok. Iznos se povremeno prepolovljuje i s vremenom pada prema nuli.",
  },
  {
    id: "transakcijska-naknada",
    priority: 30,
    terms: [
      "transakcijska naknada",
      "transakcijske naknade",
      "transakcijskih naknada",
      "tržište naknada",
      "tržišta naknada",
    ],
    title: "Transakcijska naknada",
    description:
      "Iznos koji korisnik nudi rudaru da transakciju uključi u blok. Kada nema dovoljno mjesta, više naknade obično imaju prednost.",
  },
  {
    id: "hashprice",
    priority: 50,
    terms: ["hashprice", "hashpriceu"],
    title: "Hashprice",
    description:
      "Procjena prihoda koji rudar može ostvariti za određenu količinu računalne snage. Ovisi o cijeni bitcoina, naknadama i težini rudarenja.",
  },
  {
    id: "tezina-rudarenja",
    priority: 35,
    terms: [
      "težina rudarenja",
      "težine rudarenja",
      "rast težine",
      "težina mreže",
    ],
    title: "Težina rudarenja",
    description:
      "Pravilo koje određuje koliko je teško pronaći novi blok. Bitcoin ga prilagođava kako bi blokovi u prosjeku i dalje dolazili približno svakih deset minuta.",
  },
  {
    id: "dvostruka-potrosnja",
    priority: 40,
    terms: [
      "dvostruka potrošnja",
      "dvostruke potrošnje",
      "dvostrukoj potrošnji",
    ],
    title: "Dvostruka potrošnja",
    description:
      "Pokušaj da se isti bitcoin potroši dvaput. Čvorovi provjeravaju povijest i prihvaćaju samo jednu valjanu potrošnju.",
  },
  {
    id: "monetarna-baza",
    priority: 20,
    terms: [
      "monetarna baza",
      "monetarne baze",
      "monetarnu bazu",
      "monetarnom bazom",
    ],
    title: "Monetarna baza",
    description:
      "Temeljni novac na kojem se grade drugi oblici računa, kredita i plaćanja. U ovom vodiču to je konačno namirenje u samom bitcoinu.",
  },
  {
    id: "kolateral",
    priority: 20,
    terms: ["kolateral", "kolaterala", "kolateralom"],
    title: "Kolateral",
    description:
      "Imovina založena kao osiguranje obveze ili zajma. Ako dužnik ne ispuni obvezu, vjerovnik može posegnuti za tim osiguranjem.",
  },
  {
    id: "bajt",
    priority: 15,
    terms: ["bajt", "bajta", "bajtova", "bajtom", "bajtovi"],
    title: "Bajt",
    description:
      "Mala jedinica digitalnih podataka. U Bitcoinu je prostor u blokovima ograničen, pa broj bajtova utječe na kapacitet i naknadu.",
  },
  {
    id: "bitcoin-blok",
    priority: 15,
    terms: [
      "Bitcoinov blok",
      "Bitcoinovi blokovi",
      "Bitcoinovih blokova",
      "blok",
      "bloka",
      "blokovi",
      "blokova",
      "blokovima",
    ],
    title: "Bitcoinov blok",
    description:
      "Paket potvrđenih transakcija koji rudar predlaže mreži. Čvorovi ga prihvaćaju samo ako poštuje sva Bitcoinova pravila.",
  },
  {
    id: "transakcijski-ulaz-izlaz",
    priority: 25,
    terms: [
      "transakcijski ulaz",
      "transakcijski izlaz",
      "ulazom",
      "izlazom",
      "ulaza",
      "izlaza",
      "izlazne puteve",
    ],
    title: "Ulaz i izlaz transakcije",
    description:
      "Ulaz pokazuje koji se postojeći komad bitcoina troši, a izlaz određuje novi iznos i uvjete pod kojima će ga netko poslije moći potrošiti.",
  },
  {
    id: "rudarenje",
    priority: 20,
    terms: [
      "Bitcoin rudarenje",
      "rudarenje",
      "rudarenja",
      "rudarenju",
      "rudarski pogon",
      "rudarski pogoni",
    ],
    title: "Bitcoin rudarenje",
    description:
      "Natjecanje u kojem specijalizirani uređaji troše energiju kako bi pronašli valjan novi blok. Rudari dobivaju subvenciju i naknade.",
  },
  {
    id: "btc",
    priority: 20,
    terms: ["BTC"],
    title: "BTC",
    description:
      "Najčešća tržišna kratica za bitcoin, slično kao što se EUR koristi za euro. Ne označava poseban token odvojen od Bitcoina.",
  },
  {
    id: "node",
    terms: [
      "puni čvor",
      "punog čvora",
      "punim čvorom",
      "pune čvorove",
      "vlastiti node",
      "vlastitim nodeom",
      "Bitcoin node",
      "full node",
      "node",
      "nodeom",
      "nodeu",
      "vlastiti čvor",
      "Bitcoin čvor",
      "zadani čvorovi",
      "gospodarskih čvorova",
      "broj čvorova",
      "čvorovi",
    ],
    title: "Node (vlastiti Bitcoin čvor)",
    description:
      "Računalo koje samostalno provjerava Bitcoin pravila i blockchain. Kad koristite vlastiti node, manje ovisite o tuđem poslužitelju za provjeru svog novca.",
  },
  {
    id: "bitcoin-core",
    terms: ["Bitcoin Core"],
    title: "Bitcoin Core",
    description:
      "Najpoznatiji program za pokretanje Bitcoin nodea. Preuzima i provjerava Bitcoin blockchain prema pravilima mreže.",
  },
  {
    id: "lightning",
    terms: ["Lightning", "Lightningu", "Lightninga", "Lightningom"],
    title: "Lightning",
    description:
      "Bitcoin mreža za brža i jeftinija plaćanja manjih iznosa. Korisna je za plaćanja, ali ima vlastita pravila, ograničenja i sigurnosne odluke.",
  },
  {
    id: "fulcrum",
    terms: ["Fulcrum"],
    title: "Fulcrum",
    description:
      "Electrum poslužitelj koji može raditi uz vlastiti Bitcoin node. Postoji u drugim arhitekturama, ali nije komponenta aktualnog Bitcoin Core Standarda ove stranice.",
  },
  {
    id: "electrum-posluzitelj",
    terms: [
      "privatni Electrum poslužitelj",
      "javni Electrum poslužitelj",
      "Electrum poslužitelj",
      "Electrum server",
    ],
    title: "Electrum poslužitelj",
    description:
      "Poslužitelj koji novčaniku brzo odgovara koje adrese i transakcije postoje. Ako je vaš, bolji je za privatnost; ako je javni, operator može vidjeti previše.",
  },
  {
    id: "skrbnik",
    terms: [
      "skrbnik",
      "skrbnika",
      "skrbniku",
      "skrbnikom",
      "skrbnički",
      "skrbnička",
      "skrbničko",
    ],
    title: "Skrbnik",
    description:
      "Tvrtka ili osoba koja za nekoga drugoga čuva imovinu ili pristup imovini. Skrbnik može biti koristan, ali uvodi povjerenje i dodatne rizike.",
  },
  {
    id: "vlastiti-posjed",
    terms: [
      "vlastiti posjed",
      "vlastitog posjeda",
      "vlastitom posjedu",
      "vlastitim posjedom",
      "vlastiti Bitcoin posjed",
    ],
    title: "Vlastiti posjed",
    description:
      "Način držanja bitcoina u kojem osoba ili obitelj sama kontrolira ključeve, umjesto da se oslanja samo na burzu, brokera ili drugog skrbnika.",
  },
  {
    id: "samostalna-pohrana",
    terms: [
      "samostalna pohrana",
      "samostalnoj pohrani",
      "samostalnu pohranu",
      "samoskrbništvo",
      "samoskrbništva",
      "samoskrbništvu",
      "samoskrbnički",
      "samoskrbnička",
      "samoskrbničke",
    ],
    title: "Samostalna pohrana",
    description:
      "Način čuvanja u kojem vi kontrolirate ključeve. Daje više slobode, ali traži dobar plan, pričuvne kopije i nasljeđivanje.",
  },
  {
    id: "etf",
    terms: ["ETF", "ETF-ovi", "ETF-a", "ETF-u", "ETF-om"],
    title: "ETF",
    description:
      "Engleska kratica za burzovni fond. U tekstu se spominje jer je čitatelj može susresti u nazivima proizvoda i javnim razgovorima.",
  },
  {
    id: "burzovni-fond",
    terms: [
      "burzovni fond",
      "burzovnog fonda",
      "burzovnom fondu",
      "burzovni fondovi",
      "burzovnih fondova",
      "burzovnim fondovima",
    ],
    title: "Burzovni fond",
    description:
      "Vrijednosni papir koji se kupuje preko brokerskog računa i daje izloženost nekoj imovini. Burzovni fond povezan s Bitcoinom nije isto što i bitcoin u vlastitom posjedu.",
  },
  {
    id: "prepolovljenje-rudarske-nagrade",
    terms: [
      "prepolovljenje rudarske nagrade",
      "prepolovljenja rudarske nagrade",
      "prepolovljenju rudarske nagrade",
      "prepolovljenjem rudarske nagrade",
    ],
    title: "Prepolovljenje rudarske nagrade",
    description:
      "Događaj u Bitcoin protokolu u kojem se nagrada rudarima za novi blok prepolovi. Time se smanjuje količina novog bitcoina koja ulazi u opticaj.",
  },
  {
    id: "rudarska-ponuda",
    terms: [
      "rudarska ponuda",
      "rudarske ponude",
      "rudarsku ponudu",
      "rudarskom ponudom",
    ],
    title: "Rudarska ponuda",
    description:
      "Novi bitcoin koji rudari dobivaju kroz nagradu za blok i koji se s vremenom može pojaviti na tržištu.",
  },
  {
    id: "kapitalni-tokovi",
    terms: [
      "kapitalni tokovi",
      "kapitalnih tokova",
      "kapitalnim tokovima",
      "kapitalne tokove",
    ],
    title: "Kapitalni tokovi",
    description:
      "Veći ulasci ili izlasci novca iz neke imovine ili tržišta. Kod Bitcoina to mogu biti kupnje preko burzovnih fondova, kompanija, banaka ili drugih velikih sudionika.",
  },
  {
    id: "kreditni-instrument",
    terms: [
      "kreditni instrument",
      "kreditnog instrumenta",
      "kreditnom instrumentu",
      "kreditni instrumenti",
      "kreditnih instrumenata",
      "kreditnim instrumentima",
    ],
    title: "Kreditni instrument",
    description:
      "Vrijednosni papir ili ugovor kojim jedna strana daje kapital, a druga preuzima obvezu plaćanja prinosa ili povrata prema pravilima instrumenta.",
  },
  {
    id: "poluga",
    terms: ["poluga", "poluge", "polugu", "polugom"],
    title: "Poluga",
    description:
      "Korištenje posuđenog novca ili financijskih ugovora kako bi se povećala izloženost kretanju cijene. Poluga može pojačati dobitke, ali i gubitke.",
  },
  {
    id: "alternativne-digitalne-imovine",
    terms: [
      "alternativne digitalne imovine",
      "alternativnih digitalnih imovina",
      "alternativnim digitalnim imovinama",
      "širi svijet digitalnih imovina",
    ],
    title: "Alternativne digitalne imovine",
    description:
      "Digitalna imovina izvan Bitcoina. Može imati različite rizike, izdavatelje, pravila i tržišne poticaje, pa se ne smije miješati s Bitcoinom kao novcem.",
  },
  {
    id: "marginalni-kupac",
    terms: [
      "marginalni kupac",
      "marginalnog kupca",
      "marginalnom kupcu",
      "marginalnim kupcem",
    ],
    title: "Marginalni kupac",
    description:
      "Kupac čija nova kupnja najviše utječe na sljedeću tržišnu cijenu. Kod oskudne imovine mali višak potražnje može snažno pomaknuti cijenu.",
  },
  {
    id: "novac-za-kratke-obveze",
    terms: [
      "novac za kratke obveze",
      "novca za kratke obveze",
      "novcem za kratke obveze",
    ],
    title: "Novac za kratke obveze",
    description:
      "Novac koji treba biti dostupan za poznate obveze u bliskoj budućnosti, primjerice račune, plaće, školarinu, porezne obveze ili druge dogovorene izdatke.",
  },
  {
    id: "tokenizacija",
    terms: ["tokenizacija", "tokenizacije", "tokenizaciju", "tokenizacijom"],
    title: "Tokenizacija",
    description:
      "Prikaz prava na neku imovinu ili vrijednosni papir u digitalnom obliku koji se može prenositi kroz računalne sustave. To nije isto što i Bitcoin.",
  },
  {
    id: "kvantno-racunarstvo",
    terms: [
      "kvantno računarstvo",
      "kvantnog računarstva",
      "kvantnom računarstvu",
      "kvantnim računarstvom",
    ],
    title: "Kvantno računarstvo",
    description:
      "Vrsta računarstva koja bi u budućnosti mogla promijeniti sigurnosne pretpostavke mnogih digitalnih sustava. U vodiču se spominje samo kao udaljeniji tehnološki rizik, ne kao tema za tehnički tekst.",
  },
  {
    id: "broker",
    terms: [
      "brokerski račun",
      "brokerskog računa",
      "broker",
      "brokera",
      "brokeru",
    ],
    title: "Broker",
    description:
      "Posrednik preko kojeg kupujete i držite vrijednosne papire. Može olakšati ulaganje, ali nije isto što i vlastiti Bitcoin novčanik.",
  },
  {
    id: "kapitalna-dobra",
    terms: [
      "kapitalna dobra",
      "kapitalnih dobara",
      "kapitalna imovina",
      "proizvodna imovina",
      "proizvodne imovine",
    ],
    title: "Kapitalna dobra",
    description:
      "Imovina koja bi trebala stvarati budući prihod ili vrijednost. U osobnom Bitcoin standardu razlikuje se od novca i potrošačkih dobara.",
  },
  {
    id: "neto-imovina",
    terms: ["neto imovina", "neto imovine", "neto imovini"],
    title: "Neto imovina",
    description:
      "Ono što stvarno posjedujete nakon što od ukupne imovine oduzmete dugove. Pomaže vidjeti odnos novca, kapitala i potrošačkih dobara.",
  },
  {
    id: "skrbnistvo",
    terms: ["skrbništvo", "skrbništva", "skrbništvu", "skrbništvom"],
    title: "Skrbništvo",
    description:
      "Način čuvanja pristupa Bitcoinu. Može značiti da ključeve držite sami, s drugim osobama ili preko vanjskog skrbnika, uz različite odgovornosti i rizike.",
  },
  {
    id: "volatilnost",
    terms: [
      "volatilnost",
      "volatilnosti",
      "volatilan",
      "volatilna",
      "volatilno",
    ],
    title: "Volatilnost",
    description:
      "Mjera koliko se cijena može brzo i snažno mijenjati. Visoka volatilnost znači da vrijednost može jako rasti, ali i jako padati u kratkom vremenu.",
  },
  {
    id: "burza-mjenjacnica",
    terms: [
      "mjenjačnica",
      "mjenjačnice",
      "mjenjačnici",
      "burza",
      "burze",
      "burzi",
    ],
    title: "Burza ili mjenjačnica",
    description:
      "Mjesto gdje kupujete ili prodajete bitcoin. Dobra je za razmjenu, ali nije nužno dobro mjesto za dugoročno čuvanje većeg iznosa.",
  },
  {
    id: "oporavak",
    terms: ["oporavak", "oporavka", "oporavku", "recovery"],
    title: "Oporavak",
    description:
      "Postupak kojim ponovno dolazite do pristupa novčaniku ako se uređaj izgubi, pokvari ili više nije dostupan.",
  },
  {
    id: "zracni-nacin-rada",
    terms: [
      "airgapped način rada",
      "airgapped potpisnik",
      "airgapped uređaj",
      "airgapped rad",
      "airgapped",
      "air-gapped",
      "air gap",
      "zračni način rada",
      "zračno odvojen",
      "zračno odvojeni",
    ],
    title: "Airgapped",
    description:
      "Airgapped znači da uređaj nije izravno spojen na računalo ili internet. Podaci se obično prenose QR kodom ili memorijskom karticom.",
  },
  {
    id: "qr-kod",
    terms: ["QR kod", "QR koda", "QR kodovi", "QR kodova"],
    title: "QR kod",
    description:
      "Kvadratni slikovni kod koji uređaji mogu skenirati. U Bitcoin sigurnosti često služi za prijenos podataka bez kabela.",
  },
  {
    id: "hardverski-novcanik",
    terms: [
      "hardverski novčanik",
      "hardverskog novčanika",
      "hardverski novčanici",
      "hardverskim novčanicima",
    ],
    title: "Hardverski novčanik",
    description:
      "Poseban uređaj koji čuva ključeve i potpisuje transakcije. Bitcoin nije u uređaju; uređaj čuva mogućnost potpisivanja.",
  },
  {
    id: "potpisivanje-transakcije",
    terms: [
      "potpisivanje transakcije",
      "potpisati transakciju",
      "potpisuje transakciju",
      "potpiše transakciju",
    ],
    title: "Potpisivanje transakcije",
    description:
      "Dokazivanje da imate pravo poslati određeni bitcoin. Kao potpis na nalogu za plaćanje, ali matematički provjerljiv u Bitcoin mreži.",
  },
  {
    id: "nasljedivanje",
    terms: [
      "nasljeđivanje",
      "nasljeđivanja",
      "nasljednik",
      "nasljednici",
      "nasljednicima",
    ],
    title: "Nasljeđivanje",
    description:
      "Plan što se događa s bitcoinom ako vlasnika više nema. Dobar plan mora pomoći obitelji bez toga da svima odmah da pristup svemu.",
  },
  {
    id: "novcana-zaliha",
    terms: [
      "novčana zaliha",
      "novčane zalihe",
      "sigurnosna zaliha",
      "sigurnosne zalihe",
    ],
    title: "Novčana zaliha",
    description:
      "Dio novca koji postoji za sigurnost i buduće potrebe. Smanjuje pritisak da se bitcoin prodaje u lošem trenutku.",
  },
  {
    id: "vrijednosni-papir",
    terms: [
      "vrijednosni papir",
      "vrijednosnog papira",
      "vrijednosni papiri",
      "vrijednosnih papira",
    ],
    title: "Vrijednosni papir",
    description:
      "Financijski instrument poput dionice, ETF-a ili obveznice. Može dati izloženost Bitcoinu, ali nije isto što i bitcoin u vlastitom posjedu.",
  },
  {
    id: "sparrow",
    terms: ["Sparrow"],
    title: "Sparrow",
    description:
      "Bitcoin novčanik za računalo koji podržava vanjske potpisnike i višepotpisne sustave. Nije koordinator u aktualnom Bitcoin Core Standardu ove stranice.",
  },
  {
    id: "bitcoin-blockchain",
    terms: ["Bitcoin blockchain", "blockchain", "lanac blokova"],
    title: "Bitcoin blockchain",
    description:
      "Javna povijest Bitcoin transakcija koju provjeravaju čvorovi. Možete ga zamisliti kao zajedničku knjigu zapisa koju nitko ne smije samovoljno mijenjati.",
  },
  {
    id: "bitcoin-adresa",
    terms: ["Bitcoin adresa", "adrese", "adresu", "adresa"],
    title: "Bitcoin adresa",
    description:
      "Podatak na koji se prima bitcoin. Adresa je kao uputa gdje poslati uplatu, ali nije isto što i privatni ključ.",
  },
  {
    id: "transakcija",
    terms: ["transakcija", "transakcije", "transakciju", "transakcijama"],
    title: "Transakcija",
    description:
      "Zapis kojim se bitcoin premješta s jedne adrese na drugu. Da bi bila valjana, mora biti ispravno potpisana.",
  },
  {
    id: "likvidnost",
    terms: [
      "tržišna likvidnost",
      "tržišne likvidnosti",
      "likvidnost",
      "likvidnosti",
    ],
    title: "Likvidnost",
    description:
      "Koliko brzo i lako nešto možete pretvoriti u novac bez velikog gubitka vrijednosti. Gotovina je obično likvidnija od nekretnine.",
  },
  {
    id: "portfelj",
    terms: ["portfelj", "portfelja", "portfelju"],
    title: "Portfelj",
    description:
      "Skup imovine koju osoba ili obitelj drži. Može uključivati novac, bitcoin, vrijednosne papire, nekretnine i poslovnu imovinu.",
  },
  {
    id: "povlastena-dionica",
    terms: ["povlaštena dionica", "povlaštene dionice", "povlaštenih dionica"],
    title: "Povlaštena dionica",
    description:
      "Vrsta dionice koja obično ima drukčija prava od obične dionice, često vezana uz dividendu. Nije isto što i obveznica i nije bez rizika.",
  },
  {
    id: "obicna-dionica",
    terms: ["obična dionica", "obične dionice", "običnu dionicu"],
    title: "Obična dionica",
    description:
      "Dionica koja predstavlja vlasnički udio u poduzeću. Obično sudjeluje u rastu i padu vrijednosti nakon što se podmire obveze višeg reda.",
  },
  {
    id: "dividenda",
    terms: ["dividenda", "dividende", "dividendi", "dividendu"],
    title: "Dividenda",
    description:
      "Isplata koju kompanija može dati vlasnicima određenih dionica. Nije zajamčena ako uvjeti proizvoda i odluke kompanije to ne dopuštaju.",
  },
  {
    id: "dnevna-dividenda",
    priority: 45,
    terms: [
      "dnevna dividenda",
      "dnevne dividende",
      "dnevnu dividendu",
      "dnevnih dividendi",
    ],
    title: "Dnevna dividenda",
    description:
      "Dividenda koja se obračunava ili najavljuje u kratkom dnevnom ritmu. Takav ritam može promijeniti ponašanje tržišta, ali ne uklanja rizik instrumenta.",
  },
  {
    id: "bilanca",
    priority: 55,
    terms: ["bilanca", "bilance", "bilanci", "bilancom", "bilancu"],
    title: "Bilanca",
    description:
      "Pregled imovine, obveza i kapitala poduzeća ili osobe. Kod Bitcoin instrumenata pokazuje što stoji ispod obećanog prinosa.",
  },
  {
    id: "bitcoin-riznica",
    priority: 55,
    terms: [
      "Bitcoin riznica",
      "Bitcoin riznice",
      "Bitcoin riznicom",
      "Bitcoin riznicu",
      "poduzeće s Bitcoin riznicom",
      "poduzeća s Bitcoin riznicom",
    ],
    title: "Bitcoin riznica",
    description:
      "Bitcoin koji poduzeće drži kao važan dio svoje imovine. Dionica takvog poduzeća nije isto što i bitcoin pod osobnom kontrolom.",
  },
  {
    id: "nominalna-vrijednost",
    priority: 50,
    terms: [
      "nominalna vrijednost",
      "nominalne vrijednosti",
      "nominalnoj vrijednosti",
      "nominalnu vrijednost",
    ],
    title: "Nominalna vrijednost",
    description:
      "Vrijednost zapisana u pravilima instrumenta. Tržišna cijena se može kretati oko nje, iznad nje ili ispod nje.",
  },
  {
    id: "agio",
    priority: 55,
    terms: ["agio", "agija", "agiju", "agijem"],
    title: "Agio",
    description:
      "Razlika između cijene po kojoj se instrument izdaje ili kupuje i njegove nominalne vrijednosti. U ovom vodiču 1.020 USD cijene u odnosu na 1.000 USD nominale znači agio od 2%.",
  },
  {
    id: "izdavatelj",
    priority: 45,
    terms: ["izdavatelj", "izdavatelja", "izdavatelju", "izdavateljem"],
    title: "Izdavatelj",
    description:
      "Poduzeće ili institucija koja izdaje vrijednosni papir. Kupac instrumenta preuzima dio rizika da izdavatelj neće ispuniti očekivanja ili obveze.",
  },
  {
    id: "kapitalna-struktura",
    priority: 50,
    terms: [
      "kapitalna struktura",
      "kapitalne strukture",
      "kapitalnoj strukturi",
      "kapitalnom strukturom",
      "kapitalnu strukturu",
    ],
    title: "Kapitalna struktura",
    description:
      "Način na koji je poduzeće financirano: obične dionice, povlaštene dionice, dug, pričuve i druga prava na novac poduzeća.",
  },
  {
    id: "trzista-kapitala",
    priority: 45,
    terms: [
      "tržišta kapitala",
      "tržištima kapitala",
      "tržište kapitala",
      "tržištu kapitala",
    ],
    title: "Tržišta kapitala",
    description:
      "Sustav kroz koji poduzeća prikupljaju novac izdavanjem dionica, duga ili drugih instrumenata. Pristup tom sustavu može nestati u stresu.",
  },
  {
    id: "zalog",
    priority: 45,
    terms: ["zalog", "zaloga", "založen", "založeni Bitcoin", "založiti"],
    title: "Zalog",
    description:
      "Imovina dana kao osiguranje za obvezu. Ako se obveza ne ispuni, založena imovina može morati biti prodana ili preuzeta.",
  },
  {
    id: "neoptereceni-bitcoin",
    priority: 50,
    terms: [
      "neopterećeni Bitcoin",
      "neopterećenom Bitcoinu",
      "neopterećenog Bitcoina",
      "neopterećen",
      "neopterećeni bitcoin",
    ],
    title: "Neopterećeni Bitcoin",
    description:
      "Bitcoin koji nije založen za dug ili drugu obvezu. Takav Bitcoin daje veću fleksibilnost u stresnom razdoblju.",
  },
  {
    id: "zid-dospijeca",
    priority: 50,
    terms: ["zid dospijeća", "zida dospijeća", "zidu dospijeća"],
    title: "Zid dospijeća",
    description:
      "Velik budući rok u kojem dospijevaju obveze. Ako dođe u lošem trenutku, može stvoriti pritisak na bilancu.",
  },
  {
    id: "omjer-pojacane-izlozenosti",
    priority: 60,
    terms: [
      "omjer pojačane izloženosti",
      "omjera pojačane izloženosti",
      "omjerom pojačane izloženosti",
    ],
    title: "Omjer pojačane izloženosti",
    description:
      "Pokušaj mjerenja koliko je dionica ili instrument osjetljiviji na Bitcoin od same pasivne Bitcoin imovine u pozadini.",
  },
  {
    id: "digitalni-kredit",
    priority: 45,
    terms: ["digitalni kredit", "digitalnog kredita", "digitalnim kreditom"],
    title: "Digitalni kredit",
    description:
      "Dužnički instrument podržan bilancom u kojoj važnu ulogu ima digitalna imovina, ovdje Bitcoin. Nije isto što i Bitcoin.",
  },
  {
    id: "duznicki-instrument",
    priority: 45,
    terms: [
      "dužnički instrument",
      "dužničkog instrumenta",
      "dužnički instrumenti",
      "dužničkih instrumenata",
    ],
    title: "Dužnički instrument",
    description:
      "Instrument u kojem izdavatelj preuzima obvezu plaćanja ili povrata prema pravilima ugovora. Kupac preuzima rizik da obveza neće biti ispunjena kako očekuje.",
  },
  {
    id: "kreditni-rizik",
    priority: 45,
    terms: ["kreditni rizik", "kreditnog rizika", "kreditnim rizikom"],
    title: "Kreditni rizik",
    description:
      "Rizik da druga strana neće moći ili neće htjeti ispuniti svoju obvezu plaćanja, povrata ili održavanja pravila instrumenta.",
  },
  {
    id: "stresno-ispitivanje",
    priority: 45,
    terms: [
      "stresno ispitivanje",
      "stresnog ispitivanja",
      "stresnom ispitivanju",
      "stresno ispitati",
    ],
    title: "Stresno ispitivanje",
    description:
      "Provjera što se događa u lošem scenariju prije nego što se panika stvarno dogodi. Ne predviđa krizu, nego testira otpornost.",
  },
  {
    id: "novcana-pricuva",
    priority: 45,
    terms: ["novčana pričuva", "novčane pričuve", "novčanom pričuvom"],
    title: "Novčana pričuva",
    description:
      "Dio novca koji je odvojen za obveze, sigurnost ili razdoblje bez novog kapitala. Smanjuje pritisak na prodaju imovine.",
  },
  {
    id: "pricuva-za-dividende",
    priority: 50,
    terms: [
      "pričuva za dividende",
      "pričuve za dividende",
      "pričuvom za dividende",
    ],
    title: "Pričuva za dividende",
    description:
      "Novac odvojen za moguće isplate dividendi. Postojanje pričuve ne znači da je isplata sigurna, ali smanjuje kratkoročni pritisak.",
  },
  {
    id: "oportunitetni-trosak",
    priority: 45,
    terms: [
      "oportunitetni trošak",
      "oportunitetnog troška",
      "oportunitetnim troškom",
    ],
    title: "Oportunitetni trošak",
    description:
      "Vrijednost onoga čega se odričete kada odaberete jednu mogućnost umjesto druge. Kod Bitcoina se često mjeri izgubljenom kupovnom moći.",
  },
  {
    id: "komparativna-prednost",
    priority: 45,
    terms: [
      "komparativna prednost",
      "komparativne prednosti",
      "komparativnom prednošću",
      "komparativnu prednost",
    ],
    title: "Komparativna prednost",
    description:
      "Područje u kojem možete stvarati vrijednost bolje ili s manjim troškom od drugih mogućnosti koje su vam dostupne.",
  },
  {
    id: "proracun-nulte-osnove",
    priority: 45,
    terms: [
      "proračun nulte osnove",
      "proračuna nulte osnove",
      "proračunu nulte osnove",
      "proračunom nulte osnove",
    ],
    title: "Proračun nulte osnove",
    description:
      "Način vođenja novca u kojem svaki euro dobiva namjenu prije nego što se potroši, daruje, čuva ili pretvori u Bitcoin.",
  },
  {
    id: "povrat-izrazen-u-bitcoinu",
    priority: 55,
    terms: [
      "povrat izražen u Bitcoinu",
      "povrata izraženog u Bitcoinu",
      "povratom izraženim u Bitcoinu",
    ],
    title: "Povrat izražen u Bitcoinu",
    description:
      "Način mjerenja ishoda prema količini bitcoina ili kupovnoj moći u Bitcoinu, a ne samo prema eurima ili dolarima.",
  },
  {
    id: "sata",
    priority: 60,
    terms: ["SATA", "SATA-e", "SATA-u"],
    title: "SATA",
    description:
      "Oznaka financijskog instrumenta spomenutog kao primjer. Nije Bitcoin i treba ga procjenjivati prema pravilima izdavatelja, bilanci i riziku.",
  },
  {
    id: "dca",
    terms: ["DCA"],
    title: "DCA",
    description:
      "Kupnja istog iznosa u pravilnim razmacima, primjerice svaki mjesec. Može smanjiti potrebu za pogađanjem cijene, ali ne rješava proračun ni sigurnost.",
  },
  {
    id: "strategy",
    terms: ["Strategy", "Strategyja", "Strategyju", "Strategyjem"],
    title: "Strategy",
    description:
      "Javna kompanija koja drži veliku Bitcoin riznicu i izdaje vrijednosne papire povezane sa svojom kapitalnom strukturom.",
  },
  {
    id: "mstr",
    terms: ["MSTR"],
    title: "MSTR",
    description:
      "Burzovna oznaka dionice tvrtke Strategy. To je dionica kompanije, a ne bitcoin.",
  },
  {
    id: "strc",
    terms: ["STRC", "Stretch"],
    title: "STRC",
    description:
      "Financijski instrument tvrtke Strategy. Može biti povezan s Bitcoin tezom, ali nije bitcoin, nije novac i nosi rizik izdavatelja.",
  },
  {
    id: "debian",
    terms: ["Debian"],
    title: "Debian",
    description:
      "Linux operativni sustav poznat po stabilnosti i predvidljivosti. U Bitcoin sustavu često ima smisla za računalo koje dugo radi kao poslužitelj.",
  },
  {
    id: "linux-mint",
    terms: ["Linux Mint"],
    title: "Linux Mint",
    description:
      "Linux operativni sustav s grafičkim sučeljem. Prikladnost za namjenski Bitcoin uređaj ovisi o provjeri instalacije, podršci i sposobnosti korisnika da ga održava.",
  },
  {
    id: "ubuntu-server",
    terms: ["Ubuntu Server"],
    title: "Ubuntu Server",
    description:
      "Poslužiteljska verzija Ubuntu Linuxa. Može pokretati Bitcoin Core, ali izbor distribucije ne zamjenjuje provjeru instalacije i održavanje sustava.",
  },
  {
    id: "fedora-server",
    terms: ["Fedora Server"],
    title: "Fedora Server",
    description:
      "Linux sustav za poslužitelje koji brže uvodi novije verzije softvera. Može biti dobar izbor za tehnički sigurniju osobu.",
  },
  {
    id: "start9",
    terms: ["Start9"],
    title: "Start9",
    description:
      "Gotov sustav za pokretanje vlastitog Bitcoin nodea i povezanih usluga. Jednostavniji je za početak, ali i dalje traži razumijevanje što se pokreće.",
  },
  {
    id: "umbrel",
    terms: ["Umbrel"],
    title: "Umbrel",
    description:
      "Gotov kućni poslužiteljski sustav s aplikacijama za Bitcoin i druge usluge. Može olakšati početak, ali nije zamjena za razumijevanje sigurnosti.",
  },
  {
    id: "thinkpad",
    terms: ["ThinkPad", "ThinkPada", "ThinkPadu"],
    title: "ThinkPad",
    description:
      "Lenovova poslovna linija laptopa, često dobro podržana na Linuxu. Marka sama po sebi nije sigurnosna preporuka; konkretan uređaj treba provjeriti.",
  },
  {
    id: "lenovo-mini-pc",
    terms: ["Lenovo mini PC"],
    title: "Lenovo mini PC",
    description:
      "Malo stolno računalo poslovne klase. Može pokretati Bitcoin Core node, ali nije zadani uređaj niti jamstvo sigurnosti.",
  },
  {
    id: "coldcard",
    terms: ["COLDCARD Q", "COLDCARD", "COLDCARD Mk4"],
    title: "COLDCARD",
    description:
      "Specijalizirani Bitcoin hardverski novčanik. Ova neutralna definicija nije aktualna preporuka za glavni dugoročni sustav ove stranice.",
  },
  {
    id: "bitbox02",
    terms: ["BitBox02 Bitcoin-only", "BitBox02", "BitBox"],
    title: "BitBox02 Bitcoin-only",
    description:
      "Specijalizirani Bitcoin hardverski novčanik. Ova neutralna definicija nije aktualna preporuka za glavni dugoročni sustav ove stranice.",
  },
  {
    id: "passport-core",
    terms: [
      "Foundation Passport Core",
      "Passport Core",
      "Passport",
      "Foundation",
    ],
    title: "Foundation Passport Core",
    description:
      "Specijalizirani Bitcoin hardverski novčanik koji može razmjenjivati podatke QR kodovima. Nije dio aktualnog Bitcoin Core Standarda ove stranice.",
  },
  {
    id: "blockstream-jade-plus",
    terms: ["Blockstream Jade Plus", "Jade Plus", "Jade"],
    title: "Blockstream Jade Plus",
    description:
      "Specijalizirani Bitcoin hardverski novčanik. Ova neutralna definicija nije aktualna preporuka za glavni dugoročni sustav ove stranice.",
  },
  {
    id: "specter-diy",
    terms: ["Specter DIY"],
    title: "Specter DIY",
    description:
      "Potpisni uređaj koji se više oslanja na ručno sastavljanje i provjeru. Ova neutralna definicija nije aktualna preporuka za glavni dugoročni sustav ove stranice.",
  },
  {
    id: "seedsigner",
    terms: ["SeedSigner"],
    title: "SeedSigner",
    description:
      "Potpisni uređaj koji početne riječi obično ne sprema trajno na sam uređaj. Ova neutralna definicija nije aktualna preporuka za glavni dugoročni sustav ove stranice.",
  },
  {
    id: "halving",
    terms: ["halving", "halvinga", "halvingom"],
    title: "Halving",
    description:
      "Prepolovljenje nagrade koju rudari dobivaju za novi Bitcoin blok. Događa se otprilike svake četiri godine i smanjuje količinu novih bitcoina koji ulaze u optjecaj.",
  },
  {
    id: "trzisno-dno",
    terms: ["tržišno dno", "tržišnog dna", "tržišna dna", "dno", "dna"],
    title: "Tržišno dno",
    description:
      "Razina cijene nakon koje se, gledano unatrag, pokazalo da je završio veći pad. U stvarnom vremenu ga nije moguće pouzdano znati.",
  },
  {
    id: "trzisni-vrh",
    terms: ["tržišni vrh", "tržišnog vrha", "tržišni vrhovi", "vrh"],
    title: "Tržišni vrh",
    description:
      "Razina cijene nakon koje se, gledano unatrag, pokazalo da je završio veći rast. U stvarnom vremenu ga nije moguće pouzdano znati.",
  },
  {
    id: "ciklus",
    terms: ["ciklus", "ciklusa", "ciklusi", "ciklusima"],
    title: "Ciklus",
    description:
      "Ponavljajući obrazac rasta, pada i oporavka cijene. Koristan je kao kontekst, ali nije zakon.",
  },
  {
    id: "povijesni-vrh",
    terms: ["povijesni vrh", "povijesnog vrha"],
    title: "Povijesni vrh",
    description: "Najviša cijena koju je Bitcoin do tada dosegnuo.",
  },
  {
    id: "pricuva",
    terms: ["pričuva", "pričuvu", "pričuve", "pričuvom"],
    title: "Pričuva",
    description:
      "Novac odvojen za kratkoročne obveze, nepredviđene troškove i sigurnost. Smanjuje pritisak da se bitcoin prodaje u lošem trenutku.",
  },
  {
    id: "proracun",
    terms: ["proračun", "proračuna", "proračunu", "proračunom"],
    title: "Proračun",
    description:
      "Sustav kojim se unaprijed određuje namjena novca prije trošenja, štednje ili kupnje Bitcoina.",
  },
  {
    id: "vremenski-horizont",
    terms: [
      "vremenski horizont",
      "vremenskog horizonta",
      "vremenskim horizontom",
    ],
    title: "Vremenski horizont",
    description:
      "Razdoblje kroz koje osoba može držati Bitcoin bez prisile na prodaju.",
  },
  {
    id: "pravila-kupnje",
    terms: ["pravila kupnje", "pravilima kupnje", "pravila za kupnju"],
    title: "Pravila kupnje",
    description:
      "Unaprijed definirana pravila koja određuju kada, koliko i kojim novcem osoba kupuje Bitcoin.",
  },
  {
    id: "bull-market",
    terms: ["bull market", "bull marketa"],
    title: "Bull market",
    description: "Razdoblje snažnog rasta cijene i optimizma na tržištu.",
  },
  {
    id: "bear-market",
    terms: ["bear market", "bear marketa"],
    title: "Bear market",
    description: "Razdoblje snažnog pada cijene i pesimizma na tržištu.",
  },
  {
    id: "fiat-novac",
    terms: ["fiat novac", "fiat novcu", "fiat novca"],
    title: "Fiat novac",
    description:
      "Državni novac koji nije vezan uz zlato ili drugu robu, nego se temelji na zakonskoj prisili i povjerenju u izdavatelja.",
  },
]
