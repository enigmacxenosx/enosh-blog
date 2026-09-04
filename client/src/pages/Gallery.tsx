/**
 * Gallery Page — Dedicated photo gallery with upload capability.
 * Design: Editorial Noir (matching Home page)
 * - Dark charcoal base, amber accents, Playfair Display headings
 * - Masonry-style grid for uploaded photos
 * - Upload form (visible only when logged in as admin)
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Camera, Upload, Trash2, Plus, ArrowLeft, ImagePlus } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";

/* ─── Scroll Reveal Hook ─── */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: threshold, once: true });
  return { ref, isInView };
}

/* ─── Assets ─── */
const PHOTOS = {
  hero: "/enosh-1.jpg",
  shades: "/enosh-2.jpg",
  portrait: "/enosh-3.jpg",
  hustle: "/enosh-4.jpg",
  logo: "/enosh-logo.webp",
};

/* ─── Base Gallery Photos (from home page) ─── */
const BASE_PHOTOS = [
  { src: PHOTOS.hero, caption: "Street Style", sub: "Chapter 001 — The Look" },
  { src: PHOTOS.shades, caption: "The Vibe", sub: "Chapter 002 — Confidence" },
  { src: PHOTOS.portrait, caption: "Reflections", sub: "Chapter 003 — Mirror Work" },
  { src: PHOTOS.hustle, caption: "Grind Mode", sub: "Chapter 004 — The Come Up" },
  { src: "/gallery/chapter-005-shadow.jpg", caption: "Shadow Play", sub: "Chapter 005 — Low Light" },
  { src: "/gallery/chapter-006-blue-hour.jpg", caption: "Blue Hour", sub: "Chapter 006 — Electric Blue" },
  { src: "/gallery/chapter-007-monochrome.jpg", caption: "Monochrome", sub: "Chapter 007 — No Filter" },
  { src: "/gallery/chapter-008-window-light.jpg", caption: "Window Light", sub: "Chapter 008 — In Focus" },
  { src: "/gallery/chapter-009-close-up.jpg", caption: "Close Up", sub: "Chapter 009 — Presence" },
  { src: "/gallery/chapter-010-motion.jpg", caption: "In Motion", sub: "Chapter 010 — Keep Moving" },
  { src: "/gallery/chapter-011-electric-blue.jpg", caption: "Electric Blue", sub: "Chapter 011 — New Energy" },
  { src: "/gallery/chapter-012-violet.jpg", caption: "Violet Haze", sub: "Chapter 012 — After Hours" },
  { src: "/gallery/chapter-013-lamlok.jpg", caption: "Lamlok", sub: "Chapter 013 — Street Uniform" },
  { src: "/gallery/chapter-014-street-collage.png", caption: "Street Collage", sub: "Chapter 014 — The Collective" },
  { src: "/gallery/chapter-015-red-wall.png", caption: "Red Wall", sub: "Chapter 015 — Contrast" },
  { src: "/gallery/chapter-016-covered-face.png", caption: "Covered Face", sub: "Chapter 016 — Anonymous" },
  { src: "/gallery/chapter-017-grid-study.png", caption: "Grid Study", sub: "Chapter 017 — Fragments" },
  { src: "/gallery/chapter-018-nine-frames.png", caption: "Nine Frames", sub: "Chapter 018 — Many Sides" },
  { src: "/gallery/chapter-019-reflections.png", caption: "Reflections", sub: "Chapter 019 — Looking Back" },
  { src: "/gallery/chapter-020-profile.png", caption: "Profile", sub: "Chapter 020 — Side View" },
];

