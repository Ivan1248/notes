**Grad-CAM** (Gradient [[Class Activation Mapping]]) is a method for attributing class predictions of a classifier to locations in the input.

CAM assumes a classifier of the following structure which outputs $K$ categorical logits:  
$$\begin{align} \v x &\mapsto \mathit{head}((\bigcirc_{i=1}^n h_i)(\vec x)) \colon \\ \R^{C_\text{in}\times H\times W} &\to \R^K \text,\end{align}$$where $\bigcirc_{i=1}^n h_i$ is a composition of $h_i\colon \R^{C_{i-1}\times H_{i-1}\times W_{i-1}}\to \R^{C_{i}\times H_i\times W_i}$, where $C_0=C_\text{in}$.

Grad-CAM for class $k$ based on an intermediate representation $\v z = (\bigcirc_{i=1}^{n'} h_i)(\vec x)$, where $n'\leq n$, is computed as follows:
$$
\begin{align}
	\v G_k &= \ReLU\left(\sum_c \alpha_c^k \v z[c,:,:]\right) \text{, where} \\
	\v \alpha_c^k &= \E_{u, v} \frac{\partial h(\v x)[k]}{\partial \v z[c, u, v]} \text.
\end{align}
$$

## Related

- [[Class Activation Mapping]]
- [[Data attribution methods]]
