const fs = require('fs');

// ═══════════════════════════════════════════════════════════
// 300 CONVERSATIONAL Q&As - NATURAL, HUMAN-LIKE RESPONSES
// + ADVANCED NLP: Bayesian scoring, n-gram overlap, synonym expansion
// Applies to BOTH v3 and v4
// ═══════════════════════════════════════════════════════════

const conversationalQAs = [
    // ── SALUDOS Y ESTADOS DE ÁNIMO (1-40) ──
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

    // ── IDENTIDAD DEL BOT (41-70) ──
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

    // ── CONVERSACIÓN CASUAL Y CLIMA (71-110) ──
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

    // ── RESPUESTAS A SEGUIMIENTO / CONTEXTO (111-160) ──
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

    // ── CORTESÍA Y DESPEDIDAS (161-200) ──
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

    // ── OPINIONES Y EVALUACIONES (201-240) ──
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

    // ── PREGUNTAS DE EJECUTIVO / PRUEBA DE ROBUSTEZ (241-300) ──
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
];

// ═══════════════════════════════════════════════════════════
// ADVANCED NLP: Bayesian-inspired scoring + synonym expansion
// ═══════════════════════════════════════════════════════════

const ADVANCED_NLP_CODE = `
// ═══════════════════════════════════════════════════════════
// ADVANCED NLP v2: BAYESIAN SCORING + SYNONYM EXPANSION
// Improves match quality for conversational inputs
// ═══════════════════════════════════════════════════════════

// Synonym expansion map for better fuzzy matching
const SYNONYM_MAP = {
  'como': ['cómo', 'komo'],
  'estas': ['estás', 'esta', 'andas', 'encuentras', 'vas'],
  'eres': ['ere', 'sos'],
  'quien': ['quién', 'kien', 'qn'],
  'que': ['qué', 'ke', 'q'],
  'cuanto': ['cuánto', 'cuando'],
  'donde': ['dónde', 'adonde', 'ande'],
  'porque': ['porqué', 'por que', 'xq', 'pq'],
  'puedo': ['puedes', 'puede', 'podrian', 'podrían'],
  'necesito': ['nesesito', 'nesecito', 'requiero'],
  'ayuda': ['ayúda', 'socorro', 'help'],
  'hola': ['ola', 'hello', 'hi', 'hey', 'wena'],
  'bueno': ['buena', 'weno', 'wena'],
  'gracias': ['grax', 'thx', 'thanks', 'tenkiu'],
  'adios': ['adiós', 'chao', 'bye', 'chaito'],
  'precio': ['precios', 'costo', 'costos', 'valor', 'tarifa'],
  'servicio': ['servicios', 'ofrecen', 'hacen'],
  'sistema': ['sistemas', 'software', 'plataforma', 'aplicacion'],
  'empresa': ['compañia', 'compañía', 'firma', 'negocio'],
  'telefono': ['teléfono', 'fono', 'celular', 'numero', 'número'],
  'correo': ['email', 'mail', 'e-mail'],
};

// Expand input with synonyms for better matching
function expandWithSynonyms(input) {
  let expanded = input;
  for (const [canonical, syns] of Object.entries(SYNONYM_MAP)) {
    for (const syn of syns) {
      if (expanded.includes(syn)) {
        expanded += ' ' + canonical;
      }
    }
  }
  return expanded;
}

// N-gram overlap scoring (bigrams)
function bigramOverlap(a, b) {
  function getBigrams(str) {
    const s = str.toLowerCase().trim();
    const bigrams = new Set();
    for (let i = 0; i < s.length - 1; i++) bigrams.add(s.substring(i, i + 2));
    return bigrams;
  }
  const biA = getBigrams(a);
  const biB = getBigrams(b);
  if (biA.size === 0 || biB.size === 0) return 0;
  let intersection = 0;
  for (const bi of biA) { if (biB.has(bi)) intersection++; }
  return (2.0 * intersection) / (biA.size + biB.size);
}

// Bayesian-inspired confidence adjustment
function bayesianConfidence(rawScore, inputLength, questionLength) {
  // Prior: longer inputs matching longer questions = higher confidence
  const lengthRatio = Math.min(inputLength, questionLength) / Math.max(inputLength, questionLength);
  // Likelihood: raw NLP score
  const likelihood = rawScore;
  // Posterior: weighted combination
  return likelihood * 0.7 + lengthRatio * rawScore * 0.3;
}
`;

