#machine-learning #interpretability

## General definition

Let $\underline A$ be a stochastic learning algorithm.  
Let $Z=X\times Y$.  
Let $S=\{\v z_i\}_{i=1..n}\subset Z$ be an indexed training set.  
Let $\v x\in X$.  
Let $D_S$ be a distribution over subsets of $S'\subseteq S$.  
Let $f_{\underline A}(x;S')$ be the stochastic output in $x$ of the model trained on $S'$ using $\underline A$.

A **datamodel** for $x$ is a parametric function $g_{\v \theta}\colon \{0,1\}^{\lvert S\rvert}\to \R$ optimized to predict the output $f_{\underline A}(x;S')$ based on the indices of training examples:
$$
\v \theta = \argmin_{\v \theta'} \E_{S'\sim D_S, \underline A} L(g_{\v \theta'}(\cvec 1_{S'}^{S}), f_{\underline A}(\v x;S')) \text,
$$
where $L$ is a loss function, and $\cvec 1_{S'}^S$ denotes a vector such that $\cvec 1_{S'}^S[i] = \enbbracket{\v z_i \in S'}$. $\cvec 1_{S'}^S=(\enbbracket{\v z_i \in S'})_{i\in 1\bidot \lvert S \rvert}$

## Datamodel in the paper

The paper uses the following linear datamodel.

The surrogate function is:
$$  
g_{\v\theta}(\cvec 1_{S'}^S) = \langle \cvec 1_{S'}^S \mid \v w \rangle + b,
$$
where $\v \theta = (b, \v w) \in \R\times\R^{\lvert S \rvert}$.

For simplicity of presentation, the paper later ignores the bias term:
$$
g_{\v\theta}(\cvec 1_{S'}^S) = \langle \cvec 1_{S'}^S \mid \v \theta \rangle .
$$

Subsets are sampled from
$$  
D_S = \op{U}(\{S'\subset S: \lvert S'\rvert = \alpha \lvert S\rvert\}) ,
$$
where $\alpha\in(0..1)$ is the _subsampling fraction_.

The model output function is
$$
f_{\underline A}(x;S') = \ln P(y\mid x, S') - \ln \argmax_{y'\neq y} P(y'\mid x, S') .
$$

The loss is optimized by
$$
\vec\theta = 
	\argmin_{\vec\theta \in \R^{\lvert S\rvert+1}} 
		\E_{i=1}^{m} 
			\left(
				g_{\v\theta}(\cvec 1_{S'}^S)
				%\left\langle\vec w \middle| 1_{S'}^S \right\rangle 
				- f_{\underline A}(\v x;S'_i)
			\right)^2
			+\lambda\lVert\vec \theta\rVert_1 .
$$

## Notes

>A datamodel predicts model outputs on a specific but arbitrary target example $\v x$.

>In practice, we estimate datamodels for several choices of $\alpha$, as it turns out that the value of $\alpha$ corresponding to the most useful datamodels can vary by setting.

>We can use cross-validation to select the regularization parameter $\lambda$ for each specific target example $\v x$.

## Experiments

Figure E.1:
>Sparsity decreases with higher a, which is consistent with our intuitions (Section 5) that higher a captures relationships driven by smaller groups of images.

## Related

- [[Notes on Datamodels;; Predicting Predictions from Training Data]]
- [[Notes on Estimating Training Data Influence by Tracing Gradient Descent]] (TracIn)

### References

[1]: Ilyas et al. (2022), Datamodels: Predicting Predictions from Training Data, [arXiv](https://arxiv.org/abs/2202.00622)
