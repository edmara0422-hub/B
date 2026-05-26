const fs = require('fs');

const file = 'data/caderno-content-m1-m8.ts';
let content = fs.readFileSync(file, 'utf8');

// 1. Ensure the import is there.
if (!content.includes("import { SIG_PESSOAS }")) {
  content = content.replace("export interface SubjectContent", "import { SIG_PESSOAS } from './caderno-content-sig'\n\nexport interface SubjectContent");
}

// 2. Append SIG_PESSOAS to SUBJECTS_DB array
if (!content.includes(", SIG_PESSOAS")) {
  content = content.replace(/\n\]\s*$/, "\n  , SIG_PESSOAS\n]");
}

// Remove the corrupted import if it was added incorrectly
content = content.replace("import { BUSINESS_CONTENT } from './caderno-content-business'\n", "");
content = content.replace("...BUSINESS_CONTENT,\n  ...SIG_PESSOAS,", "");

fs.writeFileSync(file, content);
console.log('Fixed db');
