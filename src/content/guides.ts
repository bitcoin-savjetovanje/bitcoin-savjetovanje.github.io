import { PRIMARY_CTA } from "./site"

export type GuideSection = {
  heading: string
  body: string[]
}

export type Guide = {
  slug: string
  title: string
  metaDescription: string
  excerpt: string
  publishedAt: string
  updatedAt: string
  practicalQuestion: string
  relatedSlugs: string[]
  sections: GuideSection[]
  finalCta: string
}

export const guides: Guide[] = [
  {
    slug: "stvarni-visak",
    title: "Što je stvarni višak i zašto ga većina ljudi krivo procjenjuje?",
    metaDescription:
      "Praktičan vodič za razumijevanje stvarnog viška prije odluka o Bitcoinu: osobni proračun, dug, obveze, sigurnosna rezerva i neto imovina.",
    excerpt:
      "Višak nije ono što ostane na računu na kraju mjeseca. Stvarni višak postoji tek nakon obveza, rizika, likvidnosti i plana.",
    publishedAt: "2026-04-30",
    updatedAt: "2026-04-30",
    practicalQuestion:
      "Koji trošak, obvezu ili rizik najčešće zaboravite kada mislite da imate višak?",
    relatedSlugs: [
      "uskladivanje-kupovne-moci-bitcoina",
      "dug-ili-bitcoin",
      "dca-nije-dovoljan",
    ],
    sections: [
      {
        heading: "Višak nije stanje na računu",
        body: [
          "Mnogi ljudi o Bitcoinu razmišljaju tek kad vide da na računu postoji novac koji trenutno nije potrošen. To je razumljivo, ali nije dovoljno precizno. Stanje na računu može izgledati kao višak iako iza njega stoje obveze koje tek dolaze: porezi, rata kredita, školarina, veći servis, obiteljska pomoć, zdravstveni trošak ili planirana kupnja.",
          "Stvarni višak je iznos koji ostaje nakon što su poznati redovni troškovi, kratkoročne obveze, dugovi, sigurnosna rezerva i veće potrebe koje su dovoljno vjerojatne da ih ne treba ignorirati. Tek tada ima smisla razgovarati o dodatnoj akumulaciji Bitcoina.",
        ],
      },
      {
        heading: "Zašto ljudi precjenjuju višak",
        body: [
          "Najčešća pogreška je gledati samo prihod i trenutne troškove, bez kalendara obveza. Druga pogreška je tretirati kreditne kartice, minuse i kratkoročne dugove kao odvojenu temu. Treća je pretpostaviti da će budući prihodi uvijek dolaziti istim ritmom.",
          "U okviru Praktičnog Bitcoin standarda višak se ne definira osjećajem, nego redoslijedom. Prvo se vidi novčani tok. Zatim se razumiju dugovi i obveze. Nakon toga se određuje novčana zaliha za miran život i nepredviđene događaje. Tek preostali iznos može biti kandidat za Bitcoin odluke.",
        ],
      },
      {
        heading: "Višak mora preživjeti loš mjesec",
        body: [
          "Ako odluka ima smisla samo u idealnom mjesecu, okvir je preslab. Stvarni višak mora uzeti u obzir da se prihod može smanjiti, trošak povećati, a obitelj ili posao tražiti više likvidnosti nego inače. To ne znači da se odluke moraju odgađati zauvijek. Znači da ih treba donositi iz jasnije slike.",
          "Za nekoga je razumno povećati izloženost Bitcoinu. Za nekoga je razumnije prvo smanjiti skupi dug. Za nekoga je najbolji korak urediti sigurnosnu rezervu. Isti iznos novca nema isto značenje kod osobe bez duga i kod osobe s velikim kratkoročnim obvezama.",
        ],
      },
      {
        heading: "Od pitanja do pravila",
        body: [
          "Korisno pitanje nije samo: koliko mogu kupiti? Bolje pitanje je: koji dio mogu usmjeriti prema Bitcoinu bez ugrožavanja obveza, mira i sposobnosti da plan održim kroz vrijeme?",
          "Kada je višak definiran na taj način, odluke postaju mirnije. Ne kupujete zato što se bojite da propuštate priliku, nego zato što se odluka uklapa u osobni proračun, dug, neto imovinu i dugoročna pravila.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
  {
    slug: "bitcoin-u-neto-imovini",
    title: "Kako uklopiti Bitcoin u neto imovinu?",
    metaDescription:
      "Kako promatrati Bitcoin unutar ukupne neto imovine bez izoliranog gledanja cijene, impulsa ili tuđih pravila.",
    excerpt:
      "Bitcoin ne treba promatrati odvojeno od ostatka života. Važan je odnos prema novcu, dugu, kapitalu, potrošnji i sigurnosti.",
    publishedAt: "2026-04-30",
    updatedAt: "2026-04-30",
    practicalQuestion:
      "Koliki udio vaše ukupne neto imovine Bitcoin čini danas i znate li zašto je baš takav?",
    relatedSlugs: [
      "stvarni-visak",
      "uskladivanje-kupovne-moci-bitcoina",
      "novac-kapital-potrosnja",
    ],
    sections: [
      {
        heading: "Neto imovina je početna mapa",
        body: [
          "Bitcoin odluke postaju nejasne kad se Bitcoin promatra izolirano. Osoba može imati značajan iznos Bitcoina, ali i velik dug, nestabilan prihod ili slabu likvidnost. Druga osoba može imati manji iznos Bitcoina, ali čistu bilancu, stabilan novčani tok i dovoljno vremena.",
          "Neto imovina pomaže da se Bitcoin vidi u odnosu na cjelinu: novac, nekretnine, poslovnu imovinu, dugove, potrošačka dobra, buduće obveze i sigurnosne rezerve. Bez te mape pitanje 'koliko Bitcoina' ostaje previše apstraktno.",
        ],
      },
      {
        heading: "Bitcoin kao novac, ne samo pozicija",
        body: [
          "Praktični Bitcoin standard polazi od ideje da Bitcoin nije samo nešto što se kupi i zaboravi, nego novac koji s vremenom može mijenjati odnos prema štednji, potrošnji i kapitalu. To ne znači da svatko treba imati isti udio izloženosti. Znači da odluka mora biti povezana s osobnim financijskim sustavom.",
          "Ako Bitcoin čini velik dio neto imovine, važna su pravila sigurnosti, trošenja i pristupa. Ako čini mali dio, možda je važnije razumjeti zašto je tako i što bi promjena značila za obveze, likvidnost i mir.",
        ],
      },
      {
        heading: "Ciljani raspon je korisniji od jedne brojke",
        body: [
          "Jedna točna brojka često zvuči odlučno, ali u stvarnosti je krhka. Prihod se mijenja. Troškovi se mijenjaju. Cijena Bitcoina se mijenja. Životne okolnosti se mijenjaju. Zato je korisnije definirati ciljani raspon izloženosti i pravila kada se plan preispituje.",
          "Raspon ne služi tome da se stalno reagira na tržište. Služi tome da znate kada je izloženost očito izvan vlastitog okvira, kada je bolje čekati, kada ima smisla akumulirati i kada je važnije riješiti drugi dio financijske slike.",
        ],
      },
      {
        heading: "Neto imovina povezuje odluku i odgovornost",
        body: [
          "Kada znate gdje Bitcoin stoji u neto imovini, lakše je objasniti odluku sebi, partneru ili obitelji. Odluka više nije odvojena od osobnog proračuna, duga i sigurnosti. Postaje dio pisanog okvira.",
          "To je svrha savjetovanja: ne donijeti odluku umjesto vas, nego pomoći da odluka bude razumljiva, održiva i povezana sa stvarnom situacijom.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
  {
    slug: "dug-ili-bitcoin",
    title: "Kada prvo riješiti dug, a kada akumulirati Bitcoin?",
    metaDescription:
      "Vodič za mirnije razmišljanje o dugu i Bitcoinu: kamata, rokovi, likvidnost, psihologija i osobni okvir odluka.",
    excerpt:
      "Dug i Bitcoin ne mogu se promatrati odvojeno. Kamata, rok, obiteljske obveze i sigurnosna rezerva mijenjaju odluku.",
    publishedAt: "2026-04-30",
    updatedAt: "2026-04-30",
    practicalQuestion:
      "Koji dug najviše smanjuje vaš prostor za mirnu Bitcoin odluku?",
    relatedSlugs: [
      "stvarni-visak",
      "bitcoin-u-neto-imovini",
      "dca-nije-dovoljan",
    ],
    sections: [
      {
        heading: "Dug mijenja značenje viška",
        body: [
          "Novac koji izgleda kao višak ne znači isto ako istovremeno postoji skup dug, kratki rok ili obveza koja nosi stres. Dug ima financijsku, ali i psihološku cijenu. On smanjuje prostor za grešku i može natjerati osobu da prodaje Bitcoin u lošem trenutku.",
          "Zato se u metodi Praktičnog Bitcoin standarda dug gleda rano. Prije razgovora o većoj izloženosti treba razumjeti vrstu duga, kamatu, rokove, mjesečnu opterećenost i posljedice ako prihod oslabi.",
        ],
      },
      {
        heading: "Nije svaki dug isti",
        body: [
          "Kratkoročni potrošački dug s visokom kamatom nije isto što i dugoročni kredit s niskom ratom i stabilnim prihodom. Dug koji prijeti likvidnosti nije isto što i dug koji je pod kontrolom. Zbog toga univerzalno pravilo može biti opasno.",
          "Pitanje nije 'dug ili Bitcoin' u apstraktnom smislu. Pitanje je: koji dug, pod kojim uvjetima, uz kakav prihod, kakvu rezervu i kakav cilj? Tek tada se može razgovarati o razumnom redoslijedu.",
        ],
      },
      {
        heading: "Kad je razduživanje prvi korak",
        body: [
          "Prvo razduživanje često ima smisla kada dug nosi visoku kamatu, kad stvara stalni stres, kad smanjuje sposobnost držanja kroz volatilnost ili kad postoji rizik da će vas obveze prisiliti na lošu prodaju. U takvom slučaju akumulacija Bitcoina može izgledati racionalno, ali sustav je slab.",
          "Smanjenje duga može povećati slobodu odlučivanja. To ne znači odustajanje od Bitcoina. Znači jačanje temelja prije većeg koraka.",
        ],
      },
      {
        heading: "Kad akumulacija može imati smisla",
        body: [
          "Akumulacija može imati smisla ako je dug pod kontrolom, likvidnost postoji, novčani tok je stabilan i jasno je koji dio novca nije potreban za kratkoročne obveze. I tada odluka treba biti povezana s rasponom izloženosti i pravilima preispitivanja.",
          "Cilj nije pronaći savršenu formulu. Cilj je smanjiti improvizaciju. Ako znate zašto prvo rješavate dug ili zašto dio viška ide u Bitcoin, lakše je ostati dosljedan kada se tržište ili život promijene.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
  {
    slug: "dca-nije-dovoljan",
    title: "Zašto redovita kupnja nije dovoljna ako nemate osobni proračun?",
    metaDescription:
      "Redovita kupnja može biti korisna navika, ali bez osobnog proračuna ne odgovara na pitanja stvarnog viška, duga, novčane zalihe i sigurnosti.",
    excerpt:
      "Automatska kupnja može smanjiti impulzivnost, ali ne zamjenjuje osobni proračun, pravila i razumijevanje neto imovine.",
    publishedAt: "2026-04-30",
    updatedAt: "2026-04-30",
    practicalQuestion:
      "Znate li zašto je vaš trenutni iznos redovite kupnje baš takav i kada bi se trebao promijeniti?",
    relatedSlugs: [
      "stvarni-visak",
      "uskladivanje-kupovne-moci-bitcoina",
      "bitcoin-u-neto-imovini",
    ],
    sections: [
      {
        heading: "Redovita kupnja rješava samo dio problema",
        body: [
          "Redovita kupnja istog iznosa može pomoći jer uklanja dio potrebe za pogađanjem trenutka kupnje. To je korisno. Ali redovita kupnja ne odgovara na pitanje je li iznos prikladan za vašu situaciju. Ne zna imate li dug. Ne zna dolazi li veća obveza. Ne zna kolika je sigurnosna rezerva.",
          "Zato redovita kupnja bez osobnog proračuna može postati automatizirana improvizacija. Izgleda disciplinirano, ali možda se temelji na pogrešno procijenjenom višku.",
        ],
      },
      {
        heading: "Osobni proračun daje mjeru",
        body: [
          "Osobni proračun ne mora biti kompliciran. Njegova je svrha pokazati koliko novca stvarno ulazi, koliko izlazi, koje su obveze fiksne, koji troškovi su promjenjivi i gdje postoji prostor za odluke. Bez toga iznos redovite kupnje često nastaje iz osjećaja.",
          "U okviru Praktičnog Bitcoin standarda prvo se traži jasna financijska slika. Tek nakon toga redovita kupnja dobiva smisao: znate zašto je iznos baš takav, što se mora dogoditi da ga povećate, smanjite ili zaustavite.",
        ],
      },
      {
        heading: "Redovita kupnja ne zamjenjuje pravila za životne promjene",
        body: [
          "Što ako prihod padne? Što ako se pojavi dug? Što ako Bitcoin naraste toliko da čini velik dio neto imovine? Što ako obitelj treba likvidnost? Sama navika kupnje ne daje odgovore na ta pitanja.",
          "Zato je potreban osobni okvir: kada kupujete, kada čekate, kada preispitujete plan i što ne dirate bez obzira na tržišnu buku. Redovita kupnja može biti dio tog sustava, ali ne cijeli sustav.",
        ],
      },
      {
        heading: "Dobra navika treba dobar kontekst",
        body: [
          "Redovita akumulacija može biti mirna i korisna kada se uklapa u osobni proračun, dug, neto imovinu i sigurnosni model. Bez tog konteksta ista navika može proizvoditi stres ili skrivati problem.",
          "Pravo pitanje nije je li redovita kupnja dobra ili loša. Pitanje je imate li dovoljno jasnu sliku da znate zašto je koristite, koliko dugo, kojim iznosom i pod kojim uvjetima se odluka mijenja.",
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
      "Ako Bitcoin ima ozbiljnu ulogu u vašoj neto imovini, promjena njegove kupovne moći nije samo tržišna vijest. Ona utječe na osobni proračun, odljeve, priljeve, sigurnosnu rezervu i pravila odlučivanja.",
    publishedAt: "2026-04-30",
    updatedAt: "2026-04-30",
    practicalQuestion:
      "Kada bi se kupovna moć vašeg Bitcoina promijenila za 20 %, biste li znali koje kategorije osobnog proračuna treba prilagoditi?",
    relatedSlugs: [
      "stvarni-visak",
      "bitcoin-u-neto-imovini",
      "dca-nije-dovoljan",
    ],
    sections: [
      {
        heading: "Promjena cijene nije isto što i odluka",
        body: [
          "Većina ljudi promjenu cijene Bitcoina promatra kao tržišni događaj. Ako cijena raste, javlja se osjećaj da treba nešto učiniti prije nego prilika prođe. Ako cijena pada, javlja se strah da se plan raspada. U oba slučaja odluka se lako počne donositi prema osjećaju, a ne prema pravilima.",
          "Praktični Bitcoin standard polazi od drukčijeg pitanja. Ne pita prvo hoće li Bitcoin rasti ili padati. Pita kako se promjena kupovne moći Bitcoina odražava na osobni proračun, odljeve, priljeve i neto imovinu.",
          "To je važna razlika. Ako Bitcoin gledate samo kao imovinu odvojenu od svakodnevnog života, promjena cijene izgleda kao vanjski događaj. Ali ako Bitcoin ima ulogu novca, novčane zalihe ili važnog dijela neto imovine, tada promjena kupovne moći mora ući u osobni proračun.",
          "Usklađivanje kupovne moći znači da ne pokušavate pogoditi tržište. Umjesto toga redovito provjeravate koliko stvarne kupovne moći imate i prema tome prilagođavate raspored novca po kategorijama.",
        ],
      },
      {
        heading: "Kupovna moć važnija je od samog iznosa",
        body: [
          "Količina Bitcoina koju imate važna je, ali sama po sebi ne govori dovoljno. Jednaka količina Bitcoina u dva različita trenutka može pokrivati vrlo različitu količinu životnih troškova.",
          "Ako Bitcoin koji imate pokriva šest mjeseci vaših odljeva, vaša je situacija drukčija nego ako isti Bitcoin pokriva dvije godine odljeva. Broj u novčaniku može biti isti, ali kupovna moć nije ista.",
          "Zato se u Praktičnom Bitcoin standardu pozornost ne stavlja samo na količinu Bitcoina, nego na odnos između Bitcoina, osobnog proračuna i stvarnih životnih troškova.",
          "To ne znači da svaku promjenu cijene treba pretvoriti u odluku. Upravo suprotno. Cilj je izbjeći stalno reagiranje. Ali da biste mogli ne reagirati impulzivno, morate znati što se zapravo promijenilo.",
          "Pitanje nije samo koliko Bitcoin vrijedi. Pitanje je koliko vaših stvarnih odljeva taj Bitcoin sada pokriva. Ako ne znate svoje prosječne mjesečne odljeve, ne možete ozbiljno odgovoriti na to pitanje.",
        ],
      },
      {
        heading: "Usklađivanje počinje osobnim proračunom",
        body: [
          "Osobni proračun nije samo popis troškova. U ovom okviru proračun je način da svaka jedinica novca dobije namjenu prije nego bude potrošena. Tek tada možete znati što je stvarni višak, što je obveza, što je sigurnosna rezerva i koji dio novca smije biti izložen promjeni kupovne moći Bitcoina.",
          "Ako nemate osobni proračun, promjena cijene Bitcoina lako postaje emocionalni događaj. Rast može stvoriti osjećaj bogatstva koji još nije raspoređen ni provjeren. Pad može stvoriti osjećaj gubitka koji možda ne ugrožava nijednu stvarnu obvezu.",
          "Usklađivanje kupovne moći uvodi red u obje situacije. Kada se kupovna moć Bitcoina promijeni, ne postavljate prvo pitanje treba li kupiti ili prodati. Prvo gledate proračunske kategorije.",
          "To mogu biti stanovanje, hrana, prijevoz, davanje, zdravstveni troškovi, poslovni troškovi, sigurnosna rezerva, budući veći izdaci i dugoročni ciljevi. Ako Bitcoin čini dio vaše novčane zalihe, tada promjena njegove kupovne moći znači da treba provjeriti jesu li te kategorije i dalje stvarne.",
          "Ako je ukupna kupovna moć pala, možda imate više raspoređenih obveza nego što stvarno možete pokriti. Ako je porasla, možda imate višak koji još nema namjenu. U oba slučaja osobni proračun treba ponovno uskladiti.",
        ],
      },
      {
        heading: "Što raditi kad kupovna moć pada",
        body: [
          "Pad kupovne moći Bitcoina ne mora automatski značiti da je plan pogrešan. Ali mora otkriti koliko je plan otporan.",
          "Prvo pitanje nije trebate li prodati prije većeg pada. Prvo pitanje je koji odljevi sada stvaraju pritisak. Ako imate dug, visoke obvezne troškove, kratkoročne rokove ili nejasnu sigurnosnu rezervu, pad kupovne moći može brzo prijeći iz psihološkog problema u stvarni problem.",
          "Zato se u padu najprije gledaju odljevi. Koji su troškovi nužni? Koji su odgođeni troškovi sada postali neodrživi? Koje kategorije treba smanjiti? Koja potrošnja je nastala iz navike, a ne iz stvarne potrebe?",
          "Drugo pitanje su priljevi. Ako se kupovna moć smanjuje, nije dovoljno samo rezati troškove. Treba pitati može li se povećati prihod, poboljšati usluga koju pružate, prodati više vrijednog rada ili bolje organizirati vrijeme.",
          "Treće pitanje je dug. Dug u padu kupovne moći postaje posebno težak jer traži odljeve neovisno o vašoj trenutnoj situaciji. Ako dug postoji, može vas natjerati na prodaju Bitcoina upravo onda kada to ne želite.",
          "U padu kupovne moći ne trebate tražiti savršenu tržišnu odluku. Trebate provjeriti možete li smanjiti odljeve, povećati priljeve i ostati unutar vlastitih pravila.",
        ],
      },
      {
        heading: "Što raditi kad kupovna moć raste",
        body: [
          "Rast kupovne moći često je opasniji nego što se čini. Pad stvara strah, ali rast može stvoriti osjećaj da je sve dopušteno. Osoba može početi trošiti bez jasnog pravila, povećati životni stil, zadužiti se jer se osjeća bogatije ili dodatno povećavati izloženost Bitcoinu bez osobnog proračuna.",
          "U Praktičnom Bitcoin standardu rast kupovne moći nije poziv na impulzivnost. On je prilika da se budući odljevi bolje planiraju.",
          "Ako znate svoje prosječne mjesečne troškove, rast kupovne moći može vam pokazati koliko budućih mjeseci možete pokriti. Tada se višak ne mora odmah pretvoriti u veću potrošnju. Može se rasporediti u kategorije koje smanjuju budući pritisak.",
          "Dio budućih troškova možda se može platiti unaprijed. Neke potrepštine možda se mogu kupiti kada je kupovna moć veća. Dugoročni troškovi stanovanja, prijevoza, opreme, zdravlja ili poslovanja mogu se planirati mirnije ako imate podatke iz osobnog proračuna.",
          "To ne znači da uvijek treba trošiti Bitcoin kada raste. Znači da rast kupovne moći treba ući u osobni proračun. Ako imate dodatnu kupovnu moć, ona treba dobiti namjenu. Bez namjene, lako se pretvara u osjećaj bogatstva koji potiče loše odluke.",
          "Najvažnije pitanje u rastu nije kako iskoristiti još veći rast. Najvažnije pitanje je koje buduće odljeve sada možete riješiti ili smanjiti bez narušavanja dugoročnog okvira.",
        ],
      },
      {
        heading: "Zašto ovo nije pogađanje trenutka kupnje ili prodaje",
        body: [
          "Usklađivanje kupovne moći nije pokušaj pogađanja vrha ili dna. To je način da osobni proračun ostane istinit.",
          "Kada pokušavate pogoditi tržište, odluka ovisi o pretpostavci što će cijena napraviti. Kada usklađujete kupovnu moć, odluka ovisi o vlastitim podacima: prihodima, odljevima, dugu, obvezama, sigurnosnoj rezervi, neto imovini i pravilima koja ste unaprijed zapisali.",
          "Zato ovaj okvir smanjuje potrebu za stalnim praćenjem cijene. Cijena može biti povod za provjeru, ali ne mora biti gospodar odluke. Pravila su važnija od osjećaja.",
          "Dobro pravilo može biti jednostavno. Ako se kupovna moć promijeni za određeni prag, pregledavate osobni proračun. Ako kupovna moć padne, prvo gledate odljeve, priljeve i dug. Ako kupovna moć poraste, prvo raspoređujete višak u buduće obveze i važne kategorije.",
          "Ne mijenjate dugoročni plan samo zato što se tržište snažno pomaknulo. Plan preispitujete tek kada se promijenio vaš stvarni životni okvir.",
        ],
      },
      {
        heading: "Kako zapisati vlastito pravilo usklađivanja",
        body: [
          "Dobar osobni okvir ne mora biti složen. Može početi s nekoliko jasnih rečenica.",
          "Prvo zapišite koje kategorije osobnog proračuna ovise o kupovnoj moći Bitcoina. To mogu biti kratkoročni troškovi, sigurnosna rezerva, davanje, budući veći izdaci ili dio neto imovine koji promatrate kao novčanu zalihu.",
          "Drugo, zapišite prag za provjeru. Ne morate ništa mijenjati zbog svake male promjene. Ali možete odlučiti da ćete osobni proračun pregledati kada se kupovna moć promijeni za 10 %, 20 % ili neki drugi prag koji odgovara vašoj situaciji.",
          "Treće, zapišite redoslijed postupanja. Kod pada: pregled odljeva, pregled priljeva, provjera duga, provjera sigurnosne rezerve. Kod rasta: raspored viška, planiranje budućih odljeva, provjera neto imovine i provjera je li potrošnja i dalje u skladu s vašim vrijednostima.",
          "Četvrto, zapišite što nećete raditi. Nećete donositi odluku samo zato što vas je cijena uplašila. Nećete povećati potrošnju samo zato što se osjećate bogatije. Nećete koristiti dug kako biste pojačali izloženost Bitcoinu. Nećete dirati sigurnosni ili skrbnički sustav bez posebnog pravila.",
          "Tek kada je to zapisano, promjena kupovne moći postaje upravljiv dio osobnog sustava, a ne stalni izvor napetosti.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
  {
    slug: "obiteljski-pristup-bitcoinu",
    title: "Kako obitelj može pristupiti Bitcoinu ako vam se nešto dogodi?",
    metaDescription:
      "Siguran obiteljski pristup Bitcoinu bez naivnog dijeljenja osjetljivih podataka ili ostavljanja obitelji bez plana.",
    excerpt:
      "Skrbništvo nije uređeno dok pouzdana osoba ne zna što postoji, gdje tražiti upute i kako ne napraviti štetu.",
    publishedAt: "2026-04-30",
    updatedAt: "2026-04-30",
    practicalQuestion:
      "Bi li osoba od povjerenja znala što napraviti, a što nikada ne napraviti, ako vam se nešto dogodi?",
    relatedSlugs: [
      "bitcoin-u-neto-imovini",
      "novac-kapital-potrosnja",
      "stvarni-visak",
    ],
    sections: [
      {
        heading: "Sigurnost nije samo zaštita od krađe",
        body: [
          "Kod Bitcoina ljudi često razmišljaju o krađi, hardverskim novčanicima i osjetljivim podacima. To je važno, ali nije cijela sigurnost. Postoji i drugi rizik: da nitko osim vas ne zna kako pristupiti sredstvima ako vam se nešto dogodi.",
          "Dobar sustav mora čuvati Bitcoin od napadača, ali i omogućiti razuman pristup u izvanrednim okolnostima. Ako obitelj ne zna da Bitcoin postoji, gdje su upute ili koga smije kontaktirati, sustav nije dovršen.",
        ],
      },
      {
        heading: "Ne dijelite osjetljive podatke bez plana",
        body: [
          "Rješenje nije jednostavno poslati osjetljive podatke partneru, članu obitelji ili prijatelju. Time se mogu otvoriti novi rizici: slučajno brisanje, fotografiranje, spremanje u oblak, prijevara, pogrešna aplikacija ili panika u trenutku kada je najvažnije biti oprezan.",
          "Bolji pristup počinje dokumentiranjem: što postoji, koji je opći model čuvanja, gdje su fizičke upute, tko su pouzdane osobe i što se nikada ne smije napraviti. Detalji ovise o iznosu, tehničkoj sposobnosti obitelji i postojećem sigurnosnom modelu.",
        ],
      },
      {
        heading: "Operativne upute moraju biti razumljive",
        body: [
          "Ako upute razumijete samo vi, one nisu obiteljski plan. Potrebno je napisati ih jezikom koji osoba od povjerenja može slijediti pod stresom. Upute ne moraju otkrivati sve tajne na jednom mjestu, ali moraju jasno objasniti redoslijed koraka.",
          "Korisno je odvojiti informaciju da Bitcoin postoji od informacija koje omogućuju pristup. Također je važno navesti što ne raditi: ne unositi riječi u web stranicu, ne slati fotografije, ne odgovarati na poruke nepoznatih osoba i ne žuriti.",
        ],
      },
      {
        heading: "Skrbništvo je dio financijskog plana",
        body: [
          "Obiteljski pristup nije dodatak koji se rješava kasnije. Ako Bitcoin čini važan dio neto imovine, skrbništvo i nasljeđivanje moraju biti dio istog okvira kao osobni proračun, dug i izloženost.",
          "Savjetovanje ne znači da netko drugi drži vaše ključeve. Naprotiv: cilj je da vi razumijete i kontrolirate sustav, a da obitelj ne ostane bez puta ako vas nema ili niste dostupni.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
  {
    slug: "novac-kapital-potrosnja",
    title: "Bitcoin kao novac, kapital i potrošnja: praktičan okvir",
    metaDescription:
      "Kako razmišljati o Bitcoinu kroz novac, kapital i potrošnju bez špekulativnog jezika i bez univerzalnih pravila.",
    excerpt:
      "Bitcoin odluke postaju jasnije kada razlikujete novac za likvidnost, kapital za budućnost i potrošnju koju svjesno birate.",
    publishedAt: "2026-04-30",
    updatedAt: "2026-04-30",
    practicalQuestion:
      "Koji dio vašeg Bitcoina je likvidnost, koji dio je dugoročni kapital, a koji dio biste svjesno mogli potrošiti?",
    relatedSlugs: [
      "bitcoin-u-neto-imovini",
      "uskladivanje-kupovne-moci-bitcoina",
      "stvarni-visak",
    ],
    sections: [
      {
        heading: "Tri različite uloge novca",
        body: [
          "U stvarnom životu novac nema samo jednu funkciju. Dio novca služi za likvidnost i obveze. Dio je kapital koji čuva mogućnost budućih odluka. Dio se troši na život, obitelj, rad, zdravlje i vrijednosti. Problem nastaje kad se sve te uloge pomiješaju.",
          "Bitcoin može ući u svaku od tih tema, ali ne na isti način. Bitcoin koji čuvate kao dugoročnu štednju nije isto što i novac za sljedeća tri mjeseca troškova. Bitcoin koji možda nikad ne želite dirati nije isto što i iznos koji biste mogli koristiti za veću životnu odluku.",
        ],
      },
      {
        heading: "Kapital nije samo broj",
        body: [
          "Kapital je sposobnost da zadržite opcije kroz vrijeme. Može biti u poslu, nekretnini, znanju, mreži odnosa ili Bitcoinu. Kada Bitcoin promatrate kao dio kapitala, pitanje više nije samo koliko vrijedi danas, nego koju ulogu ima u vašoj budućoj slobodi odlučivanja.",
          "To ne znači da svaku potrošnju treba izbjegavati. Potrošnja može biti dobra kada je svjesna, kada ne ruši sigurnost i kada je usklađena s vrijednostima. Praktični Bitcoin standard zato ne promatra štednju, kapital i potrošnju kao moralne etikete, nego kao odluke koje treba razumjeti.",
        ],
      },
      {
        heading: "Pravila smanjuju tržišnu buku",
        body: [
          "Ako nemate pravila, cijena lako postane glavni izvor odluka. Rast stvara pritisak da morate reagirati. Pad stvara sumnju. Tuđa mišljenja popunjavaju prazninu. Pravila vraćaju odluku u vaš životni kontekst.",
          "Korisna pravila mogu definirati koji dio Bitcoina je dugoročna štednja, kada se može koristiti, kada se plan preispituje, koji dio neto imovine želite držati u Bitcoinu i što mora biti zadovoljeno prije dodatne akumulacije.",
        ],
      },
      {
        heading: "Okvir prije zaključka",
        body: [
          "Nema jedne razine izloženosti koja vrijedi za sve. Osoba s dugovima, nestabilnim prihodom i obiteljskim obvezama ne treba isti okvir kao osoba s čistom bilancom i visokom novčanom zalihom. Zato se zaključak ne smije preskočiti preko osobnog proračuna, duga i neto imovine.",
          "Kada razlikujete novac, kapital i potrošnju, Bitcoin prestaje biti izolirano pitanje. Postaje dio šireg sustava odluka koji možete objasniti i koristiti kroz vrijeme.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
]

export function guideHref(slug: string) {
  return `/vodici/${slug}/`
}

export const guideRoutes = guides.map((guide) => guideHref(guide.slug))

export function findGuide(slug: string | undefined) {
  return guides.find((guide) => guide.slug === slug)
}
