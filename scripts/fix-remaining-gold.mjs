import fs from 'fs'

const file = 'components/sea/conteudos-page-client.tsx'
let content = fs.readFileSync(file, 'utf8')

// We want to find any class attribute and replace tailwind classes inside it.
// React classNames can be className="..." or className={`...`}
// We'll use a regex to match the contents of className

let updatedContent = content.replace(/className=(["'{`])(.*?)\1/gs, (match, quote, classContent) => {
  // split classes by whitespace
  const classes = classContent.split(/\s+/)
  const newClasses = []
  
  for (let i = 0; i < classes.length; i++) {
    const cls = classes[i]
    newClasses.push(cls)
    
    // If it contains #d4b87a and does NOT already have a .theme-silver_& modifier for it
    if (cls.includes('#d4b87a') && !cls.includes('.theme-silver')) {
      // Check if the NEXT class is already the silver variant
      if (i + 1 < classes.length && classes[i+1].includes('.theme-silver_&') && classes[i+1].includes('#cbd5e1')) {
        continue // Already has it
      }
      
      // Create the silver variant
      const silverCls = '[.theme-silver_&]:' + cls.replace('#d4b87a', '#cbd5e1').replace('rgba(212,184,122,0.8)', 'rgba(203,213,225,0.8)')
      
      newClasses.push(silverCls)
    }
  }
  
  return `className=${quote}${newClasses.join(' ')}${quote}`
})

// Also find any inline styles that hardcode #d4b87a
// e.g. style={{ color: '#d4b87a' }} -> style={{ color: activeTheme.primary }} (if activeTheme is in scope)
// Wait, we already fixed activeTheme. So let's replace '#d4b87a' inside style={{...}} with activeTheme.primary
// But wait, there are also things like color: idx === 0 ? '#d4b87a' : undefined
// If we replace it with `activeTheme.primary`, it will work in most components that have activeTheme.
// Let's manually fix the remaining ones if the script fails.

fs.writeFileSync(file, updatedContent)
console.log('Fixed Tailwind classes!')
