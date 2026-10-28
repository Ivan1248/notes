---
tags:
creation date: 2023-03-10
edit date: 2026-10-20
---

## Introduction

Sampling algorithms are commonly used for sampling from distributions that can be evaluated easily but are hard to sample from. Markov chain Monte Carlo (MCMC) methods can also be used when only a function that is proportional to the probability density function of the distribution can be evaluated (the normalization constant is unknown) [@RobertsRosenthal:2004:GSSMCMC, sec. 1–2; @Murphy:2023:PMLAT, sec. 12.1]. Some of them, such as Hamiltonian Monte Carlo (HMC) [@Duane:1987:HMC], are more appropriate for sampling from high-dimensional distributions.

MCMC methods are commonly used for approximating multi-dimensional integrals that can be expressed as the [[Expectation|expectation]] of a [[Random variable|random variable]]. Their application is important in [[Bayesian inference|Bayesian statistics]] for approximation of the posterior $\p(\theta\mid x) = \frac{\p(x\mid \theta)\p(\theta)}{\p(x)}$ while sidestepping the computation of the marginal probability density $\p(x) = \E[\p(x\mid\rvar\theta)]$.

This text will briefly introduce some important fundamentals and describe basic Markov chain Monte Carlo and Hamiltonian Monte Carlo sampling algorithms.

## Notation

Random variables are [[Underlining random variables|underlined]]. Depending on whether a random variable is discrete or continuous, $\p$ denotes probability or probability density. The probability (density) function of a random variable $\rvar x$ is denoted with $\p[\rvar x]$. The distribution of $\rvar x$ is the function $A\mapsto\P(\rvar x\in A)$ that assigns probabilities to sets. We will denote the probability (density) of a random variable $\rvar x$ taking a value $x$ as
$$
\p(\rvar x=x) \equiv \p[\rvar x](x) \equiv \p(x) .
$$
The notation $\p(x)$ is a shorthand that we will use when the random variable and the value have the same symbol up to underlining.  
The conditional probability (density) function of $\rvar x$ given $\rvar y=y$ is denoted with $\p[\rvar x\mid\rvar y=y]$ or $\p[\rvar x\mid y]$, and $\p(x\mid y)$ is a shorthand for $\p(\rvar x=x\mid \rvar y=y)$.

All random variables are defined on a [[Probability space|probability space]] $(\Omega,\Sigma,P)$. For a random variable $\rvar x$ and a set $A$, $\P(\rvar x\in A)$ denotes $P(\{\omega\in\Omega : \rvar x(\omega)\in A\})$.

For a probability function or probability density function $\itpi$, $\mathit\Pi$ denotes the corresponding distribution, which assigns probabilities to sets: $\mathit\Pi(A)=\int_A\itpi(x)\dif x$, or $\mathit\Pi(A)=\sum_{x\in A}\itpi(x)$ in the discrete case.

The notation $\rvar x\sim p$ means that $\rvar x$ has the probability (density) function or distribution $p$. In algorithms, $x\sim p$ means that a value $x$ is drawn from $p$.

## Stochastic processes and Markov chains

This section contains some definitions and theorems that are necessary for the following sections. For finite state spaces, more can be found in @LevinPeres:2017:MCMT [chap. 1] and @Murphy:2023:PMLAT [sec. 2.6]. For general (e.g. continuous) state spaces, see @RobertsRosenthal:2004:GSSMCMC [sec. 3.2].

### Stochastic processes

> [!definition] Definition
> A **stochastic chain** is a sequence of random variables.

We will refer to the values of those random variables as **states**, and the set $X$ of all states is the **state space**. Formally, it is a [[Measurable space|measurable space]] $(X,\Sigma_X)$, where $\Sigma_X$ is the set of subsets of $X$ that have probabilities (e.g. the [[Borel σ-algebra]] if $X=\R^d$).

> [!definition] Definition
> A stochastic chain $(\rvar x_1, \rvar x_2, \dots)$ is **stationary** iff for every $k\in\N_{\geq1}$ the distribution of $(\rvar x_{n+1}, \dots, \rvar x_{n+k})$ does not depend on $n\in\N$.

^def-sp-stationarity

> [!definition] Definition
> If the limit exists for every set of states $A$, the **equilibrium distribution** of a stochastic chain $(\rvar x_1, \rvar x_2, \dots)$ is the distribution $A\mapsto\lim_{n\to\infty} \P(\rvar x_n\in A)$.

^def-sp-equilibrium

> [!theorem] Theorem (Equilibrium distribution of a stationary stochastic chain)
> If $(\rvar x_1, \rvar x_2, \dots)$ is a stationary stochastic chain, all $\rvar x_n$ have the same distribution, which is also the equilibrium distribution of the chain.

