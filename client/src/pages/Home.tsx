/**
 * Design: Editorial Noir — Dark magazine-style personal blog for Enosh
 * Typography: Playfair Display (display) + DM Sans (body) + Space Mono (accent)
 * Colors: Charcoal (#0a0a0a) base, warm white (#f0ece4) text, amber (#c9a96e) accents
 * Layout: Asymmetric editorial spreads with vertical edge labels and uneven visual weight
 * Photo treatment: cinematic crops, warm shadowed grading, consistent caption styling
 */
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Instagram, MessageCircle, Facebook, ArrowDown, ExternalLink, MapPin, Briefcase } from "lucide-react";

/* ─── ASSETS ─── */
const PHOTOS = {
  hero: "/manus-storage/enosh-1_fb269776.jpg",       // street style shot
  shades: "/manus-storage/enosh-2_c1b58fd5.jpg",     // sunglasses shot
  portrait: "/manus-storage/enosh-3_fdcc35c7.jpg",   // glasses portrait
  hustle: "/manus-storage/enosh-4_5b9e87e6.jpg",     // money/grind
};

const LOGO = "/manus-storage/enosh-logo_8bf97c09.png";
const HERO_BG = "/manus-storage/enosh-hero-bg_7aaa8646.png";
const ABOUT_BG = "/manus-storage/enosh-about-bg_5d68951e.png";

function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
}

