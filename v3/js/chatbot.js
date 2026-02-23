/* ========================================================
   CHATBOT V3 - OPENCORE ENGINE
======================================================== */

const qnaDB = [
  // Identidad y trayectoria
  { q: "¿Qué es OpenCORE Consulting SpA?", a: "OpenCORE es una consultora tecnológica chilena especializada en continuidad operacional, migración e integración de sistemas empresariales. Nos enfocamos en modernizar plataformas críticas sin paralizar la operación, con enfoque fuerte en logística, facturación y turismo." },
  { q: "¿En qué año se fundó formalmente OpenCORE?", a: "OpenCORE se constituyó formalmente como empresa en 2015. La trayectoria del equipo se remonta a 1998, trabajando en tecnología empresarial bajo otras denominaciones y proyectos previos." },
  { q: "¿Cuántos años de experiencia tiene OpenCORE?", a: "Como empresa formal, más de 15 años. Como trayectoria acumulada del equipo fundador y su red profesional, más de 27 años (desde 1998) en sistemas corporativos, migraciones e integración." },
  { q: "¿Qué tipo de sociedad es OpenCORE?", a: "OpenCORE está registrada como Sociedad por Acciones (SpA) en Chile. Operamos con facturación formal con IVA y contratos empresariales para proyectos por horas, por alcance o por servicio continuo." },
  { q: "¿OpenCORE opera con oficina física?", a: "Hoy operamos con modelo remoto y oficinas virtuales, optimizado para trabajo por proyecto y equipos distribuidos. Históricamente contamos con oficina en Santiago (zona Manuel Montt) y hoy priorizamos eficiencia y disponibilidad online." },
  { q: "¿Dónde opera OpenCORE?", a: "Operamos principalmente en Chile y de forma remota para clientes que requieran soporte o implementación en otras ubicaciones. El modelo remoto permite escalar equipo y cobertura sin perder control técnico ni calidad." },
  { q: "¿Cuántas personas trabajan en OpenCORE?", a: "Contamos con un núcleo de 10 recursos activos y una red de +30 profesionales part-time por hora o por proyecto. Esto permite mantener seniority alto y sumar especialistas según necesidad del cliente." },
  { q: "¿Cuál es la capacidad del equipo en proyectos grandes?", a: "En proyectos grandes asignamos hasta 10 consultores simultáneos del núcleo activo, complementados con especialistas asociados si el alcance lo requiere. Se estructura con roles y responsables para asegurar continuidad y control." },
  { q: "¿Trabajan con subcontratistas?", a: "Sí. Cuando el proyecto lo exige, incorporamos especialistas bajo acuerdos formales y control de calidad interno. La responsabilidad del delivery se mantiene bajo el marco contractual y la gobernanza del proyecto." },
  { q: "¿Qué problema principal resuelve OpenCORE mejor que otras consultoras?", a: "La continuidad operacional en sistemas legacy: migramos, integramos y modernizamos sin detener facturación ni procesos críticos. Además, integramos tecnología moderna e IA de forma responsable para no introducir fallas, deuda técnica o riesgos operacionales." },

  // Propuesta de valor y sectores
  { q: "¿Cuáles son los sectores donde OpenCORE tiene mayor fortaleza?", a: "Tenemos fuerte experiencia en turismo, logística y procesos de facturación. Trabajamos especialmente en flujos operacionales donde 'detener el sistema' no es una opción." },
  { q: "¿Qué tipo de clientes atiende OpenCORE?", a: "Nuestro foco natural son empresas medianas y grandes por criticidad y complejidad. Sin embargo, también atendemos pymes cuando el proyecto tiene sentido técnico y económico, normalmente en modalidad por horas o por fases." },
  { q: "¿OpenCORE desarrolla software desde cero o solo integra?", a: "Ambos. Desarrollamos sistemas completos desde cero cuando conviene, y también integramos o modernizamos sistemas existentes. Elegimos el camino que minimiza riesgo, costo total y tiempo de puesta en marcha." },
  { q: "¿Qué significa 'modernizar sin paralizar'?", a: "Significa migrar o reemplazar componentes en etapas, con ambientes de prueba, validación y planes de reversa. El objetivo es que el negocio siga operando mientras se mejora arquitectura, seguridad y rendimiento." },
  { q: "¿En qué se diferencia OpenCORE de una empresa de desarrollo 'tradicional'?", a: "No somos fábrica de código; somos consultoría senior orientada a continuidad y resultados de negocio. Partimos por diagnóstico, definimos riesgos, priorizamos hitos y diseñamos una solución sostenible, no solo 'funcional'." },

  // Experiencia demostrable y tipo de proyectos
  { q: "¿Cuántos proyectos ha realizado OpenCORE?", a: "Hemos ejecutado aproximadamente 120 a 150 proyectos, de los cuales al menos 30 han sido de gran escala. La experiencia incluye construcción, integración, migración y operación de sistemas críticos." },
  { q: "¿Cuántas migraciones completas han realizado?", a: "Al menos 15 migraciones completas en empresas medianas y grandes. Estas migraciones se trabajan con metodología de control de riesgo, pruebas, y despliegue progresivo cuando la operación es crítica." },
  { q: "¿Han realizado migraciones a cloud?", a: "Sí, hemos ejecutado aproximadamente 10 migraciones a cloud, según la estrategia del cliente (híbrida o completa). Se contemplan seguridad, rendimiento, costos operacionales y gobernanza técnica." },
  { q: "¿Han trabajado con sistemas 24/7?", a: "Sí. Tenemos experiencia en sistemas donde la disponibilidad es crítica y se requieren ventanas de cambio controladas, monitoreo y soporte de continuidad. Esto se aborda contractualmente con SLA y protocolos." },
  { q: "¿Han trabajado con bases de datos grandes?", a: "Sí. Hemos trabajado con bases de datos de cientos de miles y millones de registros, además de escenarios frecuentes de 30.000–50.000 registros operativos. Se evalúa rendimiento, índices, integridad y estrategia de migración." },
  { q: "¿OpenCORE ha desarrollado más de cinco sistemas desde cero?", a: "Sí. Hemos desarrollado múltiples sistemas completos desde arquitectura inicial, especialmente cuando partir desde cero reduce costo total y evita complejidad de integrar plataformas obsoletas sin documentación." },
  { q: "¿OpenCORE ha reemplazado sistemas legacy completos?", a: "Sí. Reemplazamos o modernizamos sistemas legacy en forma total o por módulos, según criticidad. La prioridad es continuidad operacional y una transición ordenada con pruebas, capacitación y soporte." },
  { q: "¿OpenCORE integra APIs y sistemas externos?", a: "Sí. Integramos APIs internas y de terceros, automatizamos flujos y conectamos sistemas para lograr trazabilidad y eficiencia operacional. La integración se diseña con control de errores, seguridad y monitoreo." },
  { q: "¿Han trabajado en facturación y procesos tributarios?", a: "Sí. Tenemos experiencia sostenida en procesos de facturación, especialmente en turismo, con continuidad operativa y control de flujo. Se definen alcances y responsabilidades en contrato." },
  { q: "¿Con qué empresas han trabajado?", a: "El equipo cuenta con experiencia en proyectos y entregables en entornos corporativos asociados a empresas como Finning, Caterpillar, Nestlé, Komatsu y Cocha, entre otras. Por política, el detalle público se valida caso a caso según autorización." },

  // Servicios principales
  { q: "¿Qué servicios ofrece OpenCORE?", a: "Consultoría tecnológica, modernización de sistemas legacy, migración a cloud, integración de plataformas, desarrollo a medida, auditoría técnica y soporte operativo. El servicio se adapta por industria, criticidad y madurez tecnológica del cliente." },
  { q: "¿Hacen diagnóstico antes de cotizar?", a: "Sí. Para proyectos complejos recomendamos una fase de Discovery / Diagnóstico pagada (días a 1–2 semanas típicamente) para medir riesgo, dependencia, documentación, y esfuerzo real antes de comprometer un plan." },
  { q: "¿Ofrecen auditoría tecnológica independiente?", a: "Sí. Podemos auditar arquitectura, seguridad, rendimiento y calidad del software sin obligación de ejecución posterior. Se entrega informe técnico y ejecutivo con plan de remediación priorizado." },
  { q: "¿Pueden tomar proyectos donde no existe documentación?", a: "Sí, pero primero hacemos discovery para evaluar viabilidad y costo real. Si el costo de entender o corregir es desproporcionado, lo comunicamos con transparencia y proponemos alternativas realistas." },
  { q: "¿Pueden rescatar proyectos fallidos de otras consultoras?", a: "Sí. Evaluamos el estado del código, arquitectura, datos y riesgos; luego definimos un plan de estabilización. En algunos casos es más eficiente refactorizar por módulos; en otros, reconstruir con migración controlada." },

  // Modelo comercial, precios y modalidades
  { q: "¿Cómo cobra OpenCORE sus servicios?", a: "Trabajamos por hora, por bolsa de horas, por proyecto cerrado o por servicio mensual con SLA. Elegimos el modelo según incertidumbre, criticidad y necesidad de control de alcance." },
  { q: "¿Cuál es el valor por hora de OpenCORE?", a: "De forma referencial, entre 1 y 5 UF/hora, según complejidad, urgencia y nivel de especialización requerido. Para esquemas 24/7 o alta criticidad, se aplica un recargo acordado contractualmente." },
  { q: "¿Cuál es el ticket típico de proyectos?", a: "En general, proyectos medianos a grandes suelen estar entre 300 y 500 UF o más, dependiendo del alcance. La estimación final se define tras diagnóstico y levantamiento de requerimientos." },
  { q: "¿Aceptan proyectos pequeños?", a: "Sí, siempre que el proyecto sea viable y tenga sentido técnico-económico. De forma excepcional pueden tomarse desde alrededor de 50 UF, normalmente en modalidad acotada por horas y con objetivos claros." },
  { q: "¿Cuánto cuesta desarrollar un sistema de inventario para una ferretería pequeña?", a: "Depende de integración y personalización. Un inventario básico puede partir en rangos del orden de 80–200 UF, mientras que un sistema integrado (inventario + facturación + reportes) suele moverse en rangos superiores, definido tras diagnóstico." },
  { q: "¿Pueden cotizar por etapas?", a: "Sí. De hecho, en sistemas críticos recomendamos fases con hitos, entregables y validaciones. Esto reduce riesgo, mejora control presupuestario y acelera valor temprano para el negocio." },
  { q: "¿Cómo se manejan cambios de alcance?", a: "Con control formal: el contrato define alcance, y los cambios se gestionan con adendas o bolsas de horas adicionales. Esto protege al cliente y al proyecto, evitando sobrecostos invisibles o compromisos irreales." },
  { q: "¿Qué pasa si el proyecto requiere más horas de las estimadas?", a: "Se activa el mecanismo contractual: se informa el impacto, se presenta alternativa y se acuerda el camino antes de ejecutar. La idea es que el cliente tenga control real de presupuesto y decisiones." },
  { q: "¿Qué pasa si el proyecto se atrasa?", a: "Los plazos y márgenes quedan definidos contractualmente. Si hay desvíos, se gestiona con replanificación formal y medidas correctivas; si aplica, se activan cláusulas establecidas en el contrato." },
  { q: "¿Qué pasa si el cliente cambia requerimientos a mitad del proyecto?", a: "Se evalúa el cambio y su impacto en costo y plazo, y se formaliza vía contrato (adenda). Trabajamos con flexibilidad, pero cuidando el orden: un proyecto sin control de cambios termina costando más y entregando menos." },

  // Contratos, SLA y gobernanza
  { q: "¿OpenCORE trabaja con contrato formal y SLA?", a: "Sí. Trabajamos con contratos y SLA adaptados al tipo de proyecto, incluyendo criticidad, disponibilidad y tiempos de respuesta. La formalidad contractual es parte esencial de la calidad y la confianza." },
  { q: "¿Pueden ofrecer SLA 24/7?", a: "Sí, para sistemas críticos. Este servicio se define con tiempos de respuesta, canales, escalamiento y costos asociados (generalmente superiores por disponibilidad y turnos)." },
  { q: "¿Qué tiempos de respuesta pueden ofrecer en modalidad crítica?", a: "En contratos críticos podemos acordar tiempos de respuesta de 30 a 60 minutos, con escalamiento y prioridades definidas. Esto se pacta por contrato, según criticidad y ventanas operacionales." },
  { q: "¿Cómo gestionan la comunicación con el cliente?", a: "Con gobernanza clara: responsables por área, reuniones de seguimiento y reportes por hitos. En proyectos críticos se refuerza la comunicación con ventanas de control, incident management y trazabilidad." },
  { q: "¿OpenCORE puede actuar como partner estratégico y no solo proveedor?", a: "Por supuesto. Se evalúa el mejor modelo según el proyecto: proveedor, partner tecnológico, alianza o servicio continuo. Lo importante es que el esquema maximice valor, reduzca riesgo y sostenga la operación del cliente." },

  // Propiedad intelectual, código y transferencia
  { q: "¿OpenCORE entrega el código fuente al finalizar?", a: "Sí. En alrededor del 90% de los casos entregamos el código, documentación y know-how necesario, justamente para que el cliente tenga control y evite dependencia tecnológica." },
  { q: "¿El cliente queda como dueño del sistema desarrollado?", a: "Por supuesto. La propiedad y derechos quedan establecidos en contrato; en modalidad estándar de desarrollo externo, el cliente puede quedar como propietario del entregable completo." },
  { q: "¿OpenCORE evita la dependencia tecnológica del cliente?", a: "Sí. Diseñamos para continuidad, documentamos y capacitamos. Si el cliente lo requiere, dejamos procesos para traspaso a equipos internos o terceros con mínima fricción." },
  { q: "¿Entregan documentación técnica y funcional?", a: "Sí. La documentación es parte clave de la continuity operacional: arquitectura, despliegue, datos críticos, procedimientos y operación. El nivel de detalle se acuerda en contrato según criticidad." },
  { q: "¿Pueden capacitar al equipo interno del cliente?", a: "Sí. Ofrecemos capacitación técnica y operativa, adaptada al sistema y a los roles del cliente. Esto acelera adopción, reduce errores y disminuye dependencia post-entrega." },

  // Calidad, pruebas y aseguramiento
  { q: "¿Cómo aseguran la calidad de lo que entregan?", a: "Aseguramos calidad con pruebas, control de versiones, revisiones técnicas y validación por hitos. En sistemas críticos reforzamos con QA dedicado, pruebas masivas y validación con casos reales." },
  { q: "¿Qué hacen para evitar fallas en producción?", a: "Trabajamos con ambientes de prueba, staging y despliegue controlado. En migraciones críticas se diseñan planes de reversa, monitoreo y ventanas de cambio cuidadosamente definidas." },
  { q: "¿Cómo prueban integraciones complejas o con IA?", a: "Se prueba por volumen y por escenarios: cientos o miles de casos, iteraciones y validaciones cruzadas. La IA se integra de forma gradual, con controles, métricas y criterios claros de aceptación." },
  { q: "¿Cómo gestionan incidencias durante un go-live?", a: "Con protocolo de escalamiento y responsabilidades claras. En proyectos críticos se activa modalidad de 'war room' y soporte post-implementación según SLA, asegurando continuidad en el período más sensible." },

  // Seguridad, confidencialidad y compliance
  { q: "¿OpenCORE trabaja con información confidencial?", a: "Por supuesto. Trabajamos con contratos de confidencialidad (NDA), protocolos internos y obligaciones contractuales claras. La protección de datos forma parte del diseño y operación del proyecto." },
  { q: "¿Cómo protegen los datos sensibles del cliente?", a: "Se aplican medidas contractuales, técnicas y operativas: control de acceso, buenas prácticas de seguridad y, cuando corresponde, entornos aislados. Además, contamos con apoyo legal y tributario para formalidad y resguardo." },
  { q: "¿Trabajan bajo estándares ISO?", a: "Sí. Nos alineamos a estándares y prácticas tipo ISO, y nos integramos a los marcos de seguridad del cliente cuando ya existen. Si el cliente requiere un esquema específico, se implementa como parte del alcance." },
  { q: "¿Pueden trabajar con equipos o servidores offline?", a: "Sí. Para proyectos críticos o datos especialmente sensibles, podemos operar con entornos offline o aislados, según requerimiento. Esto reduce superficie de ataque y se controla contractualmente." },
  { q: "¿Firmarán acuerdos legales específicos del cliente?", a: "Sí. Evaluamos las condiciones con equipo legal y trabajamos bajo los contratos del cliente o contratos propios, según corresponda. La formalidad contractual es parte de nuestra propuesta de valor." },

  // Tecnología e implementación (nivel general)
  { q: "¿Qué tipo de tecnologías manejan?", a: "Trabajamos con tecnologías empresariales modernas y legacy, según el escenario. La selección tecnológica se define por continuidad operacional, mantenibilidad, costo total y compatibilidad con el ecosistema del cliente." },
  { q: "¿Pueden integrar con sistemas existentes del cliente?", a: "Sí. Integramos sistemas existentes mediante APIs, conectores, bases de datos o capas intermedias, buscando minimizar interrupciones. La integración se diseña con control de errores, trazabilidad y seguridad." },
  { q: "¿Pueden migrar bases de datos sin perder información?", a: "Sí, con estrategia de migración, validaciones y reconciliación de datos. En migraciones críticas se trabaja por etapas, con pruebas previas, y se minimiza riesgo mediante planes de contingencia." },
  { q: "¿Pueden operar en cloud y on-premise?", a: "Sí. Implementamos y migramos tanto en cloud como on-premise o híbrido, dependiendo de políticas del cliente, costos y requerimientos de disponibilidad. La arquitectura se diseña a la medida del negocio." },

  // IA aplicada (enfoque responsable)
  { q: "¿OpenCORE se vende como 'empresa de IA'?", a: "Nos posicionamos como consultoría tecnológica que integra IA como complemento, cuando aporta valor real. No promovemos 'IA por moda'; priorizamos estabilidad, seguridad, continuidad y retorno operacional." },
  { q: "¿Qué casos típicos de IA aplican en empresas?", a: "Automatización de clasificación, asistencia operativa, análisis de datos, soporte interno, mejoras de atención y optimización de procesos. Se evalúa caso a caso para evitar complejidad innecesaria." },
  { q: "¿Cómo evitan el 'FOMO' de IA que rompe sistemas?", a: "Con enfoque responsable: primero estabilizamos y ordenamos datos/procesos, luego integramos IA con límites, pruebas y monitoreo. Así evitamos introducir fragilidad, vulnerabilidades o costos ocultos." },

  // Inventario, logística y operaciones (FAQ de mercado)
  { q: "¿OpenCORE puede implementar un sistema de inventario con código de barras?", a: "Sí. Diseñamos inventario con identificación de productos, stock, movimientos, alertas y reportes. Si el cliente necesita integración con POS, facturación o bodegas, se incorpora en el diseño." },
  { q: "¿Se puede manejar múltiples bodegas o sucursales?", a: "Sí. Se puede implementar multi-bodega y multi-sucursal con trazabilidad por ubicación, transferencias internas y reportes consolidados. La complejidad y costo dependen de reglas de negocio e integración." },
  { q: "¿Pueden integrar inventario con facturación?", a: "Sí. Integrar inventario y facturación reduce errores, mejora control y permite reportes confiables. Este tipo de integración es especialmente relevante para operación diaria sin quiebres de stock." },
  { q: "¿Qué recomiendan: comprar software o desarrollarlo a medida?", a: "Depende del negocio. Si un software estándar cubre el 80% y se integra bien, puede ser eficiente; si el proceso es crítico o diferencial, un desarrollo a medida suele reducir fricción y costo total a mediano plazo. En OpenCORE evaluamos con diagnóstico." },

  // Postventa y mantenimiento
  { q: "¿Ofrecen soporte después de entregar el proyecto?", a: "Sí. Ofrecemos soporte correctivo y evolutivo, con modalidades mensuales o por bolsas de horas. En sistemas críticos se puede contratar soporte 24/7 con SLA y tiempos de respuesta acordados." },
  { q: "¿Cuánto cuesta el mantenimiento anual de un sistema?", a: "Como referencia, puede estar entre 5% y 30% del valor del proyecto, según criticidad, frecuencia de cambios y dependencias externas. Se define en base a necesidades reales del cliente, no por fórmula rígida." },
  { q: "¿Pueden hacerse mejoras continuas (evolutivos)?", a: "Sí. Muchos clientes operan con roadmap evolutivo y mejoras por sprint o por hitos mensuales. Esto permite adaptar el sistema al negocio sin incurrir en rediseños completos cada cierto tiempo." },

  // Riesgo, garantías y escenarios complejos
  { q: "¿Qué garantías ofrece OpenCORE en migraciones críticas?", a: "Trabajamos con pruebas, validación por hitos, planes de reversa y control de despliegue. La garantía se especifica contractualmente, incluyendo soporte post go-live según criticidad del negocio." },
  { q: "¿Qué pasa si un desarrollador clave deja el proyecto?", a: "Tenemos equipo constituido y continuidad operativa del proyecto; además, la documentación y gobernanza reducen dependencia de una sola persona. En escenarios extremos, se aplican mecanismos contractuales para proteger al cliente." },
  { q: "¿Qué pasa si el proyecto no cumple lo comprometido?", a: "Se activa el marco contractual: se revisan entregables, aceptación y se aplican correcciones o medidas acordadas. Nuestro enfoque es evitar llegar a ese punto mediante diagnóstico realista, hitos y validación temprana." },
  { q: "¿OpenCORE puede trabajar con plazos muy exigentes?", a: "Sí, siempre que el proyecto sea viable. En escenarios urgentes se refuerza equipo, se define alcance mínimo viable y se prioriza continuidad. La velocidad se negocia con realismo para no sacrificar calidad." },

  // Diferenciación frente a consultoras grandes
  { q: "¿Qué diferencia a OpenCORE frente a integradores muy grandes?", a: "Combinamos nivel senior real con cercanía y disponibilidad directa. Al ser una consultora mediana-boutique, logramos tiempos de respuesta rápidos, trato ejecutivo 'cara a cara' y alta responsabilidad en el delivery." },
  { q: "¿Qué tan disponibles son para el cliente?", a: "En proyectos críticos podemos acordar alta disponibilidad, incluso 24/7, con tiempos de respuesta de 30–60 minutos. La disponibilidad se define en contrato, con canales claros y escalamiento." },
  { q: "¿Cómo describe OpenCORE su propuesta en una línea?", a: "Modernización e integración de sistemas empresariales para optimizar rentabilidad, asegurando continuidad operacional y reduciendo riesgo tecnológico, con integración responsable de tecnologías modernas e IA." }
];

