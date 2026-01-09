Notes on [Rethinking Backdoor Attacks](https://arxiv.org/abs/2307.10163) by Khaddaj et al. (2023).

>We demonstrate that in the absence of any knowledge about the distribution of natural image data, the triggers used in a backdoor attacks are indistinguishable from existing features in the data. This observation implies that every backdoor defense must make assumptions—either implicit or explicit—about the structure of the distribution or of the backdoor attack itself

>In this paper, we propose to assume that the backdoor trigger is the strongest feature in the dataset (in a sense we will make precise soon). Importantly (and unlike the assumptions discussed in Section 2.2), this assumption is tied to the success of the backdoor attack itself.

The paper assumes that the trigger is the strongest feature in the sense that adding a triggered example into the training set influences the prediction in other triggered examples more than in other examples that have some other feature in common with the added example.

## Feature strengths

Let $Z=X\times Y$.  
Let $S=\{\v z_i\}_{i=1..n}\subset Z$ be a training set.

**Definition.** A **feature** on a set $X$ is a [[Function|function]] from $X\to \{0, 1\}$.

Let $\Phi_{X}$ be the set of all features on $X$.

**Definition.** The **support of a feature** $\phi : X → \{0, 1\}$ in the set $S \subset Z$ is
$$
\op{supp}_\phi(S) = \{(x, y) \in S : \phi(\v x) = 1\} \text.
$$

**Definition.** For a feature $\phi$, and a training set $S$, the **feature output function** $g_\phi$ maps any integer $k$ to the expected model output on test examples with feature $\phi$ when training on subsets of $S$ with exactly $k$ training inputs with feature $\phi$:
$$
g_\phi(k) 
	= \E_{z, S': S'\subseteq S, \lvert\op{supp}_\phi(S')\rvert = k, \v z\in \op{supp}_\phi(S) \setminus S'} 
		f(\v z; S') \text.
$$
The expectation denotes averaging over all pairs of inputs $\v z$ and training set subsets $S'$ that satisfy the condition, and the _model output_ $f(\v z; S')$ expresses the expected performance of the model on the example $\v z$ when trained on $S'$. For example, we can define 
$$f((\v x,y); S') = \ln P(y\mid \v x)$$  
or  
$$f((\v x,y); S') = \ln P(y\mid \v x) - \argmax_{y'\neq y}\ln P(\underline{y}=y'\mid \v x) \text.$$

> Intuitively, the feature output function $g_\phi(k)$ should grow quickly, as a function of $k$, for strong features and slowly for weak features.

**Definition.** The **$k$-strength of a feature** $\phi$ is the function
$$
s_{\phi}(k) = g_{\phi}(k + 1) - g_{\phi}(k) \text.
$$

## Detecting the backdoor trigger as the strongest feature using datamodels

**Assumption 1.** Let $\phi_{\text t}$ be a backdoor trigger feature and $p = \lvert\op{supp}_{\phi_{\text t}}(S)\rvert$. We assume that
$$
\begin{align}
	&\exists\alpha\in(0..1)\colon \forall\phi\in\Phi_X \colon \\
	&\quad (\lvert\op{supp}_\phi(S)\rvert=p \implies s_{\phi_{\text t}}(\alpha p) \geq s_\phi(\alpha p)) \text.
\end{align}
$$
> As we already discussed, Assumption 1 has the advantage of being directly tied to the effectiveness of the backdoor attack. In particular, we know that in the absence of backdoored training examples, the model should do poorly on the inputs with the backdoor trigger (otherwise, we would consider the model to have already been compromised). Thus, $g_{\phi_{\text t}}(0)$ is small. On the other hand, for the backdoor attack to be effective, we must have that  $g_{\phi_{\text t}}(p)$ is large, i.e., models trained on the backdoor training set should perform “well” on backdoored inputs. The [[Mean value theorem]] thus implies that there must \[be] one point $0 ≤ k ≤ p$ at which $s_{\phi_{\text t}}(k)$ is large.

**Definition.** Let $S=\{s_i\}_{i=1..n}$ be an [[Indexed set|indexed set]]. The **subset indicator vector** for the subset $S'\subseteq S$ is
$$
\cvec 1_{S'}^{S} = \left(\enbbracket{s_i\in S'}\right)_{i=1..\lvert S\rvert}^T \text.
$$

**Assumption 2 ([[Datamodel]] accuracy).** There is some $\varepsilon>0$ such that for any example $\v z$, with a corresponding datamodel weight vector $\v w_{\v z}$,
$$
\E_{S'\subseteq S} \left[ \left( 
	f(\v z; S') - {\cvec 1_{S'}^{S}}^\transpose \v w_{\v z} 
	\right)^2 \right] ≤ \varepsilon \text.
$$
$\varepsilon$ represents a bound on the error of estimating the model output function using datamodels.

**Lemma 1.** Let $h\colon \R^n \to \R^n$ be the function
$$
h(\v v) = \frac{\v v}{\lVert \v v\rVert_1} - \frac{\cvec 1_n - \v v}{\lVert\cvec 1_n - \v v\rVert_1} \text.
$$
By Assumption 2, for each $\alpha\in(0\bidot 1)$ there exists some $C > 0$ such that
$$
\left\lvert s_\phi(\alpha\lvert\op{supp}_\phi(S)\rvert) 
	\E_{\v z \in \op{supp}_\phi(S)} \v w_{\v z}^\transpose h\left(\cvec 1_{\operatorname{supp}_\phi(S)}^{S}\right) 
	\right\rvert
	\leq C\varepsilon^{1/2}n^{1/4} \text,
$$
where $\varepsilon$ is as defined in Assumption 2.
