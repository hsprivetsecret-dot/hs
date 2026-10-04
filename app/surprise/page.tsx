import Link from "next/link";
import BirthdaySurprise from "@/components/birthday-surprise";
import {SiteFooter,SiteHeader} from "@/components/site-shell";

export const metadata={
  title:"Create a Birthday Surprise",
  description:"Create a personalized birthday surprise with a secret message, surprise plan, gift idea and fun reveal.",
};

export default function SurprisePage(){
  return <main className="subpage">
    <SiteHeader cta="/surprise"/>
    <section className="surprise-hero">
      <div className="surprise-hero-glow"/>
      <div className="surprise-hero-inner">
        <span className="eyebrow">✦ BIRTHDAY SURPRISE</span>
        <h1>Create a birthday moment<br/><span>they won’t forget.</span></h1>
        <p>Turn a few simple details into a personal surprise experience — with a reveal message, thoughtful plan, gift idea and a little fun.</p>
        <div className="surprise-trust"><span>✦ Personalized</span><span>✦ Free to create</span><span>✦ Easy to share</span></div>
      </div>
    </section>
    <BirthdaySurprise/>
    <section className="surprise-bottom">
      <span className="eyebrow">MORE FROM BIRTHDAYWISHORA</span>
      <h2>Want to say it beautifully too?</h2>
      <p>Create the birthday wish or card that goes with your surprise.</p>
      <div className="surprise-bottom-actions"><Link href="/#generator">Create a Birthday Wish →</Link><Link href="/cards">Explore Birthday Cards →</Link></div>
    </section>
    <SiteFooter/>
  </main>;
}
