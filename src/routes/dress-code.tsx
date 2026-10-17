import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PendingNote } from "@/components/site/Ornaments";
import { dressCode } from "@/content/wedding";

export const Route = createFileRoute("/dress-code")({
  head: () => ({
    meta: [
      { title: "Dress code — Thibaut & Sylviane" },
      { name: "description", content: "Couleurs et tenues pour le mariage de Thibaut & Sylviane." },
      { property: "og:title", content: "Dress code" },
      { property: "og:description", content: "Bleu nuit, terracotta et crème." },
    ],
  }),
  component: Dress,
});

function Dress() {
  return (
    <>
      <PageHeader eyebrow="Élégance intemporelle" title="Dress code">
        <PendingNote>Consignes en cours de confirmation par les mariés</PendingNote>
      </PageHeader>
      <div className="mx-auto max-w-3xl px-6">
        <div className="flex justify-center gap-8">
          {dressCode.colors.map((c) => (
            <div key={c.name} className="text-center">
              <div className={`mx-auto h-20 w-20 rounded-full border border-gold shadow-md ${c.token}`} />
              <p className="mt-2 font-serif text-lg text-navy">{c.name}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center font-serif text-2xl italic text-terracotta">{dressCode.style}</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {dressCode.rules.map((r) => (
            <div key={r.title} className="card-elegant p-6 text-center">
              <h2 className="text-xl font-semibold text-navy">{r.title}</h2>
              <p className="mt-2 text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 rounded-md bg-secondary p-5 text-center text-sm">{dressCode.fabricNote}</p>
      </div>
    </>
  );
}
