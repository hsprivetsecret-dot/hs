import Link from "next/link";
import {notFound} from "next/navigation";
import {createClient} from "@/lib/supabase/server";
import ShareButtons from "@/components/share-buttons";
export async function generateStaticParams(){const s=await createClient();const {data}=await s.from("wish_categories").select("slug").eq("is_active",true);return(data??[]).map(x=>({category:x.slug}));}
export async function generateMetadata({params}:{params:Promise<{category:string}>}){const {category}=await params;const s=await createClient();const {data}=await s.from("wish_categories").select("name").eq("slug",category).eq("is_active",true).maybeSingle();if(!data)return{};return{title:`Birthday Wishes for ${data.name}`,description:`Beautiful birthday wishes for ${data.name.toLowerCase()}. Find sweet, funny, emotional, romantic and short messages to copy and share.`};}
export default async function CategoryPage({params}:{params:Promise<{category:string}>}){
 const {category}=await params;const s=await createClient();
 const {data:c}=await s.from("wish_categories").select("id,name,slug").eq("slug",category).eq("is_active",true).maybeSingle();if(!c)notFound();
 const [{data:wishes},{data:styles},{data:en}]=await Promise.all([
  s.from("wishes").select("id,title,content,slug,wish_styles(name,slug)").eq("category_id",c.id).eq("is_active",true).order("id"),
  s.from("wish_styles").select("slug,name").eq("is_active",true).order("name"),
  s.from("languages").select("id").eq("code","en").single()
 ]);
 const englishWishes=await s.from("wishes").select("id,title,content,slug,wish_styles(name,slug)").eq("category_id",c.id).eq("is_active",true).eq("language_id",en?.id??-1).order("id");
 const rows=englishWishes.data??wishes??[];
 return <main className="category-page"><Link href="/wishes">← All birthday wishes</Link><header><h1>Birthday Wishes for {c.name}</h1><p>Thoughtful birthday messages for {c.name.toLowerCase()}, ready to personalize and share.</p></header>
  <div className="style-links">{(styles??[]).map(x=><Link key={x.slug} href={`/wishes/${c.slug}/${x.slug}`}>{x.name}</Link>)}</div>
  <div className="wish-list">{rows.map((wish:any)=><article className="wish-card" key={wish.id}><div className="result-label">{wish.wish_styles?.name}</div><h2>{wish.title}</h2><p>{wish.content}</p><ShareButtons text={wish.content}/></article>)}</div>
 </main>;
}