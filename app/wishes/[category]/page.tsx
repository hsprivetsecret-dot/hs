import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 300;

export async function generateStaticParams() {
  const supabase = await createClient();
  const { data } = await supabase.from("wish_categories").select("slug").eq("is_active", true);
  return (data ?? []).map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("wish_categories").select("name").eq("slug", category).eq("is_active", true).maybeSingle();
  if (!data) return {};
  return {
    title: `Birthday Wishes for ${data.name} | Wishly`,
    description: `Find beautiful birthday wishes for ${data.name.toLowerCase()}. Choose emotional, funny, sweet, romantic and more.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const supabase = await createClient();

  const { data: categoryRow } = await supabase
    .from("wish_categories").select("id,name,slug").eq("slug", category).eq("is_active", true).maybeSingle();

  if (!categoryRow) notFound();

  const { data: wishes } = await supabase
    .from("wishes")
    .select("id,title,content,slug,wish_styles(name,slug)")
    .eq("category_id", categoryRow.id)
    .eq("is_active", true)
    .eq("language_id", 1)
    .order("id");

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px", fontFamily: "Arial, sans-serif" }}>
      <Link href="/wishes">← All birthday wishes</Link>
      <header style={{ margin: "28px 0 36px" }}>
        <h1 style={{ fontSize: "clamp(34px, 6vw, 56px)", marginBottom: 12 }}>
          Birthday Wishes for {categoryRow.name}
        </h1>
        <p style={{ color: "#666", fontSize: 18 }}>
          Thoughtful birthday messages for {categoryRow.name.toLowerCase()}, ready to copy, personalize, and share.
        </p>
      </header>

      <div style={{ display: "grid", gap: 18 }}>
        {(wishes ?? []).map((wish: any) => (
          <article key={wish.id} style={{ border: "1px solid #e7e7e7", borderRadius: 18, padding: 24, background: "#fff" }}>
            <div style={{ color: "#777", fontSize: 13, marginBottom: 8 }}>{wish.wish_styles?.name}</div>
            <h2 style={{ margin: "0 0 12px" }}>{wish.title}</h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{wish.content}</p>
            <button
              type="button"
              onClick={undefined}
              style={{ marginTop: 8, padding: "10px 16px", borderRadius: 10, border: "1px solid #ddd", background: "#fafafa" }}
            >
              Copy wish
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}