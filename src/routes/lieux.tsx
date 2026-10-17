import { createFileRoute } from "@tanstack/react-router";
import { EventCard } from "@/components/site/EventCard";
import { PageHeader } from "@/components/site/Ornaments";
import { events } from "@/content/wedding";

export const Route = createFileRoute("/lieux")({
  head: () => ({
    meta: [
      { title: "Lieux & itinéraires — Thibaut & Sylviane" },
      { name: "description", content: "Les lieux des cérémonies à Njincha et Foumban." },
      { property: "og:title", content: "Lieux & itinéraires" },
      { property: "og:description", content: "Où se déroulent les festivités." },
    ],
  }),
  component: Places,
});

function Places() {
  return (
    <>
      <PageHeader eyebrow="Se rendre aux festivités" title="Les lieux">
        Les liens d’itinéraire seront ajoutés dès que les adresses exactes seront confirmées.
      </PageHeader>
      <div className="mx-auto grid max-w-4xl gap-5 px-6 sm:grid-cols-2">
        {events.map((e) => <EventCard key={e.id} e={e} showMap />)}
      </div>
    </>
  );
}
