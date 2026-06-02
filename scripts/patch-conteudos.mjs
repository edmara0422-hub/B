import fs from 'fs'

const file = 'components/sea/conteudos-page-client.tsx'
let content = fs.readFileSync(file, 'utf8')

// 1. Update imports
const importRegex = /import \{\s*SimAlignIT.*SimDataLakehouse\s*\} from '@\/components\/sea\/simulations-6d'/m
if (content.match(importRegex)) {
  content = content.replace(importRegex, \`import { 
  SimAlignIT, SimRogersReactor, SimNeuralMatrix, SimServerlessFlow,
  SimInnovationIgnition, SimHorizonsBalancer, SimPsychologicalShield, SimDataLakehouse,
  SimNeuroCreativity, SimIdeationFunnel, SimSixHatsMatrix
} from '@/components/business-syllabus/simulations-6d'\`)
}

// 2. Fix the "Grade de Disciplinas (30 Aulas)"
content = content.replace(/Grade de Disciplinas \(30 Aulas\)/g, 'Grade de Disciplinas')

// 3. Update the NASA6DSimulator block
const simBlockStart = content.indexOf(\`{chapterIndex === 0 && 'Simulador de Alinhamento e Fases da TI'}\`)
const simBlockEnd = content.indexOf(\`{chapterIndex === 7 && <SimDataLakehouse theme={theme} addLog={addLog} />}\`) + \`{chapterIndex === 7 && <SimDataLakehouse theme={theme} addLog={addLog} />}\`.length

if (simBlockStart !== -1 && simBlockEnd !== -1) {
  const newSimBlock = \`{dbId === 'M1-S1' && (
                  <>
                    {chapterIndex === 0 && 'Simulador de Alinhamento e Fases da TI'}
                    {chapterIndex === 1 && 'Reator de 4 Domínios de Rogers'}
                    {chapterIndex === 2 && 'Matriz de Redes Neurais e IA'}
                    {chapterIndex === 3 && 'Pipeline Serverless & Cloud Optimizer'}
                    {chapterIndex === 4 && 'Innovation Prototyping Accelerator'}
                    {chapterIndex === 5 && 'Balanceador 3 Horizontes (McKinsey)'}
                    {chapterIndex === 6 && 'Vigilância e Segurança Psicológica Aristotle'}
                    {chapterIndex === 7 && 'Kimball Lakehouse Data Ingestion Cube'}
                  </>
                )}
                {dbId === 'M1-S2' && (
                  <>
                    {chapterIndex === 0 && 'Neuro-Criatividade (3 Redes Cerebrais)'}
                    {chapterIndex === 1 && 'Funil de Ideação (Design Thinking & SCAMPER)'}
                    {chapterIndex === 2 && 'Matriz de Bloqueios & 6 Chapéus (De Bono)'}
                  </>
                )}
              </h5>
            </div>
            <div className="flex items-center gap-1.5 text-[#d4b87a]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4b87a] animate-ping" />
              <span className="text-[7.5px] font-mono font-bold tracking-wider">TELEMETRIA ATIVA</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {dbId === 'M1-S1' && (
              <>
                {chapterIndex === 0 && <SimAlignIT theme={theme} addLog={addLog} />}
                {chapterIndex === 1 && <SimRogersReactor theme={theme} addLog={addLog} />}
                {chapterIndex === 2 && <SimNeuralMatrix theme={theme} addLog={addLog} />}
                {chapterIndex === 3 && <SimServerlessFlow theme={theme} addLog={addLog} />}
                {chapterIndex === 4 && <SimInnovationIgnition theme={theme} addLog={addLog} />}
                {chapterIndex === 5 && <SimHorizonsBalancer theme={theme} addLog={addLog} />}
                {chapterIndex === 6 && <SimPsychologicalShield theme={theme} addLog={addLog} />}
                {chapterIndex === 7 && <SimDataLakehouse theme={theme} addLog={addLog} />}
              </>
            )}
            {dbId === 'M1-S2' && (
              <>
                {chapterIndex === 0 && <SimNeuroCreativity theme={theme} addLog={addLog} />}
                {chapterIndex === 1 && <SimIdeationFunnel theme={theme} addLog={addLog} />}
                {chapterIndex === 2 && <SimSixHatsMatrix theme={theme} addLog={addLog} />}
              </>
            )}\`

  content = content.substring(0, simBlockStart) + newSimBlock + content.substring(simBlockEnd)
  fs.writeFileSync(file, content)
  console.log('Successfully patched conteudos-page-client.tsx')
} else {
  console.log('Could not find the simulation block to patch')
}
