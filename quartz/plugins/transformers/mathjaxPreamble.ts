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
  const path = preamblePath ?? join(process.cwd(), "content", "preamble.sty")
  let content: string
  try {
    content = readFileSync(path, "utf-8")
  } catch (e) {
    console.warn(`[MathJaxPreamble] Could not read preamble file at ${path}: ${e}`)
    return {}
  }

  // 1. Strip comments line by line (ignoring escaped \%)
  const strippedContent = content
    .split(/\r?\n/)
    .map((line) => {
      const commentMatch = line.match(/(?<!\\)%/)
      return commentMatch ? line.slice(0, commentMatch.index) : line
    })
    .join("\n")

  const macros: MacroDefinition = {}

  /**
   * Helper to count braces and extract a balanced group.
   * Starts at the character following the opening brace.
   */
  const extractBalancedBraces = (str: string, startIndex: number): { content: string; endIndex: number } => {
    let braceCount = 1
    let i = startIndex
    while (braceCount > 0 && i < str.length) {
      if (str[i] === "{" && (i === 0 || str[i - 1] !== "\\")) braceCount++
      else if (str[i] === "}" && (i === 0 || str[i - 1] !== "\\")) braceCount--
      i++
    }
    return { content: str.slice(startIndex, i - 1), endIndex: i }
  }

  // 2. Combined regex for commands: \newcommand, \renewcommand, \DeclareMathOperator, \let
  const combinedRegex =
    /\\(?:re)?newcommand\*?\{?\\([a-zA-Z]+)\}?(?:\[(\d+)\])?(?:\[([^\]]*)\])?\{|\\DeclareMathOperator\*?\{?\\([a-zA-Z]+)\}?\{|\\let\\([a-zA-Z]+)\\?([a-zA-Z]+|[^a-zA-Z\s])/g

  let match: RegExpExecArray | null
  while ((match = combinedRegex.exec(strippedContent)) !== null) {
    const [, newCmdName, newCmdArgs, newCmdOpt, opName, letNew, letOld] = match

    if (newCmdName) {
      // It's a \newcommand or \renewcommand
      const { content: definition, endIndex } = extractBalancedBraces(strippedContent, combinedRegex.lastIndex)
      const numArgs = newCmdArgs ? parseInt(newCmdArgs, 10) : 0

      if (numArgs > 0) {
        macros[newCmdName] = newCmdOpt !== undefined ? [definition, numArgs, newCmdOpt] : [definition, numArgs]
      } else {
        macros[newCmdName] = definition
      }
      combinedRegex.lastIndex = endIndex
    } else if (opName) {
      // It's a \DeclareMathOperator
      const { content: opDef, endIndex } = extractBalancedBraces(strippedContent, combinedRegex.lastIndex)
      macros[opName] = `\\operatorname{${opDef}}`
      combinedRegex.lastIndex = endIndex
    } else if (letNew && letOld) {
      // It's a \let
      macros[letNew] = macros[letOld] ?? `\\${letOld}`
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