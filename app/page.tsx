import Link from "next/link";
import WishGenerator from "@/components/wish-generator";
import {FAQSection,JsonLd} from "@/components/seo";

const relationships = [
  ["Mom","/wishes/mom","💐","Warm, loving & heartfelt"],
  ["Dad","/wishes/dad","🎁","Respectful & meaningful"],
  ["Best Friend","/wishes/best-friend","🥳","Funny, fun & unforgettable"],
  ["Partner","/wishes/partner","💖","Romantic & deeply personal"],
  ["Sister","/wishes/sister","✨","Sweet & heart-touching"],
  ["Brother","/wishes/brother","🎉","Cool, funny & real"],
  ["Colleague","/wishes/colleague","💼","Professional & thoughtful"],
  ["Someone Special","/wishes/someone-special","💫","Unique & memorable"],
];

const languages = [
  ["English","/wishes"],["Hindi","/wishes"],["Hinglish","/wishes"],
  ["Spanish","/wishes"],["French","/wishes"],["German","/wishes"],
  ["Arabic","/wishes"],["Portuguese","/wishes"],
];

const seoLinks = [
  ["Funny Birthday Wishes","/wishes/best-friend/funny"],
  ["Romantic Birthday Wishes","/wishes/partner/romantic"],
  ["Emotional Birthday Wishes","/wishes/mom/emotional"],
  ["Short Birthday Wishes","/wishes/colleague/short"],
  ["Sweet Birthday Wishes","/wishes/sister/sweet"],
  ["Heart-touching Birthday Wishes","/wishes/mom/heart-touching"],
  ["Birthday Wishes for Dad","/wishes/dad"],
  ["Birthday Wishes for Teacher","/wishes/teacher"],
  ["Birthday Wishes for Daughter","/wishes/daughter"],
  ["Birthday Wishes for Son","/wishes/son"],
];

