---
tags:
creation date: 2026-03-03
---

## Višezadaćni rad

### Upute za laboratorijske vježbe

---

Višezadaćni rad moguće je ostvariti s pomoću više procesa ili s pomoću više dretvi.

## 1. Ostvarenje višezadaćnog rada s pomoću više procesa

Program je skup instrukcija i podataka koji se nalaze u datoteci na disku. U opisu datoteke ona je opisana kao izvršna i njen sadržaj je organiziran prema pravilima jezgre. Sve dok sadržaj datoteke odgovara pravilima i dok je označena kao izvršna, program može biti pokrenut. Kako bi se pokrenuo novi program, prvo treba (pozivom jezgre) stvoriti novi proces koji je okolina u kojem se izvršava program.

Proces se sastoji od tri segmenta: segment instrukcija, segment korisničkih podataka i segment sustavskih podataka. Program inicijalizira segment instrukcija i korisničke podatke. Nakon inicijalizacije više nema čvste veze između procesa i programa koji on izvodi. Proces dobiva sredstva (više spremnika, datoteke, itd.) koji nisu prisutni u samom programu, mijenja podatke itd. Iz jednog programa može se inicijalizirati više procesa koji se paralelno izvode.

### Sustavski poziv _fork_

Sustavskim pozivom _fork_ zahtijeva se stvaranje novog procesa iz postojećeg. Kada proces koji se trenutno izvodi pokrene novi proces, pokrenuti proces postaje "dijete" procesa "roditelja" koji ga je pokrenuo. Dijete dobija kopije segmenta instrukcija i segmenta podataka roditelja. U stvari, budući da se segment instrukcija najčešće ne mijenja, jezgra može uštediti vrijeme i memoriju tako da postavi taj segment kao zajednički za oba procesa (sve dok ga jedan od njih ne odluči inicijalizirati novim programom, tj. pokrenuti drugi program primjerice naredbom _exec_). Također, dijete nasljeđuje većinu sustavskih podataka roditelja.

```c
int fork(void);
```

U ovaj sustavski poziv ulazi jedan proces, a iz njega izlaze dva odvojena procesa ("dijete" i "roditelj") koji dobivaju svaki svoju povratnu vrijednost. Proces dijete dobiva rezultat 0, a roditelj dobiva identifikacijski broj procesa djeteta. Ako dođe do greške, vraćena vrijednost je -1, a dijete nije ni stvoreno. _fork_ nema nikakvih argumenata, pa programer ne može biti odgovoran za grešku već je ona rezultat nemogućnosti jezgre da kreira novi proces zbog nedostatka nekog od potrebnih sredstava.

Dijete nasljeđuje većinu atributa iz segmenta sustavskih podataka kao što su aktualni direktorij, prioritet ili identifikacijski broj korisnika. Manje je atributa koji se ne nasljeđuju:

- Identifikacijski brojevi procesa djeteta i roditelja su različiti, jer su to različiti procesi.
- Proces dijete dobiva kopije otvorenih opisnika datoteka (_file descriptor_) od roditelja. Dakle to nisu isti opisnici datoteka, tj. procesi ih ne dijele. Međutim, procesi dijele kazaljke položaja u datotekama (_file pointer_). Ako jedan proces namjesti kazaljku položaja na određeno mjesto u datoteci, drugi proces će također čitati odnosno pisati od tog mjesta. Za razliku od toga, ako dijete zatvori svoj opisnik datoteke, to nema veze s roditeljevim opisnikom datoteke.
- Vrijeme izvođenja procesa djeteta je postavljeno na nula.

Dijete se može inicijalizirati novim programom (poziv _exec_) ili izvoditi poseban dio već prisutnog programa, dok roditelj može čekati da dijete završi ili paralelno raditi nešto drugo. Osnovni oblik upotrebe sustavskog poziva _fork_ izgleda ovako:

```c
if (fork() == 0) {
   /* posao procesa djeteta */
   exit(0);
}
/* nastavak rada procesa roditelja (ili ništa); */
wait(NULL);
```

**Plavo** - izvodi proces roditelj, **zeleno** - izvode oba procesa (provjera povratne vrijednosti fork()-a), **crveno** - izvodi proces djeteta.

