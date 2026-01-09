Possible properties of the attack:
- Triggers are easy to learn.
	- They are learned earlier in the training ([[Notes on Anti-Backdoor Learning]]).


		- Is it necessarily so? Can some patterns become very easy to learn later in training?
	- Triggers are strong features ([[Notes on Rethinking Backdoor Attacks]]).


	- Triggers generalize.
		- Common with clean features.
- The proportion (number) of poisoned examples is small.
- Poisoned examples hard to notice by humans.

Desirable attack properties:
- The attack must be more successful: predictions on unseen examples with triggers should match the target label.
- The attack should have a lesser impact on the performance on clean examples.
- The attack must be stealthy – it should be more difficult for humans to notice poisoned examples.
    - It should be harder for humans to recognize poisoned examples.
    - There should be as few poisoned examples as possible.
- The attack should be easier to implement in practice.

Attack objectives:
- Classification:
    - Misclassify any class with a trigger as a specific target class.
    - Classify a specific class with a trigger as a specific target class.
    - Classify a specific class with triggers into any other target class, regardless of which one.
        - Easier to achieve if the target class doesn't matter.
        - Example: there could be a "natural" trigger: the presence of a tennis ball in ImageNet turns any class into the tennis ball class.