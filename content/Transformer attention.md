The most common type of [[Attention operation|attention]] is multi-head dot-product attention, more commonly called _multi-head self-attention_. It was introduced in [Attention is All you Need](http://papers.nips.cc/paper/7181-attention-is-all-you-need.pdf). Here, we refer to such attention operations as _dot-product attention_ because the attention weights are computed based on dot products between embeddings of all input elements.

Multi-head dot-product attention functions are a subset of $\R^{T× C}\to\R^{T× C'}$, where $T,C,C'\in\N$. We refer to the rows of the input and the output as their elements or tokens.

Each output element depends on all input elements, but not on their positions. That is, the operation is permutation equivariant. To introduce relative or absolute positional dependence, [positional encoding](http://papers.nips.cc/paper/7181-attention-is-all-you-need.pdf) can be applied.  

## Notation

- [[Array indexing notation]]

## Scaled dot-product attention

**(Standard scaled) dot-product attention** is a [[Function|function]] $\operatorname{attn}\colon \R^{T× D_\text{K}}\times\R^{T× D_\text{K}}\times\R^{T× D_\text{V}} \to \R^{T× D_\text{V}}$ that is computed as follows:
$$
\begin{align}
	\operatorname{attn}(\v Q, \v K, \v V) &= \v Y \text{, } \\
\end{align}
$$
where
$$
\begin{align}
	\v L[t, u] &= \sum_d \v Q[t, d] \v K[u, d] , \\
	\v A[t, :] &= \softmax(\v L[t, :]/\sqrt{D_\text{K}}) , \\
	\v Y[t, :] &= \sum_u \v A[t, u] \v V[u, :] . \\
\end{align}
$$
Note that $\v Q, \v K \in \R^{T× D_\text{K}}$, $\v V\in \R^{T× D_\text{V}}$, $\v L, \v A \in \R^{T× T}$, and $\v Y\in\R^{T× D_\text{V}}$.

### Notes

Each output vector, $\operatorname{attn}(\v Q, \v K, \v V)[t,:]$, is a [convex combination](https://proofwiki.org/wiki/Definition:Convex_Combination) of "values" $\v V[u,:]$, where the weights are proportional to exponentiated scaled dot-products of the corresponding "query" $\v Q[t,:]$, with "keys" $\v K[u,:]$.  

Paraphrased from [Attention is All you Need](http://papers.nips.cc/paper/7181-attention-is-all-you-need.pdf):
> To illustrate why the dot products get large, assume that the components of $\rvec q$ and $\rvec k$ are independent random variables with mean $0$ and variance $1$. Then their dot product, $\rvec q^\transpose \rvec k$, has mean $0$ and variance $D_\text{k}=\dim(\v q)$.

## Dot-product self-attention head

**(Dot-product) self-attention head**, $\operatorname{sa\_head}$, is an operation with input $\v X \in \R^{T× C}$ and parameters $\v W_\text{Q}, \v W_\text{K} \in \R^{C× D_\text{K}}$, and $\v W_\text{V} \in \R^{C× D_V}$. It produces an output in $\R^{T× D_\text{V}}$ as follows:
$$  
\operatorname{sa\_head}(\v X, \v W_\text{Q}, \v W_\text{K}, \v W_\text{V}) = \operatorname{attn}(\v Q, \v K, \v V) \text,  
$$where $\v Q, \v K\in \R^{T× D_\text{K}}$, $\v V \in \R^{T× D_\text{V}}$ and
$$
\begin{align}  
	\v Q[t,d] &= \sum_c \v X[t, c] \v W_\text{Q}[c, d] , \\  
	\v K[t,d] &= \sum_c \v X[t, c] \v W_\text{K}[c, d] , \\  
	\v V[t,e] &= \sum_c \v X[t, c] \v W_\text{V}[c, e] .  
\end{align}
$$

### Notes

- The output of the self-attention head can also be expressed as $\v Y[t, e] = \sum_{c,u} \v A[t,u]\v X[u, c] \v W_\text{V}[c,e].$
- The internal embedding dimension $D_\text{K}$ is usually much smaller than the input dimension $C$.
- The self-attention head is equivariant to permutations of elements of the input.

## Dot product cross-attention

The **cross-attention head**, $\operatorname{ca\_head}$, is an operation with inputs $\v X \in \R^{T× C}$, $\v Z \in \R^{T'× C}$ and parameters $\v W_\text{Q}, \v W_\text{K} \in \R^{C× D_\text{K}}$, and $\v W_\text{V} \in \R^{C× D_V}$. It produces an output $\v Y \in \R^{T× D_\text{V}}$ in the manner of the self-attention head, but the only difference is that $\v Z$ substitutes $\v X$ in the computation of $\v Q$.  
$$
\operatorname{ca\_head}(\v X, \v Z, \v W_\text{Q}, \v W_\text{K}, \v W_\text{V}) = \operatorname{attn}(\v Q, \v K, \v V) \text,
$$where $\v Q\in \R^{T'× D_\text{K}}$, $\v K\in \R^{T× D_\text{K}}$, $\v V \in \R^{T× D_\text{V}}$ and
$$
\begin{align}  
	\v Q[t',d] &= \sum_c \v Z[t', c] \v W_\text{Q}[c, d] , \\  
	\v K[t,d] &= \sum_c \v X[t, c] \v W_\text{K}[c, d] , \\  
	\v V[t,e] &= \sum_c \v X[t, c] \v W_\text{V}[c, e] .  
\end{align}
$$

### Notes

- $T'$ can be different from $T$.
- $\v A$ is computed from $\v X$ and $\v Z$.
- $\operatorname{sa\_head}(\v X, \v W_\text{Q}, \v W_\text{K}, \v W_\text{V}) = \operatorname{ca\_head}(\v X, \v X, \v W_\text{Q}, \v W_\text{K}, \v W_\text{V})$.

## Multi-head (dot product) self-attention

**Multi-head (dot product) self-attention** consists of $H$ heads in parallel with parameters ${\v W_\text{K}}_i, {\v W_\text{Q}}_i \in \R^{C× D_\text{K}}$, ${\v W_\text{V}}_i \in \R^{C× D_\text{V}}$, $i=1 \bidot H$, and a matrix multiplication with parameters $\v W_\text{O}\in \R^{{HD_\text{V}}× C'}$, which produces an output $\v Y\in \R^{T× C'}$ as follows:
$$
\begin{align}  
&\operatorname{mhsa}(\v X, (({\v W_\text{K}}_i, {\v W_\text{Q}}_i, {\v W_\text{V}}_i): i=1\bidot H), \v W_\text{O})  
\\  
&= \v W_\text{O} \operatorname{concat}_2((\operatorname{sa\_head}(\v X, {\v W_\text{K}}_i, {\v W_\text{Q}}_i, {\v W_\text{V}}_i): i=1\bidot H)) .  
\end{align}
$$
It can also be expressed as:
$$
\begin{align}  
\sum_{i=1}^H {\v W_\text{O}}_i \operatorname{sa\_head}(\v X, {\v W_\text{K}}_i, {\v W_\text{Q}}_i, {\v W_\text{V}}_i) ,

\end{align}
$$
where ${\v W_\text{O}}_i = {\v W_\text{O}}[1+Hi\bidot H(i+1),:] \in \R^{D_\text{V}× C'}$.

### Notes

- A standard implementation has $D_\text{V}=D_\text{K}=C/H$.
- The output can also be expressed as $\v Y[t, f] = \sum_{i,c,u} \v A_i[t,u]\v X[u, c] {\v W_\text{V}}_i[c,e]{\v W_\text{O}}_i[e,f].$ This expression suggests that ${\v W_\text{V}}_i$ ${\v W_\text{O}}_i$ can be merged into a matrix ${\v W_\text{VO}}_i = {\v W_\text{V}}_i {\v W_\text{O}}_i \in \R^{C× C'}$. However, this would entail more parameters and a greater computational expense in the usual case when $D_\text{V}=D_\text{K}=C/H$.
- Dot product self-attention (like attention heads) is equivariant to permutations of elements of the input.

## References