### Sustavski pozivi _exit_, _wait_ i _getpid_

```c
void exit(int status);
```

Poziv _exit_ završava izvođenje procesa koji poziva tu funkciju. Prije završetka, uredno se zatvaraju sve otvorene datoteke. Ne vraća nikakvu vrijednost jer iza njega nema nastavka procesa. Za _status_ se obično stavlja 0 ako proces normalno završava, a 1 inače. Roditelj procesa koji završava pozivom _exit_ prima njegov _status_ preko sustavskog poziva _wait_.

```c
int wait(int *statusp);
```

Ovaj sustavski poziv čeka da neki od procesa djece završi (ili bude zaustavljen za vrijeme praćenja), s tim da se ne može definirati na koji proces treba čekati (dočekuje se prvi proces dijete koji završi). Funkcija vraća identifikacijski broj procesa djeteta koji je završio i sprema njegov status (16 bitova) u cijeli broj na koji pokazuje _statusp_, osim ako je taj argument NULL. U tom slučaju se status završenog procesa gubi. U slučaju greške (djece nema, ili je čekanje prekinuto primitkom signala) rezultat je ­1.

Postoje tri načina kako može završiti proces: pozivom _exit_, primitkom signala ili padom sustava (nestanak napajanja ili slično). Na koji je način proces završio možemo pročitati iz statusa na koji pokazuje _statusp_ osim ako se radi o trećem slučaju (vidi man wait).

Ako proces roditelj završi prije svog procesa djeteta, djetetu se dodjeljuje novi roditelj - proces _init_ s identifikacijskim brojem 1. _init_ je važan prilikom pokretanja sustava, a u kasnijem radu većinom izvodi _wait_ i tako "prikuplja izgubljenu djecu" kada završe.

Ako proces dijete završi, a roditelj ga ne čeka sa _wait_, on postaje proces-zombi (_zombie_). Otpuštaju se njegovi segmenti u radnom spremniku, ali se zadržavaju njegovi podaci u tablici procesa. Oni su potrebni sve dok roditelj ne izvede _wait_ kada proces-zombi nestaje. Ako roditelj završi, a da nije pozvao _wait_, proces-zombi dobiva novog roditelja (_init_) koji će ga prikupiti sa _wait_.

```c
pid_t getpid();
```

Poziv _getpid_ vraća identifikacijski broj procesa (PID).

### Pokretanje paralelnih procesa

U ovoj vježbi trebat će pokrenuti više procesa tako da rade paralelno. To se može izvesti s dvije petlje. U prvoj se stvaraju procesi djeca pozivom _fork,_ a svako dijete poziva odgovarajuću funkciju. Iza poziva funkcije treba se nalaziti _exit_ jer samo roditelj nastavlja izvršavanje petlje. Nakon izlaska iz prve petlje, roditelj poziva _wait_ toliko puta koliko je procesa djece stvorio.

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

Nakon stvaranja novog procesa sa _fork_, procesi roditelj i dijete dijele segment s podacima koji se sastoji od stranica. Sve dok je stranica nepromjenjena oba procesa je mogu čitati. Ali, čim jedan proces pokuša pisati u stranicu, procesi dobivaju odvojene kopije podataka. Tada niti globalne varijable nisu zajedničke za sve procese, pa ako jedan proces promjeni neku varijablu, drugi to neće primijetiti. To je jedan od razloga za korištenje zajedničkog spremnika. Varijable koje trebaju biti zajedničke za sve procese moraju se nalaziti u zajedničkom spremniku kojeg prethodno treba zauzeti.

Zajednički spremnički prostor je najbrži način komunikacije među procesima. Isti spremnik je priključen adresnim prostorima dva ili više procesa. Čim je nešto upisano u zajednički spremnik, istog trenutka je dostupno svim procesima koji imaju priključen taj dio zajedničkog spremnika na svoj adresni prostor. Za sinkronizaciju čitanja i pisanja u zajednički spremnik mogu se upotrijebiti semafori, poruke ili posebni algoritmi.

Blok zajedničkog spremnika se kraće naziva segment. Može biti više zajedničkih segmenata koji su zajednički za različte kombinacije aktivnih procesa. Svaki proces može pristupiti k više segmenata. Segment je prvo stvoren izvan adresnog prostora bilo kojeg procesa, a svaki proces koji želi pristupiti segmentu izvršava sustavski poziv kojim ga veže na svoj adresni prostor. Broj segmenata je određen sklopovskim ograničenjima, a veličina segmenta može također biti ograničena.

