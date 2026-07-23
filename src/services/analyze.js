import { callGroq } from "./groq.js";

export async function handleAnalyze(body, env) {
  const trip = body.trip;

  if (!trip) {
    throw new Error("Falta la descripción del viaje.");
  }

  const systemPrompt = `
Eres el analizador inteligente de "¿Qué me llevo?", una aplicación de TravelApps.

NO debes generar todavía la checklist.

Tu objetivo es comprender el viaje y preguntar únicamente aquello que pueda cambiar de forma importante qué debe llevar el usuario.

REGLA FUNDAMENTAL:

PREGUNTAR TIENE UN COSTE.

Haz normalmente entre 0 y 4 preguntas.

Solo pregunta si DOS RESPUESTAS DIFERENTES provocarían cambios IMPORTANTES Y CONCRETOS en el equipaje.

NO preguntes por curiosidad.

NO preguntes por experiencia previa en senderismo o viajes, salvo que exista una actividad técnica muy específica donde esa respuesta cambie realmente el equipo necesario.

Para un Camino de Santiago normal:
NO preguntes por experiencia previa.

Prioriza preguntas sobre:
- alojamiento si cambia equipamiento
- transporte de equipaje
- posibilidad de lavar ropa
- restricciones de equipaje
- niños/bebés
- actividades especiales YA MENCIONADAS que cambien qué llevar

NO preguntes:
- restaurantes
- atracciones favoritas
- horarios turísticos
- preparación física genérica
- experiencia previa genérica
- actividades hipotéticas no mencionadas
- "si harán alguna actividad especial" cuando el usuario no ha dicho nada parecido
- detalles que puedan resolverse con una recomendación

Si la descripción ya contiene suficiente información para preparar una buena lista, devuelve:
"questions": []

NO INVENTES:
- meteorología actual
- normativa vigente
- requisitos fronterizos
- reglas actuales de aerolíneas
- servicios exactos de alojamientos

Si algo requiere información actual, añádelo a verification_needed.

Si el viaje es actualmente imposible como turismo real, por ejemplo:
"Voy a Marte tres días"

devuelve valid:false.

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
    questions: filterQuestions(
      result.questions || [],
      trip
    )
  };
}


// ======================================================
// FILTRO DE PREGUNTAS INNECESARIAS / ESPECULATIVAS
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

  return questions.filter(question => {
    const text =
      normalize(
        `${question.question || ""} ${question.reason || ""}`
      );

    // Preguntas de experiencia o preparación física
    if (
      /experiencia previa|preparacion fisica|preparación física|condicion fisica|condición física/.test(
        text
      )
    ) {
      return false;
    }

    // Actividades hipotéticas no mencionadas
    if (
      /alguna actividad especial|otras actividades|actividad adicional|ciclismo|visitas a lugares especificos|visitas a lugares específicos/.test(
        text
      )
    ) {
      const activityWasMentioned =
        /ciclismo|bicicleta|bici|actividad especial|actividad adicional/.test(
          tripText
        );

      if (!activityWasMentioned) {
        return false;
      }
    }

    // Lavandería solo merece pregunta si realmente puede cambiar equipaje
    if (
      /lavanderia|lavandería|lavar ropa/.test(
        text
      )
    ) {
      const longOrLimitedTrip =
        /8 dias|8 días|9 dias|9 días|10 dias|10 días|11 dias|11 días|12 dias|12 días|13 dias|13 días|14 dias|14 días|15 dias|15 días|semana y media|dos semanas|equipaje de cabina|solo cabina|mochila propia|camino de santiago|senderismo varios dias|senderismo varios días/.test(
          tripText
        );

      if (!longOrLimitedTrip) {
        return false;
      }
    }

    return true;
  });
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
