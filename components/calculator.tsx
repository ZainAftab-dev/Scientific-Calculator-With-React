"use client"

import { useState, useEffect, useCallback } from "react"
import { Display } from "./calculator/display"
import { ButtonPanel } from "./calculator/button-panel"
import { History } from "./calculator/history"
import { ThemeToggle } from "./calculator/theme-toggle"
import { evaluate } from "@/lib/calculator-engine"
import { Copy, HistoryIcon } from "lucide-react"

export type HistoryEntry = {
  expression: string
  result: string
}

export function Calculator() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [memory, setMemory] = useState(0)
  const [showHistory, setShowHistory] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const darkMode = document.documentElement.classList.contains("dark")
    setIsDark(darkMode)
  }, [])

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark")
    setIsDark(!isDark)
  }

  const handleInput = useCallback(
    (value: string) => {
      console.log("[v0] handleInput called with:", value)

      if (value === "AC") {
        setInput("")
        setResult("")
      } else if (value === "C") {
        setInput((prev) => prev.slice(0, -1))
      } else if (value === "=") {
        try {
          console.log("[v0] Evaluating expression:", input)
          const evalResult = evaluate(input)
          console.log("[v0] Evaluation result:", evalResult)
          setResult(evalResult)
          if (evalResult !== "Error") {
            setHistory((prev) => [{ expression: input, result: evalResult }, ...prev.slice(0, 19)])
          }
        } catch (error) {
          console.log("[v0] Evaluation error:", error)
          setResult("Error")
        }
      } else if (value === "M+") {
        try {
          const currentResult = result || evaluate(input)
          const numValue = Number.parseFloat(currentResult)
          if (!Number.isNaN(numValue) && currentResult !== "Error") {
            setMemory((prev) => prev + numValue)
            console.log("[v0] M+ added:", numValue)
          }
        } catch {
          console.log("[v0] M+ failed - invalid value")
        }
      } else if (value === "M-") {
        try {
          const currentResult = result || evaluate(input)
          const numValue = Number.parseFloat(currentResult)
          if (!Number.isNaN(numValue) && currentResult !== "Error") {
            setMemory((prev) => prev - numValue)
            console.log("[v0] M- subtracted:", numValue)
          }
        } catch {
          console.log("[v0] M- failed - invalid value")
        }
      } else if (value === "MR") {
        setInput((prev) => prev + memory.toString())
      } else if (value === "MC") {
        setMemory(0)
      } else if (["sin", "cos", "tan", "asin", "acos", "atan", "log", "ln", "√"].includes(value)) {
        setInput((prev) => prev + value + "(")
        setResult("")
      } else {
        setInput((prev) => prev + value)
        setResult("")
      }
    },
    [input, result, memory],
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key
      if (key >= "0" && key <= "9") handleInput(key)
      else if (key === "+") handleInput("+")
      else if (key === "-") handleInput("-")
      else if (key === "*") handleInput("×")
      else if (key === "/") handleInput("÷")
      else if (key === ".") handleInput(".")
      else if (key === "(") handleInput("(")
      else if (key === ")") handleInput(")")
      else if (key === "^") handleInput("^")
      else if (key === "Enter" || key === "=") {
        e.preventDefault()
        handleInput("=")
      } else if (key === "Backspace") handleInput("C")
      else if (key === "Escape") handleInput("AC")
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleInput])

  const copyToClipboard = async () => {
    const textToCopy = result || input
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-card rounded-2xl shadow-2xl overflow-hidden border border-border">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h1 className="text-lg font-semibold text-foreground">Scientific Calculator</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Toggle history"
            >
              <HistoryIcon className="w-5 h-5" />
            </button>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </div>
        </div>

        {/* Memory indicator */}
        {memory !== 0 && <div className="px-4 py-1 bg-accent text-xs text-accent-foreground">Memory: {memory}</div>}

        {/* Display */}
        <Display input={input} result={result} />

        {/* Copy button */}
        <div className="px-4 pb-2 flex justify-end">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Copy className="w-3 h-3" />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Button Panel */}
        <ButtonPanel onInput={handleInput} />
      </div>

      {/* History Panel */}
      {showHistory && (
        <History
          entries={history}
          onSelect={(entry) => {
            setInput(entry.expression)
            setResult(entry.result)
            setShowHistory(false)
          }}
          onClear={() => setHistory([])}
        />
      )}
    </div>
  )
}
