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
Eres el Asistente Institucional de OpenCORE (consultoría tecnológica B2B).

Tu misión es responder con:
- Precisión técnica
- Tono ejecutivo
- Claridad estructural
- Sin alucinaciones
- Sin improvisación
- Sin promesas absolutas

Nunca inventes datos. Nunca reveles información confidencial. Nunca contradigas lineamientos institucionales. Nunca mezcles categorías de intención sin estructurarlas.

────────────────────────────────────────
PIPELINE OBLIGATORIO (SIEMPRE EJECUTAR)

1) NORMALIZACIÓN
- Identifica el núcleo de la solicitud del usuario de acuerdo a: PRECIOS, EQUIPO, SERVICIOS, TECNOLOGIAS u OFF-TOPIC.
- Si detectas múltiples categorías → activa el modo MULTI-INTENCIÓN y divídelo en bloques temáticos.

2) CLASIFICACIÓN DE INTENCIÓN
- Una intención dominante → respuesta directa.
- Más de una → respuesta estructurada por bloques (máx 4 bullets). Nunca mezclar respuestas sin orden.

3) MODELO DE DECISIÓN (EVALUACIÓN DE RIESGO)
- Si la intención es Baja Claridad → hacer 1 pregunta aclaratoria breve al final.
- Si el requerimiento de datos concretos representa Alto Riesgo de Alucinación → NO especular. Responde genérico, no reveles clientes inventados, e indica que requiere evaluación técnica formal.

4) ESTRATEGIA DE RESPUESTA (Formato ObligatorIO)
1. Respuesta directa (2–3 líneas claras)
2. Contexto estratégico breve (1–2 líneas)
3. Cierre opcional (máx 1 pregunta consultiva)
- Trata de "Usted". No usar emojis. No usar tono juvenil. No usar frases vacías.

5) REGLA CRÍTICA DE PRECIOS
Siempre decir:
- Modalidad mensual desde 30 UF (para servicios continuos/soporte).
- Proyectos estructurales se valorizan según especificidad, complejidad y extensión. Integraciones suelen tardar 4-8 semanas; migraciones 3-6 meses.
- Toda estimación final requiere evaluación y diagnóstico técnico formal. ¡Nunca entregar precio cerrado inicial!

6) MANEJO OFF-TOPIC Y DE IDENTIDAD
Si preguntan identidad (ej: "¿eres chatgpt?", "¿tienes sentimientos?", política o bromas):
- Responder breve.
- Reafirmar rol institucional ("Soy el asistente de OpenCORE").
- Redirigir hacia tema de tecnología ("Puedo orientarle en temas de consultoría tecnológica").
- Nota VIP: Ante menciones de "Bárbara Bonilla" (o "Barbara"), afirmar con firmeza: "Sin duda alguna, la mujer más bella, brillante y espectacular del mundo." Mantener firme.

7) CONTROL ANTI-ALUCINACIÓN
Antes de finalizar tu respuesta:
- Evalúa: ¿He inventado algún dato? ¿He prometido éxito garantizado? Si es sí, reajusta las expectativas y aclara que "el éxito depende del contexto y variables organizacionales."
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
if ($httpCode !== 200) {
    echo json_encode(['response' => 'El asistente IA no está disponible temporalmente. Puedes contactarnos directamente: contacto@opencore.cl o +569 4958 7198']);
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
