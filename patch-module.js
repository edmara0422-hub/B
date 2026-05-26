const fs = require('fs');

const file = 'components/sea/conteudos-page-client.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add M5 to MODULES array
const newModule = `  {
    id: 'M5',
    title: 'SIG PESSOAS',
    icon: Brain,
    eyebrow: 'Leadership OS',
    overview: 'Sistema Operacional de Liderança, Tuckman, Lencioni e Inteligência Emocional (SIG).',
    concepts: [
      'Matrizes de Delegação, Confiabilidade e Influência (SIG)',
      'Modelo de Tuckman e ALX (Liderança Aumentada)',
      'Gestão de Conflitos, Feedback SBI e OKRs'
    ]
  },
];`;
content = content.replace(/  \}\n\]/, '  },\n' + newModule.replace('];', ']'));

// 2. Add M5 theme to MODULE_THEMES
const newTheme = `  M5: {
    primary: '#a855f7', // purple
    secondary: '#d8b4fe', // light purple
    accent: 'rgba(168, 85, 247, 0.25)',
    glow: 'rgba(168, 85, 247, 0.12)',
    badgeBg: 'rgba(168, 85, 247, 0.10)',
    badgeText: '#a855f7',
    gradient: 'linear-gradient(90deg, #d8b4fe 0%, #a855f7 100%)'
  }
}`;
content = content.replace(/  \}\n\}/, '  },\n' + newTheme);

// 3. Add SIG_PESSOAS_PLAYLIST
const newPlaylist = `
const SIG_PESSOAS_PLAYLIST = [
  { id: 'M5-T1', topicId: 'sig-pessoas', title: 'Recrutamento e Formação', subtitle: 'Capítulo 1', duration: '15:00' },
  { id: 'M5-T2', topicId: 'sig-pessoas', title: 'Gestão, Delegação e 6D', subtitle: 'Capítulo 2', duration: '20:00' },
  { id: 'M5-T3', topicId: 'sig-pessoas', title: 'Equipe, Influência e OKRs', subtitle: 'Capítulo 3', duration: '18:00' },
  { id: 'M5-T4', topicId: 'sig-pessoas', title: 'Comportamento e Impacto', subtitle: 'Capítulo 4', duration: '22:00' },
  { id: 'M5-T5', topicId: 'sig-pessoas', title: 'Tuckman, Dados e ALX', subtitle: 'Capítulo 5', duration: '19:00' },
  { id: 'M5-T6', topicId: 'sig-pessoas', title: 'Comunicação e Conflitos', subtitle: 'Capítulo 6', duration: '25:00' }
]
`;
content = content.replace('const BUSINESS_PLAYLIST = [', newPlaylist + '\nconst BUSINESS_PLAYLIST = [');

// 4. Update the logic that selects the playlist
content = content.replace(
  /const activePlaylist = activeModule === 'M1' \? NEURO_PLAYLIST : activeModule === 'M2' \? PNEUMO_PLAYLIST : activeModule === 'M3' \? CARDIO_PLAYLIST : BUSINESS_PLAYLIST/,
  "const activePlaylist = activeModule === 'M1' ? NEURO_PLAYLIST : activeModule === 'M2' ? PNEUMO_PLAYLIST : activeModule === 'M3' ? CARDIO_PLAYLIST : activeModule === 'M5' ? SIG_PESSOAS_PLAYLIST : BUSINESS_PLAYLIST"
);

// 5. Add SYLLABUS_TO_DB_MAP mappings
const newMappings = `
  // Pilar 7: SIG PESSOAS
  'M5-T1': 'sig-pessoas',
  'M5-T2': 'sig-pessoas',
  'M5-T3': 'sig-pessoas',
  'M5-T4': 'sig-pessoas',
  'M5-T5': 'sig-pessoas',
  'M5-T6': 'sig-pessoas',
`;
content = content.replace(/\} \/\/ end of mapping/, newMappings + '\n}'); // wait, the mapping doesn't have end comment.
// Let's just append to the map
content = content.replace(/  'M4-T6-S7': 'M5-S1', \/\/ Leitura e Escrita Acadêmica \(M5-S1 no BD\)\n\}/, "  'M4-T6-S7': 'M5-S1',\n" + newMappings + "\n}");

fs.writeFileSync(file, content);
console.log('Patched UI components');
