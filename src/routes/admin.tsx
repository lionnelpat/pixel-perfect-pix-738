import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Check, EyeOff, Trash2 } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/site/Ornaments";
import { adminLogin, checkAdmin } from "@/lib/access.functions";
import { adminListMessages, moderateMessage, type GuestbookEntry } from "@/lib/guestbook.functions";
import { formatDate } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Administration — Livre d’or" }] }),
  loader: async () => {
    const { ok } = await checkAdmin();
    return { ok, messages: ok ? await adminListMessages() : [] };
  },
  component: Admin,
});

function Admin() {
  const { ok, messages } = Route.useLoaderData();
  return (
    <>
      <PageHeader eyebrow="Espace des mariés" title="Livre d’or" />
      <div className="mx-auto max-w-4xl px-6 py-16">{ok ? <Moderation messages={messages} /> : <AdminLogin />}</div>
    </>
  );
}

function AdminLogin() {
  const doLogin = useServerFn(adminLogin);
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
      if (r.ok) await router.invalidate();
      else setError(r.error);
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="card-elegant mx-auto max-w-sm p-8 text-center">
      <p className="font-serif text-xl text-navy">Mot de passe administrateur</p>
      <input
        type="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        autoComplete="current-password"
        aria-label="Mot de passe administrateur"
        required
        className="mt-4 w-full rounded-md border border-gold/50 bg-background px-4 py-2.5 text-center outline-none focus:border-terracotta"
      />
      {error && (
        <p role="alert" className="mt-3 text-sm text-destructive">
          {error}
        </p>
      )}
      <button disabled={busy} className="mt-5 w-full rounded-full bg-navy py-3 text-sm uppercase tracking-widest text-navy-foreground disabled:opacity-60">
        {busy ? "Vérification…" : "Entrer"}
      </button>
    </form>
  );
}

function Moderation({ messages }: { messages: GuestbookEntry[] }) {
  const moderate = useServerFn(moderateMessage);
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const pending = messages.filter((m) => !m.approved).length;

  async function act(id: string, action: "approve" | "hide" | "delete") {
    if (action === "delete" && !window.confirm("Supprimer définitivement ce message ?")) return;
    setBusyId(id);
    try {
      await moderate({ data: { id, action } });
      await router.invalidate();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <>
      <p className="text-center text-muted-foreground">
        <span className="font-semibold text-terracotta">{pending}</span> à valider · {messages.length - pending} publié{messages.length - pending > 1 ? "s" : ""}
      </p>
      {messages.length === 0 && <p className="mt-10 text-center font-serif text-xl italic text-muted-foreground">Aucun message pour le moment.</p>}
      <ul className="mt-8 space-y-4">
        {messages.map((m) => (
          <li key={m.id} className={`card-elegant p-6 ${m.approved ? "" : "ring-2 ring-terracotta/40"}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-script text-3xl text-navy">{m.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(m.createdAt)} ·{" "}
                <span className={m.approved ? "text-green-700" : "font-semibold text-terracotta"}>{m.approved ? "Publié" : "À valider"}</span>
              </p>
            </div>
            <p className="mt-2 whitespace-pre-line font-serif text-lg">{m.message}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {m.approved ? (
                <AdminButton onClick={() => act(m.id, "hide")} disabled={busyId === m.id} icon={EyeOff}>
                  Masquer
                </AdminButton>
              ) : (
                <AdminButton onClick={() => act(m.id, "approve")} disabled={busyId === m.id} icon={Check} primary>
                  Publier
                </AdminButton>
              )}
              <AdminButton onClick={() => act(m.id, "delete")} disabled={busyId === m.id} icon={Trash2}>
                Supprimer
              </AdminButton>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function AdminButton({
  children,
  icon: Icon,
  primary = false,
  ...props
}: { children: React.ReactNode; icon: typeof Check; primary?: boolean; onClick: () => void; disabled: boolean }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition disabled:opacity-50 ${
        primary ? "bg-terracotta text-cream hover:bg-copper" : "border border-gold/60 text-navy hover:border-terracotta hover:text-terracotta"
      }`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {children}
    </button>
  );
}
