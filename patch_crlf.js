const fs = require('fs');

const normalizeNew = `function normalize(str) {
  let s = str.toLowerCase()
    .normalize("NFD").replace(/[\\u0300-\\u036f]/g, "")
    .replace(/[^\\w\\s]/gi, " ");
  
  // Separar saludos pegados a la pregunta (ej: "holaque", "buenastardesque")
  s = s.replace(/^(hola|ola|wena|buenas?)(que|q|como|komo|cuanto|cual|kual|quien|kien|qn|tienen|ofrecen|pueden|necesito|quiero|me)\\b/ig, "$1 $2 ");
  s = s.replace(/^(buenas?\\s?tardes|buenas?\\s?noches|buenos?\\s?dias)(que|q|como|komo|cuanto|cual|kual|quien|kien|qn|tienen|ofrecen|pueden|necesito|quiero|me)\\b/ig, "$1 $2 ");
  
  return s.replace(/\\s+/g, " ").trim();
}`;

['v3/js/chatbot.js', 'v4/js/chatbot.js'].forEach(file => {
    let content = fs.readFileSync('c:/Users/coook/Desktop/Opencore Web7.0/' + file, 'utf8');

    // Regular expression to match the normalize function regardless of line endings
    const regex = /function normalize\s*\(\w+\)\s*\{[\s\S]*?trim\(\);\s*\}/;

    if (regex.test(content) && !content.includes('holaque')) {
        content = content.replace(regex, normalizeNew);
        fs.writeFileSync('c:/Users/coook/Desktop/Opencore Web7.0/' + file, content, 'utf8');
        console.log("Updated normalize in " + file);
    } else {
        console.log("No match or already updated in " + file);
    }
});
