const fs = require('fs');
const file = '/Users/edmararocha/Documents/Business Syllabus/components/business-syllabus/conteudos-page-client.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "const activeSubjectData = SUBJECTS_DB.find(s => s.id === dbId) ?? SUBJECTS_DB[0]",
  `const activeSubjectData = SUBJECTS_DB.find(s => s.id === dbId) ?? {
    id: dbId,
    code: "EM-BREVE",
    title: "Conteúdo em Produção",
    videoUrls: [],
    chapters: [{
      title: "Em breve",
      description: "Este conteúdo está sendo estruturado.",
      subsections: [{
        title: "Aguarde",
        content: "O material completo para este módulo estará disponível em breve.",
        quote: ""
      }],
      synthesis: { title: "Síntese", bullets: ["Em produção"], insights: [] }
    }]
  }`
);

fs.writeFileSync(file, content);
console.log("Fixed fallback logic in conteudos-page-client.tsx");