const fs = require('fs');

const targetPath = 'components/sea/conteudos-page-client.tsx';
let content = fs.readFileSync(targetPath, 'utf8');

content = content.replace(
  "const playlist = activeModuleId === 'M1' ? NEURO_PLAYLIST : BUSINESS_PLAYLIST",
  "const playlist = activeModuleId === 'M1' ? NEURO_PLAYLIST : activeModuleId === 'M2' ? PNEUMO_PLAYLIST : BUSINESS_PLAYLIST"
);
content = content.replace(
  "const playlist = activeModuleId === 'M1' ? NEURO_PLAYLIST : BUSINESS_PLAYLIST",
  "const playlist = activeModuleId === 'M1' ? NEURO_PLAYLIST : activeModuleId === 'M2' ? PNEUMO_PLAYLIST : BUSINESS_PLAYLIST"
);

content = content.replace(
  "const syllabusList = moduleId === 'M1' ? NEURO_SYLLABUS : BUSINESS_SYLLABUS",
  "const syllabusList = moduleId === 'M1' ? NEURO_SYLLABUS : moduleId === 'M2' ? PNEUMO_SYLLABUS : BUSINESS_SYLLABUS"
);
content = content.replace(
  "const syllabusList = activeModuleId === 'M1' ? NEURO_SYLLABUS : BUSINESS_SYLLABUS",
  "const syllabusList = activeModuleId === 'M1' ? NEURO_SYLLABUS : activeModuleId === 'M2' ? PNEUMO_SYLLABUS : BUSINESS_SYLLABUS"
);
content = content.replace(
  "const syllabusList = activeModuleId === 'M1' ? NEURO_SYLLABUS : BUSINESS_SYLLABUS",
  "const syllabusList = activeModuleId === 'M1' ? NEURO_SYLLABUS : activeModuleId === 'M2' ? PNEUMO_SYLLABUS : BUSINESS_SYLLABUS"
);

content = content.replace(
  "{current.id === 'M4' || current.id === 'M1' ? (",
  "{(current.id === 'M4' || current.id === 'M1' || current.id === 'M2') ? ("
);
content = content.replace(
  "{(current.id === 'M4' || current.id === 'M1') ? (",
  "{(current.id === 'M4' || current.id === 'M1' || current.id === 'M2') ? ("
);
content = content.replace(
  "{(current.id === 'M4' || current.id === 'M1') ? 'Pilares Corporativos' : 'Pilares do Conhecimento'}",
  "{(current.id === 'M4' || current.id === 'M1' || current.id === 'M2') ? 'Pilares Corporativos' : 'Pilares do Conhecimento'}"
);

content = content.replace(
  "{moduleId === 'M1' ? 'Módulo 1 · Neurociência' : 'Masterclass M4 · Aula ' + (activeLessonIndex + 1)}",
  "{moduleId === 'M1' ? 'Módulo 1 · Neurociência' : moduleId === 'M2' ? 'Módulo 2 · Pneumologia e VM' : 'Masterclass M4 · Aula ' + (activeLessonIndex + 1)}"
);

// Map the syllabus map
const mapInsertion = `
  'M2-T1-S1': 'P2-S1',
  'M2-T2-S1': 'P2-S2',
  'M2-T3-S1': 'P2-S3',
  'M2-T4-S1': 'P2-S4',
  'M2-T5-S1': 'P2-S5',
  'M2-T6-S1': 'P2-S6',
  'M2-T7-S1': 'P2-S7',
  'M2-T8-S1': 'P2-S8',
  'M2-T9-S1': 'P2-S9',
  'M2-T10-S1': 'P2-S10',
  'M2-T11-S1': 'P2-S11',
  'M2-T12-S1': 'P2-S12',
  'M2-T13-S1': 'P2-S13',
  'M2-T14-S1': 'P2-S14',`;
content = content.replace(
  "'M1-T4-S1': 'N1-S4',",
  "'M1-T4-S1': 'N1-S4'," + mapInsertion
);

// Also I need to import PNEUMO_SIMS at the top!
// Actually let's check if PNEUMO_SIMS is imported.
// Wait! `PNEUMO_SIMS` doesn't exist yet! We need to create an object that imports all Pneumo Sims or import them directly.
fs.writeFileSync(targetPath, content);
console.log('UI logic patched.');
