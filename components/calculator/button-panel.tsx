"use client"

import { CalcButton } from "./calc-button"

interface ButtonPanelProps {
  onInput: (value: string) => void
}

const buttons = [
  // Row 1 - Scientific functions
  ["sin", "cos", "tan", "π"],
  // Row 2 - More scientific
  ["asin", "acos", "atan", "e"],
  // Row 3 - Advanced operations
  ["√", "^", "!", "log"],
  // Row 4 - More operations
  ["ln", "(", ")", "÷"],
  // Row 5 - Memory & numbers
  ["MC", "7", "8", "9"],
  // Row 6
  ["MR", "4", "5", "6"],
  // Row 7
  ["M+", "1", "2", "3"],
  // Row 8
  ["M-", "0", ".", "×"],
  // Row 9 - Operations
  ["AC", "C", "-", "+"],
  // Row 10 - Equals
  ["="],
]

const buttonStyles: Record<string, "default" | "operator" | "function" | "memory" | "clear" | "equals"> = {
  "+": "operator",
  "-": "operator",
  "×": "operator",
  "÷": "operator",
  "=": "equals",
  AC: "clear",
  C: "clear",
  sin: "function",
  cos: "function",
  tan: "function",
  asin: "function",
  acos: "function",
  atan: "function",
  "√": "function",
  "^": "function",
  "!": "function",
  log: "function",
  ln: "function",
  π: "function",
  e: "function",
  "(": "function",
  ")": "function",
  MC: "memory",
  MR: "memory",
  "M+": "memory",
  "M-": "memory",
}

export function ButtonPanel({ onInput }: ButtonPanelProps) {
  return (
    <div className="p-3 bg-card">
      <div className="grid grid-cols-4 gap-2">
        {buttons.flat().map((btn, index) => (
          <CalcButton
            key={`${btn}-${index}`}
            value={btn}
            variant={buttonStyles[btn] || "default"}
            onClick={() => onInput(btn)}
            className={btn === "=" ? "col-span-4" : ""}
          />
        ))}
      </div>
    </div>
  )
}
