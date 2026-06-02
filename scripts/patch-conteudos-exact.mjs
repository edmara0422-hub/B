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

// the new lines are shifted by +4 because we added 4 lines for the import
const startIdx = 1112 + 4;
const endIdx = 1499 + 4;

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
console.log('Successfully spliced using exact indices');
