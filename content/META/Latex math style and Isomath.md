---
date: 2024-09-27
---
`preamble.sty` defines the math style. It requires the `isomath` package to make uppercase Greek letters consistent with Latin letters.

However, MathJax does not support `isomath`. Therefore, the default style of uppercase Greek letters in math mode is upright (e.g. $\Omega$,$\Pi$) by default instead of italic ($\varOmega$,$\varPi$), which is default for Latin and lowercase Greek letters.

If MathJax adds support for `isomath`, Greek letters will become consistent with Latin letters.
