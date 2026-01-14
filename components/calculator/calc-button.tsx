"use client"

import { cn } from "@/lib/utils"

interface CalcButtonProps {
  value: string
  variant?: "default" | "operator" | "function" | "memory" | "clear" | "equals"
  onClick: () => void
  className?: string
}

export function CalcButton({ value, variant = "default", onClick, className }: CalcButtonProps) {
  const baseStyles =
    "h-12 rounded-lg font-medium text-base transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"

  const variantStyles = {
    default: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    operator: "bg-primary text-primary-foreground hover:bg-primary/90",
    function: "bg-accent text-accent-foreground hover:bg-accent/80",
    memory: "bg-muted text-muted-foreground hover:bg-muted/80 text-sm",
    clear: "bg-destructive/20 text-destructive hover:bg-destructive/30",
    equals: "bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg",
  }

  return (
    <button className={cn(baseStyles, variantStyles[variant], className)} onClick={onClick}>
      {value}
    </button>
  )
}
