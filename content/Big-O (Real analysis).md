## Real analysis

Let $F$ be a set of [[Real function|real functions]] defined on $S$.  
Let $g\in F$.
$$
O_{S}(g) = \left\{
	h \in F: 
	\exists c\in \R_{\geq 0}\colon \forall  s\in S\colon |h(x)|\leq c|g(x)|
\right\} .
$$

## Real analysis - at infinity

Let $F$ be a set of [[Real function|real functions]] defined on $\R_{\geq a}$ for some $a\in \R$.  
Let $g\in F$.
$$
O_{\infty}(g) = \left\{
	h \in F: 
		\exists c\in \R_{\geq 0}\colon \exists x_0\in \R\colon \forall x\in\R_{> x_0}\colon
			|h(x)|\leq c|g(x)|
\right\} .
$$
That is, $f\in O_{\infty}(g)$ iff
$$
\exists c\in \R_{\geq 0}\colon \exists x_0\in \R\colon \forall x\in\R_{> x_0}\colon|f(x)|\leq c|g(x)| .
$$

## Real analysis - infinitesimal

Let $F$ be a set of [[Real function|real functions]] defined on $(0\bidot a)$ for some $a\in R$.  
Let $g\in F$.
$$
O_{0}(g) = \left\{
	h \in F: 
		\exists c,\epsilon\in \R_{\geq 0}\colon \forall x\in(0\bidot\epsilon)
			\implies|h(x)|\leq c|g(x)|
\right\} .
$$

## Notation

A very common notation for $f\in O(g)$ is the special notation $f(x) = O(g(x))$.

We interpret $O(g)$ as a set and use the notation $f\in O(g)$ or  $x\mapsto f \in O(x\mapsto g(x))$ because it is more clear.

## Examples

- Let $S=[-1/2\bidot 1/2]$. The statement $$\begin{align} 
&\exists h \in O_S(x\mapsto x^2)\colon \forall x\in S\colon \\
&\quad\ln(1+x) = x + h(x)  
\end{align}$$ is equivalent to $$  
x \mapsto (\ln(1+x) - x) \in O_S(x\mapsto x^2)
$$The common notation is more concise: $$
\ln(1+x) = x + O(x^2) \quad(x\in S).
$$

## Related

- [Asymptotic notations](https://web.archive.org/web/20230329005450/https://faculty.math.illinois.edu/~hildebr/595ama/ama-ch2.pdf) by A. J. Hildebrand
