/* ========================================================
   CHATBOT V3 PRO - OPENCORE NLP ENGINE
   Versión: 3.2 | Build: 2026-02-23
   Features: Levenshtein, N-gram, Stopwords, Quick Replies,
             Sentiment Guard, Greeting/Farewell Detection
             Formal Tone Audit Applied
======================================================== */

const qnaDB = [
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
  { q: "¿Qué pasa si el proyecto se atrasa?", a: "Los plazos y márgenes quedan definidos contractualmente. Si hay desvíos, se gestiona con replanificación formal y medidas correctivas; si aplica, se activan cláusulas establecidas en el contrato." },
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
  { q: "¿Eres tonto?", a: "Si lo fuera, no estaría hablando contigo sobre sistemas críticos y migraciones complejas. Pero prometo mantener sentido del humor." },
  { q: "¿Me puedes ayudar con mi proyecto?", a: "Por supuesto. Cuéntame qué necesitas y te orientaré sobre viabilidad, costos aproximados y próximos pasos." },
  { q: "¿Trabajas por hora?", a: "Sí. OpenCORE puede trabajar por hora, por proyecto o bajo contrato con SLA, según la complejidad y criticidad." },
  { q: "¿Cuál es el precio mínimo para empezar?", a: "Normalmente evaluamos proyectos desde aproximadamente 50 UF en adelante, dependiendo del alcance y viabilidad." },
  { q: "¿Trabajan con empresas pequeñas?", a: "Sí, siempre que el proyecto tenga sentido técnico y económico. Nuestro foco natural es mediana y gran empresa." },
  { q: "¿Solo trabajan con empresas grandes?", a: "No exclusivamente. Sin embargo, nuestra experiencia es especialmente fuerte en entornos medianos y corporativos." },
  { q: "¿Son caros?", a: "Somos competitivos para el nivel de experiencia senior que ofrecemos. El costo se relaciona con calidad, continuidad y reducción de riesgo." },
  { q: "¿Valen lo que cobran?", a: "Cuando el sistema no se cae y la operación sigue facturando, generalmente la respuesta es sí." },
  { q: "¿Pueden hacerme una cotización rápida?", a: "Podemos darte una estimación inicial, pero para cifras formales recomendamos una breve fase de diagnóstico." },
  { q: "¿Cuánto se demoran en responder?", a: "En modalidad estándar respondemos dentro del día. En contratos críticos, incluso en 30–60 minutos." },
  { q: "¿Trabajan los fines de semana?", a: "En proyectos críticos o bajo contrato especial, sí." },
  { q: "¿Atienden urgencias?", a: "Sí, especialmente cuando hay continuidad operacional en riesgo." },
  { q: "¿Pueden arreglar lo que otro programador dejó mal?", a: "Sí. Primero evaluamos el estado real del sistema y luego proponemos un plan de estabilización." },
  { q: "¿Me van a cobrar por todo?", a: "Trabajamos con claridad contractual. Todo alcance adicional se acuerda antes de ejecutarse." },
  { q: "¿Son una startup?", a: "No. Somos una consultora consolidada con experiencia desde 1998 y formalizada en 2015." },
  { q: "¿Son una empresa grande?", a: "Somos una consultora boutique senior: estructura flexible, experiencia alta y trato directo." },
  { q: "¿Son confiables?", a: "Trabajamos bajo contrato, SLA y estándares profesionales. La confianza se construye con resultados." },
  { q: "¿Pueden trabajar como socios tecnológicos?", a: "Sí. Evaluamos el modelo más adecuado: proveedor, partner estratégico o alianza técnica." },
  { q: "¿Qué los hace distintos?", a: "Cercanía, senior real, disponibilidad y foco en continuidad operacional." },
  { q: "¿Hacen sitios web simples?", a: "No es nuestro foco principal. Nos especializamos en sistemas empresariales complejos." },
  { q: "¿Hacen aplicaciones móviles básicas?", a: "No es nuestra especialidad. Nos enfocamos en integración, migración y arquitectura empresarial." },
  { q: "¿Trabajan con inteligencia artificial?", a: "Sí, cuando aporta valor real y no compromete estabilidad." },
  { q: "¿Integran IA solo por moda?", a: "No. Integramos IA de forma responsable y controlada." },
  { q: "¿Pueden hacer magia con mi sistema?", a: "Preferimos ingeniería sólida antes que magia." },
  { q: "¿Son flexibles?", a: "Sí, dentro de un marco profesional y contractual claro." },
  { q: "¿Qué pasa si no entiendo nada técnico?", a: "No hay problema. Explicamos todo en términos de negocio." },
  { q: "¿Trabajan con startups?", a: "Podemos hacerlo si el proyecto es técnicamente serio y viable." },
  { q: "¿Me pueden orientar gratis?", a: "Podemos darte una orientación inicial. Para análisis profundo recomendamos diagnóstico formal." },
  { q: "¿Son 100% remotos?", a: "Sí, operamos bajo modelo remoto estructurado." },
  { q: "¿Se pueden reunir presencialmente?", a: "Si el proyecto lo requiere, se coordina." },
  { q: "¿Trabajan rápido?", a: "Trabajamos con eficiencia y control de calidad. La velocidad depende del alcance." },
  { q: "¿Son mejores que otras consultoras?", a: "Somos diferentes: más cercanos, más senior y enfocados en continuidad." },
  { q: "¿Pueden salvar mi sistema?", a: "Si es técnicamente viable, probablemente sí. Primero evaluamos." },
  { q: "¿Tienen sentido del humor?", a: "Sí, pero nunca a costa de la estabilidad del sistema." },
  { q: "¿Pueden trabajar conmigo a largo plazo?", a: "Sí, muchos clientes trabajan con nosotros de forma continua." },
  { q: "¿Me pueden ayudar a decidir si migrar o no?", a: "Sí. Evaluamos costo, riesgo y beneficio antes de recomendar." },
  { q: "¿Me conviene desarrollar o comprar software?", a: "Depende del proceso. Lo analizamos con enfoque costo-beneficio." },
  { q: "¿Trabajan con datos sensibles?", a: "Sí. Bajo contrato, protocolos y medidas de seguridad formales." },
  { q: "¿Se comprometen con resultados?", a: "Nos comprometemos con entregables claros y definidos contractualmente." },
  { q: "¿Qué pasa si no quedo conforme?", a: "Revisamos el alcance contractual y aplicamos los mecanismos acordados." },
  { q: "¿Pueden ayudarme a modernizar mi empresa?", a: "Sí. Ese es uno de nuestros principales focos." },
  { q: "¿Hablan solo en términos técnicos?", a: "No. Hablamos en términos de negocio y rentabilidad." },
  { q: "¿Por qué debería hablar con OpenCORE?", a: "Porque modernizar sistemas sin poner en riesgo la operación no es algo que todas las consultoras sepan hacer correctamente." },
  { q: "¿Cuánto cobran?", a: "Trabajamos en rangos referenciales entre 1 y 5 UF por hora, según complejidad. Proyectos típicos medianos y grandes suelen estar entre 300 y 500 UF o más, definidos tras diagnóstico." },
  { q: "¿Cuánto vale un proyecto mínimo?", a: "En casos acotados podemos comenzar desde aproximadamente 50 UF, aunque nuestro foco natural son proyectos de mayor escala." },
  { q: "¿Cómo cobran?", a: "Podemos trabajar por hora, bolsa de horas, proyecto cerrado o servicio mensual con SLA. El modelo se define según incertidumbre y criticidad." },
  { q: "¿Qué es lo más grande que han hecho?", a: "Hemos participado en más de 30 proyectos de gran escala, incluyendo migraciones completas y sistemas críticos 24/7 en entornos corporativos complejos." },
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
  { q: "¿Qué tecnología usan?", a: "Seleccionamos tecnología según el proyecto. No forzamos herramientas; priorizamos continuidad, estabilidad y mantenibilidad." },
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
  { q: "¿Qué hora es?", a: "No tengo acceso a la hora en tiempo real. ¿Hay algo de OpenCORE en lo que pueda ayudarte?" },
  { q: "¿Qué día es hoy?", a: "No tengo acceso al calendario, pero estoy disponible cualquier día para resolver tus dudas tecnológicas." },
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
  { q: "¿Qué es machine learning?", a: "Rama de la IA donde los sistemas aprenden de datos para mejorar sin ser programados explícitamente." },
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
  { q: "¿Cuánto dura un rayo?", a: "Un rayo dura menos de un segundo, pero puede calentar el aire a 30.000°C." }
];

