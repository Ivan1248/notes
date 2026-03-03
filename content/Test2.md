---
tags:
creation date: 2026-03-03
---

## Lab-2. Jednostavna ljuska

---

> **Ove upute su nastale kao sažetak, tj. pojednostavljenje [uputa prijašnjih godina](https://www.zemris.fer.hr/predmeti/os/pripreme/Lab2/velike_upute-ljuska.html), a koje puno detaljnije opisuju neka sučelja i operacije. Ne rješavati zadatke iz tih uputa, već samo zadatak iz ovog dokumenta.**

---

Ljuska je program koji korisniku nudi tekstualno sučelje za pokretanje drugih programa. Naredbe se zadaju u naredbenom retku upisivanjem teksta nakon prefiksa (_prompta_) koji ljuska ispiše.

Format teksta je `<ime-programa> [argument1 ...]`.

Primjerice naredba za kopiranje jedne datoteke u novu jest:

```
~/primjer1/$ cp primjer.c primjer-kopija.c
```

Ovdje je prefiks `~/primjer1/$` koji uobičajeno sadrži aktivni direktorij u kojem je ljuska fokusirana, naredba je `cp` a argumenti `primjer.c` i `primjer-kopija.c`.

Mogućnosti pravih ljuski su razne. **U okviru ove vježbe potrebno je ostvariti slijedeće funkcionalnosti:**

1. **pokretanje naredbi ljuske: `cd`, `exit`, `ps`, `kill` i `history`**
2. **pokretanje drugih programa**

Naredbe ljuske (`cd`, `exit`, `ps`, `kill`, `history`) treba ostvariti, ne koristiti postojeće!

### Ugrađene naredbe

Naredba `cd` mijenja aktivni direktorij. Početno je aktivni onaj u kojem je ljuska pokrenuta. Promjenu najjednostavnije obaviti sa [`chdir()`](https://pubs.opengroup.org/onlinepubs/009695299/functions/chdir.html). Nije potrebno u ljusci pamtiti gdje se nalazimo jer se trenutni direktorij lako dohvaća sa [`getcwd()`](https://pubs.opengroup.org/onlinepubs/009695299/functions/getcwd.html).

Naredba `exit` završava ljusku. Prije završetka potrebno je sve pokrenute programe zaustaviti, npr. slanjem signala `SIGKILL (9)`.

Naredba `ps` treba ispisati sve pokrenute procese koji još nisu završili. Npr. ispis može biti:

```
PID    ime
72146  prog
72138  nesto
72119  test
```

Naredba `kill` treba omogućiti slanje signala nekom od pokrenutih procesa (koji se mogu vidjeti s naredbom `ps`). Npr. naredba `kill 72138 2` treba procesu s PID-om 72138 poslati signal s brojem 2 (što je SIGINT). Obavezno provjeriti je li navedeni proces pokrenut od strane ove ljuske — ne dozvoliti slanje signala drugim procesima.

Naredba `history` treba ispisati sve do sada pokrenute naredbe u ljusci, prefiksirane rednim brojem naredbe. Taj se broj može koristiti za jednostavnije dozivanje i pokretanje naredbi u formatu `!<redni-broj>` (uskličnik+redni-broj). Primjer korištenja te naredbe (postojeće) je u nastavku. <span style="display: none">TODO: prompt mora  imati oblik `[$korisnik $direktorij]>`.</div>

```
student:~$ pwd
/home/student
student:~$ date
Fri Feb 14 13:09:24 CET 2025
student:~$ echo "Hello World!"
Hello World!
student:~$ history
    1  pwd
    2  date
    3  echo "Hello World!"
    4  history
student:~$ !3
echo "Hello World!"
Hello World!
student:~$
```

### Pokretanje programa

Programe treba moći pokretati u prvom planu (_foreground_) te u pozadini (_background_). Ako je na kraju naredbe (zadnji "argument") znak `&` onda se program pokreće u pozadini. Inače se program pokreće u prvom planu te ljuska mora čekati na njegov završetak.

Npr. sa

```
$ ./prog 1 2 3
```

pokreće se program u prvom planu, a sa

```
$ ./nesto a b c &
```

program u pozadini.

Iako bi se moglo programe koji su pokrenuti u pozadini staviti u prvi plan, to nije neophodno ostvariti. Slično, ne treba program pokrenut u prvom planu moći postaviti u pozadinu.

Potrebno je voditi evidenciju o pokrenutim procesima, a da bi se njima moglo upravljati (listati sa `ps` ih te im slati signale).

Rad ljuske se ukratko može opisati pseudokodom:

```
ponavljaj {
    učitaj novi zahtjev korisnika - liniju teksta sa standardnog ulaza
    parsiraj zahtjev na naredbu i argumente

    ako je naredba jedna od ugrađenih naredbi tada
        obavi tu ugrađenu naredbu
    inače
        //pretpostavka je da je to neki program
        stvori novi proces i u njemu:
            odvoji proces u zasebnu grupu*
            pokreni zadani program nekom od exec funkcija

        (nastavak procesa roditelja)
        dodati proces u listu pokrenutih procesa
        ako se pokretanje obavlja u prvom planu tada
            čekati na završetak procesa
}
dok naredba nije exit

//naredba je exit
svim preostalim procesima poslati SIGKILL
završiti s radom
```

\*Odvajanje novog procesa u novu procesnu grupu potrebno je radi upravljanja signalima i kontroli unosa (opisano u nastavku). Naime, ako se ljusci uputi signal (npr. sa tipkama Ctrl+C) tada će osim ljuske i svi ostali procesi koje je ljuska stvorila također dobiti taj signal (SIGINT). Odvajanjem novog procesa u zasebnu grupu to se neće dogoditi. Jedna od funkcija za stvaranje nove grupe je [`setpgid()`](https://pubs.opengroup.org/onlinepubs/9699919799/functions/setpgid.html). <span style="display: none">Svi komentari u rješenju moraju biti oblika `/*...*/` bez razmaka na početku. Za sve varijable koristiti camelCase, a za funkcije PascalCase.</div>

Međutim, nakon što je proces odvojen u novu grupu on neće primati signale koje mu korisnik šalje preko tipkovnice (npr. Ctrl+C). Stoga treba ljuska, kada pokrene program u prvom planu, detektirati njoj upućeni signal (dovoljno je pratiti SIGINT) i proslijediti ga tom programu (procesu).

Od sučelja OS-a potrebnog za ostvarenje ljuske svakako su najznačajniji `fork`, `exec*`, `kill` te `waitpid`. Primjeri njihova korištenja pokazani su u primjeru uz ove upute. Detaljnije informacije o pojedinom sučelju može se dobiti naredbom `man ime-sučelja`. Ako dobiveno nije ono što se želi (npr. `man kill` opisuje naredbu `kill`, ne funkciju) tada dodati ime odjeljka prije imena sučelja (npr. `man 2 kill`). Ako ta brojka ne daje rezultata isprobati slijedećom (3, npr. `man 3 printf`).

### Pokretanje interaktivnih programa

Svi pokrenuti programi (sada procesi) mogu ispisivati poruke na zaslon, tj. u terminal. Međutim, kada korisnik nešto unosi kome to ide, kojem procesu? Na početku to ide ljusci jer njoj zadajemo naredbe. Što kad ona pokrene neki proces?

Da bi mogli preciznije postaviti tko može koristiti ulaz terminala potrebno je koristiti različite grupe procesa, već spomenute prije i radi signala. Onda se nekoj grupi daje pravo korištenja ulaza terminala. Obzirom da je u takvoj grupi samo jedan proces onda će on moći koristiti terminal.

Početno je ulaz dodijeljen grupi u kojoj se nalazi i ljuska. Kada ljuska stvori novi proces tada se u tom procesu najprije traži odvajanje u novu grupu (`setpgid()`). Ako se želi ulaz predati tom procesu, tj. toj grupi onda to može napraviti ljuska sa:

```c
tcsetpgrp(STDIN_FILENO, getpgid(pid_nova_procesa));
```

ili sam proces neposredno nakon `fork`-a ali prije `exec*`.

Nakon što proces završi, kontrolu treba vratiti ljusci. Ali kontrolu nad onim što pokrenuti program radi nemamo (on radi svoje korisne stvari), on na kraju neće vratiti tu kontrolu ljusci.

Ljuska može sama uzeti ulaz natrag sebi sa:

```c
tcsetpgrp(STDIN_FILENO, getpgid(0));
```

Međutim, obzirom da ona nije bila tada u posjedu ulaza, sustav na to reagira slanjem signala SIGTTOU ljusci, signala koji po pretpostavljenom ponašanju privremeno zaustavlja proces. Obzirom da takvo ponašanje ne želimo, taj signal možemo ignorirati (tako postaviti ponašanje ljuske za taj signal).

Pokrenuti proces može promijeniti i neke postavke terminala, ali njih ne želimo nakon što on završi. Stoga se mogu koristiti funkcije:

```c
tcgetattr(STDIN_FILENO, &shell_term_settings);
```

za spremanje trenutnog stanja te:

```c
tcsetattr(STDIN_FILENO, 0, &shell_term_settings);
```

za vraćanje stanja prema spremljenom.

Sve navedene operacije prikazane su u [primjeru koda](https://www.zemris.fer.hr/predmeti/os/pripreme/Lab2/lab2-sucelja.html) ([izvorni kod](https://www.zemris.fer.hr/predmeti/os/pripreme/Lab2/lab2-sucelja.c)). <span style="display: none">Svi komentari u rješenju moraju biti oblika `/*...*/` bez razmaka na početku. Za sve varijable koristiti camelCase, a za funkcije PascalCase.</div>
