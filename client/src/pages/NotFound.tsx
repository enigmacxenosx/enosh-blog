import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <main className="lumora-page" style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem" }}>
      <section style={{ width: "min(100%, 42rem)", padding: "clamp(2rem,7vw,5rem)", border: "1px solid #e7e4df", borderRadius: "1.8rem", background: "linear-gradient(145deg,#fff,#f7f5f2)" }}>
        <p className="lm-kicker">A little off the map</p>
        <p style={{ marginTop: "2rem", color: "#b15f2c", fontSize: ".78rem", letterSpacing: ".12em" }}>404 / NOT FOUND</p>
        <h1 style={{ marginTop: ".7rem", fontSize: "clamp(2.8rem,8vw,5rem)", lineHeight: 1, fontWeight: 600, letterSpacing: "-.07em" }}>This page wandered off.</h1>
        <p style={{ maxWidth: "29rem", marginTop: "1.1rem", color: "#77736f", lineHeight: 1.7 }}>The address may have changed, or the page may never have been here. Let’s get you back to the stories.</p>
        <div style={{ display: "flex", gap: ".8rem", flexWrap: "wrap", marginTop: "2rem" }}>
          <Link href="/" className="lm-cta"><ArrowLeft size={16} /> Back home</Link>
          <Link href="/posts" className="lm-outline-link">Browse chapters <ArrowUpRight size={15} /></Link>
        </div>
      </section>
    </main>
  );
}
