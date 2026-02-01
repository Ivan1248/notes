---
creation date: 2026-01-20
---
Let $(F, +_F, \cdot) \in \{\R, \C\}$ be a [[Field|field]].  
Let $(V, +)$ be an [[Abelian group|abelian group]].

A **vector space over** $F$ is $(V, +, \cdot)$ where $\cdot : F \times V \to V$ that satisfies:
- (compatibility of scalar multiplication) $\forall a,b\in F,\ \forall \v v\in V:\ (a\cdot b) \cdot \v v = a \cdot (b \cdot \v v)$,
- (identity element) $\forall \v v\in V:\ 1 \cdot \v v = \v v$,
- (distributivity over scalar addition) $\forall a,b\in F,\ \forall \v v\in V:\ (a+_F b)\cdot \v v = a \cdot \v v + b \cdot \v v$,
- (distributivity over vector addition) $\forall a\in F,\ \forall \v u,\v v\in V:\ a \cdot (\v u + \v v) = a \cdot \v u + a \cdot \v v$.

## Notation

- Let $U=(V, +, \cdot)$ be a vector space. "$\v a \in U$" denotes that $\v a \in V$.
