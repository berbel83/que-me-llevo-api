import assert from "node:assert/strict";

import { handleAnalyze } from "../src/services/analyze.js";
import { handleGenerate } from "../src/services/generate.js";

async function evaluate(trip) {
  const analysis = await handleAnalyze({ trip }, {});
  const result = analysis.valid
    ? await handleGenerate({ trip, analysis, answers: {} }, {})
    : null;
  const ids = result
    ? result.categories.flatMap(category => category.items.map(item => item.id))
    : [];
  return { analysis, result, ids };
}

const disneyTrip =
  "Viaje a Disneyland París, 5 días en noviembre, " +
  "2 adultos y 2 niños de 5 y 7 años, hotel, avión " +
  "y jornadas completas en los parques.";
const disney = await evaluate(disneyTrip);
assert.equal(disney.result.intelligence.flags.hasChildren, true);
assert.deepEqual(disney.result.intelligence.travellers, { adults: 2, children: 2 });
assert.deepEqual(disney.result.intelligence.child_ages, [5, 7]);
assert.ok(disney.result.intelligence.active_modules.includes("ninos_4_7"));
assert.match(disney.analysis.trip_profile.travellers, /5 y 7 anos|5, 7 anos|5 y 7 años|5, 7 años/);
assert.ok(disney.ids.includes("telefono_movil"));
assert.ok(disney.ids.includes("cargador_movil"));
assert.ok(!disney.ids.includes("movil_cargador"));

const impossible = await evaluate("Voy 3 días a Marte con mi mujer en diciembre");
assert.equal(impossible.analysis.valid, false);

const beach = await evaluate("Vamos 7 días a Málaga en agosto con dos niños de 5 y 7 años; playa y piscina");
assert.ok(beach.result.intelligence.active_modules.includes("playa"));
assert.ok(beach.ids.includes("proteccion_solar_playa"));
assert.ok(beach.ids.includes("toalla_playa"));
assert.ok(beach.ids.includes("chanclas_playa"));
assert.ok(beach.result.discoveries.some(item => /arena|impermeable/.test(item.name.toLowerCase())));

const camping = await evaluate("Voy 4 días de camping en julio con mis hijos de 5 y 7 años");
assert.ok(camping.ids.includes("tienda_camping"));
assert.ok(camping.ids.includes("repelente_insectos"));
assert.ok(camping.ids.includes("linterna_frontal"));

const baby = await evaluate("Vamos 4 días a Asturias en coche con un bebé de 8 meses y dormiremos en un apartamento");
assert.ok(baby.ids.includes("toallitas_bebe"));
assert.ok(baby.ids.includes("alimentacion_bebe"));
assert.ok(baby.ids.includes("silla_coche_bebe"));

const snow = await evaluate("Voy 5 días a esquiar a Andorra en enero con tres amigos");
assert.ok(snow.ids.includes("casco_nieve"));
assert.ok(snow.ids.includes("gafas_nieve"));
assert.ok(snow.ids.includes("ropa_exterior_nieve"));

const work = await evaluate("Viajo 2 días a Barcelona por trabajo en AVE, tengo una reunión formal y dormiré en hotel");
assert.ok(work.result.intelligence.active_modules.includes("viaje_trabajo"));
assert.ok(work.result.intelligence.active_modules.includes("tren"));
assert.ok(work.ids.includes("portatil_trabajo"));
assert.ok(work.ids.includes("ropa_formal_trabajo"));
assert.ok(work.result.discoveries.some(item => /cargador|organizador/.test(item.name.toLowerCase())));

const china = await evaluate("Voy 10 días a China en diciembre: Pekín, Xi’an y Shanghái, en tren y avión, con mi mujer");
assert.ok(china.result.intelligence.active_modules.includes("viaje_internacional"));
assert.ok(china.result.intelligence.active_modules.includes("urbano_multidestino"));
assert.ok(china.ids.includes("adaptador_enchufe"));
assert.ok(china.ids.includes("conectividad_internacional"));

const camino = await evaluate("Haré el Camino de Santiago 7 días, dormiré en albergues y llevaré mi propia mochila");
assert.equal(camino.analysis.questions.some(question => question.id === "equipaje"), false);
assert.ok(camino.result.intelligence.active_modules.includes("mochila_propia"));

console.log("Regression tests passed: 9 travel profiles");
