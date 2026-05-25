import fs from 'fs';
const file = 'app/design-space/page.jsx';
let content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

lines[1428] = '// removed useState redefine';

for (let i = 2100; i < lines.length; i++) {
  lines[i] = lines[i].replace(/\bIpbBg\b/g, 'IpbWalkBg');
  lines[i] = lines[i].replace(/\bIpbMark\b/g, 'IpbWalkMark');
  lines[i] = lines[i].replace(/\bShimmerText\b/g, 'IpbWalkShimmerText');
}

fs.writeFileSync(file, lines.join('\n'));
console.log('Fixed page.jsx');
