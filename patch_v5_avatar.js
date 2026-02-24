const fs = require('fs');
const file = 'c:/Users/coook/Desktop/Opencore Web7.0/v5/js/chatbot.js';
let content = fs.readFileSync(file, 'utf8');

// 1. Inject CSS and HTML for the Avatar
const avatarHTML = `
    <style>
      .oc-avatar-container {
         display: none; /* hidden by default */
         position: fixed;
         bottom: 120px;
         right: 380px; /* To the left of the chat window */
         width: 180px;
         height: 180px;
         border-radius: 50%;
         background: linear-gradient(135deg, #0f1828, #1c2a42);
         box-shadow: 0 0 20px rgba(0, 194, 255, 0.15);
         border: 2px solid rgba(0, 194, 255, 0.3);
         z-index: 10000;
         overflow: hidden;
         transition: opacity 0.4s ease, transform 0.4s ease;
         opacity: 0;
         transform: translateY(20px);
         pointer-events: none;
      }
      .oc-avatar-container.show-avatar {
         display: flex;
         opacity: 1;
         transform: translateY(0);
      }
      .oc-avatar-container img {
         width: 100%;
         height: 100%;
         object-fit: contain;
         border-radius: 50%;
         transform-origin: center bottom;
         transition: transform 0.15s ease;
      }
      .oc-avatar-container.is-speaking {
         border-color: rgba(0, 194, 255, 0.8);
         box-shadow: 0 0 30px rgba(0, 194, 255, 0.4);
      }
      .oc-avatar-container.is-speaking img {
         animation: avatarSpeak 0.25s infinite alternate;
      }
      @keyframes avatarSpeak {
         0% { transform: scale(1) translateY(0); }
         100% { transform: scale(1.03) translateY(-2px); }
      }
      @media (max-width: 1024px) {
         .oc-avatar-container { display: none !important; }
      }
    </style>
    <div id="ocAvatarContainer" class="oc-avatar-container">
       <img src="img/avatar_empresarial.png" alt="OpenCORE Senior Advisor" id="ocAvatarImg">
    </div>
`;

if (!content.includes('oc-avatar-container')) {
    content = content.replace(
        /(<div class="oc-chat-trigger")/,
        avatarHTML + '\n    $1'
    );
}

// 2. Modify speakText() to bind to TTS events
const newSpeakText = `function speakText(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "es-CL";
    utt.rate = 1.05;
    utt.pitch = 1.0;
    const voices = window.speechSynthesis.getVoices();
    const esVoice = voices.find(v => v.lang.startsWith("es"));
    if (esVoice) utt.voice = esVoice;
    
    // Avatar Animation Binding
    utt.onstart = () => {
       const av = document.getElementById("ocAvatarContainer");
       if (av) av.classList.add("is-speaking");
    };
    utt.onend = () => {
       const av = document.getElementById("ocAvatarContainer");
       if (av) av.classList.remove("is-speaking");
    };
    utt.onerror = () => {
       const av = document.getElementById("ocAvatarContainer");
       if (av) av.classList.remove("is-speaking");
    };
    
    window.speechSynthesis.speak(utt);
  }`;

content = content.replace(/function speakText\(text\) \{[\s\S]*?window\.speechSynthesis\.speak\(utt\);\s*\}/, newSpeakText);


// 3. Show/Hide Avatar based on Voice Mode
if (!content.includes('classList.add("show-avatar")')) {
    content = content.replace(
        /function enterVoiceMode\(\) \{/,
        `function enterVoiceMode() {\n    const av = document.getElementById("ocAvatarContainer");\n    if (av) av.classList.add("show-avatar");`
    );
}

if (!content.includes('classList.remove("show-avatar")')) {
    content = content.replace(
        /function exitVoiceMode\(\) \{/,
        `function exitVoiceMode() {\n    const av = document.getElementById("ocAvatarContainer");\n    if (av) av.classList.remove("show-avatar");`
    );
}

fs.writeFileSync(file, content, 'utf8');
console.log("Avatar successfully injected into v5/js/chatbot.js");
