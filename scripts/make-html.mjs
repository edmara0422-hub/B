import fs from 'fs';
import path from 'path';

const inputFile = path.join(process.cwd(), 'my-project@0.1.0');
const outHtml = path.join(process.cwd(), 'public', 'design-space.html');

let content = fs.readFileSync(inputFile, 'utf-8');

// Replace BS/SEA as requested
content = content.replace(/SEA/g, 'BS').replace(/Sea/g, 'Ipb').replace(/sea-/g, 'bs-');

const lines = content.split('\n');

// Find CSS start
const cssStartLine = lines.findIndex(line => line.includes('html, body { margin: 0; padding: 0; }'));
let cssStartIndex = cssStartLine;
while (cssStartIndex > 0 && !lines[cssStartIndex].startsWith('/* ──')) {
    cssStartIndex--;
}

const jsContent = lines.slice(0, cssStartIndex).join('\n');
const cssContent = lines.slice(cssStartIndex).join('\n');

const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>BS Design Space</title>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
${cssContent}
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel" data-type="module">
${jsContent}
    </script>
</body>
</html>`;

fs.writeFileSync(outHtml, htmlContent);
console.log('HTML created successfully!');