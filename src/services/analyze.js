import { callGroq } from "./groq.js";
import { detectModules } from "../rules/moduleDetector.js";

export async function handleAnalyze(body, env) {
  const trip = body.trip;

  if (!trip) {
    throw new Error("Falta la descripción del viaje.");
  }

  // ======================================================
  // VIAJE IMPORTADO DESDE EL PLANAZO
  // ======================================================

  if (isPlanazoImport(trip)) {
    return analyzePlanazoImport(trip);
  }
  
  // ======================================================
  // 1. ANÁLISIS LOCAL GRATIS
  // ======================================================

  const local = localAnalyze(trip);

  // Los casos imposibles detectados localmente deben detenerse antes
  // de aplicar el umbral de confianza.
  if (local.invalid) {
    return {
      valid: false,
      interpretation: local.interpretation,
      reason: "El destino o la experiencia descritos no son posibles actualmente como viaje turístico real.",
      trip_profile: local.trip_profile,
      general_warnings: [],
      verification_needed: [],
      questions: [],
      intelligence: {
        source: "local",
        confidence: local.confidence
      }
    };
  }

  // Si entendemos suficientemente bien el viaje,
  // NO llamamos a Groq.
  if (local.confidence >= 0.79) {
    return {
      valid: true,
      interpretation: local.interpretation,
      trip_profile: local.trip_profile,
      general_warnings: [],
      verification_needed:
        local.verification_needed,
      questions:
        filterQuestions(
          local.questions,
          trip
        ),
      intelligence: {
        source: "local",
        confidence: local.confidence
      }
    };
  }

  // ======================================================
  // 2. SOLO SI HAY AMBIGÜEDAD, USAMOS GROQ
  // ======================================================

  const systemPrompt = `
Eres el analizador inteligente de "¿Qué me llevo?", una aplicación de TravelApps.

NO debes generar todavía la checklist.

Tu objetivo es comprender el viaje y preguntar únicamente aquello que pueda cambiar de forma importante qué debe llevar el usuario.

PREGUNTAR TIENE UN COSTE.

Haz normalmente entre 0 y 4 preguntas.

Solo pregunta si DOS RESPUESTAS DIFERENTES provocarían cambios IMPORTANTES Y CONCRETOS en el equipaje.

NO preguntes por experiencia previa genérica.
NO preguntes por preparación física genérica.
NO preguntes por actividades hipotéticas no mencionadas.

Si la descripción ya contiene suficiente información:
"questions": []

NO INVENTES:
- meteorología actual
- normativa vigente
- requisitos fronterizos
- reglas actuales de aerolíneas
- servicios exactos de alojamientos

Si algo requiere información actual:
añádelo a verification_needed.

Si el viaje es actualmente imposible como turismo real:
"valid": false

Devuelve SOLO JSON válido:

{
  "valid": true,
  "interpretation": "",
  "trip_profile": {
    "destination_or_experience": "",
    "trip_type": [],
    "duration": "",
    "season_or_dates": "",
    "travellers": "",
    "activity_level": "desconocido",
    "accommodation": "desconocido",
    "luggage_constraints": "desconocido",
    "special_contexts": []
  },
  "general_warnings": [],
  "verification_needed": [],
  "questions": [
    {
      "id": "",
      "question": "",
      "type": "single",
      "options": [],
      "reason": ""
    }
  ]
}
`;

  const result = await callGroq({
    env,
    systemPrompt,
    userPrompt: trip,
    temperature: 0.1
  });

  return {
    ...result,

    questions:
      filterQuestions(
        result.questions || [],
        trip
      ),

    intelligence: {
      source: "groq_fallback",
      confidence:
        local.confidence
    }
  };
}


// ======================================================
// ANALIZADOR LOCAL
// ======================================================

