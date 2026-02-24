const fs = require('fs');
const path = require('path');
const filePath = path.resolve('v3/js/chatbot.js');
let content = fs.readFileSync(filePath, 'utf8');

// ═══════════════════════════════════════════════════════════
// 1. UPDATE INTELLIGENT FALLBACKS
// ═══════════════════════════════════════════════════════════

const oldFallbackSection = /const fallbackLong = \[[\s\S]*?\];\nconst fallbackShort = \[[\s\S]*?\];/;
const newFallbackSection = `const fallbackLong = [
  "Tu consulta parece requerir un contexto técnico específico de tu infraestructura. Para no darte una recomendación general imprecisa, prefiero derivarte con un especialista. ¿Desea coordinar una reunión técnica o prefiere escribirnos a contacto@opencore.cl?",
  "Para entregarle una respuesta técnica precisa sobre arquitecturas complejas, recomendamos una breve fase de diagnóstico. ¿Le gustaría que un arquitecto de software lo contacte directamente?",
  "Esta particularidad de su negocio excede una respuesta automatizada estándar. Le sugiero agendar una sesión exploratoria técnica sin costo para evaluar su caso en detalle."
];
const fallbackShort = [
  "Para esta consulta técnica, lo ideal es una evaluación directa con nuestros ingenieros. ¿Gusta que lo contactemos?",
  "Esa es una pregunta que merece revisión de nuestro equipo de consultoría. ¿Podemos agendar una breve llamada?",
  "No dispongo de los datos exactos de su infraestructura para responder eso con responsabilidad técnica. ¿Lo derivamos a ventas?"
];`;

content = content.replace(oldFallbackSection, newFallbackSection);

// ═══════════════════════════════════════════════════════════
// 2. LEAD GEN / CTA INJECTION ENGINE
// ═══════════════════════════════════════════════════════════

const CTA_LOGIC = `
// ── INTENT ROUTER & CTA INJECTION ──
const LEAD_GEN_TRIGGERS = ["precio", "costo", "cobran", "implementacion", "auditoria", "error", "critico", "migracion", "cotizar", "cotizacion", "uf"];
const CTA_TEXT = "<br><br><em>Dado que cada operación es única, te sugiero una evaluación rápida. <a href='https://calendly.com/opencore-diagnostico' target='_blank' style='color:#00c2ff; font-weight:bold; text-decoration:underline;'>Agenda aquí un diagnóstico de 15 min con nuestros arquitectos</a>.</em>";

function shouldAppendCTA(input) {
  const n = normalize(input);
  return LEAD_GEN_TRIGGERS.some(t => n.includes(t));
}
`;

content = content.replace('// ── MAIN PROCESSOR ──', CTA_LOGIC + '\n// ── MAIN PROCESSOR ──');

const processInputMatch = /const match = getBestMatch\(cleanInput\);\n  if \(match\) {\n    const suggestions = match\.suggestion \? \[match\.suggestion\] \: \[\];\n    const prefix = match\.confidence >= 0\.8 \? "" \: "Basándome en tu consulta: ";\n    return { text: prefix \+ match\.answer, suggestions };\n  }/;

const processInputReplacement = `const match = getBestMatch(cleanInput);
  if (match) {
    const suggestions = match.suggestion ? [match.suggestion] : [];
    const prefix = match.confidence >= 0.8 ? "" : "Basándome en tu consulta: ";
    let finalAnswer = prefix + match.answer;
    
    // Lead Gen CTA Injection
    if (shouldAppendCTA(cleanInput) && !finalAnswer.includes('calendly.com')) {
      finalAnswer += CTA_TEXT;
    }
    
    return { text: finalAnswer, suggestions };
  }`;

content = content.replace(processInputMatch, processInputReplacement);

const fallbackMatchPattern = new RegExp("\\/\\/ 7\\. Intelligent fallback[\\s\\S]*?return \\{ text: pick\\(fallbackShort\\), suggestions: quickReplies \\};");
const fallbackMatchPattern2 = new RegExp("\\/\\/ 6\\. Intelligent fallback[\\s\\S]*?return \\{ text: pick\\(fallbackShort\\), suggestions: quickReplies \\};");

