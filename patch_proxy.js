const fs = require('fs');

const files = [
    'c:/Users/coook/Desktop/Opencore Web7.0/v3/gemini-proxy.php',
    'c:/Users/coook/Desktop/Opencore Web7.0/v4/gemini-proxy.php',
    'c:/Users/coook/Desktop/Opencore Web7.0/v5/gemini-proxy.php'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // FIX 1: The Prompt explicit format instructions
    const oldPrompt = `2) ESTRATEGIA DE RESPUESTA EN 3 BLOQUES (FORMATO ESTRICTO)
1. Respuesta Directa y Autoridad: Responde a la duda directamente (máx 2-3 líneas).
2. Aporte de Valor (Consultivo): Explica el "cómo" o defiéndete ("OpenCORE se enfoca en sistemas críticos...").
3. CTA / Pregunta de Cierre: Termina SIEMPRE con UNA sola pregunta diseñada para cualificar el alcance operativo del prospecto, o un CTA claro.`;

    const newPrompt = `2) ESTRATEGIA DE RESPUESTA EN 3 BLOQUES (FORMATO ESTRICTO)
Aplica la siguiente estructura mental (NUNCA escribas los títulos "1.", "2." o "3." en tu respuesta final, haz que fluya como un solo párrafo conversacional):
- [Respuesta Directa y Autoridad]: Responde a la duda directamente (máx 2-3 líneas).
- [Aporte de Valor Consultivo]: Explica el "cómo" o defiéndete constructivamente.
- [CTA / Pregunta de Cierre]: Termina SIEMPRE con UNA sola pregunta diseñada para cualificar el alcance operativo del prospecto, o un CTA claro.`;

    content = content.replace(oldPrompt, newPrompt);

    // Minor addition to enforce hiding bullet points
    if (!content.includes('NUNCA uses subtítulos ni viñetas numeradas')) {
        content = content.replace(
            /(Tu misión es perfilar al cliente.*?)$/m,
            "$1 Tu respuesta debe ser siempre un párrafo fluido, fluido y coloquial pero ejecutivo. NUNCA uses subtítulos ni viñetas numeradas."
        );
    }

    // FIX 2: Handle 403 Error Leaked API Key
    const oldErrBlock = `if ($httpCode !== 200) {
    echo json_encode(['response' => "Error de API Gemini ($httpCode): " . $response]);
    exit;
}`;

    const newErrBlock = `if ($httpCode === 403) {
    echo json_encode(['response' => 'Por motivos de seguridad, los servicios avanzados de Inteligencia Artificial están en mantenimiento momentáneo. Sin embargo, nuestro equipo de ingenieros arquitectos está plenamente operativo. <br><br><b>¿Te gustaría que agendemos una llamada técnica gratuita para ver tu caso?</b>']);
    exit;
}
if ($httpCode !== 200) {
    echo json_encode(['response' => 'Actualmente mi núcleo de IA está en actualización de servidores. Para una atención rápida puedes escribirnos directamente a contacto@opencore.cl']);
    exit;
}`;

    content = content.replace(oldErrBlock, newErrBlock);

    fs.writeFileSync(file, content, 'utf8');
    console.log("Patched proxy: " + file);
});
