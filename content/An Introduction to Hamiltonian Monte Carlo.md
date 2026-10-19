---
tags:
creation date: 2023-03-10
edit date: 2026-10-19
---

## Introduction

Sampling algorithms are commonly used for sampling from distributions that can be evaluated easily but are hard to sample from. Markov chain Monte Carlo (MCMC) methods can also be used when only a function that is proportional to the distribution can be evaluated (the normalization constant is unknown) [@Geyer:2011:IMCMC]. Some of them, such as Hamiltonian Monte Carlo (HMC) [@Duane:1987:HMC], are more appropriate for sampling from high-dimensional distributions.

MCMC methods are commonly used for approximating multi-dimensional integrals that can be expressed as the [[Expectation|expectation]] of a [[Random variable|random variable]]. Their application is important in [[Bayesian inference|Bayesian statistics]] for approximation of the posterior $\p(\theta\mid x) = \frac{\p(x\mid \theta)\p(\theta)}{\p(x)}$ while sidestepping the computation of the marginal probability density $\p(x) = \E_{\rvar\theta} \p(x\mid \theta)$.

This text will briefly introduce some important fundamentals and describe basic Markov chain Monte Carlo and Hamiltonian Monte Carlo sampling algorithms.

## Notation

Random variables are [[Underlining random variables|underlined]]. We will use the term _distribution_ interchangeably with _probability density function_ and _probability function_. The distribution of a random variable $\rvar x$ (discrete or continuous) is denoted with $\p[\rvar x]$. We will denote the probability density or probability of a random variable $\rvar x$ taking a value $x$ as
$$
\p(\rvar x=x) \equiv \p[\rvar{x}](x) \equiv \p(x) .
$$
The last notation, $\p(x)$, is a shorthand that we will use when the random variable and the value have the same symbol up to underlining.  
A conditional random variable is denoted like $\rvar x\mid \rvar y=y$ or $\rvar x\mid y$. Similarly as before, its distribution is $\p[\rvar x=x\mid y]$, which is the same as the function $x\mapsto \p(x\mid y)$.

## Stochastic processes and Markov chains

This section contains some definitions and theorems that are necessary for the following sections. They can be found e.g. on Wikipedia [@wp:markov-chain] or in books about stochastic processes.

### Stochastic processes

> [!definition] Definition (Stochastic chain)
> A stochastic chain is a sequence of random variables.

We will refer to the values of those random variables as states.

> [!definition] Definition (Stationarity of a stochastic chain)
> A stochastic chain $(\rvar x_1, \rvar x_2, \dots)$ is stationary iff for every $k>0$ the distribution of $(\rvar x_{n+1}, \dots, \rvar x_{n+k})$ does not depend on $n$.

^def-sp-stationarity

> [!definition] Definition (Equilibrium distribution of a stochastic chain)
> If it exists, the equilibrium distribution of a stochastic chain $(\rvar x_1, \rvar x_2, \dots)$ is $\lim_{n\to\infty} \p[\rvar x_n]$.

^def-sp-equilibrium

The equilibrium distribution is also referred to as the stationary distribution.

> [!theorem] Theorem (Equilibrium distribution of a stationary stochastic chain)
> If $(\rvar x_1, \rvar x_2, \dots)$ is a stationary stochastic chain, it has an equilibrium distribution and $\p[\rvar x_1] = \p[\rvar x_2] = \dots = \lim_{n\to\infty} \p[\rvar x_n]$.

