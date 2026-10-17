import { createFileRoute } from "@tanstack/react-router";
import { Gift } from "lucide-react";
import { Divider, PageHeader } from "@/components/site/Ornaments";
import { Reveal } from "@/components/site/Reveal";
import { registry, storyPhotos } from "@/content/wedding";

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
      <PageHeader eyebrow="Avec gratitude" title="Liste de mariage" image={storyPhotos[1]} />
      <div className="px-6 py-20">
        <Reveal from="zoom" className="card-elegant relative mx-auto max-w-xl overflow-hidden px-8 py-12 text-center">
          <span className="animate-heartbeat mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-terracotta shadow-lg shadow-terracotta/30">
            <Gift className="h-8 w-8 text-cream" aria-hidden />
          </span>
          <p className="mt-6 font-serif text-2xl leading-relaxed">{registry.message ?? "Votre présence est le plus précieux des cadeaux."}</p>
          <Divider className="mt-4" />
          {registry.url ? (
            <a
              href={registry.url}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block rounded-full bg-navy px-8 py-3 text-sm uppercase tracking-widest text-navy-foreground shadow-lg transition hover:-translate-y-0.5 hover:bg-terracotta"
            >
              Découvrir la liste
            </a>
          ) : (
            <p className="mt-4 text-sm italic text-muted-foreground">Le lien vers la liste sera partagé très bientôt.</p>
          )}
        </Reveal>
      </div>
    </>
  );
}
