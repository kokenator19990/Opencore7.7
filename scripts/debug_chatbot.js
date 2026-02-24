const fs = require('fs');
const path = require('path');

// Read the current chatbot file
const filePath = path.resolve('v3/js/chatbot.js');
const content = fs.readFileSync(filePath, 'utf8');

// Check current state
const hasQNA = content.includes('{ q:');
const lineCount = content.split('\n').length;
console.log('File has ' + lineCount + ' lines');
console.log('Has Q&A data: ' + hasQNA);

// Find the qnaDB pattern more robustly
const patterns = [
    'const qnaDB = [',
    'const qnaDB= [',
];
let found = false;
for (const p of patterns) {
    if (content.includes(p)) {
        console.log('Found pattern: ' + p);
        found = true;
    }
}
if (!found) {
    console.log('WARNING: qnaDB not found in current file');
}

// Show first 200 chars
console.log('First 200 chars: ' + content.substring(0, 200));
