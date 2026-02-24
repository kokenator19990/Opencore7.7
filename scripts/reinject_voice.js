const fs = require('fs');
const filePath = require('path').resolve('v4/js/chatbot.js');
let c = fs.readFileSync(filePath, 'utf8');

// 1. UPDATE HEADER
c = c.replace(
    'CHATBOT V3 PRO - OPENCORE NLP ENGINE',
    'CHATBOT V4 VOICE - OPENCORE NLP ENGINE'
);
c = c.replace('Versión: 3.5', 'Versión: 4.0');
c = c.replace(
    '              Anti-Hallucination Thresholds,',
    '              Anti-Hallucination Thresholds,\n              Voice Input (SpeechRecognition), Voice Output (SpeechSynthesis),'
);

// 2. ADD MICROPHONE BUTTON IN FOOTER
const sendBtnHTML = `<button id="ocChatSend" aria-label="Enviar mensaje">`;
const newFooterButtons = `<button id="ocChatSend" aria-label="Enviar mensaje">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
        <button id="ocVoiceBtn" class="oc-voice-btn" title="Hablar por voz">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
          </svg>
        </button>`;
// remove the original sendbtn svg so we don't have duplicates
const sendBtnFullHTML = `<button id="ocChatSend" aria-label="Enviar mensaje">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>`;

if (c.includes(sendBtnFullHTML)) {
    c = c.replace(sendBtnFullHTML, newFooterButtons);
}

// 3. ADD MODE SELECTION MODAL
const welcomeMsg = `<div class="oc-msg bot">Hola! Soy el Asistente de OpenCORE. En que te puedo apoyar hoy?</div>`;
const welcomeWithModal = `<div class="oc-msg bot">Hola! Soy el Asistente de OpenCORE. En que te puedo apoyar hoy?</div>
        <div class="oc-mode-selector" id="ocModeSelector">
          <p class="oc-mode-label">¿Cómo prefieres interactuar?</p>
          <div class="oc-mode-buttons">
            <button class="oc-mode-btn" id="ocModeText" data-mode="text">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="28" height="28"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <span>Texto</span>
            </button>
            <button class="oc-mode-btn" id="ocModeVoice" data-mode="voice">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="28" height="28"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
              <span>Voz</span>
            </button>
          </div>
        </div>`;

if (c.includes(welcomeMsg)) {
    c = c.replace(welcomeMsg, welcomeWithModal);
}

// 4. INJECT VOICE ENGINE CODE
const closingBlock = `  sendBtn.addEventListener("click", handleSend);
  input.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } });
});`;

