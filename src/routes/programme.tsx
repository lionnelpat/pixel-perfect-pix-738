import { createFileRoute } from "@tanstack/react-router";
import { EventCard } from "@/components/site/EventCard";
import { PageHeader } from "@/components/site/Ornaments";
import { events } from "@/content/wedding";

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
      <PageHeader eyebrow="Au fil de deux journées" title="Le programme">
        Le programme détaillé sera complété prochainement.
      </PageHeader>
      <div className="mx-auto max-w-3xl space-y-12 px-6">
        {days.map((d) => (
          <section key={d}>
            <h2 className="mx-auto w-fit rounded-full bg-navy px-6 py-1.5 text-center text-sm font-sans uppercase tracking-[0.2em] text-navy-foreground">
              {d}
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {events.filter((e) => e.day === d).map((e) => <EventCard key={e.id} e={e} />)}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
