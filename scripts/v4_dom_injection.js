document.addEventListener("DOMContentLoaded", () => {
  const chatHTML = `
    <div class="oc-chat-trigger" id="ocChatTrigger">
      <div class="oc-chat-label">Habla con OpenCORE AI</div>
      <svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
      <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </div>

    <div class="oc-chat-window" id="ocChatWindow">
      <div class="oc-chat-header">
        <div class="oc-chat-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="10" rx="2"></rect>
            <circle cx="12" cy="5" r="2"></circle>
            <path d="M12 7v4"></path>
            <line x1="8" y1="16" x2="8" y2="16"></line>
            <line x1="16" y1="16" x2="16" y2="16"></line>
          </svg>
        </div>
        <div class="oc-chat-title">
          <h4>Asistente OpenCORE</h4>
          <span>Online</span>
        </div>
      </div>
      
      <div class="oc-chat-body" id="ocChatBody">
        <div class="oc-msg bot">Hola 👋 Soy el asistente IA de OpenCORE Consulting. Pregúntame sobre servicios, costos, metodología o experiencia.</div>
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
        </div>
        <div class="oc-quick-replies" id="ocQuickInit">
          <button class="oc-qr" data-q="¿Qué servicios ofrece OpenCORE?">Servicios disponibles</button>
          <button class="oc-qr" data-q="¿Cuál es la estructura de tarifas de OpenCORE?">Estructura de tarifas</button>
          <button class="oc-qr" data-q="¿Cuántos años de experiencia tiene OpenCORE?">Trayectoria y experiencia</button>
          <button class="oc-qr" data-q="¿Qué tipo de migraciones empresariales realizan?">Migraciones empresariales</button>
        </div>
      </div>

      <div class="oc-chat-footer">
        <input type="text" id="ocChatInput" class="oc-chat-input" placeholder="Escribe tu consulta..." autocomplete="off">
        <button id="ocChatSend" class="oc-chat-send">
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
        </button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", chatHTML);

  const trigger = document.getElementById("ocChatTrigger");
  const win = document.getElementById("ocChatWindow");
  const body = document.getElementById("ocChatBody");
  const input = document.getElementById("ocChatInput");
  const sendBtn = document.getElementById("ocChatSend");

  // Toggle
  trigger.addEventListener("click", () => {
    trigger.classList.toggle("active");
    win.classList.toggle("open");
    if (win.classList.contains("open")) input.focus();
  });

  // Quick reply buttons
  body.addEventListener("click", (e) => {
    if (e.target.classList.contains("oc-qr")) {
      const q = e.target.dataset.q;
      if (q) {
        input.value = q;
        handleSend();
      }
    }
  });

  function appendUserMsg(txt) {
    const d = document.createElement("div");
    d.className = "oc-msg user";
    d.textContent = txt;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
  }

  function appendBotMsg(txt) {
    const d = document.createElement("div");
    d.className = "oc-msg bot";
    d.textContent = txt;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
    return d;
  }

  function appendQuickReplies(suggestions) {
    if (!suggestions || suggestions.length === 0) return;
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

  function removeTyping() {
    const d = document.getElementById("ocTyping");
    if (d) d.remove();
  }

  function handleSend() {
    const txt = input.value.trim();
    if (!txt) return;

    // Remove initial quick replies
    const initQR = document.getElementById("ocQuickInit");
    if (initQR) initQR.remove();

    appendUserMsg(txt);
    input.value = "";
    appendTyping();

    // Dynamic delay based on response length simulation
    const delay = 600 + Math.random() * 900;
    setTimeout(() => {
      removeTyping();
      const result = processInput(txt);
      appendBotMsg(result.text);
      if (voiceMode) speakText(result.text);
      if (result.suggestions && result.suggestions.length > 0) {
        appendQuickReplies(result.suggestions);
      }
    }, delay);
  }

  sendBtn.addEventListener("click", handleSend);
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
});
