const fs = require('fs');

function fixSyntax(path) {
    let content = fs.readFileSync(path, 'utf8');
    let badString = ', \\n\\n  // ═══ ESCENARIOS COMBINADOS: HOLA + PREGUNTA ═══\\n';
    let idx = content.indexOf(badString);
    if (idx !== -1) {
        let endIdx = content.indexOf('];', idx);
        let segment = content.substring(idx, endIdx);
        // We replace backslash-n with REAL newline
        segment = segment.replace(/\\n/g, '\n');
        content = content.substring(0, idx) + segment + content.substring(endIdx);
        fs.writeFileSync(path, content, 'utf8');
        console.log("Fixed syntax in " + path);
    } else {
        console.log("Could not find bad block in " + path);
    }
}

fixSyntax('c:/Users/coook/Desktop/Opencore Web7.0/v3/js/chatbot.js');
fixSyntax('c:/Users/coook/Desktop/Opencore Web7.0/v4/js/chatbot.js');
