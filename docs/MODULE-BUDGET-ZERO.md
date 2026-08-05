# Modul: Proračun nulte razine

Status dokumenta: modul je implementiran za lokalno testiranje; produkcijska objava nije provedena

Opseg dokumenta: specifikacija proizvoda i aktivni plan implementacije

## 1. Kontekst postojećeg repozitorija

Stranica je izgrađena u Reactu, TypeScriptu i Viteu, uz SSR/prerender i izravni deploy na Cloudflare Pages. Nema prijave korisnika, baze podataka ni analitike.

Postojeća stranica `/proracun/` i povezani vodiči već postavljaju urednički okvir koji ovaj modul treba pretvoriti u konkretan alat:

- svaki euro treba dobiti namjenu,
- stvarni višak nije samo stanje na jednom računu,
- novac najprije treba popisati, zatim zbrojiti i tek onda namijeniti,
- troškovi, dug, buduće obveze i pričuva trebaju biti vidljivi prije odluke o stvarno slobodnom novcu,
- Bitcoin odluka treba biti dio uređenog sustava, a ne zamjena za njega.

Postojeći interaktivni modul `BitcoinStandardAssessment` daje koristan lokalni obrazac za korake, napredak, pomicanje fokusa i rezultat. Njegova se poruka o privatnosti ne smije doslovno ponovno koristiti jer se odgovori tog modula ne spremaju, dok će se podaci Proračuna nulte razine spremati u `localStorage`.

Integracija prve verzije:

- zasebna ruta: `/proracun/nulta-razina/`,
- ulazni CTA na postojećoj stranici `/proracun/`,
- vlastiti SEO i prerenderirani uvodni sadržaj bez korisničkih podataka,
- bez promjene postojećih vodiča u prvom implementacijskom koraku.

Naziv u sučelju treba dosljedno biti **Proračun nulte razine**. Postojeći vodiči koriste i izraz "proračun nulte osnove"; njihovo terminološko usklađivanje nije dio prve verzije modula.

## 2. Ključni model modula

Modul ima dva jasno odvojena sloja:

1. **Gdje je novac**: korisnik dodaje račune i trenutačno stanje svakog računa.
2. **Čemu je novac namijenjen**: korisnik ukupni zbroj svih računa raspoređuje u kategorije.

Primjer računa:

```text
Gotovina                    100 EUR
Tekući račun              2.000 EUR
Bitcoin novčanik          5.000 EUR
Žiro račun                    0 EUR
------------------------------------
Ukupno za namijeniti      7.100 EUR
```

Račun i kategorija nisu ista stvar:

- račun govori gdje se novac trenutačno nalazi,
- kategorija govori koji posao taj novac treba obaviti.

Kategorije nisu vezane uz pojedinačni račun. Primjerice, `500 EUR` namijenjenih za stanovanje ne mora biti označeno kao novac baš s tekućeg računa. Prva verzija radi s jednim zajedničkim zbrojem svih računa.

Unos namjene ne premješta stvarni novac, ne mijenja stanje računa i ne komunicira s bankom ili Bitcoin novčanikom. Modul je lokalni plan, a ne financijska transakcija.

## 3. Svrha modula

Modul korisniku pomaže:

- popisati novac koji trenutačno ima na više mjesta,
- dobiti jedan točan iznos "Ukupno za namijeniti",
- svakom dijelu tog iznosa dati jasnu namjenu,
- u svakom trenutku vidjeti koliko još treba namijeniti,
- završiti plan kada je "Još za namijeniti" točno `0 EUR`,
- odvojeno razmotriti što bi pad budućeg mjesečnog prihoda od 20% promijenio,
- zapisati osobno pravilo o tome kada je novac stvarno slobodan.

Primarni ishod je dovršen plan trenutačno raspoloživog novca u kojem vrijedi:

```text
zbroj stanja svih računa = zbroj svih namjena
još za namijeniti = 0 EUR
```

Modul ne daje investicijsku preporuku, ne propisuje postotak za Bitcoin i ne ocjenjuje korisnika. Iznos za svaku kategoriju, uključujući štednju u Bitcoinu, može biti `0 EUR`.

## 4. Ciljani korisnik

Primarni korisnik je pojedinac ili kućanstvo koje:

- drži novac na više mjesta, primjerice u gotovini, na tekućem ili žiro računu i u Bitcoin novčaniku,
- želi ručno unijeti trenutačnu vrijednost svakog računa u eurima,
- ne zna koji je dio ukupnog novca već zauzet budućim obvezama,
- želi dodavati vlastite kategorije poput stanovanja, prijevoza i hrane,
- želi uključiti pričuvu, davanje i Bitcoin u isti sustav odluka,
- želi jednostavan alat bez registracije, povezivanja banke i predaje podataka.

Prva verzija nije namijenjena poslovnom knjigovodstvu, zajedničkom uređivanju u stvarnom vremenu ni upravljanju stvarnim bankovnim računima ili Bitcoin novčanicima.

## 5. Granice prve verzije

### U opsegu

- jedan aktualni snimak trenutačno raspoloživog novca,
- proizvoljan broj korisnički dodanih računa unutar definiranog ograničenja,
- naziv i trenutačno stanje svakog računa,
- ručni EUR unos vrijednosti Bitcoin novčanika,
- automatski zbroj svih računa u "Ukupno za namijeniti",
- sedam područja namjene,
- unaprijed definirane i vlastite kategorije unutar područja,
- izračun uživo: ukupno za namijeniti, namijenjeno i još za namijeniti,
- stresni scenarij pada očekivanog budućeg mjesečnog prihoda od 20%,
- osobno pravilo,
- rezultat i mogućnost naknadnog uređivanja,
- automatsko lokalno spremanje jednog nacrta ili rezultata,
- nastavak lokalno spremljenog rada i potpuno brisanje lokalnih podataka.

### Izvan opsega

- korisnički profil, prijava, backend, baza i sinkronizacija među uređajima,
- povezivanje s bankom, burzom ili Bitcoin novčanikom,
- automatski dohvat stanja računa ili cijene Bitcoina,
- praćenje transakcija, prijenosa među računima i usklađivanje bankovnih izvoda,
- negativna stanja, kreditne kartice i prekoračenja kao računi izvora novca,
- povijest stanja računa i više spremljenih proračuna,
- više valuta i tečajne konverzije,
- vezivanje pojedine kategorije uz određeni račun,
- slanje, dijeljenje ili javni URL rezultata,
- izračun BTC količine ili kupnja Bitcoina,
- preporučeni postoci, financijsko bodovanje i personalizirani savjeti,
- PDF, CSV, ispis ili drugi izvoz,
- puni drugi proračun za stresni mjesec,
- analitika korištenja modula,
- spremanje seed phrasea, privatnih ključeva, adresa novčanika, IBAN-a ili pristupnih podataka.

