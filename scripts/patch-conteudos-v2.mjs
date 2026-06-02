import fs from 'fs';

const file = 'components/sea/conteudos-page-client.tsx';
let lines = fs.readFileSync(file, 'utf8').split('\n');

const importIdx = lines.findIndex(l => l.includes("import { SUBJECTS_DB }"));
if (importIdx !== -1 && !lines.join('\n').includes('SimAlignIT')) {
  lines.splice(importIdx, 0, `import { 
  SimAlignIT, SimRogersReactor, SimNeuralMatrix, SimServerlessFlow,
  SimInnovationIgnition, SimHorizonsBalancer, SimPsychologicalShield, SimDataLakehouse
} from '@/components/business-syllabus/simulations-6d'`);
}

// Re-read because splice changed index
let newLines = lines.join('\n').split('\n');
const startIdx = newLines.findIndex(l => l.includes('{chapterIndex === 0 && ('));
const endIdx = newLines.findIndex((l, i) => i > startIdx && l.includes(')}') && newLines[i+1]?.includes('</div>') && newLines[i+2]?.includes('</div>') && newLines[i+3]?.includes(')}'));

if (startIdx !== -1 && endIdx !== -1) {
  const replacement = `              {chapterIndex === 0 && <SimAlignIT theme={theme} addLog={addLog} />}
              {chapterIndex === 1 && <SimRogersReactor theme={theme} addLog={addLog} />}
              {chapterIndex === 2 && <SimNeuralMatrix theme={theme} addLog={addLog} />}
              {chapterIndex === 3 && <SimServerlessFlow theme={theme} addLog={addLog} />}
              {chapterIndex === 4 && <SimInnovationIgnition theme={theme} addLog={addLog} />}
              {chapterIndex === 5 && <SimHorizonsBalancer theme={theme} addLog={addLog} />}
              {chapterIndex === 6 && <SimPsychologicalShield theme={theme} addLog={addLog} />}
              {chapterIndex === 7 && <SimDataLakehouse theme={theme} addLog={addLog} />}`;
              
  newLines.splice(startIdx, endIdx - startIdx + 1, replacement);
  fs.writeFileSync(file, newLines.join('\n'));
  console.log('Successfully spliced from', startIdx, 'to', endIdx);
} else {
  console.log('Bounds not found');
}
