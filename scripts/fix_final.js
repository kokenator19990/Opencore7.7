const fs = require('fs');

const opencoreSVG = \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" style="height: 24px; width: 80px; filter: drop-shadow(0 0 8px rgba(0,194,255,0.4));"><defs><linearGradient id="oc-g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#00c2ff"/><stop offset="100%" stop-color="#a5b4fc"/></linearGradient></defs><g fill="none" stroke="url(#oc-g)" stroke-width="5"><polygon points="30,10 10,20 10,40 30,50 50,40 50,20"/></g><text x="60" y="39" font-family="Arial,Geneva,sans-serif" font-size="30" font-weight="bold" fill="#fff"><span>OPEN</span><span fill="url(#oc-g)">CORE</span></text></svg>\`;

const messageSVG = \`<svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28">
         <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>\`;

const sendSVG = \`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>\`;

function replaceRegexSafe(file) {
    let c = fs.readFileSync(file, 'utf8');

    // Avatar Logo (Header)
    const headerRegex = /<div class="oc-chat-header">.*?<div class="oc-chat-avatar"[^>]*>.*?<\/div>(.*?)<div class="oc-chat-name"/s;
    if (headerRegex.test(c)) {
        c = c.replace(headerRegex, \`<div class="oc-chat-header">
        <div class="oc-chat-avatar" style="background:transparent; border:none; padding:0; width:auto; justify-content:flex-start;">
           \${opencoreSVG}
        </div>$1<div class="oc-chat-name" style="display:none;"\`);
    } else {
        // Fallback for v4 which might not have the inline styles applied from the previous failed step
        const fallbackHeaderRegex = /<div class="oc-chat-avatar">OC<\/div>/g;
        c = c.replace(fallbackHeaderRegex, \`<div class="oc-chat-avatar" style="background:transparent; border:none; padding:0; width:auto; justify-content:flex-start;">
           \${opencoreSVG}
        </div>\`);
    }

    // Trigger Icon
    const triggerRegex = /<svg class="chat-icon".*?<\/svg>/s;
    c = c.replace(triggerRegex, messageSVG);

    // Send Icon
    const sendRegex = /<button id="ocChatSend"[^>]*>.*?<\/button>/s;
    c = c.replace(sendRegex, \`<button id="ocChatSend" class="oc-chat-send" aria-label="Enviar mensaje">
          \${sendSVG}
        </button>\`);

    fs.writeFileSync(file, c, 'utf8');
    console.log("Updated " + file);
}

replaceRegexSafe('v3/js/chatbot.js');
replaceRegexSafe('v4/js/chatbot.js');
