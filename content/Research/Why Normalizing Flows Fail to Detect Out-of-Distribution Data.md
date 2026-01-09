https://arxiv.org/abs/2006.08545

## 4 Why flows fail to detect OOD data

>The maximum likelihood objective has a limited influence on OOD detection, relative to the inductive biases of the flow, captured by the modelling assumptions of the architecture.

## 5 Flow latent spaces

>**Observation:** There exists a correspondence between the coordinates in an image and in its learned representation. We can recognize edges of the inputs in their latent representations. 
>**Significance for OOD detection:** In order to detect OOD images, a model has to assign likelihood based on the semantic content of the image (see Sec. 4). Flows do not represent images based on their semantic contents, but rather directly encode their visual appearance.

## 6 Transformations learned by coupling layers

>**Observation:** We describe two mechanisms through which coupling layers learn to predict the masked pixels: (1) leveraging local color correlations and (2) using information about the masked pixels encoded by the previous coupling layer (coupling layer co-adaptation). 
>**Significance for OOD detection:** These mechanisms allow the flows to predict the masked pixels equally accurately on in- and out-of-distribution datasets. As a result, flows assign high likelihood to OOD data.

>It is not possible for the st-network that was only trained on FashionMNIST to predict the top half of an MNIST digit based on the other half. The resolution is that the first layer encodes information about the top half into the bottom half of the image; the second layer then decodes this information to accurately predict the top half. Similarly, the third layer leverages information about the bottom half of the image encoded by the second layer. We refer to this phenomenon as **coupling layer co-adaptation**.

## 7 Changing biases in flows for better OOD detection

>By changing the masking strategy or the architecture of st-networks in flows we can improve OOD detection based on likelihood.

# 8 Out-of-distribution detection using image embeddings

>Normalizing flows can detect OOD images when trained on high-level semantic representations instead of raw pixels.

# Conclusion

>Many of the puzzling phenomena in deep learning can be boiled down to a matter of inductive biases. Neural networks in many cases have the flexibility to overfit datasets, but they do not because the biases of the architecture and training procedures can guide us towards reasonable solutions. In performing OOD detection, the biases of normalizing flows can be more of a curse than a blessing. Indeed, we have shown that flows tend to learn representations that achieve high likelihood through generic graphical features and local pixel correlations, rather than discovering semantic structure that would be specific to the training distribution.