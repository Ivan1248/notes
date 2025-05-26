Let $(\Omega,\Sigma)$ be a [[Measurable space|measurable space]].

A **measure** on $\Sigma$ is a [[Function|function]] $\mu: \Sigma \to \R \cup \{-\infty,+\infty\}$ such that:
- For every $E \in \Sigma$: $\mu(E) \geq 0$ (non-negativity),
- $\mu\left(\bigcup_{E \in S} E\right) = \sum_{E \in S} \mu(E)$ for every [[Countable set|countable set]] $S \subseteq \Sigma$ such that $\forall E, F \in S\colon E \neq F \implies E \cap F = \{\}$ (countable additivity),
- $\mu(\{\}) = 0$.
