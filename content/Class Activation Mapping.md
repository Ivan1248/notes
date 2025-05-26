**Class Activated Mapping** (CAM) is a method for attributing class predictions of an image classifier with global average pooling to locations in the input.

CAM assumes a classifier of the following structure:  
$$\begin{align} \v x &\mapsto \softmax(\v W\cdot \operatorname{GAP}(f(\vec x))) \colon \\ \R^{C_\text{in}\times H\times W} &\to \operatorname{Cat}_K \text,\end{align}$$where:
- $f\colon \R^{C_\text{in}\times H\times W}\to \R^{K\times H'\times W'}$ maps an image to a feature tensor,
- $\operatorname{GAP}$ is global average pooling, which is for image representations defined as: $$\operatorname{GAP}(\vec z)[c] = \E_{i, j} \v z[i,j,c] \text,$$
- $\v W\in \R^{K\times C}$,
- $\operatorname{Cat}_K$ is the set of categorical distributions with $K$ categories.

CAM for class $k$ is computed as:
$$
\v M_k = \sum_k \v W[k, c] f(\v x)[c] \text.
$$

## Related

- [[Data attribution methods]]
- [[Grad-CAM]]
