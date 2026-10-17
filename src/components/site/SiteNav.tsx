import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { couple } from "@/content/wedding";

export const navItems = [
  { to: "/", label: "Accueil" },
  { to: "/histoire", label: "Notre histoire" },
  { to: "/programme", label: "Programme" },
  { to: "/lieux", label: "Lieux" },
  { to: "/dress-code", label: "Dress code" },
  { to: "/infos", label: "Infos pratiques" },
  { to: "/liste", label: "Liste de mariage" },
  { to: "/galerie", label: "Galerie" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-gold/30 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="font-script shrink-0 text-3xl text-navy">
          {couple.display.first[0]}&nbsp;&amp;&nbsp;{couple.display.second[0]}
        </Link>
        <nav className="hidden gap-5 lg:flex" aria-label="Navigation principale">
          {navItems.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm text-foreground/80 hover:text-terracotta" activeProps={{ className: "text-terracotta" }} activeOptions={{ exact: true }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <button className="lg:hidden text-navy" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-gold/30 bg-background px-5 py-3 lg:hidden" aria-label="Navigation mobile">
          {navItems.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block py-2.5 font-serif text-lg text-navy" activeProps={{ className: "text-terracotta" }} activeOptions={{ exact: true }}>
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-navy py-10 text-center text-navy-foreground">
      <p className="font-script text-4xl">{couple.display.first} &amp; {couple.display.second}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.3em] text-gold">20 · 21 novembre 2026 · Foumban</p>
      <p className="mt-4 text-sm italic opacity-80">Deux familles, un même bonheur</p>
    </footer>
  );
}
