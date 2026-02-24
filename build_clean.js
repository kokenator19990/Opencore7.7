const fs = require('fs');
let code = fs.readFileSync('c:/Users/coook/Desktop/Opencore Web7.0/v4/js/chatbot.js', 'utf8');

// Strip out everything after document.addEventListener to avoid DOM errors in Node
let domIndex = code.indexOf('document.addEventListener');
if (domIndex !== -1) {
    code = code.substring(0, domIndex);
}
let initChatIndex = code.indexOf('function initChat');
if (initChatIndex !== -1 && initChatIndex < domIndex) {
    code = code.substring(0, initChatIndex);
}

// We just append our test logic to this pure engine code
let testLogic = `
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

console.log("=== INICIO TEST ===");
for (let q of queries) {
    let match = getBestMatch(q);
    console.log("PREGUNTA: " + q);
    console.log("  TOKENS: " + tokenize(q).join(", "));
    console.log("  CONF:   " + (match ? match.confidence.toFixed(2) : "0.00"));
    console.log("  MATCH:  " + (match ? match.answer.substring(0,60) + "..." : "NADAAA"));
    console.log("-----------------------------------------");
}
console.log("=== FIN TEST ===");
`;

fs.writeFileSync('c:/Users/coook/Desktop/Opencore Web7.0/run_audio_test_clean.js', code + "\n" + testLogic, 'utf8');
