const fs = require('fs');

const v3Path = 'c:/Users/coook/Desktop/Opencore Web7.0/v3/js/chatbot.js';
const v4Path = 'c:/Users/coook/Desktop/Opencore Web7.0/v4/js/chatbot.js';

let v3Content = fs.readFileSync(v3Path, 'utf8');
let v4Content = fs.readFileSync(v4Path, 'utf8');

const directIntents = `
  // ═══ INTENCIONES DIRECTAS: TIPO DE SERVICIOS / PROYECTOS / EXPERIENCIA ═══
  { q: "¿Qué servicios ofrecen?", a: "Consultoría de arquitectura empresarial, rescate de proyectos fallidos, integración de sistemas críticos (ERP, WMS, SAP, MS Dynamics), automatización de procesos, migración cloud y modernización de software legacy." },
  { q: "¿Qué tipo de servicios tienen?", a: "Nuestros servicios se agrupan en cuatro ejes: diagnóstico técnico, rescate y modernización de sistemas, integración empresarial (ERP/WMS/APIs) y automatización con n8n, Node.js y Docker." },
  { q: "¿Cuáles son sus servicios?", a: "Arquitectura de software, consultoría ejecutiva, integración de sistemas empresariales, rescate de proyectos fallidos, automatización de procesos, migración cloud y desarrollo de soluciones críticas a medida." },
  { q: "¿En qué servicios se especializan?", a: "Nuestro diferencial es el diagnóstico clínico de software: encontramos el fallo que otros no ven. Nos especializamos en sistemas críticos, integración empresarial y rescate de proyectos que ya fallaron con otros proveedores." },
  { q: "¿Qué tipo de consultoría hacen?", a: "Consultoría tecnológica senior: diagnóstico de sistemas, arquitectura empresarial, estrategia de integración, auditoría técnica y asesoría para decisiones de inversión en tecnología." },
  { q: "¿En qué áreas trabajan?", a: "Trabajamos en arquitectura de software, integración de sistemas críticos, automatización de procesos, cloud computing, rescate de proyectos fallidos y modernización de sistemas legacy." },
  { q: "¿Qué hacen exactamente?", a: "Somos una consultora boutique de arquitectura y tecnología empresarial. Diagnosticamos, rescatamos, integramos y modernizamos sistemas críticos para medianas y grandes empresas en Chile." },
  { q: "¿Qué ofrecen exactamente?", a: "Diagnóstico técnico, arquitectura de software, integración de sistemas ERP/WMS/SAP, automatización con n8n/Node.js, migración cloud (AWS/GCP/Azure) y consultoría estratégica de tecnología." },
  { q: "¿Cuáles son sus servicios principales?", a: "Los servicios principales son: rescate de sistemas fallidos, integración empresarial (ERP/WMS/SAP), automatización de procesos, migración cloud y consultoría de arquitectura. Todo comienza con un diagnóstico honesto." },
  { q: "¿Tienen servicio de CTO externo?", a: "Sí. Ofrecemos modalidad de CTO Externo o Área Tecnológica as-a-Service: gestionamos la arquitectura, proveedores tecnológicos y decisiones técnicas estratégicas de tu empresa." },

  // ═══ INTENCIONES DIRECTAS: TIPO DE PROYECTOS ═══
  { q: "¿Qué tipo de proyectos hacen?", a: "Rescate de sistemas fallidos, integración ERP/WMS/SAP, migración cloud, automatización de procesos con n8n, desarrollo de APIs críticas y modernización de software legacy. Siempre con diagnóstico técnico previo." },
  { q: "¿Qué tipo de proyectos ofrecen?", a: "Desde diagnóstico técnico y auditorías hasta proyectos llave en mano: integración empresarial, automatización, migración cloud y rescate de sistemas críticos. Cada proyecto parte con evaluación real." },
  { q: "¿Con qué proyectos trabajan?", a: "Proyectos de alta complejidad técnica: sistemas heredados que nadie logró modernizar, integraciones ERP fallidas, automatizaciones críticas y migraciones cloud. Nos especializamos en lo que ya fracasó con otros." },
  { q: "¿Qué proyectos han realizado?", a: "Por NDA no revelamos clientes, pero nuestro historial incluye rescate de sistemas de inventario, integración de ERPs corporativos, automatización de flujos logísticos y migración a cloud. Mostramos casos bajo acuerdo de confidencialidad." },
  { q: "¿Cuáles son sus proyectos típicos?", a: "Los más frecuentes: rescate de software fallido, integración ERP/WMS, automatización con n8n, migración cloud y desarrollo de APIs para sistemas de alto tráfico y criticidad operacional." },
  { q: "¿Qué proyectos mínimos aceptan?", a: "El mínimo práctico es ~30 UF mensuales. Proyectos más pequeños pueden no tener la continuidad necesaria para avanzar con calidad. Para requerimientos puntuales existe la modalidad por horas o bolsa de horas." },
  { q: "¿Pueden mostrar proyectos anteriores?", a: "Sí, bajo NDA. Mostramos arquitectura, alcance y resultados de proyectos previos en sesión privada con los arquitectos. El primer paso es agendar un diagnóstico VIP de 15 minutos para evaluar el fit." },
  { q: "¿Qué escala tienen sus proyectos?", a: "Desde intervenciones puntuales de consultoría (bolsa de horas) hasta proyectos corporativos de 300 a 500+ UF. El tamaño exacto lo definimos tras diagnóstico técnico." },

  // ═══ INTENCIONES DIRECTAS: EXPERIENCIA / TRAYECTORIA ═══
  { q: "¿Qué experiencia tienen?", a: "Arquitectos senior con trayectoria real en proyectos de alta complejidad: integración de ERP, rescate de sistemas críticos, automatización empresarial y consultoría estratégica para empresas medianas y grandes en Chile." },
  { q: "¿Cuánta experiencia tienen?", a: "Experiencia acumulada en proyectos reales de alta complejidad. El equipo incluye arquitectos senior con historial en integración de sistemas críticos, automatización empresarial y rescate de proyectos fallidos." },
  { q: "¿Qué tipo de experiencia tienen?", a: "Experiencia técnica y ejecutiva aplicada en escenarios reales: diagnóstico de sistemas, arquitectura empresarial, integración ERP/WMS/SAP, automatización y rescate de proyectos. No teórica: probada en campo." },
  { q: "¿Cuántos años llevan en el mercado?", a: "El equipo acumula años de experiencia senior en consultoría tecnológica empresarial. Nuestra trayectoria está en los proyectos resueltos y los sistemas que hoy operan gracias a nuestro trabajo." },
  { q: "¿Tienen trayectoria comprobable?", a: "Sí. Jorge Quezada Senior y Junior tienen trayectoria real en estrategia tecnológica, arquitectura empresarial y proyectos críticos. Los detalles se comparten bajo NDA en reunión inicial." },
  { q: "¿Son consultores seniors?", a: "Sí. OpenCORE opera con perfil senior. No somos una fábrica de código junior: cada proyecto es liderado por arquitectos y consultores con experiencia real en escenarios complejos de alta criticidad." },
  { q: "¿Tienen experiencia con ERP?", a: "Sí. Integramos y rescatamos proyectos con SAP, MS Dynamics, WMS y ERPs a medida. Es una de nuestras especialidades más demandadas por empresas medianas y grandes." },
  { q: "¿Han trabajado con empresas grandes?", a: "Sí. Nuestro perfil natural son empresas medianas y grandes. Por NDA no revelamos nombres, pero tenemos experiencia en sectores como retail, logística, turismo y servicios financieros." },

  // ═══ EQUIPO / OUTSOURCING ═══
  { q: "¿Quiénes integran el equipo?", a: "El núcleo está formado por Jorge Quezada Senior (dirección ejecutiva y estrategia) y Jorge Quezada Junior (arquitectura y consultoría técnica), complementados por especialistas asociados según proyecto." },
  { q: "¿Hacen outsourcing de TI?", a: "Sí. Ofrecemos outsourcing de arquitectura y consultoría tecnológica en modalidad de retainer mensual, con dedicación de arquitecto senior o equipo técnico completo según el alcance acordado." },
  { q: "¿Pueden ser el área de tecnología de mi empresa?", a: "Sí. En modalidad de CTO Externo o Área Tecnológica as-a-Service gestionamos la arquitectura, proveedores tecnológicos y decisiones técnicas estratégicas para tu empresa." },
  { q: "¿Por qué elegir OpenCORE?", a: "Por diagnóstico clínico real: encontramos el fallo que otros no ven. No prometemos magia, prometemos ingeniería rigurosa. Si un software no tiene salvación, lo decimos desde el día uno." },
  { q: "¿Qué los diferencia de otras consultoras?", a: "El rigor diagnóstico previo al código, la experiencia real en sistemas críticos fallidos, la transparencia contractual y el perfil senior del equipo. No somos una fábrica de software: somos arquitectos de soluciones." },
  { q: "¿Tienen casos de éxito?", a: "Sí, bajo NDA. Rescate de sistemas de inventario que bloqueaban operaciones, integración de ERPs en standby, automatizaciones que eliminaron procesos manuales críticos. Mostramos en reunión con acuerdo de confidencialidad." }`;