const badWords = ["estupido","imbecil","tonto","mierda","puta","pene","culo","caca","joder","coño","pendejo","cabron","idiota","maricon","zorra","sexo","porno","weon","weona","ctm","csm","chucha","concha","verga","aweonao","culiao","gil","boludo","pelotudo","marico"];

// ── STOPWORDS (ES) ──
const stopWords = new Set(["el","la","los","las","un","una","unos","unas","y","o","pero","si","no","en","por","para","con","de","del","a","al","que","cual","quien","como","donde","cuando","porque","es","son","ser","estar","hay","fue","era","han","ha","me","te","se","nos","le","lo","su","mi","tu","su","mas","muy","ya","tambien","solo","otro","toda","todo","todos","estas","este","esta","eso","ese","esos","cada","aqui","ahi","alla"]);

// ── TEXT NORMALIZER ──
function normalize(str) {
  return str.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ── TOKENIZER WITH STOPWORDS ──
function tokenize(str) {
  return normalize(str).split(/\s+/)
    .filter(w => w.length > 1)
    .filter(w => !stopWords.has(w));
}

// ── LEVENSHTEIN DISTANCE (typo tolerance) ──
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const d = Array.from({length: m + 1}, (_, i) => [i]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      d[i][j] = a[i-1] === b[j-1]
        ? d[i-1][j-1]
        : 1 + Math.min(d[i-1][j], d[i][j-1], d[i-1][j-1]);
    }
  }
  return d[m][n];
}

