"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ShareButtons from "@/components/share-buttons";
type Wish={id:number;title:string;content:string};
const categories=[["mom","Mom"],["dad","Dad"],["brother","Brother"],["sister","Sister"],["best-friend","Best Friend"],["partner","Partner"],["colleague","Colleague"],["son","Son"],["daughter","Daughter"],["teacher","Teacher"],["someone-special","Someone Special"]];
const styles=[["sweet","Sweet"],["emotional","Emotional"],["funny","Funny"],["romantic","Romantic"],["cool","Cool"],["respectful","Respectful"],["short","Short & Simple"],["heart-touching","Heart-touching"]];
export default function WishGenerator(){
  const [name,setName]=useState(""),[age,setAge]=useState(""),[memory,setMemory]=useState(""),[category,setCategory]=useState("best-friend"),[style,setStyle]=useState("sweet"),[language,setLanguage]=useState("en"),[result,setResult]=useState<Wish|null>(null),[loading,setLoading]=useState(false),[error,setError]=useState("");
  async function generate(){
    setLoading(true);setError("");const supabase=createClient();
    try{
      const [{data:cr},{data:sr},{data:lr}]=await Promise.all([
        supabase.from("wish_categories").select("id").eq("slug",category).single(),
        supabase.from("wish_styles").select("id").eq("slug",style).single(),
        supabase.from("languages").select("id").eq("code",language).single()
      ]);
      const {data}=await supabase.from("wishes").select("id,title,content").eq("category_id",cr?.id??-1).eq("style_id",sr?.id??-1).eq("language_id",lr?.id??-1).eq("is_active",true).limit(20);
      const pick=data?.length?data[Math.floor(Math.random()*data.length)]:null;
      if(!pick){setError("We don't have that exact combination yet. Try another style or relationship.");setResult(null);return;}
      let content=pick.content;
      if(name.trim()) content=`Happy birthday, ${name.trim()}! ${content.replace(/^happy birthday[^.!]*[.!]?\s*/i,"").trim()}`;
      if(age.trim()) content+=` Wishing you an amazing ${age.trim()}rd year filled with happiness and unforgettable moments.`;
      if(memory.trim()) content+=` I’ll always cherish ${memory.trim()}.`;
      setResult({...pick,content});
    }catch{setError("Something went wrong. Please try again.");}finally{setLoading(false);}
  }
  return <section className="generator">
    <div className="generator-head"><h2>Create a birthday wish</h2><p>Tell us a little about them and get a message ready to send.</p></div>
    <div className="generator-grid">
      <label>Who is it for?<select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
      <label>Feeling / style<select value={style} onChange={e=>setStyle(e.target.value)}>{styles.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
      <label>Name (optional)<input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Priya"/></label>
      <label>Age (optional)<input value={age} onChange={e=>setAge(e.target.value)} placeholder="e.g. 30" inputMode="numeric"/></label>
      <label className="wide">Language<select value={language} onChange={e=>setLanguage(e.target.value)}>{[["en","English"],["hi","Hindi"],["hinglish","Hinglish"],["es","Spanish"],["fr","French"],["de","German"],["ar","Arabic"],["pt","Portuguese"]].map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
      <label className="wide">Personal memory (optional)<textarea value={memory} onChange={e=>setMemory(e.target.value)} placeholder="e.g. our Goa trip, late-night talks, or how they always support me" rows={3}/></label>
    </div>
    <button className="primary" type="button" onClick={generate} disabled={loading}>{loading?"Creating your wish…":"Generate birthday wish →"}</button>
    {error&&<p className="generator-error">{error}</p>}
    {result&&<article className="result-card"><div className="result-label">{styles.find(([v])=>v===style)?.[1]}</div><h3>{result.title}</h3><p>{result.content}</p><ShareButtons text={result.content}/></article>}
  </section>;
}