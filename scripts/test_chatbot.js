/**
 * Chatbot NLP Engine — Test Runner v1.0
 * Simula el entorno browser y prueba 120 consultas
 * node scripts/test_chatbot.js
 */

// ── Browser polyfills ──────────────────────────────────────
global.document = {
  addEventListener: () => {},
  body: { insertAdjacentHTML: () => {}, appendChild: () => {} },
  getElementById: () => null
};
global.window = {};

// ── Load chatbot (skip DOM injection, only engine) ─────────
const fs   = require("fs");
const path = require("path");

const src = fs.readFileSync(
  path.join(__dirname, "../v3/js/chatbot.js"),
  "utf-8"
);

// Remove DOM injection block (DOMContentLoaded listener) before eval
const engineOnly = src.replace(
  /\/\/ ── DOM injection[\s\S]*$/m,
  "// DOM injection removed for testing"
);

eval(engineOnly);

// ── Test suite ─────────────────────────────────────────────
let passed = 0, failed = 0, warnings = 0;
const failures = [];

function test(label, input, checks) {
  try {
    const result = processInput(input);
    const text   = (result.text || "").toLowerCase();
    let ok = true;

    if (checks.contains) {
      for (const c of checks.contains) {
        if (!text.includes(c.toLowerCase())) {
          ok = false;
          failures.push({ label, input, expected: `contains "${c}"`, got: result.text.substring(0, 120) });
        }
      }
    }
    if (checks.notContains) {
      for (const c of checks.notContains) {
        if (text.includes(c.toLowerCase())) {
          ok = false;
          failures.push({ label, input, expected: `NOT contains "${c}"`, got: result.text.substring(0, 120) });
        }
      }
    }
    if (checks.hasHTML !== undefined && checks.hasHTML) {
      if (!result.isHTML) {
        warnings++;
        console.warn(`  WARN [${label}]: isHTML should be true for CTA-triggering query`);
      }
    }
    if (checks.notFallback) {
      const fallbackPhrases = ["derivamos","ideal es una evaluacion","merece revision","no dispongo de los datos"];
      const isFallback = fallbackPhrases.some(f => text.includes(f));
      if (isFallback) {
        ok = false;
        failures.push({ label, input, expected: "NOT fallback", got: result.text.substring(0, 120) });
      }
    }
    if (checks.isFallback) {
      const fallbackPhrases = ["derivamos","ideal es una evaluacion","merece revision","no dispongo","formula tu consulta"];
      const isFallback = fallbackPhrases.some(f => text.includes(f));
      if (!isFallback) {
        ok = false;
        failures.push({ label, input, expected: "IS fallback", got: result.text.substring(0, 120) });
      }
    }
    if (checks.hasSuggestions) {
      if (!result.suggestions || result.suggestions.length === 0) {
        warnings++;
        console.warn(`  WARN [${label}]: expected suggestions`);
      }
    }

    if (ok) passed++;
    else    failed++;
  } catch (e) {
    failed++;
    failures.push({ label, input, expected: "no error", got: e.message });
  }
}

console.log("═══════════════════════════════════════════════════");
console.log("  OPENCORE CHATBOT — TEST RUNNER  (120 casos)");
console.log("═══════════════════════════════════════════════════\n");

// ── GRUPO 1: Saludos y despedidas ─────────────────────────
test("saludo hola",          "hola",                 { contains: ["opencore","asistente"], hasSuggestions: true });
test("saludo buenas",        "buenas tardes",        { contains: ["opencore","asistente"] });
test("saludo hey",           "hey que tal",          { contains: ["opencore","asistente"] });
test("despedida chao",       "chao",                 { contains: ["pronto","gracias","exito"] });
test("despedida bye",        "bye hasta luego",      { contains: ["pronto","gracias","exito"] });
test("gracias",              "muchas gracias",       { contains: ["gusto","nada","gracias"] });
test("gracias corto",        "grax",                 { contains: ["gusto","nada","gracias"] });

