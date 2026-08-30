export function sanitizeCategories(categories) {
  if (!Array.isArray(categories)) {
    return [];
  }

  const abstractNames = new Set([
    "seguridad",
    "navegacion",
    "hidratacion",
    "alimentacion",
    "hidratacion y alimentacion",
    "sueno y alojamiento",
    "electronica",
    "ropa",
    "salud"
  ]);

  const forbiddenAmazon =
    /dni|pasaporte|documento|credencial|medicaci[oó]n|tel[eé]fono m[oó]vil|tarjeta|ropa interior|camiseta|pantal[oó]n|pijama|alimento|snack/i;

  const result = [];

  for (const category of categories) {
    const cleanItems = [];

    for (const item of category.items || []) {
      if (!item?.name) {
        continue;
      }

      const normalizedName = normalize(item.name);

      if (abstractNames.has(normalizedName)) {
        continue;
      }

      cleanItems.push({
        ...item,
        product_candidate:
          forbiddenAmazon.test(item.name)
            ? false
            : Boolean(item.product_candidate)
      });
    }

    if (cleanItems.length) {
      result.push({
        ...category,
        items: dedupeItems(cleanItems)
      });
    }
  }

  return mergeDuplicateCategories(result);
}


export function sanitizeLeaveHome(leaveHome) {
  if (!Array.isArray(leaveHome)) {
    return [];
  }

  const forbidden =
    /dni|pasaporte|documento|credencial|medicaci[oó]n|tarjeta|verificar|comprobar|notificar|objetos personales|objetos no esenciales|pertenencias|fecha del viaje|nivel de preparaci[oó]n/i;

  const cleaned = [];

  for (const item of leaveHome) {
    if (!item?.name) {
      continue;
    }

    if (forbidden.test(item.name)) {
      continue;
    }

    const normalized = normalize(item.name);

    const duplicate =
      cleaned.some(
        existing =>
          normalize(existing.name) === normalized
      );

    if (!duplicate) {
      cleaned.push(item);
    }
  }

  return cleaned;
}


export function dedupeVerifications(values) {
  if (!Array.isArray(values)) {
    return [];
  }

  const result = [];
  const seenTopics = new Set();

  for (const value of values) {
    if (!value) {
      continue;
    }

    const normalized =
      normalize(value);

    const topic =
      detectVerificationTopic(
        normalized
      );

    if (seenTopics.has(topic)) {
      continue;
    }

    seenTopics.add(topic);
    result.push(value);
  }

  return result;
}


// ======================================================
// DEDUPLICAR OBJETOS
// ======================================================

function dedupeItems(items) {
  const result = [];

  for (const item of items) {
    const duplicateIndex =
      result.findIndex(existing => {
        if (
          item.id &&
          existing.id &&
          item.id === existing.id
        ) {
          return true;
        }

        return semanticallySimilar(
          item.name,
          existing.name
        );
      });

    if (duplicateIndex === -1) {
      result.push(item);
      continue;
    }

    result[duplicateIndex] =
      chooseBestItem(
        result[duplicateIndex],
        item
      );
  }

  return result;
}


// ======================================================
// FUSIONAR CATEGORÍAS REPETIDAS
// ======================================================

function mergeDuplicateCategories(
  categories
) {
  const map = new Map();

  for (const category of categories) {
    const key =
      normalize(category.name);

    if (!map.has(key)) {
      map.set(key, {
        name: category.name,
        items: []
      });
    }

    map
      .get(key)
      .items
      .push(
        ...(category.items || [])
      );
  }

  return Array.from(
    map.values()
  ).map(category => ({
    ...category,
    items: dedupeItems(
      category.items
    )
  }));
}


// ======================================================
// ELEGIR LA MEJOR VERSIÓN DE UN DUPLICADO
// ======================================================

function chooseBestItem(a, b) {
  const scoreA =
    itemQualityScore(a);

  const scoreB =
    itemQualityScore(b);

  const winner =
    scoreB > scoreA
      ? b
      : a;

  const loser =
    winner === a
      ? b
      : a;

  return {
    ...winner,

    why:
      winner.why ||
      loser.why ||
      "",

    product_candidate:
      Boolean(
        winner.product_candidate ||
        loser.product_candidate
      ),

    source_module:
      winner.source_module ||
      loser.source_module
  };
}


function itemQualityScore(item) {
  let score = 0;

  if (item.id) {
    score += 2;
  }

  if (
    item.name &&
    /\d/.test(item.name)
  ) {
    score += 3;
  }

  if (
    item.why &&
    item.why.length > 40
  ) {
    score += 2;
  }

  if (
    item.source_module
  ) {
    score += 1;
  }

  return score;
}


// ======================================================
// TEMAS DE VERIFICACIÓN
// ======================================================

function detectVerificationTopic(
  text
) {
  if (
    /meteorolog|prevision|pronostico|clima/.test(
      text
    )
  ) {
    return "weather";
  }

  if (
    /credencial del peregrino/.test(
      text
    )
  ) {
    return "pilgrim_credential";
  }

  if (
    /ropa de cama|sabana|saco/.test(
      text
    )
  ) {
    return "bedding";
  }

  if (
    /albergue|alojamiento/.test(
      text
    )
  ) {
    return "accommodation";
  }

  if (
    /aerolinea|equipaje de cabina|maleta de mano/.test(
      text
    )
  ) {
    return "airline_baggage";
  }

  if (
    /parque|objetos permitidos|comida|bebidas/.test(
      text
    )
  ) {
    return "park_rules";
  }

  if (
    /documentacion|visado|frontera|entrada al pais/.test(
      text
    )
  ) {
    return "entry_requirements";
  }

  return text;
}


// ======================================================
// SIMILITUD
// ======================================================

function semanticallySimilar(a, b) {
  const na = normalize(a);
  const nb = normalize(b);

  if (!na || !nb) {
    return false;
  }

  if (na === nb) {
    return true;
  }

  if (
    isComplementaryAccessory(na, nb)
  ) {
    return false;
  }

  if (
    na.includes(nb) ||
    nb.includes(na)
  ) {
    return true;
  }

  const stopWords =
    new Set([
      "para",
      "durante",
      "adecuado",
      "adecuada",
      "ligero",
      "ligera",
      "viaje",
      "ropa",
      "sistema",
      "personal"
    ]);

  const wordsA =
    na
      .split(" ")
      .filter(
        word =>
          word.length > 3 &&
          !stopWords.has(word)
      );

  const wordsB =
    new Set(
      nb
        .split(" ")
        .filter(
          word =>
            word.length > 3 &&
            !stopWords.has(word)
        )
    );

  let matches = 0;

  for (const word of wordsA) {
    if (wordsB.has(word)) {
      matches++;
    }
  }

  return matches >= 2;
}


function isComplementaryAccessory(a, b) {
  const accessoryWords = [
    "cargador",
    "cable",
    "adaptador",
    "funda"
  ];

  return accessoryWords.some(word =>
    a.includes(word) !== b.includes(word)
  );
}


// ======================================================
// NORMALIZAR
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
