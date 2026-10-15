interface DisplayProps {
  input: string
  result: string
  hasMemory: boolean
}

export function Display({ input, result, hasMemory }: DisplayProps) {
  const isError = result === "Error"
  const main = result || input || "0"
  return (
    <div className="lcd rounded-xl px-4 pb-3 pt-2 font-lcd text-lcd-ink">
      <div className="flex items-center justify-between text-xs tracking-widest opacity-80">
        <span aria-label="Angles in degrees">DEG</span>
        <span aria-hidden={!hasMemory} className={hasMemory ? "" : "opacity-0"}>
          M
        </span>
      </div>
      <div
        className="mt-1 min-h-6 overflow-x-auto whitespace-nowrap text-right text-lg opacity-70"
        aria-label="Expression"
      >
        {result ? input : "\u00a0"}
      </div>
      <output
        aria-live="polite"
        className={`block overflow-x-auto whitespace-nowrap text-right leading-tight ${
          main.length > 14 ? "text-3xl" : "text-5xl"
        } ${isError ? "tracking-widest" : ""}`}
      >
        {main}
      </output>
    </div>
  )
}
