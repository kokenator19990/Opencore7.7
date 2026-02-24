const fs = require('fs');
const filePath = require('path').resolve('v4/js/chatbot.js');
let c = fs.readFileSync(filePath, 'utf8');

const marker = '    recognition.onstart = () => {';

const splitSource = c.split(marker);
if (splitSource.length !== 2) {
    console.log("Could not find start marker.");
    process.exit(1);
}

const beforeBlock = splitSource[0] + marker;
let afterBlock = splitSource[1];

// we want to replace the onresult function completely
const onResultStart = afterBlock.indexOf('    recognition.onresult');
const onErrorStart = afterBlock.indexOf('    recognition.onerror');

if (onResultStart === -1 || onErrorStart === -1) {
    console.log("Could not find onresult or onerror.");
    process.exit(1);
}

const vadLogic = `
    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) transcript += event.results[i][0].transcript;
      input.value = transcript;
      
      // Auto-Submit (VAD Silence Detection)
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
    };

`;

const finalFile = beforeBlock + afterBlock.substring(0, onResultStart) + vadLogic + afterBlock.substring(onErrorStart);

fs.writeFileSync(filePath, finalFile, 'utf8');
console.log("✅ Custom VAD Logic Injected Successfully.");
