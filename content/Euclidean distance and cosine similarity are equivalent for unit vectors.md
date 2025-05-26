If $\v a$ and $\v b$ are [[Unit vector|unit vectors]], then
$$
\lVert\v a - \v b\rVert^2  = 2 - 2\langle\v a| \v b\rangle .
$$

## Proof

1. $$
	\begin{align}  
	\lVert\v a - \v b\rVert^2  
		&= \sum_{i=1}^d (\v a[i] - \v b[i])^2 &&\text{(definition of squared $\mathrm L^2$ norm)} \\  
		&= \sum_{i=1}^d \v a[i]^2 - 2\sum_{i=1}^d \v a[i]\v b[i] + \sum_{i=1}^d \v b[i]^2 &&\text{(multiplication and addition)} \\  
		&= \lVert\v a\rVert^2 + \lVert\v b\rVert^2 - 2\langle\v a| \v b\rangle &&\text{(def. of sq. $\mathrm L^2$ norm and dot prod.)}.  
	\end{align}
	$$
	Proof:
2. $\lVert \v a\rVert=\lVert \v b\rVert=1$.  
   Proof: By the antecedent ($\v a$ and $\v b$ are [[Unit vector|unit vectors]]).
3. $\lVert\v a - \v b\rVert^2  = 2 - 2\langle\v a| \v b\rangle$.  
   Proof: By substituting 1 into 3, and simplifying.  
$\blacksquare$

## Notes

We can express cosine similarity as:
$$
\langle\v a| \v b\rangle = 1 - \frac{1}{2}\lVert\v a - \v b\rVert^2 .
$$

## Related

- [[Function equivalance]]
