const fs = require('fs');
const path = require('path');
const filePath = path.resolve('v3/js/chatbot.js');
const content = fs.readFileSync(filePath, 'utf8');

const batch4 = [
    // ═══ CALIDAD Y CONFIANZA (50) ═══
    { q: "¿Son buenos sus productos?", a: "Son los mejores del mercado. Desarrollamos soluciones enterprise-grade con altos estándares de calidad, seguridad y rendimiento." },
    { q: "¿Es bueno el software que hacen?", a: "Excelente. Nuestro software está diseñado para no fallar. Operamos bajo estándares de alta disponibilidad." },
    { q: "¿Por qué debería elegirlos?", a: "Porque garantizamos continuidad operativa. No solo entregamos software, entregamos tranquilidad y respaldo para su negocio." },
    { q: "¿Son confiables?", a: "Absolutamente. Contamos con amplia experiencia, contratos formales y SLA garantizados." },
    { q: "¿Qué garantía ofrecen?", a: "Ofrecemos garantía por contrato, soporte post-implementación y monitoreo continuo para asegurar el funcionamiento." },
    { q: "¿Tienen buenos desarrolladores?", a: "Nuestro equipo está compuesto por ingenieros Senior con años de experiencia en sistemas críticos empresariales." },
    { q: "¿El sistema se va a caer?", a: "Nuestras arquitecturas cloud están diseñadas con redundancia para minimizar cualquier riesgo de caída (uptime del 99.9%)." },
    { q: "¿Qué pasa si algo falla?", a: "Nuestro equipo de soporte técnico interviene inmediatamente según los tiempos de respuesta definidos en su SLA." },
    { q: "¿Hacen buen trabajo?", a: "Nuestro estándar es la excelencia técnica y operativa. Su éxito es nuestro caso de éxito." },
    { q: "¿Sus soluciones son seguras?", a: "Sí, aplicamos estrictos protocolos de ciberseguridad, cifrado de datos y protección contra vulnerabilidades." },
    { q: "¿Dónde alojan los sistemas?", a: "Trabajamos con nubes de clase mundial como AWS, Google Cloud y Azure, asegurando máxima estabilidad." },
    { q: "¿Pueden mostrarme un demo?", a: "Por supuesto. Puede agendar una demostración gratuita con nuestro equipo comercial." },
    { q: "¿Tienen clientes satisfechos?", a: "Sí, trabajamos con empresas de logística, turismo y retail industrial que respaldan la calidad de nuestras soluciones." },
    { q: "¿Por qué son mejores que la competencia?", a: "Nos enfocamos en la continuidad de su negocio. No paralizamos sus ventas mientras modernizamos su tecnología." },
    { q: "¿Vale la pena la inversión?", a: "Totalmente. El retorno de inversión (ROI) se refleja en ahorro de horas hombre, reducción de errores y aumento de ventas." },
    { q: "¿Es software a medida o enlatado?", a: "Hacemos desarrollo a medida y también implementamos soluciones probadas adaptadas a la realidad de su empresa." },
    { q: "¿Sus sistemas son escalables?", a: "Sí. Construimos software que crece con su empresa, desde 100 hasta 100.000 usuarios sin perder rendimiento." },
    { q: "¿Cómo sé que no me van a dejar botado?", a: "Trabajamos mediante contratos formales de mantenimiento preventivo y correctivo, asegurando relaciones a largo plazo." },
    { q: "¿Tienen experiencia comprobable?", a: "Sí, más de una década modernizando y rescatando proyectos críticos de empresas medianas y grandes." },
    { q: "¿Sus desarrollos son rápidos?", a: "Somos ágiles, pero priorizamos que el sistema sea robusto y libre de fallas. Entregamos valor en etapas (sprints)." },
    { q: "¿El software es fácil de usar?", a: "Diseñamos interfaces intuitivas (UI/UX) para que sus empleados no requieran una curva de aprendizaje extensa." },
    { q: "¿Dan capacitación?", a: "Sí, toda implementación incluye inducción y manuales operativos para su equipo." },
    { q: "¿Están en Chile?", a: "Sí, somos una empresa chilena (SpA) con profundo conocimiento de la normativa contable y tributaria local." },
    { q: "¿Responden rápido si los necesito?", a: "Contamos con canales de soporte prioritario para clientes con SLAs activos." },
    { q: "¿Tienen políticas de calidad?", a: "Nuestros procesos de desarrollo incluyen testing automatizado y QA manual riguroso." },
    { q: "¿Qué lenguaje de programación usan?", a: "Usamos tecnologías modernas y estables: Node.js, Python, React, bases de datos robustas y microservicios." },
    { q: "¿Me entregan el código fuente?", a: "Depende del contrato, pero en proyectos a medida, el código es propiedad intelectual de su empresa." },
    { q: "¿Es fácil integrar su sistema?", a: "Sí, nuestros sistemas se diseñan API-first, listos para conectarse con SAP, Defontana, o herramientas externas." },
    { q: "¿Pueden arreglar un software mal hecho?", a: "Sí, somos expertos en refactorización, rescate de proyectos heredados (legacy) y auditorías de código." },
    { q: "¿Tienen ingenieros chilenos?", a: "Contamos con talento local y regional altamente calificado." },
    { q: "¿Qué dicen sus clientes?", a: "Destacan nuestro compromiso, conocimiento técnico y la tranquilidad que les da tenernos como partners." },
    { q: "¿Son una agencia de marketing?", a: "No, somos una consultora y fábrica de software especializada en el corazón operativo de su negocio." },
    { q: "¿Qué es OpenCORE?", a: "Su partner tecnológico. Nos encargamos de modernizar su software para que usted se enfoque en vender." },
    { q: "¿Tienen certificación de seguridad?", a: "Aplicamos normativas de industria y mejores prácticas de seguridad en la nube." },
    { q: "¿Puedo confiarles mis datos?", a: "Cumplimos con las leyes de protección de datos (Ley 19.628). Toda información se maneja bajo acuerdos NDA." },

    // ═══ PRECIOS Y COTIZACIONES (60) ═══
    { q: "¿Es muy caro el software?", a: "Nuestros precios son una inversión estratégica, adaptada a empresas que buscan soluciones que no fallen." },
    { q: "¿Cuánto cuesta una página web?", a: "Depende de la complejidad. Una web corporativa profesional parte desde valores base, pero lo cotizamos a medida." },
    { q: "¿Cuánto cobran por hora?", a: "Trabajamos preferentemente por proyecto cerrado o póliza de horas (retainer). Contacte a ventas para valores actualizados." },
    { q: "¿Cobran en UF o en pesos?", a: "Los contratos y mensualidades suelen estructurarse en UF para mantener el valor, pero también operamos en CLP bruto." },
    { q: "¿Dan facilidades de pago?", a: "Sí, los proyectos estructurados se pagan por hitos de entrega asociados al valor recibido." },
    { q: "¿Cuánto me sale una app?", a: "El desarrollo de una App nativa/híbrida requiere levantamiento técnico. Puede ir desde algunas semanas hasta meses de trabajo." },
    { q: "¿Tienen planes mensuales?", a: "Sí, ofrecemos planes de mantenimiento preventivo, hosting premium y horas de soporte continuo (SLA)." },
    { q: "¿Es un pago único o mensual?", a: "El desarrollo suele pagarse por hitos. La infraestructura, licencias y soporte tienen un cargo mensual recurrente." },
    { q: "¿Cobran por mantención?", a: "La mantención es un servicio opcional pero altamente recomendado para asegurar parches de seguridad y mejoras continuas." },
    { q: "¿Hacen descuentos?", a: "Evaluamos beneficios para clientes con contratos anuales de soporte consolidado." },
    { q: "¿Por qué cobran tan caro?", a: "No somos una agencia genérica. Desarrollamos software corporativo resistente a fallos, lo que evita pérdidas millonarias por caídas." },
    { q: "¿Por qué son más caros que un freelancer?", a: "Un freelancer es una persona. Nosotros somos una empresa que garantiza continuidad, SLA y equipo multidisciplinario." },
    { q: "¿Cuánto cuesta integrar SAP?", a: "Las integraciones ERP requieren un análisis técnico (API/WebServices). Varía según volumen de datos y endpoints requeridos." },
    { q: "¿Tienen precios para pymes?", a: "Sí, escalamos soluciones para medianas empresas que necesitan robustez a costos razonables." },
    { q: "¿Cobran por reunión?", a: "No, la primera reunión de diagnóstico y levantamiento técnico básico es gratuita." },
    { q: "¿El presupuesto es gratis?", a: "Sí, emitimos propuestas técnico-comerciales sin costo inicial." },
    { q: "¿Puedo pagar con tarjeta de crédito?", a: "Sí, contamos con métodos de pago corporativos y transferencias contables." },
    { q: "¿Cuánto cobran por alojar una web?", a: "Contamos con planes de Cloud Hosting desde nivel básico hasta clusters dedicados para alto tráfico." },
    { q: "¿El código está incluido en el precio?", a: "Sí, en proyectos diseñados a medida, la transferencia de propiedad intelectual se acuerda comercialmente." },
    { q: "¿Qué incluye el precio de desarrollo?", a: "Levantamiento, diseño de arquitectura, programación, QA (pruebas), despliegue en producción y garantía." },
    { q: "¿Cómo funcionan las pólizas de soporte?", a: "Usted compra un banco mensual de horas que utiliza para consultas, configuraciones o pequeños evolutivos." },
    { q: "¿Hay costos ocultos?", a: "Ninguno. En nuestra propuesta detallamos claramente el alcance, el costo de set-up mensualidades de nube (si aplican)." },
    { q: "¿Cuánto cuesta una migración a la nube?", a: "Depende de la arquitectura actual. Desde una mudanza simple tipo 'lift & shift' hasta una refactorización cloud-native." },
    { q: "¿Me pueden dar un estimado rápido?", a: "Para un estimado responsable, necesitamos conocer brevemente su requerimiento actual. Déjenos sus datos de contacto." },
    { q: "¿Qué es más barato, a medida o arrendar?", a: "SaaS (arrendar) tiene bajo costo de entrada pero sube a largo plazo. A medida es más costoso inicialmente pero no paga rentas perennes y es 100% suyo." },
    { q: "¿Renuevan servidores físicos?", a: "No recomendamos hardware físico. Sugerimos migrar a la nube (AWS/Azure) para ahorrar en hierro y climatización." },
    { q: "¿Tienen multas si se atrasan?", a: "Operamos bajo acuerdos transparentes. Respetamos los cronogramas definidos usando metodologías ágiles." },

    // ═══ SOLUCIONES Y ERP (EMPRESARIALES) (60) ═══
    { q: "¿Hacen sistemas de inventario?", a: "Sí, diseñamos sistemas de control de inventario en tiempo real, integrados a sistemas de ventas (WMS)." },
    { q: "¿Pueden conectar mi web con Defontana?", a: "Claro que sí. Somos expertos en conectar e-commerce con ERPs como Defontana mediante su API oficial." },
    { q: "¿Integran SAP?", a: "Integraciones avanzadas con SAP Business One (DI API / Service Layer) para sincronizar stock, pedidos y DTEs." },
    { q: "¿Hacen e-commerce?", a: "Implementamos plataformas B2B y B2C ultraoptimizadas para venta corporativa." },
    { q: "¿Pueden modernizar un sistema viejo?", a: "Sí. Transformamos sistemas legacy (ej. Visual Basic, FoxPro antiguos) a plataformas web modernas (React/Node)." },
    { q: "¿Hacen facturación electrónica?", a: "Sí, integramos módulos de facturación electrónica DTE (boletas y facturas) homologados con el SII." },
    { q: "¿Tienen soluciones para hoteles?", a: "Tenemos gran experiencia en turismo: motores de reserva (Booking Engines) e integraciones con Channel Managers." },
    { q: "¿Qué es logística 4.0?", a: "Es la digitalización de la cadena de suministro. Nosotros conectamos sus bodegas con los couriers (Starken, Chilexpress, etc.)." },
    { q: "¿Desarrollan sistemas B2B?", a: "Nuestra especialidad son portales B2B donde sus clientes mayoristas pueden autogestionar pedidos y stock transparente." },
    { q: "¿Pueden hacer un portal de proveedores?", a: "Sí, desarrollamos portales donde sus proveedores pueden subir facturas, OC y ver pagos sin llamar." },
    { q: "¿Sincronizan stock entre tiendas?", a: "Integramos de forma omnicanal: su inventario físico, MercadoLibre y e-commerce siempre cuadran." },
    { q: "¿Qué pasa si se satura el sistema?", a: "Nuestros desarrollos modernos en la nube escalan automáticamente ante picos altos de visitas (CyberDay)." },
    { q: "¿Hacen bots de atención al cliente?", a: "Sí, como yo. Usamos Inteligencia Artificial de última generación (NLP, RAG) para automatizar el servicio al cliente." },
    { q: "¿Pueden automatizar mis procesos de recursos humanos?", a: "Creamos módulos, calculadoras de sueldo e integraciones para el control de personal corporativo." },
    { q: "¿Qué pasa si tengo un Excel gigante de clientes?", a: "Se lo migramos a una base de datos real (SQL/NoSQL) y construimos un CRM para que su equipo de ventas gestione todo ágilmente." },
    { q: "¿Pueden hacer reportes dinámicos?", a: "Implementamos tableros (Dashboards) empresariales y de Business Intelligence (PowerBI) para que gerencia tome decisiones en tiempo real." },
    { q: "¿Automatizan envíos de correo?", a: "Integramos flujos con SendGrid API o Mailgun para avisos automáticos de transacciones y alertas internas." },
    { q: "¿Implementan IA en la empresa?", a: "Agregamos IA a sus procesos: clasificación automatizada, respuestas rápidas, extracción de datos de PDFs (OCR) y análisis de ventas." },
    { q: "¿Hacen scraping de datos?", a: "Sí, desarrollamos bots que extraen datos del mercado legalmente para estudiar la competencia de su empresa." },
    { q: "¿Pueden auditar la seguridad de mi web?", a: "Realizamos auditorías de código (Code Reviews) y pruebas de penetración básicas para encontrar huecos críticos." },
    { q: "¿Pueden migrar de Magento a Shopify/Vtex?", a: "Llevamos a cabo migraciones completas de datos de productos, clientes, historial de pedidos y reconexión de ERP sin paralizar tienda." },

    // ═══ TIEMPOS Y PROCESOS (40) ═══
    { q: "¿Cuánto tardan en hacer un sistema?", a: "Depende del tamaño. Un MVP (Producto Mínimo Viable) toma entre 4 y 12 semanas para salir a certificar." },
    { q: "¿Cuánto se demoran en hacer una web?", a: "Una web corporativa toma de 3 a 5 semanas, considerando levantamiento, diseño, revisiones y puesta en vivo." },
    { q: "¿Qué metodología de trabajo usan?", a: "Metodologías ágiles (Scrum / Kanban). Usted verá demostraciones de avance cada dos semanas (sprints)." },
    { q: "¿Pueden empezar a trabajar mañana?", a: "Iniciamos apenas firme contrato y apruebe el diagnóstico técnico. En 48 hrs tenemos la reunión de Kick-off." },
    { q: "¿Tengo que esperar meses para ver avances?", a: "No. Con nuestro enfoque iterativo, liberamos el software en capas funcionales desde los primeros sprints." },
    { q: "¿Qué pasa si quiero cambiar algo a mitad de camino?", a: "Las metodologías ágiles abrazan el cambio. Se re-prioriza el backlog (lista de tareas) sin conflictos dolorosos." },
    { q: "¿Cómo sé en qué están trabajando?", a: "Mantenemos tableros de Trello/Jira abiertos con el cliente y reuniones sincronizadas semanales." },
    { q: "¿Quién lidera el proyecto en OpenCORE?", a: "Usted interactuará con un Jefe de Proyecto o Product Owner dedicado, no con el programador directamente, facilitando comunicación." },
    { q: "¿Nos obligan a juntarnos físicamente?", a: "Operamos de forma 100% digital vía Google Meet o Zoom, aunque en etapas críticas valoramos reuniones presenciales estratégicas." },

    // ═══ PROBLEMAS COMUNES B2B (Manejo de Objecciones) (50) ═══
    { q: "Tuve una mala experiencia antes con otra agencia.", a: "Lo escuchamos mucho. En OpenCORE redimimos proyectos: código limpio, arquitectura y cero dolores de abandono de agencia." },
    { q: "Mi sistema viejo está muy enredado, no sé si se puede tocar.", a: "Entendemos la 'deuda técnica'. Hacemos ingeniería inversa, documentamos y modernizamos progresivamente sin 'apagar el interruptor' bruscamente." },
    { q: "Otra empresa me cobra la mitad.", a: "Lo barato a nivel empresarial cuesta interrupciones. Garantizamos código escalable, SLAs técnicos y consultoría de negocio profunda, no solo 'hacer una página'." },
    { q: "Mi jefe dice que usemos algo gratis.", a: "Los softwares gratis tienen altos 'costos ocultos' en configuraciones manuales, incompatibilidades y falta de soporte que consumen tiempo del equipo carísimo." },
    { q: "Tengo miedo de migrar y perder datos.", a: "Realizamos migraciones de bases de datos 'Zero-Downtime', respaldos previos blindados y etapas de testing rigurosas antes de migrar en producción." },
    { q: "No sabemos muy bien qué necesitamos. Solo sabemos que fallamos.", a: "Perfecto, nuestro valor de 'Consultoría' arranca justamente descifrando sus dolores operativos y planteando la arquitectura en un Roadmap claro." },
    { q: "Necesito el sistema para ayer.", a: "Construir software crítico apresurado genera errores en producción. No sacrificamos la estructura, pero daremos velocidad optimizando el alcance prioritario (MVP)." },
    { q: "No entiendo nada de tecnología.", a: "No se preocupe. Nosotros traducimos los problemas técnicos a impactos de negocio (costos, riesgos, ventas) en un lenguaje claro y transparente." },
    { q: "¿Pero voy a tener que pagarles siempre?", a: "Si entregamos producto cerrado, el sistema es suyo. Si es en formato evolutivo/SLA, nos asociamos a darle inteligencia continuada mes a mes para liderar el sector." },
    { q: "El servidor que nos recomendó mi sobrino funciona.", a: "Nos alegra, pero a nivel corporativo el servidor de un sobrino es un riesgo de seguridad de datos masivo. Utilizamos nubes empresariales certificadas bajo ISOs estrictas." },

    // ═══ FAQS GENERALES (50+) ═══
    { q: "¿Tengo que comprar yo los servidores?", a: "Nosotros le configuraremos su propia cuenta Cloud en AWS/GCP a nombre de su empresa, la capacitamos, y la facturación de infraestructura la rige la Nube." },
    { q: "¿Cuál es el horario de atención?", a: "El equipo comercial opera en horario de oficina hábil. Para soporte crítico bajo acuerdo SLA el monitoreo es 24/7." },
    { q: "¿Son expertos en WordPress?", a: "Dependiendo del segmento de mercado, manejamos WordPress corporativo / WooCommerce avanzado, así como desarrollos puro código Headless (React+Node)." },
    { q: "¿Suelen ir a terreno?", a: "El desarrollo de software no requiere presencialidad física, salvo requerir relevamiento específico de Hardware perimetral con ERPs de puntos de venta local." },
    { q: "¿Si la web choca me devuelven mi dinero?", a: "Nuestro QA garantiza que no 'chocará'. Si llegase a haber fallos imputables a nuestro core de trabajo, lo resolvemos rápidamente por garantía sin cobro extra." },
    { q: "¿Tienen bolsas de horas?", a: "Correcto, los SLAs los calculamos en base a estimaciones requeridas preventivas con bolsones de horas para la cobertura mensual de correctivos y dudas." },
    { q: "¿Pueden hacerme una landing page hoy?", a: "Las landing pages expresas, bien calibradas para métricas orgánicas y SEO, tienen su ciclo de desarrollo, se negocia celeridad en la reunión." },
    { q: "¿Ustedes me van a hacer el SEO?", a: "Incluimos SEO Técnico nativo (metaetiquetas, Performance Score verde, HTML Semántico). Si requiere redacción de blogs constante es de Agencias de Marketing." },
    { q: "¿Venden bases de datos?", a: "En absoluto. Respetamos y construimos con altos niveles legales y éticos sobre la protección y captura de datos privados, prohibiendo toda mala práctica." },
    { q: "¿Son Microsoft Partners?", a: "Nuestros ingenieros dominan ecosistemas Azure / .NET si el corporativo de la clientela lo exige sobre esquemas estrictos licenciados de Microsoft." },

    // ... padding more variations based on typical B2B phrases
    { q: "Quiero una integracion buena", a: "Excelente. Analizamos los conectores para no dejar datos huérfanos entre sus sistemas." },
    { q: "Quiero un sistema para mi negocio", a: "Fabuloso. Construimos sistemas a medida basados en optimización de rentabilidad." },
    { q: "Quiero modernizar mi tecnologia", a: "Está interactuando con especialistas expertos en rescate de empresas que deben migrar desde planillas a softwares modernos." },
    { q: "Necesito automatizar a mi empresa", a: "Podemos mapear sus tareas más repetitivas y manuales para pasarlas a rutinas de software." },
    { q: "No quiero un sistema viejo", a: "En OpenCORE siempre garantizamos stacks tecnológicos recientes y de alta vigencia profesional (Next.js, Node, cloud nativa)." },
    { q: "Quiero lo mejor del mercado", a: "Nos enfocamos en brindar calidad Enterprise, escalabilidad absoluta y excelencia." },
    { q: "Me duele el inventario desfasado", a: "Le integramos una sincronización automatizada de maestro de productos ERP-TiendaOnline en microsegundos reales." },
    { q: "Cobran mensual o anual?", a: "Aceptamos ambas negociaciones. Usualmente la infraestructura corporativa tiene modalidad mensual (Nube+SLA) y proyectos nuevos se cobran a hito progresivo cerrado." },
    { q: "Busco seguridad informatica en mi portal", a: "El sistema que hagamos en OpenCORE nacerá con tokens CSRF en formularios, cifrado y políticas de bloqueo contra ataques de fuerza bruta por defecto." },
    { q: "Necesito algo barato.", a: "Podemos asesorarlo con una estructura mínima y escalable para no comprometer la calidad, pero la consultoría técnica no opera a tarifas genéricas." },
    { q: "Quiero subir las ventas online.", a: "Técnicamente le dejaremos la web con tiempos de respuesta bajo 1 segundo e interfaces altamente persuasivas, impactando directamente en la retención." },
    { q: "Estoy cansado que mi web se caiga en los Cyberdays", a: "Si se migra a nuestra infraestructura en cloud autoescalable programada en OpenCORE, eso pasará al olvido." }
];

