/**
 * Blog Post Detail — single chapter rendered from Markdown
 * Design: Editorial Noir — charcoal canvas, warm white text, amber accents
 */
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "wouter";
import { motion, useInView } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, Tag, Trash2, Edit3 } from "lucide-react";
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
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ─── ASSETS ─── */
const LOGO = "/enosh-logo.png";

/* ─── Scroll Reveal Hook ─── */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: threshold, once: true });
  return { ref, isInView };
}

/* ─── Admin Edit Dialog ─── */
function EditPostDialog({
  post,
  onClose,
}: {
  post: { id: number; slug: string; title: string; excerpt: string | null; body: string; tags: string | null; coverUrl: string | null; status: string; sortOrder: number | null };
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? "",
    body: post.body,
    tags: post.tags ?? "",
    coverUrl: post.coverUrl ?? "",
    status: post.status,
    sortOrder: post.sortOrder ?? 0,
  });
  const [saving, setSaving] = useState(false);
  const utils = trpc.useUtils();

  const updateMutation = trpc.posts.update.useMutation({
    onSuccess: () => {
      toast.success("Post updated");
      setSaving(false);
      utils.posts.list.invalidate();
      utils.posts.adminList.invalidate();
      utils.posts.bySlug.invalidate({ slug: post.slug });
      onClose();
    },
    onError: err => {
      toast.error(err.message || "Update failed");
      setSaving(false);
    },
  });

  const handleSave = () => {
    setSaving(true);
    updateMutation.mutate({
      id: post.id,
      slug: form.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      body: form.body,
      tags: form.tags.trim(),
      coverUrl: form.coverUrl.trim(),
      status: form.status as "draft" | "published",
      sortOrder: form.sortOrder,
    });
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <DialogContent className="bg-[#141414] border-[#c9a96e]/20 text-[#f0ece4] max-w-lg max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-[#f0ece4]" style={{ fontFamily: "var(--font-display)" }}>
          Edit Chapter
        </DialogTitle>
        <DialogDescription className="text-[#a09a90]">Markdown body.</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 mt-4">
        <div>
          <label className="text-[#a09a90] text-xs mb-1 block">Title</label>
          <Input value={form.title} onChange={set("title")} className="bg-[#0f0f0f] border-white/10 text-[#f0ece4]" />
        </div>
        <div>
          <label className="text-[#a09a90] text-xs mb-1 block">Slug</label>
          <Input value={form.slug} onChange={set("slug")} className="bg-[#0f0f0f] border-white/10 text-[#f0ece4]" />
          <p className="text-[#a09a90] text-[10px] mt-1" style={{ fontFamily: "var(--font-mono)" }}>Changing the slug changes the URL</p>
        </div>
        <div>
          <label className="text-[#a09a90] text-xs mb-1 block">Excerpt</label>
          <Input value={form.excerpt} onChange={set("excerpt")} className="bg-[#0f0f0f] border-white/10 text-[#f0ece4]" />
        </div>
        <div>
          <label className="text-[#a09a90] text-xs mb-1 block">Body (Markdown)</label>
          <Textarea value={form.body} onChange={set("body")} rows={14} className="bg-[#0f0f0f] border-white/10 text-[#f0ece4] font-mono text-xs" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[#a09a90] text-xs mb-1 block">Tags</label>
            <Input value={form.tags} onChange={set("tags")} className="bg-[#0f0f0f] border-white/10 text-[#f0ece4]" />
          </div>
          <div>
            <label className="text-[#a09a90] text-xs mb-1 block">Cover URL</label>
            <Input value={form.coverUrl} onChange={set("coverUrl")} className="bg-[#0f0f0f] border-white/10 text-[#f0ece4]" />
          </div>
        </div>
        <div>
          <label className="text-[#a09a90] text-xs mb-1 block">Status</label>
          <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v }))}>
            <SelectTrigger className="bg-[#0f0f0f] border-white/10 text-[#f0ece4]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#141414] border-white/10">
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleSave} disabled={saving || !form.title.trim() || !form.body.trim()} className="w-full bg-[#c9a96e] text-[#0a0a0a] hover:bg-[#d4b87a] disabled:opacity-40">
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </DialogContent>
  );
}

/* ─── Markdown prose styles ─── */
const proseClasses = {
  h1: "text-[#f0ece4] text-2xl md:text-3xl font-bold mt-10 mb-4 first:mt-0",
  h2: "text-[#f0ece4] text-xl md:text-2xl font-bold mt-8 mb-3",
  h3: "text-[#f0ece4] text-lg font-semibold mt-6 mb-2",
  p: "text-[#cfc9bf] text-[15px] leading-relaxed mb-4",
  a: "text-[#c9a96e] hover:text-[#e0c890] underline underline-offset-4 transition-colors",
  strong: "text-[#f0ece4] font-semibold",
  em: "text-[#e8e2d6] italic",
  blockquote: "border-l-2 border-[#c9a96e]/50 pl-4 my-4 text-[#a09a90] italic",
  ul: "list-disc pl-6 mb-4 text-[#cfc9bf] text-[15px] space-y-1",
  ol: "list-decimal pl-6 mb-4 text-[#cfc9bf] text-[15px] space-y-1",
  li: "mb-1",
  code: "bg-[#141414] text-[#c9a96e] px-1.5 py-0.5 rounded text-[13px] font-mono",
  pre: "bg-[#141414] border border-white/5 rounded-lg p-4 overflow-x-auto my-4 text-[13px] font-mono text-[#cfc9bf]",
  hr: "border-white/10 my-8",
  img: "rounded-lg my-6 max-w-full",
};

