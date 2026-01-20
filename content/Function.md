---
aliases:
  - Mapping
  - Graph of a function
---
A **function** $f$ from $X$ to $Y$ is a [[Set|set]] $f\subset X\times Y$ such that
$$
\forall (x,y)\in f\colon \not\exists(x',y')\in f\colon x=x' \land y\neq y' 
$$
and $$  
\forall x\in X\colon \exists y\in Y\colon (x,y) \in f \text.
$$

$X \times Y$ denotes the [[Cartesian product]] of sets $X$ and $Y$.

## Notation

**Function application notation.** Let $x\in X$. We use $f(x)$ to denote the (only) $y\in Y$ such that $(x,y)\in f$. If $x\not\in X$, the expression $f(x)$ has no meaning.

**Function definition notation.** A shorthand notation for "a function $f\colon X\to Y$ such that $\forall x\in X\colon f(x)=g(x)$" is $f=x\mapsto g(x)\colon X\to Y$.

| Notation                       | Definition                                                          |
| ------------------------------ | ------------------------------------------------------------------- |
| $f(x)$                         | the $y$ such that $(x,y)\in f$                                      |
| $X\to Y$                       | the **set of all functions from $X$ to $Y$**                        |
| $Y^X$                          | $X\to Y$                                                            |
| $f\colon X\to Y$               | $f$ is a function from $X$ to $Y$: $\forall x\in X\colon f(x)\in Y$ |
| $f\in X\to Y$                  | $f\colon X\to Y$                                                    |
| $f=x\mapsto g(x)\colon X\to Y$ | $f\colon X\to Y$ and $\forall x\in X\colon f(x)=g(x)$               |
| $f=x\mapsto g(x)$              | $\forall x\in \dom(f)\colon f(x)=g(x)$                              |
| $f=(x\in X)\mapsto g(x)$       | $\forall x\in X\colon f(x)=g(x)$                                    |
| $f=g(\cdot)$                   | $f=g$                                                               |
| $f=g(\cdot, \cdot, .., \cdot)$ | $f=g$                                                               |

## Notes

By this definition, there is no difference between a function and the graph of a function.

### Domain, image, and codomains

Let $f\colon X\to Y$. The [[Domain of a function|domain]] of $f$ is $\dom(f) = X$. The [[Image of a function|image]] (or range) of $f$ is $\operatorname{im}(f) \subseteq Y$. All sets $Y \supseteq \operatorname{im}(f)$ are [[Codomains of a function|codomains]] of $f$.  

Note that according to a [common definition](https://www.proofwiki.org/wiki/Definition:Mapping), a function has a single codomain.

### Meaning of the $f(x)$ notation

If we alternatively define $f(x)$ as $\bigcup \{y\colon(x,y)\in f\}$. Then, if $x\not\in \dom(f)$,
$$
f(x)=\bigcup \{\} = \{\}
$$
even though $(x, \{\}) \not\in f$.

## Related

- [[Relation]]
- [[Set operations]]
- [[Mapping restriction]]
- [[Set of functions]]
