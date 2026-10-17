import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { ADMIN_GATE, hasAccess, SITE_GATE, tryLogin } from "./access.server";

const passwordInput = (d: unknown) => z.object({ password: z.string().min(1).max(200) }).parse(d);

export const checkAccess = createServerFn({ method: "GET" }).handler(async () => ({ ok: await hasAccess(SITE_GATE) }));

export const login = createServerFn({ method: "POST" })
  .validator(passwordInput)
  .handler(({ data }) => tryLogin(SITE_GATE, data.password));

export const checkAdmin = createServerFn({ method: "GET" }).handler(async () => ({ ok: await hasAccess(ADMIN_GATE) }));

export const adminLogin = createServerFn({ method: "POST" })
  .validator(passwordInput)
  .handler(({ data }) => tryLogin(ADMIN_GATE, data.password));
