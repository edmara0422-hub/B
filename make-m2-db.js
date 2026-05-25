const fs = require('fs');

const m2 = JSON.parse(fs.readFileSync('temp-m2.json', 'utf8'));

let m2s_array = '';
let playlist = 'const PNEUMO_PLAYLIST = [\n';
let syllabus = 'const PNEUMO_SYLLABUS = [\n  // Pilar Pneumo (M2)\n';

let simMapping = '';

m2.topics.forEach((topic, tIdx) => {
  const dbId = `P2-S${tIdx + 1}`;
  const code = `PNEUMO-0${tIdx + 1}`;
  
  let totalSlides = 0;
  let totalSims = 0;

  let chapters = '';
  let currentChapterIndex = 0;
  let simCases = '';

  topic.blocks.forEach((block, bIdx) => {
    if (block.type === 'slides' && block.slides) {
      let subsections = '';
      totalSlides += block.slides.length;
      block.slides.forEach(slide => {
        const contentStr = slide.bullets.map(b => `• ${b}`).join('\n');
        const deepDiveStr = slide.highlight || '';
        subsections += `          {
            title: ${JSON.stringify(slide.title)},
            content: ${JSON.stringify(contentStr)},
            deepDive: ${JSON.stringify(deepDiveStr)}
          },\n`;
      });
      chapters += `      {
        title: ${JSON.stringify(block.title)},
        subsections: [\n${subsections}        ]
      },\n`;
      
      currentChapterIndex++;
    } else if (block.type === 'simulation' && block.simulationId) {
      totalSims++;
      // It means this simulation should be tied to the PREVIOUS chapterIndex!
      // because the chapter is the SLIDES block.
      const associatedChapter = currentChapterIndex > 0 ? currentChapterIndex - 1 : 0;
      simCases += `                {chapterIndex === ${associatedChapter} && (() => { const C = PNEUMO_SIMS['${block.simulationId}']; return <C /> })()}\n`;
    } else if (block.type === 'media' && block.simulationId) {
        totalSims++;
        const associatedChapter = currentChapterIndex > 0 ? currentChapterIndex - 1 : 0;
        simCases += `                {chapterIndex === ${associatedChapter} && (() => { const C = PNEUMO_SIMS['${block.simulationId}']; return <C /> })()}\n`;
    }
  });

  m2s_array += `  {
    id: '${dbId}',
    code: '${code}',
    title: ${JSON.stringify(topic.title)},
    videoUrls: [],
    chapters: [\n${chapters}    ]
  },\n`;

  // UI mapping
  playlist += `  { id: 'M2-T${tIdx + 1}', topicId: '${dbId}', title: ${JSON.stringify(topic.title)}, subtitle: 'Aula ${String(tIdx + 1).padStart(2, '0')} · ${totalSlides} slides · ${totalSims} simulações', duration: '20:00' },\n`;
  syllabus += `  { id: 'M2-T${tIdx + 1}-S1', topicId: '${dbId}', title: ${JSON.stringify(topic.title)}, subtitle: 'Pneumo · ${totalSlides} slides', duration: '20:00' },\n`;

  if (simCases) {
    simMapping += `            {dbId === '${dbId}' && (
              <div className="h-full w-full relative">
${simCases}              </div>
            )}\n`;
  }
});

playlist += ']\n';
syllabus += ']\n';

fs.writeFileSync('new-m2-db.txt', m2s_array);
fs.writeFileSync('new-m2-ui.txt', playlist + '\n' + syllabus + '\n\n// -- Sim Mapping --\n' + simMapping);
