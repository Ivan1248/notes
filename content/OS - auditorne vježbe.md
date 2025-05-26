## Zadatak 3.1

- Programi i potprogrami:
	- `GP` – glavni program,
	- `P1`, `P2`, `P3` – procedure za obradu prekida
		- veći broj – veći prioritet,
	- `PP` – prihvat prekida – pohrana konteksta i _još neke operacije_,
	- `PiP` – povratak iz prekida – obnova konteksta i _još neke operacije_,

- Prekidi:
	- `P2` u $t_2$ = 1 ms, `P1` u $t_1$ = 3 ms, `P3` u $t_3$ = 4 ms.
	- Obrada svakog prekida traje po 3 ms.

- Dodatne pretpostavke:
	- Ako u istom trenutku završava neka obrada i događa se prekid, prekid se dogodi nakon završetka obrade i onemogućavanja prekidanja.
	- Ako se u istom trenutku pojavi više prekida, za svaki se zasebno poziva `PP`.

- Napomena: Kontekst su vrijednosti registara koji čine stanje izvršavanja dretve. Obnovom pohranjenog konteksta dretva se nastavlja izvršavati gdje je stala, bez da neki registar ima "neočekivano" promijenjenu vrijednost.

### A) Idealni slučaj

- Obrada prekida prema prioritetu.
- Trajanje prihvata (`PP`) i povratka iz prekida (`PiP`) se zanemaruje.

![[Pasted image 20240313091621.png]]

### B) Bez sklopa za prihvat prekida, obrada uz zabranjeno prekidanje

- `PP` (prihvat prekida) – pohrana konteksta i prozivanje, traje 1 ms.
- `PiP` (povratak iz prekida) – obnova konteksta, traje 0.5 ms.

- Graf:
	- U 1 ms postavlja se prekidni signal za `P2`.
		- Nakon izvršavanja instrukcije glavnog programa procesor poziva `PP`:
			1. onemogućuje prekidanje,
			2. prelazi u sustavski način rada,
			3. pohranjuje PC i RS na sustavski stog,
			4. u PC stavlja adresu prekidnog potprograma.
		- Procesor izvršava prekidni potprogram `PP`:
			1. pohranjuje kontekst na sustavski stog,
			2. proziva naprave od najvišeg prema najnižem prioritetu,
			3. nailazi na postavljenu zastavicu prekida,
			4. poziva obradu prekida (funkciju upravljačkog programa) `P2`.
	- U 2 ms i 3 ms postavljaju se prekidni signali, ali se ništa ne događa do završetka `P2`.
	- U 5 ms dolazi `PiP`:
		1. obnavlja se kontekst sa sustavskog stoga,
		2. omogućuje se prekidanje.
	- U 5.5 ms izvrši se jedna instrukcija `GP`-a i poziva se `PP`.
	- U 6.5 ms `PP` prozivanjem otkrije da je postavljena zastavica pristupnog sklopa za `P3` i poziva se `P3`.
	- U 9.5 ms dolazi `PiP`.
	- U 10 ms izvrši se jedna instrukcija `GP`-a i poziva se `PP`.
	- U 11 ms `PP` prozivanjem otkrije da je postavljena zastavica za `P1` i poziva se `P1`.
	- U 14 ms dolazi `PiP`.
	- U 14.5 ms nastavlja se `GP`.  
![[Pasted image 20240313091639.png]]
- Najjednostavniji sustav.
- Primjenjuje se u ugrađenim sustavima: bitna je mala cijena i obrade prekida projektiraju se tako da traju kratko kako bi odgode prioritetnijih prekida bi bile jako male.

### C) Bez sklopa, ali s programskom potporom za prihvat prekida

- Strukture podataka:
	- `T_P` – tekući prioritet – prioritet onoga što se trenutno izvršava,
	- `KON[I]` – mjesto za pohranu konteksta dretve prekinute prekidom s brojem `I`,
	- `K_Z[I]` – kontrolna zastavica koja kaže čeka li prekid s brojem `I` na obradu.

- `PP` (prihvat prekida) – pohrana konteksta, prozivanje i premještanje konteksta i `T_P`-a u `KON[i]`, traje 1.5 ms.
- `PiP` (povratak iz prekida) – obnova konteksta, pregled što dalje i možda obnova i premještanje konteksta traje 0.5 ms.

- Graf:  
![[Pasted image 20240313091704.png]]

### C) Sa sklopom za prihvat prekida

- `T_P` i `K_Z` su u sklopu.
-

- `PP` (prihvat prekida) – pohrana konteksta, traje 0.5 ms.
- `PiP` (povratak iz prekida) – obnova konteksta, traje 0.5 ms.

- Procesor ne proziva i ne dobiva signal prekida dok je trenutni prioritet viši.

- Graf  
![[Pasted image 20240313102138.png]]

- Naglasiti: manje kućanskih poslova jer nam sklop pomaže. Zato i PP traje kraće nego u b) slučaju, tj. sustav je efikasniji od b) i stoga što ne propušta manje prioritetnije zahtjeve do procesora dok on radi prioritetnije obrade.
