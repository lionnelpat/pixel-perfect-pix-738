import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Gift, Info, MapPin, Shirt } from "lucide-react";
import { useState } from "react";
import { Countdown } from "@/components/site/Countdown";
import { EventCard, EventLine } from "@/components/site/EventCard";
import { HeroSlider } from "@/components/site/HeroSlider";
import { Lightbox } from "@/components/site/Lightbox";
import { FloralCorner, SectionTitle } from "@/components/site/Ornaments";
import { PhotoCarousel } from "@/components/site/PhotoCarousel";
import { Reveal } from "@/components/site/Reveal";
import { couple, countdownTarget, dressCode, events, gallery, heroSlides, pagePhotos, seo, story, storyPhotos, welcome } from "@/content/wedding";
import { atWidth, responsive } from "@/lib/images";
import { getSiteOrigin } from "@/lib/site-url";

export const Route = createFileRoute("/")({
  loader: () => ({ origin: getSiteOrigin() }),
  head: ({ loaderData }) => {
    const url = `${loaderData?.origin ?? ""}/`;
    const image = `${loaderData?.origin ?? ""}${seo.shareImage}`;
    return {
      meta: [
        { title: seo.title },
        { name: "description", content: seo.description },
        // Seule page indexable (les autres pages restent en noindex, voir __root).
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:title", content: `${couple.display.first} & ${couple.display.second} — 20 & 21 novembre 2026` },
        { property: "og:description", content: seo.description },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: seo.shareImageAlt },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: `Mariage de ${couple.display.first} & ${couple.display.second}`,
            description: seo.description,
            startDate: countdownTarget,
            endDate: "2026-11-21T23:59:00+01:00",
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            image: [image],
            url,
            location: {
              "@type": "Place",
              name: seo.city,
              address: { "@type": "PostalAddress", addressLocality: seo.city, addressCountry: seo.country },
            },
          }),
        },
      ],
    };
  },
  component: Home,
});

const shortcuts = [
  { to: "/lieux", label: "Lieux & itinéraires", icon: MapPin, image: events[1]!.image },
  { to: "/dress-code", label: "Dress code", icon: Shirt, image: pagePhotos.dressCode },
  { to: "/infos", label: "Souhaits des mariés", icon: Info, image: events[3]!.image },
  { to: "/liste", label: "Liste de mariage", icon: Gift, image: pagePhotos.liste },
] as const;