## 6. Pojmovi i statusi

- **Račun**: korisnički nazvan lokalni zapis mjesta na kojem se novac nalazi, primjerice "Gotovina", "Tekući račun" ili "Bitcoin novčanik". Nije korisnički račun za prijavu i nije veza prema banci.
- **Stanje računa**: trenutačni iznos ili ručno unesena EUR vrijednost novca na jednom računu.
- **Ukupno za namijeniti**: zbroj stanja svih računa.
- **Područje namjene**: jedno od sedam glavnih područja koja organiziraju kategorije.
- **Kategorija**: pojedinačna unaprijed definirana ili korisnički dodana namjena, primjerice "Stanovanje", "Prijevoz" ili "Hrana".
- **Namijenjeno**: zbroj iznosa svih kategorija.
- **Još za namijeniti**: ukupno za namijeniti umanjeno za ukupno namijenjeno, kada je rezultat pozitivan.
- **Previše namijenjeno**: iznos za koji namjene prelaze zbroj svih računa.
- **Očekivani mjesečni prihod**: zaseban budući priljev koji se koristi samo u stresnom scenariju i ne pribraja se trenutačnim stanjima računa.
- **Dovršen proračun**: postoji barem jedan račun, zbroj računa veći je od nule, svi su unosi valjani i još za namijeniti je točno `0 EUR`.
- **Završen modul**: proračun je dovršen, stresni scenarij je pregledan i odgovor zabilježen, a osobno pravilo je zapisano.

Kada je razlika negativna, sučelje ne prikazuje negativno "Još za namijeniti" nego zaseban status:

> Namijenili ste X više nego što trenutačno imate.

## 7. Cijeli korisnički tijek

1. Korisnik otvara `/proracun/nulta-razina/`.
2. Vidi kratak opis modela "gdje je novac" i "čemu je namijenjen" te jasnu poruku o lokalnoj privatnosti.
3. Ako nema lokalnog nacrta, odabire "Započnite proračun".
4. Ako lokalni nacrt postoji, odabire "Nastavite" ili "Izbrišite i počnite iznova". Brisanje traži potvrdu.
5. Dodaje prvi račun, upisuje naziv i trenutačno stanje u eurima.
6. Dodaje onoliko drugih računa koliko mu treba.
7. Modul nakon svake valjane promjene računa prikazuje novi iznos "Ukupno za namijeniti".
8. Korisnik prelazi na namjene i vidi početne kategorije organizirane u sedam područja.
9. Po potrebi dodaje vlastite kategorije, primjerice "Stanovanje", "Transport" ili "Hrana".
10. U svaku kategoriju upisuje iznos koji toj namjeni želi dodijeliti.
11. Nakon svake promjene vidi "Ukupno za namijeniti", "Namijenjeno" i "Još za namijeniti".
12. Ako je zbroj kategorija manji od zbroja računa, modul pokazuje koliko još treba namijeniti.
13. Ako je zbroj kategorija veći od zbroja računa, modul pokazuje za koliko je korisnik namijenio previše.
14. Tek kada je razlika točno nula i nema pogrešaka, gumb za nastavak postaje dostupan.
15. U stresnom koraku korisnik zasebno unosi očekivani mjesečni prihod. Modul jasno navodi da se taj prihod ne pribraja trenutačnim računima.
16. Modul prikazuje očekivani prihod umanjen za 20% i iznos budućeg prihoda koji bi nedostajao u odnosu na početno očekivanje.
17. Korisnik označava koje bi namjene prve preispitao ili odabire "Još ne znam".
18. Korisnik dovršava rečenicu: "Novac smatram stvarno slobodnim tek kada..."
19. Modul prikazuje završni sažetak računa, ukupnog iznosa, namjena, stresnog scenarija i osobnog pravila.
20. Rezultat ostaje lokalno spremljen. Korisnik ga može urediti ili trajno izbrisati.

Povratak na raniji korak ne briše podatke.

Promjena računa ili njegovog stanja odmah mijenja "Ukupno za namijeniti":

- ako se stanje poveća, pojavljuje se novi iznos "Još za namijeniti",
- ako se stanje smanji ispod postojećih namjena, pojavljuje se status "Previše namijenjeno",
- kategorije se ne skaliraju i ne mijenjaju automatski.

Promjena računa, kategorija ili očekivanog mjesečnog prihoda nakon dovršetka poništava potvrdu stresnog scenarija i završni status dok korisnik ponovno ne pregleda ažurirani scenarij. Osobno pravilo ostaje spremljeno.

## 8. Ekrani i koraci

### 8.1. Uvod ili nastavak

Sadržaj:

- naziv modula,
- kratko objašnjenje razlike između računa i namjena,
- sažetak ishoda,
- procijenjeno trajanje,
- lokalna poruka o privatnosti,
- upozorenje da se ne unose IBAN, broj računa, Bitcoin adresa, seed phrase, privatni ključ ili pristupni podaci,
- primarna akcija za početak.

Ako postoji spremljeni podatak, prikazuje se vrijeme zadnjeg lokalnog spremanja i akcije za nastavak ili brisanje. Na ovom ekranu nije potrebno prikazati financijske iznose.

### 8.2. Korak 1: Računi i trenutačna stanja

Naslov:

> Gdje se vaš novac trenutačno nalazi?

Korisnik vidi popis računa. Svaki red sadrži:

- polje "Naziv računa",
- polje "Trenutačno stanje",
- fiksnu oznaku EUR,
- akciju brisanja računa.

Primjeri naziva prikazuju se kao nenametljive ideje:

- Gotovina
- Tekući račun
- Žiro račun
- Štedni račun
- Bitcoin novčanik
- Drugo

Primjeri nisu stvarni računi i ne dodaju se automatski bez korisničke akcije.

Ispod popisa uvijek se prikazuje:

```text
Ukupno za namijeniti: X EUR
```

Akcije:

- "Dodajte račun"
- "Natrag"
- "Nastavite na namjene"

Nastavak nije moguć dok ne postoji barem jedan valjan račun i dok ukupan zbroj nije veći od nule.

Bitcoin novčanik unosi se kao ručna trenutačna vrijednost u eurima. Modul ne traži BTC iznos i ne dohvaća tržišnu cijenu.

### 8.3. Korak 2: Namjene

Naslov:

> Čemu je vaš novac namijenjen?

Ovo je glavni radni ekran modula.

Na vrhu ili u stabilnoj ljepljivoj traci prikazuju se:

- ukupno za namijeniti,
- ukupno namijenjeno,
- još za namijeniti ili previše namijenjeno,
- vizualni status bez oslanjanja samo na boju.

