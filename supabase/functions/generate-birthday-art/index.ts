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

  const suppliedKey = req.headers.get("apikey");
  const publishableRaw = Deno.env.get("SUPABASE_PUBLISHABLE_KEYS");
  if (!suppliedKey || !publishableRaw) return json({ error: "Unauthorized request." }, 401);
  try {
    const publishableKeys = JSON.parse(publishableRaw);
    if (!Object.values(publishableKeys).includes(suppliedKey)) return json({ error: "Unauthorized request." }, 401);
  } catch {
    return json({ error: "Function configuration error." }, 500);
  }

  const openaiKey = Deno.env.get("OPENAI_API_KEY");
  if (!openaiKey) return json({ error: "AI image generation is not configured yet." }, 503);

  let body: { prompt?: string; format?: string } = {};
  try { body = await req.json(); } catch { return json({ error: "Invalid JSON." }, 400); }

  const prompt = String(body.prompt ?? "").trim();
  const format = String(body.format ?? "4:5");
  if (prompt.length < 5) return json({ error: "Please describe the birthday artwork you want." }, 400);
  if (prompt.length > 700) return json({ error: "Prompt is too long. Keep it under 700 characters." }, 400);

  const formatHint = format === "9:16" ? "portrait 9:16 composition" : format === "1:1" ? "square 1:1 composition" : format === "16:10" ? "wide 16:10 composition" : "portrait 4:5 composition";
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
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { "Authorization": `Bearer ${openaiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gpt-image-2.5-sunburst", prompt: finalPrompt, size: "1024x1024", quality: "medium" }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("OpenAI image generation error", response.status, data);
      return json({ error: data?.error?.message || "Image generation failed." }, 502);
    }
    const image = data?.data?.[0]?.b64_json;
    if (!image) return json({ error: "No image was returned." }, 502);
    return json({ image: `data:image/png;base64,${image}`, model: "gpt-image-2.5-sunburst" });
  } catch (error) {
    console.error("Image generation request failed", error);
    return json({ error: "Unable to generate the artwork right now." }, 500);
  }
});
