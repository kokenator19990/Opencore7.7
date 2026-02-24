const fs = require('fs');
const src = fs.readFileSync(require('path').resolve('v3/js/chatbot.js'), 'utf8');
const domMarker = 'document.addEventListener("DOMContentLoaded"';
const idx = src.indexOf(domMarker);
if (idx === -1) { console.error('No DOM marker'); process.exit(1); }
const coreCode = src.substring(0, idx) + '\nmodule.exports = { processInput };';
const tmpPath = require('path').resolve('scripts/_test_core.js');
fs.writeFileSync(tmpPath, coreCode, 'utf8');
let bot;
try { bot = require(tmpPath); } catch (e) { console.error('FATAL:', e.message); process.exit(1); }

// Test the exact inputs the user complained about
const tests = [
    { input: "como estas", expect: ["mejor", "nunca", "usted"], cat: "Conversacional" },
    { input: "como estas?", expect: ["mejor", "nunca"], cat: "Conversacional" },
    { input: "cómo estás?", expect: ["mejor", "nunca"], cat: "Conversacional" },
    { input: "como asi", expect: ["profundice", "detalle", "explique"], cat: "Seguimiento" },
    { input: "como así", expect: ["profundice", "detalle", "explique"], cat: "Seguimiento" },
    { input: "quien eres", expect: ["asistente", "opencore"], cat: "Identidad" },
    { input: "quién eres", expect: ["asistente", "opencore"], cat: "Identidad" },
    { input: "que haces", expect: ["consultas", "opencore"], cat: "Identidad" },
    { input: "hola como estas", expect: ["hola", "mejor", "nunca"], cat: "Saludo+Estado" },
    { input: "pero dime", expect: ["disponible", "saber", "gustar"], cat: "Seguimiento" },
    { input: "ok", expect: ["más", "algo", "ayudar"], cat: "Seguimiento" },
    { input: "mmm", expect: ["duda", "pregunt"], cat: "Seguimiento" },
    { input: "ajá", expect: ["más", "tema", "pregunta"], cat: "Seguimiento" },
    { input: "jaja", expect: ["alegra", "ayudar"], cat: "Seguimiento" },
    { input: "gracias", expect: ["gusto", "más"], cat: "Cortesía" },
    { input: "chao", expect: ["pronto", "gusto", "luego"], cat: "Despedida" },
    { input: "que es opencore", expect: ["opencore", "consult"], cat: "Identidad" },
    { input: "son serios?", expect: ["serios", "contrato", "sla"], cat: "Confianza" },
    { input: "son una estafa?", expect: ["no", "spa", "constituida"], cat: "Confianza" },
    { input: "necesito cotizar", expect: ["cotiz", "proyecto", "diagnóstico"], cat: "Ejecutivo" },
    { input: "cuál es su teléfono", expect: ["4958", "7198"], cat: "Contacto" },
    { input: "cual es su email", expect: ["contacto@opencore"], cat: "Contacto" },
    { input: "me pueden ayudar", expect: ["supuesto", "orient", "cuénteme"], cat: "Solicitud" },
    { input: "no entendí", expect: ["problema", "explique", "parte"], cat: "Seguimiento" },
    { input: "hola necesito ayuda", expect: ["claro", "cuénteme", "orient"], cat: "Saludo+Ayuda" },
    { input: "cuanto cobran", expect: ["uf"], cat: "Precios" },
];

let passed = 0, failed = 0;
const failures = [];

for (const t of tests) {
    try {
        const result = bot.processInput(t.input);
        const answer = result.text.toLowerCase();
        let ok = true, reason = '';
        for (const kw of t.expect) {
            if (!answer.includes(kw.toLowerCase())) { ok = false; reason += `MISSING "${kw}" | `; }
        }
        // Also check NO hallucinations
        const forbidden = ['Leonardo', 'Vinci', 'raiz cuadrada', 'derivarte con un especialista', 'contexto técnico específico'];
        for (const f of forbidden) {
            if (answer.includes(f.toLowerCase())) { ok = false; reason += `HALLUCINATION: "${f}" | `; }
        }
        if (ok) passed++;
        else {
            failed++;
            failures.push({ input: t.input, cat: t.cat, reason, got: result.text.substring(0, 120) });
        }
    } catch (e) {
        failed++;
        failures.push({ input: t.input, cat: t.cat, reason: 'CRASH: ' + e.message, got: 'N/A' });
    }
}

console.log('');
console.log('═══════════════════════════════════════════');
console.log('  QA CONVERSACIONAL - EXACTOS DEL USUARIO  ');
console.log('═══════════════════════════════════════════');
console.log('Tests: ' + tests.length);
console.log('✅ Passed: ' + passed);
console.log('❌ Failed: ' + failed);
console.log('Rate: ' + (passed / tests.length * 100).toFixed(1) + '%');
if (failures.length > 0) {
    console.log('\n── FAILURES ──');
    for (const f of failures) {
        console.log('[' + f.cat + '] "' + f.input + '"');
        console.log('  ' + f.reason);
        console.log('  → ' + f.got);
        console.log('');
    }
}
try { fs.unlinkSync(tmpPath); } catch (e) { }
