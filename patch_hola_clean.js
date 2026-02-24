const fs = require('fs');
const v3Path = 'c:/Users/coook/Desktop/Opencore Web7.0/v3/js/chatbot.js';
const v4Path = 'c:/Users/coook/Desktop/Opencore Web7.0/v4/js/chatbot.js';
let v4Content = fs.readFileSync(v4Path, 'utf8');

const oldTokenizer = `function tokenize(str) {
  return normalize(str).split(/\\s+/).filter(w => w.length > 1 && !stopWords.has(w));
}`;
const newTokenizer = `function tokenize(str) {
  let tokens = normalize(str).split(/\\s+/).filter(w => w.length > 1 && !stopWords.has(w));
  if (tokens.length > 2) {
    const greetings = new Set(["hola", "ola", "hello", "hi", "hey", "wena", "buenas", "buenos", "saludos"]);
    tokens = tokens.filter(w => !greetings.has(w));
  }
  return tokens;
}`;

let matches = [];
const regex = /  \{ q: "(.*?)", a: "(.*?)" \},?/g;
let match;
while ((match = regex.exec(v4Content)) !== null) {
    const qLower = match[1].toLowerCase();
    if (!qLower.startsWith("hola") && !qLower.startsWith("buen") && !qLower.startsWith("hi ") && !qLower.startsWith("hey")) {
        matches.push({ q: match[1], a: match[2] });
    }
}

let selected = matches.filter(m =>
    m.q.includes('precio') || m.q.includes('cuesta') || m.q.includes('cobran') ||
    m.q.includes('proyecto') || m.q.includes('servicio') || m.q.includes('experiencia') ||
    m.q.includes('seguridad') || m.q.includes('tecnología') || m.q.includes('hacen') ||
    m.q.includes('como') || m.q.includes('qué') || m.q.includes('cuanto') || m.q.includes('cuándo') || m.q.includes('ofrecen')
).slice(0, 50);

if (selected.length < 50) {
    const extra = matches.filter(m => !selected.includes(m));
    selected = selected.concat(extra.slice(0, 50 - selected.length));
}

let holaBlock = "\\n  // ═══ ESCENARIOS COMBINADOS: HOLA + PREGUNTA ═══\\n";
selected.forEach(m => {
    let qText = m.q;
    if (qText.startsWith('¿')) qText = qText.substring(1);
    holaBlock += '  { q: "Hola, ¿' + qText + '", a: "' + m.a.replace(/"/g, '\\"') + '" },\\n';
});

function patchFile(content) {
    content = content.replace(oldTokenizer, newTokenizer);
    const splitStr = "\\n];\\n\\n// ══════════════════════════════════════════════════════════";
    const parts = content.split(splitStr);
    if (parts.length >= 2) {
        // Re-join with the new block between the last element of the first part
        return parts[0] + "," + holaBlock + "];\\n\\n// ══════════════════════════════════════════════════════════" + parts.slice(1).join(splitStr);
    } else {
        // Try again with Windows style line endings
        const splitStrWindows = "\\r\\n];\\r\\n\\r\\n// ══════════════════════════════════════════════════════════";
        const partsWin = content.split(splitStrWindows);
        if (partsWin.length >= 2) {
            return partsWin[0] + "," + holaBlock + "\\r\\n];\\r\\n\\r\\n// ══════════════════════════════════════════════════════════" + partsWin.slice(1).join(splitStrWindows);
        }
        console.log("Could not find NLP split string marker");
    }
    return content;
}

fs.writeFileSync(v3Path, patchFile(fs.readFileSync(v3Path, 'utf8')), 'utf8');
fs.writeFileSync(v4Path, patchFile(v4Content), 'utf8');
console.log("Success");
