import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { browserslistToTargets } from "lightningcss";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const OLD_PHONES = ["chrome 80", "safari 13", "ios_saf 13", "samsung 12", "firefox 78"];

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Point d'entrée serveur : src/server.ts (page d'erreur SSR personnalisée).
      server: { entry: "server" },
      // Pages pré-générées en HTML au build et servies directement par le CDN (aucune fonction serveur
      // à attendre : essentiel en connexion mobile). Le livre d'or et l'administration restent dynamiques.
      prerender: {
        enabled: true,
        crawlLinks: true,
        // /programme.html plutôt que /programme/index.html : servi sans redirection vers « /programme/ ».
        autoSubfolderIndex: false,
        failOnError: true,
        filter: ({ path }) => !["/livre-dor", "/admin", "/acces"].some((p) => path.startsWith(p)),
      },
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
    }),
    // Build pour Netlify (fonctions serveur nécessaires au mot de passe d'accès).
    nitro({ preset: "netlify" }),
    viteReact(),
  ],
  // Téléphones dont le navigateur n'est plus mis à jour : couleurs et syntaxe converties pour eux.
  css: { transformer: "lightningcss", lightningcss: { targets: browserslistToTargets(OLD_PHONES) } },
  build: { target: ["chrome80", "safari13"], cssTarget: ["chrome80", "safari13"] },
  // Pré-génération des pages : le serveur temporaire du build écoute en IPv4. Dans un conteneur Docker,
  // « localhost » peut désigner l'IPv6 côté serveur et l'IPv4 côté requêtes (connexion refusée).
  preview: { host: "127.0.0.1" },
  resolve: {
    alias: { "@": `${process.cwd()}/src` },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
});
