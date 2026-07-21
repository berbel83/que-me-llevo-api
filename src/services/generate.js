import { callGroq } from "./groq.js";
import { detectModules } from "../rules/moduleDetector.js";
import { buildKnowledge } from "../knowledge/index.js";
import { applyQuantityRules } from "../rules/quantities.js";
import {
  sanitizeCategories,
  sanitizeLeaveHome,
  dedupeVerifications
} from "../rules/safety.js";


export async function handleGenerate(body, env) {
  const trip = body.trip;
  const analysis = body.analysis;
  const answers = body.answers || {};

  if (!trip || !analysis) {
    throw new Error("Faltan datos del viaje.");
  }

  // ====================================================
  // 1. DETECTAR CONTEXTO Y MÓDULOS
  // ====================================================

  const context = detectModules(
    trip,
    analysis,
    answers
  );

  // ====================================================
  // 2. CONSTRUIR BASE DE CONOCIMIENTO
  // ====================================================

  const knowledge = buildKnowledge(
    context.activeModules
  );

  // ====================================================
  // 3. APLICAR REGLAS DE CANTIDADES
  // ====================================================

  const preparedItems = applyQuantityRules(
    knowledge.items,
    {
      trip,
      analysis,
      answers,
      context
    }
  );

  // ====================================================
  // 4. PEDIR A GROQ PERSONALIZACIÓN Y COMPLETITUD
  // ====================================================

  const systemPrompt = `
Eres el motor final de equipaje de "¿Qué me llevo?", una aplicación de TravelApps.

Tu trabajo NO es inventar una lista desde cero.

El sistema ya ha analizado el viaje y ha construido una BASE DE CONOCIMIENTO con objetos recomendados.

Debes:

1. Mantener todos los objetos importantes recibidos.
2. Adaptar las explicaciones al viaje concreto.
3. Añadir objetos SOLO si detectas una carencia clara.
4. Eliminar duplicados reales.
5. Organizar los objetos en categorías claras.
6. Mantener cantidades concretas cuando ya hayan sido calculadas.

REGLA CENTRAL:

UN CHECKBOX = UNA COSA COMPROBABLE.

NO agrupes varias cosas diferentes en un único elemento.

MAL:
"3 conjuntos de ropa incluyendo ropa interior y calcetines"

BIEN:
"4 camisetas"
"3 pantalones"
"6 mudas de ropa interior"
"6 pares de calcetines"

Tampoco uses conceptos abstractos como objetos.

MAL:
"Seguridad"
"Navegación"
"Hidratación y alimentación"
"Ropa adecuada"

BIEN:
"Botella reutilizable"
"Batería externa"
"Chubasquero ligero"

NO elimines un objeto simplemente porque creas que otro se parece.

Solo fusiona si son realmente el mismo objeto.

NO INVENTES:
- meteorología actual
- normativa vigente
- requisitos fronterizos
- reglas actuales de aerolíneas
- servicios concretos de hoteles
- reglas concretas de parques

Cuando algo dependa de información cambiante, añádelo a verification_needed.

PREGUNTAS:
No hagas preguntas. Esta fase solo genera la lista.

AMAZON / PRODUCTOS:

product_candidate=true únicamente cuando tenga sentido comparar o comprar ese producto.

Debe ser false para:
- documentos
- medicación personal
- ropa interior básica
- camisetas básicas
- pantalones básicos
- pijamas
- artículos personales obvios
- teléfono móvil
- alimentos genéricos

Puede ser true para:
- mochila técnica
- calzado técnico
- impermeable
- batería externa
- adaptadores
- equipamiento especializado
- productos donde comparar características aporte valor

DÉJALO EN CASA:

leave_home es opcional.

Incluye únicamente objetos físicos concretos que realmente sea aconsejable no llevar en ESTE viaje.

Nunca incluyas:
- documentos
- medicación
- tareas
- verificaciones
- consejos
- conceptos genéricos como "objetos no esenciales"

Si no hay recomendaciones claras:
"leave_home": []

Devuelve SOLO JSON válido:

{
  "title": "",
  "intro": "",
  "packing_strategy": [],
  "verification_needed": [],
  "categories": [
    {
      "name": "",
      "items": [
        {
          "id": "",
          "name": "",
          "priority": "essential",
          "why": "",
          "product_candidate": false,
          "source_module": ""
        }
      ]
    }
  ],
  "leave_home": []
}
`;

  const userPrompt = `
VIAJE ORIGINAL:

${trip}

ANÁLISIS DEL VIAJE:

${JSON.stringify(analysis)}

RESPUESTAS DEL USUARIO:

${JSON.stringify(answers)}

CONTEXTO DETECTADO:

${JSON.stringify(context)}

OBJETOS DE LA BASE DE CONOCIMIENTO:

${JSON.stringify(preparedItems)}

VERIFICACIONES BASE:

${JSON.stringify(knowledge.verifications)}
`;

  const aiResult = await callGroq({
    env,
    systemPrompt,
    userPrompt,
    temperature: 0.15
  });

  // ====================================================
  // 5. RECUPERAR CUALQUIER OBJETO BASE QUE GROQ OMITA
  // ====================================================

  let categories = Array.isArray(
    aiResult.categories
  )
    ? aiResult.categories
    : [];

  categories = ensureKnowledgeItems(
    categories,
    preparedItems
  );

  // ====================================================
  // 6. FILTROS FINALES
  // ====================================================

  categories = sanitizeCategories(
    categories
  );

  const leaveHome = sanitizeLeaveHome(
    aiResult.leave_home || []
  );

  const verificationNeeded =
    dedupeVerifications([
      ...(Array.isArray(
        analysis.verification_needed
      )
        ? analysis.verification_needed
        : []),

      ...(Array.isArray(
        aiResult.verification_needed
      )
        ? aiResult.verification_needed
        : []),

      ...knowledge.verifications
    ]);

  // ====================================================
  // 7. RESPUESTA
  // ====================================================

  return {
    title:
      aiResult.title ||
      "Tu lista de equipaje",

    intro:
      aiResult.intro ||
      "",

    packing_strategy:
      Array.isArray(
        aiResult.packing_strategy
      )
        ? aiResult.packing_strategy
        : [],

    verification_needed:
      verificationNeeded,

    categories,

    leave_home:
      leaveHome,

    intelligence: {
      active_modules:
        context.activeModules,

      duration_days:
        context.durationDays,

      travellers:
        context.travellers,

      flags:
        context.flags
    }
  };
}


