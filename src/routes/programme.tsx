import { createFileRoute } from "@tanstack/react-router";
import { EventCard } from "@/components/site/EventCard";
import { PageHeader } from "@/components/site/Ornaments";
import { Reveal } from "@/components/site/Reveal";
import { events, pagePhotos } from "@/content/wedding";

export const Route = createFileRoute("/programme")({
  head: () => ({
    meta: [
      { title: "Programme — Thibaut & Sylviane" },
      { name: "description", content: "Le déroulé des deux journées de mariage, 20 et 21 novembre 2026." },
      { property: "og:title", content: "Programme du mariage" },
      { property: "og:description", content: "Dot, union civile, bénédiction nuptiale et soirée." },
    ],
  }),
  component: Program,
});

function Program() {
  const days = [...new Set(events.map((e) => e.day))];
  return (
    <>
      <PageHeader eyebrow="Au fil de deux journées" title="Le programme" image={pagePhotos.programme}>
        Le programme détaillé sera complété prochainement.
      </PageHeader>
      <div className="mx-auto max-w-5xl space-y-20 px-6 py-20">
        {days.map((d, di) => (
          <section key={d}>
            <Reveal from="zoom" className="text-center">
              <p className="font-script text-4xl text-terracotta">Jour {di + 1}</p>
              <h2 className="mx-auto mt-2 w-fit rounded-full bg-navy px-7 py-2 font-sans text-sm uppercase tracking-[0.25em] text-navy-foreground shadow-lg">
                {d}
              </h2>
            </Reveal>
            <div className={`mx-auto mt-10 grid gap-6 ${events.filter((e) => e.day === d).length > 1 ? "lg:grid-cols-3 sm:grid-cols-2" : "max-w-md"}`}>
              {events
                .filter((e) => e.day === d)
                .map((e, k) => (
                  <Reveal key={e.id} delay={k * 150}>
                    <EventCard e={e} showMap />
                  </Reveal>
                ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
