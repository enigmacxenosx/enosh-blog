/**
 * Enosx Technologies — Studio Portfolio Page
 * Design: Editorial Noir — charcoal canvas, warm white text, amber accents
 * Typography: Playfair Display (display) + DM Sans (body) + Space Mono (accent)
 * Layout: Asymmetric editorial spreads, vertical edge labels, staggered fade-ups
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Camera,
  Code2,
  Compass,
  Globe,
  Layers,
  Mail,
  MapPin,
  MessageCircle,
  Palette,
  PenTool,
  Smartphone,
  Instagram,
  Facebook,
  ArrowDown,
} from "lucide-react";

/* ─── ASSETS ─── */
const LOGO = "/enosh-logo.webp";
const HERO_BG = "/enosh-hero-bg.jpg";

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
        <Link href="/" className="flex items-center gap-3 group">
          <img src={LOGO} alt="E" className="w-7 h-7 md:w-9 md:h-9 object-contain" />
          <span className="text-[#f0ece4] text-lg md:text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Enosx<span className="text-[#c9a96e]">.</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#work" className="text-[#a09a90] hover:text-[#c9a96e] transition-colors duration-300 text-[11px] tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
            Work
          </a>
          <a href="#process" className="text-[#a09a90] hover:text-[#c9a96e] transition-colors duration-300 text-[11px] tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
            Process
          </a>
          <a href="#history" className="text-[#a09a90] hover:text-[#c9a96e] transition-colors duration-300 text-[11px] tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
            History
          </a>
          <Link href="/" className="text-[#a09a90] hover:text-[#c9a96e] transition-colors duration-300 text-[11px] tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
            Blog
          </Link>
          <a href="#hire" className="text-[#c9a96e] hover:text-[#e0c890] transition-colors duration-300 text-[11px] tracking-[0.25em] uppercase border border-[#c9a96e]/40 hover:border-[#c9a96e] px-4 py-2" style={{ fontFamily: "var(--font-mono)" }}>
            Hire Us
          </a>
        </div>
        <Link href="/" className="md:hidden flex items-center gap-2 text-[#a09a90] hover:text-[#c9a96e] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>Blog</span>
        </Link>
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
    <section className="relative min-h-screen flex items-end overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/30" />
      </div>
      <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-20 md:pb-28 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase mb-6" style={{ fontFamily: "var(--font-mono)" }}>
            — The Studio
          </p>
          <h1 className="text-[#f0ece4] text-5xl md:text-[5.5rem] font-bold leading-[1.02]" style={{ fontFamily: "var(--font-display)" }}>
            Ideas, built
            <br />
            <span className="text-[#c9a96e]">to last.</span>
          </h1>
          <p className="text-[#a09a90] text-[15px] md:text-base mt-6 max-w-xl leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Enosx Technologies is an independent product studio from Nairobi.
            We design brands, build fullstack applications, and ship work that
            feels like it was made to be remembered.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <a href="#hire" className="inline-flex items-center gap-2 bg-[#c9a96e] text-[#0a0a0a] text-[11px] tracking-[0.3em] uppercase px-7 py-4 hover:bg-[#e0c890] transition-colors duration-300 font-semibold" style={{ fontFamily: "var(--font-mono)" }}>
              Start a project
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#work" className="inline-flex items-center gap-2 text-[#f0ece4] hover:text-[#c9a96e] transition-colors duration-300 text-[11px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
              See the work
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </motion.div>
      <p className="absolute top-1/3 right-6 md:right-10 text-[#c9a96e]/30 text-[9px] tracking-[0.5em] uppercase z-10 hidden md:block" style={{ writingMode: "vertical-rl", fontFamily: "var(--font-mono)" }}>
        Est. Nairobi — 2026
      </p>
    </section>
  );
}

