const fs = require('fs');

const v3Path = 'c:/Users/coook/Desktop/Opencore Web7.0/v3/js/chatbot.js';
const v4Path = 'c:/Users/coook/Desktop/Opencore Web7.0/v4/js/chatbot.js';

let v3Content = fs.readFileSync(v3Path, 'utf8');
let v4Content = fs.readFileSync(v4Path, 'utf8');

const newTokenizer = `function tokenize(str) {
  let tokens = normalize(str).split(/\\s+/).filter(w => w.length > 1 && !stopWords.has(w));
  if (tokens.length > 2) {
    const greetings = new Set(["hola", "ola", "hello", "hi", "hey", "wena", "buenas", "buenos", "saludos"]);
    tokens = tokens.filter(w => !greetings.has(w));
  }
  return tokens;
}`;

const oldTokenizer = `function tokenize(str) {
  return normalize(str).split(/\\s+/).filter(w => w.length > 1 && !stopWords.has(w));
}`;

let matches = [];
// Match standard Q&A items
const regex = /  \{ q: "(.*?)", a: "(.*?)" \},?/g;
let match;
while ((match = regex.exec(v4Content)) !== null) {
    const qLower = match[1].toLowerCase();
    if (!qLower.startsWith("hola") && !qLower.startsWith("buen") && !qLower.startsWith("hi ") && !qLower.startsWith("hey")) {
        matches.push({ q: match[1], a: match[2] });
    }
}

let selected = matches.filter(m =>
    m.q.includes('precio') || m.q.includes('está hecha') || m.q.includes('cuesta') || m.q.includes('cobran') ||
    m.q.includes('proyecto') || m.q.includes('servicio') || m.q.includes('experiencia') ||
    m.q.includes('seguridad') || m.q.includes('tecnología') || m.q.includes('hacen') ||
    m.q.includes('como') || m.q.includes('qué') || m.q.includes('cuanto') || m.q.includes('cuándo') || m.q.includes('ofrecen')
).slice(0, 50);

if (selected.length < 50) {
    const extra = matches.filter(m => !selected.includes(m));
    selected = selected.concat(extra.slice(0, 50 - selected.length));
}

let holaBlock = "\n  // ═══ ESCENARIOS COMBINADOS: HOLA + PREGUNTA ═══\n";
selected.forEach(m => {
    let qText = m.q;
    if (qText.startsWith('¿')) qText = qText.substring(1);
    holaBlock += '  { q: "Hola, ¿' + qText + '", a: "' + m.a.replace(/"/g, '\\"') + '" },\n';
});
// Remove last comma and newline, just to be clean
holaBlock = holaBlock.replace(/,\n$/, "\n");

v3Content = v3Content.replace(oldTokenizer, newTokenizer);
v4Content = v4Content.replace(oldTokenizer, newTokenizer);

// Find the end of max array
const replaceRegex = /\\];\\s*\\/\\/ ══════════════════════════════════════════════════════════\\s*\\/\\/  NLP ENGINE v3\\.7/g;

const replacementString = "," + holaBlock + "];\n\n// ══════════════════════════════════════════════════════════\n//  NLP ENGINE v3.7";

v3Content = v3Content.replace(/\];\s*\/\/\s*══════════════════════════════════════════════════════════\s*\/\/\s*NLP ENGINE v3\.7/, replacementString);
v4Content = v4Content.replace(/\];\s*\/\/\s*══════════════════════════════════════════════════════════\s*\/\/\s*NLP ENGINE v3\.7/, replacementString);

fs.writeFileSync(v3Path, v3Content, 'utf8');
fs.writeFileSync(v4Path, v4Content, 'utf8');

console.log("Success patching NLP and adding 50 scenarios.");
