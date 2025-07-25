---
creation date: 2025-06-15
aliases:
  - Semi-decidable language
  - Recursively-enumerable language
---
Let $L$ be a [[Formal language|language]] over $A$.

$L$ is **recognizable** iff there exists a [[Turing machine]] $M$ such that for all $x\in A^*$:
- if $x\in L$, $M(x)$ accepts,
- if $x\not\in L$, $M(x)$ rejects or does not halt.

## Related

- [[Decidable language]]
- [[Co-recognizable language]]