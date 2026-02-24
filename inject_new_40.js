const fs = require('fs');

const extraQAs = [
    { q: "Hola, ¿qué ofrecen exactamente?", a: "Ofrecemos consultoría tecnológica especializada en arquitectura empresarial, modernización de sistemas legacy, integración ERP y automatización estructural de procesos. Nuestro enfoque no es vender software estándar, sino diseñar soluciones sostenibles alineadas con la operación real de cada organización." },
    { q: "Hola, ¿qué servicios me pueden vender?", a: "Más que vender servicios aislados, estructuramos intervenciones tecnológicas orientadas a resolver problemas de fondo: integración de plataformas, reducción de deuda técnica, optimización de bases de datos y estabilización de sistemas críticos." },
    { q: "Hola, quiero contratar sus servicios, ¿cómo funciona?", a: "El proceso comienza con un levantamiento técnico para comprender su arquitectura actual, nivel de madurez tecnológica y objetivos estratégicos. A partir de ello definimos alcance, modalidad contractual y plan de ejecución progresiva." },
    { q: "Hola, ¿qué tipo de proyectos desarrollan?", a: "Desarrollamos proyectos de modernización tecnológica, migraciones estructurales, integración entre sistemas heterogéneos y automatización empresarial. También intervenimos en rescate de proyectos con desviaciones técnicas o estructurales." },
    { q: "Hola, ¿pueden desarrollar una aplicación desde cero?", a: "Sí, siempre que exista una definición clara de objetivos funcionales y arquitectura futura. Diseñamos la solución desde la base considerando escalabilidad, seguridad, integración y sostenibilidad a largo plazo." },
    { q: "Hola, ¿qué precios manejan?", a: "Los valores dependen directamente de la especificidad, complejidad y extensión del proyecto. Contamos con modalidad mensual desde 30 UF para servicios continuos, mientras que proyectos estructurales se valorizan según evaluación técnica formal." },
    { q: "Hola, tengo una empresa pequeña, ¿pueden trabajar conmigo?", a: "Sí, evaluamos proyectos de PYMEs cuando existe una necesidad tecnológica estructural clara. En estos casos proponemos fases progresivas que permitan escalar de manera controlada." },
    { q: "Hola, tengo una empresa grande, ¿pueden manejar proyectos complejos?", a: "Nuestra estructura está diseñada precisamente para abordar entornos empresariales complejos. Dimensionamos el equipo y la arquitectura según la criticidad y el alcance del proyecto." },
    { q: "Hola, ¿son profesionales certificados?", a: "Nuestro equipo está conformado por profesionales con trayectoria comprobada en entornos tecnológicos empresariales. Más allá de certificaciones puntuales, priorizamos experiencia aplicada y resultados sostenibles." },
    { q: "Hola, ¿cuántas personas trabajan con ustedes?", a: "Contamos con un núcleo estable de entre 5 y 10 profesionales especializados, ampliable hasta 20 o 30 recursos según el tipo de proyecto y nivel de complejidad requerido." },
    { q: "¿Trabajan con Java?", a: "Sí, trabajamos con Java en proyectos que requieren robustez empresarial y arquitecturas escalables. Evaluamos cada caso según la estructura tecnológica existente del cliente." },
    { q: "¿Trabajan con Python?", a: "Utilizamos Python cuando el proyecto demanda automatización, procesamiento backend o integración específica. La elección tecnológica siempre responde a criterios estructurales y no a preferencias arbitrarias." },
    { q: "¿Trabajan con SQL y bases de datos complejas?", a: "Sí, tenemos experiencia en diseño, optimización e integración de bases de datos SQL en entornos empresariales de alta criticidad operativa." },
    { q: "¿Pueden trabajar con sistemas antiguos como COBOL?", a: "Sí, evaluamos integración y modernización progresiva de sistemas legacy, incluyendo entornos tradicionales que requieren transición controlada." },
    { q: "¿Pueden integrar múltiples sistemas distintos?", a: "Sí, diseñamos arquitectura interoperable mediante APIs, capas de integración y estandarización de datos, asegurando coherencia operativa." },
    { q: "¿Hacen mantenimiento mensual?", a: "Sí, ofrecemos modalidad de acompañamiento y soporte estratégico desde 30 UF mensuales, sujeto a evaluación técnica y alcance definido." },
    { q: "¿Pueden rescatar un proyecto que salió mal?", a: "Sí, analizamos técnicamente el estado actual del sistema, identificamos brechas estructurales y proponemos un plan de estabilización progresivo." },
    { q: "¿Cuánto tiempo dura un proyecto típico?", a: "Depende del alcance. Integraciones puntuales pueden tardar semanas, mientras que transformaciones estructurales pueden extenderse varios meses bajo planificación formal." },
    { q: "¿Trabajan en la nube o solo local?", a: "Podemos diseñar arquitecturas cloud, híbridas o on-premise según la infraestructura y estrategia tecnológica del cliente." },
    { q: "¿Son una empresa pequeña o grande?", a: "Somos una consultora especializada con estructura ejecutiva definida y capacidad escalable. Nuestra fortaleza está en enfoque técnico estructural más que en volumen indiscriminado." },
    { q: "¿Pueden garantizar resultados?", a: "Garantizamos metodología, supervisión técnica y ejecución profesional. Los resultados dependen también del contexto operativo y compromiso organizacional." },
    { q: "¿Qué los diferencia de otras consultoras?", a: "Nuestra especialización en modernización estructural y rescate de arquitecturas complejas nos diferencia de proveedores enfocados únicamente en desarrollo superficial." },
    { q: "¿Trabajan con ERP?", a: "Sí, intervenimos en integración, optimización y modernización de plataformas ERP existentes, asegurando coherencia con procesos financieros y operativos." },
    { q: "¿Hacen automatización de procesos?", a: "Sí, implementamos automatización administrativa, financiera y operativa cuando genera eficiencia medible y sostenibilidad técnica." },
    { q: "¿Son flexibles en sus propuestas?", a: "Adaptamos la solución a la necesidad real del cliente, manteniendo estándares técnicos y metodológicos claros." },
    { q: "¿Pueden trabajar con presupuesto limitado?", a: "Evaluamos alcance y proponemos fases progresivas que permitan avanzar sin comprometer calidad estructural." },
    { q: "¿Trabajan con integración contable multimoneda?", a: "Sí, diseñamos arquitectura financiera multimoneda e integración contable cuando el entorno empresarial lo requiere." },
    { q: "¿Manejan microservicios?", a: "Sí, utilizamos arquitectura de microservicios cuando aporta escalabilidad y separación lógica eficiente." },
    { q: "¿Hacen auditoría tecnológica?", a: "Sí, realizamos diagnóstico estructural para identificar brechas técnicas, riesgos operativos y oportunidades de mejora." },
    { q: "¿Pueden desarrollar aplicaciones móviles?", a: "Sí, siempre que estén integradas a una arquitectura empresarial robusta y no como solución aislada." },
    { q: "¿Qué pasa después de terminar el proyecto?", a: "Podemos ofrecer continuidad operacional bajo modalidad mensual o transferencia documentada de conocimiento." },
    { q: "¿Trabajan bajo contrato formal?", a: "Sí, toda intervención se formaliza contractualmente con alcance, responsabilidades y cronograma definidos." },
    { q: "¿Son solo desarrolladores o también consultores?", a: "Somos consultoría estratégica con capacidad de ejecución técnica especializada." },
    { q: "¿Pueden escalar si mi empresa crece?", a: "Diseñamos arquitectura escalable para acompañar crecimiento operativo futuro." },
    { q: "¿Qué tan seguros son sus desarrollos?", a: "Aplicamos buenas prácticas de seguridad estructural y validación técnica antes de despliegue." },
    { q: "¿Trabajan con APIs externas?", a: "Sí, diseñamos integración controlada entre sistemas internos y plataformas externas." },
    { q: "¿Pueden mejorar rendimiento de mi base de datos?", a: "Sí, realizamos optimización estructural, indexación y rediseño lógico cuando es necesario." },
    { q: "¿Trabajan con proyectos internacionales?", a: "Evaluamos cada caso según alcance técnico y estructura operativa requerida." },
    { q: "¿Pueden desarrollar dashboards ejecutivos?", a: "Sí, diseñamos reportes estructurados alineados con métricas operativas y financieras." },
    { q: "¿Son realmente expertos o solo dicen serlo?", a: "Nuestra experiencia se sustenta en años de intervención en sistemas reales y entornos empresariales críticos, no en declaraciones comerciales." }
];

