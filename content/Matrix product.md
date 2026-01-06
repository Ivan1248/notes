---
aliases:
  - Matrix multiplication
---
The **matrix product** of [[Matrix|matrices]] $\v A\in\R^{m\times n}$ and $\v B\in \R^{n\times p}$ is a matrix $\v C\in\R^{m\times p}$ such that $$  
\begin{align}  
\forall (i, k)\in\{1\bidot m\}\times\{1\bidot p\} : \\  
\v C[i,k] = \sum_{j=1}^n \v A[i,j] B[j,k] \text.  
\end{align}
$$

## Notes

The matrix-vector product $\v y = \v A \v x$ can be expressed as a linear combination of columns of $\v A$ weighted by the corresponding components of $\v x$:
$$
\begin{align}  
	\v y = \sum_{i=1}^n \v x[i]A[:,i] \text.  
\end{align}
$$
If $\v x = \alpha\v e_j$, then $\v y = \sum_{i=1}^n \v \alpha e_j[i]A[:,i] = \alpha A[:j]$.

## Related

- [[Linear mapping|Linear transformation]]
