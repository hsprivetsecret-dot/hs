import {NextResponse} from "next/server";
import {createClient} from "@/lib/supabase/server";

export async function POST(request:Request){
  try{
    const body=await request.json();
    const name=String(body.name??"").slice(0,80);
    const relationship=String(body.relationship??"someone special").slice(0,80);
    const style=String(body.style??"sweet").slice(0,60);
    const language=String(body.language??"English").slice(0,40);
    const age=String(body.age??"").slice(0,20);
    const memory=String(body.memory??"").slice(0,400);
    if(!process.env.OPENAI_API_KEY)return NextResponse.json({error:"AI is not configured"},{status:503});
    const prompt=[
      "Write one original birthday wish.",
      `Language: ${language}.`,`Relationship: ${relationship}.`,`Style: ${style}.`,
      age?`Age: ${age}.`:"",name?`Recipient name: ${name}.`:"",
      memory?`Personal detail: ${memory}.`:"",
      "Return only the finished wish. Keep it natural, warm and culturally appropriate. Do not mention being an AI."
    ].filter(Boolean).join(" ");
    const response=await fetch("https://api.openai.com/v1/responses",{
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization:`Bearer ${process.env.OPENAI_API_KEY}`},
      body:JSON.stringify({model:process.env.OPENAI_MODEL??"gpt-5.6",input:prompt,store:false})
    });
    if(!response.ok)return NextResponse.json({error:"AI provider error"},{status:502});
    const data=await response.json();
    const content=String(data.output_text??"").trim();
    if(!content)return NextResponse.json({error:"Empty AI response"},{status:502});
    const supabase=await createClient();
    const [{data:c},{data:s},{data:l}]=await Promise.all([
      supabase.from("wish_categories").select("id").eq("slug",body.categorySlug).maybeSingle(),
      supabase.from("wish_styles").select("id").eq("slug",body.styleSlug).maybeSingle(),
      supabase.from("languages").select("id").eq("code",body.languageCode).maybeSingle()
    ]);
    await supabase.from("generated_wishes").insert({user_id:null,category_id:c?.id??null,style_id:s?.id??null,language_id:l?.id??null,recipient_name:name||null,prompt:prompt,content});
    return NextResponse.json({title:`${style} birthday wish`,content});
  }catch{return NextResponse.json({error:"Invalid request"},{status:400});}
}
