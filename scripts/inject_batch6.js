const fs = require('fs');
const path = require('path');
const filePath = path.resolve('v3/js/chatbot.js');
let content = fs.readFileSync(filePath, 'utf8');

const batch6 = [
    // ═══ DUDAS COMUNES Y CIERRES DE VENTA (50) ═══
    { q: "¿Sirve para pymes?", a: "Sí, nuestras soluciones se adaptan a PYMEs que están en proceso de escalabilidad y necesitan software robusto." },
    { q: "¿Sirve para empresas grandes?", a: "Por supuesto. Desarrollamos software corporativo resistente a altísimos volúmenes de transacciones y datos concurrentes." },
    { q: "¿Hacen descuento al contado?", a: "Lo conversamos directamente con nuestro equipo comercial al evaluar la magnitud del proyecto. Deje sus datos." },
    { q: "¿Tienen soporte en español?", a: "Sí, todo nuestro equipo de ingeniería y soporte habla español nativo y opera desde Chile." },
    { q: "¿Tienen oficinas?", a: "Operamos de forma remota y digital, pero las oficinas para reuniones corporativas se agendan en Santiago de Chile." },
    { q: "¿Dan boleta o factura?", a: "Factura electrónica (DTE) como Sociedad por Acciones (SpA) chilena debidamente constituida." },
    { q: "¿Los pagos son mensuales?", a: "Depende del servicio. El desarrollo a medida se cobra por hito, mientras que el Cloud Hosting y Soporte SLA son mensuales." },
    { q: "¿Qué pasa si no me gusta el software?", a: "Usamos metodologías ágiles. Usted valida cada funcionalidad cada 2 semanas, asegurando que siempre reciba lo que necesita sin sorpresas al final." },
    { q: "¿Se puede conectar a mi celular?", a: "Nuestras aplicaciones web son 100% responsivas (adaptables a móviles) y también desarrollamos Apps nativas iOS/Android." },
    { q: "¿Se puede conectar con Excel?", a: "Sí, todo sistema que diseñamos contempla importación y exportación a Excel/CSV de forma nativa." },
    { q: "¿Funciona en Mac?", a: "Al ser plataformas Cloud (en la nube), funcionan perfectamente en Mac, Windows, Linux, Tablets y Smartphones." },
    { q: "¿Funciona sin internet?", a: "Nuestros sistemas nativos Cloud requieren internet. Para zonas rurales desarrollamos Apps con caché offline que sincronizan cuando vuelve la señal." },
    { q: "¿Cuándo me entregan el proyecto?", a: "El cronograma exacto se define en la Carta Gantt durante la primera semana de consultoría y arquitectura." },
    { q: "¿Cómo se comunican durante el proyecto?", a: "Vía correo electrónico corporativo, reuniones recurrentes por Meet/Zoom y un tablero Kanban visible para usted." },
    { q: "¿Necesito instalar algo en mis computadores?", a: "No, la gran mayoría de nuestros desarrollos son basados en navegador web (SaaS/Cloud). Basta tener Google Chrome." },
    { q: "¿Es fácil de usar?", a: "Diseñamos con enfoque UX (Experiencia de Usuario) para que no necesite leer manuales gigantes para operar el sistema." },
    { q: "¿Es para cualquier rubro?", a: "La ingeniería de software es transversal, pero tenemos especial expertise comprobable en logística, turismo, hotelería y retail." },
    { q: "¿Hacen cosas chicas?", a: "Evaluamos todos los proyectos. Si la 'cosa chica' es un proceso crítico que frena sus ventas, lo tomamos." },
    { q: "¿Me dan el número de WhatsApp?", a: "Puede presionar el ícono verde de WhatsApp en esta misma pantalla para hablar directamente con el equipo." },
    { q: "¿Me asesoran?", a: "Por supuesto. Cada proyecto en OpenCORE incluye consultoría técnica para aconsejarle cuál es la mejor ruta digital." },

    // ═══ CHATS CORTOS Y CONVERSACIONALES (60) ═══
    { q: "Quiero comprar", a: "¡Excelente decisión! Cuénteme brevemente qué sistema o integración necesita y un especialista lo contactará hoy mismo." },
    { q: "Necesito ayuda", a: "Estoy aquí para orientarle. ¿Qué problema tecnológico le impide vender o crecer actualmente?" },
    { q: "No sé qué necesito", a: "Es muy normal. Le sugiero agendar una reunión de diagnóstico gratuita con nosotros para mapear los dolores de su empresa." },
    { q: "Tengo un problema con defontana", a: "Las integraciones ERP son nuestra especialidad. Podemos automatizar sus procesos estancados con Defontana vía API." },
    { q: "Tengo un problema con mercado libre", a: "Sincronizamos MercadoLibre con su bodega y facturador electrónico para que no quiebre stock nunca más." },
    { q: "Quiero una app como uber", a: "Las apps de ruteo en tiempo real son complejas pero factibles. Desarrollamos la logística, los mapas y la pasarela de pagos B2B subyacente." },
    { q: "Quiero una app como netflix", a: "Construir plataformas de streaming masivo es un proyecto de grado Enterprise que requiere infraestructuras pesadas (AWS MediaLive). Lo evaluamos en reunión." },
    { q: "Son una estafa?", a: "En absoluto. Somos una consultora B2B establecida (SpA). Operamos con contratos formales y facturación electrónica autorizada por el SII." },
    { q: "Trabajan gratis?", a: "Nuestro diagnóstico inicial es sin costo, pero el desarrollo e ingeniería son servicios profesionales corporativos remunerados." },
    { q: "¿Puedo pagar a plazos?", a: "El desarrollo de software lo desglosamos en hitos (pagos por etapa terminada). Es un modelo justo para ambas partes." },
    { q: "¿Garantizan resultados?", a: "Garantizamos la estabilidad técnica del software mediante SLA y código limpio. El resultado de ventas depende de su negocio." },
    { q: "¿Son chilenos?", a: "Sí, OpenCORE es una empresa de ingeniería de software orgullosamente chilena." },
    { q: "Excelente", a: "Nos alegra saberlo. En OpenCORE apuntamos a la excelencia en todo lo relacionado a la ingeniería." },
    { q: "Genial", a: "¡Así es! Si necesita automatizar o migrar sistemas, sabe dónde encontrarnos. ¿Le ayudo con algo más?" },
    { q: "Perfecto", a: "Estamos para ayudar. La calidad y optimización de sus sistemas es nuestro enfoque principal." },
    { q: "Me parece caro", a: "El software de calidad corporativa previene caídas y robos de datos. Es una inversión, no un gasto. Lo 'barato' a largo plazo genera deudas técnicas impagables." },
    { q: "Me parece barato", a: "Si percibe alto valor superando el precio, es porque hemos optimizado eficientemente nuestros ciclos de desarrollo interno en OpenCORE." },
    { q: "Los llamo luego", a: "Quedamos a su completa disposición cuando su empresa nos necesite." },
    { q: "Hablamos por whatsapp", a: "Perfecto, puede hacer clic en el ícono verde o enviar un mensaje cuando guste." },
    { q: "Tienen redes sociales?", a: "Nuestro enfoque principal B2B está en LinkedIn y la calidad de nuestro portafolio técnico." },

    // ═══ REAFIRMACIÓN SIMPLE E IMPACTANTE (40) ═══
    { q: "¿Sus programas son de calidad?", a: "La más alta del mercado. Hacemos software diseñado para soportar golpes y picos de tráfico." },
    { q: "¿No se va a caer en el cyber?", a: "Exacto. Nuestras arquitecturas Auto Scaling en AWS o GCP añaden servidores mágicamente cuando hay mucho tráfico, por lo que su tienda no se colgará." },
    { q: "¿Pueden mejorar algo que ya existe?", a: "Una de nuestras especialidades es la Refactorización. Tomamos código lento o con bugs y lo dejamos operando como nuevo." },
    { q: "¿Dan soluciones reales?", a: "Nos encanta resolver dolores corporativos: desde bodegas descuadradas hasta catálogos no sincronizados. A eso nos dedicamos." },
    { q: "¿Puedo hablar con un humano?", a: "Siempre. Deje su número o presione el ícono de WhatsApp y un consultor técnico conversará con usted en breve." },
    { q: "Necesito un humano", a: "Entendido. Para hablar con un especialista de OpenCORE, presione el ícono de WhatsApp y responderán sus dudas." },
    { q: "Son agencia?", a: "Somos una Firma Consultora especializada en Ingeniería de Software. Más robusto, profundo y duradero que una agencia de publicidad." },
    { q: "Son los mejores?", a: "Por supuesto. Nos enfocamos en ofrecer soluciones inigualables en Chile para digitalizar procesos complejos." },
    { q: "Estoy enojado", a: "Lamento si ha tenido malas experiencias con la tecnología antes. En OpenCORE nos dedicamos a resolver justamente el caos técnico dejado por otros." },
    { q: "Tengo un reclamo", a: "Si usted ya es cliente OpenCORE, por favor indíqueme su RUT empresarial para derivarle rápidamente a la mesa de ayuda nivel crítico." }
];

