Let $\v a, \v b \in \R^d$, where $d\in \N$.

The **cosine similarity** between $\v a$ and $\v b$ is the scalar product
$$
\frac{\langle\v a,\v b\rangle}{\lVert \v a\rVert\lVert \v b\rVert} .
$$

## Notation

- $\langle\cdot,\cdot\rangle$ is the [[Dot product|dot product]].

## Notes

Cosine similarity is equal to the dot product between normalized vectors:
$$
\frac{\langle\v a,\v b\rangle}{\lVert \v a\rVert\lVert \v b\rVert} = \left\langle \frac{\v a}{\lVert\v a\rVert},\frac{\v b}{\lVert \v b\rVert} \right\rangle .
$$
The cosine similarity between $\v a$ and $\v b$ is the cosine of the angle between $\v a$ and $\v b$:
