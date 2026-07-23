export function detectModules(
  trip,
  analysis = {},
  answers = {}
) {
  const text = buildText(trip, analysis, answers);
const originalTripText = normalize(trip);

const isPlanazoImport =
  analysis?.intelligence?.source === "elplanazo_import";
  const activeModules = ["viaje_base"];

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

  return {
    activeModules: [
      ...new Set(activeModules)
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

  return {
    adults: null,
    children: null
  };
}


function detectChildAges(
  text
) {
  const ages = [];

  const regex =
    /(\d{1,2})\s*a[nñ]os/g;

  let match;

  while (
    (
      match =
        regex.exec(text)
    ) !== null
  ) {
    const age =
      Number(match[1]);

    if (
      age >= 0 &&
      age <= 17
    ) {
      ages.push(age);
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
