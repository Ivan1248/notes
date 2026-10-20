import { Configuration } from "mathjax-full/js/input/tex/Configuration.js"
import ParseOptions from "mathjax-full/js/input/tex/ParseOptions.js"
import TexErrorModule from "mathjax-full/js/input/tex/TexError.js"
import TexParserModule from "mathjax-full/js/input/tex/TexParser.js"
import { PreambleStatement } from "./mathjaxPreamble"

// mathjax-full is CommonJS, so in Node's ESM interop its default exports arrive as `{ default }`.
const unwrapDefault = <T>(module: T): T => (module as { default?: T }).default ?? module
const TexError = unwrapDefault(TexErrorModule)
const TexParser = unwrapDefault(TexParserModule)

export const PREAMBLE_PACKAGE = "quartzpreamble"

export interface PreambleError {
  statement: PreambleStatement
  message: string
}

/**
 * Registers a MathJax TeX package that executes the preamble statements with MathJax's own
 * \newcommand, \let, \DeclareMathOperator, ... implementations before the first expression of
 * every input jax is parsed. MathJax keeps definitions in the jax's parse options, so they persist
 * for all later expressions of that jax.
 *
 * Add PREAMBLE_PACKAGE to the `tex.packages` option to enable it.
 */
export function registerPreamblePackage(
  statements: PreambleStatement[],
  onErrors: (errors: PreambleError[]) => void = logPreambleErrors,
): void {
  const executed = new WeakSet<ParseOptions>()
  let reported = false

  const runPreamble = ({ data }: { data: ParseOptions }) => {
    if (executed.has(data)) return
    executed.add(data)

    const errors: PreambleError[] = []
    for (const statement of statements) {
      try {
        new TexParser(statement.source, { display: false, isInner: false }, data).mml()
      } catch (err) {
        if (!(err instanceof TexError)) throw err
        errors.push({ statement, message: err.message })
      }
    }
    // Drop parser state and nodes left over from the preamble before the actual expression.
    data.clear()

    // Every jax executes the same statements, so the errors are the same each time.
    if (!reported) {
      reported = true
      onErrors(errors)
    }
  }

  Configuration.create(PREAMBLE_PACKAGE, { preprocessors: [[runPreamble, 1]] })
}

function logPreambleErrors(errors: PreambleError[]) {
  for (const { statement, message } of errors) {
    console.warn(`[MathJaxPreamble] line ${statement.line} (\\${statement.name}): ${message}`)
  }
}

const reportedMathJaxErrors = new Set<string>()

/**
 * A `tex.formatError` that logs each distinct MathJax error once, so that broken math shows up in
 * the build output, and then renders MathJax's default error node.
 */
export function reportMathJaxError(jax: any, err: any) {
  const key = `${err.message}\n${jax.latex}`
  if (!reportedMathJaxErrors.has(key)) {
    reportedMathJaxErrors.add(key)
    console.warn(`[MathJax] ${err.message} in: ${jax.latex}`)
  }
  return jax.formatError(err)
}
