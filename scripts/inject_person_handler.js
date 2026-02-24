const fs = require('fs');
const filePath = require('path').resolve('v3/js/chatbot.js');
let c = fs.readFileSync(filePath, 'utf8');

// ═══════════════════════════════════════════════════════════
// 1. INJECT handlePersonEntity FUNCTION
//    Insert it right BEFORE the Barbara engine block
// ═══════════════════════════════════════════════════════════

const PERSON_HANDLER = `
// ══════════════════════════════════════════════════════════
// INTENT ENGINE: ENTIDADES Y PERSONAJES
// Jorge Quezada Senior/Junior, Bárbara Bonilla, Desconocidos
// ══════════════════════════════════════════════════════════

let pendingDisambiguation = null;

function handlePersonEntity(input) {
  const t = normalize(input);

  // ACTIVE DISAMBIGUATION: If waiting for Junior/Senior answer
  if (pendingDisambiguation === 'jorge_quezada') {
    if (t.includes('senior') || t.includes('big boss') || t.includes('creador')) {
      pendingDisambiguation = null;
      return { text: "Jorge Quezada Senior es un gran informático, creador de OpenCORE SpA, 'The Big Boss', con décadas de experiencia profesional, programador experto y desarrollador de sistemas críticos. Con un perfil formal y altamente ejecutivo.", suggestions: [] };
    }
    if (t.includes('junior') || t.includes('jr') || t.includes('hijo')) {
      pendingDisambiguation = null;
      return { text: "Jorge Quezada Junior (JR) es un ejecutivo consultor Senior en pleno ascenso en OpenCORE. Es el especialista que puede contactar para resolver problemas, cotizar proyectos de desarrollo y organizar estrategias.", suggestions: [] };
    }
    pendingDisambiguation = null;
  }

  // Is it asking "who is Jorge Quezada"?
  if (t.includes('jorge quezada') && (t.includes('quien') || t.includes('kien') || t.includes('qn'))) {
    pendingDisambiguation = 'jorge_quezada';
    return { text: "¿Te refieres a Jorge Quezada Senior o a Jorge Quezada Junior?", suggestions: ["Jorge Quezada Senior", "Jorge Quezada Junior"] };
  }

  // Direct "quien es jorge" with qualifier
  if (t.includes('jorge') && (t.includes('quien') || t.includes('kien'))) {
    if (t.includes('senior')) {
      return { text: "Jorge Quezada Senior es un gran informático, creador de OpenCORE SpA, con décadas de experiencia profesional en sistemas críticos.", suggestions: [] };
    }
    if (t.includes('junior') || t.includes('jr')) {
      return { text: "Jorge Quezada Junior (JR) es un ejecutivo consultor Senior en OpenCORE, dedicado a resolver problemas y liderar proyectos.", suggestions: [] };
    }
    // Generic "quien es jorge"
    pendingDisambiguation = 'jorge_quezada';
    return { text: "¿Te refieres a Jorge Quezada Senior o a Jorge Quezada Junior?", suggestions: ["Jorge Quezada Senior", "Jorge Quezada Junior"] };
  }

  // UNKNOWN PERSON FALLBACK
  // If user says "quien es X" and X is NOT Jorge, Barbara, or OpenCORE-related
  var matchObj = input.match(/qui[eé]n\\s+es\\s+([a-záéíóúñ\\s]+)/i);
  if (!matchObj) matchObj = input.match(/quien\\s+es\\s+([a-záéíóúñ\\s]+)/i);
  
  if (matchObj) {
    var personName = matchObj[1].trim().toLowerCase();
    // Remove trailing question mark
    personName = personName.replace(/\\?/g, '').trim();
    
    var knownNames = ['jorge', 'quezada', 'barbara', 'bonilla', 'opencore'];
    var isKnown = knownNames.some(function(k) { return personName.includes(k); });
    
    // Only intercept if it's truly an unknown person
    if (!isKnown && personName.length > 2) {
      return { text: "No dispongo de esa información en mi base de conocimiento. Sin embargo, me imagino que ha de ser una gran persona. ¿Puedo ayudarle con algo relacionado a OpenCORE o tecnología empresarial?", suggestions: [] };
    }
  }

  return null;
}

`;

// Find the marker for the Barbara engine
const barbaraMarker = '// INTENT ENGINE: BÁRBARA BONILLA';
const barbaraIdx = c.indexOf(barbaraMarker);

if (barbaraIdx === -1) {
    console.error('❌ Could not find Barbara engine marker');
    process.exit(1);
}

// Find the line start (go backwards to find the comment block start)
let insertIdx = c.lastIndexOf('\n', barbaraIdx - 20);
c = c.substring(0, insertIdx) + '\n' + PERSON_HANDLER + c.substring(insertIdx);
console.log('✅ handlePersonEntity injected before Barbara engine');


// ═══════════════════════════════════════════════════════════
// 2. INTEGRATE INTO processInput
//    Add "personMatch" call AFTER profanity, BEFORE Barbara
// ═══════════════════════════════════════════════════════════

// Check if integration already exists
if (c.includes('personMatch')) {
    console.log('⚠️ personMatch already in processInput, skipping');
} else {
    // Find the exact point: after profanity block, before Barbara check
    const barbaraCheckLine = '  // 2. Bárbara Intent Detection (semantic, with business filter)';
    const barbaraCheckLine2 = '  // 2.5 Bárbara Intent Detection';

    let target = barbaraCheckLine;
    if (c.indexOf(target) === -1) target = barbaraCheckLine2;

    if (c.indexOf(target) !== -1) {
        const personCheckCode = `  // 2. Person Entity and Disambiguation (Jorge Sr/Jr, Unknown persons)
  const personMatch = handlePersonEntity(cleanInput);
  if (personMatch) return personMatch;

  // 3. Bárbara Intent Detection (semantic, with business filter)`;

        c = c.replace(target, personCheckCode);

        // Renumber subsequent steps
        c = c.replace('  // 3. Greetings', '  // 4. Greetings');
        c = c.replace('  // 4. Thanks', '  // 5. Thanks');
        c = c.replace('  // 5. Farewells', '  // 6. Farewells');
        c = c.replace('  // 6. NLP Match', '  // 7. NLP Match');

        console.log('✅ personMatch integrated into processInput');
    } else {
        console.error('❌ Could not find Barbara check in processInput');
    }
}

fs.writeFileSync(filePath, c, 'utf8');

// Verify
const final = fs.readFileSync(filePath, 'utf8');
console.log('handlePersonEntity exists: ' + final.includes('function handlePersonEntity'));
console.log('personMatch in processInput: ' + final.includes('const personMatch = handlePersonEntity'));
console.log('pendingDisambiguation exists: ' + final.includes('pendingDisambiguation'));
