const fs = require('fs');
const filePath = require('path').resolve('v4/js/chatbot.js');
let c = fs.readFileSync(filePath, 'utf8');

// ═══════════════════════════════════════════════════════════
// V4 VOICE ENGINE INJECTION
// Adds Speech Recognition + Speech Synthesis + Voice UI
// ═══════════════════════════════════════════════════════════

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

// 2. ADD MICROPHONE BUTTON IN FOOTER (after send button)
const sendBtnHTML = `<button id="ocChatSend" class="oc-chat-send">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>`;

const newFooterButtons = `<button id="ocChatSend" class="oc-chat-send">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
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

c = c.replace(sendBtnHTML, newFooterButtons);

// 3. ADD MODE SELECTION MODAL (after initial welcome message)
const welcomeMsg = `<div class="oc-msg bot">Hola 👋 Soy el asistente IA de OpenCORE Consulting. Pregúntame sobre servicios, costos, metodología o experiencia.</div>`;

const welcomeWithModal = `<div class="oc-msg bot">Hola 👋 Soy el asistente IA de OpenCORE Consulting. Pregúntame sobre servicios, costos, metodología o experiencia.</div>
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

c = c.replace(welcomeMsg, welcomeWithModal);

// 4. INJECT VOICE ENGINE CODE (before the closing });)
const closingBlock = `  sendBtn.addEventListener("click", handleSend);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSend();
  });
});`;

const voiceEngineCode = `  sendBtn.addEventListener("click", handleSend);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSend();
  });

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

  // Check browser support
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const speechSynthesis = window.speechSynthesis;
  const hasSpeechSupport = !!SpeechRecognition && !!speechSynthesis;

  if (!hasSpeechSupport && voiceBtn) {
    voiceBtn.style.display = "none";
    if (modeVoiceBtn) modeVoiceBtn.style.display = "none";
  }

  // Mode selection
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
      appendBotMsg("🎤 Modo voz activado. Presiona el botón del micrófono para hablar. Yo responderé en voz alta.");
      speakText("Modo voz activado. Presiona el botón del micrófono para hablar.");
    });
  }

  // ── Speech Recognition Setup ──
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
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      input.value = transcript;
      
      // If final result
      if (event.results[event.results.length - 1].isFinal) {
        // Small delay to show transcription before sending
        setTimeout(() => {
          if (input.value.trim()) {
            handleVoiceSend(input.value.trim());
          }
        }, 300);
      }
    };

    recognition.onerror = (event) => {
      isListening = false;
      voiceBtn.classList.remove("listening");
      input.placeholder = voiceMode ? "🎤 Presiona el micrófono" : "Escribe tu consulta...";
      
      if (event.error === "no-speech") {
        appendBotMsg("No detecté ninguna voz. Intenta de nuevo presionando el micrófono.");
      } else if (event.error === "not-allowed") {
        appendBotMsg("⚠️ Necesito permiso para acceder al micrófono. Habilítalo en la configuración del navegador.");
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

  // Voice button click
  if (voiceBtn && hasSpeechSupport) {
    voiceBtn.addEventListener("click", () => {
      if (isSpeaking) {
        speechSynthesis.cancel();
        isSpeaking = false;
        return;
      }
      
      if (isListening) {
        recognition.stop();
        return;
      }

      // If not in voice mode, activate it
      if (!voiceMode) {
        voiceMode = true;
        voiceBtn.classList.add("active");
        if (modeSelector) modeSelector.style.display = "none";
      }

      try {
        recognition.start();
      } catch(e) {
        console.warn("Recognition already started");
      }
    });
  }

  // ── Speech Synthesis (Text-to-Speech) ──
  function speakText(text) {
    if (!speechSynthesis || !voiceMode) return;
    
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-CL";
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Try to find a Spanish voice
    const voices = speechSynthesis.getVoices();
    const spanishVoice = voices.find(v => v.lang.startsWith("es")) || voices[0];
    if (spanishVoice) utterance.voice = spanishVoice;
    
    utterance.onstart = () => {
      isSpeaking = true;
      voiceBtn.classList.add("speaking");
    };
    
    utterance.onend = () => {
      isSpeaking = false;
      voiceBtn.classList.remove("speaking");
    };
    
    utterance.onerror = () => {
      isSpeaking = false;
      voiceBtn.classList.remove("speaking");
    };
    
    speechSynthesis.speak(utterance);
  }

  // Load voices (they load asynchronously in some browsers)
  if (speechSynthesis) {
    speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
  }

  // ── Voice Send (processes input + speaks response) ──
  function handleVoiceSend(text) {
    // Remove initial quick replies
    const initQR = document.getElementById("ocQuickInit");
    if (initQR) initQR.remove();

    appendUserMsg(text);
    input.value = "";
    appendTyping();

    const delay = 400 + Math.random() * 500;
    setTimeout(() => {
      removeTyping();
      const result = processInput(text);
      appendBotMsg(result.text);
      
      // Speak the response
      speakText(result.text);
      
      if (result.suggestions && result.suggestions.length > 0) {
        appendQuickReplies(result.suggestions);
      }
    }, delay);
  }

  // ── Patch handleSend to also speak in voice mode ──
  const originalHandleSend = handleSend;
});`;

c = c.replace(closingBlock, voiceEngineCode);

// 5. MODIFY handleSend to speak response if voice mode
c = c.replace(
    `      const result = processInput(txt);
      appendBotMsg(result.text);
      if (result.suggestions && result.suggestions.length > 0) {
        appendQuickReplies(result.suggestions);
      }`,
    `      const result = processInput(txt);
      appendBotMsg(result.text);
      if (voiceMode) speakText(result.text);
      if (result.suggestions && result.suggestions.length > 0) {
        appendQuickReplies(result.suggestions);
      }`
);

fs.writeFileSync(filePath, c, 'utf8');
console.log('✅ Voice engine injected into v4/js/chatbot.js');

// Verify
const final = fs.readFileSync(filePath, 'utf8');
console.log('SpeechRecognition: ' + final.includes('SpeechRecognition'));
console.log('SpeechSynthesis: ' + final.includes('SpeechSynthesis'));
console.log('voiceMode: ' + final.includes('voiceMode'));
console.log('ocVoiceBtn: ' + final.includes('ocVoiceBtn'));
console.log('ocModeSelector: ' + final.includes('ocModeSelector'));
console.log('speakText: ' + final.includes('function speakText'));
