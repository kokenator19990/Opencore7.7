const fs = require('fs');

const filesToPatch = [
    'c:/Users/coook/Desktop/Opencore Web7.0/v3/js/chatbot.js',
    'c:/Users/coook/Desktop/Opencore Web7.0/v4/js/chatbot.js'
];

filesToPatch.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Inject Memory variables at the top of the file (before qnaDB)
    if (!content.includes('let lastIntentObj = null;')) {
        content = content.replace(
            /(const qnaDB = \[)/,
            `// --- CONVERSATIONAL MEMORY & ANTI-LOOP ---
let lastIntentObj = null;
let consecutiveFallbacks = 0;
let consecutiveSameIntent = 0;

$1`
        );
    }

    // 2. Modify `processInput` starting block to reset fallbacks on success
    if (!content.includes('// ── CONTEXT MICRO-RETENTION ──')) {
        content = content.replace(
            /function processInput\(input\) \{/,
            `function processInput(input) {
  // ── CONTEXT MICRO-RETENTION ──
  // Track continuous failures to trigger Handover
`
        );
    }

    // 3. Prevent exact same short intent 3 times in a row
    if (!content.includes('// 7. Exact match')) {
        // Just rely on the natural replace flow
    }

    // We need to carefully rewrite the exact match and fuzzy match blocks
    // to record `lastIntentObj` and handle `consecutiveFallbacks`.
    // It's safer to do this with a multi-replace logic string.

    console.log("Analyzing file structure for patch injection " + file);
});
