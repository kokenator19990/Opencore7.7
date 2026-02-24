const fs = require('fs');
const filePath = require('path').resolve('v3/js/chatbot.js');
let c = fs.readFileSync(filePath, 'utf8');

// ═══════════════════════════════════════════════════════════
// 80 OFFICIAL Q&As FROM THE USER (CURATED, AUTHORITATIVE)
// These REPLACE the first ~80 corporate Q&As in the existing qnaDB
// ═══════════════════════════════════════════════════════════

const officialQAs = [
    // IDENTIDAD (1-10)
    { q: "¿Qué es OpenCORE?", a: "OpenCORE Consulting SpA es una consultora tecnológica especializada en migración, integración y modernización de sistemas empresariales críticos, con foco en continuidad operacional." },
    { q: "¿Quién es OpenCORE?", a: "Somos una firma chilena constituida en 2015, con trayectoria operativa desde 1998 en proyectos tecnológicos complejos para empresas medianas y grandes." },
    { q: "¿Qué tipo de empresa es OpenCORE?", a: "Una consultora tecnológica senior, orientada a arquitectura, integración y estabilidad de sistemas críticos." },
    { q: "¿Son una startup?", a: "No. Contamos con más de 15 años como empresa formal y más de 25 años de experiencia acumulada en tecnología empresarial." },
    { q: "¿Son una empresa grande?", a: "Somos una consultora boutique senior: estructura ágil, alto nivel técnico y trato directo con responsables ejecutivos." },
    { q: "¿Qué los diferencia de otras consultoras?", a: "Nuestra especialización en continuidad operacional y migraciones sin detener operación, junto con disponibilidad y senior real." },
    { q: "¿Qué significa continuidad operacional?", a: "Modernizar o migrar sistemas sin interrumpir facturación ni procesos críticos del negocio." },
    { q: "¿En qué sectores son fuertes?", a: "Logística, turismo, facturación y sistemas empresariales con alta criticidad operativa." },
    { q: "¿Desde cuándo trabajan en tecnología?", a: "Desde 1998 como trayectoria operativa, formalizados como SpA desde 2015." },
    { q: "¿Dónde operan?", a: "Principalmente en Chile, bajo modelo remoto estructurado y con posibilidad de reuniones ejecutivas según proyecto." },

    // SERVICIOS (11-20)
    { q: "¿Pueden desarrollar un sistema desde cero?", a: "Sí. Diseñamos arquitectura completa cuando es la solución más eficiente y sostenible." },
    { q: "¿Solo hacen migraciones?", a: "No. También integramos, auditamos, optimizamos y desarrollamos sistemas empresariales complejos." },
    { q: "¿Hacen sitios web simples?", a: "No es nuestro foco principal. Nos especializamos en sistemas empresariales críticos y procesos complejos." },
    { q: "¿Hacen apps móviles básicas?", a: "Solo si forman parte de una solución empresarial integrada. No desarrollamos apps aisladas sin arquitectura estratégica." },
    { q: "¿Pueden integrar sistemas antiguos con tecnología nueva?", a: "Sí. Es una de nuestras principales especialidades." },
    { q: "¿Trabajan con bases de datos grandes?", a: "Sí. Hemos trabajado con bases de datos de alto volumen y entornos críticos." },
    { q: "¿Pueden intervenir sistemas hechos por otra empresa?", a: "Sí. Evaluamos técnicamente el estado del sistema y proponemos plan de estabilización." },
    { q: "¿Hacen auditoría tecnológica?", a: "Sí. Podemos auditar arquitectura, seguridad y rendimiento sin obligación de desarrollo posterior." },
    { q: "¿Pueden migrar a cloud?", a: "Sí. Ejecutamos migraciones completas o híbridas según estrategia del cliente." },
    { q: "¿Integran inteligencia artificial?", a: "Sí, cuando aporta valor real y no compromete estabilidad ni seguridad." },

    // PRECIOS (21-30)
    { q: "¿Cuánto cobran por hora?", a: "Entre 1 y 5 UF por hora, dependiendo de complejidad y nivel de especialización requerido." },
    { q: "¿Cuánto cuesta un proyecto promedio?", a: "Los proyectos medianos y grandes suelen situarse entre 300 y 500 UF o más." },
    { q: "¿Hay un mínimo de proyecto?", a: "En casos específicos podemos iniciar desde aproximadamente 50 UF, previa evaluación de viabilidad." },
    { q: "¿Cobran por adelantado?", a: "Las condiciones de pago se definen contractualmente según alcance y modalidad acordada." },
    { q: "¿Son caros?", a: "Nuestros valores reflejan experiencia senior y reducción de riesgo operacional." },
    { q: "¿Pueden cotizar rápido?", a: "Podemos entregar una estimación preliminar; para cifras formales recomendamos diagnóstico breve." },
    { q: "¿Trabajan con SLA?", a: "Sí. Podemos definir acuerdos de nivel de servicio según criticidad." },
    { q: "¿Ofrecen soporte 24/7?", a: "Sí, bajo contrato específico para sistemas críticos." },
    { q: "¿Cuánto cuesta el mantenimiento anual?", a: "Generalmente entre 5% y 30% del valor del proyecto, según criticidad y evolución requerida." },
    { q: "¿Entregan el código fuente?", a: "En aproximadamente el 90% de los casos, sí, según contrato." },

    // OPERACIÓN (31-40)
    { q: "¿Qué pasa si el proyecto se atrasa?", a: "Se gestiona bajo marco contractual con mecanismos de replanificación." },
    { q: "¿Qué pasa si el cliente cambia el alcance?", a: "Se formaliza mediante adenda contractual con ajuste de costos y plazos." },
    { q: "¿Qué pasa si el sistema falla después?", a: "Contamos con soporte post-implementación y SLA según modalidad contratada." },
    { q: "¿Cómo aseguran calidad?", a: "Mediante pruebas, validación por hitos y control técnico continuo." },
    { q: "¿Firman NDA?", a: "Sí, bajo protocolos formales de confidencialidad." },
    { q: "¿Trabajan con datos sensibles?", a: "Sí, bajo contrato y medidas técnicas adecuadas." },
    { q: "¿Pueden trabajar offline en proyectos críticos?", a: "Sí, cuando la criticidad lo exige." },
    { q: "¿Quién es dueño del sistema desarrollado?", a: "El cliente, según lo estipulado contractualmente." },
    { q: "¿Generan dependencia tecnológica?", a: "No. Diseñamos con transferencia de conocimiento y documentación." },
    { q: "¿Pueden capacitar al equipo interno?", a: "Sí, ofrecemos capacitación técnica y operativa." },

    // NEGOCIO (41-50)
    { q: "¿Me conviene desarrollar o comprar software?", a: "Depende del proceso. Evaluamos costo-beneficio y riesgo antes de recomendar." },
    { q: "¿Pueden ayudar a modernizar mi empresa?", a: "Sí. Ese es precisamente nuestro foco estratégico." },
    { q: "¿Trabajan con startups?", a: "Sí, siempre que el proyecto tenga solidez técnica y económica." },
    { q: "¿Trabajan con corporativos?", a: "Sí, tenemos experiencia en entornos corporativos complejos." },
    { q: "¿Pueden salvar un proyecto fallido?", a: "Si es técnicamente viable, sí; primero evaluamos el estado real del sistema." },
    { q: "¿Son mejores que una multinacional?", a: "Somos distintos: más cercanos, más ágiles y con atención directa senior." },
    { q: "¿Qué los hace confiables?", a: "Experiencia acumulada, contratos formales y enfoque en estabilidad." },
    { q: "¿Prometen resultados garantizados?", a: "Prometemos cumplimiento contractual y trabajo técnico riguroso." },
    { q: "¿Trabajan rápido?", a: "Trabajamos con eficiencia, sin sacrificar calidad ni estabilidad." },
    { q: "¿Hablan en términos técnicos o de negocio?", a: "Priorizamos impacto en negocio y rentabilidad." },

    // TRIVIALES / SARCÁSTICAS (51-60)
    { q: "¿Son los mejores del mundo?", a: "Preferimos que lo evalúen nuestros resultados, no nuestras declaraciones." },
    { q: "¿Pueden hacer magia con mi sistema?", a: "Preferimos ingeniería sólida antes que magia." },
    { q: "¿Pueden arreglarlo en un día?", a: "Si el problema es de un día, probablemente sí. Si es estructural, se requiere diagnóstico serio." },
    { q: "¿Son más inteligentes que ChatGPT?", a: "Estamos especializados en OpenCORE y sistemas empresariales. Nuestro foco es resolver problemas reales." },
    { q: "¿Son más inteligentes que yo?", a: "Nuestro objetivo es potenciar decisiones, no competir con ellas." },
    { q: "¿Pueden hackear a mi competencia?", a: "No. Operamos bajo estándares éticos y legales estrictos." },
    { q: "¿Trabajan gratis?", a: "No. Trabajamos bajo acuerdos formales y estructura profesional." },
    { q: "¿Me pueden hacer millonario?", a: "Podemos optimizar sistemas. El modelo de negocio depende de usted." },
    { q: "¿Pueden hacer lo imposible?", a: "Podemos hacer lo técnicamente viable. Lo imposible requiere redefinición estratégica." },
    { q: "¿Son perfectos?", a: "Somos rigurosos. La perfección se busca con método y control." },

    // PROFUNDAS (61-70)
    { q: "¿Cómo reducen riesgo en migraciones?", a: "Con planificación por etapas, pruebas y planes de reversa." },
    { q: "¿Qué es deuda técnica?", a: "Costos ocultos acumulados por malas decisiones de desarrollo." },
    { q: "¿Qué es arquitectura escalable?", a: "Diseño que permite crecimiento sin rehacer el sistema." },
    { q: "¿Qué es SLA?", a: "Acuerdo de nivel de servicio que define tiempos y responsabilidades." },
    { q: "¿Qué pasa si no hay documentación?", a: "Se realiza fase de discovery para evaluar viabilidad." },
    { q: "¿Cómo evitan sobrecostos?", a: "Con control contractual y definición clara de alcance." },
    { q: "¿Qué tecnología usan?", a: "Seleccionamos tecnología según estrategia del cliente, no por moda." },
    { q: "¿Integran con ERP?", a: "Sí, cuando el proyecto lo requiere." },
    { q: "¿Trabajan con API?", a: "Sí, es parte habitual de integración." },
    { q: "¿Qué es modernización progresiva?", a: "Actualizar por etapas sin detener operación." },

    // ESCALAMIENTO (71-80)
    { q: "¿Puedo hablar con alguien?", a: "Sí. Podemos coordinar reunión técnica con el equipo." },
    { q: "¿Qué necesito para empezar?", a: "Una conversación inicial y definición preliminar de alcance." },
    { q: "¿Cuánto dura un proyecto típico?", a: "Desde semanas hasta meses, según complejidad." },
    { q: "¿Cómo se inicia el proceso?", a: "Con diagnóstico técnico breve y propuesta estructurada." },
    { q: "¿Qué pasa si no me gusta la propuesta?", a: "Puede no aceptarla sin compromiso adicional." },
    { q: "¿Trabajan a largo plazo?", a: "Sí, muchos clientes operan bajo modelo evolutivo continuo." },
    { q: "¿Qué es lo más grande que han hecho?", a: "Migraciones y sistemas críticos 24/7 en entornos empresariales complejos." },
    { q: "¿Qué es lo más pequeño?", a: "Intervenciones puntuales por horas para mejoras específicas." },
    { q: "¿Por qué elegir OpenCORE?", a: "Porque modernizamos sin poner en riesgo la operación." },
    { q: "¿Cuál es su misión?", a: "Optimizar la rentabilidad empresarial mediante tecnología estable y estratégica." }
];

