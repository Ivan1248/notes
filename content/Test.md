---
tags:
creation date: 2026-03-03
---
# Višezadaćni rad

_Upute za laboratorijske vježbe_

---

Višezadaćni rad moguće je ostvariti s pomoću više procesa ili s pomoću više dretvi.

## 1. Ostvarenje višezadaćnog rada s pomoću više procesa

Program je skup instrukcija i podataka koji se nalaze u datoteci na disku. U opisu datoteke ona je opisana kao izvršna i njen sadržaj je organiziran prema pravilima jezgre. Sve dok sadržaj datoteke odgovara pravilima i dok je označena kao izvršna, program može biti pokrenut. Kako bi se pokrenuo novi program, prvo treba (pozivom jezgre) stvoriti novi proces koji je okolina u kojem se izvršava program.

Proces se sastoji od tri segmenta: segment instrukcija, segment korisničkih podataka i segment sustavskih podataka. Program inicijalizira segment instrukcija i korisničke podatke. Nakon inicijalizacije više nema čvste veze između procesa i programa koji on izvodi. Proces dobiva sredstva (više spremnika, datoteke, itd.) koji nisu prisutni u samom programu, mijenja podatke itd. Iz jednog programa može se inicijalizirati više procesa koji se paralelno izvode.

### Sustavski poziv `fork`

Sustavskim pozivom `fork` zahtijeva se stvaranje novog procesa iz postojećeg. Kada proces koji se trenutno izvodi pokrene novi proces, pokrenuti proces postaje "dijete" procesa "roditelja" koji ga je pokrenuo. Dijete dobija kopije segmenta instrukcija i segmenta podataka roditelja. U stvari, budući da se segment instrukcija najčešće ne mijenja, jezgra može uštediti vrijeme i memoriju tako da postavi taj segment kao zajednički za oba procesa (sve dok ga jedan od njih ne odluči inicijalizirati novim programom, tj. pokrenuti drugi program primjerice naredbom `exec`). Također, dijete nasljeđuje većinu sustavskih podataka roditelja.

```c
int fork(void);
```

U ovaj sustavski poziv ulazi jedan proces, a iz njega izlaze dva odvojena procesa ("dijete" i "roditelj") koji dobivaju svaki svoju povratnu vrijednost. Proces dijete dobiva rezultat 0, a roditelj dobiva identifikacijski broj procesa djeteta. Ako dođe do greške, vraćena vrijednost je -1, a dijete nije ni stvoreno. `fork` nema nikakvih argumenata, pa programer ne može biti odgovoran za grešku već je ona rezultat nemogućnosti jezgre da kreira novi proces zbog nedostatka nekog od potrebnih sredstava.

Dijete nasljeđuje većinu atributa iz segmenta sustavskih podataka kao što su aktualni direktorij, prioritet ili identifikacijski broj korisnika. Manje je atributa koji se ne nasljeđuju:

- Identifikacijski brojevi procesa djeteta i roditelja su različiti, jer su to različiti procesi.
- Proces dijete dobiva kopije otvorenih opisnika datoteka (_file descriptor_) od roditelja. Dakle to nisu isti opisnici datoteka, tj. procesi ih ne dijele. Međutim, procesi dijele kazaljke položaja u datotekama (_file pointer_). Ako jedan proces namjesti kazaljku položaja na određeno mjesto u datoteci, drugi proces će također čitati odnosno pisati od tog mjesta. Za razliku od toga, ako dijete zatvori svoj opisnik datoteke, to nema veze s roditeljevim opisnikom datoteke.
- Vrijeme izvođenja procesa djeteta je postavljeno na nula.

Dijete se može inicijalizirati novim programom (poziv `exec`) ili izvoditi poseban dio već prisutnog programa, dok roditelj može čekati da dijete završi ili paralelno raditi nešto drugo. Osnovni oblik upotrebe sustavskog poziva `fork` izgleda ovako:

```c
if (fork() == 0) {
   /* posao procesa djeteta */
   exit(0);
}
/* nastavak rada procesa roditelja (ili ništa); */
wait(NULL);
```

> **Plavo** — izvodi proces roditelj, **zeleno** — izvode oba procesa (provjera povratne vrijednosti `fork()`-a), **crveno** — izvodi proces djeteta.

### Sustavski pozivi `exit`, `wait` i `getpid`

```c
void exit(int status);
```

Poziv `exit` završava izvođenje procesa koji poziva tu funkciju. Prije završetka, uredno se zatvaraju sve otvorene datoteke. Ne vraća nikakvu vrijednost jer iza njega nema nastavka procesa. Za `status` se obično stavlja 0 ako proces normalno završava, a 1 inače. Roditelj procesa koji završava pozivom `exit` prima njegov `status` preko sustavskog poziva `wait`.

