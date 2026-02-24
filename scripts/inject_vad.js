const fs = require('fs');
const filePath = require('path').resolve('v4/js/chatbot.js');
let c = fs.readFileSync(filePath, 'utf8');

const oldResult = `    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) transcript += event.results[i][0].transcript;
      input.value = transcript;
      if (event.results[event.results.length - 1].isFinal) {
        setTimeout(() => {
          if (input.value.trim()) handleVoiceSend(input.value.trim());
        }, 300);
      }
    };`;

const newResult = `    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) transcript += event.results[i][0].transcript;
      input.value = transcript;
      
      // VAD: Voice Activity Detection (Silence Timeout)
      clearTimeout(window.vadTimer);
      
      if (event.results[event.results.length - 1].isFinal) {
        // User finished a sentence, wait 1.2s before auto-sending
        window.vadTimer = setTimeout(() => {
          if (input.value.trim() && isListening) {
             try { recognition.stop(); } catch(e){}
             handleVoiceSend(input.value.trim());
          }
        }, 1200);
      } else {
        // User paused mid-sentence, wait 2.5s before assuming they are done
        window.vadTimer = setTimeout(() => {
          if (input.value.trim() && isListening) {
             try { recognition.stop(); } catch(e){}
             handleVoiceSend(input.value.trim());
          }
        }, 2500);
      }
    };`;

if (c.includes(oldResult)) {
    c = c.replace(oldResult, newResult);
    fs.writeFileSync(filePath, c, 'utf8');
    console.log("✅ VAD Logic Injected Successfully into v4/js/chatbot.js");
} else {
    // If it was already replaced or slightly different
    console.log("⚠️ Could not find exact block. Attempting fallback replace...");
    const fallbackSearch = "if (event.results[event.results.length - 1].isFinal)";
    if (c.includes(fallbackSearch) && !c.includes("vadTimer")) {
        console.log("Fallback replacement needed, please check manually.");
    } else {
        console.log("VAD seems to be already injected or file structure changed.");
    }
}
