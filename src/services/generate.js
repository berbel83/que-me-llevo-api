import { detectModules } from "../rules/moduleDetector.js";
import { buildKnowledge } from "../knowledge/index.js";
import { applyQuantityRules } from "../rules/quantities.js";
import {
  sanitizeCategories,
  sanitizeLeaveHome,
  dedupeVerifications
} from "../rules/safety.js";

export async function handleGenerate(body, env) {
  const trip = body.trip || "";
  const analysis = body.analysis || {};
  const answers = body.answers || {};

  if (!trip) {
    throw new Error("Falta la descripción del viaje.");
  }

  // ======================================================
  // 1. DETECTAR CONTEXTO Y MÓDULOS
  // ======================================================

  const context = detectModules(
    trip,
    analysis,
    answers
  );

  // ======================================================
  // 2. CONSTRUIR CONOCIMIENTO
  // ======================================================

  const knowledge = buildKnowledge(
  context.activeModules,
  context.activityModules || []
);

  // ======================================================
  // 3. APLICAR CANTIDADES
  // ======================================================

  const quantifiedItems =
    applyQuantityRules(
      knowledge.items,
      {
        context
      }
    );

  // ======================================================
  // 4. AGRUPAR EN CATEGORÍAS
  // ======================================================

  const rawCategories =
    groupIntoCategories(
      quantifiedItems
    );

  // ======================================================
  // 5. LIMPIEZA Y SEGURIDAD
  // ======================================================

  const categories =
    sanitizeCategories(
      rawCategories
    );

  const verificationNeeded =
    dedupeVerifications([
      ...(analysis.verification_needed || []),
      ...(knowledge.verifications || [])
    ]);

  // ======================================================
  // 6. GENERAR PRESENTACIÓN LOCAL
  // ======================================================

  const presentation =
    buildPresentation(
      trip,
      analysis,
      context
    );

  // ======================================================
  // 7. RESPUESTA FINAL
  // ======================================================

  return {
    title:
      presentation.title,

    intro:
      presentation.intro,

    packing_strategy:
      presentation.packing_strategy,

    verification_needed:
      verificationNeeded,

    categories,

    discoveries:
      buildDiscoveries(context),

    leave_home:
      sanitizeLeaveHome(
        buildLeaveHome(context)
      ),

    intelligence: {
      source:
        "local_engine",

      ai_used: false,

      active_modules:
        context.activeModules,

activity_modules:
  context.activityModules || [],
      
      duration_days:
        context.durationDays,

      travellers:
        context.travellers,

      child_ages:
        context.childAges,

      flags:
        context.flags
    }
  };
}


// ======================================================
// DESCUBRIMIENTOS ÚTILES CON POTENCIAL DE AFILIACIÓN
// ======================================================

