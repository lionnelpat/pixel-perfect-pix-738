import { createFileRoute, redirect } from "@tanstack/react-router";

/** Ancienne page de mot de passe : le site est désormais public, les liens déjà partagés mènent à l'accueil. */
export const Route = createFileRoute("/acces")({
  beforeLoad: () => {
    throw redirect({ to: "/", statusCode: 301 });
  },
});
