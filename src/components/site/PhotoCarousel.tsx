import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { Photo } from "@/content/wedding";

/** Carrousel de photos centré, en boucle et défilement automatique. */
export function PhotoCarousel({ photos, onOpen }: { photos: Photo[]; onOpen?: (index: number) => void }) {
  const [ref, api] = useEmblaCarousel({ loop: true, align: "center" });
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => api.scrollNext(), 4000);
    return () => clearInterval(id);
  }, [api, paused]);

  const prev = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      aria-roledescription="carrousel"
    >
      <div ref={ref} className="overflow-hidden py-6">
        <div className="flex">
          {photos.map((p, k) => (
            <div key={p.src + k} className="min-w-0 shrink-0 grow-0 basis-[78%] px-2 sm:basis-[45%] lg:basis-[32%]">
              <button
                type="button"
                onClick={() => onOpen?.(k)}
                className={`group block w-full overflow-hidden rounded-lg border border-gold/40 shadow-xl transition-all duration-700 ${
                  k === selected ? "scale-100 opacity-100" : "scale-[0.88] opacity-60"
                }`}
                aria-label={p.alt}
              >
                <img src={p.src} alt={p.alt} loading="lazy" className="img-zoom aspect-[3/4] w-full object-cover" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        aria-label="Photo précédente"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-cream/90 p-2.5 text-navy shadow-lg transition hover:scale-110 hover:bg-cream sm:left-6"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Photo suivante"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-cream/90 p-2.5 text-navy shadow-lg transition hover:scale-110 hover:bg-cream sm:right-6"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      <div className="mt-2 flex justify-center gap-2">
        {photos.map((p, k) => (
          <button
            key={p.src + k}
            aria-label={`Aller à la photo ${k + 1}`}
            onClick={() => api?.scrollTo(k)}
            className={`h-2 rounded-full transition-all duration-500 ${k === selected ? "w-8 bg-terracotta" : "w-2 bg-gold/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