Na mobilnom uređaju sažetak mora ostati čitljiv i ne smije prekrivati polja ni navigacijske akcije.

Svako područje prikazuje:

- naziv i kratak opis,
- zbroj područja,
- unaprijed definirane kategorije,
- vlastite kategorije,
- akciju "Dodajte kategoriju".

Korisnik može prelaziti među područjima bez gubitka unosa. Sve se skupine prikazuju, ali nijedna nema propisani minimalni iznos.

Akcija za nastavak:

- onemogućena je dok postoji iznos "Još za namijeniti" ili "Previše namijenjeno",
- dostupna je samo kada je razlika točno nula i svi su unosi valjani,
- uz dovršetak jasno potvrđuje "Sav je novac dobio namjenu".

Sažeti status ostaje vidljiv i u koracima stresa i osobnog pravila. U tim koracima očekivani je status `0 EUR` još za namijeniti.

### 8.4. Korak 3: Stresni scenarij

Naslov:

> Što se događa ako se prihod idući mjesec smanji za 20%?

Prije izračuna korisnik upisuje:

- očekivani mjesečni prihod u eurima.

Uz polje stoji jasna napomena:

> Ovaj iznos služi samo za budući stresni scenarij. Ne dodaje se trenutačnom iznosu na vašim računima.

Prikazuje se:

- očekivani mjesečni prihod,
- stresni prihod od 80%,
- razlika u eurima,
- postojeće namjene po glavnim područjima kao kontekst.

Korisnik odgovara na pitanje "Što biste prvo preispitali?" višestrukim odabirom:

- svaka kategorija s namijenjenim iznosom većim od nule,
- korištenje postojeće pričuve,
- dodatni prihod,
- drugo,
- još ne znam.

Odabir "Još ne znam" isključuje ostale odabire. Za "Drugo" se otvara kratka neobvezna bilješka. Korak je dovršen kada je prihod valjan i postoji najmanje jedan odabir.

Ovaj korak je dijagnostički. Budući da kategorije u prvoj verziji predstavljaju stanje namijenjenog novca, a ne mjesečne ciljeve potrošnje, modul ne može izračunati puni mjesečni manjak prema kategorijama bez dodatnih podataka. Zato prikazuje smanjenje budućeg priljeva i bilježi prvu namjeru, ali ne tvrdi da je korisnik izradio krizni proračun.

### 8.5. Korak 4: Osobno pravilo

Prikazuje se fiksni početak rečenice:

> Novac smatram stvarno slobodnim tek kada...

Korisnik unosi završetak u tekstualno polje. Primjeri mogu biti prikazani kao ideje izvan polja, ali se ne smiju automatski spremiti kao korisnikov odgovor.

Preporučeni primjeri:

- "...svaki euro na svim računima već ima jasnu namjenu."
- "...su redovni troškovi, dug i buduće obveze pokriveni."
- "...pričuva ostaje netaknuta nakon svih poznatih obveza."

Nastavak nije moguć dok pravilo nije uneseno.

### 8.6. Rezultat

Rezultat prikazuje:

- status "Proračun nulte razine dovršen",
- popis računa i njihova stanja,
- ukupno za namijeniti,
- ukupno i postotak svakog područja namjene,
- potvrdu `0 EUR` još za namijeniti,
- stresni prihod i smanjenje budućeg priljeva,
- odabrani prvi odgovor na stres,
- cjelovitu rečenicu osobnog pravila,
- oznaku "Spremljeno samo u ovom pregledniku",
- akcije "Uredite račune", "Uredite namjene" i "Izbrišite moje podatke".

U prvoj verziji rezultat nema dijeljenje, slanje, preuzimanje ni vanjski CTA koji sadrži financijske podatke.

## 9. Podaci

### 9.1. Podatkovni model

Predloženi lokalni zapis:

```ts
type MoneyAccount = {
  id: string
  label: string
  balanceEuros: number
}

type BudgetAreaId =
  | "monthly-expenses"
  | "debt"
  | "future-obligations"
  | "reserve"
  | "giving"
  | "bitcoin-savings"
  | "other"

type BudgetCategory = {
  id: string
  areaId: BudgetAreaId
  label: string
  source: "predefined" | "custom"
  assignedEuros: number
}

type StressResponseId =
  | `category:${string}`
  | "use-existing-reserve"
  | "additional-income"
  | "other-response"
  | "not-sure"

type BudgetZeroDraftV1 = {
  schemaVersion: 1
  currency: "EUR"
  accounts: MoneyAccount[]
  categories: BudgetCategory[]
  expectedMonthlyIncomeEuros: number | null
  financialRevision: number
  stress: {
    incomeFactorPercent: 80
    responseIds: StressResponseId[]
    otherNote: string
    reviewedFinancialRevision: number | null
  }
  personalRule: string
  currentStep: "accounts" | "allocation" | "stress" | "rule" | "result"
  createdAt: string
  updatedAt: string
}
```

Iznosi se spremaju kao nenegativni cijeli brojevi eura.

Izvedene vrijednosti ne spremaju se kao drugi izvor istine:

- ukupno za namijeniti,
- ukupno namijenjeno,
- još za namijeniti,
- zbrojevi područja,
- postoci,
- stresni prihod,
- status dovršenosti.

`financialRevision` se povećava pri promjeni računa, stanja, kategorija, namijenjenih iznosa ili očekivanog mjesečnog prihoda. Stresni odgovor vrijedi samo kada je `reviewedFinancialRevision === financialRevision`.

### 9.2. Obvezni podaci

- najmanje jedan račun,
- valjan naziv i stanje svakog računa,
- ukupan zbroj računa veći od nule,
- sedam područja namjene,
- iznosi kategorija čiji zbroj odgovara zbroju računa,
- valjan očekivani mjesečni prihod u stresnom koraku,
- najmanje jedan odabir u stresnom scenariju,
- osobno pravilo.

### 9.3. Neobvezni podaci

- dodatni računi,
- vlastite kategorije,
- bilješka uz odgovor "Drugo" u stresnom scenariju.

### 9.4. Podaci koje aplikacija ne traži

- ime, email, telefon i identitet korisnika,
- IBAN, broj bankovnog računa i broj kartice,
- pristup banci, burzi ili novčaniku,
- Bitcoin adresa, BTC količina, transakcija, seed phrase ili privatni ključ,
- događaji analitike o računima, stanjima, kategorijama ili pravilima.

Korisnik smije računu dati opisni naziv, ali sučelje ga treba uputiti da koristi naziv poput "Tekući račun" umjesto IBAN-a ili broja računa.

## 10. Područja i početne kategorije

