## Tablica sadržaja

- [1. Motivacija](#org9aa3174)
- [2. Zadatak](#org952f8ac)
    - [2.1. Pristupanje dokumentaciji jezgrenih poziva i bibliotečnih funkcija](#org275d690)
    - [2.2. Osnovna funkcionalnost ljuske](#orga2f09c6)
        - [2.2.1. Osnovno pokretanje programa](#org69fd595)
            - [2.2.1.1. Preporučeni tijek rješavanja](#orgb57bf95)
        - [2.2.2. Osnovne ugrađene naredbe i propagacija signala](#org5c59dfa)
            - [2.2.2.1. Naredba `cd`](#org32af544)
            - [2.2.2.2. Naredba `exit`](#orga300b00)
            - [2.2.2.3. Slanje signala](#org9bff031)
            - [2.2.2.4. Bitne napomene](#org4f71078)
            - [2.2.2.5. Preporučeni tijek rješavanja](#orgae100c4)
        - [2.2.3. Prošireno pokretanje programa pomoću varijabli okoline](#org2c70b23)
            - [2.2.3.1. Bitne napomene](#orgdd167d1)
            - [2.2.3.2. Preporučeni tijek rješavanja](#org9c35c4a)
    - [2.3. Kontrola poslova - zaustavljanje programa i pokretanje programa u pozadini](#orgaae33ac)
        - [2.3.1. Praćenje poslova](#org33d36be)
        - [2.3.2. Funkcija za obradu signala](#orgcd22914)
        - [2.3.3. Bitne napomene](#orgbd66e58)
        - [2.3.4. Preporučeni tijek rješavanja](#orgc2dd012)
- [3. Napomene](#orgc6339db)

## 1. Motivacija

Cilj ove laboratorijske vježbe je praktično proučavanje i upoznavanje s jezgrenim pozivima vezanim uz stvaranje i upravljanje procesima. U okviru vježbe potrebno je ostvariti jednostavnu ljusku `fsh` _(Fer SHell)_.

## 2. Zadatak

Zadatak je podijeljen u dva glavna dijela, a popis funkcionalnosti koje je potrebno ostvariti je dan u nastavku:

1. Osnovna ljuska **_(2 boda)_**
    - Osnovno pokretanje programa
    - Ugrađene naredbe `cd` i `exit` te propagacija signala `SIGINT`
    - Prošireno pokretanje programa pomoću varijabli okoline
2. Kontrola poslova - zaustavljanje programa i pokretanje programa u pozadini **_(2 boda)_**

Za priznavanje bodova zadatka obavezno je imati ostvaren prvi dio zadatka, dok se drugi dio ne mora ostvariti. Ljusku je potrebno **ostvariti u programskom jeziku C ili C++** (bilo koji standard) te u bilo kojem **UNIX okruženju** (npr. GNU/Linux, FreeBSD, itd.). Dodatno je dozvoljeno korištenje bilo kojih funkcija koje pruža standardna C biblioteka (npr. `glibc`, `musl`) **osim funkcija** **`system, execvp, execlp i execvpe`**.

### 2.1. Pristupanje dokumentaciji jezgrenih poziva i bibliotečnih funkcija

Tijekom ove laboratorijske vježbe susrest ćete se s raznim složenim jezgrenim pozivima čije je ponašanje potrebno detaljno proučiti kako bi ljuska ispravno radila. Glavni izvor informacija pri radu sa naredbama ili funkcijama koje pruža operacijski sustav je naredba `man`. Naredba `man` kao argument prima ime programa ili funkcije čijoj se dokumentaciji želi pristupiti. Bitno je napomenuti da je dokumentacija cijelog sustava podijeljena u zasebne sekcije grupirane po vrsti sadržaja kojeg opisuju. Primjerice, treća sekcija opisuje bibliotečne funkcije, druga sekcija opisuje jezgrene pozive, a prva opisuje programe ili ugrađene naredbe ljuske. Pozivanje naredbe `man` u obliku `man <ime_programa>` slijedom pretražuje sekcije i vraća prvu dokumentaciju koja odgovara imenu programa. Nažalost, neke funkcije i naredbe dijele imena, te je moguće da vam naredba `man` vrati pogrešnu dokumentaciju, kao što je prikazano u slijedećem primjeru.

|   |   |
|---|---|
Pristupanje odgovarajućoj dokumentaciji bibliotečne funkcije sleep.
|$ man sleep<br>SLEEP(1)   User Commands   SLEEP(1)<br><br>NAME<br>       sleep - delay for a specified amount of time<br>SYNOPSIS<br>       sleep NUMBER[SUFFIX]...<br>       sleep OPTION<br>...|$ man 3 sleep<br>sleep(3)   Library Functions Manual   sleep(3)<br><br>NAME<br>       sleep - sleep for a specified number of seconds<br><br>LIBRARY<br>       Standard C library (libc, -lc)<br><br>SYNOPSIS<br>       #include <unistd.h><br>       unsigned int sleep(unsigned int seconds);<br>...|

Taj problem rješavamo tako da naredbi `man` eksplicitno zadamo sekciju koju treba pretražiti. Tako se dokumentaciji bilo kojeg jezgrenog poziva pristupa naredbom `man 2 <ime_poziva>`. a dokumentaciji funkcija standardne C biblioteke pristupa se naredbom `man 3 <ime_funkcije>`.

### 2.2. Osnovna funkcionalnost ljuske

#### 2.2.1. Osnovno pokretanje programa

Pseudokod [1](#org1e4bd21) ugrubo opisuje rad ljuske. Prije čekanja na upisivanje naredbe, vaša ljuska treba ispisati "`fsh>` ". Svaka naredba sastoji se od imena naredbe i više argumenata koji su odvojeni proizvoljnim brojem razmaka. Nije potrebno ostvariti "brisanje" znakova prilikom upisivanja naredbe.

Primjer 1: Pseudokod osnovnog rada ljuske.

while(1){
    ispisi "fsh> ";

    cekaj naredbu;
    procitaj znakovni niz i obradi;

    naredba = pronadi_naredbu();
    if(naredba nije ugradena){
       stvori novi proces;
       u djetetu pokreni program s unesenim argumentima;
       cekaj zavrsetak djeteta;
    }
}

Primjer 2: Primjer ispravnog rada ljuske.

fsh> /usr/bin/pwd
/home/student
fsh> /usr/bin/echo "pozdrav"
pozdrav
fsh> /usr/bin/ls -lh
# ispis sadrzaja direktorija
fsh> /bin/asdf
fsh: Unknown command: /bin/asdf

##### 2.2.1.1. Preporučeni tijek rješavanja

1. Napisati osnovni kostur ljuske,
2. Ostvariti funkciju koja ulazni niz znakova razbija na ime naredbe i argumente (ako postoje),
3. Detaljno proučiti jezgrene pozive `fork`, `wait`, i `execve`,
4. Ostvariti funkciju koja prepoznaje "ugrađene" naredbe (potrebno za drugi podzadatak),
5. Ostvariti pokretanje programa pomoću jezgrenih poziva navedenih u trećoj točki.

#### 2.2.2. Osnovne ugrađene naredbe i propagacija signala

##### 2.2.2.1. Naredba `cd`

Ugrađena naredba `cd` treba korisniku omogućiti osnovnu navigaciju po datotečnom sustavu, za što preporučujemo koristiti funkciju `chdir()` (`man 3 chdir`). Primjer ispravno ostvarene naredbe dan je u Primjeru [3](#org5b37321). Posebnu pozornost potrebno je obratiti na sljedeće slučajeve:

- Za sve greške (npr. nepostojeće direktorije) potrebno je ispisati odgovarajuću poruku na `stderr`

Primjer 3: Primjer ispisa prilikom korištenja ispravno ostvarene naredbe `cd`

fsh> /usr/bin/pwd
/home/student
fsh> cd Documents
fsh> /usr/bin/pwd
/home/student/Documents
fsh> cd /nepostojec
cd: The directory '/nepostojec' does not exist

##### 2.2.2.2. Naredba `exit`

Ugrađena naredba `exit` treba korisniku omogućiti izlazak iz ljuske kada ju korisnik upiše ili kada korisnik pošalje prazan niz znakova kao naredbu.

##### 2.2.2.3. Slanje signala

Vaša ljuska mora korisniku omogućiti da ručno prekine izvođenje pomoću kombinacije tipki `CTRL-C`, odnosno slanjem signala `SIGINT`. Pri tome je bitno da poslani signal **ne prekine rad ljuske, nego programa koji se trenutno izvodi**. Ako korisnik pošalje `SIGINT` dok nijedan program nije pokrenut, potrebno je samo ispisati novi red. Za ostvarenje ove funkcionalnosti preporučujemo porodicu funkcija `sigaction` (`man 3 sigaction`). Vaša ljuska bi trebala "uhvatiti" signal i odlučiti što s njim treba napraviti.

##### 2.2.2.4. Bitne napomene

Koncept _procesnih grupa_[1](#fn.1) i standard _POSIX_ propisuju da svi signali poslani preko tipkovnice moraju biti propagirani svim procesima koji su članovi tzv. _foreground process_ grupe. Kako je naša ljuska član te grupe, u našem slučaju to vodi do neispravne propagacije signala `SIGINT` jer se isti propagira svim procesima pokrenutim iz ljuske, a ne samo ljusci. Rješenje za ovaj problem je smjestiti novostvoreni proces dijete u zasebnu grupu **pozivom funkcije `setpgid(0,0)` (`man 3 setpgid`) u djetetu prije poziva `execve()`**.

Pritiskom kombinacije tipki `CTRL+C` Vaša ljuska **ne dobiva nikakav niz znakova na standardni ulaz**, već jezgra operacijskog sustava prepoznaje tu kombinaciju i šalje signal `SIGINT`. Stoga nije potrebno provjeravati je li ljuska primila znakove `"^C"` kao ulaz.

##### 2.2.2.5. Preporučeni tijek rješavanja

1. Dodati `cd` i `exit` u popis ugrađenih naredbi,
2. Dodati funkcionalnosti za prethodno navedene naredbe,
3. Izmijeniti pokretanje djeteta tako da se dijete smjesti u zasebnu procesnu grupu,
4. Ostvariti funkciju za obradu signala `SIGINT`.

#### 2.2.3. Prošireno pokretanje programa pomoću varijabli okoline

U dosadašnjim primjerima za sve naredbe bilo je potrebno navesti njihovu punu putanju. Kako je taj cijeli postupak nezgrapan i dugotrajan, ljuske obično pružaju mogućnost upisivanja samo imena programa. Nakon što je upisano ime naredbe, ljuska traži program naredbe u prethodno definiranim dijelovima datotečnog sustava koji su dostupni preko varijable okoline `PATH` [2](#fn.2). Varijabla `PATH` sadrži niz putanja odvojenih znakom "**:**", a primjer sadržaja varijable dan je u Primjeru [4](#org396c006).

Primjer 4: Primjer sadržaja varijable `PATH`

> echo $PATH
/usr/local/bin:/usr/bin:/bin:/usr/local/sbin

Vaš zadatak je proširiti osnovnu funkcionalnost ljuske tako da omogućite pokretanje programa preko njihovog imena. Vaša ljuska treba dohvatiti sadržaj varijable `PATH` korištenjem bibliotečnog poziva `getenv (man 3 getenv)`, obraditi ga i prilikom svakog pokretanja programa pretražiti sve navedene direktorije kako bi našla odgovarajući program.

Primjer 5: Korištenje poziva `getenv`.

obradi_varijablu_path() {
    ...
    char *sadrzaj = getenv("PATH");
    ...
}

##### 2.2.3.1. Bitne napomene

- Za pronalazak programa u direktoriju preporučujemo koristiti poziv `access` (i jezgreni poziv i bibliotečna funkcija su dozvoljene)
- Postupak pretrage se ne smije pokretati ako korisnik upiše putanju (tj. ako ime naredbe počinje s **'/'** ili **'.'**)
- Potrebno je ispisati poruku greške ako program ne postoji

##### 2.2.3.2. Preporučeni tijek rješavanja

1. Proučiti poziv `getenv()`,
2. Ostvariti dohvaćanje i obradu sadržaja varijable okoline `PATH` pri pokretanju ljuske,
3. Dodati traženje programa naredbe prije pokretanja.

### 2.3. Kontrola poslova - zaustavljanje programa i pokretanje programa u pozadini

Većina ljuski pruža mogućnost kontroliranja stanja programa koji se izvršavaju. Proces se u tom slučaju može naći u tri stanja: _aktivan_, _zaustavljen_ i _ugašen_. Proces se također može izvršavati u pozadini te u "prvom planu", što ste ostvarili u prvom podzadatku. Kad se proces izvršava ili pokrene u pozadini, ljuska ne staje s radom već korisniku nudi mogućnost pokretanja novih naredbi. Za potrebe ovog podzadatka potrebno je koristiti signale `SIGTSTP`, `SIGSTOP`, `SIGCONT`, i `SIGCHLD`.

Slanjem signala `SIGSTOP` jezgra operacijskog sustava privremeno zaustavlja odredišni proces, dok ga slanjem signala `SIGCONT` pokreće. Prilikom završetka izvođenja procesa djeteta, operacijski sustav šalje signal `SIGCHLD` procesu roditelju.

U okviru ovog podzadatka potrebno je ostvariti sljedeće ugrađene naredbe:

- `bg <job_id>` - šalje zaustavljen proces povezan s identifikatorom `job_id` u pozadinsko izvršavanje slanjem signala `SIGCONT`
- `fg <job_id>` - šalje proces povezan s identifikatorom `job_id` u "prvi plan"
- `jobs` - ispisuje sve trenutno aktivne poslove u formatu "`[<id>] (<pid>) <stanje>, <naredba>`"

Nadalje, potrebno je omogućiti da se prilikom pokretanja naredba pokrene u pozadini ako je na kraju dodan znak "**&**". Također je potrebno korisniku omogućiti da trenutno pokrenuti proces zaustavi slanjem signala `SIGSTOP` pomoću kombinacije tipki `CTRL-Z`.

#### 2.3.1. Praćenje poslova

Za ostvarenje ove funkcionalnosti potrebno je ostvariti strukture podataka pomoću koje će ljuska pamtiti informacije o poslovima te pratiti sve aktivne pozadinske poslove. Radi jednostavnosti preporučujemo da praćenje pozadinskih poslova ostvarite pomoću dvostruko povezane liste u čijim se elementima nalaze informacije o poslu (npr, `PID` procesa, `id` posla, itd..). Posao koji se izvršava u "prvom planu" možete pratiti pomoću zasebne varijable. Vaša ljuska svakom pokrenutom procesu dodijeljuje "identifikator posla" koji služi da poveže `PID` procesa sa rednim brojem pokrenute naredbe.

#### 2.3.2. Funkcija za obradu signala

Posebnu pažnju trebate posvetiti funkciji za obradu signala. Funkcija za obradu signala će biti zadužena za praćenje poslova i upravljanje listom poslova te za propagaciju signala `SIGSTOP` procesu koji se izvršava u "prvom planu". Kao što smo prethodno naveli, u okviru ovog podzadatka radit ćete sa signalima `SIGTSTP`, `SIGSTOP`, `SIGCONT`, i `SIGCHLD`.

Prilikom gašenja ili zaustavljanja procesa djeteta, jezgra operacijskog sustava procesu roditelju šalje signal `SIGCHLD`. Ljuska bi po primitku tog signala u funkciji za obradu signala trebala pomoću poziva `waitpid` "pokupiti" proces dijete[3](#fn.3) i provjeriti njegov status pomoću funkcija `WIFEXITED()`, `WIFSIGNALED()` i `WIFSTOPPED()`[4](#fn.4) , nakon čega je potrebno ažurirati strukture za praćenje poslova. Primjer [6](#org448049b) pokazuje pseudokod funkcije za obradu signala `SIGCHLD`.

Primjer 6: Pseudokod obrade signala `SIGCHLD`.

obradi_sigchld() {
  while(1){
    int status;
    pid_t pid = waitpid(-1, &status, WNOHANG | WSTOPPED);

    /*
     * Prekini petlju ako vise nema nijednog
     * procesa djeteta kojeg treba obraditi.
     */
    if(pid == -1)
      break;

    if(proces_zavrsio) {
      /* Obrisi odgovarajucu strukturu iz liste poslova */
      obrisi_posao(pid);
    } else if (proces_zaustavljen) {
      /* Dodaj strukturu posla u listu poslova */
      premjesti_posao_u_pozadinu(pid);
    }

}
}

Pritiskom kombinacije tipki `CTRL-Z` ljusci se šalje signal `SIGTSTP`. Ljuska bi taj signal trebala uhvatiti i zaustaviti proces koji se izvršava u "prvom planu" (ako postoji) tako da mu pošalje signal `SIGSTOP`.

Primjer 7: Primjer ispravno ostvarene kontrole poslova.

fsh> sleep 60
^Z  # SIGSTOP
fsh: Job 1 has stopped
fsh> sleep 120 &   # Pokretanje naredbe u pozadini
fsh> jobs
[1] (1234) Stopped, 'sleep 60'
[2] (1235) Running, 'sleep 120 &'
fsh> bg 1
Job 1 was sent to background
fsh> fg 1

#### 2.3.3. Bitne napomene

Radi jednostavnosti preporučujemo da čekanje na završetak procesa u "prvom planu" **ostvarite petljom s radnim čekanjem i funkcijom `sleep`**.

Primjer 8: Preporučeni način čekanja na završetak posla u "prvom planu".

obrisi_posao(pid) {
     ...
     /* Dojavi prestanak rada posla u "prvom planu" */
     if(pid.prvi_plan)
        prvi_plan_aktivan = 0;
     ...
   }

   obradi_sigchld() {
    pid = waitpid(…);
    if(...) {
      obrisi_posao(pid);
    }
}

izvrsi_naredbu() {
    pid = fork();
    if(pid == 0) { 
      execve(…);
    }
    dodaj_posao(…);

    /* Cekaj dok posao u prvom planu ne završi */
    while(prvi_plan_aktivan)
      sleep(1);
}

Prilikom stvaranja procesa potrebno je dodati novi element u listu poslova. Nažalost, ovdje može doći do situacije u kojoj stvoreni proces završi prije nego ljuska uspije dodati novostvoreni proces u listu poslova, što znači da će funkcija za obradu signala `SIGCHLD` pokušati osloboditi nepostojeći posao. Kako biste ovo izbjegli, **potrebno je maskirati obradu signala `SIGCHLD` prije stvaranja procesa i omogućiti ju nakon ažuriranja liste poslova**.

|   |   |
|---|---|
Primjer 9: Izbjegavanje neispravnog rada ljuske pomoću maskiranja signala.
|obradi_sigchld() {  <br>  pid = waitpid(…);<br>  if(...) {<br>      obrisi_posao(pid);<br>  }<br>}<br>izvrsi_naredbu() { <br>  pid = fork();<br>  if(pid == 0) {<br>      execve(…); <br>  }   <br> /* Funkcija obradi_sigchld moze<br>  * biti pokrenuta prije nego što<br>  * se dodaj_posao izvrsi<br>  */<br>  dodaj_posao(…); <br>}|obradi_sigchld(...) {<br>   pid = waitpid(…);<br>   if (...) {<br>     obrisi_posao(pid);<br>   }<br>}<br><br>izvrsi_naredbu(){<br>    /* Zabrani primanje SIGCHLD */<br>    sigprocmask(SIG_BLOCK, …);<br>    pid = fork();<br>    if (pid == 0) {<br>        /* Dozvoli primanje SIGCHLD */<br>        sigprocmask(SIG_SETMASK, ...);<br>        execve(…);<br>    }<br>    dodaj_posao(…);<br><br>    /* Dozvoli primanje SIGCHLD */<br>    sigprocmask(SIG_SETMASK, …);<br>}|

#### 2.3.4. Preporučeni tijek rješavanja

1. Detaljno proučiti poziv `waitpid` te funkcije `WIF*`,
2. Detaljno proučiti ponašanje signala `SIGTSTP`, `SIGCONT`, `SIGCHLD`, i `SIGSTOP`,
3. Ostvariti strukture podataka potrebne za praćenje poslova,
4. Ostvariti funkciju za obradu signala `SIGCHLD`,
5. Ostvariti čekanje na posao u "prvom planu" pomoću funkcije za obradu signala `SIGCHLD`,
6. Ostvariti slanje signala `SIGSTOP` preko tipkovnice,
7. Ostvariti naredbu `bg` i `jobs`,
8. Ostvariti naredbu `fg`.

## 3. Napomene

- Obavezno provjeravajte povratne vrijednosti svih jezgrenih poziva te ispravno rukujte greškama kako biste si olakšali razvoj laboratorijske vježbe.
- Obavezno pročitajte [_Vodič za otklanjanje grešaka prilikom razvoja programa u programskom jeziku C_](http://www.zemris.fer.hr/predmeti/os2/debugging.html) i koristite opisane postupke da si olakšate razvoj ljuske.
- Pune putanje do programa koje su dane u primjerima mogu se razlikovati od putanja na Vašem sustavu. Putanje do programa možete provjeriti pomoću naredbe `whereis`.
- Radi jednostavnosti ljusku testirajte s naredbama koje ne zahtijevaju unos od korisnika
- Sve funkcionalnosti koje trebate ostvariti mogu se naći u svim modernim ljuskama. Prilikom provjere testiranja vaše ljuske možete koristiti postojeće ljuske kao referencu za ispravno ostvarenu funkcionalnost.

## Fusnote:

[1](#fnr.1) 

[https://www.informit.com/articles/article.aspx?p=366888&seqNum=8](https://www.informit.com/articles/article.aspx?p=366888&seqNum=8)

[2](#fnr.2) 

[https://pubs.opengroup.org/onlinepubs/000095399/basedefs/xbd_chap08.html#tag_08_03](https://pubs.opengroup.org/onlinepubs/000095399/basedefs/xbd_chap08.html#tag_08_03)

[3](#fnr.3) 

Za primjer funkcije za obradu signala `SIGCHLD` preporučujemo pročitati slijedeću poveznicu: [https://www.gnu.org/software/libc/manual/html_node/Process-Completion.html](https://www.gnu.org/software/libc/manual/html_node/Process-Completion.html)

[4](#fnr.4) 

Primjer korištenja ovih funkcija moguće je naći na kraju poveznice [https://linux.die.net/man/2/waitpid](https://linux.die.net/man/2/waitpid)

Created: 2023-03-10 pet 11:52

[Validate](https://validator.w3.org/check?uri=referer)