"use client";

import { useState } from "react";

const categories = ["Mom","Dad","Best Friend","Sister","Brother","Partner","Colleague","Someone Special"];
const styles = ["Sweet","Emotional","Funny","Romantic","Short & Simple","Heart-touching"];

import WishGenerator from "@/components/wish-generator";

export default function Home() {
  const [category,setCategory]=useState("Best Friend");
  const [style,setStyle]=useState("Sweet");
  const [name,setName]=useState("");

  return (
    <main className="page">
      <nav className="nav"><div className="logo">🎂 Wishly</div><a href="/wishes">Explore Wishes</a></nav>
      <section className="hero">
        <div className="badge">✨ Make their birthday unforgettable</div>
        <h1>Find the <span>perfect birthday wish.</span></h1>
        <p>Create a beautiful, personal birthday message in seconds — for anyone, anywhere in the world.</p>
        <div className="panel">
          <label>Who is it for?</label>
          <div className="chips">{categories.map(x=><button key={x} className={category===x?"chip active":"chip"} onClick={()=>setCategory(x)}>{x}</button>)}</div>
          <label>What feeling?</label>
          <div className="chips">{styles.map(x=><button key={x} className={style===x?"chip active":"chip"} onClick={()=>setStyle(x)}>{x}</button>)}</div>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Their name (optional)" />
          <button className="primary" onClick={()=>alert(`Create a ${style.toLowerCase()} wish for ${name || "them"} (${category})`)}>Create Birthday Wish →</button>
        </div>
      </section>
      <section className="features">
        <div><b>💌 Personalized</b><p>Messages made for your relationship and tone.</p></div>
        <div><b>🌎 Global</b><p>Built for languages and cultures around the world.</p></div>
        <div><b>🎨 Beautiful cards</b><p>Turn your message into a shareable greeting.</p></div>
      </section>
    <WishGenerator />\n    </main>
  );
}