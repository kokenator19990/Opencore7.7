const fs = require('fs');
const src = fs.readFileSync(require('path').resolve('v3/js/chatbot.js'), 'utf8');
const domMarker = 'document.addEventListener("DOMContentLoaded"';
const idx = src.indexOf(domMarker);
const coreCode = src.substring(0, idx) + '\nmodule.exports = { processInput, normalize };';
const tmpPath = require('path').resolve('scripts/_test_core.js');
fs.writeFileSync(tmpPath, coreCode, 'utf8');
let bot;
try { bot = require(tmpPath); } catch (e) { console.error('FATAL:', e.message); process.exit(1); }

// Debug specific failing inputs
const inputs = [
    "como estas", "como estas?", "cómo estás?", "como asi", "como así",
    "quien eres", "que haces", "hola como estas", "pero dime", "ok",
    "mmm", "ajá", "jaja", "gracias", "chao", "que es opencore",
    "son serios?", "son una estafa?", "necesito cotizar", "cuál es su teléfono",
    "cual es su email", "me pueden ayudar", "no entendí", "hola necesito ayuda",
    "cuanto cobran"
];

for (const input of inputs) {
    try {
        const result = bot.processInput(input);
        const short = result.text.substring(0, 80);
        const norm = bot.normalize(input);
        console.log('"' + input + '" → [norm: "' + norm + '"] → ' + short);
    } catch (e) {
        console.log('"' + input + '" → CRASH: ' + e.message);
    }
}

try { fs.unlinkSync(tmpPath); } catch (e) { }
