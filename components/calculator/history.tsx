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
    <section aria-label="History" className="w-full">
      <div className="mb-2 flex items-center justify-between px-1">
        <h2 className="text-sm font-semibold text-label">Paper tape</h2>
        {entries.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-semibold text-label hover:text-brick"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Clear
          </button>
        )}
      </div>
      <div className="tape rounded-b-md pt-3 shadow-[0_10px_24px_-14px_rgb(0_0_0/0.6)]">
        <div className="max-h-[26rem] overflow-y-auto px-4 pb-4 font-lcd text-tape-ink">
          {entries.length === 0 ? (
            <p className="py-6 text-center text-sm opacity-60">Calculations print here.</p>
          ) : (
            <ol>
              {entries.map((entry, index) => (
                <li key={index} className="border-b border-dashed border-black/15 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => onSelect(entry)}
                    className="w-full py-2 text-right hover:bg-black/5"
                    aria-label={`Use ${entry.expression} = ${entry.result}`}
                  >
                    <span className="block truncate text-sm opacity-60">{entry.expression}</span>
                    <span className="block text-xl">= {entry.result}</span>
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  )
}
