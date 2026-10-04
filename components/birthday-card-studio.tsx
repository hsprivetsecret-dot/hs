"use client";

import {useEffect, useRef, useState} from "react";

const formats=[
 {id:"card",name:"Birthday Card",icon:"🎂",width:1200,height:1500,ratio:"4:5"},
 {id:"story",name:"Instagram Story",icon:"📱",width:1080,height:1920,ratio:"9:16"},
 {id:"whatsapp",name:"WhatsApp Status",icon:"📸",width:1080,height:1920,ratio:"9:16"},
 {id:"share",name:"Shareable Image",icon:"🖼️",width:1200,height:1200,ratio:"1:1"},
 {id:"digital",name:"Digital Greeting Card",icon:"💌",width:1600,height:1000,ratio:"16:10"},
];
const templates=[
 {id:"bloom",name:"Elegant Bloom",className:"studio-template-bloom",emoji:"🌸"},
 {id:"midnight",name:"Midnight Celebration",className:"studio-template-midnight",emoji:"✨"},
 {id:"confetti",name:"Happy Confetti",className:"studio-template-confetti",emoji:"🎉"},
 {id:"love",name:"Love Note",className:"studio-template-love",emoji:"💖"},
 {id:"gold",name:"Golden Moment",className:"studio-template-gold",emoji:"✦"},
 {id:"pastel",name:"Sweet Pastel",className:"studio-template-pastel",emoji:"🌷"},
];

function roundRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
function fitImage(ctx,img,x,y,w,h){const scale=Math.max(w/img.width,h/img.height),nw=img.width*scale,nh=img.height*scale;ctx.drawImage(img,x+(w-nw)/2,y+(h-nh)/2,nw,nh);}
function wrap(ctx,text,cx,startY,maxWidth,lineHeight,maxLines){const words=text.split(/\s+/);let line="",y=startY,lines=0;for(const word of words){const test=line?line+" "+word:word;if(ctx.measureText(test).width>maxWidth&&line){ctx.fillText(line,cx,y);line=word;y+=lineHeight;lines++;if(lines>=maxLines)break;}else line=test;}if(lines<maxLines&&line)ctx.fillText(line,cx,y);}