function localAnalyze(trip) {
  const text = normalize(trip);

  const durationDays =
    detectDurationDays(text);

  const childAges =
    detectChildAges(text);

  const tripTypes = [];

  let destination = "";
  let accommodation =
    "desconocido";

  let luggageConstraints =
    "desconocido";

  const specialContexts = [];

  const verificationNeeded = [];

  const questions = [];

  let confidence = 0.35;

  const genericDestination =
    detectGenericDestination(trip);

  if (genericDestination) {
    destination = genericDestination;
    confidence += 0.25;
  }
  
  // ======================================================
  // DESTINOS / EXPERIENCIAS MUY RECONOCIBLES
  // ======================================================

  if (
    text.includes(
      "camino de santiago"
    )
  ) {
    destination =
      "Camino de Santiago";

    tripTypes.push(
      "peregrinación",
      "senderismo"
    );

    confidence += 0.3;
  }

  if (
    text.includes("disneyland")
  ) {
    destination =
      "Disneyland París";

    tripTypes.push(
      "parque temático"
    );

    confidence += 0.3;
  }

  if (
    text.includes("portaventura") ||
    text.includes("port aventura")
  ) {
    destination =
      "PortAventura";

    tripTypes.push(
      "parque temático"
    );

    confidence += 0.3;
  }

  if (
    /crucero/.test(text)
  ) {
    tripTypes.push(
      "crucero"
    );

    specialContexts.push(
      "viaje en crucero"
    );

    confidence += 0.2;
  }

  if (
    /safari/.test(text)
  ) {
    tripTypes.push(
      "safari"
    );

    specialContexts.push(
      "actividad de safari"
    );

    confidence += 0.2;
  }

  if (
    /senderismo|trekking/.test(
      text
    )
  ) {
    tripTypes.push(
      "senderismo"
    );

    confidence += 0.15;
  }

  // ======================================================
  // CONTEXTOS GENERALES DEL VIAJE
  // ======================================================

  if (
    /crucero|fiordos/.test(text)
  ) {
    tripTypes.push(
      "crucero"
    );

    specialContexts.push(
      "viaje con navegación o barco"
    );

    confidence += 0.15;
  }

  if (
    /excursion en barco|excursiones en barco|paseo en barco|catamaran|ferry/.test(
      text
    )
  ) {
    specialContexts.push(
      "excursión puntual en barco"
    );

    confidence += 0.1;
  }

  if (
    /caminata|excursion a pie|mirador/.test(
      text
    ) &&
    !/senderismo de varios dias|trekking de varios dias/.test(
      text
    )
  ) {
    specialContexts.push(
      "excursión puntual con caminata"
    );

    confidence += 0.1;
  }

  if (
    /bicicleta|ruta en bici|paseo en bici/.test(
      text
    )
  ) {
    specialContexts.push(
      "actividad puntual en bicicleta"
    );

    confidence += 0.05;
  }

  if (
    /safari|observacion de fauna|reserva natural|parque nacional/.test(
      text
    )
  ) {
    specialContexts.push(
      "actividad de safari o fauna"
    );

    confidence += 0.1;
  }

  if (
    /cataratas|rafting|kayak|canoa/.test(
      text
    )
  ) {
    specialContexts.push(
      "actividad con agua o humedad"
    );

    confidence += 0.1;
  }

  if (
    /varias ciudades|entre ciudades|cambio de ciudad|cambios de ciudad|ruta por varias ciudades/.test(
      text
    )
  ) {
    specialContexts.push(
      "viaje multidestino"
    );

    confidence += 0.1;
  }

  // ======================================================
  // TRANSPORTES
  // ======================================================

  if (
    /avion|vuelo|aeropuerto/.test(
      text
    )
  ) {
    specialContexts.push(
      "viaje en avión"
    );

    confidence += 0.05;
  }

  if (
    /tren|ferrocarril|interrail/.test(
      text
    )
  ) {
    specialContexts.push(
      "desplazamientos en tren"
    );

    confidence += 0.05;
  }

  if (
    /coche de alquiler|alquiler de coche/.test(
      text
    )
  ) {
    specialContexts.push(
      "coche de alquiler"
    );

    confidence += 0.05;
  }

  if (
    /coche propio/.test(
      text
    )
  ) {
    specialContexts.push(
      "coche propio"
    );

    confidence += 0.05;
  }

  if (
    /transporte publico|metro|autobus|bus urbano/.test(
      text
    )
  ) {
    specialContexts.push(
      "transporte público"
    );

    confidence += 0.05;
  }
  
  if (
    /playa|costa/.test(text)
  ) {
    tripTypes.push(
      "playa"
    );

    confidence += 0.15;
  }

  // ======================================================
  // ALOJAMIENTO
  // ======================================================

  if (
    /hotel/.test(text)
  ) {
    accommodation = "hotel";
    confidence += 0.1;
  }

  if (
    /albergue/.test(text)
  ) {
    accommodation =
      "albergue";

    confidence += 0.1;
  }

  if (
    /apartamento/.test(text)
  ) {
    accommodation =
      "apartamento";

    confidence += 0.1;
  }

  if (
    /camping|acampada/.test(
      text
    )
  ) {
    accommodation =
      "camping";

    confidence += 0.1;
  }

  // ======================================================
  // EQUIPAJE / LOGÍSTICA
  // ======================================================

  if (
    /mochila propia|nuestras mochilas|mi propia mochila|llevare mi mochila|llevaré mi mochila|llevaremos nosotros mismos nuestras mochilas/.test(
      text
    )
  ) {
    luggageConstraints =
      "mochila propia";

    confidence += 0.1;
  }

  if (
    /solo cabina|equipaje de cabina|equipaje de mano/.test(
      text
    )
  ) {
    luggageConstraints =
      "equipaje de cabina";

    confidence += 0.1;
  }

  // ======================================================
  // DURACIÓN
  // ======================================================

  if (durationDays) {
    confidence += 0.1;
  }

  // ======================================================
  // VIAJEROS
  // ======================================================

  let travellers =
    "desconocido";

  if (
    /mi mujer|mi marido|pareja/.test(
      text
    )
  ) {
    travellers = "2 adultos";
    confidence += 0.1;
  }

  if (
    childAges.length
  ) {
    travellers =
      `adultos con niños de ${childAges.join(
        " y "
      )} años`;

    confidence += 0.15;
  }

  // ======================================================
  // ÉPOCA
  // ======================================================

  const seasonOrDates =
    detectSeason(text);

  if (seasonOrDates) {
    confidence += 0.1;
  }

  // ======================================================
  // PREGUNTAS SOLO SI DE VERDAD FALTA ALGO IMPORTANTE
  // ======================================================

  if (
    tripTypes.includes(
      "peregrinación"
    ) &&
    accommodation ===
      "desconocido"
  ) {
    questions.push({
      id: "alojamiento",
      question:
        "¿Dónde dormirás principalmente durante el Camino?",
      type: "single",
      options: [
        "Albergues",
        "Hoteles o pensiones",
        "Mixto"
      ],
      reason:
        "El alojamiento cambia lo que necesitas para dormir, ducharte y organizar el equipaje."
    });
  }

  if (
    tripTypes.includes(
      "peregrinación"
    ) &&
    luggageConstraints ===
      "desconocido"
  ) {
    questions.push({
      id: "equipaje",
      question:
        "¿Llevarás tú mismo la mochila durante las etapas?",
      type: "single",
      options: [
        "Sí",
        "No, usaré transporte de equipaje"
      ],
      reason:
        "Esto cambia mucho el peso y la cantidad de ropa que conviene llevar."
    });
  }

  // Disneyland / parque con niños:
  // no preguntamos lavandería por defecto.
  if (
    tripTypes.includes(
      "parque temático"
    ) &&
    childAges.length
  ) {
    // De momento cero preguntas
  }

  // ======================================================
  // VERIFICACIONES
  // ======================================================

  if (seasonOrDates) {
    verificationNeeded.push(
      "Consultar la previsión meteorológica concreta pocos días antes de salir."
    );
  }

  // ======================================================
  // DETECTAR VIAJES IMPOSIBLES
  // ======================================================

  if (
    /\bmarte\b/.test(text)
  ) {
    return {
      confidence: 1,

      interpretation:
        "Viaje a Marte",

      trip_profile: {
        destination_or_experience:
          "Marte",

        trip_type: [],

        duration:
          durationDays
            ? `${durationDays} días`
            : "",

        season_or_dates:
          seasonOrDates || "",

        travellers,

        activity_level:
          "desconocido",

        accommodation:
          "desconocido",

        luggage_constraints:
          "desconocido",

        special_contexts: []
      },

      verification_needed: [],

      questions: [],

      invalid: true
    };
  }

  confidence =
    Math.min(
      confidence,
      1
    );

  return {
    confidence,

    interpretation:
      buildInterpretation(
        destination,
        tripTypes,
        durationDays
      ),

    trip_profile: {
      destination_or_experience:
        destination ||
        "Viaje o experiencia",

      trip_type:
        [
          ...new Set(
            tripTypes
          )
        ],

      duration:
        durationDays
          ? `${durationDays} días`
          : "",

      season_or_dates:
        seasonOrDates || "",

      travellers,

      activity_level:
        "desconocido",

      accommodation,

      luggage_constraints:
        luggageConstraints,

      special_contexts:
        specialContexts
    },

    verification_needed:
      verificationNeeded,

    questions,

    invalid: false
  };
}