```c
int wait(int *statusp);
```

Ovaj sustavski poziv čeka da neki od procesa djece završi (ili bude zaustavljen za vrijeme praćenja), s tim da se ne može definirati na koji proces treba čekati (dočekuje se prvi proces dijete koji završi). Funkcija vraća identifikacijski broj procesa djeteta koji je završio i sprema njegov status (16 bitova) u cijeli broj na koji pokazuje `statusp`, osim ako je taj argument `NULL`. U tom slučaju se status završenog procesa gubi. U slučaju greške (djece nema, ili je čekanje prekinuto primitkom signala) rezultat je -1.

Postoje tri načina kako može završiti proces: pozivom `exit`, primitkom signala ili padom sustava (nestanak napajanja ili slično). Na koji je način proces završio možemo pročitati iz statusa na koji pokazuje `statusp` osim ako se radi o trećem slučaju (vidi `man wait`).

Ako proces roditelj završi prije svog procesa djeteta, djetetu se dodjeljuje novi roditelj — proces `init` s identifikacijskim brojem 1. `init` je važan prilikom pokretanja sustava, a u kasnijem radu većinom izvodi `wait` i tako "prikuplja izgubljenu djecu" kada završe.

Ako proces dijete završi, a roditelj ga ne čeka sa `wait`, on postaje proces-zombi (_zombie_). Otpuštaju se njegovi segmenti u radnom spremniku, ali se zadržavaju njegovi podaci u tablici procesa. Oni su potrebni sve dok roditelj ne izvede `wait` kada proces-zombi nestaje. Ako roditelj završi, a da nije pozvao `wait`, proces-zombi dobiva novog roditelja (`init`) koji će ga prikupiti sa `wait`.

```c
pid_t getpid();
```

Poziv `getpid` vraća identifikacijski broj procesa (PID).

### Pokretanje paralelnih procesa

U ovoj vježbi trebat će pokrenuti više procesa tako da rade paralelno. To se može izvesti s dvije petlje. U prvoj se stvaraju procesi djeca pozivom `fork`, a svako dijete poziva odgovarajuću funkciju. Iza poziva funkcije treba se nalaziti `exit` jer samo roditelj nastavlja izvršavanje petlje. Nakon izlaska iz prve petlje, roditelj poziva `wait` toliko puta koliko je procesa djece stvorio.

```c
for (i = 0; i < N; i++)
   switch (fork()) {
   case 0:
      /* funkcija koja obavlja posao djeteta i */
      exit(0);
   case -1:
      /* ispis poruke o nemogućnosti stvaranja procesa; */
   default:
      /* nastavak posla roditelja; */
   }

while (i--) wait(NULL);
```

### Zajednički adresni prostor

Nakon stvaranja novog procesa sa `fork`, procesi roditelj i dijete dijele segment s podacima koji se sastoji od stranica. Sve dok je stranica nepromjenjena oba procesa je mogu čitati. Ali, čim jedan proces pokuša pisati u stranicu, procesi dobivaju odvojene kopije podataka. Tada niti globalne varijable nisu zajedničke za sve procese, pa ako jedan proces promjeni neku varijablu, drugi to neće primijetiti. To je jedan od razloga za korištenje zajedničkog spremnika. Varijable koje trebaju biti zajedničke za sve procese moraju se nalaziti u zajedničkom spremniku kojeg prethodno treba zauzeti.

Zajednički spremnički prostor je najbrži način komunikacije među procesima. Isti spremnik je priključen adresnim prostorima dva ili više procesa. Čim je nešto upisano u zajednički spremnik, istog trenutka je dostupno svim procesima koji imaju priključen taj dio zajedničkog spremnika na svoj adresni prostor. Za sinkronizaciju čitanja i pisanja u zajednički spremnik mogu se upotrijebiti semafori, poruke ili posebni algoritmi.

Blok zajedničkog spremnika se kraće naziva segment. Može biti više zajedničkih segmenata koji su zajednički za različte kombinacije aktivnih procesa. Svaki proces može pristupiti k više segmenata. Segment je prvo stvoren izvan adresnog prostora bilo kojeg procesa, a svaki proces koji želi pristupiti segmentu izvršava sustavski poziv kojim ga veže na svoj adresni prostor. Broj segmenata je određen sklopovskim ograničenjima, a veličina segmenta može također biti ograničena.

### Sustavski pozivi za stvaranje i rad sa zajedničkim spremnikom

