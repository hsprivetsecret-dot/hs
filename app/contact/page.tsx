import Link from "next/link";

const email="satpalswami22742@gmail.com";

export default function ContactPage() {
  return <main className="page">
    <nav className="nav"><Link className="logo" href="/"><span className="logo-mark">✦</span> BirthdayWishora</Link><div className="nav-links"><Link href="/wishes">Explore Wishes</Link><Link className="nav-cta" href="/#generator">Create Wish</Link></div></nav>
    <section className="hero"><div className="hero-content"><div className="badge">✦ Contact BirthdayWishora</div><h1>We’d love to<br/><span>hear from you.</span></h1><p>Have feedback, a partnership idea, or found something that needs fixing? Reach out directly to the BirthdayWishora team.</p></div></section>
    <section className="category-section"><div className="category-grid" style={{gridTemplateColumns:"repeat(2,1fr)"}}><a className="category-card" href={`mailto:${email}`}><span className="category-icon">✉</span><span><b>Email Satpal</b><small>{email}</small></span><span className="arrow">↗</span></a><Link className="category-card" href="/wishes"><span className="category-icon">♡</span><span><b>Browse wishes</b><small>Find the right words first</small></span><span className="arrow">↗</span></Link></div></section>
    <footer className="footer"><div><Link className="logo" href="/"><span className="logo-mark">✦</span> BirthdayWishora</Link><p>Make Every Birthday Unforgettable.</p><small>Created by Satpal Swami · {email}</small></div><div className="footer-links"><Link href="/wishes">Wishes</Link><Link href="/cards">Cards</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div><div className="footer-bottom">© {new Date().getFullYear()} BirthdayWishora · Satpal Swami.</div></footer>
  </main>;
}
