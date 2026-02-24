<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Receive JSON data from the chatbot
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data || !isset($data['tipo']) || !isset($data['dato'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
    exit;
}

$tipo = strip_tags($data['tipo']);
$dato = strip_tags($data['dato']);
$origen = isset($data['pagina']) ? strip_tags($data['pagina']) : 'Desconocido';
$fecha = date('d-m-Y H:i:s');

$to = 'contacto@opencore.cl';
$subject = 'Nuevo Lead Web - OpenCORE Chatbot';

$message = "
<html>
<head>
  <title>Nuevo Lead - OpenCORE</title>
</head>
<body style='font-family: Arial, sans-serif; color: #333;'>
  <div style='max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;'>
    <h2 style='color: #00c2ff; border-bottom: 2px solid #00c2ff; padding-bottom: 10px;'>Nuevo Lead Capturado</h2>
    <p>El chatbot web acaba de registrar un nuevo contacto:</p>
    <table style='width: 100%; border-collapse: collapse; margin-top: 20px;'>
      <tr>
        <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;'>Tipo de Contacto:</td>
        <td style='padding: 10px; border-bottom: 1px solid #eee;'>" . ($tipo == 'phone' ? 'Teléfono' : 'Email') . "</td>
      </tr>
      <tr>
        <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Dato:</td>
        <td style='padding: 10px; border-bottom: 1px solid #eee; font-size: 16px; color: #000; font-weight: bold;'>" . $dato . "</td>
      </tr>
      <tr>
        <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Fecha y Hora:</td>
        <td style='padding: 10px; border-bottom: 1px solid #eee;'>" . $fecha . "</td>
      </tr>
      <tr>
        <td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Página de Origen:</td>
        <td style='padding: 10px; border-bottom: 1px solid #eee;'>" . $origen . "</td>
      </tr>
    </table>
    <br>
    <p style='font-size: 12px; color: #777;'>Mensaje generado automáticamente por el Asistente OpenCORE.</p>
  </div>
</body>
</html>
";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: OpenCORE Bot <no-reply@opencore.cl>" . "\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo json_encode(['status' => 'success', 'message' => 'Email sent']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Mail function failed']);
}
?>
