import assert from "node:assert/strict";

import { handleAnalyze } from "../src/services/analyze.js";
import { handleGenerate } from "../src/services/generate.js";

const disneyTrip =
  "Viaje a Disneyland París, 5 días en noviembre, " +
  "2 adultos y 2 niños de 5 y 7 años, hotel, avión " +
  "y jornadas completas en los parques.";

const analysis = await handleAnalyze(
  { trip: disneyTrip },
  {}
);

const result = await handleGenerate(
  {
    trip: disneyTrip,
    analysis,
    answers: {}
  },
  {}
);

assert.deepEqual(
  result.intelligence.flags.hasChildren,
  true
);

assert.deepEqual(
  result.intelligence.travellers,
  { adults: 2, children: 2 }
);

assert.deepEqual(
  result.intelligence.child_ages,
  [5, 7]
);

assert.deepEqual(
  result.intelligence.active_modules.includes("ninos_4_7"),
  true
);

assert.match(
  analysis.trip_profile.travellers,
  /5 y 7 anos|5, 7 anos|5 y 7 años|5, 7 años/
);

const clothing = result.categories.find(
  category => category.name === "Ropa"
);

assert.ok(clothing);
assert.ok(
  clothing.items
    .filter(item => /camisetas|pantalones|ropa interior|calcetines/.test(item.name))
    .every(item => item.name.endsWith("por persona"))
);

const allItemIds = result.categories.flatMap(
  category => category.items.map(item => item.id)
);

assert.ok(allItemIds.includes("telefono_movil"));
assert.ok(allItemIds.includes("cargador_movil"));
assert.ok(allItemIds.includes("cepillo_dientes"));
assert.ok(allItemIds.includes("pasta_dientes"));
assert.ok(allItemIds.includes("desodorante"));
assert.ok(!allItemIds.includes("movil_cargador"));
assert.ok(!allItemIds.includes("neceser_base"));

console.log("Regression tests passed");
