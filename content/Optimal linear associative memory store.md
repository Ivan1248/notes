Let $\vec K\in\R^{n\times d_\text{k}}$ (keys), $\vec V \in \R^{n\times d_\text{v}}$ (values).

$\v M^*\in\R^{d_\text{v}\times d_\text{k}}$ is the **optimal linear associative memory store of** $(\vec K, \vec V)$ iff
$$
\vec M^* = \argmin_{\vec M} \lVert \vec M \vec K^\transpose - \vec V\rVert_\text{F}^2 \text.
$$

## Notes


$D=(MK^T -V)$
$D[i,j] = \sum_{k=1}^{\bidot d_\text{k}} M[i, k]K[j, k]$
$\pd{D[i,j]}{M[l,k]} = \enbbracket{i=l}K[j,k]$
$D^\transpose D$
$\pd{\sum_{i,j} D[i, j]^2}{M[l,k]}=0$
$\sum_{i,j} \pd{D[i, j]^2}{M[l,k]}=0$
$2\sum_{i,j} \pd{D[i, j]}{M[l,k]}=0$



