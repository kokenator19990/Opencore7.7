const fs = require('fs');

['v3/js/chatbot.js', 'v4/js/chatbot.js'].forEach(file => {
    let content = fs.readFileSync('c:/Users/coook/Desktop/Opencore Web7.0/' + file, 'utf8');

    // Strip exact newlines for a more robust replace using regex
    const replacements = [
        {
            regex: /Desarrollamos proyectos de modernización tecnológica, migraciones estructurales, integración entre sistemas heterogéneos y automatización empresarial\. También intervenimos en rescate de proyectos con desviaciones técnicas o estructurales\./g,
            new: "Desarrollamos proyectos de modernización tecnológica, migraciones estructurales, integración de sistemas y automatización empresarial. ¿Qué desafío tecnológico específico buscan resolver en su empresa?"
        },
        {
            regex: /Implementamos soluciones robustas: migraciones legacy a Cloud, integración de ERPs, automatización y rescate de sistemas críticos\./g,
            new: "Implementamos soluciones robustas: migraciones a Cloud, integración de ERPs y rescate de sistemas críticos. ¿Qué problemática exacta están enfrentando actualmente?"
        },
        {
            regex: /Nuestra especialidad son los proyectos estructurales complejos: migraciones, integraciones y modernización de código legacy\./g,
            new: "Nuestra especialidad son los proyectos estructurales complejos: migraciones, integraciones y modernización de plataformas legacy. ¿Podría darnos un poco de contexto sobre su necesidad?"
        },
        {
            regex: /Asumimos proyectos End-to-End, desde auditoría y arquitectura hasta desarrollo y soporte continuo post-producción\./g,
            new: "Asumimos proyectos críticos End-to-End, desde arquitectura hasta el desarrollo y soporte. Cuéntenos, ¿qué buscan lograr o qué problema quieren solucionar?"
        }
    ];

    let qnaCount = 0;
    replacements.forEach(r => {
        if (r.regex.test(content)) {
            content = content.replace(r.regex, r.new);
            qnaCount++;
        }
    });
    console.log("Replaced " + qnaCount + " Q&A conversational responses via Regex in " + file);

    fs.writeFileSync('c:/Users/coook/Desktop/Opencore Web7.0/' + file, content, 'utf8');
});
