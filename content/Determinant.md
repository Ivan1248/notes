Let $d\in\N$.  
Let $\v A \in \R^{d\times d}$.

The **determinant** of $\v A$ is
$$
\det(\v A) = 
\begin{cases}
	\sum_{j=1}^d \v A[1,j] \det(\v A[\setminus 1, \setminus j]) &\text{if } d >1 \\
	A[1,1] &\text{if } d=1
\end{cases}
$$
where $\v A[\setminus i, \setminus j]$ is the [[Submatrix|submatrix]] of $\v A$ without row $i$ and column $j$.

## Alternative definition

Let $M=\bigcup_{d\in \N} \R^{d\times d}$.  
Let $T_d$ be the [[Set|set]] of all [[Triangular matrix|triangular matrices]] from $\R^{d\times d}$.

The **determinant** is the only [[Function|function]] $\det\colon M\to\R$ such that
- $\forall d\in \N_{\geq 1}: \forall \v A, \v B \in \R^d : \det(\v A \v B) = \det(\v A) \det(\v B)$ and
- $\forall d\in \N_{\geq 1}: \forall \v T \in T_d : \det(\v T)=\prod_{i=1}^d \v T[i,i]$.

## Related

- [[Determinant of]]
- [[Array indexing notation]]
- [[Geometric interpretation of the determinant]]