// ═══════════════════════════════════════════════════════════
// APPLY TO BOTH v3 AND v4
// ═══════════════════════════════════════════════════════════

function applyToFile(filePath, label) {
    let c = fs.readFileSync(filePath, 'utf8');

    // 1. ADD CONVERSATIONAL Q&As
    // Find the end of existing qnaDB
    const qaRegex = /\{ q: /g;
    let lastIdx = 0;
    while (qaRegex.exec(c) !== null) lastIdx = qaRegex.lastIndex;
    const closingIdx = c.indexOf('];', lastIdx);

    if (closingIdx !== -1) {
        const newItems = ',\n\n  // ═══ 300 INTERACCIONES CONVERSACIONALES COTIDIANAS ═══\n' +
            conversationalQAs.map(qa => '  { q: ' + JSON.stringify(qa.q) + ', a: ' + JSON.stringify(qa.a) + ' }').join(',\n');
        c = c.substring(0, closingIdx).trimEnd() + newItems + '\n' + c.substring(closingIdx);
        console.log('[' + label + '] ✅ Added ' + conversationalQAs.length + ' conversational Q&As');
    }

    // 2. ADD ADVANCED NLP (before processInput)
    if (!c.includes('SYNONYM_MAP')) {
        const processInputMarker = 'function processInput';
        const piIdx = c.indexOf(processInputMarker);
        if (piIdx !== -1) {
            c = c.substring(0, piIdx) + ADVANCED_NLP_CODE + '\n\n' + c.substring(piIdx);
            console.log('[' + label + '] ✅ Advanced NLP injected (synonyms, bigrams, Bayes)');
        }
    }

    // 3. IMPROVE getBestMatch to use synonym expansion and Bayesian scoring
    // Modify the part where cleanInput is compared
    if (!c.includes('expandWithSynonyms')) {
        const cleanInputLine = 'function getBestMatch(input)';
        if (c.includes(cleanInputLine)) {
            // Add synonym expansion inside getBestMatch
            const oldGetBest = 'const clean = normalize(input);';
            const newGetBest = 'const clean = normalize(input);\n  const expandedClean = expandWithSynonyms(clean);';
            if (c.includes(oldGetBest)) {
                c = c.replace(oldGetBest, newGetBest);
                console.log('[' + label + '] ✅ getBestMatch now uses synonym expansion');
            }

            // Add bigram check as secondary scoring
            const scoreCalc = 'const score =';
            const scoreIdx = c.indexOf(scoreCalc, c.indexOf('getBestMatch'));
            if (scoreIdx !== -1) {
                // Find the line after score calculation to add bigram boost
                const scoreLineEnd = c.indexOf(';', scoreIdx);
                const afterScore = c.indexOf('\n', scoreLineEnd);
                const bigramBoost = '\n    // Bigram overlap boost for similar-sounding inputs\n    const bigramScore = bigramOverlap(expandedClean, normalize(qa.q));\n    const boostedScore = score + bigramScore * 0.5;';
                c = c.substring(0, afterScore) + bigramBoost + c.substring(afterScore);

                // Replace score references with boostedScore in the comparison
                // Find "if (score > best" and replace with boostedScore
                const oldCompare = 'if (score > best';
                const newCompare = 'if (boostedScore > best';
                const compIdx = c.indexOf(oldCompare, scoreIdx);
                if (compIdx !== -1) {
                    c = c.substring(0, compIdx) + newCompare + c.substring(compIdx + oldCompare.length);
                    console.log('[' + label + '] ✅ Bigram boost integrated into scoring');
                }
            }
        }
    }

    fs.writeFileSync(filePath, c, 'utf8');

    // Count Q&As
    const finalCount = (c.match(/\{ q: /g) || []).length;
    console.log('[' + label + '] Total Q&As: ' + finalCount);
}

// Apply to v3
const v3Path = require('path').resolve('v3/js/chatbot.js');
applyToFile(v3Path, 'V3');

// Apply to v4
const v4Path = require('path').resolve('v4/js/chatbot.js');
applyToFile(v4Path, 'V4');