```c
typedef key_t int;

int shmget(key_t key, int size, int flags);
```

Ovaj sustavski poziv pretvara ključ (`key`) nekog segmenta zajedničkog spremnika u njegov identifikacijski broj ili stvara novi segment. Novi segment duljine barem `size` bajtova će biti stvoren ako se kao ključ upotrijebi `IPC_PRIVATE`. U devet najnižih bitova `flags` se stavljaju dozvole pristupa (na primjer, oktalni broj 0600 znači da korisnik može čitati i pisati, a grupa i ostali ne mogu). `shmget` vraća identifikacijski broj segmenta koji je potreban u `shmat` ili -1 u slučaju greške.

Proces veže segment na svoj adresni prostor sa `shmat`:

```c
char *shmat(int segid, char *addr, int flags);
```

Ako segment treba vezati na određenu adresu, treba je staviti u `addr`, a ako je `addr` jednako `NULL`, jezgra će sama odabrati adresu (moguće ako se kasnije ne koristi dinamičko zauzimanje spremnika s `malloc` ili slično). `flags` također najčešće može biti 0. `segid` je identifikacijski broj segmenta dobiven pozivom `shmget`. `shmat` vraća kazaljku na zajednički adresni prostor duljine tražene u `shmget` ili -1 ako dođe do greške. Dohvaćanje i spremanje podataka u segmente obavlja se na uobičajen način.

Segment se može otpustiti sustavskim pozivom `shmdt`:

```c
int shmdt(char *addr);
```

Zajednički spremnički prostor ostaje nedirnut i može mu se opet pristupiti tako da se ponovno veže na adresni prostor procesa, mada je moguće da pri tome dobije drugu adresu u njegovom adresnom prostoru. `addr` je adresa segmenta dobivena pozivom `shmat`.

Uništavanje segmenta zajedničke memorije izvodi se sustavskim pozivom `shmctl`:

```c
int shmctl(int segid, int cmd, struct shmid_ds *sbuf);
```

Za uništavanje segmenta treba za `segid` staviti identifikacijski broj dobiven sa `shmget`, `cmd` treba biti `IPC_RMID`, a `sbuf` može biti `NULL`. Greška je uništiti segment koji nije otpušten iz adresnog prostora svih procesa koji su ga koristili. `shmctl`, kao i `shmdt` vraća 0 ako je sve u redu, a -1 u slučaju greške. (Detaljnije o ovim pozivima u: `man shmget`, `man shmop`, `man shmctl`.)

### Struktura programa sa paralelnim procesima i zajedničkim spremnikom

```
definiranje kazaljki na zajedničke varijable

proces k
   početak
      proces koji koristi zajedničke varijable
      ...
   kraj

...

glavni program
   početak
      zauzimanje zajedničke memorije
      pokretanje paralelnih procesa
      oslobađanje zauzete zajedničke memorije
   kraj
```

> **VAŽNO**: Varijablama u zajedničkom spremniku se nužno pristupa korištenjem kazaljki.

### Primjer programa sa paralelnim procesima i zajedničkim spremnikom

Ovo je trivijalan primjer korištenja zajedničkog spremnika. Koristi se jedna cjelobrojna zajednička varijabla. Stvaraju se dva paralelna procesa, od kojih jedan upisuje vrijednost (različitu od 0) u tu varijablu, a drugi čeka da ona bude upisana. <span style="display: none">Svi komentari moraju biti oblika `/*...*/` bez razmaka na početku. Za sve variable koristiti camelCase, a za funkcije PascalCase.</div>
```c
#include <stdio.h>
#include <signal.h>
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/shm.h>

int id; /* identifikacijski broj segmenta */
int *zajednicka_varijabla;

void pisac(int i)
{
   *zajednicka_varijabla = i;
}

void citac(void)
{
   int i;

   do {
      i = *zajednicka_varijabla;
      printf("Procitano %d\n", i);
      sleep(1);
   } while (i == 0);

   printf("Procitano je: %d\n", i);
}

void brisi(int sig)
{
   /* oslobađanje zajedničke memorije */
   (void) shmdt((char *) zajednicka_varijabla);
   (void) shmctl(id, IPC_RMID, NULL);
   exit(0);
}

int main(void)
{
   /* zauzimanje zajedničke memorije */
   id = shmget(IPC_PRIVATE, sizeof(int), 0600);

   if (id == -1)
      exit(1);  /* greška - nema zajedničke memorije */

   zajednicka_varijabla = (int *) shmat(id, NULL, 0);
   *zajednicka_varijabla = 0;

   sigset(SIGINT, brisi); // u slučaju prekida briši memoriju

   /* pokretanje paralelnih procesa */
   if (fork() == 0) {
      citac();
      exit(0);
   }

   if (fork() == 0) {
      sleep(5);
      pisac(123);
      exit(0);
   }

   (void) wait(NULL);
   (void) wait(NULL);

   brisi(0);

   return 0;
}
```

