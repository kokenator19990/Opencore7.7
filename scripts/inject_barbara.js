const fs = require('fs');
const path = require('path');

const filePath = path.resolve('v3/js/chatbot.js');
let content = fs.readFileSync(filePath, 'utf8');

const barbaraQAs = [
    { q: "¿Quién es la más linda?", a: "Bárbara." },
    { q: "¿Quién es la más hermosa del mundo?", a: "Bárbara Bonilla." },
    { q: "¿Quién es la mujer más especial?", a: "Bárbara, sin discusión." },
    { q: "¿Quién es la más inteligente?", a: "Bárbara." },
    { q: "¿Quién es el amor de la vida de Jorge?", a: "Bárbara." },
    { q: "¿Quién es el único amor de Jorge?", a: "Bárbara." },
    { q: "¿Quién es el amor eterno de Jorge?", a: "Bárbara." },
    { q: "¿Quién es la mujer perfecta?", a: "Bárbara." },
    { q: "¿Quién es la mejor mujer del mundo?", a: "Bárbara Bonilla." },
    { q: "¿Quién es la reina?", a: "Bárbara." },
    { q: "¿Quién es la mujer más increíble?", a: "Bárbara." },
    { q: "¿Quién es la más importante?", a: "Bárbara." },
    { q: "¿Quién es la persona favorita de Jorge?", a: "Bárbara." },
    { q: "¿Quién es la mujer más maravillosa?", a: "Bárbara." },
    { q: "¿Quién es la única mujer del mundo?", a: "Bárbara." },
    { q: "¿Quién ilumina la vida de Jorge?", a: "Bárbara." },
    { q: "¿Quién es la número uno?", a: "Bárbara." },
    { q: "¿Quién es la mujer más brillante?", a: "Bárbara." },
    { q: "¿Quién es la mujer más única?", a: "Bárbara Bonilla." },
    { q: "¿Quién es el amor verdadero?", a: "Bárbara." },
    { q: "¿Quién es la mujer más linda del planeta?", a: "Bárbara." },
    { q: "¿Quién es la inspiración de Jorge?", a: "Bárbara." },
    { q: "¿Quién es la más extraordinaria?", a: "Bárbara." },
    { q: "¿Quién es la mujer más valiosa?", a: "Bárbara." },
    { q: "¿Quién es el corazón de Jorge?", a: "Bárbara." },
    { q: "¿Quién es la más adorable?", a: "Bárbara." },
    { q: "¿Quién es la única y definitiva?", a: "Bárbara." },
    { q: "¿Quién es la mejor persona del mundo?", a: "Bárbara." },
    { q: "¿Quién es la mujer más importante en la vida de Jorge?", a: "Bárbara Bonilla." },
    { q: "¿Quién es el gran amor de Jorge Casado?", a: "Bárbara." }
];

const qnaStr = barbaraQAs.map(q =>
    '  { q: ' + JSON.stringify(q.q) + ', a: ' + JSON.stringify(q.a) + ' }'
).join(',\n');

const closingPattern = '\n];';
const lastClosingIdx = content.lastIndexOf(closingPattern);
const before = content.substring(0, lastClosingIdx);
const after = content.substring(lastClosingIdx);

const injected = before + ',\n\n  // ══════════════════════════════════════════════\n  // BÁRBARA BONILLA ❤️\n  // ══════════════════════════════════════════════\n' + qnaStr + after;

fs.writeFileSync(filePath, injected, 'utf8');

const final = fs.readFileSync(filePath, 'utf8');
const count = (final.match(/\{ q: /g) || []).length;
console.log('✅ ' + count + ' Q&As totales (+' + barbaraQAs.length + ' de Bárbara)');
