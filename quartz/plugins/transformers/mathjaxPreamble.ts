import { readFileSync } from "fs"
import { isMainThread } from "workerpool"

/**
 * A top-level definition from a LaTeX preamble, kept as source text so that it can be executed by
 * the math engine itself.
 */
export interface PreambleStatement {
  /** Definer without the backslash, e.g. "newcommand" or "let". */
  command: string
  /** Defined control sequence or environment name, without the backslash. */
  name: string
  /** The statement's source text with comments removed. */
  source: string
  /** 1-based line where the statement starts. */
  line: number
}

export interface Preamble {
  statements: PreambleStatement[]
  /** Top-level commands that are not definitions, with their number of occurrences. */
  skipped: Map<string, number>
  /** Places where the result differs from what LaTeX would do. */
  warnings: string[]
}

type Shape = "command" | "operator" | "let" | "def" | "environment"

const DEFINERS: Record<string, Shape> = {
  newcommand: "command",
  renewcommand: "command",
  DeclareMathOperator: "operator",
  let: "let",
  def: "def",
  newenvironment: "environment",
  renewenvironment: "environment",
}

class PreambleSyntaxError extends Error {}

/**
 * Splits a LaTeX preamble into its top-level definitions. Only the syntactic shape of each
 * definition is parsed: bodies are opaque balanced groups. Everything else at the top level, such
 * as \usepackage, is skipped.
 */
export function readPreamble(source: string): Preamble {
  const statements: PreambleStatement[] = []
  const skipped = new Map<string, number>()
  const warnings: string[] = []
  const definedAt = new Map<string, number>()
  let i = 0

  const lineAt = (pos: number) => source.slice(0, pos).split("\n").length

  const isLetter = (c: string) => /[a-zA-Z@]/.test(c)

  // Skips whitespace and comments. A comment also consumes the line break and the leading
  // whitespace of the next line, as in TeX.
  const skipSpace = () => {
    while (i < source.length) {
      if (/\s/.test(source[i])) i++
      else if (source[i] === "%") {
        while (i < source.length && source[i] !== "\n") i++
      } else break
    }
  }

  // Reads a control sequence name at a backslash.
  const readCs = (): string => {
    if (source[i] !== "\\") throw new PreambleSyntaxError("expected a control sequence")
    i++
    if (i >= source.length) throw new PreambleSyntaxError("unexpected end after \\")
    const start = i
    if (isLetter(source[i])) while (i < source.length && isLetter(source[i])) i++
    else i++
    return source.slice(start, i)
  }

  // Skips a balanced group that starts at `open` and returns its inner text. Braces inside an
  // optional argument are balanced too, so `]` inside `{...}` does not close it.
  const readGroup = (open: "{" | "[" = "{"): string => {
    const close = open === "{" ? "}" : "]"
    if (source[i] !== open) throw new PreambleSyntaxError(`expected ${open}`)
    const start = ++i
    let depth = 0
    while (i < source.length) {
      const c = source[i]
      if (c === "\\") {
        i += 2
        continue
      }
      if (c === "%") {
        while (i < source.length && source[i] !== "\n") i++
        continue
      }
      if (c === close && depth === 0) return source.slice(start, i++)
      if (c === "{") depth++
      else if (c === "}") {
        if (depth === 0) throw new PreambleSyntaxError("unbalanced }")
        depth--
      }
      i++
    }
    throw new PreambleSyntaxError(`missing ${close}`)
  }

  const readOptional = () => {
    skipSpace()
    if (source[i] === "[") readGroup("[")
  }

  const readStar = () => {
    if (source[i] === "*") i++
  }

  // Reads a defined name given as \name or {\name}.
  const readDefinedCs = (): string => {
    skipSpace()
    if (source[i] !== "{") return readCs()
    i++
    skipSpace()
    const name = readCs()
    skipSpace()
    if (source[i] !== "}") throw new PreambleSyntaxError("expected } after the name")
    i++
    return name
  }

  const readBody = () => {
    skipSpace()
    readGroup()
  }

  // Parses the arguments of a definer and returns the defined name and, for \let, the token that
  // gives the name its meaning.
  const readDefinition = (shape: Shape): { name: string; letTarget?: string } => {
    switch (shape) {
      case "command": {
        readStar()
        const name = readDefinedCs()
        readOptional()
        readOptional()
        readBody()
        return { name }
      }
      case "operator": {
        readStar()
        const name = readDefinedCs()
        readBody()
        return { name }
      }
      case "let": {
        skipSpace()
        const name = readCs()
        skipSpace()
        if (source[i] === "=") i++
        skipSpace()
        if (i >= source.length) throw new PreambleSyntaxError("missing the token after \\let")
        const letTarget = source[i] === "\\" ? readCs() : source[i++]
        return { name, letTarget }
      }
      case "def": {
        skipSpace()
        const name = readCs()
        while (i < source.length && source[i] !== "{") i++
        readGroup()
        return { name }
      }
      case "environment": {
        readStar()
        skipSpace()
        const name = readGroup().trim()
        readOptional()
        readOptional()
        readBody()
        readBody()
        return { name }
      }
    }
  }

  while (i < source.length) {
    skipSpace()
    if (i >= source.length) break
    const start = i
    const c = source[i]

    if (c === "{") {
      readGroup()
      continue
    }
    if (c !== "\\") {
      i++
      continue
    }

    const command = readCs()
    const shape = DEFINERS[command]
    if (!shape) {
      skipped.set(command, (skipped.get(command) ?? 0) + 1)
      continue
    }

    const line = lineAt(start)
    let name: string
    let letTarget: string | undefined
    try {
      ;({ name, letTarget } = readDefinition(shape))
    } catch (err) {
      if (!(err instanceof PreambleSyntaxError)) throw err
      warnings.push(`line ${line}: could not read \\${command}: ${err.message}`)
      continue
    }

    if (command === "newcommand" || command === "newenvironment") {
      const previous = definedAt.get(name)
      if (previous !== undefined) {
        warnings.push(
          `line ${line}: \\${command} redefines ${name} from line ${previous}; LaTeX keeps the first definition, MathJax the last`,
        )
      }
    }
    if (letTarget === "relax") {
      // \let\x\relax makes \x undefined for \newcommand.
      definedAt.delete(name)
    } else {
      definedAt.set(name, line)
    }

    let text = stripComments(source.slice(start, i))
    // The star of \newcommand* and \newenvironment* only forbids paragraph breaks in arguments,
    // and MathJax does not accept it.
    if (shape === "command" || shape === "environment")
      text = text.replace(/^(\\[a-zA-Z]+)\*/, "$1")
    statements.push({ command, name, source: text, line })
  }

  return { statements, skipped, warnings }
}