// ======================================================
// FILTRO FINAL DE PREGUNTAS
// ======================================================

function filterQuestions(
  questions,
  trip
) {
  if (!Array.isArray(questions)) {
    return [];
  }

  const tripText =
    normalize(trip);

  return questions.filter(
    question => {
      const text =
        normalize(
          `${question.question || ""} ${question.reason || ""}`
        );

      if (
        question.id === "equipaje" &&
        /mi propia mochila|llevo mi mochila|llevare mi mochila|llevaremos nuestras mochilas|mochila propia/.test(tripText)
      ) {
        return false;
      }

      if (
        /experiencia previa|preparacion fisica|condicion fisica/.test(
          text
        )
      ) {
        return false;
      }

      if (
        /alguna actividad especial|otras actividades|actividad adicional|ciclismo/.test(
          text
        )
      ) {
        const mentioned =
          /ciclismo|bicicleta|bici/.test(
            tripText
          );

        return mentioned;
      }

      if (
        /lavanderia|lavar ropa/.test(
          text
        )
      ) {
        const relevant =
          /8 dias|9 dias|10 dias|11 dias|12 dias|13 dias|14 dias|15 dias|equipaje de cabina|solo cabina|mochila propia|camino de santiago/.test(
            tripText
          );

        return relevant;
      }

      return true;
    }
  );
}


