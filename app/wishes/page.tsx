import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

export default async function Wishes() {
  const supabase = await createClient();
  const [{ data: categories }, { data: styles }] = await Promise.all([
    supabase.from("wish_categories").select("slug,name").eq("is_active", true).order("name"),
    supabase.from("wish_styles").select("slug,name").eq("is_active", true).order("name"),
  ]);

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: 40, fontFamily: "Arial, sans-serif" }}>
      <Link href="/">← Home</Link>
      <h1 style={{ fontSize: 42, marginBottom: 8 }}>Birthday Wishes</h1>
      <p style={{ color: "#666", marginBottom: 32 }}>
        Find the perfect birthday message by relationship and style.
      </p>

      <section>
        <h2>For someone special</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {(categories ?? []).map((item) => (
            <Link key={item.slug} href={`/wishes/${item.slug}`} style={{ padding: "10px 14px", border: "1px solid #ddd", borderRadius: 999 }}>
              {item.name}
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Choose a style</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {(styles ?? []).map((item) => (
            <span key={item.slug} style={{ padding: "10px 14px", background: "#f5f5f5", borderRadius: 999 }}>
              {item.name}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}