function buildDiscoveries(context) {
  const modules = new Set(context.activeModules || []);
  const candidates = [];
  const add = (name, hook, searchQuery) => {
    if (!candidates.some(item => item.name === name)) {
      candidates.push({ name, hook, search_query: searchQuery });
    }
  };

  if (modules.has("bebe")) {
    add("Persiana opaca portátil", "Puede ayudar a mantener la rutina de sueño del bebé aunque la habitación no oscurezca bien.", "persiana opaca portátil viaje bebé");
    add("Organizador para carrito", "Deja a mano biberón, toallitas y pequeños objetos sin rebuscar en la maleta.", "organizador universal carrito bebé viaje");
  }
  if (modules.has("playa")) {
    add("Bolsa que deja escapar la arena", "Una solución sencilla para no llevar media playa de vuelta al alojamiento.", "bolsa playa malla anti arena");
    add("Funda impermeable flotante para móvil", "Protege el teléfono y permite tenerlo localizado cerca del agua.", "funda móvil impermeable flotante playa");
  }
  if (modules.has("camping")) {
    add("Linterna recargable multifunción", "Ilumina la zona y algunos modelos también sirven como batería de emergencia.", "linterna camping recargable power bank");
    add("Ducha solar compacta", "Puede resolver la higiene y el aclarado cuando la parcela queda lejos de las duchas.", "ducha solar portátil camping");
  }
  if (modules.has("nieve")) {
    add("Secador portátil para botas y guantes", "Evita comenzar el día siguiente con el material todavía húmedo.", "secador portátil botas guantes esquí");
    add("Correa anticaída para el móvil", "Reduce el riesgo de perder el teléfono al usarlo con guantes o en un remonte.", "correa seguridad móvil esquí");
  }
  if (modules.has("peregrinacion_camino")) {
    add("Tendedero ultraligero de viaje", "Permite lavar pocas prendas y reutilizarlas sin llenar la mochila.", "tendedero viaje ultraligero camping");
    add("Kit específico para ampollas", "Ocupa muy poco y puede salvar una etapa si aparecen rozaduras.", "kit ampollas senderismo camino santiago");
  }
  if (modules.has("equipaje_cabina") || modules.has("avion")) {
    add("Báscula digital de equipaje", "Evita descubrir en el aeropuerto que la maleta supera el peso permitido.", "báscula digital maleta viaje");
    add("Organizadores de compresión", "Reducen volumen y ayudan a aprovechar mejor una maleta pequeña.", "organizadores compresión maleta viaje");
  }
  if (modules.has("viaje_internacional")) {
    add("Adaptador universal con USB-C", "Un solo accesorio puede cargar varios dispositivos en países diferentes.", "adaptador universal viaje USB C");
    add("Cartera de viaje antirrobo", "Mantiene documentación y tarjetas agrupadas y menos expuestas durante traslados.", "cartera viaje antirrobo pasaporte");
  }
  if (modules.has("viaje_trabajo")) {
    add("Cargador compacto multidispositivo", "Puede sustituir varios cargadores y liberar espacio en un viaje corto.", "cargador GaN USB C multidispositivo viaje");
    add("Organizador de cables y accesorios", "Evita perder tiempo buscando adaptadores, memorias o cargadores antes de una reunión.", "organizador cables viaje tecnología");
  }
  if (modules.has("crucero")) {
    add("Organizador colgante para camarote", "Aprovecha puertas y paredes para ordenar un espacio que suele ser pequeño.", "organizador colgante camarote crucero");
    add("Portatarjetas para crucero", "Mantiene accesible la tarjeta que se utiliza continuamente a bordo.", "portatarjetas cordón crucero");
  }
  if (modules.has("autocaravana_caravana")) {
    add("Calzos niveladores", "Evitan dormir inclinado y ayudan a estabilizar el vehículo en la parcela.", "calzos niveladores autocaravana");
    add("Organizadores antideslizantes", "Reducen movimientos, golpes y ruidos de objetos durante la marcha.", "organizador antideslizante autocaravana");
  }
  if (modules.has("road_trip")) {
    add("Organizador para respaldos", "Mantiene agua, juguetes y pequeños objetos accesibles durante etapas largas.", "organizador respaldo coche viaje");
    add("Nevera portátil compacta", "Permite llevar agua y tentempiés sin depender de cada parada.", "nevera portátil coche compacta");
  }
  if (modules.has("mascotas")) {
    add("Bebedero portátil para mascotas", "Permite ofrecer agua en paradas y excursiones sin cargar un cuenco rígido.", "bebedero portátil perro viaje");
    add("Protector impermeable para asiento", "Facilita limpiar pelo, arena o humedad después de los desplazamientos.", "protector asiento coche perro impermeable");
  }
  if (modules.has("vuelo_largo")) {
    add("Almohada cervical compacta", "Puede mejorar el apoyo durante muchas horas sin ocupar media maleta.", "almohada cervical viaje compacta");
    add("Reposapiés de avión", "Algunas personas descansan mejor al poder cambiar el apoyo de las piernas.", "reposapiés avión portátil");
  }
  if (modules.has("tropical_mosquitos")) {
    add("Mosquitera ultraligera de viaje", "Añade protección al dormir si el alojamiento no dispone de mosquitera.", "mosquitera viaje ultraligera");
    add("Bolsa estanca compacta", "Protege documentación y electrónica de humedad y lluvias intensas.", "bolsa estanca viaje compacta");
  }
  if (modules.has("festival")) {
    add("Tapones para conciertos", "Reducen la intensidad sonora sin aislarte completamente de la música.", "tapones oidos conciertos reutilizables");
    add("Poncho de bolsillo reutilizable", "Ocupa muy poco y puede salvar el día si cambia el tiempo.", "poncho lluvia festival reutilizable");
  }
  if (modules.has("boda_evento")) {
    add("Kit antimanchas de viaje", "Puede resolver un pequeño accidente justo antes o durante el evento.", "kit quitamanchas viaje ropa");
    add("Vaporizador compacto", "Ayuda a recuperar ropa arrugada después de transportarla en la maleta.", "vaporizador ropa viaje compacto");
  }
  if (modules.has("cicloturismo")) {
    add("Multiherramienta para bicicleta", "Resuelve pequeños ajustes sin depender de encontrar un taller.", "multiherramienta bicicleta compacta");
    add("Bolsas impermeables para bicicleta", "Protegen ropa y electrónica sin cargar todo el peso sobre la espalda.", "bolsas bicicleta impermeables cicloturismo");
  }
  if (modules.has("accesibilidad")) {
    add("Bolsa organizadora accesible", "Mantiene medicación, documentos y pequeños objetos siempre al alcance.", "bolsa organizadora silla ruedas viaje");
  }
  if (modules.has("adolescentes")) {
    add("Organizador tecnológico individual", "Evita mezclar cargadores y auriculares cuando viajan varios dispositivos.", "organizador cables viaje tecnología");
  }
  if (modules.has("ninos_4_7") || modules.has("ninos_8_12") || modules.has("ninos_generico")) {
    add("Pulsera identificativa reutilizable", "Puede incluir un teléfono de contacto sin depender de que el niño lo recuerde.", "pulsera identificativa niños viaje teléfono");
  }

  const evergreen = [
    ["Localizador para maleta o mochila", "Ayuda a localizar el equipaje si se separa de ti durante un traslado.", "localizador bluetooth maleta viaje"],
    ["Báscula digital de equipaje", "Evita sorpresas de peso antes de facturar o volver a casa.", "báscula digital maleta viaje"],
    ["Mochila plegable ultraligera", "Se guarda en muy poco espacio y resulta útil para excursiones, compras o equipaje extra de vuelta.", "mochila plegable ultraligera viaje"]
  ];
  for (const [name, hook, searchQuery] of evergreen) {
    if (candidates.length >= 3) break;
    add(name, hook, searchQuery);
  }

  return candidates.slice(0, 3);
}


