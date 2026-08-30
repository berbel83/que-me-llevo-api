const MODULES = {
  viaje_base: {
    items: [
      item(
        "documento_identidad",
        "Documentación",
        "Documento de identidad adecuado al viaje",
        "essential",
        "Para identificación, alojamientos y trámites cuando proceda.",
        false
      ),
      item(
        "medicacion_personal",
        "Salud",
        "Medicación personal habitual",
        "essential",
        "Llévala en cantidad suficiente para todo el viaje y mantenla accesible.",
        false
      ),
      item(
        "telefono_movil",
        "Electrónica",
        "Teléfono móvil",
        "recommended",
        "Útil para comunicación, reservas, navegación e información del viaje.",
        false
      ),
      item(
        "cargador_movil",
        "Electrónica",
        "Cargador del teléfono móvil",
        "essential",
        "Permite mantener operativo el teléfono durante todo el viaje.",
        false
      ),
      item(
        "cepillo_dientes",
        "Higiene",
        "Cepillo de dientes",
        "essential",
        "Artículo básico de higiene diaria.",
        false
      ),
      item(
        "pasta_dientes",
        "Higiene",
        "Pasta de dientes",
        "essential",
        "Lleva un formato adecuado a la duración y a las restricciones de equipaje.",
        false
      ),
      item(
        "desodorante",
        "Higiene",
        "Desodorante",
        "recommended",
        "Útil para el aseo diario durante el viaje.",
        false
      )
,
      item(
        "cartera_pago",
        "Documentación",
        "Cartera, tarjetas y medio de pago",
        "essential",
        "Conviene comprobarlos antes de salir y llevar alguna alternativa de pago.",
        false
      ),
      item(
        "reservas_billetes",
        "Documentación",
        "Reservas, entradas y billetes necesarios",
        "essential",
        "Llévalos accesibles en el móvil o descargados para consultarlos sin conexión.",
        false
      ),
      item(
        "peine_cepillo",
        "Higiene",
        "Peine o cepillo para el pelo",
        "recommended",
        "Artículo habitual de aseo personal.",
        false
      ),
      item(
        "gel_champu",
        "Higiene",
        "Gel y champú en formato adecuado",
        "recommended",
        "Puedes llevar formatos compartidos para toda la familia o comprobar si los aporta el alojamiento.",
        false
      ),
      item(
        "pequeno_botiquin",
        "Salud",
        "Pequeño botiquín familiar",
        "recommended",
        "Útil para rozaduras y pequeños imprevistos durante el viaje.",
        false
      ),
      item(
        "mochila_dia_base",
        "Durante el día",
        "Mochila o bolsa pequeña para las salidas",
        "recommended",
        "Permite llevar agua, documentación y lo necesario para los niños sin cargar el equipaje principal.",
        false
      )
    ]
  },

  duracion_1_3_dias: {
    items: [
      item(
        "camisetas_base",
        "Ropa",
        "Camisetas",
        "essential",
        "Cantidad ajustada a la duración del viaje.",
        false
      ),
      item(
        "pantalones_base",
        "Ropa",
        "Pantalones o partes de abajo",
        "essential",
        "Una pequeña rotación permite reutilizar prendas sin llevar de más.",
        false
      ),
      item(
        "ropa_interior_base",
        "Ropa",
        "Ropa interior",
        "essential",
        "Cantidad calculada según los días con una muda de margen.",
        false
      ),
      item(
        "calcetines_base",
        "Ropa",
        "Calcetines",
        "essential",
        "Cantidad ajustada a la duración y la actividad.",
        false
      ),
      item(
        "pijama",
        "Ropa",
        "Pijama o ropa cómoda para dormir",
        "recommended",
        "Útil para descansar fuera de casa.",
        false
      ),
      item(
        "calzado_comodo",
        "Calzado",
        "Calzado cómodo para caminar",
        "essential",
        "En una escapada urbana es habitual pasar bastantes horas caminando.",
        false
      ),
      item(
        "capa_segun_prevision",
        "Ropa y clima",
        "Chaqueta o capa adecuada a la previsión",
        "recommended",
        "Permite adaptar el equipaje a la temperatura y posibles cambios de tiempo.",
        false
      ),
      item(
        "bolsa_ropa_sucia",
        "Organización",
        "Bolsa para separar la ropa sucia",
        "optional",
        "Mantiene separado lo usado del resto del equipaje.",
        false
      )
    ],
    verifications: [
      "Consultar la previsión meteorológica concreta pocos días antes de salir."
    ]
  },

  duracion_4_7_dias: {
    items: [
      item(
        "camisetas_base",
        "Ropa",
        "Camisetas",
        "essential",
        "Cantidad ajustable según duración, actividad y posibilidad de lavar.",
        false
      ),
      item(
        "pantalones_base",
        "Ropa",
        "Pantalones o partes de abajo",
        "essential",
        "Cantidad ajustable según reutilización, actividad y clima.",
        false
      ),
      item(
        "ropa_interior_base",
        "Ropa",
        "Ropa interior",
        "essential",
        "Cantidad calculada según días y posibilidad de lavado.",
        false
      ),
      item(
        "calcetines_base",
        "Ropa",
        "Calcetines",
        "essential",
        "Cantidad calculada según actividad, duración y posibilidad de lavado.",
        false
      ),
      item(
        "pijama",
        "Ropa",
        "Pijama o ropa cómoda para dormir",
        "recommended",
        "Útil para el descanso durante varios días fuera de casa.",
        false
      )
    ]
  },

  duracion_8_14_dias: {
    items: [
      item(
        "camisetas_base",
        "Ropa",
        "Camisetas",
        "essential",
        "Cantidad ajustable según lavado y restricciones de equipaje.",
        false
      ),
      item(
        "pantalones_base",
        "Ropa",
        "Pantalones o partes de abajo",
        "essential",
        "Prioriza prendas combinables y reutilizables.",
        false
      ),
      item(
        "ropa_interior_base",
        "Ropa",
        "Ropa interior",
        "essential",
        "Cantidad adaptada a la frecuencia de lavado.",
        false
      ),
      item(
        "calcetines_base",
        "Ropa",
        "Calcetines",
        "essential",
        "Cantidad adaptada a la frecuencia de lavado y tipo de actividad.",
        false
      ),
      item(
        "pijama",
        "Ropa",
        "Pijama o ropa cómoda para dormir",
        "recommended",
        "Útil durante estancias medias o largas.",
        false
      )
    ]
  },

  duracion_15_mas: {
    items: [
      item(
        "camisetas_base",
        "Ropa",
        "Camisetas",
        "essential",
        "La cantidad debe basarse en la frecuencia de lavado, no en llevar una por día.",
        false
      ),
      item(
        "pantalones_base",
        "Ropa",
        "Pantalones o partes de abajo",
        "essential",
        "Prioriza prendas combinables, resistentes y reutilizables.",
        false
      ),
      item(
        "ropa_interior_base",
        "Ropa",
        "Ropa interior",
        "essential",
        "Cantidad adaptada al ciclo de lavado previsto.",
        false
      ),
      item(
        "calcetines_base",
        "Ropa",
        "Calcetines",
        "essential",
        "Cantidad adaptada al ciclo de lavado y al tipo de actividad.",
        false
      ),
      item(
        "pijama",
        "Ropa",
        "Pijama o ropa cómoda para dormir",
        "recommended",
        "Útil para estancias largas.",
        false
      )
    ]
  },

  hotel: {
    items: [
      item(
        "ropa_comoda_hotel",
        "Alojamiento",
        "Ropa cómoda para descansar en el hotel",
        "optional",
        "Puede resultar práctica al final de jornadas largas.",
        false
      )
    ]
  },

  apartamento: {
    items: [
      item(
        "bolsa_compra_reutilizable",
        "Alojamiento",
        "Bolsa reutilizable compacta",
        "optional",
        "Puede ser útil para pequeñas compras o lavandería durante la estancia.",
        true
      )
    ]
  },

  albergue: {
    items: [
      item(
        "chanclas_ducha",
        "Albergue y descanso",
        "Chanclas para la ducha",
        "essential",
        "Son prácticas en duchas compartidas y permiten descansar los pies después de caminar.",
        true
      ),
      item(
        "toalla_microfibra",
        "Albergue y descanso",
        "Toalla ligera de secado rápido",
        "recommended",
        "Ocupa poco espacio y puede secarse antes de volver a guardarla.",
        true
      ),
      item(
        "tapones_oidos",
        "Albergue y descanso",
        "Tapones para los oídos",
        "recommended",
        "Pueden mejorar mucho el descanso en habitaciones compartidas.",
        true
      )
    ],
    verifications: [
      "Comprobar qué ropa de cama, sábana o saco proporciona o exige cada alojamiento previsto."
    ]
  },

  camping: {
    items: [
      item(
        "sistema_descanso_camping",
        "Camping",
        "Sistema de descanso adecuado al tipo de acampada",
        "essential",
        "El aislamiento y la comodidad durante la noche condicionan mucho el descanso.",
        true
      ),
      item(
        "linterna_frontal",
        "Camping",
        "Linterna o frontal",
        "essential",
        "Permite moverse con seguridad cuando no hay iluminación suficiente.",
        true
      )
    ],
    verifications: [
      "Comprobar qué equipamiento está incluido y qué normas específicas tiene el camping."
    ]
  },

  peregrinacion_camino: {
    items: [
      item(
        "credencial_peregrino",
        "Documentación",
        "Credencial del Peregrino, si corresponde a tu Camino",
        "recommended",
        "Puede ser necesaria o útil según los alojamientos utilizados y los objetivos de la peregrinación.",
        false
      )
    ],
    verifications: [
      "Comprobar en fuentes oficiales las condiciones vigentes de la Credencial del Peregrino y cualquier requisito relacionado con los alojamientos previstos."
    ]
  },

  senderismo_varios_dias: {
    items: [
      item(
        "calzado_trekking",
        "Calzado y pies",
        "Calzado de trekking ya probado",
        "essential",
        "Evita estrenar calzado en jornadas consecutivas y reduce el riesgo de molestias.",
        true
      ),
      item(
        "calcetines_tecnicos",
        "Calzado y pies",
        "Calcetines técnicos de senderismo",
        "essential",
        "Ayudan a gestionar humedad y rozaduras durante etapas consecutivas.",
        true
      ),
      item(
        "anti_ampollas",
        "Calzado y pies",
        "Protección antirozaduras y material para ampollas",
        "essential",
        "Los pies acumulan fricción durante varios días de caminata.",
        true
      ),
      item(
        "hidratacion_senderismo",
        "Durante la etapa",
        "Botella reutilizable o sistema de hidratación",
        "essential",
        "Permite llevar agua de forma cómoda durante la marcha.",
        true
      ),
      item(
        "proteccion_solar_senderismo",
        "Durante la etapa",
        "Protección solar",
        "essential",
        "La exposición acumulada al aire libre puede ser importante.",
        true
      ),
      item(
        "gorra_senderismo",
        "Durante la etapa",
        "Gorra o sombrero ligero",
        "recommended",
        "Ayuda a reducir la exposición directa al sol durante varias horas.",
        true
      ),
      item(
        "impermeable_senderismo",
        "Ropa y clima",
        "Capa impermeable ligera",
        "recommended",
        "Protege frente a lluvia y viento sin añadir demasiado peso.",
        true
      )
    ]
  },

  parque_tematico: {
    items: [
      item(
        "mochila_dia",
        "Durante el día",
        "Mochila pequeña y cómoda para el parque",
        "recommended",
        "Permite llevar lo necesario durante jornadas largas sin cargar equipaje innecesario.",
        true
      ),
      item(
        "powerbank",
        "Electrónica",
        "Batería externa compacta",
        "recommended",
        "Fotos, aplicaciones, mapas y reservas pueden aumentar el consumo del móvil.",
        true
      ),
      item(
        "botella_parque",
        "Durante el día",
        "Botella reutilizable",
        "recommended",
        "Puede facilitar la hidratación durante jornadas largas, si las normas vigentes permiten su acceso.",
        true
      )
    ],
    verifications: [
      "Comprobar las normas vigentes del parque sobre objetos permitidos, comida, bebidas y otros artículos que puedan tener restricciones."
    ]
  },

  jornadas_largas_fuera: {
    items: [
      item(
        "panuelos",
        "Durante el día",
        "Pañuelos o toallitas compactas",
        "recommended",
        "Útiles para pequeños imprevistos durante muchas horas fuera del alojamiento.",
        false
      )
    ]
  },

  ninos_0_3: {
    items: [
      item(
        "muda_nino_pequeno",
        "Niños",
        "Muda completa accesible",
        "essential",
        "A estas edades los cambios imprevistos son frecuentes.",
        false
      )
    ]
  },

  ninos_4_7: {
    items: [
      item(
        "muda_ninos",
        "Niños",
        "Una muda infantil accesible durante el día",
        "recommended",
        "Puede resolver rápidamente manchas, agua, sudor u otros imprevistos.",
        false
      ),
      item(
        "identificacion_ninos",
        "Niños",
        "Sistema sencillo de identificación o contacto para los niños",
        "recommended",
        "Puede ser útil en lugares especialmente concurridos.",
        true
      ),
      item(
        "entretenimiento_ninos",
        "Niños",
        "Entretenimiento pequeño para esperas o trayectos",
        "optional",
        "Puede hacer más llevaderos desplazamientos y tiempos de espera.",
        false
      )
    ]
  },

  ninos_8_12: {
    items: [
      item(
        "identificacion_ninos",
        "Niños",
        "Sistema sencillo de identificación o contacto para los niños",
        "optional",
        "Puede ser útil en lugares especialmente concurridos.",
        true
      )
    ]
  },

  ninos_generico: {
    items: [
      item(
        "muda_ninos_generica",
        "Niños",
        "Muda infantil accesible según edad y actividad",
        "recommended",
        "Puede resolver pequeños imprevistos sin volver al alojamiento.",
        false
      )
    ]
  },

  bebe: {
    items: [
      item(
        "panales",
        "Bebé",
        "Pañales y consumibles con margen razonable",
        "essential",
        "Evita depender de encontrar reposición inmediatamente.",
        false
      ),
      item(
        "muda_bebe",
        "Bebé",
        "Muda completa accesible",
        "essential",
        "Los cambios imprevistos son frecuentes.",
        false
      )
    ]
  },

  lavado_frecuente: {
    items: [
      item(
        "lavado_secado",
        "Ropa y lavado",
        "Pequeña solución para lavar y secar ropa",
        "recommended",
        "Poder lavar con frecuencia permite llevar menos prendas y reducir peso.",
        true
      )
    ]
  },

  mochila_propia: {
    items: [
      item(
        "mochila_principal",
        "Mochila y organización",
        "Mochila cómoda y bien ajustada",
        "essential",
        "Vas a transportar tu propio equipaje durante varias horas.",
        true
      ),
      item(
        "proteccion_interior_mochila",
        "Mochila y organización",
        "Sistema para mantener seco el contenido de la mochila",
        "recommended",
        "Protege ropa, documentación y electrónica frente a humedad o lluvia.",
        true
      )
    ]
  },

  equipaje_cabina: {
    items: [
      item(
        "organizacion_cabina",
        "Equipaje",
        "Organizadores compactos o sistema equivalente",
        "optional",
        "Ayudan a aprovechar mejor un espacio de equipaje limitado.",
        true
      )
    ],
    verifications: [
      "Comprobar con la compañía concreta las medidas, peso y restricciones vigentes del equipaje de cabina."
    ]
  },

  avion: {
    verifications: [
      "Comprobar documentación, equipaje y restricciones vigentes directamente con la aerolínea y las fuentes oficiales correspondientes."
    ]
  },

  tren: {
    items: []
  },

  coche: {
    items: [
      item(
        "bolsa_acceso_coche",
        "Trayecto",
        "Bolsa pequeña con lo necesario durante el trayecto",
        "optional",
        "Evita tener que abrir el equipaje principal en cada parada.",
        false
      )
    ]
  },

  playa: {
    items: [
      item(
        "banador",
        "Playa",
        "Bañador",
        "essential",
        "Necesario si están previstas actividades de playa, piscina o baño.",
        false
      ),
      item(
        "bolsa_mojado",
        "Playa",
        "Bolsa para separar ropa o bañadores mojados",
        "recommended",
        "Evita humedecer el resto del equipaje.",
        true
      )
    ]
  },

  nieve: {
    items: [
      item(
        "guantes_nieve",
        "Nieve y frío",
        "Guantes adecuados",
        "essential",
        "Ayudan a mantener las manos protegidas frente a frío y humedad.",
        true
      ),
      item(
        "proteccion_labial",
        "Nieve y frío",
        "Protección labial",
        "recommended",
        "El frío, viento y exposición pueden resecar los labios.",
        true
      )
    ]
  },

  clima_frio: {
    items: [
      item(
        "capas_frio",
        "Ropa y clima",
        "Sistema de capas adaptado al frío previsto",
        "essential",
        "Permite ajustar el aislamiento a temperatura y actividad.",
        true
      )
    ],
    verifications: [
      "Consultar la previsión meteorológica concreta pocos días antes de salir."
    ]
  },

  clima_frio_variable: {
    items: [
      item(
        "capa_abrigo",
        "Ropa y clima",
        "Capa de abrigo adecuada a la previsión",
        "essential",
        "Permite adaptarse a temperaturas bajas o variables sin llevar ropa excesivamente pesada.",
        true
      ),
      item(
        "proteccion_lluvia",
        "Ropa y clima",
        "Protección compacta frente a lluvia",
        "recommended",
        "Puede resultar muy útil durante jornadas largas al aire libre si la previsión indica lluvia.",
        true
      ),
      item(
        "calzado_clima_variable",
        "Calzado",
        "Calzado cómodo y adecuado a la previsión",
        "essential",
        "El confort y la protección de los pies son especialmente importantes en jornadas largas.",
        true
      )
    ],
    verifications: [
      "Consultar la previsión meteorológica concreta pocos días antes de salir para ajustar abrigo y protección frente a lluvia."
    ]
  },

  clima_calido: {
    items: [
      item(
        "ropa_transpirable",
        "Ropa y clima",
        "Prendas transpirables y de secado razonablemente rápido",
        "recommended",
        "Mejoran la comodidad con calor y actividad.",
        false
      )
    ],
    verifications: [
      "Consultar la previsión meteorológica concreta pocos días antes de salir."
    ]
  },

    excursion_caminata: {
    items: [
      item(
        "calzado_excursion",
        "Excursiones",
        "Calzado cómodo con buen agarre",
        "recommended",
        "Útil para una excursión con terreno irregular o bastantes horas caminando.",
        true
      ),
      item(
        "mochila_dia_excursion",
        "Excursiones",
        "Mochila pequeña para la excursión",
        "recommended",
        "Permite llevar agua, una capa extra y lo necesario sin cargar el equipaje principal.",
        true
      )
    ]
  },

  bicicleta_puntual: {
    items: [
      item(
        "ropa_comoda_bici",
        "Actividades",
        "Ropa cómoda para la actividad en bicicleta",
        "recommended",
        "Una actividad puntual en bicicleta no requiere equipamiento de cicloturismo, pero sí ropa que permita moverse con comodidad.",
        false
      )
    ]
  },

  barco_puntual: {
    items: [
      item(
        "capa_viento_barco",
        "Actividades",
        "Capa ligera para viento",
        "recommended",
        "En barco puede sentirse más viento y una temperatura menor que en tierra.",
        true
      )
    ]
  },

  actividad_agua: {
    items: [
      item(
        "bolsa_estanca_pequena",
        "Actividades con agua",
        "Bolsa estanca o funda impermeable pequeña",
        "recommended",
        "Ayuda a proteger móvil, documentación y objetos sensibles durante actividades con agua o mucha humedad.",
        true
      )
    ]
  },

  safari_fauna: {
    items: [
      item(
        "repelente_insectos",
        "Safari y naturaleza",
        "Repelente de insectos adecuado al destino",
        "essential",
        "Las actividades de naturaleza pueden aumentar la exposición a insectos; conviene elegir el producto según el destino y las recomendaciones oficiales.",
        true
      ),
      item(
        "ropa_safari_ligera",
        "Safari y naturaleza",
        "Ropa cómoda y discreta para actividades de observación de fauna",
        "recommended",
        "Prioriza prendas prácticas y adaptadas al clima previsto y al tipo de actividad.",
        false
      ),
      item(
        "prismaticos",
        "Safari y naturaleza",
        "Prismáticos compactos",
        "optional",
        "Pueden mejorar mucho la observación de fauna sin necesidad de acercarse.",
        true
      )
    ],
    verifications: [
      "Consultar recomendaciones sanitarias y de seguridad oficiales específicas del destino y de las actividades de naturaleza previstas."
    ]
  },

  evento_formal: {
    items: [
      item(
        "conjunto_arreglado",
        "Ocasiones especiales",
        "Un conjunto algo más arreglado",
        "recommended",
        "Evita tener que improvisar si el itinerario incluye una cena o evento con un ambiente más formal.",
        false
      )
    ]
  },

  urbano_multidestino: {
    items: [
      item(
        "calzado_urbano",
        "Calzado",
        "Calzado cómodo ya probado para caminar muchas horas",
        "essential",
        "Los viajes urbanos itinerantes suelen acumular muchos pasos.",
        true
      ),
      item(
        "organizador_reservas",
        "Organización",
        "Sistema compacto para organizar reservas y documentación",
        "recommended",
        "Facilita cambios frecuentes de transporte, alojamiento y ciudad.",
        true
      )
    ]
  }
};

