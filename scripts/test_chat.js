const fs = require('fs');
const code = fs.readFileSync('v3/js/chatbot.js', 'utf8');

// Minimal DOM mock to allow eval of chatbot.js without throwing errors
const mockEl = {
    classList: { toggle: () => { }, add: () => { }, remove: () => { } },
    addEventListener: () => { },
    style: {},
    appendChild: () => { },
    dataset: {}
};
const document = {
    addEventListener: () => { },
    body: { insertAdjacentHTML: () => { }, appendChild: () => { } },
    getElementById: () => mockEl,
    createElement: () => mockEl
};
const window = {};

// We catch all console output or simply eval
try {
    eval(code);
} catch (e) {
    // ignoring initialization errors from strict DOM manipulation
}

const queries = [
    "quiero cotizar",
    "tienen un telefono para contactarlos",
    "jajaj un telefono para llamar?",
    "si",
    "quiero automatizar mi empresa 11",
    "quiero que me llamen",
    "si",
    "quiero que me contacten tengo una empresa",
    "quiero contratar",
    "llamanme inmediatamente"
];

console.log("=== INICIANDO BATERIA DE TESTS ===");

queries.forEach(q => {
    // Let's call processInput safely
    if (typeof processInput === 'function') {
        const resp = processInput(q);
        console.log("\\n[USER]: " + q);
        console.log("[BOT]: " + resp.text.replace(/<[^>]*>?/gm, '').substring(0, 150) + "...");
    } else {
        console.log("Error: processInput no está disponible en este scope.");
    }
});
