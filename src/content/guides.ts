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
  relatedSlugs: string[]
  sections: GuideSection[]
  finalCta: string
}

export const guides: Guide[] = [
  {
    slug: "stvarni-visak",
    title: "Što je stvarni višak i zašto ga većina ljudi krivo procjenjuje?",
    metaDescription:
      "Praktičan vodič za razumijevanje stvarnog viška prije odluka o Bitcoinu: budžet, dug, obveze, sigurnosna rezerva i neto imovina.",
    excerpt:
      "Višak nije ono što ostane na računu na kraju mjeseca. Stvarni višak postoji tek nakon obveza, rizika, likvidnosti i plana.",
    publishedAt: "2026-04-30",
    updatedAt: "2026-04-30",
    relatedSlugs: [
      "bitcoin-u-neto-imovini",
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
          "U Practical Bitcoin Standard okviru višak se ne definira osjećajem, nego redoslijedom. Prvo se vidi novčani tok. Zatim se razumiju dugovi i obveze. Nakon toga se određuje likvidnost za miran život i nepredviđene događaje. Tek preostali iznos može biti kandidat za Bitcoin odluke.",
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
        heading: "Praktično pitanje",
        body: [
          "Korisno pitanje nije samo: koliko mogu kupiti? Bolje pitanje je: koji dio mogu usmjeriti prema Bitcoinu bez ugrožavanja obveza, mira i sposobnosti da plan održim kroz vrijeme?",
          "Kada je višak definiran na taj način, odluke postaju mirnije. Ne kupujete zato što se bojite da propuštate priliku, nego zato što se odluka uklapa u budžet, dug, neto imovinu i dugoročna pravila.",
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
    relatedSlugs: [
      "stvarni-visak",
      "novac-kapital-potrosnja",
      "dug-ili-bitcoin",
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
          "Practical Bitcoin Standard polazi od ideje da Bitcoin nije samo nešto što se kupi i zaboravi, nego novac koji s vremenom može mijenjati odnos prema štednji, potrošnji i kapitalu. To ne znači da svatko treba imati isti udio izloženosti. Znači da odluka mora biti povezana s osobnim financijskim sustavom.",
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
          "Kada znate gdje Bitcoin stoji u neto imovini, lakše je objasniti odluku sebi, partneru ili obitelji. Odluka više nije odvojena od budžeta, duga i sigurnosti. Postaje dio pisanog okvira.",
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
          "Zato se u Practical Bitcoin Standard metodi dug gleda rano. Prije razgovora o većoj izloženosti treba razumjeti vrstu duga, kamatu, rokove, mjesečnu opterećenost i posljedice ako prihod oslabi.",
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
    title: "Zašto DCA nije dovoljan ako nemate budžet?",
    metaDescription:
      "DCA može biti korisna navika, ali bez budžeta ne odgovara na pitanja stvarnog viška, duga, likvidnosti i sigurnosti.",
    excerpt:
      "Automatska kupnja može smanjiti impulzivnost, ali ne zamjenjuje budžet, pravila i razumijevanje neto imovine.",
    publishedAt: "2026-04-30",
    updatedAt: "2026-04-30",
    relatedSlugs: [
      "stvarni-visak",
      "dug-ili-bitcoin",
      "bitcoin-u-neto-imovini",
    ],
    sections: [
      {
        heading: "DCA rješava samo dio problema",
        body: [
          "DCA, odnosno redovita kupnja istog iznosa, može pomoći jer uklanja dio potrebe za pogađanjem trenutka kupnje. To je korisno. Ali DCA ne odgovara na pitanje je li iznos prikladan za vašu situaciju. Ne zna imate li dug. Ne zna dolazi li veća obveza. Ne zna kolika je sigurnosna rezerva.",
          "Zato DCA bez budžeta može postati automatizirana improvizacija. Izgleda disciplinirano, ali možda se temelji na pogrešno procijenjenom višku.",
        ],
      },
      {
        heading: "Budžet daje mjeru",
        body: [
          "Budžet ne mora biti kompliciran. Njegova je svrha pokazati koliko novca stvarno ulazi, koliko izlazi, koje su obveze fiksne, koji troškovi su promjenjivi i gdje postoji prostor za odluke. Bez toga DCA iznos često nastaje iz osjećaja.",
          "U Practical Bitcoin Standard okviru prvo se traži jasna financijska slika. Tek nakon toga redovita kupnja dobiva smisao: znate zašto je iznos baš takav, što se mora dogoditi da ga povećate, smanjite ili zaustavite.",
        ],
      },
      {
        heading: "DCA ne zamjenjuje pravila za životne promjene",
        body: [
          "Što ako prihod padne? Što ako se pojavi dug? Što ako Bitcoin naraste toliko da čini velik dio neto imovine? Što ako obitelj treba likvidnost? Sama navika kupnje ne daje odgovore na ta pitanja.",
          "Zato je potreban osobni okvir: kada kupujete, kada čekate, kada preispitujete plan i što ne dirate bez obzira na tržišnu buku. DCA može biti dio tog sustava, ali ne cijeli sustav.",
        ],
      },
      {
        heading: "Dobra navika treba dobar kontekst",
        body: [
          "Redovita akumulacija može biti mirna i korisna kada se uklapa u budžet, dug, neto imovinu i sigurnosni model. Bez tog konteksta ista navika može proizvoditi stres ili skrivati problem.",
          "Pravo pitanje nije je li DCA dobar ili loš. Pitanje je imate li dovoljno jasnu sliku da znate zašto ga koristite, koliko dugo, kojim iznosom i pod kojim uvjetima se odluka mijenja.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
  {
    slug: "obiteljski-pristup-bitcoinu",
    title: "Kako obitelj može pristupiti Bitcoinu ako vam se nešto dogodi?",
    metaDescription:
      "Siguran obiteljski pristup Bitcoinu bez dijeljenja seed phrasea naivno ili ostavljanja obitelji bez plana.",
    excerpt:
      "Skrbništvo nije uređeno dok pouzdana osoba ne zna što postoji, gdje tražiti upute i kako ne napraviti štetu.",
    publishedAt: "2026-04-30",
    updatedAt: "2026-04-30",
    relatedSlugs: [
      "bitcoin-u-neto-imovini",
      "novac-kapital-potrosnja",
      "stvarni-visak",
    ],
    sections: [
      {
        heading: "Sigurnost nije samo zaštita od krađe",
        body: [
          "Kod Bitcoina ljudi često razmišljaju o krađi, hardverskim novčanicima i seed phraseu. To je važno, ali nije cijela sigurnost. Postoji i drugi rizik: da nitko osim vas ne zna kako pristupiti sredstvima ako vam se nešto dogodi.",
          "Dobar sustav mora čuvati Bitcoin od napadača, ali i omogućiti razuman pristup u izvanrednim okolnostima. Ako obitelj ne zna da Bitcoin postoji, gdje su upute ili koga smije kontaktirati, sustav nije dovršen.",
        ],
      },
      {
        heading: "Ne dijelite seed phrase bez plana",
        body: [
          "Rješenje nije jednostavno poslati seed phrase partneru, članu obitelji ili prijatelju. Time se mogu otvoriti novi rizici: slučajno brisanje, fotografiranje, spremanje u oblak, phishing, pogrešna aplikacija ili panika u trenutku kada je najvažnije biti oprezan.",
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
          "Obiteljski pristup nije dodatak koji se rješava kasnije. Ako Bitcoin čini važan dio neto imovine, skrbništvo i nasljeđivanje moraju biti dio istog okvira kao budžet, dug i izloženost.",
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
    relatedSlugs: [
      "bitcoin-u-neto-imovini",
      "stvarni-visak",
      "obiteljski-pristup-bitcoinu",
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
          "To ne znači da svaku potrošnju treba izbjegavati. Potrošnja može biti dobra kada je svjesna, kada ne ruši sigurnost i kada je usklađena s vrijednostima. Practical Bitcoin Standard zato ne promatra štednju, kapital i potrošnju kao moralne etikete, nego kao odluke koje treba razumjeti.",
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
          "Nema jedne razine izloženosti koja vrijedi za sve. Osoba s dugovima, nestabilnim prihodom i obiteljskim obvezama ne treba isti okvir kao osoba s čistom bilancom i visokom likvidnošću. Zato se zaključak ne smije preskočiti preko budžeta, duga i neto imovine.",
          "Kada razlikujete novac, kapital i potrošnju, Bitcoin prestaje biti izolirano pitanje. Postaje dio šireg sustava odluka koji možete objasniti i koristiti kroz vrijeme.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
]

export const guideRoutes = guides.map((guide) => `/vodici/${guide.slug}`)

export function findGuide(slug: string | undefined) {
  return guides.find((guide) => guide.slug === slug)
}
