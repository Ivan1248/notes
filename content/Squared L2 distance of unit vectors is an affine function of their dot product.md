---
tags:
creation date: 2026-08-09
---
1. Let $n\in\N_{\geq 1}$,
2. Let $\vec x,\vec y \in \R^n$, and
3. Let $\lVert\vec x\rVert_2 = \lVert\vec y\rVert_2 = 1$.

Then $\lVert\vec x - \vec y\rVert^2 = 2 - 2 \langle \vec x,\vec y \rangle$.

## Proof

Using [[Vector square of the difference formula]] in the first equality,
$$
\begin{align}
\lVert\vec x - \vec y\rVert_2^2 &= \lVert\vec x\rVert_2^2 + \lVert\vec y\rVert_2^2 - 2 \langle \vec x,\vec y \rangle \\
&= 1^2 + 1^2 -2 \langle \vec x,\vec y \rangle \\
&= 2 - 2 \langle \vec x,\vec y \rangle \text.
\end{align}
$$
