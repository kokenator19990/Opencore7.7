const fs = require('fs');
const path = require('path');
const filePath = path.resolve('v3/js/chatbot.js');
const content = fs.readFileSync(filePath, 'utf8');

// ═══════════════════════════════════════════════════════════
// STRATEGY: Extract ALL {q:..., a:...} entries from the ENTIRE file,
// rebuild qnaDB cleanly, fix quickReplies as string-only array,
// and preserve ALL engine code (functions, DOM, etc.)
// ═══════════════════════════════════════════════════════════

// 1. Extract all Q&A objects using regex
const qaRegex = /\{ q: ("(?:[^"\\]|\\.)*"), a: ("(?:[^"\\]|\\.)*") \}/g;
const allQAs = [];
let match;
while ((match = qaRegex.exec(content)) !== null) {
    allQAs.push({ q: match[1], a: match[2] });
}
console.log('Total Q&As extracted: ' + allQAs.length);

// 2. Deduplicate by question
const seen = new Set();
const uniqueQAs = [];
for (const qa of allQAs) {
    const key = qa.q.toLowerCase();
    if (!seen.has(key)) {
        seen.add(key);
        uniqueQAs.push(qa);
    }
}
console.log('Unique Q&As: ' + uniqueQAs.length);

// 3. Find the engine code (everything from "const badWords" onwards)
const engineStart = content.indexOf('\nconst badWords');
if (engineStart === -1) {
    console.error('ERROR: Cannot find engine start marker');
    process.exit(1);
}
let engineCode = content.substring(engineStart);

// 4. Fix quickReplies in engine code - replace the ENTIRE broken array
const qrStart = engineCode.indexOf('const quickReplies = [');
if (qrStart !== -1) {
    // Find the actual end of this array - need to count brackets
    let depth = 0;
    let qrEnd = -1;
    const searchFrom = qrStart + 'const quickReplies = ['.length;
    for (let i = searchFrom; i < engineCode.length; i++) {
        if (engineCode[i] === '[') depth++;
        if (engineCode[i] === ']') {
            if (depth === 0) {
                // Find the semicolon after
                qrEnd = engineCode.indexOf(';', i) + 1;
                break;
            }
            depth--;
        }
    }

    if (qrEnd > 0) {
        const before = engineCode.substring(0, qrStart);
        const after = engineCode.substring(qrEnd);
        engineCode = before + `const quickReplies = [
  "Consultar servicios disponibles",
  "Conocer estructura de tarifas",
  "Revisar experiencia y trayectoria",
  "Información sobre migraciones empresariales"
];` + after;
        console.log('Fixed quickReplies array');
    }
}

// 5. Rebuild the complete file
const header = content.substring(0, content.indexOf('\nconst qnaDB'));
const qnaDBStr = '\nconst qnaDB = [\n' +
    uniqueQAs.map(qa => '  { q: ' + qa.q + ', a: ' + qa.a + ' }').join(',\n') +
    '\n];\n';

const output = header + qnaDBStr + engineCode;

fs.writeFileSync(filePath, output, 'utf8');

// 6. Verify
const final = fs.readFileSync(filePath, 'utf8');

// Check quickReplies is clean strings only
const qrMatch = final.match(/const quickReplies = \[([\s\S]*?)\];/);
const hasObjectInQR = qrMatch && qrMatch[1].includes('{ q:');
const qrItems = qrMatch ? qrMatch[1].match(/"[^"]+"/g) : [];

const finalCount = (final.match(/\{ q: /g) || []).length;
const hasProcessInput = final.includes('function processInput');
const hasBarbaraEngine = final.includes('function isBarbaraLove');
const hasLevenshtein = final.includes('function levenshtein');

console.log('');
console.log('═══ VERIFICATION ═══');
console.log('Q&As in qnaDB: ' + finalCount);
console.log('quickReplies clean (no objects): ' + !hasObjectInQR);
console.log('quickReplies items: ' + (qrItems ? qrItems.length : 0));
console.log('processInput exists: ' + hasProcessInput);
console.log('Barbara engine exists: ' + hasBarbaraEngine);
console.log('Levenshtein exists: ' + hasLevenshtein);
console.log('File size: ' + (final.length / 1024).toFixed(1) + 'KB');