// ── FUZZY TOKEN MATCH (tolerates 1-2 char typos) ──
function fuzzyMatch(inputToken, targetToken) {
  if (inputToken === targetToken) return 1;
  if (targetToken.includes(inputToken) || inputToken.includes(targetToken)) return 0.85;
  const dist = levenshtein(inputToken, targetToken);
  const maxLen = Math.max(inputToken.length, targetToken.length);
  if (maxLen <= 3) return dist === 0 ? 1 : 0;
  const similarity = 1 - (dist / maxLen);
  return similarity >= 0.65 ? similarity : 0;
}

// ── N-GRAM GENERATOR (bigrams for context) ──
function bigrams(tokens) {
  const bg = [];
  for (let i = 0; i < tokens.length - 1; i++) {
    bg.push(tokens[i] + " " + tokens[i+1]);
  }
  return bg;
}

// ── SYNONYM MAP (common alternative words) ──
const synonyms = {
  "precio": ["costo","valor","cobran","cobrar","tarifa","presupuesto","cotizacion"],
  "proyecto": ["trabajo","desarrollo","sistema","implementacion"],
  "rapido": ["urgente","express","apurado","pronto","inmediato"],
  "experiencia": ["trayectoria","recorrido","anos","antiguedad"],
  "empresa": ["compania","consultora","organizacion","firma","negocio"],
  "seguridad": ["proteccion","confidencialidad","privacidad","resguardo"],
  "migracion": ["migrar","trasladar","mover","transferir"],
  "integracion": ["integrar","conectar","vincular","enlazar"],
  "soporte": ["mantenimiento","ayuda","asistencia","apoyo"],
  "cloud": ["nube","aws","azure","gcp"],
  "legacy": ["antiguo","viejo","obsoleto","heredado"],
  "inventario": ["stock","bodega","almacen"],
  "facturacion": ["factura","boleta","tributario","dte"],
  "contrato": ["acuerdo","convenio","sla"],
  "equipo": ["team","grupo","personal","plantel"]
};

function expandWithSynonyms(token) {
  const expanded = [token];
  for (const [key, syns] of Object.entries(synonyms)) {
    if (syns.includes(token) || key === token) {
      expanded.push(key, ...syns);
    }
  }
  return [...new Set(expanded)];
}

