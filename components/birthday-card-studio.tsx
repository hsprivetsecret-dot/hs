"use client";

import {useEffect,useRef,useState} from "react";

const formats=[
 {id:"card",name:"Birthday Card",icon:"🎂",width:1200,height:1500,ratio:"4:5"},
 {id:"story",name:"Instagram Story",icon:"📱",width:1080,height:1920,ratio:"9:16"},
 {id:"whatsapp",name:"WhatsApp Status",icon:"📸",width:1080,height:1920,ratio:"9:16"},
 {id:"share",name:"Shareable Image",icon:"🖼️",width:1200,height:1200,ratio:"1:1"},
 {id:"digital",name:"Digital Greeting Card",icon:"💌",width:1600,height:1000,ratio:"16:10"},
];
const templates=[
 {id:"bloom",name:"Elegant Bloom",className:"studio-template-bloom",emoji:"🌸",colors:["#efe6d2","#f5b6c7","#6f4b77"]},
 {id:"midnight",name:"Midnight Celebration",className:"studio-template-midnight",emoji:"✨",colors:["#171522","#55416a","#e8d5ff"]},
 {id:"confetti",name:"Happy Confetti",className:"studio-template-confetti",emoji:"🎉",colors:["#ffd6e8","#f7a5b9","#f29b38"]},
 {id:"love",name:"Love Note",className:"studio-template-love",emoji:"💖",colors:["#f5d4e8","#c96b9f","#7a315e"]},
 {id:"gold",name:"Golden Moment",className:"studio-template-gold",emoji:"✦",colors:["#f3dfb1","#c99545","#5b3b19"]},
 {id:"pastel",name:"Sweet Pastel",className:"studio-template-pastel",emoji:"🌷",colors:["#d9e8dc","#e9b9c8","#6d668d"]},
];
const fonts=["Arial","Georgia","Trebuchet MS","Verdana","Courier New"];
const frameStyles=["rounded","soft","circle"];