const securityAndTech = `\n  // ═══ SEGURIDAD, FALLOS Y RIESGOS ═══
  { q: "¿Es seguro trabajar con ustedes?", a: "Absolutamente. Firmamos NDA (Acuerdo de Confidencialidad) antes de ver cualquier código o dato. La seguridad, el aislamiento de datos y la protección de su propiedad intelectual son la base de nuestros contratos." },
  { q: "¿Qué pasa si el sistema falla?", a: "Nuestras arquitecturas incluyen monitoreo activo, redundancia y planes de contingencia (DRP). Si ocurre un fallo en un sistema bajo nuestra administración/soporte, garantizamos tiempos de respuesta (SLA) estructurados para restaurar la operacion critica." },
  { q: "¿Qué pasa si me hackean?", a: "Aplicamos prácticas de seguridad defensiva (OWASP, cifrado en tránsito/reposo, aislamiento BBDD). Si usted sufre vulneración por otro vector, apoyamos en la contención técnica, auditoría forense y levantamiento seguro del servicio." },
  { q: "¿Cómo protegen mis datos?", a: "Los datos de su empresa le pertenecen 100%. Usamos arquitecturas certificadas en cloud (AWS/GCP/Azure) con cifrado y backups automatizados. No retenemos datos en infraestructura local insegura." },
  { q: "¿Qué garantías ofrecen sobre el código?", a: "Entregamos el código fuente íntegro a nuestros clientes, documentado y sin bloqueos artificiales (vendor lock-in). Usted no es rehén de OpenCORE." },

  // ═══ TECNOLOGÍA, STACK Y DESARROLLO DE LA PÁGINA ═══
  { q: "¿Cómo está hecha esta página?", a: "Esta web está construida con arquitectura moderna serverless, optimizada al extremo. Usa CSS avanzado para efectos GPU (hardware acceleration), canvas interactivo, sin frameworks pesados (Vanilla JS) permitiendo 60fps constantes incluso en móvil." },
  { q: "¿Qué tecnologías usan?", a: "Para desarrollo empresarial: Node.js, NestJS, Python, arquitecturas de microservicios, bases de datos SQL/NoSQL avanzadas. En integraciones B2B: n8n, Docker e interfaces con SAP, Salesforce y ERPs locales." },
  { q: "¿Este chatbot usa IA real?", a: "Sí y no. Este chat principal utiliza un motor NLP propietario optimizado (fast-text match, Levenshtein, Bigrams). Cuando el nivel de complejidad lo amerita, escala transparentemente a llamadas API hacia LLMs avanzados (Gemini 2.5 Flash / GPT-4) vía un proxy interno." },
  { q: "¿Qué tecnología usa este chatbot?", a: "Es un desarrollo propio en JavaScript de ultra-bajo peso. Emplea un algoritmo de NLP local (fuzzy matching + NLP heurístico) sin latencia de ping, con soporte de escalamiento a Gemini Flash en el backend para razonamiento complejo." },
  { q: "¿La web está optimizada para celulares?", a: "Sí, es mobile-first con PWA capabilities opcionales. Todo el layout de grid, tipografía fluida y motor gráfico interactivo escala manteniendo alto rendimiento y batería en dispositivos móviles." },`;

