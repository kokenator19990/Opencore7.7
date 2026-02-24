const fs = require('fs');
const path = require('path');

// Read current chatbot to extract existing QnA
const currentFile = fs.readFileSync(path.resolve('v3/js/chatbot.js'), 'utf8');

// Extract existing qnaDB array
const dbStart = currentFile.indexOf('const qnaDB = [');
const dbEnd = currentFile.indexOf('];\n', dbStart) + 2;
const existingDB = currentFile.substring(dbStart, dbEnd);

// New 30 Q&As to add
const newQAs = `
  // ── Preguntas adicionales (30) ──
  { q: "¿Cuánto cobran?", a: "Trabajamos en rangos referenciales entre 1 y 5 UF por hora, según complejidad. Proyectos típicos medianos y grandes suelen estar entre 300 y 500 UF o más, definidos tras diagnóstico." },
  { q: "¿Cuánto vale un proyecto mínimo?", a: "En casos acotados podemos comenzar desde aproximadamente 50 UF, aunque nuestro foco natural son proyectos de mayor escala." },
  { q: "¿Cómo cobran?", a: "Podemos trabajar por hora, bolsa de horas, proyecto cerrado o servicio mensual con SLA. El modelo se define según incertidumbre y criticidad." },
  { q: "¿Qué es lo más grande que han hecho?", a: "Hemos participado en más de 30 proyectos de gran escala, incluyendo migraciones completas y sistemas críticos 24/7 en entornos corporativos complejos." },
  { q: "¿Qué es lo más pequeño que han hecho?", a: "Desde mejoras puntuales por horas hasta diagnósticos técnicos específicos. Evaluamos siempre que el proyecto tenga sentido técnico y económico." },
  { q: "¿Me puedes ayudar a editar una imagen?", a: "No realizamos edición gráfica directa desde aquí, pero podemos orientarte sobre herramientas o integrar soluciones tecnológicas relacionadas con procesamiento de imágenes." },
  { q: "¿Qué es ChatGPT?", a: "ChatGPT es un modelo de inteligencia artificial desarrollado por OpenAI que genera respuestas conversacionales. Yo estoy especializado en representar y explicar los servicios de OpenCORE." },
  { q: "¿Eres ChatGPT?", a: "Estoy basado en tecnología de IA similar, pero estoy configurado específicamente para asesorarte sobre OpenCORE y sus servicios." },
  { q: "¿Trabajas para OpenAI?", a: "No. Soy el asistente digital de OpenCORE Consulting SpA." },
  { q: "¿Cómo así?", a: "Si necesitas más detalle sobre lo último que expliqué, puedo ampliarlo. ¿Qué parte quieres que desarrolle?" },
  { q: "¿Me puedes hacer una página web?", a: "No es nuestro foco principal. Nos especializamos en sistemas empresariales, integración, migraciones y continuidad operacional." },
  { q: "¿Hacen e-commerce?", a: "Podemos integrar plataformas o sistemas complejos, pero no somos una agencia de tiendas básicas." },
  { q: "¿Me puedes hacer una app para mi negocio?", a: "Si es una app integrada a procesos empresariales complejos, sí. Si es una app básica sin integración, no es nuestro foco principal." },
  { q: "¿Cuánto se demoran en hacer un sistema?", a: "Depende del alcance. Puede ir desde semanas hasta varios meses en proyectos complejos. Siempre recomendamos diagnóstico previo." },
  { q: "¿Me puedes decir si mi idea es buena?", a: "Puedo ayudarte a evaluar viabilidad técnica y riesgos. El análisis estratégico final depende del mercado y tu modelo de negocio." },
  { q: "¿Puedes reemplazar a mi equipo de TI?", a: "No reemplazamos equipos internos; los complementamos o fortalecemos cuando es necesario." },
  { q: "¿Trabajan con startups tecnológicas?", a: "Sí, si el proyecto es serio y técnicamente viable." },
  { q: "¿Trabajan con el gobierno?", a: "Podemos hacerlo si el marco contractual y técnico lo permite." },
  { q: "¿Qué tecnología usan?", a: "Seleccionamos tecnología según el proyecto. No forzamos herramientas; priorizamos continuidad, estabilidad y mantenibilidad." },
  { q: "¿Qué pasa si no tengo claro lo que necesito?", a: "Recomendamos una fase de diagnóstico o discovery para definir alcance real antes de comprometer inversión." },
  { q: "¿Me puedes asesorar gratis?", a: "Podemos darte una orientación inicial. Para análisis profundo recomendamos consultoría formal." },
  { q: "¿Tienen experiencia real o solo teoría?", a: "Tenemos más de 120 proyectos ejecutados y experiencia operativa desde 1998." },
  { q: "¿Trabajan rápido o lento?", a: "Trabajamos con eficiencia técnica. La velocidad depende del alcance y criticidad del proyecto." },
  { q: "¿Son más baratos que otras consultoras?", a: "Nuestro valor está alineado a experiencia senior y reducción de riesgo. No competimos por ser los más baratos, sino por ser sólidos." },
  { q: "¿Qué pasa si no me gusta el resultado?", a: "El alcance y entregables están definidos contractualmente. Si algo no cumple lo acordado, se revisa bajo ese marco." },
  { q: "¿Pueden hacerme un presupuesto estimado hoy?", a: "Podemos dar una referencia general, pero para cifras exactas necesitamos entender el alcance." },
  { q: "¿Puedo hablar con una persona real?", a: "Sí, puedes solicitar contacto directo con el equipo a través de nuestro formulario de contacto o al +56 9 4958 7198." },
  { q: "¿Atienden fuera de horario laboral?", a: "En modalidad estándar, horario hábil. En contratos críticos, sí podemos operar 24/7." },
  { q: "¿Pueden trabajar conmigo aunque no sea experto en tecnología?", a: "Por supuesto. Traducimos lo técnico a impacto en negocio." },
  { q: "¿Por qué debería confiar en ustedes?", a: "Porque trabajamos bajo contrato, con experiencia comprobada, foco en continuidad y un enfoque responsable en cada implementación." }
`;

