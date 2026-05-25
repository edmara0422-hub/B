import fs from 'fs'

const file = 'components/sea/conteudos-page-client.tsx'
let content = fs.readFileSync(file, 'utf8')

// Add isGoldTheme variable
const hookRegex = /(const \[activeSubject, setActiveSubject\] = useState\(0\))/
content = content.replace(hookRegex, "$1\n  const isGoldTheme = activeSubject % 2 === 0")

// Replace the main div
const returnRegex = /return\s*\(\s*<div\s+className="(min-h-screen[^"]*)"/
content = content.replace(returnRegex, `return (\n    <div className="$1" style={{ '--theme-color': isGoldTheme ? '#d4b87a' : '#cbd5e1' } as React.CSSProperties}`)

// 2. Replace hardcoded #d4b87a inside tailwind arbitrary values with var(--theme-color)
content = content.replace(/\[#d4b87a\]/g, '[var(--theme-color)]')

// 3. Fix inline strings with #d4b87a that are not in arrays but are in jsx
content = content.replace(/'#d4b87a'/g, "isGoldTheme ? '#d4b87a' : '#cbd5e1'")

// 4. "TRILHA OURO" text
content = content.replace(/>TRILHA OURO</g, '>{isGoldTheme ? "TRILHA OURO" : "TRILHA PRATA"}<')

// 5. Restore the itemColor logic inside maps that I might have broken by replacing '#d4b87a'
// Since `const itemColor = isGoldTheme ? '#d4b87a' : '#cbd5e1'` might happen, it's actually correct.
// But wait, there is `isGold ? '#d4b87a' : '#cbd5e1'` in loops.
// The replace '#d4b87a' -> `isGoldTheme ? '#d4b87a' : '#cbd5e1'` will make it:
// `isGold ? (isGoldTheme ? '#d4b87a' : '#cbd5e1') : '#cbd5e1'`
// This is syntactically fine, but let's be cleaner.
content = content.replace(/isGold \? \(isGoldTheme \? '#d4b87a' : '#cbd5e1'\) : '#cbd5e1'/g, "isGold ? '#d4b87a' : '#cbd5e1'")

fs.writeFileSync(file, content)
console.log('Done replacing colors!')
