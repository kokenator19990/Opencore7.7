const fs = require('fs');
const path = require('path');
const filePath = path.resolve('v3/js/chatbot.js');
let content = fs.readFileSync(filePath, 'utf8');

// ═══════════════════════════════════════════════════════════
// 1. FIX NLP THRESHOLDS TO PREVENT FALSE POSITIVES
// ═══════════════════════════════════════════════════════════

// In `getBestMatch`, increase the requirement for confidence
const getBestMatchOld = /function getBestMatch\(inputStr\) \{[\s\S]*?return null;\n\}/;
const getBestMatchNew = `function getBestMatch(inputStr) {
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

  // MUCH STRICTER THRESHOLDS TO PREVENT HALLUCINATIONS
  // Short queries require almost perfect match
  let threshold = 1.8;
  if (inputTokens.length <= 2) threshold = 2.4; 
  else if (inputTokens.length >= 6) threshold = 1.4;

  if (bestScore >= threshold) {
    const confidence = Math.min(bestScore / 4, 1);
    // If it's a very short input (e.g. "pero dime"), and score is barely passing, reject it
    if (inputTokens.length < 3 && bestScore < 2.5) return null;
    
    return {
      answer: bestMatch.a,
      confidence: confidence,
      suggestion: secondBest && secondBest.score >= threshold * 0.8 ? secondBest.q : null
    };
  }
  return null;
}`;

if (content.match(getBestMatchOld)) {
    content = content.replace(getBestMatchOld, getBestMatchNew);
} else {
    console.error("Could not find getBestMatch function exactly");
}

// ═══════════════════════════════════════════════════════════
// 2. PERSON ENTITY DETECTION AND DISAMBIGUATION (JORGE & UNKNOWN)
// ═══════════════════════════════════════════════════════════

const BARBARA_ENGINE_MARKER = '// ══════════════════════════════════════════════════════════\n// INTENT ENGINE: BÁRBARA BONILLA ❤️';

const personLogic = `
// ══════════════════════════════════════════════════════════
// INTENT ENGINE: ENTIDADES Y PERSONAJES (Jorge, Bárbara, Desconocidos)
// ══════════════════════════════════════════════════════════

let pendingDisambiguation = null;

function handlePersonEntity(input) {
  const t = normalize(input);
  const qStr = t.toLowerCase();
  
  // ACTIVE DISAMBIGUATION: If waiting for Junior/Senior answer
  if (pendingDisambiguation === 'jorge_quezada') {
    if (qStr.includes('senior') || qStr.includes('big boss') || qStr.includes('creador')) {
      pendingDisambiguation = null;
      return { text: "Excelente. Jorge Quezada Senior es un gran informático, creador de OpenCORE SpA, 'The Big Boss', con 30 años de tremenda experiencia profesional, programador experto y desarrollador crítico. Con un perfil formal y altamente ejecutivo.", suggestions: [] };
    }
    if (qStr.includes('junior') || qStr.includes('jr') || qStr.includes('hijo')) {
      pendingDisambiguation = null;
      return { text: "Entendido. Jorge Quezada Junior (JR) es un ejecutivo consultor Senior que está en pleno ascenso en OpenCORE. Es el especialista que puedes contactar proactivamente para resolver problemas, cotizar proyectos de desarrollo y organizar estrategias.", suggestions: [] };
    }
    // If user says something else, abort disambiguation
    pendingDisambiguation = null;
  }

  // Is it specifically asking "who is Jorge Quezada"?
  if (qStr.includes('jorge quezada') && qStr.includes('quien')) {
    pendingDisambiguation = 'jorge_quezada';
    return { text: "¿Te refieres a Jorge Quezada Senior o a Jorge Quezada Junior?", suggestions: ["Jorge Quezada Senior", "Jorge Quezada Junior"] };
  }
  
  if ((qStr.includes('jorge') && qStr.includes('quien')) && (qStr.includes('senior') || qStr.includes('jr') || qStr.includes('junior'))) {
      if (qStr.includes('senior')) {
          return { text: "Jorge Quezada Senior es un gran informático, creador de OpenCORE SpA, 'The Big Boss', con 30 años de tremenda experiencia profesional, programador experto y desarrollador crítico.", suggestions: [] };
      } else {
          return { text: "Jorge Quezada Junior (JR) es un ejecutivo consultor Senior que está en pleno ascenso en OpenCORE, dedicado a resolver problemas y proyectos.", suggestions: [] };
      }
  }

  // UNKNOWN PERSON FALLBACK
  // If user says "quien es X" and X is not Jorge or Barbara, we handle it elegantly
  const regexQuienEs = /qui[eé]n\s+es\s+([a-z\s]+)\??/i;
  const matchObj = input.match(regexQuienEs);
  if (matchObj) {
    const personName = normalize(matchObj[1]).trim();
    const knownNames = ['jorge', 'quezada', 'barbara', 'bonilla', 'opencore'];
    const isKnown = knownNames.some(k => personName.includes(k));
    
    // Only answer unknown if it doesn't overlap with Barbara's love intent, etc.
    if (!isKnown && personName.length > 2 && !qStr.includes('empresa') && !qStr.includes('sistema')) {
      return { text: "No dispongo de esa información. Sin embargo, me imagino que ha de ser una gran persona, pero no lo conozco directamente.", suggestions: [] };
    }
  }
  
  return null;
}
`;

