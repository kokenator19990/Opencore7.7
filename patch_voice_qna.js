const fs = require('fs');

['v3/js/chatbot.js', 'v4/js/chatbot.js'].forEach(file => {
    let content = fs.readFileSync('c:/Users/coook/Desktop/Opencore Web7.0/' + file, 'utf8');

    // 1. Voice Mode Bugfix
    const oldVadLogic = '      // VAD: auto-stop and send after 1.8s of silence with confirmed speech\\n      if (final) {\\n        vadTimer = setTimeout(() => {\\n          stopRecording(true);\\n        }, 1800);\\n      }';

    const newVadLogic = '      // VAD: auto-stop and send after 1.8s of silence with confirmed speech\\n      if (final.trim().length > 0) {\\n        vadTimer = setTimeout(() => {\\n          if (isRecording) stopRecording(true);\\n        }, 1800);\\n      }';

    if (content.includes('if (final) {\\r\\n        vadTimer = setTimeout(() => {\\r\\n          stopRecording(true);\\r\\n        }, 1800);\\r\\n      }')) {
        // CRLF
        content = content.replace('if (final) {\\r\\n        vadTimer = setTimeout(() => {\\r\\n          stopRecording(true);\\r\\n        }, 1800);\\r\\n      }', 'if (final.trim().length > 0) {\\r\\n        vadTimer = setTimeout(() => {\\r\\n          if (isRecording) stopRecording(true);\\r\\n        }, 1800);\\r\\n      }');
        console.log("Updated VAD logic (CRLF) in " + file);
    } else if (content.includes('if (final) {\\n        vadTimer = setTimeout(() => {\\n          stopRecording(true);\\n        }, 1800);\\n      }')) {
        // LF
        content = content.replace('if (final) {\\n        vadTimer = setTimeout(() => {\\n          stopRecording(true);\\n        }, 1800);\\n      }', 'if (final.trim().length > 0) {\\n        vadTimer = setTimeout(() => {\\n          if (isRecording) stopRecording(true);\\n        }, 1800);\\n      }');
        console.log("Updated VAD logic (LF) in " + file);
    }

    // 2. Refine Q&A
    const replacements = [
        {
            old: "Desarrollamos proyectos de modernización tecnológica, migraciones estructurales, integración entre sistemas heterogéneos y automatización empresarial. También intervenimos en rescate de proyectos con desviaciones técnicas o estructurales.",
            new: "Desarrollamos proyectos de modernización tecnológica, migraciones estructurales, integración de sistemas y automatización empresarial. ¿Qué desafío tecnológico específico buscan resolver en su empresa?"
        },
        {
            old: "Implementamos soluciones robustas: migraciones legacy a Cloud, integración de ERPs, automatización y rescate de sistemas críticos.",
            new: "Implementamos soluciones robustas: migraciones a Cloud, integración de ERPs y rescate de sistemas críticos. ¿Qué problemática exacta están enfrentando actualmente?"
        },
        {
            old: "Nuestra especialidad son los proyectos estructurales complejos: migraciones, integraciones y modernización de código legacy.",
            new: "Nuestra especialidad son los proyectos estructurales complejos: migraciones, integraciones y modernización de plataformas legacy. ¿Podría darnos un poco de contexto sobre su necesidad?"
        },
        {
            old: "Asumimos proyectos End-to-End, desde auditoría y arquitectura hasta desarrollo y soporte continuo post-producción.",
            new: "Asumimos proyectos críticos End-to-End, desde arquitectura hasta el desarrollo y soporte. Cuéntenos, ¿qué buscan lograr o qué problema quieren solucionar?"
        }
    ];

    let qnaCount = 0;
    replacements.forEach(r => {
        if (content.includes(r.old)) {
            content = content.replace(r.old, r.new);
            qnaCount++;
        }
    });
    console.log("Replaced " + qnaCount + " Q&A conversational responses in " + file);

    fs.writeFileSync('c:/Users/coook/Desktop/Opencore Web7.0/' + file, content, 'utf8');
});
