import fs from 'fs';
import path from 'path';

const inputFile = path.join(process.cwd(), 'my-project@0.1.0');
const outTsx = path.join(process.cwd(), 'app', 'design-space', 'page.jsx');
const outCss = path.join(process.cwd(), 'app', 'design-space', 'page.css');

let content = fs.readFileSync(inputFile, 'utf-8');

// Replace IPB/SEA as requested
content = content.replace(/SEA/g, 'IPB').replace(/Sea/g, 'Ipb').replace(/sea-/g, 'ipb-');

const lines = content.split('\n');

// Find where CSS starts (the line with 'html, body {')
const cssStartLine = lines.findIndex(line => line.includes('html, body { margin: 0; padding: 0; }'));
let cssStartIndex = cssStartLine;
while (cssStartIndex > 0 && !lines[cssStartIndex].startsWith('/* ──')) {
    cssStartIndex--;
}

const jsLines = lines.slice(0, cssStartIndex);
const cssLines = lines.slice(cssStartIndex);

let jsContent = jsLines.join('\n');
const cssContent = cssLines.join('\n');

// Fix duplicates
jsContent = jsContent.replace('function TopBar() {', 'function TopBar1() {');
jsContent = jsContent.replace('function TopBar({ name = "Edmara" }) {', 'function TopBar2({ name = "Edmara" }) {');
jsContent = jsContent.replace(/<TopBar\/>/g, '<TopBar2/>'); // The 2nd TopBar is used by App2

jsContent = jsContent.replace('function App() {', 'function App1() {');
jsContent = jsContent.replace('function App() {', 'function App2() {');

// Remove React global destructuring
jsContent = jsContent.replace(/const\s*{\s*useState\s*,\s*useEffect\s*,\s*useCallback\s*}\s*=\s*React;/g, '');
jsContent = jsContent.replace(/const\s*{\s*useState\s*,\s*useMemo\s*}\s*=\s*React;/g, '');
jsContent = jsContent.replace(/const\s*{\s*useState\s*,\s*useEffect\s*}\s*=\s*React;/g, '');
jsContent = jsContent.replace(/const\s*{\s*useState\s*,\s*useRef\s*,\s*useEffect\s*}\s*=\s*React;/g, '');


// Remove ReactDOM lines
jsContent = jsContent.replace(/ReactDOM\.createRoot[^\n]+/g, '// ReactDOM removed');

// Add React import and Export
jsContent = `"use client";
import React, { useState, useEffect, useCallback, useRef, useMemo, useLayoutEffect, Fragment } from "react";
import "./page.css";

` + jsContent + `

export default function DesignSpace() {
  return <App2 />;
}
`;

fs.writeFileSync(outTsx, jsContent);
fs.writeFileSync(outCss, cssContent);
console.log('Fixed successfully!');
