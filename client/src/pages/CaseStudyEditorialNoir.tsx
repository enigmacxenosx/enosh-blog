/**
 * Case Study — Editorial Noir Design System
 * Route: /enosx/case-studies/editorial-noir
 * Design: Editorial Noir (self-documenting — the page IS the design system)
 */
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Droplets, LayoutGrid, Sparkles, Type } from "lucide-react";

/* ─── ASSETS ─── */
const LOGO = "/enosh-logo.png";

/* ─── Scroll Reveal Hook ─── */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: threshold, once: true });
  return { ref, isInView };
}

/* ─── Color swatch ─── */
function Swatch({
  name,
  hex,
  role,
  dark = true,
}: {
  name: string;
  hex: string;
  role: string;
  dark?: boolean;
}) {
  return (
    <div>
      <div
        className="h-32 border border-white/10 transition-transform duration-500 hover:scale-[1.02]"
        style={{ backgroundColor: hex }}
      />
      <p className={`mt-3 text-sm font-medium ${dark ? "text-[#f0ece4]" : "text-[#0a0a0a]"}`} style={{ fontFamily: "var(--font-mono)" }}>
        {name}
      </p>
      <p className={`text-[10px] tracking-[0.25em] uppercase ${dark ? "text-[#a09a90]" : "text-[#0a0a0a]/60"}`} style={{ fontFamily: "var(--font-mono)" }}>
        {hex}
      </p>
      <p className="text-[#a09a90] text-xs mt-1">{role}</p>
    </div>
  );
}

/* ─── Type specimen ─── */
function TypeSpecimen({
  family,
  cssVar,
  usage,
  specimen,
  size,
  weight,
}: {
  family: string;
  cssVar: string;
  usage: string;
  specimen: string;
  size: string;
  weight: string;
}) {
  const { ref, isInView } = useScrollReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="border border-white/5 bg-[#0f0f0f] p-8 md:p-10"
    >
      <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
        {family}
      </p>
      <p className="leading-none mb-6 text-[#f0ece4]" style={{ fontFamily: `var(${cssVar})`, fontSize: size, fontWeight: weight }}>
        {specimen}
      </p>
      <p className="text-[#a09a90] text-xs">{usage}</p>
    </motion.div>
  );
}

/* ─── Section label ─── */
function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <p className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase mb-6" style={{ fontFamily: "var(--font-mono)" }}>
      {index} — {label}
    </p>
  );
}

