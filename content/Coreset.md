Let $L$ be a [[Machine learning algorithm|machine learning algorithm]].  
Let $D$ be [[Training data|training data]] for $L$.  
Let $E$ be an [[Machine learning evaluator|evaluator]] such that $L(D)\in\dom(E)$.

An $n$-coreset (coreset of size $n$) of $(L, D, E)$ is a [[Set|set]]
$$  
C\in \argmax_{S : S\subseteq D \land \lvert S\rvert = n} E(L(D)) \text.
$$

## Notation

- [[Argmax]]
