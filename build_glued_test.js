const fs = require('fs');
let code = fs.readFileSync('c:/Users/coook/Desktop/Opencore Web7.0/v4/js/chatbot.js', 'utf8');

let domIndex = code.indexOf('document.addEventListener');
if (domIndex !== -1) code = code.substring(0, domIndex);
let initChatIndex = code.indexOf('function initChat');
if (initChatIndex !== -1 && initChatIndex < domIndex) code = code.substring(0, initChatIndex);

let testLogic = `
const queries = [
    "holaque ofrecen",
    "holatienen",
    "buenastardesque servicios tienen disponibles",
    "buenasnochesnecesito un proyecto",
    "buenosdiassirven para esto",
    "holame gustaria trabajar con ustedes"
];

console.log("=== INICIO TEST ATTACHED GREETINGS ===");
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

fs.writeFileSync('c:/Users/coook/Desktop/Opencore Web7.0/test_glued_greetings.js', code + "\n" + testLogic, 'utf8');