> [!proof]
> This follows from the [[#^def-sp-equilibrium|definition of the equilibrium distribution]] and the [[#^def-sp-stationarity|definition of stationarity]] ($k=1$).

### Markov chains

> [!definition] Definition
> A **Markov chain** is a sequence of random variables $(\rvar x_1, \rvar x_2, \dots)$ where the **Markov property** holds: $\forall n\in\N_{\geq1}: \forall (x_1, \dots, x_n)\in X^n: \p[\rvar x_{n+1}\mid x_1, \dots, x_n] = \p[\rvar x_{n+1}\mid x_n]$.

The values that $\rvar x_i$ take are called states. A state of a Markov chain can depend only on its preceding state.

> [!theorem] Theorem (Joint distribution of a Markov chain)
> The joint distribution of a Markov chain is uniquely determined by $\p[\rvar x_1]$ and the **transition probability (density) functions** $\p[\rvar x_{n+1}\mid x_n]$.

> [!proof]
> $$
> \begin{align*}
> \p(x_1, x_2, \dots, x_n)
> &= \p(x_1)\prod_{i=1}^{n-1}\p(x_{i+1}\mid x_1, \dots, x_i) \\
> &= \p(x_1)\prod_{i=1}^{n-1} \p(x_{i+1}\mid x_i) \annot{Markov property}
> \end{align*}
> $$

> [!definition] Definition
> A Markov chain is **homogeneous** iff $\forall n,k\in\N_{\geq1}: \forall x\in X: \p[\rvar x_{n+1}\mid \rvar x_n=x] = \p[\rvar x_{k+1}\mid \rvar x_k=x]$.

In a homogeneous Markov chain, the probabilities of the next state do not depend on the index of the current state. Hence, a homogeneous Markov chain can be defined via $\p[\rvar x_1]$ and $\p[\rvar x_2\mid\rvar x_1]$.

> [!theorem] Theorem (Stationarity of a Markov chain)
> A Markov chain is stationary if it is homogeneous and $\p[\rvar x_2]=\p[\rvar x_1]$.

> [!proof]
> Let $Q(x)=\p[\rvar x_{k+1}\mid\rvar x_k=x]$, which does not depend on $k$ because the Markov chain is homogeneous.  
> By the identity $\p[\rvar x_{k+1}] = \E[\p[\rvar x_{k+1}\mid\rvar x_k]]$,
> $$
> \forall k\in\N_{\geq1}: \p[\rvar x_{k+1}] = \E[Q(\rvar x_k)] .
> $$
> The expectation $\E[Q(\rvar x_k)]$ depends only on $\p[\rvar x_k]$. Hence, if $\p[\rvar x_k]=\p[\rvar x_{k-1}]$, then $\p[\rvar x_{k+1}]=\E[Q(\rvar x_k)]=\E[Q(\rvar x_{k-1})]=\p[\rvar x_k]$. Starting from the assumption $\p[\rvar x_2]=\p[\rvar x_1]$, by induction
> $$
> \forall n,k\in\N_{\geq1}: \p[\rvar x_n]=\p[\rvar x_k] . \tag{1}
> $$
>
> ^eq-markov-marginal-equality
>
> Finally,
> $$
> \begin{align*}
> \p(x_1, x_2, \dots, x_n)
> &= \p(x_1)\p(x_2\mid x_1)\p(x_3\mid x_2)\cdots \p(x_n\mid x_{n-1}) \annot{Markov property} \\
> &= \p(\rvar x_{k+1}=x_1)\p(\rvar x_{k+2}=x_2\mid \rvar x_{k+1}=x_1) \\
> &\mathrel{\phantom{=}}\cdots \p(\rvar x_{k+n}=x_n\mid \rvar x_{k+n-1}=x_{n-1}) \annot{homogeneity and eq. (1)} \\
> &= \p(\rvar x_{k+1}=x_1, \rvar x_{k+2}=x_2, \dots, \rvar x_{k+n}=x_n) \annot{Markov property} .
> \end{align*}
> $$

> [!definition] Definition
> A distribution $\mathit\Pi$ on $X$ with probability (density) function $\itpi$ is a **stationary distribution** of a homogeneous Markov chain iff
> $$
> \forall B\in\Sigma_X: \int_X \itpi(a)\,\P(\rvar x_2\in B\mid\rvar x_1=a)\dif a = \mathit\Pi(B) .
> $$

^def-mc-stationary-distribution

That is, if $\rvar x_1\sim\itpi$, then $\rvar x_2\sim\itpi$. For a discrete state space, the condition is $\forall b\in X: \sum_{a\in X}\itpi(a)\P(\rvar x_2=b\mid\rvar x_1=a)=\itpi(b)$.

By the previous theorem, a homogeneous Markov chain with $\p[\rvar x_1]=\itpi$ is stationary, so $\mathit\Pi$ is also its equilibrium distribution. However, a Markov chain can have several stationary distributions, and if the distribution of $\rvar x_1$ is not stationary, the distribution of $\rvar x_n$ need not converge. The [[#^thm-mc-convergence|convergence theorem]] below gives conditions under which it converges to $\mathit\Pi$.

> [!definition] Definition
> A homogeneous Markov chain with stationary distribution $\mathit\Pi$ is **irreducible** iff
> $$
> \forall a\in X: \forall B\in\Sigma_X: \mathit\Pi(B)>0 \implies \exists k\in\N_{\geq1}: \P(\rvar x_{k+1}\in B\mid \rvar x_1=a)>0 .
> $$

That is, from any state, the Markov chain can reach any set of states that has positive probability under $\mathit\Pi$. For a countable state space with $\itpi(b)>0$ for all states $b$, $B=\{b\}$ gives the simpler condition $\forall a,b\in X: \exists k\in\N_{\geq1}: \P(\rvar x_{k+1}=b\mid\rvar x_1=a)>0$.

Note that there exist homogeneous or stationary Markov chains that are not irreducible.  
One such Markov chain has $\p[\rvar x_1]=\mathcal U([0, 1])$, while all the other random variables repeat the preceding state: $\forall n\in\N_{\geq1}: \P(\rvar x_{n+1}=\rvar x_n)=1$.

> [!definition] Definition
> A homogeneous Markov chain with stationary distribution $\mathit\Pi$ is **aperiodic** iff for every set of states $A$ with $\mathit\Pi(A)>0$, there is a set of states $X_0$ with $\mathit\Pi(X_0)=0$ such that
> $$
> \forall x\in A\setminus X_0: \exists m\in\N_{\geq1}: \forall k\in\N_{\geq m}: \P(\rvar x_{k+1}\in A\mid\rvar x_1=x)>0 .
> $$

That is, a chain started in $A$ can eventually be back in $A$ at every step, not only at multiples of a period. For a countable state space $X$, $A=\{x\}$ gives the simpler condition $\exists m\in\N_{\geq1}: \forall k\in\N_{\geq m}: \P(\rvar x_{k+1}=x\mid\rvar x_1=x)>0$ for every state $x$ with $\itpi(x)>0$.

> [!definition] Definition
> A homogeneous Markov chain is **reversible** iff there exists a distribution $\mathit\Pi$ on $X$ with probability (density) function $\itpi$ such that
> $$
> \forall A,B\in\Sigma_X: \int_A \itpi(a)\,\P(\rvar x_2\in B\mid\rvar x_1=a)\dif a = \int_B \itpi(b)\,\P(\rvar x_2\in A\mid\rvar x_1=b)\dif b . \tag{2}
> $$
>
> ^eq-mc-detailed-balance

^def-mc-reversibility

That is, a Markov chain started from $\mathit\Pi$ moves from $A$ to $B$ as often as from $B$ to $A$. For a countable state space, the following condition is equivalent:
$$
\forall a,b\in X: \itpi(a)\P(\rvar x_2=b\mid\rvar x_1=a) = \itpi(b)\P(\rvar x_2=a\mid\rvar x_1=b) .
$$

The condition [[#^eq-mc-detailed-balance|(2)]] is referred to as the **detailed balance** condition [@LevinPeres:2017:MCMT, sec. 1.6; @RobertsRosenthal:2004:GSSMCMC, sec. 2].

Note that reversibility of a Markov chain implies that it has a stationary distribution ($\mathit\Pi$ in the [[#^def-mc-reversibility|definition of reversibility]]) [@RobertsRosenthal:2004:GSSMCMC, Proposition 1].

> [!theorem] Theorem (Convergence of a Markov chain)
> Let $(\rvar x_1, \rvar x_2, \dots)$ be a homogeneous Markov chain with stationary distribution $\mathit\Pi$ that is irreducible and aperiodic, where either $X$ is countable, or $X\subseteq\R^d$ and $\Sigma_X$ is the Borel σ-algebra of $X$. Then there is a set of states $X_0$ with $\mathit\Pi(X_0)=0$ such that
> $$
> \forall x\in X\setminus X_0: \forall A\in\Sigma_X: \lim_{n\to\infty} \P(\rvar x_n\in A\mid\rvar x_1=x) = \mathit\Pi(A) .
> $$
> Also, for every $f\colon X\to\R$ with $\E_{\rvar y\sim\itpi}\lvert f(\rvar y)\rvert<\infty$,
> $$
> \forall x\in X\setminus X_0: \P\left(\lim_{n\to\infty}\frac{1}{n}\sum_{i=1}^{n} f(\rvar x_i) = \E_{\rvar y\sim\itpi} f(\rvar y) \middlemid \rvar x_1=x\right) = 1 .
> $$

^thm-mc-convergence

The first part is @RobertsRosenthal:2004:GSSMCMC [Theorem 4] and the second part, a law of large numbers for Markov chains, is @RobertsRosenthal:2004:GSSMCMC [Fact 5]. They state the theorem more generally, for state spaces whose $\Sigma_X$ can be generated from countably many sets.

## Monte Carlo integration

Monte Carlo integration (approximation) is a method of approximating integrals that can be expressed as the expectation of some random variable.

Let $I := \int_X u(x)\dif x$ be an integral that is hard to compute. If we express $u$ as the product of a function $f$ and a probability density function $\itpi$, $u(x) = f(x)\itpi(x)$, the integral $I$ can be expressed as the expectation of $f(\rvar x)$, where $\rvar x\sim \itpi$:
$$
I = \int f(x)\itpi(x)\dif x = \E_{\rvar x\sim\itpi}f(\rvar x) .
$$
The expectation can be approximated with the [[Monte Carlo estimator|Monte Carlo estimator]]
$$
\hat{\rvar I}_n = \frac{1}{n}\sum_{i=1}^{n} f(\rvar x_i) , \text{ where } \rvar x_i\sim\itpi .
$$
The estimator is unbiased, $\E[\hat{\rvar I}_n]=I$, even if the $\rvar x_i$ are dependent. If the $\rvar x_i$ are independent and $\E_{\rvar x\sim\itpi}\lvert f(\rvar x)\rvert<\infty$, then $\P(\lim_{n\to\infty}\hat{\rvar I}_n = I) = 1$ by the law of large numbers. The variance of $\hat{\rvar I}_n$ is the variance of $f(\rvar x)$ divided by $n$.

## Sampling methods

This section first describes some basic sampling methods and then Markov chain Monte Carlo (MCMC) methods.

This section is based on @Keng:2015:MCMCMRSMHA and @Geyer:2011:IMCMC. For more details, see @Owen:2013:MCTME [chap. 4, 9, 11] and @Murphy:2023:PMLAT [chap. 11–12].

### Importance sampling

Let $\itpi$ be a probability (density) function.  
Suppose we want to estimate some expectation $I=\E_{\rvar x\sim\itpi} f(\rvar x)$ with an estimator
$$
\hat{\rvar I} = \frac{1}{n}\sum_{i=1}^{n} f(\rvar x_i) \text{, where }\rvar x_i\sim \itpi .
$$
If we cannot sample from $\itpi$ or want to reduce the variance of the estimator $\hat{\rvar I}$, we can sample from some other probability (density) function $q$ instead:
$$
\E_{\rvar x\sim\itpi} f(\rvar x) = \int_x f(x)\itpi(x)\dif x
= \int_x f(x)\frac{\itpi(x)}{q(x)}q(x)\dif x
= \E_{\rvar x\sim q} f(\rvar x)\frac{\itpi(\rvar x)}{q(\rvar x)} .
$$
Note that $q$ must be non-zero wherever $\itpi$ is non-zero.  
An importance sampling estimator that samples from $q$ would be
$$
\hat{\rvar I}' = \frac{1}{n}\sum_{i=1}^{n} f(\rvar x_i)\frac{\itpi(\rvar x_i)}{q(\rvar x_i)} \text{, where }\rvar x_i\sim q .
$$
The [[Support of a distribution|support]] of $q$ must be equal to or be a superset of the support of $\itpi$. A good sampling distribution has more probability around the expectation. See @Owen:2013:MCTME [chap. 9] or @Murphy:2023:PMLAT [sec. 11.5].

### Rejection sampling

Let $\mathit\Pi$ be a distribution with probability (density) function $\itpi$ that we cannot sample from directly. We can use a **proposal distribution** with probability (density) function $q$ such that there exists some $M\in\R_{>0}$ that satisfies the condition
$$
\forall x\in X: \itpi(x)\leq Mq(x) .
$$
Given a choice of $M$, samples are drawn from $\mathit\Pi$ by repeating
1. sample $x$ from $q$,
2. accept $x$ with probability $\frac{\itpi(x)}{Mq(x)}$,

until a sample is accepted. Hence, the probability of some sample $x$ is proportional to the product of $q(x)$ (step 1) and the acceptance probability $\frac{\itpi(x)}{Mq(x)}$ (step 2):
$$
\itpi(x) = Mq(x)\frac{\itpi(x)}{Mq(x)} .
$$
Proofs of correctness can be found in @Owen:2013:MCTME [sec. 4.7, Theorem 4.2] and @Murphy:2023:PMLAT [sec. 11.4.1].

### Markov chain Monte Carlo methods

Markov chain Monte Carlo (MCMC) methods are algorithms that use a Markov chain to approximate a distribution that cannot be sampled from easily. The Markov chain must be constructed so that the distribution that we want to sample from is a stationary distribution thereof.

Let $\mathit\Pi$ be the distribution that we want to sample from, with probability (density) function $\itpi$.  
We require a homogeneous Markov chain $(\rvar x_1, \rvar x_2, \dots)$ that has $\mathit\Pi$ as a [[#^def-mc-stationary-distribution|stationary distribution]].

The basic MCMC algorithm produces samples iteratively as follows:
1. sample $x_1\sim \p[\rvar x_1]$,
2. transition $T$ times to $x_{n+1}$ according to $\p[\rvar x_{n+1}\mid x_n]$,
3. take the current state $x_{T+1}$ as a sample, go to step 2 (with the current state as the initial state).

The role of taking $T$ transitions before accepting a sample is to reduce correlation between samples and the effect of initialization.  
If the Markov chain is irreducible and aperiodic, the [[#^thm-mc-convergence|convergence theorem]] applies: every set with positive probability under $\mathit\Pi$ can be reached, and the chain does not return to a set of states only at multiples of some period. Then, if the initial state is not in the set $X_0$ (which has probability $0$), the distribution of the state approaches $\mathit\Pi$ as the number of transitions grows.

The following text describes some solutions to the problem of constructing Markov chains with desirable properties.

### The Metropolis-Hastings algorithm

The Metropolis-Hastings (MH) algorithm [@Metropolis:1953:ESCFCM; @Hastings:1970:MCSMMC] is an MCMC algorithm that can sample from a distribution $\mathit\Pi$ given only a function $f\colon X\to\R_{\geq0}$ that is proportional to its probability (density) function $\itpi$.

Let $(\rvar x_1, \rvar x_2, \dots)$ be a homogeneous Markov chain with $\mathit\Pi$ as its stationary distribution. We will use $t(x, y)=\p(\rvar x_{n+1}=y\mid\rvar x_n=x)$, for $y\neq x$, as a shorthand for the transition probability (or density) between two different states (staying in the same state does not affect reversibility).

Requiring reversibility of the Markov chain can simplify its design because reversible Markov chains have stationary distributions. We can rewrite the reversibility (detailed balance) condition [[#^eq-mc-detailed-balance|(2)]] as $\itpi(x)t(x,y) = \itpi(y)t(y,x)$.  
We need to define $t$ so that the stationary distribution $\mathit\Pi$ is the distribution that we want to sample from. The reversibility condition implies that
$$
\frac{t(x,y)}{t(y,x)} = \frac{\itpi(y)}{\itpi(x)}= \frac{f(y)}{f(x)} . \tag{3}
$$

^eq-mh-detailed-balance

The Metropolis-Hastings algorithm breaks up the definition of the transition probability as
$$
t(x,y) = q(x,y)a(x,y) , \tag{4}
$$

^eq-mh-transition

where $q\colon X\times X\to\R_{\geq0}$ and $a\colon X\times X\to[0,1]$. We interpret the function $y\mapsto q(x, y)$ as a conditional proposal probability (density) function and $a(x, y)$ as an acceptance probability. Similarly to rejection sampling, a proposal $y$ is sampled with probability (density) $q(x, y)$ and accepted with probability $a(x, y)$. However, if it is rejected, the current state is taken as the next state.

The proposal probability (density) function $y\mapsto q(x, y)$ should be chosen so that any state in the support of $\itpi$ can be proposed. A possible proposal distribution is a [[Normal distribution|normal distribution]] centered at the current state. The acceptance probability is chosen so that the reversibility condition holds: by substituting eq. [[#^eq-mh-transition|(4)]] into eq. [[#^eq-mh-detailed-balance|(3)]] and rearranging it, we get:
$$
\frac{a(y,x)}{a(x,y)} = \frac{f(x)q(x,y)}{f(y)q(y,x)} . \tag{5}
$$

^eq-mh-acceptance-dist-cond

A typical acceptance probability choice that satisfies this condition is
$$
a(x,y) = \min\left(1, \frac{f(y)q(y,x)}{f(x)q(x,y)}\right) . \tag{6}
$$

^eq-mh-acceptance

This can be checked by substitution into eq. [[#^eq-mh-acceptance-dist-cond|(5)]]. The reversibility of the resulting chain is proved in @RobertsRosenthal:2004:GSSMCMC [sec. 2.1, Proposition 2]. @Murphy:2023:PMLAT [sec. 12.2.2] gives an informal explanation.

The Metropolis-Hastings algorithm is as follows:
1. sample $x_1\sim \p[\rvar x_1]$,
2. for $n=1, \dots, T$:
	1. sample a proposal $x\sim (y\mapsto q(x_n, y))$,
	2. accept $x_{n+1}=x$ with probability $a(x_n,x)$, and $x_{n+1}=x_n$ otherwise,
3. take the current state as a sample, go to step 2.

## Hamiltonian Monte Carlo

The Hamiltonian Monte Carlo algorithm (HMC) is an instance of the Metropolis-Hastings algorithm that uses Hamiltonian dynamics for constructing a Markov chain with desirable properties. To propose the next state of the Markov chain, it simulates a particle whose state consists of position, the variable of interest, and momentum, which is randomly sampled before every simulation. This algorithm has some properties useful for traversing high-dimensional distributions [@Neal:2011:MUHD; @Betancourt:2017:CIHMC; @Murphy:2023:PMLAT, sec. 12.5].

### The Hamiltonian

The Hamiltonian represents the [[Energy|energy]] of a classical particle in a constant potential field. The state of the system is $\v z=(\v x,\v p)$, where $\v x\in\R^d$ is the position, $\v p = m\pd{\v x}{t}$ is the momentum, and $m\in\R_{>0}$ is the mass. The Hamiltonian can be expressed as
$$
H(\v x, \v p) = U(\v x) + K(\v p) ,
$$
where $U(\v x)$ is the potential energy and $K(\v p)$ the kinetic energy:
$$
K(\v p)=\frac{\lVert\v p\rVert_2^2}{2m} . \tag{7}
$$

^eq-hmc-kinetic-energy

@Neal:2011:MUHD [sec. 4.1] also defines the kinetic energy more generally: $K(\v p)=\frac{1}{2}\v p^\transpose\v M^{-1}\v p$, where $\v M\in\R^{d\times d}$ is symmetric and positive-definite. The matrix $\v M$ can be interpreted as direction-dependent mass or as space rescaling. If $\v M^{-1}$ can be represented as $\frac{1}{m}\v A^\transpose\v A$ for some $\v A\in\R^{d\times d}$, we can get an expression equivalent to eq. [[#^eq-hmc-kinetic-energy|(7)]]:
$$
\frac{1}{2m}\lVert\v A\v p\rVert_2^2
= \frac{1}{2m}(\v A\v p)^\transpose(\v A\v p)
= \frac{1}{2}\v p^\transpose\left(\frac{1}{m}\v A^\transpose\v A\right)\v p
= \frac{1}{2}\v p^\transpose\v M^{-1}\v p .
$$
A good choice is $\v M^{-1}\approx$ the covariance of the target distribution, which makes the rescaled target roughly isotropic, so that a single step size suits all directions [@Neal:2011:MUHD, sec. 4.1].

Hamiltonian equations describe the time evolution of the system:
$$
\begin{align}
\od{\v x}{t} &= \pd{H(\v x, \v p)}{\v p}^\transpose = \frac{1}{m}\v p , \\
\od{\v p}{t} &= -\pd{H(\v x, \v p)}{\v x}^\transpose = -\od{U(\v x)}{\v x}^\transpose .
\end{align}
$$
Notation like $\v z_t$ denotes the value at time $t$.

### Properties of Hamiltonian dynamics

The following properties make Hamiltonian dynamics useful for application in MCMC [@Neal:2011:MUHD, sec. 2.2]:
1. **Conservation of the Hamiltonian**. It can be shown that the acceptance probability in the MH algorithm is $1$ when the Hamiltonian is conserved ($\pd{H}{t}=0$).
2. **Reversibility**. Any 2 states $\v z_{t}$, $\v z_{t+s}$ uniquely determine each other. Given some constant time difference $s$, the transition between states $\Phi_s$ is a [[Bijection|bijective]] function. The following identities can be shown to hold: $\Phi_s^{-1}=\Phi_{-s}=(\v x,\v p)\mapsto \Phi_s(\v x,-\v p)$. This reversibility can be used to show that the Markov chain in MCMC is reversible.
3. **Volume preservation**. It can be shown that volume in $(\v x,\v p)$-space is preserved, i.e. $\forall s\in\R: \forall\mathcal Z\in\mathcal B(\R^{2d}): \mu(\mathcal Z)=\mu(\{\Phi_s(\v z) : \v z \in\mathcal Z\})$, where $\mathcal B(\R^{2d})$ denotes the Borel sets of $\R^{2d}$ and $\mu(\mathcal Z)$ is the volume of $\mathcal Z$.

These properties can be maintained when Hamiltonian dynamics are approximated with a volume-preserving numerical integration method [@Neal:2011:MUHD, sec. 2.3]. One such method is the Leapfrog method:
$$
\begin{align}
\v p_{t+\frac{\epsilon}{2}} &= \v p_t - \frac{\epsilon}{2}\pd{U(\v x_t)}{\v x_t}^\transpose \\
\v x_{t+\epsilon} &= \v x_t + \epsilon\frac{1}{m}\v p_{t+\frac{\epsilon}{2}} \\
\v p_{t+\epsilon} &= \v p_{t+\frac{\epsilon}{2}} - \frac{\epsilon}{2}\pd{U(\v x_{t+\epsilon})}{\v x_{t+\epsilon}}^\transpose .
\end{align}
$$
The last and the first half-step can be merged into a single step in intermediate integration iterations. More details can be found in @Neal:2011:MUHD [sec. 2.3].

### Canonical distributions

The concept of canonical distributions is used to assign a distribution to an energy function and vice versa [@Neal:2011:MUHD, sec. 3.1]. Let $E$ be the energy function of a system, and $\v z$ the state. In statistical mechanics, the canonical distribution over states has probability density
$$
\p(\v z) = \frac{1}{Z}\exp(-E(\v z)) ,
$$
where $Z$ is a normalizing constant. In physics, the energy is divided by the temperature, which is set to $1$ in MCMC [@Neal:2011:MUHD, sec. 3.1]. In the other direction, the energy function corresponding to a probability density function $p$ is $E(\v z)=-\ln(p(\v z)) + C$, where $C$ is an arbitrary constant. A lower probability density corresponds to a higher energy.

In MCMC applications, $\v x$ corresponds to the variable of interest and $\v z=(\v x,\v p)$ is the state of the Markov chain. The potential energy is defined as $U(\v x) = -\ln(\p(\v x))$.

We can see that the canonical distribution of the Hamiltonian has
$$
\p(\v x, \v p)
= \frac{1}{Z}\exp(-U(\v x))\exp(-K(\v p))
$$
and that $\rvec x$ and $\rvec p$ are independent.  
We can also see that the canonical distribution of the kinetic energy as defined in eq. [[#^eq-hmc-kinetic-energy|(7)]] is a normal distribution
$$
\mathcal N(\cvec 0_d, m\cvec I_d) . \tag{8}
$$

^eq-hmc-kinetic-canonical-dist

In Bayesian statistics, the negative logarithm of the unnormalized posterior corresponds to
$$
U(\v x) = -\ln(\p(\v x)\p(\mathcal D\mid\v x)) ,
$$
where $\v x$ is the parameter (the variable of interest), $\mathcal D$ the data, $\p[\rvec x]$ the prior, and $\v x\mapsto \p(\mathcal D\mid\v x)$ the likelihood function.

### The Hamiltonian Monte Carlo algorithm

The HMC proposal step [@Neal:2011:MUHD, sec. 3.2] consists of $2$ steps which leave the canonical distribution invariant.

In the first step, momentum is randomly drawn from the canonical distribution in eq. [[#^eq-hmc-kinetic-canonical-dist|(8)]]. This maintains the joint distribution of $\rvec x$ and $\rvec p$ since $\rvec x$ and $\rvec p$ are independent.

The second step is a Metropolis update that uses Hamiltonian dynamics simulation to propose a new state. The proposal is $F(\v x,\v p)$, where the function $F$ performs $L\in\N_{\geq1}$ Leapfrog steps of size $\epsilon\in\R_{>0}$ (or another integrator with the properties above) and then negates the momentum. Since the dynamics are reversible, $F$ is its own inverse: applying $F$ to the proposal leads back to the original state. Since $F$ is deterministic, the proposal probability density function is a Dirac delta, $q(\v z,\v z')=\delta(\v z'-F(\v z))$. Because $F$ is its own inverse and preserves volume, $q(\v z',\v z)=q(\v z,\v z')$, i.e. the proposal probability densities are equal in both directions, which simplifies the acceptance probability below [@Neal:2011:MUHD, sec. 3.2]. The negation of momentum can be omitted in practice, since $K(\v p)=K(-\v p)$ and the momentum is resampled in the next iteration [@Neal:2011:MUHD, sec. 3.2].

The proposal is accepted with probability
$$
a((\v x, \v p),(\v x', \v p')) = \min\left(1, \frac{\exp(-H(\v x', \v p'))}{\exp(-H(\v x, \v p))}\right) , \tag{9}
$$

^eq-hmc-acceptance-prob

where $(\v x, \v p)$ is the state before the $2$ proposal steps and $(\v x', \v p')$ the proposal.

Since $K(\v p)\geq 0$ and the Hamiltonian is (approximately) conserved during the simulation, the potential energy cannot exceed the initial Hamiltonian. Resampling the momentum in the first step changes the Hamiltonian so that regions with arbitrarily low probability density can be reached.

A simple variant of HMC can be summed up as follows:
1. sample $\v x_1\sim \p[\rvec x_1]$,
2. for $n=1, \dots, T$:
	- sample momentum $\v p\sim\mathcal N(\cvec 0_d, m\cvec I_d)$,
	- compute a proposal $(\v x_n',\v p_n')$ by performing $L$ steps of the Leapfrog method with step size $\epsilon$, starting from $(\v x_n,\v p)$,
	- accept $(\v x_{n+1},\v p_{n+1})=(\v x_n',-\v p_n')$ with probability from eq. [[#^eq-hmc-acceptance-prob|(9)]], or accept $(\v x_{n+1},\v p_{n+1})=(\v x_n,\v p_n)$ otherwise,
3. take $\v x_{T+1}$ as a sample, go to step 2 (with the current sample as the initial position).

The positions $(\v x_1, \v x_2, \dots)$ form a sample of a Markov chain whose stationary distribution is the marginal distribution of $\rvec x$, the distribution we want to sample from.

$L$ and $\epsilon$ are important parameters that have to be tuned [@Neal:2011:MUHD, sec. 4.2]. With fixed $L$ and $\epsilon$, trajectories can return close to their starting point, which makes the chain (nearly) periodic. Choosing $\epsilon$ or $L$ randomly in each iteration avoids this [@Neal:2011:MUHD, sec. 4.2]. See @Neal:2011:MUHD for more details.

[[#^lst-hmc|Listing 1]] shows a simple implementation of HMC in Python.

```python
from autograd import grad
import autograd.numpy as np


def leapfrog(f, x, p, step_count, step_size):
  x, p = np.copy(x), np.copy(p)
  p -= step_size * f(x) / 2  # half step
  for _ in range(step_count):
    x += step_size * p  # whole step
    p -= step_size * f(x)  # whole step
  x += step_size * p  # whole step
  p -= step_size * f(x) / 2  # half step
  return x, p


def hmc(U, T, x_start, p_dist, L=100, epsilon=0.01):
  K = lambda p: -p_dist.logpdf(p)
  for _ in range(T):
    # Generate proposal
    p_start = p_dist.sample()
    x_prop, p_prop = leapfrog(grad(U), x_start, p_start, L, epsilon)
    p_prop = -p_prop
    # Metropolis acceptance criterion
    H_curr = U(x_start) + K(p_start)
    H_prop = U(x_prop) + K(p_prop)
    if np.random.rand() < np.exp(H_curr - H_prop):
      yield x_prop
    else:
      yield x_start
```
**Listing 1:** A simple instance of the Hamiltonian Monte Carlo algorithm implemented as an iterator in Python. The code is based on code from @Carrol:2019:HMCFS.

^lst-hmc

> [!example] Example
> [[#^lst-hmc-example|Listing 2]] shows an example program that uses the HMC implementation from [[#^lst-hmc|Listing 1]] to generate samples that correspond to the potential energy function
> $$
> U(\v x) = 4\cdot (\lVert\v x\rVert_2-2)^2 + 0.1\cdot \lVert\v x - \cvec 2_2\rVert_2^2 ,
> $$
> and uses $\mathcal{N}(\cvec 0, \cvec I_2)$ for the canonical distribution of the kinetic energy.  
> [[#^fig-hmc-plots|Figure 1]] illustrates sample generation with different HMC parameters with the same potential energy function.
>
> ```python
> import scipy.stats
> import autograd.scipy.stats as st
> 
> class Normal2:
>   def __init__(self, mean, std):
>     self.mean, self.std = mean, std
> 
>   def logpdf(self, x):
>     return np.sum(st.norm.logpdf(x, self.mean, self.std))
> 
>   def sample(self):
>     return scipy.stats.norm(self.mean, self.std).rvs(2)
> 
> 
> U = lambda x: 4 * ((x**2).sum()**0.5 - 2)**2 + 0.1 * ((x - 2)**2).sum()
> 
> samples = [x for x in
>            hmc(U, 10, x_start=np.array([0., 0.]), p_dist=Normal2(0, 1))]
> ```
> **Listing 2:** Example code for generating samples with the code from [[#^lst-hmc|Listing 1]]. The negative logarithm of the function that is approximately sampled (potential energy) is $U(\v x) = 4\cdot (\lVert\v x\rVert_2-2)^2 + 0.1\cdot \lVert\v x - \cvec 2_2\rVert_2^2$. $\mathcal{N}(\cvec 0, \cvec I_2)$ is chosen for the canonical distribution of the kinetic energy.
>
> ^lst-hmc-example
>
> ![[HMC runs with different integration times.svg]]  
> **Figure 1:** Illustration of four HMC runs with $20$ iterations and different integration times $L\epsilon$. The directions and sizes of arrows represent momenta at integration time steps. The dots represent samples produced by HMC. The illustrations were generated using modified code from @Carrol:2019:HMCFS.
>
> ^fig-hmc-plots

## Conclusion

We have introduced some concepts and theoretical fundamentals necessary for understanding Markov chain Monte Carlo (MCMC) algorithms and the Hamiltonian Monte Carlo (HMC) algorithm. MCMC algorithms are based on constructing a Markov chain with a stationary distribution that corresponds to the desired distribution that is hard to sample from or is known up to the normalization constant. HMC exploits properties of Hamiltonian dynamics that are suitable for constructing Markov chains, and can perform well on high-dimensional spaces.

## References
