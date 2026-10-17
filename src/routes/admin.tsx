import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Archive, Check, ChevronLeft, ChevronRight, Eye, RotateCcw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { isLongMessage, MessageDialog } from "@/components/site/MessageDialog";
import { PageHeader } from "@/components/site/Ornaments";
import { adminLogin, checkAdmin } from "@/lib/access.functions";
import { adminListMessages, moderateMessage, type GuestbookEntry, type GuestbookStatus } from "@/lib/guestbook.functions";
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
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">{ok ? <Moderation messages={messages} /> : <AdminLogin />}</div>
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

const STATUS: Record<GuestbookStatus, { label: string; tab: string; badge: string }> = {
  pending: { label: "À valider", tab: "À valider", badge: "bg-terracotta/15 text-terracotta" },
  published: { label: "Publié", tab: "Publiés", badge: "bg-green-700/10 text-green-800" },
  archived: { label: "Archivé", tab: "Archivés", badge: "bg-muted text-muted-foreground" },
};
const TABS: (GuestbookStatus | "all")[] = ["pending", "published", "archived", "all"];
const PAGE_SIZE = 20;

/** Actions possibles selon le statut : on ne supprime jamais, on archive. */
const ACTIONS: Record<GuestbookStatus, { to: GuestbookStatus; label: string; icon: typeof Check; primary?: boolean }[]> = {
  pending: [
    { to: "published", label: "Publier", icon: Check, primary: true },
    { to: "archived", label: "Archiver", icon: Archive },
  ],
  published: [{ to: "archived", label: "Archiver", icon: Archive }],
  archived: [
    { to: "published", label: "Publier", icon: Check, primary: true },
    { to: "pending", label: "Remettre à valider", icon: RotateCcw },
  ],
};

function StatusBadge({ status }: { status: GuestbookStatus }) {
  return <span className={`rounded-full px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wider ${STATUS[status].badge}`}>{STATUS[status].label}</span>;
}

function Moderation({ messages }: { messages: GuestbookEntry[] }) {
  const moderate = useServerFn(moderateMessage);
  const router = useRouter();
  const [tab, setTab] = useState<GuestbookStatus | "all">("pending");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c = { pending: 0, published: 0, archived: 0, all: messages.length };
    for (const m of messages) c[m.status]++;
    return c;
  }, [messages]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return messages.filter((m) => (tab === "all" || m.status === tab) && (!q || m.name.toLowerCase().includes(q) || m.message.toLowerCase().includes(q)));
  }, [messages, tab, query]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages - 1);
  const rows = filtered.slice(current * PAGE_SIZE, (current + 1) * PAGE_SIZE);
  const detail = messages.find((m) => m.id === detailId) ?? null;

  async function setStatus(id: string, status: GuestbookStatus) {
    setBusyId(id);
    try {
      await moderate({ data: { id, status } });
      await router.invalidate();
    } finally {
      setBusyId(null);
    }
  }

  function actions(m: GuestbookEntry) {
    return ACTIONS[m.status].map((a) => (
      <AdminButton key={a.to} onClick={() => setStatus(m.id, a.to)} disabled={busyId === m.id} icon={a.icon} primary={a.primary}>
        {a.label}
      </AdminButton>
    ));
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label="Filtrer par statut" className="flex flex-wrap gap-1 rounded-full border border-gold/50 bg-card p-1">
          {TABS.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => {
                setTab(t);
                setPage(0);
              }}
              className={`rounded-full px-4 py-1.5 text-sm transition ${tab === t ? "bg-navy text-navy-foreground" : "text-navy hover:text-terracotta"}`}
            >
              {t === "all" ? "Tous" : STATUS[t].tab} <span className="tabular-nums opacity-70">({counts[t]})</span>
            </button>
          ))}
        </div>
        <label className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            placeholder="Rechercher un nom, un mot…"
            aria-label="Rechercher"
            className="w-full rounded-full border border-gold/50 bg-background py-2 pl-9 pr-4 text-sm outline-none focus:border-terracotta"
          />
        </label>
      </div>

      {rows.length === 0 ? (
        <p className="mt-12 text-center font-serif text-xl italic text-muted-foreground">Aucun message ici.</p>
      ) : (
        <ul className="mt-6 divide-y divide-gold/30 overflow-hidden rounded-xl border border-gold/40 bg-card">
          {rows.map((m) => (
            <li key={m.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate font-semibold text-navy">{m.name}</p>
                  <StatusBadge status={m.status} />
                  <span className="text-xs text-muted-foreground">{formatDate(m.createdAt)}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-foreground/80">{m.message}</p>
                {isLongMessage(m.message) && (
                  <button onClick={() => setDetailId(m.id)} className="mt-1 text-xs font-semibold text-terracotta hover:text-copper">
                    Lire en entier
                  </button>
                )}
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <AdminButton onClick={() => setDetailId(m.id)} disabled={false} icon={Eye}>
                  Détail
                </AdminButton>
                {actions(m)}
              </div>
            </li>
          ))}
        </ul>
      )}

      {pages > 1 && (
        <nav className="mt-6 flex items-center justify-center gap-4" aria-label="Pagination">
          <button onClick={() => setPage(current - 1)} disabled={current === 0} aria-label="Page précédente" className="rounded-full border border-gold/60 p-2 text-navy disabled:opacity-40">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <p className="text-sm tabular-nums text-muted-foreground">
            Page {current + 1} / {pages} · {filtered.length} messages
          </p>
          <button
            onClick={() => setPage(current + 1)}
            disabled={current >= pages - 1}
            aria-label="Page suivante"
            className="rounded-full border border-gold/60 p-2 text-navy disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      )}

      <MessageDialog message={detail} onClose={() => setDetailId(null)}>
        {detail && (
          <>
            <span className="self-center">
              <StatusBadge status={detail.status} />
            </span>
            {actions(detail)}
          </>
        )}
      </MessageDialog>
    </>
  );
}

function AdminButton({
  children,
  icon: Icon,
  primary = false,
  ...props
}: { children: React.ReactNode; icon: typeof Check; primary?: boolean | undefined; onClick: () => void; disabled: boolean }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition disabled:opacity-50 ${
        primary ? "bg-terracotta text-cream hover:bg-copper" : "border border-gold/60 text-navy hover:border-terracotta hover:text-terracotta"
      }`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {children}
    </button>
  );
}
