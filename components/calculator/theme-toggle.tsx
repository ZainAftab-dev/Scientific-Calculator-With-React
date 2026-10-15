"use client"

import { Moon, Sun } from "lucide-react"

interface ThemeToggleProps {
  isDark: boolean
  onToggle: () => void
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="grid h-10 w-10 place-items-center rounded-full text-label transition-colors hover:bg-black/10 hover:text-key-text dark:hover:bg-white/10"
      aria-label={isDark ? "Switch to pearl body" : "Switch to graphite body"}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}
