import { createFileRoute } from "@tanstack/react-router";
import { BedDouble, Car, Baby, Clock, Phone } from "lucide-react";
import { PageHeader, PendingNote } from "@/components/site/Ornaments";
import { Reveal } from "@/components/site/Reveal";
import { events, practical } from "@/content/wedding";

export const Route = createFileRoute("/infos")({
  head: () => ({
    meta: [
      { title: "Souhaits des mariés — Sylviane & Thibaut" },
      { name: "description", content: "Respect du timing, hébergement, stationnement et contact pour les invités." },
      { property: "og:title", content: "Souhaits des mariés" },
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
      <PageHeader eyebrow="Préparer votre venue" title="Souhaits des mariés" image={events[3]!.image} />
      <div className="mx-auto grid max-w-4xl gap-6 px-6 py-20 sm:grid-cols-2">
        <Reveal delay={0} className="sm:col-span-2">
          <div className="card-elegant flex flex-col items-center gap-4 border-2 border-terracotta p-8 text-center sm:flex-row sm:text-left">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-terracotta ring-1 ring-gold/50">
              <Clock className="h-7 w-7 text-cream" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">Très important</p>
              <h2 className="mt-1 text-2xl font-semibold text-navy">{practical.timing.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{practical.timing.text}</p>
            </div>
          </div>
        </Reveal>
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
            <p>Personnes à contacter :</p>
            <ul className="mt-2 space-y-2">
              {practical.contacts.map((c) => (
                <li key={c.phone}>
                  <span className="font-semibold text-foreground">{c.name}</span>
                  <br />
                  <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="text-terracotta underline">{c.phone}</a>
                </li>
              ))}
            </ul>
          </Block>
        </Reveal>
      </div>
    </>
  );
}
