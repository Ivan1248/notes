NF4 is a quantization method that quantizes sequences of real values to a $4$-bit code ($16$ values) and scale.

NF4 approximately assumes that the values are distributed according to the [[Normal distribution|normal distribution]].

NF4 is applied to (lossy) compression of machine learning model parameters. The input of NF4 comes from dividing weight matrices into blocks of size around $256$.

## Quantization algorithm

### Codepoints

NF4 defines a sequence of input-independent constants (_codes_) $(q_1, .., q_{16})$ such that each approximately represents an equal-probability slice of the [[Normal distribution|normal distribution]] $\N(0, 1)$.

$(q_1, .., q_{16})$ are constructed as follows:
1. $\delta = 1/2(1/32+1/30)$.
2. Compute $p_1, .., p_{16}$ so that $p_1=\delta$, $p_{16}=1-\delta$, and $\forall i\in\{2\bidot 15\} : p_{i+1}-p_i=p_i-p_{i-1}$.
3. Let $\mathit\Phi$ be the [[Cumulative density function|cumulative density function]] of the distribution $\N(0, 1)$. Compute $(\tilde q_1, .., \tilde q_{16})$  so that $\tilde q_i = \mathit\Phi^{-1}(p_i)$.
4. Compute $(q_1, .., q_{16})$ so that $q_i = \frac{\tilde q_i}{\max_{j=1}^B \lvert\tilde q _j \rvert}$ (_codes_).

### Quantization

The input of NF4 is a sequence of values $(w_1, .., w_B)\in \R^B$.

The output, $((c_1, .., c_B), M)\in \{1\bidot 16\}\times \R$, is computed as follows:  
5. Compute $M = \max_{i=1}^B \lvert w_i\rvert$ (_absmax_).  
6. Compute $(c_1, .., c_B)\in [-1\bidot 1]^B$ so that $c_i = \argmin_{i\in \{1\bidot 16\}} \lvert q_j-w_i/M \rvert$ (_code indices_).

### Dequantization

The values are reconstructed as $(\hat w_1, .., \hat w_B)$, where $\hat w_i = M q_{c_i}$.

## References

- [\[2305.14314\] QLoRA: Efficient Finetuning of Quantized LLMs](https://arxiv.org/abs/2305.14314)
- [\[2306.06965\] NF4 Isn't Information Theoretically Optimal (and that's Good)](https://arxiv.org/abs/2306.06965)
