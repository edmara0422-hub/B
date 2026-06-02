const fs = require('fs');

const content = fs.readFileSync('data/caderno-content-m1-m8.ts', 'utf8');
const newM2 = fs.readFileSync('new-m2-db.txt', 'utf8');

const lines = content.split('\n');

// Find index of `  {` right before `"id": "M4-S1"`
let endIdx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"id": "M4-S1"')) {
    endIdx = i - 1;
    break;
  }
}

if (endIdx !== -1) {
  const before = lines.slice(0, endIdx).join('\n');
  const after = lines.slice(endIdx).join('\n');
  const patched = before + '\n' + newM2 + after;
  fs.writeFileSync('data/caderno-content-m1-m8.ts', patched);
  console.log('Patched successfully.');
} else {
  console.log('Index not found!');
}