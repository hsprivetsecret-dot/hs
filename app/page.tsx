import Link from "next/link";
import WishGenerator from "@/components/wish-generator";

export default function Home() {
  return (
    <main className="page">
      <nav className="nav">
        <Link className="logo" href="/">🎂 Wishly</Link>
        <Link href="/wishes">Explore Wishes</Link>
      </nav>

      <section className="hero">
        <div className="badge">✨ Make their birthday unforgettable</div>
        <h1>Find the <span>perfect birthday wish.</span></h1>
        <p>Create a beautiful, personal birthday message in seconds — for anyone, anywhere in the world.</p>
        <WishGenerator />
      </section>

      <section className="features">
        <div><b>💌 Personalized</b><p>Choose the relationship, mood, length and personal details.</p></div>
        <div><b>🌎 Global</b><p>Built for multiple languages and birthday traditions around the world.</p></div>
        <div><b>📲 Ready to share</b><p>Copy your message or share it directly with friends and family.</p></div>
      </section>

      <section className="seo-links">
        <h2>Popular birthday wishes</h2>
        <div className="link-grid">
          {[
            ["Mom","/wishes/mom"],["Dad","/wishes/dad"],["Best Friend","/wishes/best-friend"],
            ["Partner","/wishes/partner"],["Sister","/wishes/sister"],["Brother","/wishes/brother"],
            ["Funny Wishes","/wishes/best-friend/funny"],["Romantic Wishes","/wishes/partner/romantic"],
            ["Emotional Wishes","/wishes/mom/emotional"],["Short Wishes","/wishes/colleague/short"]
          ].map(([label, href]) => <Link key={href} href={href}>{label} →</Link>)}
        </div>
      </section>
    </main>
  );
}
