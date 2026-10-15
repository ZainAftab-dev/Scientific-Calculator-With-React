"use client"

import { useState, useEffect, useCallback } from "react"
import { Display } from "./calculator/display"
import { ButtonPanel } from "./calculator/button-panel"
import { History } from "./calculator/history"
import { ThemeToggle } from "./calculator/theme-toggle"
import { evaluate } from "@/lib/calculator-engine"
import { Copy, Check, ScrollText } from "lucide-react"

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
  const [isDark, setIsDark] = useState(true)
  const [pressedKey, setPressedKey] = useState<string | null>(null)

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

      if (value === "AC") {
        setInput("")
        setResult("")
      } else if (value === "C") {
        setInput((prev) => prev.slice(0, -1))
      } else if (value === "=") {
        try {
          const evalResult = evaluate(input)
          setResult(evalResult)
          if (evalResult !== "Error") {
            setHistory((prev) => [{ expression: input, result: evalResult }, ...prev.slice(0, 19)])
          }
        } catch (error) {
          setResult("Error")
        }
      } else if (value === "M+") {
        try {
          const currentResult = result || evaluate(input)
          const numValue = Number.parseFloat(currentResult)
          if (!Number.isNaN(numValue) && currentResult !== "Error") {
            setMemory((prev) => prev + numValue)
          }
        } catch {
        }
      } else if (value === "M-") {
        try {
          const currentResult = result || evaluate(input)
          const numValue = Number.parseFloat(currentResult)
          if (!Number.isNaN(numValue) && currentResult !== "Error") {
            setMemory((prev) => prev - numValue)
          }
        } catch {
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
    const flash = (k: string) => {
      setPressedKey(k)
      window.setTimeout(() => setPressedKey(null), 120)
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key
      const map: Record<string, string> = { "*": "×", "/": "÷", Enter: "=", Backspace: "C", Escape: "AC" }
      flash(map[key] ?? key)
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
    <div className="flex w-full max-w-4xl flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center">
      <div className="device w-full max-w-[380px] rounded-[28px] p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-key-text">Scientific Calculator</h1>
            <p className="text-xs font-semibold text-label">Trig in degrees · keyboard ready</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              aria-pressed={showHistory}
              aria-label={showHistory ? "Hide paper tape" : "Show paper tape"}
              className={`grid h-10 w-10 place-items-center rounded-full transition-colors lg:hidden ${
                showHistory ? "bg-amber text-[#1f1a10]" : "text-label hover:bg-black/10 dark:hover:bg-white/10"
              }`}
            >
              <ScrollText className="h-5 w-5" />
            </button>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </div>
        </div>

        <Display input={input} result={result} hasMemory={memory !== 0} />

        <div className="mt-2 flex h-8 items-center justify-between px-1 text-xs font-semibold text-label">
          <span>{memory !== 0 ? `Memory: ${memory}` : "\u00a0"}</span>
          <button
            type="button"
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 hover:text-key-text"
          >
            {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
            {copied ? "Copied" : "Copy result"}
          </button>
        </div>

        <ButtonPanel onInput={handleInput} pressedKey={pressedKey} />
      </div>

      <div className={`w-full max-w-[380px] lg:block lg:w-72 ${showHistory ? "block" : "hidden"}`}>
        <History
          entries={history}
          onSelect={(entry) => {
            setInput(entry.expression)
            setResult(entry.result)
            setShowHistory(false)
          }}
          onClear={() => setHistory([])}
        />
      </div>
    </div>
  )
}
