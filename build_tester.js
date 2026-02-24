const fs = require('fs');

const content = fs.readFileSync('c:/Users/coook/Desktop/Opencore Web7.0/v4/js/chatbot.js', 'utf8');

const startIdx = content.indexOf('const qnaDB = [');
const endIdx = content.indexOf('// UI STATE & ELEMENTS'); // Check if this exists
let finalEndIdx = endIdx !== -1 ? endIdx : content.indexOf('document.');

if (startIdx === -1 || finalEndIdx === -1) {
  console.error("Could not find bounds");
  process.exit(1);
}

let nlpCode = content.substring(startIdx, finalEndIdx);

nlpCode += `
const testQueries = [
    // Greeting + Price
    "hola cuanto salen sus servicios",
    "hola me gustaria saber cuanto cobran",
    "buenas, que precio tiene una web",
    "hola, me das un presupuesto?",
    "buenas tardes, cual es el costo de un desarrollo a medida",
    "hola tarifas por favor",
    "hola, cual es su tarifa por hora",
    "ola komo estan cuanto kuesta un sistema", 
    
    // Greeting + Project
    "hola que tipo de proyectos hacen",
    "buenas, desarrollan e-commerce?",
    "hola con que tecnologias trabajan",
    "hola, me intersa integrar sap con mi plataforma",
    "hola hacen migracion a la nube?",
    
    // Greeting + Vague
    "hola de que se trata la empresa",
    "ola que asen",
    "hola necesito ayuda con un software que no funciona",
    "hola, mi sistema esta lento que me recomiendan",
    "buenas tardes me hackearon la pagina",
    "hola que pasa si mi pagina se cae",

    // Directly
    "cual es el precio",
    "precio de los servicios",
    "requiero un especialista en nestjs",
    "tienen programadores node?",
    "cuanto vale un e commerce",
    "como trabajan la infraestructura cloud?",
    "estoy buscando alguien q integre transbank",
    "necesito integrar mercadopago",
    "urgente necesito un sistema de facturacion",
    "tengo que migrar unos datos rapido",
    "cuantos anos de experiencia tienen",
    "me podrian auditar el codigo fuente",
    "quiero rescatar un proyecto que salio mal",
    "estoy buscando CTO as a service",
    
    // Edge cases / bad words / out of domain
    "hola donald trump",
    "quien creen que gane las elecciones",
    "su pagina vale callampa",
    "son unos idiotas",
    "cuanto cobray por weas",
    "joder que caro",
    "maricones"
];

// Generate ~500 permutations
const prefixes = ["hola", "buenas", "ola", "saludos", "hi", "estimados", ""];
const bodies = [
  "cuanto cobran", "que hacen", "necesito cotizar", "que proyectos hacen", "que usan para programar", 
  "experiencia en sap", "migracion a AWS", "rescate de proyecto fallido", "como hacen la integracion",
  "dame el costo de un sistema", "tienen soporte 24/7", "me hackearon", "que pasa si falla la web",
  "como hacen el contrato", "trabajan con nda", "nesesito un presupuesto", "tienen CTO",
  "donde estan ubicados", "son consultores seniors?", "hacen auditoria?"
];
const suffixes = ["por favor", "gracias", "urgente", "amigos", "master", ""];

for(let i=0; i<470; i++) {
  const p = prefixes[Math.floor(Math.random()*prefixes.length)];
  const b = bodies[Math.floor(Math.random()*bodies.length)];
  const s = suffixes[Math.floor(Math.random()*suffixes.length)];
  testQueries.push((p + " " + b + " " + s).trim());
}

let noMatch = 0;
let results = [];

testQueries.forEach(q => {
  let lower = q.toLowerCase();
  
  let isBad = false;
  for (const bw of badWords) {
    const rx = new RegExp(\`\\\\b\${bw}\\\\b\`, 'i');
    if (rx.test(lower)) {
        isBad = true;
        break;
    }
  }
  
  if (isBad) {
     results.push({q: q, type: "BAD_WORD", a: "Filtro de moderación actiado."});
     return;
  }
  
  let match = getBestMatch(q);
  if (!match) {
     noMatch++;
     results.push({q: q, type: "NO_MATCH", a: "Fallback al LLM"});
  } else {
     results.push({q: q, type: "MATCH", score: match.score.toFixed(2), a: match.a});
  }
});

let matchesStats = results.filter(r => r.type === 'MATCH');

fs.writeFileSync('c:/Users/coook/Desktop/Opencore Web7.0/nlp_results.json', JSON.stringify({
  total: testQueries.length,
  noMatch: noMatch,
  match: testQueries.length - noMatch,
  topMatches: matchesStats.slice(0, 10),
  topMisses: results.filter(r => r.type === 'NO_MATCH').slice(0, 10)
}, null, 2));

console.log("Evaluated " + testQueries.length + " queries. Fallback to API: " + noMatch);
`;

fs.writeFileSync('c:/Users/coook/Desktop/Opencore Web7.0/nlp_test_eval.js', nlpCode, 'utf8');
