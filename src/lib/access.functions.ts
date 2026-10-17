import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie, getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";

const COOKIE = "ts_access";
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
// Best-effort per-instance throttle (edge isolates don't share memory).
const attempts = new Map<string, { count: number; reset: number }>();

async function tokenFor(password: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(password), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode("invite-access-v1"));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export const checkAccess = createServerFn({ method: "GET" }).handler(async () => {
  const pw = process.env["SITE_PASSWORD"];
  const c = getCookie(COOKIE);
  if (!pw || !c) return { ok: false };
  return { ok: safeEqual(c, await tokenFor(pw)) };
});

export const login = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ password: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }) => {
    const pw = process.env["SITE_PASSWORD"];
    if (!pw) return { ok: false, error: "L’accès n’est pas encore configuré." };

    const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
    const now = Date.now();
    const entry = attempts.get(ip);
    if (entry && entry.reset > now && entry.count >= MAX_ATTEMPTS) {
      return { ok: false, error: "Trop de tentatives. Réessayez dans quelques minutes." };
    }

    const [given, expected] = await Promise.all([tokenFor(data.password), tokenFor(pw)]);
    if (!safeEqual(given, expected)) {
      const e = entry && entry.reset > now ? entry : { count: 0, reset: now + WINDOW_MS };
      e.count++;
      attempts.set(ip, e);
      await new Promise((r) => setTimeout(r, 600));
      return { ok: false, error: "Mot de passe incorrect." };
    }

    attempts.delete(ip);
    setCookie(COOKIE, expected, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 60,
    });
    return { ok: true, error: null };
  });
