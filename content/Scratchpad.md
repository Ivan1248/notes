If all classes are equally probable, then
$$
\frac{p(z\mid y)}{p(z\mid y')} = \frac{P(y\mid z)}{P(y'\mid z)} .
$$
*Proof:*

$$
\begin{align}
\frac{p(z\mid y)}{p(z\mid y')} &= \frac{p(z\mid y)P(y)}{p(z\mid y')P(y)} \\
	&= \frac{p(z\mid y)P(y)}{p(z\mid y')P(y')} \text{ (equal class probabilities)} \\
	&= \frac{p(z, y)}{p(z, y')} \\
	&= \frac{P(y\mid z) p(z)}{P(y'\mid z) p(z)} \\ 
	&= \frac{P(y\mid z)}{P(y'\mid z)} .
\end{align}
$$

$$
\bm{m}_i[r, c] = \sigma\left(
	\sum_{e=1}^E \bm{E}[r,c,e] \bm{w}_\text{loc}[i, e] \right)
$$
$$
\bm{m}_i[r,c] = \sigma(\bm{E}[r,c,:]^\transpose \bm{w}_\text{loc}[i, :])
$$