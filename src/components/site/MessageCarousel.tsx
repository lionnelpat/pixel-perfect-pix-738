import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { PublicMessage } from "@/lib/guestbook.functions";
import { formatDate } from "@/lib/utils";
import { isLongMessage, MessageDialog } from "./MessageDialog";

/** Messages du livre d'or qui défilent ; les messages longs s'ouvrent en entier. */
export function MessageCarousel({ messages }: { messages: PublicMessage[] }) {
  const [ref, api] = useEmblaCarousel({ loop: messages.length > 3, align: "start" });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState(messages.length);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState<PublicMessage | null>(null);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    // Sans boucle, les dernières positions sont regroupées : on compte des « pages ».
    const onInit = () => setSnaps(api.scrollSnapList().length);
    onSelect();
    onInit();
    api.on("select", onSelect).on("reInit", onInit);
    return () => {
      api.off("select", onSelect).off("reInit", onInit);
    };
  }, [api]);

  useEffect(() => {
    if (!api || paused || open) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => (api.canScrollNext() ? api.scrollNext() : api.scrollTo(0)), 6000);
    return () => clearInterval(id);
  }, [api, paused, open]);

  const prev = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      aria-roledescription="carrousel"
      aria-label="Messages des invités"
    >
      <div ref={ref} className="overflow-hidden py-4">
        <div className="flex">
          {messages.map((m) => {
            const long = isLongMessage(m.message);
            return (
              <div key={m.id} className="min-w-0 shrink-0 grow-0 basis-full px-3 sm:basis-1/2 lg:basis-1/3">
                <figure className="card-elegant relative flex h-80 flex-col p-7">
                  <span className="font-script absolute -top-2 left-5 text-6xl leading-none text-gold/60" aria-hidden>
                    “
                  </span>
                  <blockquote className="line-clamp-6 whitespace-pre-line font-serif text-lg leading-relaxed text-foreground/90">{m.message}</blockquote>
                  {long && (
                    <button
                      onClick={() => setOpen(m)}
                      className="mt-2 self-start text-xs font-semibold uppercase tracking-widest text-terracotta transition hover:text-copper"
                    >
                      Lire la suite
                    </button>
                  )}
                  <figcaption className="mt-auto border-t border-gold/30 pt-3">
                    <p className="font-script truncate text-3xl text-terracotta">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(m.createdAt)}</p>
                  </figcaption>
                </figure>
              </div>
            );
          })}
        </div>
      </div>

      {snaps > 1 && (
        <div className="mt-4 flex items-center justify-center gap-5">
          <button aria-label="Message précédent" onClick={prev} className="rounded-full border border-gold/60 p-2.5 text-navy transition hover:scale-110 hover:border-terracotta hover:text-terracotta">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <p className="min-w-16 text-center text-sm tabular-nums text-muted-foreground" aria-live="polite">
            {selected + 1} / {snaps}
          </p>
          <button aria-label="Message suivant" onClick={next} className="rounded-full border border-gold/60 p-2.5 text-navy transition hover:scale-110 hover:border-terracotta hover:text-terracotta">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      <MessageDialog message={open} onClose={() => setOpen(null)} />
    </div>
  );
}
