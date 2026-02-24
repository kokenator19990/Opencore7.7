const fs = require('fs');

const isGreetingNew = `function isGreeting(i) { 
  const n = normalize(i); 
  if (greetings.some(g => n === g)) return true;
  if (greetings.some(g => n.startsWith(g + " ") || n.endsWith(" " + g))) {
    const tokens = n.split(/\\s+/).filter(w => !stopWords.has(w) && w.length > 1);
    const greetingsSet = new Set(["hola", "ola", "hello", "hi", "hey", "wena", "buenas", "buenos", "saludos", "dias", "tardes", "noches", "que", "tal", "buen", "dia"]);
    const contentTokens = tokens.filter(w => !greetingsSet.has(w));
    return contentTokens.length === 0;
  }
  return false;
}`;

['v3/js/chatbot.js', 'v4/js/chatbot.js'].forEach(file => {
    let content = fs.readFileSync('c:/Users/coook/Desktop/Opencore Web7.0/' + file, 'utf8');

    // Find the old isGreeting function
    const regex = /function isGreeting\(i\)\s*\{\s*const n = normalize\(i\);\s*return greetings\.some\(g => n === g \|\| n\.startsWith\(g \+ " "\) \|\| n\.endsWith\(" " \+ g\)\);\s*\}/;

    if (regex.test(content)) {
        content = content.replace(regex, isGreetingNew);
        fs.writeFileSync('c:/Users/coook/Desktop/Opencore Web7.0/' + file, content, 'utf8');
        console.log("Updated isGreeting in " + file);
    } else {
        console.log("No match or already updated in " + file);
    }
});
