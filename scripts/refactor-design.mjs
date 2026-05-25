import fs from 'fs';
import path from 'path';

const inputFile = path.join(process.cwd(), 'my-project@0.1.0');
const outComponent = path.join(process.cwd(), 'components', 'design-space', 'WalkthroughEngine.tsx');
const outPage = path.join(process.cwd(), 'app', 'design-space', 'page.tsx');
const outCss = path.join(process.cwd(), 'app', 'design-space', 'design.css');

let content = fs.readFileSync(inputFile, 'utf-8');

// Replace IPB/SEA as requested
content = content.replace(/SEA/g, 'IPB').replace(/Sea/g, 'Ipb').replace(/sea-/g, 'ipb-');
content = content.replace(/Object\.assign\(window/g, 'if (typeof window !== "undefined") Object.assign(window');

const lines = content.split('\n');

// Find CSS start
const cssStartLine = lines.findIndex(line => line.includes('html, body { margin: 0; padding: 0; }'));
let cssStartIndex = cssStartLine;
while (cssStartIndex > 0 && !lines[cssStartIndex].startsWith('/* ──')) {
    cssStartIndex--;
}

// Slice the "Walkthrough Engine" part
const startIdx = lines.findIndex(l => l.includes('Walkthrough screens — replicate'));
const jsLines = lines.slice(startIdx, cssStartIndex).filter(l => !l.includes('ReactDOM.createRoot'));

// Replace App with App2
let jsContent = jsLines.join('\n');
jsContent = jsContent.replace('function App() {', 'export function WalkthroughApp() {');

// We need to provide the lucide-react imports which the user used but were implicit?
// Wait, the user had: const icon = (path, size) => <svg>...</svg>
// So they don't need lucide-react!

const componentContent = `"use client";
import React, { useState, useEffect, useCallback, useRef, useMemo, useLayoutEffect, Fragment } from "react";
import "../../app/design-space/design.css";

` + jsContent + `
`;

const pageContent = `"use client";
import React from "react";
import { WalkthroughApp } from "../../components/design-space/WalkthroughEngine";

export default function DesignSpacePage() {
  return <WalkthroughApp />;
}
`;

const cssContent = lines.slice(cssStartIndex).join('\n');

fs.writeFileSync(outComponent, componentContent);
fs.writeFileSync(outPage, pageContent);
fs.writeFileSync(outCss, cssContent);
console.log('Refactored correctly!');
