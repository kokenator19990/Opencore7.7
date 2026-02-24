const fs = require('fs');
const path = require('path');

const filePath = path.resolve('v3/js/chatbot.js');
let content = fs.readFileSync(filePath, 'utf8');

const generalQAs = [
    // ── MATEMÁTICAS BÁSICAS ──
    { q: "¿Cuánto es 2+2?", a: "2 + 2 = 4. ¿Necesitas ayuda con algo más complejo? También resolvemos ecuaciones empresariales." },
    { q: "¿Cuánto es 3+3?", a: "3 + 3 = 6. Matemática simple, pero si necesitas calcular ROI de un proyecto tecnológico, ahí la cosa se pone más interesante." },
    { q: "¿Cuánto es 5+5?", a: "5 + 5 = 10." },
    { q: "¿Cuánto es 10+10?", a: "10 + 10 = 20." },
    { q: "¿Cuánto es 7x8?", a: "7 × 8 = 56." },
    { q: "¿Cuánto es 100 dividido en 4?", a: "100 ÷ 4 = 25." },
    { q: "¿Cuánto es la raíz cuadrada de 144?", a: "La raíz cuadrada de 144 es 12." },
    { q: "¿Cuánto es 15% de 200?", a: "El 15% de 200 es 30." },
    { q: "¿Cuánto es un millón dividido en mil?", a: "1.000.000 ÷ 1.000 = 1.000." },
    { q: "¿Cuántos metros tiene un kilómetro?", a: "Un kilómetro tiene 1.000 metros." },

    // ── GEOGRAFÍA ──
    { q: "¿Cuál es la capital de Chile?", a: "La capital de Chile es Santiago." },
    { q: "¿Cuál es la capital de Argentina?", a: "La capital de Argentina es Buenos Aires." },
    { q: "¿Cuál es la capital de Francia?", a: "La capital de Francia es París." },
    { q: "¿Cuál es la capital de Japón?", a: "La capital de Japón es Tokio." },
    { q: "¿Cuál es la capital de Estados Unidos?", a: "La capital de Estados Unidos es Washington D.C." },
    { q: "¿Cuál es la capital de Brasil?", a: "La capital de Brasil es Brasilia." },
    { q: "¿Cuál es la capital de México?", a: "La capital de México es Ciudad de México." },
    { q: "¿Cuál es la capital de Perú?", a: "La capital de Perú es Lima." },
    { q: "¿Cuál es la capital de Colombia?", a: "La capital de Colombia es Bogotá." },
    { q: "¿Cuál es la capital de España?", a: "La capital de España es Madrid." },
    { q: "¿Cuál es el país más grande del mundo?", a: "Rusia es el país más grande del mundo por superficie, con más de 17 millones de km²." },
    { q: "¿Cuál es el río más largo del mundo?", a: "El río más largo del mundo es el Amazonas, con aproximadamente 7.062 km." },
    { q: "¿Cuál es la montaña más alta del mundo?", a: "El Monte Everest, con 8.849 metros sobre el nivel del mar." },
    { q: "¿Cuántos continentes hay?", a: "Hay 7 continentes: América, Europa, Asia, África, Oceanía, Antártida y dependiendo del modelo, algunos consideran 5 o 6." },
    { q: "¿Cuántos océanos hay?", a: "Hay 5 océanos: Pacífico, Atlántico, Índico, Ártico y Antártico (o Austral)." },

    // ── HISTORIA ──
    { q: "¿En qué año llegó Colón a América?", a: "Cristóbal Colón llegó a América el 12 de octubre de 1492." },
    { q: "¿Cuándo fue la independencia de Chile?", a: "Chile declaró su independencia el 12 de febrero de 1818. El 18 de septiembre se celebra la Primera Junta Nacional de Gobierno de 1810." },
    { q: "¿Quién fue el primer presidente de Chile?", a: "Manuel Blanco Encalada fue el primer presidente de Chile en 1826, aunque como Director Supremo, Bernardo O'Higgins gobernó desde 1817." },
    { q: "¿Quién fue Bernardo O'Higgins?", a: "Bernardo O'Higgins fue el libertador y padre de la patria de Chile. Fue Director Supremo entre 1817 y 1823." },
    { q: "¿Cuándo empezó la Segunda Guerra Mundial?", a: "La Segunda Guerra Mundial comenzó el 1 de septiembre de 1939 con la invasión de Polonia por la Alemania nazi, y terminó en 1945." },
    { q: "¿Cuándo empezó la Primera Guerra Mundial?", a: "La Primera Guerra Mundial comenzó el 28 de julio de 1914 y terminó el 11 de noviembre de 1918." },
    { q: "¿Quién fue Albert Einstein?", a: "Albert Einstein fue un físico teórico alemán, conocido por la teoría de la relatividad y la fórmula E=mc². Ganó el Nobel de Física en 1921." },
    { q: "¿Quién inventó la electricidad?", a: "La electricidad no fue 'inventada' sino descubierta y desarrollada por varios científicos. Benjamin Franklin, Michael Faraday, Nikola Tesla y Thomas Edison fueron figuras clave." },
    { q: "¿Quién inventó el teléfono?", a: "Alexander Graham Bell patentó el teléfono en 1876, aunque otros inventores como Antonio Meucci también trabajaron en dispositivos similares." },
    { q: "¿Quién inventó Internet?", a: "Internet fue desarrollado de forma colaborativa. ARPANET (1969) sentó las bases, y Tim Berners-Lee creó la World Wide Web en 1989." },
    { q: "¿Cuándo cayó el Muro de Berlín?", a: "El Muro de Berlín cayó el 9 de noviembre de 1989, marcando el fin de la Guerra Fría." },

    // ── CIENCIA ──
    { q: "¿Cuántos planetas tiene el sistema solar?", a: "El sistema solar tiene 8 planetas: Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano y Neptuno. Plutón fue reclasificado como planeta enano en 2006." },
    { q: "¿A qué temperatura hierve el agua?", a: "El agua hierve a 100°C (212°F) a nivel del mar. A mayor altitud, hierve a menor temperatura." },
    { q: "¿A qué temperatura se congela el agua?", a: "El agua se congela a 0°C (32°F) en condiciones normales de presión." },
    { q: "¿Cuánto tarda la Tierra en girar alrededor del Sol?", a: "La Tierra tarda aproximadamente 365,25 días en completar una órbita alrededor del Sol, por eso cada 4 años hay un año bisiesto." },
    { q: "¿Qué es el ADN?", a: "El ADN (ácido desoxirribonucleico) es la molécula que contiene la información genética de los seres vivos. Es la 'base de datos' biológica del cuerpo." },
    { q: "¿Qué es la fotosíntesis?", a: "La fotosíntesis es el proceso por el cual las plantas convierten la luz solar, el agua y el CO₂ en oxígeno y glucosa. Es fundamental para la vida en la Tierra." },
    { q: "¿Cuántos huesos tiene el cuerpo humano?", a: "Un adulto tiene 206 huesos. Los bebés nacen con alrededor de 270, que se fusionan durante el crecimiento." },
    { q: "¿Cuál es la velocidad de la luz?", a: "La velocidad de la luz en el vacío es de aproximadamente 299.792 km/s, o cerca de 300.000 km/s." },
    { q: "¿Qué es la gravedad?", a: "La gravedad es la fuerza de atracción entre dos cuerpos con masa. En la Tierra, la aceleración gravitatoria es de aproximadamente 9,8 m/s²." },

    // ── CULTURA GENERAL ──
    { q: "¿Cuántos días tiene un año?", a: "Un año tiene 365 días, o 366 en los años bisiestos." },
    { q: "¿Cuántas horas tiene un día?", a: "Un día tiene 24 horas." },
    { q: "¿Cuántos minutos tiene una hora?", a: "Una hora tiene 60 minutos." },
    { q: "¿Cuántos segundos tiene un minuto?", a: "Un minuto tiene 60 segundos." },
    { q: "¿Cuántos meses tiene un año?", a: "Un año tiene 12 meses." },
    { q: "¿Cuántos días tiene una semana?", a: "Una semana tiene 7 días." },
    { q: "¿Cuántas letras tiene el abecedario?", a: "El abecedario español tiene 27 letras." },
    { q: "¿Qué hora es?", a: "No tengo acceso a la hora en tiempo real, pero puedes verla en tu dispositivo. ¿Hay algo de OpenCORE en lo que pueda ayudarte?" },
    { q: "¿Qué día es hoy?", a: "No tengo acceso al calendario en tiempo real. Pero estoy disponible cualquier día para resolver tus dudas sobre tecnología empresarial." },
    { q: "¿Qué es una UF?", a: "La UF (Unidad de Fomento) es una unidad de cuenta reajustable usada en Chile, que se actualiza diariamente según la inflación. Es muy utilizada en contratos y transacciones financieras." },
    { q: "¿Cuánto vale una UF?", a: "El valor de la UF se actualiza diariamente. Puedes consultarlo en el sitio del Banco Central de Chile o en sii.cl. A modo referencial, suele estar entre 35.000 y 40.000 CLP." },

    // ── TECNOLOGÍA GENERAL ──
    { q: "¿Qué es una API?", a: "Una API (Application Programming Interface) es un conjunto de reglas que permite que dos aplicaciones se comuniquen entre sí. Es como un 'contrato' técnico entre sistemas." },
    { q: "¿Qué es la nube?", a: "La nube (cloud computing) es un modelo que permite acceder a servicios de computación (servidores, almacenamiento, bases de datos) a través de internet, sin infraestructura propia." },
    { q: "¿Qué es un servidor?", a: "Un servidor es un computador o sistema que proporciona servicios, datos o recursos a otros computadores (clientes) a través de una red." },
    { q: "¿Qué es una base de datos?", a: "Una base de datos es un sistema organizado para almacenar, gestionar y recuperar información de manera eficiente. Puede ser relacional (SQL) o no relacional (NoSQL)." },
    { q: "¿Qué es un ERP?", a: "Un ERP (Enterprise Resource Planning) es un sistema de gestión empresarial que integra procesos como finanzas, inventario, producción y recursos humanos en una sola plataforma." },
    { q: "¿Qué es un CRM?", a: "Un CRM (Customer Relationship Management) es un sistema para gestionar las relaciones con clientes: contactos, ventas, servicio y marketing en un solo lugar." },
    { q: "¿Qué es un SLA?", a: "Un SLA (Service Level Agreement) es un acuerdo de nivel de servicio que define los estándares de calidad, tiempos de respuesta y disponibilidad comprometidos entre un proveedor y su cliente." },
    { q: "¿Qué es machine learning?", a: "Machine Learning (aprendizaje automático) es una rama de la inteligencia artificial donde los sistemas aprenden de datos para mejorar su rendimiento sin ser programados explícitamente." },
    { q: "¿Qué es un algoritmo?", a: "Un algoritmo es una secuencia de pasos lógicos y ordenados para resolver un problema o realizar una tarea. Es la base de toda la programación." },
    { q: "¿Qué es Python?", a: "Python es un lenguaje de programación popular, conocido por su simplicidad y versatilidad. Se usa mucho en ciencia de datos, IA, automatización y desarrollo web." },
    { q: "¿Qué es JavaScript?", a: "JavaScript es el lenguaje de programación más usado en la web. Permite crear páginas interactivas y aplicaciones tanto en el navegador como en servidores." },
    { q: "¿Qué es HTML?", a: "HTML (HyperText Markup Language) es el lenguaje estándar para crear la estructura de páginas web. Define el contenido y su organización." },
    { q: "¿Qué es CSS?", a: "CSS (Cascading Style Sheets) es el lenguaje que define el diseño visual de las páginas web: colores, fuentes, espaciado y disposición de elementos." },
    { q: "¿Qué es Linux?", a: "Linux es un sistema operativo de código abierto, muy usado en servidores, supercomputadoras y dispositivos embebidos. Es conocido por su estabilidad y seguridad." },
    { q: "¿Qué es GitHub?", a: "GitHub es una plataforma de desarrollo colaborativo que usa Git para control de versiones. Permite a equipos trabajar juntos en código de forma organizada." },

    // ── CHILE Y ACTUALIDAD ──
    { q: "¿Cuál es la moneda de Chile?", a: "La moneda oficial de Chile es el Peso Chileno (CLP)." },
    { q: "¿Cuántos habitantes tiene Chile?", a: "Chile tiene aproximadamente 19-20 millones de habitantes según estimaciones recientes." },
    { q: "¿Cuál es el idioma oficial de Chile?", a: "El idioma oficial de Chile es el español (castellano)." },
    { q: "¿Qué es el SII?", a: "El SII (Servicio de Impuestos Internos) es la entidad gubernamental chilena encargada de la administración tributaria, fiscalización y recaudación de impuestos." },
    { q: "¿Qué es una boleta electrónica?", a: "La boleta electrónica es un documento tributario digital en Chile que reemplaza a la boleta de papel. Es obligatoria para la mayoría de los contribuyentes desde 2021." },
    { q: "¿Qué es el IVA?", a: "El IVA (Impuesto al Valor Agregado) es un impuesto al consumo. En Chile, la tasa general es del 19% sobre el precio de bienes y servicios." },
    { q: "¿Cuántas regiones tiene Chile?", a: "Chile tiene 16 regiones administrativas." },
    { q: "¿Cuál es el desierto más árido del mundo?", a: "El Desierto de Atacama, ubicado en el norte de Chile, es considerado el desierto más árido del mundo." },

    // ── NEGOCIOS BÁSICOS ──
    { q: "¿Qué es una SpA?", a: "Una SpA (Sociedad por Acciones) es un tipo de sociedad en Chile, flexible y moderna, que permite tener uno o más accionistas. Es muy usada por startups y empresas pequeñas." },
    { q: "¿Qué es una EIRL?", a: "Una EIRL (Empresa Individual de Responsabilidad Limitada) es un tipo de empresa en Chile donde una sola persona es el titular, con responsabilidad limitada al capital aportado." },
    { q: "¿Qué es el ROI?", a: "El ROI (Return on Investment) es una métrica que mide la rentabilidad de una inversión. Se calcula como: (Ganancia - Inversión) / Inversión × 100%." },
    { q: "¿Qué es un MVP?", a: "Un MVP (Minimum Viable Product) es la versión más básica de un producto que permite validar una idea de negocio con el mínimo esfuerzo y costo." },
    { q: "¿Qué es outsourcing?", a: "Outsourcing es la práctica de contratar servicios externos para funciones que podrían hacerse internamente. Permite enfocarse en el core del negocio." },
    { q: "¿Qué es scrum?", a: "Scrum es un marco de trabajo ágil para gestionar proyectos. Organiza el trabajo en sprints (ciclos cortos), con roles definidos y reuniones periódicas." },
    { q: "¿Qué es DevOps?", a: "DevOps es una cultura y conjunto de prácticas que integra desarrollo (Dev) y operaciones (Ops) para acelerar la entrega de software con mayor calidad y confiabilidad." },
    { q: "¿Qué es la transformación digital?", a: "La transformación digital es el proceso de integrar tecnología en todas las áreas de un negocio para mejorar operaciones, crear valor y adaptarse al mercado moderno." },

    // ── PREGUNTAS DIVERTIDAS / CURIOSIDADES ──
    { q: "¿Cuál es el animal más rápido del mundo?", a: "El guepardo (cheetah) es el animal terrestre más rápido, alcanzando hasta 120 km/h. En el aire, el halcón peregrino puede superar los 300 km/h en picada." },
    { q: "¿Cuál es el animal más grande del mundo?", a: "La ballena azul es el animal más grande que ha existido, pudiendo medir hasta 30 metros y pesar más de 150 toneladas." },
    { q: "¿Cuántos países hay en el mundo?", a: "Actualmente hay 193 países miembros de las Naciones Unidas, más 2 estados observadores (Vaticano y Palestina)." },
    { q: "¿Quién pintó la Mona Lisa?", a: "La Mona Lisa fue pintada por Leonardo da Vinci, aproximadamente entre 1503 y 1519. Se encuentra en el Museo del Louvre en París." },
    { q: "¿Quién escribió Don Quijote?", a: "Don Quijote de la Mancha fue escrito por Miguel de Cervantes Saavedra, publicado en dos partes en 1605 y 1615." },
    { q: "¿Cuánto mide un campo de fútbol?", a: "Un campo de fútbol profesional mide entre 100-110 metros de largo y 64-75 metros de ancho, según las normas de la FIFA." },
    { q: "¿Cuántos jugadores tiene un equipo de fútbol?", a: "Un equipo de fútbol tiene 11 jugadores en cancha, incluyendo el portero." },
    { q: "¿Qué significa WiFi?", a: "WiFi es una marca comercial que identifica la tecnología de red inalámbrica. Comúnmente se dice que significa 'Wireless Fidelity', aunque técnicamente es solo un nombre comercial." },
    { q: "¿Qué significa CEO?", a: "CEO significa Chief Executive Officer, es decir, el Director Ejecutivo o máximo responsable de una empresa." },
    { q: "¿Qué significa CTO?", a: "CTO significa Chief Technology Officer, es decir, el Director de Tecnología de una empresa, responsable de la estrategia tecnológica." }
];

// Build the injection string
const qnaStr = generalQAs.map(q =>
    '  { q: ' + JSON.stringify(q.q) + ', a: ' + JSON.stringify(q.a) + ' }'
).join(',\n');

// Find the closing of qnaDB array and inject before it
const closingPattern = '\n];';
const lastClosingIdx = content.lastIndexOf(closingPattern);

if (lastClosingIdx === -1) {
    console.error('ERROR: Could not find qnaDB closing bracket');
    process.exit(1);
}

const before = content.substring(0, lastClosingIdx);
const after = content.substring(lastClosingIdx);

const injected = before + ',\n\n  // ══════════════════════════════════════════════\n  // CULTURA GENERAL, MATEMÁTICAS, CIENCIA E HISTORIA (100)\n  // ══════════════════════════════════════════════\n' + qnaStr + after;

fs.writeFileSync(filePath, injected, 'utf8');

// Verify
const final = fs.readFileSync(filePath, 'utf8');
const count = (final.match(/\{ q: /g) || []).length;
console.log('✅ Chatbot actualizado con ' + count + ' Q&As totales');
console.log('   (+' + generalQAs.length + ' preguntas de cultura general agregadas)');
console.log('   Tamaño: ' + (final.length / 1024).toFixed(1) + ' KB');
