import fs from 'fs';

const file = 'components/sea/conteudos-page-client.tsx';
let lines = fs.readFileSync(file, 'utf8').split('\n');

console.log("Line 1113:", lines[1112]);
console.log("Line 1500:", lines[1499]);
