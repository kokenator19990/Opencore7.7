const fs = require('fs');
const path = require('path');

// 1. Extract base64 logo from index.html
const htmlContent = fs.readFileSync('v4/index.html', 'utf8');
const logoMatch = htmlContent.match(/<a href="#inicio" class="logo">.*?<img src="(data:image\/png;base64,[^"]+)".*?<\/a>/s);

if (!logoMatch) {
    console.log("Could not find base64 logo in index.html");
    process.exit(1);
}

const base64Logo = logoMatch[1];
const newLogoHTML = `<div class="oc-chat-avatar" style="background: transparent; border: none; overflow: visible; display:flex; align-items:center;">
           <img src="${base64Logo}" alt="OpenCORE" style="height: 20px; width: auto; filter: drop-shadow(0 0 6px rgba(0,194,255,0.6)); object-fit: contain;" />
        </div>`;

// 2. Beautiful Chat bubble icon
const chatBubbleSVG = `<svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28">
         <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>`;

// Modern Send Icon
const sendIconSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
            <line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>`;

// Function to update a chatbot file
function updateChatbot(filePath) {
    let jsContent = fs.readFileSync(filePath, 'utf8');

    // Replace Avatar/Logo
    jsContent = jsContent.replace(
        /<div class="oc-chat-avatar".*?<\/div>/s,
        newLogoHTML
    );

    // Replace Chat Icon (Trigger)
    jsContent = jsContent.replace(
        /<svg class="chat-icon".*?<\/svg>/s,
        chatBubbleSVG
    );

    // Replace Send Icon
    jsContent = jsContent.replace(
        /<button id="ocChatSend".*?<\/button>/s,
        `<button id="ocChatSend" class="oc-chat-send" aria-label="Enviar mensaje">\n          ${sendIconSVG}\n        </button>`
    );

    fs.writeFileSync(filePath, jsContent, 'utf8');
    console.log(`Updated ${filePath}`);
}

updateChatbot('v3/js/chatbot.js');
updateChatbot('v4/js/chatbot.js');