// ======================================================
// AGRUPAR OBJETOS EN CATEGORÍAS
// ======================================================

function groupIntoCategories(items) {
  const categoryMap =
    new Map();

  for (const item of items) {
    const categoryName =
      item.category ||
      "Otros";

    if (
      !categoryMap.has(
        categoryName
      )
    ) {
      categoryMap.set(
        categoryName,
        []
      );
    }

    categoryMap
      .get(categoryName)
      .push(item);
  }

  return Array.from(
    categoryMap.entries()
  ).map(
    ([name, items]) => ({
      name,

      items: items.map(
        item => ({
          id: item.id,

          name: item.name,

          priority:
            item.priority ||
            "recommended",

          why:
            item.why || "",

          product_candidate:
            Boolean(
              item.product_candidate
            ),

          source_module:
            item.source_module
        })
      )
    })
  );
}


// ======================================================
// PRESENTACIÓN
// ======================================================

function buildPresentation(
  trip,
  analysis,
  context
) {
  const destination =
    analysis
      ?.trip_profile
      ?.destination_or_experience ||
    detectSimpleDestination(trip) ||
    "tu viaje";

  const duration =
    context.durationDays
      ? `${context.durationDays} días`
      : "";

  const isCamino =
    context.activeModules.includes(
      "peregrinacion_camino"
    );

  const isThemePark =
    context.activeModules.includes(
      "parque_tematico"
    );

  const isCamping =
    context.activeModules.includes(
      "camping"
    );

  let title =
    `Lista de equipaje para ${destination}`;

  let intro =
    duration
      ? `Prepara lo necesario para ${duration} en ${destination}, con una lista adaptada a las características de tu viaje.`
      : `Prepara lo necesario para ${destination} con una lista adaptada a las características de tu viaje.`;

  const packingStrategy = [];

  if (isCamino) {
    title =
      `Packing List para ${destination}`;

    intro =
      duration
        ? `Prepara tu equipaje para ${duration} de Camino, priorizando comodidad, poco peso y artículos realmente útiles durante las etapas.`
        : `Prepara tu equipaje para el Camino, priorizando comodidad, poco peso y artículos realmente útiles durante las etapas.`;

    packingStrategy.push(
      "Prioriza poco peso y evita duplicar prendas o accesorios."
    );

    packingStrategy.push(
      "Usa ropa cómoda, transpirable y adecuada para caminar varios días consecutivos."
    );
  }

  if (isThemePark) {
    intro =
      duration
        ? `Prepara el equipaje para ${duration} en ${destination}, pensando en jornadas largas, comodidad y cambios de tiempo.`
        : `Prepara el equipaje para ${destination}, pensando en jornadas largas, comodidad y cambios de tiempo.`;

    packingStrategy.push(
      "Prioriza ropa cómoda y calzado adecuado para pasar muchas horas caminando."
    );

    packingStrategy.push(
      "Lleva en la mochila diaria solo lo necesario para evitar cargar peso durante toda la jornada."
    );
  }

  if (isCamping) {
    packingStrategy.push(
      "Organiza por separado el material de descanso, higiene y uso diario."
    );
  }

  if (
    context.flags.frequentLaundry
  ) {
    packingStrategy.push(
      "Aprovecha la posibilidad de lavar para reducir la cantidad de ropa."
    );
  }

  if (
    context.flags.ownBackpack
  ) {
    packingStrategy.push(
      "Cada objeto debe justificar su peso porque transportarás personalmente el equipaje."
    );
  }

  if (
    context.flags.cabinOnly
  ) {
    packingStrategy.push(
      "Prioriza prendas combinables y formatos compactos para aprovechar el equipaje de cabina."
    );
  }

  if (
    context.flags.hasChildren
  ) {
    packingStrategy.push(
      "Mantén accesibles los artículos infantiles que puedan necesitarse durante el día."
    );
  }

  if (
    packingStrategy.length === 0
  ) {
    packingStrategy.push(
      "Prioriza artículos útiles y versátiles evitando duplicados innecesarios."
    );

    packingStrategy.push(
      "Ajusta las cantidades a la duración y a la posibilidad de lavar durante el viaje."
    );
  }

  return {
    title,

    intro,

    packing_strategy:
      packingStrategy.slice(
        0,
        4
      )
  };
}


