const fs = require('fs');

['v3/js/chatbot.js', 'v4/js/chatbot.js'].forEach(file => {
    let content = fs.readFileSync('c:/Users/coook/Desktop/Opencore Web7.0/' + file, 'utf8');

    // 1. Force VAD update using Regex across newlines
    content = content.replace(
        /if\s*\(\s*final\s*\)\s*\{\s*vadTimer\s*=\s*setTimeout\s*\(\s*\(\s*\)\s*=>\s*\{\s*stopRecording\s*\(\s*true\s*\)\s*;\s*\}\s*,\s*1800\s*\)\s*;\s*\}/g,
        `if (final.trim().length > 0) {
        vadTimer = setTimeout(() => {
          if (typeof isRecording !== 'undefined' && isRecording) stopRecording(true);
        }, 1800);
      }`
    );

    // 2. Add Project Conversational Replacements using regex for exact matches ignoring spacing
    const replacements = [
        {
            regex: /No\. También integramos, auditamos, optimizamos y desarrollamos sistemas empresariales complejos\./g,
            new: "No. También integramos, auditamos, optimizamos y desarrollamos sistemas empresariales complejos. ¿Qué desafío tecnológico específico busca resolver?"
        },
        {
            regex: /No es nuestro foco principal\. Nos especializamos en sistemas empresariales críticos y procesos complejos\./g,
            new: "No es nuestro foco principal. Nos especializamos en sistemas empresariales críticos y procesos complejos. ¿Qué problemática exacta enfrenta en su operación?"
        },
        {
            regex: /Sí\. Evaluamos técnicamente el estado del sistema y proponemos plan de estabilización\./g,
            new: "Sí. Evaluamos técnicamente el estado del sistema y proponemos plan de estabilización. ¿Podría darnos un poco de contexto sobre el sistema que necesita intervenir?"
        },
        {
            regex: /Sí\. Ejecutamos migraciones completas o híbridas según estrategia del cliente\./g,
            new: "Sí. Ejecutamos migraciones completas o híbridas según estrategia del cliente. Cuéntenos, ¿cuál es su problema operativo principal actual?"
        }
    ];

    let qnaCount = 0;
    replacements.forEach(r => {
        if (r.regex.test(content)) {
            content = content.replace(r.regex, r.new);
            qnaCount++;
        }
    });

    // 3. Add Fortalezas and Debilidades directly to the array
    const strengthsQA = `
  // ═══ OPENCORE OFICIAL: FORTALEZAS Y DEBILIDADES ═══
  { q: "¿Cuáles son sus fortalezas?", a: "Nuestras fortalezas radican en un equipo compuesto por profesionales altamente capacitados técnica y estratégicamente, experiencia probada en mercado B2B, metodologías orientadas a continuidad operacional e integración fluida de IA y herramientas automatizadas para escalar." },
  { q: "Quiero saber sus fortalezas", a: "Nuestras fortalezas son la alta capacitación de nuestro equipo senior, la especialización en migraciones y arquitectura compleja sin detener operaciones, y nuestra fluidez técnica en lenguajes modernos y heredados." },
  { q: "Dime las fortalezas de OpenCORE", a: "Nuestras principales fortalezas son: profesionales senior altamente validados en el mercado, experiencia robusta en arquitecturas empresariales, y metodologías sólidas de prevención de riesgos técnicos." },
  { q: "¿Cuáles son sus debilidades?", a: "Nuestros servicios tienen un enfoque Senior orientado a sistemas críticos y empresariales, por lo que no solemos abordar presupuestos o proyectos micro-pyme tradicionales. Sin embargo, mitigamos esto escalando metodologías con nuevas herramientas de IA y automatización para ser más flexibles." },
  { q: "Dime las debilidades de OpenCORE", a: "Un desafío constante es que nuestro análisis y arquitectura es de un estándar muy senior, lo que no siempre encaja con presupuestos pequeños. Lo compensamos utilizando IA y optimización de flujos para entregar valor rápido." },
  `;

    if (!content.includes("FORTALEZAS Y DEBILIDADES")) {
        content = content.replace(
            "// ═══ OPENCORE OFICIAL: OPERACIÓN (31-40) ═══",
            strengthsQA + "\\n  // ═══ OPENCORE OFICIAL: OPERACIÓN (31-40) ═══"
        );
    }

    console.log("Replaced " + qnaCount + " exact Q&A conversational responses in " + file);
    fs.writeFileSync('c:/Users/coook/Desktop/Opencore Web7.0/' + file, content, 'utf8');
});
