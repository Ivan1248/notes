Let $X\subset \R^n$ (the training set).  
Let $p\colon \R^n\to\R$ (the teacher) be a [[Probability density function|probability density function]].  
Let $Q\subset \R^n\to\R$ be a set of [[Probability density function|probability density functions]].

## Data log-likelihood maximization without the teacher

$$
\argmin_{q\in Q} \E_{x\in X} -\ln\del{q(x)}
$$

## Relative entropy minimization

[[Relative entropy]] minimization with respect to $q$ is equivalent to [[Cross-entropy|cross-entropy]] minimization / synthetic [[log-likelihood]] maximization.
$$
\begin{align}
\argmin_{q\in Q} \RE{p}{q} &= \argmin_{q\in Q} \E_{x\sim p} \ln\del{\frac{p(x)}{q(x)}} \\
&= \argmin_{q\in Q} \E_{x\sim p} \ln\del{p(x)} + \E_{x\sim p} -\ln\del{q(x)} \\
&= \argmin_{q\in Q} \E_{x\sim p} -\ln\del{q(x)} \\
&= \argmin_{q\in Q} \CE{p}{q}
\end{align}
$$

## Sampling from data instead of from $p$

This is equivalent to [[#Data log-likelihood maximization without the teacher]].
$$
\begin{align}
\argmin_{q\in Q} \E_{x\sim X} \ln\del{\frac{p(x)}{q(x)}} 
&= \argmin_{q\in Q} \E_{x\sim X} \ln\del{p(x)} + \E_{x\sim p} -\ln\del{q(x)} \\
&= \argmin_{q\in Q} \E_{x\sim X} -\ln\del{q(x)}
\end{align}
$$
