const fs = require('fs');

const m1ContentRaw = fs.readFileSync('data/caderno-content-m1.ts', 'utf8');

// We just need to extract the raw text blocks and manually map them to the 4 subjects.
// I will just read the original file and manually build the N1-S1, N1-S2, N1-S3, N1-S4 exactly as it was.

// Let's first read the file, and I will write a simple regex or just evaluate it if possible.