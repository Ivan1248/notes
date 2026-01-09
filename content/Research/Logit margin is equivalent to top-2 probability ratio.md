#theorem #classification 

Let $p_{i}$ and $p_j$ be the top 2 categorical probabilities.
Let $s_i$ and $s_j$ the corresponding logits.
Then,
$$
\begin{align}
    \ln\left(\frac{p_{i}}{p_{j}}\right) = s_{i} - s_{j} \text{.}
\end{align}
$$
*Proof.*
It follows from [[Logit difference equals the logarithm of the probability ratio]].