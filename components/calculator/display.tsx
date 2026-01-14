interface DisplayProps {
  input: string
  result: string
}

export function Display({ input, result }: DisplayProps) {
  return (
    <div className="bg-muted px-4 py-6 min-h-[120px] flex flex-col justify-end">
      <div className="text-right">
        <div className="text-muted-foreground text-lg font-mono min-h-[28px] overflow-x-auto whitespace-nowrap">
          {input || "0"}
        </div>
        <div className="text-foreground text-3xl font-mono font-bold min-h-[40px]">{result || ""}</div>
      </div>
    </div>
  )
}
