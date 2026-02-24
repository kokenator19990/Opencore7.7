const fs = require('fs');

['v3/js/chatbot.js', 'v4/js/chatbot.js'].forEach(file => {
    let content = fs.readFileSync('c:/Users/coook/Desktop/Opencore Web7.0/' + file, 'utf8');

    // 1. Modify appendBotMsg to include the Play button
    const oldAppendBotMsg = `  function appendBotMsg(content, isHTML) {
    const d = document.createElement("div");
    d.className = "oc-msg bot";
    if (isHTML) d.innerHTML = content;
    else d.textContent = content;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
    return d;
  }`;

    const newAppendBotMsg = `  function appendBotMsg(content, isHTML) {
    const wrapper = document.createElement("div");
    wrapper.className = "oc-msg-row";
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "flex-end";
    wrapper.style.marginBottom = "8px";

    const d = document.createElement("div");
    d.className = "oc-msg bot";
    d.style.marginBottom = "0";
    if (isHTML) d.innerHTML = content;
    else d.textContent = content;
    
    const playBtn = document.createElement("button");
    playBtn.className = "oc-tts-play";
    playBtn.innerHTML = \`<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>\`;
    playBtn.style.background = "transparent";
    playBtn.style.border = "none";
    playBtn.style.color = "rgba(0,194,255,0.7)";
    playBtn.style.cursor = "pointer";
    playBtn.style.marginLeft = "4px";
    playBtn.style.padding = "4px";
    playBtn.style.borderRadius = "50%";
    playBtn.style.display = "flex";
    playBtn.style.alignItems = "center";
    playBtn.style.justifyContent = "center";
    playBtn.style.transition = "color 0.2s";
    
    // Play button event listener
    playBtn.addEventListener("mouseover", () => playBtn.style.color = "#00c2ff");
    playBtn.addEventListener("mouseout", () => playBtn.style.color = "rgba(0,194,255,0.7)");
    playBtn.addEventListener("click", () => {
        // Toggle play/stop if already speaking the same text
        if (window.speechSynthesis && window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            // If we want it to stop entirely, we return. If we want it to restart, we continue.
            // Let's implement simple stop/restart:
            if (playBtn.classList.contains("playing")) {
                playBtn.classList.remove("playing");
                playBtn.innerHTML = \`<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>\`;
                return;
            }
        }
        
        // Reset all other buttons
        document.querySelectorAll(".oc-tts-play").forEach(btn => {
            btn.classList.remove("playing");
            btn.innerHTML = \`<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>\`;
        });
        
        playBtn.classList.add("playing");
        playBtn.innerHTML = \`<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>\`; // Pause icon
        
        const plainText = d.innerText || d.textContent;
        speakText(plainText);
        
        // Reset when done
        const checkDone = setInterval(() => {
            if (!window.speechSynthesis || !window.speechSynthesis.speaking) {
                clearInterval(checkDone);
                playBtn.classList.remove("playing");
                playBtn.innerHTML = \`<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>\`;
            }
        }, 500);
    });

    wrapper.appendChild(d);
    wrapper.appendChild(playBtn);
    body.appendChild(wrapper);
    body.scrollTop = body.scrollHeight;
    return d;
  }`;

    if (content.includes(oldAppendBotMsg)) {
        content = content.replace(oldAppendBotMsg, newAppendBotMsg);
    }

    // 2. Remove automatic speakText from handleSend
    const autoSpeakRegex = /\/\/\s*Speak in voice mode\s+if\s*\(voiceModeActive\)\s*\{\s*const\s+plain\s*=\s*msgEl\.textContent\s*\|\|\s*msgEl\.innerText;\s*speakText\((?:plain\|\|txt)\);\s*\}/g;
    content = content.replace(autoSpeakRegex, "// Auto-TTS disabled in favor of manual play button");

    fs.writeFileSync('c:/Users/coook/Desktop/Opencore Web7.0/' + file, content, 'utf8');
    console.log("Updated TTS logic in " + file);
});
