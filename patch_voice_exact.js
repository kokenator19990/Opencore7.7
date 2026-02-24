const fs = require('fs');

['v3/js/chatbot.js', 'v4/js/chatbot.js'].forEach(file => {
    let content = fs.readFileSync('c:/Users/coook/Desktop/Opencore Web7.0/' + file, 'utf8');

    const replacements = [
        {
            old: "No. También integramos, auditamos, optimizamos y desarrollamos sistemas empresariales complejos.",
            new: "No. También integramos, auditamos, optimizamos y desarrollamos sistemas empresariales complejos. ¿Qué desafío tecnológico específico busca resolver?"
        },
        {
            old: "No es nuestro foco principal. Nos especializamos en sistemas empresariales críticos y procesos complejos.",
            new: "No es nuestro foco principal. Nos especializamos en sistemas empresariales críticos y procesos complejos. ¿Qué problemática exacta enfrenta en su operación?"
        },
        {
            old: "Sí. Evaluamos técnicamente el estado del sistema y proponemos plan de estabilización.",
            new: "Sí. Evaluamos técnicamente el estado del sistema y proponemos plan de estabilización. ¿Podría darnos un poco de contexto sobre el sistema que necesita intervenir?"
        },
        {
            old: "Sí. Ejecutamos migraciones completas o híbridas según estrategia del cliente.",
            new: "Sí. Ejecutamos migraciones completas o híbridas según estrategia del cliente. Cuéntenos, ¿cuál es su problema operativo principal actual?"
        }
    ];

    let qnaCount = 0;
    replacements.forEach(r => {
        if (content.includes(r.old)) {
            content = content.replace(r.old, r.new);
            qnaCount++;
        }
    });
    console.log("Replaced " + qnaCount + " exact Q&A conversational responses in " + file);

    fs.writeFileSync('c:/Users/coook/Desktop/Opencore Web7.0/' + file, content, 'utf8');
});
