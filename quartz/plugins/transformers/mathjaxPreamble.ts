import { QuartzTransformerPlugin } from "../types"
import { readFileSync } from "fs"
import { join } from "path"

export const MathJaxPreamble: QuartzTransformerPlugin = () => {
  // Read preamble file
  const preamblePath = join(process.cwd(), 'content', 'preamble.sty')
  const preamble = readFileSync(preamblePath, 'utf-8')

  // Create a script to load the preamble
  const preambleScript = `
window.MathJax = {
  tex: {
    inlineMath: [['$', '$']],
    displayMath: [['$$', '$$']],
    processEscapes: true,
    processEnvironments: true,
    packages: ['base', 'ams', 'noerrors', 'noundefined']
  },
  startup: {
    ready: () => {
      MathJax.startup.defaultReady();
      MathJax.tex2chtml('${preamble.replace(/'/g, "\\'")}');
    }
  }
};
`

  return {
    name: "MathJaxPreamble",
    externalResources: () => ({
      js: [
        {
          script: preambleScript,
          loadTime: "beforeDOMReady",
          contentType: "inline"
        }
      ]
    })
  }
} 