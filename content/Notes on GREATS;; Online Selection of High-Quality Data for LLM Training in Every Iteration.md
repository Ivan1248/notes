[GREATS: Online Selection of High-Quality Data for LLM Training in Every Iteration](https://neurips.cc/virtual/2024/poster/96834).

## Ghost inner-product of gradients with respect to parameters

Let $\v s_i  = \v W \v x_i$.  
Let $l_i = f_2(\v s_i)$.

We can express
$$
\v s_i[k] = \sum_j W[k, j] \v x[j]
$$
Then
$$
\begin{align}
\pd{l_i}{\v W[r,:]^\transpose} 
&= \sum_k \pd{l_i}{\v s_i[k]}\pd{\v s_i[k]}{\v W[r,:]^\transpose} \\
&= \sum_k \pd{l_i}{\v s_i[k]}\pd{\v s_i[k]}{\v W[r,:]^\transpose} \\
&= \sum_k\pd{l_i}{\v s_i[k]} \enbbracket{k=r}\v x_i^\transpose \\
&= \pd{l_i}{\v s_i[r]} \v x_i^\transpose
\end{align}
$$
Finally, we show
$$
\begin{align}
\braket{\pd{l_i}{\v W}}{\pd{l_j}{\v W}} 
&= \sum_r \braket{\pd{l_i}{\v W[r,:]^\transpose}}{\pd{l_j}{\v W[r,:]^\transpose}} \\
&= \sum_r \braket{\pd{l_i}{\v s_i[r]} \v x_i^\transpose}{\pd{l_j}{\v s_j[r]} \v x_j^\transpose} \\
&= \sum_r \pd{l_i}{\v s_i[r]} \pd{l_j}{\v s_j[r]} \braket{ \v x_i}{ \v x_j} \\
&= \braket{\pd{l_i}{\v s_i}}{\pd{l_j}{\v s_j}} \braket{ \v x_i}{ \v x_j} \\
\end{align}
$$

## Used notation

- [[Iverson bracket]]
- [[Bra-ket]]