const homeFaqs=[{q:"Where can I find birthday wishes for different relationships?",a:"BirthdayWishora has dedicated birthday-wish pages for Mom, Dad, siblings, partners, best friends, colleagues, children, teachers and someone special."},{q:"Can I personalize a birthday message?",a:"Yes. Wishora AI lets you choose the relationship, style, language, name, age and a personal memory."},{q:"Can I create a birthday card with my own photo?",a:"Yes. Birthday Card Studio lets you upload a gallery photo, position it, customize text and export a shareable card."},{q:"Which languages are supported?",a:"BirthdayWishora currently offers English, Hindi, Hinglish, Spanish, French, German, Arabic and Portuguese discovery routes."}];
export default function Home() {
  return <main className="page">
    <nav className="nav">
      <Link className="logo" href="/"><span className="logo-mark">✦</span> BirthdayWishora</Link>
      <div className="nav-links">
        <Link href="/wishes">Explore Wishes</Link>
        <Link href="/cards">Cards</Link>
        <Link className="nav-cta" href="#generator">Create Wish</Link>
      </div>
    </nav>

    <section className="hero">
      <div className="hero-orb orb-one"/><div className="hero-orb orb-two"/>
      <div className="hero-content">
        <div className="badge">✨ Make Every Birthday Unforgettable.</div>
        <h1>The right words.<br/><span>The perfect birthday.</span></h1>
        <p>Create a beautiful, personal birthday message in seconds — for anyone, anywhere in the world.</p>
        <div className="hero-actions">
          <a className="hero-button" href="#generator">Create a Birthday Wish <span>→</span></a>
          <Link className="hero-link" href="/wishes">Explore the wish library</Link>
        </div>
        <div className="hero-trust"><span>✓ Free to start</span><span>✓ 8+ languages</span><span>✓ Ready to share</span></div>
      </div>
    </section>

    <section className="ai-section ai-section-premium" id="generator">
      <div className="ai-copy">
        <span className="eyebrow">✦ WISHORA AI</span>
        <h2>A birthday wish that sounds like you wrote it.</h2>
        <p>Choose who it’s for, set the mood, add a memory and create a message that feels personal—not copied and pasted.</p>
        <div className="ai-points"><span>✦ Personalized with their name & age</span><span>✦ Sweet, funny, romantic, emotional & more</span><span>✦ Multilingual and instantly shareable</span></div>
      </div>
      <WishGenerator />
    </section>

    <section className="category-section relationship-section">
      <div className="section-heading"><div><span className="eyebrow">FOR EVERYONE YOU LOVE</span><h2>Birthday wishes for every relationship</h2></div><Link href="/wishes">View all →</Link></div>
      <div className="relationship-grid">{relationships.map(([label,href,icon,desc])=><Link className="relationship-card" key={href} href={href}><span className="category-icon">{icon}</span><span><b>{label}</b><small>{desc}</small></span><span className="arrow">↗</span></Link>)}</div>
    </section>

    <section className="language-section">
      <div className="language-copy"><span className="eyebrow">CELEBRATE YOUR WAY</span><h2>Birthday wishes in your language.</h2><p>Say it naturally. Share it confidently. BirthdayWishora is built for celebrations across cultures and languages.</p></div>
      <div className="language-grid">{languages.map(([label,href])=><Link key={label} href={href} className="language-pill"><span>✦</span>{label}</Link>)}</div>
    </section>

    <section className="card-preview premium-cards">
      <div className="preview-copy">
        <span className="eyebrow">✦ BIRTHDAY CARD STUDIO</span>
        <h2>Turn a wish into a beautiful moment.</h2>
        <p>Explore polished card styles for family, friends, partners and colleagues. Start with your words, then make them look as special as they feel.</p>
        <Link className="hero-button inline-button" href="/cards">Explore Premium Cards →</Link>
      </div>
      <div className="card-stack">
        <div className="mini-card back">✦</div>
        <div className="mini-card front"><span>BirthdayWishora</span><strong>Make today<br/>beautiful.</strong><small>Made for your moment</small></div>
      </div>
    </section>

    <section className="share-section">
      <div className="share-copy"><span className="eyebrow">READY TO SHARE</span><h2>One perfect wish. Everywhere it matters.</h2><p>Create it once, then send it wherever your person is—without rewriting it again.</p></div>
      <div className="share-grid">
        <div><span>💬</span><b>WhatsApp</b><small>Send instantly</small></div>
        <div><span>📸</span><b>Instagram</b><small>Post or story</small></div>
        <div><span>f</span><b>Facebook</b><small>Share the moment</small></div>
        <div><span>✉</span><b>Email</b><small>Send with meaning</small></div>
      </div>
    </section>

    <section className="seo-links">
      <div className="section-heading"><div><span className="eyebrow">BIRTHDAY WISH LIBRARY</span><h2>Find exactly what you need.</h2></div><Link href="/wishes">Browse all →</Link></div>
      <div className="seo-grid">{seoLinks.map(([label,href])=><Link key={href} href={href}>{label}<span>→</span></Link>)}</div>
    </section>

    <FAQSection items={homeFaqs} />\n    <JsonLd data={{"@context":"https://schema.org","@type":"WebPage",name:"BirthdayWishora Birthday Wishes",description:"Personalized birthday wishes and cards for everyone."}} />\n\n    <section className="final-cta">
      <span className="eyebrow">YOUR NEXT BIRTHDAY DESERVES BETTER WORDS</span>
      <h2>Make their day unforgettable.</h2>
      <p>Personal, beautiful and ready to share in seconds.</p>
      <a className="hero-button" href="#generator">Create a Birthday Wish →</a>
    </section>

    <footer className="footer">
      <div className="footer-brand"><Link className="logo" href="/"><span className="logo-mark">✦</span> BirthdayWishora</Link><p>Make Every Birthday Unforgettable.</p><small>Personal birthday wishes, cards and greetings for people everywhere.</small></div>
      <div><b className="footer-title">Explore</b><div className="footer-links"><Link href="/wishes">Wish Library</Link><Link href="/cards">Birthday Cards</Link><Link href="/about">About</Link></div></div>
      <div><b className="footer-title">Popular</b><div className="footer-links"><Link href="/wishes/mom">For Mom</Link><Link href="/wishes/dad">For Dad</Link><Link href="/wishes/partner/romantic">Romantic</Link><Link href="/wishes/best-friend/funny">Funny</Link></div></div>
      <div><b className="footer-title">Company</b><div className="footer-links"><Link href="/contact">Contact</Link><Link href="/our-story">Our Story</Link><Link href="/privacy-policy">Privacy</Link><Link href="/terms-and-conditions">Terms</Link><Link href="/contact">Contact Us</Link><a href="mailto:satpalswami22742@gmail.com">Email us</a></div></div>
      <div className="footer-bottom">© {new Date().getFullYear()} BirthdayWishora. Made for moments that matter. Created by Satpal Swami. <span>♥</span></div>
    </footer>
  </main>;
}