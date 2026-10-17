import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { login } from "@/lib/access.functions";
import { Divider } from "@/components/site/Ornaments";
import { Petals } from "@/components/site/Petals";
import { couple, heroSlides } from "@/content/wedding";

export const Route = createFileRoute("/acces")({
  head: () => ({
    meta: [
      { title: "Accès invités — Thibaut & Sylviane" },
      { name: "description", content: "Espace réservé aux invités du mariage de Thibaut & Sylviane." },
      { property: "og:title", content: "Accès invités — Thibaut & Sylviane" },
      { property: "og:description", content: "Espace réservé aux invités." },
    ],
  }),
  component: Gate,
});

function Gate() {
  const doLogin = useServerFn(login);
  const router = useRouter();
  const [pw, setPw] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const r = await doLogin({ data: { password: pw } });
      if (r.ok) {
        await router.navigate({ to: "/" });
      } else setError(r.error);
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy px-6 py-16">
      <img src={heroSlides[0]!.src} alt="" aria-hidden className="ken-burns absolute inset-0 h-full w-full object-cover" />
      <div className="overlay-navy absolute inset-0" />
      <Petals />
      <form onSubmit={submit} className="arch-frame fade-up relative w-full max-w-sm bg-card/95 px-8 pb-10 pt-20 text-center shadow-2xl backdrop-blur">
        <p className="text-xs uppercase tracking-[0.35em] text-terracotta">Invitation</p>
        <h1 className="font-script mt-3 text-5xl leading-tight text-navy">
          {couple.display.first} <span className="text-copper">&amp;</span> {couple.display.second}
        </h1>
        <Divider className="mt-2" />
        <label htmlFor="pw" className="mt-4 block text-sm text-muted-foreground">
          Saisissez le mot de passe indiqué par les mariés
        </label>
        <input
          id="pw"
          type="password"
          autoComplete="current-password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="mt-3 w-full rounded-md border border-input bg-background px-4 py-2.5 text-center outline-none focus:ring-2 focus:ring-ring"
          required
        />
        {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
        <button disabled={busy} className="mt-5 w-full rounded-full bg-terracotta py-3 text-cream shadow-lg shadow-terracotta/30 transition hover:bg-copper text-sm uppercase tracking-widest disabled:opacity-60">
          {busy ? "Vérification…" : "Entrer"}
        </button>
      </form>
    </div>
  );
}
