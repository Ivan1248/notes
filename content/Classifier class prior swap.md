Let $\forall y\in Y, \pi\in\Pi \colon P[\rvar x\mid y] = P[\rvar x\mid y, \pi]$.

Let
$$ 
\forall x,y,\pi\colon P(y\mid x, \pi) = \frac{P(x\mid y, \pi)P(y\mid \pi)}{\sum_{y'\in Y} P(x\mid \rvar y=y', \pi)P(\rvar y=y'\mid \pi)} \text.
$$

Then,
$$
\forall x,y,\pi\colon P(y\mid x, \pi) = \frac{P(x\mid y)P(y\mid \pi)}{\sum_{y'\in Y} P(x\mid \rvar y=y')P(\rvar y=y'\mid \pi)} \text.
$$

Then,
$$
\begin{align}
\forall x,y,\pi\colon P(y\mid x, \pi=\pi') 
&= \frac{P(x\mid y)P(y\mid \pi=\pi')}{\sum_{y'\in Y} P(x\mid \rvar y=y')P(\rvar y=y'\mid \pi=\pi')} \\ 
&= \frac{P(x\mid y) P(y\mid \pi) \frac{P(y\mid \pi=\pi')}{P(y\mid \pi)}}{\sum_{y'\in Y} P(x\mid \rvar y=y') P(y=y'\mid \pi) \frac{P(y=y'\mid \pi=\pi')}{P(y=y'\mid \pi)}} \text.
\end{align}
$$

## Related

- [[Class imbalance]]
