#### [Reward is not Enough](https://www.lesswrong.com/posts/frApEhpyKQAcFvbXJ/reward-is-not-enough)

>Well, we want to train the bird to sing the song correctly. So it’s easy: the bird practices singing, and it listens to its own song using the song-assessing black box, and it does RL using the rule:
>
>> _The better the song sounds, the higher the reward_.
>
>Oh wait. The bird is also deciding how much time to spend practicing singing, versus foraging or whatever. And the _worse_ it sings, the _more_ important it is to practice! So you _really_ want the rule:
>
>> _The worse the song sounds, the more rewarding it is to practice singing_.
>
>Uh oh.
>
>How do you resolve this conflict? 
>
>[...]
>
>One part of the bird brain is “deciding” which low-level motor commands to execute during the song, and another part of the bird brain is “deciding” whether to spend time practicing singing, versus foraging or whatever else. _These two areas don’t need the same reward signal!_ So for the former area, you send a signal: “the better the song sounds, the higher the reward”. For the latter area, you send a signal: “the worse the song sounds, the more rewarding it feels to spend time practicing”.
>
>...And that’s exactly the solution that evolution discovered! See the discussion and excerpt from [Fee & Goldberg 2011](https://doi.org/10.1016/j.neuroscience.2011.09.069) in my post [Big picture of phasic dopamine](https://www.lesswrong.com/posts/jrewt3rLFiKWrKuyZ/big-picture-of-phasic-dopamine).