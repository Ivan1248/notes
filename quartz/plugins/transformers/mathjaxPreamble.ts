import { QuartzTransformerPlugin } from "../types"
import { readFileSync } from "fs"
import { join } from "path"

interface MacroDefinition {
  [key: string]: string | [string, number] | [string, number, string]
}

/**
 * Parses a LaTeX preamble file and extracts macro definitions
 * that can be used with MathJax.
 */
export function parsePreambleMacros(preamblePath?: string): MacroDefinition {
  const path = preamblePath ?? join(process.cwd(), 'content', 'preamble.sty')
  let content: string
  try {
    content = readFileSync(path, 'utf-8')
  } catch (e) {
    console.warn(`[MathJaxPreamble] Could not read preamble file at ${path}: ${e}`)
    return {}
  }

  // 1. Strip comments line by line
  const lines = content.split(/\r?\n/)
  const strippedLines = lines.map(line => {
    // Replace % unless preceded by \
    const commentMatch = line.match(/(?<!\\)%/)
    if (commentMatch) {
      return line.slice(0, commentMatch.index)
    }
    return line
  })
  const strippedContent = strippedLines.join('\n')

  const macros: MacroDefinition = {}

  // 2. Define a combined regex to find all macro-defining commands in order
  const combinedRegex = /\\(?:re)?newcommand\*?\{?\\([a-zA-Z]+)\}?(?:\[(\d+)\])?(?:\[([^\]]*)\])?\{|\\DeclareMathOperator\*?\{?\\([a-zA-Z]+)\}?\{([^}]*)\}|\\let\\([a-zA-Z]+)\\?([a-zA-Z]+|[^a-zA-Z\s])/g

  let match: RegExpExecArray | null
  while ((match = combinedRegex.exec(strippedContent)) !== null) {
    if (match[1]) {
      // It's a newcommand/renewcommand
      const name = match[1]
      const numArgs = match[2] ? parseInt(match[2], 10) : 0
      const defaultValue = match[3]

      // Extract braced definition
      let bracketCount = 1
      let i = match.index + match[0].length
      let start = i
      while (bracketCount > 0 && i < strippedContent.length) {
        if (strippedContent[i] === '{' && (i === 0 || strippedContent[i - 1] !== '\\')) bracketCount++
        else if (strippedContent[i] === '}' && (i === 0 || strippedContent[i - 1] !== '\\')) bracketCount--
        i++
      }
      const definition = strippedContent.slice(start, i - 1)

      if (numArgs > 0) {
        if (defaultValue !== undefined) {
          macros[name] = [definition, numArgs, defaultValue]
        } else {
          macros[name] = [definition, numArgs]
        }
      } else {
        macros[name] = definition
      }

      // Update regex index to skip the definition we just parsed
      combinedRegex.lastIndex = i
    } else if (match[4]) {
      // It's a DeclareMathOperator
      const name = match[4]
      const text = match[5]
      macros[name] = `\\operatorname{${text}}`
    } else if (match[6]) {
      // It's a let
      const newName = match[6]
      const oldName = match[7]
      // Use definition from existing macros if available, otherwise use original name
      if (macros[oldName]) {
        macros[newName] = macros[oldName]
      } else {
        macros[newName] = `\\${oldName}`
      }
    }
  }

  console.log(`[MathJaxPreamble] Parsed ${Object.keys(macros).length} macros from preamble`)
  return macros
}

/**
 * Get parsed macros from the default preamble location.
 */
export const preambleMacros = parsePreambleMacros()

/**
 * MathJaxPreamble plugin
 */
export const MathJaxPreamble: QuartzTransformerPlugin = () => {
  return {
    name: "MathJaxPreamble",
  }
}