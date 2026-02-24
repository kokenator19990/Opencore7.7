const fs = require('fs');

// This script adds an EXACT-MATCH FAST PATH before the NLP scoring
// so conversational Q&As with exact text match are found immediately,
// bypassing the anti-hallucination thresholds.

function fixFile(filePath, label) {
    let c = fs.readFileSync(filePath, 'utf8');

    // Strategy: Add an exact-match check inside processInput, BEFORE calling getBestMatch
    // This runs a direct normalized comparison against all Q&As

    const EXACT_MATCH_CODE = `
  // ═══ EXACT-MATCH FAST PATH (bypasses NLP scoring for direct hits) ═══
  const exactInput = normalize(cleanInput);
  for (let i = 0; i < qnaDB.length; i++) {
    const qNorm = normalize(qnaDB[i].q);
    if (qNorm === exactInput) {
      return { text: qnaDB[i].a, suggestions: [] };
    }
  }
  // Partial exact match for very close inputs (within 2 chars difference)
  for (let i = 0; i < qnaDB.length; i++) {
    const qNorm = normalize(qnaDB[i].q);
    if (qNorm.length > 3 && exactInput.length > 3) {
      // Check if one contains the other
      if (qNorm === exactInput || 
          (exactInput.length >= 4 && qNorm.startsWith(exactInput)) ||
          (qNorm.length >= 4 && exactInput.startsWith(qNorm) && qNorm.length >= exactInput.length * 0.7)) {
        return { text: qnaDB[i].a, suggestions: [] };
      }
    }
  }
`;

    // Insert before "// 6. NLP Match" or "// 7. NLP Match" in processInput
    const nlpStep = '  // 6. NLP Match';
    const nlpStep7 = '  // 7. NLP Match';
    const nlpStepAlt = '  const match = getBestMatch';

    let insertTarget = null;
    if (c.includes(nlpStep7)) insertTarget = nlpStep7;
    else if (c.includes(nlpStep)) insertTarget = nlpStep;

    if (!c.includes('EXACT-MATCH FAST PATH')) {
        if (insertTarget) {
            c = c.replace(insertTarget, EXACT_MATCH_CODE + '\n' + insertTarget);
            console.log('[' + label + '] ✅ Exact-match fast path injected before NLP scoring');
        } else {
            // Try to find any NLP match step
            const matchIdx = c.indexOf('const match = getBestMatch', c.indexOf('function processInput'));
            if (matchIdx !== -1) {
                const lineStart = c.lastIndexOf('\n', matchIdx);
                c = c.substring(0, lineStart) + '\n' + EXACT_MATCH_CODE + c.substring(lineStart);
                console.log('[' + label + '] ✅ Exact-match injected before getBestMatch call');
            } else {
                console.log('[' + label + '] ⚠️ Could not find NLP match section');
            }
        }
    } else {
        console.log('[' + label + '] ⚠️ Exact-match already exists');
    }

    // Also: Fix the greeting handler to be more inclusive (add "como estas" to greetings)
    // Check what isGreeting looks like
    const greetingPatterns = c.match(/function isGreeting[^}]+}/s);
    if (greetingPatterns) {
        // Nothing to change here - the exact match fast path will handle "como estas" before greetings
    }

    fs.writeFileSync(filePath, c, 'utf8');
    console.log('[' + label + '] File saved');
}

fixFile(require('path').resolve('v3/js/chatbot.js'), 'V3');
fixFile(require('path').resolve('v4/js/chatbot.js'), 'V4');
