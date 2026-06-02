import fs from 'fs'

const file = 'components/business-syllabus/conteudos-page-client.tsx'
let content = fs.readFileSync(file, 'utf8')

// Replace rgba(212,184,122,X) with rgba(var(--theme-primary-rgb),X) inside inline styles
// Note: We don't want to replace inside Tailwind shadow classes like shadow-[0_0_6px_rgba(...)] because we already added `.theme-silver` variant for them.
// Let's only replace inside `style={{...}}` or any inline definitions.
// Actually, safely replacing `rgba(212,184,122, ` with `rgba(var(--theme-primary-rgb), ` where it is part of string literals or styles.

// 1. Replace rgba(212,184,122, with rgba(var(--theme-primary-rgb), inside strings and JSX style attributes
content = content.replace(/rgba\(212,184,122,/g, 'rgba(var(--theme-primary-rgb),')

// 2. Replace style={{ color: '#d4b87a' }} -> style={{ color: 'var(--theme-primary)' }}
content = content.replace(/color:\s*['"]#d4b87a['"]/g, "color: 'var(--theme-primary)'")

// 3. Replace background: '#d4b87a' -> background: 'var(--theme-primary)'
content = content.replace(/background:\s*['"]#d4b87a['"]/g, "background: 'var(--theme-primary)'")

// 4. Also replace the itemColor fallback in the map
content = content.replace(/const itemColor = isGold \? '#d4b87a' : '#cbd5e1'/g, "const itemColor = isGoldTheme ? '#d4b87a' : '#cbd5e1'")

fs.writeFileSync(file, content)
console.log('Fixed inline styles!')