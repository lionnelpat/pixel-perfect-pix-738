import { createFileRoute } from "@tanstack/react-router";

/** Seule la page d'accueil est explorable par les moteurs de recherche. */
export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const body = ["User-agent: *", "Allow: /$", "Disallow: /", "", `Sitemap: ${origin}/sitemap.xml`, ""].join("\n");
        return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
      },
    },
  },
});
