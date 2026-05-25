import fs from 'fs';
import path from 'path';

const inputFile = path.join(process.cwd(), 'my-project@0.1.0');
const outDir = path.join(process.cwd(), 'app', 'design-space');
const outTsx = path.join(outDir, 'page.tsx');
const outCss = path.join(outDir, 'page.css');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

let content = fs.readFileSync(inputFile, 'utf-8');

// Replacements
content = content.replace(/SEA/g, 'IPB');
content = content.replace(/Sea/g, 'Ipb');
content = content.replace(/sea-/g, 'ipb-');
content = content.replace(/Sistema de Estudo Avançado/g, 'IPB');
content = content.replace(/Sistema de Estudo Avancado/g, 'IPB');

// Separate JS and CSS
const splitToken = 'ReactDOM.createRoot(document.getElementById("root")).render(<App/>);';
let [jsContent, cssContent] = content.split(splitToken);

if (!cssContent) {
  // If the replacement somehow modified it, maybe try fallback
  const fallbackSplit = 'ReactDOM.createRoot';
  const parts = content.split(fallbackSplit);
  jsContent = parts[0];
  cssContent = parts[1].substring(parts[1].indexOf(';')+1);
}

// Fix React import
jsContent = jsContent.replace(
  'const { useState, useEffect, useCallback } = React;',
  'import React, { useState, useEffect, useCallback } from "react";\nimport "./page.css";'
);

// Add export default
jsContent += `\nexport default function DesignSpace() { return <App />; }\n`;

// Add use client
jsContent = '"use client";\n\n' + jsContent;

// Remove any lingering root rendering logic if fallback was used
if (jsContent.includes('document.getElementById')) {
   jsContent = jsContent.replace(/.*document\.getElementById.*/g, '');
}

fs.writeFileSync(outTsx, jsContent);
fs.writeFileSync(outCss, cssContent.trim());

console.log('Conversion successful!');
