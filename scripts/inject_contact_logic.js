const fs = require('fs');
const path = require('path');

const files = [
    path.join(__dirname, '../v3/js/chatbot.js'),
    path.join(__dirname, '../v4/js/chatbot.js')
];

const contactLogic = `
// ── CONTACT STATE TRACKING & LOGIC ──
let contactPromptActive = false;
let contactPromptCounter = 0;

// Excesive but robust regex tracking almost any contact intent
const contactRegex = /\\b(contacto|contactar|contactarme|contactenme|contáctenme|contactanos|comunicarme|llamar|llamada|llamenme|llámame|llámenme|llamanme|llamame|llamarnos|telefono|teléfono|numero|número|celular|cel|whatsapp|wsp|wasap|correo|email|mail|humano|persona\\sreal|asesor|ejecutivo|arquitecto|vendedor|ventas|comercial|agendar|agenda|reunion|reunión|sesion|sesión|videollamada|zoom|meet|teams|contratar|comprar|hablemos)\\b/i;

// 100 manual variants to ensure bulletproof checks
const extraContactIntents = [
  "quiero que me llamen", "necesito que me contacten", "quiero contacto", "telefono",
  "numero de telefono", "celular", "whatsapp", "como los contacto", "hablar con un humano",
  "agendar llamada", "llamenme inmediatamente", "quiero contratar", "quiero comprar",
  "donde llamo", "tienen un telefono", "un telefono para contactarlos", "jajaj un telefono para llamar",
  "si quiero que me llamen", "quiero que me contacten tengo una empresa", "quiero automatizar mi empresa",
  "llamanme inmediatamente", "necesito agendar", "reunion por favor", "hablar con ventas",
  "necesito hablar con alguien", "contactar", "contacto", "llamar", "llamada", "correo", "email", "asesor",
  "ejecutivo", "arquitecto", "necesito que me llamen", "llámame", "contactenme",
  "contáctenme", "quiero hablar con ustedes", "como me comunico", "comunicarme",
  "reunion", "reunión", "sesion", "sesión", "quiero sus servicios", "necesito sus servicios",
  "empezar proyecto", "contratar", "necesito cotizar", "hablemos", "me pueden llamar",
  "quien me atiende", "atencion al cliente", "soporte comercial", "mesa de ayuda",
  "numero telefonico", "cel", "wsp", "wasap", "número", "dirección", "donde estan",
  "oficina", "reunirnos", "juntarnos", "videollamada", "zoom", "meet", "teams", "agendamiento",
  "contactos", "ayuda personal", "alguien que me ayude", "ejecutivo de ventas", "ventas",
  "comercial", "hablar con ventas", "cotizar por telefono", "llamar a opencore",
  "hablar con opencore", "contactar a opencore", "trabajar juntos", "comenzar a trabajar",
  "iniciar proyecto", "contratarlos", "quiero sus sistemas", "hacer un sistema", "hacer sistema",
  "hacer solucion", "hablar de un proyecto", "proyecto nuevo", "requerimiento",
  "mandar un correo", "mandar email", "escribir", "a donde escribo", "donde mando correo"
];
`;

const processModV3 = `// Main processor
function processInput(input) {
  const clean = input.trim();
  const ln = clean.toLowerCase();
  if (!clean) return { text: "Escribe tu consulta y con gusto te ayudo.", suggestions: [] };

  const isAffirmation = (ln === "si" || ln === "sí" || ln === "claro" || ln === "ok" || ln.includes("por favor") || ln.includes("bueno") || ln === "ya" || ln === "dale" || ln === "yes" || ln === "sip");
  
  if (contactPromptActive && isAffirmation) {
    contactPromptActive = false;
    contactPromptCounter = 0;
    return { 
      text: "¡Perfecto! Nuestro equipo está listo. <br><br>✉️ <b>contacto@opencore.cl</b><br>📱 <b>+569 4958 7198</b><br>📅 <a href='https://calendly.com/opencore-diagnostico' target='_blank' style='color:#00c2ff;font-weight:700;text-decoration:underline;'>Agenda una llamada de 15 min aquí</a>.", 
      suggestions: [], 
      isHTML: true 
    };
  }
  
  // Track consecutive prompt errors to force a human bypass
  contactPromptActive = false; 

  if (contactRegex.test(clean) || extraContactIntents.some(i => ln.includes(i)) || (ln === 'llamame') || (ln === 'llamame a mi')) {
    contactPromptCounter++;
    return { 
      text: "¡Excelente! Para contactarnos directamente tienes estas vías: <br><br>✉️ <b>contacto@opencore.cl</b><br>📱 <a href='https://wa.me/56949587198' target='_blank' style='color:#00c2ff;text-decoration:underline;'><b>+569 4958 7198 (WhatsApp)</b></a><br>📅 <a href='https://calendly.com/opencore-diagnostico' target='_blank' style='color:#00c2ff;font-weight:700;text-decoration:underline;'>Agendar Diagnóstico VIP (15 min)</a>.", 
      suggestions: [], 
      isHTML: true 
    };
  }

  const norm = normalize(clean);`;


