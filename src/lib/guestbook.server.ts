import { getStore, type Store } from "@netlify/blobs";

export type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  /** Publié sur le site uniquement après validation par les mariés. */
  approved: boolean;
};

const PREFIX = "msg/";

// Hors Netlify (npm run dev), Netlify Blobs n'est pas disponible : stockage en mémoire, perdu au redémarrage.
const memory = new Map<string, GuestbookEntry>();

function blobStore(): Store | null {
  try {
    return getStore({ name: "livre-dor", consistency: "strong" });
  } catch {
    return null;
  }
}

export async function readAll(): Promise<GuestbookEntry[]> {
  const store = blobStore();
  if (!store) return [...memory.values()];
  const { blobs } = await store.list({ prefix: PREFIX });
  const entries = await Promise.all(blobs.map((b) => store.get(b.key, { type: "json" }) as Promise<GuestbookEntry | null>));
  return entries.filter((e): e is GuestbookEntry => e !== null);
}

export async function readOne(id: string): Promise<GuestbookEntry | null> {
  const store = blobStore();
  if (!store) return memory.get(id) ?? null;
  return (await store.get(PREFIX + id, { type: "json" })) as GuestbookEntry | null;
}

export async function write(entry: GuestbookEntry) {
  const store = blobStore();
  if (store) await store.setJSON(PREFIX + entry.id, entry);
  else memory.set(entry.id, entry);
}

export async function remove(id: string) {
  const store = blobStore();
  if (store) await store.delete(PREFIX + id);
  else memory.delete(id);
}

export const newestFirst = (a: GuestbookEntry, b: GuestbookEntry) => b.createdAt.localeCompare(a.createdAt);
