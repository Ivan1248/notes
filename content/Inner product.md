---
tags:
creation date: 2026-01-19
---
Let $V$ be a [[Vector space|vector space]] over a [[Field|field]] $F\in \{\R, \C\}$.

An **inner product** on $V$ is a [[Function|function]] $\langle\cdot,\cdot\rangle:V\times V\to F$ that satisfies:
- (conjugate symmetry) $\forall \v x,\v y\in V:\ \langle \v x,\v y\rangle = \overline{\langle \v y,\v x\rangle}$,
- (linearity in the first argument) $\forall \v x,\v y,\v z\in V,\ \forall a\in F:\ \langle a\v x+\v y,\v z\rangle=a\langle \v x,\v z\rangle+\langle \v y,\v z\rangle$,
- (positive definiteness) $\forall \v x\in V:\ \langle \v x,\v x\rangle\ge0$ and $\forall \v x\in V:\ \langle \v x,\v x\rangle=0 \iff \v x=\v 0_V$.

## Notation

- $\overline{a}$ is the [[Complex conjugate|complex conjugate]] of $a\in F$.

## Related

- [[Dirac inner product notation|Dirac inner product notation]]
