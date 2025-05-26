Let there be $n$ perfect logicians and a speaker. Each logician has a black dot on his forehead. Neither logician knows or senses whether he has the dot. Each logician can always only observe the following:  
	- see other logicians: whether they have the dot and whether they are sitting or standing up,  
	- hear the speaker speaking to all logicians and receive his signal.
It is [[Common knowledge|common knowledge]] that each logician is a perfect logician with the same constraints.

Initially, each logician is sitting. Then, the speaker (who is trusted) tells them that at least one logician has the dot. The speaker commands them to stand up on his signal if, at the moment of the signal, they are certain that they have the dot. The speaker gives this signal $n$ times, letting the logicians think between the signals.
## Case $n=2$

Each logician observes that the other logician has the dot thinks the following.
> At the first signal, the other logician will know that he has the dot and stand if and only if I don't have the dot.

At the first signal, each logician observes that the other logician does not stand up and concludes:
> Therefore, I have the dot and have to stand up at the next signal.

At the second signal, each logician stands up.

## Case $n=3$

Each logician observes that all other logicians have the dot and thinks the following.

> Each of the other logicians will stand up after $2$ signals (like in the case $n=2$) if and only if I don't have the dot.

After $2$ signals, each logician observes that nobody stands up and thinks the following.
> Therefore, I have the dot.

At the third signal, each logician stands up.

### General case $n=m$

Each logician observes that all other logicians have the dot and thinks the following.

> Each of the other logicians will stand up after $m-1$ signals (like in the case $n=m-1$) if and only if I don't have the dot.

After $m-1$ signals, each logician observes that nobody stands up and thinks the following.
> Therefore, I have the dot.

At the $m$-th signal, each logician stands up.

## Links:

- [Shtetl-Optimized » Blog Archive » Common Knowledge and Aumann’s Agreement Theorem](https://scottaaronson.blog/?p=2410)
- [Can you solve the famously difficult green-eyed logic puzzle? - Alex Gendler - YouTube](https://www.youtube.com/watch?v=98TQv5IAtY8)
- [Common Knowledge and Hats - YouTube](https://www.youtube.com/watch?v=tJjCbdOWXgM)