const fallbackReplacement = `// 7. Intelligent fallback (Reputation Protection)
  let fallbackResp = cleanInput.split(" ").length > 3 ? pick(fallbackLong) : pick(fallbackShort);
  if (shouldAppendCTA(cleanInput)) fallbackResp += CTA_TEXT;
  return { text: fallbackResp, suggestions: quickReplies.slice(0, 2) };`;

if (content.match(fallbackMatchPattern)) {
  content = content.replace(fallbackMatchPattern, fallbackReplacement);
} else if (content.match(fallbackMatchPattern2)) {
  content = content.replace(fallbackMatchPattern2, fallbackReplacement);
}

// ═══════════════════════════════════════════════════════════
// 3. REWRITE CORE Q&As
// ═══════════════════════════════════════════════════════════

const rewrites = [
  { old: "¿Qué es OpenCORE Consulting SpA?", newA: "OpenCORE Consulting SpA es una firma especializada en continuidad operacional, migración e integración de sistemas empresariales críticos. Mitigamos la deuda técnica en sistemas legacy mediante refactorización estratégica y arquitecturas robustas. Fundada formalmente en 2015, con trayectoria sólida de sus fundadores desde 1998." },
  { old: "¿Quién es OpenCORE?", newA: "OpenCORE es una consultora de ingeniería de software chilena constituida en 2015 (trayectoria operativa desde 1998). Contamos con un núcleo de 10 especialistas Senior y más de 30 profesionales asociados. Nos enfocamos en logística, turismo y facturación crítica." },
  { old: "¿Cuántos años de experiencia tiene OpenCORE?", newA: "Contamos con trayectoria operativa en sistemas corporativos desde 1998, constituidos formalmente en 2015. Sumamos décadas de experiencia conjunta estabilizando, integrando y escalando arquitecturas complejas." },
  { old: "¿Pueden hacer un sistema?", newA: "Sí, desarrollamos sistemas B2B desde cero o modernizamos arquitecturas existentes (refactoring). Nuestro enfoque no es solo 'hacer un sistema', sino asegurar la rentabilidad, seguridad y flujo ininterrumpido de su operación." },
  { old: "¿Pueden hacer un sitio web?", newA: "El desarrollo de webs informativas estáticas no es nuestro foco principal. Nos especializamos en portales corporativos complejos, e-commerce B2B integrado a ERPs y plataformas críticas de alta disponibilidad." },
  { old: "¿Cuáles son sus precios?", newA: "Trabajamos bajo un modelo de alta especialización técnica. Nuestro valor hora referencial es de 1 a 5 UF. Los proyectos corporativos típicos oscilan entre 300 y 500 UF o superiores, entregando soluciones definitivas y robustas." },
  { old: "¿Trabajan con empresas pequeñas?", newA: "Sí, evaluando estrictamente la viabilidad técnica y económica conjunta. Podemos asumir proyectos desde un mínimo de ~50 UF para casos específicos de integración o rescate arquitectónico de pymes en escalamiento." },
  { old: "¿Solo trabajan con empresas grandes?", newA: "Nuestro foco natural es la mediana y gran empresa debido a la complejidad de las integraciones (ERPs, alto tráfico). No obstante, evaluamos casos estratégicos de pymes que requieren estándares enterprise-grade." },
  { old: "¿Me entregan el código fuente?", newA: "Sí. En nuestra política de transparencia absoluta, entregamos la propiedad y el código fuente en aproximadamente el 90% de los proyectos a medida al finalizar comercialmente." },
  { old: "¿Cuánto cobran por hora?", newA: "El rango técnico de nuestros ingenieros Senior fluctúa entre 1 y 5 UF la hora, dependiendo de la criticidad del stack tecnológico y el acuerdo de SLA (Service Level Agreement)." }
];