// ======================================================
// UTILIDADES
// ======================================================

function detectGenericDestination(
  originalTrip
) {
  const text =
    String(originalTrip || "")
      .replace(/\s+/g, " ")
      .trim();

  const months =
    "enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre";

  const patterns = [
    new RegExp(
      `(?:me voy|nos vamos|voy|vamos|viajo|viajamos|iremos)\\s+(?:\\d+\\s+d[ií]as?\\s+)?a\\s+(.+?)(?=\\s+en\\s+(?:${months})\\b|\\s+durante\\b|\\s+con\\b|\\s+y\\s+haremos\\b|[,.]|$)`,
      "i"
    ),

    new RegExp(
      `(?:viaje|viajar|viajaremos)\\s+a\\s+(.+?)(?=\\s+en\\s+(?:${months})\\b|\\s+durante\\b|\\s+con\\b|[,.]|$)`,
      "i"
    )
  ];

  for (
    const pattern
    of patterns
  ) {
    const match =
      text.match(pattern);

    if (
      match &&
      match[1]
    ) {
      return match[1]
        .trim()
        .replace(
          /\s+(?:durante|con)$/i,
          ""
        );
    }
  }

  return "";
}

function detectDurationDays(
  text
) {
  const dayMatch =
    text.match(
      /(\d+)\s*dias?/
    );

  if (dayMatch) {
    return Number(
      dayMatch[1]
    );
  }

  const weekMatch =
    text.match(
      /(\d+)\s*semanas?/
    );

  if (weekMatch) {
    return Number(
      weekMatch[1]
    ) * 7;
  }

  if (
    text.includes(
      "fin de semana"
    )
  ) {
    return 2;
  }

  return null;
}


