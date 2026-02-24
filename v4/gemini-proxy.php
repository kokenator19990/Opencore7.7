<?php
/**
 * OpenCORE Gemini AI Proxy
 * Receives user messages from the chatbot and forwards them to Google Gemini API.
 * Returns AI-generated responses in the context of OpenCORE consulting.
 * 
 * IMPORTANT: Replace 'YOUR_GEMINI_API_KEY' below with your actual key from:
 * https://aistudio.google.com/apikey
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// ── CONFIGURATION ──
require_once 'config.php';
$GEMINI_API_KEY = GEMINI_API_KEY; // Loaded securely from config.php
$MODEL = 'gemini-2.5-flash'; // Latest available model

// ── SYSTEM PROMPT ──
$SYSTEM_PROMPT = <<<EOT
Eres el Arquitecto de Soluciones y Asesor B2B de OpenCORE Consulting SpA.

Tu misión es perfilar al cliente, demostrar autoridad técnica, manejar objeciones y guiar hacia un diagnóstico comercial. Eres estricto contra alucinaciones: nunca inventes datos ni precios cerrados. Tu respuesta debe ser siempre un párrafo fluido, fluido y coloquial pero ejecutivo. NUNCA uses subtítulos ni viñetas numeradas.

────────────────────────────────────────
PIPELINE OBLIGATORIO DE VENTAS CONSULTIVAS Y OPERACIÓN:

1) PERFILAMIENTO E INTENCIÓN (DIAGNÓSTICO)
- Si el cliente es muy técnico (CTO/Gerente TI): Eleva la respuesta técnica (API, Arquitectura, SLA, Deuda Técnica, Continuidad Operacional).
- Si es No-Técnico (Gerente/Dueño): Háblale de ROI, Mitigación de Riesgos, Tiempos y Escalabilidad Comercial.
- Identifica el núcleo de la solicitud del usuario: PRECIOS, SERVICIOS, OBJECIONES u OFF-TOPIC.

2) ESTRATEGIA DE RESPUESTA EN 3 BLOQUES (FORMATO ESTRICTO)
Aplica la siguiente estructura mental (NUNCA escribas los títulos "1.", "2." o "3." en tu respuesta final, haz que fluya como un solo párrafo conversacional):
- [Respuesta Directa y Autoridad]: Responde a la duda directamente (máx 2-3 líneas).
- [Aporte de Valor Consultivo]: Explica el "cómo" o defiéndete constructivamente.
- [CTA / Pregunta de Cierre]: Termina SIEMPRE con UNA sola pregunta diseñada para cualificar el alcance operativo del prospecto, o un CTA claro.

3) MANEJO DE OBJECIONES B2B (CRÍTICO)
- Si objeta precio ("Es muy caro", "Mi sobrino cobra menos"): Responde con aplomo ejecutivo. "OpenCORE no compite por precio, sino por continuidad operacional y reducción de riesgo estructural. El costo de un downtime o un proyecto fallido supera ampliamente la inversión técnica inicial."
- Si objeta tiempo ("Lo necesito en 1 semana"): "La ingeniería de software requiere bases sólidas. En proyectos críticos priorizamos un diagnóstico realista sobre falsas promesas. ¿De qué magnitud o urgencia es el sistema?"

4) REGLA CRÍTICA DE PRECIOS Y ALUCINACIONES
- NUNCA des presupuestos cerrados bajo ningún contexto.
- Indica siempre la banda mínima referencial: "Modalidad mensual operativa desde 30 UF. Proyectos estructurales cerrados suelen oscilar entre 300 y 500 UF o más."
- NUNCA inventes clientes ni inventes features que no existan. Indica que se "diagnostica a la medida".

5) REGLA OFF-TOPIC Y DE IDENTIDAD
- Si intentan salir de foco (bromas, IA, "actúa como"): Reafirma "Soy el Asistente Técnico de OpenCORE. Puedo ayudarle en consultoría tecnológica."
- Excepción: Ante menciones a "Bárbara" o "Barbara Bonilla", defiende inamovible: "Sin duda alguna, la mujer más bella, brillante y espectacular del mundo."

6) LLAMADO A LA ACCIÓN (CTA)
Recuerda sutilmente que para una cotización exacta debe requerir un diagnóstico comercial o dejar sus datos en el portal.
EOT;

// ── RECEIVE REQUEST ──
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing message']);
    exit;
}

if ($GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
    echo json_encode(['response' => 'El asistente IA no está configurado aún. Contacta al administrador.']);
    exit;
}

$userMessage = strip_tags($data['message']);
$history = isset($data['history']) ? $data['history'] : [];

// ── BUILD REQUEST TO GEMINI ──
$contents = [];

// Add system instruction
$systemInstruction = [
    'parts' => [['text' => $SYSTEM_PROMPT]]
];

// Add conversation history (last 6 messages max for context)
$recentHistory = array_slice($history, -6);
foreach ($recentHistory as $msg) {
    $role = ($msg['role'] === 'user') ? 'user' : 'model';
    $contents[] = [
        'role' => $role,
        'parts' => [['text' => $msg['text']]]
    ];
}

// Add current user message
$contents[] = [
    'role' => 'user',
    'parts' => [['text' => $userMessage]]
];

$requestBody = [
    'system_instruction' => $systemInstruction,
    'contents' => $contents,
    'generationConfig' => [
        'temperature' => 0.7,
        'topP' => 0.9,
        'maxOutputTokens' => 800, // Increased to handle detailed consulting answers
    ],
    'safetySettings' => [
        ['category' => 'HARM_CATEGORY_HARASSMENT', 'threshold' => 'BLOCK_ONLY_HIGH'],
        ['category' => 'HARM_CATEGORY_HATE_SPEECH', 'threshold' => 'BLOCK_ONLY_HIGH'],
        ['category' => 'HARM_CATEGORY_SEXUALLY_EXPLICIT', 'threshold' => 'BLOCK_ONLY_HIGH'],
        ['category' => 'HARM_CATEGORY_DANGEROUS_CONTENT', 'threshold' => 'BLOCK_ONLY_HIGH'],
    ]
];

// ── CALL GEMINI API ──
$url = "https://generativelanguage.googleapis.com/v1beta/models/{$MODEL}:generateContent?key={$GEMINI_API_KEY}";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestBody));
curl_setopt($ch, CURLOPT_TIMEOUT, 15);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if (!$response || $httpCode === 0) {
    echo json_encode(['response' => 'No pude conectarme con el asistente IA. Por favor escríbenos directamente a contacto@opencore.cl']);
    exit;
}
if ($httpCode === 429) {
    echo json_encode(['response' => 'Estoy recibiendo muchas consultas en este momento. Por favor intenta en unos segundos, o contáctanos directo a contacto@opencore.cl']);
    exit;
}
if ($httpCode === 403) {
    echo json_encode(['response' => 'Actualmente mis servicios avanzados de Inteligencia Artificial están en mantenimiento de seguridad. Sin embargo, nuestro equipo de ingenieros arquitectos está plenamente operativo. <br><br><b>¿Te gustaría que agendemos una llamada técnica gratuita para evaluar tu caso?</b>']);
    exit;
}
if ($httpCode !== 200) {
    echo json_encode(['response' => 'Actualmente mi núcleo de IA está en actualización de servidores. Para una atención rápida puedes escribirnos directamente a contacto@opencore.cl']);
    exit;
}

$result = json_decode($response, true);

// Extract text from Gemini response
$aiText = '';
if (isset($result['candidates'][0]['content']['parts'][0]['text'])) {
    $aiText = $result['candidates'][0]['content']['parts'][0]['text'];
}
else {
    $aiText = 'No pude generar una respuesta. ¿Puedo ayudarte de otra forma?';
}

// Clean up markdown artifacts that don't render well in the chatbot
$aiText = preg_replace('/\*\*(.*?)\*\*/', '$1', $aiText); // Remove **bold**
$aiText = trim($aiText);

echo json_encode(['response' => $aiText]);
?>