const voiceEngineCode = `  sendBtn.addEventListener("click", handleSend);
  input.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } });

  // ═══════════════════════════════════════════════════════════
  // VOICE ENGINE V4 - Web Speech API
  // SpeechRecognition (input) + SpeechSynthesis (output)
  // ═══════════════════════════════════════════════════════════

  let voiceMode = false;
  let isListening = false;
  let isSpeaking = false;
  const voiceBtn = document.getElementById("ocVoiceBtn");
  const modeSelector = document.getElementById("ocModeSelector");
  const modeTextBtn = document.getElementById("ocModeText");
  const modeVoiceBtn = document.getElementById("ocModeVoice");

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const speechSynthesis = window.speechSynthesis;
  const hasSpeechSupport = !!SpeechRecognition && !!speechSynthesis;

  if (!hasSpeechSupport && voiceBtn) {
    voiceBtn.style.display = "none";
    if (modeVoiceBtn) modeVoiceBtn.style.display = "none";
  }

  if (modeTextBtn) {
    modeTextBtn.addEventListener("click", () => {
      voiceMode = false;
      modeSelector.style.display = "none";
      voiceBtn.classList.remove("active");
      input.placeholder = "Escribe tu consulta...";
      input.focus();
    });
  }

  if (modeVoiceBtn && hasSpeechSupport) {
    modeVoiceBtn.addEventListener("click", () => {
      voiceMode = true;
      modeSelector.style.display = "none";
      voiceBtn.classList.add("active");
      input.placeholder = "🎤 Modo voz activo — presiona el micrófono";
      appendBotMsg("🎤 Modo voz activado. Presiona el botón del micrófono para hablar.", false);
      speakText("Modo voz activado. Presiona el botón del micrófono para hablar.");
    });
  }

  let recognition = null;
  if (hasSpeechSupport) {
    recognition = new SpeechRecognition();
    recognition.lang = "es-CL";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      isListening = true;
      voiceBtn.classList.add("listening");
      input.placeholder = "🔴 Escuchando...";
      input.value = "";
    };

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) transcript += event.results[i][0].transcript;
      input.value = transcript;
      if (event.results[event.results.length - 1].isFinal) {
        setTimeout(() => {
          if (input.value.trim()) handleVoiceSend(input.value.trim());
        }, 300);
      }
    };

    recognition.onerror = (event) => {
      isListening = false;
      voiceBtn.classList.remove("listening");
      input.placeholder = voiceMode ? "🎤 Presiona el micrófono" : "Escribe tu consulta...";
      if (event.error === "not-allowed") {
        voiceMode = false;
        voiceBtn.classList.remove("active");
      }
    };

    recognition.onend = () => {
      isListening = false;
      voiceBtn.classList.remove("listening");
      input.placeholder = voiceMode ? "🎤 Presiona el micrófono" : "Escribe tu consulta...";
    };
  }

  if (voiceBtn && hasSpeechSupport) {
    voiceBtn.addEventListener("click", () => {
      if (isSpeaking) { speechSynthesis.cancel(); isSpeaking = false; return; }
      if (isListening) { recognition.stop(); return; }
      if (!voiceMode) {
        voiceMode = true;
        voiceBtn.classList.add("active");
        if (modeSelector) modeSelector.style.display = "none";
      }
      try { recognition.start(); } catch(e) {}
    });
  }

  function speakText(text) {
    if (!speechSynthesis || !voiceMode) return;
    speechSynthesis.cancel();
    
    // Create a plain text version for reading aloud (remove HTML and URLs)
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = text;
    let plainText = tempDiv.textContent || tempDiv.innerText || "";
    // Remove Markdown links [text](url) and URLs
    plainText = plainText.replace(/\\[(.*?)\\]\\(.*?!\\)/g, '$1').replace(/https?:\\/\\/\\S+/g, '');
    
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.lang = "es-CL";
    const voices = speechSynthesis.getVoices();
    const spanishVoice = voices.find(v => v.lang.startsWith("es")) || voices[0];
    if (spanishVoice) utterance.voice = spanishVoice;
    
    utterance.onstart = () => { isSpeaking = true; voiceBtn.classList.add("speaking"); };
    utterance.onend = () => { isSpeaking = false; voiceBtn.classList.remove("speaking"); };
    utterance.onerror = () => { isSpeaking = false; voiceBtn.classList.remove("speaking"); };
    speechSynthesis.speak(utterance);
  }

  if (speechSynthesis) speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();

  function handleVoiceSend(text) {
    const initQR = document.getElementById("ocQuickInit");
    if (initQR) initQR.remove();
    appendUserMsg(text);
    input.value = "";
    appendTyping();
    setTimeout(() => {
      removeTyping();
      const result = processInput(text);
      appendBotMsg(result.text, result.isHTML || false);
      speakText(result.text);
      if (result.suggestions && result.suggestions.length) appendQuickReplies(result.suggestions);
    }, 600);
  }
});`;

if (c.includes(closingBlock)) {
    c = c.replace(closingBlock, voiceEngineCode);
}

// 5. MODIFY handleSend
const handleSendOriginal = `      const result = processInput(txt);
      appendBotMsg(result.text, result.isHTML || false);
      if (result.suggestions && result.suggestions.length) appendQuickReplies(result.suggestions);
      isSending = false;`;

const handleSendNew = `      const result = processInput(txt);
      appendBotMsg(result.text, result.isHTML || false);
      if (typeof voiceMode !== 'undefined' && voiceMode && typeof speakText === 'function') speakText(result.text);
      if (result.suggestions && result.suggestions.length) appendQuickReplies(result.suggestions);
      isSending = false;`;

if (c.includes(handleSendOriginal)) {
    c = c.replace(handleSendOriginal, handleSendNew);
}

fs.writeFileSync(filePath, c, 'utf8');
console.log('✅ Re-injected Voice engine into v4/js/chatbot.js');
