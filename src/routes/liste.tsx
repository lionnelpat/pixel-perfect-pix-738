import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Gift, MapPin, Phone, Store, Ticket } from "lucide-react";
import { Divider, PageHeader, PendingNote } from "@/components/site/Ornaments";
import { Reveal } from "@/components/site/Reveal";
import { pagePhotos, practical, registry, storeMapsLink } from "@/content/wedding";

export const Route = createFileRoute("/liste")({
  head: () => ({
    meta: [
      { title: "Liste de mariage — Thibaut & Sylviane" },
      { name: "description", content: "La liste de mariage de Thibaut & Sylviane." },
      { property: "og:title", content: "Liste de mariage" },
      { property: "og:description", content: "Pour celles et ceux qui souhaitent nous gâter." },
    ],
  }),
  component: Registry,
});

function Registry() {
  return (
    <>
      <PageHeader eyebrow="Avec gratitude" title="Liste de mariage" image={pagePhotos.liste} />
      <div className="mx-auto max-w-5xl px-6 py-16">
        <Reveal from="zoom" className="mx-auto mb-14 max-w-2xl text-center">
          <span className="animate-heartbeat mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-terracotta shadow-lg shadow-terracotta/30">
            <Gift className="h-8 w-8 text-cream" aria-hidden />
          </span>
          <p className="mt-6 font-serif text-2xl leading-relaxed">{registry.intro}</p>
          <Divider className="mt-4" />
        </Reveal>

        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-terracotta">Première possibilité</p>
          <h2 className="font-script mt-2 text-5xl text-navy sm:text-6xl">{registry.storesTitle}</h2>
          <p className="mt-3 text-lg text-muted-foreground">{registry.storesText}</p>
        </Reveal>
        <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          {registry.stores.map((s, k) => (
            <Reveal key={s.name} delay={k * 120}>
              <article className="card-elegant flex h-full flex-col items-center p-7 text-center ring-2 ring-gold/60 shadow-xl transition duration-500 hover:-translate-y-1 hover:shadow-2xl">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-terracotta shadow-lg shadow-terracotta/30">
                  <Store className="h-7 w-7 text-cream" aria-hidden />
                </span>
                <h3 className="mt-4 text-3xl font-semibold text-navy">{s.name}</h3>
                {s.city && <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-terracotta">{s.city}</p>}
                {s.address && (
                  <p className="mt-2 flex items-start gap-1.5 text-sm">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden />
                    {s.address}
                  </p>
                )}
                {s.phone && (
                  <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="mt-2 flex items-center gap-1.5 text-sm hover:text-terracotta">
                    <Phone className="h-4 w-4 shrink-0 text-terracotta" aria-hidden />
                    {s.phone}
                  </a>
                )}
                {s.aConfirmer && <PendingNote>Adresse bientôt communiquée</PendingNote>}
                <div className="mt-auto flex flex-wrap justify-center gap-2 pt-5">
                  {storeMapsLink(s) && (
                    <a
                      href={storeMapsLink(s)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-navy-foreground shadow-md transition hover:-translate-y-0.5 hover:bg-terracotta"
                    >
                      <MapPin className="h-3.5 w-3.5" aria-hidden /> Google Maps
                    </a>
                  )}
                  {s.url && (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-navy-foreground shadow-md transition hover:-translate-y-0.5 hover:bg-terracotta"
                    >
                      Voir la liste <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {practical.contacts.length > 0 && (
          <Reveal className="mt-12">
            <section className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-xl border-2 border-terracotta bg-terracotta/10 px-6 py-8 text-center shadow-lg">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta">
                <Phone className="h-6 w-6 text-cream" aria-hidden />
              </span>
              <p className="font-serif text-lg">{registry.contactText}</p>
              <ul className="flex w-full flex-col items-center gap-5">
                {practical.contacts.map((c) => (
                  <li key={c.phone} className="flex flex-col items-center gap-2">
                    <p className="text-2xl font-semibold text-navy">{c.name}</p>
                    <a
                      href={`tel:${c.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-3 text-lg font-semibold tracking-wide text-cream shadow-md transition hover:-translate-y-0.5 hover:bg-navy"
                    >
                      <Phone className="h-5 w-5" aria-hidden /> {c.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        )}

        <Reveal className="mt-16">
          <section className="relative overflow-hidden rounded-xl bg-navy px-8 py-12 text-center text-navy-foreground shadow-2xl sm:px-14">
            <Ticket className="mx-auto h-9 w-9 text-gold" aria-hidden />
            <p className="mt-3 text-xs uppercase tracking-[0.4em] text-gold">Deuxième possibilité</p>
            <h2 className="font-script text-gold-shimmer mt-2 text-5xl">{registry.voucher.title}</h2>
            <p className="mt-4 font-serif text-xl italic text-navy-foreground/90">{registry.voucher.text}</p>
            <ol className="mx-auto mt-8 grid max-w-3xl gap-6 text-left sm:grid-cols-3">
              {registry.voucher.steps.map((step, k) => (
                <li key={step} className="flex items-start gap-3 sm:flex-col sm:items-center sm:text-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold font-serif text-xl text-gold">{k + 1}</span>
                  <span className="text-sm leading-relaxed text-navy-foreground/85">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>
      </div>
    </>
  );
}
