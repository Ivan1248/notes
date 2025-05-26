**Singular value decomposition** is a [[Matrix decomposition|matrix decomposition]] that maps a [[Matrix|matrix]] $\v A\in \R^{m\times n}$ to the [[Tuple|triplet]] $(\v U, \v S, \v V)$, where
- $\v U\in\R^{m\times m}$ and $\v V\in\R^{n\times n}$ are [[Orthonormal matrix|orthonormal matrices]],
- $\v S\in\R^{m\times n}$ is such that its [[Diagonal of an array|diagonal]] is [[Non-increasing function|non-increasing]] and $$  
	\forall (i, j)\in\{1\bidot m\}\times\{1\bidot n\}: S[i, j] \geq 0 \land (i\neq j \implies \v S[i, j]=0) \text.$$