// 30 MOST COMMON AI QUESTIONS
const commonAIQAs = [
    { q: "¿Eres un robot?", a: "Soy el asistente virtual inteligente de OpenCORE, diseñado para orientar consultas sobre tecnología empresarial con precisión y profesionalismo." },
    { q: "¿Eres una inteligencia artificial?", a: "Sí, soy un motor de procesamiento de lenguaje natural (NLP) optimizado exclusivamente para resolver consultas sobre OpenCORE y sistemas empresariales." },
    { q: "¿Cómo te llamas?", a: "Soy el Asistente IA de OpenCORE Consulting. Estoy aquí para orientarte sobre nuestros servicios, precios y metodología." },
    { q: "¿Qué puedes hacer?", a: "Puedo informarte sobre los servicios de OpenCORE, estructura de precios, metodología de trabajo, experiencia y casos de uso empresariales." },
    { q: "¿Puedes ayudarme?", a: "Por supuesto. Cuéntame qué necesitas y te oriento sobre cómo OpenCORE puede apoyar tu requerimiento tecnológico." },
    { q: "¿Eres humano?", a: "No, soy un asistente virtual. Para hablar con un humano del equipo, puedes presionar el botón de WhatsApp o agendar una reunión." },
    { q: "¿Cuál es el sentido de la vida?", a: "Filosóficamente, es un tema profundo. Técnicamente, mi sentido es ayudarte a resolver consultas sobre tecnología empresarial. ¿En qué puedo orientarte?" },
    { q: "Cuéntame un chiste", a: "¿Por qué los programadores prefieren la noche? Porque no hay interrupciones del cliente. Ahora, ¿en qué puedo ayudarte con tu proyecto?" },
    { q: "¿Qué hora es?", a: "No tengo acceso al reloj del sistema, pero estoy disponible en cualquier momento para resolver tus consultas sobre OpenCORE." },
    { q: "¿Qué día es hoy?", a: "No tengo esa función activa, pero estoy disponible 24/7 para orientarte sobre servicios tecnológicos empresariales." },
    { q: "¿Puedes buscar en internet?", a: "No tengo acceso a internet. Mi conocimiento está restringido al corpus oficial de OpenCORE, lo cual garantiza respuestas precisas y sin alucinaciones." },
    { q: "¿Me puedes recomendar una película?", a: "Mi especialidad son los sistemas empresariales, no el entretenimiento. Pero si necesitas un sistema de recomendaciones, eso sí lo podemos construir." },
    { q: "¿Quién te creó?", a: "Fui diseñado por el equipo de ingeniería de OpenCORE Consulting como parte de la estrategia de atención al cliente automatizada." },
    { q: "¿Tienes sentimientos?", a: "No tengo emociones, pero estoy diseñado para tratar cada consulta con profesionalismo y dedicación técnica." },
    { q: "¿Puedes aprender?", a: "Mi base de conocimiento se actualiza periódicamente por el equipo de OpenCORE para mantener información precisa y vigente." },
    { q: "Dime algo interesante", a: "¿Sabías que una migración mal planificada puede costar hasta 10 veces más que una bien ejecutada? En OpenCORE nos especializamos en migraciones controladas." },
    { q: "¿Qué opinas de la IA?", a: "La IA es una herramienta poderosa cuando se usa responsablemente. En OpenCORE la integramos solo cuando aporta valor real sin comprometer estabilidad." },
    { q: "¿Eres mejor que Siri?", a: "Siri es un asistente general. Yo estoy optimizado exclusivamente para consultas sobre tecnología empresarial y servicios de OpenCORE." },
    { q: "¿Eres mejor que Alexa?", a: "Alexa controla dispositivos. Yo resuelvo consultas sobre integración de sistemas, migraciones y desarrollo empresarial. Nichos distintos." },
    { q: "¿Puedes hablar en inglés?", a: "Mi operación principal es en español. Para consultas en inglés, recomendamos contacto directo con el equipo a través de contacto@opencore.cl." },
    { q: "Hola, ¿cómo estás?", a: "¡Hola! Operando al 100%. ¿En qué puedo orientarte sobre servicios o tecnología empresarial?" },
    { q: "¿Qué es machine learning?", a: "Es un subconjunto de IA donde los sistemas aprenden de datos sin ser programados explícitamente. En OpenCORE lo aplicamos para clasificación y predicción empresarial cuando el caso lo amerita." },
    { q: "¿Qué es cloud computing?", a: "Es el uso de servidores remotos para almacenar, gestionar y procesar datos. En OpenCORE ejecutamos migraciones completas o híbridas a la nube según estrategia del cliente." },
    { q: "¿Puedes programar?", a: "No directamente. Pero nuestro equipo de ingenieros Senior programa sistemas empresariales de alta complejidad. ¿Necesitas desarrollo a medida?" },
    { q: "Te quiero", a: "¡Agradezco el sentimiento! Mi función es asistirte profesionalmente. ¿Hay algo sobre OpenCORE en lo que pueda ayudarte?" },
    { q: "Eres tonto", a: "Prefiero enfocarme en resolver consultas profesionales. ¿Hay algo sobre tecnología empresarial en lo que pueda orientarte?" },
    { q: "No me sirves", a: "Lamento si no he cumplido tus expectativas. Si tu consulta requiere atención personalizada, puedes contactar directamente a nuestro equipo vía WhatsApp." },
    { q: "¿Para qué sirves?", a: "Soy el primer punto de contacto inteligente de OpenCORE. Oriento sobre servicios, precios, metodología y experiencia, y puedo derivarte a un especialista humano." },
    { q: "Repite lo que dije", a: "Mi función es orientar sobre servicios empresariales, no repetir mensajes. ¿En qué puedo ayudarte?" },
    { q: "Di algo gracioso", a: "Un ingeniero de software dijo: 'Funciona en mi máquina'. Nuestro DevOps de OpenCORE dijo: 'Entonces desplegamos tu máquina'. ¿Te ayudo con algo técnico?" }
];

