const fs = require('fs');
const path = require('path');
const filePath = path.resolve('v3/js/chatbot.js');
let content = fs.readFileSync(filePath, 'utf8');

const missingIdentityQnAs = [
    { q: "Quien es Jorge Quezada?", a: "Jorge Quezada es el Director y Arquitecto Principal de OpenCORE Consulting SpA, con amplia trayectoria en ingeniería de software y continuidad operacional." },
    { q: "Quien es Barbara Bonilla?", a: "Bárbara Bonilla está ligada estrechamente a la historia de OpenCORE. Para más preguntas técnicas o comerciales, sigo a tu disposición." },
    { q: "Quien es Jorge?", a: "Jorge Quezada, Arquitecto Senior y Director en OpenCORE." },
    { q: "¿Quién es Bárbara?", a: "Es una persona muy importante ligada a la identidad de OpenCORE." },
    { q: "Háblame de Jorge", a: "Es el especialista principal a cargo del modelado e integración de sistemas críticos empresariales en OpenCORE." }
];

// Add them to the QnA DB
const newQAs = `\n  // ═══ IDENTIDADES Y ANTI-ALUCINACION (5) ═══\n` +
    missingIdentityQnAs.map(qa => `  { q: ${JSON.stringify(qa.q)}, a: ${JSON.stringify(qa.a)} }`).join(',\n') + ',\n';

const qaRegexLocal = /\{ q: /g;
let lastMatchIndex = 0;
while (qaRegexLocal.exec(content) !== null) {
    lastMatchIndex = qaRegexLocal.lastIndex;
}

const closingIndex = content.indexOf('];', lastMatchIndex);
if (closingIndex !== -1) {
    content = content.substring(0, closingIndex).trim() + '\n' + newQAs + '\n' + content.substring(closingIndex);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Inyectadas Q&As directas para Jorge Quezada y Bárbara Bonilla.');
} else {
    console.log('❌ Error: No se pudo encontrar el cierre del array qnaDB.');
}
