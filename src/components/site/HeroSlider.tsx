import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { Photo } from "@/content/wedding";
import { couple } from "@/content/wedding";
import { responsive } from "@/lib/images";
import { Petals } from "./Petals";

const DELAY = 6500;

export function HeroSlider({ slides }: { slides: Photo[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [seen, setSeen] = useState(() => new Set([0, 1]));
  const n = slides.length;
  const go = useCallback((d: number) => setI((c) => (c + d + n) % n), [n]);

  useEffect(() => {
    setSeen((s) => (s.has(i) && s.has((i + 1) % n) ? s : new Set([...s, i, (i + 1) % n])));
  }, [i, n]);

  useEffect(() => {
    if (paused || n < 2) return;
    const id = setTimeout(() => go(1), DELAY);
    return () => clearTimeout(id);
  }, [i, paused, n, go]);

  return (
    <section
      className="relative flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden bg-navy text-navy-foreground"
      aria-roledescription="carrousel"
      aria-label="Photos du couple"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, k) => (
        <div
          key={s.src}
          className="absolute inset-0 transition-opacity duration-[1600ms] ease-in-out"
          style={{ opacity: k === i ? 1 : 0 }}
          aria-hidden={k !== i}
        >
          {seen.has(k) && (
            <img
              key={k === i ? `on-${i}` : "off"}
              {...responsive(s.src, "100vw")}
              alt={s.alt}
              style={{ objectPosition: s.position }}
              className={`h-full w-full object-cover ${k === i ? "ken-burns" : ""}`}
              fetchPriority={k === 0 ? "high" : "low"}
              decoding={k === 0 ? "sync" : "async"}
            />
          )}
        </div>
      ))}
      <div className="overlay-navy absolute inset-0" />
      <Petals />

      <div className="relative z-10 px-6 text-center">
        <p className="fade-up text-xs uppercase tracking-[0.5em] text-gold sm:text-sm" style={{ animationDelay: "0.2s" }}>
          Nous nous marions
        </p>
        <h1 className="font-script fade-up mt-4 text-7xl leading-[0.9] drop-shadow-lg sm:text-8xl lg:text-9xl">
          <span className="text-gold-shimmer px-2">{couple.display.first}</span>
          <span className="animate-heartbeat my-1 block text-5xl text-copper sm:text-6xl">&amp;</span>
          <span className="text-gold-shimmer px-2">{couple.display.second}</span>
        </h1>
        <div className="fade-up mx-auto mt-6 flex max-w-md items-center gap-4" style={{ animationDelay: "0.9s" }}>
          <span className="gold-rule flex-1" />
          <p className="font-serif text-xl tracking-wide sm:text-2xl">20 &amp; 21 novembre 2026</p>
          <span className="gold-rule flex-1" />
        </div>
        <p className="fade-up mt-2 text-sm uppercase tracking-[0.3em] text-navy-foreground/80" style={{ animationDelay: "1.1s" }}>
          Njincha · Foumban — Cameroun
        </p>
        <div className="fade-up mt-9 flex flex-wrap justify-center gap-3" style={{ animationDelay: "1.4s" }}>
          <Link
            to="/programme"
            className="rounded-full bg-terracotta px-7 py-3 text-sm uppercase tracking-widest text-cream shadow-lg shadow-terracotta/30 transition hover:-translate-y-0.5 hover:bg-copper"
          >
            Le programme
          </Link>
          <Link
            to="/histoire"
            className="rounded-full border border-gold/70 px-7 py-3 text-sm uppercase tracking-widest text-navy-foreground backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-gold/20"
          >
            Notre histoire
          </Link>
        </div>
      </div>

      {n > 1 && (
        <>
          <button
            aria-label="Photo précédente"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-gold/40 p-2 text-navy-foreground/80 backdrop-blur-sm transition hover:bg-gold/20 sm:block"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            aria-label="Photo suivante"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-gold/40 p-2 text-navy-foreground/80 backdrop-blur-sm transition hover:bg-gold/20 sm:block"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {slides.map((s, k) => (
              <button
                key={s.src}
                aria-label={`Photo ${k + 1}`}
                aria-current={k === i}
                onClick={() => setI(k)}
                className="h-1 w-10 overflow-hidden rounded-full bg-navy-foreground/30"
              >
                <span
                  key={k === i ? `p-${i}-${paused}` : "idle"}
                  className="block h-full bg-gold"
                  style={{
                    width: k < i ? "100%" : "0%",
                    animation: k === i && !paused ? `progress ${DELAY}ms linear forwards` : undefined,
                  }}
                />
              </button>
            ))}
          </div>
        </>
      )}

      <a href="#bienvenue" aria-label="Défiler vers le contenu" className="animate-scroll-cue absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-gold">
        <ChevronDown className="h-7 w-7" />
      </a>
    </section>
  );
}
