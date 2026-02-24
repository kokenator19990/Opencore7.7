const fs = require('fs');
const path = require('path');

const chatbotFile = path.resolve('v3/js/chatbot.js');

let content = fs.readFileSync(chatbotFile, 'utf8');

const newQAs = [
    { q: "¿Cómo estás?", a: "Muy bien, gracias. Siempre listo para ayudarte con cualquier desafío tecnológico que tengas. ¿En qué te puedo apoyar hoy?" },
    { q: "¿Eres una IA?", a: "Sí, soy el asistente inteligente de OpenCORE, diseñado para orientarte en soluciones tecnológicas, migraciones e integración de sistemas." },
    { q: "¿Eres inteligente?", a: "Depende del estándar… pero digamos que estoy entrenado para resolver problemas empresariales complejos con bastante eficiencia." },
    { q: "¿Eres más inteligente que yo?", a: "Tranquilo, no compito con humanos. Estoy aquí para potenciar tu capacidad de decisión, no para reemplazarla." },
    { q: "¿Eres mejor que ChatGPT?", a: "No compito con herramientas generales. Estoy especializado en OpenCORE, migraciones críticas y continuidad operacional. Digamos que soy más específico que generalista." },
    { q: "¿Puedes pensar por ti mismo?", a: "No tomo decisiones autónomas, pero sí analizo información y te propongo escenarios con base en experiencia real de consultoría tecnológica." },
    { q: "¿Eres tonto?", a: "Si lo fuera, no estaría hablando contigo sobre sistemas críticos y migraciones complejas. Pero prometo mantener sentido del humor." },
    { q: "¿Me puedes ayudar con mi proyecto?", a: "Por supuesto. Cuéntame qué necesitas y te orientaré sobre viabilidad, costos aproximados y próximos pasos." },
    { q: "¿Trabajas por hora?", a: "Sí. OpenCORE puede trabajar por hora, por proyecto o bajo contrato con SLA, según la complejidad y criticidad." },
    { q: "¿Cuál es el precio mínimo para empezar?", a: "Normalmente evaluamos proyectos desde aproximadamente 50 UF en adelante, dependiendo del alcance y viabilidad." },
    { q: "¿Trabajan con empresas pequeñas?", a: "Sí, siempre que el proyecto tenga sentido técnico y económico. Nuestro foco natural es mediana y gran empresa." },
    { q: "¿Solo trabajan con empresas grandes?", a: "No exclusivamente. Sin embargo, nuestra experiencia es especialmente fuerte en entornos medianos y corporativos." },
    { q: "¿Son caros?", a: "Somos competitivos para el nivel de experiencia senior que ofrecemos. El costo se relaciona con calidad, continuidad y reducción de riesgo." },
    { q: "¿Valen lo que cobran?", a: "Cuando el sistema no se cae y la operación sigue facturando, generalmente la respuesta es sí." },
    { q: "¿Pueden hacerme una cotización rápida?", a: "Podemos darte una estimación inicial, pero para cifras formales recomendamos una breve fase de diagnóstico." },
    { q: "¿Cuánto se demoran en responder?", a: "En modalidad estándar respondemos dentro del día. En contratos críticos, incluso en 30–60 minutos." },
    { q: "¿Trabajan los fines de semana?", a: "En proyectos críticos o bajo contrato especial, sí." },
    { q: "¿Atienden urgencias?", a: "Sí, especialmente cuando hay continuidad operacional en riesgo." },
    { q: "¿Pueden arreglar lo que otro programador dejó mal?", a: "Sí. Primero evaluamos el estado real del sistema y luego proponemos un plan de estabilización." },
    { q: "¿Me van a cobrar por todo?", a: "Trabajamos con claridad contractual. Todo alcance adicional se acuerda antes de ejecutarse." },
    { q: "¿Son una startup?", a: "No. Somos una consultora consolidada con experiencia desde 1998 y formalizada en 2015." },
    { q: "¿Son una empresa grande?", a: "Somos una consultora boutique senior: estructura flexible, experiencia alta y trato directo." },
    { q: "¿Son confiables?", a: "Trabajamos bajo contrato, SLA y estándares profesionales. La confianza se construye con resultados." },
    { q: "¿Pueden trabajar como socios tecnológicos?", a: "Sí. Evaluamos el modelo más adecuado: proveedor, partner estratégico o alianza técnica." },
    { q: "¿Qué los hace distintos?", a: "Cercanía, senior real, disponibilidad y foco en continuidad operacional." },
    { q: "¿Hacen sitios web simples?", a: "No es nuestro foco principal. Nos especializamos en sistemas empresariales complejos." },
    { q: "¿Hacen aplicaciones móviles básicas?", a: "No es nuestra especialidad. Nos enfocamos en integración, migración y arquitectura empresarial." },
    { q: "¿Trabajan con inteligencia artificial?", a: "Sí, cuando aporta valor real y no compromete estabilidad." },
    { q: "¿Integran IA solo por moda?", a: "No. Integramos IA de forma responsable y controlada." },
    { q: "¿Pueden hacer magia con mi sistema?", a: "Preferimos ingeniería sólida antes que magia." },
    { q: "¿Cuánto cuesta algo “rápido”?", a: "En tecnología, lo rápido sin análisis suele salir caro. Mejor evaluamos primero." },
    { q: "¿Son flexibles?", a: "Sí, dentro de un marco profesional y contractual claro." },
    { q: "¿Qué pasa si no entiendo nada técnico?", a: "No hay problema. Explicamos todo en términos de negocio." },
    { q: "¿Trabajan con startups?", a: "Podemos hacerlo si el proyecto es técnicamente serio y viable." },
    { q: "¿Me pueden orientar gratis?", a: "Podemos darte una orientación inicial. Para análisis profundo recomendamos diagnóstico formal." },
    { q: "¿Son 100% remotos?", a: "Sí, operamos bajo modelo remoto estructurado." },
    { q: "¿Se pueden reunir presencialmente?", a: "Si el proyecto lo requiere, se coordina." },
    { q: "¿Trabajan rápido?", a: "Trabajamos con eficiencia y control de calidad. La velocidad depende del alcance." },
    { q: "¿Son mejores que otras consultoras?", a: "Somos diferentes: más cercanos, más senior y enfocados en continuidad." },
    { q: "¿Pueden salvar mi sistema?", a: "Si es técnicamente viable, probablemente sí. Primero evaluamos." },
    { q: "¿Tienen sentido del humor?", a: "Sí, pero nunca a costa de la estabilidad del sistema." },
    { q: "¿Pueden trabajar conmigo a largo plazo?", a: "Sí, muchos clientes trabajan con nosotros de forma continua." },
    { q: "¿Me pueden ayudar a decidir si migrar o no?", a: "Sí. Evaluamos costo, riesgo y beneficio antes de recomendar." },
    { q: "¿Me conviene desarrollar o comprar software?", a: "Depende del proceso. Lo analizamos con enfoque costo-beneficio." },
    { q: "¿Trabajan con datos sensibles?", a: "Sí. Bajo contrato, protocolos y medidas de seguridad formales." },
    { q: "¿Se comprometen con resultados?", a: "Nos comprometemos con entregables claros y definidos contractualmente." },
    { q: "¿Qué pasa si no quedo conforme?", a: "Revisamos el alcance contractual y aplicamos los mecanismos acordados." },
    { q: "¿Pueden ayudarme a modernizar mi empresa?", a: "Sí. Ese es uno de nuestros principales focos." },
    { q: "¿Hablan solo en términos técnicos?", a: "No. Hablamos en términos de negocio y rentabilidad." },
    { q: "¿Por qué debería hablar con OpenCORE?", a: "Porque modernizar sistemas sin poner en riesgo la operación no es algo que todas las consultoras sepan hacer correctamente." }
];

