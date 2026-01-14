"use client"

import { Trash2 } from "lucide-react"
import type { HistoryEntry } from "../calculator"

interface HistoryProps {
  entries: HistoryEntry[]
  onSelect: (entry: HistoryEntry) => void
  onClear: () => void
}

export function History({ entries, onSelect, onClear }: HistoryProps) {
  return (
    <div className="mt-4 bg-card rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h2 className="text-sm font-medium text-foreground">History</h2>
        {entries.length > 0 && (
          <button
            onClick={onClear}
            className="p-1.5 rounded hover:bg-accent transition-colors text-muted-foreground hover:text-destructive"
            aria-label="Clear history"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="max-h-48 overflow-y-auto">
        {entries.length === 0 ? (
          <p className="text-sm text-muted-foreground p-4 text-center">No calculations yet</p>
        ) : (
          entries.map((entry, index) => (
            <button
              key={index}
              onClick={() => onSelect(entry)}
              className="w-full px-4 py-2 text-left hover:bg-accent transition-colors border-b border-border last:border-b-0"
            >
              <div className="text-xs text-muted-foreground font-mono truncate">{entry.expression}</div>
              <div className="text-sm text-foreground font-mono font-medium">= {entry.result}</div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
