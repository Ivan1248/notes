Cilj je ostvariti automatsko odmućivanje fotografija algoritmom koji se temelji na strojnom učenju i dekonvoluciji.

## Prijedlog dijelova projekta

### 1. Konvolucija i zamućivanje

1. Programski ostvariti operaciju konvoluciju slike (jednokanalne ili trokanalne) po kanalima s proizvoljnom kvadratnom jezgrom. Može se koristiti [torch.nn.functional.conv2d](https://pytorch.org/docs/stable/generated/torch.nn.functional.conv2d.html).
2. Programski ostvariti generiranje jezgri: Gaussova jezgra, mješavina Gaussa, ...  
3. Provjeriti (vizualizirati) zamućivanje slika generiranim jezgrama. Usporediti zamućivanje Gaussovom jezgrom sa zamućivanjem u uređivaču rasterskom slika kao što je Gimp, Krita, ili Paint.NET.

### 2. Fourierova transformacija funkcije s diskretnom domenom

1. Proučiti Fourierovu transformaciju (DFT) i njen inverz za funkcije jedne varijable i funkcije dviju varijabli (jednokanalne slike).
2. Programski ostvariti frekvencijsku analizu (DFT) i sintezu slika (PyTorch nudi algoritam FFT). Ostvariti konvoluciju i dekonvoluciju pomoću množenja (i dijeljenja) u frekvencijskoj domeni. Može se koristiti [torch.fft.fft2](https://pytorch.org/docs/stable/generated/torch.fft.fft2.html) i [torch.fft.ifft2](https://pytorch.org/docs/stable/generated/torch.fft.ifft2.html).
3. Vizualizirati slike (i jezgre) u prostornoj domeni i frekvencijskoj domeni. Usporediti konvoluciju ostvarenu korištenjem DFT-a s izravno ostvarenom konvolucijom. Isprobati nisko-propusno, pojasno-propusno i visoko-propusno filtriranje slika.

### 3. Učenje predviđanja jezgre zamućenja

Zadatak je smisliti i programski ostvariti algoritam koji na ulazu prima zamućenu sliku, procjenjuje konvolucijsku jezgre kojom je slika zamućena i konvolucijom s inverzom te jezgre (dekonvolucijom) rekonstruira originalnu sliku.

Glavne komponente algoritma učenja:
1. Skup nezamućenih slika za učenje.
2. Model za odmućivanje koji je kompozicija dviju funkcija:
	1. Parametrizirana funkcija (modul) koja na ulazu prima zamućenu sliku i procjenjuje kakvom je jezgrom zamućena.
	2. Funkcija koja prima procijenjenu jezgru i zamućenu sliku i dekonvolucijom računa procjenu čiste slike.
3. Optimizacijski algoritam (npr. (stohastički) gradijentni spust).
4. Funkcija gubitka (pogreška rekonstrukcije s regularizacijom).
5. Korak petlje učenja koji radi sljedeće:
	1. Uzorkuje nekoliko slika, za svaku sliku generira nasumičnu jezgru i zamuti ju. (Rezultat je trojka koja se sastoji od čiste slike, konvolucijske jezgre i zamućene slike.)
	2. Primijeni model za odmućivanje na zamućenu sliku. Rezultat je procjena odmućene slike (rekonstrirana slika). PyTorch pamti međurezultate za računanje gradijenta.
	3. Računa gubitak (npr. srednja kvadratna pogreška) između rekonstruirane i originalne slike.
	4. Računa gradijent pogreške rekonstrukcije s obzirom na parametre modela.
	5. Primjenjuje korak optimizacije na parametre modela.

### 4. Evaluacija rada modela za odmućivanje

1. Potreban dodatni skup slika za testiranje, koji algoritam nije "vidio" tijekom učenja.
2. Procijeniti pogrešku rekonstrukcije i vizualno usporediti rezultate na skupu za testiranje i skupu za učenje.

## Problemi i ideje

Možete se uvijek javiti ako je nešto nejasno ili vam mogu uštediti vrijeme.

Ne morate se strogo (ili uopće) držati mojih prijedloga ako imate neke drugačije ideje koje su vam zanimljive.

Najteži problem je vjerojatno smisliti prikladnu strukturu modela za predviđanje konvolucijske jezgre. To bi možda mogao biti jednostavan model s nekoliko konvolucijskih slojeva s ReLU-om koji na kraju ima globalno sažimanje, potpuno povezani sloj (koji računa vektor) i preslagivanje vektora u kvadratnu jezgru.

Ako su slike velike, radi ubrzanja učenja (a i radi raznolikosti primjera za učenje), dobro je modelu tijekom učenja davati isječke slika prikladne veličine.

Možete koristiti sve dostupne informacije i alate kako bi vam bilo lakše ostvariti projekt. Na kraju je bitno da dobro razumijete što ste ostvarili.

## Poveznice

1. Postojeći program za odmućivanje fotografija: [GitHub - Y-Vladimir/SmartDeblur: Restoration of defocused and blurred photos/images](https://github.com/Y-Vladimir/SmartDeblur)
2. Kako rade najnapredniji algoritmi: https://didyouknowbg8.wordpress.com/2024/05/15/deblurgs-from-blurry-images-to-sharp-3d-scenes/
3. Primjeri Wienerove dekonvolucije: [Computer vision - project documentation - De-identification of video sequences - Google dokumenti](https://docs.google.com/document/d/1Q1S99n-2pxx4F-Mffrf9Jln2e3rY_kQPGJM3rfRLp5Y/edit?usp=sharing)
4. Fourierove transformacije: 
	- [But what is the Fourier Transform? A visual introduction](https://www.youtube.com/watch?v=spUNpyF58BY)
	- [Predavanja - Signali i sustavi](https://www.fer.unizg.hr/predmet/sis/predavanja#%23!p_rep_131761!_-165893)
