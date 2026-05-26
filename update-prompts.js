const fs = require('fs');
const glob = require('glob');

const files = glob.sync('app/api/icu/*/route.ts');

const holisticInjection = `

OBRIGATÓRIO: Em sua análise final, você DEVE incorporar as seguintes perspectivas, garantindo uma abordagem multidisciplinar intensiva:
1. COMO CORRIGIR O CASO: Propor intervenções clínicas e ajustes imediatos baseados nos achados.
2. EVOLUÇÃO VENTILATÓRIA (O QUE ESTÁ ACONTECENDO?): Descreva o momento atual da mecânica ventilatória e o prognóstico em curto prazo.
3. INFLUÊNCIA MULTISSISTÊMICA (LABORATÓRIO, NEURO, CARDIO, GASO): Explique explicitamente como o estado neurológico, hemodinâmica cardiovascular, distúrbios laboratoriais/metabólicos e a gasometria estão influenciando ou podem vir a influenciar a evolução ventilatória deste paciente.
4. PARÂMETROS DE DESMAME: Especifique quais metas ou índices devem ser atingidos para iniciar o desmame ventilatório neste contexto.`;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace old formatting rules or just inject it before the JSON output instruction
  if (content.includes('Você DEVE retornar um JSON')) {
    content = content.replace('Você DEVE retornar um JSON', holisticInjection + '\n\nVocê DEVE retornar um JSON');
  } else if (content.includes('Retorne APENAS um JSON')) {
    content = content.replace('Retorne APENAS um JSON', holisticInjection + '\n\nRetorne APENAS um JSON');
  } else {
    // If we can't find the JSON instruction, just append to the prompt variable
    content = content.replace(/const ([A-Z_]+_PROMPT) = `/, `const $1 = \`${holisticInjection}\n`);
  }

  fs.writeFileSync(file, content);
  console.log('Updated prompt in', file);
});
