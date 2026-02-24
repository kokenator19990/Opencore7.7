const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../v4/js/chatbot.js');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. REWRITE getBestMatch to lower threshold and favor local DB
const oldGetBestMatchRegex = /function getBestMatch\(inputStr\) \{[\s\S]*?return \{\s*answer: bestMatch\.a,[\s\S]*?suggestion:.*?,?\s*\}\s*;\s*\}/g;

const newGetBestMatch = `function getBestMatch(inputStr) {
  const inputTokens = tokenize(inputStr);
  if (inputTokens.length === 0) return null;
  let bestScore = 0, bestMatch = null, secondBest = null;
  for (const item of precomputedDB) {
    const score = scoreEntry(inputTokens, item);
    if (score > bestScore) { secondBest = bestMatch; bestScore = score; bestMatch = { ...item, score }; }
    else if (!secondBest || score > (secondBest.score || 0)) secondBest = { ...item, score };
  }
  let threshold;
  if (inputTokens.length <= 2) threshold = 2.0; // Lowered from 3.2
  else if (inputTokens.length <= 4) threshold = 1.6; // Lowered from 2.5
  else threshold = 1.2; // Lowered from 2.0
  if (bestScore < threshold) return null;
  if (inputTokens.length < 3 && bestScore < 1.8) return null; // Lowered from 2.8
  return {
    answer: bestMatch.a,
    confidence: Math.min(bestScore / 3.0, 1), // Lowered divisor to increase perceived confidence
    suggestion: (secondBest && secondBest.score >= threshold * 0.75) ? secondBest.q : null
  };
}`;

content = content.replace(oldGetBestMatchRegex, newGetBestMatch);

// 2. REWRITE handleSend to remove Gemini
const oldHandleSendRegex = /async function askGemini\(userMsg\) \{[\s\S]*?isSending = false;\s*\}, delay\);\s*\}/g;

const newHandleSend = `
  let isSending = false;
  function handleSend() {
    const txt = input.value.trim();
    if (!txt || isSending) return;
    if (isRateLimited()) { appendBotMsg("Estás enviando mensajes muy rápido. Espera un momento.", false); return; }
    const initQR = document.getElementById("ocQuickInit");
    if (initQR) initQR.remove();
    appendUserMsg(txt);
    input.value = "";
    isSending = true;
    appendTyping();

    // Track user message in history
    chatHistory.push({ role: 'user', text: txt });

    const delay = 400 + Math.random() * 500; // Faster localized response
    setTimeout(() => {
      const result = processInput(txt);

      removeTyping();
      let responseText = result.text;
      
      // If AI needed but we are offline, force local fallback
      if (result.aiNeeded) {
         responseText = "Para consultas tan específicas, te recomiendo una evaluación directa. Puedes escribirnos a contacto@opencore.cl o agendar una sesión de 15 minutos con nuestros arquitectos.";
      }

      const msgEl = appendBotMsg(responseText, result.isHTML || false);
      if (result.suggestions && result.suggestions.length) appendQuickReplies(result.suggestions);
      chatHistory.push({ role: 'assistant', text: responseText });
      
      // Speak in voice mode
      if (voiceModeActive) {
        const plain = msgEl.textContent || msgEl.innerText;
        speakText(plain);
      }
      isSending = false;
    }, delay);
  }`;

content = content.replace(oldHandleSendRegex, newHandleSend);


fs.writeFileSync(targetFile, content, 'utf8');
console.log('Successfully patched chatbot.js to remove Gemini and lower fuzzy matching thresholds.');
