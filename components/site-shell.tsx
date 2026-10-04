import Link from "next/link";

export function SiteHeader({cta="/#generator"}:{cta?:string}) {
 return <header className="site-header">
  <Link className="brand" href="/"><span className="brand-mark">✦</span><span>BirthdayWishora</span></Link>
  <nav className="site-nav">
   <Link href="/wishes">Wish Library</Link><Link href="/cards">Birthday Cards</Link><Link href="/surprise">Birthday Surprise</Link><Link href="/about">About</Link>
   <Link className="site-nav-cta" href={cta}>Create Wish <span>→</span></Link>
  </nav>
 </header>;
}
export function SiteFooter(){
 return <footer className="site-footer">
  <div className="footer-main">
   <div className="footer-brand"><Link className="brand footer-brand-link" href="/"><span className="brand-mark">✦</span><span>BirthdayWishora</span></Link><p>Make Every Birthday Unforgettable.</p><small>Personal birthday wishes, cards and greetings for people everywhere.</small></div>
   <div><b>Explore</b><Link href="/">Home</Link><Link href="/wishes">Wish Library</Link><Link href="/cards">Birthday Cards</Link><Link href="/surprise">Birthday Surprise</Link><Link href="/wishes/mom">For Mom</Link><Link href="/wishes/dad">For Dad</Link></div>
   <div><b>Popular</b><Link href="/wishes/partner/romantic">Romantic</Link><Link href="/wishes/best-friend/funny">Funny</Link><Link href="/wishes/mom/emotional">Emotional</Link><Link href="/wishes/colleague/short">Short Wishes</Link></div>
   <div><b>Company</b><Link href="/about">About</Link><Link href="/our-story">Our Story</Link><Link href="/contact">Contact Us</Link><a href="mailto:satpalswami22742@gmail.com">Email Us</a></div>
   <div><b>Our Projects</b><a href="https://studenthubhelp.in" target="_blank" rel="noopener noreferrer">StudentHubHelp</a><small>Student resources &amp; guides</small></div>
   <div><b>Legal</b><Link href="/privacy-policy">Privacy Policy</Link><Link href="/terms-and-conditions">Terms & Conditions</Link><Link href="/cookie-policy">Cookie Policy</Link><Link href="/disclaimer">Disclaimer</Link></div>
  </div>
  <div className="footer-bottom"><span>© {new Date().getFullYear()} BirthdayWishora</span><span>Created by Satpal Swami</span><span>Made with ♥ for meaningful moments.</span></div>
 </footer>;
}
