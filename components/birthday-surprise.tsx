"use client";

import {useMemo,useState} from "react";

const relationships=["Partner","Best Friend","Mom","Dad","Sister","Brother","Colleague","Someone Special","Son","Daughter","Teacher"];
const vibes=["Heartfelt","Playful","Romantic","Elegant","Funny","Thoughtful"];

function pick(list:string[],seed:number){return list[Math.abs(seed)%list.length];}

export default function BirthdaySurprise(){
  const [name,setName]=useState("");
  const [relationship,setRelationship]=useState("Best Friend");
  const [vibe,setVibe]=useState("Heartfelt");
  const [detail,setDetail]=useState("");
  const [date,setDate]=useState("");
  const [created,setCreated]=useState(false);

  const surprise=useMemo(()=>{
    const seed=[name,relationship,vibe,detail].join("").split("").reduce((a,c)=>a+c.charCodeAt(0),0);
    const openings=[
      "Start with a small mystery: send a simple “I have something planned for you” message.",
      "Make the first moment quiet and personal: leave a handwritten note where they will find it.",
      "Begin with a tiny clue and let the excitement build before the main surprise.",
      "Set the mood with their favourite place, snack or memory before revealing the big moment."
    ];
    const plans=[
      ["The Secret Start","Hide a note with the first clue.","The Main Moment","Bring out the personalized wish, card or gift.","The Memory","Take one photo together and save it with the birthday message."],
      ["The Little Clue","Send a short mystery clue in the morning.","The Big Reveal","Reveal a card, gift or planned experience later in the day.","The Keepsake","Finish with a small memory card they can keep."],
      ["The Warm Welcome","Prepare one detail they genuinely love.","The Surprise","Pair your reveal with a heartfelt birthday message.","The Afterglow","End with a photo, favourite dessert or shared memory."]
    ];
    const gifts=[
      "A personalized photo card with a handwritten note.",
      "A small keepsake connected to an inside joke or shared memory.",
      "Their favourite treat paired with a meaningful message.",
      "A simple experience: coffee, dinner, a walk or a plan they have been wanting to do."
    ];
    const reveals=[
      "You make ordinary days feel special. Today is just my little reminder that you matter more than words can say.",
      "Plot twist: the real gift is getting to celebrate another beautiful year of you.",
      "One more year, one more reason to celebrate you — and I hope this little surprise makes you smile.",
      "Keep this moment. The best birthdays are not about how big the surprise is, but how loved you feel."
    ];
    const games=[
      "Play “3 clues, 1 surprise” — let them solve three tiny clues before the reveal.",
      "Do a “How well do you know them?” round with five questions about favourite things and shared memories.",
      "Create a mini memory hunt: hide three notes around the room, each pointing to the next.",
      "Give them three choices for the next activity, but make every option lead to something thoughtful."
    ];
    return {
      opening:pick(openings,seed),
      plan:pick(plans,seed).reduce<string[][]>((acc,v,i)=>{if(i%2===0)acc.push([v,pick(["A thoughtful first step.","Make this part personal.","Keep the anticipation going."],seed+i)]);return acc;},[]),
      gift:pick(gifts,seed+7),
      reveal:pick(reveals,seed+11),
      game:pick(games,seed+17)
    };
  },[name,relationship,vibe,detail]);

  const countdown=useMemo(()=>{
    if(!date)return null;
    const target=new Date(date+"T00:00:00").getTime();
    const now=new Date().setHours(0,0,0,0);
    const days=Math.ceil((target-now)/86400000);
    return Number.isFinite(days)?days:null;
  },[date]);

  return <section className="surprise-builder">
    <div className="surprise-intro">
      <div><span className="eyebrow">✦ PREMIUM BIRTHDAY SURPRISE</span><h2>Make it personal.</h2><p>Tell us a little about the person. BirthdayWishora will shape a polished surprise plan around them.</p></div>
      <span className="surprise-badge">FREE • No payment required</span>
    </div>

    <div className="surprise-layout">
      <div className="surprise-form-card">
        <label><span>Their name</span><input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Priya"/></label>
        <label><span>Relationship</span><select value={relationship} onChange={e=>setRelationship(e.target.value)}>{relationships.map(x=><option key={x}>{x}</option>)}</select></label>
        <label><span>Surprise mood</span><div className="surprise-vibes">{vibes.map(x=><button type="button" key={x} className={vibe===x?"active":""} onClick={()=>setVibe(x)}>{x}</button>)}</div></label>
        <label><span>One detail to make it theirs <small>(optional)</small></span><textarea value={detail} onChange={e=>setDetail(e.target.value)} placeholder="An inside joke, favourite thing, shared memory..."/></label>
        <label><span>Birthday date <small>(optional)</small></span><input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label>
        <button className="surprise-create" type="button" onClick={()=>setCreated(true)}>Create My Free Birthday Surprise <span>→</span></button>
      </div>

      <div className={"surprise-result "+(created?"is-created":"")}>
        {!created ? <div className="surprise-empty"><div className="surprise-lock">✦</div><span className="eyebrow">YOUR SURPRISE AWAITS</span><h3>Something thoughtful,<br/>made just for them.</h3><p>Fill in the details and reveal your personalized surprise plan here.</p></div> :
        <div className="surprise-reveal">
          <div className="reveal-top"><span className="eyebrow">A SURPRISE FOR {name.trim()||"SOMEONE SPECIAL"}</span><span>✦ {vibe}</span></div>
          {countdown!==null && <div className="surprise-countdown"><b>{countdown>=0?countdown:"0"}</b><span>{countdown===1?"day to go":"days to go"}{countdown<0?" · birthday date has passed":""}</span></div>}
          <div className="reveal-message"><small>SECRET MESSAGE</small><p>“{surprise.reveal}”</p></div>
          <div className="surprise-plan"><small>YOUR 3-STEP PLAN</small>{surprise.plan.map(([title,text])=><div key={title}><i>✦</i><span><b>{title}</b><em>{text}</em></span></div>)}</div>
          <div className="surprise-two-col"><div><small>GIFT / KEEPSAKE IDEA</small><p>{surprise.gift}</p></div><div><small>FUN REVEAL</small><p>{surprise.game}</p></div></div>
          <p className="surprise-opening"><b>First move:</b> {surprise.opening}</p>
          {detail && <p className="surprise-personal"><b>Your personal touch:</b> Build the moment around “{detail}”.</p>}
          <button type="button" className="surprise-again" onClick={()=>setCreated(false)}>Edit details ↗</button>
        </div>}
      </div>
    </div>

    <div className="surprise-features">
      <article><span>🔐</span><b>Secret Message Reveal</b><p>A private-feeling message block designed for the big reveal.</p></article>
      <article><span>🎁</span><b>Thoughtful Surprise Plan</b><p>A simple sequence that turns a normal birthday into a moment.</p></article>
      <article><span>🧠</span><b>Mini Birthday Game</b><p>A quick clue, quiz or memory hunt to add playful energy.</p></article>
      <article><span>✨</span><b>Personal Touch</b><p>Use a name, relationship, mood and memory to make it feel theirs.</p></article>
    </div>
  </section>;
}
