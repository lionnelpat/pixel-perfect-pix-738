import { createFileRoute, Link } from "@tanstack/react-router";
import { Countdown } from "@/components/site/Countdown";
import { Divider, FloralCorner } from "@/components/site/Ornaments";
import { couple, countdownTarget, events, welcome } from "@/content/wedding";
import { navItems } from "@/components/site/SiteNav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thibaut & Sylviane — Mariage 20 & 21 novembre 2026" },
      { name: "description", content: "Bienvenue sur le site du mariage de Thibaut & Sylviane, à Njincha et Foumban." },
      { property: "og:title", content: "Thibaut & Sylviane — Mariage" },
      { property: "og:description", content: "Deux journées d’exception, les 20 et 21 novembre 2026." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative px-6 pb-16 pt-12 sm:pt-20">
        <FloralCorner position="tl" />
        <FloralCorner position="br" />
        <div className="arch-frame fade-up relative mx-auto max-w-xl bg-card/95 px-6 pb-12 pt-24 text-center sm:px-12">
          <p className="text-xs uppercase tracking-[0.4em] text-terracotta">Nous nous marions</p>
          <h1 className="font-script mt-4 text-6xl leading-none text-navy sm:text-7xl">
            {couple.display.first}
            <span className="my-1 block text-5xl text-copper">&amp;</span>
            {couple.display.second}
          </h1>
          <Divider className="mt-6" />
          <p className="mt-2 font-serif text-xl text-navy">20 &amp; 21 novembre 2026</p>
          <p className="text-sm text-muted-foreground">Njincha · Foumban — Cameroun</p>
          {/* Emplacement réservé à la future photo du couple */}
          <div className="mt-10">
            <Countdown target={countdownTarget} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-12 text-center">
        <p className="font-script text-4xl text-terracotta">{welcome[0]}</p>
        <div className="mt-6 space-y-4 font-serif text-xl leading-relaxed text-foreground/90">
          {welcome.slice(1).map((p) => <p key={p}>{p}</p>)}
        </div>
        <p className="font-script mt-6 text-3xl text-navy">{couple.display.first} &amp; {couple.display.second}</p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="text-center text-3xl font-semibold text-navy">Deux journées d’exception</h2>
        <Divider className="mt-2" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((e) => (
            <div key={e.id} className="card-elegant p-5 text-center">
              <p className="text-xs uppercase tracking-widest text-terracotta">{e.day.split(" ").slice(0, 2).join(" ")}</p>
              <p className="mt-2 font-serif text-xl font-semibold text-navy">{e.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{e.time} · {e.place}</p>
              {e.restricted && <p className="mt-2 text-xs italic text-muted-foreground">Sur invitation</p>}
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/programme" className="inline-block rounded-md bg-primary px-6 py-2.5 text-sm uppercase tracking-widest text-primary-foreground">
            Voir le programme
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {navItems.slice(1).map((n) => (
            <Link key={n.to} to={n.to} className="rounded-md border border-gold/50 px-3 py-4 text-center font-serif text-lg text-navy transition-colors hover:border-terracotta hover:text-terracotta">
              {n.label}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