v3Content = v3Content.replace(/50 UF/g, '30 UF');
v4Content = v4Content.replace(/50 UF/g, '30 UF');

const matchInsertV4 = `  { q: "¿Qué tan rápido pueden entregar una cotización formal?", a: "Una estimación inicial la podemos dar en la primera reunión. Una propuesta técnica formal con desglose de horas y costos requiere diagnóstico previo, típicamente entre 3 y 10 días hábiles según complejidad." }\n];`;
v4Content = v4Content.replace(matchInsertV4, `  { q: "¿Qué tan rápido pueden entregar una cotización formal?", a: "Una estimación inicial la podemos dar en la primera reunión. Una propuesta técnica formal con desglose de horas y costos requiere diagnóstico previo, típicamente entre 3 y 10 días hábiles según complejidad." },\n${directIntents}\n];`);

const finalItemMatch = `  { q: "¿Tienen casos de éxito?", a: "Sí, bajo NDA. Rescate de sistemas de inventario que bloqueaban operaciones, integración de ERPs en standby, automatizaciones que eliminaron procesos manuales críticos. Mostramos en reunión con acuerdo de confidencialidad." }\n];`;
v3Content = v3Content.replace(finalItemMatch, `  { q: "¿Tienen casos de éxito?", a: "Sí, bajo NDA. Rescate de sistemas de inventario que bloqueaban operaciones, integración de ERPs en standby, automatizaciones que eliminaron procesos manuales críticos. Mostramos en reunión con acuerdo de confidencialidad." },\n${securityAndTech}\n];`);
v4Content = v4Content.replace(finalItemMatch, `  { q: "¿Tienen casos de éxito?", a: "Sí, bajo NDA. Rescate de sistemas de inventario que bloqueaban operaciones, integración de ERPs en standby, automatizaciones que eliminaron procesos manuales críticos. Mostramos en reunión con acuerdo de confidencialidad." },\n${securityAndTech}\n];`);

fs.writeFileSync(v3Path, v3Content, 'utf8');
fs.writeFileSync(v4Path, v4Content, 'utf8');
console.log('Update success');
