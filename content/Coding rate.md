Let $I=\{1\bidot m\}$.  
Let the **set of data vectors** be a [[Finite set|finite set]] $\rvar W=\{\rvec w_i : i\in I\}$ of $\R^n$-valued [[Independent and identically distributed random variables|IID random]] [[Vector|vectors]].  
Let the [[Covariance matrix|covariance matrix]] of $\rvec w_i$ be $\mathbfit\Sigma$.

Let the **encoding** be a [[Function|function]] $e\colon\R^n\to \R^n$ that maps [[Real vector|real vectors]] to a finite set of [[Real vector|real vectors]].  
Let $\forall i\in I : \rvec{\hat w}_i = e(\rvec w_i)$.  

Let $\epsilon^2$ be the **allowable square error of encoding**: $\E[\lVert \rvec w_i-\hat {\rvec w}_i\rVert^2]\leq \epsilon^2$.  
We may model the error as an independent additive Gaussian noise: $$\hat{\rvec w}_{i} =\rvec w_i+\rvec z_i \text{, with\ } \rvec z_i\sim N\left(0,\frac{\varepsilon^{2}}{n}\cvec I_n\right) \text.$$
The covariance matrix of the noised vectors $\rvec{\hat w}_i$ is $\mathbfit\Sigma + \frac{\epsilon^2}{n}\cvec I_n$.

The number of volumes ([[Perplexity of a probability density function|perplexities]]) of $\p[\rvec z_i]$ that fit into the volume of $\p[\rvec w_i]$ is $$  
\begin{align}  
n_{\epsilon}(\mathbfit\Sigma) = \frac{  
\sqrt{\det\left(\mathbfit\Sigma + \frac{\epsilon^2}{n}\cvec I_n\right)}}{\sqrt{\det\left(\frac{\epsilon^2}{n}\cvec I_n\right)}}  
= \sqrt{\det\left( \mathbfit\Sigma\left(\frac{n}{\epsilon^2}\cvec I_n\right) + \cvec I_n \right)}  
= \sqrt{\det\left( \cvec I_n + \frac{n}{\epsilon^2} \mathbfit\Sigma \right)} \text.  
\end{align}
$$
The **coding rate** is approximately the number of bits needed for encoding $n_{\epsilon}(\mathbfit\Sigma)$ noised vectors with noise distributed according to $\N(\cvec 0, \frac{\epsilon^2}{n} \cvec I_n)$: $$
R_\epsilon(\mathbfit\Sigma) = \log_2(n_\epsilon(\mathbfit\Sigma)) = \frac{1}{2}\log_2\left( \det\left(\cvec I_n + \frac{n}{\epsilon^2} \mathbfit\Sigma \right)\right) \text.
$$

## Related

- [[Normal zero-entropy noise]]
- [[Perplexity of a probability density function]]
- [[Rate-distortion function]]

## References

- Ma et al. (2007), [Segmentation of Multivariate Mixed Data via Lossy Data Coding and Compression](https://people.eecs.berkeley.edu/~yima/psfile/Ma-PAMI07.pdf#page=4.8).
