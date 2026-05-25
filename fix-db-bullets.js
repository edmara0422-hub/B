const fs = require('fs');

const m1 = JSON.parse(fs.readFileSync('temp-m1.json', 'utf8'));

const contentM1M8 = fs.readFileSync('data/caderno-content-m1-m8.ts', 'utf8');

// We will rebuild the N1-S* array!
let n1s_array = '';

m1.topics.forEach((topic, tIdx) => {
  const dbId = `N1-S${tIdx + 1}`;
  const code = `NEURO-0${tIdx + 1}`;
  
  let chapters = '';
  topic.blocks.forEach((block, bIdx) => {
    if (block.type === 'slides' && block.slides) {
      let subsections = '';
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
    }
  });

  n1s_array += `  {
    id: '${dbId}',
    code: '${code}',
    title: ${JSON.stringify(topic.title)},
    videoUrls: [],
    chapters: [\n${chapters}    ]
  },\n`;
});

// Now inject this into data/caderno-content-m1-m8.ts
// I'll just write it to a file, and manually replace it in data/caderno-content-m1-m8.ts

fs.writeFileSync('new-neuro-db.txt', n1s_array);