export function buildKnowledge(
  activeModules,
  activityModules = []
) {
  const items = [];
  const verifications = [];

  const seenIds = new Set();

  const allModules = [
  ...activeModules,
  ...activityModules
];

for (
  const moduleName
  of allModules
) {
    const module =
      MODULES[moduleName];

    if (!module) {
      continue;
    }

    for (
      const baseItem
      of module.items || []
    ) {
      if (
        seenIds.has(
          baseItem.id
        )
      ) {
        continue;
      }

      seenIds.add(
        baseItem.id
      );

      items.push({
        ...baseItem,
        source_module:
          moduleName
      });
    }

    for (
      const verification
      of module.verifications || []
    ) {
      verifications.push(
        verification
      );
    }
  }

  // ==================================================
  // SUSTITUCIONES INTELIGENTES
  // ==================================================
  //
  // Un objeto especializado puede sustituir
  // a otro más genérico.
  //
  // Ejemplo:
  // calcetines técnicos de senderismo
  // sustituye a calcetines genéricos.
  //
  // Esto evita que los módulos simplemente
  // acumulen objetos duplicados.
  // ==================================================

  const replacementRules = {
    calcetines_tecnicos: [
      "calcetines_base"
    ],

    calzado_trekking: [
      "calzado_urbano"
    ]
  };

  const existingIds =
    new Set(
      items.map(
        item => item.id
      )
    );

  const idsToRemove =
    new Set();

  for (
    const [
      specializedId,
      replacedIds
    ]
    of Object.entries(
      replacementRules
    )
  ) {
    if (
      !existingIds.has(
        specializedId
      )
    ) {
      continue;
    }

    for (
      const replacedId
      of replacedIds
    ) {
      idsToRemove.add(
        replacedId
      );
    }
  }

  const finalItems =
    items.filter(
      item =>
        !idsToRemove.has(
          item.id
        )
    );

  return {
    items: finalItems,
    verifications
  };
}


function item(
  id,
  category,
  name,
  priority,
  why,
  productCandidate
) {
  return {
    id,
    category,
    name,
    priority,
    why,
    product_candidate:
      productCandidate
  };
}
