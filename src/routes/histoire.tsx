import { createFileRoute } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Divider, PageHeader } from "@/components/site/Ornaments";
import { Reveal } from "@/components/site/Reveal";
import { pagePhotos, story, storyPhotos } from "@/content/wedding";
import { responsive } from "@/lib/images";

export const Route = createFileRoute("/histoire")({
  head: () => ({
    meta: [
      { title: "Notre histoire — Thibaut & Sylviane" },
      { name: "description", content: "Le récit de la rencontre de Thibaut et Sylviane." },
      { property: "og:title", content: "Notre histoire — Thibaut & Sylviane" },
      { property: "og:description", content: "Tout a commencé le 18 octobre 2022, à Yaoundé." },
    ],
  }),
  component: Story,
});

/** Une photo différente à côté de chaque paragraphe du récit. */
const photos = storyPhotos;

function Story() {
  return (
    <>
      <PageHeader eyebrow="Il était une fois" title="Notre histoire" image={pagePhotos.histoire}>
        <p className="font-serif text-2xl italic">{story.date} · Yaoundé</p>
      </PageHeader>

      <div className="relative mx-auto max-w-5xl px-6 py-20">
        {/* Fil doré central */}
        <div className="absolute bottom-20 left-1/2 top-20 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold to-transparent md:block" aria-hidden />
        <div className="space-y-20">
          {story.paragraphs.map((p, i) => {
            const photo = photos[i % photos.length]!;
            const even = i % 2 === 0;
            return (
              <div key={i} className="relative grid items-center gap-8 md:grid-cols-2 md:gap-16">
                <span className="absolute left-1/2 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-cream shadow md:flex" aria-hidden>
                  <Heart className="h-4 w-4 fill-terracotta text-terracotta" />
                </span>
                <Reveal from={even ? "left" : "right"} className={even ? "" : "md:order-2"}>
                  <div className="group overflow-hidden rounded-lg border-4 border-cream shadow-2xl">
                    <img {...responsive(photo.src, "(min-width: 768px) 50vw, 37vw")} alt={photo.alt} loading="lazy" decoding="async" style={{ objectPosition: photo.position }} className="img-zoom aspect-[4/5] w-full object-cover" />
                  </div>
                </Reveal>
                <Reveal from={even ? "right" : "left"}>
                  <p
                    className={`font-serif text-xl leading-relaxed sm:text-2xl ${
                      i === 0
                        ? "first-letter:font-script first-letter:float-left first-letter:mr-3 first-letter:text-8xl first-letter:leading-none first-letter:text-terracotta"
                        : ""
                    }`}
                  >
                    {p}
                  </p>
                </Reveal>
              </div>
            );
          })}
        </div>

        <Reveal className="mt-20 text-center">
          <Divider />
          <p className="font-script mt-2 text-5xl text-navy">— Thibaut</p>
        </Reveal>

        {story.timeline.length > 0 && (
          <ol className="mx-auto mt-16 max-w-xl space-y-6 border-l border-gold pl-6">
            {story.timeline.map((t, k) => (
              <Reveal as="li" key={t.date} delay={k * 100}>
                <p className="text-xs uppercase tracking-widest text-terracotta">{t.date}</p>
                <p className="font-serif text-lg">{t.label}</p>
              </Reveal>
            ))}
          </ol>
        )}
      </div>
    </>
  );
}
