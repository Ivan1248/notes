#representation-learning #self-supervised-learning 

[A Simple Framework for Contrastive Learning of Visual Representations](https://arxiv.org/abs/2002.05709)

Components:
- Perturbations. Example: random cropping followed by resize back to the original size, random color distortions, random Gaussian blur
- The base encoder $f$ extracts representation vectors $\v h$ from augmented data examples. Example ResNet up to (including) the average pooling.
- A projection head $g$ that outputs representation vectors $\v z$ for the contrastive loss. Example: $z=g(\v h) = \v W_2 \ReLU(\v W_1\v h)$.
- A contrastive loss function.

>We randomly sample a minibatch of $N$ examples and define the contrastive prediction task on pairs of augmented examples derived from the minibatch, resulting in $2N$ data points. We do not sample negative examples explicitly. Instead, given a positive pair, similar to (Chen et al., 2017), we treat the other $2(N − 1)$ augmented examples within a minibatch as negative examples. Let $\mathit{sim}(u, v) = \frac{\v u^\transpose \v v}{\lVert \v u\rVert \lVert\v v\rVert}$ denote the cosine similarity between representations of 2 inputs. Then the loss function for a positive pair of examples $(i, j)$ is defined as

$$
\ell_{i,j} = - \ln\frac{\exp(\mathit{sim}(\v z_i, \v z_j))}{\sum_{k\in \{1\bidot 2N\}\setminus\{i\}} \exp(\mathit{sim}(\v z_i, \v z_k))} \text. 
$$
>This loss has been used in previous work (Sohn, 2016; Wu et al., 2018; Oord et al., 2018) \[...]
