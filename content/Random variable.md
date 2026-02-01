A **random variable** on a [[Probability space|probability space]] $(\Omega,\Sigma,P)$ taking values in a [[Measurable space|measurable space]] $(X,\Sigma')$ is a [[Function|function]] $\rvar x\colon \Omega\to X$ such that
$$  
    \forall X'\in \Sigma': \rvar x^{-1}(X')\in \Sigma \text.  
$$

## Notation

In expressions, random variables are treated as "plain" [[Variable|variables]].

Expressions such as $f(\rvar x_1, \rvar x_2, .., \rvar x_n)$, where $f$ represents a function, are shorthand for the random variable $\omega \mapsto f(\rvar x_1(\omega), \rvar x_2(\omega), .., \rvar x_n(\omega)) \colon \Omega\to \operatorname{im}(f)$.

Expressions such as $R(\rvar x_1, \rvar x_2, .., \rvar x_n)$, where $R$ denotes a [[Predicate|predicate]], are shorthand for $\forall \omega\in \Omega: R(\rvar x_1(\omega), \rvar x_2(\omega), .., \rvar x_n(\omega))$. For example, the expression $\rvar z = f(\rvar x, \rvar y)$ has the meaning $\forall\omega\in\Omega: \rvar z(\omega) = f(\rvar x(\omega), \rvar y(\omega))$.

Exceptions to such interpretation are "random-variable-aware" [[Functional|functionals]], such as the [[Probability measure|probability measure]] when denoted with $\P$, and [[Expectation|expectation]].  

$\P(\rvar x \in X')$ denotes $P(\{\omega\in\Omega \colon \rvar x(\omega) \in X'\})$, according to [[Expressing events via predicates]].

## Notes

### Interpretation and notation

A random variable assigns a value from $X$ to each outcome in the sample space $\Omega$. Interpreting the [[Inverse image|inverse image]] $\rvar x^{-1}(X')\in \Sigma$ as all outcomes for which the random variable takes a value from $X'$, the probability that $\rvar x$ takes a value from $X'\in \Sigma'$ is $P(\rvar x^{-1}(X')) = P(\{\omega\in\Omega \colon \rvar x(\omega) \in X'\})$, which can also be denoted as $\P(\rvar x \in X')$.

This formalization of probability space and random variables allows for representing dependencies among random variables. The outcome determines the values (realizations) of all random variables.

### Related concepts

The random variable $\rvar x$ is a [[Sigma-Sigma'-measurable function|$\Sigma$-$\Sigma'$-measurable function]] on the [[Measurable space|measurable space]] $(\Omega,\Sigma)$ taking values in the [[Measurable space|measurable space]] $(X,\Sigma')$.

## Related

- [[Sigma-Sigma'-measurable function]]
- [[Doob-Dynkin lemma]]
