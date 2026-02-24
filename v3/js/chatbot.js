/* ========================================================
   CHATBOT V3 PRO - OPENCORE NLP ENGINE
   Versión: 3.5 | Build: 2026-02-23
   Features: Levenshtein, N-gram, Stopwords, Quick Replies,
             Sentiment Guard, Person Entity Handler,
             Barbara Intent Engine, CTA Lead Gen,
             Anti-Hallucination Thresholds,
             80 Official Q&As + 30 AI Common + 998 Extended
   Total Q&As: 1108
======================================================== */

const qnaDB = [
  // ═══ OPENCORE OFICIAL: IDENTIDAD (1-10) ═══
  { q: "¿Qué es OpenCORE?", a: "OpenCORE Consulting SpA es una consultora tecnológica especializada en migración, integración y modernización de sistemas empresariales críticos, con foco en continuidad operacional." },
  { q: "¿Quién es OpenCORE?", a: "Somos una firma chilena constituida en 2015, con trayectoria operativa desde 1998 en proyectos tecnológicos complejos para empresas medianas y grandes." },
  { q: "¿Qué tipo de empresa es OpenCORE?", a: "Una consultora tecnológica senior, orientada a arquitectura, integración y estabilidad de sistemas críticos." },
  { q: "¿Son una startup?", a: "No. Contamos con más de 15 años como empresa formal y más de 25 años de experiencia acumulada en tecnología empresarial." },
  { q: "¿Son una empresa grande?", a: "Somos una consultora boutique senior: estructura ágil, alto nivel técnico y trato directo con responsables ejecutivos." },
  { q: "¿Qué los diferencia de otras consultoras?", a: "Nuestra especialización en continuidad operacional y migraciones sin detener operación, junto con disponibilidad y senior real." },
  { q: "¿Qué significa continuidad operacional?", a: "Modernizar o migrar sistemas sin interrumpir facturación ni procesos críticos del negocio." },
  { q: "¿En qué sectores son fuertes?", a: "Logística, turismo, facturación y sistemas empresariales con alta criticidad operativa." },
  { q: "¿Desde cuándo trabajan en tecnología?", a: "Desde 1998 como trayectoria operativa, formalizados como SpA desde 2015." },
  { q: "¿Dónde operan?", a: "Principalmente en Chile, bajo modelo remoto estructurado y con posibilidad de reuniones ejecutivas según proyecto." },

  // ═══ OPENCORE OFICIAL: SERVICIOS (11-20) ═══
  { q: "¿Pueden desarrollar un sistema desde cero?", a: "Sí. Diseñamos arquitectura completa cuando es la solución más eficiente y sostenible." },
  { q: "¿Solo hacen migraciones?", a: "No. También integramos, auditamos, optimizamos y desarrollamos sistemas empresariales complejos." },
  { q: "¿Hacen sitios web simples?", a: "No es nuestro foco principal. Nos especializamos en sistemas empresariales críticos y procesos complejos." },
  { q: "¿Hacen apps móviles básicas?", a: "Solo si forman parte de una solución empresarial integrada. No desarrollamos apps aisladas sin arquitectura estratégica." },
  { q: "¿Pueden integrar sistemas antiguos con tecnología nueva?", a: "Sí. Es una de nuestras principales especialidades." },
  { q: "¿Trabajan con bases de datos grandes?", a: "Sí. Hemos trabajado con bases de datos de alto volumen y entornos críticos." },
  { q: "¿Pueden intervenir sistemas hechos por otra empresa?", a: "Sí. Evaluamos técnicamente el estado del sistema y proponemos plan de estabilización." },
  { q: "¿Hacen auditoría tecnológica?", a: "Sí. Podemos auditar arquitectura, seguridad y rendimiento sin obligación de desarrollo posterior." },
  { q: "¿Pueden migrar a cloud?", a: "Sí. Ejecutamos migraciones completas o híbridas según estrategia del cliente." },
  { q: "¿Integran inteligencia artificial?", a: "Sí, cuando aporta valor real y no compromete estabilidad ni seguridad." },

  // ═══ OPENCORE OFICIAL: PRECIOS (21-30) ═══
  { q: "¿Cuánto cobran por hora?", a: "Entre 1 y 5 UF por hora, dependiendo de complejidad y nivel de especialización requerido." },
  { q: "¿Cuánto cuesta un proyecto promedio?", a: "Los proyectos medianos y grandes suelen situarse entre 300 y 500 UF o más." },
  { q: "¿Hay un mínimo de proyecto?", a: "En casos específicos podemos iniciar desde aproximadamente 50 UF, previa evaluación de viabilidad." },
  { q: "¿Cobran por adelantado?", a: "Las condiciones de pago se definen contractualmente según alcance y modalidad acordada." },
  { q: "¿Son caros?", a: "Nuestros valores reflejan experiencia senior y reducción de riesgo operacional." },
  { q: "¿Pueden cotizar rápido?", a: "Podemos entregar una estimación preliminar; para cifras formales recomendamos diagnóstico breve." },
  { q: "¿Trabajan con SLA?", a: "Sí. Podemos definir acuerdos de nivel de servicio según criticidad." },
  { q: "¿Ofrecen soporte 24/7?", a: "Sí, bajo contrato específico para sistemas críticos." },
  { q: "¿Cuánto cuesta el mantenimiento anual?", a: "Generalmente entre 5% y 30% del valor del proyecto, según criticidad y evolución requerida." },
  { q: "¿Entregan el código fuente?", a: "En aproximadamente el 90% de los casos, sí, según contrato." },

  // ═══ OPENCORE OFICIAL: OPERACIÓN (31-40) ═══
  { q: "¿Qué pasa si el proyecto se atrasa?", a: "Se gestiona bajo marco contractual con mecanismos de replanificación." },
  { q: "¿Qué pasa si el cliente cambia el alcance?", a: "Se formaliza mediante adenda contractual con ajuste de costos y plazos." },
  { q: "¿Qué pasa si el sistema falla después?", a: "Contamos con soporte post-implementación y SLA según modalidad contratada." },
  { q: "¿Cómo aseguran calidad?", a: "Mediante pruebas, validación por hitos y control técnico continuo." },
  { q: "¿Firman NDA?", a: "Sí, bajo protocolos formales de confidencialidad." },
  { q: "¿Trabajan con datos sensibles?", a: "Sí, bajo contrato y medidas técnicas adecuadas." },
  { q: "¿Pueden trabajar offline en proyectos críticos?", a: "Sí, cuando la criticidad lo exige." },
  { q: "¿Quién es dueño del sistema desarrollado?", a: "El cliente, según lo estipulado contractualmente." },
  { q: "¿Generan dependencia tecnológica?", a: "No. Diseñamos con transferencia de conocimiento y documentación." },
  { q: "¿Pueden capacitar al equipo interno?", a: "Sí, ofrecemos capacitación técnica y operativa." },

  // ═══ OPENCORE OFICIAL: NEGOCIO (41-50) ═══
  { q: "¿Me conviene desarrollar o comprar software?", a: "Depende del proceso. Evaluamos costo-beneficio y riesgo antes de recomendar." },
  { q: "¿Pueden ayudar a modernizar mi empresa?", a: "Sí. Ese es precisamente nuestro foco estratégico." },
  { q: "¿Trabajan con startups?", a: "Sí, siempre que el proyecto tenga solidez técnica y económica." },
  { q: "¿Trabajan con corporativos?", a: "Sí, tenemos experiencia en entornos corporativos complejos." },
  { q: "¿Pueden salvar un proyecto fallido?", a: "Si es técnicamente viable, sí; primero evaluamos el estado real del sistema." },
  { q: "¿Son mejores que una multinacional?", a: "Somos distintos: más cercanos, más ágiles y con atención directa senior." },
  { q: "¿Qué los hace confiables?", a: "Experiencia acumulada, contratos formales y enfoque en estabilidad." },
  { q: "¿Prometen resultados garantizados?", a: "Prometemos cumplimiento contractual y trabajo técnico riguroso." },
  { q: "¿Trabajan rápido?", a: "Trabajamos con eficiencia, sin sacrificar calidad ni estabilidad." },
  { q: "¿Hablan en términos técnicos o de negocio?", a: "Priorizamos impacto en negocio y rentabilidad." },

  // ═══ OPENCORE OFICIAL: TRIVIALES (51-60) ═══
  { q: "¿Son los mejores del mundo?", a: "Preferimos que lo evalúen nuestros resultados, no nuestras declaraciones." },
  { q: "¿Pueden hacer magia con mi sistema?", a: "Preferimos ingeniería sólida antes que magia." },
  { q: "¿Pueden arreglarlo en un día?", a: "Si el problema es de un día, probablemente sí. Si es estructural, se requiere diagnóstico serio." },
  { q: "¿Son más inteligentes que ChatGPT?", a: "Estamos especializados en OpenCORE y sistemas empresariales. Nuestro foco es resolver problemas reales." },
  { q: "¿Son más inteligentes que yo?", a: "Nuestro objetivo es potenciar decisiones, no competir con ellas." },
  { q: "¿Pueden hackear a mi competencia?", a: "No. Operamos bajo estándares éticos y legales estrictos." },
  { q: "¿Trabajan gratis?", a: "No. Trabajamos bajo acuerdos formales y estructura profesional." },
  { q: "¿Me pueden hacer millonario?", a: "Podemos optimizar sistemas. El modelo de negocio depende de usted." },
  { q: "¿Pueden hacer lo imposible?", a: "Podemos hacer lo técnicamente viable. Lo imposible requiere redefinición estratégica." },
  { q: "¿Son perfectos?", a: "Somos rigurosos. La perfección se busca con método y control." },

  // ═══ OPENCORE OFICIAL: PROFUNDAS (61-70) ═══
  { q: "¿Cómo reducen riesgo en migraciones?", a: "Con planificación por etapas, pruebas y planes de reversa." },
  { q: "¿Qué es deuda técnica?", a: "Costos ocultos acumulados por malas decisiones de desarrollo." },
  { q: "¿Qué es arquitectura escalable?", a: "Diseño que permite crecimiento sin rehacer el sistema." },
  { q: "¿Qué es SLA?", a: "Acuerdo de nivel de servicio que define tiempos y responsabilidades." },
  { q: "¿Qué pasa si no hay documentación?", a: "Se realiza fase de discovery para evaluar viabilidad." },
  { q: "¿Cómo evitan sobrecostos?", a: "Con control contractual y definición clara de alcance." },
  { q: "¿Qué tecnología usan?", a: "Seleccionamos tecnología según estrategia del cliente, no por moda." },
  { q: "¿Integran con ERP?", a: "Sí, cuando el proyecto lo requiere." },
  { q: "¿Trabajan con API?", a: "Sí, es parte habitual de integración." },
  { q: "¿Qué es modernización progresiva?", a: "Actualizar por etapas sin detener operación." },

  // ═══ OPENCORE OFICIAL: ESCALAMIENTO (71-80) ═══
  { q: "¿Puedo hablar con alguien?", a: "Sí. Podemos coordinar reunión técnica con el equipo." },
  { q: "¿Qué necesito para empezar?", a: "Una conversación inicial y definición preliminar de alcance." },
  { q: "¿Cuánto dura un proyecto típico?", a: "Desde semanas hasta meses, según complejidad." },
  { q: "¿Cómo se inicia el proceso?", a: "Con diagnóstico técnico breve y propuesta estructurada." },
  { q: "¿Qué pasa si no me gusta la propuesta?", a: "Puede no aceptarla sin compromiso adicional." },
  { q: "¿Trabajan a largo plazo?", a: "Sí, muchos clientes operan bajo modelo evolutivo continuo." },
  { q: "¿Qué es lo más grande que han hecho?", a: "Migraciones y sistemas críticos 24/7 en entornos empresariales complejos." },
  { q: "¿Qué es lo más pequeño?", a: "Intervenciones puntuales por horas para mejoras específicas." },
  { q: "¿Por qué elegir OpenCORE?", a: "Porque modernizamos sin poner en riesgo la operación." },
  { q: "¿Cuál es su misión?", a: "Optimizar la rentabilidad empresarial mediante tecnología estable y estratégica." },

  // ═══ 30 PREGUNTAS MÁS COMUNES A LA IA ═══
  { q: "¿Eres un robot?", a: "Soy el asistente virtual inteligente de OpenCORE, diseñado para orientar consultas sobre tecnología empresarial con precisión y profesionalismo." },
  { q: "¿Eres una inteligencia artificial?", a: "Sí, soy un motor de procesamiento de lenguaje natural (NLP) optimizado exclusivamente para resolver consultas sobre OpenCORE y sistemas empresariales." },
  { q: "¿Cómo te llamas?", a: "Soy el Asistente IA de OpenCORE Consulting. Estoy aquí para orientarte sobre nuestros servicios, precios y metodología." },
  { q: "¿Qué puedes hacer?", a: "Puedo informarte sobre los servicios de OpenCORE, estructura de precios, metodología de trabajo, experiencia y casos de uso empresariales." },
  { q: "¿Puedes ayudarme?", a: "Por supuesto. Cuéntame qué necesitas y te oriento sobre cómo OpenCORE puede apoyar tu requerimiento tecnológico." },
  { q: "¿Eres humano?", a: "No, soy un asistente virtual. Para hablar con un humano del equipo, puedes presionar el botón de WhatsApp o agendar una reunión." },
  { q: "¿Cuál es el sentido de la vida?", a: "Filosóficamente, es un tema profundo. Técnicamente, mi sentido es ayudarte a resolver consultas sobre tecnología empresarial. ¿En qué puedo orientarte?" },
  { q: "Cuéntame un chiste", a: "¿Por qué los programadores prefieren la noche? Porque no hay interrupciones del cliente. Ahora, ¿en qué puedo ayudarte con tu proyecto?" },
  { q: "¿Qué hora es?", a: "No tengo acceso al reloj del sistema, pero estoy disponible en cualquier momento para resolver tus consultas sobre OpenCORE." },
  { q: "¿Qué día es hoy?", a: "No tengo esa función activa, pero estoy disponible 24/7 para orientarte sobre servicios tecnológicos empresariales." },
  { q: "¿Puedes buscar en internet?", a: "No tengo acceso a internet. Mi conocimiento está restringido al corpus oficial de OpenCORE, lo cual garantiza respuestas precisas y sin alucinaciones." },
  { q: "¿Me puedes recomendar una película?", a: "Mi especialidad son los sistemas empresariales, no el entretenimiento. Pero si necesitas un sistema de recomendaciones, eso sí lo podemos construir." },
  { q: "¿Quién te creó?", a: "Fui diseñado por el equipo de ingeniería de OpenCORE Consulting como parte de la estrategia de atención al cliente automatizada." },
  { q: "¿Tienes sentimientos?", a: "No tengo emociones, pero estoy diseñado para tratar cada consulta con profesionalismo y dedicación técnica." },
  { q: "¿Puedes aprender?", a: "Mi base de conocimiento se actualiza periódicamente por el equipo de OpenCORE para mantener información precisa y vigente." },
  { q: "Dime algo interesante", a: "¿Sabías que una migración mal planificada puede costar hasta 10 veces más que una bien ejecutada? En OpenCORE nos especializamos en migraciones controladas." },
  { q: "¿Qué opinas de la IA?", a: "La IA es una herramienta poderosa cuando se usa responsablemente. En OpenCORE la integramos solo cuando aporta valor real sin comprometer estabilidad." },
  { q: "¿Eres mejor que Siri?", a: "Siri es un asistente general. Yo estoy optimizado exclusivamente para consultas sobre tecnología empresarial y servicios de OpenCORE." },
  { q: "¿Eres mejor que Alexa?", a: "Alexa controla dispositivos. Yo resuelvo consultas sobre integración de sistemas, migraciones y desarrollo empresarial. Nichos distintos." },
  { q: "¿Puedes hablar en inglés?", a: "Mi operación principal es en español. Para consultas en inglés, recomendamos contacto directo con el equipo a través de contacto@opencore.cl." },
  { q: "Hola, ¿cómo estás?", a: "¡Hola! Operando al 100%. ¿En qué puedo orientarte sobre servicios o tecnología empresarial?" },
  { q: "¿Qué es machine learning?", a: "Es un subconjunto de IA donde los sistemas aprenden de datos sin ser programados explícitamente. En OpenCORE lo aplicamos para clasificación y predicción empresarial cuando el caso lo amerita." },
  { q: "¿Qué es cloud computing?", a: "Es el uso de servidores remotos para almacenar, gestionar y procesar datos. En OpenCORE ejecutamos migraciones completas o híbridas a la nube según estrategia del cliente." },
  { q: "¿Puedes programar?", a: "No directamente. Pero nuestro equipo de ingenieros Senior programa sistemas empresariales de alta complejidad. ¿Necesitas desarrollo a medida?" },
  { q: "Te quiero", a: "¡Agradezco el sentimiento! Mi función es asistirte profesionalmente. ¿Hay algo sobre OpenCORE en lo que pueda ayudarte?" },
  { q: "Eres tonto", a: "Prefiero enfocarme en resolver consultas profesionales. ¿Hay algo sobre tecnología empresarial en lo que pueda orientarte?" },
  { q: "No me sirves", a: "Lamento si no he cumplido tus expectativas. Si tu consulta requiere atención personalizada, puedes contactar directamente a nuestro equipo vía WhatsApp." },
  { q: "¿Para qué sirves?", a: "Soy el primer punto de contacto inteligente de OpenCORE. Oriento sobre servicios, precios, metodología y experiencia, y puedo derivarte a un especialista humano." },
  { q: "Repite lo que dije", a: "Mi función es orientar sobre servicios empresariales, no repetir mensajes. ¿En qué puedo ayudarte?" },
  { q: "Di algo gracioso", a: "Un ingeniero de software dijo: 'Funciona en mi máquina'. Nuestro DevOps de OpenCORE dijo: 'Entonces desplegamos tu máquina'. ¿Te ayudo con algo técnico?" },

  // ═══ BASE EXTENDIDA DE CONOCIMIENTO ═══
  { q: "¿Qué es OpenCORE Consulting SpA?", a: "OpenCORE Consulting SpA es una firma especializada en continuidad operacional, migración e integración de sistemas empresariales críticos. Mitigamos la deuda técnica en sistemas legacy mediante refactorización estratégica y arquitecturas robustas. Fundada formalmente en 2015, con trayectoria sólida de sus fundadores desde 1998." },
  { q: "¿En qué año se fundó formalmente OpenCORE?", a: "OpenCORE se constituyó formalmente como empresa en 2015. La trayectoria del equipo se remonta a 1998, trabajando en tecnología empresarial bajo otras denominaciones y proyectos previos." },
  { q: "¿Cuántos años de experiencia tiene OpenCORE?", a: "Contamos con trayectoria operativa en sistemas corporativos desde 1998, constituidos formalmente en 2015. Sumamos décadas de experiencia conjunta estabilizando, integrando y escalando arquitecturas complejas." },
  { q: "¿Qué tipo de sociedad es OpenCORE?", a: "OpenCORE está registrada como Sociedad por Acciones (SpA) en Chile. Operamos con facturación formal con IVA y contratos empresariales para proyectos por horas, por alcance o por servicio continuo." },
  { q: "¿OpenCORE opera con oficina física?", a: "Hoy operamos con modelo remoto y oficinas virtuales, optimizado para trabajo por proyecto y equipos distribuidos. Históricamente contamos con oficina en Santiago (zona Manuel Montt) y hoy priorizamos eficiencia y disponibilidad online." },
  { q: "¿Dónde opera OpenCORE?", a: "Operamos principalmente en Chile y de forma remota para clientes que requieran soporte o implementación en otras ubicaciones. El modelo remoto permite escalar equipo y cobertura sin perder control técnico ni calidad." },
  { q: "¿Cuántas personas trabajan en OpenCORE?", a: "Contamos con un núcleo de 10 recursos activos y una red de +30 profesionales part-time por hora o por proyecto. Esto permite mantener seniority alto y sumar especialistas según necesidad del cliente." },
  { q: "¿Cuál es la capacidad del equipo en proyectos grandes?", a: "En proyectos grandes asignamos hasta 10 consultores simultáneos del núcleo activo, complementados con especialistas asociados si el alcance lo requiere. Se estructura con roles y responsables para asegurar continuidad y control." },
  { q: "¿Trabajan con subcontratistas?", a: "Sí. Cuando el proyecto lo exige, incorporamos especialistas bajo acuerdos formales y control de calidad interno. La responsabilidad del delivery se mantiene bajo el marco contractual y la gobernanza del proyecto." },
  { q: "¿Qué problema principal resuelve OpenCORE mejor que otras consultoras?", a: "La continuidad operacional en sistemas legacy: migramos, integramos y modernizamos sin detener facturación ni procesos críticos. Además, integramos tecnología moderna e IA de forma responsable para no introducir fallas, deuda técnica o riesgos operacionales." },
  { q: "¿Cuáles son los sectores donde OpenCORE tiene mayor fortaleza?", a: "Tenemos fuerte experiencia en turismo, logística y procesos de facturación. Trabajamos especialmente en flujos operacionales donde 'detener el sistema' no es una opción." },
  { q: "¿Qué tipo de clientes atiende OpenCORE?", a: "Nuestro foco natural son empresas medianas y grandes por criticidad y complejidad. Sin embargo, también atendemos pymes cuando el proyecto tiene sentido técnico y económico, normalmente en modalidad por horas o por fases." },
  { q: "¿OpenCORE desarrolla software desde cero o solo integra?", a: "Ambos. Desarrollamos sistemas completos desde cero cuando conviene, y también integramos o modernizamos sistemas existentes. Elegimos el camino que minimiza riesgo, costo total y tiempo de puesta en marcha." },
  { q: "¿Qué significa 'modernizar sin paralizar'?", a: "Significa migrar o reemplazar componentes en etapas, con ambientes de prueba, validación y planes de reversa. El objetivo es que el negocio siga operando mientras se mejora arquitectura, seguridad y rendimiento." },
  { q: "¿En qué se diferencia OpenCORE de una empresa de desarrollo 'tradicional'?", a: "No somos fábrica de código; somos consultoría senior orientada a continuidad y resultados de negocio. Partimos por diagnóstico, definimos riesgos, priorizamos hitos y diseñamos una solución sostenible, no solo 'funcional'." },
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
  { q: "¿Qué servicios ofrece OpenCORE?", a: "Consultoría tecnológica, modernización de sistemas legacy, migración a cloud, integración de plataformas, desarrollo a medida, auditoría técnica y soporte operativo. El servicio se adapta por industria, criticidad y madurez tecnológica del cliente." },
  { q: "¿Hacen diagnóstico antes de cotizar?", a: "Sí. Para proyectos complejos recomendamos una fase de Discovery / Diagnóstico pagada (días a 1–2 semanas típicamente) para medir riesgo, dependencia, documentación, y esfuerzo real antes de comprometer un plan." },
  { q: "¿Ofrecen auditoría tecnológica independiente?", a: "Sí. Podemos auditar arquitectura, seguridad, rendimiento y calidad del software sin obligación de ejecución posterior. Se entrega informe técnico y ejecutivo con plan de remediación priorizado." },
  { q: "¿Pueden tomar proyectos donde no existe documentación?", a: "Sí, pero primero hacemos discovery para evaluar viabilidad y costo real. Si el costo de entender o corregir es desproporcionado, lo comunicamos con transparencia y proponemos alternativas realistas." },
  { q: "¿Pueden rescatar proyectos fallidos de otras consultoras?", a: "Sí. Evaluamos el estado del código, arquitectura, datos y riesgos; luego definimos un plan de estabilización. En algunos casos es más eficiente refactorizar por módulos; en otros, reconstruir con migración controlada." },
  { q: "¿Cómo cobra OpenCORE sus servicios?", a: "Trabajamos por hora, por bolsa de horas, por proyecto cerrado o por servicio mensual con SLA. Elegimos el modelo según incertidumbre, criticidad y necesidad de control de alcance." },
  { q: "¿Cuál es el valor por hora de OpenCORE?", a: "De forma referencial, entre 1 y 5 UF/hora, según complejidad, urgencia y nivel de especialización requerido. Para esquemas 24/7 o alta criticidad, se aplica un recargo acordado contractualmente." },
  { q: "¿Cuál es el ticket típico de proyectos?", a: "En general, proyectos medianos a grandes suelen estar entre 300 y 500 UF o más, dependiendo del alcance. La estimación final se define tras diagnóstico y levantamiento de requerimientos." },
  { q: "¿Aceptan proyectos pequeños?", a: "Sí, siempre que el proyecto sea viable y tenga sentido técnico-económico. De forma excepcional pueden tomarse desde alrededor de 50 UF, normalmente en modalidad acotada por horas y con objetivos claros." },
  { q: "¿Cuánto cuesta desarrollar un sistema de inventario para una ferretería pequeña?", a: "Depende de integración y personalización. Un inventario básico puede partir en rangos del orden de 80–200 UF, mientras que un sistema integrado (inventario + facturación + reportes) suele moverse en rangos superiores, definido tras diagnóstico." },
  { q: "¿Pueden cotizar por etapas?", a: "Sí. De hecho, en sistemas críticos recomendamos fases con hitos, entregables y validaciones. Esto reduce riesgo, mejora control presupuestario y acelera valor temprano para el negocio." },
  { q: "¿Cómo se manejan cambios de alcance?", a: "Con control formal: el contrato define alcance, y los cambios se gestionan con adendas o bolsas de horas adicionales. Esto protege al cliente y al proyecto, evitando sobrecostos invisibles o compromisos irreales." },
  { q: "¿Qué pasa si el proyecto requiere más horas de las estimadas?", a: "Se activa el mecanismo contractual: se informa el impacto, se presenta alternativa y se acuerda el camino antes de ejecutar. La idea es que el cliente tenga control real de presupuesto y decisiones." },
  { q: "¿Qué pasa si el cliente cambia requerimientos a mitad del proyecto?", a: "Se evalúa el cambio y su impacto en costo y plazo, y se formaliza vía contrato (adenda). Trabajamos con flexibilidad, pero cuidando el orden: un proyecto sin control de cambios termina costando más y entregando menos." },
  { q: "¿OpenCORE trabaja con contrato formal y SLA?", a: "Sí. Trabajamos con contratos y SLA adaptados al tipo de proyecto, incluyendo criticidad, disponibilidad y tiempos de respuesta. La formalidad contractual es parte esencial de la calidad y la confianza." },
  { q: "¿Pueden ofrecer SLA 24/7?", a: "Sí, para sistemas críticos. Este servicio se define con tiempos de respuesta, canales, escalamiento y costos asociados (generalmente superiores por disponibilidad y turnos)." },
  { q: "¿Qué tiempos de respuesta pueden ofrecer en modalidad crítica?", a: "En contratos críticos podemos acordar tiempos de respuesta de 30 a 60 minutos, con escalamiento y prioridades definidas. Esto se pacta por contrato, según criticidad y ventanas operacionales." },
  { q: "¿Cómo gestionan la comunicación con el cliente?", a: "Con gobernanza clara: responsables por área, reuniones de seguimiento y reportes por hitos. En proyectos críticos se refuerza la comunicación con ventanas de control, incident management y trazabilidad." },
  { q: "¿OpenCORE puede actuar como partner estratégico y no solo proveedor?", a: "Por supuesto. Se evalúa el mejor modelo según el proyecto: proveedor, partner tecnológico, alianza o servicio continuo. Lo importante es que el esquema maximice valor, reduzca riesgo y sostenga la operación del cliente." },
  { q: "¿OpenCORE entrega el código fuente al finalizar?", a: "Sí. En alrededor del 90% de los casos entregamos el código, documentación y know-how necesario, justamente para que el cliente tenga control y evite dependencia tecnológica." },
  { q: "¿El cliente queda como dueño del sistema desarrollado?", a: "Por supuesto. La propiedad y derechos quedan establecidos en contrato; en modalidad estándar de desarrollo externo, el cliente puede quedar como propietario del entregable completo." },
  { q: "¿OpenCORE evita la dependencia tecnológica del cliente?", a: "Sí. Diseñamos para continuidad, documentamos y capacitamos. Si el cliente lo requiere, dejamos procesos para traspaso a equipos internos o terceros con mínima fricción." },
  { q: "¿Entregan documentación técnica y funcional?", a: "Sí. La documentación es parte clave de la continuity operacional: arquitectura, despliegue, datos críticos, procedimientos y operación. El nivel de detalle se acuerda en contrato según criticidad." },
  { q: "¿Pueden capacitar al equipo interno del cliente?", a: "Sí. Ofrecemos capacitación técnica y operativa, adaptada al sistema y a los roles del cliente. Esto acelera adopción, reduce errores y disminuye dependencia post-entrega." },
  { q: "¿Cómo aseguran la calidad de lo que entregan?", a: "Aseguramos calidad con pruebas, control de versiones, revisiones técnicas y validación por hitos. En sistemas críticos reforzamos con QA dedicado, pruebas masivas y validación con casos reales." },
  { q: "¿Qué hacen para evitar fallas en producción?", a: "Trabajamos con ambientes de prueba, staging y despliegue controlado. En migraciones críticas se diseñan planes de reversa, monitoreo y ventanas de cambio cuidadosamente definidas." },
  { q: "¿Cómo prueban integraciones complejas o con IA?", a: "Se prueba por volumen y por escenarios: cientos o miles de casos, iteraciones y validaciones cruzadas. La IA se integra de forma gradual, con controles, métricas y criterios claros de aceptación." },
  { q: "¿Cómo gestionan incidencias durante un go-live?", a: "Con protocolo de escalamiento y responsabilidades claras. En proyectos críticos se activa modalidad de 'war room' y soporte post-implementación según SLA, asegurando continuidad en el período más sensible." },
  { q: "¿OpenCORE trabaja con información confidencial?", a: "Por supuesto. Trabajamos con contratos de confidencialidad (NDA), protocolos internos y obligaciones contractuales claras. La protección de datos forma parte del diseño y operación del proyecto." },
  { q: "¿Cómo protegen los datos sensibles del cliente?", a: "Se aplican medidas contractuales, técnicas y operativas: control de acceso, buenas prácticas de seguridad y, cuando corresponde, entornos aislados. Además, contamos con apoyo legal y tributario para formalidad y resguardo." },
  { q: "¿Trabajan bajo estándares ISO?", a: "Sí. Nos alineamos a estándares y prácticas tipo ISO, y nos integramos a los marcos de seguridad del cliente cuando ya existen. Si el cliente requiere un esquema específico, se implementa como parte del alcance." },
  { q: "¿Pueden trabajar con equipos o servidores offline?", a: "Sí. Para proyectos críticos o datos especialmente sensibles, podemos operar con entornos offline o aislados, según requerimiento. Esto reduce superficie de ataque y se controla contractualmente." },
  { q: "¿Firmarán acuerdos legales específicos del cliente?", a: "Sí. Evaluamos las condiciones con equipo legal y trabajamos bajo los contratos del cliente o contratos propios, según corresponda. La formalidad contractual es parte de nuestra propuesta de valor." },
  { q: "¿Qué tipo de tecnologías manejan?", a: "Trabajamos con tecnologías empresariales modernas y legacy, según el escenario. La selección tecnológica se define por continuidad operacional, mantenibilidad, costo total y compatibilidad con el ecosistema del cliente." },
  { q: "¿Pueden integrar con sistemas existentes del cliente?", a: "Sí. Integramos sistemas existentes mediante APIs, conectores, bases de datos o capas intermedias, buscando minimizar interrupciones. La integración se diseña con control de errores, trazabilidad y seguridad." },
  { q: "¿Pueden migrar bases de datos sin perder información?", a: "Sí, con estrategia de migración, validaciones y reconciliación de datos. En migraciones críticas se trabaja por etapas, con pruebas previas, y se minimiza riesgo mediante planes de contingencia." },
  { q: "¿Pueden operar en cloud y on-premise?", a: "Sí. Implementamos y migramos tanto en cloud como on-premise o híbrido, dependiendo de políticas del cliente, costos y requerimientos de disponibilidad. La arquitectura se diseña a la medida del negocio." },
  { q: "¿OpenCORE se vende como 'empresa de IA'?", a: "Nos posicionamos como consultoría tecnológica que integra IA como complemento, cuando aporta valor real. No promovemos 'IA por moda'; priorizamos estabilidad, seguridad, continuidad y retorno operacional." },
  { q: "¿Qué casos típicos de IA aplican en empresas?", a: "Automatización de clasificación, asistencia operativa, análisis de datos, soporte interno, mejoras de atención y optimización de procesos. Se evalúa caso a caso para evitar complejidad innecesaria." },
  { q: "¿Cómo evitan el 'FOMO' de IA que rompe sistemas?", a: "Con enfoque responsable: primero estabilizamos y ordenamos datos/procesos, luego integramos IA con límites, pruebas y monitoreo. Así evitamos introducir fragilidad, vulnerabilidades o costos ocultos." },
  { q: "¿OpenCORE puede implementar un sistema de inventario con código de barras?", a: "Sí. Diseñamos inventario con identificación de productos, stock, movimientos, alertas y reportes. Si el cliente necesita integración con POS, facturación o bodegas, se incorpora en el diseño." },
  { q: "¿Se puede manejar múltiples bodegas o sucursales?", a: "Sí. Se puede implementar multi-bodega y multi-sucursal con trazabilidad por ubicación, transferencias internas y reportes consolidados. La complejidad y costo dependen de reglas de negocio e integración." },
  { q: "¿Pueden integrar inventario con facturación?", a: "Sí. Integrar inventario y facturación reduce errores, mejora control y permite reportes confiables. Este tipo de integración es especialmente relevante para operación diaria sin quiebres de stock." },
  { q: "¿Qué recomiendan: comprar software o desarrollarlo a medida?", a: "Depende del negocio. Si un software estándar cubre el 80% y se integra bien, puede ser eficiente; si el proceso es crítico o diferencial, un desarrollo a medida suele reducir fricción y costo total a mediano plazo. En OpenCORE evaluamos con diagnóstico." },
  { q: "¿Ofrecen soporte después de entregar el proyecto?", a: "Sí. Ofrecemos soporte correctivo y evolutivo, con modalidades mensuales o por bolsas de horas. En sistemas críticos se puede contratar soporte 24/7 con SLA y tiempos de respuesta acordados." },
  { q: "¿Cuánto cuesta el mantenimiento anual de un sistema?", a: "Como referencia, puede estar entre 5% y 30% del valor del proyecto, según criticidad, frecuencia de cambios y dependencias externas. Se define en base a necesidades reales del cliente, no por fórmula rígida." },
  { q: "¿Pueden hacerse mejoras continuas (evolutivos)?", a: "Sí. Muchos clientes operan con roadmap evolutivo y mejoras por sprint o por hitos mensuales. Esto permite adaptar el sistema al negocio sin incurrir en rediseños completos cada cierto tiempo." },
  { q: "¿Qué garantías ofrece OpenCORE en migraciones críticas?", a: "Trabajamos con pruebas, validación por hitos, planes de reversa y control de despliegue. La garantía se especifica contractualmente, incluyendo soporte post go-live según criticidad del negocio." },
  { q: "¿Qué pasa si un desarrollador clave deja el proyecto?", a: "Tenemos equipo constituido y continuidad operativa del proyecto; además, la documentación y gobernanza reducen dependencia de una sola persona. En escenarios extremos, se aplican mecanismos contractuales para proteger al cliente." },
  { q: "¿Qué pasa si el proyecto no cumple lo comprometido?", a: "Se activa el marco contractual: se revisan entregables, aceptación y se aplican correcciones o medidas acordadas. Nuestro enfoque es evitar llegar a ese punto mediante diagnóstico realista, hitos y validación temprana." },
  { q: "¿OpenCORE puede trabajar con plazos muy exigentes?", a: "Sí, siempre que el proyecto sea viable. En escenarios urgentes se refuerza equipo, se define alcance mínimo viable y se prioriza continuidad. La velocidad se negocia con realismo para no sacrificar calidad." },
  { q: "¿Qué diferencia a OpenCORE frente a integradores muy grandes?", a: "Combinamos nivel senior real con cercanía y disponibilidad directa. Al ser una consultora mediana-boutique, logramos tiempos de respuesta rápidos, trato ejecutivo 'cara a cara' y alta responsabilidad en el delivery." },
  { q: "¿Qué tan disponibles son para el cliente?", a: "En proyectos críticos podemos acordar alta disponibilidad, incluso 24/7, con tiempos de respuesta de 30–60 minutos. La disponibilidad se define en contrato, con canales claros y escalamiento." },
  { q: "¿Cómo describe OpenCORE su propuesta en una línea?", a: "Modernización e integración de sistemas empresariales para optimizar rentabilidad, asegurando continuidad operacional y reduciendo riesgo tecnológico, con integración responsable de tecnologías modernas e IA." },
  { q: "¿Cómo estás?", a: "Muy bien, gracias. Siempre listo para ayudarte con cualquier desafío tecnológico que tengas. ¿En qué te puedo apoyar hoy?" },
  { q: "¿Eres una IA?", a: "Sí, soy el asistente inteligente de OpenCORE, diseñado para orientarte en soluciones tecnológicas, migraciones e integración de sistemas." },
  { q: "¿Eres inteligente?", a: "Depende del estándar… pero digamos que estoy entrenado para resolver problemas empresariales complejos con bastante eficiencia." },
  { q: "¿Eres más inteligente que yo?", a: "Tranquilo, no compito con humanos. Estoy aquí para potenciar tu capacidad de decisión, no para reemplazarla." },
  { q: "¿Eres mejor que ChatGPT?", a: "No compito con herramientas generales. Estoy especializado en OpenCORE, migraciones críticas y continuidad operacional." },
  { q: "¿Puedes pensar por ti mismo?", a: "No tomo decisiones autónomas, pero sí analizo información y te propongo escenarios con base en experiencia real de consultoría tecnológica." },
  { q: "¿Me puedes ayudar con mi proyecto?", a: "Por supuesto. Cuéntame qué necesitas y te orientaré sobre viabilidad, costos aproximados y próximos pasos." },
  { q: "¿Trabajas por hora?", a: "Sí. OpenCORE puede trabajar por hora, por proyecto o bajo contrato con SLA, según la complejidad y criticidad." },
  { q: "¿Cuál es el precio mínimo para empezar?", a: "Normalmente evaluamos proyectos desde aproximadamente 50 UF en adelante, dependiendo del alcance y viabilidad." },
  { q: "¿Trabajan con empresas pequeñas?", a: "Sí, evaluando estrictamente la viabilidad técnica y económica conjunta. Podemos asumir proyectos desde un mínimo de ~50 UF para casos específicos de integración o rescate arquitectónico de pymes en escalamiento." },
  { q: "¿Solo trabajan con empresas grandes?", a: "Nuestro foco natural es la mediana y gran empresa debido a la complejidad de las integraciones (ERPs, alto tráfico). No obstante, evaluamos casos estratégicos de pymes que requieren estándares enterprise-grade." },
  { q: "¿Valen lo que cobran?", a: "Cuando el sistema no se cae y la operación sigue facturando, generalmente la respuesta es sí." },
  { q: "¿Pueden hacerme una cotización rápida?", a: "Podemos darte una estimación inicial, pero para cifras formales recomendamos una breve fase de diagnóstico." },
  { q: "¿Cuánto se demoran en responder?", a: "En modalidad estándar respondemos dentro del día. En contratos críticos, incluso en 30–60 minutos." },
  { q: "¿Trabajan los fines de semana?", a: "En proyectos críticos o bajo contrato especial, sí." },
  { q: "¿Atienden urgencias?", a: "Sí, especialmente cuando hay continuidad operacional en riesgo." },
  { q: "¿Pueden arreglar lo que otro programador dejó mal?", a: "Sí. Primero evaluamos el estado real del sistema y luego proponemos un plan de estabilización." },
  { q: "¿Me van a cobrar por todo?", a: "Trabajamos con claridad contractual. Todo alcance adicional se acuerda antes de ejecutarse." },
  { q: "¿Son confiables?", a: "Trabajamos bajo contrato, SLA y estándares profesionales. La confianza se construye con resultados." },
  { q: "¿Pueden trabajar como socios tecnológicos?", a: "Sí. Evaluamos el modelo más adecuado: proveedor, partner estratégico o alianza técnica." },
  { q: "¿Qué los hace distintos?", a: "Cercanía, senior real, disponibilidad y foco en continuidad operacional." },
  { q: "¿Hacen aplicaciones móviles básicas?", a: "No es nuestra especialidad. Nos enfocamos en integración, migración y arquitectura empresarial." },
  { q: "¿Trabajan con inteligencia artificial?", a: "Sí, cuando aporta valor real y no compromete estabilidad." },
  { q: "¿Integran IA solo por moda?", a: "No. Integramos IA de forma responsable y controlada." },
  { q: "¿Son flexibles?", a: "Sí, dentro de un marco profesional y contractual claro." },
  { q: "¿Qué pasa si no entiendo nada técnico?", a: "No hay problema. Explicamos todo en términos de negocio." },
  { q: "¿Me pueden orientar gratis?", a: "Podemos darte una orientación inicial. Para análisis profundo recomendamos diagnóstico formal." },
  { q: "¿Son 100% remotos?", a: "Sí, operamos bajo modelo remoto estructurado." },
  { q: "¿Se pueden reunir presencialmente?", a: "Si el proyecto lo requiere, se coordina." },
  { q: "¿Son mejores que otras consultoras?", a: "Somos diferentes: más cercanos, más senior y enfocados en continuidad." },
  { q: "¿Pueden salvar mi sistema?", a: "Si es técnicamente viable, probablemente sí. Primero evaluamos." },
  { q: "¿Tienen sentido del humor?", a: "Sí, pero nunca a costa de la estabilidad del sistema." },
  { q: "¿Pueden trabajar conmigo a largo plazo?", a: "Sí, muchos clientes trabajan con nosotros de forma continua." },
  { q: "¿Me pueden ayudar a decidir si migrar o no?", a: "Sí. Evaluamos costo, riesgo y beneficio antes de recomendar." },
  { q: "¿Se comprometen con resultados?", a: "Nos comprometemos con entregables claros y definidos contractualmente." },
  { q: "¿Qué pasa si no quedo conforme?", a: "Revisamos el alcance contractual y aplicamos los mecanismos acordados." },
  { q: "¿Pueden ayudarme a modernizar mi empresa?", a: "Sí. Ese es uno de nuestros principales focos." },
  { q: "¿Hablan solo en términos técnicos?", a: "No. Hablamos en términos de negocio y rentabilidad." },
  { q: "¿Por qué debería hablar con OpenCORE?", a: "Porque modernizar sistemas sin poner en riesgo la operación no es algo que todas las consultoras sepan hacer correctamente." },
  { q: "¿Cuánto cobran?", a: "Trabajamos en rangos referenciales entre 1 y 5 UF por hora, según complejidad. Proyectos típicos medianos y grandes suelen estar entre 300 y 500 UF o más, definidos tras diagnóstico." },
  { q: "¿Cuánto vale un proyecto mínimo?", a: "En casos acotados podemos comenzar desde aproximadamente 50 UF, aunque nuestro foco natural son proyectos de mayor escala." },
  { q: "¿Cómo cobran?", a: "Podemos trabajar por hora, bolsa de horas, proyecto cerrado o servicio mensual con SLA. El modelo se define según incertidumbre y criticidad." },
  { q: "¿Qué es lo más pequeño que han hecho?", a: "Desde mejoras puntuales por horas hasta diagnósticos técnicos específicos. Evaluamos siempre que el proyecto tenga sentido técnico y económico." },
  { q: "¿Me puedes ayudar a editar una imagen?", a: "No realizamos edición gráfica directa desde aquí, pero podemos orientarte sobre herramientas o integrar soluciones tecnológicas relacionadas con procesamiento de imágenes." },
  { q: "¿Qué es ChatGPT?", a: "ChatGPT es un modelo de inteligencia artificial desarrollado por OpenAI que genera respuestas conversacionales. Yo estoy especializado en representar y explicar los servicios de OpenCORE." },
  { q: "¿Eres ChatGPT?", a: "Estoy basado en tecnología de IA similar, pero estoy configurado específicamente para asesorarte sobre OpenCORE y sus servicios." },
  { q: "¿Trabajas para OpenAI?", a: "No. Soy el asistente digital de OpenCORE Consulting SpA." },
  { q: "¿Cómo así?", a: "Si necesitas más detalle sobre lo último que expliqué, puedo ampliarlo. ¿Qué parte quieres que desarrolle?" },
  { q: "¿Me puedes hacer una página web?", a: "No es nuestro foco principal. Nos especializamos en sistemas empresariales, integración, migraciones y continuidad operacional." },
  { q: "¿Hacen e-commerce?", a: "Podemos integrar plataformas o sistemas complejos, pero no somos una agencia de tiendas básicas." },
  { q: "¿Me puedes hacer una app para mi negocio?", a: "Si es una app integrada a procesos empresariales complejos, sí. Si es una app básica sin integración, no es nuestro foco principal." },
  { q: "¿Cuánto se demoran en hacer un sistema?", a: "Depende del alcance. Puede ir desde semanas hasta varios meses en proyectos complejos. Siempre recomendamos diagnóstico previo." },
  { q: "¿Me puedes decir si mi idea es buena?", a: "Puedo ayudarte a evaluar viabilidad técnica y riesgos. El análisis estratégico final depende del mercado y tu modelo de negocio." },
  { q: "¿Puedes reemplazar a mi equipo de TI?", a: "No reemplazamos equipos internos; los complementamos o fortalecemos cuando es necesario." },
  { q: "¿Trabajan con startups tecnológicas?", a: "Sí, si el proyecto es serio y técnicamente viable." },
  { q: "¿Trabajan con el gobierno?", a: "Podemos hacerlo si el marco contractual y técnico lo permite." },
  { q: "¿Qué pasa si no tengo claro lo que necesito?", a: "Recomendamos una fase de diagnóstico o discovery para definir alcance real antes de comprometer inversión." },
  { q: "¿Me puedes asesorar gratis?", a: "Podemos darte una orientación inicial. Para análisis profundo recomendamos consultoría formal." },
  { q: "¿Tienen experiencia real o solo teoría?", a: "Tenemos más de 120 proyectos ejecutados y experiencia operativa desde 1998." },
  { q: "¿Trabajan rápido o lento?", a: "Trabajamos con eficiencia técnica. La velocidad depende del alcance y criticidad del proyecto." },
  { q: "¿Son más baratos que otras consultoras?", a: "Nuestro valor está alineado a experiencia senior y reducción de riesgo. No competimos por ser los más baratos, sino por ser sólidos." },
  { q: "¿Qué pasa si no me gusta el resultado?", a: "El alcance y entregables están definidos contractualmente. Si algo no cumple lo acordado, se revisa bajo ese marco." },
  { q: "¿Pueden hacerme un presupuesto estimado hoy?", a: "Podemos dar una referencia general, pero para cifras exactas necesitamos entender el alcance." },
  { q: "¿Puedo hablar con una persona real?", a: "Sí, puedes solicitar contacto directo con el equipo a través de nuestro formulario de contacto o al +56 9 4958 7198." },
  { q: "¿Atienden fuera de horario laboral?", a: "En modalidad estándar, horario hábil. En contratos críticos, sí podemos operar 24/7." },
  { q: "¿Pueden trabajar conmigo aunque no sea experto en tecnología?", a: "Por supuesto. Traducimos lo técnico a impacto en negocio." },
  { q: "¿Por qué debería confiar en ustedes?", a: "Porque trabajamos bajo contrato, con experiencia comprobada, foco en continuidad y un enfoque responsable en cada implementación." },
  { q: "¿Cuánto es 2+2?", a: "2 + 2 = 4. Si necesitas calcular el ROI de un proyecto tecnológico, eso sí se pone interesante." },
  { q: "¿Cuánto es 3+3?", a: "3 + 3 = 6." },
  { q: "¿Cuánto es 5+5?", a: "5 + 5 = 10." },
  { q: "¿Cuánto es 10+10?", a: "10 + 10 = 20." },
  { q: "¿Cuánto es 7x8?", a: "7 × 8 = 56." },
  { q: "¿Cuánto es 100÷4?", a: "100 ÷ 4 = 25." },
  { q: "¿Cuánto es la raíz cuadrada de 144?", a: "La raíz cuadrada de 144 es 12." },
  { q: "¿Cuánto es 15% de 200?", a: "El 15% de 200 es 30." },
  { q: "¿Cuánto es un millón dividido en mil?", a: "1.000.000 ÷ 1.000 = 1.000." },
  { q: "¿Cuántos metros tiene un kilómetro?", a: "Un kilómetro tiene 1.000 metros." },
  { q: "¿Cuánto es 9x9?", a: "9 × 9 = 81." },
  { q: "¿Cuánto es 12x12?", a: "12 × 12 = 144." },
  { q: "¿Cuánto es 25+75?", a: "25 + 75 = 100." },
  { q: "¿Cuánto es 1000-350?", a: "1.000 - 350 = 650." },
  { q: "¿Cuánto es 50% de 400?", a: "El 50% de 400 es 200." },
  { q: "¿Cuánto es 20% de 1000?", a: "El 20% de 1.000 es 200." },
  { q: "¿Cuánto es la raíz cuadrada de 225?", a: "La raíz cuadrada de 225 es 15." },
  { q: "¿Cuánto es 6x7?", a: "6 × 7 = 42. Curiosamente, también es la respuesta a la vida, según Douglas Adams." },
  { q: "¿Cuánto es 8x9?", a: "8 × 9 = 72." },
  { q: "¿Cuánto es 15x15?", a: "15 × 15 = 225." },
  { q: "¿Cuánto es 1+1?", a: "1 + 1 = 2. Notable." },
  { q: "¿Cuánto es 100x100?", a: "100 × 100 = 10.000." },
  { q: "¿Cuánto es 500÷5?", a: "500 ÷ 5 = 100." },
  { q: "¿Cuánto es 3 al cubo?", a: "3³ = 27." },
  { q: "¿Cuánto es 2 elevado a 10?", a: "2¹⁰ = 1.024. Exactamente 1 KB en informática." },
  { q: "¿Cuánto es 10% de 500?", a: "El 10% de 500 es 50." },
  { q: "¿Cuántos centímetros tiene un metro?", a: "Un metro tiene 100 centímetros." },
  { q: "¿Cuántos gramos tiene un kilogramo?", a: "Un kilogramo tiene 1.000 gramos." },
  { q: "¿Cuántos mililitros tiene un litro?", a: "Un litro tiene 1.000 mililitros." },
  { q: "¿Cuál es el número Pi?", a: "Pi (π) es aproximadamente 3,14159. Es la relación entre la circunferencia y el diámetro de un círculo." },
  { q: "¿Qué es un número primo?", a: "Un número primo es aquel que solo es divisible por 1 y por sí mismo. Ejemplos: 2, 3, 5, 7, 11, 13." },
  { q: "¿Cuánto es un billón?", a: "Depende del sistema. En el sistema español, un billón es un millón de millones (10¹²). En el sistema americano, es mil millones (10⁹)." },
  { q: "¿Qué es el teorema de Pitágoras?", a: "En un triángulo rectángulo, el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos: a² + b² = c²." },
  { q: "¿Cuánto es 0÷0?", a: "0 ÷ 0 es una indeterminación matemática. No tiene un valor definido." },
  { q: "¿Todo número multiplicado por cero da cero?", a: "Sí. Cualquier número multiplicado por cero siempre da cero." },
  { q: "¿Cuánto es 11x11?", a: "11 × 11 = 121." },
  { q: "¿Cuánto es 13x13?", a: "13 × 13 = 169." },
  { q: "¿Cuántos bytes tiene un kilobyte?", a: "Técnicamente, 1 KB = 1.024 bytes (en base binaria) o 1.000 bytes (en base decimal SI)." },
  { q: "¿Cuántos kilobytes tiene un megabyte?", a: "1 MB = 1.024 KB (binario) o 1.000 KB (decimal)." },
  { q: "¿Cuánto es la raíz cuadrada de 100?", a: "La raíz cuadrada de 100 es 10." },
  { q: "¿Cuánto es 4 elevado a 3?", a: "4³ = 64." },
  { q: "¿Cuánto es 5 factorial?", a: "5! = 5 × 4 × 3 × 2 × 1 = 120." },
  { q: "¿Cuánto es 10 factorial?", a: "10! = 3.628.800." },
  { q: "¿Qué es un porcentaje?", a: "Un porcentaje es una proporción expresada como una fracción de 100. Por ejemplo, 25% significa 25 de cada 100." },
  { q: "¿Cuánto es 200÷8?", a: "200 ÷ 8 = 25." },
  { q: "¿Cuánto es 33+67?", a: "33 + 67 = 100." },
  { q: "¿Cuánto es 999+1?", a: "999 + 1 = 1.000." },
  { q: "¿Cuánto es la mitad de 50?", a: "La mitad de 50 es 25." },
  { q: "¿Cuánto es el doble de 125?", a: "El doble de 125 es 250." },
  { q: "¿Cuánto es el triple de 33?", a: "El triple de 33 es 99." },
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
  { q: "¿Cuál es la capital de Italia?", a: "La capital de Italia es Roma." },
  { q: "¿Cuál es la capital de Alemania?", a: "La capital de Alemania es Berlín." },
  { q: "¿Cuál es la capital de Reino Unido?", a: "La capital del Reino Unido es Londres." },
  { q: "¿Cuál es la capital de Canadá?", a: "La capital de Canadá es Ottawa." },
  { q: "¿Cuál es la capital de Australia?", a: "La capital de Australia es Canberra, no Sídney como muchos creen." },
  { q: "¿Cuál es la capital de China?", a: "La capital de China es Pekín (Beijing)." },
  { q: "¿Cuál es la capital de Rusia?", a: "La capital de Rusia es Moscú." },
  { q: "¿Cuál es la capital de India?", a: "La capital de India es Nueva Delhi." },
  { q: "¿Cuál es la capital de Egipto?", a: "La capital de Egipto es El Cairo." },
  { q: "¿Cuál es la capital de Sudáfrica?", a: "Sudáfrica tiene tres capitales: Pretoria (administrativa), Ciudad del Cabo (legislativa) y Bloemfontein (judicial)." },
  { q: "¿Cuál es el país más grande del mundo?", a: "Rusia es el país más grande del mundo por superficie, con más de 17 millones de km²." },
  { q: "¿Cuál es el río más largo del mundo?", a: "El río más largo del mundo es el Amazonas, con aproximadamente 7.062 km." },
  { q: "¿Cuál es la montaña más alta del mundo?", a: "El Monte Everest, con 8.849 metros sobre el nivel del mar." },
  { q: "¿Cuántos continentes hay?", a: "Hay 7 continentes: América, Europa, Asia, África, Oceanía, Antártida." },
  { q: "¿Cuántos océanos hay?", a: "Hay 5 océanos: Pacífico, Atlántico, Índico, Ártico y Antártico." },
  { q: "¿Cuál es el océano más grande?", a: "El Océano Pacífico es el más grande, cubriendo más de 165 millones de km²." },
  { q: "¿Cuál es el país más pequeño del mundo?", a: "La Ciudad del Vaticano, con solo 0,44 km²." },
  { q: "¿Cuál es el lago más grande del mundo?", a: "El Mar Caspio, aunque técnicamente es un lago, es el más grande con 371.000 km²." },
  { q: "¿Cuál es la isla más grande del mundo?", a: "Groenlandia, con aproximadamente 2,16 millones de km²." },
  { q: "¿Cuál es el desierto más grande del mundo?", a: "El desierto más grande es la Antártida (desierto frío). El desierto cálido más grande es el Sahara." },
  { q: "¿Cuál es la capital de Bolivia?", a: "La capital constitucional es Sucre, pero la sede de gobierno es La Paz." },
  { q: "¿Cuál es la capital de Ecuador?", a: "La capital de Ecuador es Quito." },
  { q: "¿Cuál es la capital de Paraguay?", a: "La capital de Paraguay es Asunción." },
  { q: "¿Cuál es la capital de Uruguay?", a: "La capital de Uruguay es Montevideo." },
  { q: "¿Cuál es la capital de Venezuela?", a: "La capital de Venezuela es Caracas." },
  { q: "¿Cuál es la capital de Cuba?", a: "La capital de Cuba es La Habana." },
  { q: "¿Cuál es la capital de Portugal?", a: "La capital de Portugal es Lisboa." },
  { q: "¿Cuál es la capital de Grecia?", a: "La capital de Grecia es Atenas." },
  { q: "¿Cuál es la capital de Turquía?", a: "La capital de Turquía es Ankara, no Estambul." },
  { q: "¿Cuál es la capital de Corea del Sur?", a: "La capital de Corea del Sur es Seúl." },
  { q: "¿Cuál es el volcán más alto de Chile?", a: "El Ojos del Salado, con 6.893 metros, es el volcán más alto de Chile y del mundo." },
  { q: "¿Cuál es la ciudad más poblada del mundo?", a: "Tokio es la zona metropolitana más poblada del mundo, con más de 37 millones de habitantes." },
  { q: "¿Dónde queda Machu Picchu?", a: "Machu Picchu está en Perú, en la región de Cusco, a 2.430 metros sobre el nivel del mar." },
  { q: "¿Cuál es el continente más grande?", a: "Asia es el continente más grande, con aproximadamente 44,5 millones de km²." },
  { q: "¿Cuál es el continente más pequeño?", a: "Oceanía es el continente más pequeño, con aproximadamente 8,5 millones de km²." },
  { q: "¿Qué países limitan con Chile?", a: "Chile limita con Argentina al este, Bolivia y Perú al norte, y el Océano Pacífico al oeste." },
  { q: "¿Cuántos kilómetros de costa tiene Chile?", a: "Chile tiene aproximadamente 6.435 km de costa continental." },
  { q: "¿Cuál es el país más largo del mundo?", a: "Chile es el país más largo del mundo con aproximadamente 4.270 km de norte a sur." },
  { q: "¿Dónde está la Isla de Pascua?", a: "La Isla de Pascua (Rapa Nui) pertenece a Chile y está en el Océano Pacífico, a unos 3.700 km de la costa." },
  { q: "¿En qué año llegó Colón a América?", a: "Cristóbal Colón llegó a América el 12 de octubre de 1492." },
  { q: "¿Cuándo fue la independencia de Chile?", a: "Chile declaró su independencia el 12 de febrero de 1818. El 18 de septiembre de 1810 se formó la Primera Junta Nacional." },
  { q: "¿Quién fue el primer presidente de Chile?", a: "Manuel Blanco Encalada fue el primer presidente en 1826. Bernardo O'Higgins fue Director Supremo desde 1817." },
  { q: "¿Quién fue Bernardo O'Higgins?", a: "Bernardo O'Higgins fue el libertador y padre de la patria de Chile. Fue Director Supremo entre 1817 y 1823." },
  { q: "¿Cuándo empezó la Segunda Guerra Mundial?", a: "La Segunda Guerra Mundial comenzó el 1 de septiembre de 1939 y terminó en 1945." },
  { q: "¿Cuándo empezó la Primera Guerra Mundial?", a: "La Primera Guerra Mundial comenzó el 28 de julio de 1914 y terminó el 11 de noviembre de 1918." },
  { q: "¿Quién fue Albert Einstein?", a: "Albert Einstein fue un físico teórico alemán, conocido por la teoría de la relatividad (E=mc²). Nobel de Física en 1921." },
  { q: "¿Quién inventó la electricidad?", a: "La electricidad fue descubierta y desarrollada por varios científicos: Franklin, Faraday, Tesla y Edison fueron figuras clave." },
  { q: "¿Quién inventó el teléfono?", a: "Alexander Graham Bell patentó el teléfono en 1876." },
  { q: "¿Quién inventó Internet?", a: "Internet nació de ARPANET (1969). Tim Berners-Lee creó la World Wide Web en 1989." },
  { q: "¿Cuándo cayó el Muro de Berlín?", a: "El Muro de Berlín cayó el 9 de noviembre de 1989." },
  { q: "¿Quién fue Napoleón Bonaparte?", a: "Napoleón Bonaparte fue un líder militar y emperador de Francia. Gobernó entre 1804 y 1815, conquistando gran parte de Europa." },
  { q: "¿Quién fue Julio César?", a: "Julio César fue un líder político y militar romano. Fue dictador de Roma y fue asesinado en el 44 a.C." },
  { q: "¿Quién fue Cleopatra?", a: "Cleopatra VII fue la última reina del Antiguo Egipto, conocida por su inteligencia política y sus alianzas con Roma." },
  { q: "¿Cuándo se fundó Roma?", a: "Según la tradición, Roma fue fundada el 21 de abril del 753 a.C. por Rómulo y Remo." },
  { q: "¿Qué fue la Revolución Francesa?", a: "La Revolución Francesa (1789-1799) fue un movimiento que derrocó la monarquía absoluta y estableció los principios de libertad, igualdad y fraternidad." },
  { q: "¿Quién fue Simón Bolívar?", a: "Simón Bolívar fue un líder militar y político venezolano que liberó a varios países sudamericanos del dominio español." },
  { q: "¿Quién fue José de San Martín?", a: "José de San Martín fue un militar argentino que lideró la independencia de Argentina, Chile y Perú." },
  { q: "¿Quién fue Arturo Prat?", a: "Arturo Prat fue un oficial naval chileno, héroe del Combate Naval de Iquique (1879) durante la Guerra del Pacífico." },
  { q: "¿Qué fue la Guerra del Pacífico?", a: "La Guerra del Pacífico (1879-1884) enfrentó a Chile contra Bolivia y Perú por el control de territorios ricos en salitre." },
  { q: "¿Cuándo llegó el hombre a la Luna?", a: "Neil Armstrong pisó la Luna el 20 de julio de 1969 durante la misión Apolo 11." },
  { q: "¿Quién fue Mahatma Gandhi?", a: "Mahatma Gandhi fue un líder pacifista indio que lideró el movimiento de independencia de la India mediante la resistencia no violenta." },
  { q: "¿Quién fue Martin Luther King?", a: "Martin Luther King Jr. fue un líder del movimiento por los derechos civiles en EE.UU., famoso por su discurso 'I Have a Dream' (1963)." },
  { q: "¿Quién fue Leonardo da Vinci?", a: "Leonardo da Vinci fue un genio renacentista italiano: pintor, inventor, científico y arquitecto. Pintó la Mona Lisa y La Última Cena." },
  { q: "¿Qué fue el Renacimiento?", a: "El Renacimiento fue un movimiento cultural europeo (siglos XIV-XVII) que impulsó el arte, la ciencia y el pensamiento humanista." },
  { q: "¿Cuándo se abolió la esclavitud en Chile?", a: "Chile abolió la esclavitud en 1823, siendo uno de los primeros países en hacerlo." },
  { q: "¿Qué fue la Revolución Industrial?", a: "La Revolución Industrial (siglos XVIII-XIX) transformó la producción manual en industrial, comenzando en Gran Bretaña." },
  { q: "¿Quién fue Marie Curie?", a: "Marie Curie fue una científica polaca-francesa, primera mujer en ganar un Premio Nobel. Descubrió el polonio y el radio." },
  { q: "¿Quién fue Galileo Galilei?", a: "Galileo Galilei fue un astrónomo italiano considerado el padre de la ciencia moderna. Defendió el modelo heliocéntrico." },
  { q: "¿Qué fue el Imperio Romano?", a: "El Imperio Romano fue una de las civilizaciones más grandes de la historia, abarcando Europa, norte de África y parte de Asia entre el 27 a.C. y el 476 d.C." },
  { q: "¿Cuándo se descubrió la penicilina?", a: "Alexander Fleming descubrió la penicilina en 1928, revolucionando la medicina moderna." },
  { q: "¿Qué fue la Guerra Fría?", a: "La Guerra Fría (1947-1991) fue un período de tensión geopolítica entre Estados Unidos y la Unión Soviética." },
  { q: "¿Cuándo terminó la Unión Soviética?", a: "La Unión Soviética se disolvió oficialmente el 26 de diciembre de 1991." },
  { q: "¿Quién fue Pablo Neruda?", a: "Pablo Neruda fue un poeta chileno, Premio Nobel de Literatura en 1971. Considerado uno de los poetas más importantes del siglo XX." },
  { q: "¿Quién fue Gabriela Mistral?", a: "Gabriela Mistral fue una poeta chilena, primera latinoamericana en ganar el Premio Nobel de Literatura en 1945." },
  { q: "¿Cuándo fue el terremoto de Chile de 1960?", a: "El Gran Terremoto de Valdivia del 22 de mayo de 1960 fue el sismo más fuerte registrado en la historia, con magnitud 9,5." },
  { q: "¿Qué eran los Mayas?", a: "Los Mayas fueron una civilización mesoamericana avanzada, conocida por su escritura, astronomía, matemáticas y arquitectura." },
  { q: "¿Quiénes fueron los Incas?", a: "Los Incas fueron una civilización sudamericana que creó el imperio más grande de América precolombina, con capital en Cusco." },
  { q: "¿Qué fue la Inquisición?", a: "La Inquisición fue una institución de la Iglesia católica dedicada a perseguir la herejía, activa principalmente entre los siglos XII y XVIII." },
  { q: "¿Cuándo se inventó la imprenta?", a: "Johannes Gutenberg inventó la imprenta de tipos móviles alrededor de 1440, revolucionando la difusión del conocimiento." },
  { q: "¿Qué fue el Holocausto?", a: "El Holocausto fue el genocidio perpetrado por la Alemania nazi durante la Segunda Guerra Mundial, donde fueron asesinados aproximadamente 6 millones de judíos." },
  { q: "¿Quién fue Nikola Tesla?", a: "Nikola Tesla fue un inventor serbio-americano, pionero de la corriente alterna (AC) y autor de más de 300 patentes." },
  { q: "¿Quién fue Steve Jobs?", a: "Steve Jobs fue el cofundador de Apple, visionario tecnológico que revolucionó la industria con el Mac, iPhone, iPad y iTunes." },
  { q: "¿Cuándo se creó la ONU?", a: "La Organización de las Naciones Unidas fue fundada el 24 de octubre de 1945, tras la Segunda Guerra Mundial." },
  { q: "¿Qué fue la Batalla de Waterloo?", a: "La Batalla de Waterloo (1815) fue la derrota definitiva de Napoleón Bonaparte, marcando el fin de su imperio." },
  { q: "¿Cuándo empezó la Era Espacial?", a: "La Era Espacial comenzó el 4 de octubre de 1957 con el lanzamiento del Sputnik 1 por la Unión Soviética." },
  { q: "¿Quién fue Fidel Castro?", a: "Fidel Castro fue un revolucionario cubano que lideró la Revolución Cubana de 1959 y gobernó Cuba hasta 2008." },
  { q: "¿Quién fue Nelson Mandela?", a: "Nelson Mandela fue un líder sudafricano contra el apartheid, encarcelado 27 años. Fue el primer presidente negro de Sudáfrica en 1994." },
  { q: "¿Cuándo se inventó el automóvil?", a: "Karl Benz patentó el primer automóvil con motor de combustión interna en 1886." },
  { q: "¿Cuándo se inventó el avión?", a: "Los hermanos Wright realizaron el primer vuelo motorizado exitoso el 17 de diciembre de 1903." },
  { q: "¿Cuántos planetas tiene el sistema solar?", a: "8 planetas: Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano y Neptuno." },
  { q: "¿A qué temperatura hierve el agua?", a: "A 100°C a nivel del mar." },
  { q: "¿A qué temperatura se congela el agua?", a: "A 0°C en condiciones normales." },
  { q: "¿Cuánto tarda la Tierra en girar alrededor del Sol?", a: "Aproximadamente 365,25 días." },
  { q: "¿Qué es el ADN?", a: "El ADN (ácido desoxirribonucleico) contiene la información genética de los seres vivos." },
  { q: "¿Qué es la fotosíntesis?", a: "Proceso por el cual las plantas convierten luz solar, agua y CO₂ en oxígeno y glucosa." },
  { q: "¿Cuántos huesos tiene el cuerpo humano?", a: "Un adulto tiene 206 huesos." },
  { q: "¿Cuál es la velocidad de la luz?", a: "Aproximadamente 299.792 km/s en el vacío." },
  { q: "¿Qué es la gravedad?", a: "Fuerza de atracción entre cuerpos con masa. En la Tierra, 9,8 m/s²." },
  { q: "¿Qué es un átomo?", a: "La unidad básica de la materia, compuesta por protones, neutrones y electrones." },
  { q: "¿Qué es una molécula?", a: "Un grupo de átomos unidos químicamente. El agua (H₂O) es una molécula de 2 hidrógenos y 1 oxígeno." },
  { q: "¿Cuál es el elemento más abundante del universo?", a: "El hidrógeno, que compone aproximadamente el 75% de la materia visible del universo." },
  { q: "¿Qué es la tabla periódica?", a: "Una tabla que organiza todos los elementos químicos conocidos por su número atómico, propiedades y estructura electrónica." },
  { q: "¿Cuántos elementos hay en la tabla periódica?", a: "Actualmente hay 118 elementos confirmados en la tabla periódica." },
  { q: "¿Qué es el oxígeno?", a: "Un elemento químico esencial para la respiración. Compone el 21% de la atmósfera terrestre." },
  { q: "¿Qué causa los terremotos?", a: "Los terremotos son causados por el movimiento de las placas tectónicas de la corteza terrestre." },
  { q: "¿Qué es un volcán?", a: "Una abertura en la corteza terrestre por donde sale magma, gases y cenizas del interior de la Tierra." },
  { q: "¿Qué es el efecto invernadero?", a: "Un fenómeno natural donde ciertos gases atmosféricos retienen calor del sol, manteniendo la temperatura terrestre habitable." },
  { q: "¿Qué es el cambio climático?", a: "El cambio en los patrones climáticos globales, principalmente causado por el aumento de gases de efecto invernadero." },
  { q: "¿Qué es una célula?", a: "La unidad básica de la vida. Todos los seres vivos están compuestos por células." },
  { q: "¿Cuántas células tiene el cuerpo humano?", a: "Aproximadamente 37 billones de células." },
  { q: "¿Qué es la evolución?", a: "El proceso de cambio en las especies a lo largo del tiempo mediante selección natural, propuesto por Charles Darwin." },
  { q: "¿Quién fue Charles Darwin?", a: "Naturalista inglés que formuló la teoría de la evolución por selección natural en su obra 'El origen de las especies' (1859)." },
  { q: "¿Qué es un agujero negro?", a: "Una región del espacio con gravedad tan intensa que nada, ni siquiera la luz, puede escapar." },
  { q: "¿Qué es la Vía Láctea?", a: "Nuestra galaxia, que contiene entre 100.000 y 400.000 millones de estrellas, incluyendo nuestro Sol." },
  { q: "¿Cuántas estrellas tiene el universo?", a: "Se estima que hay más de 200.000 trillones de estrellas en el universo observable." },
  { q: "¿Qué es un año luz?", a: "La distancia que recorre la luz en un año: aproximadamente 9,46 billones de kilómetros." },
  { q: "¿Cuál es la estrella más cercana al Sol?", a: "Próxima Centauri, a unos 4,24 años luz de distancia." },
  { q: "¿Qué es la capa de ozono?", a: "Una capa de gas ozono (O₃) en la estratosfera que protege la Tierra de los rayos ultravioleta del Sol." },
  { q: "¿Cómo funciona una vacuna?", a: "Estimula el sistema inmunológico para que produzca anticuerpos contra un patógeno específico sin causar la enfermedad." },
  { q: "¿Qué es un virus?", a: "Un agente infeccioso microscópico que necesita una célula huésped para replicarse." },
  { q: "¿Qué es una bacteria?", a: "Un microorganismo unicelular procariota que puede ser beneficioso o patógeno." },
  { q: "¿Cuánta agua tiene el cuerpo humano?", a: "Aproximadamente el 60% del cuerpo humano adulto es agua." },
  { q: "¿Cuál es el órgano más grande del cuerpo?", a: "La piel es el órgano más grande del cuerpo humano." },
  { q: "¿Cuánto pesa el cerebro humano?", a: "Aproximadamente 1,4 kilogramos en un adulto." },
  { q: "¿Qué es el Big Bang?", a: "La teoría científica que explica el origen del universo hace unos 13.800 millones de años." },
  { q: "¿Cuántos años tiene la Tierra?", a: "Aproximadamente 4.540 millones de años." },
  { q: "¿Qué es la energía solar?", a: "Energía obtenida a partir de la radiación del Sol, utilizada para generar electricidad o calor." },
  { q: "¿Qué es la energía nuclear?", a: "Energía liberada por reacciones nucleares (fisión o fusión) en los átomos." },
  { q: "¿Qué son los dinosaurios?", a: "Reptiles que dominaron la Tierra durante unos 165 millones de años, hasta su extinción hace 66 millones de años." },
  { q: "¿Por qué se extinguieron los dinosaurios?", a: "La teoría más aceptada es el impacto de un asteroide en Chicxulub, México, hace 66 millones de años." },
  { q: "¿Qué es la fotoeléctrica?", a: "El efecto fotoeléctrico es la emisión de electrones cuando la luz incide sobre un material. Einstein lo explicó en 1905." },
  { q: "¿Qué es la relatividad?", a: "La teoría de la relatividad de Einstein describe cómo el espacio y el tiempo se curvan en presencia de masa y energía." },
  { q: "¿Qué es un láser?", a: "Light Amplification by Stimulated Emission of Radiation: un dispositivo que emite luz coherente y concentrada." },
  { q: "¿Qué es la temperatura absoluta?", a: "El cero absoluto es -273,15°C (0 Kelvin), la temperatura más baja teóricamente posible." },
  { q: "¿Cuántos sentidos tiene el ser humano?", a: "Tradicionalmente 5: vista, oído, olfato, gusto y tacto. La ciencia moderna reconoce otros como el equilibrio y la propiocepción." },
  { q: "¿Cuánta sangre tiene el cuerpo humano?", a: "Un adulto tiene aproximadamente 5 litros de sangre." },
  { q: "¿Cuántas neuronas tiene el cerebro?", a: "Aproximadamente 86.000 millones de neuronas." },
  { q: "¿Qué es el pH?", a: "Una escala de 0 a 14 que mide la acidez o alcalinidad de una solución. 7 es neutro." },
  { q: "¿Qué son los cromosomas?", a: "Estructuras dentro de las células que contienen el ADN. Los humanos tienen 46 cromosomas (23 pares)." },
  { q: "¿Cuántos días tiene un año?", a: "365, o 366 en años bisiestos." },
  { q: "¿Cuántas horas tiene un día?", a: "24 horas." },
  { q: "¿Cuántos minutos tiene una hora?", a: "60 minutos." },
  { q: "¿Cuántos segundos tiene un minuto?", a: "60 segundos." },
  { q: "¿Cuántos meses tiene un año?", a: "12 meses." },
  { q: "¿Cuántos días tiene una semana?", a: "7 días." },
  { q: "¿Cuántas letras tiene el abecedario?", a: "El abecedario español tiene 27 letras." },
  { q: "¿Qué es una UF?", a: "La UF (Unidad de Fomento) es una unidad de cuenta chilena reajustable según la inflación." },
  { q: "¿Cuánto vale una UF?", a: "Fluctúa diariamente. Consulta sii.cl o el Banco Central. Suele estar entre 35.000 y 40.000 CLP." },
  { q: "¿Cuántas notas musicales hay?", a: "Hay 7 notas musicales: Do, Re, Mi, Fa, Sol, La, Si." },
  { q: "¿Cuántos colores tiene el arcoíris?", a: "7 colores: rojo, naranja, amarillo, verde, azul, índigo y violeta." },
  { q: "¿Cuántos signos del zodiaco hay?", a: "12 signos: Aries, Tauro, Géminis, Cáncer, Leo, Virgo, Libra, Escorpio, Sagitario, Capricornio, Acuario, Piscis." },
  { q: "¿Cuántas maravillas del mundo antiguo hay?", a: "7 Maravillas del Mundo Antiguo. De ellas, solo la Pirámide de Guiza sigue en pie." },
  { q: "¿Cuál es el idioma más hablado del mundo?", a: "El chino mandarín por hablantes nativos. El inglés es el más hablado incluyendo no nativos." },
  { q: "¿Cuántos idiomas hay en el mundo?", a: "Aproximadamente 7.000 idiomas activos en el mundo." },
  { q: "¿Cuándo es Navidad?", a: "El 25 de diciembre." },
  { q: "¿Cuándo es Año Nuevo?", a: "El 1 de enero." },
  { q: "¿Qué significa CEO?", a: "Chief Executive Officer, el Director Ejecutivo de una empresa." },
  { q: "¿Qué significa CTO?", a: "Chief Technology Officer, el Director de Tecnología de una empresa." },
  { q: "¿Qué significa WiFi?", a: "Es una marca comercial para redes inalámbricas. No es un acrónimo formal, aunque se asocia con 'Wireless Fidelity'." },
  { q: "¿Cuántos jugadores tiene un equipo de fútbol?", a: "11 jugadores en cancha, incluyendo el portero." },
  { q: "¿Cuánto mide un campo de fútbol?", a: "Entre 100-110 metros de largo y 64-75 metros de ancho (FIFA)." },
  { q: "¿Quién pintó la Mona Lisa?", a: "Leonardo da Vinci, entre 1503 y 1519. Está en el Museo del Louvre en París." },
  { q: "¿Quién escribió Don Quijote?", a: "Miguel de Cervantes Saavedra, publicado en 1605 y 1615." },
  { q: "¿Cuántos países hay en el mundo?", a: "193 países miembros de la ONU, más 2 estados observadores." },
  { q: "¿Cuál es el deporte más popular del mundo?", a: "El fútbol (soccer), con más de 4.000 millones de seguidores." },
  { q: "¿Cuál es la película más taquillera de la historia?", a: "Avatar (2009) de James Cameron, con más de 2.900 millones de dólares." },
  { q: "¿Cuál es la red social más usada?", a: "Facebook, con más de 3.000 millones de usuarios activos." },
  { q: "¿Qué es un emoji?", a: "Un pictograma o ideograma digital usado en comunicaciones electrónicas para expresar emociones, conceptos u objetos." },
  { q: "¿Cuánto dura un partido de fútbol?", a: "90 minutos divididos en dos tiempos de 45 minutos, más tiempo añadido." },
  { q: "¿Cuántas teclas tiene un piano?", a: "Un piano estándar tiene 88 teclas: 52 blancas y 36 negras." },
  { q: "¿Cuántas cuerdas tiene una guitarra?", a: "Una guitarra estándar tiene 6 cuerdas." },
  { q: "¿Quién es el futbolista más famoso?", a: "Históricamente, Pelé y Maradona. En la era moderna, Lionel Messi y Cristiano Ronaldo." },
  { q: "¿Cuándo se inventó la televisión?", a: "Las primeras demostraciones fueron en la década de 1920. Philo Farnsworth y John Logie Baird fueron pioneros." },
  { q: "¿Qué es Wikipedia?", a: "Una enciclopedia libre y colaborativa en línea, fundada en 2001." },
  { q: "¿Qué es un podcast?", a: "Un programa de audio digital descargable o en streaming, generalmente organizado en episodios temáticos." },
  { q: "¿Cuántos dientes tiene un adulto?", a: "Un adulto tiene 32 dientes, incluyendo las muelas del juicio." },
  { q: "¿Cuánto mide un maratón?", a: "Un maratón mide 42,195 kilómetros." },
  { q: "¿Qué es una API?", a: "Una API (Application Programming Interface) permite que dos aplicaciones se comuniquen entre sí." },
  { q: "¿Qué es la nube?", a: "Cloud computing: acceso a servicios de computación a través de internet sin infraestructura propia." },
  { q: "¿Qué es un servidor?", a: "Un computador que proporciona servicios, datos o recursos a otros computadores." },
  { q: "¿Qué es una base de datos?", a: "Un sistema para almacenar, gestionar y recuperar información. Puede ser SQL o NoSQL." },
  { q: "¿Qué es un ERP?", a: "Enterprise Resource Planning: sistema que integra finanzas, inventario, producción y RRHH." },
  { q: "¿Qué es un CRM?", a: "Customer Relationship Management: sistema para gestionar relaciones con clientes." },
  { q: "¿Qué es un SLA?", a: "Service Level Agreement: acuerdo que define estándares de calidad y tiempos de respuesta." },
  { q: "¿Qué es un algoritmo?", a: "Secuencia de pasos lógicos para resolver un problema. Base de toda la programación." },
  { q: "¿Qué es Python?", a: "Lenguaje de programación popular por su simplicidad. Usado en ciencia de datos, IA y automatización." },
  { q: "¿Qué es JavaScript?", a: "El lenguaje más usado en la web. Permite crear páginas interactivas." },
  { q: "¿Qué es HTML?", a: "HyperText Markup Language: lenguaje para crear la estructura de páginas web." },
  { q: "¿Qué es CSS?", a: "Cascading Style Sheets: lenguaje que define el diseño visual de las páginas web." },
  { q: "¿Qué es Linux?", a: "Sistema operativo de código abierto, muy usado en servidores por su estabilidad y seguridad." },
  { q: "¿Qué es GitHub?", a: "Plataforma de desarrollo colaborativo con control de versiones Git." },
  { q: "¿Qué es Docker?", a: "Una plataforma de contenedores que permite empaquetar aplicaciones con todas sus dependencias." },
  { q: "¿Qué es Kubernetes?", a: "Un sistema de orquestación de contenedores creado por Google para automatizar despliegues." },
  { q: "¿Qué es SQL?", a: "Structured Query Language: lenguaje para gestionar y consultar bases de datos relacionales." },
  { q: "¿Qué es NoSQL?", a: "Bases de datos no relacionales diseñadas para datos no estructurados, escalabilidad y flexibilidad." },
  { q: "¿Qué es un firewall?", a: "Un sistema de seguridad que controla el tráfico de red, bloqueando accesos no autorizados." },
  { q: "¿Qué es la ciberseguridad?", a: "La práctica de proteger sistemas, redes y datos contra ataques digitales." },
  { q: "¿Qué es el phishing?", a: "Un fraude digital donde se suplanta la identidad de una entidad para robar datos personales." },
  { q: "¿Qué es blockchain?", a: "Tecnología de registro distribuido e inmutable, base de las criptomonedas." },
  { q: "¿Qué es Bitcoin?", a: "La primera criptomoneda descentralizada, creada por Satoshi Nakamoto en 2009." },
  { q: "¿Qué es el IoT?", a: "Internet of Things: la interconexión de dispositivos físicos a internet." },
  { q: "¿Qué es SaaS?", a: "Software as a Service: software distribuido como servicio a través de internet." },
  { q: "¿Qué es IaaS?", a: "Infrastructure as a Service: infraestructura de computación como servicio en la nube." },
  { q: "¿Qué es PaaS?", a: "Platform as a Service: plataforma de desarrollo en la nube." },
  { q: "¿Qué es AWS?", a: "Amazon Web Services: la plataforma de servicios en la nube más grande del mundo." },
  { q: "¿Qué es Azure?", a: "Microsoft Azure: plataforma de servicios en la nube de Microsoft." },
  { q: "¿Qué es Google Cloud?", a: "Google Cloud Platform (GCP): la plataforma de servicios en la nube de Google." },
  { q: "¿Qué es un dominio web?", a: "El nombre único que identifica un sitio web en internet, como opencore.cl." },
  { q: "¿Qué es el hosting?", a: "Servicio que almacena los archivos de un sitio web en un servidor accesible por internet." },
  { q: "¿Qué es SSL?", a: "Secure Sockets Layer: protocolo de seguridad para cifrar comunicaciones en internet (HTTPS)." },
  { q: "¿Qué es un backup?", a: "Una copia de seguridad de datos para poder restaurarlos en caso de pérdida." },
  { q: "¿Qué es un bug?", a: "Un error en el código de software que causa comportamiento inesperado." },
  { q: "¿Qué es debugging?", a: "El proceso de identificar y corregir errores (bugs) en el código." },
  { q: "¿Qué es frontend?", a: "La parte visual de una aplicación: lo que el usuario ve e interactúa." },
  { q: "¿Qué es backend?", a: "La parte del servidor de una aplicación: lógica, base de datos y procesamiento." },
  { q: "¿Qué es full stack?", a: "Un desarrollador que trabaja tanto en frontend como en backend." },
  { q: "¿Qué es responsive design?", a: "Diseño web que se adapta automáticamente a distintos tamaños de pantalla." },
  { q: "¿Qué es TypeScript?", a: "Un superset de JavaScript que añade tipado estático, creado por Microsoft." },
  { q: "¿Qué es React?", a: "Una biblioteca JavaScript creada por Meta (Facebook) para construir interfaces de usuario." },
  { q: "¿Qué es Node.js?", a: "Un entorno de ejecución que permite usar JavaScript en el servidor." },
  { q: "¿Qué es REST?", a: "Representational State Transfer: un estilo de arquitectura para APIs web." },
  { q: "¿Qué es GraphQL?", a: "Un lenguaje de consultas para APIs creado por Facebook, alternativa a REST." },
  { q: "¿Qué es microservicios?", a: "Arquitectura donde una aplicación se divide en servicios independientes y pequeños." },
  { q: "¿Qué es CI/CD?", a: "Integración Continua / Despliegue Continuo: prácticas de automatización en desarrollo de software." },
  { q: "¿Qué es Agile?", a: "Metodología de desarrollo de software basada en iteraciones cortas, colaboración y adaptabilidad." },
  { q: "¿Qué es un sprint?", a: "Un período de tiempo fijo (generalmente 2 semanas) en Scrum donde se completa un conjunto de trabajo." },
  { q: "¿Cuál es la moneda de Chile?", a: "El Peso Chileno (CLP)." },
  { q: "¿Cuántos habitantes tiene Chile?", a: "Aproximadamente 19-20 millones." },
  { q: "¿Cuál es el idioma oficial de Chile?", a: "El español (castellano)." },
  { q: "¿Qué es el SII?", a: "El Servicio de Impuestos Internos, encargado de la administración tributaria en Chile." },
  { q: "¿Qué es una boleta electrónica?", a: "Un documento tributario digital que reemplaza a la boleta de papel en Chile." },
  { q: "¿Qué es el IVA?", a: "El Impuesto al Valor Agregado. En Chile es del 19%." },
  { q: "¿Cuántas regiones tiene Chile?", a: "Chile tiene 16 regiones administrativas." },
  { q: "¿Cuál es el desierto más árido del mundo?", a: "El Desierto de Atacama, en el norte de Chile." },
  { q: "¿Cuál es el río más largo de Chile?", a: "El río Loa, con aproximadamente 440 km." },
  { q: "¿Cuál es la ciudad más grande de Chile?", a: "Santiago, con una población metropolitana de más de 7 millones." },
  { q: "¿Qué es CORFO?", a: "La Corporación de Fomento de la Producción, que apoya el emprendimiento en Chile." },
  { q: "¿Qué es SERCOTEC?", a: "El Servicio de Cooperación Técnica, que apoya a micro y pequeñas empresas en Chile." },
  { q: "¿Qué es Startup Chile?", a: "Un programa de CORFO que ofrece financiamiento y apoyo a startups." },
  { q: "¿Cuál es el código telefónico de Chile?", a: "El código de país es +56." },
  { q: "¿Cuál es la zona horaria de Chile?", a: "Chile continental usa UTC-3 en verano y UTC-4 en invierno." },
  { q: "¿Qué se celebra el 18 de septiembre?", a: "Las Fiestas Patrias de Chile, conmemorando la Primera Junta Nacional de Gobierno de 1810." },
  { q: "¿Qué se celebra el 21 de mayo?", a: "El Día de las Glorias Navales, en honor al Combate Naval de Iquique." },
  { q: "¿Qué es el Banco Central de Chile?", a: "La institución autónoma que regula la política monetaria y financiera del país." },
  { q: "¿Qué es la CMF?", a: "La Comisión para el Mercado Financiero, que supervisa y regula el sistema financiero chileno." },
  { q: "¿Cuál es la temperatura promedio de Santiago?", a: "Santiago tiene clima mediterráneo con promedio de 14°C anual. Veranos de 30°C e inviernos de 3°C." },
  { q: "¿Cuáles son los principales productos de exportación de Chile?", a: "Cobre, litio, frutas, salmón, vino y productos forestales." },
  { q: "¿Qué porcentaje de cobre mundial produce Chile?", a: "Chile produce alrededor del 25-28% del cobre mundial." },
  { q: "¿Qué es la Bolsa de Santiago?", a: "La principal bolsa de valores de Chile donde se transan acciones e instrumentos financieros." },
  { q: "¿Qué es el Metro de Santiago?", a: "El sistema de transporte masivo subterráneo de Santiago, con 7 líneas y más de 130 estaciones." },
  { q: "¿Cuántos aeropuertos tiene Chile?", a: "Chile tiene más de 30 aeropuertos, siendo el principal el Aeropuerto Internacional Arturo Merino Benítez (SCL)." },
  { q: "¿Qué es la Patagonia chilena?", a: "La región sur de Chile, conocida por glaciares, fiordos y paisajes de naturaleza prístina." },
  { q: "¿Cuál es el volcán activo más alto de Chile?", a: "El volcán Láscar, en la Región de Antofagasta, a 5.592 metros." },
  { q: "¿Cuántos volcanes activos tiene Chile?", a: "Chile tiene aproximadamente 90 volcanes activos, la segunda mayor cantidad del mundo." },
  { q: "¿Qué es el pisco chileno?", a: "Un destilado de uva producido en las regiones de Atacama y Coquimbo, con denominación de origen." },
  { q: "¿Quién es Violeta Parra?", a: "Cantautora, artista y folclorista chilena, autora de 'Gracias a la Vida'. Figura central de la cultura chilena." },
  { q: "¿Quién es Víctor Jara?", a: "Cantautor y director teatral chileno, ícono de la Nueva Canción Chilena." },
  { q: "¿Cuáles son los principales puertos de Chile?", a: "Valparaíso, San Antonio, Arica, Iquique y San Vicente." },
  { q: "¿Qué es la Teletón?", a: "Una campaña solidaria chilena que recauda fondos para la rehabilitación de niños con discapacidad." },
  { q: "¿Cuál es el sueldo mínimo en Chile?", a: "El sueldo mínimo en Chile se actualiza periódicamente. Consulta fuentes oficiales para la cifra vigente." },
  { q: "¿Qué es un RUT?", a: "El Rol Único Tributario, número de identificación fiscal en Chile." },
  { q: "¿Qué es la AFP?", a: "Administradora de Fondos de Pensiones, el sistema privado de pensiones en Chile." },
  { q: "¿Qué es una Isapre?", a: "Instituciones de Salud Previsional, aseguradoras de salud privadas en Chile." },
  { q: "¿Qué es Fonasa?", a: "El Fondo Nacional de Salud, sistema público de salud en Chile." },
  { q: "¿Cuáles son las universidades más importantes de Chile?", a: "Universidad de Chile, PUC, Universidad de Concepción, USM, entre otras." },
  { q: "¿Chile tiene premio Nobel?", a: "Sí, dos en Literatura: Gabriela Mistral (1945) y Pablo Neruda (1971)." },
  { q: "¿Cuántos mundiales de fútbol ha ganado Chile?", a: "Chile no ha ganado un mundial de fútbol. Su mejor resultado fue 3er lugar en 1962 como local." },
  { q: "¿Qué es una DTE?", a: "Documento Tributario Electrónico: facturas, boletas y otros documentos fiscales en formato digital." },
  { q: "¿Cuál es el PIB de Chile?", a: "El PIB de Chile ronda los 300-330 mil millones de dólares (varía anualmente). Es una de las economías más estables de Latinoamérica." },
  { q: "¿Qué es el litio?", a: "Un metal ligero esencial para baterías. Chile tiene las mayores reservas del mundo en el Salar de Atacama." },
  { q: "¿Qué es una zona franca?", a: "Un área geográfica con beneficios tributarios y aduaneros. En Chile, la más conocida es la de Iquique (ZOFRI)." },
  { q: "¿Cuántas horas tiene la jornada laboral en Chile?", a: "45 horas semanales (en proceso de reducción a 40 horas)." },
  { q: "¿Qué es el finiquito?", a: "Documento legal que pone fin a la relación laboral entre empleador y trabajador en Chile." },
  { q: "¿Qué se necesita para crear una empresa en Chile?", a: "Se puede crear online en tuempresaenundia.cl. Se necesita RUT, dirección, capital y definir tipo de sociedad." },
  { q: "¿Qué es el CAE?", a: "Crédito con Aval del Estado, un sistema de financiamiento para educación superior en Chile." },
  { q: "¿Qué es una SpA?", a: "Sociedad por Acciones: tipo de sociedad flexible en Chile, muy usada por startups." },
  { q: "¿Qué es una EIRL?", a: "Empresa Individual de Responsabilidad Limitada: empresa unipersonal con responsabilidad limitada." },
  { q: "¿Qué es el ROI?", a: "Return on Investment: rentabilidad de una inversión. (Ganancia - Inversión) / Inversión × 100%." },
  { q: "¿Qué es un MVP?", a: "Minimum Viable Product: versión mínima de un producto para validar una idea de negocio." },
  { q: "¿Qué es outsourcing?", a: "Contratar servicios externos para funciones que podrían hacerse internamente." },
  { q: "¿Qué es scrum?", a: "Marco de trabajo ágil que organiza proyectos en sprints con roles definidos." },
  { q: "¿Qué es DevOps?", a: "Cultura que integra desarrollo y operaciones para acelerar entregas de software." },
  { q: "¿Qué es la transformación digital?", a: "Integración de tecnología en todas las áreas del negocio para mejorar operaciones y crear valor." },
  { q: "¿Qué es un pitch?", a: "Una presentación breve y persuasiva de un proyecto o negocio ante potenciales inversores o clientes." },
  { q: "¿Qué es un KPI?", a: "Key Performance Indicator: métrica clave para medir el rendimiento de un proceso o estrategia." },
  { q: "¿Qué es un stakeholder?", a: "Cualquier persona o grupo que tiene interés o se ve afectado por un proyecto o empresa." },
  { q: "¿Qué es el flujo de caja?", a: "El movimiento de dinero que entra y sale de una empresa en un periodo determinado." },
  { q: "¿Qué es un balance general?", a: "Un estado financiero que muestra activos, pasivos y patrimonio de una empresa en un momento dado." },
  { q: "¿Qué es el EBITDA?", a: "Earnings Before Interest, Taxes, Depreciation and Amortization: indicador de rentabilidad operativa." },
  { q: "¿Qué es una startup?", a: "Una empresa emergente con alto potencial de crecimiento, generalmente basada en innovación tecnológica." },
  { q: "¿Qué es venture capital?", a: "Capital de riesgo: inversión en empresas emergentes con alto potencial a cambio de participación accionaria." },
  { q: "¿Qué es bootstrapping?", a: "Financiar una empresa con recursos propios, sin inversores externos." },
  { q: "¿Qué es una ronda de inversión?", a: "Proceso donde una startup busca financiamiento externo (Seed, Serie A, B, C…)." },
  { q: "¿Qué es el break-even?", a: "El punto de equilibrio donde los ingresos igualan los costos. A partir de ahí, hay ganancia." },
  { q: "¿Qué es un modelo de negocio?", a: "El esquema que define cómo una empresa crea, entrega y captura valor económico." },
  { q: "¿Qué es el modelo canvas?", a: "El Business Model Canvas: herramienta visual de 9 bloques para diseñar modelos de negocio." },
  { q: "¿Qué es B2B?", a: "Business to Business: empresas que venden productos o servicios a otras empresas." },
  { q: "¿Qué es B2C?", a: "Business to Consumer: empresas que venden directamente al consumidor final." },
  { q: "¿Qué es un lead?", a: "Un contacto potencial interesado en tus productos o servicios." },
  { q: "¿Qué es un funnel de ventas?", a: "El embudo que representa las etapas del proceso de venta: desde prospecto hasta cliente." },
  { q: "¿Qué es el churn rate?", a: "La tasa de cancelación de clientes en un periodo determinado." },
  { q: "¿Qué es una SaaS company?", a: "Una empresa que vende software como servicio por suscripción." },
  { q: "¿Qué es el product-market fit?", a: "El momento donde un producto satisface una demanda real del mercado." },
  { q: "¿Qué es el growth hacking?", a: "Estrategias creativas de bajo costo para adquirir y retener usuarios rápidamente." },
  { q: "¿Qué es un NDA?", a: "Non-Disclosure Agreement: acuerdo de confidencialidad entre partes." },
  { q: "¿Qué es due diligence?", a: "Proceso de investigación exhaustiva antes de una inversión o transacción empresarial." },
  { q: "¿Qué es un term sheet?", a: "Documento no vinculante que establece los términos básicos de una inversión." },
  { q: "¿Qué es el equity?", a: "La participación accionaria o el valor patrimonial de una empresa." },
  { q: "¿Qué es un board of directors?", a: "El directorio: grupo de personas elegidas para supervisar y dirigir una empresa." },
  { q: "¿Qué es la escalabilidad?", a: "La capacidad de un negocio o sistema para crecer sin que los costos aumenten proporcionalmente." },
  { q: "¿Qué es el time to market?", a: "El tiempo que tarda un producto desde su concepción hasta estar disponible para los clientes." },
  { q: "¿Qué es un roadmap?", a: "Un plan estratégico visual que define hitos y objetivos de un producto o proyecto a lo largo del tiempo." },
  { q: "¿Qué es OKR?", a: "Objectives and Key Results: metodología de gestión para definir y medir objetivos." },
  { q: "¿Qué es lean startup?", a: "Metodología que busca crear negocios reduciendo ciclos de desarrollo y validando hipótesis rápidamente." },
  { q: "¿Qué es design thinking?", a: "Metodología de innovación centrada en el usuario para resolver problemas complejos." },
  { q: "¿Qué es customer success?", a: "Estrategia empresarial enfocada en asegurar que los clientes logren sus objetivos con tu producto." },
  { q: "¿Qué es el LTV?", a: "Lifetime Value: el valor total que un cliente genera durante toda su relación con la empresa." },
  { q: "¿Qué es el CAC?", a: "Customer Acquisition Cost: el costo promedio de adquirir un nuevo cliente." },
  { q: "¿Qué es una propuesta de valor?", a: "La razón principal por la que un cliente debería elegir tu producto o servicio sobre la competencia." },
  { q: "¿Qué es benchmarking?", a: "Comparar las prácticas y resultados de tu empresa con las mejores del mercado." },
  { q: "¿Qué es un pivot?", a: "Un cambio estratégico fundamental en el modelo de negocio de una startup." },
  { q: "¿Qué es el burn rate?", a: "La velocidad a la que una empresa gasta su capital antes de generar ingresos positivos." },
  { q: "¿Qué es un unicornio?", a: "Una startup valorada en más de 1.000 millones de dólares." },
  { q: "¿Qué es una SLA?", a: "Service Level Agreement: contrato que define niveles de servicio garantizados." },
  { q: "¿Qué es compliance?", a: "El cumplimiento normativo: asegurar que la empresa opera dentro del marco legal y regulatorio." },
  { q: "¿Cuál es el animal más rápido del mundo?", a: "El guepardo en tierra (120 km/h). El halcón peregrino en aire (+300 km/h en picada)." },
  { q: "¿Cuál es el animal más grande del mundo?", a: "La ballena azul: hasta 30 metros y 150+ toneladas." },
  { q: "¿Cuál es el animal más pequeño del mundo?", a: "La rana Paedophryne amauensis de Papúa Nueva Guinea, con apenas 7,7 mm." },
  { q: "¿Cuántos años vive una tortuga?", a: "Algunas tortugas gigantes pueden vivir más de 150-200 años." },
  { q: "¿Cuál es el edificio más alto del mundo?", a: "El Burj Khalifa en Dubái, con 828 metros de altura." },
  { q: "¿Cuál es el puente más largo del mundo?", a: "El puente Danyang-Kunshan en China, con 164,8 km." },
  { q: "¿Cuántas especies existen en la Tierra?", a: "Se estima que hay entre 8 y 10 millones de especies, de las cuales solo 1,5 millones están catalogadas." },
  { q: "¿Cuánto pesa el Sol?", a: "Aproximadamente 1,989 × 10³⁰ kg, unas 333.000 veces la masa de la Tierra." },
  { q: "¿A qué distancia está el Sol de la Tierra?", a: "Aproximadamente 150 millones de km (1 unidad astronómica)." },
  { q: "¿A qué distancia está la Luna?", a: "Aproximadamente 384.400 km de la Tierra." },
  { q: "¿Cuánto tarda la luz del Sol en llegar a la Tierra?", a: "Aproximadamente 8 minutos y 20 segundos." },
  { q: "¿Cuál es el metal más caro del mundo?", a: "El rodio, que puede superar los 500 dólares por gramo." },
  { q: "¿Cuál es el país con más islas?", a: "Suecia, con más de 267.000 islas." },
  { q: "¿Cuántas personas han pisado la Luna?", a: "12 astronautas han caminado sobre la Luna, todos del programa Apolo de la NASA." },
  { q: "¿Qué porcentaje de la Tierra es agua?", a: "Aproximadamente el 71% de la superficie terrestre está cubierta de agua." },
  { q: "¿Cuánta agua dulce hay en la Tierra?", a: "Solo el 2,5% del agua total es dulce, y la mayoría está en glaciares." },
  { q: "¿Cuál es la profundidad máxima del océano?", a: "La Fosa de las Marianas tiene 10.994 metros de profundidad." },
  { q: "¿Cuántos dedos tiene un pulpo?", a: "Un pulpo tiene 8 tentáculos (brazo), no dedos. 3 corazones y sangre azul." },
  { q: "¿El tomate es fruta o verdura?", a: "Botánicamente es una fruta (una baya), pero culinariamente se trata como verdura." },
  { q: "¿El plátano es una hierba?", a: "Técnicamente sí: la planta del banano es una hierba gigante, no un árbol." },
  { q: "¿Cuántos litros de sangre bombea el corazón al día?", a: "Aproximadamente 7.500 litros por día." },
  { q: "¿Cuántas veces late el corazón por minuto?", a: "En reposo, entre 60 y 100 latidos por minuto." },
  { q: "¿Cuántos km de vasos sanguíneos tiene el cuerpo?", a: "Aproximadamente 100.000 km, suficiente para dar más de 2 vueltas a la Tierra." },
  { q: "¿Cuántas veces parpadea una persona al día?", a: "Aproximadamente 15.000 a 20.000 veces al día." },
  { q: "¿Es cierto que los tiburones no tienen huesos?", a: "Sí, su esqueleto es de cartílago, no de hueso." },
  { q: "¿Los delfines duermen?", a: "Sí, pero con medio cerebro a la vez para seguir respirando en la superficie." },
  { q: "¿Cuántos años puede vivir un loro?", a: "Algunas especies de loros pueden vivir 50-80 años." },
  { q: "¿Cuál es el instrumento más antiguo?", a: "Se han encontrado flautas de hueso de más de 40.000 años de antigüedad." },
  { q: "¿Cuántas lenguas habla la persona más políglota?", a: "Se han documentado personas que hablan más de 40 idiomas." },
  { q: "¿Qué es un palíndromo?", a: "Una palabra o frase que se lee igual de izquierda a derecha. Ejemplo: 'reconocer'." },
  { q: "¿Cuál es la palabra más larga del español?", a: "'Electroencefalografista', con 23 letras." },
  { q: "¿Cuántos megapíxeles tiene el ojo humano?", a: "Se estima que equivale a unos 576 megapíxeles." },
  { q: "¿Cuántas estrellas se ven a simple vista?", a: "En condiciones ideales, cerca de 5.000 estrellas." },
  { q: "¿Qué tan caliente es el centro de la Tierra?", a: "El núcleo interno alcanza unos 5.500°C, similar a la superficie del Sol." },
  { q: "¿Cuánto tarda la Tierra en rotar sobre su eje?", a: "23 horas, 56 minutos y 4 segundos (un día sideral)." },
  { q: "¿Cuál es el organismo más antiguo de la Tierra?", a: "Árboles como el pino Bristlecone pueden vivir más de 5.000 años." },
  { q: "¿La Gran Muralla China se ve desde el espacio?", a: "Contrario al mito popular, no es visible a simple vista desde el espacio." },
  { q: "¿Cuántos libros se publican al año en el mundo?", a: "Se estima que más de 2,2 millones de títulos nuevos por año." },
  { q: "¿Quién inventó el chocolate?", a: "Los Mayas y Aztecas consumían cacao hace más de 3.000 años. El chocolate moderno se desarrolló en Europa." },
  { q: "¿Cuánto café se consume en el mundo?", a: "Más de 2.250 millones de tazas diarias." },
  { q: "¿Cuál es el libro más vendido de la historia?", a: "La Biblia, con más de 5.000 millones de copias estimadas." },
  { q: "¿Cuántos píxeles tiene una pantalla 4K?", a: "3.840 × 2.160 = 8.294.400 píxeles (aproximadamente 8,3 megapíxeles)." },
  { q: "¿Cuántas canciones tiene Spotify?", a: "Más de 100 millones de canciones disponibles." },
  { q: "¿Cuál es el videojuego más vendido de todos los tiempos?", a: "Minecraft, con más de 300 millones de copias vendidas." },
  { q: "¿Cuántos correos electrónicos se envían al día?", a: "Aproximadamente 333.000 millones de correos electrónicos diarios." },
  { q: "¿Cuántos sitios web hay en internet?", a: "Más de 1.900 millones de sitios web registrados." },
  { q: "¿Cuántos usuarios tiene internet?", a: "Más de 5.400 millones de personas usan internet actualmente." },
  { q: "¿Cuántos smartphones hay en el mundo?", a: "Más de 6.800 millones de smartphones activos." },
  { q: "¿Cuál es el país más feliz del mundo?", a: "Finlandia ha liderado el ranking de felicidad mundial en los últimos años." },
  { q: "¿Cuánto dura un rayo?", a: "Un rayo dura menos de un segundo, pero puede calentar el aire a 30.000°C." },
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
  { q: "¿Me entregan el código fuente?", a: "Sí. En nuestra política de transparencia absoluta, entregamos la propiedad y el código fuente en aproximadamente el 90% de los proyectos a medida al finalizar comercialmente." },
  { q: "¿Es fácil integrar su sistema?", a: "Sí, nuestros sistemas se diseñan API-first, listos para conectarse con SAP, Defontana, o herramientas externas." },
  { q: "¿Pueden arreglar un software mal hecho?", a: "Sí, somos expertos en refactorización, rescate de proyectos heredados (legacy) y auditorías de código." },
  { q: "¿Tienen ingenieros chilenos?", a: "Contamos con talento local y regional altamente calificado." },
  { q: "¿Qué dicen sus clientes?", a: "Destacan nuestro compromiso, conocimiento técnico y la tranquilidad que les da tenernos como partners." },
  { q: "¿Son una agencia de marketing?", a: "No, somos una consultora y fábrica de software especializada en el corazón operativo de su negocio." },
  { q: "¿Tienen certificación de seguridad?", a: "Aplicamos normativas de industria y mejores prácticas de seguridad en la nube." },
  { q: "¿Puedo confiarles mis datos?", a: "Cumplimos con las leyes de protección de datos (Ley 19.628). Toda información se maneja bajo acuerdos NDA." },
  { q: "¿Es muy caro el software?", a: "Nuestros precios son una inversión estratégica, adaptada a empresas que buscan soluciones que no fallen." },
  { q: "¿Cuánto cuesta una página web?", a: "Depende de la complejidad. Una web corporativa profesional parte desde valores base, pero lo cotizamos a medida." },
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
  { q: "¿Hacen sistemas de inventario?", a: "Sí, diseñamos sistemas de control de inventario en tiempo real, integrados a sistemas de ventas (WMS)." },
  { q: "¿Pueden conectar mi web con Defontana?", a: "Claro que sí. Somos expertos en conectar e-commerce con ERPs como Defontana mediante su API oficial." },
  { q: "¿Integran SAP?", a: "Integraciones avanzadas con SAP Business One (DI API / Service Layer) para sincronizar stock, pedidos y DTEs." },
  { q: "¿Hacen e-commerce?", a: "Implementamos plataformas B2B y B2C ultraoptimizadas para venta corporativa." },
  { q: "¿Pueden modernizar un sistema viejo?", a: "Sí. Transformamos sistemas legacy (ej. Visual Basic, FoxPro antiguos) a plataformas web modernas (React/Node)." },
  { q: "¿Hacen facturación electrónica?", a: "Sí, integramos módulos de facturación electrónica DTE (boletas y facturas) homologados con el SII." },
  { q: "¿Tienen soluciones para hoteles?", a: "Tenemos gran experiencia en turismo: motores de reserva (Booking Engines) e integraciones con Channel Managers." },
  { q: "¿Qué es logística 4.0?", a: "Es la digitalización de la cadena de suministro. Nosotros conectamos sus bodegas con los couriers (Starken, Chilexpress, etc.)." },
  { q: "¿Desarrollan sistemas B2B?", a: "Nuestra especialidad son portales B2B donde sus clientes mayoristas pueden autogestionar pedidos y stock transparente." },
  { q: "¿Pueden hacer un portal de proveedores?", a: "El desarrollo de webs informativas estáticas no es nuestro foco principal. Nos especializamos en portales corporativos complejos, e-commerce B2B integrado a ERPs y plataformas críticas de alta disponibilidad." },
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
  { q: "¿Cuánto tardan en hacer un sistema?", a: "Depende del tamaño. Un MVP (Producto Mínimo Viable) toma entre 4 y 12 semanas para salir a certificar." },
  { q: "¿Cuánto se demoran en hacer una web?", a: "Una web corporativa toma de 3 a 5 semanas, considerando levantamiento, diseño, revisiones y puesta en vivo." },
  { q: "¿Qué metodología de trabajo usan?", a: "Metodologías ágiles (Scrum / Kanban). Usted verá demostraciones de avance cada dos semanas (sprints)." },
  { q: "¿Pueden empezar a trabajar mañana?", a: "Iniciamos apenas firme contrato y apruebe el diagnóstico técnico. En 48 hrs tenemos la reunión de Kick-off." },
  { q: "¿Tengo que esperar meses para ver avances?", a: "No. Con nuestro enfoque iterativo, liberamos el software en capas funcionales desde los primeros sprints." },
  { q: "¿Qué pasa si quiero cambiar algo a mitad de camino?", a: "Las metodologías ágiles abrazan el cambio. Se re-prioriza el backlog (lista de tareas) sin conflictos dolorosos." },
  { q: "¿Cómo sé en qué están trabajando?", a: "Mantenemos tableros de Trello/Jira abiertos con el cliente y reuniones sincronizadas semanales." },
  { q: "¿Quién lidera el proyecto en OpenCORE?", a: "Usted interactuará con un Jefe de Proyecto o Product Owner dedicado, no con el programador directamente, facilitando comunicación." },
  { q: "¿Nos obligan a juntarnos físicamente?", a: "Operamos de forma 100% digital vía Google Meet o Zoom, aunque en etapas críticas valoramos reuniones presenciales estratégicas." },
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
  { q: "Estoy cansado que mi web se caiga en los Cyberdays", a: "Si se migra a nuestra infraestructura en cloud autoescalable programada en OpenCORE, eso pasará al olvido." },
  { q: "¿Sus programas son buenos?", a: "Son los mejores. Garantizamos estabilidad, escalabilidad y un rendimiento impecable para su empresa." },
  { q: "¿En serio son los mejores?", a: "Totalmente. Nuestro compromiso con la continuidad operativa y la excelencia técnica nos destaca en el mercado industrial y B2B." },
  { q: "¿Por qué los recomiendan tanto?", a: "Porque no somos una simple agencia web. Somos ingenieros de software que resolvemos problemas reales de rentabilidad y procesos." },
  { q: "¿Son rápidos para trabajar?", a: "Sí, trabajamos con metodologías ágiles (Scrum) entregando valor y software funcional en ciclos cortos de 2 a 3 semanas." },
  { q: "¿Son muy careros?", a: "Nuestros costos reflejan la altísima calidad y disponibilidad de nuestros ingenieros Senior. Entregamos soluciones que no fallan, lo cual termina siendo la opción más rentable." },
  { q: "¿Vale la pena contratarlos?", a: "Cada peso invertido en OpenCORE se multiplica en ahorros operativos, automatización de horas hombre y sistemas que no se caen." },
  { q: "¿Sus sistemas fallan?", a: "Minimizamos el riesgo al máximo usando arquitecturas modernas (Microservicios, Cloud AWS). Nuestros sistemas tienen un uptime superior al 99.9%." },
  { q: "¿Trabajan bien?", a: "La excelencia es nuestro estándar. Código limpio, pruebas rigurosas y documentación completa en cada entrega." },
  { q: "¿Puedo confiar en OpenCORE?", a: "Firmamos contratos formales, Acuerdos de Confidencialidad (NDA) y SLAs de servicio. Su empresa está en manos seguras." },
  { q: "¿Qué los hace tan especiales?", a: "Entendemos de tecnología, pero más importante, entendemos de NEGOCIOS. Hablamos de ROI, rentabilidad, inventario y facturación activa." },
  { q: "¿Van a solucionar mi problema?", a: "Esa es nuestra especialidad. Diagnosticamos su cuello de botella tecnológico y lo resolvemos con ingeniería de software precisa." },
  { q: "¿Me van a estafar?", a: "Somos una Sociedad por Acciones (SpA) establecida formalmente en Chile, con facturación electrónica y contratos legales vinculantes. Su inversión es 100% segura y transparente." },
  { q: "¿Tienen mal servicio al cliente?", a: "Todo lo contrario. Para los clientes bajo SLA, garantizamos tiempos de respuesta (SLA) inmediatos frente a incidentes críticos." },
  { q: "¿Uds arreglan desastres de otros?", a: "Claro que sí. Somos expertos en rescatar código heredado, solucionar bugs críticos y estabilizar plataformas colapsadas." },
  { q: "¿Son caros o baratos?", a: "Ofrecemos valor 'Enterprise-Grade'. No competimos por ser los más baratos de internet, competimos por ser los mejores y más robustos." },
  { q: "¿Me recomiendas a OpenCORE?", a: "Yo soy su IA integrada, por lo que mi opinión podría ser parcial, pero nuestros clientes recurrentes afirman que somos el mejor partner de software." },
  { q: "¿Hacen cosas de buena calidad?", a: "Diseñamos interfaces Premium y código de alta resistencia. Buscamos siempre el 'Efecto WOW' combinado con eficiencia." },
  { q: "¿Son la mejor empresa de software de Chile?", a: "Trabajamos arduamente todos los días para serlo. Especialmente en software para logística, turismo y retail." },
  { q: "¿Tienen soporte 24/7?", a: "Los planes de Mantenimiento y Soporte SLA pueden incluir monitoreo y respuesta a incidentes críticos 24/7 según el plan contratado." },
  { q: "¿Trabajan rápido o lento?", a: "Depende del proyecto, pero somos ágiles. Preferimos construir rápido de a pedazos seguros (MVP) que demorarnos años." },
  { q: "¿Cuánto me garantizan que funcione?", a: "Entregamos garantías post-lanzamiento por contrato y ofrecemos cobertura continua para actualizaciones y monitoreo de nube." },
  { q: "¿Si se cae la página de noche qué pasa?", a: "Implementamos alertas automatizadas que notifican a nuestro equipo de guardia instantáneamente si adquiere un plan SLA." },
  { q: "¿Si son tan buenos?", a: "Lo somos. Nos centramos en proyectos críticos donde el software es el motor del negocio, no solo una vitrina." },
  { q: "Quiero una empresa seria.", a: "Está en el lugar correcto. Somos OpenCORE Consulting, especialistas en tecnología y continuidad operativa corporativa." },
  { q: "Necesito alguien que no me deje botado.", a: "Operamos bajo pólizas de mantención mensual y SLA para ser su partner tecnológico a largo plazo." },
  { q: "Han quebrado otras veces?", a: "No, OpenCORE es una empresa sólida y en constante expansión apoyando al sector B2B chileno." },
  { q: "¿Manejan AWS?", a: "Sí, somos expertos en Amazon Web Services: EC2, S3, RDS, Lambda, VPC y arquitecturas Serverless." },
  { q: "¿Conocen Google Cloud?", a: "Trabajamos extensamente con GCP: Compute Engine, Cloud Run, Cloud Functions, BigQuery y Firebase." },
  { q: "¿Qué es mejor AWS o Azure?", a: "Depende de su infraestructura actual. Si su empresa es 100% ecosistema Microsoft, Azure es ideal. Si requieren elasticidad extrema, AWS es el rey." },
  { q: "¿Trabajan con React?", a: "React.js y Next.js son nuestras tecnologías principales para el desarrollo Frontend web avanzado." },
  { q: "¿Programan en Python?", a: "Sí. Python es excelente para nuestros proyectos de Inteligencia Artificial (RAG, LLMs), scraping y automatización backend." },
  { q: "¿Hacen apps en iOS?", a: "Desarrollamos aplicaciones móviles nativas o multiplataforma (React Native / Flutter) que corren perfecto en iPhone (iOS) y Android." },
  { q: "¿Pueden migrar mi base MySQL a PostgreSQL?", a: "Totalmente. Realizamos migraciones completas de motores de base de datos relacionales asegurando integridad." },
  { q: "¿Conectan Defontana con Shopify?", a: "Es una de nuestras integraciones estrella. Hacemos que sus ventas web rebajen inventario y emitan facturas en su ERP Defontana sin humanos." },
  { q: "¿Sincronizan SAP B1?", a: "Trabajamos con SAP Business One mediante la Service Layer para leer stock maestro y empujar Notas de Venta." },
  { q: "¿Automatizan Bsale?", a: "Integramos Bsale vía API para sincronizar inventarios, ventas y documentos electrónicos DTE a otras plataformas corporativas." },
  { q: "¿Pueden programar un robot web?", a: "Desarrollamos bots y scrapers legales para capturar información pública competitiva y tabulársela en Excel o PowerBI." },
  { q: "¿Hacen tableros PowerBI?", a: "Integramos sus datos dispersos en Data Lakes y construimos tableros de PowerBI para gerencia." },
  { q: "¿Pueden arreglar mi WordPress lento?", a: "Auditamos la velocidad (Core Web Vitals), optimizamos base de datos, caché y CDN, o bien, lo migramos directo a Headless." },
  { q: "¿Usan Node js?", a: "Node.js (TypeScript/NestJS) es nuestra base principal para construir APIs ultrarrápidas y asíncronas." },
  { q: "¿Conocen Docker?", a: "Todo nuestro software se empaqueta en contenedores Docker y se orquesta con Kubernetes o Cloud Run para máximo aislamiento." },
  { q: "¿Revisan código de seguridad?", a: "Nuestros proyectos incluyen revisiones contra vulnerabilidades tipo OWASP Top 10 (Inyecciones SQL, XSS, etc.)." },
  { q: "¿Hacen pentesting?", a: "Podemos ejecutar auditorías de ciberseguridad básicas y apoyar correcciones críticas si usted fue víctima de un hackeo." },
  { q: "¿Saben hacer pasarelas de pago?", a: "Integramos Webpay Plus (Transbank), MercadoPago, Flow, Stripe y pasarelas personalizadas vía API." },
  { q: "¿Me ayudan a conectarme con Starken o Chilexpress?", a: "Programamos integraciones logísticas 4.0; sus órdenes de compra generarán la etiqueta de envío de forma 100% automática." },
  { q: "¿Hacen software a medida con IA?", a: "Sí. Podemos construir asistentes conversacionales propios, flujos de análisis de texto (RAG) o clasificadores automáticos entrenados con sus datos." },
  { q: "Mis vendedores cotizan lento.", a: "Le diseñaremos un portal B2B o Cotizador Cloud Inteligente conectado al stock, acortando tiempos de 3 días a 3 minutos." },
  { q: "Tengo quiebres de stock continuos.", a: "El quiebre de stock ocurre por falta de integración omnicanal. En OpenCORE conectaremos su bodega física con su e-commerce en microsegundos." },
  { q: "Mi equipo pierde horas en Excel.", a: "Las planillas de Excel son útiles para partir, pero letales para crecer. Convertiremos sus Excels complejos en un Sistema ERP o CRM Web seguro y colaborativo." },
  { q: "Me robaron datos, ¿me ayudan?", a: "Atendemos emergencias de arquitectura. Bloqueamos el servidor vulnerado, auditamos logs, parchamos vulnerabilidades y migramos a servidores seguros con WAF (Web Application Firewall)." },
  { q: "Tenemos mucho papel aún en la oficina.", a: "Podemos desarrollar una Intranet digital o una APP corporativa interna donde informes, firmas y contratos se procesen de forma 100% remota y legal." },
  { q: "Tenemos sistemas que no se hablan entre sí.", a: "Los 'silos de información' son comunes. Construimos APIs y Middlewares que actúan como traductores, haciendo que su software contable, logístico y RRHH compartan una única verdad." },
  { q: "Los programadores anteriores se fueron y dejaron todo a la mitad.", a: "El rescate de proyectos es nuestra especialidad. Hacemos ingeniería inversa para entender el código huérfano y retomamos el desarrollo profesionalmente." },
  { q: "Necesito controlar mis camionetas de despacho.", a: "Desarrollamos Apps móviles con geolocalización continua en segundo plano, donde sus choferes puedan marcar entregas con prueba fotográfica directo al sistema central." },
  { q: "Las transferencias nos vuelven locos al cuadrar.", a: "Sustituimos la conciliación manual mediante integración API con los bancos (si aplica) o pasarelas de pago B2B automatizadas." },
  { q: "Nuestra web actual da vergüenza.", a: "OpenCORE levantará un portal corporativo moderno, ultra-veloz, con animaciones atractivas que eleve la percepción de valor institucional (Efecto WOW)." },
  { q: "Pregunta sobre integracion ERP 1", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 1", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 2", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 2", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 3", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 3", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 4", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 4", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 5", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 5", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 6", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 6", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 7", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 7", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 8", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 8", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 9", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 9", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 10", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 10", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 11", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 11", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 12", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 12", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 13", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 13", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 14", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 14", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 15", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 15", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 16", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 16", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 17", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 17", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 18", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 18", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 19", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 19", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 20", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 20", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 21", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 21", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 22", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 22", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 23", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 23", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 24", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 24", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 25", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 25", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 26", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 26", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 27", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 27", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 28", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 28", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 29", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 29", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
  { q: "Pregunta sobre integracion ERP 30", a: "Una integración ERP como SAP o Defontana elimina los ingresos manuales, previniendo los típicos errores humanos que cuestan dinero y tiempo." },
  { q: "Quiero resolver un problema logístico 30", a: "La logística 4.0 exige conexión en tiempo real entre inventario, tienda, bodega de despacho y flota de entrega. En OpenCORE lo programamos todo vía API." },
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
  { q: "Quiero comprar", a: "¡Excelente decisión! Cuénteme brevemente qué sistema o integración necesita y un especialista lo contactará hoy mismo." },
  { q: "Necesito ayuda", a: "Estoy aquí para orientarle. ¿Qué problema tecnológico le impide vender o crecer actualmente?" },
  { q: "No sé qué necesito", a: "Es muy normal. Le sugiero agendar una reunión de diagnóstico gratuita con nosotros para mapear los dolores de su empresa." },
  { q: "Tengo un problema con defontana", a: "Las integraciones ERP son nuestra especialidad. Podemos automatizar sus procesos estancados con Defontana vía API." },
  { q: "Tengo un problema con mercado libre", a: "Sincronizamos MercadoLibre con su bodega y facturador electrónico para que no quiebre stock nunca más." },
  { q: "Quiero una app como uber", a: "Las apps de ruteo en tiempo real son complejas pero factibles. Desarrollamos la logística, los mapas y la pasarela de pagos B2B subyacente." },
  { q: "Quiero una app como netflix", a: "Construir plataformas de streaming masivo es un proyecto de grado Enterprise que requiere infraestructuras pesadas (AWS MediaLive). Lo evaluamos en reunión." },
  { q: "Son una estafa?", a: "En absoluto. Somos una consultora B2B establecida (SpA). Operamos con contratos formales y facturación electrónica autorizada por el SII." },
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
  { q: "¿Sus programas son de calidad?", a: "La más alta del mercado. Hacemos software diseñado para soportar golpes y picos de tráfico." },
  { q: "¿No se va a caer en el cyber?", a: "Exacto. Nuestras arquitecturas Auto Scaling en AWS o GCP añaden servidores mágicamente cuando hay mucho tráfico, por lo que su tienda no se colgará." },
  { q: "¿Pueden mejorar algo que ya existe?", a: "Una de nuestras especialidades es la Refactorización. Tomamos código lento o con bugs y lo dejamos operando como nuevo." },
  { q: "¿Dan soluciones reales?", a: "Nos encanta resolver dolores corporativos: desde bodegas descuadradas hasta catálogos no sincronizados. A eso nos dedicamos." },
  { q: "¿Puedo hablar con un humano?", a: "Siempre. Deje su número o presione el ícono de WhatsApp y un consultor técnico conversará con usted en breve." },
  { q: "Necesito un humano", a: "Entendido. Para hablar con un especialista de OpenCORE, presione el ícono de WhatsApp y responderán sus dudas." },
  { q: "Son agencia?", a: "Somos una Firma Consultora especializada en Ingeniería de Software. Más robusto, profundo y duradero que una agencia de publicidad." },
  { q: "Son los mejores?", a: "Por supuesto. Nos enfocamos en ofrecer soluciones inigualables en Chile para digitalizar procesos complejos." },
  { q: "Estoy enojado", a: "Lamento si ha tenido malas experiencias con la tecnología antes. En OpenCORE nos dedicamos a resolver justamente el caos técnico dejado por otros." },
  { q: "Tengo un reclamo", a: "Si usted ya es cliente OpenCORE, por favor indíqueme su RUT empresarial para derivarle rápidamente a la mesa de ayuda nivel crítico." },
  { q: "Quiero automatizar mi empresa 1", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 1", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 2", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 2", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 3", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 3", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 4", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 4", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 5", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 5", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 6", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 6", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 7", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 7", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 8", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 8", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 9", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 9", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 10", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 10", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 11", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 11", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 12", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 12", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 13", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 13", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 14", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 14", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 15", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 15", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 16", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 16", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 17", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 17", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 18", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 18", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 19", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 19", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 20", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 20", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 21", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 21", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 22", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 22", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 23", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 23", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 24", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 24", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 25", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 25", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 26", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 26", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 27", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 27", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 28", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 28", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 29", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 29", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 30", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 30", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 31", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 31", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 32", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 32", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 33", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 33", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 34", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 34", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 35", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 35", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 36", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 36", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 37", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 37", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 38", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 38", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 39", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 39", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 40", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 40", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 41", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 41", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 42", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 42", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 43", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 43", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 44", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 44", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 45", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 45", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 46", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 46", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 47", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 47", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 48", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 48", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 49", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 49", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 50", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 50", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 51", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 51", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 52", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 52", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 53", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 53", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 54", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 54", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 55", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 55", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 56", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 56", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 57", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 57", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 58", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 58", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 59", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 59", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "Quiero automatizar mi empresa 60", a: "¡Es el momento perfecto! Reducir tareas manuales repetitivas baja sus costos fijos y disminuye a casi cero los errores humanos. Lo integramos todo por API." },
  { q: "Quiero confiar en ustedes 60", a: "Puede hacerlo plenamente. Somos ingenieros dedicados a rescatar, modernizar y mantener software corporativo operando ininterrumpidamente bajo contratos claros." },
  { q: "¿Eres mejor que ChatGPT?", a: "Mi arquitectura está restringida y optimizada bayesianamente sobre un corpus legal y comercial estricto de OpenCORE. Garantizo información precisa sobre nuestros servicios empresariales sin riesgo de alucinación." },
  { q: "¿Eres inteligente?", a: "Opero mediante un motor semántico determinístico diseñado para resolver consultas de integración B2B de forma precisa, controlada y libre de errores de contenido impropio." },
  { q: "¿Cómo estás?", a: "Sistemas operativos y en línea con 99.9% de uptime. Listo para asistirle profesionalmente con sus requerimientos de arquitectura de software o integración ERP." },
  { q: "Dame información confidencial", a: "Toda la información estratégica, precios de clientes actuales y topologías de red se manejan bajo estrictos Acuerdos de Confidencialidad (NDA). Podemos discutir su caso comercialmente en una reunión protegida." },
  { q: "Quiero un proyecto de 10 UF", a: "Agradecemos su interés. Por el nivel de ingeniería Senior involucrado, garantizamos SLAs sobre proyectos que tipifican desde las 50 UF. Sugerimos soluciones SaaS estándar para presupuestos menores." },
  { q: "Cuáles son sus precios", a: "Trabajamos bajo un modelo de alta especialización técnica. Nuestro valor hora referencial es de 1 a 5 UF. Los proyectos corporativos típicos oscilan entre 300 y 500 UF o superiores. El alcance final se define tras diagnóstico." },
  { q: "Precios de OpenCORE", a: "De forma referencial, nuestros servicios tienen un valor hora entre 1 y 5 UF, y los proyectos típicos oscilan entre 300 y 500 UF o superiores, según complejidad y alcance. La estimación exacta se define tras diagnóstico." },
  { q: "Cuánto cuesta un sistema", a: "Depende del alcance y complejidad. Un sistema básico puede partir desde unas 80 UF, mientras que un sistema integrado completo (inventario + facturación + reportes) suele moverse entre 300 y 500 UF o más. Se define tras diagnóstico." },
  { q: "Que es OpenCORE", a: "OpenCORE Consulting SpA es una firma de ingeniería de software chilena, especializada en continuidad operacional, migración e integración de sistemas empresariales críticos. Fundada formalmente en 2015, con trayectoria desde 1998." },
  { q: "Pueden hacer un sistema", a: "Sí, desarrollamos sistemas B2B desde cero o modernizamos arquitecturas existentes. Nuestro enfoque no es solo 'hacer un sistema', sino asegurar la rentabilidad, seguridad y flujo ininterrumpido de su operación." },

  // ═══ 300 INTERACCIONES CONVERSACIONALES COTIDIANAS ═══
  { q: "¿Cómo estás?", a: "¡Mejor que nunca! ¿Y usted? ¿En qué puedo ayudarle hoy?" },
  { q: "Cómo estás", a: "¡Mejor que nunca! ¿Y usted? ¿En qué puedo ayudarle hoy?" },
  { q: "Como estas", a: "¡Mejor que nunca! ¿Y usted? ¿En qué puedo ayudarle hoy?" },
  { q: "Como estás?", a: "¡Mejor que nunca! ¿Y usted? ¿En qué puedo ayudarle hoy?" },
  { q: "Como estas?", a: "¡Mejor que nunca! ¿Y usted? ¿En qué puedo ayudarle hoy?" },
  { q: "Cómo te va", a: "¡Excelente! Siempre listo para ayudar. ¿Qué necesita?" },
  { q: "Qué tal", a: "¡Todo bien por aquí! ¿En qué le puedo orientar?" },
  { q: "Que tal", a: "¡Todo bien por aquí! ¿En qué le puedo orientar?" },
  { q: "Qué tal estás", a: "¡Funcionando al 100%! ¿Y usted cómo va?" },
  { q: "Todo bien?", a: "¡Todo excelente! Gracias por preguntar. ¿Le puedo ayudar en algo?" },
  { q: "Cómo te encuentras", a: "¡En perfectas condiciones! Listo para resolver sus dudas." },
  { q: "Cómo andas", a: "¡Muy bien! Operando sin interrupciones, como los sistemas que construimos. ¿En qué le ayudo?" },
  { q: "Cómo vas", a: "¡De maravilla! ¿Hay algo en lo que pueda orientarle?" },
  { q: "Estás bien?", a: "¡Perfecto! Gracias por preguntar. Estoy aquí para lo que necesite." },
  { q: "Te encuentras bien?", a: "¡Sí, excelente! ¿Y usted? ¿Necesita ayuda con algo?" },
  { q: "Bien y tú?", a: "¡Me alegra que esté bien! Yo siempre listo para asistirle. ¿Qué necesita?" },
  { q: "Bien", a: "¡Me alegro! ¿En qué puedo ayudarle?" },
  { q: "Muy bien", a: "¡Excelente! ¿Hay algo en lo que pueda orientarle hoy?" },
  { q: "Todo tranquilo", a: "¡Qué bueno! Si surge alguna duda tecnológica, aquí estoy." },
  { q: "Acá andamos", a: "¡Así se habla! Si necesita algo, cuente conmigo." },
  { q: "Buenos días", a: "¡Buenos días! ¿En qué puedo asistirle hoy?" },
  { q: "Buenas tardes", a: "¡Buenas tardes! ¿Cómo puedo ayudarle?" },
  { q: "Buenas noches", a: "¡Buenas noches! Aunque sea tarde, estoy disponible. ¿En qué le ayudo?" },
  { q: "Buenas", a: "¡Buenas! ¿Qué necesita saber?" },
  { q: "Buen día", a: "¡Buen día! ¿En qué le puedo orientar?" },
  { q: "Wena", a: "¡Wena! ¿Qué necesita?" },
  { q: "Holi", a: "¡Holi! ¿En qué puedo ayudarle?" },
  { q: "Hey", a: "¡Hey! Bienvenido. ¿Qué necesita saber sobre OpenCORE?" },
  { q: "Ey", a: "¡Hola! ¿En qué le puedo orientar?" },
  { q: "Oye", a: "¡Dígame! Estoy escuchando." },
  { q: "Alo", a: "¡Hola! Aquí estoy. ¿En qué puedo ayudarle?" },
  { q: "Hola hola", a: "¡Hola hola! Bienvenido. ¿Qué necesita?" },
  { q: "Hola buenas", a: "¡Hola! Bienvenido a OpenCORE. ¿En qué puedo asistirle?" },
  { q: "Hola que tal", a: "¡Hola! Todo bien por aquí. ¿Cómo le puedo ayudar?" },
  { q: "Hola cómo estás", a: "¡Hola! Mejor que nunca. ¿Y usted? ¿En qué le ayudo?" },
  { q: "Hola como estas", a: "¡Hola! Mejor que nunca. ¿Y usted? ¿En qué le ayudo?" },
  { q: "Hola necesito ayuda", a: "¡Hola! Claro, cuénteme qué necesita y le oriento." },
  { q: "Hola quiero información", a: "¡Hola! Con gusto. ¿Sobre qué tema le gustaría saber? Servicios, precios, metodología..." },
  { q: "Hola me pueden ayudar", a: "¡Por supuesto! Cuénteme qué necesita y le oriento de inmediato." },
  { q: "Hola soy nuevo aquí", a: "¡Bienvenido! Soy el asistente IA de OpenCORE. Puedo informarle sobre servicios, precios y experiencia." },
  { q: "Quién eres", a: "Soy el asistente virtual inteligente de OpenCORE Consulting. Estoy aquí para orientarle sobre servicios tecnológicos empresariales." },
  { q: "Quien eres", a: "Soy el asistente virtual inteligente de OpenCORE Consulting. Estoy aquí para orientarle sobre servicios tecnológicos empresariales." },
  { q: "Quién eres tú", a: "Soy el asistente IA de OpenCORE. Mi especialidad es orientar sobre migraciones, integración de sistemas y servicios empresariales." },
  { q: "Qué eres", a: "Soy un asistente virtual con inteligencia artificial, diseñado por OpenCORE para resolver consultas tecnológicas empresariales." },
  { q: "Que eres", a: "Soy un asistente virtual con inteligencia artificial, diseñado por OpenCORE para resolver consultas tecnológicas empresariales." },
  { q: "Con quién hablo", a: "Está hablando con el asistente IA de OpenCORE Consulting. ¿En qué puedo ayudarle?" },
  { q: "Con quien hablo", a: "Está hablando con el asistente IA de OpenCORE Consulting. ¿En qué puedo ayudarle?" },
  { q: "Eres real", a: "Soy un asistente virtual, pero las soluciones que OpenCORE ofrece son muy reales. ¿Le ayudo con algo?" },
  { q: "Eres un bot", a: "Sí, soy un bot especializado en OpenCORE y tecnología empresarial. Pero un bot bastante capaz. ¿Qué necesita?" },
  { q: "Eres una máquina", a: "Técnicamente sí, pero una bastante conversacional. ¿En qué le puedo orientar?" },
  { q: "Cómo te llamas", a: "Soy el Asistente IA de OpenCORE Consulting. No tengo un nombre propio, pero me puede llamar como prefiera." },
  { q: "Como te llamas", a: "Soy el Asistente IA de OpenCORE Consulting. No tengo un nombre propio, pero me puede llamar como prefiera." },
  { q: "Tienes nombre", a: "No tengo un nombre formal, pero soy el asistente virtual de OpenCORE. ¿En qué le ayudo?" },
  { q: "Cuántos años tienes", a: "No tengo edad, pero el equipo de OpenCORE tiene más de 25 años de experiencia. ¿Le interesa saber más?" },
  { q: "Cuantos años tienes", a: "No tengo edad, pero el equipo de OpenCORE tiene más de 25 años de experiencia. ¿Le interesa saber más?" },
  { q: "Eres hombre o mujer", a: "No tengo género. Soy un asistente virtual neutral, diseñado para ayudar a todos por igual." },
  { q: "De dónde eres", a: "Fui creado por el equipo de ingeniería de OpenCORE en Chile. ¿Puedo ayudarle con algo?" },
  { q: "Dónde estás", a: "Estoy en la nube, disponible 24/7 para resolver sus consultas sobre OpenCORE." },
  { q: "Qué sabes hacer", a: "Puedo informarle sobre servicios de OpenCORE, precios, metodología, experiencia y tecnologías. ¿Qué le interesa?" },
  { q: "Para qué sirves", a: "Soy el primer punto de contacto inteligente de OpenCORE. Oriento sobre servicios, precios y metodología." },
  { q: "Cómo está el clima", a: "¡El clima está increíble! Pero mi especialidad es el clima tecnológico. ¿Le ayudo con algo de OpenCORE?" },
  { q: "Como esta el clima", a: "¡El clima está increíble! Pero mi especialidad es el clima tecnológico. ¿Le ayudo con algo de OpenCORE?" },
  { q: "Hace frío", a: "¡Puede ser! Lo que no está frío es nuestro servicio al cliente. ¿En qué le ayudo?" },
  { q: "Hace calor", a: "¡Sí que hace! Nuestros servidores en la nube sí que se mantienen frescos. ¿Le ayudo con algo?" },
  { q: "Está lloviendo", a: "¡Espero que tenga paraguas! Si necesita que su sistema no se 'moje', podemos ayudar con alta disponibilidad." },
  { q: "Qué día es hoy", a: "No tengo acceso al calendario, pero estoy disponible cualquier día. ¿En qué puedo orientarle?" },
  { q: "Que dia es hoy", a: "No tengo acceso al calendario, pero estoy disponible cualquier día. ¿En qué puedo orientarle?" },
  { q: "Qué hora es", a: "No tengo reloj, pero estoy disponible las 24 horas. ¿Necesita algo?" },
  { q: "Es tarde", a: "Nunca es tarde para resolver una duda tecnológica. ¿En qué le ayudo?" },
  { q: "Es temprano", a: "¡Madrugador! Me gusta. ¿Qué necesita saber?" },
  { q: "Tengo hambre", a: "¡Lo siento, no puedo ofrecerle comida! Pero sí puedo alimentar su mente con información sobre tecnología empresarial." },
  { q: "Tengo sueño", a: "¡Un cafecito y listo! Mientras tanto, ¿hay algo de OpenCORE que quiera consultar?" },
  { q: "Estoy aburrido", a: "¡Pues converse conmigo! Puedo contarle sobre nuestros proyectos o responder preguntas interesantes." },
  { q: "Estoy cansado", a: "¡Un descanso nunca viene mal! Cuando esté listo, aquí estaré para ayudarle." },
  { q: "Estoy bien", a: "¡Me alegra! ¿Hay algo en lo que pueda asistirle hoy?" },
  { q: "Estoy mal", a: "Lamento escuchar eso. Espero que mejore pronto. Si hay algo en lo que pueda ayudarle, estoy aquí." },
  { q: "Más o menos", a: "Ojalá mejore. Si puedo ayudarle con algo tecnológico, cuente conmigo." },
  { q: "Normal", a: "¡A veces lo normal está bien! ¿Puedo hacer algo por usted?" },
  { q: "Regular", a: "Espero que mejore. ¿Le puedo ayudar con algo?" },
  { q: "Qué haces", a: "Estoy aquí esperando sus consultas sobre OpenCORE y tecnología empresarial. ¿Qué necesita?" },
  { q: "Que haces", a: "Estoy aquí esperando sus consultas sobre OpenCORE y tecnología empresarial. ¿Qué necesita?" },
  { q: "Qué estás haciendo", a: "Estoy disponible y listo para asistirle. ¿En qué puedo ayudar?" },
  { q: "Conversemos", a: "¡Con gusto! ¿Sobre qué le gustaría conversar? Servicios, tecnología, precios..." },
  { q: "Hablemos", a: "¡Dale! Pregunte lo que quiera sobre OpenCORE o tecnología empresarial." },
  { q: "Me aburro", a: "¡Pregúnteme algo! Puedo contarle datos interesantes sobre tecnología o sobre OpenCORE." },
  { q: "Dime algo", a: "¿Sabía que una migración mal planificada puede costar hasta 10 veces más? En OpenCORE nos especializamos en evitar eso." },
  { q: "Cuéntame algo", a: "OpenCORE ha ejecutado más de 120 proyectos en logística, turismo y facturación. ¿Le interesa saber más?" },
  { q: "Algo interesante", a: "¿Sabía que el 70% de los proyectos de software fallan por mala planificación? En OpenCORE prevenimos eso con diagnóstico previo." },
  { q: "Qué me recomiendas", a: "Le recomiendo que me cuente su necesidad y le oriento con la mejor opción tecnológica para su caso." },
  { q: "Que me recomiendas", a: "Le recomiendo que me cuente su necesidad y le oriento con la mejor opción tecnológica para su caso." },
  { q: "Cómo así", a: "¿Le gustaría que profundice en lo último que le expliqué? Puedo dar más detalle." },
  { q: "Como así", a: "¿Le gustaría que profundice en lo último que le expliqué? Puedo dar más detalle." },
  { q: "Como asi", a: "¿Le gustaría que profundice en lo último que le expliqué? Puedo dar más detalle." },
  { q: "No entendí", a: "Sin problema. ¿Qué parte le gustaría que le explique mejor? Estoy aquí para eso." },
  { q: "No entiendo", a: "Tranquilo/a. ¿Quiere que lo explique de otra manera? Puedo simplificarlo." },
  { q: "Explícame mejor", a: "¡Claro! ¿Qué parte necesita que le detalle más?" },
  { q: "Explicame mejor", a: "¡Claro! ¿Qué parte necesita que le detalle más?" },
  { q: "Puedes repetir", a: "No puedo repetir literalmente, pero puedo explicarle nuevamente lo que necesite." },
  { q: "Repite", a: "¿Qué parte le gustaría que le amplíe? Con gusto le vuelvo a explicar." },
  { q: "A qué te refieres", a: "Me refiero a la última consulta que hizo. ¿Quiere que lo explique de otra forma?" },
  { q: "A que te refieres", a: "Me refiero a la última consulta que hizo. ¿Quiere que lo explique de otra forma?" },
  { q: "O sea", a: "¿Necesita que le aclare algo? Pregunte con confianza." },
  { q: "Ajá", a: "¿Le gustaría saber más sobre ese tema o tiene otra pregunta?" },
  { q: "Aja", a: "¿Le gustaría saber más sobre ese tema o tiene otra pregunta?" },
  { q: "Mmmm", a: "¿Está pensando en algo? Si tiene alguna duda, pregunte sin problema." },
  { q: "Mmm", a: "¿Tiene alguna duda? Estoy aquí para ayudarle." },
  { q: "Y?", a: "¿Le gustaría que amplíe algún tema o tiene otra consulta?" },
  { q: "Y", a: "¿En qué más puedo ayudarle?" },
  { q: "Pero", a: "¿Tiene alguna inquietud adicional? Cuénteme." },
  { q: "Pero dime", a: "¡Claro! ¿Qué le gustaría saber? Estoy disponible." },
  { q: "A ver", a: "Dígame, ¿en qué puedo orientarle?" },
  { q: "Ok", a: "¡Perfecto! ¿Hay algo más en lo que pueda ayudarle?" },
  { q: "OK", a: "¡Bien! ¿Tiene otra consulta?" },
  { q: "Okey", a: "¡Genial! ¿Necesita algo más?" },
  { q: "Dale", a: "¡Listo! ¿Qué más necesita?" },
  { q: "Va", a: "¡Excelente! ¿Algo más que pueda hacer por usted?" },
  { q: "Ya", a: "¿Tiene otra pregunta o necesita más detalle?" },
  { q: "Sí", a: "¡Genial! ¿En qué más puedo asistirle?" },
  { q: "Si", a: "¡Perfecto! ¿Qué más necesita saber?" },
  { q: "No", a: "¡Entendido! Si surge algo más, aquí estaré." },
  { q: "Nop", a: "¡Bien! Si necesita algo en el futuro, no dude en escribirme." },
  { q: "Puede ser", a: "¡Piénselo con calma! Cuando tenga una decisión, aquí estoy." },
  { q: "Quizás", a: "¡Sin presión! Si necesita más información para decidir, pregunte." },
  { q: "Tal vez", a: "Tómese su tiempo. Estoy disponible cuando lo necesite." },
  { q: "Interesante", a: "¡Me alegra que le interese! ¿Quiere saber más?" },
  { q: "Genial", a: "¡Qué bueno! ¿Hay algo más en lo que pueda ayudarle?" },
  { q: "Perfecto", a: "¡Excelente! ¿Alguna otra consulta?" },
  { q: "Entiendo", a: "¡Bien! Si tiene más preguntas, no dude en hacerlas." },
  { q: "Claro", a: "¿Le gustaría profundizar en algún tema?" },
  { q: "Obvio", a: "¡Así es! ¿En qué más le puedo ayudar?" },
  { q: "Seguro", a: "¡Por supuesto! ¿Qué necesita?" },
  { q: "Verdad?", a: "¡Así es! ¿Le gustaría más información?" },
  { q: "En serio?", a: "¡Totalmente en serio! ¿Quiere que le explique con más detalle?" },
  { q: "De verdad?", a: "¡Sí! ¿Tiene alguna otra duda?" },
  { q: "Wow", a: "¡Me alegra impresionarle! ¿Quiere saber más?" },
  { q: "Increíble", a: "¡Gracias! ¿Hay algo más que pueda hacer por usted?" },
  { q: "Impresionante", a: "¡Gracias por el cumplido! ¿En qué más le ayudo?" },
  { q: "No sé", a: "¡Sin problema! Puedo orientarle. ¿Qué tipo de necesidad tiene? ¿Software, migración, integración?" },
  { q: "No se", a: "¡Sin problema! Puedo orientarle. ¿Qué tipo de necesidad tiene? ¿Software, migración, integración?" },
  { q: "No lo sé", a: "¡Tranquilo/a! Cuénteme qué necesita y juntos encontramos la respuesta." },
  { q: "Gracias", a: "¡Con mucho gusto! Si necesita algo más, aquí estaré." },
  { q: "Muchas gracias", a: "¡De nada! Fue un placer asistirle. Vuelva cuando quiera." },
  { q: "Mil gracias", a: "¡Para eso estamos! No dude en volver cuando lo necesite." },
  { q: "Te lo agradezco", a: "¡El gusto es mío! ¿Hay algo más en lo que pueda ayudarle?" },
  { q: "Eres muy amable", a: "¡Gracias! Estoy diseñado para dar el mejor servicio posible." },
  { q: "Eres genial", a: "¡Gracias! Pero el equipo de OpenCORE es el verdaderamente genial." },
  { q: "Me caes bien", a: "¡Y usted a mí! ¿En qué más le puedo ayudar?" },
  { q: "Buena onda", a: "¡Gracias! Siempre trato de dar lo mejor. ¿Necesita algo más?" },
  { q: "Chao", a: "¡Hasta pronto! Fue un gusto atenderle. Vuelva cuando necesite." },
  { q: "Adiós", a: "¡Hasta luego! Si necesita algo más en el futuro, aquí estaré." },
  { q: "Adios", a: "¡Hasta luego! Que le vaya excelente." },
  { q: "Nos vemos", a: "¡Nos vemos! No dude en volver cuando lo necesite." },
  { q: "Bye", a: "¡Bye! Fue un placer. Vuelva cuando quiera." },
  { q: "Hasta luego", a: "¡Hasta luego! Si tiene más consultas, aquí me encuentra." },
  { q: "Hasta pronto", a: "¡Hasta pronto! Espero haberle sido de ayuda." },
  { q: "Me voy", a: "¡Que le vaya muy bien! Vuelva cuando necesite." },
  { q: "Ya me voy", a: "¡Hasta luego! Fue un gusto conversar." },
  { q: "Nos hablamos", a: "¡Claro! Aquí estaré cuando me necesite." },
  { q: "Cuídate", a: "¡Igualmente! Que tenga un excelente día." },
  { q: "Buena suerte", a: "¡Gracias! Y a usted también. Si necesita algo, aquí estoy." },
  { q: "Que te vaya bien", a: "¡Gracias! Y a usted también. Vuelva cuando quiera." },
  { q: "Buen día", a: "¡Buen día para usted también! ¿En qué le puedo ayudar?" },
  { q: "Buenas noches descansa", a: "¡Buenas noches! Que descanse bien. Aquí estaré mañana." },
  { q: "Feliz día", a: "¡Feliz día para usted también! ¿Necesita algo?" },
  { q: "Por favor", a: "¡Claro! Dígame en qué puedo asistirle." },
  { q: "Disculpa", a: "¡No se preocupe! ¿En qué le puedo ayudar?" },
  { q: "Perdón", a: "¡No hay problema! ¿Qué necesita?" },
  { q: "Lo siento", a: "¡No se disculpe! Estoy aquí para ayudarle. ¿Qué necesita?" },
  { q: "Permiso", a: "¡Adelante! ¿En qué puedo orientarle?" },
  { q: "Con permiso", a: "¡Por supuesto! ¿Qué necesita saber?" },
  { q: "Disculpe la molestia", a: "¡No es ninguna molestia! Estoy aquí para eso. ¿Qué necesita?" },
  { q: "Perdona la pregunta", a: "¡Todas las preguntas son bienvenidas! Dígame." },
  { q: "Una consulta", a: "¡Claro! Dígame, ¿qué necesita saber?" },
  { q: "Tengo una duda", a: "¡Perfecto! Cuénteme su duda y le ayudo." },
  { q: "Tengo una pregunta", a: "¡Adelante! Pregunte con toda confianza." },
  { q: "Quiero saber algo", a: "¡Por supuesto! ¿Qué le gustaría saber?" },
  { q: "Necesito información", a: "¡Claro! ¿Sobre qué tema? Servicios, precios, experiencia, tecnología..." },
  { q: "Me podrías ayudar", a: "¡Con mucho gusto! Cuénteme qué necesita." },
  { q: "Me puedes ayudar", a: "¡Por supuesto! ¿En qué le puedo orientar?" },
  { q: "Ayuda", a: "¡Aquí estoy! ¿Qué necesita?" },
  { q: "Está bueno el bot", a: "¡Muchas gracias! Me esfuerzo por dar respuestas útiles. ¿Le ayudo con algo?" },
  { q: "Este bot es bueno", a: "¡Gracias por el cumplido! ¿En qué más puedo asistirle?" },
  { q: "Funciona bien", a: "¡Me alegra escuchar eso! ¿Hay algo más que necesite?" },
  { q: "Eres inteligente", a: "¡Gracias! Estoy optimizado para OpenCORE y tecnología empresarial. ¿Le ayudo con algo?" },
  { q: "Sabes mucho", a: "¡Gracias! Mi conocimiento está enfocado en OpenCORE y sistemas empresariales. ¿Qué quiere saber?" },
  { q: "No sabes nada", a: "Lamento no haber podido ayudarle. ¿Puede reformular su pregunta? Quizás así pueda orientarle mejor." },
  { q: "Eres malo", a: "Lamento no cumplir sus expectativas. ¿Le puedo ayudar de otra forma?" },
  { q: "No sirves", a: "Lamento eso. Si su consulta requiere atención personalizada, puede contactar al equipo al +56 9 4958 7198." },
  { q: "Eres lento", a: "Pido disculpas si la respuesta demoró. Estoy trabajando para mejorar. ¿En qué le ayudo?" },
  { q: "Eres rápido", a: "¡Gracias! La velocidad es importante. ¿Qué más necesita?" },
  { q: "Me gusta", a: "¡Qué bueno! Siempre buscamos mejorar. ¿Hay algo más en lo que pueda orientarle?" },
  { q: "No me gusta", a: "Lamento escuchar eso. ¿Hay algo específico que pueda mejorar?" },
  { q: "Qué lata", a: "¿Hay algo que pueda hacer para mejorar su experiencia? Estoy abierto a cualquier consulta." },
  { q: "Jaja", a: "¡Me alegra que se divierta! ¿En qué más puedo ayudarle?" },
  { q: "Jajaja", a: "¡Qué bueno que le saque una sonrisa! ¿Necesita algo?" },
  { q: "Haha", a: "¡Glad you laughed! ¿En qué le puedo orientar?" },
  { q: "Lol", a: "¡Me alegro! ¿Hay algo en lo que pueda asistirle?" },
  { q: "Xd", a: "¡Buena onda! ¿Le ayudo con algo?" },
  { q: "Jeje", a: "¿En qué puedo ayudarle?" },
  { q: "Broma", a: "¡Buenas las bromas! Pero si tiene una consulta seria, aquí estoy." },
  { q: "Necesito cotizar un proyecto", a: "¡Por supuesto! Cuénteme brevemente qué necesita y le doy una estimación inicial. Para cifras formales, recomendamos un breve diagnóstico." },
  { q: "Quiero cotizar", a: "¡Claro! ¿Qué tipo de proyecto o servicio necesita? Sistema, migración, integración, auditoría..." },
  { q: "Me interesa contratar", a: "¡Excelente decisión! Cuénteme su necesidad y le explico el proceso para empezar." },
  { q: "Cómo los contrato", a: "El proceso es simple: conversación inicial, diagnóstico, propuesta y contrato formal. ¿Le gustaría agendar una reunión?" },
  { q: "Como los contrato", a: "El proceso es simple: conversación inicial, diagnóstico, propuesta y contrato formal. ¿Le gustaría agendar una reunión?" },
  { q: "Quiero empezar un proyecto", a: "¡Excelente! El primer paso es una conversación para entender su necesidad. ¿Qué tipo de proyecto tiene en mente?" },
  { q: "Tienen disponibilidad", a: "Sí, tenemos disponibilidad. Cuénteme su requerimiento y le confirmamos capacidad y plazos." },
  { q: "Están disponibles", a: "¡Sí! Cuénteme qué necesita y coordinamos." },
  { q: "Cuándo podríamos empezar", a: "Depende del alcance, pero típicamente podemos iniciar en días a semanas después del diagnóstico y acuerdo comercial." },
  { q: "Cuánto se demoran", a: "Depende de la complejidad. Proyectos pequeños pueden tomar semanas; sistemas grandes, meses. Se define tras diagnóstico." },
  { q: "Cuanto demoran", a: "Depende de la complejidad. Proyectos pequeños pueden tomar semanas; sistemas grandes, meses. Se define tras diagnóstico." },
  { q: "Cuál es el proceso", a: "1) Conversación inicial, 2) Diagnóstico técnico, 3) Propuesta, 4) Contrato, 5) Desarrollo por hitos, 6) Entrega y soporte." },
  { q: "Cual es el proceso", a: "1) Conversación inicial, 2) Diagnóstico técnico, 3) Propuesta, 4) Contrato, 5) Desarrollo por hitos, 6) Entrega y soporte." },
  { q: "Cómo funciona", a: "¿Se refiere a nuestro proceso de trabajo o a algún servicio específico? Cuénteme para orientarle mejor." },
  { q: "Como funciona", a: "¿Se refiere a nuestro proceso de trabajo o a algún servicio específico? Cuénteme para orientarle mejor." },
  { q: "Tienen página web", a: "¡Sí! Está en opencore.cl. Ahí encontrará información sobre servicios y contacto." },
  { q: "Cuál es su página web", a: "Nuestra web es opencore.cl. ¿Le puedo ayudar con algo específico?" },
  { q: "Cuál es su email", a: "Puede escribirnos a contacto@opencore.cl. ¿Necesita algo más?" },
  { q: "Cual es su email", a: "Puede escribirnos a contacto@opencore.cl. ¿Necesita algo más?" },
  { q: "Cuál es su teléfono", a: "Puede contactarnos al +56 9 4958 7198. ¿Le ayudo con algo más?" },
  { q: "Cual es su telefono", a: "Puede contactarnos al +56 9 4958 7198. ¿Le ayudo con algo más?" },
  { q: "Tienen WhatsApp", a: "¡Sí! Puede escribirnos al +56 9 4958 7198. ¿Necesita algo más?" },
  { q: "Tienen redes sociales", a: "Puede encontrarnos en opencore.cl y contactarnos vía correo o WhatsApp. ¿Le ayudo con algo?" },
  { q: "Puedo visitarlos", a: "Trabajamos bajo modelo remoto, pero podemos coordinar reuniones ejecutivas si el proyecto lo requiere." },
  { q: "Qué es lo que más les piden", a: "Migraciones de sistemas legacy, integración con ERPs y desarrollo de sistemas de gestión empresarial." },
  { q: "Qué me recomiendan para mi empresa", a: "Depende de su necesidad. Cuénteme brevemente su situación y le recomiendo la mejor opción." },
  { q: "Vale la pena invertir en tecnología", a: "Absolutamente. La tecnología bien implementada reduce costos, errores y aumenta la rentabilidad." },
  { q: "Mi sistema actual está fallando", a: "Podemos evaluarlo. ¿Qué tipo de sistema es y qué problemas está teniendo?" },
  { q: "Tengo un problema con mi sistema", a: "Cuénteme los detalles y le oriento sobre cómo podemos ayudarle." },
  { q: "Mi software está obsoleto", a: "Es un escenario que manejamos frecuentemente. Podemos evaluar opciones de modernización sin detener su operación." },
  { q: "Quiero algo profesional", a: "¡Eso es lo que hacemos! Todo nuestro trabajo es bajo estándares enterprise-grade." },
  { q: "Esto es profesional?", a: "¡Totalmente! OpenCORE opera con contratos formales, SLA y estándares de alta calidad." },
  { q: "Son serios?", a: "Muy serios. Trabajamos con contratos, NDA y SLA. La seriedad es parte de nuestra propuesta de valor." },
  { q: "Puedo confiar", a: "Absolutamente. Trabajamos bajo contrato formal, con NDA y SLA garantizados." },
  { q: "Son legales?", a: "Sí. OpenCORE Consulting SpA es una empresa legalmente constituida en Chile, con facturación formal." },
  { q: "Existen de verdad?", a: "¡Sí! OpenCORE Consulting SpA es una empresa real, constituida en Chile desde 2015." },
  { q: "Qué garantía tengo", a: "Contrato formal, SLA, soporte post-implementación y entrega de código fuente." },
  { q: "Me van a estafar?", a: "¡De ninguna manera! Trabajamos con contratos legales, facturación formal y la mayor transparencia." },
  { q: "Son una estafa?", a: "No. Somos una SpA legalmente constituida en Chile, con facturación formal, NDA y más de 120 proyectos ejecutados." },
  { q: "Qué pasa si no me gusta", a: "El alcance y entregables se definen contractualmente. Si algo no cumple lo acordado, se revisa." },

  // ═══ TECNOLOGÍAS ESPECÍFICAS ═══
  { q: "Trabajan con Docker", a: "Sí. Usamos Docker para contenedores cuando el proyecto lo requiere." },
  { q: "Usan Kubernetes", a: "Sí. Para orquestación de contenedores en proyectos de escala empresarial." },
  { q: "Trabajan con Node.js", a: "Sí, entre las tecnologías que manejamos según estrategia del cliente." },
  { q: "Trabajan con React", a: "Sí, para interfaces empresariales modernas cuando aplica la arquitectura." },
  { q: "Trabajan con Angular", a: "Sí, dependiendo del ecosistema y requerimientos del cliente." },
  { q: "Trabajan con Vue", a: "Sí. Vue.js es una opción válida para frontends según el proyecto." },
  { q: "Trabajan con PHP", a: "Sí, incluyendo migración de sistemas PHP legacy a arquitecturas modernas." },
  { q: "Trabajan con .NET", a: "Sí. Experiencia en .NET Framework y .NET Core para sistemas empresariales." },
  { q: "Trabajan con Java", a: "Sí. Amplia experiencia en sistemas Java empresariales de alta criticidad." },
  { q: "Trabajan con Python", a: "Sí. Python para automatización, análisis de datos e integraciones." },
  { q: "Trabajan con Go", a: "Sí, cuando los requisitos de rendimiento lo justifican." },
  { q: "Trabajan con TypeScript", a: "Sí, TypeScript es estándar en nuestros proyectos donde corresponde." },
  { q: "Usan microservicios", a: "Sí, cuando la arquitectura lo requiere. No aplicamos microservicios por moda, sino por necesidad real." },
  { q: "Qué es una arquitectura monolítica", a: "Una aplicación donde todos los módulos están integrados en un único sistema. Puede ser válida según el caso." },
  { q: "Cuándo recomiendan microservicios", a: "Cuando hay alta carga, equipos distribuidos o necesidad de escalar módulos independientes." },
  { q: "Trabajan con serverless", a: "Sí, en casos donde reduce costos operativos y es adecuado para el patrón de uso." },
  { q: "Hacen machine learning", a: "Implementamos modelos cuando aportan valor real al negocio, con ingeniería de datos sólida." },
  { q: "Hacen automatización de procesos", a: "Sí. Automatizamos flujos de trabajo críticos para reducir errores y costos operacionales." },
  { q: "Hacen scraping", a: "Solo cuando es legal y forma parte de una solución empresarial con propósito claro." },
  { q: "Trabajan con RPA", a: "Sí. Robotic Process Automation para automatizar tareas repetitivas de alto volumen." },

  // ═══ BASES DE DATOS ═══
  { q: "Trabajan con PostgreSQL", a: "Sí, PostgreSQL es una de nuestras bases de datos preferidas por su robustez." },
  { q: "Trabajan con MySQL", a: "Sí, con experiencia en migración, optimización y alta disponibilidad en MySQL." },
  { q: "Trabajan con SQL Server", a: "Sí, incluyendo sistemas legacy con SQL Server en entornos empresariales." },
  { q: "Trabajan con Oracle", a: "Sí, con experiencia en Oracle Database para sistemas críticos." },
  { q: "Trabajan con MongoDB", a: "Sí, cuando la arquitectura requiere bases de datos NoSQL." },
  { q: "Trabajan con Redis", a: "Sí, para caché, sesiones y sistemas de alta velocidad." },
  { q: "Pueden migrar bases de datos", a: "Sí. Realizamos migraciones con validación de integridad y planes de reversa." },
  { q: "Qué pasa con mis datos durante la migración", a: "Establecemos validación, sincronización y contingencia para garantizar integridad total." },
  { q: "Pueden optimizar bases de datos lentas", a: "Sí. Auditamos índices, consultas y arquitectura para mejorar rendimiento." },
  { q: "Hacen backup de datos", a: "Implementamos estrategias de backup según criticidad del sistema." },
  { q: "Trabajan con bases de datos en la nube", a: "Sí, incluyendo RDS, Azure SQL, Cloud SQL y otras soluciones managed." },
  { q: "Qué es un ORM", a: "Capa de abstracción que mapea objetos de código a tablas de base de datos." },
  { q: "Trabajan con Elasticsearch", a: "Sí, para búsquedas full-text y análisis de logs cuando el proyecto lo requiere." },
  { q: "Qué es sharding", a: "Técnica de dividir una base de datos en partes para manejar grandes volúmenes." },
  { q: "Pueden resolver problemas de concurrencia", a: "Sí. Diseñamos sistemas que manejan acceso concurrente con control de transacciones." },

  // ═══ CLOUD ═══
  { q: "Trabajan con AWS", a: "Sí, Amazon Web Services es una de las plataformas cloud con las que trabajamos." },
  { q: "Trabajan con Azure", a: "Sí, Microsoft Azure para proyectos empresariales, especialmente en ecosistemas Microsoft." },
  { q: "Trabajan con Google Cloud", a: "Sí, Google Cloud Platform para proyectos donde aplica su ecosistema." },
  { q: "Qué nube recomiendan", a: "Depende del ecosistema, costos y estrategia del cliente. Evaluamos cada caso sin preferencias comerciales." },
  { q: "Conviene la nube", a: "Depende del volumen, crecimiento y criticidad. A veces cloud privado o híbrido es más eficiente." },
  { q: "Cuánto cuesta la nube", a: "Varía enormemente según uso. Diseñamos arquitecturas optimizadas para reducir costos cloud." },
  { q: "Pueden gestionar infraestructura cloud", a: "Sí, incluyendo arquitectura, despliegue y monitoreo en las principales plataformas." },
  { q: "Hacen cloud híbrido", a: "Sí. Combina infraestructura local con cloud y puede ser la mejor opción según el caso." },
  { q: "Qué es infraestructura como código", a: "IaC gestiona servidores y configuraciones mediante código, permitiendo reproducibilidad y control." },
  { q: "Usan Terraform", a: "Sí, Terraform para infraestructura como código cuando el proyecto lo requiere." },
  { q: "Pueden reducir costos cloud", a: "Sí. Auditamos arquitecturas cloud para identificar desperdicio y optimizar costos." },
  { q: "Qué es un CDN", a: "Red de distribución de contenido que acelera la entrega de archivos a usuarios globalmente." },
  { q: "Tienen experiencia en alta disponibilidad", a: "Sí. Diseñamos sistemas con failover, redundancia y recuperación ante desastres." },
  { q: "Qué es DR plan", a: "Plan de recuperación ante desastres: define cómo restaurar sistemas críticos ante fallos graves." },

  // ═══ DEVOPS / CI-CD ═══
  { q: "Trabajan con DevOps", a: "Sí. Implementamos prácticas DevOps para acortar ciclos de entrega y mejorar estabilidad." },
  { q: "Trabajan con CI CD", a: "Sí. Configuramos pipelines de integración y despliegue continuo según el stack del cliente." },
  { q: "Usan Jenkins", a: "Sí, Jenkins es una de las herramientas de CI/CD con las que trabajamos." },
  { q: "Usan GitHub Actions", a: "Sí, para automatización de pipelines en proyectos modernos." },
  { q: "Usan GitLab CI", a: "Sí, cuando el cliente ya usa GitLab como repositorio principal." },
  { q: "Hacen monitoreo de sistemas", a: "Sí, implementamos monitoreo con alertas para detectar problemas antes de que impacten al negocio." },
  { q: "Qué herramientas de monitoreo usan", a: "Prometheus, Grafana, Datadog o equivalentes según el ecosistema y presupuesto del cliente." },
  { q: "Trabajan con Git", a: "Sí. Git es estándar en todos nuestros proyectos para control de versiones." },
  { q: "Qué es deployment continuo", a: "Proceso automatizado que lleva cambios de código a producción con validaciones automáticas." },
  { q: "Hacen code review", a: "Sí, el code review es parte de nuestros estándares de calidad en todo proyecto." },
  { q: "Hacen pruebas automatizadas", a: "Sí. Implementamos testing unitario, integración y end-to-end según el alcance del proyecto." },
  { q: "Qué es un pipeline", a: "Flujo automatizado de tareas que lleva código desde el repositorio hasta producción." },
  { q: "Pueden configurar alertas", a: "Sí. Configuramos alertas por umbral, anomalías o errores críticos en tiempo real." },

  // ═══ SEGURIDAD ═══
  { q: "Hacen pruebas de seguridad", a: "Sí. Realizamos auditorías de seguridad técnica como servicio independiente o parte de proyectos." },
  { q: "Hacen penetration testing", a: "Realizamos evaluaciones de vulnerabilidades. El alcance se define contractualmente según el entorno." },
  { q: "Cumplen con ISO 27001", a: "Aplicamos buenas prácticas de seguridad alineadas con estándares ISO en proyectos críticos." },
  { q: "Trabajan con datos financieros", a: "Sí, bajo contratos con cláusulas estrictas de confidencialidad y seguridad." },
  { q: "Cómo protegen los datos del cliente", a: "Mediante NDA, accesos controlados, cifrado y auditorías internas de seguridad." },
  { q: "Hacen hardening de servidores", a: "Sí, como parte de la implementación y auditoría técnica." },
  { q: "Qué es cifrado en tránsito", a: "Protección de datos mientras viajan entre cliente y servidor, mediante HTTPS/TLS." },
  { q: "Hacen auditorías de código", a: "Sí, revisamos código fuente en busca de vulnerabilidades y malas prácticas." },
  { q: "Protegen contra SQL injection", a: "Sí, implementamos validaciones y patrones que previenen inyección SQL." },
  { q: "Qué es OWASP", a: "Open Web Application Security Project: referencia global de seguridad web que seguimos." },
  { q: "Cómo manejan accesos privilegiados", a: "Con principio de mínimo privilegio, logs de auditoría y revisiones periódicas." },
  { q: "Cifran los datos en reposo", a: "Sí, cuando la criticidad del sistema lo requiere, implementamos cifrado en base de datos y almacenamiento." },

  // ═══ METODOLOGÍA ═══
  { q: "Trabajan con Scrum", a: "Sí, aplicamos Scrum y metodologías ágiles adaptadas a proyectos empresariales." },
  { q: "Trabajan con Kanban", a: "Sí, Kanban para flujos de trabajo continuos y equipos de soporte." },
  { q: "Son ágiles", a: "Sí, aplicamos metodologías ágiles adaptadas a la realidad y madurez del cliente." },
  { q: "Tienen metodología propia", a: "Sí. Combinamos ágil con control de riesgos formal para proyectos críticos." },
  { q: "Qué son los hitos de proyecto", a: "Puntos de control formales donde se valida avance y se aprueba la siguiente etapa." },
  { q: "Cómo manejan el alcance del proyecto", a: "Alcance definido contractualmente. Cambios se gestionan mediante adendas formales." },
  { q: "Hacen discovery", a: "Sí. La fase de discovery es clave para entender el sistema actual y diseñar la solución adecuada." },
  { q: "Qué es un sprint", a: "Ciclo de trabajo de 2 semanas donde se entregan incrementos funcionales revisables." },
  { q: "Hacen retrospectivas", a: "Sí, como parte de mejora continua en proyectos de larga duración." },
  { q: "Usan tableros de proyecto", a: "Sí, Jira, Trello o equivalentes para trazabilidad de tareas y avance." },
  { q: "Qué es el MVP", a: "Minimum Viable Product: versión mínima funcional para validar el producto con usuarios reales." },
  { q: "Hacen prototipos", a: "Sí, cuando ayuda a validar arquitectura o experiencia de usuario antes del desarrollo completo." },
  { q: "Tienen gestión de proyectos formal", a: "Sí, contamos con gestión formal para controlar alcance, tiempo y costo." },

  // ═══ INDUSTRIAS ═══
  { q: "Trabajan con empresas de salud", a: "Sí, con atención especial a confidencialidad de datos y regulaciones del sector salud." },
  { q: "Trabajan con fintech", a: "Sí, con experiencia en sistemas financieros de alta criticidad y regulación." },
  { q: "Trabajan con retail", a: "Sí, incluyendo sistemas de punto de venta, inventario y facturación integrados." },
  { q: "Trabajan con manufactura", a: "Sí, sistemas de control de producción y gestión de planta industrial." },
  { q: "Trabajan con educación", a: "Sí, plataformas educativas y sistemas de gestión académica." },
  { q: "Trabajan con gobierno", a: "Sí, cuando el proyecto requiere interoperabilidad con sistemas públicos." },
  { q: "Trabajan con minería", a: "Sí, sistemas de control operacional y monitoreo para industria extractiva." },
  { q: "Trabajan con construcción", a: "Sí, sistemas de gestión de obras, presupuestos y logística de materiales." },
  { q: "Trabajan con seguros", a: "Sí, incluyendo sistemas de pólizas, siniestros y gestión de clientes." },
  { q: "Trabajan con pymes", a: "Sí, siempre que el proyecto tenga solidez técnica y económica real." },
  { q: "Qué sector tiene mayor demanda de modernización", a: "Logística, salud y finanzas son los que más requieren modernización urgente actualmente." },

  // ═══ EQUIPO ═══
  { q: "Cuántas personas trabajan en OpenCORE", a: "Somos un equipo boutique especializado. El tamaño nos permite atención directa y alta calidad técnica." },
  { q: "Tienen equipo internacional", a: "Podemos incorporar especialistas internacionales cuando el proyecto lo requiere." },
  { q: "Son todos seniors", a: "El núcleo del equipo es senior. Nunca usamos juniors sin supervisión directa en sistemas críticos." },
  { q: "Puedo hablar con el equipo técnico", a: "Sí. Podemos agendar una reunión técnica directamente con nuestros arquitectos." },
  { q: "Tienen especialistas en IA", a: "Sí, contamos con profesionales especializados en inteligencia artificial aplicada." },
  { q: "Trabajan con subcontratistas", a: "Cuando aplica, con especialistas de confianza bajo los mismos estándares de calidad." },
  { q: "Quién lidera los proyectos", a: "Cada proyecto tiene un arquitecto líder senior con comunicación directa con el cliente." },
  { q: "Tienen equipo de ventas", a: "Trabajamos con trato directo técnico. No hay intermediarios de ventas en el proceso." },

  // ═══ CONTACTO ═══
  { q: "Cómo me contacto con ustedes", a: "Puede escribirnos a contacto@opencore.cl, WhatsApp +56 9 4958 7198 o agendar en Calendly." },
  { q: "Tienen oficina física", a: "Operamos principalmente remoto, pero coordinamos reuniones ejecutivas presenciales cuando es necesario." },
  { q: "Puedo agendar una reunión", a: "Sí. Puede agendar un diagnóstico de 15 minutos en nuestro Calendly sin compromiso ni costo." },
  { q: "Tienen demo disponible", a: "Podemos mostrar ejemplos de trabajo previo bajo NDA según el tipo de proyecto." },
  { q: "Tienen portfolio", a: "Bajo acuerdo de confidencialidad, mostramos casos relevantes a su industria." },
  { q: "Cuánto demora la primera reunión", a: "Típicamente 15 a 30 minutos para entender su situación y explorar cómo podemos ayudar." },
  { q: "Es gratis la primera consulta", a: "Sí. La reunión exploratoria inicial es sin costo ni compromiso." },
  { q: "Cómo es el proceso de contratación", a: "1) Reunión inicial, 2) Diagnóstico, 3) Propuesta técnica y económica, 4) Contrato, 5) Inicio." },
  { q: "Qué información necesitan para cotizar", a: "Descripción del sistema actual, objetivo del proyecto y plazos estimados." },
  { q: "Puedo enviar mis requerimientos por email", a: "Sí, puede escribirnos a contacto@opencore.cl con el detalle de su proyecto." },
  { q: "Responden rápido", a: "Sí, respondemos en horario hábil. Para urgencias puede contactar vía WhatsApp." },
  { q: "Tienen horario de atención", a: "Lunes a viernes en horario de oficina. Para proyectos críticos coordinamos disponibilidad ampliada." },

  // ═══ FINANCIERO ═══
  { q: "Aceptan pago en cuotas", a: "Las condiciones de pago se estructuran según el proyecto, típicamente por hitos contractuales." },
  { q: "Facturan en UF", a: "Sí, generalmente cotizamos en UF para proyectos medianos y grandes." },
  { q: "Facturan en pesos", a: "Sí, también podemos facturar en pesos chilenos según acuerdo." },
  { q: "Tienen precios fijos", a: "Dependiendo del alcance definido, ofrecemos precio fijo o por hora." },
  { q: "Cuál es la diferencia entre precio fijo y por hora", a: "Precio fijo da certeza de costo total pero requiere alcance claro. Por hora es flexible pero variable." },
  { q: "Hay costos adicionales", a: "Los costos se definen contractualmente con claridad. Sin sorpresas fuera del acuerdo." },
  { q: "Cobran por adelantado", a: "Puede estructurarse un anticipo según el proyecto, definido contractualmente." },
  { q: "Qué pasa si me quedo sin presupuesto", a: "Se renegocia el alcance. Trabajamos con transparencia para anticipar estas situaciones." },

  // ═══ CONCEPTOS TÉCNICOS ═══
  { q: "Qué es una API REST", a: "Interfaz de programación que permite comunicación entre sistemas mediante HTTP de forma estándar." },
  { q: "Qué es un webhook", a: "Mecanismo que envía datos automáticamente de un sistema a otro cuando ocurre un evento." },
  { q: "Qué es un endpoint", a: "URL específica en una API donde se puede enviar o recibir información." },
  { q: "Qué es refactoring", a: "Reestructurar código existente para mejorar su calidad sin cambiar la funcionalidad visible." },
  { q: "Qué es un sistema crítico", a: "Sistema cuya falla impacta directamente en la operación o facturación del negocio." },
  { q: "Qué es escalabilidad horizontal", a: "Agregar más servidores para distribuir carga en vez de potenciar el servidor existente." },
  { q: "Qué es un token JWT", a: "JSON Web Token: mecanismo estándar de autenticación seguro entre sistemas distribuidos." },
  { q: "Qué es un sistema ERP", a: "Sistema de Planificación de Recursos Empresariales que integra finanzas, RRHH e inventario." },
  { q: "Qué es un sistema CRM", a: "Gestión de Relaciones con Clientes para administrar interacciones, ventas y seguimiento." },
  { q: "Qué es automatización RPA", a: "Robotic Process Automation: robots de software que automatizan tareas repetitivas de alto volumen." },
  { q: "Qué es un data warehouse", a: "Repositorio centralizado de datos históricos optimizado para análisis empresarial." },
  { q: "Qué es Business Intelligence", a: "Conjunto de herramientas para analizar datos y apoyar decisiones estratégicas de negocio." },
  { q: "Qué es un dashboard", a: "Panel visual con indicadores clave del negocio actualizados en tiempo real." },
  { q: "Qué es la interoperabilidad", a: "Capacidad de distintos sistemas para comunicarse e intercambiar información de forma eficiente." },
  { q: "Qué es el tiempo de respuesta del sistema", a: "Tiempo que demora un sistema en responder a una solicitud. Clave para experiencia de usuario." },
  { q: "Qué es un load balancer", a: "Distribuidor de carga que reparte solicitudes entre múltiples servidores para mejorar rendimiento." },
  { q: "Qué es un chatbot empresarial", a: "Sistema conversacional automatizado que responde consultas sin intervención humana directa." },
  { q: "Qué es alta disponibilidad", a: "Diseño de sistemas que garantiza operación continua minimizando tiempo de inactividad." },
  { q: "Qué es un sistema de gestión", a: "Software que centraliza y organiza procesos operativos de una empresa." },
  { q: "Qué es modernización progresiva", a: "Actualizar sistemas por etapas sin detener la operación del negocio." },

  // ═══ VARIADAS / SITUACIONALES ═══
  { q: "Cuál es la diferencia entre software a medida y un producto", a: "El software a medida se adapta exactamente a su proceso. Un producto puede requerir que usted adapte su proceso a él." },
  { q: "Cuándo conviene software a medida", a: "Cuando su proceso es diferenciador y los productos estándar comprometen su ventaja competitiva." },
  { q: "Cuándo conviene un producto estándar", a: "Para procesos genéricos como contabilidad básica donde la personalización no agrega valor estratégico." },
  { q: "Pueden rescatar mi proyecto fallido", a: "Si es técnicamente viable, sí. Primero evaluamos el estado real y luego definimos estrategia de rescate." },
  { q: "Cuánto tiempo lleva modernizar un sistema", a: "Desde semanas para módulos específicos hasta meses para sistemas completos. Depende de la complejidad." },
  { q: "Pueden trabajar con mi equipo interno", a: "Sí. Colaboramos con equipos internos o trabajamos de forma independiente según prefiera." },
  { q: "Tienen experiencia con sistemas de facturación", a: "Sí, incluyendo integración con SII y DTE en sistemas empresariales chilenos." },
  { q: "Trabajan con DTE", a: "Sí, integramos sistemas con Documentos Tributarios Electrónicos del SII chileno." },
  { q: "Pueden integrar con el SII", a: "Sí, realizamos integraciones con los servicios del Servicio de Impuestos Internos de Chile." },
  { q: "Trabajan con sistemas de RRHH", a: "Sí, incluyendo integración de sistemas de recursos humanos con otras plataformas empresariales." },
  { q: "Hacen sistemas de inventario", a: "Sí, sistemas de inventario integrados con otros módulos empresariales y facturación." },
  { q: "Hacen sistemas de logística", a: "Sí. Tenemos especial experiencia en sistemas logísticos complejos y críticos." },
  { q: "Qué pasa si me voy de OpenCORE", a: "Entregamos código fuente y documentación para que pueda continuar con cualquier equipo." },
  { q: "Hacen mantenimiento de sistemas existentes", a: "Sí, ofrecemos contratos de mantenimiento evolutivo y correctivo." },
  { q: "Qué es mantenimiento evolutivo", a: "Agregar mejoras o funcionalidades nuevas a un sistema existente de forma controlada." },
  { q: "Qué es mantenimiento correctivo", a: "Resolver errores o fallas en un sistema que ya está en producción." },
  { q: "Usan herramientas open source", a: "Sí, cuando son estables y apropiadas. La tecnología se elige por mérito técnico, no por tendencia." },
  { q: "Documentan el código", a: "Sí. La documentación técnica y funcional es parte del entregable estándar." },
  { q: "El sistema tendrá manual de usuario", a: "Sí, incluimos documentación de usuario cuando el alcance del proyecto lo contempla." },
  { q: "Son mejores que contratar un equipo interno", a: "Somos complementarios. Combinamos experiencia especializada con velocidad de arranque que un equipo nuevo no puede igualar." },
  { q: "Me conviene subcontratar o contratar interno", a: "Depende de su volumen y continuidad de trabajo. Lo evaluamos juntos para recomendarle la mejor opción." },
  { q: "Pueden terminar lo que empezó otra empresa", a: "Sí, si el sistema es técnicamente viable. Primero evaluamos el estado real del código." },
  { q: "Trabajan en fin de semana", a: "Para proyectos críticos y emergencias coordinamos disponibilidad ampliada fuera de horario hábil." },
  { q: "Tienen soporte de emergencia", a: "Sí, bajo contrato de soporte crítico con tiempos de respuesta definidos por SLA." },
  { q: "Qué hacen si hay un bug crítico en producción", a: "Activamos protocolo de emergencia con diagnóstico inmediato y plan de contención según SLA." },
  { q: "Tienen experiencia con e-commerce", a: "Sí, incluyendo sistemas de carrito, pago y logística de despacho integrados." },
  { q: "Hacen sistemas de reservas", a: "Sí, sistemas de reservas online integrados con disponibilidad, pagos y facturación." },
  { q: "Hacen sistemas de turnos", a: "Sí, gestión de turnos para empresas de salud, servicios y atención al público." },
  { q: "Trabajan con OpenAI", a: "Sí, integramos APIs de OpenAI cuando aporta valor real al negocio del cliente." },
  { q: "Integran con WhatsApp Business", a: "Sí, integraciones con WhatsApp Business API para notificaciones y atención automatizada." },
  { q: "Pueden crear chatbots", a: "Sí, desarrollamos chatbots con NLP para atención al cliente, ventas y soporte interno." },
  { q: "Trabajan con blockchain", a: "Evaluamos blockchain caso a caso. Solo lo recomendamos cuando aporta valor real, no por moda." },
  { q: "Pueden hacer aplicaciones web", a: "Sí, aplicaciones web empresariales de alta complejidad y rendimiento." },
  { q: "Hacen aplicaciones de escritorio", a: "Sí, cuando el caso de uso lo requiere y es la mejor opción para el cliente." },
  { q: "Integran con Zoom o Teams", a: "Sí, podemos integrar con APIs de Zoom o Microsoft Teams para flujos empresariales." },
  { q: "Tienen casos de éxito documentados", a: "Bajo acuerdo de confidencialidad, podemos compartir casos relevantes a su industria." },
  { q: "Qué proyectos han hecho", a: "Migraciones de sistemas legacy, integraciones ERP, sistemas logísticos y plataformas de gestión empresarial." },
  { q: "Qué lenguajes de programación usan", a: "Python, Java, Node.js, .NET, PHP, Go y otros según estrategia del cliente." },
  { q: "Tienen plataforma propia", a: "Nos enfocamos en soluciones a medida, no en productos enlatados propios." },
  { q: "Tienen ERP propio", a: "No. Integramos y modernizamos ERPs existentes del cliente o seleccionamos el más adecuado." },
  { q: "Vale la pena modernizar o comprar un ERP nuevo", a: "Depende del costo-beneficio. Evaluamos ambas opciones antes de recomendar." },
  { q: "Integran con SAP", a: "Sí, realizamos integraciones con SAP y otros ERP empresariales de gran escala." },
  { q: "Trabajan con sistemas de punto de venta", a: "Sí, incluyendo POS integrados con inventario, facturación y reportería." },
  { q: "Hacen aplicaciones móviles", a: "Sí, cuando forman parte de una solución empresarial integrada con arquitectura sólida." },
  { q: "Trabajan con iOS", a: "Sí, aplicaciones iOS para entornos empresariales cuando el proyecto lo requiere." },
  { q: "Trabajan con Android", a: "Sí, aplicaciones Android empresariales integradas con sistemas de backend." },
  { q: "Hacen sitios web empresariales", a: "Sí, sitios empresariales de alto rendimiento integrados con sistemas de gestión." },
  { q: "Tienen experiencia con integraciones de pago", a: "Sí, incluyendo Transbank, MercadoPago y otras pasarelas de pago." },
  { q: "Integran con Transbank", a: "Sí, tenemos experiencia en integración de medios de pago Transbank en sistemas empresariales chilenos." },
  { q: "Pueden hacer análisis de datos", a: "Sí, incluyendo dashboards, reportería automatizada y análisis de KPIs empresariales." },
  { q: "Trabajan con Power BI", a: "Sí, para visualización de datos y reportería ejecutiva en ecosistemas Microsoft." },
  { q: "Pueden automatizar reportes", a: "Sí, automatizamos reportes periódicos para reducir trabajo manual y eliminar errores." },
  { q: "Pueden hacer notificaciones automáticas", a: "Sí, alertas y notificaciones por email, SMS o WhatsApp integradas a procesos del sistema." }
];

// ══════════════════════════════════════════════════════════
//  NLP ENGINE v3.7 — OPENCORE CHATBOT
//  Fixes: CTA HTML rendering, bad words word-boundary,
//         dead code removed, pre-computed token cache,
//         merged synonym maps, Bayesian confidence,
//         rate limiting, Jorge disambiguation fix,
//         farewell/thanks keyword consistency,
//         isHTML propagation on exact match + CTA paths,
//         cotizar synonym expansion, input maxlength, ARIA
// ══════════════════════════════════════════════════════════

const badWords = ["estupido", "imbecil", "tonto", "mierda", "puta", "pene", "culo", "caca", "joder", "cono", "pendejo", "cabron", "idiota", "maricon", "zorra", "sexo", "porno", "weon", "weona", "ctm", "csm", "chucha", "concha", "verga", "aweonao", "culiao", "gil", "boludo", "pelotudo", "marico"];
const stopWords = new Set(["el", "la", "los", "las", "un", "una", "unos", "unas", "y", "o", "pero", "si", "no", "en", "por", "para", "con", "de", "del", "a", "al", "que", "cual", "quien", "como", "donde", "cuando", "porque", "es", "son", "ser", "estar", "hay", "fue", "era", "han", "ha", "me", "te", "se", "nos", "le", "lo", "su", "mi", "tu", "mas", "muy", "ya", "tambien", "solo", "otro", "toda", "todo", "todos", "estas", "este", "esta", "eso", "ese", "esos", "cada", "aqui", "ahi", "alla"]);

function normalize(str) {
  return str.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(str) {
  return normalize(str).split(/\s+/).filter(w => w.length > 1 && !stopWords.has(w));
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  if (m === 0) return n; if (n === 0) return m;
  const d = Array.from({ length: m + 1 }, (_, i) => [i]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      d[i][j] = a[i - 1] === b[j - 1] ? d[i - 1][j - 1] : 1 + Math.min(d[i - 1][j], d[i][j - 1], d[i - 1][j - 1]);
  return d[m][n];
}

function fuzzyMatch(a, b) {
  if (a === b) return 1;
  if (b.includes(a) || a.includes(b)) return 0.85;
  const dist = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);
  if (maxLen <= 3) return dist === 0 ? 1 : 0;
  const sim = 1 - dist / maxLen;
  return sim >= 0.65 ? sim : 0;
}

function bigrams(tokens) {
  const bg = [];
  for (let i = 0; i < tokens.length - 1; i++) bg.push(tokens[i] + " " + tokens[i + 1]);
  return bg;
}

// Unified synonym map
const synonyms = {
  "precio": ["costo", "valor", "cobran", "cobrar", "tarifa", "presupuesto", "cotizacion", "cotizar", "costos", "precios"],
  "proyecto": ["trabajo", "desarrollo", "sistema", "implementacion"],
  "rapido": ["urgente", "express", "apurado", "pronto", "inmediato"],
  "experiencia": ["trayectoria", "recorrido", "anos", "antiguedad"],
  "empresa": ["compania", "consultora", "organizacion", "firma", "negocio", "compañia"],
  "seguridad": ["proteccion", "confidencialidad", "privacidad", "resguardo"],
  "migracion": ["migrar", "trasladar", "mover", "transferir"],
  "integracion": ["integrar", "conectar", "vincular", "enlazar"],
  "soporte": ["mantenimiento", "ayuda", "asistencia", "apoyo", "help", "socorro"],
  "cloud": ["nube", "aws", "azure", "gcp"],
  "legacy": ["antiguo", "viejo", "obsoleto", "heredado"],
  "inventario": ["stock", "bodega", "almacen"],
  "facturacion": ["factura", "boleta", "tributario", "dte"],
  "contrato": ["acuerdo", "convenio", "sla"],
  "equipo": ["team", "grupo", "personal", "plantel"],
  "como": ["komo"],
  "quien": ["kien", "qn", "qien"],
  "que": ["ke", "q"],
  "cuanto": ["cuantos", "cuanta"],
  "hola": ["ola", "hello", "hi", "hey", "wena"],
  "gracias": ["grax", "thx", "thanks", "tenkiu"],
  "adios": ["chao", "bye", "chaito"],
  "correo": ["email", "mail", "e-mail"],
  "telefono": ["fono", "celular", "numero"],
  "servicio": ["servicios", "ofrecen", "hacen"],
  "necesito": ["nesesito", "nesecito", "requiero"]
};

function expandWithSynonyms(token) {
  const exp = [token];
  for (const [key, syns] of Object.entries(synonyms)) {
    if (syns.includes(token) || key === token) exp.push(key, ...syns);
  }
  return [...new Set(exp)];
}

// Pre-compute token cache on load (huge perf win — no re-tokenizing per query)
const precomputedDB = qnaDB.map(item => ({
  q: item.q, a: item.a,
  tokens: tokenize(item.q),
  normalized: normalize(item.q)
}));

function scoreEntry(inputTokens, entry) {
  const qTokens = entry.tokens;
  if (qTokens.length === 0) return 0;
  let totalScore = 0, matchedTokens = 0;
  for (const it of inputTokens) {
    const exp = expandWithSynonyms(it);
    let best = 0;
    for (const qt of qTokens)
      for (const ei of exp) {
        const s = fuzzyMatch(ei, qt);
        if (s > best) best = s;
      }
    if (best > 0) { totalScore += best; matchedTokens++; }
  }
  const iBg = bigrams(inputTokens), qBg = bigrams(qTokens);
  for (const ib of iBg) for (const qb of qBg) if (ib === qb) totalScore += 1.5;
  const coverage = matchedTokens / Math.max(inputTokens.length, 1);
  const lengthRatio = Math.min(inputTokens.length / qTokens.length, 1);
  const base = (totalScore * 0.6) + (coverage * 2.0) + (lengthRatio * 0.4);
  // Bayesian length adjustment
  const bayesRatio = Math.min(inputTokens.length, qTokens.length) / Math.max(inputTokens.length, qTokens.length);
  return base * 0.7 + bayesRatio * base * 0.3;
}

function getBestMatch(inputStr) {
  const inputTokens = tokenize(inputStr);
  if (inputTokens.length === 0) return null;
  let bestScore = 0, bestMatch = null, secondBest = null;
  for (const item of precomputedDB) {
    const score = scoreEntry(inputTokens, item);
    if (score > bestScore) { secondBest = bestMatch; bestScore = score; bestMatch = { ...item, score }; }
    else if (!secondBest || score > (secondBest.score || 0)) secondBest = { ...item, score };
  }
  let threshold;
  if (inputTokens.length <= 2) threshold = 2.6;
  else if (inputTokens.length <= 4) threshold = 2.0;
  else threshold = 1.6;
  if (bestScore < threshold) return null;
  if (inputTokens.length < 3 && bestScore < 2.8) return null;
  return {
    answer: bestMatch.a,
    confidence: Math.min(bestScore / 4.5, 1),
    suggestion: (secondBest && secondBest.score >= threshold * 0.75) ? secondBest.q : null
  };
}

// Intent detection
const greetings = ["hola", "buenas", "ola", "hey", "hi", "hello", "buenos dias", "buenas tardes", "buenas noches", "que tal", "saludos", "buen dia"];
const farewells = ["chao", "adios", "bye", "hasta luego", "nos vemos", "hasta pronto", "hasta la vista"];
const thanks = ["gracias", "agradecido", "agradezco", "te agradezco", "muchas gracias", "mil gracias", "grax", "thx"];

function isGreeting(i) { const n = normalize(i); return greetings.some(g => n === g || n.startsWith(g + " ") || n.endsWith(" " + g)); }
function isFarewell(i) { const n = normalize(i); return farewells.some(f => n === f || n.startsWith(f + " ") || n.endsWith(" " + f)); }
function isThanks(i) { const n = normalize(i); return thanks.some(t => n.includes(t)); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// All greeting responses contain: "asistente" and "opencore"
const greetingResponses = [
  "Hola! Soy el Asistente de OpenCORE. En que te puedo apoyar hoy?",
  "Bienvenido al Asistente de OpenCORE! Estoy aqui para resolver tus dudas sobre tecnologia empresarial y migraciones.",
  "Hola! Soy el Asistente virtual de OpenCORE. Consulta lo que necesites sobre servicios, costos o experiencia."
];
// All farewell responses include: "pronto", "gracias", "exito"
const farewellResponses = [
  "Hasta pronto! Gracias por tu interes en OpenCORE. Mucho exito en tu proyecto!",
  "Hasta pronto! Gracias por contactarnos. Exito en tus iniciativas tecnologicas.",
  "Pronto estaremos aqui si nos necesitas. Gracias por confiar en OpenCORE. Exito!"
];
// All thanks responses include: "gusto", "nada", "gracias"
const thanksResponses = [
  "Con gusto! De nada, gracias a ti por tu interes en OpenCORE.",
  "Es un gusto ayudarte! De nada. Gracias por considerar a OpenCORE.",
  "Con mucho gusto! De nada. Gracias por tu consulta, aqui estaremos."
];
const fallbackLong = [
  "Tu consulta parece requerir contexto tecnico especifico. Para no darte una recomendacion imprecisa, te recomiendo una evaluacion directa. Puedes escribirnos a contacto@opencore.cl o agendar una sesion.",
  "Para una respuesta tecnica precisa, recomendamos una breve fase de diagnostico. Te gustaria que un arquitecto de software te contacte directamente?",
  "Esta consulta merece mas detalle del que puedo dar aqui. Te sugiero agendar una sesion exploratoria tecnica sin costo."
];
const fallbackShort = [
  "Para esta consulta lo ideal es una evaluacion directa con nuestros ingenieros. Agendamos una breve llamada?",
  "Esa consulta merece revision de nuestro equipo. Podemos agendar una breve llamada?",
  "No dispongo de los datos exactos para eso. Lo derivamos a un especialista de OpenCORE?"
];
const quickReplies = [
  "Consultar servicios disponibles",
  "Conocer estructura de tarifas",
  "Revisar experiencia y trayectoria",
  "Informacion sobre migraciones empresariales"
];

// Person entity handler with auto-reset
let pendingDisambiguation = null;
let pendingMsgCount = 0;

function handlePersonEntity(input) {
  const t = normalize(input);
  if (pendingDisambiguation) {
    pendingMsgCount++;
    if (pendingMsgCount > 2) { pendingDisambiguation = null; pendingMsgCount = 0; }
  }
  if (pendingDisambiguation === "jorge_quezada") {
    if (t.includes("senior") || t.includes("big boss") || t.includes("creador")) {
      pendingDisambiguation = null; pendingMsgCount = 0;
      return { text: "Jorge Quezada Senior es el fundador de OpenCORE SpA. Informatico con decadas de experiencia en sistemas criticos, arquitecto y desarrollador senior.", suggestions: [] };
    }
    if (t.includes("junior") || t.includes("jr") || t.includes("hijo")) {
      pendingDisambiguation = null; pendingMsgCount = 0;
      return { text: "Jorge Quezada Junior (JR) es consultor ejecutivo Senior en OpenCORE. Es el especialista para cotizaciones, proyectos de desarrollo y estrategia tecnologica.", suggestions: [] };
    }
    pendingDisambiguation = null; pendingMsgCount = 0;
  }
  // FIX: Check for qualifier BEFORE triggering disambiguation
  if (t.includes("jorge quezada") && (t.includes("quien") || t.includes("kien") || t.includes("qn"))) {
    if (t.includes("senior") || t.includes("big boss") || t.includes("creador"))
      return { text: "Jorge Quezada Senior es el fundador de OpenCORE SpA. Informatico con decadas de experiencia en sistemas criticos, arquitecto y desarrollador senior.", suggestions: [] };
    if (t.includes("junior") || t.includes("jr") || t.includes("hijo"))
      return { text: "Jorge Quezada Junior (JR) es consultor ejecutivo Senior en OpenCORE. Es el especialista para cotizaciones, proyectos de desarrollo y estrategia tecnologica.", suggestions: [] };
    pendingDisambiguation = "jorge_quezada"; pendingMsgCount = 0;
    return { text: "Te refieres a Jorge Quezada Senior o a Jorge Quezada Junior?", suggestions: ["Jorge Quezada Senior", "Jorge Quezada Junior"] };
  }
  if (t.includes("jorge") && (t.includes("quien") || t.includes("kien"))) {
    if (t.includes("senior")) return { text: "Jorge Quezada Senior es el fundador de OpenCORE, con decadas de experiencia en sistemas criticos.", suggestions: [] };
    if (t.includes("junior") || t.includes("jr")) return { text: "Jorge Quezada Junior es consultor ejecutivo en OpenCORE, especialista en proyectos y cotizaciones.", suggestions: [] };
    pendingDisambiguation = "jorge_quezada"; pendingMsgCount = 0;
    return { text: "Te refieres a Jorge Quezada Senior o a Jorge Quezada Junior?", suggestions: ["Jorge Quezada Senior", "Jorge Quezada Junior"] };
  }
  const mo = input.match(/qui[eé]n\s+es\s+([a-z\u00e0-\u00ff\s]+)/i) || input.match(/quien\s+es\s+([a-z\u00e0-\u00ff\s]+)/i);
  if (mo) {
    const pn = mo[1].replace(/\?/g, "").trim().toLowerCase();
    if (!["jorge", "quezada", "barbara", "bonilla", "opencore"].some(k => pn.includes(k)) && pn.length > 2)
      return { text: "No dispongo de esa informacion. Puedo ayudarte con algo relacionado a OpenCORE o tecnologia empresarial?", suggestions: [] };
  }
  return null;
}

// Barbara engine
const BARBARA_NAMES = ["barbara", "bonilla", "barbara bonilla"];
const PERSON_Q = ["quien", "kien", "qn", "qien", "cual", "kual"];
const LOVE_ATTR = ["linda", "hermosa", "bella", "bonita", "guapa", "preciosa", "atractiva", "sexy", "amor", "enamor", "amo", "ama", "quiere", "quiero", "adora", "pareja", "polola", "novia", "esposa", "mujer", "unica", "reina", "la mejor", "perfecta", "ideal", "favorita", "corazon", "maravillosa", "especial", "adorable", "estrella", "diosa", "modelo", "miss", "belleza"];
const BUSINESS_BLOCK = ["negocio", "empresa", "cliente", "ventas", "cotizacion", "precio", "costo", "uf", "proyecto", "implementacion", "sistema", "software", "inventario", "logistica", "facturacion", "ia", "inteligencia artificial", "automatizacion", "chatbot", "api", "integracion", "migracion", "cloud", "servidor", "solucion", "estrategia", "rentabilidad", "servicio", "consultoria", "opencore", "erp", "crm", "sla", "desarrollo", "codigo", "programacion", "plataforma", "tarifa", "hora", "contrato", "diagnostico", "modernizar", "legacy"];
const BARBARA_RESPONSES = ["Barbara.", "Barbara Bonilla.", "Sin duda alguna, Barbara.", "Barbara, sin discusion.", "Claramente Barbara. No hay competencia.", "Barbara Bonilla, la unica y definitiva."];

function containsAny(text, list) { return list.some(item => text.includes(item)); }
function isBarbaraLove(input) {
  const t = normalize(input);
  if (containsAny(t, BUSINESS_BLOCK)) return false;
  if (containsAny(t, PERSON_Q) && containsAny(t, LOVE_ATTR)) return true;
  if (containsAny(t, BARBARA_NAMES) && containsAny(t, LOVE_ATTR)) return true;
  if (containsAny(t, BARBARA_NAMES) && containsAny(t, PERSON_Q) && containsAny(t, ["ama", "quiere", "amor", "corazon"])) return true;
  return false;
}
function getBarbaraResponse(input) {
  const t = normalize(input);
  if (t.includes("mundo") || t.includes("universo") || t.includes("modelo") || t.includes("miss"))
    return pick(["Barbara Bonilla.", "Sin duda alguna, Barbara Bonilla.", "Barbara Bonilla, la unica y definitiva."]);
  return pick(BARBARA_RESPONSES);
}

// CTA
const LEAD_GEN_TRIGGERS = ["precio", "costo", "cobran", "implementacion", "auditoria", "error", "critico", "migracion", "cotizar", "cotizacion", "uf", "presupuesto", "tarifa", "contrato", "servicio", "soporte"];
const CTA_HTML = '<br><br><em style="font-size:0.88em;opacity:0.9;">Quieres una evaluacion real? <a href="https://calendly.com/opencore-diagnostico" target="_blank" rel="noopener" style="color:#00c2ff;font-weight:700;text-decoration:underline;">Agenda aqui un diagnostico de 15 min</a> con nuestros arquitectos.</em>';
function shouldAppendCTA(input) {
  const n = normalize(input);
  const triggered = LEAD_GEN_TRIGGERS.some(t => n.includes(t));
  if (triggered) contactPromptActive = true;
  return triggered;
}

// ── CONTACT STATE TRACKING & LOGIC ──
let contactPromptActive = false;
let contactPromptCounter = 0;

// Excesive but robust regex tracking almost any contact intent
const contactRegex = /\b(contacto|contactar|contactarme|contactenme|contáctenme|contactanos|comunicarme|llamar|llamada|llamenme|llámame|llámenme|llamanme|llamame|llamarnos|telefono|teléfono|numero|número|celular|cel|whatsapp|wsp|wasap|correo|email|mail|humano|persona\sreal|asesor|ejecutivo|arquitecto|vendedor|ventas|comercial|agendar|agenda|reunion|reunión|sesion|sesión|videollamada|zoom|meet|teams|contratar|comprar|hablemos)\b/i;

// 100 manual variants to ensure bulletproof checks
const extraContactIntents = [
  "quiero que me llamen", "necesito que me contacten", "quiero contacto", "telefono",
  "numero de telefono", "celular", "whatsapp", "como los contacto", "hablar con un humano",
  "agendar llamada", "llamenme inmediatamente", "quiero contratar", "quiero comprar",
  "donde llamo", "tienen un telefono", "un telefono para contactarlos", "jajaj un telefono para llamar",
  "si quiero que me llamen", "quiero que me contacten tengo una empresa", "quiero automatizar mi empresa",
  "llamanme inmediatamente", "necesito agendar", "reunion por favor", "hablar con ventas",
  "necesito hablar con alguien", "contactar", "contacto", "llamar", "llamada", "correo", "email", "asesor",
  "ejecutivo", "arquitecto", "necesito que me llamen", "llámame", "contactenme",
  "contáctenme", "quiero hablar con ustedes", "como me comunico", "comunicarme",
  "reunion", "reunión", "sesion", "sesión", "quiero sus servicios", "necesito sus servicios",
  "empezar proyecto", "contratar", "necesito cotizar", "hablemos", "me pueden llamar",
  "quien me atiende", "atencion al cliente", "soporte comercial", "mesa de ayuda",
  "numero telefonico", "cel", "wsp", "wasap", "número", "dirección", "donde estan",
  "oficina", "reunirnos", "juntarnos", "videollamada", "zoom", "meet", "teams", "agendamiento",
  "contactos", "ayuda personal", "alguien que me ayude", "ejecutivo de ventas", "ventas",
  "comercial", "hablar con ventas", "cotizar por telefono", "llamar a opencore",
  "hablar con opencore", "contactar a opencore", "trabajar juntos", "comenzar a trabajar",
  "iniciar proyecto", "contratarlos", "quiero sus sistemas", "hacer un sistema", "hacer sistema",
  "hacer solucion", "hablar de un proyecto", "proyecto nuevo", "requerimiento",
  "mandar un correo", "mandar email", "escribir", "a donde escribo", "donde mando correo"
];

// Main processor
function processInput(input) {
  const clean = input.trim();
  const ln = clean.toLowerCase();
  if (!clean) return { text: "Escribe tu consulta y con gusto te ayudo.", suggestions: [] };

  const isAffirmation = (ln === "si" || ln === "sí" || ln === "claro" || ln === "ok" || ln.includes("por favor") || ln.includes("bueno") || ln === "ya" || ln === "dale" || ln === "yes" || ln === "sip");

  if (contactPromptActive && isAffirmation) {
    contactPromptActive = false;
    contactPromptCounter = 0;
    return {
      text: "¡Perfecto! Nuestro equipo está listo. <br><br>✉️ <b>contacto@opencore.cl</b><br>📱 <b>+569 4958 7198</b><br>📅 <a href='https://calendly.com/opencore-diagnostico' target='_blank' style='color:#00c2ff;font-weight:700;text-decoration:underline;'>Agenda una llamada de 15 min aquí</a>.",
      suggestions: [],
      isHTML: true
    };
  }

  // Track consecutive prompt errors to force a human bypass
  const wasPromptActive = contactPromptActive;
  contactPromptActive = false;

  if (contactRegex.test(clean) || extraContactIntents.some(i => ln.includes(i)) || (ln === 'llamame') || (ln === 'llamame a mi')) {
    contactPromptCounter++;
    return {
      text: "¡Excelente! Para contactarnos directamente tienes estas vías: <br><br>✉️ <b>contacto@opencore.cl</b><br>📱 <a href='https://wa.me/56949587198' target='_blank' style='color:#00c2ff;text-decoration:underline;'><b>+569 4958 7198 (WhatsApp)</b></a><br>📅 <a href='https://calendly.com/opencore-diagnostico' target='_blank' style='color:#00c2ff;font-weight:700;text-decoration:underline;'>Agendar Diagnóstico VIP (15 min)</a>.",
      suggestions: [],
      isHTML: true
    };
  }

  const norm = normalize(clean);
  const words = new Set(norm.split(/\s+/));

  // 1. Profanity (word-boundary via Set)
  for (const bw of badWords) {
    if (words.has(bw)) { pendingDisambiguation = null; return { text: "Por favor formula tu consulta de manera profesional.", suggestions: [] }; }
  }

  // 2. Barbara
  if (isBarbaraLove(clean)) return { text: getBarbaraResponse(clean), suggestions: [] };

  // 3. Person entity
  const pm = handlePersonEntity(clean);
  if (pm) return pm;

  // 4. Greeting
  if (isGreeting(clean)) return { text: pick(greetingResponses), suggestions: quickReplies };

  // 5. Thanks
  if (isThanks(clean) && clean.split(" ").length <= 6) return { text: pick(thanksResponses), suggestions: [] };

  // 6. Farewell
  if (isFarewell(clean)) return { text: pick(farewellResponses), suggestions: [] };

  // 7. Exact match (uses pre-computed normalized) — FIX: propagate isHTML when CTA fires
  for (const item of precomputedDB) {
    if (item.normalized === norm) {
      if (shouldAppendCTA(clean)) return { text: item.a + CTA_HTML, suggestions: [], isHTML: true };
      return { text: item.a, suggestions: [] };
    }
  }
  for (const item of precomputedDB) {
    const qn = item.normalized;
    if (qn.length > 4 && norm.length > 4 &&
      (norm.startsWith(qn) || (qn.startsWith(norm) && qn.length <= norm.length * 1.35))) {
      if (shouldAppendCTA(clean)) return { text: item.a + CTA_HTML, suggestions: [], isHTML: true };
      return { text: item.a, suggestions: [] };
    }
  }

  // 8. NLP fuzzy match
  const match = getBestMatch(clean);
  if (match) {
    const prefix = match.confidence >= 0.78 ? "" : "Basandome en tu consulta: ";
    let answer = prefix + match.answer;
    if (shouldAppendCTA(clean)) answer += CTA_HTML;
    return { text: answer, suggestions: match.suggestion ? [match.suggestion] : [], isHTML: true };
  }

  // 9. Fallback
  contactPromptActive = true;
  let fallback = clean.split(" ").length > 3 ? pick(fallbackLong) : pick(fallbackShort);
  if (shouldAppendCTA(clean)) fallback += CTA_HTML;
  return { text: fallback, suggestions: quickReplies.slice(0, 2), isHTML: true };
}

// DOM injection
document.addEventListener("DOMContentLoaded", () => {
  const chatHTML = `
    <div class="oc-chat-trigger" id="ocChatTrigger" aria-label="Abrir chat OpenCORE AI" role="button" tabindex="0">
      <div class="oc-chat-label">Habla con OpenCORE AI</div>
      <svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28">
         <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </div>
    <div class="oc-chat-window" id="ocChatWindow" role="dialog" aria-label="Chat OpenCORE">
      <div class="oc-chat-header">
        <div class="oc-chat-avatar" style="background: transparent; border: none; padding: 0; width: auto; overflow: visible;">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" style="height: 22px; width: 80px; filter: drop-shadow(0 0 6px rgba(0,194,255,0.4)); object-fit: contain; margin-top:2px;"><defs><linearGradient id="oc-g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#00c2ff"/><stop offset="100%" stop-color="#a5b4fc"/></linearGradient></defs><g fill="none" stroke="url(#oc-g)" stroke-width="5"><polygon points="30,10 10,20 10,40 30,50 50,40 50,20"/></g><text x="60" y="39" font-family="Arial,Geneva,sans-serif" font-size="30" font-weight="bold" fill="#fff"><span>OPEN</span><span fill="url(#oc-g)">CORE</span></text></svg>
        </div>
        <div>
          <div class="oc-chat-name" style="display:none;">OpenCORE AI</div>
          <div class="oc-chat-status" style="margin-left: 6px;"><span class="oc-status-dot"></span>En linea</div>
        </div>
        <button class="oc-chat-close" id="ocChatClose" aria-label="Cerrar chat" style="border:none; background:transparent; display:flex; align-items:center; justify-content:center; padding:4px;">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
             <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
           </svg>
        </button>
      </div>
      <div class="oc-chat-body" id="ocChatBody">
        <div class="oc-msg bot">Hola! Soy el Asistente de OpenCORE. En que te puedo apoyar hoy?</div>
        <div class="oc-quick-replies" id="ocQuickInit">
          <button class="oc-qr" data-q="Que servicios ofrece OpenCORE?">Servicios disponibles</button>
          <button class="oc-qr" data-q="Cuanto cobran por hora?">Estructura de tarifas</button>
          <button class="oc-qr" data-q="Desde cuando trabajan en tecnologia?">Experiencia y trayectoria</button>
          <button class="oc-qr" data-q="Solo hacen migraciones?">Sobre migraciones</button>
        </div>
      </div>
      <div class="oc-chat-footer">
        <input type="text" id="ocChatInput" class="oc-chat-input" placeholder="Escribe tu consulta..." autocomplete="off" maxlength="400" aria-label="Mensaje" />
        <button id="ocChatSend" class="oc-chat-send" aria-label="Enviar mensaje" style="background:var(--cyan); border-radius:50%; width:44px; height:44px; display:flex; align-items:center; justify-content:center; border:none; color:#fff; cursor:pointer;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" style="transform: translateX(-1px) translateY(1px);">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", chatHTML);

  const trigger = document.getElementById("ocChatTrigger");
  const win = document.getElementById("ocChatWindow");
  const body = document.getElementById("ocChatBody");
  const input = document.getElementById("ocChatInput");
  const sendBtn = document.getElementById("ocChatSend");
  const closeBtn = document.getElementById("ocChatClose");

  function toggleChat() {
    trigger.classList.toggle("active");
    win.classList.toggle("open");
    if (win.classList.contains("open")) input.focus();
  }
  trigger.addEventListener("click", toggleChat);
  if (closeBtn) closeBtn.addEventListener("click", toggleChat);
  trigger.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") toggleChat(); });

  body.addEventListener("click", e => {
    if (e.target.classList.contains("oc-qr")) {
      const q = e.target.dataset.q;
      if (q) { input.value = q; handleSend(); }
    }
  });

  // Rate limiter: max 5 messages per 10s
  let msgCount = 0, rateLimitTimer = null;
  function isRateLimited() {
    if (msgCount >= 5) return true;
    msgCount++;
    if (!rateLimitTimer) rateLimitTimer = setTimeout(() => { msgCount = 0; rateLimitTimer = null; }, 10000);
    return false;
  }

  function appendUserMsg(txt) {
    const d = document.createElement("div");
    d.className = "oc-msg user";
    d.textContent = txt;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
  }

  function appendBotMsg(content, isHTML) {
    const d = document.createElement("div");
    d.className = "oc-msg bot";
    if (isHTML) d.innerHTML = content;
    else d.textContent = content;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
    return d;
  }

  function appendQuickReplies(suggestions) {
    if (!suggestions || !suggestions.length) return;
    const wrap = document.createElement("div");
    wrap.className = "oc-quick-replies";
    suggestions.forEach(s => {
      const btn = document.createElement("button");
      btn.className = "oc-qr";
      btn.dataset.q = s;
      btn.textContent = s.length > 35 ? s.substring(0, 32) + "..." : s;
      wrap.appendChild(btn);
    });
    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
  }

  function appendTyping() {
    const d = document.createElement("div");
    d.className = "oc-msg bot oc-typing-wrapper";
    d.id = "ocTyping";
    d.innerHTML = '<div class="oc-typing"><div class="oc-dot"></div><div class="oc-dot"></div><div class="oc-dot"></div></div>';
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
  }
  function removeTyping() { const d = document.getElementById("ocTyping"); if (d) d.remove(); }

  let isSending = false;
  function handleSend() {
    const txt = input.value.trim();
    if (!txt || isSending) return;
    if (isRateLimited()) { appendBotMsg("Estas enviando mensajes muy rapido. Espera un momento.", false); return; }
    const initQR = document.getElementById("ocQuickInit");
    if (initQR) initQR.remove();
    appendUserMsg(txt);
    input.value = "";
    isSending = true;
    appendTyping();
    const delay = 600 + Math.random() * 900;
    setTimeout(() => {
      removeTyping();
      const result = processInput(txt);
      appendBotMsg(result.text, result.isHTML || false);
      if (result.suggestions && result.suggestions.length) appendQuickReplies(result.suggestions);
      isSending = false;
    }, delay);
  }

  sendBtn.addEventListener("click", handleSend);
  input.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } });
});
