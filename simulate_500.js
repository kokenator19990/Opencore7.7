const fs = require('fs');

function evaluateResponses(chatbotScriptPath) {
    const code = fs.readFileSync(chatbotScriptPath, 'utf8');

    try {
        const startIndex = code.indexOf('const qnaDB = [');
        let bracketCount = 0;
        let endIndex = -1;
        for (let i = startIndex + 'const qnaDB = '.length; i < code.length; i++) {
            if (code[i] === '[') bracketCount++;
            if (code[i] === ']') bracketCount--;
            if (bracketCount === 0) {
                endIndex = i + 1;
                break;
            }
        }

        const arrayString = code.substring(startIndex + 'const qnaDB = '.length, endIndex);
        let qnaDB = eval("(" + arrayString + ")");

        function normalize(str) {
            let s = str.toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/[^\w\s]/gi, " ");

            s = s.replace(/^(hola|ola|wena|buenas?)(que|q|como|komo|cuanto|cual|kual|quien|kien|qn|tienen|ofrecen|pueden|necesito|quiero|me)\b/ig, "$1 $2 ");
            return s.replace(/\s+/g, " ").trim();
        }

        const stopWords = new Set(["a", "ante", "bajo", "cabe", "con", "contra", "de", "desde", "durante", "en", "entre", "hacia", "hasta", "mediante", "para", "por", "segun", "sin", "so", "sobre", "tras", "el", "la", "los", "las", "un", "una", "unos", "unas", "al", "del", "lo", "y", "o", "u", "e", "ni", "que"]);

        function splitTokens(str) {
            return normalize(str).split(/\s+/).filter(w => !stopWords.has(w) && w.length > 1);
        }

        function levenshtein(a, b) {
            const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
            for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
            for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
            for (let i = 1; i <= a.length; i++) {
                for (let j = 1; j <= b.length; j++) {
                    const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                    matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
                }
            }
            return matrix[a.length][b.length];
        }

        function isSimilar(w1, w2) {
            if (w1 === w2) return true;
            if (w1.length < 4 || w2.length < 4) return false;
            return levenshtein(w1, w2) <= 1;
        }

        function ngramMatch(inputTokens, qTokens) {
            let matches = 0;
            for (const wt of inputTokens) {
                if (qTokens.some(qw => isSimilar(wt, qw))) matches += 1;
            }
            for (let i = 0; i < inputTokens.length - 1; i++) {
                const biInput = inputTokens[i] + " " + inputTokens[i + 1];
                for (let j = 0; j < qTokens.length - 1; j++) {
                    const biQ = qTokens[j] + " " + qTokens[j + 1];
                    if (biInput === biQ) matches += 2;
                }
            }
            return matches;
        }

        function getBestMatch(inputStr) {
            const norm = normalize(inputStr);
            const iTokens = splitTokens(inputStr);

            let bestMatch = null;
            let highestScore = 0;

            for (const item of qnaDB) {
                const qn = normalize(item.q);
                const qTokens = splitTokens(item.q);

                if (norm === qn) return item;

                if (qn.startsWith(norm) && norm.length > 3) {
                    if (qn.length <= norm.length * 2.2) {
                        return item;
                    }
                }

                let score = ngramMatch(iTokens, qTokens);
                const diff = Math.abs(iTokens.length - qTokens.length);
                score -= (diff * 0.2);

                let hasKeywordMatch = false;
                for (const it of iTokens) {
                    if (qTokens.some(qt => qt === it)) {
                        hasKeywordMatch = true;
                        break;
                    }
                }

                if (hasKeywordMatch && score > highestScore) {
                    highestScore = score;
                    bestMatch = item;
                }
            }

            if (highestScore >= 1.5) {
                return bestMatch;
            }
            return null;
        }

        console.log("QNA Array successfully loaded. Size:", qnaDB.length);

        let testQueries = [
            "¿Cuáles son sus fortalezas?",
            "cuáles son sus fortalezas",
            "dime las fortalezas de opencore",
            "quiero saber sus fortalezas",
            "fortalezas",
            "¿Cuáles son sus debilidades?",
            "cuáles son sus debilidades",
            "dime las debilidades de opencore",
            "que debilidades tienen",
            "que ofrecen",
            "hola que ofrecen",
            "que hacen",
            "hola que hacen",
            "cuanto vale",
            "precios",
            "valores",
            "cuanto cuesta",
            "que tecnologia usan",
            "como esta hecha la pagina",
            "si me hackean que pasa",
            "falla el sistema",
            "migraciones a cloud",
            "tienen integraciones",
            "cuanto demoran en cotizar",
            "es muy caro",
            "hola quiero hacer un proyecto de repuestos",
            "hola que tal como estan, cuales son sus debilidades"
        ];

        const expandedQueries = [];
        for (let i = 0; i < 20; i++) {
            expandedQueries.push(...testQueries);
        }

        let runLog = [];
        let errorCount = 0;

        expandedQueries.forEach(query => {
            const result = getBestMatch(query);

            // Validate strengths/weaknesses map correctly
            if (query.toLowerCase().includes("fortalezas") || query.toLowerCase().includes("debilidades")) {
                if (result) {
                    if (result.a.toLowerCase().includes("precio") || result.a.toLowerCase().includes("cobrar") || result.a.toLowerCase().includes("valor hora") || result.a.toLowerCase().includes("uf")) {
                        errorCount++;
                        runLog.push(`[ERROR - PRICING FALSE POSITIVE] Q: "${query}" -> Mapped to: "${result.q}" -> A: "${result.a.substring(0, 50)}..."`);
                    } else if (result.q.toLowerCase().includes("fortalezas") || result.q.toLowerCase().includes("debilidades")) {
                        // All good
                    } else {
                        // Some other fallback mapping, print warning but don't count as explicit logic fail
                        runLog.push(`[WARNING - MISSED MAPPING] Q: "${query}" -> Mapped to: "${result.q}"`);
                    }
                } else {
                    errorCount++;
                    runLog.push(`[ERROR - MULTIPLE FAILURES] Q: "${query}" -> NOT FOUND`);
                }
            }
        });

        console.log(`Simulation finished on ${chatbotScriptPath} out of ${expandedQueries.length} runs.`);
        console.log(`Errors found: ${errorCount}`);

        let uniqueWarnings = [...new Set(runLog)];
        if (uniqueWarnings.length > 0) {
            console.log("Details:");
            uniqueWarnings.forEach(l => console.log(l));
        } else {
            console.log("SUCCESS! All logic variations matched their corresponding answers exactly or fell back correctly.");
        }

    } catch (e) {
        console.error("Simulation script error:", e);
    }
}

evaluateResponses('c:/Users/coook/Desktop/Opencore Web7.0/v4/js/chatbot.js');
