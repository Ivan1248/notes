#theorem #classification

Let (logits) $s_i \in \R$,  $i\in\{1\bidot K\}$.  

Let (probabilities) $p_i=\frac{\exp(s_{i})}{\sum_{j=1}^K \exp(s_{j})}$ , $i\in\{1\bidot K\}$.  

Then,




$$
\begin{align}
    \forall i, k\in\{1\bidot K\} \colon \ln\left(\frac{p_{i}}{p_{k}}\right) = s_{i} - s_{k} \text{.}
\end{align}
$$
_Proof:_


$$
\begin{align}
    \ln\left(\frac{p_{i}}{p_{k}}\right) &= \ln(p_{i}) - \ln(p_{k}) \\
    &= \ln\frac{\exp(s_{i})}{\sum_{j} \exp(s_{j})} - \ln \frac{\exp(s_{k})}{\sum_{j} \exp(s_{j})} \\
    &= \ln \exp(s_{i}) - \ln \exp(s_{k}) \\
    &= s_{i} - s_{k} \text{.}
\end{align}
$$
