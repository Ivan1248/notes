---
tags:
  - todo/finish
creation date: 2025-06-20
---

[LoRA-XS: Low-Rank Adaptation with Extremely Small Number of Parameters](https://arxiv.org/abs/2405.17604)

LoRA-XS takes the top $r$ singular components of the original matrix and optimizes an $r\times r$ matrix.  Let the SVD of the original matrix be $\v W = \v U \v\Sigma\v V$.  
Matrix multiplication $\v x \to \v W\v x$ is replaced with
$$
\v x \to \v W x + \v U[:, {:}r] \v R \v V[{:}r, :]
$$
Only $\v R$ is optimized.
