const fs = require('fs');
const filePath = require('path').resolve('v4/js/chatbot.js');
let c = fs.readFileSync(filePath, 'utf8');

// The original logic inside recognition.onresult
// We will replace it using regex to match the block

const regex = /recognition\.onresult\s*=\s*\(event\)\s*=>\s*\{[\s\S]*?if\s*\(event\.results\[event\.results\.length\s*-\s*1\]\.isFinal\)\s*\{\s*setTimeout\(\(\)\s*=>\s*\{\s*if\s*\(input\.value\.trim\(\)\)\s*handleVoiceSend\(input\.value\.trim\(\)\);\s*\},\s*300\);\s*\}\s*\};/;

const newLogic = `    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) transcript += event.results[i][0].transcript;
      input.value = transcript;
      
      clearTimeout(window.vadTimer);
      
      if (event.results[event.results.length - 1].isFinal) {
        window.vadTimer = setTimeout(() => {
          if (input.value.trim() && isListening) {
             try { recognition.stop(); } catch(e){}
             handleVoiceSend(input.value.trim());
          }
        }, 1200);
      } else {
        window.vadTimer = setTimeout(() => {
          if (input.value.trim() && isListening) {
             try { recognition.stop(); } catch(e){}
             handleVoiceSend(input.value.trim());
          }
        }, 2000);
      }
    };`;

if (regex.test(c)) {
    c = c.replace(regex, newLogic);
    fs.writeFileSync(filePath, c, 'utf8');
    console.log("✅ VAD Logic Injected Successfully into v4/js/chatbot.js via Regex");
} else {
    console.log("⚠️ Regex didn't match. Manual inspection required.");
}
