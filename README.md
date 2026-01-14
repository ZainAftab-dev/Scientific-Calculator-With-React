# React Scientific Calculator

A modern, feature-rich scientific calculator built with React and Next.js. Supports basic arithmetic operations, advanced scientific functions, memory operations, and includes a calculation history panel.

## Author

**Zain Aftab**

## Features

### Basic Operations
- Addition, Subtraction, Multiplication, Division
- Decimal numbers
- Parentheses for grouping expressions
- Percentage calculations

### Scientific Functions
- **Trigonometric**: sin, cos, tan, sin⁻¹, cos⁻¹, tan⁻¹
- **Logarithmic**: log (base 10), ln (natural log)
- **Other**: Square root (√), Exponentiation (^), Factorial (!)
- **Constants**: π (pi), e (Euler's number)

### Memory Functions
- **M+**: Add current result to memory
- **M-**: Subtract current result from memory
- **MR**: Recall memory value
- **MC**: Clear memory

### Additional Features
- Dark/Light theme toggle
- Calculation history panel with clickable entries
- Copy results to clipboard
- Keyboard support for numbers and basic operations
- Responsive design

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui

## Getting Started

### Installation

```bash
npx shadcn@latest add https://v0.dev/chat/your-project-url
```

Or clone and install manually:

```bash
npm install
npm run dev
```

### Usage

1. Open the calculator in your browser
2. Use the button panel or keyboard to input expressions
3. Press `=` or `Enter` to evaluate
4. Toggle between dark/light themes using the sun/moon icon
5. View calculation history in the right panel
6. Click any history entry to load it back into the calculator

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| 0-9 | Input numbers |
| + - * / | Basic operations |
| . | Decimal point |
| Enter | Evaluate expression |
| Escape | Clear all |
| Backspace | Delete last character |

## Project Structure

```
├── app/
│   ├── page.tsx          # Main page
│   ├── layout.tsx        # Root layout with fonts
│   └── globals.css       # Global styles and theme tokens
├── components/
│   ├── calculator.tsx    # Main calculator component
│   └── calculator/
│       ├── display.tsx   # Display component
│       ├── button-panel.tsx  # Button grid
│       ├── calc-button.tsx   # Individual button
│       ├── history.tsx   # History panel
│       └── theme-toggle.tsx  # Theme switcher
└── lib/
    └── calculator-engine.ts  # Expression evaluation engine
```

## License

MIT License - Feel free to use and modify as needed.