function Home() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* Bienvenue */}
      <section id="bienvenue" className="relative scroll-mt-16 overflow-hidden px-6 py-16 sm:py-24">
        <FloralCorner position="tl" />
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
          <Reveal from="left" className="relative mx-auto w-full max-w-sm">
            <div className="animate-spin-slow absolute -inset-6 rounded-full border border-dashed border-gold/50" aria-hidden />
            <div className="arch-frame relative overflow-hidden">
              <img {...responsive(pagePhotos.welcome.src, "(min-width: 640px) 384px, 90vw")} alt={pagePhotos.welcome.alt} loading="lazy" decoding="async" style={{ objectPosition: pagePhotos.welcome.position }} className="aspect-[3/4] w-full object-cover" />
            </div>
            <p className="font-script absolute -bottom-6 -right-4 rotate-[-6deg] rounded-lg bg-cream px-5 py-2 text-3xl text-terracotta shadow-xl">
              Ensemble pour la vie
            </p>
          </Reveal>
          <Reveal from="right" className="text-center lg:text-left">
            <p className="text-xs uppercase tracking-[0.4em] text-terracotta">Chers convives</p>
            <p className="font-script mt-3 text-5xl text-navy sm:text-6xl">{welcome[0]}</p>
            <div className="mt-6 space-y-4 font-serif text-xl leading-relaxed text-foreground/90">
              {welcome.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="font-script mt-6 text-4xl text-terracotta">
              {couple.display.first} &amp; {couple.display.second}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Compte à rebours */}
      <section
        className="relative overflow-hidden bg-navy bg-cover bg-center lg:bg-fixed px-6 py-16 sm:py-24 text-center text-navy-foreground"
        style={{ backgroundImage: `url(${atWidth(pagePhotos.countdown.src, 1200)})` }}
      >
        <div className="absolute inset-0 bg-navy/80" />
        <Reveal from="zoom" className="relative mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">Le compte à rebours est lancé</p>
          <h2 className="font-script text-gold-shimmer mt-2 text-6xl">Plus que…</h2>
          <div className="mt-10">
            <Countdown target={countdownTarget} tone="dark" />
          </div>
          <p className="mt-8 font-serif text-xl italic text-navy-foreground/85">Vendredi 20 novembre 2026 · 15h00 · Njincha</p>
        </Reveal>
      </section>

      {/* Notre histoire */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-16 sm:py-24 lg:grid-cols-2">
        <Reveal from="left" className="order-2 text-center lg:order-1 lg:text-left">
          <p className="text-xs uppercase tracking-[0.4em] text-terracotta">Il était une fois</p>
          <h2 className="font-script mt-2 text-6xl text-navy">Notre histoire</h2>
          <p className="mt-4 font-serif text-2xl italic text-terracotta">{story.date} · Yaoundé</p>
          <p className="mt-5 font-serif text-xl leading-relaxed text-foreground/90">{story.paragraphs[1]}</p>
          <Link to="/histoire" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-terracotta">
            Lire notre histoire
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
          </Link>
        </Reveal>
        <Reveal from="right" className="relative order-1 mx-auto h-[440px] w-full max-w-md lg:order-2">
          <img
            {...responsive(storyPhotos[0]!.src, "(min-width: 448px) 300px, 66vw")}
            alt={storyPhotos[0]!.alt}
            style={{ objectPosition: storyPhotos[0]!.position }}
            loading="lazy"
            className="absolute left-0 top-0 h-[78%] w-[66%] rounded-lg border-4 border-cream object-cover shadow-2xl transition duration-700 hover:z-10 hover:scale-105"
          />
          <img
            {...responsive(storyPhotos[1]!.src, "(min-width: 448px) 280px, 62vw")}
            alt={storyPhotos[1]!.alt}
            style={{ objectPosition: storyPhotos[1]!.position }}
            loading="lazy"
            className="absolute bottom-0 right-0 h-[58%] w-[62%] rotate-3 rounded-lg border-4 border-cream object-cover shadow-2xl transition duration-700 hover:rotate-0 hover:scale-105"
          />
        </Reveal>
      </section>

      {/* Programme */}
      <section className="bg-secondary/60 px-6 py-16 sm:py-24">
        <SectionTitle eyebrow="Au fil de deux journées" title="Deux journées d’exception" />
        <Reveal className="mx-auto mt-8 max-w-md sm:hidden">
          <ul className="divide-y divide-gold/40 rounded-xl border border-gold/40 bg-card px-5">
            {events.map((e) => (
              <EventLine key={e.id} e={e} />
            ))}
          </ul>
        </Reveal>
        <div className="mx-auto mt-12 hidden max-w-6xl gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {events.map((e, k) => (
            <Reveal key={e.id} delay={k * 120}>
              <EventCard e={e} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 text-center sm:mt-12">
          <Link
            to="/programme"
            className="inline-block rounded-full bg-navy px-8 py-3 text-sm uppercase tracking-widest text-navy-foreground shadow-lg transition hover:-translate-y-0.5 hover:bg-terracotta"
          >
            Voir le programme complet
          </Link>
        </Reveal>
      </section>

      {/* Bandeau défilant */}
      <div className="hidden overflow-hidden border-y border-gold/40 bg-navy py-4 sm:block" aria-hidden>
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap font-serif text-2xl italic text-gold">
          {Array.from({ length: 2 }).flatMap((_, r) =>
            ["Raffinement", "Élégance intemporelle", "Célébration", "Deux familles, un même bonheur", "Ensemble pour la vie"].map((w) => (
              <span key={`${r}-${w}`} className="flex items-center gap-10">
                {w} <span className="text-terracotta">✦</span>
              </span>
            )),
          )}
        </div>
      </div>

      {/* Moments */}
      <section className="py-16 sm:py-24">
        <SectionTitle eyebrow="Souvenirs" title="Nos plus beaux moments" />
        <Reveal className="mt-8">
          <PhotoCarousel photos={gallery} onOpen={setOpen} />
        </Reveal>
        <div className="mt-6 text-center">
          <Link to="/galerie" className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-terracotta">
            Toute la galerie <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
          </Link>
        </div>
      </section>
      <Lightbox photos={gallery} index={open} onChange={setOpen} />

      {/* Dress code */}
      <section className="relative hidden overflow-hidden px-6 py-20 sm:block">
        <FloralCorner position="br" />
        <SectionTitle eyebrow="Élégance intemporelle" title="Nos couleurs" />
        <div className="mt-10 flex justify-center gap-6 sm:gap-12">
          {dressCode.colors.map((c, k) => (
            <Reveal key={c.name} from="zoom" delay={k * 150} className="text-center">
              <div className={`mx-auto h-20 w-20 rounded-full border-2 border-gold shadow-lg ring-4 ring-gold/20 transition duration-500 hover:scale-110 sm:h-28 sm:w-28 ${c.token}`} />
              <p className="mt-3 font-serif text-lg text-navy">{c.name}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 text-center">
          <p className="font-serif text-2xl italic text-terracotta">{dressCode.style}</p>
        </Reveal>
      </section>

      {/* Raccourcis */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {shortcuts.map((s, k) => (
            <Reveal key={s.to} delay={k * 100}>
              <Link to={s.to} className="group relative block aspect-[4/5] overflow-hidden rounded-lg shadow-lg">
                <img {...responsive(s.image.src, "(min-width: 1024px) 25vw, 50vw")} alt="" loading="lazy" decoding="async" className="img-zoom absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent transition-colors duration-500 group-hover:from-terracotta/90" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-navy-foreground">
                  <s.icon className="h-6 w-6 text-gold transition-transform duration-500 group-hover:-translate-y-1" aria-hidden />
                  <p className="mt-2 font-serif text-xl leading-tight sm:text-2xl">{s.label}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
