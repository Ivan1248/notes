---
aliases:
  - GSSD
---
Assumptions or empirical observations about attacks:
- There are 2 kinds of poisoning with respect to self-supervised representations depending on the attack and learning algorithm:
	- Non-disruptive poisoning – representations of backdoor examples are similar to their original class.
	- Disruptive poisoning – representations of backdoor examples are far from all clean examples.

Defense steps overview:
1. Learn self-supervised representations based on the training dataset without labels (e.g. 100 epochs).
2. Learn per-class densities of self-supervised features.
3. Identify target classes based on the following:
	- Non-disruptively poisoned examples have increased densities of foreign-class representations under the target class.
	- Disruptively poisoned examples have very low densities under all foreign classes.
4. Identify backdoor examples based on ratio of densities under their class and the highest-density class among foreign classes, which is either very low or very high depending on the identified kind of poisoning.
5. Relabel identified backdoor examples and train the classifier.

---

## Video

---

### Poisoning backdoor attacks (1, 15/15)

Our paper investigates **defending against backdoor attacks based on data poisoning**.

A clean training dataset might look like this. It contains images labeled as "stop sign" or "priority-road sign".

![[clean-data.svg]]

---

### Poisoning backdoor attacks (2, 15/30)

One kind of backdoor attack poisons the dataset by adding a **trigger** to the input and changing the label of some examples the **target class**.

Here, the target class is "priority-road sign".

![[poisoned-data.svg]]

---

### Poisoning backdoor attacks (3, 20/40)

Training on such a dataset produces a backdoored classifier that associates triggered test inputs with the target class.

![[poisoned-data.svg]]

![[backdoored-model-testing.svg]]

---

We observe that images with stealthy triggers look much more similar to their **original class** than to the **target class**.

---

### Step 1: self-supervised representations (2, 10/60)

Therefore, as the first step of our defense, we obtain **label-agnostic** representations od training images by training a **self-supervised feature extractor**.

![simclr-visualization](https://miro.medium.com/v2/resize:fit:1400/1*3DFc-9mSB_G5euEqL0p04g.png)

---

### Step 1: self-supervised representations (3, 20/80)

We empirically observe 2 kinds of poisoning with respect to the self-supervised representations:
- One kind is **non-disruptive poisoning**, where representations of backdoor examples are inside clusters of their original class.
- The other kind is **disruptive poisoning**, where representations of backdoor examples are far from all clean examples.

![[Pasted image 20241030173401.png]]  

---

### Step 2: per-class feature densities of training examples (1, 15/95)

As the next step towards identifying backdoor examples, we train per-class normalizing flows densities to estimate **class-conditional densities** of **training examples**.

![[Pasted image 20241030215953.png]]

---

### Identification of target classes (1, 15/110)

We observe that, under **non-disruptive poisoning**, because backdoor examples are close to examples from their original class, the target class has **increased density in examples** from other classes.

![[Pasted image 20241030215953.png]]

---

### Identification of target classes (2, 15/125)

On the other hand, **disruptively poisoned examples** have **very low densities under every other class**.

![[Pasted image 20241030220054.png]]

Based on these observations, we identify the target classes and the kind of poisoning.

---

### Identification of backdoor examples (2, 20/145)

After this, we identify backdoor examples based on the **ratio of densities under their class and the highest-density other class**, which is either very low or very high **depending on the identified kind of poisoning**.

![[Pasted image 20241030221737.png]]  
![[Pasted image 20241030221751.png]]

---

### Re-labeling and supervised training (1, 5/150)

Finally, we **relabel the identified backdoor examples** and **train the classifier** from scratch in a supervised manner.

---

### Results (1, 20/170)

Our experiments show that the defense  works very well against a variety of attacks on standard classification datasets.

![[Pasted image 20241030221924.png]]

---

### Limitations and conclusion (1, 20/190)
