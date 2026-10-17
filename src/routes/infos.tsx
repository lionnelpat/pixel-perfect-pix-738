import { createFileRoute } from "@tanstack/react-router";
import { BedDouble, Car, Baby, Phone } from "lucide-react";
import { PageHeader, PendingNote } from "@/components/site/Ornaments";
import { practical } from "@/content/wedding";

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
    <div className="card-elegant p-6">
      <Icon className="h-6 w-6 text-copper" aria-hidden />
      <h2 className="mt-3 text-xl font-semibold text-navy">{title}</h2>
      <div className="mt-2 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

function Infos() {
  return (
    <>
      <PageHeader eyebrow="Préparer votre venue" title="Infos pratiques" />
      <div className="mx-auto grid max-w-4xl gap-5 px-6 sm:grid-cols-2">
        <Block icon={BedDouble} title="Hébergement">
          {practical.accommodation.map((a) => (
            <div key={a.name}>
              <p className="font-semibold text-foreground">{a.name}</p>
              <p>{a.note}</p>
              {a.aConfirmer && <PendingNote>À confirmer</PendingNote>}
            </div>
          ))}
        </Block>
        <Block icon={Car} title="Stationnement">
          <p>{practical.parking.text}</p>
          {practical.parking.aConfirmer && <PendingNote>À confirmer</PendingNote>}
        </Block>
        <Block icon={Baby} title="Enfants">
          <p>{practical.children}</p>
        </Block>
        <Block icon={Phone} title="Une question ?">
          <p>Contact : <span className="font-semibold text-foreground">{practical.contact.name}</span></p>
          {practical.contact.phone ? (
            <a href={`tel:${practical.contact.phone}`} className="text-terracotta underline">{practical.contact.phone}</a>
          ) : (
            <p className="mt-1">Coordonnées communiquées prochainement.</p>
          )}
        </Block>
      </div>
    </>
  );
}
