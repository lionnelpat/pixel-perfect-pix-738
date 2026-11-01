import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Feather, Heart, Send } from "lucide-react";
import { useState } from "react";
import { MessageCarousel } from "@/components/site/MessageCarousel";
import { Divider, PageHeader } from "@/components/site/Ornaments";
import { Reveal } from "@/components/site/Reveal";
import { guestbook, pagePhotos } from "@/content/wedding";
import { listMessages, postMessage } from "@/lib/guestbook.functions";

export const Route = createFileRoute("/livre-dor")({
  head: () => ({
    meta: [
      { title: "Livre d’or — Thibaut & Sylviane" },
      { name: "description", content: "Laissez un message aux mariés." },
      { property: "og:title", content: "Livre d’or" },
      { property: "og:description", content: "Un mot doux pour Thibaut & Sylviane." },
    ],
  }),
  loader: () => listMessages(),
  component: Guestbook,
});

const MAX = 1500;

function Guestbook() {
  const messages = Route.useLoaderData();
  const send = useServerFn(postMessage);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const r = await send({ data: { name, message, website } });
      if (r.ok) {
        setSent(true);
        setName("");
        setMessage("");
      } else setError(r.error);
    } catch {
      setError("Votre message n’a pas pu être envoyé. Vérifiez qu’il fait au moins 3 caractères et réessayez.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHeader eyebrow="Vos mots doux" title="Livre d’or" image={pagePhotos.livreDor} />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-serif text-2xl leading-relaxed">{guestbook.intro}</p>
          <Divider className="mt-4" />
        </Reveal>

        <Reveal from="zoom" className="mx-auto mt-10 max-w-2xl">
          {sent ? (
            <div role="status" className="card-elegant px-8 py-12 text-center">
              <Heart className="animate-heartbeat mx-auto h-10 w-10 fill-terracotta text-terracotta" aria-hidden />
              <p className="mt-4 font-serif text-2xl text-navy">{guestbook.thanks}</p>
              <button onClick={() => setSent(false)} className="mt-6 text-sm font-semibold uppercase tracking-widest text-terracotta hover:text-copper">
                Écrire un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="card-elegant space-y-5 p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <Feather className="h-6 w-6 text-copper" aria-hidden />
                <h2 className="font-script text-4xl text-navy">Laissez-nous un mot</h2>
              </div>
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Votre nom</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={80}
                  autoComplete="name"
                  placeholder="Ex. Tante Marie & Oncle Paul"
                  className="mt-1.5 w-full rounded-md border border-gold/50 bg-background px-4 py-2.5 outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Votre message</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  minLength={3}
                  maxLength={MAX}
                  rows={5}
                  className="mt-1.5 w-full resize-y rounded-md border border-gold/50 bg-background px-4 py-2.5 font-serif text-lg outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                />
                <span className="mt-1 block text-right text-xs text-muted-foreground">
                  {message.length} / {MAX}
                </span>
              </label>
              {/* Champ piège pour les robots, invisible pour les invités. */}
              <input value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden className="hidden" name="website" />
              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs italic text-muted-foreground">{guestbook.moderationNote}</p>
                <button
                  disabled={busy}
                  className="inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-3 text-sm uppercase tracking-widest text-cream shadow-lg shadow-terracotta/30 transition hover:-translate-y-0.5 hover:bg-copper disabled:opacity-60"
                >
                  <Send className="h-4 w-4" aria-hidden />
                  {busy ? "Envoi…" : "Envoyer"}
                </button>
              </div>
            </form>
          )}
        </Reveal>

        <section className="mt-20" aria-label="Messages des invités">
          <Reveal className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-terracotta">{messages.length > 0 ? `${messages.length} message${messages.length > 1 ? "s" : ""}` : "Vos messages"}</p>
            <h2 className="font-script mt-2 text-5xl text-navy">Ils nous ont écrit</h2>
          </Reveal>
          {messages.length === 0 ? (
            <p className="mt-6 text-center font-serif text-xl italic text-muted-foreground">{guestbook.empty}</p>
          ) : (
            <Reveal className="mt-8">
              <MessageCarousel messages={messages} />
            </Reveal>
          )}
        </section>
      </div>
    </>
  );
}