export default function BirthdayCardStudio(){
 const canvasRef=useRef(null);
 const [formatId,setFormatId]=useState("card");
 const [templateId,setTemplateId]=useState("bloom");
 const [name,setName]=useState("");
 const [message,setMessage]=useState("Wishing you a beautiful birthday filled with happiness, love and unforgettable moments.");
 const [photo,setPhoto]=useState(null);
 const [photoFileName,setPhotoFileName]=useState("");
 const [notice,setNotice]=useState("");
 const format=formats.find(x=>x.id===formatId)||formats[0];
 const template=templates.find(x=>x.id===templateId)||templates[0];

 const draw=()=>{
  const canvas=canvasRef.current;if(!canvas)return;canvas.width=format.width;canvas.height=format.height;
  const ctx=canvas.getContext("2d");if(!ctx)return;const W=canvas.width,H=canvas.height;
  const palettes={bloom:["#efe6d2","#f5b6c7","#6f4b77"],midnight:["#171522","#55416a","#e8d5ff"],confetti:["#ffd6e8","#f7a5b9","#f29b38"],love:["#f5d4e8","#c96b9f","#7a315e"],gold:["#f3dfb1","#c99545","#5b3b19"],pastel:["#d9e8dc","#e9b9c8","#6d668d"]};
  const p=palettes[templateId]||palettes.bloom;const grad=ctx.createLinearGradient(0,0,W,H);grad.addColorStop(0,p[0]);grad.addColorStop(.55,p[1]);grad.addColorStop(1,p[2]);ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);
  ctx.fillStyle="rgba(255,255,255,.16)";for(let i=0;i<12;i++){ctx.beginPath();ctx.arc((i*137)%W,(i*211)%H,35+(i%4)*18,0,Math.PI*2);ctx.fill();}
  const photoBox=format.id==="digital"?{x:W*.53,y:H*.12,w:W*.38,h:H*.58}:format.id==="story"||format.id==="whatsapp"?{x:W*.10,y:H*.11,w:W*.80,h:H*.43}:format.id==="share"?{x:W*.09,y:H*.08,w:W*.82,h:H*.45}:{x:W*.10,y:H*.08,w:W*.80,h:H*.43};
  const finish=()=>{
   const center=format.id==="digital"&&photo?W*.28:W/2,max=format.id==="digital"&&photo?W*.48:W*.78;
   ctx.textAlign="center";ctx.fillStyle="rgba(255,255,255,.9)";ctx.font="800 "+Math.max(18,W*.018)+"px Arial";ctx.fillText("BIRTHDAYWISHORA",center,format.id==="digital"&&photo?H*.10:H*.08);
   ctx.font=Math.max(42,W*.07)+"px Arial";ctx.fillText(template.emoji,center,format.id==="digital"&&photo?H*.24:H*.61);
   ctx.fillStyle="#fff";ctx.font="900 "+Math.max(44,W*.07)+"px Arial";wrap(ctx,name.trim()?("Happy Birthday, "+name.trim()+"!"):"Happy Birthday!",center,format.id==="digital"&&photo?H*.34:H*.69,max,Math.max(42,W*.065),2);
   ctx.font="500 "+Math.max(20,W*.026)+"px Arial";wrap(ctx,message||"Wishing you a wonderful birthday!",center,format.id==="digital"&&photo?H*.47:H*.81,max,Math.max(20,W*.026),4);
   ctx.font="700 "+Math.max(16,W*.018)+"px Arial";ctx.fillStyle="rgba(255,255,255,.85)";ctx.fillText("Make Every Birthday Unforgettable.",center,H*.94);
  };
  if(photo){const img=new Image();img.onload=()=>{ctx.save();roundRect(ctx,photoBox.x,photoBox.y,photoBox.w,photoBox.h,Math.min(36,W*.035));ctx.clip();fitImage(ctx,img,photoBox.x,photoBox.y,photoBox.w,photoBox.h);ctx.restore();finish();};img.src=photo;}else finish();
 };
 useEffect(()=>{draw();},[formatId,templateId,name,message,photo]);

 const upload=(file)=>{
  if(!file||!file.type.startsWith("image/"))return;setPhotoFileName(file.name);const reader=new FileReader();reader.onload=()=>setPhoto(String(reader.result));reader.readAsDataURL(file);
 };
 const download=()=>{const c=canvasRef.current;if(!c)return;const a=document.createElement("a");a.download="birthdaywishora-"+formatId+".png";a.href=c.toDataURL("image/png");a.click();setNotice("Your birthday image is ready.");};
 const share=async()=>{const c=canvasRef.current;if(!c)return;try{const blob=await new Promise(r=>c.toBlob(r,"image/png"));if(!blob)return;const file=new File([blob],"birthdaywishora-"+formatId+".png",{type:"image/png"});if(navigator.share&&navigator.canShare&&navigator.canShare({files:[file]}))await navigator.share({title:"BirthdayWishora",text:"A birthday greeting made with BirthdayWishora.",files:[file]});else if(navigator.share)await navigator.share({title:"BirthdayWishora",text:"A birthday greeting made with BirthdayWishora.",url:location.href});else download();}catch(e){if(e.name!=="AbortError")setNotice("Sharing is not available here. Use Download instead.");}};

 return <section className="studio-builder" id="card-generator">
  <div className="studio-builder-head"><div><span className="eyebrow">✦ CREATE YOUR VISUAL GREETING</span><h2>Birthday Card Studio</h2><p>Choose a format, add your own gallery photo, personalize the message and generate a ready-to-share image.</p></div><span className="studio-badge">Browser-generated • No upload required</span></div>
  <div className="studio-format-row">{formats.map(x=><button type="button" key={x.id} className={formatId===x.id?"studio-choice active":"studio-choice"} onClick={()=>setFormatId(x.id)}><span>{x.icon}</span><b>{x.name}</b><small>{x.ratio}</small></button>)}</div>
  <div className="studio-layout">
   <div className="studio-controls">
    <div className="studio-panel"><div className="studio-panel-title"><b>1. Choose a template</b><span>{templates.length} styles</span></div><div className="studio-template-grid">{templates.map(t=><button type="button" key={t.id} className={templateId===t.id?"studio-template active":"studio-template"} onClick={()=>setTemplateId(t.id)}><span className={t.className}>{t.emoji}</span><b>{t.name}</b></button>)}</div></div>
    <div className="studio-panel"><div className="studio-panel-title"><b>2. Add your photo</b><span>Optional</span></div><label className="studio-upload"><input type="file" accept="image/*" onChange={e=>upload(e.target.files?.[0])}/><span>📷</span><div><b>{photoFileName?"Change selected photo":"Choose from Gallery"}</b><small>{photoFileName||"JPG, PNG, WEBP • your photo stays in your browser"}</small></div><strong>＋</strong></label>{photo&&<button type="button" className="studio-remove" onClick={()=>{setPhoto(null);setPhotoFileName("");}}>Remove photo</button>}</div>
    <div className="studio-panel"><div className="studio-panel-title"><b>3. Personalize</b><span>Live preview</span></div><label className="studio-field"><span>Recipient name</span><input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Priya"/></label><label className="studio-field"><span>Your birthday message</span><textarea value={message} onChange={e=>setMessage(e.target.value)} maxLength={260}/></label></div>
    <div className="studio-actions"><button type="button" className="studio-download" onClick={download}>↓ Download Image</button><button type="button" className="studio-share" onClick={share}>↗ Share</button></div>{notice&&<p className="studio-notice">{notice}</p>}
   </div>
   <div className="studio-preview"><div className="studio-preview-head"><span>LIVE PREVIEW</span><small>{format.width} × {format.height}px</small></div><div className={"studio-canvas-wrap format-"+formatId}><canvas ref={canvasRef}/></div><small className="studio-preview-note">Your selected photo is processed locally in your browser by this generator.</small></div>
  </div>
 </section>;
}
