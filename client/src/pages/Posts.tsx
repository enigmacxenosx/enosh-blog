/**
 * Blog Posts Index — "The Chapters"
 * Design: Editorial Noir — charcoal canvas, warm white text, amber accents
 * Typography: Playfair Display (display) + DM Sans (body) + Space Mono (accent)
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Calendar, Tag, Plus } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ─── ASSETS ─── */
const LOGO = "/enosh-logo.webp";

/* ─── Scroll Reveal Hook ─── */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: threshold, once: true });
  return { ref, isInView };
}

/* ─── Post Editor Dialog (admin only) ─── */
const EMPTY = {
  slug: "",
  title: "",
  excerpt: "",
  body: "",
  tags: "",
  coverUrl: "",
  status: "draft" as "draft" | "published",
  sortOrder: 0,
};

function PostEditor({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [creating, setCreating] = useState(false);
  const utils = trpc.useUtils();

  const createMutation = trpc.posts.create.useMutation({
    onSuccess: () => {
      toast.success("Post saved!");
      setOpen(false);
      setForm(EMPTY);
      setCreating(false);
      utils.posts.list.invalidate();
      utils.posts.adminList.invalidate();
      onSuccess();
    },
    onError: err => {
      toast.error(err.message || "Failed to save post");
      setCreating(false);
    },
  });

  const handleCreate = () => {
    if (!form.slug.trim() || !form.title.trim() || !form.body.trim()) {
      toast.error("Slug, title, and body are required");
      return;
    }
    setCreating(true);
    createMutation.mutate({
      slug: form.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      body: form.body,
      tags: form.tags.trim(),
      coverUrl: form.coverUrl.trim(),
      status: form.status,
      sortOrder: form.sortOrder,
    });
  };

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-3 px-6 py-4 border border-[#c9a96e]/30 bg-[#0f0f0f] hover:bg-[#141414] hover:border-[#c9a96e]/60 transition-all duration-300 group">
          <div className="w-10 h-10 rounded-full bg-[#c9a96e]/10 flex items-center justify-center group-hover:bg-[#c9a96e]/20 transition-colors">
            <Plus className="w-4 h-4 text-[#c9a96e]" />
          </div>
          <div className="text-left">
            <p className="text-[#f0ece4] text-sm font-medium">New Post</p>
            <p className="text-[#a09a90] text-[11px]">Write in Markdown</p>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-[#141414] border-[#c9a96e]/20 text-[#f0ece4] max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#f0ece4]" style={{ fontFamily: "var(--font-display)" }}>
            New Chapter
          </DialogTitle>
          <DialogDescription className="text-[#a09a90]">
            Write your post in Markdown. Slug uses lowercase letters, numbers, and hyphens only.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="text-[#a09a90] text-xs mb-1 block">Title *</label>
            <Input
              value={form.title}
              onChange={set("title")}
              placeholder="e.g., The Craft of Editorial Design"
              className="bg-[#0f0f0f] border-white/10 text-[#f0ece4] placeholder:text-[#555]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[#a09a90] text-xs mb-1 block">Slug *</label>
              <Input
                value={form.slug}
                onChange={set("slug")}
                placeholder="editorial-design-craft"
                className="bg-[#0f0f0f] border-white/10 text-[#f0ece4] placeholder:text-[#555]"
              />
            </div>
            <div>
              <label className="text-[#a09a90] text-xs mb-1 block">Sort order</label>
              <Input
                type="number"
                value={form.sortOrder}
                onChange={e => setForm(f => ({ ...f, sortOrder: Number(e.target.value) }))}
                className="bg-[#0f0f0f] border-white/10 text-[#f0ece4]"
              />
            </div>
          </div>
          <div>
            <label className="text-[#a09a90] text-xs mb-1 block">Excerpt</label>
            <Input
              value={form.excerpt}
              onChange={set("excerpt")}
              placeholder="Shown on the post card"
              className="bg-[#0f0f0f] border-white/10 text-[#f0ece4] placeholder:text-[#555]"
            />
          </div>
          <div>
            <label className="text-[#a09a90] text-xs mb-1 block">Body (Markdown) *</label>
            <Textarea
              value={form.body}
              onChange={set("body")}
              placeholder={"# Heading\n\nYour Markdown content here..."}
              rows={12}
              className="bg-[#0f0f0f] border-white/10 text-[#f0ece4] placeholder:text-[#555] font-mono text-xs"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[#a09a90] text-xs mb-1 block">Tags (comma-separated)</label>
              <Input
                value={form.tags}
                onChange={set("tags")}
                placeholder="design, case-study"
                className="bg-[#0f0f0f] border-white/10 text-[#f0ece4] placeholder:text-[#555]"
              />
            </div>
            <div>
              <label className="text-[#a09a90] text-xs mb-1 block">Cover image URL</label>
              <Input
                value={form.coverUrl}
                onChange={set("coverUrl")}
                placeholder="/enosh-1.jpg"
                className="bg-[#0f0f0f] border-white/10 text-[#f0ece4] placeholder:text-[#555]"
              />
            </div>
          </div>
          <div>
            <label className="text-[#a09a90] text-xs mb-1 block">Status</label>
            <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v as "draft" | "published" }))}>
              <SelectTrigger className="bg-[#0f0f0f] border-white/10 text-[#f0ece4]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#141414] border-white/10">
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleCreate}
            disabled={creating || !form.title.trim() || !form.slug.trim() || !form.body.trim()}
            className="w-full bg-[#c9a96e] text-[#0a0a0a] hover:bg-[#d4b87a] disabled:opacity-40"
          >
            {creating ? "Saving..." : "Save Post"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Page ─── */
export default function Posts() {
  const { ref, isInView } = useScrollReveal(0.05);
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const isAdmin = user?.role === "admin";
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const { data: posts, isLoading } = trpc.posts.list.useQuery(undefined, {
    staleTime: 2 * 60 * 1000,
  });

  const allTags = Array.from(
    new Set(
      (posts ?? []).flatMap(p =>
        (p.tags ?? "")
          .split(",")
          .map(t => t.trim())
          .filter(Boolean),
      ),
    ),
  );

  const filtered = (posts ?? []).filter(
    p => !selectedTag || (p.tags ?? "").split(",").map(t => t.trim()).includes(selectedTag),
  );

  useEffect(() => {
    document.title = "Chapters — Enosh";
  }, []);

  const fmt = (d: string | Date | null) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

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
            <Link href="/" className="flex items-center gap-2 text-[#a09a90] hover:text-[#c9a96e] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Header ─── */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-[#0a0a0a]">
        <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase mb-6" style={{ fontFamily: "var(--font-mono)" }}>
              — The Chapters
            </p>
            <h1 className="text-[#f0ece4] text-4xl md:text-[3.8rem] font-bold leading-[1.05]" style={{ fontFamily: "var(--font-display)" }}>
              Writing.
            </h1>
            <p className="text-[#a09a90] text-[15px] mt-4 max-w-lg">
              Long-form thoughts on design, craft, and the build. Every post is a chapter — read them in any order you like.
            </p>
            {!authLoading && isAuthenticated && isAdmin && (
              <div className="mt-8">
                <PostEditor onSuccess={() => {}} />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── Tag Filter ─── */}
      {allTags.length > 0 && (
        <section className="pb-6 bg-[#0a0a0a]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedTag(null)}
              className={`text-[10px] tracking-[0.25em] uppercase border px-4 py-2 transition-all duration-300 ${
                selectedTag === null
                  ? "border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/10"
                  : "border-white/10 text-[#a09a90] hover:border-[#c9a96e]/40"
              }`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              All
            </button>
            {allTags.map(t => (
              <button
                key={t}
                onClick={() => setSelectedTag(selectedTag === t ? null : t)}
                className={`text-[10px] tracking-[0.25em] uppercase border px-4 py-2 transition-all duration-300 ${
                  selectedTag === t
                    ? "border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/10"
                    : "border-white/10 text-[#a09a90] hover:border-[#c9a96e]/40"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ─── Posts Grid ─── */}
      <section className="pb-28 md:pb-36 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 rounded-full border-2 border-[#c9a96e]/30 border-t-[#c9a96e] animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="py-24 text-center"
            >
              <p className="text-[#a09a90] text-sm">
                {posts && posts.length > 0
                  ? "No chapters under this tag yet."
                  : "The first chapter is being written. Check back soon."}
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                  className="bg-[#0a0a0a] p-8 md:p-10 group"
                >
                  <Link href={`/posts/${post.slug}`} className="block">
                    {post.coverUrl && (
                      <div className="mb-6 overflow-hidden">
                        <img
                          src={post.coverUrl}
                          alt={post.title}
                          className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          style={{ filter: "brightness(0.88) contrast(1.02) saturate(0.95)" }}
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-4 mb-4">
                      {post.tags && (
                        <span className="flex items-center gap-1.5 text-[#c9a96e] text-[9px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                          <Tag className="w-3 h-3" />
                          {post.tags.split(",")[0]?.trim()}
                        </span>
                      )}
                      {post.publishedAt && (
                        <span className="flex items-center gap-1.5 text-[#a09a90] text-[9px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                          <Calendar className="w-3 h-3" />
                          {fmt(post.publishedAt)}
                        </span>
                      )}
                    </div>
                    <h2 className="text-[#f0ece4] text-2xl md:text-[1.8rem] font-bold leading-[1.15] mb-3 group-hover:text-[#c9a96e] transition-colors duration-300" style={{ fontFamily: "var(--font-display)" }}>
                      {post.title}
                    </h2>
                    <p className="text-[#a09a90] text-[13px] leading-relaxed">
                      {post.excerpt || "The first chapter is being written. Check back soon."}
                    </p>
                    <p className="text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase mt-6" style={{ fontFamily: "var(--font-mono)" }}>
                      Read chapter →
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Footer ─── */}
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
              <Link href="/" className="text-[#a09a90] hover:text-[#c9a96e] transition-colors text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                Home
              </Link>
              <Link href="/gallery" className="text-[#a09a90] hover:text-[#c9a96e] transition-colors text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                Gallery
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
