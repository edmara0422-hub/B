const fs = require('fs');
const content = fs.readFileSync('/Users/edmararocha/Documents/Business Syllabus/components/business-syllabus/corporate/sig-pessoas-panel.tsx', 'utf8');

// We want to analyze the activeTab === 'home' block
// Starts around line 1602: activeTab === 'home' && (
// Ends around line 2576: )}

const lines = content.split('\n');
let depth = 0;
let tags = [];

for (let i = 1601; i < 2580; i++) {
  const line = lines[i];
  if (!line) continue;
  
  // Find all JSX tags
  // This is a naive regex but useful for line-by-line tracing
  const openMatches = line.match(/<[a-zA-Z0-9_\.-]+(?!:)(?!\s*=>)(?!\s*>)(?:\s+[^>]*?)?>/g) || [];
  const closeMatches = line.match(/<\/[a-zA-Z0-9_\.-]+>/g) || [];
  const selfClosingMatches = line.match(/<[a-zA-Z0-9_\.-]+(?:\s+[^>]*?)?\/>/g) || [];

  for (let match of openMatches) {
    const tagName = match.match(/<([a-zA-Z0-9_\.-]+)/)[1];
    tags.push({ type: 'open', name: tagName, line: i + 1 });
  }
  for (let match of selfClosingMatches) {
    const tagName = match.match(/<([a-zA-Z0-9_\.-]+)/)[1];
    tags.push({ type: 'self-closing', name: tagName, line: i + 1 });
  }
  for (let match of closeMatches) {
    const tagName = match.match(/<\/([a-zA-Z0-9_\.-]+)/)[1];
    tags.push({ type: 'close', name: tagName, line: i + 1 });
  }
}

// Now let's trace the stack
let stack = [];
for (let tag of tags) {
  if (tag.type === 'open') {
    stack.push(tag);
  } else if (tag.type === 'close') {
    if (stack.length === 0) {
      console.log(`Unmatched close tag </${tag.name}> at line ${tag.line}`);
    } else {
      const last = stack.pop();
      if (last.name !== tag.name) {
        console.log(`Mismatch: opened <${last.name}> at line ${last.line}, closed </${tag.name}> at line ${tag.line}`);
      }
    }
  }
}

console.log("Remaining open tags in stack:");
for (let tag of stack) {
  console.log(`<${tag.name}> opened at line ${tag.line}`);
}