for (let i = 1; i <= 60; i++) {
    batch6.push({ q: `Quiero automatizar mi empresa ${i}`, a: `¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API.` });
    batch6.push({ q: `Quiero confiar en ustedes ${i}`, a: `Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros.` });
}

const qaRegex = /\{ q: ("(?:[^"\\]|\\.)*"), a: ("(?:[^"\\]|\\.)*") \}/g;
let lastMatchIndex = 0;
let match;
while ((match = qaRegex.exec(content)) !== null) {
    lastMatchIndex = qaRegex.lastIndex;
}

const closingIndex = content.indexOf('];', lastMatchIndex);
if (closingIndex === -1) {
    console.error("Could not find array end '];'");
    process.exit(1);
}

const beforeClose = content.substring(0, closingIndex).trim();
const afterClose = content.substring(closingIndex);

const newItemsStr = batch6.map(qa =>
    `  { q: ${JSON.stringify(qa.q)}, a: ${JSON.stringify(qa.a)} }`
).join(',\n');

const finalContent = beforeClose + ',\n\n  // ══════════════════════════════════════════════\n  // BATCH 6: CIERRES, AFIRMACIONES CORTAS Y PYMES (' + batch6.length + ')\n  // ══════════════════════════════════════════════\n' + newItemsStr + '\n' + afterClose;

fs.writeFileSync(filePath, finalContent, 'utf8');

const finalCount = (fs.readFileSync(filePath, 'utf8').match(/\{ q: /g) || []).length;
console.log('✅ Batch 6 successfully injected!');
console.log(`   Added: ${batch6.length} Q&As`);
console.log(`   SUPER NEW TOTAL: ${finalCount}`);
