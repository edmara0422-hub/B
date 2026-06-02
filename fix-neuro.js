const fs = require('fs');

const m1Raw = fs.readFileSync('data/caderno-content-m1.ts', 'utf8');

// The file exports M1_CONTENT
// I will strip the exports and evaluate it
let code = m1Raw.replace('import type { CadernoModuleContent } from \'@/types/caderno\'', '');
code = code.replace('export const M1_CONTENT: CadernoModuleContent = ', 'const M1_CONTENT = ');
code += '\n\nconsole.log(JSON.stringify(M1_CONTENT, null, 2));\n';
fs.writeFileSync('temp-m1.js', code);