// ======================================================
// COSAS QUE PUEDEN QUEDARSE EN CASA
// ======================================================

function buildLeaveHome(context) {
  const items = [];

  if (
    context.flags.ownBackpack
  ) {
    items.push({
      name:
        "Prendas y objetos duplicados que no tengan un uso claro",

      why:
        "Cada objeto innecesario aumenta el peso que tendrás que transportar."
    });
  }

  if (
    context.flags.cabinOnly
  ) {
    items.push({
      name:
        "Envases grandes que puedan sustituirse por formatos de viaje",

      why:
        "Ocupan espacio innecesario y pueden estar sujetos a restricciones de transporte."
    });
  }

  return items;
}


// ======================================================
// DESTINO SIMPLE DE RESPALDO
// ======================================================

function detectSimpleDestination(
  trip
) {
  const text =
    String(trip || "");

  const known = [
    {
      match:
        /camino de santiago/i,

      name:
        "el Camino de Santiago"
    },

    {
      match:
        /disneyland\s*(par[ií]s)?/i,

      name:
        "Disneyland París"
    },

    {
      match:
        /port\s?aventura/i,

      name:
        "PortAventura"
    }
  ];

  for (const item of known) {
    if (
      item.match.test(text)
    ) {
      return item.name;
    }
  }

  return "";
}
