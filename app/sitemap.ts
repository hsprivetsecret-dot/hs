import type {MetadataRoute} from "next";
import {createClient} from "@/lib/supabase/server";
export const dynamic = "force-static";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
 const base=process.env.NEXT_PUBLIC_SITE_URL;if(!base)return[];
 const s=await createClient();
 const [{data:c},{data:st}]=await Promise.all([s.from("wish_categories").select("slug").eq("is_active",true),s.from("wish_styles").select("slug").eq("is_active",true)]);
 const fixed=["","wishes","cards","about","our-story","contact","privacy-policy","terms-and-conditions","cookie-policy","disclaimer"].map(path=>({url:path?`${base}/${path}`:base,lastModified:new Date()}));
 return [...fixed,...(c??[]).map(x=>({url:`${base}/wishes/${x.slug}`,lastModified:new Date()})),...(c??[]).flatMap(a=>(st??[]).map(b=>({url:`${base}/wishes/${a.slug}/${b.slug}`,lastModified:new Date()})))];
}