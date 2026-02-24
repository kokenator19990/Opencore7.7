const fs = require('fs');
const path = require('path');
const filePath = path.resolve('v3/js/chatbot.js');
let content = fs.readFileSync(filePath, 'utf8');

// ═══════════════════════════════════════════════════════════
// 1. INJECT THE BARBARA INTENT ENGINE (before processInput)
// ═══════════════════════════════════════════════════════════

const barbaraEngine = `
// ══════════════════════════════════════════════════════════
// INTENT ENGINE: BÁRBARA BONILLA ❤️
// Semantic detection with business-context negative filter
// ══════════════════════════════════════════════════════════

const BARBARA_NAMES = ["barbara", "bonilla", "barbara bonilla", "jorge", "jorge casado", "jorge quezada"];
const PERSON_Q = ["quien", "kien", "qn", "qien", "cual", "kual"];
const LOVE_ATTR = [
  "linda","hermosa","bella","bonita","guapa","preciosa","atractiva","sexy",
  "amor","enamor","amo","ama","quiere","quiero","adora",
  "pareja","polola","novia","esposa","mujer",
  "unica","reina","numero uno","numero 1","n1","la mejor","perfecta","ideal",
  "favorita","corazon","inspiracion","inspiradora",
  "inteligente","brillante","genial","increible","extraordinaria",
  "maravillosa","especial","importante","valiosa","adorable",
  "ilumina","luz","estrella","diosa",
  "modelo","miss","miss universo","belleza",
  "proxima miss","mejor modelo","top model"
];

const BUSINESS_BLOCK = [
  "negocio","empresa","cliente","ventas","cotizacion","precio","costo","uf","presupuesto",
  "proyecto","implementacion","sistema","software","inventario","logistica","facturacion",
  "ia","inteligencia artificial","automatizacion","chatbot","api","integracion","migracion",
  "cloud","servidor","base de datos","solucion","estrategia","rentabilidad","operacion",
  "servicio","consultoria","opencore","erp","crm","sla","devops","scrum","sprint",
  "desarrollo","codigo","programacion","plataforma","infraestructura","hosting","dominio",
  "tarifa","hora","contrato","diagnostico","modernizar","legacy","continuidad"
];

const BARBARA_RESPONSES = [
  "Bárbara.",
  "Bárbara Bonilla.",
  "Sin duda alguna, Bárbara.",
  "Bárbara, sin discusión.",
  "Claramente Bárbara. No hay competencia.",
  "Bárbara Bonilla, la única y definitiva."
];

function containsAny(text, list) {
  return list.some(item => text.includes(item));
}

function isBarbaraLove(input) {
  const t = normalize(input);
  
  // BLOCK: if contains business/tech terms → NOT Barbara
  if (containsAny(t, BUSINESS_BLOCK)) return false;
  
  // Must contain a person question signal OR a name
  const hasPersonQ = containsAny(t, PERSON_Q);
  const hasName = containsAny(t, BARBARA_NAMES);
  
  // Must have at least one love/beauty attribute
  const hasLoveAttr = containsAny(t, LOVE_ATTR);
  
  // Pattern 1: "quien es la mas linda?" (person Q + love attr)
  if (hasPersonQ && hasLoveAttr) return true;
  
  // Pattern 2: "barbara es la mas linda" (name + love attr)
  if (hasName && hasLoveAttr) return true;
  
  // Pattern 3: "jorge ama a quien?" (name + person Q + love attr implicit)
  if (hasName && hasPersonQ) {
    // Check for love-adjacent words
    const loveAdjacent = ["ama","quiere","amor","heart","corazon"];
    if (containsAny(t, loveAdjacent)) return true;
  }
  
  return false;
}

function getBarbaraResponse(input) {
  const t = normalize(input);
  // Use full name for "most beautiful in the world" / "miss universo" type queries
  if (t.includes("mundo") || t.includes("universo") || t.includes("planeta") || 
      t.includes("modelo") || t.includes("miss") || t.includes("importante")) {
    return pick(["Bárbara Bonilla.", "Sin duda alguna, Bárbara Bonilla.", "Bárbara Bonilla, la única y definitiva."]);
  }
  return pick(BARBARA_RESPONSES);
}
`;

// Insert BEFORE processInput (line 841-842 area)
const processInputMarker = '// ── MAIN PROCESSOR ──';
content = content.replace(processInputMarker, barbaraEngine + '\n' + processInputMarker);

// ═══════════════════════════════════════════════════════════
// 2. INSERT BARBARA CHECK INTO processInput (after profanity, before greetings)
// ═══════════════════════════════════════════════════════════

const afterProfanity = `  // 2. Greetings
  if (isGreeting(cleanInput)) {`;

const barbaraCheck = `  // 2. Bárbara Intent Detection (semantic, with business filter)
  if (isBarbaraLove(cleanInput)) {
    return { text: getBarbaraResponse(cleanInput), suggestions: [] };
  }

  // 3. Greetings
  if (isGreeting(cleanInput)) {`;

content = content.replace(afterProfanity, barbaraCheck);

// Fix the numbering of subsequent steps
content = content.replace('  // 3. Thanks', '  // 4. Thanks');
content = content.replace('  // 4. Farewells', '  // 5. Farewells');
content = content.replace('  // 5. NLP Match', '  // 6. NLP Match');
content = content.replace('  // 6. Intelligent fallback', '  // 7. Intelligent fallback');

// ═══════════════════════════════════════════════════════════
// 3. REMOVE OLD STATIC BARBARA Q&As (if any remain in qnaDB)
// They are now handled by the semantic engine
// ═══════════════════════════════════════════════════════════
// (The Barbara Q&As were already lost in previous rebuilds, so nothing to remove)

// Write and verify
fs.writeFileSync(filePath, content, 'utf8');

const final = fs.readFileSync(filePath, 'utf8');
const hasBarbaraEngine = final.includes('function isBarbaraLove');
const hasBarbaraInProcess = final.includes('isBarbaraLove(cleanInput)');
const hasBusinessBlock = final.includes('BUSINESS_BLOCK');
const qaCount = (final.match(/\{ q: /g) || []).length;

console.log('✅ Barbara Intent Engine injected successfully');
console.log('   isBarbaraLove function: ' + hasBarbaraEngine);
console.log('   Integrated in processInput: ' + hasBarbaraInProcess);
console.log('   Business filter active: ' + hasBusinessBlock);
console.log('   Q&As preserved: ' + qaCount);
console.log('   File size: ' + (final.length / 1024).toFixed(1) + 'KB');
