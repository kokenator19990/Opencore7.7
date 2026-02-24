const fs = require('fs');

// We will read nlp_test_eval.js and extract the Q&A db and engine to test these specific phrases.
const code = fs.readFileSync('c:/Users/coook/Desktop/Opencore Web7.0/nlp_test_eval.js', 'utf8');

// The file nlp_test_eval.js is a standalone script that runs tests.
// Let's modify it temporarily or create a new script that just runs our specific tests by injecting them into the logic.
const queries = [
    "Hola que ofrecen",
    "Hola que tienen",
    "Hola que productos tienen a la venta",
    "Hola que servicios tienen disponibles",
    "Hola quiero hacer un proyecto",
    "Hola me gustaria trabajar con ustedes",
    "Hola son caros",
    "Hola que ofrecen que tienen que productos tienen a la venta quiero hacer un proyecto",
    "hola que servicios tienen disponibles me gustaria saber si son muy caros y ver si puedo hacer algo con ustedes",
    "hola me gustaria trabajar con ustedes quiero hacer un proyecto super grande que necesito saber que me ofrecen"
];

// Let's inject a function to test these at the end of nlp_test_eval.js
let testCode = code.replace(/function runTests\(\) \{[\s\S]*\}runTests\(\);/g, ''); // remove original runTests

testCode += `
function runAudioTests() {
    const queries = ${JSON.stringify(queries)};
    console.log("=== AUDIO QUERIES TEST ===");
    queries.forEach(q => {
        let match = getBestMatch(q);
        console.log("QUERY: " + q);
        console.log("  TOKENS: " + tokenize(q).join(", "));
        console.log("  MATCH: " + (match ? match.q : "NO MATCH"));
        console.log("  CONFIDENCE: " + (match ? match.score.toFixed(2) : "0.00"));
        console.log("  ANSWER: " + (match ? match.a.substring(0, 50) + "..." : ""));
        console.log("-".repeat(40));
    });
}
try { runAudioTests(); } catch (e) { console.error(e); }
`;

fs.writeFileSync('c:/Users/coook/Desktop/Opencore Web7.0/test_audio.js', testCode, 'utf8');
