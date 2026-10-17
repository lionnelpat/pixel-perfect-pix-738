import { createFileRoute } from "@tanstack/react-router";
import { VenueCard } from "@/components/site/EventCard";
import { PageHeader } from "@/components/site/Ornaments";
import { Reveal } from "@/components/site/Reveal";
import { events } from "@/content/wedding";

export const Route = createFileRoute("/lieux")({
  head: () => ({
    meta: [
      { title: "Lieux & itinéraires — Thibaut & Sylviane" },
      { name: "description", content: "Les lieux des cérémonies à Njincha et Foumban, avec itinéraires Google Maps." },
      { property: "og:title", content: "Lieux & itinéraires" },
      { property: "og:description", content: "Où se déroulent les festivités." },
    ],
  }),
  component: Places,
});

function Places() {
  return (
    <>
      <PageHeader eyebrow="Se rendre aux festivités" title="Les lieux" image={events[1]!.image}>
        Touchez « Itinéraire Google Maps » pour être guidé jusqu’à chaque lieu.
      </PageHeader>
      <div className="mx-auto max-w-6xl space-y-10 px-6 py-20">
        {events.map((e, k) => (
          <Reveal key={e.id} from={k % 2 ? "right" : "left"}>
            <VenueCard e={e} reverse={k % 2 === 1} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
