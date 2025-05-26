#definition 

$\softmax\colon \R^n\to(0\bidot 1)^n$ is the softmax function iff
$$
\begin{align}
& \forall x\in \R^n, i\in\{1\bidot n\}\colon \\

& \softmax(\v x){[i]} = \frac{\exp(\v x[i])}{\sum_{j=1}^n\exp(\v x[j])} \text.

\end{align}
$$

### Notes

Let $T\in \R\setminus\{0\}$.
$$
\lim_{T\to0} \softmax(\v x/T) = \cvec e_{\argmax_i \v x_i} \text, 
$$
where $\cvec e_k$ represents the [[One-hot vector|one-hot vector]] with $\forall k, j\colon \cvec e_k[j] = \enbbracket{k=j}$.