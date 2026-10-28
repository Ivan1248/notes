---
creation date: 2024-01-26
---

| fitting      | generalization                          | training performance | test performance | effect of training data on test data |
|--------------|-----------------------------------------|----------------------|------------------|--------------------------------------|
| underfitting | undergeneralization                     | bad                  | bad              | weak (low variance), wrong           |
| good fitting | good generalization                     | good                 | good             | good (low variance)                  |
| overfitting  | undergeneralization (pure memorization) | good                 | bad              | weak (low variance), wrong           |
| overfitting  | overgeneralization (hallucination)       | good                 | bad              | strong (high variance), wrong        |