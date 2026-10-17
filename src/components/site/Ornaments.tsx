import divider from "@/assets/gold-divider.png";
import floral from "@/assets/floral-corner.png";
import type { ReactNode } from "react";

export function Divider({ className = "" }: { className?: string }) {
  return <img src={divider} alt="" aria-hidden width={1536} height={512} className={`mx-auto h-10 w-64 object-cover ${className}`} />;
}

export function FloralCorner({ position }: { position: "tl" | "br" }) {
  const pos = position === "tl" ? "-left-10 -top-10" : "-bottom-10 -right-10 rotate-180";
  return (
    <img
      src={floral}
      alt=""
      aria-hidden
      width={1024}
      height={1024}
      className={`pointer-events-none absolute w-44 select-none sm:w-64 lg:w-80 ${pos}`}
    />
  );
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <header className="fade-up mx-auto max-w-2xl px-6 pb-8 pt-14 text-center sm:pt-20">
      <p className="text-xs uppercase tracking-[0.35em] text-terracotta">{eyebrow}</p>
      <h1 className="font-script mt-3 text-5xl text-navy sm:text-6xl">{title}</h1>
      <Divider className="mt-4" />
      {children && <div className="mt-4 text-muted-foreground">{children}</div>}
    </header>
  );
}

export function PendingNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 inline-block rounded-full border border-copper/50 px-3 py-0.5 text-xs italic text-terracotta">
      {children}
    </p>
  );
}