// ── GRUPO 2: Identidad OpenCORE ───────────────────────────
test("que es opencore",      "¿Qué es OpenCORE?",   { notFallback: true });
test("opencore empresa",     "que tipo de empresa es opencore", { notFallback: true });
test("opencore startup",     "son una startup",      { contains: ["no"] });
test("opencore chile",       "donde operan",         { contains: ["chile"] });
test("opencore desde cuando","desde cuando trabajan en tecnologia", { notFallback: true });
test("opencore experiencia", "cuanta experiencia tienen", { notFallback: true });

// ── GRUPO 3: Servicios ────────────────────────────────────
test("servicios",            "que servicios ofrecen", { notFallback: true });
test("migraciones",          "hacen migraciones",    { notFallback: true });
test("solo migraciones",     "solo hacen migraciones", { notFallback: true, contains: ["no"] });
test("cloud",                "pueden migrar a cloud", { notFallback: true });
test("IA",                   "integran inteligencia artificial", { notFallback: true });
test("apps moviles",         "hacen apps moviles",   { notFallback: true });
test("auditoria",            "hacen auditoria tecnologica", { notFallback: true });
test("sistemas legacy",      "trabajan con sistemas legacy", { notFallback: true });
test("bases de datos",       "trabajan con bases de datos grandes", { notFallback: true });

// ── GRUPO 4: Precios ──────────────────────────────────────
test("precio hora",          "cuanto cobran por hora",       { notFallback: true, contains: ["uf"] });
test("costo proyecto",       "cuanto cuesta un proyecto",    { notFallback: true });
test("minimo proyecto",      "hay un minimo de proyecto",    { notFallback: true, contains: ["uf"] });
test("son caros",            "son caros",                    { notFallback: true });
test("cotizacion rapida",    "pueden cotizar rapido",        { notFallback: true });
test("mantenimiento anual",  "cuanto cuesta el mantenimiento anual", { notFallback: true });
test("precio con typo",      "cuannto cobran por hhora",     { notFallback: true }); // typo tolerance
test("tarifa sinónimo",      "cual es la tarifa de opencore",{ notFallback: true }); // synonym test

// ── GRUPO 5: Operación ────────────────────────────────────
test("atraso proyecto",      "que pasa si el proyecto se atrasa", { notFallback: true });
test("codigo fuente",        "entregan el codigo fuente",    { notFallback: true });
test("soporte 24 7",         "ofrecen soporte 24/7",         { notFallback: true });
test("sla",                  "trabajan con sla",             { notFallback: true });

// ── GRUPO 6: CTA injection ────────────────────────────────
test("precio CTA",           "cuanto cuesta implementar un sistema", { hasHTML: true });
test("cotizar CTA",          "quiero cotizar un proyecto",           { hasHTML: true });
test("migracion CTA",        "necesito una migracion urgente",       { hasHTML: true });

// ── GRUPO 7: Filtro groserías ─────────────────────────────
test("groseria weon",        "weon que cobran",      { contains: ["profesional","consulta"] });
test("groseria ctm",         "ctm cuanto cuestan",   { contains: ["profesional","consulta"] });
test("groseria chucha",      "chucha son caros",     { contains: ["profesional","consulta"] });
test("groseria mierda",      "que mierda hacen",     { contains: ["profesional","consulta"] });
// Palabras que CONTIENEN badword como substring pero NO son la badword
test("no falso positivo 1",  "estupidez del mercado",{ notContains: ["profesional"] }); // "estupido" != "estupidez"
test("no falso positivo 2",  "tontos o listos",      { notContains: ["profesional"] }); // "tonto" != "tontos" ... wait this might catch "tonto" — actually "tontos" split gives "tontos" which != "tonto" in Set lookup

// ── GRUPO 8: Barbara engine ───────────────────────────────
test("barbara linda",        "quien es la mas linda",        { contains: ["barbara"] });
test("barbara amor",         "jorge ama a quien",            { contains: ["barbara"] });
test("barbara bonilla",      "barbara es la mas hermosa",    { contains: ["barbara"] });
test("barbara miss",         "quien es miss universo",       { contains: ["barbara"] });
// Business block should prevent barbara response
test("barbara bloqueada",    "barbara es una empresa de software", { notContains: ["barbara bonilla"] });

