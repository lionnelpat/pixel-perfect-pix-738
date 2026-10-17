import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { couple, credit, preview } from "@/content/wedding";
import { Petals } from "./Petals";

export const navItems = [
  { to: "/", label: "Accueil" },
  { to: "/histoire", label: "Notre histoire" },
  { to: "/programme", label: "Programme" },
  { to: "/lieux", label: "Lieux" },
  { to: "/dress-code", label: "Dress code" },
  { to: "/infos", label: "Infos pratiques" },
  { to: "/liste", label: "Liste de mariage" },
  { to: "/galerie", label: "Galerie" },
  { to: "/livre-dor", label: "Livre d’or" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [path]);

  // Toutes les pages commencent par une bannière photo : la barre est transparente par-dessus.
  const solid = scrolled || open;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        solid ? "border-b border-gold/30 bg-background/90 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 transition-all duration-500 ${solid ? "py-2.5" : "py-5"}`}>
        <Link to="/" className={`font-script shrink-0 text-3xl transition-colors ${solid ? "text-navy" : "text-navy-foreground"}`}>
          {couple.display.first[0]}
          <span className="text-copper">&nbsp;&amp;&nbsp;</span>
          {couple.display.second[0]}
        </Link>
        <nav className="hidden gap-6 lg:flex" aria-label="Navigation principale">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`group relative py-1 text-sm transition-colors ${solid ? "text-foreground/80" : "text-navy-foreground/90"} hover:text-terracotta`}
              activeProps={{ className: "!text-terracotta" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-terracotta transition-transform duration-300 group-hover:scale-x-100 group-data-[status=active]:scale-x-100" />
            </Link>
          ))}
        </nav>
        <button
          className={`lg:hidden ${solid ? "text-navy" : "text-navy-foreground"}`}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        className={`grid overflow-hidden bg-background transition-all duration-500 lg:hidden ${open ? "grid-rows-[1fr] border-t border-gold/30" : "grid-rows-[0fr]"}`}
        aria-label="Navigation mobile"
        aria-hidden={!open}
      >
        <div className="min-h-0 px-5">
          {navItems.map((n, k) => (
            <Link
              key={n.to}
              to={n.to}
              tabIndex={open ? 0 : -1}
              className={`block py-2.5 font-serif text-xl text-navy transition-all duration-500 ${open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
              style={{ transitionDelay: open ? `${80 + k * 40}ms` : "0ms" }}
              activeProps={{ className: "!text-terracotta" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
          <div className="h-3" />
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-navy pb-24 pt-16 text-center text-navy-foreground">
      <Petals className="opacity-40" />
      <div className="relative">
        <Heart className="animate-heartbeat mx-auto h-6 w-6 fill-terracotta text-terracotta" aria-hidden />
        <p className="font-script text-gold-shimmer mt-3 text-5xl">
          {couple.display.first} &amp; {couple.display.second}
        </p>
        <p className="mt-3 text-xs uppercase tracking-[0.3em] text-gold">20 · 21 novembre 2026 · Foumban</p>
        <div className="mx-auto mt-6 flex max-w-sm items-center gap-4">
          <span className="gold-rule flex-1" />
          <p className="font-serif text-lg italic opacity-90">Deux familles, un même bonheur</p>
          <span className="gold-rule flex-1" />
        </div>
        <nav className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-5 gap-y-2 px-6 text-sm" aria-label="Pied de page">
          {navItems.slice(1).map((n) => (
            <Link key={n.to} to={n.to} className="opacity-70 transition hover:text-gold hover:opacity-100">
              {n.label}
            </Link>
          ))}
        </nav>
        <p className="mt-10 text-xs tracking-wide opacity-60">
          Réalisé par{" "}
          <a href={credit.url} target="_blank" rel="noopener" className="font-semibold underline-offset-4 transition hover:text-gold hover:underline">
            {credit.label}
          </a>
        </p>
      </div>
    </footer>
  );
}

/** Pastille discrète signalant une version de travail (voir `preview` dans wedding.ts). */
export function PreviewBanner() {
  const [hidden, setHidden] = useState(false);
  if (!preview.banner || hidden) return null;
  return (
    <div role="status" className="fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-4">
      <p className="flex items-center gap-3 rounded-full border border-gold/50 bg-navy/90 py-2 pl-4 pr-2 text-xs text-navy-foreground shadow-lg backdrop-blur sm:text-sm">
        <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-terracotta" aria-hidden />
        <span className="sm:hidden">{preview.bannerShort}</span>
        <span className="hidden sm:inline">{preview.banner}</span>
        <button onClick={() => setHidden(true)} aria-label="Masquer le bandeau" className="rounded-full p-1 opacity-70 transition hover:bg-navy-foreground/10 hover:opacity-100">
          <X className="h-3.5 w-3.5" />
        </button>
      </p>
    </div>
  );
}