const badWords = ["estupido","imbecil","tonto","mierda","puta","pene","culo","caca","joder","coño","pendejo","cabron","idiota","maricon","zorra","sexo","porno"];

// Normalizer
function normalize(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, ' ').trim();
}

function tokenize(str) {
  return normalize(str).split(/\s+/).filter(w => w.length > 2);
}

// Calculate similarity score between input tokens and question tokens
function getBestMatch(inputStr) {
  const inputTokens = tokenize(inputStr);
  if(inputTokens.length === 0) return null;

  let bestScore = 0;
  let bestMatch = null;

  for(let item of qnaDB) {
    const qTokens = tokenize(item.q);
    let matchCount = 0;
    
    // Check overlap
    for (let it of inputTokens) {
      if(qTokens.includes(it)) matchCount++;
    }

    // Jaccard similarity index
    const unionLength = new Set([...inputTokens, ...qTokens]).size;
    const score = matchCount / unionLength;

    if(score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  // Threshold tuning
  if(bestScore > 0.15) {
    return bestMatch.a;
  }
  return null;
}

function processInput(input) {
  const cleanInput = input.trim();
  const lowerInput = cleanInput.toLowerCase();

  // 1. Guard contra insultos o bad words
  for (let bw of badWords) {
    if(lowerInput.includes(bw)) {
      return "No respondemos este tipo de preguntas, por favor haznos la pregunta correcta de negocios.";
    }
  }

  // 2. Saludos cortos
  if(lowerInput === "hola" || lowerInput === "buenas" || lowerInput === "ola") {
    return "¡Hola! Soy el Asistente Inteligente de OpenCORE. ¿En qué te podemos ayudar con respecto a migraciones empresariales o tecnología de misión crítica?";
  }

  // 3. Evaluar Base de Datos
  const answer = getBestMatch(input);
  if (answer) {
    return answer;
  }

  // 4. Inteligente derivado
  const words = cleanInput.split(' ').length;
  if(words > 3) {
    return "Por favor escríbenos directamente desde el formulario de contacto, nos interesa responder tu requerimiento pero no dispongo de la información adecuada para darte una respuesta técnica informada en este chat.";
  }

  return "¿Podrías detallar tu pregunta empresarial para poder ayudarte mejor?";
}

// --- DOM INJECTION & UI LOGIC ---

document.addEventListener("DOMContentLoaded", () => {
  // Inject HTML
  const chatHTML = `
    <!-- Botón lanzador -->
    <div class="oc-chat-trigger" id="ocChatTrigger">
      <svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
      <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </div>

    <!-- Ventana del Chat -->
    <div class="oc-chat-window" id="ocChatWindow">
      <div class="oc-chat-header">
        <div class="oc-chat-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="10" rx="2"></rect>
            <circle cx="12" cy="5" r="2"></circle>
            <path d="M12 7v4"></path>
            <line x1="8" y1="16" x2="8" y2="16"></line>
            <line x1="16" y1="16" x2="16" y2="16"></line>
          </svg>
        </div>
        <div class="oc-chat-title">
          <h4>Asistente OpenCORE</h4>
          <span>Online</span>
        </div>
      </div>
      
      <div class="oc-chat-body" id="ocChatBody">
        <div class="oc-msg bot">Hola. Soy el asistente IA de OpenCORE Consulting. Consulta cualquier duda sobre nuestra metodología operativa, SLAs, costos o proyectos.</div>
      </div>

      <div class="oc-chat-footer">
        <input type="text" id="ocChatInput" class="oc-chat-input" placeholder="Escribe tu consulta corporativa..." autocomplete="off">
        <button id="ocChatSend" class="oc-chat-send">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', chatHTML);

  const trigger = document.getElementById('ocChatTrigger');
  const win = document.getElementById('ocChatWindow');
  const body = document.getElementById('ocChatBody');
  const input = document.getElementById('ocChatInput');
  const sendBtn = document.getElementById('ocChatSend');

  // Toggle
  trigger.addEventListener('click', () => {
    trigger.classList.toggle('active');
    win.classList.toggle('open');
    if(win.classList.contains('open')) {
      input.focus();
    }
  });

  function appendUserMsg(txt) {
    const d = document.createElement('div');
    d.className = 'oc-msg user';
    d.innerText = txt;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
  }

  function appendBotMsg(txt) {
    const d = document.createElement('div');
    d.className = 'oc-msg bot';
    d.innerText = txt;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
  }

  function appendTyping() {
    const d = document.createElement('div');
    d.className = 'oc-msg bot oc-typing-wrapper';
    d.id = 'ocTyping';
    d.innerHTML = '<div class="oc-typing"><div class="oc-dot"></div><div class="oc-dot"></div><div class="oc-dot"></div></div>';
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
  }

  function removeTyping() {
    const d = document.getElementById('ocTyping');
    if(d) d.remove();
  }

  function handleSend() {
    const txt = input.value.trim();
    if(!txt) return;

    appendUserMsg(txt);
    input.value = '';
    appendTyping();

    // Delay para simular que está "pensando / escribiendo"
    setTimeout(() => {
      removeTyping();
      const response = processInput(txt);
      appendBotMsg(response);
    }, 1200);
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') handleSend();
  });

});