/**
 * Removes comments. A comment also removes the line break and the leading whitespace of the next
 * line, as in TeX.
 */
export function stripComments(text: string): string {
  let result = ""
  let i = 0
  while (i < text.length) {
    const c = text[i]
    if (c === "\\") {
      result += text.slice(i, i + 2)
      i += 2
    } else if (c === "%") {
      while (i < text.length && text[i] !== "\n") i++
      i++
      while (i < text.length && (text[i] === " " || text[i] === "\t")) i++
    } else {
      result += c
      i++
    }
  }
  return result
}

/**
 * Reads the preamble file and logs a summary. Returns no statements if the file cannot be read.
 */
export function loadPreamble(path: string): PreambleStatement[] {
  let source: string
  try {
    source = readFileSync(path, "utf-8")
  } catch (e) {
    console.warn(`[MathJaxPreamble] Could not read preamble file at ${path}: ${e}`)
    return []
  }

  const { statements, skipped, warnings } = readPreamble(source)
  // Every parser worker loads the config too; report only once.
  if (!isMainThread) return statements

  const skippedList = [...skipped].map(([cs, n]) => (n > 1 ? `\\${cs} ×${n}` : `\\${cs}`))
  console.log(
    `[MathJaxPreamble] Read ${statements.length} definitions from ${path}` +
      (skippedList.length > 0 ? `; skipped ${skippedList.join(", ")}` : ""),
  )
  for (const warning of warnings) console.warn(`[MathJaxPreamble] ${warning}`)
  return statements
}
