import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TRACK_URL = "/audio/areyouhiding-bass-treble-boosted.mp3";

export default function SiteSoundtrack() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const audio = new Audio(TRACK_URL);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.72;
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    void audio
      .play()
      .then(() => {
        setAutoplayBlocked(false);
      })
      .catch(() => {
        // Browsers commonly block sound until the visitor interacts with the page.
        setAutoplayBlocked(true);
      });

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void audio.play().then(() => setAutoplayBlocked(false));
    } else {
      audio.pause();
    }
  };

  return (
    <aside
      aria-label="Site soundtrack"
      className="fixed bottom-5 left-5 z-50 w-[min(19rem,calc(100vw-2.5rem))] border border-white/15 bg-[#11100f]/95 p-3 text-[#f0ece4] shadow-2xl shadow-black/30 backdrop-blur-md"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause site soundtrack" : "Play site soundtrack"}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c9a96e]/60 text-[#e0c890] transition hover:border-[#e0c890] hover:bg-[#c9a96e]/10 focus:outline-none focus:ring-2 focus:ring-[#c9a96e]"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[10px] uppercase tracking-[0.2em] text-[#c9a96e]" style={{ fontFamily: "var(--font-mono)" }}>
            Site soundtrack
          </p>
          <p className="truncate text-sm text-[#f0ece4]">Are You Hiding — slowed</p>
          <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-[#a09a90]" style={{ fontFamily: "var(--font-mono)" }}>
            Bass + treble boost
          </p>
        </div>

        {isPlaying ? (
          <Volume2 className="h-4 w-4 shrink-0 text-[#c9a96e]" aria-hidden="true" />
        ) : (
          <VolumeX className="h-4 w-4 shrink-0 text-[#a09a90]" aria-hidden="true" />
        )}
      </div>

      {autoplayBlocked && !isPlaying && (
        <p className="mt-2 border-t border-white/10 pt-2 text-[11px] leading-relaxed text-[#a09a90]">
          Tap play to start the soundtrack.
        </p>
      )}
    </aside>
  );
}

