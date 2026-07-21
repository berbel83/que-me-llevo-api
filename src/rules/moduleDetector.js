export function detectModules(
  trip,
  analysis,
  answers
) {
  const text = buildText(
    trip,
    analysis,
    answers
  );

  const activeModules = [
    "viaje_base"
  ];

  const flags = {
    hasChildren: false,
    hasBaby: false,
    frequentLaundry: false,
    ownBackpack: false,
    cabinOnly: false,
    longDaysOut: false
  };

  const durationDays =
    detectDurationDays(
      trip,
      analysis
    );

  const travellers =
    detectTravellers(
      trip,
      analysis
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

  if (durationDays >= 15) {
    activeModules.push(
      "duracion_15_mas"
    );
  }

  // ====================================================
  // ALOJAMIENTO
  // ====================================================

  if (
    matches(
      text,
      [
        "hotel",
        "resort"
      ]
    )
  ) {
    activeModules.push(
      "hotel"
    );
  }

  if (
    matches(
      text,
      [
        "apartamento",
        "apartahotel",
        "casa rural"
      ]
    )
  ) {
    activeModules.push(
      "apartamento"
    );
  }

  if (
    matches(
      text,
      [
        "albergue",
        "albergues",
        "hostel",
        "habitacion compartida",
        "habitación compartida"
      ]
    )
  ) {
    activeModules.push(
      "albergue"
    );
  }

  if (
    matches(
      text,
      [
        "camping",
        "acampada",
        "tienda de campaña"
      ]
    )
  ) {
    activeModules.push(
      "camping"
    );
  }

  // ====================================================
  // ACTIVIDADES
  // ====================================================

  if (
    matches(
      text,
      [
        "camino de santiago",
        "peregrinacion",
        "peregrinación",
        "peregrino"
      ]
    )
  ) {
    activeModules.push(
      "peregrinacion_camino"
    );

    activeModules.push(
      "senderismo_varios_dias"
    );
  }

  if (
    matches(
      text,
      [
        "senderismo",
        "trekking",
        "ruta de varios dias",
        "ruta de varios días"
      ]
    ) &&
    durationDays >= 2
  ) {
    activeModules.push(
      "senderismo_varios_dias"
    );
  }

  if (
    matches(
      text,
      [
        "disneyland",
        "disney",
        "portaventura",
        "port aventura",
        "terra mitica",
        "terra mítica",
        "parque tematico",
        "parque temático"
      ]
    )
  ) {
    activeModules.push(
      "parque_tematico"
    );

    activeModules.push(
      "jornadas_largas_fuera"
    );

    flags.longDaysOut = true;
  }

  if (
    matches(
      text,
      [
        "playa",
        "costa",
        "piscina",
        "baño",
        "banarse",
        "bañarse"
      ]
    )
  ) {
    activeModules.push(
      "playa"
    );
  }

  if (
    matches(
      text,
      [
        "nieve",
        "esqui",
        "esquí",
        "snowboard"
      ]
    )
  ) {
    activeModules.push(
      "nieve"
    );

    activeModules.push(
      "clima_frio"
    );
  }

  // ====================================================
  // VIAJEROS
  // ====================================================

  const ages =
    detectChildAges(text);

  if (
    ages.length ||
    matches(
      text,
      [
        "niño",
        "niños",
        "hijo",
        "hijos",
        "hija",
        "hijas"
      ]
    )
  ) {
    flags.hasChildren = true;

    if (
      ages.some(
        age =>
          age >= 0 &&
          age <= 3
      )
    ) {
      activeModules.push(
        "ninos_0_3"
      );
    }

    if (
      ages.some(
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
      ages.some(
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
      !ages.length
    ) {
      activeModules.push(
        "ninos_generico"
      );
    }
  }

  if (
    matches(
      text,
      [
        "bebe",
        "bebé",
        "pañales",
        "carrito de bebe",
        "carrito de bebé"
      ]
    )
  ) {
    flags.hasBaby = true;

    activeModules.push(
      "bebe"
    );
  }

  // ====================================================
  // LOGÍSTICA
  // ====================================================

  if (
    matches(
      text,
      [
        "podemos lavar",
        "lavar ropa",
        "lavaremos ropa",
        "lavado frecuente",
        "lavanderia",
        "lavandería"
      ]
    )
  ) {
    flags.frequentLaundry =
      true;

    activeModules.push(
      "lavado_frecuente"
    );
  }

  if (
    matches(
      text,
      [
        "llevamos nuestras mochilas",
        "llevaremos nuestras mochilas",
        "llevo mi mochila",
        "cargamos mochila",
        "mochila propia",
        "transportamos nuestro equipaje"
      ]
    )
  ) {
    flags.ownBackpack =
      true;

    activeModules.push(
      "mochila_propia"
    );
  }

  if (
    matches(
      text,
      [
        "solo equipaje de cabina",
        "solo cabina",
        "equipaje de mano",
        "maleta de cabina"
      ]
    )
  ) {
    flags.cabinOnly = true;

    activeModules.push(
      "equipaje_cabina"
    );
  }

  if (
    matches(
      text,
      [
        "todo el dia fuera",
        "todo el día fuera",
        "jornadas largas",
        "pasaremos el dia",
        "pasaremos el día"
      ]
    )
  ) {
    flags.longDaysOut =
      true;

    activeModules.push(
      "jornadas_largas_fuera"
    );
  }

  // ====================================================
  // TRANSPORTE
  // ====================================================

  if (
    matches(
      text,
      [
        "avion",
        "avión",
        "vuelo",
        "aeropuerto"
      ]
    )
  ) {
    activeModules.push(
      "avion"
    );
  }

  if (
    matches(
      text,
      [
        "tren",
        "interrail"
      ]
    )
  ) {
    activeModules.push(
      "tren"
    );
  }

  if (
    matches(
      text,
      [
        "coche",
        "coche propio"
      ]
    )
  ) {
    activeModules.push(
      "coche"
    );
  }

  // ====================================================
  // TIPO DE VIAJE
  // ====================================================

  if (
    matches(
      text,
      [
        "tokio",
        "tokyo",
        "kioto",
        "kyoto",
        "osaka",
        "interrail",
        "varias ciudades",
        "varios hoteles",
        "cambio de hotel"
      ]
    )
  ) {
    activeModules.push(
      "urbano_multidestino"
    );
  }

  // ====================================================
  // CLIMA / ÉPOCA ORIENTATIVA
  // ====================================================

  if (
    matches(
      text,
      [
        "noviembre",
        "diciembre",
        "enero",
        "febrero",
        "invierno"
      ]
    )
  ) {
    activeModules.push(
      "clima_frio_variable"
    );
  }

  if (
    matches(
      text,
      [
        "junio",
        "julio",
        "agosto",
        "verano",
        "calor"
      ]
    )
  ) {
    activeModules.push(
      "clima_calido"
    );
  }

  return {
    activeModules:
      [
        ...new Set(
          activeModules
        )
      ],

    durationDays,

    travellers,

    childAges:
      ages,

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
    return Number(
      dayMatch[1]
    );
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
    text.includes(
      "solo"
    )
  ) {
    return {
      adults: 1,
      children: null
    };
  }

  if (
    text.includes(
      "pareja"
    ) ||
    text.includes(
      "mi mujer"
    ) ||
    text.includes(
      "mi marido"
    )
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


function normalize(text) {
  return String(
    text || ""
  )
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
