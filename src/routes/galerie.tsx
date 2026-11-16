import { createFileRoute } from "@tanstack/react-router";
import { Expand } from "lucide-react";
import { useState } from "react";
import { Lightbox } from "@/components/site/Lightbox";
import { PageHeader } from "@/components/site/Ornaments";
import { PhotoCarousel } from "@/components/site/PhotoCarousel";
import { Reveal } from "@/components/site/Reveal";
import { gallery, pagePhotos } from "@/content/wedding";
import { responsive } from "@/lib/images";

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

  return (
    <>
      <PageHeader eyebrow="Souvenirs" title="Galerie" image={pagePhotos.galerie} />
      {n === 0 ? (
        <p className="mx-auto max-w-md px-6 py-20 text-center font-serif text-xl italic text-muted-foreground">
          Les photos seront partagées ici très bientôt, puis après le mariage.
        </p>
      ) : (
        <>
          <section className="py-14">
            <PhotoCarousel photos={gallery} onOpen={setI} />
          </section>
          <div className="mx-auto max-w-6xl columns-2 gap-4 px-4 sm:columns-3">
            {gallery.map((p, k) => (
              <Reveal key={p.src + k} delay={(k % 3) * 120} className="mb-4 break-inside-avoid">
                <button onClick={() => setI(k)} className="group relative block w-full overflow-hidden rounded-lg shadow-lg">
                  <img {...responsive(p.src, "(min-width: 640px) 33vw, 25vw")} alt={p.alt} loading="lazy" decoding="async" className="img-zoom w-full" />
                  <span className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-navy/80 via-transparent to-transparent p-4 text-navy-foreground opacity-0 transition duration-500 group-hover:opacity-100">
                    <Expand className="h-5 w-5 shrink-0 text-gold" aria-hidden />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </>
      )}
      <Lightbox photos={gallery} index={i} onChange={setI} />
    </>
  );
}
