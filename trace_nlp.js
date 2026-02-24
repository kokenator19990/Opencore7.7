const fs = require('fs');

const code = fs.readFileSync('c:/Users/coook/Desktop/Opencore Web7.0/v4/js/chatbot.js', 'utf8');
const startIndex = code.indexOf('const qnaDB = [');
let bracketCount = 0; let endIndex = -1;
for (let i = startIndex + 'const qnaDB = '.length; i < code.length; i++) {
    if (code[i] === '[') bracketCount++;
    if (code[i] === ']') bracketCount--;
    if (bracketCount === 0) { endIndex = i + 1; break; }
}
const arrayString = code.substring(startIndex + 'const qnaDB = '.length, endIndex);
let qnaDB = eval("(" + arrayString + ")");

function normalize(str) {
    let s = str.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").replace(/[^\\w\\s]/gi, " ");
    s = s.replace(/^(hola|ola|wena|buenas?)(que|q|como|komo|cuanto|cual|kual|quien|kien|qn|tienen|ofrecen|pueden|necesito|quiero|me)\\b/ig, "$1 $2 ");
    return s.replace(/\\s+/g, " ").trim();
}

const stopWords = new Set(["a", "ante", "bajo", "cabe", "con", "contra", "de", "desde", "durante", "en", "entre", "hacia", "hasta", "mediante", "para", "por", "segun", "sin", "so", "sobre", "tras", "el", "la", "los", "las", "un", "una", "unos", "unas", "al", "del", "lo", "y", "o", "u", "e", "ni", "que"]);

function splitTokens(str) { return normalize(str).split(/\\s+/).filter(w => !stopWords.has(w) && w.length > 1); }

function getTrace(inputStr) {
    const norm = normalize(inputStr);
    const iTokens = splitTokens(inputStr);
    console.log(`Input: "${inputStr}" | Norm: "${norm}" | Tokens: [${iTokens.join(", ")}]`);

    for (const item of qnaDB) {
        const qn = normalize(item.q);
        const qTokens = splitTokens(item.q);

        if (norm === qn) {
            console.log(`EXACT MATCH with: "${item.q}"`);
            return;
        }
    }
    console.log("NO EXACT MATCH FOUND IN qnaDB!");
}

getTrace("dime las debilidades de opencore");
getTrace("fortalezas");
getTrace("que debilidades tienen");

