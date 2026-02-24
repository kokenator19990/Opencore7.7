const fs = require('fs');
const filePath = require('path').resolve('v3/js/chatbot.js');
let c = fs.readFileSync(filePath, 'utf8');

// The current order in processInput is:
// 1. Profanity
// 2. Person Entity (handlePersonEntity) 
// 2.5 Barbara Intent Detection
// We need to swap so Barbara comes FIRST, then Person Handler

// Strategy: Remove personMatch block, then re-add it AFTER Barbara

// Step 1: Remove person handler call
const personCallBlock = '  // 2. Person Entity and Disambiguation (Jorge Sr/Jr, Unknown persons)\r\n  const personMatch = handlePersonEntity(cleanInput);\r\n  if (personMatch) return personMatch;\r\n\r\n';
const personCallBlockLF = personCallBlock.replace(/\r\n/g, '\n');

if (c.includes(personCallBlock)) {
    c = c.replace(personCallBlock, '');
    console.log('Removed CRLF version of personMatch block');
} else if (c.includes(personCallBlockLF)) {
    c = c.replace(personCallBlockLF, '');
    console.log('Removed LF version of personMatch block');
} else {
    // Try a more flexible approach
    const lines = c.split(/\r?\n/);
    const newLines = [];
    let skipCount = 0;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('Person Entity and Disambiguation')) {
            skipCount = 3; // skip this line + next 2 (const personMatch... + if (personMatch)... + blank)
            console.log('Found Person Entity line at ' + (i + 1) + ', skipping 3 lines');
            continue;
        }
        if (skipCount > 0) { skipCount--; continue; }
        newLines.push(lines[i]);
    }
    c = newLines.join('\n');
}

// Step 2: Add personMatch AFTER Barbara Intent Detection block
const afterBarbara = '  if (isBarbaraLove(cleanInput)) {\r\n    return { text: getBarbaraResponse(cleanInput), suggestions: [] };\r\n  }';
const afterBarbaraLF = afterBarbara.replace(/\r\n/g, '\n');

const insertBlock = '\n\n  // 3. Person Entity and Disambiguation (Jorge Sr/Jr, Unknown persons)\n  const personMatch = handlePersonEntity(cleanInput);\n  if (personMatch) return personMatch;';

if (c.includes(afterBarbara)) {
    c = c.replace(afterBarbara, afterBarbara + insertBlock);
    console.log('Inserted personMatch AFTER Barbara (CRLF)');
} else if (c.includes(afterBarbaraLF)) {
    c = c.replace(afterBarbaraLF, afterBarbaraLF + insertBlock);
    console.log('Inserted personMatch AFTER Barbara (LF)');
} else {
    console.log('⚠️ Could not find Barbara block to insert after');
}

// Step 3: Fix comment numbering
c = c.replace('  // 2.5 Bárbara Intent Detection (semantic, with business filter)', '  // 2. Bárbara Intent Detection (semantic, with business filter)');

fs.writeFileSync(filePath, c, 'utf8');

// Verify order
const pIdx = c.indexOf('isBarbaraLove(cleanInput)');
const hIdx = c.indexOf('handlePersonEntity(cleanInput)');
console.log('Barbara position: ' + pIdx);
console.log('PersonHandler position: ' + hIdx);
console.log('Barbara BEFORE PersonHandler: ' + (pIdx < hIdx));
