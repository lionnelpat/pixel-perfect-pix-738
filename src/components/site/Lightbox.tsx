import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect } from "react";
import type { Photo } from "@/content/wedding";

export function Lightbox({ photos, index, onChange }: { photos: Photo[]; index: number | null; onChange: (i: number | null) => void }) {
  const n = photos.length;
  const move = useCallback((d: number) => index !== null && onChange((index + d + n) % n), [index, n, onChange]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, move, onChange]);

  const p = index === null ? undefined : photos[index];
  if (!p) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={p.alt}
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 p-4 backdrop-blur-sm"
      onClick={() => onChange(null)}
    >
      <figure className="fade-up text-center" key={p.src} onClick={(e) => e.stopPropagation()}>
        <img src={p.src} alt={p.alt} className="max-h-[80vh] max-w-full rounded-md shadow-2xl ring-1 ring-gold/40" />
        <figcaption className="mt-3 font-serif text-lg italic text-navy-foreground/85">{p.alt}</figcaption>
        <p className="text-xs tracking-widest text-gold">
          {index! + 1} / {n}
        </p>
      </figure>
      <button aria-label="Fermer" className="absolute right-4 top-4 text-navy-foreground transition hover:rotate-90 hover:text-gold" onClick={() => onChange(null)}>
        <X className="h-7 w-7" />
      </button>
      {n > 1 && (
        <>
          <button aria-label="Précédente" className="absolute left-2 rounded-full p-2 text-navy-foreground hover:bg-gold/20 sm:left-6" onClick={(e) => { e.stopPropagation(); move(-1); }}>
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button aria-label="Suivante" className="absolute right-2 rounded-full p-2 text-navy-foreground hover:bg-gold/20 sm:right-6" onClick={(e) => { e.stopPropagation(); move(1); }}>
            <ChevronRight className="h-8 w-8" />
          </button>
        </>
      )}
    </div>
  );
}
