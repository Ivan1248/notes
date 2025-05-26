We can define quantifier notation that is more consistent with summation and product notation:
- $\bigvee_{x\in X} P(x) \equiv \exists x\in X\colon P(x)$.
- $\bigwedge_{x\in X} P(x) \equiv \forall x\in X\colon  P(x)$.

This is similar to the summation and product notations:
- $\sum_{x\in X} f(x)$,
- $\prod_{x\in X} f(x)$.

## Examples

$$

\begin{align}
	\bigwedge_{\epsilon\in\R_{>0}} \bigvee_{\delta\in\R_{>0}} \bigwedge_{x\in \dom(f)} 
	&\left|x-c\right| < \delta \implies \left| f(x) - L\right| < \epsilon .
\end{align}
$$
Altenative:
$$
\begin{align}
	\forall_{\epsilon\in\R_{>0}} \exists_{\delta\in\R_{>0}} \forall_{x\in \dom(f)} 
	&\left|x-c\right| < \delta \implies \left| f(x) - L\right| < \epsilon .
\end{align}
$$
