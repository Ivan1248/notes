## 5-2025

### [Editing Models with Task Arithmetic](https://arxiv.org/abs/2212.04089) (2022)

A task vector is the difference between the original parameters and the fine-tuned parameters.

In comparison to learning to perform badly at a task, subtracting the task vector reduces only the performance on the target tasks, while the performance on other tasks is not affected much.

## 1-2025

### [Beyond neural scaling laws: beating power law scaling via data pruning](https://arxiv.org/abs/2206.14486)

Sorscher et al. (2022)

From [arimorcos](https://www.reddit.com/r/MachineLearning/comments/w3w8lh/r_beyond_neural_scaling_laws_beating_power_law/ih35t0n/) (an author):
> One of the main takeaways of the theory is that for small datasets, it's better to keep the easy examples, whereas for large datasets, it's better to keep hard examples. The crossover point will depend on how complex the dataset and downstream task is.

>  Briefly, we use a pre-trained SwAV model, cluster the embeddings of the data, and consider the ranking score as the distance to nearest centroid. Hence, we remove the most prototypical examples.

### [Attribution-based parameter decomposition — LessWrong](https://www.lesswrong.com/posts/EPefYWjuHNcNH4C7E/attribution-based-parameter-decomposition)

> We aim to minimise the sum of the ranks of all the matrices in active components $\sum_i\operatorname{rank}(P_{c, i})$ as a proxy of description length. In practice we use the '[Schatten quasi-norm](https://en.wikipedia.org/wiki/Schatten_norm)' (which is just the Lp norm of a matrices' singular values) to optimize that objective.

> [This is a standard trick in low-rank optimisation](https://arxiv.org/abs/2010.13927). It's somewhat analogous to how penalising the $L^p$ pseudonorm with p∈(0,1] of activations in an SAE can do an alright job at optimising for low $L^0$.

### [Corrective Machine Unlearning](https://arxiv.org/abs/2402.14015)  

(emphasis mine)
> We find most existing unlearning methods, including **retraining-from-scratch** without the deletion set, **require most of the manipulated data to be identified for effective corrective unlearning**. However, one approach, Selective Synaptic Dampening, achieves limited success, **unlearning adverse effects with just a small portion of the manipulated samples** in our setting \[...\] \[emphasis added\]