// ── ADVANCED SCORING ENGINE ──
function scoreEntry(inputTokens, entry) {
  const qTokens = tokenize(entry.q);
  if (qTokens.length === 0) return 0;

  let totalScore = 0;
  let matchedTokens = 0;

  // 1. Direct + Fuzzy token matching with synonym expansion
  for (const it of inputTokens) {
    const expandedInput = expandWithSynonyms(it);
    let bestTokenScore = 0;

    for (const qt of qTokens) {
      for (const ei of expandedInput) {
        const s = fuzzyMatch(ei, qt);
        if (s > bestTokenScore) bestTokenScore = s;
      }
    }

    if (bestTokenScore > 0) {
      totalScore += bestTokenScore;
      matchedTokens++;
    }
  }

  // 2. Bigram bonus (consecutive word pairs match = higher relevance)
  const inputBigrams = bigrams(inputTokens);
  const qBigrams = bigrams(qTokens);
  for (const ib of inputBigrams) {
    for (const qb of qBigrams) {
      if (ib === qb) totalScore += 1.5;
    }
  }

  // 3. Coverage ratio (what % of input tokens matched)
  const coverage = matchedTokens / Math.max(inputTokens.length, 1);

  // 4. Length penalty (avoid matching very short inputs to very long questions)
  const lengthRatio = Math.min(inputTokens.length / qTokens.length, 1);

  // Combined weighted score
  return (totalScore * 0.6) + (coverage * 2.0) + (lengthRatio * 0.4);
}

function getBestMatch(inputStr) {
  const inputTokens = tokenize(inputStr);
  if (inputTokens.length === 0) return null;

  let bestScore = 0;
  let bestMatch = null;
  let secondBest = null;

  for (const item of qnaDB) {
    const score = scoreEntry(inputTokens, item);
    if (score > bestScore) {
      secondBest = bestMatch;
      bestScore = score;
      bestMatch = { ...item, score };
    } else if (!secondBest || score > secondBest.score) {
      secondBest = { ...item, score };
    }
  }

  // Dynamic threshold based on input length
  const threshold = inputTokens.length <= 2 ? 1.2 : 1.5;

  if (bestScore >= threshold) {
    return {
      answer: bestMatch.a,
      confidence: Math.min(bestScore / 4, 1),
      suggestion: secondBest && secondBest.score >= threshold * 0.7 ? secondBest.q : null
    };
  }
  return null;
}

// ── GREETING / FAREWELL / THANKS DETECTION ──
const greetings = ["hola","buenas","ola","hey","hi","hello","buenos dias","buenas tardes","buenas noches","que tal","saludos"];
const farewells = ["chao","adios","bye","hasta luego","nos vemos","gracias","muchas gracias","vale gracias","ok gracias","perfecto gracias","genial gracias","excelente"];
const thanks = ["gracias","agradecido","agradezco","te agradezco","muchas gracias","mil gracias"];

function isGreeting(input) {
  const n = normalize(input);
  return greetings.some(g => n === g || n.startsWith(g + " "));
}
function isFarewell(input) {
  const n = normalize(input);
  return farewells.some(f => n === f || n.startsWith(f + " ") || n.endsWith(" " + f));
}
function isThanks(input) {
  const n = normalize(input);
  return thanks.some(t => n.includes(t));
}

// ── RANDOM RESPONSE PICKER ──
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

const greetingResponses = [
  "¡Hola! Soy el Asistente Inteligente de OpenCORE. ¿En qué te puedo apoyar hoy?",
  "¡Bienvenido! Estoy aquí para resolver tus dudas sobre tecnología empresarial, migraciones o integración de sistemas.",
  "¡Hola! Consulta lo que necesites sobre nuestros servicios, costos, metodología o experiencia."
];
const farewellResponses = [
  "¡Hasta pronto! Si necesitas algo más, aquí estaremos. 🚀",
  "¡Gracias por tu interés! No dudes en volver cuando lo necesites.",
  "¡Éxito en tu proyecto! Estamos disponibles cuando quieras retomar la conversación."
];
const thanksResponses = [
  "¡Con gusto! Si surge algo más, aquí estamos. 💪",
  "¡De nada! Estamos para ayudarte a tomar mejores decisiones tecnológicas.",
  "¡Gracias a ti por tu interés! No dudes en volver si necesitas más información."
];
const fallbackLong = [
  "Esa es una excelente pregunta. Te recomiendo contactarnos directamente para una respuesta más completa y personalizada.",
  "No dispongo de información suficiente para responderte con precisión. ¿Podrías contactarnos por el formulario para que un especialista te atienda?",
  "Tu consulta merece una respuesta profesional detallada. Te invito a agendar un diagnóstico gratuito con nuestro equipo."
];
const fallbackShort = [
  "¿Podrías detallar un poco más tu consulta para orientarte mejor?",
  "Necesito un poco más de contexto. ¿Qué aspecto de OpenCORE te interesa?",
  "No logré entender la consulta. ¿Podrías reformularla?"
];

