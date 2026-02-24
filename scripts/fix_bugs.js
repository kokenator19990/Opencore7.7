const fs = require('fs');
const filePath = require('path').resolve('v3/js/chatbot.js');
let c = fs.readFileSync(filePath, 'utf8');

// ═══════════════════════════════════════════════════════════
// BUG 1: REORDER processInput - Barbara MUST be BEFORE Person Handler
// Current order: Profanity -> Person -> Barbara (WRONG)
// Correct order: Profanity -> Barbara -> Person -> Greetings -> NLP
// ═══════════════════════════════════════════════════════════

// Find and swap the order
const personBlock = `  // 2. Person Entity and Disambiguation (Jorge Sr/Jr, Unknown persons)
  const personMatch = handlePersonEntity(cleanInput);
  if (personMatch) return personMatch;

  // 3. Bárbara Intent Detection (semantic, with business filter)
  if (isBarbaraLove(cleanInput)) {
    return { text: getBarbaraResponse(cleanInput), suggestions: [] };
  }`;

const correctOrder = `  // 2. Bárbara Intent Detection (semantic, with business filter)
  if (isBarbaraLove(cleanInput)) {
    return { text: getBarbaraResponse(cleanInput), suggestions: [] };
  }

  // 3. Person Entity and Disambiguation (Jorge Sr/Jr, Unknown persons)
  const personMatch = handlePersonEntity(cleanInput);
  if (personMatch) return personMatch;`;

if (c.includes(personBlock)) {
    c = c.replace(personBlock, correctOrder);
    console.log('✅ BUG 1 FIXED: Reordered Barbara BEFORE Person Handler');
} else {
    console.log('⚠️ Could not find exact personBlock to swap');
    // Try alternative
    const alt1 = '  // 2. Person Entity and Disambiguation';
    const alt2 = '  // 3. Bárbara Intent Detection';
    if (c.includes(alt1) && c.includes(alt2)) {
        // Find positions and swap them
        console.log('Found alternate markers, attempting manual swap');
    }
}

// ═══════════════════════════════════════════════════════════
// BUG 2: Add missing Q&As for common price queries
// "cuales son sus precios" should match pricing info
// ═══════════════════════════════════════════════════════════

const missingQAs = [
    { q: "Cuáles son sus precios", a: "Trabajamos bajo un modelo de alta especialización técnica. Nuestro valor hora referencial es de 1 a 5 UF. Los proyectos corporativos típicos oscilan entre 300 y 500 UF o superiores. El alcance final se define tras diagnóstico." },
    { q: "Precios de OpenCORE", a: "De forma referencial, nuestros servicios tienen un valor hora entre 1 y 5 UF, y los proyectos típicos oscilan entre 300 y 500 UF o superiores, según complejidad y alcance. La estimación exacta se define tras diagnóstico." },
    { q: "Cuánto cuesta un sistema", a: "Depende del alcance y complejidad. Un sistema básico puede partir desde unas 80 UF, mientras que un sistema integrado completo (inventario + facturación + reportes) suele moverse entre 300 y 500 UF o más. Se define tras diagnóstico." },
    { q: "Que es OpenCORE", a: "OpenCORE Consulting SpA es una firma de ingeniería de software chilena, especializada en continuidad operacional, migración e integración de sistemas empresariales críticos. Fundada formalmente en 2015, con trayectoria desde 1998." },
    { q: "Quién es OpenCORE", a: "OpenCORE es una consultora de ingeniería de software chilena constituida en 2015 (trayectoria operativa desde 1998). Contamos con un núcleo de 10 especialistas Senior y más de 30 profesionales asociados, enfocados en logística, turismo y facturación crítica." },
    { q: "Pueden hacer un sistema", a: "Sí, desarrollamos sistemas B2B desde cero o modernizamos arquitecturas existentes. Nuestro enfoque no es solo 'hacer un sistema', sino asegurar la rentabilidad, seguridad y flujo ininterrumpido de su operación." }
];

// Find the end of qnaDB to add missing Q&As
const qaRegex = /\{ q: /g;
let lastIdx = 0;
while (qaRegex.exec(c) !== null) lastIdx = qaRegex.lastIndex;
const closingIdx = c.indexOf('];', lastIdx);

if (closingIdx !== -1) {
    const newItems = ',\n\n  // ═══ QA FIX: Preguntas críticas que no matcheaban correctamente ═══\n' +
        missingQAs.map(qa => '  { q: ' + JSON.stringify(qa.q) + ', a: ' + JSON.stringify(qa.a) + ' }').join(',\n');
    c = c.substring(0, closingIdx).trimEnd() + newItems + '\n' + c.substring(closingIdx);
    console.log('✅ BUG 2 FIXED: Added ' + missingQAs.length + ' missing critical Q&As');
}

fs.writeFileSync(filePath, c, 'utf8');

// Final count
const finalCount = (c.match(/\{ q: /g) || []).length;
console.log('Total Q&As: ' + finalCount);
