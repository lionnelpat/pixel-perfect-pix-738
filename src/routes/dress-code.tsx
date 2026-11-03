import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/site/Ornaments";
import { Reveal } from "@/components/site/Reveal";
import { dressCode, pagePhotos } from "@/content/wedding";

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
      <PageHeader eyebrow="Élégance intemporelle" title="Dress code" image={pagePhotos.dressCode} />
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="flex justify-center gap-6 sm:gap-14">
          {dressCode.colors.map((c, k) => (
            <Reveal key={c.name} from="zoom" delay={k * 150} className="text-center">
              <div className={`mx-auto h-24 w-24 rounded-full border-2 border-gold shadow-xl ring-8 ring-gold/15 transition duration-500 hover:-translate-y-1 hover:scale-110 sm:h-32 sm:w-32 ${c.token}`} />
              <p className="mt-3 font-serif text-xl text-navy">{c.name}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <p className="font-script text-5xl text-terracotta">{dressCode.style}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {dressCode.rules.map((r, k) => (
            <Reveal key={r.title} delay={k * 150}>
              <div className="card-elegant h-full p-8 text-center transition duration-500 hover:-translate-y-1 hover:shadow-2xl">
                <Sparkles className="mx-auto h-6 w-6 text-copper" aria-hidden />
                <h2 className="mt-3 text-2xl font-semibold text-navy">{r.title}</h2>
                <p className="mt-2 text-muted-foreground">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <p className="rounded-lg border border-gold/40 bg-secondary p-6 text-center font-serif text-lg">{dressCode.fabricNote}</p>
        </Reveal>
      </div>
    </>
  );
}
