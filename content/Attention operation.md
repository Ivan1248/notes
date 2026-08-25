An **attention operation** is a [[Function|function]] that is isomorphic to a function $f\colon \R^m\to\R^n$ that can be expressed as follows:
$$
f(\v x) = f_g(f_1(\v x)\odot f_2(\v x), f_3(\v x)) \text,
$$
where, $f_1, f_2 \colon \R^m\to \R^k$,  $f_3 \colon \R^m\to \R^l$, and $f_4 \colon \R^k\times\R^l\to \R^n$.

## Notation

- $\odot$ denotes the [[Element-wise multiplication|element-wise multiplication operator]].

## Related

- [[Transformer attention]]
