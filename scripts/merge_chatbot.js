const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// 1. Get the old chatbot from git (has the 80 original Q&As)
const oldContent = execSync('git show HEAD~1:v3/js/chatbot.js', { encoding: 'utf8' });

// 2. Extract the qnaDB array from old file
const dbStartMarker = 'const qnaDB = [';
const dbStartIdx = oldContent.indexOf(dbStartMarker);
// Find the matching closing bracket
let brackets = 0;
let dbEndIdx = -1;
for (let i = dbStartIdx + dbStartMarker.length; i < oldContent.length; i++) {
    if (oldContent[i] === '[') brackets++;
    if (oldContent[i] === ']') {
        if (brackets === 0) { dbEndIdx = i + 1; break; }
        brackets--;
    }
}
const existingDBContent = oldContent.substring(dbStartIdx + dbStartMarker.length, dbEndIdx - 1);
console.log('Extracted existing DB content, length:', existingDBContent.length);

// 3. The 50 non-technical Q&As (previously added via script)
const nonTechQAs = `
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
  { q: "¿Por qué debería hablar con OpenCORE?", a: "Porque modernizar sistemas sin poner en riesgo la operación no es algo que todas las consultoras sepan hacer correctamente." }`;

// 4. The 30 NEW Q&As from latest user request
const newQAs = `
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
  { q: "¿Por qué debería confiar en ustedes?", a: "Porque trabajamos bajo contrato, con experiencia comprobada, foco en continuidad y un enfoque responsable en cada implementación." }`;

// 5. Read the current engine (without Q&A data)
const filePath = path.resolve('v3/js/chatbot.js');
const currentEngine = fs.readFileSync(filePath, 'utf8');

// 6. Build the complete qnaDB
const fullDB = 'const qnaDB = [\n' + existingDBContent + ',\n  // ── Q&A No técnicas (50) ──\n' + nonTechQAs + ',\n  // ── Q&A Adicionales (30) ──\n' + newQAs + '\n];';

// 7. Replace the empty DB placeholder in the engine
// The engine file starts with comments and then has empty/missing qnaDB
// We need to insert it after the header comment
const headerEnd = currentEngine.indexOf('*/') + 2;
const engineAfterHeader = currentEngine.substring(headerEnd);

// Find where the engine's actual code starts (after the empty/nonexistent DB)
// Look for the badWords line which is right after where qnaDB should end
const badWordsIdx = engineAfterHeader.indexOf('const badWords');
const engineCode = engineAfterHeader.substring(badWordsIdx);

const finalFile = currentEngine.substring(0, headerEnd) + '\n\n' + fullDB + '\n\n// ── PROFANITY FILTER ──\n' + engineCode.substring(engineCode.indexOf('['));

// Fix: reconstruct properly
const headerComment = currentEngine.substring(0, headerEnd);
const codeFromBadWords = currentEngine.substring(currentEngine.indexOf('const badWords'));

const output = headerComment + '\n\n' + fullDB + '\n\n' + codeFromBadWords;

fs.writeFileSync(filePath, output, 'utf8');

// Count final Q&As
const finalContent = fs.readFileSync(filePath, 'utf8');
const count = (finalContent.match(/\{ q: "/g) || []).length;
console.log('✅ Final chatbot.js rebuilt with ' + count + ' Q&As');
console.log('File size: ' + finalContent.length + ' bytes');
