import fs from 'fs'

const file = 'data/caderno-content-m1-m8.ts'
let content = fs.readFileSync(file, 'utf8')

// The file exports SUBJECTS_DB which is an array of objects.
// We can parse it using regex or eval? It's a TS file, so evaluating it is hard.
// Let's just find the M2-S1 section
const startIndex = content.indexOf('"id": "M2-S1"')
const nextModuleIndex = content.indexOf('"id": "M2-S2"')

console.log(content.substring(startIndex, nextModuleIndex))