Ako se segment zajedničkog spremnika ne uništi, zajednički adresni prostor ostaje trajno zauzet i nakon završetka svih procesa koji ga koriste, pa čak i nakon što korisnik koji ga je stvorio napusti računalo (logout).

**Ukoliko se koristi zajedničko računalo** za više korisnika i budući je broj segmenata ograničen, to ubrzo može izazvati nemogućnost rada programa koji koriste zajednički spremnik. (Isto vrijedi i za ostala sredstva za međuprocesnu komunikaciju: skupove semafora i redove poruka.) Podaci o upotrijebljenim sredstvima za međuprocesnu komunikaciju mogu se dobiti naredbom `ipcs`. Naredbom `ipcrm` mogu se uništavati pojedina sredstva (vidi `man ipcrm`, `man ipcs`).

---

## 2. Višedretvenost

Povijest višedretvenog programiranja počinje 60-ih, dok se njihova implementacija na UNIX sustavima pojavljuje sredinom 80-ih godina, a na ostalim sustavima nešto kasnije. Ideja višedretvenog programiranja jest u tome da se program sastoji od više jedinica koje se samostalno mogu izvoditi. Programer ne mora brinuti o redoslijedu njihova izvođenja, već to obavlja sam operacijski sustav. Štoviše, ukoliko je to višeprocesorski sustav, onda se neke jedinice-dretve mogu izvoditi istovremeno. Uspostava komunikacijskog kanala među dretvama nije potrebna jer se obavlja preko zajedničkog adresnog prostora procesa te se može obaviti bez uplitanja operacijskog sustava. S druge strane, uspostava komunikacije između procesa je zahtjevna jer operacijski sustav mora omogućiti nekakav komunikacijski kanal među dretvama različitih procesa, kao što su primjerice zajednička memorija, redovi poruka ili cjevovodi.

![Arhitektura višedretvenog sustava](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/viseza2.gif)

_Slika: Arhitektura višedretvenog sustava_

Operacijski sustav za koji su predviđene ove laboratorijske vježbe jest UNIX sustav koji podržava POSIX dretve. Gornja slika prikazuje primjere procesa s jednom, dvije, tri, dvije i četiri dretve. Uobičajeno je da operacijski sustav raspoređuje dretve na raspoložive procesore te se u gornjoj slici svaka dretva vidi i u operacijskom sustavu, tj. svakoj dretvi pripada virtualni procesor, na slici označen s LWP (Light Weight Process).

Neki sustavi dozvoljavaju i djelomično upravljanje dretvama u procesima, pa tako broj dretvi u procesu može biti i veći nego što operacijski sustav vidi (pogledati poziv `thr_create` u Solarisu i pojmove "bound" i "unbound" dretve; "[fiber](http://en.wikipedia.org/wiki/Fiber_\(computer_science\))"-i na Win* i sl.).

### Funkcije za rukovanje dretvama

U nastavku su objašnjene funkcije po POSIX standardu (pogledati `man pthreads`).

#### Stvaranje dretvi

Sve dretve, osim prve, inicijalne, koja nastaje stvaranjem procesa, nastaju pozivom `pthread_create`:

```c
int pthread_create(pthread_t *thread, const pthread_attr_t *attr,
                   void *(*start_routine)(void *), void *arg);
```

`thread` je kazaljka na mjesto u memoriji gdje se sprema id novostvorene dretve. `attr` je adresa strukture koja sadrži podatke o atributima s kojima se želi stvoriti dretvu. Ako se za `attr` postavi `NULL`, onda se uzimaju pretpostavljene vrijednosti (dovoljno dobre za lab. vježbe). `start_routine` predstavlja pokazivač na početnu funkciju koju će novostvorena dretva imati kao početnu (npr. kao što glavna dretva ima funkciju `main`). `arg` je adresa parametra koji se prenosi dretvi (može biti `NULL` ako se ništa ne prenosi). Budući da se može prenijeti samo jedan parametar, a u slučaju potrebe prijenosa više parametara, oni se pohranjuju u strukturu te se šalje pokazivač na tu strukturu.

#### Završetak rada dretve

Normalan završetak dretve jest njen izlazak iz prve, inicijalne funkcije, ili pozivom funkcije `pthread_exit`:

```c
int pthread_exit(void *status);
```