// Build the merged DB string
let mergedDB = existingDB.replace(/\];\s*$/, ',\n' + newQAs + '\n];');

// Build the FULL optimized engine
const engine = `/* ========================================================
   CHATBOT V3 PRO - OPENCORE NLP ENGINE
   Versión: 3.1 | Build: ${new Date().toISOString().slice(0, 10)}
   Features: Levenshtein, N-gram, Stopwords, Quick Replies,
             Sentiment Guard, Greeting/Farewell Detection
======================================================== */

${mergedDB}

// ── PROFANITY FILTER ──
const badWords = ["estupido","imbecil","tonto","mierda","puta","pene","culo","caca","joder","coño","pendejo","cabron","idiota","maricon","zorra","sexo","porno","weon","weona","ctm","csm","chucha","concha","verga","aweonao","culiao","gil","boludo","pelotudo","marico"];

// ── STOPWORDS (ES) ──
const stopWords = new Set(["el","la","los","las","un","una","unos","unas","y","o","pero","si","no","en","por","para","con","de","del","a","al","que","cual","quien","como","donde","cuando","porque","es","son","ser","estar","hay","fue","era","han","ha","me","te","se","nos","le","lo","su","mi","tu","su","mas","muy","ya","tambien","solo","otro","toda","todo","todos","estas","este","esta","eso","ese","esos","cada","aqui","ahi","alla"]);

// ── TEXT NORMALIZER ──
function normalize(str) {
  return str.toLowerCase()
    .normalize("NFD").replace(/[\\u0300-\\u036f]/g, "")
    .replace(/[^\\w\\s]/gi, " ")
    .replace(/\\s+/g, " ")
    .trim();
}

// ── TOKENIZER WITH STOPWORDS ──
function tokenize(str) {
  return normalize(str).split(/\\s+/)
    .filter(w => w.length > 1)
    .filter(w => !stopWords.has(w));
}

// ── LEVENSHTEIN DISTANCE (typo tolerance) ──
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const d = Array.from({length: m + 1}, (_, i) => [i]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      d[i][j] = a[i-1] === b[j-1]
        ? d[i-1][j-1]
        : 1 + Math.min(d[i-1][j], d[i][j-1], d[i-1][j-1]);
    }
  }
  return d[m][n];
}

// ── FUZZY TOKEN MATCH (tolerates 1-2 char typos) ──
function fuzzyMatch(inputToken, targetToken) {
  if (inputToken === targetToken) return 1;
  if (targetToken.includes(inputToken) || inputToken.includes(targetToken)) return 0.85;
  const dist = levenshtein(inputToken, targetToken);
  const maxLen = Math.max(inputToken.length, targetToken.length);
  if (maxLen <= 3) return dist === 0 ? 1 : 0;
  const similarity = 1 - (dist / maxLen);
  return similarity >= 0.65 ? similarity : 0;
}

// ── N-GRAM GENERATOR (bigrams for context) ──
function bigrams(tokens) {
  const bg = [];
  for (let i = 0; i < tokens.length - 1; i++) {
    bg.push(tokens[i] + " " + tokens[i+1]);
  }
  return bg;
}

// ── SYNONYM MAP (common alternative words) ──
const synonyms = {
  "precio": ["costo","valor","cobran","cobrar","tarifa","presupuesto","cotizacion"],
  "proyecto": ["trabajo","desarrollo","sistema","implementacion"],
  "rapido": ["urgente","express","apurado","pronto","inmediato"],
  "experiencia": ["trayectoria","recorrido","anos","antiguedad"],
  "empresa": ["compania","consultora","organizacion","firma","negocio"],
  "seguridad": ["proteccion","confidencialidad","privacidad","resguardo"],
  "migracion": ["migrar","trasladar","mover","transferir"],
  "integracion": ["integrar","conectar","vincular","enlazar"],
  "soporte": ["mantenimiento","ayuda","asistencia","apoyo"],
  "cloud": ["nube","aws","azure","gcp"],
  "legacy": ["antiguo","viejo","obsoleto","heredado"],
  "inventario": ["stock","bodega","almacen"],
  "facturacion": ["factura","boleta","tributario","dte"],
  "contrato": ["acuerdo","convenio","sla"],
  "equipo": ["team","grupo","personal","plantel"]
};

function expandWithSynonyms(token) {
  const expanded = [token];
  for (const [key, syns] of Object.entries(synonyms)) {
    if (syns.includes(token) || key === token) {
      expanded.push(key, ...syns);
    }
  }
  return [...new Set(expanded)];
}

// ── ADVANCED SCORING ENGINE ──
function scoreEntry(inputTokens, entry) {
  const qTokens = tokenize(entry.q);
  if (qTokens.length === 0) return 0;

  let totalScore = 0;
  let matchedTokens = 0;

  // 1. Direct + Fuzzy token matching with synonym expansion
  for (const it of inputTokens) {
    const expandedInput = expandWithSynonyms(it);
    let bestTokenScore = 0;

    for (const qt of qTokens) {
      for (const ei of expandedInput) {
        const s = fuzzyMatch(ei, qt);
        if (s > bestTokenScore) bestTokenScore = s;
      }
    }

    if (bestTokenScore > 0) {
      totalScore += bestTokenScore;
      matchedTokens++;
    }
  }

  // 2. Bigram bonus (consecutive word pairs match = higher relevance)
  const inputBigrams = bigrams(inputTokens);
  const qBigrams = bigrams(qTokens);
  for (const ib of inputBigrams) {
    for (const qb of qBigrams) {
      if (ib === qb) totalScore += 1.5;
    }
  }

  // 3. Coverage ratio (what % of input tokens matched)
  const coverage = matchedTokens / Math.max(inputTokens.length, 1);

  // 4. Length penalty (avoid matching very short inputs to very long questions)
  const lengthRatio = Math.min(inputTokens.length / qTokens.length, 1);

  // Combined weighted score
  return (totalScore * 0.6) + (coverage * 2.0) + (lengthRatio * 0.4);
}

function getBestMatch(inputStr) {
  const inputTokens = tokenize(inputStr);
  if (inputTokens.length === 0) return null;

  let bestScore = 0;
  let bestMatch = null;
  let secondBest = null;

  for (const item of qnaDB) {
    const score = scoreEntry(inputTokens, item);
    if (score > bestScore) {
      secondBest = bestMatch;
      bestScore = score;
      bestMatch = { ...item, score };
    } else if (!secondBest || score > secondBest.score) {
      secondBest = { ...item, score };
    }
  }

  // Dynamic threshold based on input length
  const threshold = inputTokens.length <= 2 ? 1.2 : 1.5;

  if (bestScore >= threshold) {
    return {
      answer: bestMatch.a,
      confidence: Math.min(bestScore / 4, 1),
      suggestion: secondBest && secondBest.score >= threshold * 0.7 ? secondBest.q : null
    };
  }
  return null;
}

// ── GREETING / FAREWELL / THANKS DETECTION ──
const greetings = ["hola","buenas","ola","hey","hi","hello","buenos dias","buenas tardes","buenas noches","que tal","saludos"];
const farewells = ["chao","adios","bye","hasta luego","nos vemos","gracias","muchas gracias","vale gracias","ok gracias","perfecto gracias","genial gracias","excelente"];
const thanks = ["gracias","agradecido","agradezco","te agradezco","muchas gracias","mil gracias"];

function isGreeting(input) {
  const n = normalize(input);
  return greetings.some(g => n === g || n.startsWith(g + " "));
}
function isFarewell(input) {
  const n = normalize(input);
  return farewells.some(f => n === f || n.startsWith(f + " ") || n.endsWith(" " + f));
}
function isThanks(input) {
  const n = normalize(input);
  return thanks.some(t => n.includes(t));
}

// ── RANDOM RESPONSE PICKER ──
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

const greetingResponses = [
  "¡Hola! Soy el Asistente Inteligente de OpenCORE. ¿En qué te puedo apoyar hoy?",
  "¡Bienvenido! Estoy aquí para resolver tus dudas sobre tecnología empresarial, migraciones o integración de sistemas.",
  "¡Hola! Consulta lo que necesites sobre nuestros servicios, costos, metodología o experiencia."
];
const farewellResponses = [
  "¡Hasta pronto! Si necesitas algo más, aquí estaremos. 🚀",
  "¡Gracias por tu interés! No dudes en volver cuando lo necesites.",
  "¡Éxito en tu proyecto! Estamos disponibles cuando quieras retomar la conversación."
];
const thanksResponses = [
  "¡Con gusto! Si surge algo más, aquí estamos. 💪",
  "¡De nada! Estamos para ayudarte a tomar mejores decisiones tecnológicas.",
  "¡Gracias a ti por tu interés! No dudes en volver si necesitas más información."
];
const fallbackLong = [
  "Esa es una excelente pregunta. Te recomiendo contactarnos directamente para una respuesta más completa y personalizada.",
  "No dispongo de información suficiente para responderte con precisión. ¿Podrías contactarnos por el formulario para que un especialista te atienda?",
  "Tu consulta merece una respuesta profesional detallada. Te invito a agendar un diagnóstico gratuito con nuestro equipo."
];
const fallbackShort = [
  "¿Podrías detallar un poco más tu consulta para orientarte mejor?",
  "Necesito un poco más de contexto. ¿Qué aspecto de OpenCORE te interesa?",
  "No logré entender la consulta. ¿Podrías reformularla?"
];

// ── QUICK REPLY SUGGESTIONS ──
const quickReplies = [
  "¿Qué servicios ofrece OpenCORE?",
  "¿Cuánto cobran?",
  "¿Cuántos años de experiencia tienen?",
  "¿Pueden ayudarme con una migración?"
];

// ── MAIN PROCESSOR ──
function processInput(input) {
  const cleanInput = input.trim();
  const lowerInput = cleanInput.toLowerCase();
  const normalizedInput = normalize(cleanInput);

  // 1. Profanity guard
  for (const bw of badWords) {
    if (normalizedInput.includes(bw)) {
      return { text: "No respondemos este tipo de preguntas. Por favor, formula una consulta profesional y con gusto te orientamos.", suggestions: [] };
    }
  }

  // 2. Greetings
  if (isGreeting(cleanInput)) {
    return { text: pick(greetingResponses), suggestions: quickReplies };
  }

  // 3. Thanks
  if (isThanks(cleanInput) && cleanInput.split(" ").length <= 5) {
    return { text: pick(thanksResponses), suggestions: [] };
  }

  // 4. Farewells
  if (isFarewell(cleanInput)) {
    return { text: pick(farewellResponses), suggestions: [] };
  }

  // 5. NLP Match
  const match = getBestMatch(cleanInput);
  if (match) {
    const suggestions = match.suggestion ? [match.suggestion] : [];
    const prefix = match.confidence >= 0.8 ? "" : "Basándome en tu consulta: ";
    return { text: prefix + match.answer, suggestions };
  }

  // 6. Intelligent fallback
  const words = cleanInput.split(" ").length;
  if (words > 3) {
    return { text: pick(fallbackLong), suggestions: quickReplies.slice(0, 2) };
  }
  return { text: pick(fallbackShort), suggestions: quickReplies };
}

// ── DOM INJECTION & UI LOGIC ──
document.addEventListener("DOMContentLoaded", () => {
  const chatHTML = \`
    <div class="oc-chat-trigger" id="ocChatTrigger">
      <div class="oc-chat-label">Habla con OpenCORE AI</div>
      <svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
      <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </div>

    <div class="oc-chat-window" id="ocChatWindow">
      <div class="oc-chat-header">
        <div class="oc-chat-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="10" rx="2"></rect>
            <circle cx="12" cy="5" r="2"></circle>
            <path d="M12 7v4"></path>
            <line x1="8" y1="16" x2="8" y2="16"></line>
            <line x1="16" y1="16" x2="16" y2="16"></line>
          </svg>
        </div>
        <div class="oc-chat-title">
          <h4>Asistente OpenCORE</h4>
          <span>Online</span>
        </div>
      </div>
      
      <div class="oc-chat-body" id="ocChatBody">
        <div class="oc-msg bot">Hola 👋 Soy el asistente IA de OpenCORE Consulting. Pregúntame sobre servicios, costos, metodología o experiencia.</div>
        <div class="oc-quick-replies" id="ocQuickInit">
          <button class="oc-qr" data-q="¿Qué servicios ofrece OpenCORE?">Servicios</button>
          <button class="oc-qr" data-q="¿Cuánto cobran?">Costos</button>
          <button class="oc-qr" data-q="¿Cuántos años de experiencia tienen?">Experiencia</button>
          <button class="oc-qr" data-q="¿Pueden ayudarme con una migración?">Migraciones</button>
        </div>
      </div>

      <div class="oc-chat-footer">
        <input type="text" id="ocChatInput" class="oc-chat-input" placeholder="Escribe tu consulta..." autocomplete="off">
        <button id="ocChatSend" class="oc-chat-send">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  \`;

  document.body.insertAdjacentHTML("beforeend", chatHTML);

  const trigger = document.getElementById("ocChatTrigger");
  const win = document.getElementById("ocChatWindow");
  const body = document.getElementById("ocChatBody");
  const input = document.getElementById("ocChatInput");
  const sendBtn = document.getElementById("ocChatSend");

  // Toggle
  trigger.addEventListener("click", () => {
    trigger.classList.toggle("active");
    win.classList.toggle("open");
    if (win.classList.contains("open")) input.focus();
  });

  // Quick reply buttons
  body.addEventListener("click", (e) => {
    if (e.target.classList.contains("oc-qr")) {
      const q = e.target.dataset.q;
      if (q) {
        input.value = q;
        handleSend();
      }
    }
  });

  function appendUserMsg(txt) {
    const d = document.createElement("div");
    d.className = "oc-msg user";
    d.textContent = txt;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
  }

  function appendBotMsg(txt) {
    const d = document.createElement("div");
    d.className = "oc-msg bot";
    d.textContent = txt;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
    return d;
  }

  function appendQuickReplies(suggestions) {
    if (!suggestions || suggestions.length === 0) return;
    const wrap = document.createElement("div");
    wrap.className = "oc-quick-replies";
    suggestions.forEach(s => {
      const btn = document.createElement("button");
      btn.className = "oc-qr";
      btn.dataset.q = s;
      btn.textContent = s.length > 35 ? s.substring(0, 32) + "..." : s;
      wrap.appendChild(btn);
    });
    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
  }

  function appendTyping() {
    const d = document.createElement("div");
    d.className = "oc-msg bot oc-typing-wrapper";
    d.id = "ocTyping";
    d.innerHTML = '<div class="oc-typing"><div class="oc-dot"></div><div class="oc-dot"></div><div class="oc-dot"></div></div>';
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
  }

  function removeTyping() {
    const d = document.getElementById("ocTyping");
    if (d) d.remove();
  }

  function handleSend() {
    const txt = input.value.trim();
    if (!txt) return;

    // Remove initial quick replies
    const initQR = document.getElementById("ocQuickInit");
    if (initQR) initQR.remove();

    appendUserMsg(txt);
    input.value = "";
    appendTyping();

    // Dynamic delay based on response length simulation
    const delay = 600 + Math.random() * 900;
    setTimeout(() => {
      removeTyping();
      const result = processInput(txt);
      appendBotMsg(result.text);
      if (result.suggestions && result.suggestions.length > 0) {
        appendQuickReplies(result.suggestions);
      }
    }, delay);
  }

  sendBtn.addEventListener("click", handleSend);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSend();
  });
});
`;

fs.writeFileSync(path.resolve('v3/js/chatbot.js'), engine, 'utf8');
console.log("✅ Chatbot V3 PRO engine rebuilt with " + (mergedDB.match(/\\{ q:/g) || []).length + " Q&As");
console.log("Features: Levenshtein, N-grams, Synonyms, Quick Replies, Sentiment Detection");