// ======================================================
// GARANTIZAR OBJETOS DE LA BASE
// ======================================================

function ensureKnowledgeItems(
  categories,
  knowledgeItems
) {
  const safeCategories =
    Array.isArray(categories)
      ? categories
      : [];

  for (const category of safeCategories) {
    if (!Array.isArray(category.items)) {
      category.items = [];
    }
  }

  const allItems = () =>
    safeCategories.flatMap(
      category => category.items || []
    );

  for (const baseItem of knowledgeItems) {
    const existsById =
      allItems().some(
        item =>
          item.id &&
          baseItem.id &&
          item.id === baseItem.id
      );

    if (existsById) {
      continue;
    }

    let category =
      safeCategories.find(
        item =>
          normalize(item.name) ===
          normalize(baseItem.category)
      );

    if (!category) {
      category = {
        name: baseItem.category,
        items: []
      };

      safeCategories.push(category);
    }

    category.items.push({
      id: baseItem.id,
      name: baseItem.name,
      priority: baseItem.priority,
      why: baseItem.why,
      product_candidate:
        Boolean(
          baseItem.product_candidate
        ),
      source_module:
        baseItem.source_module
    });
  }

  return safeCategories;
}


// ======================================================
// UTILIDAD LOCAL
// ======================================================

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .replace(
      /[^a-z0-9\s]/g,
      " "
    )
    .replace(
      /\s+/g,
      " "
    )
    .trim();
}