const injectBlock = extraQAs.map(item => "  { q: " + JSON.stringify(item.q) + ", a: " + JSON.stringify(item.a) + " }").join(",\n") + ",\n";

['v3/js/chatbot.js', 'v4/js/chatbot.js'].forEach(file => {
    let content = fs.readFileSync('c:/Users/coook/Desktop/Opencore Web7.0/' + file, 'utf8');

    const targetTag = '// ═══ ESCENARIOS COMBINADOS: HOLA + PREGUNTA ═══';
    if (content.includes(targetTag) && !content.includes('¿Pueden mejorar rendimiento de mi base de datos?')) {
        content = content.replace(targetTag, "// ═══ RESOLUCIÓN Y EXPERIENCIA (Nuevas) ═══\n" + injectBlock + "\n  " + targetTag);
    }

    const newNormalize = "function normalize(str) {\n" +
        "  let s = str.toLowerCase()\n" +
        "    .normalize(\"NFD\").replace(/[\\u0300-\\u036f]/g, \"\")\n" +
        "    .replace(/[^\\w\\s]/gi, \" \");\n" +
        "  \n" +
        "  // Separar saludos pegados a la pregunta (ej: \"holaque\", \"buenastardesque\")\n" +
        "  s = s.replace(/^(hola|ola|wena|buenas?)(que|q|como|komo|cuanto|cual|kual|quien|kien|qn|tienen|ofrecen|pueden|necesito|quiero|me)\\b/ig, \"$1 $2 \");\n" +
        "  s = s.replace(/^(buenas?\\s?tardes|buenas?\\s?noches|buenos?\\s?dias)(que|q|como|komo|cuanto|cual|kual|quien|kien|qn|tienen|ofrecen|pueden|necesito|quiero|me)\\b/ig, \"$1 $2 \");\n" +
        "  \n" +
        "  return s.replace(/\\s+/g, \" \").trim();\n" +
        "}";

    if (!content.includes('s.replace(/^(hola|ola|wena|buenas?)(que')) {
        content = content.replace(/function normalize\(str\) \{[\s\S]*?trim\(\);\n\}/, newNormalize);
    }

    fs.writeFileSync('c:/Users/coook/Desktop/Opencore Web7.0/' + file, content, 'utf8');
});

console.log("Injected 40 queries and updated normalize() successfully.");