const processModV4 = `function processInput(input) {
  const clean = input.trim();
  const ln = clean.toLowerCase();
  if (!clean) return { text: "Escribe tu consulta y con gusto te ayudo." };

  const isAffirmation = (ln === "si" || ln === "sí" || ln === "claro" || ln === "ok" || ln.includes("por favor") || ln.includes("bueno") || ln === "ya" || ln === "dale" || ln === "yes" || ln === "sip");
  
  if (contactPromptActive && isAffirmation) {
    contactPromptActive = false;
    contactPromptCounter = 0;
    return { 
      text: "¡Perfecto! Nuestro equipo está listo. <br><br>✉️ <b>contacto@opencore.cl</b><br>📱 <b>+569 4958 7198</b><br>📅 <a href='https://calendly.com/opencore-diagnostico' target='_blank' style='color:#00c2ff;font-weight:700;text-decoration:underline;'>Agenda una llamada de 15 min aquí</a>.", 
      suggestions: [], 
      isHTML: true 
    };
  }
  
  contactPromptActive = false; 

  if (contactRegex.test(clean) || extraContactIntents.some(i => ln.includes(i)) || (ln === 'llamame') || (ln === 'llamame a mi')) {
    contactPromptCounter++;
    return { 
      text: "¡Excelente! Para contactarnos directamente tienes estas vías: <br><br>✉️ <b>contacto@opencore.cl</b><br>📱 <a href='https://wa.me/56949587198' target='_blank' style='color:#00c2ff;text-decoration:underline;'><b>+569 4958 7198 (WhatsApp)</b></a><br>📅 <a href='https://calendly.com/opencore-diagnostico' target='_blank' style='color:#00c2ff;font-weight:700;text-decoration:underline;'>Agendar Diagnóstico VIP (15 min)</a>.", 
      suggestions: [], 
      isHTML: true 
    };
  }

  const norm = normalize(clean);`;



files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Insert Logic Definition before processInput
    if (!content.includes('contactRegex')) {
        content = content.replace(/(\/\/ Main processor)/g, contactLogic + '\n$1');
    }

    // Replace start of processInput
    const p1 = "function processInput(input) {\n  const clean = input.trim();\n  if (!clean) return { text: \"Escribe tu consulta y con gusto te ayudo.\", suggestions: [] };\n  const norm = normalize(clean);";

    const p2 = "function processInput(input) {\n  const clean = input.trim();\n  if (!clean) return { text: \"Escribe tu consulta y con gusto te ayudo.\" };\n  const norm = normalize(clean);";

    if (content.includes(p1)) {
        content = content.replace(p1, processModV3);
    } else if (content.includes(p2)) {
        content = content.replace(p2, processModV4);
    }

    // Find fallback area to ACTIVATE the tracking flag
    const fallbackStr = 'let fallback = clean.split(" ").length > 3 ? pick(fallbackLong) : pick(fallbackShort);';
    if (content.includes(fallbackStr)) {
        const replacementStr = 'contactPromptActive = true;\n  let fallback = clean.split(" ").length > 3 ? pick(fallbackLong) : pick(fallbackShort);';
        if (!content.includes("contactPromptActive = true;")) {
            content = content.replace(fallbackStr, replacementStr);
        }
    }

    fs.writeFileSync(file, content, 'utf8');
});

console.log("Contact tracking state and 100+ variants injected successfully into V3 and V4.");
