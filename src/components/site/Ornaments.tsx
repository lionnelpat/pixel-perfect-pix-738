import divider from "@/assets/gold-divider.webp";
import floral from "@/assets/floral-corner.webp";
import type { ReactNode } from "react";
import { heroSlides, type Photo } from "@/content/wedding";
import { Reveal } from "./Reveal";
import { responsive } from "@/lib/images";

export function Divider({ className = "" }: { className?: string }) {
  return <img src={divider} alt="" aria-hidden width={512} height={171} className={`mx-auto h-10 w-64 object-cover ${className}`} />;
}

export function FloralCorner({ position }: { position: "tl" | "br" }) {
  const pos = position === "tl" ? "-left-10 -top-10" : "-bottom-10 -right-10 rotate-180";
  return (
    <img
      src={floral}
      alt=""
      aria-hidden
      width={640}
      height={640}
      loading="lazy"
      decoding="async"
      className={`pointer-events-none absolute w-44 select-none sm:w-64 lg:w-80 ${pos}`}
    />
  );
}

/** Bannière photo en tête de chaque page. */
export function PageHeader({
  eyebrow,
  title,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  image?: Photo | undefined;
  children?: ReactNode;
}) {
  const bg = image ?? heroSlides[0]!;
  return (
    <header className="relative flex min-h-[52svh] items-end justify-center overflow-hidden bg-navy pb-14 pt-32 text-center text-navy-foreground">
      <img {...responsive(bg.src, "(min-width: 768px) 100vw, 60vw")} alt="" aria-hidden fetchPriority="high" style={{ objectPosition: bg.position }} className="ken-burns absolute inset-0 h-full w-full object-cover" />
      <div className="overlay-navy absolute inset-0" />
      <div className="relative mx-auto max-w-2xl px-6">
        <p className="fade-up text-xs uppercase tracking-[0.4em] text-gold">{eyebrow}</p>
        <h1 className="font-script fade-up text-gold-shimmer mt-3 text-6xl drop-shadow sm:text-7xl">
          {title}
        </h1>
        <div className="fade-up mx-auto mt-4 h-px w-40 bg-[image:var(--gradient-gold)]" style={{ animationDelay: "0.5s" }} />
        {children && (
          <div className="fade-up mt-4 text-navy-foreground/85" style={{ animationDelay: "0.7s" }}>
            {children}
          </div>
        )}
      </div>
    </header>
  );
}

/** Titre de section avec sur-titre et ornement doré. */
export function SectionTitle({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <Reveal className="text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-terracotta">{eyebrow}</p>
      <h2 className={`font-script mt-2 text-5xl sm:text-6xl ${light ? "text-navy-foreground" : "text-navy"}`}>{title}</h2>
      <Divider className="mt-1" />
    </Reveal>
  );
}

export function PendingNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 inline-block rounded-full border border-copper/50 px-3 py-0.5 text-xs italic text-terracotta">
      {children}
    </p>
  );
}
