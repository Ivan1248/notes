Let $X$ and $Y$ be [[set|sets]].

A **submodular function** is a [[function]] $f\colon 2^X\to Y$ such that $$  
\forall A, B\subseteq X\colon (A\subseteq B \implies \forall x\in X \setminus B \in X\colon f(A\cup\{x\}) - f(A) \geq f(B\cup\{x\}) - f(B))
$$

## Notation

- Power set notation in [[Set operations]].

## Notes

- Submodularity generalizes the concept of diminishing returns.