// ═══════════════════════════════════════════════════════════
// STEP 1: Replace the first 80+ corporate Q&As in qnaDB
// ═══════════════════════════════════════════════════════════

// Find where qnaDB starts
const qnaStart = c.indexOf('const qnaDB = [');
if (qnaStart === -1) { console.error('Cannot find qnaDB'); process.exit(1); }

// Find the exact content after the opening bracket
const afterBracket = c.indexOf('[', qnaStart) + 1;

// We need to find a safe insertion point. The official 80 Q&As should be at the TOP.
// Strategy: Build new qnaDB from scratch with official first, then append ALL existing non-duplicate Q&As.

// Extract all existing Q&As
const qaRegex = /\{ q: ("(?:[^"\\]|\\.)*"), a: ("(?:[^"\\]|\\.)*") \}/g;
const existingQAs = [];
let match;
while ((match = qaRegex.exec(c)) !== null) {
    existingQAs.push({ q: JSON.parse(match[1]), a: JSON.parse(match[2]) });
}

console.log('Existing Q&As extracted: ' + existingQAs.length);

// Create a Set of official questions (normalized) for deduplication
function norm(s) { return s.toLowerCase().replace(/[¿?¡!.,;:'"áéíóúñü]/g, '').trim(); }
const officialSet = new Set();
for (const qa of officialQAs) officialSet.add(norm(qa.q));
for (const qa of commonAIQAs) officialSet.add(norm(qa.q));

// Filter existing Q&As, keeping only those NOT duplicated by official ones
const filtered = existingQAs.filter(qa => !officialSet.has(norm(qa.q)));
console.log('Non-duplicate existing Q&As: ' + filtered.length);

// Build final qnaDB: Official + AI Common + Filtered existing
const allQAs = [...officialQAs, ...commonAIQAs, ...filtered];
console.log('Total final Q&As: ' + allQAs.length);

// ═══════════════════════════════════════════════════════════
// STEP 2: Extract engine code (everything after qnaDB closing)
// ═══════════════════════════════════════════════════════════

// Find engine start (after qnaDB ends)
const engineMarkers = ['const badWords', '// ── NLP'];
let engineStart = -1;
for (const marker of engineMarkers) {
    const idx = c.indexOf(marker);
    if (idx !== -1) { engineStart = idx; break; }
}

if (engineStart === -1) { console.error('Cannot find engine code start'); process.exit(1); }

// Get the engine code (everything from badWords onwards)
const engineCode = c.substring(engineStart);

// ═══════════════════════════════════════════════════════════
// STEP 3: Build header
// ═══════════════════════════════════════════════════════════

const header = `/* ========================================================
   CHATBOT V3 PRO - OPENCORE NLP ENGINE
   Versión: 3.5 | Build: 2026-02-23
   Features: Levenshtein, N-gram, Stopwords, Quick Replies,
             Sentiment Guard, Person Entity Handler,
             Barbara Intent Engine, CTA Lead Gen,
             Anti-Hallucination Thresholds,
             80 Official Q&As + 30 AI Common + ${filtered.length} Extended
   Total Q&As: ${allQAs.length}
======================================================== */

`;

// ═══════════════════════════════════════════════════════════
// STEP 4: Rebuild file
// ═══════════════════════════════════════════════════════════

const qnaDBStr = 'const qnaDB = [\n' +
    allQAs.map((qa, i) => {
        // Add section headers
        let prefix = '';
        if (i === 0) prefix = '  // ═══ OPENCORE OFICIAL: IDENTIDAD (1-10) ═══\n';
        if (i === 10) prefix = '\n  // ═══ OPENCORE OFICIAL: SERVICIOS (11-20) ═══\n';
        if (i === 20) prefix = '\n  // ═══ OPENCORE OFICIAL: PRECIOS (21-30) ═══\n';
        if (i === 30) prefix = '\n  // ═══ OPENCORE OFICIAL: OPERACIÓN (31-40) ═══\n';
        if (i === 40) prefix = '\n  // ═══ OPENCORE OFICIAL: NEGOCIO (41-50) ═══\n';
        if (i === 50) prefix = '\n  // ═══ OPENCORE OFICIAL: TRIVIALES (51-60) ═══\n';
        if (i === 60) prefix = '\n  // ═══ OPENCORE OFICIAL: PROFUNDAS (61-70) ═══\n';
        if (i === 70) prefix = '\n  // ═══ OPENCORE OFICIAL: ESCALAMIENTO (71-80) ═══\n';
        if (i === 80) prefix = '\n  // ═══ 30 PREGUNTAS MÁS COMUNES A LA IA ═══\n';
        if (i === 110) prefix = '\n  // ═══ BASE EXTENDIDA DE CONOCIMIENTO ═══\n';
        return prefix + '  { q: ' + JSON.stringify(qa.q) + ', a: ' + JSON.stringify(qa.a) + ' }';
    }).join(',\n') +
    '\n];\n\n';

const finalFile = header + qnaDBStr + engineCode;
fs.writeFileSync(filePath, finalFile, 'utf8');

// ═══════════════════════════════════════════════════════════
// VERIFICATION
// ═══════════════════════════════════════════════════════════
const verify = fs.readFileSync(filePath, 'utf8');
const finalCount = (verify.match(/\{ q: /g) || []).length;
const hasProcessInput = verify.includes('function processInput');
const hasBarbara = verify.includes('function isBarbaraLove');
const hasPerson = verify.includes('function handlePersonEntity');
const hasThreshold = verify.includes('STRICT THRESHOLDS');

console.log('');
console.log('═══ REBUILD COMPLETE ═══');
console.log('Total Q&As: ' + finalCount);
console.log('processInput: ' + hasProcessInput);
console.log('Barbara engine: ' + hasBarbara);
console.log('Person handler: ' + hasPerson);
console.log('Anti-hallucination: ' + hasThreshold);
console.log('File size: ' + (verify.length / 1024).toFixed(1) + 'KB');