function detectChildAges(
  text
) {
  const ages = [];

  const ageGroups = text.matchAll(
    /(?:de\s+)?((?:\d{1,2}\s*(?:,|y|e)\s*)*\d{1,2})\s*anos/g
  );

  for (const group of ageGroups) {
    const values = group[1].match(/\d{1,2}/g) || [];

    for (const value of values) {
      const age = Number(value);

      if (age >= 0 && age <= 17) {
        ages.push(age);
      }
    }
  }

  return [
    ...new Set(
      ages
    )
  ];
}


function detectSeason(text) {
  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre"
  ];

  for (
    const month
    of months
  ) {
    if (
      text.includes(month)
    ) {
      return month;
    }
  }

  if (
    text.includes("verano")
  ) {
    return "verano";
  }

  if (
    text.includes("invierno")
  ) {
    return "invierno";
  }

  return "";
}


function buildInterpretation(
  destination,
  tripTypes,
  durationDays
) {
  const parts = [];

  if (destination) {
    parts.push(destination);
  }

  if (
    durationDays
  ) {
    parts.push(
      `${durationDays} días`
    );
  }

  if (
    !parts.length &&
    tripTypes.length
  ) {
    parts.push(
      tripTypes.join(", ")
    );
  }

  return (
    parts.join(" · ") ||
    "Viaje interpretado"
  );
}

// ======================================================
// IMPORTACIONES DESDE EL PLANAZO
// ======================================================

function isPlanazoImport(trip) {
  const text = normalize(trip);

  return (
    text.includes("viaje planificado") &&
    text.includes("destino") &&
    (
      text.includes("itinerario previsto") ||
      text.includes("actividades previstas")
    )
  );
}


