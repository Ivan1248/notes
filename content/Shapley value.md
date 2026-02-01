## Definition through properties

The Shapley value of a [[Coalitional game|coalitional game]] $(v, P)$ is a [[Function|function]] $\phi(v)\colon P\to [0\bidot 1]$ with properties:
1. (efficiency) $\sum_{i\in P} \phi(v)[i] = v(P)$.
2. (symmetry) $\forall i,j\in P\colon (\forall S\subseteq P\colon v(S \cup \{i\}\setminus\{j\}) = v(S \cup \{j\}\setminus\{i\})) \implies \phi(v)[i] = \phi(v)[j]$.
3. (linearity) Let $(w, P)$ be a coalitional game. $\forall i\in P\colon (\phi(v+w)[i] = \phi(v)[i] + \phi(w)[i]) \wedge (\phi(av)[i] = a\phi(v)[i])$.
4. (null player value) $\forall i\in P\colon(\forall S\subseteq P\colon v(S \cup \{i\}) = v(S)) \implies \phi(v)[i] = 0$.
