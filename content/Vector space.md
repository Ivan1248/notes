---
creation date: 2026-01-20
---
Let $(F, +_F, \cdot_F) \in \{\R, \C\}$ be a [[field|field]].  
Let $(V, +)$ be an [[Abelian group|abelian group]].

A **vector space over** $F$ is $(V, +, \cdot)$ where $\cdot : F \times V \to V$ such that:
- (compatibility of scalar multiplication) $\forall a,b\in F,\ \forall \v v\in V:\ (a\cdot_F b) \cdot \v v = a \cdot (b \cdot \v v)$,
- (identity element) $\forall \v v\in V:\ 1 \cdot \v v = \v v$,
- (distributivity over scalar addition) $\forall a,b\in F,\ \forall \v v\in V:\ (a+b)\cdot \v v = a \cdot \v v + b \cdot \v v$,
- (distributivity over vector addition) $\forall a\in F,\ \forall \v u,\v v\in V:\ a \cdot (\v u + \v v) = a \cdot \v u + a \cdot \v v$.
