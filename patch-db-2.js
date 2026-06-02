const fs = require('fs');

const content = fs.readFileSync('data/caderno-content-m1-m8.ts', 'utf8');
const newNeuro = fs.readFileSync('new-neuro-db.txt', 'utf8');

const lines = content.split('\n');

// Find index of `  {` right before `    id: 'N1-S1',`
let startIdx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("id: 'N1-S1'")) {
    startIdx = i - 1; // points to `  {`
    break;
  }
}

// Find index of `  {` right before `"M4-S1"`
let endIdx = -1;
for (let i = startIdx + 1; i < lines.length; i++) {
  if (lines[i].includes('"id": "M4-S1"')) {
    endIdx = i - 1;
    break;
  }
}

console.log(`Start: ${startIdx}, End: ${endIdx}`);

if (startIdx !== -1 && endIdx !== -1) {
  const before = lines.slice(0, startIdx).join('\n');
  const after = lines.slice(endIdx).join('\n');
  const patched = before + '\n' + newNeuro + after;
  fs.writeFileSync('data/caderno-content-m1-m8.ts', patched);
  console.log('Patched successfully.');
} else {
  console.log('Indexes not found!');
}