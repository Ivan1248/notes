$$
\begin{align}
p(x) &= \int_v p(x, v) \dif v \\ 
& = \int_v p(v) p(x|v) \dif v \\

& = \int_v p(v) \delta(v-f(x)) \dif v \\

& = \int_v p(v) \lvert \det(\dif x/\dif v)\rvert \delta(x-f^{-1}(v)) \dif v \\ 

& = p(v) \lvert \det(\dif x/\dif v)\rvert \\

\end{align}
$$

$$
p(v) = \int_x p(x, v) \dif x = \int_x p(x) p(v|x) \dif x = \int_x p(x) \delta(v-f(x)) \dif x = \int_x p(x) \delta(x-f^{-1}(x)) \dif x
$$

$$
p(x) = \lvert \det(\dif v/\dif x)\rvert p(v)
$$
