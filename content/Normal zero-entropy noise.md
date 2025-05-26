**Normal zero-entropy noise** is a [[Random variable|random variable]] $\rvec \epsilon\colon \Omega\to\R^n$ whose [[Distribution of a random variable|distribution]] is $\N(\cvec 0,(2\pi\mathrm{e})^{-1}\cvec I_n)$.

## Used notation

- [[Multivariate normal distribution]]: $\N(\vec\mu, \vec{\mathit\Sigma})$
- [[Identity matrix]] of dimension $n$: $\cvec I_n$

## Notes

- The [[differential entropy|differential entropy]] of $\rvar\epsilon$ is $0$.
- Adding independent zero-entropy noise to a random variable $\rvec x$ makes the differential entropy of the sum non-negative: $\h[\rvec x+\rvec\epsilon] \geq 0$[^1].

## Related

- [[Perplexity of a probability function]]
- [[Perplexity of a probability density function]]

## References

[1]: Kirsch et al. (2021), Unpacking Information Bottlenecks: Unifying Information-Theoretic Objectives in Deep Learning, [arXiv](https://arxiv.org/abs/2003.12537).
