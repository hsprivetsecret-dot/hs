"use client";
import {useState} from "react";
export default function ShareButtons({text}:{text:string}){
  const [copied,setCopied]=useState(false);
  async function copy(){await navigator.clipboard.writeText(text);setCopied(true);setTimeout(()=>setCopied(false),1600);}
  function share(url:string){window.open(url,"_blank","noopener,noreferrer,width=720,height=640");}
  const encoded=encodeURIComponent(text);
  return <div className="share-row">
    <button onClick={copy}>{copied?"Copied ✓":"Copy"}</button>
    <button onClick={()=>share(`https://wa.me/?text=${encoded}`)}>WhatsApp</button>
    <button onClick={()=>share(`https://www.facebook.com/sharer/sharer.php?quote=${encoded}`)}>Facebook</button>
    <button onClick={()=>share(`https://twitter.com/intent/tweet?text=${encoded}`)}>X</button>
    <a href={`mailto:?subject=Birthday%20wish&body=${encoded}`}>Email</a>
  </div>;
}