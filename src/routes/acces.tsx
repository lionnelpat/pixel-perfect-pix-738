import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { login } from "@/lib/access.functions";
import { Divider } from "@/components/site/Ornaments";
import { Petals } from "@/components/site/Petals";
import { countdownTarget, couple, heroSlides, seo } from "@/content/wedding";
import { responsive } from "@/lib/images";
import { getSiteOrigin } from "@/lib/site-url";

export const Route = createFileRoute("/acces")({
  loader: () => ({ origin: getSiteOrigin() }),
  head: ({ loaderData }) => {
    const url = `${loaderData?.origin ?? ""}/acces`;
    const image = `${loaderData?.origin ?? ""}${seo.shareImage}`;
    return {
      meta: [
        { title: seo.title },
        { name: "description", content: seo.description },
        // Seule page publique : indexable (les autres pages restent en noindex, voir __root).
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
  component: Gate,
});

function Gate() {
  const doLogin = useServerFn(login);
  const router = useRouter();
  const [pw, setPw] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const r = await doLogin({ data: { password: pw } });
      if (r.ok) {
        await router.navigate({ to: "/" });
      } else setError(r.error);
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy px-6 py-16">
      <img {...responsive(heroSlides[0]!.src, "100vw")} alt="" aria-hidden fetchPriority="high" style={{ objectPosition: heroSlides[0]!.position }} className="ken-burns absolute inset-0 h-full w-full object-cover" />
      <div className="overlay-navy absolute inset-0" />
      <Petals />
      <form onSubmit={submit} className="arch-frame fade-up relative w-full max-w-sm bg-card/95 px-8 pb-10 pt-20 text-center shadow-2xl backdrop-blur">
        <p className="text-xs uppercase tracking-[0.35em] text-terracotta">Invitation</p>
        <h1 className="font-script mt-3 text-5xl leading-tight text-navy">
          {couple.display.first} <span className="text-copper">&amp;</span> {couple.display.second}
        </h1>
        <p className="mt-2 font-serif text-lg text-navy">20 &amp; 21 novembre 2026</p>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Foumban · Cameroun</p>
        <Divider className="mt-2" />
        <label htmlFor="pw" className="mt-4 block text-sm text-muted-foreground">
          Saisissez le mot de passe indiqué par les mariés
        </label>
        <input
          id="pw"
          type="password"
          autoComplete="current-password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="mt-3 w-full rounded-md border border-input bg-background px-4 py-2.5 text-center outline-none focus:ring-2 focus:ring-ring"
          required
        />
        {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
        <button disabled={busy} className="mt-5 w-full rounded-full bg-terracotta py-3 text-cream shadow-lg shadow-terracotta/30 transition hover:bg-copper text-sm uppercase tracking-widest disabled:opacity-60">
          {busy ? "Vérification…" : "Entrer"}
        </button>
      </form>
    </div>
  );
}
