---
tags:
creation date: 2026-01-22
---
Let $D$ be the set of observed data.  
Let $\theta$ be the model parameters.  
Let $\Theta$ be the set of model parameters.  

Let $\hat L = \argmax_{\theta\in\Theta}\, p(D\mid\theta)$.

The **Akaike information criterion** is
$$
\const{BIC}(k, n) = k \ln(n) - 2\ln(\hat L)
$$

## Related

- [[Bayesian information criterion|Bayesian information criterion]]
