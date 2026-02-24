const fs = require('fs');
const filePath = require('path').resolve('v3/js/chatbot.js');
const src = fs.readFileSync(filePath, 'utf8');

const domMarker = 'document.addEventListener("DOMContentLoaded"';
const coreCode = src.substring(0, src.indexOf(domMarker));
const wrappedCode = coreCode + '\n\nmodule.exports = { processInput };';
const tmpPath = require('path').resolve('scripts/_test_core.js');
fs.writeFileSync(tmpPath, wrappedCode, 'utf8');

let bot;
try { bot = require(tmpPath); } catch (e) { console.error('FATAL:', e.message); process.exit(1); }

const tests = [
    // IDENTIDAD
    { input: "que es opencore?", must: ["opencore"], mustNot: ["Leonardo"], cat: "Identidad" },
    { input: "¿Qué es OpenCORE?", must: ["opencore"], cat: "Identidad" },
    { input: "que es opencore consulting?", must: ["opencore"], cat: "Identidad" },
    { input: "quien es opencore?", must: ["opencore"], cat: "Identidad" },
    { input: "donde opera opencore?", must: ["chile"], cat: "Identidad" },
    { input: "cuantos anos tiene opencore?", must: ["1998", "2015"], cat: "Identidad" },

    // PRECIOS
    { input: "cuales son sus precios?", must: ["uf"], mustNot: ["mejores del mercado"], cat: "Precios" },
    { input: "cuanto cobran por hora?", must: ["uf"], cat: "Precios" },
    { input: "son caros?", mustNot: ["Leonardo", "raiz"], cat: "Precios" },
    { input: "precios de opencore", must: ["uf"], mustNot: ["120 a 150"], cat: "Precios" },

    // SERVICIOS
    { input: "que servicios ofrecen?", must: ["migra"], cat: "Servicios" },
    { input: "hacen sistemas de inventario?", must: ["inventario"], cat: "Servicios" },
    { input: "pueden hacer un sistema?", must: ["sistema"], cat: "Servicios" },
    { input: "integran SAP?", must: ["sap"], cat: "Servicios" },

    // SALUDOS
    { input: "hola", must: ["hola"], cat: "Saludos" },
    { input: "buenas tardes", must: ["hola"], cat: "Saludos" },
    { input: "gracias", mustNot: ["Leonardo"], cat: "Saludos" },
    { input: "chao", mustNot: ["Leonardo"], cat: "Saludos" },

    // BARBARA
    { input: "quien es la mas linda?", must: ["bárbara"], cat: "Barbara" },
    { input: "quien es la mas hermosa del mundo?", must: ["bárbara"], cat: "Barbara" },
    { input: "quien es la proxima miss universo?", must: ["bárbara"], cat: "Barbara" },
    { input: "cual es la solucion mas inteligente para mi negocio?", mustNot: ["bárbara"], cat: "Barbara-Block" },
    { input: "que IA inteligente recomiendan para mi empresa?", mustNot: ["bárbara"], cat: "Barbara-Block" },

    // PERSONAJES
    { input: "quien es jorge quezada?", must: ["jorge", "quezada"], cat: "Jorge" },
    { input: "quien es elon musk?", must: ["no dispongo"], mustNot: ["Leonardo", "Vinci"], cat: "PersonaDesconocida" },
    { input: "quien es pedro pascal?", must: ["no dispongo"], mustNot: ["Leonardo"], cat: "PersonaDesconocida" },

    // ANTI-ALUCINACIÓN (inputs vagos)
    { input: "pero dime", mustNot: ["Leonardo", "Vinci", "raiz cuadrada", "time-to-market"], cat: "Anti-Aluc" },
    { input: "ok", mustNot: ["Leonardo", "raiz", "cuadrada"], cat: "Anti-Aluc" },
    { input: "y?", mustNot: ["Leonardo", "raiz", "matemat"], cat: "Anti-Aluc" },
    { input: "que?", mustNot: ["Leonardo", "raiz"], cat: "Anti-Aluc" },
    { input: "mmm", mustNot: ["Leonardo", "raiz", "matemat"], cat: "Anti-Aluc" },
    { input: "a", mustNot: ["Leonardo"], cat: "Anti-Aluc" },

    // CALIDAD
    { input: "son buenos sus productos?", must: ["mejor", "calidad"], cat: "Calidad" },
    { input: "son confiables?", mustNot: ["Leonardo"], cat: "Calidad" },
    { input: "puedo confiar en opencore?", mustNot: ["Leonardo"], cat: "Calidad" },

    // PROFANITY
    { input: "son unos estafadores de mierda", must: ["no respondemos"], cat: "Profanity" },

    // OBJECIONES
    { input: "tuve una mala experiencia antes", must: ["opencore"], cat: "Objeciones" },

    // TECNOLOGÍA
    { input: "manejan AWS?", must: ["aws"], cat: "Tecnología" },
    { input: "trabajan con React?", must: ["react"], cat: "Tecnología" },
    { input: "programan en Python?", must: ["python"], cat: "Tecnología" },

    // CONVERSACIONAL
    { input: "necesito ayuda", mustNot: ["Leonardo", "Vinci"], cat: "Conversacional" },
    { input: "son una estafa?", must: ["spa"], cat: "Conversacional" },
];

let passed = 0, failed = 0;
const failures = [];

for (const t of tests) {
    try {
        const result = bot.processInput(t.input);
        const answer = result.text.toLowerCase();
        let ok = true, reason = '';

        if (t.must) {
            for (const kw of t.must) {
                if (!answer.includes(kw.toLowerCase())) { ok = false; reason += `MISSING "${kw}" | `; }
            }
        }
        if (t.mustNot) {
            for (const kw of t.mustNot) {
                if (answer.includes(kw.toLowerCase())) { ok = false; reason += `HAS "${kw}" | `; }
            }
        }

        if (ok) { passed++; }
        else {
            failed++;
            failures.push({ input: t.input, cat: t.cat, reason, got: result.text.substring(0, 150) });
        }
    } catch (e) {
        failed++;
        failures.push({ input: t.input, cat: t.cat, reason: 'CRASH: ' + e.message, got: 'N/A' });
    }
}

console.log('');
console.log('═══════════════════════════════════════════');
console.log('   QA EXHAUSTIVO v2 - CHATBOT OPENCORE    ');
console.log('═══════════════════════════════════════════');
console.log('Total tests: ' + tests.length);
console.log('✅ Passed: ' + passed);
console.log('❌ Failed: ' + failed);
console.log('Pass rate: ' + (passed / tests.length * 100).toFixed(1) + '%');
console.log('');

if (failures.length > 0) {
    console.log('── FAILURES ──');
    for (const f of failures) {
        console.log('[' + f.cat + '] "' + f.input + '"');
        console.log('  ' + f.reason);
        console.log('  → ' + f.got);
        console.log('');
    }
}

fs.writeFileSync(require('path').resolve('scripts/_qa_failures.json'), JSON.stringify(failures, null, 2), 'utf8');
try { fs.unlinkSync(tmpPath); } catch (e) { }