function analyzePlanazoImport(trip) {
  const original = String(trip || "");
  const text = normalize(original);

  const destination =
    extractLineValue(
      original,
      "Destino"
    ) || "Viaje importado desde El Planazo";

  const durationDays =
    detectDurationDays(text);

  const seasonOrDates =
    extractLineValue(
      original,
      "Mes aproximado"
    ) ||
    detectSeason(text);

  const travellers =
    extractLineValue(
      original,
      "Viajeros"
    ) ||
    "desconocido";

  const tripTypes = [];
  const specialContexts = [];

  // ------------------------------------------------------
  // DETECTAR CONTEXTOS A PARTIR DEL ITINERARIO COMPLETO
  // ------------------------------------------------------

  if (
    /disneyland|portaventura|parque tematico/.test(
      text
    )
  ) {
    tripTypes.push(
      "parque temático"
    );
  }

  if (
    /senderismo|trekking|caminata|gran muralla/.test(
      text
    )
  ) {
    tripTypes.push(
      "senderismo o caminatas"
    );
  }

  if (
    /safari|fauna|parque nacional/.test(
      text
    )
  ) {
    tripTypes.push(
      "safari"
    );

    specialContexts.push(
      "fauna y actividades al aire libre"
    );
  }

  if (
    /playa|costa|piscina|bano/.test(
      text
    )
  ) {
    tripTypes.push(
      "playa"
    );
  }

  if (
    /crucero|barco|zambeze/.test(
      text
    )
  ) {
    tripTypes.push(
      "barco o crucero"
    );
  }

  if (
    /bicicleta|bici/.test(
      text
    )
  ) {
    specialContexts.push(
      "actividad en bicicleta"
    );
  }

  if (
    /tren|tren bala|interrail/.test(
      text
    )
  ) {
    specialContexts.push(
      "desplazamientos en tren"
    );
  }

  if (
    /museo|palacio|templo|cultura|ciudad prohibida|terracota/.test(
      text
    )
  ) {
    tripTypes.push(
      "turismo urbano y cultural"
    );
  }

  if (
    /varias ciudades|beijing|pekin|xi an|tokio|kioto|osaka/.test(
      text
    )
  ) {
    specialContexts.push(
      "viaje urbano multidestino"
    );
  }

  const transport =
    extractLineValue(
      original,
      "Transportes"
    ) ||
    extractLineValue(
      original,
      "Transporte"
    );

  if (transport) {
    specialContexts.push(
      `Transportes previstos: ${transport}`
    );
  }

  const interests =
    extractLineValue(
      original,
      "Tipo de viaje e intereses"
    );

  if (interests) {
    specialContexts.push(
      `Intereses: ${interests}`
    );
  }

  // ------------------------------------------------------
  // VERIFICACIONES
  // ------------------------------------------------------

  const verificationNeeded = [];

  if (seasonOrDates) {
    verificationNeeded.push(
      "Consultar la previsión meteorológica concreta pocos días antes de salir."
    );
  }

  if (
    /avion|vuelo|aeropuerto/.test(
      text
    )
  ) {
    verificationNeeded.push(
      "Comprobar documentación, requisitos de entrada y condiciones de equipaje vigentes en fuentes oficiales y con la compañía aérea."
    );
  }

  // ------------------------------------------------------
  // RESULTADO
  // ------------------------------------------------------

  return {
    valid: true,

    interpretation:
      durationDays
        ? `${destination} · ${durationDays} días`
        : destination,

    trip_profile: {
      destination_or_experience:
        destination,

      trip_type:
        [
          ...new Set(
            tripTypes
          )
        ],

      duration:
        durationDays
          ? `${durationDays} días`
          : "",

      season_or_dates:
        seasonOrDates || "",

      travellers,

      activity_level:
        /aprovechar al maximo|ritmo del viaje aprovechar/.test(
          text
        )
          ? "alto"
          : "variable",

      accommodation:
        detectAccommodationFromPlan(
          text
        ),

      luggage_constraints:
        detectLuggageFromPlan(
          text
        ),

      special_contexts:
        [
          ...new Set(
            specialContexts
          )
        ]
    },

    general_warnings: [],

    verification_needed:
      verificationNeeded,

    // El Planazo ya nos ha dado suficiente información.
    // No gastamos IA ni hacemos preguntas redundantes.
    questions: [],

    intelligence: {
      source:
        "elplanazo_import",

      confidence: 1,

      ai_used: false
    }
  };
}


function extractLineValue(
  text,
  label
) {
  const escapedLabel =
    label.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

  const regex =
    new RegExp(
      `(?:^|\\n)${escapedLabel}:\\s*([^\\n]+)`,
      "i"
    );

  const match =
    String(text || "").match(
      regex
    );

  return match
    ? match[1]
        .trim()
        .replace(/[.,;:]+$/, "")
    : "";
}


function detectAccommodationFromPlan(
  text
) {
  if (
    /albergue/.test(text)
  ) {
    return "albergue";
  }

  if (
    /camping|acampada/.test(text)
  ) {
    return "camping";
  }

  if (
    /apartamento|apartahotel/.test(
      text
    )
  ) {
    return "apartamento";
  }

  if (
    /hotel|lodge|resort/.test(
      text
    )
  ) {
    return "hotel o alojamiento equivalente";
  }

  return "desconocido";
}


function detectLuggageFromPlan(
  text
) {
  if (
    /equipaje de cabina|solo cabina|maleta de mano/.test(
      text
    )
  ) {
    return "equipaje de cabina";
  }

  if (
    /maleta facturada|equipaje facturado/.test(
      text
    )
  ) {
    return "equipaje facturado";
  }

  if (
    /mochila propia|nuestras mochilas/.test(
      text
    )
  ) {
    return "mochila propia";
  }

  return "desconocido";
}

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
