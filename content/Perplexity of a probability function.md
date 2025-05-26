The **perplexity** of a [[probability function|probability function]] $P$ is
$$
\operatorname{PP}(P) = \exp(\H(P)) = \prod_{x\in\dom(P)} P(x)^{-P(x)} \text.
$$

## Notation

- $\H(P)$ is the [[entropy|entropy]] of $P$.

## Notes

### Invariance to the base

Perplexity is invariant to the base as long as the same base is used in the logarithm:
$$
\forall b\in\R_{\geq 0} : \operatorname{PP}(P) = b^{-\E_{x\sim P} \log_b(P(x))} \text.
$$

### Effective number of outcomes

Perplexity can interpreted as the effective number of outcomes with non-zero probability. If the perplexity is an integer, it equals the number of outcomes of a uniform distribution that has the same entropy. For example, suppose that $P$ assigns probabilities $1/n$ to each of $n$ outcomes and $0$ to all others. In this case, perplexity exactly equals the number of non-zero probabilities:
$$
\operatorname{PP}(P) = n = \lvert\{x \in \dom(P) : P(x) \neq 0\}\rvert.
$$

## Related

- [[Perplexity of a probability]]
