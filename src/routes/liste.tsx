import { createFileRoute } from "@tanstack/react-router";
import { Gift } from "lucide-react";
import { PageHeader } from "@/components/site/Ornaments";
import { registry } from "@/content/wedding";

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
      <PageHeader eyebrow="Avec gratitude" title="Liste de mariage" />
      <div className="card-elegant mx-auto max-w-xl px-8 py-10 text-center">
        <Gift className="mx-auto h-8 w-8 text-copper" aria-hidden />
        <p className="mt-4 font-serif text-xl">
          {registry.message ?? "Votre présence est le plus précieux des cadeaux."}
        </p>
        {registry.url ? (
          <a href={registry.url} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-md bg-primary px-6 py-2.5 text-sm uppercase tracking-widest text-primary-foreground">
            Découvrir la liste
          </a>
        ) : (
          <p className="mt-6 text-sm italic text-muted-foreground">Le lien vers la liste sera partagé très bientôt.</p>
        )}
      </div>
    </>
  );
}
