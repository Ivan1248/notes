#research #programming 

https://github.com/babotrojka/LEBD

Par stvari, čisto informativno:  
1. Samonadzirano učenje se pokreće pomoću `./run_script/train_extract_simclr.sh` . Unutar te skripte specificira se skup podataka, napad, udio trovanja, ciljni razred te backbone. Automatski se kreira eksperiment folder te se nakon završetka učenja provodi ekstrakcija značajki i značajke se spremaju u experiment_folder.
2. `./run_scripts/train_nflows.sh` pokreće učenje per class tokova. Argumenti se predaju na sličan način kao u 1. koraku
3. `./run_scripts/extract_indices.sh`  provodi detekciju zatrovanih podataka te filtrira čiste i zatrovane podatke
4. `./run_scripts/retraining.sh`  pokreće ponovno učenje modela ako je predan argument `--indices` . U suprotnom se pokreće eksperiment trovanja modela.

**Samonadzirano učenje**
Pokreće se s pozivom `./run_scripts/train_extract_simclr.sh`. 
Unutar te skripte se podešava skup podataka {cifar10, cifar100, imagenet, vggface2}, napad, mjera trovanja, ciljna labela te okosnica. 
Okosnica `resnet18` predstavlja resnet18 za velike slike, dok okosnica `resnet18_cifar` predstavlja resnet18 za manje slike. Ako se koristi resnet18 za manje slike, nužno je i dodati zastavicu `--image_size 32`
kod pokretanja datotetka train_simclr.py i extract_features_from_simclr.py. Rezultat pokretanja ove skripte je
kreirani folder eksperimenta koji sadrži spremljeni model učen
samonadzirano te izvučenim značajkama spremljenih kao
*extracted_features.npz*. Izvučene su značajke zatrovanog skupa za
učenje, skroz čistog skupa za testiranje te skroz čistog skupa za 
testiranje. Ime foldera je određeno argumentima napada. 
​
**Učenje generativnog modela**
Pojedinačni tokovi se pokreću s ./run_scripts/train_nflows.sh. Slično
kao i u prethodnom eksperimentu, parametri napada se zadaju kroz prvih 6 argumenata.  U ovoj skripti prilikom pokretanja također treba obratiti pozornost na argument `num_classes` kojeg treba postaviti na
((ukupni broj razreda - 1)). `num_classes` se koristi u for petlji unutar ove skripte. Kapacitet toka se zadaje pomoću argumenata `steps` i 
`inflate_coef`. Rezultati učenja tokova spremaju se u svoj folder unutar
foldera eksperimenta. Ime foldera je određeno argumentima za učenje tokova. 
​
**Pročišćavanje skupa**
Detektiranje zatrovanih razreda, izvlačenje indeksa čistih podataka
te relabeliranje se odvija pozivom skripte 
./run_scripts/extract_indices.sh. Unutar ove skripte su 4 nova 
argumenta: `alpha`, `beta_nd`, `beta_d` i `lambda` koji su istovremeno i 
hiperparametri cijele metode. Također se treba postaviti
argument `num_classes` na ((ukupni broj razreda)) (ovo je redundantno, ista stvar se može u python kodu napraviti). 
Rezultat ove skripte je datoteka
sa spomenutim indeksima koja je spremljena u istom folderu kao 
i tokovi. Ta datoteka se onda koristi u zadnjem koraku prilikom određivanja koji primjerci će biti izbačeni iz skupa za učenje. 
Izuzev datoteke s indeksima, sprema se i histogram mjere *s* na 
primjercima zatrovanog razreda te na svim primjercima. 
​
**Ponovno učenje na pročišćenome skupu**
Skripta ./run_scripts/retraining.sh pokreće učenje modela. Skripta ima 
dvije namjene: učenje modela na zatrovanim podacima u svrhu 
testiranja potentnosti napada te učenje modela na pročišćenim podacima. Druga opcije se postiže predavanjem zastavice 
`--indices $indices`.  Log datoteka rezultata obrane 
se sprema u folder `defense.../`, dok se log datoteka rezultata napada 
sprema u folder `poisoned_training/`.
