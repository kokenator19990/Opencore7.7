const fs = require('fs');
const v4Path = 'c:/Users/coook/Desktop/Opencore Web7.0/v4/js/chatbot.js';
let v4Content = fs.readFileSync(v4Path, 'utf8');

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

fs.writeFileSync('c:/Users/coook/Desktop/Opencore Web7.0/hola_insert.txt', holaBlock, 'utf8');
console.log("Variations written to hola_insert.txt");
