import fs from 'fs'

const file = 'components/business-syllabus/conteudos-page-client.tsx'
let content = fs.readFileSync(file, 'utf8')

// 1. Add theme-silver class to the main wrapper
const hookRegex = /(const \[activeSubject, setActiveSubject\] = useState\(0\))/
content = content.replace(hookRegex, "$1\n  const isGoldTheme = activeSubject % 2 === 0")

const returnRegex = /(return\s*\(\s*<div\s+className=")(min-h-screen[^"]*)(")/
content = content.replace(returnRegex, "$1$2 ${isGoldTheme ? '' : 'theme-silver'}$3")

// Helper function to replace safely
function addSilverVariant(cssClass, silverColor) {
  // If it's something like text-[#d4b87a], it becomes text-[#d4b87a] [.theme-silver_&]:text-[#cbd5e1]
  const escapedClass = cssClass.replace('[', '\\[').replace(']', '\\]').replace('/', '\\/')
  const regex = new RegExp(`(?<!\\[\\.theme-silver_&\\]:)\\b${escapedClass}\\b`, 'g')
  const silverClass = cssClass.replace('#d4b87a', silverColor).replace('rgba(212,184,122,0.8)', 'rgba(203,213,225,0.8)')
  
  content = content.replace(regex, `${cssClass} [.theme-silver_&]:${silverClass}`)
}

// 2. Replace all tailwind classes containing #d4b87a
const classesToReplace = [
  'text-[#d4b87a]',
  'border-t-[#d4b87a]',
  'border-r-[#d4b87a]',
  'border-b-[#d4b87a]',
  'border-l-[#d4b87a]',
  'bg-[#d4b87a]',
  'border-[#d4b87a]',
  'shadow-[0_0_10px_#d4b87a]',
  'shadow-[0_0_6px_rgba(212,184,122,0.8)]',
  'hover:border-[#d4b87a]',
  'focus:border-[#d4b87a]',
  'bg-[#d4b87a]/10',
  'bg-[#d4b87a]/15',
  'bg-[#d4b87a]/5',
  'border-[#d4b87a]/20',
  'border-[#d4b87a]/30',
  'border-[#d4b87a]/10',
  'border-[#d4b87a]/40',
  'text-[#d4b87a]/80',
  'text-[#d4b87a]/70',
  'hover:border-[#d4b87a]/20',
  'hover:border-[#d4b87a]/30',
  'hover:bg-[#d4b87a]/80',
  'focus:border-[#d4b87a]/40',
  'focus:border-[#d4b87a]/30'
]

classesToReplace.forEach(cls => {
  addSilverVariant(cls, '#cbd5e1') // Using #cbd5e1 for silver to match their `itemColor` in the sidebar
})

// Special cases for the inline styles in ExecutiveMasterclassTheater
content = content.replace(/>TRILHA OURO</g, '>{isGoldTheme ? "TRILHA OURO" : "TRILHA PRATA"}<')

// Fix inline styles
// line 1400: background: 'radial-gradient(circle at 0% 0%, #d4b87a, transparent 50%)'
content = content.replace(/background: 'radial-gradient\(([^,]+), #d4b87a, (transparent[^)]+)\)'/g, 
  "background: `radial-gradient($1, ${isGoldTheme ? '#d4b87a' : '#cbd5e1'}, $2)`")

// Update the `module-icon` in the sidebar to use `itemColor`
content = content.replace(
  /className=\{`module-icon flex h-6 w-6 items-center justify-center rounded-\[6px\] shrink-0 \$\{isActive \? 'bg-\[#d4b87a\]\/15 text-\[#d4b87a\]' : 'bg-white\/5 text-white\/32'\}`\}/g,
  "className={`module-icon flex h-6 w-6 items-center justify-center rounded-[6px] shrink-0 ${isActive ? 'bg-[#d4b87a]/15 text-[#d4b87a] [.theme-silver_&]:bg-[#cbd5e1]/15 [.theme-silver_&]:text-[#cbd5e1]' : 'bg-white/5 text-white/32'}`}"
)

fs.writeFileSync(file, content)
console.log('Successfully updated themes via Tailwind variants!')