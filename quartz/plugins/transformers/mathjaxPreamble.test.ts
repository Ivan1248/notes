import test, { describe } from "node:test"
import assert from "node:assert"
import { liteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor.js"
import { STATE } from "mathjax-full/js/core/MathItem.js"
import { SerializedMmlVisitor } from "mathjax-full/js/core/MmlTree/SerializedMmlVisitor.js"
import { RegisterHTMLHandler } from "mathjax-full/js/handlers/html.js"
import { TeX } from "mathjax-full/js/input/tex.js"
import { AllPackages } from "mathjax-full/js/input/tex/AllPackages.js"
import { mathjax } from "mathjax-full/js/mathjax.js"
import { SVG } from "mathjax-full/js/output/svg.js"
import { readPreamble, stripComments } from "./mathjaxPreamble"
import { PREAMBLE_PACKAGE, PreambleError, registerPreamblePackage } from "./mathjaxPreambleConfig"

describe("readPreamble", () => {
  test("reads every definer form and skips other commands", () => {
    const { statements, skipped } = readPreamble(String.raw`
\usepackage{amsmath}
\usepackage[utopia]{mathdesign}
\makeatletter
\newcommand{\a}{x}
\newcommand\b[2][d]{#1#2}
\renewcommand*{\c}{y}
\DeclareMathOperator*{\argmin}{arg\,min}
\let\oldhat\hat
\let\x=\y
\def\f#1{#1}
\newenvironment{talign}
{\let\displaystyle\textstyle\align}
{\endalign}
`)
    assert.deepStrictEqual(
      statements.map((s) => [s.command, s.name]),
      [
        ["newcommand", "a"],
        ["newcommand", "b"],
        ["renewcommand", "c"],
        ["DeclareMathOperator", "argmin"],
        ["let", "oldhat"],
        ["let", "x"],
        ["def", "f"],
        ["newenvironment", "talign"],
      ],
    )
    assert.strictEqual(statements[2].source, String.raw`\renewcommand{\c}{y}`)
    assert.strictEqual(statements[3].source, String.raw`\DeclareMathOperator*{\argmin}{arg\,min}`)
    assert.strictEqual(statements[4].source, String.raw`\let\oldhat\hat`)
    assert.deepStrictEqual(
      [...skipped],
      [
        ["usepackage", 2],
        ["makeatletter", 1],
      ],
    )
  })

  test("does not read definitions inside bodies", () => {
    const { statements } = readPreamble(
      String.raw`\newenvironment{talign}{\let\displaystyle\textstyle\align}{\endalign}`,
    )
    assert.deepStrictEqual(
      statements.map((s) => s.name),
      ["talign"],
    )
  })

  test("handles comments, escaped characters and nested groups", () => {
    const { statements } = readPreamble(String.raw`\newcommand{\pct}{50\%} % comment {
\newcommand{\br}{\{ \} \\}
\newcommand{\g}[1]{%
  a % } not a brace
  b}
\newcommand\p[1][{]}]{#1}
`)
    assert.deepStrictEqual(
      statements.map((s) => s.source),
      [
        String.raw`\newcommand{\pct}{50\%}`,
        String.raw`\newcommand{\br}{\{ \} \\}`,
        String.raw`\newcommand{\g}[1]{a b}`,
        String.raw`\newcommand\p[1][{]}]{#1}`,
      ],
    )
    assert.deepStrictEqual(
      statements.map((s) => s.line),
      [1, 2, 3, 6],
    )
  })

  test("warns about duplicate \\newcommand", () => {
    const { warnings } = readPreamble(String.raw`\newcommand{\j}{a}
\newcommand{\j}{b}
\newcommand{\k}{a}
\let\k\relax
\newcommand{\k}{b}`)
    assert.strictEqual(warnings.length, 1)
    assert.match(warnings[0], /^line 2: .*from line 1/)
  })

  test("warns about unreadable definitions and continues", () => {
    const { statements, warnings } = readPreamble(String.raw`\newcommand{x}{y}
\newcommand{\z}{z}`)
    assert.deepStrictEqual(
      statements.map((s) => s.name),
      ["z"],
    )
    assert.strictEqual(warnings.length, 1)
  })
})

describe("stripComments", () => {
  test("keeps escaped percent signs", () => {
    assert.strictEqual(stripComments(String.raw`a\%b%c`), String.raw`a\%b`)
    assert.strictEqual(stripComments("a\\\\%b\nc"), "a\\\\c")
  })
})

describe("preamble package", () => {
  const adaptor = liteAdaptor()
  RegisterHTMLHandler(adaptor)

  // Executes the preamble with MathJax and returns a function that converts TeX to MathML.
  const setup = (preamble: string) => {
    const errors: PreambleError[] = []
    registerPreamblePackage(readPreamble(preamble).statements, (e) => errors.push(...e))
    const tex = new TeX({ packages: [...AllPackages, PREAMBLE_PACKAGE] })
    const document = mathjax.document("", { InputJax: tex, OutputJax: new SVG() })
    const visitor = new SerializedMmlVisitor()
    const toMathML = (math: string, display = false) =>
      visitor.visitTree(document.convert(math, { display, end: STATE.COMPILED }))
    // The preamble runs before the first expression.
    toMathML("")
    return { toMathML, errors }
  }

  test("\\let keeps the meaning of a redefined command", () => {
    const { toMathML, errors } = setup(String.raw`
\let\oldhat\hat
\renewcommand{\hat}[1]{\vphantom{#1}\smash[t]{\oldhat{#1}}}
\let\oldtilde\tilde
\renewcommand{\tilde}[1]{\vphantom{#1}\smash[t]{\oldtilde{#1}}}`)
    assert.deepStrictEqual(errors, [])
    for (const math of [String.raw`\hat{x}`, String.raw`\tilde{x}`, String.raw`\oldhat{x}`]) {
      const mml = toMathML(math)
      assert.doesNotMatch(mml, /merror/, math)
      assert.match(mml, /<mover/, math)
    }
    assert.match(toMathML(String.raw`\hat{x}`), /mpadded/)
  })

  test("\\DeclareMathOperator* places limits below in display style", () => {
    const { toMathML } = setup(String.raw`\DeclareMathOperator*{\argmin}{arg\,min}
\DeclareMathOperator{\tr}{tr}`)
    assert.match(toMathML(String.raw`\argmin_x f`, true), /<munder/)
    assert.doesNotMatch(toMathML(String.raw`\tr_x A`, true), /<munder/)
  })

  test("definitions inside environment bodies are not executed", () => {
    const { toMathML } = setup(
      String.raw`\newenvironment{talign}{\let\displaystyle\textstyle\align}{\endalign}`,
    )
    assert.match(toMathML(String.raw`{\displaystyle x}`), /displaystyle="true"/)
  })

  test("a failing statement is reported and later statements still apply", () => {
    const { toMathML, errors } = setup(String.raw`\newcommand{\bad}[x]{y}
\newcommand{\R}{\mathbb{R}}`)
    assert.strictEqual(errors.length, 1)
    assert.strictEqual(errors[0].statement.name, "bad")
    assert.doesNotMatch(toMathML(String.raw`\R`), /merror/)
  })

  test("\\newcommand* is accepted", () => {
    const { toMathML, errors } = setup(String.raw`\newcommand*{\annot}[1]{\text{(#1)}}`)
    assert.deepStrictEqual(errors, [])
    assert.doesNotMatch(toMathML(String.raw`x \annot{a}`), /merror/)
  })

  test("definitions apply to every expression of a document", () => {
    const { toMathML } = setup(String.raw`\newcommand{\R}{\mathbb{R}}`)
    assert.doesNotMatch(toMathML(String.raw`\R`), /merror/)
    assert.doesNotMatch(toMathML(String.raw`x\in\R`), /merror/)
  })
})
