const fs = require('fs');

const raw = fs.readFileSync('data/caderno-content-m2.ts', 'utf8');

let code = raw.replace("import type { CadernoModuleContent } from '@/types/caderno'", "");
code = code.replace("export const M2_CONTENT: CadernoModuleContent = ", "const M2_CONTENT = ");
code += '\n\nconsole.log(JSON.stringify(M2_CONTENT, null, 2));\n';
fs.writeFileSync('temp-m2.js', code);