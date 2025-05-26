$$
\begin{align}
\frac{\partial}{\partial \v x[i]} \left( \frac{\v x}{\lVert \v x \rVert_2}[j] \right)
	&= \frac{\partial}{\partial \v x[i]} \left( \frac{\v x[j]}{\lVert \v x \rVert_2} \right)\\
	&= \frac{\enbbracket{i=j}}{\lVert \v x \rVert_2} - \frac{\v x[j]}{\lVert \v x \rVert_2^2} \frac{\partial}{\partial \v x[i]}\lVert x \rVert_2 \\
	&= \frac{\enbbracket{i=j}}{\lVert \v x \rVert_2} - \frac{\v x[j]}{\lVert \v x \rVert_2^2} \frac{\v x[i]}{\lVert \v x \rVert_2} \\
	&= \frac{\enbbracket{i=j}}{\lVert \v x \rVert_2} - \frac{\v x[i]\v x[j]}{\lVert \v x \rVert_2^3} \text.
\end{align}
$$
The penultimate step applies the [[Derivative of the L2 norm]].

Let $L=f(\v x)$.  
Let $L'=f(\v x/\lVert \v x \rVert)$.
$$
\frac{
	\frac{\partial L}{\partial \v x[i]} / 1 }{
	\frac{\partial L'}{\partial \v x[i]} / \lVert \v x\rVert }
= \frac{
	\frac{\partial L}{\partial \v x[i]} / 1 }{
	\frac{\partial L'}{\partial \v x/ \lVert \v x\rVert} \frac{\partial \v x/\lVert \v x\rVert}{\partial \v x[i]} / \lVert \v x\rVert }
= \frac{
	\frac{\partial L}{\partial \v x[i]} / 1 }{
	\frac{\partial L'}{\partial \v x/ \lVert \v x\rVert} \frac{\partial \v x/\lVert \v x\rVert}{\partial \v x[i]} / \lVert \v x\rVert }
$$
Let a.  
Let b
