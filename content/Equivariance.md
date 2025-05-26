## To a function

Let $X$ and $Y$ be sets.  
Let $f\colon X\to Y$ and $g\colon X\to X$.  
$f$ is **equivariant to** $g$ iff there exists some $g'\colon Y\to Y$ such that
$$
f\circ g = g'\circ f .
$$

### Equivalent statement

$f$ is **equivariant to** $g$ iff there exists some $g'\colon Y\to Y$ such that
$$
\forall x\in X\colon f(g(x)) = g'(f(x)) .
$$

## To a set of functions

Let $X$ and $Y$ be sets.  
Let $f\colon X\to Y$ and $G\subseteq X\to X$.  
$f$ is **equivariant to** a set of functions $G$ iff  
	$f$ is equivariant to each $g\in G$.

## A set of functions to a set o functions

Let $X$ and $Y$ be sets.  
Let $F\subseteq X\to Y$ and $G\subseteq X\to X$.  
The set of functions $F$ is **equivariant to** a set of functions $G$ iff  
	Each $f\in F$ is equivariant to each $g\in G$.
## Notes

[[Invariance is a special case of equivariance]] where $g'=\operatorname{id}_Y$.

## Related

- [[Invariance]]
