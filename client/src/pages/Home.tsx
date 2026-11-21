import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Camera, Menu, Music2, X } from "lucide-react";

const photos = [
  { src: "/enosh-1.jpg", alt: "Enosh in the city", title: "The Look", label: "01 / Street frames" },
  { src: "/enosh-2.jpg", alt: "A quiet moment in the sun", title: "The Vibe", label: "02 / Perspective" },
  { src: "/enosh-3.jpg", alt: "Portrait of Enosh", title: "In Focus", label: "03 / Portraits" },
];

function Brand() {
  return <Link href="/" className="lm-brand"><span className="lm-brand-mark" aria-hidden="true">✳</span><span>Enosh</span></Link>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const items = [
    ["Chapters", "/posts"],
    ["Gallery", "/gallery"],
    ["About", "#about"],
    ["Studio", "/enosx"],
  ];
  return (
    <header className="lm-nav">
      <div className="lm-wrap lm-nav-inner">
        <Brand />
        <nav className="lm-links" aria-label="Primary navigation">
          {items.map(([label, href]) => href.startsWith("/") ? <Link key={label} href={href}>{label}</Link> : <a key={label} href={href}>{label}</a>)}
        </nav>
        <a className="lm-cta" href="#contact">Say hello <ArrowUpRight size={15} /></a>
        <button className="lm-menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={17} /> : <Menu size={17} />}
        </button>
        {open && <nav className="lm-mobile-links" aria-label="Mobile navigation">{items.map(([label, href]) => href.startsWith("/") ? <Link key={label} href={href} onClick={() => setOpen(false)}>{label}</Link> : <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav>}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="lm-footer" id="contact">
      <div className="lm-wrap" style={{ paddingBlock: "4rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "2.5rem", alignItems: "end", paddingBottom: "3rem", borderBottom: "1px solid rgba(255,255,255,.14)" }}>
          <div>
            <p className="lm-kicker" style={{ color: "#cf8047" }}>Keep in touch</p>
            <h2 style={{ color: "white", fontSize: "clamp(2.3rem,5vw,4.5rem)", lineHeight: 1, letterSpacing: "-.06em", marginTop: "1rem", fontWeight: 550 }}>Good stories<br />start with hello.</h2>
          </div>
          <div style={{ justifySelf: "end", display: "flex", gap: ".7rem", flexWrap: "wrap" }}>
            <a className="lm-cta lm-cta-light" href="https://wa.me/254798303978" target="_blank" rel="noreferrer">Message me <ArrowUpRight size={15} /></a>
            <Link className="lm-cta" href="/posts">Read the chapters <ArrowRight size={15} /></Link>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap", paddingTop: "1.5rem" }}>
          <Brand />
          <p className="lm-muted" style={{ fontSize: ".75rem" }}>© {new Date().getFullYear()} Enosh. Made in Nairobi.</p>
          <div style={{ display: "flex", gap: "1.2rem", fontSize: ".8rem" }}>
            <a href="https://instagram.com/engima_cx" target="_blank" rel="noreferrer">Instagram</a>
            <Link href="/enosx">Enosx Studio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  useEffect(() => { document.title = "Enosh — Stories, frames & field notes"; }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    targets.forEach((target, index) => target.style.setProperty("--lm-delay", `${(index % 4) * 90}ms`));
    document.documentElement.classList.add("lm-motion-ready");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("lm-is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.14 });
    targets.forEach(target => observer.observe(target));
    return () => { observer.disconnect(); document.documentElement.classList.remove("lm-motion-ready"); };
  }, []);
  return (
    <div className="lumora-page">
      <Header />
      <main>
        <section className="lm-hero">
          <div className="lm-wrap lm-hero-grid">
            <div className="lm-hero-copy">
              <p className="lm-kicker">Founder · Product Engineer · AI Builder</p>
              <h1 className="lm-display">Life, in<br /><span>its own light.</span></h1>
              <p className="lm-hero-intro">I’m Enosh Yeswa, a founder and product engineer in Kenya building useful digital products across AI, web platforms, e-commerce, and software.</p>
              <div className="lm-hero-actions"><Link className="lm-cta" href="/posts">Explore the chapters <ArrowRight size={16} /></Link><a href="#about" className="lm-text-link">A little about me <ArrowDownRight size={17} /></a></div>
              <div className="lm-hero-note"><span className="lm-note-dot" /> Building the future from Kenya.</div>
            </div>
            <div className="lm-hero-visual">
              <div className="lm-image-frame"><img src="/enosh-1.jpg" alt="Enosh, framed in an everyday moment" fetchPriority="high" /><span className="lm-image-index">NAIROBI · 2026</span></div>
              <div className="lm-image-caption"><span>PERSONAL ARCHIVE / VOL. 01</span><span>Stories as they happen.</span></div>
              <span className="lm-hero-watermark" aria-hidden="true">ENOSH</span>
            </div>
          </div>
          <div className="lm-wrap lm-hero-bottom"><span>Photography · Music · Faith · Building</span><span>Scroll to wander ↓</span></div>
        </section>

        <section className="lm-section" id="about">
          <div className="lm-wrap lm-about-grid" data-reveal>
            <div className="lm-about-aside"><span className="lm-kicker">The person behind the pages</span><div className="lm-orbit" aria-hidden="true"><span>✳</span></div><p className="lm-small-label">01 — A note from Enosh</p></div>
            <div className="lm-about-copy"><h2 className="lm-section-heading">A life is more than its highlights. <span>Here are the in-betweens.</span></h2><p>I’m Enosh Yeswa, founder of Enosx Technologies. I build at the intersection of AI, web platforms, e-commerce, and SaaS—taking ambitious ideas from rough sketch to focused, useful products.</p><p>This is my personal archive: the photographs, music, faith, lessons, and experiments behind the work.</p><Link href="/enosx" className="lm-inline-link">Explore Enosx Technologies <ArrowUpRight size={16} /></Link></div>
          </div>
        </section>

        <section className="lm-notes-section">
          <div className="lm-wrap">
            <div className="lm-section-top" data-reveal><div><span className="lm-kicker">Field notes / Issue 01</span><h2 className="lm-section-heading">A few things<br />I return to.</h2></div><Link href="/posts" className="lm-outline-link">All chapters <ArrowUpRight size={15} /></Link></div>
            <div className="lm-note-grid" data-reveal>
              <Link href="/gallery" className="lm-note-card"><div className="lm-note-icon"><Camera size={19} /></div><span className="lm-card-number">01 / LENS</span><h3>Light before the city wakes.</h3><p>Street frames, honest portraits, and details that might have slipped by.</p><span className="lm-card-arrow"><ArrowUpRight size={17} /></span></Link>
              <Link href="/posts" className="lm-note-card"><div className="lm-note-icon"><Music2 size={19} /></div><span className="lm-card-number">02 / SOUND</span><h3>A slower rhythm for the work.</h3><p>The soundtrack behind long nights, early starts, and everything in between.</p><span className="lm-card-arrow"><ArrowUpRight size={17} /></span></Link>
              <Link href="/posts" className="lm-note-card"><div className="lm-note-icon"><span>✳</span></div><span className="lm-card-number">03 / NOTES</span><h3>Ideas worth keeping close.</h3><p>Thoughts on faith, ambition, design, and building from Nairobi.</p><span className="lm-card-arrow"><ArrowUpRight size={17} /></span></Link>
            </div>
          </div>
        </section>

        <section className="lm-projects-section" id="projects">
          <div className="lm-wrap">
            <div className="lm-section-top" data-reveal><div><span className="lm-kicker">Built in public · From Kenya</span><h2 className="lm-section-heading">Products in<br />the works.</h2></div><a href="https://github.com/enigmacxenosx" target="_blank" rel="noreferrer" className="lm-outline-link">GitHub projects <ArrowUpRight size={15} /></a></div>
            <div className="lm-project-grid" data-reveal>
              <a className="lm-project-card" href="https://enosxai.vercel.app" target="_blank" rel="noreferrer"><span className="lm-card-number">01 / AI</span><h3>ENOSX AI</h3><p>A multimodal AI assistant and product platform, built by Enosx Technologies.</p><span className="lm-project-link">Open product <ArrowUpRight size={15} /></span></a>
              <a className="lm-project-card" href="https://enosxtech-hub.vercel.app" target="_blank" rel="noreferrer"><span className="lm-card-number">02 / COMMERCE</span><h3>Enosx Tech Store</h3><p>A Kenya-focused electronics discovery and e-commerce experience.</p><span className="lm-project-link">Explore the store <ArrowUpRight size={15} /></span></a>
              <a className="lm-project-card" href="https://github.com/enigmacxenosx/Enosh-browser" target="_blank" rel="noreferrer"><span className="lm-card-number">03 / BROWSER</span><h3>Enosx Browser</h3><p>An offline-ready browser workspace with privacy controls and Enosx AI.</p><span className="lm-project-link">View on GitHub <ArrowUpRight size={15} /></span></a>
              <a className="lm-project-card" href="https://github.com/enigmacxenosx/Exboot" target="_blank" rel="noreferrer"><span className="lm-card-number">04 / UTILITY</span><h3>Exboot</h3><p>A Windows utility for creating bootable and multi-boot USB media.</p><span className="lm-project-link">View on GitHub <ArrowUpRight size={15} /></span></a>
            </div>
          </div>
        </section>

        <section className="lm-section lm-gallery-section" id="gallery">
          <div className="lm-wrap">
            <div className="lm-section-top" data-reveal><div><span className="lm-kicker">The archive</span><h2 className="lm-section-heading">Seen along<br />the way.</h2></div><Link href="/gallery" className="lm-outline-link">Open the gallery <ArrowUpRight size={15} /></Link></div>
            <div className="lm-photo-grid">{photos.map((photo, i) => <Link href="/gallery" className={`lm-photo-card lm-photo-${i + 1}`} key={photo.src}><img src={photo.src} alt={photo.alt} loading="lazy" /><div className="lm-photo-shade" /><div className="lm-photo-caption"><span>{photo.label}</span><strong>{photo.title}</strong></div></Link>)}</div>
            <p className="lm-gallery-note">A frame is a way of paying attention.</p>
          </div>
        </section>

        <section className="lm-quote-band"><div className="lm-wrap lm-quote-content"><span className="lm-quote-mark">“</span><div><p className="lm-kicker">A thought to carry</p><blockquote>The hustle never stops, but the vision stays clear.</blockquote><span className="lm-quote-by">— Enosh</span></div></div></section>
      </main>
      <Footer />
    </div>
  );
}
