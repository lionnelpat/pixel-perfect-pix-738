import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Ornaments";
import { story } from "@/content/wedding";

export const Route = createFileRoute("/histoire")({
  head: () => ({
    meta: [
      { title: "Notre histoire — Thibaut & Sylviane" },
      { name: "description", content: "Le récit de la rencontre de Thibaut et Sylviane." },
      { property: "og:title", content: "Notre histoire — Thibaut & Sylviane" },
      { property: "og:description", content: "Tout a commencé le 18 septembre 2022, à Yaoundé." },
    ],
  }),
  component: Story,
});

function Story() {
  return (
    <>
      <PageHeader eyebrow="Il était une fois" title="Notre histoire" />
      <article className="mx-auto max-w-2xl px-6">
        <p className="text-center font-serif text-2xl italic text-terracotta">{story.date}</p>
        <div className="mt-8 space-y-6 font-serif text-xl leading-relaxed first-letter:float-left">
          {story.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "first-letter:font-script first-letter:float-left first-letter:mr-2 first-letter:text-7xl first-letter:leading-none first-letter:text-navy" : ""}>
              {p}
            </p>
          ))}
        </div>
        <p className="mt-8 text-right font-script text-3xl text-navy">— Thibaut</p>
        {story.timeline.length > 0 && (
          <ol className="mt-14 space-y-6 border-l border-gold pl-6">
            {story.timeline.map((t) => (
              <li key={t.date}>
                <p className="text-xs uppercase tracking-widest text-terracotta">{t.date}</p>
                <p className="font-serif text-lg">{t.label}</p>
              </li>
            ))}
          </ol>
        )}
      </article>
    </>
  );
}
