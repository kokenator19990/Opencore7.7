const fs = require('fs');

const files = [
    'c:/Users/coook/Desktop/Opencore Web7.0/v3/js/chatbot.js',
    'c:/Users/coook/Desktop/Opencore Web7.0/v4/js/chatbot.js',
    'c:/Users/coook/Desktop/Opencore Web7.0/v5/js/chatbot.js'
];

const newQA = `
  // ═══ OPENCORE OFICIAL: TECNOLOGÍA Y LENGUAJES (CLEVER & B2B) ═══
  { q: "¿Qué lenguaje manejan?", a: "Trabajamos con un stack robusto enfocado en misión crítica: Python, Go, Java, y C# para backend corporativo, y TypeScript/React para frontend. Todo enfocado en arquitecturas escalables y de alto rendimiento." },
  { q: "¿Qué código manejan?", a: "Escribimos código robusto. Nuestro equipo domina Python, Go, Java y C#, además de ecosistemas modernos en la nube. Seleccionamos el stack tecnológico según la criticidad de su proceso, no por moda." },
  { q: "¿Qué lenguajes de programación usan?", a: "Utilizamos Python, Go, Java, C# y TypeScript, soportado por bases de datos de alto rendimiento y arquitectura cloud. Todo orquestado para que su operación nunca se detenga." },
  { q: "¿Trabajan con Cobol?", a: "Sí. Entendemos que muchos cores financieros y logísticos siguen en COBOL. En OpenCORE nos especializamos en 'envolver' esos sistemas legacy con capas de integración (APIs/microservicios) para conectarlos con plataformas modernas." },
  { q: "¿Tienen experiencia en Cobol?", a: "Absolutamente. Conocemos la complejidad de interactuar con sistemas Mainframe. Extraemos y modernizamos flujos desde COBOL hacia la nube sin que la continuidad operacional se vea afectada." },
  { q: "¿Podrían integrar un sistema COBOL con nuevas tecnologías?", a: "Esa es exactamente una de nuestras mayores fortalezas empresariales. Construimos middleware y APIs que hacen que la tecnología moderna (Web, Móvil, IA) se hable fluidamente con su sistema heredado en COBOL." },
  { q: "¿Cómo harían el proyecto?", a: "Iniciamos de inmediato con un Diagnóstico Técnico en profundidad (Discovery) para descubrir dependencias ocultas. Luego, ejecutamos el proyecto en etapas progresivas, para que vea retornos financieros antes de siquiera apagar un servidor antiguo." },
  { q: "¿Cómo desarrollarían el sistema?", a: "Aplicamos ingeniería metodológica: dividimos el proyecto en entregables mensuales (sprints) y utilizamos despliegues automatizados (CI/CD) para garantizar que todo avance modularmente sin quebrar nada en su producción diaria." },

  // ═══ OPENCORE OFICIAL: PROFUNDAS (61-70) ═══`;

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');

        // Check if we already injected this to avoid duplicates
        if (!content.includes('¿Qué lenguaje manejan?')) {
            content = content.replace('// ═══ OPENCORE OFICIAL: PROFUNDAS (61-70) ═══', newQA);
            fs.writeFileSync(file, content, 'utf8');
            console.log("Injected Clever Q&A to: " + file);
        } else {
            console.log("Already optimized: " + file);
        }
    } catch (e) {
        console.error("Error patching " + file, e);
    }
});