Sedam područja ima stabilne identifikatore i ne može se preimenovati ni izbrisati u prvoj verziji. Početne kategorije mogu ostati na nuli. Korisnik može dodati vlastitu kategoriju u bilo koje područje.

### 10.1. Redovni mjesečni troškovi

- Stanovanje
- Režije i komunikacije
- Hrana i kućanstvo
- Prijevoz
- Zdravlje i osiguranje
- Obitelj i obrazovanje

### 10.2. Otplata duga

- Minimalne rate
- Dodatna otplata

Ovdje se namjenjuje novac za otplatu, ne unosi ukupno stanje duga. Negativan bankovni račun ili prekoračenje u prvoj se verziji ne dodaje kao račun izvora novca, nego se planira kroz područje duga.

### 10.3. Buduće i neredovite obveze

- Porezi i pristojbe
- Registracija i servis
- Godišnje premije
- Popravci i održavanje
- Putovanja i proslave

### 10.4. Pričuva

- Sigurnosna pričuva

Kategorija predstavlja dio trenutačnog novca koji je namijenjen pričuvi. Ne mora se nalaziti na posebnom bankovnom računu.

### 10.5. Davanje

- Davanje

### 10.6. Štednja u Bitcoinu

- Štednja u Bitcoinu

Ako korisnik već ima Bitcoin novčanik među računima, može odgovarajuću EUR vrijednost namijeniti ovoj ili nekoj drugoj kategoriji. Modul ne nameće podudaranje i ne dohvaća cijenu Bitcoina.

### 10.7. Ostalo

- Ostalo

Za ponavljajuću namjenu treba predložiti opisnu vlastitu kategoriju umjesto trajnog korištenja opće kategorije "Ostalo".

## 11. Formule

Svi pohranjeni novčani iznosi i svi rezultati formula koriste cijele brojeve eura. Stresni izračun može imati privremeni razlomljeni rezultat koji se odmah zaokružuje prema pravilu iz odjeljka 11.3. i nikada se ne prikazuje korisniku kao novčani iznos.

Oznake:

- `b_j` = stanje pojedinog računa,
- `F` = ukupno za namijeniti,
- `c_i` = iznos namijenjen pojedinoj kategoriji,
- `A` = ukupno namijenjeno,
- `T` = još za namijeniti,
- `G_g` = ukupno namijenjeno u području,
- `M` = očekivani budući mjesečni prihod,
- `M_stress` = prihod u stresnom scenariju,
- `incomeReduction` = smanjenje budućeg prihoda.

### 11.1. Računi i namjene

```text
F = zbroj svih b_j
A = zbroj svih c_i
T = F - A
G_g = zbroj svih c_i u području g
```

Status:

```text
T > 0  -> još za namijeniti T
T = 0  -> sav je novac dobio namjenu
T < 0  -> previše namijenjeno za abs(T)
```

Proračun je dovršen kada vrijedi sve navedeno:

```text
broj računa >= 1
F > 0
svi računi i kategorije su valjani
A = F
T = 0
```

Postotak područja koristi se samo za prikaz:

```text
areaPercent = F > 0 ? (G_g / F) * 100 : 0
```

Postotak se prikazuje zaokružen na jednu decimalu. Zaokruženi postoci ne određuju dovršenost.

### 11.2. Primjer namjene

```text
Ukupno za namijeniti = 1.000 EUR
Stanovanje = 500 EUR

Namijenjeno = 500 EUR
Još za namijeniti = 500 EUR
```

Nakon što zbroj svih kategorija dosegne `1.000 EUR`:

```text
Namijenjeno = 1.000 EUR
Još za namijeniti = 0 EUR
```

### 11.3. Stresni scenarij

```text
M_stress = ROUND_TO_EURO(M * 80 / 100)
incomeReduction = M - M_stress
```

`ROUND_TO_EURO` zaokružuje na najbliži cijeli euro. Kada je razlomljeni dio točno `0,5`, za nenegativne iznose zaokružuje naviše, jednako ponašanju `Math.round` u JavaScriptu. Primjer koji nije djeljiv s pet računa se kao `Math.round(1_001 * 80 / 100) = 801`, pa se za očekivani prihod od `1.001 EUR` stresni prihod prikazuje kao `801 EUR`, a smanjenje kao `200 EUR`.

Primjer:

```text
M = 2.500 EUR
M_stress = 2.000 EUR
incomeReduction = 500 EUR
```

`M` se ne pribraja vrijednosti `F`. To sprječava dvostruko brojanje prihoda koji je možda već vidljiv na nekom računu.

Prva verzija ne računa `A - M_stress` kao mjesečni manjak jer `A` predstavlja sve trenutačno namijenjene zalihe novca, a ne samo jedan mjesec troškova.

## 12. Validacijska pravila

### 12.1. Novčani unosi

- Valuta prve verzije je isključivo EUR.
- Stanje računa može biti od `0 EUR` do `999.999.999 EUR`.
- Očekivani mjesečni prihod mora biti između `1 EUR` i `999.999.999 EUR`.
- Iznos kategorije može biti od `0 EUR` do `999.999.999 EUR`.
- Negativni iznosi nisu dopušteni.
- V1 ne prihvaća decimale ni cente; svaki novčani unos mora predstavljati cijeli euro.
- Prazno stanje računa nije valjano; prazna kategorija tretira se kao `0 EUR`.
- Unos treba koristiti tekstualno polje s `inputMode="numeric"`, a ne se oslanjati samo na `type="number"`.
- Prihvaća se hrvatski grupirani format `2.500`, jednostavni format `2500` i pravilno grupiranje razmacima.
- Točka se prihvaća isključivo kao pravilno grupirani razdjelnik tisućica. Zarez i svi razlomljeni iznosi nisu valjani.
- Razmaci i točke kao razdjelnici tisućica moraju biti pravilno grupirani.
- Nejasan ili nevaljan unos prikazuje pogrešku umjesto tihog nagađanja.
- Na gubitku fokusa valjan se unos prikazuje u formatu `hr-HR`, bez razlomljenog dijela i s oznakom EUR.
- Svaki pretvoreni iznos mora biti siguran nenegativni cijeli broj eura unutar definiranog ograničenja.

### 12.2. Računi

- Potreban je najmanje jedan račun.
- U prvoj verziji dopušteno je najviše 20 računa.
- Naziv nakon uklanjanja rubnih razmaka mora imati od 1 do 60 znakova.
- Dva računa ne mogu imati isti naziv neovisno o veličini slova.
- Račun sa stanjem nula je dopušten, ali zbroj svih računa mora biti veći od nule za nastavak.
- Brisanje računa sa stanjem većim od nule traži potvrdu.
- Naziv se prikazuje kao običan tekst i nikada se ne umeće kao HTML.
- Brojevi računa, IBAN-i i sigurnosni podaci nisu dopušten sadržaj prema korisničkoj uputi, ali aplikacija ih ne šalje niti pokušava analizirati.

