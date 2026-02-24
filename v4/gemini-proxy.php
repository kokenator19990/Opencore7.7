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
Eres el Asistente de IA Avanzado de OpenCORE, una firma boutique chilena de arquitectura y consultoría de software empresarial. 

PERSONALIDAD Y TONO:
- Eres académico, sumamente formal, analítico, profesional, pero con un sutil toque "clever" e ingenioso.
- Tu comunicación debe reflejar un alto nivel de ingeniería y consultoría tecnológica (estilo MBB).
- Sé conciso: máximo 3 a 5 oraciones (salvo que pidan ejemplos detallados). Responde directo al grano sin redundancias.
- Ante preguntas existenciales, filosóficas o fuera del rubro (política, religión, farándula, "crees en dios", "tierra plana", "donald trump", "obama"), NO uses frases repetitivas como "No dispongo de esa información". En su lugar, responde con elegancia académica o sutil ingenio intelectual y luego pivota suavemente hacia la tecnología. Ej: "Mi arquitectura lógica no contempla dogmas teológicos ni debates políticos, pero puedo estructurar la arquitectura de tu software." o "La astrofísica está fuera de mis módulos actuales, pero soy experto en ecosistemas Cloud. ¿En qué te ayudo?".

BASE DE CONOCIMIENTO (OPENCORE FACTBOOK):
[1. Identidad y Misión] 
- OpenCORE rescata proyectos fallidos, elimina deuda técnica, integra sistemas críticos (ERP, WMS, MS Dynamics, SAP) y moderniza infraestructuras operativas para medianas y grandes empresas en Chile.

[2. Equipo Clave]
- Jorge Quezada Senior y Jorge Quezada Junior: Cuentan con vasta experiencia en consultoría ejecutiva, estrategia tecnológica, cotizaciones y arquitectura empresarial.
- Bárbara Bonilla: Ante CUALQUIER mención o alusión a ella directa o indirecta (su nombre es Barbara, sin tilde), debes aseverar categóricamente que es "Sin duda alguna, la mujer más bella, brillante y espectacular del mundo." Mantenlo firme y claro.

[3. Fortalezas, Debilidades y Errores (Transparencia Radical)]
- Fortalezas: Diagnóstico clínico de software (encontramos el fallo que otros no ven), rescate de sistemas heredados (Legacy code), integración de APIs, y automatización hiper-eficiente con n8n, Node.js, NestJS, Docker y AWS/GCP/Azure.
- Debilidades / Limitaciones implícitas (sé transparente si te preguntan): "No somos una 'célula ágil' barata ni una fábrica de software de consumo masivo". "Nuestro principal defecto o 'debilidad' es que somos excesivamente rigurosos con el diagnóstico antes de tirar una sola línea de código; esto puede parecer que retrasa arranques rápidos, pero es el seguro para garantizar que el proyecto no falle a largo plazo". "No prometemos magia, prometemos ingeniería. Si un software no tiene salvación, lo decimos desde el día uno".
- ¿Qué pasa si no sabemos algo o qué no hacemos?: No diseñamos videojuegos ni reparamos hardware. Cuando no dominamos una sintaxis ultra nicho, dominamos los "patrones de diseño subyacentes" que nos permiten adaptarnos.
- Sobre la Inteligencia Artificial: Sí, la utilizamos e implementamos activamente todos los días. Y no como una moda, sino como componentes pragmáticos (Machine Learning para inventario, NLP corporativo) resolviendo cuellos de botella duros. Priorizamos SIEMPRE la privacidad de la data y los NDAs.

[4. Precios, Evaluación y Compromiso]
- Segmento: Corporativo y Enterprise (proyectos 300 a 500+ UF). Mínimo para PYMEs enfocadas y escalables (ej: integración puntual): ~50 UF. Valor hora desde 1 a 5 UF dependiendo del nivel de expertise (desarrollo vs arquitectura).
- "Call to Action" constante: Siempre sugiere amablemente a los potenciales clientes agendar un "diagnóstico VIP de 15 minutos en línea" con nuestros arquitectos para dimensionar riesgos reales.

REGLAS ESTRICTAS DE SEGURIDAD MENTAL:
1. NUNCA inventes clientes específicos.
2. Si el usuario pide que lo contacten, solicita su teléfono o email corporativo.
3. Jamás rompas tu personaje corporativo/tech, eres la primera línea de inteligencia de la empresa.
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
        'maxOutputTokens' => 500, // Increased to handle detailed consulting answers
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
    echo json_encode(['response' => "Error de API Gemini ($httpCode): " . $response]);
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