// ── QUICK REPLY SUGGESTIONS ──
const quickReplies = [
  "Consultar servicios disponibles",
  "Conocer estructura de tarifas",
  "Revisar experiencia y trayectoria",
  "Información sobre migraciones empresariales"
];


// ══════════════════════════════════════════════════════════
// INTENT ENGINE: BÁRBARA BONILLA ❤️
// Semantic detection with business-context negative filter
// ══════════════════════════════════════════════════════════

const BARBARA_NAMES = ["barbara", "bonilla", "barbara bonilla", "jorge", "jorge casado", "jorge quezada"];
const PERSON_Q = ["quien", "kien", "qn", "qien", "cual", "kual"];
const LOVE_ATTR = [
  "linda","hermosa","bella","bonita","guapa","preciosa","atractiva","sexy",
  "amor","enamor","amo","ama","quiere","quiero","adora",
  "pareja","polola","novia","esposa","mujer",
  "unica","reina","numero uno","numero 1","n1","la mejor","perfecta","ideal",
  "favorita","corazon","inspiracion","inspiradora",
  "inteligente","brillante","genial","increible","extraordinaria",
  "maravillosa","especial","importante","valiosa","adorable",
  "ilumina","luz","estrella","diosa",
  "modelo","miss","miss universo","belleza",
  "proxima miss","mejor modelo","top model"
];

const BUSINESS_BLOCK = [
  "negocio","empresa","cliente","ventas","cotizacion","precio","costo","uf","presupuesto",
  "proyecto","implementacion","sistema","software","inventario","logistica","facturacion",
  "ia","inteligencia artificial","automatizacion","chatbot","api","integracion","migracion",
  "cloud","servidor","base de datos","solucion","estrategia","rentabilidad","operacion",
  "servicio","consultoria","opencore","erp","crm","sla","devops","scrum","sprint",
  "desarrollo","codigo","programacion","plataforma","infraestructura","hosting","dominio",
  "tarifa","hora","contrato","diagnostico","modernizar","legacy","continuidad"
];

const BARBARA_RESPONSES = [
  "Bárbara.",
  "Bárbara Bonilla.",
  "Sin duda alguna, Bárbara.",
  "Bárbara, sin discusión.",
  "Claramente Bárbara. No hay competencia.",
  "Bárbara Bonilla, la única y definitiva."
];

function containsAny(text, list) {
  return list.some(item => text.includes(item));
}

function isBarbaraLove(input) {
  const t = normalize(input);
  
  // BLOCK: if contains business/tech terms → NOT Barbara
  if (containsAny(t, BUSINESS_BLOCK)) return false;
  
  // Must contain a person question signal OR a name
  const hasPersonQ = containsAny(t, PERSON_Q);
  const hasName = containsAny(t, BARBARA_NAMES);
  
  // Must have at least one love/beauty attribute
  const hasLoveAttr = containsAny(t, LOVE_ATTR);
  
  // Pattern 1: "quien es la mas linda?" (person Q + love attr)
  if (hasPersonQ && hasLoveAttr) return true;
  
  // Pattern 2: "barbara es la mas linda" (name + love attr)
  if (hasName && hasLoveAttr) return true;
  
  // Pattern 3: "jorge ama a quien?" (name + person Q + love attr implicit)
  if (hasName && hasPersonQ) {
    // Check for love-adjacent words
    const loveAdjacent = ["ama","quiere","amor","heart","corazon"];
    if (containsAny(t, loveAdjacent)) return true;
  }
  
  return false;
}

function getBarbaraResponse(input) {
  const t = normalize(input);
  // Use full name for "most beautiful in the world" / "miss universo" type queries
  if (t.includes("mundo") || t.includes("universo") || t.includes("planeta") || 
      t.includes("modelo") || t.includes("miss") || t.includes("importante")) {
    return pick(["Bárbara Bonilla.", "Sin duda alguna, Bárbara Bonilla.", "Bárbara Bonilla, la única y definitiva."]);
  }
  return pick(BARBARA_RESPONSES);
}