### 12.3. Vlastite kategorije

- Naziv nakon uklanjanja rubnih razmaka mora imati od 1 do 60 znakova.
- Dvije vlastite kategorije u istom području ne mogu imati isti naziv neovisno o veličini slova.
- Isti naziv može postojati u različitim područjima.
- U prvoj verziji dopušteno je najviše 30 vlastitih kategorija ukupno.
- Početne kategorije nije moguće preimenovati ni izbrisati.
- Vlastitu kategoriju moguće je izbrisati.
- Ako je iznos kategorije veći od nule, brisanje traži potvrdu i odmah ponovno računa status.
- Korisnički tekst prikazuje se kao običan tekst i nikada se ne umeće kao HTML.

### 12.4. Navigacija i dovršenost

- Korak računa nije moguće nastaviti bez valjanog računa i ukupnog zbroja većeg od nule.
- Korak namjena nije moguće nastaviti dok `T !== 0` ili postoji nevaljan unos.
- Privremeno prevelika namjena dopuštena je tijekom uređivanja, ali ne dopušta nastavak.
- Stresni korak traži valjan očekivani mjesečni prihod i najmanje jedan odgovor.
- Odabir "Još ne znam" poništava sve druge odabire.
- Bilješka "Drugo" ima najviše 300 znakova.
- Osobno pravilo nakon uklanjanja rubnih razmaka mora imati od 1 do 300 znakova.
- U stanju se sprema samo korisnikov završetak osobnog pravila, a cijela se rečenica sastavlja za prikaz.

## 13. Rubni slučajevi

### Računi

- Prazan popis računa ne dopušta nastavak.
- Svi računi sa stanjem nula daju ukupno nula i ne dopuštaju završetak proračuna.
- Dodavanje računa povećava "Ukupno za namijeniti" bez automatske promjene kategorija.
- Brisanje ili smanjenje stanja može trenutačno proizvesti "Previše namijenjeno".
- Prijenos novca s jednog korisnikovog računa na drugi ne bi smio promijeniti ukupan zbroj, ali korisnik mora ručno ažurirati oba stanja.
- Isti stvarni novac ne smije se unijeti na dva računa. Sučelje treba kratko upozoriti na dvostruko brojanje.
- Očekivani budući prihod ne smije se ponovno dodati kao trenutačni račun dok stvarno nije primljen.
- Negativna stanja nisu podržana u v1. Dug i prekoračenje planiraju se kao namjena za otplatu.
- Bitcoin novčanik koristi ručnu EUR vrijednost. Promjena cijene Bitcoina ne ažurira se automatski.
- Ako korisnik kasnije promijeni EUR vrijednost Bitcoin novčanika, status namjena ponovno se računa.

### Namjene

- Sve kategorije na nuli ostavljaju cijeli zbroj računa za namijeniti.
- Jedna kategorija može privremeno biti veća od ukupnog iznosa; status pokazuje koliko je previše namijenjeno.
- Područje može ostati na nuli, uključujući dug, davanje, pričuvu i Bitcoin.
- Zbroj se računa isključivo iz cijelih brojeva eura, pa namjene mogu pouzdano dosegnuti točnu nulu bez pogrešaka s pomičnim zarezom.
- Brisanje ili promjena kategorije nakon dovršetka vraća modul u nedovršeno stanje ako zbroj više nije jednak ukupnom stanju računa.
- Dugi nazivi moraju se pravilno prelomiti bez preklapanja s iznosom i akcijama.

### Stresni scenarij

- Očekivani prihod ostaje odvojen od trenutačnih računa.
- Stresni prihod računa se iz izvornog iznosa u cijelim eurima i zatim zaokružuje prema pravilu iz odjeljka 11.3.
- Ako 80% očekivanog prihoda nije cijeli broj, stresni prihod zaokružuje se na najbliži cijeli euro; primjerice `1.001 EUR` daje `801 EUR` stresnog prihoda i `200 EUR` smanjenja.
- Korisnik može odabrati samo kategorije s iznosom većim od nule.
- "Korištenje postojeće pričuve" je izjava o namjeri, ne potvrda da je pričuva dovoljna.
- Promjena računa, namjena ili očekivanog prihoda nakon stresa poništava prethodnu potvrdu.

### Lokalno spremanje

- Ako `localStorage` nije dostupan, pun ili baca sigurnosnu pogrešku, modul nastavlja raditi u memoriji i upozorava da će se podaci izgubiti zatvaranjem stranice.
- Nevaljan JSON ne smije srušiti stranicu niti se njegov sadržaj smije ispisati u konzolu.
- Nepoznata buduća verzija sheme ne učitava se kao v1.
- Osvježavanje stranice vraća posljednje uspješno spremljeno valjano stanje i korak.
- Privatni način rada preglednika može izbrisati podatke nakon zatvaranja.
- Više otvorenih kartica nije sinkronizirano u v1. Posljednje spremanje pobjeđuje.

### Navigacija i prikaz

- Akcija "Natrag" vraća prethodni korak bez gubitka podataka.
- Osvježavanje zasebne rute mora raditi kroz postojeći prerender i Cloudflare routing.
- Bez JavaScripta prikazuje se poruka da je za interaktivni izračun potreban JavaScript.

## 14. Privatnost i sigurnost podataka

### 14.1. Obvezna pravila

1. Nazivi računa, stanja, kategorije, iznosi, stresni odgovor i osobno pravilo ostaju u React stanju i `localStorage` pohrani preglednika.
2. Modul ne koristi `fetch`, XHR, `sendBeacon`, WebSocket, obrazac s mrežnim `action` odredištem ni drugi prijenos financijskih podataka.
3. Podaci se ne stavljaju u URL, query parametre, hash, naslov dokumenta, meta oznake, analitičke atribute ili vanjske linkove.
4. Podaci se ne zapisuju u `console.*`, logove, error reporting ni analitičke događaje.
5. Interne financijske kontrole ne dobivaju postojeće `data-cta` ili `data-link` oznake.
6. Modul ne postavlja kolačiće i ne koristi `sessionStorage` ili IndexedDB kao dodatni spremnik.
7. Lokalni zapis ima zaseban, verzioniran ključ i sadrži samo podatke potrebne za nastavak.
8. Na uvodu i rezultatu postoji akcija za potpuno brisanje lokalnog zapisa.
9. Brisanje uklanja zapis, prazni memorijsko stanje i vraća korisnika na početak.
10. Financijski podaci ne ulaze u prerenderirani HTML ni serverski render.
11. Nema povezivanja s bankom, burzom, novčanikom ili servisom za cijene.