/* ─── Page ─── */
export default function CaseStudyEditorialNoir() {
  const heroRef = useScrollReveal(0.05);
  const grainRef = useScrollReveal(0.2);

  useEffect(() => {
    document.title = "Case Study — Editorial Noir — Enosx Technologies";
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]" style={{ fontFamily: "var(--font-body)" }}>
      {/* ─── Nav Bar ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <img src={LOGO} alt="E" className="w-6 h-6 object-contain" />
            <span className="text-[#f0ece4] text-lg font-medium" style={{ fontFamily: "var(--font-display)" }}>
              Enosh
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/enosx" className="flex items-center gap-2 text-[#a09a90] hover:text-[#c9a96e] transition-colors">
              <span className="text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>Enosx</span>
            </Link>
            <Link href="/posts" className="flex items-center gap-2 text-[#a09a90] hover:text-[#c9a96e] transition-colors">
              <span className="text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>Chapters</span>
            </Link>
            <Link href="/" className="flex items-center gap-2 text-[#a09a90] hover:text-[#c9a96e] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="pt-28 md:pt-40 pb-20 md:pb-28 bg-[#0a0a0a] relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            ref={heroRef.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={heroRef.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase mb-6" style={{ fontFamily: "var(--font-mono)" }}>
              — Case Study / 01
            </p>
            <h1 className="text-[#f0ece4] text-4xl md:text-[4.2rem] font-bold leading-[1.02] max-w-3xl" style={{ fontFamily: "var(--font-display)" }}>
              Editorial Noir.
            </h1>
            <p className="text-[#a09a90] text-base md:text-lg mt-5 max-w-2xl leading-relaxed">
              How one decision — a design direction — shaped every pixel of the Enosh blog. The full system, documented: movement, palette, type, layout, and motion.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="border border-[#c9a96e]/30 px-5 py-3">
                <p className="text-[#a09a90] text-[9px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>Direction chosen</p>
                <p className="text-[#f0ece4] text-sm mt-1" style={{ fontFamily: "var(--font-display)" }}>Editorial Noir</p>
              </div>
              <div className="border border-white/10 px-5 py-3">
                <p className="text-[#a09a90] text-[9px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>Client fit</p>
                <p className="text-[#f0ece4] text-sm mt-1" style={{ fontFamily: "var(--font-display)" }}>Personal brand</p>
              </div>
              <div className="border border-white/10 px-5 py-3">
                <p className="text-[#a09a90] text-[9px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>Stack</p>
                <p className="text-[#f0ece4] text-sm mt-1" style={{ fontFamily: "var(--font-display)" }}>Vite · React · Drizzle</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 01: The Decision ─── */}
      <section className="pb-20 md:pb-28 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <SectionLabel index="01" label="The Decision" />
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-7">
              <h2 className="text-[#f0ece4] text-2xl md:text-[2.4rem] font-bold leading-[1.15] mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Three directions. One choice.
              </h2>
              <p className="text-[#a09a90] text-[15px] leading-relaxed mb-8">
                Before writing a single line of code, the Enosx studio evaluated three distinct stylistic approaches against the brand's essence — a personal space that feels like flipping through a curated magazine. Each direction carried a weighted probability; the winner shaped everything that followed.
              </p>
            </div>
            <div className="md:col-span-5 space-y-4">
              {[
                { name: "Editorial Noir", weight: "0.45", note: "Selected — high-contrast, magazine-style dark theme. GQ meets a personal diary.", win: true },
                { name: "Warm Minimalism", weight: "0.30", note: "Clean cream canvas, earth tones, soft type. Approachable, but quieter.", win: false },
                { name: "Kinetic Street", weight: "0.25", note: "Bold, overlapping, raw. Energetic — but risked overwhelming the photography.", win: false },
              ].map(d => (
                <div
                  key={d.name}
                  className={`border p-5 transition-colors duration-300 ${d.win ? "border-[#c9a96e]/50 bg-[#c9a96e]/5" : "border-white/5 bg-[#0f0f0f]"}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[#f0ece4] text-sm font-medium" style={{ fontFamily: "var(--font-display)" }}>
                      {d.name}
                    </p>
                    <span className="text-[#c9a96e] text-[10px] tracking-[0.3em]" style={{ fontFamily: "var(--font-mono)" }}>
                      {d.weight}
                    </span>
                  </div>
                  <p className="text-[#a09a90] text-xs leading-relaxed">{d.note}</p>
                  {d.win && (
                    <p className="text-[#c9a96e] text-[9px] tracking-[0.3em] uppercase mt-3" style={{ fontFamily: "var(--font-mono)" }}>
                      ✓ Selected direction
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 02: Core Principles ─── */}
      <section className="pb-20 md:pb-28 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <SectionLabel index="02" label="Core Principles" />
          <h2 className="text-[#f0ece4] text-2xl md:text-[2.4rem] font-bold leading-[1.15] mb-10 max-w-2xl" style={{ fontFamily: "var(--font-display)" }}>
            Four rules everything obeys.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {[
              { title: "Dark Canvas", desc: "Deep charcoal near-black background that makes every photo and accent color sing.", icon: "canvas" },
              { title: "Typographic Drama", desc: "Large, bold display type mixed with elegant body text for hierarchy.", icon: "type" },
              { title: "Generous Spacing", desc: "Breathing room around content, letting each element breathe.", icon: "grid" },
              { title: "Intentional Motion", desc: "Subtle, purposeful animations that feel premium, not gimmicky.", icon: "spark" },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                className="bg-[#0a0a0a] p-8 group hover:bg-[#0f0f0f] transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-[#c9a96e]/10 flex items-center justify-center mb-6 group-hover:bg-[#c9a96e]/20 transition-colors">
                  {p.icon === "canvas" && <Droplets className="w-4 h-4 text-[#c9a96e]" />}
                  {p.icon === "type" && <Type className="w-4 h-4 text-[#c9a96e]" />}
                  {p.icon === "grid" && <LayoutGrid className="w-4 h-4 text-[#c9a96e]" />}
                  {p.icon === "spark" && <Sparkles className="w-4 h-4 text-[#c9a96e]" />}
                </div>
                <p className="text-[#f0ece4] text-base font-medium mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  {p.title}
                </p>
                <p className="text-[#a09a90] text-xs leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 03: Color Philosophy ─── */}
      <section className="pb-20 md:pb-28 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <SectionLabel index="03" label="Color Philosophy" />
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <h2 className="text-[#f0ece4] text-2xl md:text-[2.4rem] font-bold leading-[1.15] mb-6" style={{ fontFamily: "var(--font-display)" }}>
                One accent. One canvas.
              </h2>
              <p className="text-[#a09a90] text-[15px] leading-relaxed mb-6">
                The palette is anchored in deep charcoal with warm off-white text. A single accent — warm amber/gold — used sparingly for links, highlights, and decorative elements.
              </p>
              <p className="text-[#a09a90] text-[15px] leading-relaxed italic">
                "The warmth of the amber cuts through the darkness like golden hour light — connecting to the warm tones already present in Enosh's photos."
              </p>
            </div>
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Swatch name="Charcoal" hex="#0a0a0a" role="Canvas / background" />
              <Swatch name="Warm White" hex="#f0ece4" role="Primary text" dark />
              <Swatch name="Amber Gold" hex="#c9a96e" role="Signature accent" dark />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 04: Typography ─── */}
      <section className="pb-20 md:pb-28 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <SectionLabel index="04" label="Typography System" />
          <h2 className="text-[#f0ece4] text-2xl md:text-[2.4rem] font-bold leading-[1.15] mb-10 max-w-2xl" style={{ fontFamily: "var(--font-display)" }}>
            Three voices, one hierarchy.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TypeSpecimen
              family="Playfair Display"
              cssVar="--font-display"
              usage="Display — bold serif for headings, dramatic and editorial"
              specimen="This is my story."
              size="2.4rem"
              weight="700"
            />
            <TypeSpecimen
              family="DM Sans"
              cssVar="--font-body"
              usage="Body — clean, modern sans for text and navigation"
              specimen="Aa Bb Cc 123"
              size="1.8rem"
              weight="400"
            />
            <TypeSpecimen
              family="Space Mono"
              cssVar="--font-mono"
              usage="Accent — monospace for labels, dates, and metadata"
              specimen="01 / 04"
              size="1.5rem"
              weight="400"
            />
          </div>
        </div>
      </section>

      {/* ─── 05: Layout ─── */}
      <section className="pb-20 md:pb-28 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <SectionLabel index="05" label="Layout Paradigm" />
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-7">
              <h2 className="text-[#f0ece4] text-2xl md:text-[2.4rem] font-bold leading-[1.15] mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Asymmetric, on purpose.
              </h2>
              <p className="text-[#a09a90] text-[15px] leading-relaxed mb-6">
                Content doesn't sit centered in a column — it breaks across the viewport with intentional imbalance. Hero sections use full-bleed images with text overlays positioned off-center. Sections alternate between left-heavy and right-heavy compositions.
              </p>
              <h3 className="text-[#f0ece4] text-base font-semibold mb-3" style={{ fontFamily: "var(--font-display)" }}>
                Signature elements
              </h3>
              <ul className="space-y-2">
                {["Vertical text accents — rotated text along section edges", "Film grain overlay — subtle noise texture for depth", "Warm amber underlines — decorative strokes on key headings"].map(el => (
                  <li key={el} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] mt-2 shrink-0" />
                    <span className="text-[#a09a90] text-[13px]">{el}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-5 relative">
              <div className="border border-white/10 bg-[#0f0f0f] h-72 flex items-center justify-center relative overflow-hidden">
                {/* Demo: asymmetric composition */}
                <div className="absolute top-4 left-4 w-1/2 h-3/4 border border-[#c9a96e]/30 bg-[#c9a96e]/5 flex items-center justify-center">
                  <span className="text-[#c9a96e] text-[9px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>Left-heavy</span>
                </div>
                <div className="absolute bottom-4 right-4 w-1/3 h-1/2 border border-white/10 flex items-center justify-center">
                  <span className="text-[#a09a90] text-[9px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>Right</span>
                </div>
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[#c9a96e]/40 text-[9px] tracking-[0.4em] uppercase" style={{ fontFamily: "var(--font-mono)", writingMode: "vertical-rl" }}>
                  Vertical accent
                </span>
              </div>
              <p className="text-[#a09a90] text-[10px] tracking-[0.25em] uppercase mt-3 text-center" style={{ fontFamily: "var(--font-mono)" }}>
                Illustrative diagram — intentional imbalance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 06: Motion ─── */}
      <section className="pb-20 md:pb-28 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <SectionLabel index="06" label="Interaction & Motion" />
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-6">
              <h2 className="text-[#f0ece4] text-2xl md:text-[2.4rem] font-bold leading-[1.15] mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Deliberate and weighted.
              </h2>
              <p className="text-[#a09a90] text-[15px] leading-relaxed mb-8">
                Interactions feel deliberate and weighted. Hover states shift subtly — slight scale, color transitions. Scroll reveals elements with a fade-up motion, creating a sense of discovering content as you move down the page.
              </p>
              <div className="space-y-4">
                <div className="border border-white/5 bg-[#0f0f0f] p-5">
                  <p className="text-[#c9a96e] text-[9px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "var(--font-mono)" }}>Entrance animation</p>
                  <p className="text-[#f0ece4] text-sm font-mono">fade-up · translateY 20px → 0</p>
                  <p className="text-[#a09a90] text-[11px] mt-1">80ms stagger delay between siblings</p>
                </div>
                <div className="border border-white/5 bg-[#0f0f0f] p-5">
                  <p className="text-[#c9a96e] text-[9px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "var(--font-mono)" }}>Hover transition</p>
                  <p className="text-[#f0ece4] text-sm font-mono">cubic-bezier(0.23, 1, 0.32, 1)</p>
                  <p className="text-[#a09a90] text-[11px] mt-1">snappy ease-out, no linear feel</p>
                </div>
                <div className="border border-white/5 bg-[#0f0f0f] p-5">
                  <p className="text-[#c9a96e] text-[9px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "var(--font-mono)" }}>Parallax</p>
                  <p className="text-[#f0ece4] text-sm font-mono">0.3× scroll speed on hero images</p>
                  <p className="text-[#a09a90] text-[11px] mt-1">subtle depth, never dizzying</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-6" ref={grainRef.ref}>
              {/* Live demo: three staggered cards exactly like the system describes */}
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={grainRef.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                  className="border border-white/10 bg-[#0f0f0f] p-6 mb-4 hover:border-[#c9a96e]/40 transition-all duration-500"
                  style={{ marginLeft: `${i * 24}px`, maxWidth: "calc(100% - ${i * 24}px)" }}
                >
                  <p className="text-[#c9a96e] text-[9px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    Reveal {String(i + 1).padStart(2, "0")} — +{i * 80}ms
                  </p>
                  <p className="text-[#f0ece4] text-sm" style={{ fontFamily: "var(--font-display)" }}>
                    {["Staggered entrance.", "Weighted hover.", "Fade-up discovery."][i]}
                  </p>
                </motion.div>
              ))}
              <p className="text-[#a09a90] text-[10px] tracking-[0.25em] uppercase mt-2 text-right" style={{ fontFamily: "var(--font-mono)" }}>
                Scroll back up to re-watch
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 07: Brand Voice ─── */}
      <section className="pb-20 md:pb-28 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <SectionLabel index="07" label="Brand Voice" />
          <div className="border-l-2 border-[#c9a96e]/50 pl-8 md:pl-12 max-w-2xl">
            <p className="text-[#a09a90] text-[15px] leading-relaxed mb-8">
              A personal space that feels like flipping through a curated magazine about one person's life — authentic, stylish, and unapologetically confident. Headlines are short, bold statements. CTAs are direct.
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-[#c9a96e] text-[9px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "var(--font-mono)" }}>Headline</p>
                <p className="text-[#f0ece4] text-2xl md:text-3xl" style={{ fontFamily: "var(--font-display)" }}>This is my story.</p>
              </div>
              <div>
                <p className="text-[#c9a96e] text-[9px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "var(--font-mono)" }}>CTA</p>
                <p className="text-[#f0ece4] text-lg">Read more.</p>
              </div>
              <div>
                <p className="text-[#c9a96e] text-[9px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "var(--font-mono)" }}>Logo</p>
                <div className="flex items-center gap-3">
                  <img src={LOGO} alt="E monogram" className="w-10 h-10 object-contain" />
                  <p className="text-[#a09a90] text-xs">Geometric "E" monogram with a subtle diagonal cut — favicon and nav.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="pb-20 md:pb-28 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="border border-[#c9a96e]/30 p-10 md:p-16 text-center">
            <p className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase mb-6" style={{ fontFamily: "var(--font-mono)" }}>
              — Apply the system
            </p>
            <h2 className="text-[#f0ece4] text-2xl md:text-[2.6rem] font-bold leading-[1.15] mb-6 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-display)" }}>
              Every project starts with a decision like this one.
            </h2>
            <p className="text-[#a09a90] text-sm max-w-xl mx-auto mb-10">
              Editorial Noir was one idea among three. The next brand system we build for you will be different — but it will be just as deliberate.
            </p>
            <Link
              href="/enosx#hire"
              className="inline-block border border-[#c9a96e] text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-all duration-300 px-8 py-4 text-[11px] tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Start a project
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-10 border-t border-white/5 bg-[#080808]">
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
              <Link href="/enosx" className="text-[#a09a90] hover:text-[#c9a96e] transition-colors text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                Studio
              </Link>
              <Link href="/" className="text-[#a09a90] hover:text-[#c9a96e] transition-colors text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                Home
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
