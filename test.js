const fs = require('fs');
const file = '/Users/edmararocha/Documents/Business Syllabus/data/caderno-content-m1-m8.ts';
let dbContent = fs.readFileSync(file, 'utf8');

const regex = /\{\s*"id":\s*"M4-S1"[\s\S]*?(?=\n\s*\},\n\s*\{|\n\s*\}\n\];)/g;
let matches = dbContent.match(regex);
console.log(matches ? matches.length : 0);
if(matches) console.log(matches[0].slice(-50));