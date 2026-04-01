The **information content** of a probability $p$ is  
$$\h(p)=-\ln(p) \unit{nat} \text.$$  
Defining $\unit{nat} = 1$,  
$$\h(p)=-\ln(p) \text.$$

## Alternative definition

**Information content** $\h$ satisfies the following properties:
1. It has value 0 for a [[Event (probability theory)|certain event]]:  $P(E)=1 \iff \h(P(E))=0$.
2. It is larger for events with smaller [[Probability|probability]]: $P(E)<P(F) \iff \h(P(E))>\h(P(F))$.
3. The information content of the conjunction of [[Event (probability theory)|independent events]] is the sum of their information contents: $E \perp F \iff \h(P(E\cap F))=\h(P(E))+\h(P(F))$.

These properties are satisfied by functions of the form  
$$
\h(P(E))=-\log_b P(E),\quad b\in(1,\infty) \text,
$$
which differ only by a scaling factor. The most commonly chosen bases are $b=2$ ([[Units of information|unit]] $\unit{bit}$) and $b=e$ (unit $\unit{nat}=\ln(2)\unit{bit}$). Here we use base $e$, which is standard in machine learning, and therefore define $\unit{nat}=1$.

## Notes

Information content can take values from $0$ (when $p=1$) to $\infty$ (when $p=0$).

We can always find out whether an event with probability $p$ happened by obtaining answers to $\lceil-\log_2(p)\rceil$ binary (yes/no) questions.

Information content can be useful as a measure of unexpectedness of a potential outcome, or of prediction error.

## Related

- [[Probability]]
- [[Units of information]]
