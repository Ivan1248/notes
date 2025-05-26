[Revisiting Methods for Finding Influential Examples](https://arxiv.org/abs/2111.04683) by Karthikeyan and Søgaard (2021).

## Instability of Influence Methods

> \[...\] the above methods are far from robust, but in fact very sensitive to random seeds, random orderings, and different batch sizes.

> For each of the test examples, we then compute influence score for all training examples relative to two models trained with different initializations, orderings or batch sizes. For such pairs of models, we calculate the correlation metrics \[...\] between the two sets of influence scores.

[[Notes on Estimating Training Data Influence by Tracing Gradient Descent#TracInCP|TracInCP]] is more robust (Spearman correlation about 0.9) than [[Notes on Estimating Training Data Influence by Tracing Gradient Descent#TracInIdeal|TracInIdeal]] (0.56), influence functions (0.03), and leave-one-out (0.07).

> \[...] among all the metrics, LOO influence and influence functions (IFs) are least stable.

> TraceInIdeal is more sensitive to random ordering than TraceInCP. This is expected, because TraceInIdeal is calculated by monitoring how the model changes after each training step, whereas TraceInCP relies only on checkpoints after each epoch.

> The least sensitive methods – RPS and the two heuristics – are also the worst-performing methods in our downstream experiments below.

## Rethinking influence

### Influence scores are non-trivially dependent on each other

> \[...] there is no guarantee that the data with high influence scores is useful in the context of a new model, trained on a subset of the original data.

### Influence scores are not independent on model state

> If the model’s prediction on a test example changes, then influence scores should also change. Influence scores in this sense depend on the final model state, but in another sense, the historical influence of a training example also depends on whether the example led to significant model updates in earlier iterations. Influence scores do not take this sensitivity into account, and the methods that are based on training checkpoints (TraceInIdeal and TraceInCP) do not sample from the space of model states, but rely solely on the states observed during training.

> When we update the model from a state $W_t$ to $W_{t+1}$, due to a SGD step on example $x_\text{train}$, we measure the change in loss on the test example $x_\text{test}$. TraceinIdeal, gives the entire credit for the change in loss to $x_\text{train}$. However, the loss is a product, not only of $x_\text{train}$, but of $x_\text{train}$ and the current model state. Therefore, the change in loss on $x_\text{test}$ should be defined as influence of $x_\text{train}$ on $x_\text{test}$, given state $W_t$:  
> \[...]

### Why leave-one-out is therefore not a gold standard

### Why the Hanawa et al. (2021) heuristics are also misleading

> **Definition 0.8** (The identical instance test). Assume the test example, $x_\text{test}$ is a copy of a train example $x_\text{train}$, and if the model predicts correctly on $x_\text{test}$, then the most influential training example should be $x_\text{train}$ itself.

The paper argues that this assumption is invalid generally:
> \[...] The argument here is similar to that for SVM-like models – support vectors are generally more influential than the data points away from the decision boundary or hyperplane.

>**Definition 0.9** (Identical class test). If the model predicts class $y$ on the test example $x_\text{train}$, then the most influential training example should belong to class $y$.

The paper argues against this assumption as well, but I don't find it clear:
> Here, it is the consistent association of a pattern with one class (A) that is important also for classifying members of the other class (B). Members of class A and B are equally important for deriving this rule.

The argument seems intuitively correct if _most influential_ refers to _highest in absolute value of the influence_.

## How to Improve Influence Methods

>However, the conditional (on state) influence scores may not be a reliable metric, a better metric would be to find expected influence score (expectation over state).

## Detecting Poisoned Training Examples as an Evaluation Metric

> In the backdoor poisoning, we add a trigger or poison signature to a small portion of training examples from class A and relabel them as class B; then we train the model using this poisoned training data. Now, assume our model learns to predict a poisoned test example as class B. Then, the most influential training examples should be poisoned training examples.

> For each of the test examples, we calculate the average expected influence of poisoned training examples, clean training examples of class 0 and 1, and then we average the scores across all the 100 test examples. Finally, we L1- normalize the three scores and plot them \[...].

> From Figure 3, we can see that, on MNIST, all the expected influence scores are able to identify poisoned training examples. However, on Co-MNIST, only TraceinIdeal, TraceinCP and Grad-Cos were able to detect poisoned training examples.
