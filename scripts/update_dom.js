const fs = require('fs');
const filePath = require('path').resolve('v4/js/chatbot.js');
let c = fs.readFileSync(filePath, 'utf8');

c = c.replace(
    /<div class="oc-chat-trigger".*?<\/div>.*?<\/div>/s,
    `    <div class="oc-chat-trigger" id="ocChatTrigger" aria-label="Abrir chat OpenCORE AI" role="button" tabindex="0">
      <div class="oc-chat-label">Habla con OpenCORE AI</div>
      <svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28">
         <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><path d="M3.27 6.96L12 12.01l8.73-5.05"></path><path d="M12 22.08V12"></path>
      </svg>
      <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </div>`
);

c = c.replace(
    /<div class="oc-chat-header">.*?<\/div>.*?<\/div>.*?<\/button>.*?<\/div>/s,
    `      <div class="oc-chat-header">
        <div class="oc-chat-avatar" style="background: transparent; border: none; overflow: visible;">
           <img src="img/logo-white.png" alt="OC" style="width: 28px; height: 28px; filter: drop-shadow(0 0 8px var(--cyan-g)); object-fit: contain;" />
        </div>
        <div>
          <div class="oc-chat-name" style="display:flex; align-items:center;">OpenCORE AI</div>
          <div class="oc-chat-status"><span class="oc-status-dot"></span>En linea</div>
        </div>
        <button class="oc-chat-close" id="ocChatClose" aria-label="Cerrar chat" style="border:none; background:transparent; display:flex; align-items:center; justify-content:center; padding:4px;">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
             <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
           </svg>
        </button>
      </div>`
);

c = c.replace(
    /<div class="oc-chat-footer">.*?<\/div>/s,
    `      <div class="oc-chat-footer">
        <input type="text" id="ocChatInput" class="oc-chat-input" placeholder="Escribe tu consulta..." autocomplete="off" maxlength="400" aria-label="Mensaje" />
        <button id="ocChatSend" class="oc-chat-send" aria-label="Enviar mensaje">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>`
);

fs.writeFileSync(filePath, c, 'utf8');
console.log("Updated v4 chatbot.js");
