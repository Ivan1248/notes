If the prediction in one example $\v x_i$ does not depend on the prediction on some other example $\v x_j$ given parameters $\vec\theta$, the joint conditional probabilities of a classifier are:
$$
P((y_1, \bidot, y_n) \mid (\v x_1, \bidot, \rvec x_n), \vec\theta) = \prod_{i=1}^n P(y_i \mid x_i, \vec\theta) .
$$
Also
$$
P(y_i \mid x_i, \vec\theta) = \sum_{i=1}^n
$$

In epistemic neural networks (ENNs), the prediction also depends on the _epistemic index_ $\rvec z$, a random vector with a simple distribution such as $p[\rvec z]=N(\cvec 0, \cvec I)$. Then, the joint conditional probabilities are:
$$
P((y_1, \bidot, y_n) \mid (\v x_1, \bidot, \rvec x_n), \vec\theta) 
= \E_{\v z\sim p[\rvec z]} \prod_{i=1}^n P(y_i \mid x_i, \vec z, \vec\theta) .
$$
