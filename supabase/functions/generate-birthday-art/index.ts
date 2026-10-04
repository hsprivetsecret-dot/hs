import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "apikey, authorization, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const suppliedKey = req.headers.get("apikey") || req.headers.get("authorization")?.replace(/^Bearer\\s+/i, "") || "";
  const publishableRaw = Deno.env.get("SUPABASE_PUBLISHABLE_KEYS");
  const legacyAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!suppliedKey) return json({ error: "Unauthorized request." }, 401);
  let validPublishableKey = false;
  if (publishableRaw) {
    try {
      const parsed = JSON.parse(publishableRaw);
      const values = Object.values(parsed).filter((value): value is string => typeof value === "string");
      validPublishableKey = values.includes(suppliedKey);
    } catch {
      validPublishableKey = suppliedKey === publishableRaw;
    }
  }
  if (!validPublishableKey && legacyAnonKey) validPublishableKey = suppliedKey === legacyAnonKey;
  if (!validPublishableKey) return json({ error: "Unauthorized request." }, 401);

  const geminiKey = Deno.env.get("GEMINI_API_KEY");
  if (!geminiKey) return json({ error: "AI image generation is not configured yet." }, 503);

  let body: { prompt?: string; format?: string } = {};
  try { body = await req.json(); } catch { return json({ error: "Invalid JSON." }, 400); }

  const prompt = String(body.prompt ?? "").trim();
  const format = String(body.format ?? "4:5");
  if (prompt.length < 5) return json({ error: "Please describe the birthday artwork you want." }, 400);
  if (prompt.length > 700) return json({ error: "Prompt is too long. Keep it under 700 characters." }, 400);

  const formatHint = format === "9:16" ? "portrait 9:16 composition" : format === "1:1" ? "square 1:1 composition" : format === "16:10" ? "wide 16:9 composition that can be safely cropped to 16:10" : "portrait 3:4 composition that can be safely cropped to 4:5";
  const finalPrompt = [
    "Create a premium birthday greeting card background/artwork for BirthdayWishora.",
    formatHint + ".",
    "Elegant, joyful, modern, polished, professional, visually rich.",
    "Leave generous clean negative space for a birthday name and message to be added later.",
    "Do not include readable words, letters, logos, watermarks, or UI.",
    "The artwork should work as a card background and be suitable for social sharing.",
    "User creative direction:",
    prompt,
  ].join("\n");

  try {
    const aspectRatio = format === "9:16" ? "9:16" : format === "1:1" ? "1:1" : format === "16:10" ? "16:9" : "3:4";
    const callGemini = async (model: string) => {
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
        method: "POST",
        headers: { "x-goog-api-key": geminiKey, "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          input: finalPrompt,
          response_format: { type: "image", mime_type: "image/jpeg", aspect_ratio: aspectRatio, image_size: "1K" },
        }),
      });
      const data = await response.json();
      return { response, data };
    };

    let result = await callGemini("gemini-3.1-flash-image");
    if (!result.response.ok) {
      console.error("Gemini 3.1 image generation error", result.response.status, result.data);
      result = await callGemini("gemini-2.5-flash-image");
    }

    if (!result.response.ok) {
      console.error("Gemini image generation failed", result.response.status, result.data);
      const message = result.data?.error?.message || "Gemini could not generate the artwork.";
      return json({ error: "Gemini API error (" + result.response.status + "): " + message }, 502);
    }

    const image = result.data?.output_image?.data ??
      result.data?.steps?.find((step: any) => step?.type === "model_output")?.content?.find((block: any) => block?.type === "image")?.data;
    if (!image) return json({ error: "Gemini returned no image data. Please try again." }, 502);

    const modelUsed = result.data?.model || "gemini-2.5-flash-image";
    return json({ image: "data:image/jpeg;base64," + image, model: modelUsed });
  } catch (error) {
    console.error("Gemini image generation request failed", error);
    return json({ error: "Unable to reach Gemini right now. Please try again." }, 500);
  }
});