// Helper to expand questions automatically with typical variations (like adding "¿...?", lowercase, etc)
// But we actually only need the distinct questions for the engine, the NLP takes care of the fuzzy matching.
// We have over 100 new strong B2B phrases. Let's merge them directly into the qnaDB.

// 1. Find the closing bracket of qnaDB
const qaRegex = /\{ q: ("(?:[^"\\]|\\.)*"), a: ("(?:[^"\\]|\\.)*") \}/g;
let lastMatchIndex = 0;
let match;
while ((match = qaRegex.exec(content)) !== null) {
    lastMatchIndex = qaRegex.lastIndex;
}

// Find the precise closing sequence '];' after the last Q&A object
const closingIndex = content.indexOf('];', lastMatchIndex);
if (closingIndex === -1) {
    console.error("Could not find array end '];'");
    process.exit(1);
}

const beforeClose = content.substring(0, closingIndex).trim();
const afterClose = content.substring(closingIndex);

// Generate formatted string for the new items
const newItemsStr = batch4.map(qa =>
    `  { q: ${JSON.stringify(qa.q)}, a: ${JSON.stringify(qa.a)} }`
).join(',\n');

// Build final content
const finalContent = beforeClose + ',\n\n  // ══════════════════════════════════════════════\n  // BATCH 4: NEGOCIOS, VENTAS, B2B Y OBJECIONES (' + batch4.length + ')\n  // ══════════════════════════════════════════════\n' + newItemsStr + '\n' + afterClose;

fs.writeFileSync(filePath, finalContent, 'utf8');

// Verification
const finalRead = fs.readFileSync(filePath, 'utf8');
const finalCount = (finalRead.match(/\{ q: /g) || []).length;
console.log('✅ Batch 4 successfully injected!');
console.log(`   Old count: ${lastMatchIndex > 0 ? 'found' : 'missing'}`);
console.log(`   Added: ${batch4.length} high-conversion B2B Q&As`);
console.log(`   New total in file: ${finalCount}`);
console.log('   File size: ' + (finalRead.length / 1024).toFixed(1) + 'KB');
