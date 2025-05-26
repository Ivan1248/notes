Let $p\in[0\bidot 1]$. Let $L,M,N\colon X\to\R_{\geq 0}$ be [[Lottery|lotteries]]. Expressions of the form $N = (1-p) L + p M$ denote that $N(x) = (1-p)L(x) + p M(x)$.

A **Von Neumann–Morgenstern agent** (VNM agent) satisfies the following:
1. (Completeness) For any [[Lottery|lotteries]] $L$, $M$, $$L\succeq M \lor M \succeq L \text.$$
2. (Transitivity) For any [[Lottery|lotteries]] $L$, $M$, $N$, $$L\succeq M \wedge M\succeq N \implies L\succeq N \text.$$
3. (Continuity) For any [[Lottery|lotteries]] $L$, $M$, $N$, if $L\prec M \prec N$, there exists an $\varepsilon \in (0\bidot 1)$ such that $$(1-\varepsilon)L+\varepsilon N \sim N \text.$$
4. (Independence) For any [[Lottery|lotteries]] $L$, $M$, $N$, and $p\in (0\bidot 1]$, $$L\preceq M \iff pL + (1-p)N \preceq pM + (1-p)N$$
