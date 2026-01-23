Let $\forall y\in Y, \pi\in\Pi \colon P[\rvar x\mid y] = P[\rvar x\mid y, \pi]$.

Let
$$ 
\forall x\in X, y\in Y, \pi\in\Pi\colon P(y\mid x, \pi) = \frac{P(x\mid y, \pi)P(y\mid \pi)}{\sum_{y'\in Y} P(x\mid \rvar y=y', \pi)P(\rvar y=y'\mid \pi)} \text.
$$

Then,
$$
\forall x\in X, y\in Y, \pi\in\Pi\colon P(y\mid x, \pi) = \frac{P(x\mid y)P(y\mid \pi)}{\sum_{y'\in Y} P(x\mid \rvar y=y')P(\rvar y=y'\mid \pi)} \text.
$$

Then,
$$
\begin{align}
\forall x\in X, y\in Y, \pi\in\Pi'\colon P(y\mid x,\rvar\pi=\pi') 
&= \frac{P(x\mid y)P(y\mid\rvar\pi=\pi')}{\sum_{y'\in Y} P(x\mid \rvar y=y')P(\rvar y=y'\mid\rvar\pi=\pi')} \\ 
&= \frac{P(x\mid y) P(y\mid \pi) \frac{P(y\mid\rvar\pi=\pi')}{P(y\mid \pi)}}{\sum_{y'\in Y} P(x\mid \rvar y=y') P(y=y'\mid \pi) \frac{P(y=y'\mid\rvar\pi=\pi')}{P(y=y'\mid \pi)}} \text.
\end{align}
$$

## Related

- [[Class imbalance|Class imbalance]]