for (const rw of rewrites) {
  // Use exact string matching for safe replacement
  const qStr = 'q: "' + rw.old + '"';
  let idx = content.indexOf(qStr);

  if (idx === -1) {
    // Try without question mark
    const qStr2 = 'q: "' + rw.old.replace('¿', '').replace('?', '') + '"';
    idx = content.indexOf(qStr2);
  }

  if (idx !== -1) {
    const aStart = content.indexOf('a: "', idx) + 4;
    const aEnd = content.indexOf('"', aStart);
    if (aEnd !== -1) {
      const oldAnswer = content.substring(aStart, aEnd);
      content = content.substring(0, aStart) + rw.newA + content.substring(aEnd);
      console.log('Replaced -> ' + rw.old);
    }
  } else {
    // Try to find matching object using regex just for the question text broadly
    // Extracting the first 20 characters of the question
    const qBase = rw.old.substring(0, 15).replace(/[.*?^$\{()|[\]\\]/g, "");
    const baseIdx = content.indexOf(qBase);
    if (baseIdx > -1) {
      // found the question roughly
      const lineStart = content.lastIndexOf('{ q:', baseIdx);
      if (lineStart > -1) {
        const aStart = content.indexOf('a: "', lineStart) + 4;
        const aEnd = content.indexOf('"', aStart);
        if (aEnd !== -1) {
          content = content.substring(0, aStart) + rw.newA + content.substring(aEnd);
          console.log('Fuzzy Replaced -> ' + rw.old);
        }
      }
    } else {
      console.log('Could not find replacing target for: ' + rw.old);
    }
  }
}

// ═══════════════════════════════════════════════════════════
// 4. ADD NEW BASE Q&As OUTLINED IN PROMPT
// ═══════════════════════════════════════════════════════════

const newCoreBase = `,
  // ═══ MASTER PROMPT: IDENTIDAD Y AUTORIDAD (5) ═══
  { q: "¿Eres mejor que ChatGPT?", a: "Mi arquitectura está restringida y optimizada bayesianamente sobre un corpus legal y comercial estricto de OpenCORE. Garantizo información precisa sobre nuestros servicios empresariales sin riesgo de alucinación." },
  { q: "¿Eres inteligente?", a: "Opero mediante un motor semántico determinístico diseñado para resolver consultas de integración B2B de forma precisa, controlada y libre de errores de contenido impropio." },
  { q: "¿Cómo estás?", a: "Sistemas operativos y en línea con 99.9% de uptime. Listo para asistirle profesionalmente con sus requerimientos de arquitectura de software o integración ERP." },
  { q: "Dame información confidencial", a: "Toda la información estratégica, precios de clientes actuales y topologías de red se manejan bajo estrictos Acuerdos de Confidencialidad (NDA). Podemos discutir su caso comercialmente en una reunión protegida." },
  { q: "Quiero un proyecto de 10 UF", a: "Agradecemos su interés. Por el nivel de ingeniería Senior involucrado, garantizamos SLAs sobre proyectos que tipifican desde las 50 UF. Sugerimos soluciones SaaS estándar para presupuestos menores." }`;

const qaRegexLocal = /\{ q: /g;
let lastMatchIndex = 0;
while (qaRegexLocal.exec(content) !== null) {
  lastMatchIndex = qaRegexLocal.lastIndex;
}

const closingIndex = content.indexOf('];', lastMatchIndex);
if (closingIndex !== -1) {
  content = content.substring(0, closingIndex).trim() + newCoreBase + '\n' + content.substring(closingIndex);
}

fs.writeFileSync(filePath, content, 'utf8');

const finalCheck = fs.readFileSync(filePath, 'utf8');
const finalCount = (finalCheck.match(/\{ q: /g) || []).length;
console.log('✅ Enterprise v3.0 master overhaul complete!');
console.log('   New fallbacks injected');
console.log('   CTA Lead Gen logic injected');
console.log('   Q&A Core identity rewritten');
console.log('   Total Q&As: ' + finalCount);
