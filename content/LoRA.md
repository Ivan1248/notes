---
aliases:
  - Low-rank adaptation
---
LoRA (Low-Rank Adaptation) expresses the trainable parameters (matrices) as a sum of the original parameters and product of much smaller matrices. Only the smaller matrices are optimized in fine-tuning.

LoRA can be useful for:
- efficient storage and switching of many task-specific parameters,
- computationally efficient fine-tuning.

## Definitions

Let $f\colon \v \R^m\times\R^{n\times m} \to \R^n$ and
$$
\forall x \in \R^m, \v W \in \R^{n\times m} : f(\v x, \v W) = \v W \v x \text.
$$
LoRA modifies the trainable parameters:
$$
\v W' = \v W + \v A \v B \text,
$$
where $\v A\in \R^{n\times r}$ and $\v B\in \R^{r\times m}$ and $r<\min(n,m)$.

Then,
$$
f(\v x, \v W') = \v W \v x + \v A (\v B \v x) \text.
$$

## Computational requirements

During training, the number of [multiply–adds](https://en.wikipedia.org/wiki/Multiply%E2%80%93accumulate_operation) in the forward pass increases:
$$
\begin{align}
\v W \v x &\to \v W \v x, \v B \v x, \v A \v r \\
mn \mathrm{MA} &\to (mn + mr + rn) \mathrm{MA} + mn\mathrm{ADD} \\
\end{align}
$$
Due to not computing the gradient with respect to $\v W$ and a sufficiently small rank $r$, the number of multiply-adds in the backward pass decreases:
$$
\begin{align}
\pd{L}{\v y} \v x^\transpose &\to \pd{L}{\v y} \v r^\transpose, \pd{L}{\v y} \v A \v x^\transpose \\
mn \mathrm{MA} &\to (2nr + mr) \mathrm{MA}
\end{align}
$$
