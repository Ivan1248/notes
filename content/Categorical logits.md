#definition

Let $p\colon \{1,\bidot K\} \to (0\bidot 1): i\mapsto p_{i}$ be the probability function of a categorical distribution.
A set $S = \{ s_{i} \}_{i=1\bidot K}\subset \R$ is a set of categorical logits if
$$
\forall i\in \{1,\bidot K\}\colon p_{i} = \frac{\exp(s_{i})}{\sum_{j=1}^K \exp(s_j)} \text.
$$
## Notes

If $S$ is a set of categorical logits of a probability function $p$, then any set of logits can be expressed as $\{s+d: s\in S\}$, where $d\in\R$.