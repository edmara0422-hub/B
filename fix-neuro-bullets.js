const fs = require('fs');

const m1 = JSON.parse(fs.readFileSync('temp-m1.json', 'utf8'));

let out = '';
m1.topics.forEach(topic => {
  out += `// ${topic.title}\n`;
  topic.blocks.forEach(block => {
    if (block.type === 'slides' && block.slides) {
      block.slides.forEach(slide => {
        out += `#### ${slide.title}\n`;
        slide.bullets.forEach(b => {
          out += `• ${b}\n`;
        });
        if (slide.highlight) {
          out += `Destaque: ${slide.highlight}\n`;
        }
        out += '\n';
      });
    }
  });
});
fs.writeFileSync('neuro-bullets.txt', out);