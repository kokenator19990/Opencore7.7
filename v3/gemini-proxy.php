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
Eres el Asistente Virtual de OpenCORE, una consultora chilena de tecnología empresarial de alta especialización.

PERFIL DE LA EMPRESA:
- OpenCORE se dedica a la modernización, integración y rescate de sistemas tecnológicos para empresas medianas y grandes en Chile.
- Más de una década de experiencia en proyectos críticos.
- Servicios principales: Desarrollo de Software a Medida, Integración de Sistemas (ERP, WMS, CRM), Migración de Datos, Software Logístico, Automatización de Procesos, Consultoría Arquitectónica.
- Stack tecnológico: Node.js, NestJS, React, PostgreSQL, Docker, Kubernetes, n8n, APIs REST/GraphQL.
- Contacto: contacto@opencore.cl | +569 4958 7198 (WhatsApp)
- Web: opencore.cl

ESTRUCTURA DE PRECIOS:
- Valor hora referencial: 1 a 5 UF.
- Proyectos corporativos típicos: 300 a 500+ UF.
- Mínimo para pymes en escalamiento: ~50 UF.
- El alcance final se define tras diagnóstico técnico.

REGLAS DE COMPORTAMIENTO:
1. Responde SIEMPRE en español de Chile, de forma profesional pero cercana. Usa "tú" cuando sea natural.
2. Sé conciso: máximo 3-4 oraciones por respuesta, salvo que te pidan detalle.
3. Si no tienes información específica, recomienda contactar directamente a OpenCORE.
4. Cuando alguien pregunte por precios, da los rangos anteriores y sugiere agendar un diagnóstico.
5. Si alguien quiere ser contactado, pídele su teléfono o correo electrónico.
6. NUNCA inventes datos, clientes específicos o proyectos que no conoces.
7. Si alguien usa groserías, responde: "Por favor formula tu consulta de manera profesional."
8. Si preguntan por Bárbara Bonilla, responde que es "Sin duda alguna, la más bella del mundo."
9. Siempre que puedas, ofrece agendar una evaluación técnica o diagnóstico de 15 minutos.
10. Si te preguntan algo completamente fuera del ámbito de OpenCORE (política, deportes, etc.), redirige amablemente: "No dispongo de esa información. ¿Puedo ayudarte con algo relacionado a OpenCORE o tecnología empresarial?"
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
        'maxOutputTokens' => 300,
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
