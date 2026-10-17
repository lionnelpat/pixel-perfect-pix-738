import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { PageHeader } from "@/components/site/Ornaments";
import { gallery } from "@/content/wedding";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie — Thibaut & Sylviane" },
      { name: "description", content: "Les photos du couple et des célébrations." },
      { property: "og:title", content: "Galerie photo" },
      { property: "og:description", content: "Nos plus beaux souvenirs." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [i, setI] = useState<number | null>(null);
  const n = gallery.length;
  const move = useCallback((d: number) => setI((c) => (c === null ? c : (c + d + n) % n)), [n]);

  useEffect(() => {
    if (i === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setI(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i, move]);

  return (
    <>
      <PageHeader eyebrow="Souvenirs" title="Galerie" />
      {n === 0 ? (
        <p className="mx-auto max-w-md px-6 text-center font-serif text-xl italic text-muted-foreground">
          Les photos seront partagées ici très bientôt, puis après le mariage.
        </p>
      ) : (
        <div className="mx-auto max-w-6xl columns-2 gap-3 px-4 sm:columns-3">
          {gallery.map((p, k) => (
            <button key={p.src} onClick={() => setI(k)} className="mb-3 block w-full overflow-hidden rounded-md">
              <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className="w-full transition-transform duration-500 hover:scale-105" />
            </button>
          ))}
        </div>
      )}
      {i !== null && (
        <div role="dialog" aria-modal="true" aria-label={gallery[i].alt} className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 p-4" onClick={() => setI(null)}>
          <img src={gallery[i].src} alt={gallery[i].alt} className="max-h-[85vh] max-w-full rounded" onClick={(e) => e.stopPropagation()} />
          <button aria-label="Fermer" className="absolute right-4 top-4 text-navy-foreground" onClick={() => setI(null)}><X /></button>
          {n > 1 && (
            <>
              <button aria-label="Précédente" className="absolute left-2 text-navy-foreground" onClick={(e) => { e.stopPropagation(); move(-1); }}><ChevronLeft className="h-8 w-8" /></button>
              <button aria-label="Suivante" className="absolute right-2 text-navy-foreground" onClick={(e) => { e.stopPropagation(); move(1); }}><ChevronRight className="h-8 w-8" /></button>
            </>
          )}
        </div>
      )}
    </>
  );
}
