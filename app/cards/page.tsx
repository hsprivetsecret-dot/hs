import Link from "next/link";

const cards = [
  ["Elegant Bloom","Soft, elegant and perfect for Mom, Dad or someone special.","💐"],
  ["Midnight Celebration","A premium dark celebration look for a bold birthday message.","✨"],
  ["Happy Confetti","Bright, playful and ready for best friends and family.","🎉"],
  ["Love Note","Warm, romantic and made for a partner or someone special.","💖"],
];

export default function CardsPage() {
  return <main className="page">
    <nav className="nav"><Link className="logo" href="/"><span className="logo-mark">✦</span> BirthdayWishora</Link><div className="nav-links"><Link href="/wishes">Explore Wishes</Link><Link className="nav-cta" href="/#generator">Create Wish</Link></div></nav>
    <section className="hero" style={{paddingBottom:60}}>
      <div className="hero-content"><div className="badge">✦ Birthday Card Studio</div><h1>Beautiful cards.<br/><span>Meaningful words.</span></h1><p>Choose a premium visual style, pair it with the perfect birthday wish, and share a moment worth remembering.</p></div>
    </section>
    <section className="category-section">
      <div className="section-heading"><div><span className="eyebrow">CARD COLLECTION</span><h2>Made for every kind of celebration</h2></div><Link href="/wishes">Find a wish →</Link></div>
      <div className="category-grid">{cards.map(([title,desc,icon])=><article className="category-card" key={title} style={{alignItems:"flex-start",minHeight:190}}><span className="category-icon">{icon}</span><span><b>{title}</b><small style={{lineHeight:1.55}}>{desc}</small><Link className="text-button" href="/wishes">Use this style →</Link></span></article>)}</div>
    </section>
    <section className="card-preview"><div className="preview-copy"><span className="eyebrow">YOUR NEXT STEP</span><h2>Start with the words. Make them yours.</h2><p>Generate a personalized birthday wish first, then turn it into a polished greeting experience.</p><Link className="text-button" href="/#generator">Create with Wishora AI →</Link></div><div className="card-stack"><div className="mini-card back">✦</div><div className="mini-card front"><span>BirthdayWishora</span><strong>Happy<br/>Birthday.</strong><small>Made for your moment</small></div></div></section>
    <footer className="footer"><div><Link className="logo" href="/"><span className="logo-mark">✦</span> BirthdayWishora</Link><p>Make Every Birthday Unforgettable.</p></div><div className="footer-links"><Link href="/wishes">Wishes</Link><Link href="/cards">Cards</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div><div className="footer-bottom">© {new Date().getFullYear()} BirthdayWishora. Made for moments that matter.</div></footer>
  </main>;
}
