---
tags:
creation date: 2026-02-09
---

## In Obsidian: Pandoc Reference List

The _Pandoc Reference List_ plugin has the following features:
1. It renders citations depending on the citation style:
	- `@he15cvpr` → @he15cvpr
	- `[@he15cvpr]` → [@he15cvpr]
2. It can displays formatted references in another pane and in a tooltip when hovering over a citation.  
3. It provides suggestions by searching identifiers as well as titles when entering a reference (starting with `@`).  

Configuration:
- "Fallback path to Pandoc" should be set to the path to the Pandoc executable.
- "Path to bibliography file" should be set to `/bibliography.bib` if the bibliography file is at the root of the vault.

> [!Example]
> ```
> @he15cvpr describes ResNets [@he15cvpr].
> ```
> is rendered as  
> @he15cvpr describes ResNets [@he15cvpr].

(There is also the _Citations_ plugin, which has the command "Insert markdown citation" which lets you choose and insert entries from the BibTeX file in the root of the vault. The "Citation database path" setting is set to `bibliography.bib`.)

## In Quartz (v4): Citations

Configure the _Citations_ plugin adding it to the `plugins.transformers` list:
```ts
const config: QuartzConfig = {
  // ...
  plugins: {
    transformers: [
      // ...
      Plugin.Citations({ bibliographyFile: "./content/bibliography.bib", linkCitations: true, csl: "apa" }),
    ],
    // ...
  },
}
```

## References

<?-- References are inserted here by the Citations plugin in Quartz. -->
