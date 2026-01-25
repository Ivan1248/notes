The **perplexity of a sequence distribution** $\P[\rvar x_1, .., \rvar x_n]$ **with respect to** a [[Sequence|sequence]] $(x_1, .., x_n)$ is
$$
\operatorname{PPS}(P, (x_1, .., x_n)) = \exp(-n^{-1}\ln(\P(x_1, .., x_n))) = \P(x_1, .., x_n)^{-1/n}  \text.
$$

## Notation

- [[Probability function of a random variable#Notation|Probability function of a random variable#Notation]]

## Notes

Perplexity of a sequence model can also be expressed as $\exp$ of the average negative conditional probability of sequence elements:
$$
\operatorname{PPS}(P, (x_1, .., x_n)) = \exp\left(\frac{1}{n}\left(-\ln(\P(x_1))-\sum_{i=2}^n\ln(\P(x_i\mid x_1, .., x_{i-1}))\right)\right) \text.
$$

## Related

- [[Perplexity of a probability|Perplexity of a probability]]
- [[Perplexity of a probability function|Perplexity of a probability function]]
