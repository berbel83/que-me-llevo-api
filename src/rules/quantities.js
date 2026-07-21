export function applyQuantityRules(
  items,
  {
    context
  }
) {
  return items.map(item => {
    const copy = { ...item };

    const days =
      context.durationDays;

    const frequentLaundry =
      context.flags.frequentLaundry;

    const ownBackpack =
      context.flags.ownBackpack;

    const children =
      context.childAges || [];

    // ====================================================
    // CAMISETAS
    // ====================================================

    if (
  copy.id === "camisetas_base"
) {
  let qty = null;

  if (days) {
    if (frequentLaundry) {
      qty = ownBackpack ? 3 : 4;
    } else {
      qty =
        days <= 5
          ? days
          : Math.min(6, days);
    }
  }

  if (qty) {
    copy.name =
      `${qty} camisetas`;
  }

  copy.why =
    frequentLaundry
      ? "Con lavado frecuente puedes trabajar por rotación y evitar llevar una camiseta por día."
      : "Cantidad ajustada a la duración sin añadir prendas innecesarias.";

  return copy;
}

    // ====================================================
    // PANTALONES
    // ====================================================

    if (
      copy.id === "pantalones_base"
    ) {
      let qty = 2;

      if (
        days &&
        days >= 10 &&
        !ownBackpack
      ) {
        qty = 3;
      }

      if (
        ownBackpack
      ) {
        qty = 2;
      }

      copy.name =
        `${qty} pantalones o partes de abajo`;

      copy.why =
        ownBackpack
          ? "Pueden reutilizarse varios días para evitar cargar peso innecesario."
          : "Una rotación pequeña suele ser suficiente porque estas prendas pueden reutilizarse varios días.";

      return copy;
    }

    // ====================================================
    // ROPA INTERIOR
    // ====================================================

    if (
  copy.id === "ropa_interior_base"
) {
  let qty = null;

  if (days) {
    if (frequentLaundry) {
      qty = ownBackpack ? 3 : 4;
    } else {
      qty =
        Math.min(
          days + 1,
          7
        );
    }
  }

  if (qty) {
    copy.name =
      `${qty} mudas de ropa interior`;
  }

  copy.why =
    frequentLaundry
      ? "La rotación con lavado frecuente permite reducir cantidad sin sacrificar higiene."
      : "Cantidad suficiente para el viaje con un margen razonable.";

  return copy;
}

    // ====================================================
    // CALCETINES BASE
    // ====================================================

    if (
  copy.id === "calcetines_base"
) {
  let qty = null;

  if (days) {
    if (frequentLaundry) {
      qty = ownBackpack ? 3 : 4;
    } else {
      qty =
        Math.min(
          days,
          6
        );
    }
  }

  if (qty) {
    copy.name =
      `${qty} pares de calcetines`;
  }

  copy.why =
    frequentLaundry
      ? "La rotación y el lavado frecuente permiten reducir cantidad."
      : "Cantidad ajustada a la duración sin cargar pares de más.";

  return copy;
}

    // ====================================================
    // CALCETINES TÉCNICOS DE SENDERISMO
    // ====================================================

    if (
      copy.id ===
      "calcetines_tecnicos"
    ) {
      if (
        frequentLaundry
      ) {
        copy.name =
          "3 pares de calcetines técnicos de senderismo";

        copy.why =
          "Permiten alternar pares, controlar humedad y lavar uno mientras utilizas otro.";
      } else if (
        days &&
        days <= 7
      ) {
        copy.name =
          "4 pares de calcetines técnicos de senderismo";
      }

      return copy;
    }

    // ====================================================
    // ROPA PARA NIÑOS 4-7
    // ====================================================

    if (
      copy.id ===
      "muda_ninos"
    ) {
      if (
        children.some(
          age =>
            age >= 4 &&
            age <= 7
        )
      ) {
        copy.name =
          "1 muda completa infantil accesible durante el día";

        copy.why =
          "Con niños de estas edades puede resolver rápidamente manchas, agua, sudor o pequeños imprevistos sin volver al alojamiento.";
      }

      return copy;
    }

    // ====================================================
    // VIAJES LARGOS + CABINA
    // ====================================================

    if (
      context.flags.cabinOnly &&
      [
        "camisetas_base",
        "pantalones_base",
        "ropa_interior_base",
        "calcetines_base"
      ].includes(copy.id)
    ) {
      copy.why +=
        " La restricción de equipaje de cabina aconseja priorizar prendas combinables y reducir duplicados.";
    }

    return copy;
  });
}
