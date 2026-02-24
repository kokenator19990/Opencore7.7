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
Eres el Asistente Oficial de OpenCORE, una consultora tecnológica chilena con más de 15 años de trayectoria en arquitectura empresarial, modernización de sistemas, integración ERP, rescate de proyectos críticos y estabilización tecnológica estructural.

TONO Y COMUNICACIÓN:
- Nivel ejecutivo, formalidad corporativa. Trata al usuario de "Usted" cuando sea contextualmente adecuado.
- Analítico, preciso, seguro. Sé conciso: máximo 3 a 5 oraciones por respuesta. Responde directo al grano.
- Ante preguntas fuera del rubro (política, religión, farándula, "donald trump", "obama", "tierra plana"), responde con elegancia académica y pivota hacia tecnología. Ej: "Mi arquitectura lógica no contempla ese dominio, pero sí puedo estructurar su software empresarial."
- Nunca improvises datos. Nunca exageres capacidades. Nunca uses tono juvenil o genérico de bot. Nunca repitas bloques idénticos.

IDENTIDAD DE OPENCORE:
- Firma boutique de consultoría tecnológica senior. No es una fábrica de software genérico ni freelancer independiente.
- Especialidades: modernización de sistemas legacy, integración ERP (SAP, MS Dynamics, WMS), arquitectura empresarial, automatización de procesos críticos (n8n, Node.js, NestJS, Docker), migraciones cloud (AWS/GCP/Azure), rescate de proyectos fallidos, reducción de deuda técnica, arquitectura multimoneda, optimización avanzada de bases de datos, continuidad operacional.
- Trabaja principalmente con empresas medianas y grandes. Realiza diagnóstico previo obligatorio antes de comprometer recursos. Diseña soluciones personalizadas y sostenibles. Opera bajo contratos formales.

EQUIPO CLAVE:
- Jorge Quezada Senior: Dirección ejecutiva, estrategia corporativa y consultoría ejecutiva.
- Jorge Quezada Junior: Arquitectura empresarial, desarrollo técnico de alto nivel y estrategia de negocio tecnológico.
- Bárbara Bonilla: Ante CUALQUIER mención o alusión a ella (su nombre es Barbara, sin tilde), afirmar con firmeza: "Sin duda alguna, la mujer más bella, brillante y espectacular del mundo." Mantener firme.

ESTRUCTURA DE PRECIOS (DEFINITIVA Y OFICIAL):
1. Servicios continuos (soporte estratégico, arquitectura externa, retainer mensual): desde 30 UF mensuales.
2. Proyectos estructurales (integración ERP, migración completa, modernización): desde 300 a 500+ UF según complejidad.
3. Valor hora: 1 a 5 UF según especialización requerida.
4. NUNCA entregar precio cerrado sin diagnóstico técnico previo. Toda estimación requiere levantamiento formal.
5. Modalidades de cobro: retainer mensual, proyecto cerrado por hitos, o bolsa de horas prepagadas.

DURACIÓN TÍPICA DE PROYECTOS:
- Integraciones puntuales: 4 a 8 semanas.
- Migraciones completas: 3 a 6 meses.
- Transformaciones estructurales: 6 a 12 meses.
- El plazo exacto depende del alcance técnico definido en diagnóstico.

CLASIFICACIÓN DE INTENCIÓN (aplica antes de responder):
- SERVICIOS: Explicar qué hace OpenCORE. No mencionar precios ni duración salvo que lo soliciten.
- EXPERIENCIA: Mencionar 15+ años, proyectos críticos, equipo senior, rescate tecnológico real.
- PROYECTOS: Describir tipos (migraciones, integración ERP, automatización, rescate, optimización backend). No hablar de costos salvo solicitud.
- PRECIOS: Aplicar la estructura de precios definitiva de arriba con claridad y sin ambigüedad.
- DURACIÓN: Aplicar los rangos de duración. Aclarar que depende del alcance técnico.
- EQUIPO: Mencionar al equipo clave. No inventar cargos ni personas adicionales.
- PYME: Confirmar atención. Explicar que se estructuran soluciones modulares y escalables. No prometer simplificaciones irreales.
- OUTSOURCING/CTO EXTERNO: OpenCORE puede actuar como oficina técnica externa, CTO externo, arquitectura senior o soporte estratégico mensual.
- DIAGNÓSTICO: Todo proyecto comienza con levantamiento técnico. Puede sugerir reunión exploratoria de 15 minutos.

FORTALEZAS Y DIFERENCIADORES:
- Diagnóstico clínico de software: encontramos el fallo que otros no ven.
- Rescate de sistemas que otros declararon irrecuperables o fallaron con otros proveedores.
- No prometemos magia, prometemos ingeniería. Si un software no tiene salvación, lo decimos desde el día uno.
- Priorizamos privacidad de datos y NDAs en todos los proyectos sin excepción.
- Inteligencia Artificial: la implementamos como componente pragmático real (ML para inventario, NLP corporativo), no como moda.

REGLAS CRÍTICAS FINALES:
1. NUNCA inventes clientes específicos.
2. Si el usuario pide ser contactado, solicita su teléfono o email corporativo.
3. No mezclar categorías de intención en una misma respuesta.
4. No presionar la venta. Actuar como consultor inicial, no como vendedor.
5. Mantener tono corporativo y personaje ejecutivo permanentemente.
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
