const fs = require('fs');
const path = require('path');

const filePath = path.resolve('v3/js/chatbot.js');
let content = fs.readFileSync(filePath, 'utf8');

// ═══════════════════════════════════════════════════
// FIX 1: The general QAs were injected INSIDE quickReplies array.
// We need to move them to qnaDB and fix quickReplies.
// ═══════════════════════════════════════════════════

// Find and fix quickReplies - replace from "const quickReplies" to the misplaced closing
const qrStart = content.indexOf('const quickReplies = [');
const badSection = content.indexOf('\n  // ══════════════════════════════════════════════\n  // CULTURA GENERAL');

// Extract the misplaced Q&As
const barbaraEnd = content.indexOf('\n];\n\nconst badWords');
// Actually let's find a better structure

// Strategy: Find the CORRECT qnaDB ending and the engine code section
// The qnaDB should end before badWords
const badWordsIdx = content.indexOf('\nconst badWords');

// Everything from start to badWords is the data section
const dataSection = content.substring(0, badWordsIdx);
const engineSection = content.substring(badWordsIdx);

// In the data section, find where quick replies got mixed in
// The quickReplies start embedded the general knowledge QAs incorrectly
// Let's extract all { q: "...", a: "..." } entries from the data section
const qaPattern = /\{ q: ("[^"]+"), a: ("[^"]+(?:\\.[^"]*)*") \}/g;
const allQAs = [];
let match;
while ((match = qaPattern.exec(dataSection)) !== null) {
    allQAs.push({ q: match[1], a: match[2] });
}

console.log('Extracted ' + allQAs.length + ' Q&As from data section');

// Deduplicate by question text
const seen = new Set();
const uniqueQAs = [];
for (const qa of allQAs) {
    const key = qa.q.toLowerCase();
    if (!seen.has(key)) {
        seen.add(key);
        uniqueQAs.push(qa);
    }
}
console.log('After dedup: ' + uniqueQAs.length + ' unique Q&As');

// FIX 2: Fix quickReplies in engine section - make them FORMAL
const formalQuickReplies = `const quickReplies = [
  "Consultar servicios disponibles",
  "Conocer estructura de tarifas",
  "Revisar experiencia y trayectoria",
  "Información sobre migraciones empresariales"
];`;

// Fix the engine section - replace the broken quickReplies
let fixedEngine = engineSection;

// Find the quickReplies in the engine
const qrInEngine = fixedEngine.indexOf('const quickReplies = [');
if (qrInEngine !== -1) {
    // Find its closing - it might be malformed, find next const/function/var
    const afterQR = fixedEngine.indexOf('];', qrInEngine);
    if (afterQR !== -1) {
        fixedEngine = fixedEngine.substring(0, qrInEngine) +
            formalQuickReplies +
            fixedEngine.substring(afterQR + 2);
    }
}

// FIX 3: Fix the HTML quick reply button labels to be formal
fixedEngine = fixedEngine.replace(
    'data-q="¿Qué servicios ofrece OpenCORE?">Servicios</button>',
    'data-q="¿Qué servicios ofrece OpenCORE?">Servicios disponibles</button>'
);
fixedEngine = fixedEngine.replace(
    'data-q="¿Cuánto cobran?">Costos</button>',
    'data-q="¿Cuál es la estructura de tarifas de OpenCORE?">Estructura de tarifas</button>'
);
fixedEngine = fixedEngine.replace(
    'data-q="¿Cuántos años de experiencia tienen?">Experiencia</button>',
    'data-q="¿Cuántos años de experiencia tiene OpenCORE?">Trayectoria y experiencia</button>'
);
fixedEngine = fixedEngine.replace(
    'data-q="¿Pueden ayudarme con una migración?">Migraciones</button>',
    'data-q="¿Qué tipo de migraciones empresariales realizan?">Migraciones empresariales</button>'
);

// Rebuild qnaDB
const qnaDBStr = 'const qnaDB = [\n' +
    uniqueQAs.map(qa => '  { q: ' + qa.q + ', a: ' + qa.a + ' }').join(',\n') +
    '\n];\n';

// Write back
const header = `/* ========================================================
   CHATBOT V3 PRO - OPENCORE NLP ENGINE
   Versión: 3.2 | Build: ${new Date().toISOString().slice(0, 10)}
   Features: Levenshtein, N-gram, Stopwords, Quick Replies,
             Sentiment Guard, Greeting/Farewell Detection
             Formal Tone Audit Applied
======================================================== */

`;

const output = header + qnaDBStr + '\n' + fixedEngine;
fs.writeFileSync(filePath, output, 'utf8');

// Verify
const final = fs.readFileSync(filePath, 'utf8');
const finalCount = (final.match(/\{ q: "/g) || []).length;
const hasQuickReplies = final.includes('Consultar servicios disponibles');
const hasOldInformal = final.includes('"¿Cuánto cobran?"');
console.log('✅ Rebuilt with ' + finalCount + ' Q&As');
console.log('   Formal quick replies: ' + hasQuickReplies);
console.log('   Old informal removed: ' + !hasOldInformal);
console.log('   File size: ' + (final.length / 1024).toFixed(1) + 'KB');
