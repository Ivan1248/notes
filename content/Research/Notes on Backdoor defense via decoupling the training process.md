Assumptions about attacks:

- Backdoor examples have similar self-supervised (SimCLR) representations to clean examples from their original class.



Defense steps overview:

1. Learn self-supervised representations based on the training dataset without labels (e.g. 100 epochs).

2. Train a supervised classifier head (a fully connected layer) on the self-supervised representations with labels. [[Notes on Symmetric cross entropy for robust learning with noisy labels|Symmetric cross entropy]] works better for separating backdoor examples from clean ones based on the loss value (e.g. 10 epochs).

3. The training set is split into 2 parts (of equal size) based on the loss value. The low-loss part is used as the labeled training set, and the high-loss part is used as the unlabeled training set for semi-supervised learning.

4. Training of all parameters (SimCLR-pre-trained feature extractor and the classifier head) is then continued in a self-supervised manner (MixMatch) on datasets from the previous step (e.g. 100 epochs).



## Quotes


>We first learn the purified feature extractor via self-supervised learning (Kolesnikov et al., 2019; Chen et al., 2020a; Jing & Tian, 2020) with unlabeled training samples (obtained by removing their labels), and then learn the simple classifier via standard supervised training process based on the learned feature extractor and all training samples.


>The strong data augmentations involved in the self-supervised learning damage trigger patterns, making them unlearnable during representation learning; and the decoupling process further disconnects trigger patterns and the target label.

>Specifically, the poisoned sample lies closely to samples with its ground-truth label instead of the target label. This phenomenon makes the training of the simple classifier similar to label-noise learning (Wang et al., 2019b; Ma et al., 2020; Berthon et al., 2021). As such, we first filter high-credible training samples (i:e:, training samples that are most probably to be benign) and then use those samples as labeled samples and the remaining part to form unlabeled samples to fine-tune the whole model via semi-supervised learning (Rasmus et al., 2015; Berthelot et al., 2019; Sohn et al., 2020).

## Related


- [[Notes on Anti-Backdoor Learning]]