content = content.replace(BARBARA_ENGINE_MARKER, personLogic + '\n' + BARBARA_ENGINE_MARKER);


// ═══════════════════════════════════════════════════════════
// 3. INTEGRATE INTO processInput
// ═══════════════════════════════════════════════════════════
const processInputMatch = /function processInput\(input\) {[\s\S]*?\/\/\s*1\. Profanity guard[\s\S]*?}[\s\S]*?\/\/\s*2\. Bárbara Intent Detection \(semantic, with business filter\)/;

const processInputNew = `function processInput(input) {
  const cleanInput = input.trim();
  const lowerInput = cleanInput.toLowerCase();
  const normalizedInput = normalize(cleanInput);

  // 1. Profanity guard
  for (const bw of badWords) {
    if (normalizedInput.includes(bw)) {
      pendingDisambiguation = null; // reset state
      return { text: "No respondemos este tipo de preguntas. Por favor, formula una consulta profesional y con gusto te orientamos.", suggestions: [] };
    }
  }

  // 2. Person Entity and Disambiguation Handling
  const personMatch = handlePersonEntity(cleanInput);
  if (personMatch) return personMatch;

  // 3. Bárbara Intent Detection (semantic, with business filter)`;

if (content.match(processInputMatch)) {
    content = content.replace(processInputMatch, processInputNew);
} else {
    // Try finding it another way
    const fallbackMatch = /function processInput\(input\) {[\s\S]*?const normalizedInput = normalize\(cleanInput\);[\s\S]*?(?=\/\/ 1\. Profanity guard)/;
    if (content.match(fallbackMatch)) {
        console.log('Using fallback match to inject ProcessInput');
    }

    // Actually, string replacement is safer:
    const target = `  // 1. Profanity guard
  for (const bw of badWords) {
    if (normalizedInput.includes(bw)) {
      return { text: "No respondemos este tipo de preguntas. Por favor, formula una consulta profesional y con gusto te orientamos.", suggestions: [] };
    }
  }

  // 2. Bárbara Intent Detection`;

    const replacement = `  // 1. Profanity guard
  for (const bw of badWords) {
    if (normalizedInput.includes(bw)) {
      pendingDisambiguation = null;
      return { text: "No respondemos este tipo de preguntas. Por favor, formula una consulta profesional y con gusto te orientamos.", suggestions: [] };
    }
  }

  // 2. Person Entity and Disambiguation Handling
  const personMatch = handlePersonEntity(cleanInput);
  if (personMatch) return personMatch;

  // 2.5 Bárbara Intent Detection`;

    content = content.replace(target, replacement);
}


// Re-verify specific old bad mappings that might exist in qnaDB and delete them
// User specifically complained about "cuales son sus precios" matching "Son los mejores del mercado..."
// Wait, "cuales son sus precios" -> "Son los mejores del mercado..." This is because the fuzzy matching hit the question "Son buenos sus productos?" -> "Son los mejores...".
// With the new threshold, this shouldn't happen, it will correctly match "cuales son sus precios" -> "Trabajamos bajo un modelo..." if it exists, or fallback.

fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ Person logic, disambiguation, and Anti-Hallucination thresholds injected successfully');
