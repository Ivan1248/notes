
- [\[2106.15023\] Evading Adversarial Example Detection Defenses with Orthogonal Projected Gradient Descent](https://arxiv.org/abs/2106.15023)  
>$$
L_{\mathrm{update}}(x,t) =  
\begin{cases}  
\nabla L(f,x,t) - \mathrm{proj}_{\nabla L(f,x,t)} \nabla g(x), & \text{if } f(x) \neq t, \\  
\nabla g(x) - \mathrm{proj}_{\nabla g(x)} \nabla L(f,x,t), & \text{if } f(x) = t  
\end{cases} \text.$$