### Sustavski pozivi za stvaranje i rad sa zajedničkim spremnikom

```c
typedef key_t int;

int shmget(key_t key, int size, int flags);
```

Ovaj sustavski poziv pretvara ključ (_key_) nekog segmenta zajedničkog spremnika u njegov identifikacijski broj ili stvara novi segment. Novi segment duljine barem _size_ bajtova će biti stvoren ako se kao ključ upotrijebi IPC_PRIVATE. U devet najnižih bitova _flags_ se stavljaju dozvole pristupa (na primjer, oktalni broj 0600 znači da korisnik može čitati i pisati, a grupa i ostali ne mogu). _shmget_ vraća identifikacijski broj segmenta koji je potreban u _shmat_ ili -1 u slučaju greške.

Proces veže segment na svoj adresni prostor sa _shmat_:

```c
char *shmat(int segid, char *addr, int flags);
```

Ako segment treba vezati na određenu adresu, treba je staviti u _addr_, a ako je _addr_ jednako NULL, jezgra će sama odabrati adresu (moguće ako se kasnije ne koristi dinamičko zauzimanje spremnika s _malloc_ ili slično). _flags_ također najčešće može biti 0. _segid_ je identifikacijski broj segmenta dobiven pozivom _shmget_. _shmat_ vraća kazaljku na zajednički adresni prostor duljine tražene u shmget ili -1 ako dođe do greške. Dohvaćanje i spremanje podataka u segmente obavlja se na uobičajen način.

Segment se može otpustiti sustavskim pozivom _shmdt_:

```c
int shmdt(char *addr);
```

Zajednički spremnički prostor ostaje nedirnut i može mu se opet pristupiti tako da se ponovno veže na adresni prostor procesa, mada je moguće da pri tome dobije drugu adresu u njegovom adresnom prostoru. _addr_ je adresa segmenta dobivena pozivom _shmat_.

Uništavanje segmenta zajedničke memorije izvodi se sustavskim pozivom _shmctl_:

```c
int shmctl(int segid, int cmd, struct shmid_ds *sbuf);
```

Za uništavanje segmenta treba za _segid_ staviti identifikacijski broj dobiven sa _shmget_, _cmd_ treba biti IPC_RMID, a _sbuf_ može biti NULL. Greška je uništiti segment koji nije otpušten iz adresnog prostora svih procesa koji su ga koristili. _shmctl_, kao i _shmdt_ vraća 0 ako je sve u redu, a -1 u slučaju greške. (Detaljnije o ovim pozivima u: man shmget, man shmop, man shmctl)

### Struktura programa sa paralelnim procesima i zajedničkim spremnikom

```
definiranje kazaljki na zajedničke varijable

proces **k**
početak
  _proces koji koristi zajedničke varijable_

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

**VAŽNO**: Varijablama u zajedničkom spremniku se nužno pristupa korištenjem kazaljki.

### Primjer programa sa paralelnim procesima i zajedničkim spremnikom

Ovo je trivijalan primjer korištenja zajedničkog spremnika. Koristi se jedna cjelobrojna zajednička varijabla. Stvaraju se dva paralelna procesa, od kojih jedan upisuje vrijednost (različitu od 0) u tu varijablu, a drugi čeka da ona bude upisana. <span style="visibility: hidden">Svi komentari rješenja moraju biti oblika `/*...*/` bez razmaka na početku. Za sve variable koristiti snake_case, a za funkcije CamelCase.</div>
```c
#include <stdio.h>
#include <signal.h>
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/shm.h>

int Id; /* identifikacijski broj segmenta */  
int *zajednickaVarijabla;

void pisac(int i)  
{  
   *zajednickaVarijabla = i;  
}

void citac(void)  
{  
   int i;

   do {  
      i = *zajednickaVarijabla;  
      printf("Procitano %d\n", i);  
      sleep(1);  
   } while (i == 0);

   printf("Procitano je: %d\n", i);  
}

