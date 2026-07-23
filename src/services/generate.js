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
    context.activeModules
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

      duration_days:
        context.durationDays,

      flags:
        context.flags
    }
  };
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
