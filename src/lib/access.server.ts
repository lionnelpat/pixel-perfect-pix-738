import { getCookie, setCookie, getRequestIP } from "@tanstack/react-start/server";

/** Un accès protégé par mot de passe : invités (site) ou mariés (administration du livre d'or). */
type Gate = { cookie: string; secret: string; label: string; maxAge: number };

export const SITE_GATE: Gate = { cookie: "ts_access", secret: "SITE_PASSWORD", label: "invite-access-v1", maxAge: 60 * 60 * 24 * 60 };
export const ADMIN_GATE: Gate = { cookie: "ts_admin", secret: "ADMIN_PASSWORD", label: "admin-access-v1", maxAge: 60 * 60 * 12 };

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
// Best-effort per-instance throttle (edge isolates don't share memory).
const attempts = new Map<string, { count: number; reset: number }>();

async function tokenFor(password: string, label: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(password), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(label));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

/** À appeler uniquement depuis le handler d'une server fn. */
export async function hasAccess(gate: Gate) {
  const pw = process.env[gate.secret];
  const c = getCookie(gate.cookie);
  if (!pw || !c) return false;
  return safeEqual(c, await tokenFor(pw, gate.label));
}

export async function tryLogin(gate: Gate, password: string) {
  const pw = process.env[gate.secret];
  if (!pw) return { ok: false, error: "L’accès n’est pas encore configuré." };

  const ip = `${gate.cookie}:${getRequestIP({ xForwardedFor: true }) ?? "unknown"}`;
  const now = Date.now();
  const entry = attempts.get(ip);
  if (entry && entry.reset > now && entry.count >= MAX_ATTEMPTS) {
    return { ok: false, error: "Trop de tentatives. Réessayez dans quelques minutes." };
  }

  const [given, expected] = await Promise.all([tokenFor(password, gate.label), tokenFor(pw, gate.label)]);
  if (!safeEqual(given, expected)) {
    const e = entry && entry.reset > now ? entry : { count: 0, reset: now + WINDOW_MS };
    e.count++;
    attempts.set(ip, e);
    await new Promise((r) => setTimeout(r, 600));
    return { ok: false, error: "Mot de passe incorrect." };
  }

  attempts.delete(ip);
  setCookie(gate.cookie, expected, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: gate.maxAge,
  });
  return { ok: true, error: null };
}
