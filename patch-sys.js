const fs = require('fs');

const file = 'components/sea/sistemas-page-client.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add 'sig-consultoria' to SIDEBAR_GROUPS under 'SIG'
if (!content.includes("'sig-consultoria'")) {
  content = content.replace(
    "{ id: 'sig-pessoas', title: 'Pessoas', desc: 'Líderes & Gestores' },",
    "{ id: 'sig-pessoas', title: 'Pessoas', desc: 'Líderes & Gestores' },\n      { id: 'sig-consultoria', title: 'Consultoria ATP', desc: 'Diagnóstico & Estratégia' },"
  );
}

// 2. Add case for 'sig-consultoria' in renderActivePanel()
if (!content.includes("case 'sig-consultoria':")) {
  content = content.replace(
    "case 'sig-pessoas':",
    "case 'sig-consultoria':\n        if (typeof window !== 'undefined') window.location.href = '/sistemas/consultoria-business';\n        return null;\n      case 'sig-pessoas':"
  );
}

fs.writeFileSync(file, content);
console.log('Patched sistemas menu');
