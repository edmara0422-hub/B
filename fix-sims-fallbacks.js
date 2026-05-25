const fs = require('fs');

const path = 'components/sea/conteudos-page-client.tsx';
let content = fs.readFileSync(path, 'utf8');

const replacement = `            {dbId === 'P2-S1' && (
              <div className="h-full w-full relative">
                {chapterIndex < 3 && (() => { const C = RESPIRATORY_SIMS['respiratory-system']; return <C /> })()}
                {chapterIndex === 3 && (() => { const C = RESPIRATORY_SIMS['respiratory-gas-exchange']; return <C /> })()}
                {chapterIndex > 3 && (() => { const C = RESPIRATORY_SIMS['respiratory-defense']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S2' && (
              <div className="h-full w-full relative">
                {chapterIndex < 5 && (() => { const C = RESPIRATORY_SIMS['respiratory-cough']; return <C /> })()}
                {chapterIndex >= 5 && (() => { const C = RESPIRATORY_SIMS['respiratory-membrane']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S3' && (
              <div className="h-full w-full relative">
                {(() => { const C = RESPIRATORY_SIMS['respiratory-ventilation']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S4' && (
              <div className="h-full w-full relative">
                {(() => { const C = RESPIRATORY_SIMS['respiratory-oxyhb-curve']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S5' && (
              <div className="h-full w-full relative">
                {(() => { const C = RESPIRATORY_SIMS['respiratory-control']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S6' && (
              <div className="h-full w-full relative">
                {(() => { const C = RESPIRATORY_SIMS['respiratory-volumes']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S7' && (
              <div className="h-full w-full relative">
                {(() => { const C = RESPIRATORY_SIMS['respiratory-oxytherapy']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S8' && (
              <div className="h-full w-full relative">
                {(() => { const C = RESPIRATORY_SIMS['respiratory-spirometry']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S10' && (
              <div className="h-full w-full relative">
                {(() => { const C = RESPIRATORY_SIMS['respiratory-vni-modes']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S11' && (
              <div className="h-full w-full relative">
                {chapterIndex < 3 && (() => { const C = RESPIRATORY_SIMS['respiratory-vmi-ventilator']; return <C /> })()}
                {chapterIndex === 3 && (() => { const C = RESPIRATORY_SIMS['respiratory-vmi-peep']; return <C /> })()}
                {chapterIndex > 3 && (() => { const C = RESPIRATORY_SIMS['respiratory-vmi-mechanics']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S12' && (
              <div className="h-full w-full relative">
                {chapterIndex <= 1 && (() => { const C = RESPIRATORY_SIMS['async-ineffective']; return <C /> })()}
                {chapterIndex === 2 && (() => { const C = RESPIRATORY_SIMS['async-double']; return <C /> })()}
                {chapterIndex === 3 && (() => { const C = RESPIRATORY_SIMS['async-reverse']; return <C /> })()}
                {chapterIndex === 4 && (() => { const C = RESPIRATORY_SIMS['async-auto']; return <C /> })()}
                {chapterIndex === 5 && (() => { const C = RESPIRATORY_SIMS['async-premature']; return <C /> })()}
                {chapterIndex === 6 && (() => { const C = RESPIRATORY_SIMS['async-delayed']; return <C /> })()}
                {chapterIndex === 7 && (() => { const C = RESPIRATORY_SIMS['async-flow-starve']; return <C /> })()}
                {chapterIndex === 8 && (() => { const C = RESPIRATORY_SIMS['async-flow-excess']; return <C /> })()}
                {chapterIndex >= 9 && (() => { const C = RESPIRATORY_SIMS['respiratory-vmi-asynchrony']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S13' && (
              <div className="h-full w-full relative">
                {chapterIndex <= 1 && (() => { const C = RESPIRATORY_SIMS['respiratory-vmi-vcv-analysis']; return <C /> })()}
                {chapterIndex === 2 && (() => { const C = RESPIRATORY_SIMS['respiratory-vmi-pcv-analysis']; return <C /> })()}
                {chapterIndex === 3 && (() => { const C = RESPIRATORY_SIMS['respiratory-vmi-psv-analysis']; return <C /> })()}
                {chapterIndex === 4 && (() => { const C = RESPIRATORY_SIMS['respiratory-vmi-loops']; return <C /> })()}
                {chapterIndex >= 5 && (() => { const C = RESPIRATORY_SIMS['respiratory-peep-test']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S14' && (
              <div className="h-full w-full relative">
                {(() => { const C = RESPIRATORY_SIMS['respiratory-cuff-leak']; return <C /> })()}
              </div>
            )}`;

const startSearch = "{dbId === 'P2-S1' && (";
const endSearch = "{dbId === 'M1-S1' && (";

const startIdx = content.indexOf(startSearch);
const endIdx = content.indexOf(endSearch);

if (startIdx !== -1 && endIdx !== -1) {
  content = content.slice(0, startIdx) + replacement + '\n\n' + content.slice(endIdx);
  fs.writeFileSync(path, content);
  console.log('Replaced P2 simulations block with fallbacks successfully!');
} else {
  console.log('Could not find P2 block bounds');
}
