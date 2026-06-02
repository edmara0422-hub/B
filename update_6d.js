const fs = require('fs');

const file = '/Users/edmararocha/Documents/Business Syllabus/components/business-syllabus/corporate/sig-pessoas-panel.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add d1..d5 to TeamMember type
content = content.replace(
  /type TeamMember = \{\n\s*id: string\n\s*name: string\n\s*role: string\n\s*d6: number\n\s*hhh:/,
  `type TeamMember = {
  id: string
  name: string
  role: string
  d1: number
  d2: number
  d3: number
  d4: number
  d5: number
  d6: number
  hhh:`
);

// 2. Change teamMembers default array to generate d1..d5
content = content.replace(
  /const \[teamMembers, setTeamMembers\] = useState<TeamMember\[\]>\(\[\n\s*\{ id: 'm-1', name: 'Rodrigo Silva', role: 'Coord\. Reabilitação', d6: 82,/,
  `const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 'm-1', name: 'Rodrigo Silva', role: 'Coord. Reabilitação', d1: 85, d2: 80, d3: 75, d4: 90, d5: 70, d6: 82,`
);
content = content.replace(
  /\{ id: 'm-2', name: 'Juliana Mendes', role: 'Fisioterapeuta Intensiva', d6: 74,/,
  `{ id: 'm-2', name: 'Juliana Mendes', role: 'Fisioterapeuta Intensiva', d1: 70, d2: 80, d3: 85, d4: 75, d5: 60, d6: 74,`
);
content = content.replace(
  /\{ id: 'm-3', name: 'Lucas Alencar', role: 'Supervisor de Enfermagem', d6: 45,/,
  `{ id: 'm-3', name: 'Lucas Alencar', role: 'Supervisor de Enfermagem', d1: 40, d2: 50, d3: 45, d4: 55, d5: 40, d6: 45,`
);

// Empty out defaults since she complained about them returning
content = content.replace(/const defaultCandidates: Candidate\[\] = \[(.|\n)*?\]\n\s*const \[candidates, setCandidates\] = useState<Candidate\[\]>\(defaultCandidates\)/g, 
  `const defaultCandidates: Candidate[] = []\n  const [candidates, setCandidates] = useState<Candidate[]>([])`);

content = content.replace(/const \[teamMembers, setTeamMembers\] = useState<TeamMember\[\]>\(\[(.|\n)*?\]\)/, 
  `const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])`);

content = content.replace(/const \[sbiLogs, setSbiLogs\] = useState<SbiLog\[\]>\(\[(.|\n)*?\]\)/, 
  `const [sbiLogs, setSbiLogs] = useState<SbiLog[]>([])`);

content = content.replace(/const \[diaryLogs, setDiaryLogs\] = useState<DiaryLog\[\]>\(\[(.|\n)*?\]\)/, 
  `const [diaryLogs, setDiaryLogs] = useState<DiaryLog[]>([])`);

content = content.replace(/const \[delegatedTasks, setDelegatedTasks\] = useState<DelegatedTask\[\]>\(\[(.|\n)*?\]\)/, 
  `const [delegatedTasks, setDelegatedTasks] = useState<DelegatedTask[]>([])`);

content = content.replace(/const \[okrs, setOkrs\] = useState<OkrItem\[\]>\(\[(.|\n)*?\]\)/, 
  `const [okrs, setOkrs] = useState<OkrItem[]>([])`);

// 3. Dynamic 6D variables
const radarReplacement = `
  // Dynamic 6D calculations based on teamMembers
  const avgD1 = teamMembers.length ? Math.round(teamMembers.reduce((acc, m) => acc + (m.d1 || 0), 0) / teamMembers.length) : 0;
  const avgD2 = teamMembers.length ? Math.round(teamMembers.reduce((acc, m) => acc + (m.d2 || 0), 0) / teamMembers.length) : 0;
  const avgD3 = teamMembers.length ? Math.round(teamMembers.reduce((acc, m) => acc + (m.d3 || 0), 0) / teamMembers.length) : 0;
  const avgD4 = teamMembers.length ? Math.round(teamMembers.reduce((acc, m) => acc + (m.d4 || 0), 0) / teamMembers.length) : 0;
  const avgD5 = teamMembers.length ? Math.round(teamMembers.reduce((acc, m) => acc + (m.d5 || 0), 0) / teamMembers.length) : 0;
  const avgD6 = teamMembers.length ? Math.round(teamMembers.reduce((acc, m) => acc + (m.d6 || 0), 0) / teamMembers.length) : 0;

  const getDimColor = (val: number) => val >= 80 ? '#5dcaa5' : val >= 65 ? '#fac775' : '#e24b4a';

  const dimensionsInfo = [
    { code: 'D1', label: 'Cultura', val: avgD1, color: getDimColor(avgD1) },
    { code: 'D2', label: 'Liderança', val: avgD2, color: getDimColor(avgD2) },
    { code: 'D3', label: 'Confiança', val: avgD3, color: getDimColor(avgD3) },
    { code: 'D4', label: 'Entrega', val: avgD4, color: getDimColor(avgD4) },
    { code: 'D5', label: 'Clareza', val: avgD5, color: getDimColor(avgD5) },
    { code: 'D6', label: 'Engajamento', val: avgD6, color: getDimColor(avgD6) }
  ];

  const getPoint = (val: number, angleDeg: number) => {
    const r = (val / 100) * 140;
    const angleRad = (angleDeg - 90) * (Math.PI / 180);
    return { x: r * Math.cos(angleRad), y: r * Math.sin(angleRad) };
  };

  const p1 = getPoint(selectedDims.includes('D1') ? avgD1 : 0, 0);
  const p2 = getPoint(selectedDims.includes('D2') ? avgD2 : 0, 60);
  const p3 = getPoint(selectedDims.includes('D3') ? avgD3 : 0, 120);
  const p4 = getPoint(selectedDims.includes('D4') ? avgD4 : 0, 180);
  const p5 = getPoint(selectedDims.includes('D5') ? avgD5 : 0, 240);
  const p6 = getPoint(selectedDims.includes('D6') ? avgD6 : 0, 300);

  // --- STATE FOR MAP TEAM INTERACTION ---`;

content = content.replace(/const dimensionsInfo = \[\s*\{ code: 'D1'.*?\s*\{ code: 'D6'.*?\]/s, radarReplacement);

// 4. Update SVG polygon
const svgPolygonRegex = /<polygon\s+points=\{`[^`]+`\}\s+fill="url\(#crystalFillH\)"/s;
content = content.replace(svgPolygonRegex, `<polygon 
                          points={\`
                            \${p1.x},\${p1.y} 
                            \${p2.x},\${p2.y} 
                            \${p3.x},\${p3.y} 
                            \${p4.x},\${p4.y} 
                            \${p5.x},\${p5.y} 
                            \${p6.x},\${p6.y}
                          \`} 
                          fill="url(#crystalFillH)"`);

// 5. Update SVG circles
content = content.replace(/\{selectedDims\.includes\('D1'\) && <circle cx="0" cy="-115"/g, `{selectedDims.includes('D1') && <circle cx={p1.x} cy={p1.y}`);
content = content.replace(/\{selectedDims\.includes\('D2'\) && <circle cx="95\.3" cy="-55"/g, `{selectedDims.includes('D2') && <circle cx={p2.x} cy={p2.y}`);
content = content.replace(/\{selectedDims\.includes\('D3'\) && <circle cx="90\.9" cy="52\.5"/g, `{selectedDims.includes('D3') && <circle cx={p3.x} cy={p3.y}`);
content = content.replace(/\{selectedDims\.includes\('D4'\) && <circle cx="0" cy="98"/g, `{selectedDims.includes('D4') && <circle cx={p4.x} cy={p4.y}`);
content = content.replace(/\{selectedDims\.includes\('D5'\) && <circle cx="-73\.6" cy="42\.5"/g, `{selectedDims.includes('D5') && <circle cx={p5.x} cy={p5.y}`);
content = content.replace(/\{selectedDims\.includes\('D6'\) && <circle cx="-86\.6" cy="-50"/g, `{selectedDims.includes('D6') && <circle cx={p6.x} cy={p6.y}`);

// 6. Update mapping to candidates
content = content.replace(/<button onClick=\{\(\) => handleMoveMemberToCandidates\(m\)\}.*?>\n\s*<span>⇄<\/span> MOVER P\/ CANDIDATOS\n\s*<\/button>/g,
  `<button onClick={() => handleDeleteMember(m.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/30 hover:bg-red-900/50 text-red-400 border border-red-900/50 rounded-lg text-[9px] font-bold uppercase transition">
                                  <Trash2 size={12} /> ARQUIVAR / EXCLUIR
                                </button>`);

// Fix handleAddTeamMemberMap
content = content.replace(/d6: 75,/, `d1: 75, d2: 75, d3: 75, d4: 75, d5: 75, d6: 75,`);

// Fix TriggerOnboard
content = content.replace(/d6: c.lencioniScore,/, `d1: c.lencioniScore, d2: c.lencioniScore, d3: c.lencioniScore, d4: c.lencioniScore, d5: c.lencioniScore, d6: c.lencioniScore,`);

fs.writeFileSync(file, content);
console.log('Update script executed.');