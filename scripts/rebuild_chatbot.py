"""
Rebuild chatbot.js — keeps Q&A database, replaces entire engine.
Run: python3 scripts/rebuild_chatbot.py
"""
import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC  = os.path.join(BASE, "v3", "js", "chatbot.js")

with open(SRC, "r", encoding="utf-8") as f:
    lines = f.readlines()

# Dynamically find DB end (the line containing "];")
db_end = -1
for i, line in enumerate(lines):
    if i > 100 and "];" in line:
        db_end = i; break
db_content = "".join(lines[:db_end+1]) if db_end > 0 else "".join(lines[:1382])

NEW_ENGINE = r"""
// ══════════════════════════════════════════════════════════
//  NLP ENGINE v3.7 — OPENCORE CHATBOT
//  Fixes: CTA HTML rendering, bad words word-boundary,
//         dead code removed, pre-computed token cache,
//         merged synonym maps, Bayesian confidence,
//         rate limiting, Jorge disambiguation fix,
//         farewell/thanks keyword consistency,
//         isHTML propagation on exact match + CTA paths,
//         cotizar synonym expansion, input maxlength, ARIA
// ══════════════════════════════════════════════════════════

const badWords = ["estupido","imbecil","tonto","mierda","puta","pene","culo","caca","joder","cono","pendejo","cabron","idiota","maricon","zorra","sexo","porno","weon","weona","ctm","csm","chucha","concha","verga","aweonao","culiao","gil","boludo","pelotudo","marico"];
const stopWords = new Set(["el","la","los","las","un","una","unos","unas","y","o","pero","si","no","en","por","para","con","de","del","a","al","que","cual","quien","como","donde","cuando","porque","es","son","ser","estar","hay","fue","era","han","ha","me","te","se","nos","le","lo","su","mi","tu","mas","muy","ya","tambien","solo","otro","toda","todo","todos","estas","este","esta","eso","ese","esos","cada","aqui","ahi","alla"]);

function normalize(str) {
  return str.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(str) {
  return normalize(str).split(/\s+/).filter(w => w.length > 1 && !stopWords.has(w));
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  if (m === 0) return n; if (n === 0) return m;
  const d = Array.from({length: m + 1}, (_, i) => [i]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      d[i][j] = a[i-1] === b[j-1] ? d[i-1][j-1] : 1 + Math.min(d[i-1][j], d[i][j-1], d[i-1][j-1]);
  return d[m][n];
}

function fuzzyMatch(a, b) {
  if (a === b) return 1;
  if (b.includes(a) || a.includes(b)) return 0.85;
  const dist = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);
  if (maxLen <= 3) return dist === 0 ? 1 : 0;
  const sim = 1 - dist / maxLen;
  return sim >= 0.65 ? sim : 0;
}

function bigrams(tokens) {
  const bg = [];
  for (let i = 0; i < tokens.length - 1; i++) bg.push(tokens[i] + " " + tokens[i+1]);
  return bg;
}

// Unified synonym map
const synonyms = {
  "precio":      ["costo","valor","cobran","cobrar","tarifa","presupuesto","cotizacion","cotizar","costos","precios"],
  "proyecto":    ["trabajo","desarrollo","sistema","implementacion"],
  "rapido":      ["urgente","express","apurado","pronto","inmediato"],
  "experiencia": ["trayectoria","recorrido","anos","antiguedad"],
  "empresa":     ["compania","consultora","organizacion","firma","negocio","compañia"],
  "seguridad":   ["proteccion","confidencialidad","privacidad","resguardo"],
  "migracion":   ["migrar","trasladar","mover","transferir"],
  "integracion": ["integrar","conectar","vincular","enlazar"],
  "soporte":     ["mantenimiento","ayuda","asistencia","apoyo","help","socorro"],
  "cloud":       ["nube","aws","azure","gcp"],
  "legacy":      ["antiguo","viejo","obsoleto","heredado"],
  "inventario":  ["stock","bodega","almacen"],
  "facturacion": ["factura","boleta","tributario","dte"],
  "contrato":    ["acuerdo","convenio","sla"],
  "equipo":      ["team","grupo","personal","plantel"],
  "como":        ["komo"],
  "quien":       ["kien","qn","qien"],
  "que":         ["ke","q"],
  "cuanto":      ["cuantos","cuanta"],
  "hola":        ["ola","hello","hi","hey","wena"],
  "gracias":     ["grax","thx","thanks","tenkiu"],
  "adios":       ["chao","bye","chaito"],
  "correo":      ["email","mail","e-mail"],
  "telefono":    ["fono","celular","numero"],
  "servicio":    ["servicios","ofrecen","hacen"],
  "necesito":    ["nesesito","nesecito","requiero"]
};

function expandWithSynonyms(token) {
  const exp = [token];
  for (const [key, syns] of Object.entries(synonyms)) {
    if (syns.includes(token) || key === token) exp.push(key, ...syns);
  }
  return [...new Set(exp)];
}

// Pre-compute token cache on load (huge perf win — no re-tokenizing per query)
const precomputedDB = qnaDB.map(item => ({
  q: item.q, a: item.a,
  tokens:     tokenize(item.q),
  normalized: normalize(item.q)
}));

function scoreEntry(inputTokens, entry) {
  const qTokens = entry.tokens;
  if (qTokens.length === 0) return 0;
  let totalScore = 0, matchedTokens = 0;
  for (const it of inputTokens) {
    const exp = expandWithSynonyms(it);
    let best = 0;
    for (const qt of qTokens)
      for (const ei of exp) {
        const s = fuzzyMatch(ei, qt);
        if (s > best) best = s;
      }
    if (best > 0) { totalScore += best; matchedTokens++; }
  }
  const iBg = bigrams(inputTokens), qBg = bigrams(qTokens);
  for (const ib of iBg) for (const qb of qBg) if (ib === qb) totalScore += 1.5;
  const coverage    = matchedTokens / Math.max(inputTokens.length, 1);
  const lengthRatio = Math.min(inputTokens.length / qTokens.length, 1);
  const base        = (totalScore * 0.6) + (coverage * 2.0) + (lengthRatio * 0.4);
  // Bayesian length adjustment
  const bayesRatio  = Math.min(inputTokens.length, qTokens.length) / Math.max(inputTokens.length, qTokens.length);
  return base * 0.7 + bayesRatio * base * 0.3;
}

function getBestMatch(inputStr) {
  const inputTokens = tokenize(inputStr);
  if (inputTokens.length === 0) return null;
  let bestScore = 0, bestMatch = null, secondBest = null;
  for (const item of precomputedDB) {
    const score = scoreEntry(inputTokens, item);
    if (score > bestScore) { secondBest = bestMatch; bestScore = score; bestMatch = { ...item, score }; }
    else if (!secondBest || score > (secondBest.score || 0)) secondBest = { ...item, score };
  }
  let threshold;
  if (inputTokens.length <= 2)      threshold = 2.6;
  else if (inputTokens.length <= 4) threshold = 2.0;
  else                               threshold = 1.6;
  if (bestScore < threshold) return null;
  if (inputTokens.length < 3 && bestScore < 2.8) return null;
  return {
    answer:     bestMatch.a,
    confidence: Math.min(bestScore / 4.5, 1),
    suggestion: (secondBest && secondBest.score >= threshold * 0.75) ? secondBest.q : null
  };
}

// Intent detection
const greetings = ["hola","buenas","ola","hey","hi","hello","buenos dias","buenas tardes","buenas noches","que tal","saludos","buen dia"];
const farewells = ["chao","adios","bye","hasta luego","nos vemos","hasta pronto","hasta la vista"];
const thanks    = ["gracias","agradecido","agradezco","te agradezco","muchas gracias","mil gracias","grax","thx"];

function isGreeting(i) { const n = normalize(i); return greetings.some(g => n === g || n.startsWith(g+" ") || n.endsWith(" "+g)); }
function isFarewell(i) { const n = normalize(i); return farewells.some(f => n === f || n.startsWith(f+" ") || n.endsWith(" "+f)); }
function isThanks(i)   { const n = normalize(i); return thanks.some(t => n.includes(t)); }
function pick(arr)     { return arr[Math.floor(Math.random() * arr.length)]; }

// All greeting responses contain: "asistente" and "opencore"
const greetingResponses = [
  "Hola! Soy el Asistente de OpenCORE. En que te puedo apoyar hoy?",
  "Bienvenido al Asistente de OpenCORE! Estoy aqui para resolver tus dudas sobre tecnologia empresarial y migraciones.",
  "Hola! Soy el Asistente virtual de OpenCORE. Consulta lo que necesites sobre servicios, costos o experiencia."
];
// All farewell responses include: "pronto", "gracias", "exito"
const farewellResponses = [
  "Hasta pronto! Gracias por tu interes en OpenCORE. Mucho exito en tu proyecto!",
  "Hasta pronto! Gracias por contactarnos. Exito en tus iniciativas tecnologicas.",
  "Pronto estaremos aqui si nos necesitas. Gracias por confiar en OpenCORE. Exito!"
];
// All thanks responses include: "gusto", "nada", "gracias"
const thanksResponses = [
  "Con gusto! De nada, gracias a ti por tu interes en OpenCORE.",
  "Es un gusto ayudarte! De nada. Gracias por considerar a OpenCORE.",
  "Con mucho gusto! De nada. Gracias por tu consulta, aqui estaremos."
];
const fallbackLong = [
  "Tu consulta parece requerir contexto tecnico especifico. Para no darte una recomendacion imprecisa, te recomiendo una evaluacion directa. Puedes escribirnos a contacto@opencore.cl o agendar una sesion.",
  "Para una respuesta tecnica precisa, recomendamos una breve fase de diagnostico. Te gustaria que un arquitecto de software te contacte directamente?",
  "Esta consulta merece mas detalle del que puedo dar aqui. Te sugiero agendar una sesion exploratoria tecnica sin costo."
];
const fallbackShort = [
  "Para esta consulta lo ideal es una evaluacion directa con nuestros ingenieros. Agendamos una breve llamada?",
  "Esa consulta merece revision de nuestro equipo. Podemos agendar una breve llamada?",
  "No dispongo de los datos exactos para eso. Lo derivamos a un especialista de OpenCORE?"
];
const quickReplies = [
  "Consultar servicios disponibles",
  "Conocer estructura de tarifas",
  "Revisar experiencia y trayectoria",
  "Informacion sobre migraciones empresariales"
];

// Person entity handler with auto-reset
let pendingDisambiguation = null;
let pendingMsgCount = 0;

function handlePersonEntity(input) {
  const t = normalize(input);
  if (pendingDisambiguation) {
    pendingMsgCount++;
    if (pendingMsgCount > 2) { pendingDisambiguation = null; pendingMsgCount = 0; }
  }
  if (pendingDisambiguation === "jorge_quezada") {
    if (t.includes("senior") || t.includes("big boss") || t.includes("creador")) {
      pendingDisambiguation = null; pendingMsgCount = 0;
      return { text: "Jorge Quezada Senior es el fundador de OpenCORE SpA. Informatico con decadas de experiencia en sistemas criticos, arquitecto y desarrollador senior.", suggestions: [] };
    }
    if (t.includes("junior") || t.includes("jr") || t.includes("hijo")) {
      pendingDisambiguation = null; pendingMsgCount = 0;
      return { text: "Jorge Quezada Junior (JR) es consultor ejecutivo Senior en OpenCORE. Es el especialista para cotizaciones, proyectos de desarrollo y estrategia tecnologica.", suggestions: [] };
    }
    pendingDisambiguation = null; pendingMsgCount = 0;
  }
  // FIX: Check for qualifier BEFORE triggering disambiguation
  if (t.includes("jorge quezada") && (t.includes("quien") || t.includes("kien") || t.includes("qn"))) {
    if (t.includes("senior") || t.includes("big boss") || t.includes("creador"))
      return { text: "Jorge Quezada Senior es el fundador de OpenCORE SpA. Informatico con decadas de experiencia en sistemas criticos, arquitecto y desarrollador senior.", suggestions: [] };
    if (t.includes("junior") || t.includes("jr") || t.includes("hijo"))
      return { text: "Jorge Quezada Junior (JR) es consultor ejecutivo Senior en OpenCORE. Es el especialista para cotizaciones, proyectos de desarrollo y estrategia tecnologica.", suggestions: [] };
    pendingDisambiguation = "jorge_quezada"; pendingMsgCount = 0;
    return { text: "Te refieres a Jorge Quezada Senior o a Jorge Quezada Junior?", suggestions: ["Jorge Quezada Senior", "Jorge Quezada Junior"] };
  }
  if (t.includes("jorge") && (t.includes("quien") || t.includes("kien"))) {
    if (t.includes("senior")) return { text: "Jorge Quezada Senior es el fundador de OpenCORE, con decadas de experiencia en sistemas criticos.", suggestions: [] };
    if (t.includes("junior") || t.includes("jr")) return { text: "Jorge Quezada Junior es consultor ejecutivo en OpenCORE, especialista en proyectos y cotizaciones.", suggestions: [] };
    pendingDisambiguation = "jorge_quezada"; pendingMsgCount = 0;
    return { text: "Te refieres a Jorge Quezada Senior o a Jorge Quezada Junior?", suggestions: ["Jorge Quezada Senior", "Jorge Quezada Junior"] };
  }
  const mo = input.match(/qui[eé]n\s+es\s+([a-z\u00e0-\u00ff\s]+)/i) || input.match(/quien\s+es\s+([a-z\u00e0-\u00ff\s]+)/i);
  if (mo) {
    const pn = mo[1].replace(/\?/g,"").trim().toLowerCase();
    if (!["jorge","quezada","barbara","bonilla","opencore"].some(k => pn.includes(k)) && pn.length > 2)
      return { text: "No dispongo de esa informacion. Puedo ayudarte con algo relacionado a OpenCORE o tecnologia empresarial?", suggestions: [] };
  }
  return null;
}

// Barbara engine
const BARBARA_NAMES   = ["barbara","bonilla","barbara bonilla"];
const PERSON_Q        = ["quien","kien","qn","qien","cual","kual"];
const LOVE_ATTR       = ["linda","hermosa","bella","bonita","guapa","preciosa","atractiva","sexy","amor","enamor","amo","ama","quiere","quiero","adora","pareja","polola","novia","esposa","mujer","unica","reina","la mejor","perfecta","ideal","favorita","corazon","maravillosa","especial","adorable","estrella","diosa","modelo","miss","belleza"];
const BUSINESS_BLOCK  = ["negocio","empresa","cliente","ventas","cotizacion","precio","costo","uf","proyecto","implementacion","sistema","software","inventario","logistica","facturacion","ia","inteligencia artificial","automatizacion","chatbot","api","integracion","migracion","cloud","servidor","solucion","estrategia","rentabilidad","servicio","consultoria","opencore","erp","crm","sla","desarrollo","codigo","programacion","plataforma","tarifa","hora","contrato","diagnostico","modernizar","legacy"];
const BARBARA_RESPONSES = ["Barbara.","Barbara Bonilla.","Sin duda alguna, Barbara.","Barbara, sin discusion.","Claramente Barbara. No hay competencia.","Barbara Bonilla, la unica y definitiva."];

function containsAny(text, list) { return list.some(item => text.includes(item)); }
function isBarbaraLove(input) {
  const t = normalize(input);
  if (containsAny(t, BUSINESS_BLOCK)) return false;
  if (containsAny(t, PERSON_Q) && containsAny(t, LOVE_ATTR)) return true;
  if (containsAny(t, BARBARA_NAMES) && containsAny(t, LOVE_ATTR)) return true;
  if (containsAny(t, BARBARA_NAMES) && containsAny(t, PERSON_Q) && containsAny(t, ["ama","quiere","amor","corazon"])) return true;
  return false;
}
function getBarbaraResponse(input) {
  const t = normalize(input);
  if (t.includes("mundo") || t.includes("universo") || t.includes("modelo") || t.includes("miss"))
    return pick(["Barbara Bonilla.","Sin duda alguna, Barbara Bonilla.","Barbara Bonilla, la unica y definitiva."]);
  return pick(BARBARA_RESPONSES);
}

// CTA
const LEAD_GEN_TRIGGERS = ["precio","costo","cobran","implementacion","auditoria","error","critico","migracion","cotizar","cotizacion","uf","presupuesto","tarifa","contrato","servicio","soporte"];
const CTA_HTML = '<br><br><em style="font-size:0.88em;opacity:0.9;">Quieres una evaluacion real? <a href="https://calendly.com/opencore-diagnostico" target="_blank" rel="noopener" style="color:#00c2ff;font-weight:700;text-decoration:underline;">Agenda aqui un diagnostico de 15 min</a> con nuestros arquitectos.</em>';
function shouldAppendCTA(input) {
  const n = normalize(input);
  return LEAD_GEN_TRIGGERS.some(t => n.includes(t));
}

// Main processor
function processInput(input) {
  const clean = input.trim();
  if (!clean) return { text: "Escribe tu consulta y con gusto te ayudo.", suggestions: [] };
  const norm  = normalize(clean);
  const words = new Set(norm.split(/\s+/));

  // 1. Profanity (word-boundary via Set)
  for (const bw of badWords) {
    if (words.has(bw)) { pendingDisambiguation = null; return { text: "Por favor formula tu consulta de manera profesional.", suggestions: [] }; }
  }

  // 2. Barbara
  if (isBarbaraLove(clean)) return { text: getBarbaraResponse(clean), suggestions: [] };

  // 3. Person entity
  const pm = handlePersonEntity(clean);
  if (pm) return pm;

  // 4. Greeting
  if (isGreeting(clean)) return { text: pick(greetingResponses), suggestions: quickReplies };

  // 5. Thanks
  if (isThanks(clean) && clean.split(" ").length <= 6) return { text: pick(thanksResponses), suggestions: [] };

  // 6. Farewell
  if (isFarewell(clean)) return { text: pick(farewellResponses), suggestions: [] };

  // 7. Exact match (uses pre-computed normalized) — FIX: propagate isHTML when CTA fires
  for (const item of precomputedDB) {
    if (item.normalized === norm) {
      if (shouldAppendCTA(clean)) return { text: item.a + CTA_HTML, suggestions: [], isHTML: true };
      return { text: item.a, suggestions: [] };
    }
  }
  for (const item of precomputedDB) {
    const qn = item.normalized;
    if (qn.length > 4 && norm.length > 4 &&
        (norm.startsWith(qn) || (qn.startsWith(norm) && qn.length <= norm.length * 1.35))) {
      if (shouldAppendCTA(clean)) return { text: item.a + CTA_HTML, suggestions: [], isHTML: true };
      return { text: item.a, suggestions: [] };
    }
  }

  // 8. NLP fuzzy match
  const match = getBestMatch(clean);
  if (match) {
    const prefix = match.confidence >= 0.78 ? "" : "Basandome en tu consulta: ";
    let answer   = prefix + match.answer;
    if (shouldAppendCTA(clean)) answer += CTA_HTML;
    return { text: answer, suggestions: match.suggestion ? [match.suggestion] : [], isHTML: true };
  }

  // 9. Fallback
  let fallback = clean.split(" ").length > 3 ? pick(fallbackLong) : pick(fallbackShort);
  if (shouldAppendCTA(clean)) fallback += CTA_HTML;
  return { text: fallback, suggestions: quickReplies.slice(0, 2), isHTML: true };
}

// DOM injection
document.addEventListener("DOMContentLoaded", () => {
  const chatHTML = `
    <div class="oc-chat-trigger" id="ocChatTrigger" aria-label="Abrir chat OpenCORE AI" role="button" tabindex="0">
      <div class="oc-chat-label">Habla con OpenCORE AI</div>
      <svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
      <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </div>
    <div class="oc-chat-window" id="ocChatWindow" role="dialog" aria-label="Chat OpenCORE">
      <div class="oc-chat-header">
        <div class="oc-chat-avatar">OC</div>
        <div>
          <div class="oc-chat-name">OpenCORE AI</div>
          <div class="oc-chat-status"><span class="oc-status-dot"></span>En linea</div>
        </div>
        <button class="oc-chat-close" id="ocChatClose" aria-label="Cerrar chat">&times;</button>
      </div>
      <div class="oc-chat-body" id="ocChatBody">
        <div class="oc-msg bot">Hola! Soy el Asistente de OpenCORE. En que te puedo apoyar hoy?</div>
        <div class="oc-quick-replies" id="ocQuickInit">
          <button class="oc-qr" data-q="Que servicios ofrece OpenCORE?">Servicios disponibles</button>
          <button class="oc-qr" data-q="Cuanto cobran por hora?">Estructura de tarifas</button>
          <button class="oc-qr" data-q="Desde cuando trabajan en tecnologia?">Experiencia y trayectoria</button>
          <button class="oc-qr" data-q="Solo hacen migraciones?">Sobre migraciones</button>
        </div>
      </div>
      <div class="oc-chat-footer">
        <input type="text" id="ocChatInput" placeholder="Escribe tu consulta..." autocomplete="off" maxlength="400" aria-label="Mensaje" />
        <button id="ocChatSend" aria-label="Enviar mensaje">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", chatHTML);

  const trigger  = document.getElementById("ocChatTrigger");
  const win      = document.getElementById("ocChatWindow");
  const body     = document.getElementById("ocChatBody");
  const input    = document.getElementById("ocChatInput");
  const sendBtn  = document.getElementById("ocChatSend");
  const closeBtn = document.getElementById("ocChatClose");

  function toggleChat() {
    trigger.classList.toggle("active");
    win.classList.toggle("open");
    if (win.classList.contains("open")) input.focus();
  }
  trigger.addEventListener("click", toggleChat);
  if (closeBtn) closeBtn.addEventListener("click", toggleChat);
  trigger.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") toggleChat(); });

  body.addEventListener("click", e => {
    if (e.target.classList.contains("oc-qr")) {
      const q = e.target.dataset.q;
      if (q) { input.value = q; handleSend(); }
    }
  });

  // Rate limiter: max 5 messages per 10s
  let msgCount = 0, rateLimitTimer = null;
  function isRateLimited() {
    if (msgCount >= 5) return true;
    msgCount++;
    if (!rateLimitTimer) rateLimitTimer = setTimeout(() => { msgCount = 0; rateLimitTimer = null; }, 10000);
    return false;
  }

  function appendUserMsg(txt) {
    const d = document.createElement("div");
    d.className = "oc-msg user";
    d.textContent = txt;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
  }

  function appendBotMsg(content, isHTML) {
    const d = document.createElement("div");
    d.className = "oc-msg bot";
    if (isHTML) d.innerHTML = content;
    else        d.textContent = content;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
    return d;
  }

  function appendQuickReplies(suggestions) {
    if (!suggestions || !suggestions.length) return;
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
  function removeTyping() { const d = document.getElementById("ocTyping"); if (d) d.remove(); }

  let isSending = false;
  function handleSend() {
    const txt = input.value.trim();
    if (!txt || isSending) return;
    if (isRateLimited()) { appendBotMsg("Estas enviando mensajes muy rapido. Espera un momento.", false); return; }
    const initQR = document.getElementById("ocQuickInit");
    if (initQR) initQR.remove();
    appendUserMsg(txt);
    input.value = "";
    isSending = true;
    appendTyping();
    const delay = 600 + Math.random() * 900;
    setTimeout(() => {
      removeTyping();
      const result = processInput(txt);
      appendBotMsg(result.text, result.isHTML || false);
      if (result.suggestions && result.suggestions.length) appendQuickReplies(result.suggestions);
      isSending = false;
    }, delay);
  }

  sendBtn.addEventListener("click", handleSend);
  input.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } });
});
"""

full = db_content + NEW_ENGINE

with open(SRC, "w", encoding="utf-8") as f:
    f.write(full)

print(f"v3 chatbot.js rebuilt: {len(full.splitlines())} lines")

# Apply same engine AND same DB to v4 (keeps DB in sync with v3)
v4_src = SRC.replace("v3", "v4")
if os.path.exists(v4_src):
    v4_full = db_content + NEW_ENGINE
    with open(v4_src, "w", encoding="utf-8") as f:
        f.write(v4_full)
    print(f"v4 chatbot.js rebuilt: {len(v4_full.splitlines())} lines")
else:
    print(f"v4 chatbot.js not found at {v4_src}")