/* ─── NAVBAR ─── */
function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-12 py-4 md:py-5">
        <a href="#hero" className="flex items-center gap-3 group">
          <img src={LOGO} alt="E" className="w-7 h-7 md:w-9 md:h-9 object-contain" />
          <span className="text-[#f0ece4] text-xl md:text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Enosh
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-[#a09a90] hover:text-[#c9a96e] transition-colors duration-300 text-[11px] tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
            About
          </a>
          <a href="#gallery" className="text-[#a09a90] hover:text-[#c9a96e] transition-colors duration-300 text-[11px] tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
            Gallery
          </a>
          <a href="#contact" className="text-[#a09a90] hover:text-[#c9a96e] transition-colors duration-300 text-[11px] tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
            Contact
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

/* ─── HERO ─── */
function HeroSection() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* BG */}
      <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_BG})` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/20 via-[#0a0a0a]/50 to-[#0a0a0a]" />
      </motion.div>

      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-28 md:pt-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
          {/* Text — left, large */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <p className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase mb-6" style={{ fontFamily: "var(--font-mono)" }}>
                — Personal Blog / No. 01
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="text-[#f0ece4] leading-[0.85]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="block text-[clamp(3.5rem,8vw,7.5rem)] font-bold">Enosh</span>
              <span className="block text-[clamp(1.4rem,3.5vw,3.2rem)] font-light italic text-[#a09a90] mt-3">
                Living my story,
              </span>
              <span className="block text-[clamp(1.4rem,3.5vw,3.2rem)] font-light italic text-[#a09a90]">
                one frame at a time.
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-start gap-4"
            >
              <div className="h-px w-14 bg-[#c9a96e] mt-4 shrink-0" />
              <p className="text-[#a09a90] max-w-md text-[15px] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                Nairobi-born. Self-made. This is where the chapters live.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.23, 1, 0.32, 1] }}
            >
              <a href="#about" className="inline-flex items-center gap-2 text-[#c9a96e] hover:text-[#e0c890] transition-colors duration-300 text-[11px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                Discover more <ArrowDown className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </div>

          {/* Hero Image — right, offset */}
          <motion.div
            className="lg:col-span-4 hidden lg:block relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="relative ml-8">
              <div className="absolute -inset-3 border border-[#c9a96e]/15" />
              <img
                src={PHOTOS.hero}
                alt="Enosh"
                className="w-full h-[480px] object-cover object-[center_20%] brightness-[0.85] contrast-[1.05] saturate-[0.9]"
                style={{ filter: "grayscale(20%) brightness(0.85) contrast(1.05)" }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
            </div>
            {/* Vertical edge label */}
            <div className="absolute -right-12 top-8 flex flex-col items-center gap-2">
              <p className="text-[#c9a96e]/30 text-[9px] tracking-[0.5em] uppercase" style={{ writingMode: "vertical-rl", fontFamily: "var(--font-mono)" }}>
                Nairobi · 2026
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── ABOUT ─── */
function AboutSection() {
  const { ref, isInView } = useScrollReveal(0.2);

  return (
    <section id="about" className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url(${ABOUT_BG})` }} />
      <div className="absolute inset-0 bg-[#0a0a0a]/85" />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image — right side, asymmetric */}
          <motion.div
            className="lg:col-span-5 lg:col-start-8 relative"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="relative overflow-hidden">
              <img
                src={PHOTOS.portrait}
                alt="Enosh portrait"
                className="w-full h-[400px] md:h-[500px] object-cover object-top brightness-[0.8] contrast-[1.1]"
                style={{ filter: "brightness(0.8) contrast(1.1) saturate(0.9)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 to-transparent" />
            </div>
            {/* Decorative frame corner */}
            <div className="absolute -bottom-6 -right-6 w-20 h-20 border-2 border-[#c9a96e]/30" />
            {/* Page number */}
            <p className="absolute -bottom-6 left-0 text-[#c9a96e]/40 text-[10px] tracking-[0.3em]" style={{ fontFamily: "var(--font-mono)" }}>
              002 — ABOUT
            </p>
          </motion.div>

          {/* Text — left, offset */}
          <motion.div
            className="lg:col-span-6 lg:col-start-1 space-y-8"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            <div>
              <p className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                — Chapter One
              </p>
              <h2 className="text-[#f0ece4] text-4xl md:text-[3.4rem] font-bold leading-[1.05]" style={{ fontFamily: "var(--font-display)" }}>
                This is<br />my story.
              </h2>
            </div>

            <div className="space-y-5 text-[#a09a90] text-[15px] leading-[1.8]" style={{ fontFamily: "var(--font-body)" }}>
              <p>
                <span className="text-[#c9a96e] font-medium">Enosh</span>. Nairobi, Kenya. A city that moves fast and never sleeps. I move with it — deliberately, with purpose.
              </p>
              <p>
                Photography. Music. Faith. Hustle. These aren't just interests — they're the pillars. Everything I do is filtered through them.
              </p>
              <p>
                This blog? It's the archive. The chapters. The moments I refuse to let slip away.
              </p>
            </div>

            <div className="flex gap-10 pt-4">
              {[
                { label: "Location", value: "Nairobi, KE" },
                { label: "Focus", value: "Lifestyle" },
                { label: "Vibe", value: "Unfiltered" },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-[#c9a96e]/60 text-[9px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>{item.label}</p>
                  <p className="text-[#f0ece4] text-lg font-medium" style={{ fontFamily: "var(--font-display)" }}>{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── QUOTE / INTERLUDE ─── */
function QuoteSection() {
  const { ref, isInView } = useScrollReveal(0.3);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#141414] to-[#0a0a0a]" />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-4xl"
        >
          <p className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase mb-8" style={{ fontFamily: "var(--font-mono)" }}>
            — Interlude
          </p>
          <div className="flex items-start gap-6">
            <span className="text-[#c9a96e] text-7xl md:text-8xl font-bold leading-none mt-[-12px]" style={{ fontFamily: "var(--font-display)" }}>"</span>
            <div className="space-y-4">
              <blockquote
                className="text-[#f0ece4] text-2xl md:text-3xl lg:text-4xl font-light italic leading-snug"
                style={{ fontFamily: "var(--font-display)" }}
              >
                The hustle never stops, but the vision stays clear.
              </blockquote>
              <div className="flex items-center gap-3 pt-2">
                <div className="h-px w-8 bg-[#c9a96e]/40" />
                <p className="text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                  — Enosh
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── GALLERY ─── */
function GallerySection() {
  const { ref, isInView } = useScrollReveal(0.05);

  const photos = [
    { src: PHOTOS.hero, alt: "Enosh", caption: "Street Style", sub: "Chapter 001 — The Look" },
    { src: PHOTOS.shades, alt: "Enosh", caption: "The Vibe", sub: "Chapter 002 — Confidence" },
    { src: PHOTOS.portrait, alt: "Enosh", caption: "Reflections", sub: "Chapter 003 — Mirror Work" },
    { src: PHOTOS.hustle, alt: "Hustle", caption: "Grind Mode", sub: "Chapter 004 — The Come Up" },
  ];

  return (
    <section id="gallery" className="py-28 md:py-36 bg-[#0a0a0a]">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header — left-aligned, asymmetric */}
        <div className="mb-16 md:mb-20 space-y-4">
          <p className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
            — The Archive
          </p>
          <h2 className="text-[#f0ece4] text-4xl md:text-[3.4rem] font-bold leading-[1.05]" style={{ fontFamily: "var(--font-display)" }}>
            Through My<br />Lens.
          </h2>
          <div className="flex items-center gap-3 pt-2">
            <div className="h-px w-10 bg-[#c9a96e]" />
            <p className="text-[#a09a90] text-xs" style={{ fontFamily: "var(--font-mono)" }}>4 Frames</p>
          </div>
        </div>

        {/* Asymmetric grid — 2 rows, different sizes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {/* Top row: large left, small right */}
          <motion.div
            className="md:col-span-7 relative group overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            <img
              src={photos[0].src}
              alt={photos[0].alt}
              className="w-full h-[320px] md:h-[480px] object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              style={{ filter: "brightness(0.78) contrast(1.08) saturate(0.88)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-[#c9a96e] text-[9px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "var(--font-mono)" }}>{photos[0].sub}</p>
              <p className="text-[#f0ece4] text-xl md:text-2xl font-medium" style={{ fontFamily: "var(--font-display)" }}>{photos[0].caption}</p>
            </div>
            {/* Corner marks */}
            <div className="absolute top-5 left-5 w-6 h-6 border-t border-l border-[#c9a96e]/0 group-hover:border-[#c9a96e]/60 transition-all duration-500" />
            <div className="absolute top-5 right-5 w-6 h-6 border-t border-r border-[#c9a96e]/0 group-hover:border-[#c9a96e]/60 transition-all duration-500" />
          </motion.div>

          <motion.div
            className="md:col-span-5 relative group overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
          >
            <img
              src={photos[1].src}
              alt={photos[1].alt}
              className="w-full h-[320px] md:h-[480px] object-cover object-[center_30%] transition-transform duration-700 group-hover:scale-[1.03]"
              style={{ filter: "brightness(0.8) contrast(1.05) saturate(0.9)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-[#c9a96e] text-[9px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "var(--font-mono)" }}>{photos[1].sub}</p>
              <p className="text-[#f0ece4] text-xl md:text-2xl font-medium" style={{ fontFamily: "var(--font-display)" }}>{photos[1].caption}</p>
            </div>
            <div className="absolute top-5 left-5 w-6 h-6 border-t border-l border-[#c9a96e]/0 group-hover:border-[#c9a96e]/60 transition-all duration-500" />
            <div className="absolute top-5 right-5 w-6 h-6 border-t border-r border-[#c9a96e]/0 group-hover:border-[#c9a96e]/60 transition-all duration-500" />
          </motion.div>

          {/* Bottom row: small left, large right */}
          <motion.div
            className="md:col-span-5 relative group overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <img
              src={photos[2].src}
              alt={photos[2].alt}
              className="w-full h-[320px] md:h-[420px] object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              style={{ filter: "brightness(0.75) contrast(1.1) saturate(0.85)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-[#c9a96e] text-[9px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "var(--font-mono)" }}>{photos[2].sub}</p>
              <p className="text-[#f0ece4] text-xl md:text-2xl font-medium" style={{ fontFamily: "var(--font-display)" }}>{photos[2].caption}</p>
            </div>
            <div className="absolute top-5 left-5 w-6 h-6 border-t border-l border-[#c9a96e]/0 group-hover:border-[#c9a96e]/60 transition-all duration-500" />
            <div className="absolute top-5 right-5 w-6 h-6 border-t border-r border-[#c9a96e]/0 group-hover:border-[#c9a96e]/60 transition-all duration-500" />
          </motion.div>

          <motion.div
            className="md:col-span-7 relative group overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.23, 1, 0.32, 1] }}
          >
            <img
              src={photos[3].src}
              alt={photos[3].alt}
              className="w-full h-[320px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              style={{ filter: "brightness(0.82) contrast(1.02) saturate(0.92)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-[#c9a96e] text-[9px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "var(--font-mono)" }}>{photos[3].sub}</p>
              <p className="text-[#f0ece4] text-xl md:text-2xl font-medium" style={{ fontFamily: "var(--font-display)" }}>{photos[3].caption}</p>
            </div>
            <div className="absolute top-5 left-5 w-6 h-6 border-t border-l border-[#c9a96e]/0 group-hover:border-[#c9a96e]/60 transition-all duration-500" />
            <div className="absolute top-5 right-5 w-6 h-6 border-t border-r border-[#c9a96e]/0 group-hover:border-[#c9a96e]/60 transition-all duration-500" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ─── */
function ContactSection() {
  const { ref, isInView } = useScrollReveal(0.2);

  return (
    <section id="contact" className="py-28 md:py-36 bg-[#0a0a0a] relative">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
              — Connect
            </p>
            <h2 className="text-[#f0ece4] text-4xl md:text-[3.4rem] font-bold leading-[1.05]" style={{ fontFamily: "var(--font-display)" }}>
              Let's talk.
            </h2>
            <p className="text-[#a09a90] text-[15px] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Collabs, conversations, or just checking in — I'm here. Find me wherever you are.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <Briefcase className="w-3.5 h-3.5 text-[#c9a96e]/60" />
              <p className="text-[#a09a90] text-xs" style={{ fontFamily: "var(--font-mono)" }}>EX Technologies</p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <MapPin className="w-3.5 h-3.5 text-[#c9a96e]/60" />
              <p className="text-[#a09a90] text-xs" style={{ fontFamily: "var(--font-mono)" }}>Nairobi, Kenya</p>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-6 lg:col-start-7 space-y-3"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            {[
              { icon: Instagram, label: "Instagram", handle: "@engima_cx", href: "https://instagram.com/engima_cx" },
              { icon: MessageCircle, label: "WhatsApp", handle: "0798 303 978", href: "https://wa.me/254798303978" },
              { icon: Facebook, label: "Facebook", handle: "Enosx Aura", href: "https://facebook.com/enosxaura" },
              { icon: ExternalLink, label: "EX Technologies", handle: "Tech & Innovation", href: "https://enosxtechnologies.vercel.app" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="flex items-center gap-5 p-5 border border-white/5 hover:border-[#c9a96e]/30 bg-[#0f0f0f] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#141414] flex items-center justify-center group-hover:bg-[#c9a96e]/10 transition-colors duration-300">
                  <social.icon className="w-4 h-4 text-[#c9a96e]" />
                </div>
                <div className="flex-1">
                  <p className="text-[#f0ece4] text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>{social.label}</p>
                  <p className="text-[#a09a90] text-[11px] tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>{social.handle}</p>
                </div>
                <ArrowDown className="w-4 h-4 text-[#c9a96e]/30 group-hover:text-[#c9a96e] transition-colors duration-300 rotate-[-45deg]" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="py-10 border-t border-white/5 bg-[#080808]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="E" className="w-5 h-5 object-contain" />
            <span className="text-[#f0ece4] text-sm" style={{ fontFamily: "var(--font-display)" }}>Enosh</span>
          </div>
          <p className="text-[#a09a90] text-[10px] tracking-[0.2em]" style={{ fontFamily: "var(--font-mono)" }}>
            © 2026 ENOSH. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-5">
            <a href="https://instagram.com/engima_cx" target="_blank" rel="noopener noreferrer" className="text-[#a09a90] hover:text-[#c9a96e] transition-colors duration-300">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://wa.me/254798303978" target="_blank" rel="noopener noreferrer" className="text-[#a09a90] hover:text-[#c9a96e] transition-colors duration-300">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href="https://facebook.com/enosxaura" target="_blank" rel="noopener noreferrer" className="text-[#a09a90] hover:text-[#c9a96e] transition-colors duration-300">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── HOME ─── */
export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]" style={{ fontFamily: "var(--font-body)" }}>
      <NavBar />
      <HeroSection />
      <AboutSection />
      <QuoteSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
}
