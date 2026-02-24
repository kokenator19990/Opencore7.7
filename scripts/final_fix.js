const fs = require('fs');
const filePath = require('path').resolve('v3/js/chatbot.js');
let c = fs.readFileSync(filePath, 'utf8');

// 1. Fix thresholds
c = c.replace(
    '// Dynamic threshold based on input length\r\n  const threshold = inputTokens.length <= 2 ? 1.2 : 1.5;',
    '// STRICT THRESHOLDS - ANTI HALLUCINATION\r\n  let threshold;\r\n  if (inputTokens.length <= 2) threshold = 2.4;\r\n  else if (inputTokens.length <= 4) threshold = 1.8;\r\n  else threshold = 1.5;'
);

// 2. Add short-input guard
c = c.replace(
    'if (bestScore >= threshold) {\r\n    return {\r\n      answer: bestMatch.a,\r\n      confidence: Math.min(bestScore / 4, 1),\r\n      suggestion: secondBest && secondBest.score >= threshold * 0.7 ? secondBest.q : null\r\n    };\r\n  }',
    'if (bestScore >= threshold) {\r\n    const confidence = Math.min(bestScore / 4, 1);\r\n    if (inputTokens.length < 3 && bestScore < 2.5) return null;\r\n    return {\r\n      answer: bestMatch.a,\r\n      confidence: confidence,\r\n      suggestion: secondBest && secondBest.score >= threshold * 0.8 ? secondBest.q : null\r\n    };\r\n  }'
);

// 3. Update fallbacks to reputation-protection style
c = c.replace(
    '"Esa es una excelente pregunta. Te recomiendo contactarnos directamente para una respuesta más completa y personalizada."',
    '"Tu consulta parece requerir un contexto técnico específico. Para no darte una recomendación imprecisa, prefiero derivarte con un especialista. ¿Desea coordinar una reunión técnica o escribirnos a contacto@opencore.cl?"'
);
c = c.replace(
    '"No dispongo de información suficiente para responderte con precisión. ¿Podrías contactarnos por el formulario para que un especialista te atienda?"',
    '"Para entregarle una respuesta técnica precisa, recomendamos una breve fase de diagnóstico. ¿Le gustaría que un arquitecto de software lo contacte directamente?"'
);
c = c.replace(
    '"Tu consulta merece una respuesta profesional detallada. Te invito a agendar un diagnóstico gratuito con nuestro equipo."',
    '"Esta consulta excede una respuesta automatizada estándar. Le sugiero agendar una sesión exploratoria técnica sin costo para evaluar su caso en detalle."'
);
c = c.replace(
    '"¿Podrías detallar un poco más tu consulta para orientarte mejor?"',
    '"Para esta consulta, lo ideal es una evaluación directa con nuestros ingenieros. ¿Gusta que lo contactemos?"'
);
c = c.replace(
    '"Necesito un poco más de contexto. ¿Qué aspecto de OpenCORE te interesa?"',
    '"Esa consulta merece revisión de nuestro equipo de consultoría. ¿Podemos agendar una breve llamada?"'
);
c = c.replace(
    '"No logré entender la consulta. ¿Podrías reformularla?"',
    '"No dispongo de los datos exactos para responder eso con responsabilidad técnica. ¿Lo derivamos a un especialista?"'
);

// 4. Verify + Write
fs.writeFileSync(filePath, c, 'utf8');

const final = fs.readFileSync(filePath, 'utf8');
const hasStrictThreshold = final.includes('STRICT THRESHOLDS');
const hasPersonHandler = final.includes('handlePersonEntity');
const hasDisambiguation = final.includes('pendingDisambiguation');
const qaCount = (final.match(/\{ q: /g) || []).length;

console.log('═══ FINAL VERIFICATION ═══');
console.log('Strict NLP thresholds: ' + hasStrictThreshold);
console.log('Person entity handler: ' + hasPersonHandler);
console.log('Jorge disambiguation: ' + hasDisambiguation);
console.log('Total Q&As: ' + qaCount);
console.log('File size: ' + (final.length / 1024).toFixed(1) + 'KB');