Predloženi ključ:

```text
bitcoin-savjetovanje:proracun-nulte-razine:v1
```

### 14.2. Transparentna poruka korisniku

Preporučeni sadržaj:

> Nazivi računa, stanja i namjene spremaju se samo u lokalnu pohranu ovog preglednika kako biste mogli nastaviti kasnije. Aplikacija ih ne šalje na server, u analitiku ni u logove. Podatke možete izbrisati u svakom trenutku.

Uz poruku treba jasno navesti:

- lokalna pohrana nije enkripcija,
- osoba koja ima pristup istom profilu preglednika može vidjeti podatke,
- ekstenzije preglednika i sam preglednik nisu pod kontrolom ove aplikacije,
- ne treba unositi IBAN, broj računa, Bitcoin adresu, seed phrase, privatni ključ ili pristupne podatke.

Ne koristiti apsolutne tvrdnje poput "nitko osim vas ne može vidjeti podatke".

### 14.3. Odnos prema postojećoj infrastrukturi

Repozitorij trenutačno nema analitiku. Postojeći `ctaEvents` šalje samo interni browser događaj i u razvojnom načinu zapisuje statičke podatke o označenim CTA linkovima. Financijske kontrole ovog modula ne smiju biti dio tog sustava.

Ako se u budućnosti uvede analitika ili error reporting, modul mora ostati izričito isključen iz snimanja obrazaca, session replaya, DOM tekstova, mrežnih payloadova i error konteksta.

## 15. Lokalno spremanje i životni ciklus

- Spremanje počinje nakon prvog valjanog računa.
- Nakon svake uspješne promjene zapisuje se kanonsko stanje.
- Kratki debounce je dopušten, ali korisnik treba vidjeti stanje "Spremljeno na ovom uređaju".
- Nevaljan sirovi tekst u aktivnom polju ne zapisuje se kao valjana vrijednost.
- Učitavanje iz `localStorage` događa se samo na klijentu nakon provjere `window` objekta.
- Učitani zapis prolazi provjeru sheme i osnovnih tipova prije korištenja.
- Zapis nema automatski rok brisanja u v1.
- Sprema se jedan aktualni plan.
- Novi početak zamjenjuje prethodni zapis nakon potvrde.
- Brisanje je dostupno na ekranu nastavka i na rezultatu.

## 16. UX, pristupačnost i vizualna pravila

- Prvi zaslon je stvarni alat s kompaktnim uvodom, ne marketinška hero stranica.
- Sučelje jasno odvaja "Računi" od "Namjena".
- Korak računa koristi pregledan popis ili tablični raspored, ne zasebnu dekorativnu karticu za svaki red.
- Glavni radni ekran optimiziran je za ponavljani unos i pregled zbrojeva.
- Stil slijedi postojeću tipografiju, boje područja proračuna, gumbe i urednički ton stranice.
- Gumbi za dodavanje, brisanje, povratak i nastavak koriste postojeće Lucide ikone kada su prikladne.
- Svako polje ima vidljivu oznaku; placeholder nije zamjena za `label`.
- Pogreška je povezana s poljem preko `aria-describedby`, a nevaljano polje koristi `aria-invalid`.
- Status "Još za namijeniti" koristi `aria-live="polite"` i ne objavljuje cijeli ekran pri svakom unosu.
- Status koristi tekst i ikonu uz boju.
- Nakon prelaska koraka fokus se premješta na naslov novog koraka.
- Sve funkcije dostupne su tipkovnicom.
- Minimalna dodirna površina interaktivnih kontrola je 44 x 44 px.
- Polja i akcije ne smiju mijenjati položaj zbog promjene iznosa ili statusa.
- Sučelje radi bez horizontalnog pomicanja na širini od 320 px.
- Mobilna tipkovnica i ljepljivi sažetak ne smiju sakriti aktivno polje ili navigaciju.
- Prikaz ostaje upotrebljiv pri 200% zoomu.
- Animacije poštuju `prefers-reduced-motion`.

## 17. Kriteriji prihvata

### AC-01: Ruta i ulaz

- Modul je dostupan na `/proracun/nulta-razina/` i povezan s `/proracun/`.
- Izravno otvaranje i osvježavanje rute radi u buildu i Cloudflare Pages konfiguraciji.
- Prerenderirani HTML sadrži naslov i poruku o privatnosti, ali ne korisničke podatke.

### AC-02: Računi

- Korisnik može dodati, imenovati, urediti i izbrisati više računa.
- Primjeri "Gotovina", "Tekući račun", "Žiro račun" i "Bitcoin novčanik" mogu se unijeti kao nazivi.
- Za račune `100 EUR`, `2.000 EUR` i `5.000 EUR` modul prikazuje `7.100 EUR` ukupno za namijeniti.
- Svaka valjana promjena stanja odmah ažurira ukupni zbroj.
- Prazan, negativan ili nevaljan iznos ne dopušta nastavak.
- Jedan ili više računa čiji je ukupan zbroj nula ne dopušta nastavak na namjene.

### AC-03: Kategorije

- Prikazano je svih sedam područja.
- Prikazane su definirane početne kategorije.
- Korisnik može dodati vlastite kategorije poput "Stanovanje", "Transport" i "Hrana".
- Korisnik može izbrisati vlastitu kategoriju uz definirana pravila.
- Nijedno područje nema prisilni minimalni iznos.
- Namjena kategorije ne mijenja stanje pojedinog računa.

### AC-04: Izračun uživo

- Stalno su vidljivi "Ukupno za namijeniti", "Namijenjeno" i odgovarajući status razlike.
- Ako je ukupno za namijeniti `1.000 EUR`, a stanovanju je namijenjeno `500 EUR`, prikazuje se `500 EUR` još za namijeniti.
- Kada zbroj kategorija dosegne `1.000 EUR`, prikazuje se `0 EUR` još za namijeniti.
- Kada kategorije prelaze zbroj računa, prikazuje se točno koliko je previše namijenjeno, ne negativno "Još za namijeniti".
- Unosi s razlomljenim iznosom odbijaju se, a zbrajanje cijelih eura ne proizvodi lažnu razliku zbog pomičnog zareza.

### AC-05: Zaključavanje tijeka

- Korisnik ne može nastaviti iz namjena dok razlika nije točno nula i svi unosi nisu valjani.
- Povratak na prethodne korake čuva podatke.
- Promjena računa ili namjene ispravno poništava zastarjeli završni status.

### AC-06: Stresni scenarij

