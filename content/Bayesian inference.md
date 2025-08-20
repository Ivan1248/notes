Let $S=(\Omega,\Sigma,P)$ be a [[Probability space|probability space]].  
Let $\rvar \theta$ be a [[Random variable|random variable]] on $S$.  
Let $\rvar D$ be a random variable on $S$.

Depending on whether $\rvar D$ and $\rvar\theta$ are discrete or continuous, let $p$ denote probability or density.

The Bayes' theorem states how beliefs about some random variable $\rvar \theta$ should change once some random variable $D$ is observed.
$$
p(\theta\mid D) = \frac{p(D,\theta)}{p(D)} = \frac{p(D\mid\theta)p(\theta)}{p(D)} \text.
$$
In the framework of Bayesian inference:
- The random variable $\rvar\theta$ is the **inferred random variable**.
- The value $D$ is the **observation** or **evidence**.
- The distribution of the probability (density) function $p[\rvar\theta]$ is the **prior**.
- The probability (density) $p(D\mid\theta)$ is the **likelihood** of $\theta$. The likelihood does not depend on the prior.  
- The probability (density) $p(\theta\mid D)$ is called the **posterior**.
- $p(D)=\E[\p(D\mid \rvar\theta)]$ is called the **marginal likelihood** (or **evidence**).  
