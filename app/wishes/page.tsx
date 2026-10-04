import Link from "next/link";
import {createClient} from "@/lib/supabase/server";
export const metadata={title:"Birthday Wishes","description":"Browse birthday wishes by relationship and style — sweet, funny, emotional, romantic and more."};
export default async function Wishes(){
 const supabase=await createClient();
 const [{data:categories},{data:styles}]=await Promise.all([
  supabase.from("wish_categories").select("slug,name").eq("is_active",true).order("name"),
  supabase.from("wish_styles").select("slug,name").eq("is_active",true).order("name")
 ]);
 return <main className="site-section"><Link href="/">← Home</Link><h1>Birthday Wishes</h1><p>Find the perfect birthday message by relationship and style.</p>
  <section><h2>Birthday wishes for...</h2><div className="pill-links">{(categories??[]).map(x=><Link key={x.slug} href={`/wishes/${x.slug}`}>{x.name}</Link>)}</div></section>
  <section><h2>Popular styles</h2><div className="pill-links">{(styles??[]).map(x=><Link key={x.slug} href={`/wishes/best-friend/${x.slug}`}>{x.name}</Link>)}</div></section>
 </main>;
}