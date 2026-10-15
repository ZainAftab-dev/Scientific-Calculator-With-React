"use client"

import { cn } from "@/lib/utils"

export type KeyVariant = "digit" | "operator" | "function" | "memory" | "clear" | "equals"

interface CalcButtonProps {
  value: string
  label?: string
  variant?: KeyVariant
  onClick: () => void
  className?: string
  pressed?: boolean
}

const variantStyles: Record<KeyVariant, string> = {
  digit: "bg-key text-key-text text-xl font-semibold h-12",
  operator: "bg-amber text-[#1f1a10] text-2xl font-semibold h-12",
  function: "bg-key-fn text-key-fn-text text-[15px] font-semibold h-10",
  memory: "bg-key-fn text-memory text-sm font-bold tracking-wide h-12",
  clear: "bg-brick text-white text-base font-bold h-12",
  equals: "bg-amber text-[#1f1a10] text-2xl font-bold h-12",
}

export function CalcButton({ value, label, variant = "digit", onClick, className, pressed }: CalcButtonProps) {
  return (
    <button
      type="button"
      aria-label={label ?? value}
      data-pressed={pressed}
      className={cn("key select-none rounded-xl", variantStyles[variant], className)}
      onClick={onClick}
    >
      {value}
    </button>
  )
}
