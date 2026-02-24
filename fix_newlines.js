const fs = require('fs');
const v3Path = 'c:/Users/coook/Desktop/Opencore Web7.0/v3/js/chatbot.js';
const v4Path = 'c:/Users/coook/Desktop/Opencore Web7.0/v4/js/chatbot.js';

function fixNewlines(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Find where the block starts
    const marker = ', \\n\\n  // ═══ ESCENARIOS COMBINADOS: HOLA + PREGUNTA ═══\\n';
    let idx = content.indexOf(marker);
    if (idx !== -1) {
        // Find the '];' that follows it
        let endIdx = content.indexOf('];', idx);
        if (endIdx !== -1) {
            let badBlock = content.substring(idx, endIdx + 2);
            let goodBlock = badBlock.replace(/\\n/g, '\\n');
            let newContent = content.substring(0, idx) + goodBlock + content.substring(endIdx + 2);
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log("Fixed " + filePath);
        }
    } else {
        console.log("Marker not found in " + filePath);
    }
}

fixNewlines(v3Path);
fixNewlines(v4Path);