/* ─── WHAT WE BUILD ─── */
function WorkSection() {
  const { ref, isInView } = useScrollReveal();
  const services = [
    { icon: Palette, title: "Brand & Identity", desc: "Distinctive visual systems — logos, type systems, color philosophies, and brand voice that hold together across every touchpoint." },
    { icon: Code2, title: "Fullstack Applications", desc: "Modern web applications built on Vite, React, TypeScript, and cloud-native backends — auth, databases, and file storage handled with care." },
    { icon: Smartphone, title: "Mobile Experiences", desc: "Responsive and native-friendly interfaces that feel deliberate and weighted, never gimmicky." },
    { icon: PenTool, title: "Editorial Design", desc: "Magazine-grade layouts for personal brands and creators — dark canvases, typographic drama, and intentional motion." },
    { icon: Compass, title: "Product Strategy", desc: "From idea to identity: we help founders shape concepts into shippable products with a clear design direction." },
    { icon: Layers, title: "Design Systems", desc: "Reusable component libraries and documented tokens so every future build starts faster and looks consistent." },
  ];
  return (
    <section id="work" className="py-28 md:py-36 bg-[#0a0a0a] relative overflow-hidden">
      <p className="absolute top-1/2 left-4 text-[#c9a96e]/20 text-[9px] tracking-[0.5em] uppercase" style={{ writingMode: "vertical-rl", fontFamily: "var(--font-mono)" }}>
        02 — Capabilities
      </p>
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "var(--font-mono)" }}>
            — What We Build
          </p>
          <h2 className="text-[#f0ece4] text-4xl md:text-[3.4rem] font-bold leading-[1.05]" style={{ fontFamily: "var(--font-display)" }}>
            Craft across the stack.
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              className="bg-[#0a0a0a] p-8 md:p-10 group hover:bg-[#0f0f0f] transition-colors duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="w-12 h-12 rounded-full border border-[#c9a96e]/30 flex items-center justify-center mb-6 group-hover:border-[#c9a96e] group-hover:bg-[#c9a96e]/10 transition-all duration-300">
                <s.icon className="w-5 h-5 text-[#c9a96e]" />
              </div>
              <h3 className="text-[#f0ece4] text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h3>
              <p className="text-[#a09a90] text-[13px] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROCESS / CASE STUDY ─── */
function ProcessSection() {
  const { ref, isInView } = useScrollReveal();
  const steps = [
    { num: "01", title: "Direction", desc: "Every project starts with an idea document — a clear philosophy covering design movement, color, typography, layout, and motion." },
    { num: "02", title: "Design", desc: "We commit to a single aesthetic direction before writing code. On Enosx, that direction was Editorial Noir — a decision that shaped every line that followed." },
    { num: "03", title: "Build", desc: "Fullstack implementation with a modern stack: Vite, React, TypeScript, Drizzle, S3 storage, and purposeful animations that feel premium, not gimmicky." },
    { num: "04", title: "Ship & Maintain", desc: "Production deployment, version-controlled history, and continuous iteration. Work we ship is work we stand behind." },
  ];
  return (
    <section id="process" className="py-28 md:py-36 bg-[#080808] relative">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
              — The Method
            </p>
            <h2 className="text-[#f0ece4] text-4xl md:text-[3.4rem] font-bold leading-[1.05]" style={{ fontFamily: "var(--font-display)" }}>
              How we build.
            </h2>
            <p className="text-[#a09a90] text-[15px] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Our flagship case study is this very site — the{" "}
              <Link href="/" className="text-[#c9a96e] hover:text-[#e0c890] transition-colors underline underline-offset-4">
                Enosh editorial blog
              </Link>
              . Three design directions were evaluated, one was chosen with intent, and every detail from the amber accent to the film-grain overlay followed from that decision.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Globe className="w-3.5 h-3.5 text-[#c9a96e]/60" />
              <Link
                href="/enosx/case-studies/editorial-noir"
                className="text-[#c9a96e] hover:text-[#e0c890] transition-colors text-xs" style={{ fontFamily: "var(--font-mono)" }}
              >
                Read the full case study →
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="lg:col-span-6 lg:col-start-7 space-y-4"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            {steps.map((s) => (
              <div key={s.num} className="flex gap-6 p-6 border border-white/5 hover:border-[#c9a96e]/30 bg-[#0f0f0f] transition-all duration-300 group">
                <span className="text-[#c9a96e] text-2xl font-bold shrink-0" style={{ fontFamily: "var(--font-display)" }}>{s.num}</span>
                <div>
                  <h3 className="text-[#f0ece4] text-lg font-semibold mb-1" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h3>
                  <p className="text-[#a09a90] text-[13px] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECT HISTORY ─── */
function HistorySection() {
  const { ref, isInView } = useScrollReveal();
  const projects = [
    { date: "AUG 2026", title: "Editorial Blog — Full Archive", desc: "Complete photo gallery with S3-backed upload capability, admin auth, and a masonry archive.", tags: ["React", "Drizzle", "S3"] },
    { date: "AUG 2026", title: "Editorial Blog — Brand System", desc: "Custom 'E' monogram, amber accent palette, Playfair Display typography, and asymmetric editorial grid.", tags: ["Brand", "Typography"] },
    { date: "AUG 2026", title: "Editorial Blog — Launch", desc: "Dark canvas homepage with hero parallax, about, quote, gallery, and contact sections deployed to Vercel.", tags: ["Vite", "Deployment"] },
    { date: "AUG 2026", title: "Enosx Studio Page", desc: "This studio portfolio — turning our process and polish into a client-facing front door.", tags: ["Portfolio", "Strategy"] },
  ];
  return (
    <section id="history" className="py-28 md:py-36 bg-[#0a0a0a] relative overflow-hidden">
      <p className="absolute top-1/2 right-4 text-[#c9a96e]/20 text-[9px] tracking-[0.5em] uppercase hidden md:block" style={{ writingMode: "vertical-rl", fontFamily: "var(--font-mono)" }}>
        04 — Track Record
      </p>
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "var(--font-mono)" }}>
            — Shipped
          </p>
          <h2 className="text-[#f0ece4] text-4xl md:text-[3.4rem] font-bold leading-[1.05]" style={{ fontFamily: "var(--font-display)" }}>
            What we've built.
          </h2>
        </motion.div>
        <div className="border-t border-white/5">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              className="grid grid-cols-12 gap-4 py-8 border-b border-white/5 items-center group hover:bg-[#0f0f0f] transition-colors duration-300 px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="col-span-3 md:col-span-2">
                <p className="text-[#c9a96e] text-[10px] tracking-[0.3em]" style={{ fontFamily: "var(--font-mono)" }}>{p.date}</p>
              </div>
              <div className="col-span-9 md:col-span-7">
                <h3 className="text-[#f0ece4] text-lg md:text-xl font-semibold mb-1 group-hover:text-[#c9a96e] transition-colors duration-300" style={{ fontFamily: "var(--font-display)" }}>{p.title}</h3>
                <p className="text-[#a09a90] text-[13px] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{p.desc}</p>
              </div>
              <div className="hidden md:flex col-span-3 gap-2 justify-end">
                {p.tags.map((t) => (
                  <span key={t} className="text-[#a09a90] text-[9px] tracking-[0.2em] uppercase border border-white/10 px-3 py-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── HIRE / CTA ─── */
function HireSection() {
  const { ref, isInView } = useScrollReveal();
  return (
    <section id="hire" className="py-28 md:py-36 bg-[#080808] relative">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          className="border border-[#c9a96e]/20 bg-[#0a0a0a] p-10 md:p-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="absolute top-8 left-8 text-[#c9a96e]/20 text-[9px] tracking-[0.5em] uppercase hidden md:block" style={{ fontFamily: "var(--font-mono)" }}>
            05 — Engage
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-[#f0ece4] text-4xl md:text-[3.4rem] font-bold leading-[1.05]" style={{ fontFamily: "var(--font-display)" }}>
                Have an idea? <span className="text-[#c9a96e]">Let's build it.</span>
              </h2>
              <p className="text-[#a09a90] text-[15px] leading-relaxed max-w-lg" style={{ fontFamily: "var(--font-body)" }}>
                Whether it's a personal brand site, a fullstack product, or a
                design system for your team — we take small, focused projects
                and ship them with the same care you see here.
              </p>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c9a96e]/60" />
                <p className="text-[#a09a90] text-xs" style={{ fontFamily: "var(--font-mono)" }}>Enosx Technologies — Nairobi, Kenya</p>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-3">
              {[
                { icon: MessageCircle, label: "WhatsApp", handle: "0798 303 978", href: "https://wa.me/254798303978" },
                { icon: Mail, label: "Work Email", handle: "Get in touch via WhatsApp", href: "https://wa.me/254798303978" },
                { icon: Instagram, label: "Instagram", handle: "@engima_cx", href: "https://instagram.com/engima_cx" },
                { icon: Facebook, label: "Facebook", handle: "Enosx Aura", href: "https://facebook.com/enosxaura" },
              ].map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-5 p-5 border border-white/5 hover:border-[#c9a96e]/30 bg-[#0f0f0f] transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#141414] flex items-center justify-center group-hover:bg-[#c9a96e]/10 transition-colors duration-300">
                    <c.icon className="w-4 h-4 text-[#c9a96e]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#f0ece4] text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>{c.label}</p>
                    <p className="text-[#a09a90] text-[11px] tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>{c.handle}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#c9a96e]/30 group-hover:text-[#c9a96e] transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="py-10 border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="E" className="w-5 h-5 object-contain" />
            <span className="text-[#f0ece4] text-sm" style={{ fontFamily: "var(--font-display)" }}>Enosx Technologies</span>
          </div>
          <p className="text-[#a09a90] text-[10px] tracking-[0.2em]" style={{ fontFamily: "var(--font-mono)" }}>
            © 2026 ENOSX TECHNOLOGIES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-5">
            <Link href="/" className="text-[#a09a90] hover:text-[#c9a96e] transition-colors duration-300 text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
              Blog
            </Link>
            <Link href="/gallery" className="text-[#a09a90] hover:text-[#c9a96e] transition-colors duration-300 text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
              Gallery
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE ─── */
export default function Enosx() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]" style={{ fontFamily: "var(--font-body)" }}>
      <NavBar />
      <HeroSection />
      <WorkSection />
      <ProcessSection />
      <HistorySection />
      <HireSection />
      <Footer />
    </div>
  );
}
