const fs = require('fs');
const filePath = require('path').resolve('v4/css/chatbot.css');
let c = fs.readFileSync(filePath, 'utf8');

const voiceCSS = \`
/* ═══════════════════════════════════════════════════════════ */
/* V4 VOICE ENGINE UI */
/* ═══════════════════════════════════════════════════════════ */

/* Microphone Button */
.oc-voice-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a0aec0;
  transition: all 0.3s ease;
  margin-left: 5px;
}
.oc-voice-btn svg { width: 22px; height: 22px; }
.oc-voice-btn:hover { color: #fff; background: rgba(255, 255, 255, 0.1); }
.oc-voice-btn.active { color: #3b82f6; }

/* Listening Animation */
@keyframes pulse-listen {
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
}
.oc-voice-btn.listening {
  color: #ef4444;
  animation: pulse-listen 1.5s infinite;
  background: rgba(239, 68, 68, 0.1);
}

/* Speaking Animation */
@keyframes pulse-speak {
  0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
  100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
}
.oc-voice-btn.speaking {
  color: #3b82f6;
  animation: pulse-speak 2s infinite;
  background: rgba(59, 130, 246, 0.1);
}

/* Mode Selector Modal */
.oc-mode-selector {
  margin: 10px 15px;
  padding: 15px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 12px;
  text-align: center;
  backdrop-filter: blur(5px);
  animation: oc-fade-in 0.4s ease forwards;
}
.oc-mode-label { color: #e2e8f0; font-size: 14px; margin-bottom: 12px; font-weight: 500; }
.oc-mode-buttons { display: flex; gap: 10px; justify-content: center; }
.oc-mode-btn {
  flex: 1;
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 10px;
  color: #fff;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}
.oc-mode-btn:hover { background: rgba(59, 130, 246, 0.2); border-color: rgba(59, 130, 246, 0.5); transform: translateY(-2px); }
.oc-mode-btn svg { color: #60a5fa; }
.oc-mode-btn span { font-size: 13px; font-weight: 500; }
\`;

if (!c.includes('.oc-voice-btn')) {
  fs.writeFileSync(filePath, c + '\\n\\n' + voiceCSS, 'utf8');
  console.log('✅ Voice CSS appended to v4/css/chatbot.css');
} else {
  console.log('Voice CSS already exists in v4/css/chatbot.css');
}