// ── MAIN PROCESSOR ──
function processInput(input) {
  const cleanInput = input.trim();
  const lowerInput = cleanInput.toLowerCase();
  const normalizedInput = normalize(cleanInput);

  // 1. Profanity guard
  for (const bw of badWords) {
    if (normalizedInput.includes(bw)) {
      return { text: "No respondemos este tipo de preguntas. Por favor, formula una consulta profesional y con gusto te orientamos.", suggestions: [] };
    }
  }

  // 2. Bárbara Intent Detection (semantic, with business filter)
  if (isBarbaraLove(cleanInput)) {
    return { text: getBarbaraResponse(cleanInput), suggestions: [] };
  }

  // 3. Greetings
  if (isGreeting(cleanInput)) {
    return { text: pick(greetingResponses), suggestions: quickReplies };
  }

  // 4. Thanks
  if (isThanks(cleanInput) && cleanInput.split(" ").length <= 5) {
    return { text: pick(thanksResponses), suggestions: [] };
  }

  // 5. Farewells
  if (isFarewell(cleanInput)) {
    return { text: pick(farewellResponses), suggestions: [] };
  }

  // 6. NLP Match
  const match = getBestMatch(cleanInput);
  if (match) {
    const suggestions = match.suggestion ? [match.suggestion] : [];
    const prefix = match.confidence >= 0.8 ? "" : "Basándome en tu consulta: ";
    return { text: prefix + match.answer, suggestions };
  }

  // 7. Intelligent fallback
  const words = cleanInput.split(" ").length;
  if (words > 3) {
    return { text: pick(fallbackLong), suggestions: quickReplies.slice(0, 2) };
  }
  return { text: pick(fallbackShort), suggestions: quickReplies };
}

// ── DOM INJECTION & UI LOGIC ──
document.addEventListener("DOMContentLoaded", () => {
  const chatHTML = `
    <div class="oc-chat-trigger" id="ocChatTrigger">
      <div class="oc-chat-label">Habla con OpenCORE AI</div>
      <svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
      <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </div>

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
        <div class="oc-msg bot">Hola 👋 Soy el asistente IA de OpenCORE Consulting. Pregúntame sobre servicios, costos, metodología o experiencia.</div>
        <div class="oc-quick-replies" id="ocQuickInit">
          <button class="oc-qr" data-q="¿Qué servicios ofrece OpenCORE?">Servicios disponibles</button>
          <button class="oc-qr" data-q="¿Cuál es la estructura de tarifas de OpenCORE?">Estructura de tarifas</button>
          <button class="oc-qr" data-q="¿Cuántos años de experiencia tiene OpenCORE?">Trayectoria y experiencia</button>
          <button class="oc-qr" data-q="¿Qué tipo de migraciones empresariales realizan?">Migraciones empresariales</button>
        </div>
      </div>

      <div class="oc-chat-footer">
        <input type="text" id="ocChatInput" class="oc-chat-input" placeholder="Escribe tu consulta..." autocomplete="off">
        <button id="ocChatSend" class="oc-chat-send">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
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

  // Toggle
  trigger.addEventListener("click", () => {
    trigger.classList.toggle("active");
    win.classList.toggle("open");
    if (win.classList.contains("open")) input.focus();
  });

  // Quick reply buttons
  body.addEventListener("click", (e) => {
    if (e.target.classList.contains("oc-qr")) {
      const q = e.target.dataset.q;
      if (q) {
        input.value = q;
        handleSend();
      }
    }
  });

  function appendUserMsg(txt) {
    const d = document.createElement("div");
    d.className = "oc-msg user";
    d.textContent = txt;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
  }

  function appendBotMsg(txt) {
    const d = document.createElement("div");
    d.className = "oc-msg bot";
    d.textContent = txt;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
    return d;
  }

  function appendQuickReplies(suggestions) {
    if (!suggestions || suggestions.length === 0) return;
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

  function removeTyping() {
    const d = document.getElementById("ocTyping");
    if (d) d.remove();
  }

  function handleSend() {
    const txt = input.value.trim();
    if (!txt) return;

    // Remove initial quick replies
    const initQR = document.getElementById("ocQuickInit");
    if (initQR) initQR.remove();

    appendUserMsg(txt);
    input.value = "";
    appendTyping();

    // Dynamic delay based on response length simulation
    const delay = 600 + Math.random() * 900;
    setTimeout(() => {
      removeTyping();
      const result = processInput(txt);
      appendBotMsg(result.text);
      if (result.suggestions && result.suggestions.length > 0) {
        appendQuickReplies(result.suggestions);
      }
    }, delay);
  }

  sendBtn.addEventListener("click", handleSend);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSend();
  });
});