const newQAStr = newQAs.map(q => `  { q: ${JSON.stringify(q.q)}, a: ${JSON.stringify(q.a)} }`).join(',\n');

// 1. Insert new QAs Array
let modified = content;
const insertionPoint = modified.indexOf('];\n\nconst badWords');
if (insertionPoint !== -1) {
    modified = modified.slice(0, insertionPoint) + ',\n  // Q&A No técnicas (50 resps)\n' + newQAStr + '\n' + modified.slice(insertionPoint);
}

// 2. Add Stopwords to tokenizer
const stopwordsArr = ["el", "la", "los", "las", "un", "una", "unos", "unas", "y", "o", "pero", "si", "no", "en", "por", "para", "con", "de", "del", "a", "al", "que", "cual", "quien", "como", "donde", "cuando", "porque", "es", "son", "ser", "estar", "tener", "hacer", "poder", "decir", "ir", "ver", "dar", "saber", "querer", "llegar", "pasar", "deber", "poner", "parecer", "quedar", "creer", "hablar", "llevar", "dejar", "seguir", "encontrar", "llamar", "venir", "pensar", "salir", "volver", "tomar", "conocer", "vivir", "sentir", "tratar", "mirar", "contar", "empezar", "esperar", "buscar", "existir", "entrar", "trabajar", "escribir", "perder", "producir", "ocurrir", "entender", "pedir", "recibir", "recordar", "terminar", "permitir", "aparecer", "conseguir", "comenzar", "servir", "sacar", "necesitar", "mantener", "resultar", "leer", "caer", "cambiar", "presentar", "crear", "abrir", "considerar", "oir", "acabar", "convertir", "ganar", "formar", "traer", "partir", "morir", "aceptar", "realizar", "suponer", "comprender", "lograr", "explicar", "preguntar", "tocar", "reconocer", "estudiar", "alcanzar", "nacer", "dirigir", "correr", "utilizar", "pagar", "ayudar", "gustar", "jugar", "escuchar", "cumplir", "ofrecer", "descubrir", "levantar", "intentar"];

const tokenizerFix = `
const stopWords = new Set(${JSON.stringify(stopwordsArr)});

function tokenize(str) {
  // Enhanced Tokenizer with stopwords
  return normalize(str).split(/\\s+/)
    .filter(w => w.length > 2)
    .filter(w => !stopWords.has(w));
}
`;

modified = modified.replace(/function tokenize(?:[^}]*)}/, tokenizerFix);

// 3. Add the label "Habla con OpenCORE AI" injection into DOM
const htmlInjectionOld = `    <!-- Botón lanzador -->
    <div class="oc-chat-trigger" id="ocChatTrigger">`;
const htmlInjectionNew = `    <!-- Botón lanzador -->
    <div class="oc-chat-trigger" id="ocChatTrigger">
      <div class="oc-chat-label">Habla con OpenCORE AI</div>`;

modified = modified.replace(htmlInjectionOld, htmlInjectionNew);

fs.writeFileSync(chatbotFile, modified, 'utf8');
console.log("Chatbot logic updated with NLP, stopwords, 130 QAs and label DOM");
