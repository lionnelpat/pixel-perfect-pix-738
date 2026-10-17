import { createFileRoute } from "@tanstack/react-router";

/** Seule la vitrine (/acces) est explorable ; le reste est réservé aux invités. */
export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const body = ["User-agent: *", "Allow: /$", "Allow: /acces", "Disallow: /", "", `Sitemap: ${origin}/sitemap.xml`, ""].join("\n");
        return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
      },
    },
  },
});