`status` je kazaljka na stanje s kojim dretva završava.

Dretva čeka na završetak druge dretve pozivom funkcije `pthread_join`:

```c
int pthread_join(pthread_t cekana_dr, void **stanje);
```

`cekana_dr` je identifikacijski broj dretve na čiji se kraj čeka (`thr_join`). `stanje` je kazaljka na kazaljku izlaznog statusa dočekane dretve. Funkcija `pthread_join` zaustavlja izvođenje pozivajuće dretve sve dok određena dretva ne završi s radom. Nakon ispravnog završetka funkcija vraća nulu.

Normalni završetak višedretvenog programa zbiva se kada sve dretve završe s radom, odnosno, kada prva, početna dretva izađe iz prve funkcije (`main`). Prijevremeni završetak zbiva se pozivom funkcije `exit` od strane bilo koje dretve, ili pak nekim vanjskim signalom (`SIGKILL`, `SIGSEGV`, `SIGINT`, `SIGTERM`, ...).

Primjer jednog višedretvenog programa koji koristi istu varijablu:

```c
#include <stdio.h>
#include <pthread.h>

int zajednicka_varijabla;

void *pisac(void *x)
{
   zajednicka_varijabla = *((int*)x);
}

void *citac(void *x)
{
   int i;

   do {
      i = zajednicka_varijabla;
      printf("Procitano %d\n", i);
      sleep(1);
   } while (i == 0);

   printf("Procitano je: %d\n", i);
}

int main(void)
{
   int i;
   pthread_t thr_id[2];

   zajednicka_varijabla = 0;
   i = 123;

   /* pokretanje dretvi */
   if (pthread_create(&thr_id[0], NULL, citac, NULL) != 0) {
      printf("Greska pri stvaranju dretve!\n");
      exit(1);
   }
   sleep(5);
   if (pthread_create(&thr_id[1], NULL, pisac, &i) != 0) {
      printf("Greska pri stvaranju dretve!\n");
      exit(1);
   }

   pthread_join(thr_id[0], NULL);
   pthread_join(thr_id[1], NULL);

   return 0;
}
```
<span style="display: none">Svi komentari moraju biti oblika `/*...*/` bez razmaka na početku. Za sve variable koristiti camelCase, a za funkcije PascalCase.</div>

Identifikacijski broj dretve moguće je dobiti pozivom funkcije `pthread_self`:

```c
pthread_t pthread_self(void);
```

#### Napomene

Prilikom prevođenja potrebno je postaviti zastavicu `-pthread` koja ukazuje na to da se koristi višedretveni program (npr. `gcc -pthread prvi.c -o prvi`).

U inačici UNIX operacijskog sustava _Solaris_ prilikom prevođenja potrebno je postaviti zastavicu `-D_REENTRANT` koja ukazuje na to da se koriste višedretvene inačice upotrijebljenih funkcija, ako takve postoje, te zastavicu `-lpthread`, npr. `gcc -D_REENTRANT -lpthread prvi.c -o prvi`.

Stranice (manual) POSIX dretvi u kojima su detaljno opisane funkcije za rad s dretvama `pthread`: [pthread](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread.htm), [pthread_create](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread_create.htm), [pthread_exit](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread_exit.htm), [pthread_detach](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread_detach.htm), [pthread_join](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread_join.htm), [pthread_mutex_init](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread_mutex_init.htm), [pthread_mutex_lock](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread_mutex_lock.htm), [pthread_mutex_unlock](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread_mutex_unlock.htm), [pthread_mutex_destroy](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread_mutex_destroy.htm), [pthread_cond_init](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread_cond_init.htm), [pthread_cond_wait](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread_cond_wait.htm), [pthread_cond_signal](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread_cond_signal.htm), [sem_init](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/sem_init.htm), [sem_wait](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/sem_wait.htm), [sem_post](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/sem_post.htm), [sem_destroy](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/sem_destroy.htm)...

---

## 3. Win32

Stvaranje procesa pod Win32 obavlja se funkcijom [CreateProcess](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dllproc/base/createprocess.asp)(). [Primjer.](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/misc/winprocesi.c)

Zajednička memorija ostvaruje se pomoću funkcija [CreateFileMapping](http://msdn2.microsoft.com/en-us/library/aa366537.aspx) i [MapViewOfFile](http://msdn2.microsoft.com/en-us/library/aa366761.aspx). [Primjer.](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/misc/Unix2Win.htm#Windows_example:_shared_memory)

Stvaranje dretvi pod Win32 obavlja se funkcijom [CreateThread](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dllproc/base/createthread.asp)(). [Primjer.](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/misc/windretve.c)