/* ─── Page ─── */
export default function PostDetail() {
  const params = useParams<{ slug: string }>();
  const { ref, isInView } = useScrollReveal(0.05);
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const isAdmin = user?.role === "admin";
  const [editOpen, setEditOpen] = useState(false);

  const { data: post, isLoading } = trpc.posts.bySlug.useQuery(
    { slug: params.slug },
    { enabled: !!params.slug, staleTime: 2 * 60 * 1000 },
  );

  const deleteMutation = trpc.posts.remove.useMutation({
    onSuccess: () => {
      toast.success("Post deleted");
      // navigate via window to keep wouter simple
      window.location.href = "/posts";
    },
    onError: err => toast.error(err.message),
  });

  useEffect(() => {
    document.title = post ? `${post.title} — Enosh` : "Chapter — Enosh";
  }, [post]);

  const fmt = (d: string | Date | null) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
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
            <Link href="/posts" className="flex items-center gap-2 text-[#a09a90] hover:text-[#c9a96e] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>Chapters</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Content ─── */}
      {isLoading ? (
        <div className="pt-64 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#c9a96e]/30 border-t-[#c9a96e] animate-spin" />
        </div>
      ) : !post ? (
        <div className="pt-64 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <p className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase mb-6" style={{ fontFamily: "var(--font-mono)" }}>
            — 404
          </p>
          <h1 className="text-[#f0ece4] text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Chapter not found.
          </h1>
          <Link href="/posts" className="text-[#c9a96e] hover:text-[#e0c890] transition-colors text-[11px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
            ← Back to the chapters
          </Link>
        </div>
      ) : (
        <>
          {/* Article header */}
          <section className="pt-28 md:pt-36 bg-[#0a0a0a]">
            <div ref={ref} className="max-w-[860px] mx-auto px-6 md:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              >
                {post.tags && (
                  <div className="flex items-center gap-2 mb-5 flex-wrap">
                    {post.tags.split(",").map(t => t.trim()).filter(Boolean).map(t => (
                      <span key={t} className="flex items-center gap-1.5 text-[#c9a96e] text-[9px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                        <Tag className="w-3 h-3" />
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <h1 className="text-[#f0ece4] text-3xl md:text-[3.2rem] font-bold leading-[1.08] mb-5" style={{ fontFamily: "var(--font-display)" }}>
                  {post.title}
                </h1>
                <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                  <span className="flex items-center gap-1.5 text-[#a09a90] text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                    <Calendar className="w-3 h-3" />
                    {fmt(post.publishedAt ?? post.createdAt)}
                  </span>
                  {!authLoading && isAuthenticated && isAdmin && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditOpen(true)}
                        className="border-[#c9a96e]/30 text-[#c9a96e] hover:bg-[#c9a96e]/10"
                      >
                        <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (confirm("Delete this post? This cannot be undone.")) deleteMutation.mutate({ id: post.id });
                        }}
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                      </Button>
                    </div>
                  )}
                </div>
                {post.coverUrl && (
                  <div className="overflow-hidden rounded-lg mb-10">
                    <img
                      src={post.coverUrl}
                      alt={post.title}
                      className="w-full max-h-[420px] object-cover"
                      style={{ filter: "brightness(0.9) contrast(1.02) saturate(0.95)" }}
                    />
                  </div>
                )}
              </motion.div>
            </div>
          </section>

          {/* Article body */}
          <section className="pb-28 md:pb-36 bg-[#0a0a0a]">
            <article className="max-w-[860px] mx-auto px-6 md:px-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="prose-custom"
              >
                <ReactMarkdown
                  components={{
                    h1: ({ ...props }) => <h1 {...props} className={proseClasses.h1} />,
                    h2: ({ ...props }) => <h2 {...props} className={proseClasses.h2} />,
                    h3: ({ ...props }) => <h3 {...props} className={proseClasses.h3} />,
                    p: ({ ...props }) => <p {...props} className={proseClasses.p} />,
                    a: ({ ...props }) => <a {...props} className={proseClasses.a} />,
                    strong: ({ ...props }) => <strong {...props} className={proseClasses.strong} />,
                    em: ({ ...props }) => <em {...props} className={proseClasses.em} />,
                    blockquote: ({ ...props }) => <blockquote {...props} className={proseClasses.blockquote} />,
                    ul: ({ ...props }) => <ul {...props} className={proseClasses.ul} />,
                    ol: ({ ...props }) => <ol {...props} className={proseClasses.ol} />,
                    li: ({ ...props }) => <li {...props} className={proseClasses.li} />,
                    code: ({ ...props }) => <code {...props} className={proseClasses.code} />,
                    pre: ({ ...props }) => <pre {...props} className={proseClasses.pre} />,
                    hr: ({ ...props }) => <hr {...props} className={proseClasses.hr} />,
                    img: ({ ...props }) => <img {...props} className={proseClasses.img} />,
                  }}
                >
                  {post.body}
                </ReactMarkdown>
              </motion.div>

              {/* End note */}
              <div className="mt-16 pt-8 border-t border-white/5">
                <Link
                  href="/posts"
                  className="inline-flex items-center gap-2 text-[#c9a96e] hover:text-[#e0c890] transition-colors text-[11px] tracking-[0.3em] uppercase"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to the chapters
                </Link>
              </div>
            </article>
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
        </>
      )}

      {post && editOpen && <EditPostDialog post={post} onClose={() => setEditOpen(false)} />}
    </div>
  );
}
