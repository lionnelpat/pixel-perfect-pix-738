import { createFileRoute } from "@tanstack/react-router";
import { BedDouble, Car, Baby, Phone } from "lucide-react";
import { PageHeader, PendingNote } from "@/components/site/Ornaments";
import { Reveal } from "@/components/site/Reveal";
import { events, practical } from "@/content/wedding";

export const Route = createFileRoute("/infos")({
  head: () => ({
    meta: [
      { title: "Infos pratiques — Thibaut & Sylviane" },
      { name: "description", content: "Hébergement, stationnement et contact pour les invités." },
      { property: "og:title", content: "Informations pratiques" },
      { property: "og:description", content: "Tout pour préparer votre venue." },
    ],
  }),
  component: Infos,
});

function Block({ icon: Icon, title, children }: { icon: typeof Car; title: string; children: React.ReactNode }) {
  return (
    <div className="card-elegant group h-full p-7 transition duration-500 hover:-translate-y-1 hover:shadow-2xl">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/10 ring-1 ring-gold/50 transition duration-500 group-hover:bg-terracotta">
        <Icon className="h-6 w-6 text-terracotta transition-colors duration-500 group-hover:text-cream" aria-hidden />
      </span>
      <h2 className="mt-3 text-xl font-semibold text-navy">{title}</h2>
      <div className="mt-2 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

function Infos() {
  return (
    <>
      <PageHeader eyebrow="Préparer votre venue" title="Infos pratiques" image={events[3]!.image} />
      <div className="mx-auto grid max-w-4xl gap-6 px-6 py-20 sm:grid-cols-2">
        <Reveal delay={0}>
          <Block icon={BedDouble} title="Hébergement">
            {practical.accommodation.map((a) => (
              <div key={a.name}>
                <p className="font-semibold text-foreground">{a.name}</p>
                <p>{a.note}</p>
                {a.aConfirmer && <PendingNote>À confirmer</PendingNote>}
              </div>
            ))}
          </Block>
        </Reveal>
        <Reveal delay={100}>
          <Block icon={Car} title="Stationnement">
            <p>{practical.parking.text}</p>
            {practical.parking.aConfirmer && <PendingNote>À confirmer</PendingNote>}
          </Block>
        </Reveal>
        <Reveal delay={200}>
          <Block icon={Baby} title="Enfants">
            <p>{practical.children}</p>
          </Block>
        </Reveal>
        <Reveal delay={300}>
          <Block icon={Phone} title="Une question ?">
            <p>Contact : <span className="font-semibold text-foreground">{practical.contact.name}</span></p>
            {practical.contact.phone ? (
              <a href={`tel:${practical.contact.phone}`} className="text-terracotta underline">{practical.contact.phone}</a>
            ) : (
              <p className="mt-1">Coordonnées communiquées prochainement.</p>
            )}
          </Block>
        </Reveal>
      </div>
    </>
  );
}
