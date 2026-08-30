export function detectModules(
  trip,
  analysis = {},
  answers = {}
) {
  const text = buildText(trip, analysis, answers);
const originalTripText = normalize(trip);

const isPlanazoImport =
  analysis?.intelligence?.source === "elplanazo_import";
  const activeModules = [
  "viaje_base"
];

const activityModules = [];

  const flags = {
    hasChildren: false,
    hasBaby: false,
    frequentLaundry: false,
    ownBackpack: false,
    cabinOnly: false,
    longDaysOut: false,
    hotel: false,
    hostel: false,
    camping: false,
    plane: false,
    car: false,
    train: false
  };

  const durationDays = detectDurationDays(
    trip,
    analysis
  );

  const travellers = detectTravellers(
    trip,
    analysis
  );

  const childAges = detectChildAges(
    text
  );

  // ====================================================
  // DURACIÓN
  // ====================================================

  if (
    durationDays >= 1 &&
    durationDays <= 3
  ) {
    activeModules.push(
      "duracion_1_3_dias"
    );
  }

  if (
    durationDays >= 4 &&
    durationDays <= 7
  ) {
    activeModules.push(
      "duracion_4_7_dias"
    );
  }

  if (
    durationDays >= 8 &&
    durationDays <= 14
  ) {
    activeModules.push(
      "duracion_8_14_dias"
    );
  }

  if (
    durationDays >= 15
  ) {
    activeModules.push(
      "duracion_15_mas"
    );
  }

  // ====================================================
  // ALOJAMIENTO
  // ====================================================

  if (
    matches(text, [
      "hotel",
      "resort"
    ])
  ) {
    flags.hotel = true;
    activeModules.push("hotel");
  }

  if (
    matches(text, [
      "apartamento",
      "apartahotel",
      "casa rural"
    ])
  ) {
    activeModules.push(
      "apartamento"
    );
  }

  if (
    matches(text, [
      "albergue",
      "albergues",
      "hostel",
      "habitacion compartida",
      "habitación compartida"
    ])
  ) {
    flags.hostel = true;
    activeModules.push(
      "albergue"
    );
  }

  if (
    matches(text, [
      "camping",
      "acampada",
      "tienda de campaña"
    ])
  ) {
    flags.camping = true;
    activeModules.push(
      "camping"
    );
  }

  // ====================================================
  // ACTIVIDADES / TIPO DE VIAJE
  // ====================================================

  const isCamino =
    matches(text, [
      "camino de santiago",
      "peregrinacion",
      "peregrinación",
      "peregrino"
    ]);

 const isHiking =
  isPlanazoImport
    ? matches(originalTripText, [
        "senderismo",
        "trekking",
        "ruta de varios dias",
        "ruta de varios días",
        "caminata de varios dias",
        "caminata de varios días"
      ])
    : matches(text, [
        "senderismo",
        "trekking",
        "ruta de varios dias",
        "ruta de varios días",
        "caminata de varios dias",
        "caminata de varios días"
      ]);

  if (isCamino) {
    activeModules.push(
      "peregrinacion_camino"
    );

    activeModules.push(
      "senderismo_varios_dias"
    );
  }

  if (
    isHiking &&
    (
      !durationDays ||
      durationDays >= 2
    )
  ) {
    activeModules.push(
      "senderismo_varios_dias"
    );
  }

  const isThemePark =
    matches(text, [
      "disneyland",
      "disney",
      "portaventura",
      "port aventura",
      "terra mitica",
      "terra mítica",
      "parque tematico",
      "parque temático"
    ]);

  if (isThemePark) {
    activeModules.push(
      "parque_tematico"
    );

    activeModules.push(
      "jornadas_largas_fuera"
    );

    flags.longDaysOut = true;
  }

  if (
  matchesWholeWords(text, [
    "playa",
    "playas",
    "piscina",
    "piscinas",
    "baño",
    "baños",
    "bañarse"
  ]) ||
  matches(text, [
    "dia de playa",
    "día de playa",
    "zona de baño",
    "zona de baños"
  ])
) {
  activeModules.push(
    "playa"
  );
}

  if (
    matches(text, [
      "nieve",
      "esqui",
      "esquí",
      "snowboard"
    ])
  ) {
    activeModules.push(
      "nieve"
    );

    activeModules.push(
      "clima_frio"
    );
  }

  // ====================================================
  // ACTIVIDADES PUNTUALES
  // ====================================================

  // Caminatas o excursiones concretas.
  // NO convierten el viaje entero en senderismo de varios días.
  if (
    matches(text, [
      "gran muralla",
      "caminata",
      "excursion a pie",
      "excursión a pie",
      "ruta corta",
      "mirador con caminata"
    ]) &&
    !isHiking &&
    !isCamino
  ) {
    activityModules.push(
      "excursion_caminata"
    );
  }

  // Bicicleta puntual.
  if (
    matches(text, [
      "recorrido en bicicleta",
      "paseo en bicicleta",
      "alquiler de bicicleta",
      "ruta en bici",
      "bicicleta opcional"
    ])
  ) {
    activityModules.push(
      "bicicleta_puntual"
    );
  }

  // Barco o paseo acuático puntual.
  if (
    matches(text, [
      "paseo en barco",
      "crucero al atardecer",
      "excursion en barco",
      "excursión en barco",
      "ferry",
      "catamaran",
      "catamarán"
    ])
  ) {
    activityModules.push(
      "barco_puntual"
    );
  }

  // Actividades con agua/humedad sin ser un viaje de playa.
  if (
    matches(text, [
      "cataratas",
      "rafting",
      "kayak",
      "canoa",
      "parque acuatico",
      "parque acuático"
    ])
  ) {
    activityModules.push(
      "actividad_agua"
    );
  }

  // Safari/fauna como actividad.
  if (
    matches(text, [
      "safari",
      "game drive",
      "observacion de fauna",
      "observación de fauna",
      "reserva natural",
      "parque nacional"
    ])
  ) {
    activityModules.push(
      "safari_fauna"
    );
  }

  // Cena o evento algo más formal.
  if (
    matches(text, [
      "cena formal",
      "cena de gala",
      "evento formal",
      "restaurante elegante"
    ])
  ) {
    activityModules.push(
      "evento_formal"
    );
  }

  
  // ====================================================
  // NIÑOS / BEBÉS
  // ====================================================

  if (
    childAges.length ||
    matches(text, [
      "niño",
      "niños",
      "hijo",
      "hijos",
      "hija",
      "hijas"
    ])
  ) {
    flags.hasChildren = true;

    if (
      childAges.some(
        age => age <= 3
      )
    ) {
      activeModules.push(
        "ninos_0_3"
      );
    }

    if (
      childAges.some(
        age =>
          age >= 4 &&
          age <= 7
      )
    ) {
      activeModules.push(
        "ninos_4_7"
      );
    }

    if (
      childAges.some(
        age =>
          age >= 8 &&
          age <= 12
      )
    ) {
      activeModules.push(
        "ninos_8_12"
      );
    }

    if (
      childAges.length === 0
    ) {
      activeModules.push(
        "ninos_generico"
      );
    }
  }

  if (
    matches(text, [
      "bebe",
      "bebé",
      "pañales",
      "carrito de bebe",
      "carrito de bebé"
    ])
  ) {
    flags.hasBaby = true;
    activeModules.push("bebe");
  }

  // ====================================================
  // LOGÍSTICA
  // ====================================================

  if (
    matches(text, [
      "podemos lavar",
      "lavar ropa",
      "lavaremos ropa",
      "lavado frecuente",
      "lavanderia",
      "lavandería",
      "lavar casi todos los dias",
      "lavar casi todos los días"
    ])
  ) {
    flags.frequentLaundry = true;
    activeModules.push(
      "lavado_frecuente"
    );
  }

  if (
    matches(text, [
      "llevamos nuestras mochilas",
      "llevaremos nuestras mochilas",
      "llevo mi mochila",
      "mochila propia",
      "cargamos mochila",
      "transportamos nuestro equipaje",
      "llevamos nosotros mismos nuestras mochilas"
    ])
  ) {
    flags.ownBackpack = true;
    activeModules.push(
      "mochila_propia"
    );
  }

  if (
    matches(text, [
      "solo equipaje de cabina",
      "solo cabina",
      "equipaje de mano",
      "maleta de cabina"
    ])
  ) {
    flags.cabinOnly = true;
    activeModules.push(
      "equipaje_cabina"
    );
  }

  if (
    matches(text, [
      "todo el dia fuera",
      "todo el día fuera",
      "jornadas largas",
      "pasaremos el dia",
      "pasaremos el día"
    ])
  ) {
    flags.longDaysOut = true;
    activeModules.push(
      "jornadas_largas_fuera"
    );
  }

  // ====================================================
  // TRANSPORTE
  // ====================================================

  if (
    matches(text, [
      "avion",
      "avión",
      "vuelo",
      "aeropuerto"
    ])
  ) {
    flags.plane = true;
    activeModules.push("avion");
  }

  if (
    matches(text, [
      "tren",
      "interrail"
    ])
  ) {
    flags.train = true;
    activeModules.push("tren");
  }

  if (
    matches(text, [
      "coche",
      "coche propio"
    ])
  ) {
    flags.car = true;
    activeModules.push("coche");
  }

  // ====================================================
  // MULTIDESTINO / URBANO
  // ====================================================

  if (
    matches(text, [
      "tokio",
      "tokyo",
      "kioto",
      "kyoto",
      "osaka",
      "interrail",
      "varias ciudades",
      "varios hoteles",
      "cambio de hotel",
      "cambios de hotel"
    ])
  ) {
    activeModules.push(
      "urbano_multidestino"
    );
  }

  // ====================================================
  // CLIMA / ÉPOCA ORIENTATIVA
  // ====================================================

  if (
    matches(text, [
      "noviembre",
      "diciembre",
      "enero",
      "febrero",
      "invierno"
    ])
  ) {
    activeModules.push(
      "clima_frio_variable"
    );
  }

  if (
    matches(text, [
      "junio",
      "julio",
      "agosto",
      "verano",
      "calor"
    ])
  ) {
    activeModules.push(
      "clima_calido"
    );
  }
  // ====================================================
  // CONTEXTOS ESPECIALES DETECTADOS EN EL ANÁLISIS
  // ====================================================

  const specialContexts =
    analysis?.trip_profile?.special_contexts || [];

  const specialText =
    normalize(
      Array.isArray(specialContexts)
        ? specialContexts.join(" ")
        : String(specialContexts || "")
    );

  if (
    matches(specialText, [
      "excursion puntual con caminata",
      "excursión puntual con caminata"
    ])
  ) {
    activityModules.push(
      "excursion_caminata"
    );
  }

  if (
    matches(specialText, [
      "excursion puntual en barco",
      "excursión puntual en barco"
    ])
  ) {
    activityModules.push(
      "barco_puntual"
    );
  }

  if (
    matches(specialText, [
      "actividad puntual en bicicleta"
    ])
  ) {
    activityModules.push(
      "bicicleta_puntual"
    );
  }

  if (
    matches(specialText, [
      "actividad de safari o fauna",
      "fauna y actividades al aire libre"
    ])
  ) {
    activityModules.push(
      "safari_fauna"
    );
  }

  if (
    matches(specialText, [
      "actividad con agua o humedad"
    ])
  ) {
    activityModules.push(
      "actividad_agua"
    );
  }

  if (
    matches(specialText, [
      "viaje multidestino",
      "viaje urbano multidestino"
    ])
  ) {
    activeModules.push(
      "urbano_multidestino"
    );
  }

  if (
    matches(specialText, [
      "viaje en avion",
      "viaje en avión"
    ])
  ) {
    activeModules.push(
      "avion"
    );
  }

  if (
    matches(specialText, [
      "desplazamientos en tren"
    ])
  ) {
    activeModules.push(
      "tren"
    );
  }

  if (
    matches(specialText, [
      "coche de alquiler",
      "coche propio"
    ])
  ) {
    activeModules.push(
      "coche"
    );
  }
  return {
  activeModules: [
    ...new Set(activeModules)
  ],

  activityModules: [
    ...new Set(activityModules)
  ],

  durationDays,
  travellers,
  childAges,
  flags
};
}