- Očekivani prihod unosi se odvojeno od računa i ne mijenja "Ukupno za namijeniti".
- Za očekivani prihod `2.500 EUR` modul prikazuje stresni prihod `2.000 EUR` i smanjenje `500 EUR`.
- Za očekivani prihod `1.001 EUR` modul zaokružuje izračunatih 80% na `801 EUR` i prikazuje smanjenje od `200 EUR`.
- Korisnik mora odabrati najmanje jednu kategoriju ili "Još ne znam".
- Korak ne tvrdi da je izračunati iznos puni manjak prema trenutačnim kategorijama.
- Korak ne tvrdi da je odgovor preporuka ili dovršen krizni plan.

### AC-07: Osobno pravilo i rezultat

- Prazno pravilo ne omogućuje završetak.
- Valjano pravilo prikazuje se kao cijela rečenica bez dvostrukog prefiksa.
- Rezultat prikazuje račune, zbroj računa, zbrojeve namjena, nulu, stresni ishod i osobno pravilo.

### AC-08: Lokalno spremanje

- Osvježavanje stranice vraća posljednje valjano spremljeno stanje i korak.
- Sprema se samo verzionirani zapis ovog modula.
- Korisnik može nastaviti postojeći zapis ili ga trajno izbrisati.
- Oštećen ili nepoznat zapis ne ruši aplikaciju i ne ispisuje sadržaj u konzolu.
- Ako lokalno spremanje nije dostupno, modul radi u memoriji i prikazuje upozorenje.

### AC-09: Privatnost

- Nakon učitavanja modula unos računa, stanja, namjena, stresa i pravila ne šalje financijske podatke mrežom.
- Nijedan uneseni podatak nije u URL-u, CTA događaju, analitici, konzoli ili logu.
- U kodu modula nema mrežnog slanja i nema forme s mrežnim `action` odredištem.
- Brisanje uklanja lokalni zapis i resetira prikaz.
- Poruka o privatnosti točno kaže da lokalna pohrana nije enkriptirana.

### AC-10: Pristupačnost i responsive prikaz

- Cijeli tijek moguće je dovršiti samo tipkovnicom.
- Fokus, oznake, pogreške, napredak i live status dostupni su čitaču zaslona.
- Nema preklapanja, rezanja teksta ni horizontalnog pomicanja na podržanim širinama.
- Sučelje ostaje upotrebljivo pri 200% zoomu i uz smanjeno kretanje.
- Bez JavaScripta prikazuje se točna poruka o ograničenju.

### AC-11: Regresije i provjere repozitorija

- Postojeće rute, interaktivna procjena i CTA infrastruktura nastavljaju raditi.
- Prolaze `npm run lint`, `npm run typecheck`, `npm run build` i `npm run verify:dist`.
- Prolaze novi testovi računa, zbrajanja, namjena, parsiranja, stresa i lokalnog spremanja.
- Vizualni tijek ručno je provjeren na mobilnoj i desktop širini prije deploya.

## 18. Što točno znači da je prva verzija završena

Prva verzija je završena tek kada je cijeli sljedeći vertikalni tijek produkcijski spreman:

1. Korisnik otvori zasebnu rutu i razumije lokalno spremanje.
2. Doda jedan ili više računa i ručno upiše trenutačno stanje svakoga.
3. Vidi točan zbroj svih računa kao "Ukupno za namijeniti".
4. Doda ili koristi kategorije unutar sedam područja.
5. Dodjeljuje iznose kategorijama i cijelo vrijeme vidi koliko još treba namijeniti.
6. Ne može dovršiti proračun dok razlika nije točno `0 EUR`.
7. Zasebno unese očekivani mjesečni prihod i vidi učinak pada od 20% bez dvostrukog brojanja tog prihoda.
8. Zabilježi što bi prvo preispitao.
9. Zapiše osobno pravilo.
10. Dobije cjelovit rezultat koji može ponovno otvoriti i urediti.
11. Podaci prežive osvježavanje isključivo u lokalnoj pohrani i mogu se potpuno izbrisati.
12. Financijski podaci ne napuste preglednik kroz URL, analitiku, logove ili aplikacijski mrežni prijenos.
13. Svi kriteriji prihvata, automatizirane provjere i osnovni pristupačni/responsive scenariji prolaze.

Verzija nije završena ako postoji samo polje mjesečnog prihoda bez računa, ako zbroj računa nije izvor ukupnog iznosa za namijeniti, ako kategorije ne pokazuju točnu preostalu razliku, ako nema stresa i pravila, ako rezultat nije lokalno obnovljiv, ako nema jasnog brisanja ili ako financijski podaci mogu završiti u mrežnom zahtjevu ili logu.

Objava na produkciju nije dio same definicije implementiranog koda. Modul se ne smatra spremnim za produkciju dok ne prođe postojeći Cloudflare build i `verify:dist`. Deploy se radi tek nakon posebnog odobrenja.

## 19. Prijedlog ponovno upotrebljivih dijelova

### Domenska logika

- `parseEuroToEuros` - strogo pretvaranje lokaliziranog unosa u cijele eure.
- `formatEuroFromEuros` - prikaz cijelih eura preko `Intl.NumberFormat` za `hr-HR` i EUR.
- `calculateAvailableFunds` - zbroj stanja svih računa.
- `calculateAssignments` - zbrojevi kategorija, područja i preostala razlika.
- `calculateStressScenario` - očekivani prihod od 80% i smanjenje.
- `validateBudgetZeroDraft` - provjera lokalno učitanog zapisa.

Te funkcije mogu kasnije koristiti moduli za dug, neto imovinu, stvarni višak i buduće obveze.

### UI komponente

- `MoneyInput` - lokalizirani unos iznosa s pristupačnim pogreškama.
- `AccountList` - pregled računa i ukupnog zbroja.
- `AccountRow` - naziv, stanje i akcije računa.
- `StepProgress` - naslov koraka, napredak i fokus nakon navigacije.
- `LiveAssignmentStatus` - ukupno, namijenjeno i preostalo/previše namijenjeno.
- `AllocationArea` - područje sa zbrojem i popisom kategorija.
- `CategoryRow` - naziv, iznos i akcije kategorije.
- `CustomCategoryEditor` - dodavanje i validacija vlastite kategorije.
- `LocalOnlyDataNotice` - transparentna poruka o lokalnoj pohrani i brisanju.
- `LocalDraftControls` - nastavak, stanje spremanja i brisanje.
- `RuleComposer` - fiksni početak rečenice i korisnički završetak.
- `ResultSummary` - semantički sažetak računa i namjena.

### Upravljanje stanjem

- `useBudgetZero` ili reducer za predvidljive prijelaze i poništavanje zastarjelog stresa.
- mali storage adapter s metodama `load`, `save` i `clear`.

