Assumptions about attacks:
- Backdoors are learned faster than clean features.
- The _stronger_ the attack, the faster the model converges on backdoor data.
- The backdoor attack has a single target class.

Defense steps overview:
1. First training stage: train for a number of steps on all training data up to some loss threshold.
1. Isolate a small proportion of training examples as backdoor examples based on the lowest loss values.
2. Remaining training stage: break the correlation between the trigger(s) and the target class by maximizing the loss on the isolated backdoor examples.

$$
L_{\text{ABL}}^{t} = 
\begin{cases} 
	L_{\text{LGA}} = 
		\E_{(x,y) \sim D} \left[ \mathrm{sign}(\ell(f_{\theta}(x), y)) \right] 
		& \text{if } 0 \leq t < T_{te} \\ 
	Z_{\text{GGA}} = 
		\E_{(x,v) \sim \widehat{D}_{c}} \left[ \ell(f_{\theta}(x), y) \right] 
		- \E_{(x,v) \sim \widehat{D}_{b}} \left[ \ell(f_{\theta}(x), y) \right] 
		& \text{if } T_{te} \leq t < T
\end{cases}
$$
## Related

- [[Poisoning backdoor attack]]