function roundRect(ctx:CanvasRenderingContext2D,x:number,y:number,w:number,h:number,r:number){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
function wrap(ctx:CanvasRenderingContext2D,text:string,cx:number,startY:number,maxWidth:number,lineHeight:number,maxLines:number){const words=text.split(/\s+/);let line="",y=startY,lines=0;for(const word of words){const test=line?line+" "+word:word;if(ctx.measureText(test).width>maxWidth&&line){ctx.fillText(line,cx,y);line=word;y+=lineHeight;lines++;if(lines>=maxLines)break;}else line=test;}if(lines<maxLines&&line)ctx.fillText(line,cx,y);}
function drawCover(ctx:CanvasRenderingContext2D,img:HTMLImageElement,x:number,y:number,w:number,h:number,zoom:number,offsetX:number,offsetY:number,frame:string){
 const scale=Math.max(w/img.width,h/img.height)*(zoom/100),nw=img.width*scale,nh=img.height*scale;
 ctx.save();
 if(frame==="circle"){ctx.beginPath();ctx.ellipse(x+w/2,y+h/2,w/2,h/2,0,0,Math.PI*2);ctx.clip();}
 else {roundRect(ctx,x,y,w,h,frame==="soft"?55:28);ctx.clip();}
 ctx.drawImage(img,x+(w-nw)/2+offsetX,y+(h-nh)/2+offsetY,nw,nh);ctx.restore();
}

export default function BirthdayCardStudio(){
 const canvasRef=useRef<HTMLCanvasElement|null>(null);
 const [formatId,setFormatId]=useState("card");
 const [templateId,setTemplateId]=useState("bloom");
 const [name,setName]=useState("");
 const [message,setMessage]=useState("Wishing you a beautiful birthday filled with happiness, love and unforgettable moments.");
 const [photo,setPhoto]=useState<string|null>(null);
 const [photoFileName,setPhotoFileName]=useState("");
 const [font,setFont]=useState("Arial");
 const [textColor,setTextColor]=useState("#ffffff");
 const [accentColor,setAccentColor]=useState("#f59e0b");
 const [zoom,setZoom]=useState(100);
 const [offsetX,setOffsetX]=useState(0);
 const [offsetY,setOffsetY]=useState(0);
 const [overlay,setOverlay]=useState(0);
 const [frame,setFrame]=useState("rounded");
 const [showControls,setShowControls]=useState(false);
 const [notice,setNotice]=useState("");
 const format=formats.find(x=>x.id===formatId)||formats[0];
 const template=templates.find(x=>x.id===templateId)||templates[0];

 const draw=()=>{
  const canvas=canvasRef.current;if(!canvas)return;canvas.width=format.width;canvas.height=format.height;
  const ctx=canvas.getContext("2d");if(!ctx)return;const W=canvas.width,H=canvas.height;
  const p=template.colors;const grad=ctx.createLinearGradient(0,0,W,H);grad.addColorStop(0,p[0]);grad.addColorStop(.55,p[1]);grad.addColorStop(1,p[2]);ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);
  ctx.fillStyle="rgba(255,255,255,.16)";for(let i=0;i<18;i++){ctx.beginPath();ctx.arc((i*137)%W,(i*211)%H,25+(i%5)*15,0,Math.PI*2);ctx.fill();}
  if(overlay>0){ctx.fillStyle="rgba(20,10,30,"+(overlay/100)+")";ctx.fillRect(0,0,W,H);}
  const photoBox=format.id==="digital"?{x:W*.53,y:H*.12,w:W*.38,h:H*.58}:format.id==="story"||format.id==="whatsapp"?{x:W*.10,y:H*.10,w:W*.80,h:H*.43}:format.id==="share"?{x:W*.09,y:H*.08,w:W*.82,h:H*.45}:{x:W*.10,y:H*.08,w:W*.80,h:H*.43};
  const finish=()=>{
   const sidePhoto=format.id==="digital"&&photo;const center=sidePhoto?W*.28:W/2;const max=sidePhoto?W*.48:W*.78;
   ctx.textAlign="center";ctx.fillStyle=textColor;ctx.font="800 "+Math.max(18,W*.018)+"px '"+font+"'";ctx.fillText("BIRTHDAYWISHORA",center,sidePhoto?H*.10:H*.08);
   ctx.fillStyle=accentColor;ctx.font=Math.max(42,W*.07)+"px '"+font+"'";ctx.fillText(template.emoji,center,sidePhoto?H*.24:H*.61);
   ctx.fillStyle=textColor;ctx.font="900 "+Math.max(44,W*.07)+"px '"+font+"'";wrap(ctx,name.trim()?("Happy Birthday, "+name.trim()+"!"):"Happy Birthday!",center,sidePhoto?H*.34:H*.69,max,Math.max(42,W*.065),2);
   ctx.font="500 "+Math.max(20,W*.026)+"px '"+font+"'";wrap(ctx,message||"Wishing you a wonderful birthday!",center,sidePhoto?H*.47:H*.81,max,Math.max(20,W*.026),4);
   ctx.font="700 "+Math.max(16,W*.018)+"px '"+font+"'";ctx.fillStyle=textColor;ctx.globalAlpha=.85;ctx.fillText("Make Every Birthday Unforgettable.",center,H*.94);ctx.globalAlpha=1;
   ctx.fillStyle=accentColor;ctx.fillRect(center-W*.13,H*.965,W*.26,Math.max(4,W*.006));
  };
  if(photo){const img=new Image();img.onload=()=>{drawCover(ctx,img,photoBox.x,photoBox.y,photoBox.w,photoBox.h,zoom,offsetX*(W/1200),offsetY*(H/1500),frame);finish();};img.src=photo;}else finish();
 };
 useEffect(()=>{draw();},[formatId,templateId,name,message,photo,font,textColor,accentColor,zoom,offsetX,offsetY,overlay,frame]);

 const upload=(file:File|undefined)=>{if(!file||!file.type.startsWith("image/"))return;setPhotoFileName(file.name);const reader=new FileReader();reader.onload=()=>setPhoto(String(reader.result));reader.readAsDataURL(file);};
 const download=()=>{const c=canvasRef.current;if(!c)return;const a=document.createElement("a");a.download="birthdaywishora-"+formatId+".png";a.href=c.toDataURL("image/png");a.click();setNotice("Your personalized image is ready.");};
 const share=async()=>{const c=canvasRef.current;if(!c)return;try{const blob=await new Promise<Blob|null>(r=>c.toBlob(r,"image/png"));if(!blob)return;const file=new File([blob],"birthdaywishora-"+formatId+".png",{type:"image/png"});if(navigator.share&&navigator.canShare?.({files:[file]}))await navigator.share({title:"BirthdayWishora",text:"A birthday greeting made with BirthdayWishora.",files:[file]});else if(navigator.share)await navigator.share({title:"BirthdayWishora",text:"A birthday greeting made with BirthdayWishora.",url:location.href});else download();}catch(e){if(e instanceof Error&&e.name!=="AbortError")setNotice("Sharing is not available here. Use Download instead.");}};
 const resetPhoto=()=>{setPhoto(null);setPhotoFileName("");setZoom(100);setOffsetX(0);setOffsetY(0);};

 return <section className="studio-builder" id="card-generator">
  <div className="studio-builder-head"><div><span className="eyebrow">✦ CREATE YOUR VISUAL GREETING</span><h2>Birthday Card Studio</h2><p>Design a polished birthday visual with your own gallery photo, custom typography, colors, positioning and ready-to-share formats.</p></div><span className="studio-badge">Private browser editing • No photo upload required</span></div>
  <div className="studio-format-row">{formats.map(x=><button type="button" key={x.id} className={formatId===x.id?"studio-choice active":"studio-choice"} onClick={()=>setFormatId(x.id)}><span>{x.icon}</span><b>{x.name}</b><small>{x.ratio}</small></button>)}</div>
  <div className="studio-layout">
   <div className="studio-controls">
    <div className="studio-panel"><div className="studio-panel-title"><b>1. Choose a template</b><span>{templates.length} styles</span></div><div className="studio-template-grid">{templates.map(t=><button type="button" key={t.id} className={templateId===t.id?"studio-template active":"studio-template"} onClick={()=>setTemplateId(t.id)}><span className={t.className}>{t.emoji}</span><b>{t.name}</b></button>)}</div></div>
    <div className="studio-panel"><div className="studio-panel-title"><b>2. Add your photo</b><span>Optional</span></div><label className="studio-upload"><input type="file" accept="image/*" onChange={e=>upload(e.target.files?.[0])}/><span>📷</span><div><b>{photoFileName?"Change selected photo":"Choose from Gallery"}</b><small>{photoFileName||"JPG, PNG, WEBP • processed locally in your browser"}</small></div><strong>＋</strong></label>{photo&&<div className="studio-photo-tools"><button type="button" onClick={resetPhoto}>Remove</button><button type="button" onClick={()=>setShowControls(v=>!v)}>{showControls?"Hide":"Edit"} Photo</button></div>}</div>
    <div className="studio-panel"><div className="studio-panel-title"><b>3. Personalize</b><span>Live preview</span></div><label className="studio-field"><span>Recipient name</span><input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Priya"/></label><label className="studio-field"><span>Your birthday message</span><textarea value={message} onChange={e=>setMessage(e.target.value)} maxLength={260}/></label><div className="studio-advanced-grid"><label className="studio-field"><span>Font</span><select value={font} onChange={e=>setFont(e.target.value)}>{fonts.map(x=><option key={x}>{x}</option>)}</select></label><label className="studio-field"><span>Text color</span><input className="studio-color" type="color" value={textColor} onChange={e=>setTextColor(e.target.value)}/></label><label className="studio-field"><span>Accent</span><input className="studio-color" type="color" value={accentColor} onChange={e=>setAccentColor(e.target.value)}/></label><label className="studio-field"><span>Overlay</span><input type="range" min="0" max="45" value={overlay} onChange={e=>setOverlay(Number(e.target.value))}/></label></div></div>
    {photo&&showControls&&<div className="studio-panel studio-photo-editor"><div className="studio-panel-title"><b>Photo positioning</b><span>Live crop</span></div><label className="studio-range"><span>Zoom <b>{zoom}%</b></span><input type="range" min="100" max="180" value={zoom} onChange={e=>setZoom(Number(e.target.value))}/></label><label className="studio-range"><span>Horizontal <b>{offsetX}</b></span><input type="range" min="-180" max="180" value={offsetX} onChange={e=>setOffsetX(Number(e.target.value))}/></label><label className="studio-range"><span>Vertical <b>{offsetY}</b></span><input type="range" min="-180" max="180" value={offsetY} onChange={e=>setOffsetY(Number(e.target.value))}/></label><div className="studio-frame-row">{frameStyles.map(x=><button type="button" key={x} className={frame===x?"active":""} onClick={()=>setFrame(x)}>{x==="rounded"?"▢":x==="soft"?"▣":"◯"} {x}</button>)}</div></div>}
    <div className="studio-smart"><div><span className="eyebrow">✦ SMART DESIGN</span><b>Instantly refresh the look</b><small>Try a different premium background and accent pairing without changing your content.</small></div><button type="button" onClick={()=>{const next=templates[(templates.findIndex(t=>t.id===templateId)+1)%templates.length];setTemplateId(next.id);setAccentColor(next.colors[2]);}}>Generate New Look ✨</button></div>
    <div className="studio-actions"><button type="button" className="studio-download" onClick={download}>↓ Download Image</button><button type="button" className="studio-share" onClick={share}>↗ Share</button></div>{notice&&<p className="studio-notice">{notice}</p>}
   </div>
   <div className="studio-preview"><div className="studio-preview-head"><span>LIVE PREVIEW</span><small>{format.width} × {format.height}px</small></div><div className={"studio-canvas-wrap format-"+formatId}><canvas ref={canvasRef}/></div><div className="studio-preview-actions"><button type="button" onClick={()=>setTemplateId(templates[(templates.findIndex(t=>t.id===templateId)+1)%templates.length].id)}>Shuffle template ↻</button><span>High-resolution PNG</span></div><small className="studio-preview-note">Your selected photo is processed locally in your browser. It is not sent to BirthdayWishora by this generator.</small></div>
  </div>
 </section>;
}
