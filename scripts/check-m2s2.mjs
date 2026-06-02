import fs from 'fs'

const file = 'data/caderno-content-m1-m8.ts'
let content = fs.readFileSync(file, 'utf8')

const startIndex = content.indexOf('"id": "M2-S2"')
if (startIndex !== -1) {
  const nextModuleIndex = content.indexOf('"id": "M2-S3"', startIndex)
  if (nextModuleIndex !== -1) {
    console.log(content.substring(startIndex, nextModuleIndex))
  } else {
    console.log("End of array or M2-S3 not found")
    console.log(content.substring(startIndex, startIndex + 5000))
  }
} else {
  console.log("M2-S2 not found")
}