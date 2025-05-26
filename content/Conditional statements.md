$$
P(A\to B) = P(A) P(B\mid A) + 1-P(A)
$$

$$
\begin{align}
P(A\to B) &= P(\neg A \lor B) \\
&= P(\neg(A\land\neg B))) \\
&= 1 - P(A\land\neg B) \\
&= 1-P(\neg B\mid A)P(A) \\
&= 1-(1-P(B\mid A))P(A) \\
&= 1-P(A) + P(A)P(B\mid A) \\
&= P(A)P(B\mid A) + 1 - P(A)
\end{align}
$$