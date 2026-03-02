---
tags:
creation date: 2026-02-09
---
How to set up suggestions and rendering of citations from a BibTeX file in Obsidian and Quartz like in LaTeX.

## Obsidian Pandoc Reference List plugin

The _Pandoc Reference List_ plugin has the following features:
1. It can render non-parenthesized and parenthesized citations depending on the citation style:
	- `@shannon48bstj` → @shannon48bstj
	- `[@shannon48bstj]` → [@shannon48bstj]
2. It can display formatted references in another pane and in a tooltip when hovering over a citation.  
3. It provides suggestions by searching identifiers as well as titles when entering a reference (starting with `@`).  

Configuration:
- "Fallback path to Pandoc" should be set to the path of the Pandoc executable.
- "Path to bibliography file" should be set to `/bibliography.bib` if the bibliography file is at the root of the vault.

> [!Example]
> ```
> @shannon48bstj [@shannon48bstj].
> ```
> is rendered as  
> @shannon48bstj [@shannon48bstj].

## Obsidian Citations plugin (optional)

The Citations plugin has a command "Insert markdown citation" which lets you choose and insert entries from the BibTeX file in the root of the vault if "Citation database path" setting is set to `bibliography.bib`. This feature is similar to the suggestions from the Pandoc Reference List plugin.

## Quartz: Citations plugin

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