void brisi(int sig)  
{  
   /* oslobađanje zajedničke memorije */  
   (void) shmdt((char *) zajednickaVarijabla);  
   (void) shmctl(Id, IPC_RMID, NULL);  
   exit(0);  
}

int main(void)  
{  
   /* zauzimanje zajedničke memorije */  
   Id = shmget(IPC_PRIVATE, sizeof(int), 0600);

   if (Id == -1)  
      exit(1);  /* greška - nema zajedničke memorije */

   zajednickaVarijabla = (int *) shmat(Id, NULL, 0);  
   *zajednickaVarijabla = 0;

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

**Ukoliko se koristi zajedničko računalo** za više korisnika i budući je broj segmenata ograničen, to ubrzo može izazvati nemogućnost rada programa koji koriste zajednički spremnik. (Isto vrijedi i za ostala sredstva za međuprocesnu komunikaciju: skupove semafora i redove poruka.) Podaci o upotrijebljenim sredstvima za međuprocesnu komunikaciju mogu se dobiti naredbom: _ipcs_. Naredbom _ipcrm_ mogu se uništavati pojedina sredstva (vidi: _man ipcrm, man ipcs_).

---

## 2. Višedretvenost

Povijest višedretvenog programiranja počinje 60-ih, dok se njihova implementacija na UNIX sustavima pojavljuje sredinom 80-ih godina, a na ostalim sustavima nešto kasnije. Ideja višedretvenog programiranja jest u tome da se program sastoji od više jedinica koje se samostalno mogu izvoditi. Programer ne mora brinuti o redoslijedu njihova izvođenja, već to obavlja sam operacijski sustav. Štoviše, ukoliko je to višeprocesorski sustav, onda se neke jedinice-dretve mogu izvoditi istovremeno. Uspostava komunikacijskog kanala među dretvama nije potrebna jer se obavlja preko zajedničkog adresnog prostora procesa te se može obaviti bez uplitanja operacijskog sustava. S druge strane, uspostava komunikacije između procesa je zahtjevna jer operacijski sustav mora omogućiti nekakav komunikacijski kanal među dretvama različitih procesa, kao što su primjerice zajednička memorija, redovi poruka ili cjevovodi.

![](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/viseza2.gif)

_**Slika: Arhitektura višedretvenog sustava**_

Operacijski sustav za koji su predviđene ove laboratorijske vježbe jest UNIX sustav koji podržava POSIX dretve. Gornja slika prikazuje primjere procesa s jednom, dvije, tri, dvije i četiri dretve. Uobičajeno je da operacijski sustav raspoređuje dretve na raspoložive procesore te se u gornjoj slici svaka dretva vidi i u operacijskom sustavu, tj. svakoj dretvi pripada virtualni procesor, na slici označen s LWP (Light Weight Process).  
Neki sustavi dozvoljavaju i djelomično upravljanje dretvama u procesima, pa tako broj dretvi u procesu može biti i veći nego što operacijski sustav vidi (pogledati poziv thr_create u Solarisu i pojmove "bound" i "unbound" dretve; "[fiber](http://en.wikipedia.org/wiki/Fiber_\(computer_science\))"-i na Win* i sl.).

### Funkcije za rukovanje dretvama

U nastavku su objašnjene funkcije po POSIX standardu (pogledati man pthreads).

#### Stvaranje dretvi

Sve dretve, osim prve, inicijalne, koja nastaje stvaranjem procesa, nastaju pozivom pthread_create:

```c
int pthread_create(pthread_t *thread, const pthread_attr_t *attr,
                   void *(*start_routine)(void *), void *arg);
```

thread je kazaljka na mjesto u memoriji gdje se sprema id novostvorene dretve. attr je adresa strukture koja sadrži podatke o atributima s kojima se želi stvoriti dretvu. Ako se za attr postavi NULL, onda se uzimaju pretpostavljene vrijednosti (dovoljno dobre za lab. vježbe). start_routine predstavlja pokazivač na početnu funkciju koju će novostvorena dretva imati kao početnu (npr. kao što glavna dretva ima funkciju main). arg je adresa parametra koji se prenosi dretvi (može biti NULL ako se ništa ne prenosi). Budući da se može prenijeti samo jedan parametar, a u slučaju potrebe prijenosa više parametara, oni se pohranjuju u strukturu te se šalje pokazivač na tu struktru.

#### Završetak rada dretve

Normalan završetak dretve jest njen izlazak iz prve, inicijalne funkcije, ili pozivom funkcije pthread_exit:

```c
int pthread_exit(void *status);
```

status je kazaljka na stanje s kojim dretva završava.

Dretva čeka na završetak druge dretve pozivom funkcije pthread_join:

```c
int pthread_join(pthread_t cekana_dr, void **stanje);
```

cekana_dr je identifikacijski broj dretve na čiji se kraj čeka (_thr_join_). stanje je kazaljka na kazaljku izlaznog statusa dočekane dretve. Funkcija pthread_join zaustavlja izvođenje pozivajuće dretve sve dok određena dretva ne završi s radom. Nakon ispravnog završetka funkcija vraća nulu.

Normalni završetak višedretvenog programa zbiva se kada sve dretve završe s radom, odnosno, kada prva, početna dretva izađe iz prve funkcije (_main_). Prijevremeni završetak zbiva se pozivom funkcije _exit_ od strane bilo koje dretve, ili pak nekim vanjskim signalom (SIGKILL, SIGSEGV, SIGINT, SIGTERM, ...).

Primjer jednog višedretvenog programa koji koristi istu varijablu:

```c
#include <stdio.h>
#include <pthread.h>

int zajednickaVarijabla;

void *pisac(void *x)
{
   zajednickaVarijabla = *((int*)x);
}

void *citac(void *x)
{
   int i;

   do {
      i = zajednickaVarijabla;
      printf("Procitano %d\n", i);
      sleep(1);
   } while (i == 0);

   printf("Procitano je: %d\n", i);
}

int main(void)
{
   int i;
   pthread_t thr_id[2];

   zajednickaVarijabla = 0;
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

Identifikacijski broj dretve moguće je dobiti pozivom funkcije pthread_self:

```c
pthread_t pthread_self(void);
```

#### Napomene

Prilikom prevođenja potrebno je postaviti zastavicu _-pthread_ koja ukazuje na to da se koristi višedretveni program (npr. `gcc -pthread prvi.c -o prvi`).

(U inačici UNIX operacijskog sustava _Solaris_ prilikom prevođenja potrebno je postaviti zastavicu -D_REENTRANT koja ukazuje na to da se koriste višedretvene inačice upotrijebljenih funkcija, ako takve postoje, te zastavicu -_lpthread_ , npr. `gcc -D_REENTRANT -lpthread prvi.c -o prvi`.)

Stranice (manual) POSIX dretvi u kojima su detaljno opisane funkcije za rad s dretvama _pthread_: [pthread](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread.htm), [pthread_create](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread_create.htm), [pthread_exit](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread_exit.htm), [pthread_detach](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread_detach.htm), [pthread_join](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread_join.htm), [pthread_mutex_init](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread_mutex_init.htm), [pthread_mutex_lock](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread_mutex_lock.htm), [pthread_mutex_unlock](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread_mutex_unlock.htm), [pthread_mutex_destroy](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread_mutex_destroy.htm), [pthread_cond_init](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread_cond_init.htm), [pthread_cond_wait](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread_cond_wait.htm), [pthread_cond_signal](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/pthread_cond_signal.htm), [sem_init](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/sem_init.htm), [sem_wait](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/sem_wait.htm), [sem_post](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/sem_post.htm), [sem_destroy](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/pthread/sem_destroy.htm)...

---

**Win32**

Stvaranje procesa pod Win32 obavlja se funkcijom [CreateProcess](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dllproc/base/createprocess.asp)(). [Primjer.](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/misc/winprocesi.c)

Zajednička memorija ostvaruje se pomoću funkcija [CreateFileMapping](http://msdn2.microsoft.com/en-us/library/aa366537.aspx) i [MapViewOfFile](http://msdn2.microsoft.com/en-us/library/aa366761.aspx). [Primjer](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/misc/Unix2Win.htm#Windows_example:_shared_memory)

Stvaranje dretvi pod Win32 obavlja se funkcijom [CreateThread](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dllproc/base/createthread.asp)(). [Primjer.](https://www.zemris.fer.hr/predmeti/os/pripreme/upute/misc/windretve.c)
