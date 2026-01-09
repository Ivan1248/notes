## Problem

- Podaci: [IRAP-BH](https://zenodo.org/records/15123983).
	- Metapodaci: [Mapa – Google disk](https://drive.google.com/drive/folders/1yGgVBanN4OySWoCeh1qXteZQAwWhsMTn?usp=sharing)
- Predtrenirani parametri: [Mapa – Google disk](https://drive.google.com/drive/folders/17YgrUshUc4HqaptBfVj0d-JKcGDnQxE_?usp=sharing)
- Priručnik o atributima: [iRAP Coding Manual – Drive on the Right Edition](https://resources.irap.org/Specifications/iRAP_Coding_Manual_Drive_on_Right.pdf)
- Priručnik o atributima za projekt i drugi materijali: [0. Reference materials – Google Drive](https://drive.google.com/drive/folders/1hsWA1HhFeUNk3IqvGTjVnrJoBLZ2DOEY)
- Zadaci kojima se bavio Marin:
	- Klasifikacija sigurnosnih atributa.
	- Kod nekih atributa je problem što treba pogoditi točno jednu sliku među više susjednih slika u kojima je vidljiv.
- Klasifikacija sigurnosnih atributa vrste "roadside safety".

## Motivacija

- Koji je cilj projekta?
- Koliko se čime ima smisla baviti? Koliko je bitno ono čime se ima najviše smisla baviti?
- Ima li smisla rješavati općenitiji zadatak i iz njegovog rješenja izvesti klasifikaciju atributa?
	- Ima li smisla da ulazni podaci budu drugačiji (LiDAR, panoramska snimka, stereo).
		- Jedna kamera je vjerojatno dovoljna.
		- Ali vjerojatno ni LIDAR ili stereo-kamera nisu velik trošak.
	- Ima li smisla rješavati općenitiji zadatak?
		- Učenje atributa izravno iz slike može se teže učiti jer se na temelju malo podataka treba naučiti više koraka zaključivanja za odrađivanje kojoj slici pripada neki atribut. Na primjer, u dvije uzastopne slike vidi se stablo blizu ceste na nekoj udaljenosti.
		- 3D semantička (ili panoptička) segmentacija.
		- Semantički monokularni SLAM.
		- Monokularna procjena dubine.

## Literatura

- SLAM i monokularna procjena dubine:
	- [RGBD-3DGS-SLAM](https://github.com/jagennath-hari/RGBD-3DGS-SLAM?tab=readme-ov-file)
- Monokularna procjena dubine:
	- [UniDepthV2: Universal Monocular Metric Depth Estimation Made Simpler](https://arxiv.org/abs/2502.20110v1)

## Metoda

- ResNet-18

## Rezultati

Pozitivni:
- Predtreniranje na semantičkoj segmentaciji je korisno.
- Balansiranje gubitaka je korisno.
- Sekvencijsko poravnavanje je korisno.  
Negativni:
- S većim modelima ne radi bolje.

## Članak

Glavni članak: [\[2211.04165\] Dynamic loss balancing and sequential enhancement for road-safety assessment and traffic scene classification](https://arxiv.org/abs/2211.04165)

Dodatak: [Appendix](https://ieeexplore.ieee.org/ielx8/6979/10742224/10682434/supp1-3456214.pdf)

Doktorski rad: [zemris.fer.hr/\~ssegvic/pubs/kacan25phd.pdf](https://www.zemris.fer.hr/~ssegvic/pubs/kacan25phd.pdf)

## Ostalo

[Google Drive: project documents and data](https://drive.google.com/drive/folders/1_7Fo8WQDPUfmVmYaRZx9m-YZ64DHlwTA)

## Podaci

strider /mnt/sdb1/datasets/anditi360/anditi-import-north-west

## Ideje

### Robusna evaluacija

Ne tolerira nepreciznost:
$$
S(t, t^*) = P(a\mid x,\rvar t=t^*)
$$
Tolerira nepreciznost (pomak za 1 mjesto):
$$
S(t, t^*) = \max_{i\in\{t-1, t , t+1\}} P(a\mid x,\rvar t=i)
$$

### Dodavanje informacija o apsolutnom položaju

Lokalni model bi se mogao poboljšati tako da se uz ulaz uključe informacije o apsolutnim položajima. Ideje:
- Najjednostavnije: točka u sredini slike.
- Prikladno pozicijsko ugrađivanje.
- SPP već ima. Dodati konvolucijske slojeve iza SPP-a?

## "Roadside severity"

- Distance:
	- $[0 \unit{m}, 1 \unit{m})$
