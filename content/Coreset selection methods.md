---
tags:
  - todo/finish
creation date: 2025-06-17
---
[\[2107.07075\] Deep Learning on a Data Diet: Finding Important Examples Early in Training](https://arxiv.org/abs/2107.07075)
- El2N is the expected (over training runs) L2 norm of difference between predicted probabilities and one-hot targets.
- EL2N approximates the expected loss gradient norm (GraNd score). Works better for coreset selection.
- Highest scoring examples are included in the coreset.
- The highest scoring examples in the coreset are mislabeled. Excluding them improves training performance. 