/* ─── Upload Dialog Component ─── */
function UploadDialog({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [caption, setCaption] = useState("");
  const [subCaption, setSubCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = trpc.gallery.upload.useMutation({
    onSuccess: () => {
      toast.success("Photo uploaded successfully!");
      setOpen(false);
      setFile(null);
      setPreview("");
      setCaption("");
      setSubCaption("");
      onSuccess();
    },
    onError: err => {
      toast.error(err.message || "Upload failed");
      setUploading(false);
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      const reader = new FileReader();
      reader.onload = ev => {
        if (ev.target?.result) setPreview(ev.target.result as string);
      };
      reader.readAsDataURL(f);
    }
  };

  const handleUpload = async () => {
    if (!file || !caption.trim()) {
      toast.error("Please select a file and enter a caption");
      return;
    }
    setUploading(true);

    // Convert file to base64
    const reader = new FileReader();
    reader.onload = async ev => {
      const base64 = (ev.target?.result as string).split(",")[1];
      uploadMutation.mutate({
        fileData: base64,
        fileName: file.name,
        caption: caption.trim(),
        subCaption: subCaption.trim(),
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-3 px-6 py-4 border border-[#c9a96e]/30 bg-[#0f0f0f] hover:bg-[#141414] hover:border-[#c9a96e]/60 transition-all duration-300 group">
          <div className="w-10 h-10 rounded-full bg-[#c9a96e]/10 flex items-center justify-center group-hover:bg-[#c9a96e]/20 transition-colors">
            <Upload className="w-4 h-4 text-[#c9a96e]" />
          </div>
          <div className="text-left">
            <p className="text-[#f0ece4] text-sm font-medium">Add New Photo</p>
            <p className="text-[#a09a90] text-[11px]">Upload with caption</p>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-[#141414] border-[#c9a96e]/20 text-[#f0ece4] max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#f0ece4]" style={{ fontFamily: "var(--font-display)" }}>
            Add to Gallery
          </DialogTitle>
          <DialogDescription className="text-[#a09a90]">
            Upload a new photo with a caption.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border border-dashed border-[#c9a96e]/30 rounded-lg p-8 flex flex-col items-center gap-3 hover:border-[#c9a96e]/60 transition-colors"
          >
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-48 rounded object-cover" />
            ) : (
              <>
                <ImagePlus className="w-8 h-8 text-[#c9a96e]/50" />
                <p className="text-[#a09a90] text-sm">Click to select image</p>
              </>
            )}
          </button>

          {/* Caption */}
          <div>
            <label className="text-[#a09a90] text-xs mb-1 block">Caption *</label>
            <Input
              value={caption}
              onChange={e => setCaption(e.target.value)}
              placeholder="e.g., Sunset Vibes"
              className="bg-[#0f0f0f] border-white/10 text-[#f0ece4] placeholder:text-[#555]"
            />
          </div>

          {/* Sub-caption */}
          <div>
            <label className="text-[#a09a90] text-xs mb-1 block">Chapter / Sub-label</label>
            <Input
              value={subCaption}
              onChange={e => setSubCaption(e.target.value)}
              placeholder="e.g., Chapter 005 — Golden Hour"
              className="bg-[#0f0f0f] border-white/10 text-[#f0ece4] placeholder:text-[#555]"
            />
          </div>

          {/* Upload Button */}
          <Button
            onClick={handleUpload}
            disabled={uploading || !file || !caption.trim()}
            className="w-full bg-[#c9a96e] text-[#0a0a0a] hover:bg-[#d4b87a] disabled:opacity-40"
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <Upload className="w-4 h-4 animate-spin" />
                Uploading...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add to Gallery
              </span>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Gallery Page ─── */
export default function Gallery() {
  const { ref, isInView } = useScrollReveal(0.05);
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const isAdmin = user?.role === "admin";

  const [photos, setPhotos] = useState<
    { id?: number; src: string; caption: string; sub: string }[]
  >(BASE_PHOTOS);
  const utils = trpc.useUtils();

  const { data: dbPhotos, isLoading } = trpc.gallery.list.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (dbPhotos) {
      const uploaded = dbPhotos.map(p => ({
        id: p.id,
        src: p.url,
        caption: p.caption,
        sub: p.subCaption || "",
      }));
      setPhotos([...BASE_PHOTOS, ...uploaded]);
    }
  }, [dbPhotos]);

  const deleteMutation = trpc.gallery.delete.useMutation({
    onSuccess: () => {
      utils.gallery.list.invalidate();
      toast.success("Photo deleted");
    },
    onError: err => toast.error(err.message),
  });

  const handleDelete = (id: number) => {
    if (confirm("Delete this photo?")) {
      deleteMutation.mutate({ id });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]" style={{ fontFamily: "var(--font-body)" }}>
      {/* ─── Nav Bar ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <img src={PHOTOS.logo} alt="E" className="w-6 h-6 object-contain" />
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
              — The Full Archive
            </p>
            <h1 className="text-[#f0ece4] text-4xl md:text-[3.8rem] font-bold leading-[1.05]" style={{ fontFamily: "var(--font-display)" }}>
              Gallery.
            </h1>
            <p className="text-[#a09a90] text-[15px] mt-4 max-w-lg">
              Every frame tells a story. This is the complete collection — curated moments captured in time.
            </p>

            {/* Upload button (admin only) */}
            {!authLoading && isAuthenticated && isAdmin && (
              <div className="mt-8">
                <UploadDialog onSuccess={() => utils.gallery.list.invalidate()} />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── Photo Grid ─── */}
      <section className="pb-28 md:pb-36 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Camera className="w-8 h-8 text-[#c9a96e]/30 animate-pulse" />
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              <AnimatePresence>
                {photos.map((photo, i) => (
                  <motion.div
                    key={`${photo.src}-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                    className="relative group break-inside-avoid"
                  >
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      style={{
                        filter: "brightness(0.88) contrast(1.02) saturate(0.95)",
                      }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                      <p className="text-[#c9a96e] text-[9px] tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                        {photo.sub}
                      </p>
                      <p className="text-[#f0ece4] text-lg font-medium" style={{ fontFamily: "var(--font-display)" }}>
                        {photo.caption}
                      </p>
                    </div>
                    {/* Delete button (admin only) */}
                    {!authLoading && isAuthenticated && isAdmin && photo.id && (
                      <button
                        onClick={() => handleDelete(photo.id!)}
                        className="absolute top-3 right-3 w-8 h-8 bg-[#0a0a0a]/70 border border-red-500/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Empty state hint */}
          {photos.length <= BASE_PHOTOS.length && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-16"
            >
              <p className="text-[#a09a90] text-sm">
                More frames coming soon. This archive grows with every chapter.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-10 border-t border-white/5 bg-[#080808]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src={PHOTOS.logo} alt="E" className="w-5 h-5 object-contain" />
              <span className="text-[#f0ece4] text-sm" style={{ fontFamily: "var(--font-display)" }}>Enosh</span>
            </div>
            <p className="text-[#a09a90] text-[10px] tracking-[0.2em]" style={{ fontFamily: "var(--font-mono)" }}>
              © 2026 ENOSH. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-5">
              <a href="https://instagram.com/engima_cx" target="_blank" rel="noopener noreferrer" className="text-[#a09a90] hover:text-[#c9a96e] transition-colors duration-300">
                <Camera className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
