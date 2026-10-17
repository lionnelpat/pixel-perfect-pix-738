import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";
import { ADMIN_GATE, hasAccess, SITE_GATE } from "./access.server";
import { newestFirst, readAll, readOne, remove, write, type GuestbookEntry } from "./guestbook.server";

export type { GuestbookEntry };

/** Messages validés, visibles par les invités. */
export const listMessages = createServerFn({ method: "GET" }).handler(async () => {
  if (!(await hasAccess(SITE_GATE))) return [];
  return (await readAll())
    .filter((e) => e.approved)
    .sort(newestFirst)
    .map(({ id, name, message, createdAt }) => ({ id, name, message, createdAt }));
});

const MAX_POSTS = 3;
const POST_WINDOW_MS = 10 * 60 * 1000;
// Best-effort per-instance throttle, comme pour la connexion.
const posts = new Map<string, { count: number; reset: number }>();

export const postMessage = createServerFn({ method: "POST" })
  .validator((d: unknown) =>
    z
      .object({
        name: z.string().trim().min(1).max(80),
        message: z.string().trim().min(3).max(1500),
        // Champ piège invisible : rempli uniquement par les robots.
        website: z.string().max(200).optional(),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    if (!(await hasAccess(SITE_GATE))) return { ok: false, error: "Votre session a expiré. Rechargez la page." };
    if (data.website) return { ok: true, error: null };

    const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
    const now = Date.now();
    const entry = posts.get(ip);
    if (entry && entry.reset > now && entry.count >= MAX_POSTS) {
      return { ok: false, error: "Vous avez déjà laissé plusieurs messages. Réessayez un peu plus tard." };
    }
    const e = entry && entry.reset > now ? entry : { count: 0, reset: now + POST_WINDOW_MS };
    e.count++;
    posts.set(ip, e);

    await write({
      id: `${now.toString(36)}-${crypto.randomUUID().slice(0, 8)}`,
      name: data.name,
      message: data.message,
      createdAt: new Date(now).toISOString(),
      approved: false,
    });
    return { ok: true, error: null };
  });

/** Tous les messages, à valider en premier. */
export const adminListMessages = createServerFn({ method: "GET" }).handler(async () => {
  if (!(await hasAccess(ADMIN_GATE))) throw new Error("Accès refusé");
  return (await readAll()).sort((a, b) => Number(a.approved) - Number(b.approved) || newestFirst(a, b));
});

export const moderateMessage = createServerFn({ method: "POST" })
  .validator((d: unknown) => z.object({ id: z.string().min(1).max(64), action: z.enum(["approve", "hide", "delete"]) }).parse(d))
  .handler(async ({ data }) => {
    if (!(await hasAccess(ADMIN_GATE))) throw new Error("Accès refusé");
    if (data.action === "delete") return remove(data.id);
    const entry = await readOne(data.id);
    if (entry) await write({ ...entry, approved: data.action === "approve" });
  });