> [!proof]
> This follows from the [[#^def-sp-equilibrium|definition of the equilibrium distribution]] and the [[#^def-sp-stationarity|definition of stationarity]] ($k=1$).

### Markov chains

> [!definition] Definition (Markov chain)
> A Markov chain is a sequence of random variables $(\rvar x_1, \rvar x_2, \dots)$ where the **Markov property** holds: $\forall n\geq 0: \forall (x_1, \dots, x_n): \p[\rvar x_{n+1}\mid x_1, \dots, x_n] = \p[\rvar x_{n+1}\mid x_n]$.

The values that $\rvar x_i$ take are called states. A state of a Markov chain can depend only on its preceding state.

> [!theorem] Theorem
> The joint distribution of a Markov chain is uniquely determined by $\p[\rvar x_1]$ and the **transition distributions** $\p[\rvar x_{n+1}\mid x_n]$.

> [!proof]
> $$
> \begin{align*}
> \p(x_1, x_2, \dots, x_n)
> &= \p(x_1)\prod_{i>0}\p(x_{i+1}\mid x_1, \dots, x_i) \\
> &= \p(x_1)\prod_{i>0} \p(x_{i+1}\mid x_i) \annot{Markov property}
> \end{align*}
> $$

> [!definition] Definition (Homogeneous Markov chain)
> A Markov chain is homogeneous if $\forall n,k>0: \forall x: \p[\rvar x_{n+1}\mid \rvar x_n=x] = \p[\rvar x_{k+1}\mid \rvar x_k=x]$.

In a homogeneous Markov chain, the probabilities of the next state do not depend on the index of the current state. Hence, a homogeneous Markov chain can be defined via $\p[\rvar x_1]$ and $\p[\rvar x_2\mid\rvar x_1]$.

> [!theorem] Theorem (Stationarity of a Markov chain)
> A Markov chain is stationary if it is homogeneous and $\p[\rvar x_2]=\p[\rvar x_1]$.

> [!proof]
> Let $\Pi(x)=\p[\rvar x_{k+1}\mid\rvar x_k=x]$.  
> By the identity $\p[\rvar x_2] = \E_{\rvar x_1} \p[\rvar x_2\mid x_1]$,
> $$
> \p[\rvar x_2] = \E_{\rvar x_1} \Pi(x_1) .
> $$
> Since we assume $\p[\rvar x_2]=\p[\rvar x_1]$, we can replace $\rvar x_1$ with $\rvar x_2$ on the right-hand side and obtain $\p[\rvar x_3]=\p[\rvar x_2]$. Since $\p[\rvar x_{k+1}] = \E_{\rvar x_k} \Pi(x_k)$, by induction
> $$
> \forall n,k>0: \p[\rvar x_n]=\p[\rvar x_k] . \tag{1}
> $$
>
> ^eq-markov-marginal-equality
>
> Finally,
> $$
> \begin{align*}
> \p(x_1, x_2, \dots, x_n)
> &= \p(x_1)\p(x_2\mid x_1)\p(x_3\mid x_2)\cdots\p(x_n\mid x_{n-1}) \annot{Markov property} \\
> &= \p(\rvar x_{k+1}=x_1)\p(\rvar x_{k+2}=x_2\mid \rvar x_{k+1}=x_1) \\
> &\mathrel{\phantom{=}}\cdots\p(\rvar x_{k+n}=x_n\mid \rvar x_{k+n-1}=x_{n-1}) \annot{homogeneity and eq. (1)} \\
> &= \p(x_{k+1}, x_{k+2}, \dots, x_{k+n}) \annot{renaming values $x_i$ to $x_{k+i}$} .
> \end{align*}
> $$

> [!definition] Definition (Irreducibility of a Markov chain)
> A Markov chain is irreducible if it is possible to get to any state from any state, i.e.
> $$
> \forall n: \exists k>0: \forall a,b: \p(\rvar x_{n+k}=b\mid \rvar x_n=a)>0 .
> $$

Note that there exist homogeneous or stationary Markov chains that are not irreducible.  
One such Markov chain has $\p[\rvar x_1]=\mathcal U([0, 1])$, while all the other random variables repeat the preceding state: $\forall n>1: \p[\rvar x_{n+1}=x\mid x_n] = \delta(x-x_n)$, where $\delta$ is the Dirac delta distribution.

> [!definition] Definition (Aperiodicity of a Markov chain)
> A Markov chain is aperiodic if
> $$
> \forall x: \exists n: \forall k\geq n: \p(\rvar x_{k}=x\mid \rvar x_1=x) > 0 .
> $$

> [!definition] Definition (Reversibility of a Markov chain)
> A Markov chain $(\rvar x_1, \rvar x_2, \dots)$ is reversible iff there exists a distribution $p$ such that
> $$
> \forall n>0: \forall a,b: p(a)\p(\rvar x_{n+1}=b\mid\rvar x_n=a) = p(b)\p(\rvar x_n=a\mid\rvar x_{n+1}=b) . \tag{2}
> $$
>
> ^eq-mc-detailed-balance

^def-mc-reversibility

The condition [[#^eq-mc-detailed-balance|(2)]] is referred to as the **detailed balance** condition [@wp:detailed-balance].

Note that reversibility of a Markov chain implies that it has a stationary distribution ($p$ in the [[#^def-mc-reversibility|definition of reversibility]]).

## Monte Carlo integration

Monte Carlo integration (approximation) is a method of approximating integrals that can be expressed as the expectation of some random variable.

Let $I := \int u(x)\dif x$ be an integral that is hard to compute. If we express $u$ as the product of a function $f$ and a probability density function (distribution) $p$, $u(x) = f(x)p(x)$, the integral $I$ can be expressed as the expectation of $f(\rvar x)$, where $\rvar x\sim p$:
$$
I = \int f(x)p(x)\dif x = \E_{\rvar x\sim p}f(x) .
$$
If $f(\rvar x_i)$, where $\rvar x_i\sim p$, has bounded variance, according to the law of large numbers, the expectation can be approximated with the Monte Carlo [[Estimator|estimator]]
$$
\hat{\rvar I}_n = \frac{1}{n}\sum_{i=1}^{n} f(\rvar x_i) .
$$
The estimator $\hat{\rvar I}_n$ is unbiased if $\rvar x_i$ are independent.

## Sampling methods

This section first describes some basic sampling methods and then Markov chain Monte Carlo (MCMC) methods.

This section is based on @Keng:2015:MCMCMRSMHA and @Geyer:2011:IMCMC.

### Importance sampling

Let $p$ be a distribution.  
Suppose we want to estimate some expectation $I=\E_{x\sim p} f(x)$ with an estimator
$$
\hat{\rvar I} = \frac{1}{n}\sum_{i=1}^{n} f(\rvar x_i) \text{, where }\rvar x_i\sim p .
$$
If we cannot sample from $p$ or want to reduce the variance of the estimator $\hat{\rvar I}$, we can use some other distribution $q$ that might be appropriate for sampling:
$$
\E_{x\sim p} f(x) = \int_x f(x)p(x)\dif x
= \int_x f(x)\frac{p(x)}{q(x)}q(x)\dif x
= \E_{x\sim q} f(x)\frac{p(x)}{q(x)} .
$$
Note that $q$ must be non-zero wherever $p$ is non-zero.  
An importance sampling estimator that uses $q$ as its sampling distribution would be
$$
\hat{\rvar I}' = \frac{1}{n}\sum_{i=1}^{n} f(\rvar x_i)\frac{p(\rvar x_i)}{q(\rvar x_i)} \text{, where }\rvar x_i\sim q .
$$
The [[Support of a distribution|support]] of the sampling distribution $q$ must be equal to or be a superset of the support of $p$. A good sampling distribution has more probability around the expectation.

### Rejection sampling

Let $p$ be a distribution that we cannot sample from directly. We can use a **proposal distribution** $q$ such that there exists some $M\in\R^+$ that satisfies the condition
$$
\forall x: p(x)\leq Mq(x) .
$$
Given a choice of $M$, samples are drawn from $p$ by repeating
1. sample $x$ from $q$,
2. accept $x$ with probability $\frac{p(x)}{Mq(x)}$,

until a sample is accepted. Hence, the probability of some sample $x$ is proportional to the product of $q(x)$ (step 1) and the acceptance probability $\frac{p(x)}{Mq(x)}$ (step 2):
$$
p(x) = Mq(x)\frac{p(x)}{Mq(x)} .
$$
See e.g. @wp:rejection-sampling for more theoretical details.

### Markov chain Monte Carlo methods

Markov chain Monte Carlo (MCMC) methods are algorithms that use a Markov chain to approximate a distribution that cannot be sampled from easily. The Markov chain must be constructed so that its stationary distribution equals the distribution that we want to sample from.

Let $p$ be the distribution that we want to sample from.  
We require a homogeneous Markov chain $(\rvar x_1, \rvar x_2, \dots)$ that has $p$ as its stationary distribution: $p = \lim_{n\to\infty}\p[\rvar x_n]$.

The basic MCMC algorithm produces samples iteratively as follows:
1. sample $x_1\sim\p[\rvar x_1]$,
2. transition $T$ times to $x_{n+1}$ according to $\p[\rvar x_{n+1}\mid x_n]$,
3. take the current state $x_{T+1}$ as a sample, go to step 2 (with the current state as the initial state).

The role of taking $T$ transitions before accepting a sample is to reduce correlation between samples and the effect of initialization.  
For $T\to\infty$, the sampled states are distributed according to $p$.

Because the algorithm uses the current sample as the starting state of the next iteration, we want the Markov chain to be **irreducible**, so that any state can be reached from any state. Assuming $T$ is constant, another useful property can be **aperiodicity**, so that there exists a number of steps after which any state can be reached again in any number of steps.

The following text describes some solutions to the problem of constructing Markov chains with desirable properties.

### The Metropolis-Hastings algorithm

The Metropolis-Hastings (MH) algorithm is an MCMC algorithm that can sample from a distribution $p$ given only a function $f$ that is proportional to $p$.

Let $(\rvar x_1, \rvar x_2, \dots)$ be a homogeneous Markov chain with $p$ as its stationary distribution. We will use $t(x, y)=\p(\rvar x_{n+1}=y\mid\rvar x_n=x)$ as a shorthand for the transition probability between two states.

Requiring **reversibility** of the Markov chain can simplify its design because reversible Markov chains have stationary distributions. We can rewrite the reversibility (detailed balance) condition [[#^eq-mc-detailed-balance|(2)]] as $p(x)t(x,y) = p(y)t(y,x)$.  
We need to define $t$ so that the stationary distribution $p$ is the distribution that we want to sample from. The reversibility condition implies that
$$
\frac{t(x,y)}{t(y,x)} = \frac{p(y)}{p(x)}= \frac{f(y)}{f(x)} . \tag{3}
$$

^eq-mh-detailed-balance

The Metropolis-Hastings algorithm breaks up the definition of the transition probability as
$$
t(x,y) = q(x,y)a(x,y) , \tag{4}
$$

^eq-mh-transition

where we interpret the function $y\mapsto q(x, y)$ as a conditional proposal distribution and $y\mapsto a(x, y)$ as an acceptance distribution. Similarly to rejection sampling, a proposal $y$ is sampled with probability $q(x, y)$, and accepted with probability $a(x, y)$. However, if it is rejected, the current state is taken as the next state.

The proposal distribution $y\mapsto q(x, y)$ should be chosen so that any state in the support of $p$ can be proposed. A possible proposal distribution is a [[Normal distribution|normal distribution]] centered at the current state. The acceptance distribution is chosen so that the reversibility condition holds: by substituting eq. [[#^eq-mh-transition|(4)]] into eq. [[#^eq-mh-detailed-balance|(3)]] and rearranging it, we get:
$$
\frac{a(y,x)}{a(x,y)} = \frac{f(x)q(x,y)}{f(y)q(y,x)} . \tag{5}
$$

^eq-mh-acceptance-dist-cond

A typical acceptance probability choice that satisfies this condition is
$$
a(x,y) = \min\left(1, \frac{f(y)q(y,x)}{f(x)q(x,y)}\right) . \tag{6}
$$

^eq-mh-acceptance

This can be checked by substitution into eq. [[#^eq-mh-acceptance-dist-cond|(5)]].

The Metropolis-Hastings algorithm is as follows:
1. sample $x_1\sim\p[\rvar x_1]$,
2. for $n=1, \dots, T$:
	1. sample a proposal $x\sim (y\mapsto q(x_n, y))$,
	2. accept $x_{n+1}=x$ with probability $a(x_n,x)$, and $x_{n+1}=x_n$ otherwise,
3. take the current state as a sample, go to step 2.

## Hamiltonian Monte Carlo

The Hamiltonian Monte Carlo algorithm (HMC) is an instance of the Metropolis-Hastings algorithm that uses Hamiltonian dynamics for constructing a Markov chain with desirable properties. To propose the next state of the Markov chain, it simulates a particle whose state consists of position, the variable of interest, and momentum, which is randomly sampled before every simulation. This algorithm has some properties useful for traversing high-dimensional distributions.

### The Hamiltonian

The Hamiltonian represents the [[Energy|energy]] of a classical particle in a constant potential field. The state of the system is $\v z=(\v x,\v p)$, where $\v x\in\R^d$ is the position and $\v p = m\pd{\v x}{t}$ is the momentum. The Hamiltonian can be expressed as
$$
H(\v x, \v p) = U(\v x) + K(\v p) ,
$$
where $U(\v x)$ is the potential energy and $K(\v p)$ the kinetic energy:
$$
K(\v p)=\frac{\lVert\v p\rVert_2^2}{2m} . \tag{7}
$$

^eq-hmc-kinetic-energy

@Neal:2011:MUHD [section 4.1] also defines the kinetic energy more generally: $K(\v p)=\frac{1}{2}\v p^\transpose\v M^{-1}\v p$. The matrix $\v M$ can be interpreted as direction-dependent mass or as space rescaling. If $\v M^{-1}$ can be represented as $\frac{1}{m}\v A^\transpose\v A$, we can get an expression equivalent to eq. [[#^eq-hmc-kinetic-energy|(7)]]:
$$
\frac{1}{2m}\lVert\v A\v p\rVert_2^2
= \frac{1}{2m}(\v A\v p)^\transpose(\v A\v p)
= \frac{1}{2}\v p^\transpose\left(\frac{1}{m}\v A^\transpose\v A\right)\v p
= \frac{1}{2}\v p^\transpose\v M^{-1}\v p .
$$

Hamiltonian equations describe the time evolution of the system:
$$
\begin{align}
\od{\v x}{t} &= \pd{H(\v x, \v p)}{\v p}^\transpose = \frac{1}{m}\v p , \\
\od{\v p}{t} &= -\pd{H(\v x, \v p)}{\v x}^\transpose = -\od{U(\v x)}{\v x}^\transpose .
\end{align}
$$
Notation like $\v z_t$ denotes the value at time $t$.

### Properties of Hamiltonian dynamics

The following properties make Hamiltonian dynamics useful for application in MCMC [@Neal:2011:MUHD, section 5.2.2]:
1. **Conservation of the Hamiltonian**. It can be shown that the acceptance probability in the MH algorithm is $1$ when the Hamiltonian is conserved ($\pd{H}{t}=0$).
2. **Reversibility**. Any 2 states $\v z_{t}$, $\v z_{t+s}$ uniquely determine each other. Given some constant time difference $s$, the transition between states $T_s$ is a [[Bijection|bijective]] function. The following identities can be shown to hold: $T_s^{-1}=T_{-s}=(\v x,\v p)\mapsto T_s(\v x,-\v p)$. This reversibility can be used to show that the Markov chain in MCMC is reversible.
3. **Volume preservation**. It can be shown that volume in $(\v x,\v p)$-space is preserved, i.e. $\forall s: \forall\mathcal Z\subset\R^d\times\R^d: \mu(\mathcal Z)=\mu(\{T_s(\v z) : \v z \in\mathcal Z\})$, where $\mu$ is the [[Measure|measure]].

These properties can be maintained when Hamiltonian dynamics are approximated with a volume-preserving numerical integration method [@Keng:2015:MCMCMRSMHA]. One such method is the Leapfrog method:
$$
\begin{align}
\v p_{t+\frac{\epsilon}{2}} &= \v p_t - \frac{\epsilon}{2}\pd{U(\v x_t)}{\v x_t}^\transpose \\
\v x_{t+\epsilon} &= \v x_t + \epsilon\frac{1}{m}\v p_{t+\frac{\epsilon}{2}} \\
\v p_{t+\epsilon} &= \v p_{t+\frac{\epsilon}{2}} - \frac{\epsilon}{2}\pd{U(\v x_{t+\epsilon})}{\v x_{t+\epsilon}}^\transpose .
\end{align}
$$
The last and the first half-step can be merged into a single step in intermediate integration iterations. More details can be found in @Neal:2011:MUHD [section 5.2.3].

### Canonical distributions

The concept of canonical distributions is used to assign a distribution to an energy function and vice versa. Let $E$ be the energy function of a system, and $\v z$ the state. In statistical mechanics, the canonical distribution over states has probability density
$$
\p(\v z) = \frac{1}{Z}\exp\left(\frac{-E(\v z)}{T}\right) ,
$$
where $T$ is the temperature (in the right units) and $Z$ a normalizing constant. In the other direction, the energy function corresponding to a distribution is $E(\v z)=-\ln(\p(\v z)) + C$, where $C$ is an arbitrary constant. A lower probability density corresponds to a higher energy.

In MCMC applications, $\v x$ corresponds to the variable of interest and $\v z=(\v x,\v p)$ is the state of the Markov chain. The potential energy is defined as $U(\v x) = -\ln(\p(\v x))$.

We can see that the canonical distribution of the Hamiltonian is
$$
\p(\v x, \v p)
= \frac{1}{Z}\exp\left(\frac{-U(\v x)}{T}\right)\exp\left(\frac{-K(\v p)}{T}\right)
$$
and that $\rvec x$ and $\rvec p$ are independent.  
We can also see that the canonical distribution of the kinetic energy as defined in eq. [[#^eq-hmc-kinetic-energy|(7)]] is a normal distribution
$$
\mathcal N(\cvec 0_d, Tm\cvec I_d) . \tag{8}
$$

^eq-hmc-kinetic-canonical-dist

In Bayesian statistics, the negative logarithm of the unnormalized posterior corresponds to
$$
U(\v x) = -\ln(\p(\v x)\p(\mathcal D\mid\v x)) ,
$$
where $\v x$ is the parameter (the variable of interest), $\mathcal D$ the data, $\p[\rvec x]$ the prior, and $\v x\mapsto\p(\mathcal D\mid\v x)$ the likelihood function.

### The Hamiltonian Monte Carlo algorithm

The HMC proposal step [@Neal:2011:MUHD, section 5.3.2.1] consists of $2$ steps which leave the canonical distribution invariant.

In the first step, momentum is randomly drawn from the canonical distribution in eq. [[#^eq-hmc-kinetic-canonical-dist|(8)]]. This maintains the joint distribution $\p[\rvec x, \rvec p]$ since $\rvec x$ and $\rvec p$ are independent.

The second step is a Metropolis update that uses Hamiltonian dynamics simulation to propose a new state. It performs $L$ integration steps of size $\epsilon$ using the Leapfrog method or some other algorithm with the necessary properties. Then the momentum is negated to make the proposal symmetric, i.e. the transition probabilities from eq. [[#^eq-mh-acceptance|(6)]] equal in both directions. The negation does not have any effect, however, as momentum is randomly sampled in the first step.

The proposal is accepted with probability
$$
a((\v x, \v p),(\v x', \v p')) = \min\left(1, \frac{\exp(-H(\v x', \v p'))}{\exp(-H(\v x, \v p))}\right) , \tag{9}
$$

^eq-hmc-acceptance-prob

where $(\v x, \v p)$ is the state before the $2$ proposal steps and $(\v x', \v p')$ the proposal.

Since $K(\v p)$ is always non-negative, the Hamiltonian is the upper bound of the potential energy. The purpose of the first step is to make the potential energy unbounded, and thus make regions with arbitrarily low probability density reachable.

A simple variant of HMC can be summed up as follows:
1. sample $\v x_1\sim\p[\rvec x_1]$,
2. for $n=1, \dots, T$:
	- sample momentum $\v p\sim\mathcal N(\cvec 0_d, m\cvec I_d)$,
	- compute a proposal $(\v x_n',\v p_n')$ by performing $L$ steps of the Leapfrog method with step size $\epsilon$, starting from $(\v x_n,\v p)$,
	- accept $(\v x_{n+1},\v p_{n+1})=(\v x_n',-\v p_n')$ with probability from eq. [[#^eq-hmc-acceptance-prob|(9)]], or accept $(\v x_{n+1},\v p_{n+1})=(\v x_n,\v p_n)$ otherwise,
3. take $\v x_{T+1}$ as a sample, go to step 2 (with the current sample as the initial position).

$L$ and $\epsilon$ are important parameters that have to be tuned [@Neal:2011:MUHD, section 5.4.2], and there are other important details explained in @Neal:2011:MUHD.

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

_References are inserted here by the Citations plugin in Quartz._