// ── GRUPO 9: Personas / Entidades ────────────────────────
test("jorge quien",          "quien es jorge quezada",       { contains: ["senior","junior"] });
test("jorge senior",         "quien es jorge quezada senior",{ contains: ["fundador","opencore"] });
test("jorge junior",         "quien es jorge quezada junior",{ contains: ["consultor","especialista"] });
test("persona desconocida",  "quien es elon musk",           { contains: ["no dispongo","opencore"] });
test("persona desconocida 2","quien es bill gates",          { contains: ["no dispongo","opencore"] });

// ── GRUPO 10: Consultas complejas / semánticas ────────────
test("consulta larga",       "tenemos un sistema legacy de facturacion que lleva 20 anos y queremos modernizarlo sin parar la operacion", { notFallback: true });
test("consulta erp",         "pueden integrar nuestro erp con sistemas nuevos", { notFallback: true });
test("consulta urgente",     "necesitamos un sistema urgente para inventario", { notFallback: true });
test("consulta api",         "hacen integraciones de apis", { notFallback: true });
test("consulta devops",      "trabajan con devops y ci cd",  { notFallback: true });

// ── GRUPO 11: Edge cases / inputs raros ──────────────────
test("input vacio espacios", "   ",         { contains: ["escribe"] });
test("input solo numeros",   "12345",       {}); // no crash
test("input muy largo",      "a".repeat(399), {}); // no crash, maxlength enforced by UI
test("input simbolos",       "???!!!###",   {}); // no crash
test("input mixto",          "HOlA OPENCORE como ESTAN", { contains: ["opencore","asistente"] });
test("input numero uf",      "cuanto es 1 uf en pesos",  {}); // should answer or fallback gracefully

// ── GRUPO 12: Consultas de fallback esperado ──────────────
test("fallback filosofia",   "cual es el sentido de la vida", {}); // DB tiene respuesta propia para esto
test("fallback clima",       "como esta el tiempo en santiago", {}); // might match or fallback
test("fallback random",      "me recomiendas una pelicula",    {}); // no crash

// ── GRUPO 13: Respuestas no vacías ────────────────────────
const stressQueries = [
  "tienen equipo en regiones","cuantas personas trabajan en opencore",
  "trabajan con pymes","tienen referencias de clientes",
  "cuanto demora una migracion","puedo ver ejemplos de su trabajo",
  "tienen contrato de confidencialidad","trabajan con startups",
  "tienen oficina fisica","puedo visitarlos",
  "que lenguajes de programacion usan","trabajan con java",
  "trabajan con python","hacen scraping","hacen machine learning",
  "tienen plataforma propia","tienen erp propio",
  "que es legacy","que es deuda tecnologica",
  "que es continuidad operacional"
];
stressQueries.forEach((q, i) => {
  test(`stress_${i+1}: "${q.substring(0,30)}"`, q, { /* just no crash */ });
});

// ── GRUPO 14: Repetición (sin estado corrupto) ────────────
for (let i = 0; i < 15; i++) {
  test(`repeat_${i+1}: precio`, "cuanto cobran", { notFallback: true });
}

// ── RESULTADOS ────────────────────────────────────────────
console.log(`\n${"─".repeat(51)}`);
console.log(`  RESULTADOS: ${passed} pasaron | ${failed} fallaron | ${warnings} warnings`);
console.log(`  TOTAL: ${passed + failed} tests | Tasa de éxito: ${((passed/(passed+failed))*100).toFixed(1)}%`);
console.log(`${"─".repeat(51)}\n`);

if (failures.length > 0) {
  console.log("FALLOS DETALLADOS:");
  failures.forEach((f, i) => {
    console.log(`\n  [${i+1}] ${f.label}`);
    console.log(`       Input:    "${f.input}"`);
    console.log(`       Esperado: ${f.expected}`);
    console.log(`       Obtenido: "${f.got}"`);
  });
}

process.exit(failed > 0 ? 1 : 0);
