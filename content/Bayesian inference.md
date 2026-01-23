Let $S=(\Omega,\Sigma,P)$ be a [[Probability space|probability space]].  
Let $\rvar h$ be a [[Random variable|random variable]] on $S$.  
Let $\rvar e$ be a random variable on $S$.

Depending on whether $\rvar e$ and $\rvar h$ are discrete or continuous, let $p$ denote probability or density.

The Bayes' theorem states how beliefs about some random variable $\rvar h$ should change once some random variable $e$ is observed.
$$
p(h\mid e) = \frac{p(e,h)}{p(e)} = \frac{p(e\mid h)p(h)}{p(e)} \text.
$$
In the framework of **Bayesian inference**:
- The random variable $\rvar h$ is the **hypothesis** (or **inferred random variable**).
- The realization $e$ is the **evidence** (or **observation**).
- The distribution of the probability (density) function $p[\rvar h]$ is the **prior**.
- The function $h\mapsto p(e\mid h)$ is the **likelihood function**. The probability (density) $p(e\mid h)$ is the **likelihood** of $h$. The likelihood does not depend on the prior.
- The probability (density) $p(h\mid e)$ is called the **posterior**.
- $p(e)=\E[\p(e\mid \rvar h)]$ is called the **marginal likelihood** (or **evidence**).  
