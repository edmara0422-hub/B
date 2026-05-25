import fs from 'fs';

const file = 'components/sea/conteudos-page-client.tsx';
let lines = fs.readFileSync(file, 'utf8').split('\n');

const importIdx = lines.findIndex(l => l.includes("import { SUBJECTS_DB }"));
if (importIdx !== -1 && !lines.join('\n').includes('SimAlignIT')) {
  lines.splice(importIdx, 0, `import { 
  SimAlignIT, SimRogersReactor, SimNeuralMatrix, SimServerlessFlow,
  SimInnovationIgnition, SimHorizonsBalancer, SimPsychologicalShield, SimDataLakehouse
} from '@/components/sea/simulations-6d'`);
}

const startIdx = lines.findIndex(l => l.includes('<div className="flex-1 flex flex-col justify-center">'));
const endIdx = lines.findIndex((l, i) => i > startIdx && l.includes('</div>') && lines[i+1]?.includes('</div>') && lines[i+2]?.includes(')}'));

if (startIdx !== -1 && endIdx !== -1) {
  const replacement = `            <div className="flex-1 flex flex-col justify-center min-h-[300px]">
              {chapterIndex === 0 && <SimAlignIT theme={theme} addLog={addLog} />}
              {chapterIndex === 1 && <SimRogersReactor theme={theme} addLog={addLog} />}
              {chapterIndex === 2 && <SimNeuralMatrix theme={theme} addLog={addLog} />}
              {chapterIndex === 3 && <SimServerlessFlow theme={theme} addLog={addLog} />}
              {chapterIndex === 4 && <SimInnovationIgnition theme={theme} addLog={addLog} />}
              {chapterIndex === 5 && <SimHorizonsBalancer theme={theme} addLog={addLog} />}
              {chapterIndex === 6 && <SimPsychologicalShield theme={theme} addLog={addLog} />}
              {chapterIndex === 7 && <SimDataLakehouse theme={theme} addLog={addLog} />}`;
  lines.splice(startIdx, endIdx - startIdx, replacement);
  fs.writeFileSync(file, lines.join('\n'));
  console.log('Fixed file');
} else {
  console.log('Start or end not found');
}
