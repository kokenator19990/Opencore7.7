const fs = require('fs');

const rawText = `
¿Sus soluciones son realmente de calidad?
Nuestras soluciones siguen estándares empresariales y están respaldadas por más de 15 años de experiencia en entornos críticos. Priorizamos estabilidad y sostenibilidad técnica sobre soluciones improvisadas.

¿Son de nivel internacional?
Trabajamos bajo estándares comparables a consultoría tecnológica internacional, especialmente en arquitectura empresarial y modernización estructural.

¿Son intuitivas sus plataformas?
Diseñamos soluciones con enfoque funcional y claridad operativa. La usabilidad es parte estructural del desarrollo, no un agregado posterior.

¿Son realmente buenas?
Nuestros proyectos están orientados a resolver problemas estructurales, no superficiales. La calidad se mide por estabilidad, continuidad y resultados sostenibles.

¿Pero funcionan de verdad?
Sí. Trabajamos principalmente en entornos donde la continuidad operacional es crítica, por lo que cada implementación es validada técnicamente antes de su despliegue.

No quiero algo experimental, ¿ustedes son serios?
Nuestra firma tiene enfoque conservador y estructural. No implementamos soluciones experimentales en entornos empresariales críticos.

¿Tienen experiencia real o solo teoría?
Nuestra experiencia proviene de proyectos ejecutados en empresas con operaciones activas y sistemas complejos en funcionamiento.

¿Qué los diferencia de otras empresas?
Nuestra especialidad es intervenir sistemas existentes complejos y estabilizarlos estructuralmente, no solo desarrollar desde cero.

¿Son caros?
El valor depende del alcance y complejidad. Nuestra propuesta está alineada con consultoría tecnológica senior, no con desarrollo básico.

¿Son económicos?
Más que económicos, buscamos que la inversión sea proporcional al impacto estructural y operativo que generamos.

No entiendo bien qué hacen…
Nos especializamos en modernizar, integrar y estabilizar sistemas empresariales para que operen de forma eficiente y sostenible.

¿Pueden trabajar con lo que ya tengo?
Sí. Gran parte de nuestro trabajo consiste en integrar o mejorar arquitecturas ya existentes sin necesidad de reemplazo total.

¿Reemplazan sistemas antiguos?
Podemos modernizarlos progresivamente o rediseñar su arquitectura según evaluación técnica.

¿Y si mi sistema es muy complejo?
Precisamente trabajamos con entornos complejos. Nuestro enfoque es estructural y progresivo.

No quiero cambiar todo…
No es necesario. Muchas veces implementamos mejoras modulares sin alterar completamente la operación actual.

¿Trabajan con empresas pequeñas?
Sí, siempre que exista una necesidad tecnológica estructural clara y un compromiso de mejora progresiva.

¿Solo trabajan con empresas grandes?
Nuestra especialidad está en entornos medianos y grandes, pero evaluamos cada caso según su complejidad.

¿Son rápidos?
Priorizamos precisión sobre velocidad. Sin embargo, trabajamos con cronogramas definidos y metodologías estructuradas.

¿Cuánto se demoran en responder?
Mantenemos tiempos de respuesta acordes a estándares profesionales y compromisos contractuales.

No quiero algo que falle…
La estabilidad es uno de nuestros pilares. Diseñamos soluciones robustas antes que soluciones apresuradas.

¿Qué pasa si el proyecto falla?
Nuestra metodología incluye validaciones progresivas para minimizar riesgos antes de cualquier despliegue completo.

¿Tienen garantía?
Todos los proyectos se formalizan contractualmente y contemplan etapas de validación y soporte.

¿Pueden mejorar lo que tengo sin romperlo?
Sí. Trabajamos con intervención controlada y arquitectura modular.

No quiero depender siempre de ustedes…
Diseñamos sistemas documentados y sostenibles, evitando dependencias innecesarias.

¿Son confiables?
Nuestra trayectoria y enfoque estructural están orientados precisamente a generar confianza operativa.

¿Tienen respaldo técnico real?
Sí. Nuestro equipo combina dirección ejecutiva con desarrollo técnico de alto nivel.

¿Y si mi equipo interno no coopera?
Podemos trabajar como oficina técnica complementaria o arquitectos externos según sea necesario.

¿Trabajan bajo contrato formal?
Sí, siempre operamos bajo acuerdos formales y definidos.

¿Hacen mantenimiento también?
Sí, bajo modalidad mensual desde 30 UF, sujeto a evaluación.

No sé si mi empresa está lista…
Podemos realizar un diagnóstico inicial para determinar nivel de madurez tecnológica.

¿Son innovadores?
Implementamos innovación cuando aporta valor estructural, no como tendencia pasajera.

¿Trabajan con ERP específicos?
Evaluamos cada ERP según su arquitectura y posibilidades de integración.

¿Pueden integrar múltiples sistemas?
Sí, diseñamos interoperabilidad controlada entre plataformas empresariales.

¿Son muy técnicos?
Somos técnicamente sólidos, pero traducimos soluciones a lenguaje de negocio.

No quiero que mi operación se detenga…
Planificamos migraciones progresivas para evitar interrupciones críticas.

¿Trabajan remoto?
Sí, según requerimiento y naturaleza del proyecto.

¿Trabajan presencial?
Cuando la criticidad lo requiere, sí.

¿Son flexibles?
Adaptamos soluciones, no principios estructurales.

¿Son estrictos?
En arquitectura crítica, sí.

¿Pueden escalar el sistema?
Diseñamos pensando en crecimiento futuro.

¿Qué tan seguros son sus desarrollos?
Aplicamos prácticas de seguridad estructural.

¿Cumplen normativas?
Trabajamos bajo estándares empresariales.

¿Documentan lo que hacen?
Sí, es parte esencial del proceso.

¿Hacen auditorías técnicas?
Sí, como parte del diagnóstico.

¿Pueden reducir costos operativos?
Frecuentemente, mediante optimización estructural.

¿Me ayudarán a ordenar mi sistema?
Ese es uno de nuestros principales enfoques.

¿Trabajan por etapas?
Sí, implementación progresiva.

¿Pueden integrarse con mi contabilidad?
Sí, mediante arquitectura multimoneda e integración contable.

¿Son transparentes con precios?
Siempre sujetos a evaluación formal.

¿Hacen acompañamiento estratégico?
Sí, bajo modalidad mensual desde 30 UF.

¿Pueden trabajar con bases grandes?
Sí, optimizamos rendimiento backend.

¿Trabajan con datos sensibles?
Sí, bajo protocolos de confidencialidad.

¿Hacen planificación tecnológica?
Sí, definimos roadmap estratégico.

¿Pueden rescatar un proyecto fallido?
Es una de nuestras especialidades.

¿Son especialistas o generalistas?
Somos especialistas en arquitectura empresarial.

¿Trabajan con automatización?
Sí, procesos administrativos y financieros.

¿Se adaptan a nuestro presupuesto?
Evaluamos alcance para estructurar propuesta viable.

¿Son solo desarrolladores?
Somos consultoría estratégica con ejecución técnica.

¿Qué pasa después del proyecto?
Podemos ofrecer continuidad operacional.

¿Me conviene trabajar con ustedes?
Depende del nivel estructural de su necesidad tecnológica.

¿Por qué debería confiar en ustedes y no en otra empresa?
La confianza se construye con experiencia verificable y enfoque estructural. Nuestra trayectoria en entornos críticos respalda nuestra metodología.

¿Me garantizan que no habrá errores?
Ningún sistema complejo está exento de ajustes, pero minimizamos riesgos mediante validaciones técnicas progresivas.

¿Son mejores que [empresa grande]?
Cada firma tiene su enfoque. Nosotros nos especializamos en arquitectura estructural y modernización de sistemas complejos.

¿Cuántos clientes tienen exactamente?
Operamos bajo confidencialidad contractual, por lo que no divulgamos cifras específicas públicamente.

Dígame un cliente importante que tengan.
Por política de confidencialidad, no revelamos nombres sin autorización formal.

¿Si fallo con ustedes quién responde?
Todos los proyectos se formalizan contractualmente con responsabilidades definidas y etapas de validación.

¿Pueden hacer lo mismo que SAP o Oracle?
No somos un proveedor de software masivo; somos consultoría estratégica que integra y optimiza soluciones empresariales.

¿Son solo intermediarios?
No. Diseñamos y ejecutamos arquitectura tecnológica directamente.

¿Cuánto dinero han facturado este año?
Esa información es interna. Nuestro enfoque está en la calidad técnica de cada proyecto.

¿Qué pasa si no quedo satisfecho?
Trabajamos con hitos de validación progresivos para asegurar alineación antes de cada fase crítica.

¿Pueden hacerlo más barato que la competencia?
Evaluamos alcance y complejidad antes de estimar valores. La prioridad es sostenibilidad, no reducción artificial de costos.

¿Son una empresa pequeña?
Somos una firma especializada, con enfoque senior y estructura ejecutiva definida.

¿Y si desaparecen mañana?
Trabajamos con documentación técnica estructurada y contratos formales que resguardan continuidad.

¿Pueden trabajar gratis para probar?
Realizamos diagnósticos preliminares, pero la ejecución técnica profesional requiere formalización contractual.

¿Prometen resultados?
Prometemos metodología estructurada y ejecución profesional. Los resultados dependen también del entorno operativo del cliente.

¿Pueden duplicar mi productividad en un mes?
La mejora estructural es progresiva y medible; evitamos promesas irreales.

¿Son los mejores del mercado?
Nos posicionamos como especialistas en arquitectura empresarial y modernización estructural.

¿Cuántos desarrolladores tienen?
Operamos con estructura estratégica y técnica flexible según requerimiento del proyecto.

¿Trabajan 24/7?
Definimos disponibilidad según modalidad contractual y criticidad del sistema.

¿Qué pasa si mi equipo no colabora?
Podemos actuar como oficina técnica externa con autonomía operativa definida.

¿Han tenido proyectos que fracasaron?
Todo entorno tecnológico presenta desafíos; nuestra metodología busca minimizar y corregir oportunamente cualquier desviación.

¿Qué los hace diferentes realmente?
Nuestro foco está en intervenir arquitecturas existentes complejas y estabilizarlas estructuralmente.

¿Son demasiado técnicos para mi empresa?
Traducimos arquitectura compleja en soluciones operativas comprensibles para dirección ejecutiva.

¿Me pueden asegurar ROI?
El retorno depende de múltiples variables operativas; diseñamos soluciones orientadas a eficiencia estructural.

¿Pueden hackear sistemas?
No realizamos actividades fuera del marco legal ni ético. Nuestra labor es arquitectura y modernización empresarial.

¿Son solo consultores que hablan mucho?
Nuestra consultoría incluye ejecución técnica concreta.

¿Pueden hacerlo todo?
Nos enfocamos en lo que dominamos: arquitectura empresarial y modernización estructural.

¿Y si el proyecto se extiende más de lo previsto?
Definimos alcance formal y gestión de cambios para evitar desviaciones descontroladas.

¿Pueden copiar el sistema de otra empresa?
Diseñamos soluciones adaptadas, no replicamos arquitecturas sin evaluación.

¿Ustedes hacen IA también?
Evaluamos integración de inteligencia artificial cuando aporta valor estructural real.

¿Pueden darme acceso total a su código?
La propiedad intelectual y condiciones se definen contractualmente.

¿Cuánto ganan ustedes por proyecto?
Esa información es interna; lo relevante es el valor estructural entregado.

¿Pueden trabajar sin contrato?
No. Toda intervención profesional requiere formalización.

¿Pueden garantizar cero interrupciones?
Planificamos migraciones progresivas para minimizar impacto operativo.

¿Son una startup?
Somos una consultora con más de 15 años de trayectoria.

¿Qué pasa si no entiendo lo técnico?
Traducimos cada etapa a impacto operativo y financiero.

¿Son muy caros para Chile?
Nuestros valores están alineados a consultoría tecnológica senior.

¿Pueden trabajar con presupuesto limitado?
Podemos estructurar fases progresivas según alcance.

¿Prometen seguridad absoluta?
Implementamos buenas prácticas de seguridad estructural, aunque ningún sistema es absolutamente invulnerable.

¿Me pueden hacer algo rápido en una semana?
Depende del alcance técnico; evaluamos antes de comprometer plazos.

¿Qué pasa si cambio de opinión?
El alcance y condiciones se establecen formalmente antes de iniciar ejecución.

¿Son solo dos personas?
El liderazgo es ejecutivo, y la ejecución se estructura según complejidad del proyecto.

¿Pueden competir con grandes multinacionales?
Nuestra especialización nos permite intervenir con foco y profundidad en arquitectura empresarial.

¿Me pueden hacer descuento especial?
Evaluamos propuestas según alcance y modalidad contractual.

¿Qué tan seguros son sus servidores?
Aplicamos prácticas estándar de seguridad según arquitectura definida.

¿Pueden mentir para cerrar trato?
Nuestra política es transparencia técnica y contractual.

¿Me pueden prometer que no necesitaré más inversión?
La evolución tecnológica requiere planificación progresiva.

¿Son mejores que freelancers?
Operamos con enfoque estructural, contractual y de arquitectura empresarial.

¿Pueden hacer lo mismo más rápido que todos?
Priorizamos precisión y estabilidad antes que velocidad apresurada.

¿Qué pasa si quiero cancelar?
Las condiciones contractuales establecen escenarios de término anticipado.

¿Tienen respaldo financiero?
Operamos bajo estructura empresarial formal y contratos definidos.

¿Son realmente expertos o solo dicen eso?
Nuestra experiencia está basada en ejecución de proyectos reales en entornos operativos.

¿Pueden improvisar si algo sale mal?
Actuamos bajo metodología estructurada, no improvisación.

¿Son demasiado formales?
La formalidad es parte de la seguridad operativa en entornos críticos.

¿Me pueden garantizar que será el mejor sistema que exista?
Garantizamos adecuación estructural a su necesidad, no comparaciones absolutas.

¿Pueden hacer algo que nadie más pueda hacer?
Nos especializamos en modernización estructural y rescate tecnológico complejo.

¿Son solo marketing?
Nuestra base es técnica y contractual, no publicitaria.

¿Qué pasa si la tecnología cambia?
Diseñamos arquitecturas escalables y adaptables a evolución tecnológica.

¿Pueden trabajar sin documentación?
La documentación es parte obligatoria de nuestra metodología.

¿Y si quiero probarlos solo para ver qué hacen?
Podemos realizar un diagnóstico exploratorio para definir alcance real.

¿Cuántas personas trabajan en OpenCORE?
OpenCORE está liderado por ejecutivos con experiencia en tecnología y negocio. Contamos con un núcleo estable de entre 5 y 10 profesionales, ampliable según el proyecto.

¿Son una empresa pequeña?
Somos una firma especializada con estructura ejecutiva definida y equipo técnico estable. Nuestra capacidad se dimensiona según la complejidad del proyecto.

¿Cuántos profesionales tiene el equipo técnico?
Mantenemos un equipo base permanente y ampliamos capacidades hasta 20 o 30 profesionales según alcance y tipo de cliente.

¿Cómo está conformado su equipo?
Nuestro equipo combina liderazgo ejecutivo, arquitectura tecnológica, desarrollo técnico e integración empresarial.

¿Tienen experiencia real en su equipo?
Sí. El equipo está compuesto por profesionales con experiencia en modernización tecnológica y proyectos empresariales críticos.

¿El equipo es fijo o variable?
Contamos con un núcleo estable y una red ampliable que se activa según los requerimientos técnicos del proyecto.

¿Pueden manejar proyectos grandes con ese equipo?
Sí. Nuestra estructura es escalable y se ajusta proporcionalmente a la complejidad y extensión del proyecto.

¿Son solo unos pocos profesionales?
Tenemos un núcleo técnico consolidado y la capacidad de escalar con especialistas adicionales cuando el proyecto lo requiere.

¿Trabajan con personal interno o externo?
Operamos con un equipo base permanente y especialistas adicionales coordinados bajo dirección técnica centralizada.

¿Cuántos desarrolladores tienen actualmente?
El número varía según proyecto activo. La estructura se adapta dinámicamente al alcance técnico definido.

¿Qué tipo de perfiles conforman el equipo?
Trabajamos con arquitectos de software, desarrolladores senior, especialistas en bases de datos e integración empresarial.

¿Tienen ingenieros especializados?
Sí. El equipo incluye profesionales con trayectoria en entornos tecnológicos empresariales complejos.

¿Pueden aumentar el equipo si el proyecto crece?
Sí. Nuestra estructura permite escalar de manera controlada según el tipo de intervención requerida.

¿Cómo aseguran calidad si el equipo varía?
La dirección ejecutiva y técnica centraliza la supervisión, asegurando estándares homogéneos en cada fase.

¿Cuántos años de experiencia tiene el equipo?
El liderazgo y el equipo técnico acumulan más de 15 años de experiencia en consultoría tecnológica empresarial.

¿El equipo trabaja tiempo completo en los proyectos?
El núcleo principal sí. Los recursos adicionales se asignan según criticidad y cronograma.

¿Tienen especialistas por área?
Sí. Podemos integrar especialistas en arquitectura, integración ERP, automatización y bases de datos según necesidad.

¿Cómo gestionan equipos grandes en proyectos complejos?
Dimensionamos recursos de manera proporcional al alcance técnico, manteniendo supervisión ejecutiva constante.

¿Qué garantiza que el equipo sea competente?
Nuestra estructura combina liderazgo estratégico con ejecución técnica especializada y experiencia comprobada.

¿Depende mucho el proyecto de una sola persona?
No. Operamos con estructura colaborativa y supervisión técnica centralizada para asegurar continuidad.
`;

const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

let qnas = [];
for (let i = 0; i < lines.length; i += 2) {
    if (i + 1 < lines.length) {
        qnas.push("  { q: " + JSON.stringify(lines[i]) + ", a: " + JSON.stringify(lines[i + 1]) + " }");
    }
}

const injectBlock = "\n  // ═══ PREGUNTAS INSTITUCIONALES / CONFIANZA / EQUIPO (Nuevas) ═══\n" + qnas.join(",\n") + "\n";

function inject(path) {
    let content = require('fs').readFileSync(path, 'utf8');
    const marker = '// ═══ PREGUNTAS TÍPICAS ADICIONALES ═══';
    let idx = content.indexOf(marker);
    if (idx !== -1) {
        content = content.substring(0, idx) + injectBlock + content.substring(idx);
        require('fs').writeFileSync(path, content, 'utf8');
        console.log('Injected ' + qnas.length + ' questions into ' + path);
    } else {
        console.log('Error finding marker in ' + path);
    }
}

inject('c:/Users/coook/Desktop/Opencore Web7.0/v3/js/chatbot.js');
inject('c:/Users/coook/Desktop/Opencore Web7.0/v4/js/chatbot.js');
