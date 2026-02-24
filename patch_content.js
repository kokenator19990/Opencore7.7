const fs = require('fs');

['v3/js/chatbot.js', 'v4/js/chatbot.js'].forEach(file => {
    let content = fs.readFileSync('c:/Users/coook/Desktop/Opencore Web7.0/' + file, 'utf8');

    // Change meeting booking message
    content = content.replace(
        "Agendar Diagnóstico VIP (15 min)",
        "Ir al Formulario de Diagnóstico"
    );

    content = content.replace(
        "https://calendly.com/opencore-diagnostico",
        "#formulario-diagnostico"
    );

    // Re-adjust Cybersecurity logic
    content = content.replace(
        "Todo lo contrario. Para los clientes bajo SLA, garantizamos redundancia, copias de seguridad cada 2 horas y levantamiento de entornos paralelos en minutos (N8N dockerizado) si existiera un intento de contingencia o ataque. Nuestra arquitectura prioriza continuidad.",
        "Todo lo contrario. Para los clientes bajo SLA, garantizamos redundancia, copias de seguridad cada 2 horas y arquitecturas orientadas a servicios (microservicios), asegurando continuidad operativa total."
    );

    fs.writeFileSync('c:/Users/coook/Desktop/Opencore Web7.0/' + file, content, 'utf8');
    console.log("Updated form and security info in " + file);
});
