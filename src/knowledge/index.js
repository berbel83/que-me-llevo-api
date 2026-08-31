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
        true
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
        true
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
      item("antifaz_hotel", "Alojamiento", "Antifaz para dormir", "optional", "Puede mejorar el descanso si la habitación no queda suficientemente oscura.", true),
      item("tapones_hotel", "Alojamiento", "Tapones para los oídos", "optional", "Son útiles si la habitación da a una zona ruidosa.", true),
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
      item("capsulas_lavado", "Alojamiento", "Dosis pequeñas de detergente si piensas lavar", "optional", "Evita comprar un formato grande para pocos usos.", true),
      item("kit_cocina_viaje", "Alojamiento", "Pequeño kit de cocina que el alojamiento pueda no incluir", "optional", "Comprueba primero el inventario para no llevar cosas innecesarias.", true),
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
        "tienda_camping",
        "Camping",
        "Tienda de campaña con piquetas y elementos de montaje",
        "essential",
        "Solo es necesaria si el alojamiento no incluye una tienda o bungalow ya preparado.",
        true
      ),
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
      ),
      item(
        "esterilla_aislante",
        "Camping",
        "Esterilla o colchón aislante",
        "essential",
        "Aísla del suelo y mejora el descanso nocturno.",
        true
      ),
      item(
        "repelente_insectos",
        "Camping",
        "Repelente de insectos adecuado para los viajeros",
        "recommended",
        "Puede ser especialmente útil al atardecer y durante la noche.",
        true
      ),
      item(
        "agua_camping",
        "Camping",
        "Recipientes reutilizables para agua",
        "essential",
        "Facilitan disponer de agua en la parcela o zona de acampada.",
        true
      ),
      item(
        "menaje_camping",
        "Camping",
        "Menaje básico para comer y cocinar, si no está incluido",
        "recommended",
        "Evita duplicarlo si el camping o el alojamiento ya lo proporciona.",
        true
      ),
      item(
        "bateria_externa_camping",
        "Electrónica",
        "Batería externa",
        "recommended",
        "Resulta útil cuando no hay un enchufe accesible durante parte del día.",
        true
      ),
      item(
        "bolsas_residuos_camping",
        "Camping",
        "Bolsas para residuos y organización",
        "recommended",
        "Ayudan a mantener limpia y ordenada la zona de acampada.",
        false
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
      ),
      item("snacks_nino_pequeno", "Niños", "Agua y tentempiés habituales accesibles", "recommended", "Ayudan a resolver esperas y cambios de horario.", false),
      item("objeto_sueno_nino", "Niños", "Objeto habitual para dormir", "recommended", "Puede facilitar el descanso fuera de casa.", false),
      item("entretenimiento_0_3", "Niños", "Entretenimiento pequeño adecuado a su edad", "optional", "Resulta útil durante trayectos y esperas.", true)
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
      ),
      item("mochila_nino_8_12", "Niños", "Mochila ligera propia", "optional", "Puede llevar su agua y algún objeto personal sin sobrecargarla.", true),
      item("entretenimiento_8_12", "Niños", "Entretenimiento y auriculares para el trayecto", "optional", "Ayudan en desplazamientos largos respetando a otros viajeros.", true)
    ]
  },

  adolescentes: {
    items: [
      item("auriculares_adolescente", "Adolescentes", "Auriculares y entretenimiento descargado", "optional", "Facilitan trayectos largos incluso sin conexión.", true),
      item("cargador_adolescente", "Adolescentes", "Cargador identificado para sus dispositivos", "recommended", "Evita confusiones cuando viajan varios dispositivos similares.", true),
      item("mochila_adolescente", "Adolescentes", "Mochila ligera para sus objetos personales", "optional", "Les permite responsabilizarse de lo necesario durante el día.", true)
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
      ),
      item("toallitas_bebe", "Bebé", "Toallitas o material habitual para el cambio", "essential", "Permite realizar cambios fuera del alojamiento.", false),
      item("crema_bebe", "Bebé", "Crema protectora de uso habitual", "recommended", "Ayuda a prevenir o atender irritaciones durante el viaje.", false),
      item("alimentacion_bebe", "Bebé", "Alimentación, biberones y baberos según su rutina", "essential", "Mantener su rutina evita depender de encontrar productos concretos.", false),
      item("sueno_bebe", "Bebé", "Objeto o accesorio habitual para dormir", "recommended", "Un elemento familiar puede facilitar el descanso fuera de casa.", true),
      item("transporte_bebe", "Bebé", "Carrito o portabebés según el plan", "recommended", "Conviene elegir el sistema que resulte práctico para los desplazamientos previstos.", true),
      item("cambiador_portatil", "Bebé", "Cambiador portátil", "recommended", "Facilita los cambios durante trayectos y salidas.", true),
      item("silla_coche_bebe", "Bebé", "Sistema de retención infantil adecuado si se viaja en coche", "essential", "Debe ser adecuado al menor y al vehículo utilizado.", true)
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
      item("bolsa_liquidos_cabina", "Equipaje", "Bolsa transparente para líquidos y formatos permitidos", "recommended", "Facilita el control de seguridad y la organización del neceser.", true),
      item("documentos_accesibles_cabina", "Equipaje", "Documentación y reservas accesibles durante el trayecto", "essential", "Evita tener que reorganizar la maleta en controles o embarque.", false),
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
    items: [
      item("billetes_tren_offline", "Trayecto en tren", "Billetes descargados y localizador de reserva", "essential", "Permite acceder a ellos aunque falle la conexión.", false),
      item("equipaje_manejable_tren", "Trayecto en tren", "Equipaje fácil de mover y reconocer", "recommended", "Facilita transbordos, escaleras y espacios compartidos.", true),
      item("entretenimiento_tren", "Trayecto en tren", "Entretenimiento descargado y auriculares", "optional", "Resulta práctico en trayectos largos o sin cobertura.", true),
      item("agua_snack_tren", "Trayecto en tren", "Agua y tentempié para el trayecto", "optional", "Evita depender de que exista servicio a bordo.", false)
    ],
    verifications: ["Comprobar condiciones de equipaje, estación y transbordos con el operador ferroviario."]
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
      ),
      item("proteccion_solar_playa", "Playa", "Protección solar adecuada", "essential", "La exposición aumenta durante actividades de playa y piscina.", true),
      item("gorra_playa", "Playa", "Gorra o sombrero", "recommended", "Ayuda a reducir la exposición directa al sol.", true),
      item("toalla_playa", "Playa", "Toalla de playa o piscina", "recommended", "Comprueba antes si el alojamiento la proporciona.", true),
      item("chanclas_playa", "Playa", "Chanclas o calzado para zonas húmedas", "recommended", "Son prácticas en playa, piscina y duchas.", true),
      item("gafas_sol_playa", "Playa", "Gafas de sol", "recommended", "Mejoran la comodidad durante muchas horas al aire libre.", true),
      item("segundo_banador", "Playa", "Segundo bañador para viajes de varios días", "optional", "Permite alternar mientras el otro se seca.", true)
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
      ),
      item("casco_nieve", "Nieve y frío", "Casco para esquí o snowboard", "essential", "Es un elemento básico de protección durante la actividad.", true),
      item("gafas_nieve", "Nieve y frío", "Gafas de nieve", "essential", "Protegen los ojos frente a viento, nieve y luminosidad intensa.", true),
      item("ropa_exterior_nieve", "Nieve y frío", "Chaqueta y pantalón impermeables para nieve", "essential", "Mantienen el cuerpo seco durante la actividad.", true),
      item("ropa_termica_nieve", "Nieve y frío", "Capas térmicas transpirables", "essential", "Ayudan a regular la temperatura sin acumular humedad.", true),
      item("calcetines_esqui", "Nieve y frío", "Calcetines específicos de esquí", "recommended", "Mejoran el ajuste de la bota y reducen rozaduras.", true),
      item("equipo_esqui", "Nieve y frío", "Esquís o tabla, botas y bastones, propios o reservados", "essential", "Comprueba qué material llevarás y qué material alquilarás en destino.", true)
    ]
  },

  viaje_trabajo: {
    items: [
      item("portatil_trabajo", "Trabajo", "Portátil o dispositivo necesario para trabajar", "essential", "Lleva únicamente el equipo que vayas a utilizar.", true),
      item("cargador_trabajo", "Trabajo", "Cargador del equipo de trabajo", "essential", "Evita quedarte sin batería durante reuniones o desplazamientos.", true),
      item("documentacion_trabajo", "Trabajo", "Documentación, acreditaciones y archivos de la reunión", "essential", "Conviene llevarlos descargados y accesibles sin conexión.", false),
      item("ropa_formal_trabajo", "Trabajo", "Conjunto adecuado para la reunión", "essential", "Ajústalo al nivel de formalidad indicado y transpórtalo protegido.", true),
      item("adaptador_presentacion", "Trabajo", "Adaptador o cable para presentaciones, si lo necesitas", "optional", "Comprueba previamente las conexiones disponibles.", true)
    ]
  },

  viaje_internacional: {
    items: [
      item("adaptador_enchufe", "Viaje internacional", "Adaptador de enchufe compatible con el destino", "recommended", "Comprueba el tipo de enchufe y voltaje del país antes de comprarlo.", true),
      item("copias_documentos", "Viaje internacional", "Copias seguras de documentación y reservas", "recommended", "Pueden facilitar gestiones si pierdes el acceso al original.", false),
      item("conectividad_internacional", "Viaje internacional", "Solución de conectividad para el destino", "recommended", "Valora roaming, SIM o eSIM según cobertura, precio y compatibilidad.", true),
      item("traduccion_offline", "Viaje internacional", "Mapas y traducción disponibles sin conexión", "recommended", "Ayudan a orientarse cuando no hay datos móviles.", false),
      item("pago_alternativo", "Viaje internacional", "Medio de pago alternativo aceptado en el destino", "essential", "No dependas de una única tarjeta o aplicación.", false)
    ],
    verifications: [
      "Comprobar en fuentes oficiales la documentación, entrada, sanidad y requisitos vigentes del destino.",
      "Comprobar compatibilidad de pagos, conectividad y enchufes en los países visitados."
    ]
  },

  crucero: {
    items: [
      item("bolsa_embarque_crucero", "Crucero", "Bolsa de mano para las primeras horas a bordo", "recommended", "El equipaje principal puede tardar en llegar al camarote.", true),
      item("tarjetero_crucero", "Crucero", "Portatarjetas o cordón para la tarjeta del barco", "optional", "Permite tener accesible la identificación utilizada a bordo.", true),
      item("organizador_camarote", "Crucero", "Organizador compacto para camarote", "optional", "Ayuda a aprovechar un espacio de almacenamiento limitado.", true),
      item("ropa_evento_crucero", "Crucero", "Conjunto para noches o cenas especiales", "recommended", "Ajústalo al código de vestimenta comunicado por la naviera.", true),
      item("medicacion_mareo", "Salud", "Solución habitual para el mareo, si la necesitas", "recommended", "Consulta con un profesional si no sabes qué opción es adecuada para ti.", false),
      item("botella_crucero", "Crucero", "Botella reutilizable permitida por la naviera", "optional", "Puede ser útil durante excursiones y jornadas fuera del camarote.", true)
    ],
    verifications: ["Comprobar con la naviera documentación, objetos prohibidos, enchufes, vestimenta y condiciones de embarque vigentes."]
  },

  autocaravana_caravana: {
    items: [
      item("niveladores", "Autocaravana o caravana", "Calzos niveladores", "recommended", "Ayudan a estabilizar y nivelar el vehículo en la parcela.", true),
      item("cable_electrico_camping", "Autocaravana o caravana", "Cable eléctrico y adaptadores adecuados", "essential", "La conexión disponible puede variar entre áreas y campings.", true),
      item("manguera_agua", "Autocaravana o caravana", "Manguera apta para agua y adaptadores", "recommended", "Facilita el llenado cuando las tomas tienen conexiones diferentes.", true),
      item("guantes_servicio", "Autocaravana o caravana", "Guantes para tareas de servicio y vaciado", "recommended", "Permiten realizar estas tareas con mayor higiene.", true),
      item("organizacion_autocaravana", "Autocaravana o caravana", "Organizadores antideslizantes y de cierre", "recommended", "Evitan movimientos y ruidos durante la marcha.", true),
      item("linterna_autocaravana", "Autocaravana o caravana", "Linterna recargable", "recommended", "Es útil en llegadas nocturnas y revisiones exteriores.", true),
      item("botiquin_vehiculo", "Autocaravana o caravana", "Botiquín accesible en el vehículo", "essential", "Debe estar localizado y accesible para todos los adultos.", false)
    ],
    verifications: ["Comprobar documentación, masas, equipamiento obligatorio y normas de estacionamiento o pernocta aplicables al vehículo y al destino."]
  },

  road_trip: {
    items: [
      item("soporte_movil_coche", "Ruta en coche", "Soporte seguro para el móvil", "recommended", "Facilita la navegación sin sostener el teléfono.", true),
      item("cargador_coche", "Ruta en coche", "Cargador de coche multidispositivo", "recommended", "Mantiene operativos navegación y teléfonos durante etapas largas.", true),
      item("organizador_asientos", "Ruta en coche", "Organizador para respaldos o habitáculo", "optional", "Mantiene accesibles agua, entretenimiento y objetos infantiles.", true),
      item("kit_emergencia_coche", "Ruta en coche", "Kit básico de emergencia adecuado al vehículo", "essential", "Debe adaptarse al coche, la ruta y las obligaciones vigentes.", true),
      item("nevera_portatil", "Ruta en coche", "Nevera portátil compacta", "optional", "Permite conservar agua y tentempiés durante etapas largas.", true)
    ],
    verifications: ["Revisar el vehículo y comprobar normativa, documentación, asistencia y elementos obligatorios en los países de la ruta."]
  },

  mascotas: {
    items: [
      item("documentacion_mascota", "Mascota", "Documentación sanitaria e identificación de la mascota", "essential", "Los requisitos dependen del destino y del medio de transporte.", false),
      item("transportin_arnes", "Mascota", "Transportín o sistema de sujeción adecuado", "essential", "Debe adaptarse al animal, al vehículo y a las normas aplicables.", true),
      item("comedero_viaje", "Mascota", "Comedero y bebedero plegables", "recommended", "Ocupan poco y facilitan paradas y excursiones.", true),
      item("comida_mascota", "Mascota", "Comida habitual con margen", "essential", "Evita cambios bruscos o depender de encontrar la misma marca.", false),
      item("cama_manta_mascota", "Mascota", "Manta u objeto familiar", "recommended", "Puede ayudar al animal a descansar en un entorno nuevo.", true),
      item("bolsas_toalla_mascota", "Mascota", "Bolsas, toalla y material de limpieza", "recommended", "Resuelve suciedad e imprevistos durante el trayecto.", false),
      item("medicacion_mascota", "Mascota", "Medicación habitual de la mascota", "essential", "Lleva la cantidad necesaria y las indicaciones veterinarias.", false)
    ],
    verifications: ["Comprobar con fuentes oficiales, transportista y alojamientos los requisitos y condiciones para viajar con mascotas."]
  },

  vuelo_largo: {
    items: [
      item("almohada_vuelo", "Vuelo largo", "Almohada cervical compacta", "optional", "Puede mejorar el apoyo durante muchas horas sentado.", true),
      item("antifaz_vuelo", "Vuelo largo", "Antifaz y tapones para descansar", "recommended", "Ayudan a reducir luz y ruido durante el trayecto.", true),
      item("medias_compresion", "Vuelo largo", "Medias de compresión solo si son adecuadas para ti", "optional", "Consulta con un profesional si tienes dudas o factores de riesgo.", true),
      item("neceser_vuelo", "Vuelo largo", "Neceser pequeño accesible durante el vuelo", "recommended", "Permite refrescarte sin abrir el equipaje principal.", true),
      item("cable_bateria_vuelo", "Vuelo largo", "Cable largo y batería externa permitida", "recommended", "Facilita mantener los dispositivos disponibles durante escalas y vuelo.", true)
    ],
    verifications: ["Comprobar con la aerolínea las reglas vigentes para baterías, líquidos y accesorios de descanso."]
  },

  tropical_mosquitos: {
    items: [
      item("repelente_tropical", "Clima tropical", "Repelente adecuado al destino y a los viajeros", "essential", "El producto apropiado depende del lugar, edad y recomendaciones sanitarias.", true),
      item("mosquitera_viaje", "Clima tropical", "Mosquitera de viaje si el alojamiento no dispone de ella", "optional", "Puede añadir protección durante el descanso.", true),
      item("ropa_larga_tropical", "Clima tropical", "Ropa ligera de manga y pernera largas", "recommended", "Ayuda frente a insectos y exposición solar sin abrigar en exceso.", true),
      item("bolsa_estanca_tropical", "Clima tropical", "Bolsa estanca para documentación y electrónica", "recommended", "Protege objetos sensibles frente a humedad y lluvias intensas.", true),
      item("rehidratacion_viaje", "Salud", "Solución de rehidratación habitual", "optional", "Puede resultar útil con calor intenso; sigue siempre las indicaciones del producto.", false)
    ],
    verifications: ["Consultar recomendaciones sanitarias oficiales, vacunas, prevención de insectos y temporada de lluvias del destino."]
  },

  boda_evento: {
    items: [
      item("conjunto_evento", "Evento", "Conjunto completo para el evento", "essential", "Incluye prendas, complementos y ropa interior necesaria.", true),
      item("funda_ropa_evento", "Evento", "Funda para transportar la ropa", "recommended", "Reduce arrugas y protege prendas delicadas.", true),
      item("kit_arreglos_evento", "Evento", "Kit compacto para pequeños arreglos", "optional", "Puede resolver un botón, una costura o una mancha imprevista.", true),
      item("calzado_recambio_evento", "Evento", "Calzado cómodo de recambio", "optional", "Puede mejorar la comodidad después de varias horas.", true)
    ]
  },

  festival: {
    items: [
      item("rinonera_segura", "Festival", "Riñonera o bolsa compacta segura", "recommended", "Mantiene móvil y documentación cerca del cuerpo.", true),
      item("tapones_concierto", "Festival", "Tapones reutilizables para música", "recommended", "Reducen la exposición sonora manteniendo una experiencia más cómoda.", true),
      item("poncho_festival", "Festival", "Poncho compacto", "optional", "Ocupa poco y permite seguir la actividad si llueve.", true),
      item("powerbank_festival", "Festival", "Batería externa compacta", "recommended", "El móvil suele usarse para entradas, pagos y coordinación.", true),
      item("botella_permitida_festival", "Festival", "Botella permitida por la organización", "optional", "Comprueba formato y restricciones antes de llevarla.", true)
    ],
    verifications: ["Comprobar objetos permitidos, accesos, pagos y servicios en la web oficial del evento."]
  },

  cicloturismo: {
    items: [
      item("casco_cicloturismo", "Cicloturismo", "Casco adecuado", "essential", "Es una protección básica durante las etapas.", true),
      item("kit_reparacion_bici", "Cicloturismo", "Kit de reparación y cámara o solución antipinchazos", "essential", "Permite resolver averías frecuentes lejos de un taller.", true),
      item("luces_bici", "Cicloturismo", "Luces y elementos de visibilidad", "essential", "Mejoran la visibilidad ante cambios de luz o etapas imprevistas.", true),
      item("culotte_guantes", "Cicloturismo", "Culotte y guantes adecuados", "recommended", "Mejoran la comodidad durante varias horas consecutivas.", true),
      item("bidones_bici", "Cicloturismo", "Bidones o sistema de hidratación", "essential", "Facilita beber durante la etapa.", true),
      item("bolsas_bici", "Cicloturismo", "Bolsas de bicicleta bien fijadas e impermeabilizadas", "recommended", "Distribuyen el equipaje sin depender de una mochila pesada.", true)
    ]
  },

  accesibilidad: {
    items: [
      item("documentacion_accesibilidad", "Accesibilidad", "Documentación de asistencia o necesidades, si procede", "recommended", "Puede facilitar la coordinación con transportistas y alojamientos.", false),
      item("repuestos_ayuda", "Accesibilidad", "Repuestos, cargadores o herramientas de la ayuda técnica", "essential", "Conviene llevar los elementos difíciles de conseguir en destino.", true),
      item("informacion_accesible", "Accesibilidad", "Datos de asistencia y contactos guardados sin conexión", "essential", "Permiten pedir ayuda aunque no haya cobertura.", false),
      item("bolsa_accesible", "Accesibilidad", "Bolsa accesible para medicación y objetos necesarios", "recommended", "Mantiene lo importante al alcance durante los traslados.", true)
    ],
    verifications: ["Confirmar por escrito accesibilidad, asistencia, dimensiones y condiciones con transportistas, alojamientos y actividades."]
  },

  necesidades_medicas: {
    items: [
      item("informe_medico_viaje", "Salud", "Informe o documentación médica relevante", "recommended", "Puede facilitar la atención o explicar dispositivos y medicación.", false),
      item("medicacion_margen", "Salud", "Medicación con margen y distribuida de forma segura", "essential", "Evita quedarte sin tratamiento ante retrasos o pérdida de equipaje.", false),
      item("recetas_medicas", "Salud", "Recetas e información de los medicamentos", "recommended", "Facilitan comprobaciones y reposición si fuera necesaria.", false),
      item("refrigeracion_medicacion", "Salud", "Sistema de transporte adecuado si la medicación requiere temperatura controlada", "essential", "Confirma conservación y transporte con profesionales y transportistas.", true)
    ],
    verifications: ["Consultar con profesionales sanitarios y transportistas la conservación, documentación y transporte de medicación o dispositivos."]
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
