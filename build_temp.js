const fs = require('fs');
let content = fs.readFileSync('c:/Users/coook/Desktop/Opencore Web7.0/v4/js/chatbot.js', 'utf8');

// The chatbot.js has window onload and DOM manipulation at the end which we must strip out so it runs in Node.
// We only need everything up to the definition of getBestMatch, tokens, synonyms, etc.
// A simpler way: just append to the end: 
// But if it has DOM interactions (like document.getElementById), Node throws.
// Let's replace 'document.' and 'window.' with something dummy, or just slice out the init code.

// Alternatively, let's extract only the DB and engine.
// Extract from 'const stopWords' or 'const qnaDB' to the end of getBestMatch.

let startIdx = content.indexOf('const qnaDB = [');
let endIdx = content.indexOf('function initChat()');
if (endIdx === -1) endIdx = content.indexOf('document.addEventListener');

let engineCode = content.substring(startIdx, endIdx);

const queries = [
    "Hola que ofrecen",
    "Hola que tienen",
    "Hola que productos tienen a la venta",
    "Hola que servicios tienen disponibles",
    "Hola quiero hacer un proyecto",
    "Hola me gustaria trabajar con ustedes",
    "Hola son caros",
    "Hola que ofrecen que tienen que productos tienen a la venta quiero hacer un proyecto",
    "hola que servicios tienen disponibles me gustaria saber si son muy caros y ver si puedo hacer algo con ustedes",
    "hola me gustaria trabajar con ustedes quiero hacer un proyecto super grande que necesito saber que me ofrecen"
];

let testCode = engineCode + `\n
function runAudioTests() {
    console.log("=== AUDIO QUERIES TEST ===");
    for (const q of ${JSON.stringify(queries)}) {
        let match = getBestMatch(q);
        console.log("QUERY: " + q);
        console.log("  TOKENS : " + tokenize(q).join(", "));
        console.log("  MATCH  : " + (match ? match.q : "NO MATCH"));
        console.log("  CONF   : " + (match ? match.score.toFixed(2) : "0.00"));
        console.log("  ANSWER : " + (match ? match.a.substring(0, 60) + "..." : ""));
        console.log("-".repeat(50));
    }
}
runAudioTests();
`;

fs.writeFileSync('c:/Users/coook/Desktop/Opencore Web7.0/temp_test2.js', testCode, 'utf8');