Ne treba u prvom koraku refaktorirati postojeću Bitcoin procjenu u zajednički wizard. Zajednički okvir koraka može se izdvojiti tek kada oba tijeka pokažu stabilne zajedničke potrebe.

## 20. Predložena struktura koda

```text
src/
  components/
    budget-zero/
      BudgetZeroModule.tsx
      BudgetAccountsStep.tsx
      BudgetAllocationStep.tsx
      BudgetStressStep.tsx
      BudgetRuleStep.tsx
      BudgetResult.tsx
      AccountList.tsx
      AccountRow.tsx
      AllocationArea.tsx
      CategoryRow.tsx
      LiveAssignmentStatus.tsx
      LocalOnlyDataNotice.tsx
  content/
    budgetZero.ts
  lib/
    budgetZero.ts
    budgetZero.test.ts
    budgetZeroStorage.ts
    budgetZeroStorage.test.ts
  pages/
    BudgetZero.tsx
```

Ako `MoneyInput` nakon implementacije ima stvarno generičan ugovor, može biti u `src/components/ui/`; inače treba ostati unutar modula.

## 21. Plan implementacije u malim zadacima

### Faza 0: Potvrda specifikacije - završeno

1. Potvrditi da je zbroj trenutačnih stanja računa jedini izvor "Ukupno za namijeniti".
2. Potvrditi da račun i kategorija nisu međusobno izravno vezani.
3. Potvrditi početne kategorije u sedam područja.
4. Potvrditi da se mjesečni prihod koristi samo u stresnom scenariju.
5. Potvrditi da negativna stanja i kreditni računi nisu dio v1.

### Faza 1: Čista domenska logika

1. Definirati tip računa, kategorije i stabilne ID-eve područja.
2. Implementirati strogo parsiranje EUR unosa u cijele eure.
3. Implementirati formatiranje cijelih eura za `hr-HR`.
4. Implementirati zbroj računa.
5. Implementirati zbroj namjena i preostalu razliku.
6. Implementirati stresni izračun od 80%.
7. Dodati tablične testove za primjere računa, nulu, preveliku namjenu i zaokruživanje stresnog prihoda na cijeli euro.

### Faza 2: Lokalno spremanje

1. Definirati verzioniranu shemu zapisa.
2. Implementirati `load`, `save` i `clear` bez pristupa `window` tijekom SSR-a.
3. Dodati provjeru tipova i obradu oštećenog zapisa.
4. Dodati memorijski fallback kada `localStorage` nije dostupan.
5. Dodati testove učitavanja, spremanja, brisanja i nepoznate verzije.

### Faza 3: Ruta i okvir modula

1. Dodati stranicu, lazy route komponentu i route metadata.
2. Dodati prerender, sitemap i SEO integraciju prema postojećem obrascu.
3. Dodati kompaktni uvod, `noscript` poruku i lokalnu poruku o privatnosti.
4. Dodati CTA s `/proracun/` bez diranja nepovezanog sadržaja.
5. Proširiti `verify:dist` provjerama nove rute i privacy copyja.

### Faza 4: Računi

1. Izgraditi `MoneyInput`.
2. Izgraditi korak za dodavanje, uređivanje i brisanje računa.
3. Dodati validaciju naziva i stanja.
4. Dodati zbroj "Ukupno za namijeniti" uživo.
5. Dodati uputu za ručnu EUR vrijednost Bitcoin novčanika.
6. Dodati automatsko lokalno spremanje i status spremanja.

### Faza 5: Namjene

1. Izgraditi sedam područja i početne kategorije.
2. Dodati vlastite kategorije, validaciju i potvrdu brisanja.
3. Dodati `LiveAssignmentStatus`.
4. Zaključati nastavak dok razlika nije nula.
5. Pokriti promjene računa nakon već unesene namjene.

### Faza 6: Stres, pravilo i rezultat

1. Dodati zaseban unos očekivanog mjesečnog prihoda.
2. Izgraditi prikaz stresnog izračuna bez pribrajanja računima.
3. Dodati višestruki odabir prvog odgovora i ponašanje "Još ne znam".
4. Dodati osobno pravilo.
5. Izgraditi završni sažetak računa i namjena.
6. Dodati uređivanje, poništavanje zastarjelog stresa i potpuno brisanje.

### Faza 7: Pristupačnost i responsive dorada

1. Dodati upravljanje fokusom po koracima.
2. Provjeriti labele, pogreške, `aria-live`, napredak i tipkovnicu.
3. Provjeriti mobilni prikaz od 320 px i desktop.
4. Provjeriti 200% zoom, duge nazive i velika novčana polja.
5. Provjeriti da ljepljivi sažetak ne skriva sadržaj ni mobilnu tipkovnicu.

### Faza 8: Privatnost i završna verifikacija

1. Pregledati kod za `fetch`, XHR, `sendBeacon`, mrežni `form action`, `console.*`, `data-cta` i `data-link`.
2. U browseru potvrditi da interakcije ne šalju unesene podatke.
3. Potvrditi da URL, konzola, događaji i prerenderirani HTML ne sadrže podatke.
4. Proći cijeli happy path i ključne rubne slučajeve.
5. Pokrenuti lint, typecheck, testove, build i `verify:dist`.
6. Napraviti završnu vizualnu provjeru mobilnog i desktop prikaza.

## 22. Potvrđene proizvodne odluke

Implementacija slijedi ove potvrđene proizvodne odluke:

1. Korisnik najprije dodaje račune i trenutačna stanja.
2. Zbroj računa, a ne mjesečni prihod, daje "Ukupno za namijeniti".
3. Računi i kategorije su odvojeni; v1 ne određuje s kojeg računa dolazi pojedina namjena.
4. Sedam područja ostaje fiksno, a korisnik unutar njih dodaje vlastite kategorije.
5. Očekivani mjesečni prihod unosi se zasebno samo za stresni scenarij i ne pribraja se računima.
6. Stresni scenarij pokazuje 20% manji budući priljev, ali bez mjesečnih ciljeva ne izračunava puni manjak po kategorijama.
7. Negativna stanja i kreditni računi nisu dio prve verzije; otplata se planira kroz područje duga.
8. Prva verzija sprema jedan aktualni plan bez povijesti, izvoza i sinkronizacije.
9. Svi novčani unosi, pohranjene vrijednosti i prikazi koriste cijele eure; stresni izračun jedino interno može proizvesti razlomljenu međuvrijednost prije obveznog zaokruživanja.

Implementacija funkcionalnog modula i njegove rute je izvedena. Produkcijska
završnost i objava ostaju odvojeni koraci: postojeći repozitorijski
`verify:dist` trenutačno još prijavljuje nepovezane nedostajuće slikovne
fallbackove na drugim stranicama, pa modul nije proglašen spremnim za deploy.
