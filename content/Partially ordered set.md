---
aliases:
  - Poset
---
Let $T$ be a set.  
Let $\preceq$ be a [[Relation|relation]] such that $\preceq\subseteq T\times T$.

A **partially ordered set** (or **poset**) is a [[Ordered pair|ordered pair]] ($T, \preceq$) such that for all $a, b, c \in T$:
1. $a \preceq a$ (reflexivity),
2. $a \preceq b\land b \preceq a \implies a = b$ (antisymmetry).
3. $a \preceq b \land b \preceq c \implies a \preceq c$ (transitivity).

## Notes

A partially ordered set does not require that every pair of elements be comparable (i.e., it is not necessarily a [[Totally ordered set|total]] order).

## Related

- [[Totally ordered set]]
