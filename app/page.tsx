import Link from "next/link";
import WishGenerator from "@/components/wish-generator";

const categories = [
  ["Mom","/wishes/mom","💐"],["Dad","/wishes/dad","🎁"],["Best Friend","/wishes/best-friend","🥳"],
  ["Partner","/wishes/partner","💖"],["Sister","/wishes/sister","✨"],["Brother","/wishes/brother","🎉"],
  ["Colleague","/wishes/colleague","💼"],["Someone Special","/wishes/someone-special","💫"]
];

export default function Home() {
  return <main className="page">
    <nav className="nav">
      <Link className="logo" href="/"><span className="logo-mark">✦</span> BirthdayWishora</Link>
      <div className="nav-links"><Link href="/wishes">Explore Wishes</Link><Link className="nav-cta" href="#generator">Create Wish</Link></div>
    </nav>

    <section className="hero">
      <div className="hero-orb orb-one"/><div className="hero-orb orb-two"/>
      <div className="hero-content">
        <div className="badge">✨ Make Every Birthday Unforgettable.</div>
        <h1>Words that make<br/><span>birthdays brighter.</span></h1>
        <p>Create a beautiful, personal birthday message in seconds — for anyone, anywhere in the world.</p>
        <div className="hero-actions"><a className="hero-button" href="#generator">Create a Birthday Wish <span>→</span></a><Link className="hero-link" href="/wishes">Explore the wish library</Link></div>
        <div className="hero-trust"><span>✓ Free to start</span><span>✓ Personalizable</span><span>✓ Ready to share</span></div>
      </div>
    </section>

    <section className="category-section">
      <div className="section-heading"><div><span className="eyebrow">FIND THE RIGHT WORDS</span><h2>Birthday wishes for everyone</h2></div><Link href="/wishes">View all →</Link></div>
      <div className="category-grid">{categories.map(([label,href,icon])=><Link className="category-card" key={href} href={href}><span className="category-icon">{icon}</span><span><b>{label}</b><small>Birthday wishes</small></span><span className="arrow">↗</span></Link>)}</div>
    </section>

    <section className="ai-section" id="generator">
      <div className="ai-copy"><span className="eyebrow">✦ WISHORA AI</span><h2>Turn a few details into a wish that feels truly personal.</h2><p>Choose who it’s for, set the mood, add a memory and let BirthdayWishora create the words.</p><div className="ai-points"><span>✦ Emotional & human</span><span>✦ Multiple languages</span><span>✦ Instantly shareable</span></div></div>
      <WishGenerator />
    </section>

    <section className="feature-strip">
      <div><span>💌</span><b>Personalized</b><p>Name, age, relationship, mood and memories.</p></div>
      <div><span>🌎</span><b>Made for the world</b><p>Celebrate in your language and your style.</p></div>
      <div><span>📲</span><b>Ready to share</b><p>Copy, message or post your perfect wish.</p></div>
    </section>

    <section className="card-preview">
      <div className="preview-copy"><span className="eyebrow">COMING TO BIRTHDAYWISHORA</span><h2>Beautiful birthday cards, made to share.</h2><p>Turn your favorite wish into a polished digital greeting card. Choose a style, personalize it and share the moment.</p><Link className="text-button" href="/wishes">Explore Birthday Cards →</Link></div>
      <div className="card-stack"><div className="mini-card back">✨</div><div className="mini-card front"><span>Happy Birthday</span><strong>Make today<br/>beautiful.</strong><small>BirthdayWishora</small></div></div>
    </section>

    <section className="seo-links"><div className="section-heading"><div><span className="eyebrow">POPULAR RIGHT NOW</span><h2>Explore birthday wishes</h2></div></div><div className="link-grid">{[["Funny Wishes","/wishes/best-friend/funny"],["Romantic Wishes","/wishes/partner/romantic"],["Emotional Wishes","/wishes/mom/emotional"],["Short Wishes","/wishes/colleague/short"],["Sweet Wishes","/wishes/sister/sweet"],["Heart-touching Wishes","/wishes/mom/heart-touching"]].map(([label,href])=><Link key={href} href={href}>{label} <span>→</span></Link>)}</div></section>

    <footer className="footer"><div><Link className="logo" href="/"><span className="logo-mark">✦</span> BirthdayWishora</Link><p>Make Every Birthday Unforgettable.</p></div><div className="footer-links"><Link href="/wishes">Wishes</Link><Link href="/cards">Birthday Cards</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div><div className="footer-bottom">© {new Date().getFullYear()} BirthdayWishora. Made for moments that matter.</div></footer>
  </main>;
}