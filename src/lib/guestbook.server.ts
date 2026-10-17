import { getStore, type Store } from "@netlify/blobs";

/** Aucun message n'est jamais supprimé : on l'archive pour le retirer du site. */
export type GuestbookStatus = "pending" | "published" | "archived";

export type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  status: GuestbookStatus;
};

export type PublicMessage = Pick<GuestbookEntry, "id" | "name" | "message" | "createdAt">;

/** Un blob par message (pas de conflit d'écriture entre invités)… */
const PREFIX = "msg/";
/** …et un instantané des messages publiés, relu en une seule requête par la page des invités. */
const PUBLISHED_KEY = "index/published";

// Hors Netlify (npm run dev), Netlify Blobs n'est pas disponible : stockage en mémoire, perdu au redémarrage.
const memory = new Map<string, GuestbookEntry>();
let memoryPublished: PublicMessage[] = [];

function blobStore(): Store | null {
  try {
    return getStore({ name: "livre-dor", consistency: "strong" });
  } catch {
    return null;
  }
}

/** Messages enregistrés avant l'ajout du statut (`approved: boolean`). */
function normalize(raw: GuestbookEntry & { approved?: boolean }): GuestbookEntry {
  const { approved, ...entry } = raw;
  return { ...entry, status: entry.status ?? (approved ? "published" : "pending") };
}

export const newestFirst = (a: { createdAt: string }, b: { createdAt: string }) => b.createdAt.localeCompare(a.createdAt);

export async function readAll(): Promise<GuestbookEntry[]> {
  const store = blobStore();
  if (!store) return [...memory.values()];
  const { blobs } = await store.list({ prefix: PREFIX });
  const entries: GuestbookEntry[] = [];
  // Par lots, pour ne pas ouvrir des centaines de requêtes à la fois.
  for (let i = 0; i < blobs.length; i += 50) {
    const batch = await Promise.all(blobs.slice(i, i + 50).map((b) => store.get(b.key, { type: "json" })));
    for (const raw of batch) if (raw) entries.push(normalize(raw));
  }
  return entries;
}

export async function readOne(id: string): Promise<GuestbookEntry | null> {
  const store = blobStore();
  const raw = store ? await store.get(PREFIX + id, { type: "json" }) : memory.get(id);
  return raw ? normalize(raw) : null;
}

export async function write(entry: GuestbookEntry) {
  const store = blobStore();
  if (store) await store.setJSON(PREFIX + entry.id, entry);
  else memory.set(entry.id, entry);
}

export async function readPublished(): Promise<PublicMessage[]> {
  const store = blobStore();
  if (!store) return memoryPublished;
  const published = (await store.get(PUBLISHED_KEY, { type: "json" })) as PublicMessage[] | null;
  // Instantané absent (messages publiés avant son introduction) : on le reconstruit une fois.
  return published ?? rebuildPublished();
}

/** À appeler après chaque modération. */
export async function rebuildPublished() {
  const published = (await readAll())
    .filter((e) => e.status === "published")
    .sort(newestFirst)
    .map(({ id, name, message, createdAt }) => ({ id, name, message, createdAt }));
  const store = blobStore();
  if (store) await store.setJSON(PUBLISHED_KEY, published);
  else memoryPublished = published;
  return published;
}
