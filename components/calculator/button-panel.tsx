"use client"

import { CalcButton, type KeyVariant } from "./calc-button"

interface ButtonPanelProps {
  onInput: (value: string) => void
  pressedKey: string | null
}

type KeyDef = { value: string; variant: KeyVariant; label?: string; span?: string }

const FUNCTION_KEYS: KeyDef[] = [
  { value: "sin", variant: "function", label: "Sine" },
  { value: "cos", variant: "function", label: "Cosine" },
  { value: "tan", variant: "function", label: "Tangent" },
  { value: "π", variant: "function", label: "Pi" },
  { value: "asin", variant: "function", label: "Inverse sine" },
  { value: "acos", variant: "function", label: "Inverse cosine" },
  { value: "atan", variant: "function", label: "Inverse tangent" },
  { value: "e", variant: "function", label: "Euler's number" },
  { value: "√", variant: "function", label: "Square root" },
  { value: "^", variant: "function", label: "Power" },
  { value: "!", variant: "function", label: "Factorial" },
  { value: "log", variant: "function", label: "Log base 10" },
  { value: "ln", variant: "function", label: "Natural log" },
  { value: "(", variant: "function", label: "Open bracket" },
  { value: ")", variant: "function", label: "Close bracket" },
  { value: "C", variant: "function", label: "Delete last character" },
]

const MAIN_KEYS: KeyDef[] = [
  { value: "MC", variant: "memory", label: "Memory clear" },
  { value: "MR", variant: "memory", label: "Memory recall" },
  { value: "M-", variant: "memory", label: "Memory subtract" },
  { value: "M+", variant: "memory", label: "Memory add" },
  { value: "7", variant: "digit" },
  { value: "8", variant: "digit" },
  { value: "9", variant: "digit" },
  { value: "÷", variant: "operator", label: "Divide" },
  { value: "4", variant: "digit" },
  { value: "5", variant: "digit" },
  { value: "6", variant: "digit" },
  { value: "×", variant: "operator", label: "Multiply" },
  { value: "1", variant: "digit" },
  { value: "2", variant: "digit" },
  { value: "3", variant: "digit" },
  { value: "-", variant: "operator", label: "Subtract" },
  { value: "0", variant: "digit" },
  { value: ".", variant: "digit", label: "Decimal point" },
  { value: "AC", variant: "clear", label: "All clear" },
  { value: "+", variant: "operator", label: "Add" },
]

export function ButtonPanel({ onInput, pressedKey }: ButtonPanelProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2" role="group" aria-label="Scientific functions">
        {FUNCTION_KEYS.map((k) => (
          <CalcButton
            key={k.value}
            value={k.value === "C" ? "⌫" : k.value}
            label={k.label}
            variant={k.variant}
            onClick={() => onInput(k.value)}
            pressed={pressedKey === k.value}
          />
        ))}
      </div>
      <div className="h-px bg-label/25" aria-hidden="true" />
      <div className="grid grid-cols-4 gap-2.5" role="group" aria-label="Numbers and operators">
        {MAIN_KEYS.map((k) => (
          <CalcButton
            key={k.value}
            value={k.value}
            label={k.label}
            variant={k.variant}
            onClick={() => onInput(k.value)}
            pressed={pressedKey === k.value}
          />
        ))}
        <CalcButton
          value="="
          label="Equals"
          variant="equals"
          className="col-span-4"
          onClick={() => onInput("=")}
          pressed={pressedKey === "="}
        />
      </div>
    </div>
  )
}
