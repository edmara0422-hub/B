import fs from 'fs';
import path from 'path';

const inputFile = path.join(process.cwd(), 'my-project@0.1.0');
const outputFile = path.join(process.cwd(), 'public', 'design-space.html');

let content = fs.readFileSync(inputFile, 'utf-8');
content = content.replace(/SEA/g, 'IPB').replace(/Sea/g, 'Ipb').replace(/sea-/g, 'ipb-');

const separator = `/* ──────────────────────────────────────────────────────────────────────────\n   IPB FISIO — Editorial scroll story`;
let jsContent = content;
let cssContent = '';

const splitIdx = content.indexOf(`/* ──────────────────────────────────────────────────────────────────────────\n   IPB FISIO`);
if (splitIdx !== -1) {
  jsContent = content.substring(0, splitIdx);
  cssContent = content.substring(splitIdx);
} else {
  console.log("AVISO: Separador não encontrado. Usando regex fallback");
  const fallbackSplit = content.indexOf(':root {');
  if (fallbackSplit !== -1) {
      jsContent = content.substring(0, fallbackSplit);
      cssContent = content.substring(fallbackSplit);
  }
}

// Remove window assignments that could break things or aren't needed in a single file
jsContent = jsContent.replace(/Object\.assign\(window, \{[\s\S]*?\}\);/g, '');
// Remove multiple React destructures to avoid 'Identifier has already been declared'
jsContent = jsContent.replace(/const \{ [\s\S]*?\} = React;/g, '');

const htmlTemplate = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>IPB Design Space</title>
  
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://unpkg.com/framer-motion@10.12.16/dist/framer-motion.js"></script>
  
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">

  <style>
${cssContent}
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel" data-type="module">
    const { useState, useEffect, useCallback, useRef, useMemo, useLayoutEffect, Fragment } = React;
    const { motion, AnimatePresence } = window.Motion;

${jsContent}

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>`;

fs.writeFileSync(outputFile, htmlTemplate);
console.log('Criado HTML separado em public/design-space.html');
