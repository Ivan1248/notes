Let $X$ and $Y$ be finite sets.

Let $P_X\colon X\to [0\bidot 1]$ and $P_y\colon X\to [0\bidot 1]$ be [[Probability function|probability functions]].

Let $C\colon X\times Y\to \R$ (**cost function**).

**Optimal transport** from $P_X$ to $P_Y$ is a function $T\colon X\times Y \to \R$ such that
$$
T = \argmin_{T': \left\{\forall y\in Y\colon \sum_{x\in X} T(x, y) = P_Y(x, y) \right\} \land \left\{\forall x\in X\colon \sum_{y\in Y} T(x, y) = P_X(x, y)\right\}} \sum_{x\in X,y\in Y} C(x,y)T(x,y) \text.
$$
