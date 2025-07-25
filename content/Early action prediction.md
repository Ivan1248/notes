Basic definitions:
- A **video** is a [[Finite sequence|finite sequence]] of [[Image|images]] with height $H$, width $W$, and $C$ channels.
- The **set of all possible videos** is $X \subseteq {(\R^{H\times W\times C}})^*$.
- The **set of all possible labels** is a [[finite set]] $Y$.
- A **set of categorized videos** is a finite set $D\subset X\times Y$.

Let $n\colon X\to \N$ (**observation size mapping**) be such that $\forall (\v x, y)\in D :  n(\v x) < \operatorname{len}(\v x)$.  
Let
- $D_\text{train} \subset D$, and
- $D_\text{test} = \{(\v x[1\bidot n(\v x)],y): (\v x,y) \in D \setminus D_\text{train}\}$.

**Early action prediction** is a [[machine learning task]] where the training set is $D_\text{train}$, and the model is [[Machine learning evaluator|evaluated]] on predicting $y$ given $\v x'$, where $(\v x', y) \in D_{\text{test}}$.

## Used notation

- [[Kleene star]]
- [[Sequence length]]
- [[Array indexing notation]]
