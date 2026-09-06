A **causal graph** is a [[Directed acyclic graph|directed acyclic graph]] $(V, E)$ where:
- the [[Graph|vertices]] in $V$ are [[Random variable|random variables]], and
- the [[Graph|edges]] in $E$ are such that $\forall \rvar u, \rvar v \in V:  \rvar u\not\perp \rvar v$ and $\forall \rvar v\in V: \exists (\rvar a, \rvar b)\in E: \rvar v\in \{\rvar a,\rvar b\}$.

## Notes

-  $\not\perp$ denotes [[dependence of random variables]].
