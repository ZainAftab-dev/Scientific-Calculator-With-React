// Safe math expression evaluator
export function evaluate(expression: string): string {
  try {
    if (!expression || expression.trim() === "") {
      return "0"
    }

    // Replace display symbols with actual operators
    let expr = expression
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/π/g, `(${Math.PI})`)
      .replace(/e(?![xp])/g, `(${Math.E})`)

    // Handle inverse trig functions (return degrees)
    expr = expr.replace(/asin\(([^)]+)\)/g, (_, arg) => `(Math.asin(${evaluateInner(arg)}) * 180 / Math.PI)`)
    expr = expr.replace(/acos\(([^)]+)\)/g, (_, arg) => `(Math.acos(${evaluateInner(arg)}) * 180 / Math.PI)`)
    expr = expr.replace(/atan\(([^)]+)\)/g, (_, arg) => `(Math.atan(${evaluateInner(arg)}) * 180 / Math.PI)`)

    // Handle trigonometric functions (convert degrees to radians for standard trig)
    expr = expr.replace(/(?<![a-zA-Z.])sin\(([^)]+)\)/g, (_, arg) => `Math.sin((${evaluateInner(arg)}) * Math.PI / 180)`)
    expr = expr.replace(/(?<![a-zA-Z.])cos\(([^)]+)\)/g, (_, arg) => `Math.cos((${evaluateInner(arg)}) * Math.PI / 180)`)
    expr = expr.replace(/(?<![a-zA-Z.])tan\(([^)]+)\)/g, (_, arg) => `Math.tan((${evaluateInner(arg)}) * Math.PI / 180)`)

    // Handle logarithms
    expr = expr.replace(/log\(([^)]+)\)/g, (_, arg) => `Math.log10(${evaluateInner(arg)})`)
    expr = expr.replace(/ln\(([^)]+)\)/g, (_, arg) => `Math.log(${evaluateInner(arg)})`)

    // Handle square root
    expr = expr.replace(/√\(([^)]+)\)/g, (_, arg) => `Math.sqrt(${evaluateInner(arg)})`)
    expr = expr.replace(/√(\d+\.?\d*)/g, (_, num) => `Math.sqrt(${num})`)

    // Handle factorial
    expr = expr.replace(/(\d+)!/g, (_, num) => `(${factorial(Number.parseInt(num))})`)

    // Handle exponentiation
    expr = expr.replace(/\^/g, "**")

    // Validate expression (basic security check)
    if (!/^[\d\s+\-*/().Math\w,]*$/.test(expr)) {
      throw new Error("Invalid expression")
    }

    // Evaluate the expression
    const result = new Function(`return ${expr}`)()

    // Format the result
    if (typeof result === "number") {
      if (Number.isNaN(result)) return "Error"
      if (!Number.isFinite(result)) return "Infinity"
      // Round to avoid floating point issues
      const rounded = Math.round(result * 1e10) / 1e10
      return rounded.toString()
    }

    return String(result)
  } catch {
    return "Error"
  }
}

function evaluateInner(expr: string): string {
  // Handle nested expressions recursively
  const result = expr
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/π/g, `(${Math.PI})`)
    .replace(/e(?![xp])/g, `(${Math.E})`)
    .replace(/\^/g, "**")

  return result
}

function factorial(n: number): number {
  if (n < 0) return Number.NaN
  if (n === 0 || n === 1) return 1
  if (n > 170) return Number.POSITIVE_INFINITY // Prevent overflow
  let result = 1
  for (let i = 2; i <= n; i++) {
    result *= i
  }
  return result
}
