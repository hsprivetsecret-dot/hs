"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Wish = { id: number; title: string; content: string };

export default function WishGenerator() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("best-friend");
  const [style, setStyle] = useState("sweet");
  const [result, setResult] = useState<Wish | null>(null);
  const [loading, setLoading] = useState(false);

  const styles = useMemo(() => ["sweet","emotional","funny","romantic","cool","respectful","short","heart-touching"], []);

  async function generate() {
    setLoading(true);
    const supabase = createClient();
    const { data: categoryRow } = await supabase.from("wish_categories").select("id").eq("slug", category).single();
    const { data: styleRow } = await supabase.from("wish_styles").select("id").eq("slug", style).single();

    const { data } = await supabase
      .from("wishes")
      .select("id,title,content")
      .eq("category_id", categoryRow?.id ?? -1)
      .eq("style_id", styleRow?.id ?? -1)
      .eq("language_id", 1)
      .eq("is_active", true)
      .limit(10);

    const pick = data?.[Math.floor(Math.random() * (data.length || 1))] ?? null;
    setResult(pick ? { ...pick, content: name ? pick.content.replaceAll("you", name) : pick.content } : null);
    setLoading(false);
  }

  return (
    <section style={{ maxWidth: 760, margin: "0 auto", padding: "24px", borderRadius: 24, border: "1px solid #eee", background: "#fff" }}>
      <h2 style={{ marginTop: 0 }}>Create a birthday wish</h2>
      <p style={{ color: "#666" }}>Choose who it is for and the mood. We’ll find a matching message.</p>
      <div style={{ display: "grid", gap: 12 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Their name (optional)" style={{ padding: 14, borderRadius: 12, border: "1px solid #ddd" }} />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: 14, borderRadius: 12, border: "1px solid #ddd" }}>
          <option value="mom">Mom</option><option value="dad">Dad</option><option value="brother">Brother</option><option value="sister">Sister</option><option value="best-friend">Best Friend</option><option value="partner">Partner</option><option value="colleague">Colleague</option><option value="son">Son</option><option value="daughter">Daughter</option><option value="teacher">Teacher</option><option value="someone-special">Someone Special</option>
        </select>
        <select value={style} onChange={(e) => setStyle(e.target.value)} style={{ padding: 14, borderRadius: 12, border: "1px solid #ddd" }}>
          {styles.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <button type="button" onClick={generate} disabled={loading} style={{ padding: 14, borderRadius: 12, border: 0, background: "#111", color: "#fff", fontWeight: 700 }}>
          {loading ? "Finding your wish…" : "Generate birthday wish"}
        </button>
      </div>
      {result && (
        <article style={{ marginTop: 24, padding: 22, borderRadius: 18, background: "#f7f7f7" }}>
          <h3>{result.title}</h3>
          <p style={{ lineHeight: 1.7 }}>{result.content}</p>
        </article>
      )}
    </section>
  );
}