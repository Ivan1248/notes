[[Early action prediction]]

Let $t_1(\v x) = \v x[:n(\v x, y)]$.  
Let $t_2(\v x) = \v x[n(\v x, y)+1\bidot]$.

$\v z = (f_1\circ\dots\circ f_l)(t_1(\v x))$.  
$\v z_\text{o} = (g_1\circ\dots\circ g_l)(t_1(\v x), \v x)$.  
where  
$g_i(\v h_{i-1}, \v h^\text{o}_{i-1})=(f_i(\v h_{i-1}), f^\text{o}_i(\v h_{i-1}, \v h^\text{o}_{i-1}))$

$\v z_1 = f_1(t_1(\v x))$  
$\v z_{1,2} = f_1(t_1(\v x))\concat f_2(\v x)$

---

Ideje za ubrzanje učenja i potencijalno poboljšavanje kompatibilnosti značajki i gubitaka.

**1. Ubrzanje učenja i poboljšanje kompatibilnosti značajki spajanjem glavnog modela i proroka**

Izmijeniti model proroka maskiranjem pažnje (i možda još nekim izmjenama ako treba) tako da za prvi dio videa računa iste značajke kao model koji prima samo prvi dio videa. Maskiranje bi bilo takvo da tokeni prvog dijela videa vide samo sebe međusobno, a ostali vide sve tokene.

**2. Izmjena glava i gubitaka u skladu s klasifikacijskom perspektivom**

Perspektiva predviđanja budućih značajki zahtijeva veći kapacitet (zbog predviđanje značajki koje nisu potrebne za klasifikaciju) i teško je gubitak za multimodalnost predikcija značajki.

Alternativa perspektiva je da je rano predviđanje akcija klasifikacijski zadatak kod kojeg model pri učenju ima više ulaznih informacija nego pri ispitivanju.

Predlažem da 2 glave (glavna i prorokova) predviđaju klasu i za svaku 1 gubitak. Svaka glava počinje s prikladnim dekoderom i unakrsnom pažnjom. U obje glave K i V dolaze iz prvog dijela videa. U glavnoj glavi Q dolazi iz prvog dijela videa, a u prorokovoj Q dolazi iz cijelog videa. Oba gubitka potiču da značajke iz prvog dijela videa budu dobre za klasifikaciju.

**3. Uvjetovanje za razlikovanje tokena prvog i drugog dijela videa**

Možda bi bilo bolje da drugi dio videa ima drugačije parametre ili nekakvo uvjetovanje jer nema istu funkciju kao prvi dio (ne ide u K i V, prvi dio ga ne vidi). Inače model mora trošiti kapacitet na učenje prepoznavanja dolazi li token iz prvog ili drugog dijela videa.

**4. Zamjena za globalno sažimanje**

Sažimanje preko THW bi moglo biti u konfliktu s autoregresivnim tokenima, od kojih početni mogu biti manje korisni za klasifikaciju. Globalno sažimanje zamijeniti sažimanjem pažnjom u jedan token gdje je Q (ulazni CLS token) učen (ili nečim sličnim što dobro radi)?