// ======================================================
// UTILIDADES
// ======================================================

function buildText(
  trip,
  analysis,
  answers
) {
  return normalize(
    [
      trip,
      JSON.stringify(
        analysis || {}
      ),
      JSON.stringify(
        answers || {}
      )
    ].join(" ")
  );
}


function matches(
  text,
  values
) {
  return values.some(
    value =>
      text.includes(
        normalize(value)
      )
  );
}


function detectDurationDays(
  trip,
  analysis
) {
  const profileDuration =
    String(
      analysis?.trip_profile
        ?.duration || ""
    );

  const combined =
    `${profileDuration} ${trip}`;

  const dayMatch =
    combined.match(
      /(\d+)\s*d[ií]a/
    );

  if (dayMatch) {
    return Number(dayMatch[1]);
  }

  const weekMatch =
    combined.match(
      /(\d+)\s*semana/
    );

  if (weekMatch) {
    return Number(
      weekMatch[1]
    ) * 7;
  }

  if (
    /fin de semana/i.test(
      combined
    )
  ) {
    return 2;
  }

  return null;
}


function detectTravellers(
  trip,
  analysis
) {
  const text =
    normalize(
      `${trip} ${
        analysis?.trip_profile
          ?.travellers || ""
      }`
    );

  if (
    text.includes("solo")
  ) {
    return {
      adults: 1,
      children: 0
    };
  }

  if (
    text.includes("pareja") ||
    text.includes("mi mujer") ||
    text.includes("mi marido")
  ) {
    return {
      adults: 2,
      children: null
    };
  }

  const adultsMatch = text.match(
    /(\d+)\s*(?:adultos?|personas?\s+adultas?)/
  );

  const childrenMatch = text.match(
    /(\d+)\s*(?:ninos?|hijos?|hijas?)/
  );

  if (adultsMatch || childrenMatch) {
    return {
      adults: adultsMatch
        ? Number(adultsMatch[1])
        : null,
      children: childrenMatch
        ? Number(childrenMatch[1])
        : null
    };
  }

  return {
    adults: null,
    children: null
  };
}


function detectChildAges(
  text
) {
  const ages = [];

  const ageGroups = text.matchAll(
    /(?:de\s+)?((?:\d{1,2}\s*(?:,|y|e)\s*)*\d{1,2})\s*a[nñ]os/g
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
    ...new Set(ages)
  ];
}

function matchesWholeWords(
  text,
  values
) {
  return values.some(value => {
    const normalizedValue =
      normalize(value);

    const escaped =
      normalizedValue.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

    const regex =
      new RegExp(
        `(^|\\s)${escaped}(?=\\s|$)`,
        "i"
      );

    return regex.test(text);
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
