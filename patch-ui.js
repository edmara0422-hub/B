const fs = require('fs');

const uiContent = fs.readFileSync('new-m2-ui.txt', 'utf8');
const [playlistsStr, simMappingStr] = uiContent.split('// -- Sim Mapping --');

const targetPath = 'components/business-syllabus/conteudos-page-client.tsx';
let content = fs.readFileSync(targetPath, 'utf8');

// Inject playlists before `const NEURO_PLAYLIST`
const insertIdx1 = content.indexOf('const NEURO_PLAYLIST');
content = content.slice(0, insertIdx1) + playlistsStr + '\n' + content.slice(insertIdx1);

// Inject simMapping inside `ExecutiveStudyBriefing`
// Find `            {dbId === 'M1-S1' && (`
const insertIdx2 = content.indexOf("{dbId === 'M1-S1' && (");
content = content.slice(0, insertIdx2) + simMappingStr + '\n' + content.slice(insertIdx2);

fs.writeFileSync(targetPath, content);
console.log('UI Patched successfully.');