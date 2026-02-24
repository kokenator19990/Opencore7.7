const fs = require('fs');

const v3Path = 'c:/Users/coook/Desktop/Opencore Web7.0/v3/js/chatbot.js';
const v4Path = 'c:/Users/coook/Desktop/Opencore Web7.0/v4/js/chatbot.js';

let v3Content = fs.readFileSync(v3Path, 'utf8');
let v4Content = fs.readFileSync(v4Path, 'utf8');

const newTokenizer = `function tokenize(str) {
  let tokens = normalize(str).split(/\\s+/).filter(w => w.length > 1 && !stopWords.has(w));
  if (tokens.length > 2) {
    const greetings = new Set(["hola", "ola", "hello", "hi", "hey", "wena", "buenas", "buenos", "saludos"]);
    tokens = tokens.filter(w => !greetings.has(w));
  }
  return tokens;
}`;

const oldTokenizer = `function tokenize(str) {
  return normalize(str).split(/\\s+/).filter(w => w.length > 1 && !stopWords.has(w));
}`;

v3Content = v3Content.replace(oldTokenizer, newTokenizer);
v4Content = v4Content.replace(oldTokenizer, newTokenizer);

const holaInsert = fs.readFileSync('c:/Users/coook/Desktop/Opencore Web7.0/hola_insert.txt', 'utf8');

const lastItemV3 = '  { q: "¿Tienen casos de éxito?", a: "Sí, bajo NDA. Rescate de sistemas de inventario que bloqueaban operaciones, integración de ERPs en standby, automatizaciones que eliminaron procesos manuales críticos. Mostramos en reunión con acuerdo de confidencialidad." },\\r\\n' +
    '  // ═══ SEGURIDAD, FALLOS Y RIESGOS ═══\\r\\n' +
    '  { q: "¿Es seguro trabajar con ustedes?", a: "Absolutamente. Firmamos NDA (Acuerdo de Confidencialidad) antes de ver cualquier código o dato. La seguridad, el aislamiento de datos y la protección de su propiedad intelectual son la base de nuestros contratos." },\\r\\n' +
    '  { q: "¿Qué pasa si el sistema falla?", a: "Nuestras arquitecturas incluyen monitoreo activo, redundancia y planes de contingencia (DRP). Si ocurre un fallo en un sistema bajo nuestra administración/soporte, garantizamos tiempos de respuesta (SLA) estructurados para restaurar la operacion critica." },\\r\\n' +
    '  { q: "¿Qué pasa si me hackean?", a: "Aplicamos prácticas de seguridad defensiva (OWASP, cifrado en tránsito/reposo, aislamiento BBDD). Si usted sufre vulneración por otro vector, apoyamos en la contención técnica, auditoría forense y levantamiento seguro del servicio." },\\r\\n' +
    '  { q: "¿Cómo protegen mis datos?", a: "Los datos de su empresa le pertenecen 100%. Usamos arquitecturas certificadas en cloud (AWS/GCP/Azure) con cifrado y backups automatizados. No retenemos datos en infraestructura local insegura." },\\r\\n' +
    '  { q: "¿Qué garantías ofrecen sobre el código?", a: "Entregamos el código fuente íntegro a nuestros clientes, documentado y sin bloqueos artificiales (vendor lock-in). Usted no es rehén de OpenCORE." },\\r\\n' +
    '\\r\\n' +
    '  // ═══ TECNOLOGÍA, STACK Y DESARROLLO DE LA PÁGINA ═══\\r\\n' +
    '  { q: "¿Cómo está hecha esta página?", a: "Esta web está construida con arquitectura moderna serverless, optimizada al extremo. Usa CSS avanzado para efectos GPU (hardware acceleration), canvas interactivo, sin frameworks pesados (Vanilla JS) permitiendo 60fps constantes incluso en móvil." },\\r\\n' +
    '  { q: "¿Qué tecnologías usan?", a: "Para desarrollo empresarial: Node.js, NestJS, Python, arquitecturas de microservicios, bases de datos SQL/NoSQL avanzadas. En integraciones B2B: n8n, Docker e interfaces con SAP, Salesforce y ERPs locales." },\\r\\n' +
    '  { q: "¿Este chatbot usa IA real?", a: "Sí y no. Este chat principal utiliza un motor NLP propietario optimizado (fast-text match, Levenshtein, Bigrams). Cuando el nivel de complejidad lo amerita, escala transparentemente a llamadas API hacia LLMs avanzados (Gemini 2.5 Flash / GPT-4) vía un proxy interno." },\\r\\n' +
    '  { q: "¿Qué tecnología usa este chatbot?", a: "Es un desarrollo propio en JavaScript de ultra-bajo peso. Emplea un algoritmo de NLP local (fuzzy matching + NLP heurístico) sin latencia de ping, con soporte de escalamiento a Gemini Flash en el backend para razonamiento complejo." },\\r\\n' +
    '  { q: "¿La web está optimizada para celulares?", a: "Sí, es mobile-first con PWA capabilities opcionales. Todo el layout de grid, tipografía fluida y motor gráfico interactivo escala manteniendo alto rendimiento y batería en dispositivos móviles." }\\r\\n' +
    '];';

// Let's just use string slice
// Find the last index of '];' before NLP engine
const marker = '// ══════════════════════════════════════════════════════════\\r\\n//  NLP ENGINE';
let pos3 = v3Content.lastIndexOf('];', v3Content.indexOf('// ══════════════════════════════════════════════════════════\\r\\n//  NLP ENGINE'));
if (pos3 === -1) {
    pos3 = v3Content.lastIndexOf('];', v3Content.indexOf('//  NLP ENGINE'));
}

if (pos3 !== -1) {
    v3Content = v3Content.substring(0, pos3) + ",\\n" + holaInsert + "];" + v3Content.substring(pos3 + 2);
}

let pos4 = v4Content.lastIndexOf('];', v4Content.indexOf('// ══════════════════════════════════════════════════════════\\r\\n//  NLP ENGINE'));
if (pos4 === -1) {
    pos4 = v4Content.lastIndexOf('];', v4Content.indexOf('//  NLP ENGINE'));
}
if (pos4 !== -1) {
    v4Content = v4Content.substring(0, pos4) + ",\\n" + holaInsert + "];" + v4Content.substring(pos4 + 2);
}

fs.writeFileSync(v3Path, v3Content, 'utf8');
fs.writeFileSync(v4Path, v4Content, 'utf8');
console.log("Variations injected via pos!");
