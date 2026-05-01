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
      "Vodič o tome kako osobni proračun, dug, novčana zaliha i buduće obveze određuju što je stvarni višak za mirnije Bitcoin odluke kroz vrijeme.",
    excerpt:
      "Stvarni višak ne nastaje zato što novac stoji na računu. Nastaje tek kada svaki euro ima namjenu kroz vrijeme.",
    publishedAt: "2026-04-30",
    updatedAt: "2026-04-30",
    practicalQuestion:
      "Koji trošak, obvezu ili rizik najčešće zaboravite kada mislite da imate višak?",
    relatedSlugs: [
      "uskladivanje-kupovne-moci-bitcoina",
      "dca-nije-dovoljan",
      "dug-ili-bitcoin",
    ],
    sections: [
      {
        heading: "Višak nije stanje na računu",
        body: [
          "Novac koji trenutačno stoji na računu može izgledati kao višak, ali to ne znači da je stvarno slobodan. Možda iza njega već stoji rata kredita, porezna obveza, veći popravak, trošak zdravlja, školarina, obiteljska pomoć ili mjesec u kojem prihod neće doći istim ritmom. Ako se gleda samo današnje stanje, lako je zamijeniti privremenu novčanu zalihu za stvarni višak.",
          "U okviru Praktičnog Bitcoin standarda, odluka o Bitcoinu ne počinje pitanjem koliko kupiti, nego pitanjem što novac već mora obaviti. Stvarni višak postoji tek nakon što su poznati prihodi, redovni troškovi, dugovi, budući odljevi i sigurnosna zaliha. Tek tada iznos koji ostane može postati kandidat za kupnju, čekanje, trošenje ili drugo pravilo.",
          "Najjednostavnija provjera glasi: ako bi taj novac nestao iz računa danas, biste li za dva ili tri mjeseca morali dirati dug, prodavati Bitcoin ili odgoditi važnu obvezu? Ako je odgovor da, taj novac još nije višak. On već ima posao, samo ga još niste imenovali.",
        ],
      },
      {
        heading: "Svaki euro treba namjenu",
        body: [
          "Osobni proračun nulte osnove ne znači da se sve mora potrošiti. Znači da svaki euro dobiva zadatak prije nego što nestane u nejasnoj kategoriji viška. Jedan euro može služiti za stanovanje, drugi za hranu, treći za dug, četvrti za darivanje, peti za sigurnosnu zalihu, a tek nakon toga neki euro može biti slobodan za Bitcoin odluku.",
          "Bez te namjene, višak često nastaje iz dojma. Čitatelj vidi novac na računu i zaključi da može kupiti više Bitcoina, a zatim ga nekoliko tjedana poslije iznenadi očekivani trošak koji nije bio zapisan. Proračun ne uklanja neizvjesnost, ali smanjuje samozavaravanje. On pokazuje koji je novac već zauzet, koji čeka poznatu obvezu, a koji se stvarno može rasporediti.",
          "Namjena ne mora biti složena. Dovoljno je zapisati glavne skupine: životni troškovi, dug, kratkoročne obveze, sigurnosna zaliha, darivanje, veće planirane potrebe i Bitcoin odluke. Već takav zapis često pokaže da je navodni višak manji, ali i pouzdaniji. Manji stvarni višak bolji je od većeg iznosa koji postoji samo na papiru.",
        ],
      },
      {
        heading: "Novac treba gledati kroz vrijeme",
        body: [
          "Dobar proračun ne promatra samo jedan mjesec. Gleda i ono što dolazi za tri, šest ili dvanaest mjeseci. Godišnje osiguranje, porez, školski troškovi, održavanje doma, oprema za posao ili planirani odmor nisu iznenađenja ako ih unaprijed vidite. Ako ih ne vidite, pojavit će se kao razlog za neplanirano zaduživanje ili prodaju Bitcoina u lošem trenutku.",
          "Zato stvarni višak nije samo pitanje iznosa, nego i vremena. Isti iznos može biti višak ako ga ne trebate godinu dana, a može biti potreban novac ako za dva mjeseca dolazi velika obveza. Bitcoin odluka koja ne poštuje vremenski raspored osobnog novca lako postaje krhka, iako je u trenutku donošenja izgledala razumno.",
          "Koristan postupak je zapisati buduće odljeve prije nego što odlučite o kupnji. Ako znate da će u rujnu doći veći obiteljski trošak, dio današnjeg novca možda pripada rujnu. Tako proračun prestaje biti samo popis prošlih troškova i postaje alat za odluke koje još nisu došle na naplatu.",
        ],
      },
      {
        heading: "Starost novca i mirnije odluke",
        body: [
          "Jedna od korisnih navika Praktičnog Bitcoin standarda jest povećavati starost novca. To znači da današnje troškove ne plaćate novcem koji je tek stigao, nego starijim novcem koji je već prošao kroz proračun. Što je novac stariji, to je manje pritiska da svaka uplata odmah riješi nekoliko problema odjednom.",
          "Za Bitcoin odluke to je važno jer smanjuje panične poteze. Ako živite od uplate do uplate, svaka promjena cijene ili troška snažnije utječe na vas. Ako imate veću novčanu zalihu, jasne kategorije i poznate buduće odljeve, lakše je čekati, kupovati prema pravilima ili ne dirati Bitcoin koji ne želite trošiti.",
          "Starost novca nije natjecanje, nego mjera disanja. Pokazuje koliko vremena imate prije nego što vas sljedeći trošak natjera na odluku. Što je taj prostor veći, to je lakše razlikovati stvarnu potrebu od tržišne buke. Tada Bitcoin može ostati dio plana, a ne prva stvar koja se dira kada mjesec postane tijesan.",
        ],
      },
      {
        heading: "Kako ovo mijenja odluku o Bitcoinu",
        body: [
          "Kada je višak jasno definiran, pitanje više nije samo imate li novca za kupnju. Pitanje postaje: koji dio novca može ići u Bitcoin bez ugrožavanja obveza, sigurnosti, obitelji i sposobnosti da plan izdržite kroz promjene cijene? Takvo pitanje ne daje isti odgovor svakoj osobi, ali daje čvršći početak razgovora.",
          "Nekome će stvarni višak pokazati da može povećati redovitu kupnju. Nekome će pokazati da prvo treba smanjiti dug. Nekome će pokazati da novčana zaliha nije dovoljna. Cilj nije dobiti univerzalnu brojku, nego pisano pravilo koje možete objasniti sebi i obitelji: kada kupujem, kada čekam, što ne diram i kada preispitujem plan.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
  {
    slug: "bitcoin-u-neto-imovini",
    title: "Kako uklopiti Bitcoin u neto imovinu?",
    metaDescription:
      "Kako promatrati Bitcoin u neto imovini kroz novac, potrošnju, kapital, dug, sigurnost i osobna pravila, bez univerzalnih naredbi ili pritiska.",
    excerpt:
      "Bitcoin ne stoji izvan ostatka imovine. Njegova uloga postaje jasnija kada znate što je novac, što je potrošnja, a što kapital.",
    publishedAt: "2026-04-30",
    updatedAt: "2026-04-30",
    practicalQuestion:
      "Koliki dio vaše ukupne neto imovine Bitcoin čini danas i znate li zašto je baš takav?",
    relatedSlugs: [
      "stvarni-visak",
      "uskladivanje-kupovne-moci-bitcoina",
      "novac-kapital-potrosnja",
    ],
    sections: [
      {
        heading: "Bitcoin nije odvojen od ostatka imovine",
        body: [
          "Bitcoin odluke postaju nejasne kada se Bitcoin promatra kao zaseban svijet. Iznos na novčaniku može izgledati velik ili malen, ali njegovo značenje ovisi o ostatku života: dugu, prihodima, obiteljskim obvezama, novčanoj zalihi, nekretnini, poslu, znanju, vremenskom okviru i sposobnosti da ne reagirate na svaku promjenu cijene.",
          "Neto imovina daje početnu sliku. Ona ne pokazuje samo što posjedujete, nego i što dugujete. Kada od imovine oduzmete obveze, dobivate jasniji pogled na stvarni položaj. Tek tada se može razumno pitati koju ulogu Bitcoin ima: je li novac za očuvanje kupovne moći, dugoročni kapital, dio buduće potrošnje ili kombinacija tih uloga.",
          "Praktičan početak je popisati sve važne dijelove neto imovine bez uljepšavanja. Bitcoin, novac na računu, nekretnine, poslovna imovina, oprema, potrošna dobra i dugovi trebaju biti u istoj slici. Tek kada su zajedno, vidite je li Bitcoin premalen, prevelik, nejasan ili samo neobjašnjen u odnosu na ostatak života.",
        ],
      },
      {
        heading: "Tri uloge imovine",
        body: [
          "Praktični Bitcoin standard razlikuje tri velike uloge imovine: novac, potrošna dobra i kapitalna ili proizvodna dobra. Novac služi za prijenos vrijednosti kroz vrijeme i odluke. Potrošna dobra služe izravnom korištenju i često imaju trošak održavanja. Kapitalna dobra mogu stvarati vrijednost, prihod ili mogućnosti kroz vrijeme.",
          "Ova podjela pomaže jer ista stvar može izgledati kao imovina, ali imati vrlo različit učinak na vaš život. Automobil može biti potrošno dobro ako samo stvara trošak, a može biti potreban alat za posao. Nekretnina može pružati sigurnost, ali i vezati previše kapitala. Bitcoin se u tom okviru ponajprije promatra kao novac, no njegov udio treba gledati u odnosu na sve ostalo.",
          "Ako te uloge ne razlikujete, lako je uspoređivati stvari koje nisu usporedive. Možete se pitati zašto nemate više Bitcoina, a zapravo je problem prevelik trošak vlasništva. Možete misliti da imate dovoljno kapitala, a zapravo imate imovinu koja ne stvara vrijednost i teško se pretvara u novac kada zatreba.",
        ],
      },
      {
        heading: "Zašto jedna brojka nije dovoljna",
        body: [
          "Ljudi često traže jednu točnu brojku: koliki dio neto imovine treba biti u Bitcoinu. Takav odgovor zvuči uredno, ali može biti pogrešan. Osoba bez duga, s velikom novčanom zalihom i stabilnim prihodom nema istu polaznu točku kao osoba s obiteljskim obvezama, neizvjesnim poslom i kratkoročnim dugom.",
          "Zato je korisnije razmišljati o ciljanom rasponu nego o jednoj krutoj brojci. Raspon dopušta da život ima svoje promjene, ali i dalje daje granice. Ako Bitcoin padne ispod raspona, možda se otvara prostor za kupnju. Ako naraste daleko iznad njega, možda ne treba odmah reagirati, ali treba znati što se tada preispituje: sigurnost, obitelj, dug, potrošnja ili pravila držanja.",
          "Raspon treba biti povezan s vašom sposobnošću da izdržite promjene. Ako vas veći udio Bitcoina čini nemirnima i tjera na stalno gledanje cijene, možda raspon nije usklađen s vašim životom. Ako je udio malen, a stvarni višak postoji, možda odluka traži jasnije pravilo redovite kupnje.",
        ],
      },
      {
        heading: "Pravilo trećina kao okvir, ne naredba",
        body: [
          "U okviru Praktičnog Bitcoin standarda, pravilo trećina služi kao način provjere ravnoteže. Ono promatra odnos između novčanih dobara, kapitalnih ili proizvodnih dobara i potrošnih dobara. Ne treba ga čitati kao naredbu da svaka osoba mora imati isti udio Bitcoina, nekretnine ili bilo koje druge imovine.",
          "Vrijednost tog pravila je u pitanju koje postavlja: je li moja neto imovina previše nagnuta u jednu stranu? Možda imate mnogo imovine koja stvara trošak, a premalo novčane zalihe. Možda imate Bitcoin, ali nemate obiteljski pristup i sigurnosni red. Možda imate kapital, ali i dug koji smanjuje slobodu. Pravilo služi za provjeru, ne za slijepo kopiranje.",
          "Kada ga koristite kao ogledalo, pravilo trećina može biti vrlo korisno. Ne govori vam točno što morate kupiti ili prodati. Pokazuje gdje treba postaviti bolja pitanja. Ako jedna skupina imovine preuzima previše prostora, možda treba usporiti, čekati, smanjiti dug ili bolje opisati svrhu postojećeg Bitcoina.",
        ],
      },
      {
        heading: "Kada preispitati udio Bitcoina",
        body: [
          "Udio Bitcoina u neto imovini ne treba preispitivati svaki dan. Prečesto gledanje cijene lako vodi u nemir. Razumnije je unaprijed odrediti uvjete: veća promjena prihoda, novi dug, prodaja imovine, rođenje djeteta, promjena posla, veliki rast ili pad cijene, promjena sigurnosnog modela ili nova obiteljska odgovornost.",
          "Tada se ne pitate samo treba li kupiti ili prodati. Pitate se je li cijeli sustav još uvijek razumljiv. Znate li zašto je Bitcoin na toj razini? Možete li to objasniti partneru ili obitelji? Možete li držati plan ako se kupovna moć snažno promijeni? Ako odgovor nije jasan, problem nije cijena, nego nedostatak osobnog okvira.",
          "Preispitivanje ne mora značiti promjenu. Ponekad je najbolji zaključak da ne dirate ništa. Ali i tada je korisno znati zašto ne dirate ništa. Mirna odluka o čekanju jednako je vrijedna kao odluka o kupnji ako proizlazi iz neto imovine, proračuna i pisanih pravila.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
  {
    slug: "dug-ili-bitcoin",
    title: "Kada prvo riješiti dug, a kada kupovati Bitcoin?",
    metaDescription:
      "Vodič o dugu kao budućem odljevu koji utječe na slobodu držanja Bitcoina, osobni proračun, novčanu zalihu i odluke kroz vrijeme bez moraliziranja.",
    excerpt:
      "Dug nije samo kamatna stopa. Dug je budući odljev koji može smanjiti slobodu držanja Bitcoina kroz teške mjesece.",
    publishedAt: "2026-04-30",
    updatedAt: "2026-04-30",
    practicalQuestion:
      "Bi li vas postojeći dug mogao prisiliti da prodate Bitcoin u trenutku kad to ne želite?",
    relatedSlugs: [
      "stvarni-visak",
      "bitcoin-u-neto-imovini",
      "dca-nije-dovoljan",
    ],
    sections: [
      {
        heading: "Dug je odljev iz budućnosti",
        body: [
          "Dug nije samo iznos u tablici niti samo kamatna stopa. Dug je obećanje da će budući prihod već imati tuđu namjenu. Kada danas živite od novca koji tek trebate zaraditi, smanjujete prostor za mirne odluke. To posebno dolazi do izražaja kada razmišljate o Bitcoinu, jer Bitcoin traži sposobnost čekanja, držanja i preživljavanja promjena cijene.",
          "Praktični Bitcoin standard ima snažan stav protiv života u dugu zato što dug oslabljuje osobni sustav. Ne radi se o moraliziranju. Radi se o tome da dug stvara stalni odljev, a stalni odljev smanjuje slobodu. Ako već znate da će dio budućeg novca otići na obvezu, tada današnji prividni višak možda nije stvarni višak.",
          "Zato dug ulazi u razgovor prije iznosa kupnje. Prvo treba znati koliko duga postoji, koja je cijena tog duga, kada dospijeva i koliko vam mjesečno uzima prostora. Tek nakon toga ima smisla pitati koliki dio novca može ići prema Bitcoinu bez povećanja krhkosti cijelog sustava.",
        ],
      },
      {
        heading: "Zašto dug smanjuje slobodu držanja Bitcoina",
        body: [
          "Bitcoin može imati velike promjene cijene u kratkom razdoblju. Ako nemate dug, novčanu zalihu i jasne obveze, takve promjene mogu biti neugodne, ali ne moraju odmah ugroziti život. Ako uz Bitcoin imate skup dug, malu zalihu i kratak rok, ista promjena može vas prisiliti na potez koji ne biste odabrali u mirnijim okolnostima.",
          "Zato pitanje nije samo može li očekivani rast nadmašiti kamatu. Takvo razmišljanje preskače važan dio stvarnosti: prihod može zakasniti, trošak može narasti, posao se može promijeniti, a obitelj može trebati novac. Dug smanjuje vrijeme koje imate na raspolaganju. Bitcoin odluka koja ovisi o savršenim okolnostima nije dovoljno jaka.",
          "Dug također mijenja psihologiju držanja. Osoba bez duga može lakše reći da neće dirati Bitcoin. Osoba pod pritiskom obveza često nema taj luksuz. Zato se sloboda držanja ne mjeri samo uvjerenjem, nego i proračunom. Ako proračun ne može izdržati loš mjesec, ni uvjerenje možda neće biti dovoljno.",
        ],
      },
      {
        heading: "Rastuće tržište može prikriti slabosti duga",
        body: [
          "U rastućem tržištu dug se često čini manje opasnim. Vrijednost Bitcoina raste, raspoloženje je bolje, a odluke koje su rizične izgledaju pametno. Problem je što rast može sakriti slabu strukturu. Osoba može povećavati ulogu Bitcoina u neto imovini, a da pritom ne vidi kako se gomilaju obveze, kratki rokovi ili manjak novčane zalihe.",
          "Tada uspjeh ne dolazi nužno iz dobrog okvira, nego iz povoljnog okruženja. Ako se okruženje promijeni, ostaje pitanje: biste li istu odluku mogli izdržati bez rasta cijene? Ako je odgovor ne, dug možda upravlja vašom Bitcoin odlukom više nego što se čini.",
          "Rastuće tržište zato nije dovoljno dobra provjera. Ono može nagraditi i loše navike. Bolja provjera je pitanje biste li isti dug, isti iznos kupnje i isti proračun prihvatili kada cijena ne bi rasla mjesecima. Ako odgovor postane neugodan, vrijeme je za oprezniji redoslijed.",
        ],
      },
      {
        heading: "Padajuće tržište može dug učiniti bolnim",
        body: [
          "Padajuće tržište ne stvara sve probleme, ali ih otkriva. Ako je dug velik, prihod nesiguran, a zaliha mala, pad kupovne moći može stvoriti pritisak da prodate Bitcoin upravo onda kada ste ga željeli držati. Tada se pokazuje da pitanje duga nije odvojeno od pitanja skrbništva, proračuna i obitelji.",
          "Zbog toga razduživanje može biti važniji Bitcoin korak nego dodatna kupnja. Smanjenjem duga smanjujete buduće odljeve, povećavate izbor i smanjujete mogućnost prisilne prodaje. To ne znači da svaki dug mora nestati prije bilo kakve kupnje, ali znači da se dug ne smije gurati u stranu kao nevažan detalj.",
        ],
      },
      {
        heading: "Razduživanje kao priprema za Bitcoin standard",
        body: [
          "Puniji Bitcoin standard ne znači samo imati više Bitcoina. Znači imati život u kojem Bitcoin može stvarno služiti kao novac, a ne kao sredstvo koje se mora prodavati svaki put kad budući odljev dođe na naplatu. Razduživanje zato može biti oblik pripreme: jača proračun, smanjuje stres i povećava otpornost.",
          "Razuman redoslijed ovisi o vrsti duga, kamati, roku, prihodu, obitelji i neto imovini. Nekome će prvi korak biti gašenje skupog duga. Nekome će biti istodobno smanjivanje duga i skromna redovita kupnja. Nekome će biti čekanje. Cilj nije univerzalna zapovijed, nego osobno pravilo koje smanjuje mogućnost da dug odlučuje umjesto vas.",
          "Dobro pravilo može biti jednostavno: dok postoji određeni dug, kupnja ne prelazi unaprijed zadani dio stvarnog viška; kada se dug smanji, pravilo se preispituje. Takav zapis ne govori svima što trebaju raditi. Govori vama kako ćete izbjeći odluke koje se mijenjaju pod pritiskom tržišta ili računa koji dospijevaju.",
          "Taj zapis može uključiti i pravilo da se novi dug ne koristi za životni stil koji proračun ne može nositi. Bitcoin tada nije izgovor za veći rizik, nego razlog da osobni novac postane uredniji, jednostavniji i manje ovisan o budućim prihodima.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
  {
    slug: "dca-nije-dovoljan",
    title: "Zašto redovita kupnja nije dovoljna ako nemate osobni proračun?",
    metaDescription:
      "Redovita kupnja može biti korisna navika, ali bez osobnog proračuna ne odgovara na pitanja stvarnog viška, duga, kupovne moći i pisanih pravila.",
    excerpt:
      "Redovita kupnja može smanjiti impulzivnost, ali ne zamjenjuje osobni proračun, namjenu svakog eura i pravila kroz vrijeme.",
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
        heading: "Redovita kupnja nije isto što i osobni okvir",
        body: [
          "Redovita kupnja Bitcoina može biti korisna navika. Smanjuje potrebu za pogađanjem trenutka kupnje, smanjuje impulzivne odluke i uvodi ritam. No dobra navika nije isto što i osobni okvir. Ako ne znate zašto je iznos baš takav, što bi ga trebalo promijeniti i kako se uklapa u dug, proračun i neto imovinu, navika može skrivati nejasnoću.",
          "Praktični Bitcoin standard polazi od osobnog proračuna prije automatizma. Prvo treba razumjeti novac koji ulazi, novac koji izlazi, obveze koje čekaju, dugove, sigurnosnu zalihu i obiteljski kontekst. Tek nakon toga redovita kupnja može dobiti stvarnu mjeru. Bez toga je samo ponavljajuća radnja koja možda jest korisna, ali ne zna ništa o vašem životu.",
          "Ako je navika odvojena od proračuna, lako postane način da ne razmišljate. Iznos se ponavlja, osjećaj discipline postoji, ali nitko ne provjerava je li se život promijenio. Pravi okvir ne ukida redovitu kupnju. On joj daje razlog, granice i uvjete pod kojima se mijenja.",
        ],
      },
      {
        heading: "Automatska radnja ne poznaje vaš život",
        body: [
          "Automatska kupnja ne zna da vam prihod kasni. Ne zna da dolazi veći trošak. Ne zna da ste preuzeli obiteljsku obvezu, promijenili posao, ušli u dug ili već imate Bitcoin koji čini velik dio neto imovine. Ona izvršava zadani iznos, ali ne procjenjuje treba li taj iznos i dalje imati smisla.",
          "Zbog toga redovita kupnja može biti i korisna i opasno uspavljujuća. Korisna je kada slijedi jasno pravilo. Slaba je kada zamjenjuje razmišljanje. Ako se iznos ne mijenja nikada, čak ni kada se život promijeni, možda ne gledate dovoljno pažljivo osobni proračun i kupovnu moć.",
          "Osobito je važno da automatska kupnja ne skriva dug. Ako se istodobno povećava zaduženje ili se sigurnosna zaliha smanjuje, tada redovita kupnja možda nije dokaz discipline, nego znak da sustav nema dobar redoslijed. Prvo treba vidjeti cijelu sliku, a zatim odlučiti što redovitost treba značiti.",
        ],
      },
      {
        heading: "Proračun mora doći prije iznosa",
        body: [
          "Iznos redovite kupnje treba proizaći iz osobnog proračuna. To znači da prvo zapisujete prihode, redovne troškove, dugove, buduće odljeve, sigurnosnu zalihu i ciljeve. Tek zatim pitate koji dio novca može ići u Bitcoin bez ugrožavanja obveza i bez stvaranja potrebe za neplaniranom prodajom.",
          "Ako preskočite taj redoslijed, iznos često nastaje iz osjećaja. Može biti previsok jer želite brzo nadoknaditi propušteno. Može biti prenizak jer nemate povjerenja u vlastitu sliku. Može ostati isti godinama iako se prihod, dug ili neto imovina promijenila. Proračun daje mjeru koju osjećaj ne može dati.",
          "U praksi to znači da iznos kupnje treba imati objašnjenje u jednoj ili dvije rečenice. Primjerice: kupujem ovaj iznos jer su dugovi pod kontrolom, sigurnosna zaliha je na dogovorenoj razini, a ovo je dio stvarnog viška. Ako ne možete napisati takvo objašnjenje, iznos možda nije pravilo nego navika bez temelja.",
        ],
      },
      {
        heading: "Usklađivanje kupovne moći",
        body: [
          "Praktični Bitcoin standard naglašava usklađivanje kupovne moći. To znači da ne gledate samo koliko eura uplaćujete, nego što taj iznos stvarno predstavlja u vašem životu. Ako troškovi rastu, prihod se mijenja ili Bitcoin snažno promijeni vrijednost, isti iznos redovite kupnje više ne znači isto.",
          "Usklađivanje ne znači stalno reagiranje na cijenu. Znači povremeno provjeriti je li pravilo još povezano s proračunom i neto imovinom. Možda iznos treba ostati isti. Možda ga treba smanjiti dok se ne riješi dug. Možda ga treba povećati kada se pojavi stvarni višak. Bitno je da razlog bude zapisan, a ne nagađan.",
          "Ova provjera posebno je korisna nakon većih promjena cijena ili životnih okolnosti. Ako je Bitcoin postao velik dio neto imovine, pitanje više nije samo koliko kupovati, nego i kako čuvati, što ne dirati i kako objasniti plan obitelji. Redovita kupnja tada mora sjediti unutar šire slike.",
        ],
      },
      {
        heading: "Kada promijeniti pravilo",
        body: [
          "Dobro pravilo unaprijed kaže kada se mijenja. Primjeri mogu biti: promjena prihoda, novi dug, otplata duga, veći obiteljski trošak, povećanje novčane zalihe, promjena udjela Bitcoina u neto imovini ili nova sigurnosna odgovornost. Bez takvih uvjeta, odluka se često mijenja tek kada emocije postanu snažne.",
          "Redovita kupnja može ostati dio vašeg sustava, ali ne smije biti zamjena za sustav. Ako znate zašto kupujete tim iznosom, što mora biti istina da nastavite i kada trebate stati, navika dobiva ozbiljnost. Tada Bitcoin odluka ne ovisi samo o cijeni ili osjećaju, nego o pisanom osobnom okviru.",
          "Dobro je imati i pravilo čekanja. To je jednako važno kao pravilo kupnje. Ako se pojavi dug, veliki trošak ili nesigurnost prihoda, čekanje može biti zrelija odluka od automatskog nastavka. Redovitost ima vrijednost tek kada ne poništava zdrav razum proračuna.",
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
          "Rast kupovne moći često je opasniji nego što se čini. Pad stvara strah, ali rast može stvoriti osjećaj da je sve dopušteno. Osoba može početi trošiti bez jasnog pravila, povećati životni stil, zadužiti se jer se osjeća bogatije ili dodatno povećavati ulogu Bitcoina u neto imovini bez osobnog proračuna.",
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
          "Četvrto, zapišite što nećete raditi. Nećete donositi odluku samo zato što vas je cijena uplašila. Nećete povećati potrošnju samo zato što se osjećate bogatije. Nećete koristiti dug kako biste povećali ulogu Bitcoina u neto imovini. Nećete dirati sigurnosni ili skrbnički sustav bez posebnog pravila.",
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
      "Kako razmišljati o obiteljskom pristupu Bitcoinu bez otkrivanja osjetljivih podataka, tehničkih rizika, žurbe i prepuštanja kontrole u obitelji.",
    excerpt:
      "Ako Bitcoin ima važnu ulogu u neto imovini, osobni sustav mora biti razumljiv osobi od povjerenja u izvanrednim okolnostima.",
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
        heading: "Nije dovoljno da samo vi znate",
        body: [
          "Ako Bitcoin ima ozbiljnu ulogu u neto imovini, osobni sustav nije potpun ako postoji samo u vašoj glavi. Vi možda znate gdje je što, koje su upute važne i što se nikada ne smije napraviti. No u izvanrednoj situaciji obitelj ili osoba od povjerenja može ostati bez osnovnog smjera.",
          "To ne znači da obitelji treba dati potpun pristup svemu. Znači da treba postojati razuman put: što postoji, kome se može obratiti, gdje se nalaze opće upute i koje su radnje opasne. Bitcoin traži veću osobnu odgovornost, ali odgovornost ne završava na vama ako imovina ima obiteljsko značenje.",
          "Prvi zadatak nije tehnički, nego organizacijski. Treba odvojiti pitanje znanja od pitanja kontrole. Obitelj možda treba znati da Bitcoin postoji i da postoje upute, ali ne mora unaprijed imati sve podatke koji omogućuju pomicanje sredstava. Time se čuva i kontinuitet i sigurnost.",
        ],
      },
      {
        heading: "Informacija nije isto što i pristup",
        body: [
          "Važno je razlikovati informaciju od pristupa. Informacija može glasiti da Bitcoin postoji, da je dio neto imovine i da postoje upute za izvanredne okolnosti. Pristup znači sposobnost pomicanja sredstava. Te dvije stvari ne moraju i ne smiju uvijek biti na istom mjestu.",
          "Mnogi ljudi preskoče tu razliku. Ili nitko ništa ne zna, pa obitelj nema put. Ili se osjetljivi podaci dijele preširoko, pa se povećava rizik. Zreliji pristup gradi slojeve: osnovna informacija, pouzdane osobe, fizičke upute, pravila opreza i odvojena zaštita onoga što bi omogućilo stvarni pristup.",
          "Takav slojeviti pristup pomaže i u razgovoru s obitelji. Umjesto da razgovor odmah postane tehnički ili neugodan, možete početi od namjene: Bitcoin je dio neto imovine, postoji plan, ne treba žuriti i postoje stvari koje se nikada ne smiju napraviti. To je često dovoljno za prvi, mirniji korak.",
        ],
      },
      {
        heading: "Što obitelj treba znati",
        body: [
          "Osoba od povjerenja ne mora znati tehničke pojedinosti svakog novčanika. Treba znati da Bitcoin postoji, zašto je važan, gdje su opće upute, koga smije kontaktirati, koje dokumente treba potražiti i kojim redoslijedom treba postupati. Upute trebaju biti dovoljno jasne da ih osoba može razumjeti i pod stresom.",
          "Korisno je zapisati i financijski kontekst: je li Bitcoin dio dugoročne neto imovine, postoji li namjera da se ne prodaje naglo, postoje li porezna ili pravna pitanja za stručnjake i koje odluke ne treba donositi u žurbi. To nisu tehničke upute za oporavak, nego zaštita od panike i pogrešnih prvih koraka.",
          "Dobar dokument može imati dvije razine. Prva razina objašnjava da Bitcoin postoji, tko su pouzdane osobe i koja su osnovna pravila opreza. Druga razina upućuje gdje se nalaze daljnje upute, bez izlaganja osjetljivih podataka u glavnom dokumentu. Time osoba od povjerenja dobiva smjer, ali ne i nepotreban rizik.",
        ],
      },
      {
        heading: "Što obitelj nikada ne smije napraviti",
        body: [
          "Dobar obiteljski pristup mora jasno reći i što se ne radi. Ne unositi osjetljive podatke u mrežne stranice. Ne slati fotografije nepoznatim osobama. Ne tražiti pomoć u javnim skupinama. Ne žuriti s prodajom. Ne prepisivati privatne ključeve u nesigurne bilješke. Ne donositi odluke prije nego što se razumije cijela situacija.",
          "Ova negativna pravila često su važnija od detaljnih tehničkih objašnjenja. U izvanrednoj situaciji ljudi traže brz izlaz i tada su najranjiviji. Ako unaprijed postoji kratka lista zabranjenih radnji, smanjuje se rizik da netko u dobroj namjeri napravi nepopravljivu štetu.",
          "Popis zabranjenih radnji treba biti kratak i razumljiv. Ako je predug, osoba pod stresom ga neće slijediti. Bolje je imati nekoliko jasnih pravila koja sprječavaju najveće pogreške nego mnogo tehničkih pojedinosti koje nitko ne može sigurno primijeniti bez pripreme.",
        ],
      },
      {
        heading: "Upute bez otkrivanja osjetljivih podataka",
        body: [
          "Obiteljski pristup treba uravnotežiti dvije potrebe: kontinuitet i sigurnost. Kontinuitet znači da osoba od povjerenja nije potpuno izgubljena. Sigurnost znači da joj ne morate unaprijed otkriti sve što bi omogućilo samostalno pomicanje Bitcoina. Upute mogu opisati postupak, uloge i mjesta bez izlaganja najosjetljivijih podataka.",
          "Cilj nije da svaki član obitelji postane tehnički stručnjak. Cilj je da sustav preživi vašu nedostupnost, bolest ili smrt, a da pritom ne postane lak plijen. U okviru Praktičnog Bitcoin standarda, skrbništvo je dio stvarne neto imovine. Ako je Bitcoin važan, tada i obiteljski pristup mora biti dio pisanog osobnog okvira.",
          "Dobro je povremeno provjeriti razumiju li upute osobe kojima su namijenjene. Ne treba im otkrivati osjetljive dijelove, ali treba vidjeti znaju li gdje početi, koga nazvati i što izbjegavati. Plan koji nitko ne razumije u mirnom trenutku vjerojatno neće biti dovoljno dobar u teškom trenutku.",
          "Takva provjera ne mora biti dramatična. Može biti kratak razgovor jednom godišnje, uz jasnu granicu da se ne otkrivaju osjetljivi podaci. Važno je da osoba od povjerenja zna da plan postoji i da se ne očekuje brza odluka pod pritiskom.",
        ],
      },
    ],
    finalCta: PRIMARY_CTA,
  },
  {
    slug: "novac-kapital-potrosnja",
    title: "Bitcoin kao novac, kapital i potrošnja: praktičan okvir",
    metaDescription:
      "Praktičan vodič za razlikovanje novca, potrošnih dobara i kapitala te razumijevanje uloge Bitcoina u neto imovini, pravilima i svjesnoj potrošnji.",
    excerpt:
      "Praktični Bitcoin standard ne pita samo koliko Bitcoina imate, nego koju ulogu svaka imovina ima u vašem životu.",
    publishedAt: "2026-04-30",
    updatedAt: "2026-04-30",
    practicalQuestion:
      "Koji dio vašeg Bitcoina ima ulogu novca, koji dio dugoročnog kapitala, a koji dio biste svjesno mogli potrošiti?",
    relatedSlugs: [
      "bitcoin-u-neto-imovini",
      "uskladivanje-kupovne-moci-bitcoina",
      "stvarni-visak",
    ],
    sections: [
      {
        heading: "Tri uloge imovine",
        body: [
          "Praktični Bitcoin standard ne pita samo koliko imovine imate. Pita koju ulogu ta imovina ima u vašem životu. Jedan dio imovine služi kao novac: čuva mogućnost budućih odluka i prenosi kupovnu moć kroz vrijeme. Drugi dio služi potrošnji: stanovanje, prijevoz, odjeća, oprema, putovanja i stvari koje koristite. Treći dio ima kapitalnu ili proizvodnu ulogu: stvara prihod, znanje, mogućnosti ili dugoročnu vrijednost.",
          "Ova podjela nije akademska. Ona mijenja način donošenja odluka. Ako ne razlikujete uloge, sve izgleda kao jedna velika imovina, a odluke postaju nejasne. Možete imati skupu potrošnu imovinu i osjećati se bogato, iako ona stalno traži novac. Možete imati kapital koji stvara vrijednost, ali premalo novčane zalihe. Možete imati Bitcoin, ali ne znati koji dio ima koju svrhu.",
          "Kada napravite ovu podjelu, neto imovina postaje čitljivija. Više ne pitate samo koliko nešto vrijedi danas. Pitate što ta imovina radi za vas, koliko traži od vas i kakvu slobodu ili obvezu stvara. To je korisnije od jednostavnog zbrajanja iznosa.",
        ],
      },
      {
        heading: "Bitcoin kao novac",
        body: [
          "U ovom okviru Bitcoin se ponajprije promatra kao novac. To znači da njegova glavna uloga nije kratkoročno pogađanje cijene, nego čuvanje mogućnosti kroz vrijeme. Bitcoin kao novac mijenja odnos prema štednji, potrošnji i proračunu jer vas prisiljava da jasnije odvojite ono što treba biti dostupno od onoga što želite držati dugoročno.",
          "No i ovdje treba oprez. Ako sav Bitcoin nazovete dugoročnim novcem, možda nećete znati što napraviti kada se pojavi stvarna životna potreba. Ako ga sav gledate kao novac koji je uvijek dostupan za trošenje, možda ćete oslabiti dugoročni plan. Zato je korisno unutar vlastitog Bitcoina razlikovati slojeve: novčanu zalihu, dugoročno držanje i iznos koji bi se u iznimnim okolnostima mogao koristiti.",
          "Takvo odvajanje ne znači da fizički morate imati više novčanika ili složen tehnički sustav. Riječ je prije svega o pravilima. Koji dio ne dirate? Koji dio se može koristiti samo pod jasno zapisanim uvjetima? Koji dio služi kao novac za stvarne životne odluke? Bez tih odgovora, sve ostaje u istoj magli.",
        ],
      },
      {
        heading: "Potrošna dobra i trošak vlasništva",
        body: [
          "Potrošna dobra nisu loša. Dom, automobil, oprema i drugi predmeti mogu biti važni za dostojanstven život, obitelj i rad. Problem nastaje kada potrošna dobra vežu previše neto imovine ili stvaraju trošak koji niste uračunali. Vlasništvo gotovo uvijek ima trošak: održavanje, osiguranje, porez, vrijeme, pažnju i mogućnost da novac više nije dostupan za druge odluke.",
          "Zato se u osobnom okviru ne pita samo možete li nešto kupiti. Pita se što vlasništvo traži nakon kupnje. Nekada je vlasništvo razumno. Nekada je najam bolji jer čuva novčanu zalihu i smanjuje buduće odljeve. Nema jedne formule, ali postoji korisno pitanje: hoće li ova potrošnja povećati slobodu ili će stvoriti obvezu koja smanjuje mogućnost držanja Bitcoina?",
          "Ovo pitanje posebno je važno kada veća potrošnja traži prodaju Bitcoina ili novo zaduženje. Potrošnja može biti opravdana, ali treba biti svjesna. Ako se ne zna što se žrtvuje, odluka se lako predstavi kao potreba iako je zapravo izbor koji mijenja ravnotežu neto imovine.",
        ],
      },
      {
        heading: "Kapitalna dobra i stvaranje vrijednosti",
        body: [
          "Kapitalna ili proizvodna dobra imaju drugu ulogu. Ona mogu stvarati prihod, povećati sposobnost rada, otvoriti nove mogućnosti ili smanjiti buduće troškove. To može biti posao, oprema, znanje, alat, poslovni odnos ili imovina koja daje prihod. Takva dobra ne treba miješati s potrošnjom samo zato što imaju cijenu.",
          "U odnosu na Bitcoin, kapitalna dobra postavljaju važno pitanje: kada ima smisla držati više novca, a kada ga usmjeriti u nešto što stvara vrijednost? Bitcoin može biti najbolji oblik novca u ovom okviru, ali novac nije jedina životna potreba. Ako zanemarite kapital koji vam omogućuje prihod, znanje ili rad, možete imati jaku novčanu poziciju i slab životni sustav.",
        ],
      },
      {
        heading: "Ravnoteža neto imovine",
        body: [
          "Ravnoteža neto imovine ne znači da sve mora biti jednako raspoređeno u svakom trenutku. Znači da znate zašto vaša imovina izgleda tako kako izgleda. Koliko je u novcu? Koliko u potrošnim dobrima? Koliko u kapitalu? Koliko je opterećeno dugom? Koliko je dostupno ako se život promijeni?",
          "Kada tako gledate imovinu, Bitcoin prestaje biti odvojeno pitanje. On dobiva mjesto u sustavu: kao novac, kao dio dugoročne neto imovine i kao izvor pravila za potrošnju ili čekanje. Cilj nije savršena podjela, nego osobni okvir koji možete održati kroz vrijeme, objasniti obitelji i preispitati kada se vaša situacija promijeni.",
          "Zato je korisno povremeno napraviti mirnu provjeru. Ne zato da biste stalno premještali imovinu, nego da vidite je li raspored još razumljiv. Ako potrošna dobra previše rastu, ako dug pritišće ili ako Bitcoin nema jasnu ulogu, ravnoteža nije stvar postotka, nego poziv da ponovno napišete pravila.",
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
