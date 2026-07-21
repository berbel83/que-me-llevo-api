import { handleAnalyze } from "./services/analyze.js";
import { handleGenerate } from "./services/generate.js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return jsonResponse(
        { error: "Usa una petición POST." },
        405
      );
    }

    try {
      const body = await request.json();

      if (body.mode === "analyze") {
        const result = await handleAnalyze(body, env);
        return jsonResponse(result, 200);
      }

      if (body.mode === "generate") {
        const result = await handleGenerate(body, env);
        return jsonResponse(result, 200);
      }

      return jsonResponse(
        { error: "Modo no reconocido." },
        400
      );

    } catch (error) {
      return jsonResponse(
        {
          error: "Error interno.",
          details: error.message
        },
        500
      );
    }
  }
};

function jsonResponse(data, status) {
  return new Response(
    JSON.stringify(data),
    {
      status,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    }
  );
}
