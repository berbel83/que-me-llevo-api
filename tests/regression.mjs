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

const cruise = await evaluate("Voy 7 días de crucero por el Mediterráneo en agosto con mi mujer y dormiré en camarote");
assert.ok(cruise.result.intelligence.active_modules.includes("crucero"));
assert.ok(cruise.ids.includes("bolsa_embarque_crucero"));

const motorhome = await evaluate("Vamos 10 días a Portugal en agosto con mi mujer en autocaravana");
assert.ok(motorhome.result.intelligence.active_modules.includes("autocaravana_caravana"));
assert.ok(motorhome.ids.includes("niveladores"));

const roadTrip = await evaluate("Vamos 8 días a Francia en julio con mi mujer para hacer un road trip y dormiremos en hoteles");
assert.ok(roadTrip.result.intelligence.active_modules.includes("road_trip"));
assert.ok(roadTrip.ids.includes("soporte_movil_coche"));

const pet = await evaluate("Vamos 5 días a Cádiz en junio con mi mujer y con nuestro perro; dormiremos en apartamento");
assert.ok(pet.result.intelligence.active_modules.includes("mascotas"));
assert.ok(pet.ids.includes("comedero_viaje"));

const longFlight = await evaluate("Voy 10 días a Nueva York en diciembre con mi mujer, en un vuelo largo y hotel");
assert.ok(longFlight.result.intelligence.active_modules.includes("vuelo_largo"));
assert.ok(longFlight.ids.includes("almohada_vuelo"));

const tropical = await evaluate("Vamos 8 días a Costa Rica en agosto con mi mujer, clima tropical, selva y hotel");
assert.ok(tropical.result.intelligence.active_modules.includes("tropical_mosquitos"));
assert.ok(tropical.ids.includes("repelente_tropical"));

const wedding = await evaluate("Voy 3 días a Sevilla en mayo con mi mujer para una boda y dormiremos en hotel");
assert.ok(wedding.result.intelligence.active_modules.includes("boda_evento"));
assert.ok(wedding.ids.includes("funda_ropa_evento"));

const festival = await evaluate("Voy 4 días a Madrid en junio con mi mujer para un festival de música y dormiremos en hotel");
assert.ok(festival.result.intelligence.active_modules.includes("festival"));
assert.ok(festival.ids.includes("tapones_concierto"));

const interrail = await evaluate("Vamos 12 días a Italia en julio con mi mujer haciendo Interrail y durmiendo en hoteles");
assert.ok(interrail.result.intelligence.active_modules.includes("tren"));
assert.ok(interrail.ids.includes("equipaje_manejable_tren"));

const cycling = await evaluate("Voy 7 días a Girona en junio con mi mujer para una ruta de varios días en bici y hotel");
assert.ok(cycling.result.intelligence.active_modules.includes("cicloturismo"));
assert.ok(cycling.ids.includes("kit_reparacion_bici"));

const teen = await evaluate("Vamos 5 días a Valencia en julio con mi mujer y mi hijo de 15 años; dormiremos en hotel");
assert.ok(teen.result.intelligence.active_modules.includes("adolescentes"));
assert.ok(teen.ids.includes("auriculares_adolescente"));

const accessible = await evaluate("Voy 4 días a Bilbao en mayo con mi mujer, uso silla de ruedas y dormiremos en hotel");
assert.ok(accessible.result.intelligence.active_modules.includes("accesibilidad"));
assert.ok(accessible.ids.includes("repuestos_ayuda"));

const medical = await evaluate("Voy 6 días a Tenerife en junio con mi mujer, tengo diabetes y uso insulina; dormiremos en hotel");
assert.ok(medical.result.intelligence.active_modules.includes("necesidades_medicas"));
assert.ok(medical.ids.includes("informe_medico_viaje"));

const toddler = await evaluate("Vamos 4 días a Granada en mayo con mi mujer y mi hijo de 2 años; dormiremos en hotel");
assert.ok(toddler.result.intelligence.active_modules.includes("ninos_0_3"));
assert.ok(toddler.ids.includes("objeto_sueno_nino"));

const olderChild = await evaluate("Vamos 4 días a Córdoba en mayo con mi mujer y mi hijo de 10 años; dormiremos en hotel");
assert.ok(olderChild.result.intelligence.active_modules.includes("ninos_8_12"));
assert.ok(olderChild.ids.includes("mochila_nino_8_12"));

const apartment = await evaluate("Vamos 6 días a Alicante en junio con mi mujer y dormiremos en apartamento con lavadora");
assert.ok(apartment.result.intelligence.active_modules.includes("apartamento"));
assert.ok(apartment.ids.includes("capsulas_lavado"));

console.log("Regression tests passed: 25 travel profiles");
