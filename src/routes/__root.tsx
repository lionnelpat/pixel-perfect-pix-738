import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import greatVibes from "@fontsource/great-vibes/files/great-vibes-latin-400-normal.woff2?url";
import { PreviewBanner, SiteFooter, SiteNav } from "../components/site/SiteNav";
import { PageHeader } from "../components/site/Ornaments";

function NotFoundComponent() {
  return (
    <>
      <PageHeader eyebrow="Page introuvable" title="Oups…" />
      <div className="px-4 py-16 text-center">
        <p className="text-muted-foreground">Cette page n’existe pas.</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-sm uppercase tracking-widest text-primary-foreground">
          Retour à l’accueil
        </Link>
      </div>
    </>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold text-navy">La page n’a pas pu se charger</h1>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-md bg-primary px-5 py-2 text-sm text-primary-foreground"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      // Pages intérieures non indexées ; l'accueil remplace cette valeur.
      { name: "robots", content: "noindex, nofollow" },
      { title: "Thibaut & Sylviane — 20 & 21 novembre 2026" },
      { name: "description", content: "Le site du mariage de Thibaut & Sylviane." },
      { name: "theme-color", content: "#132548" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Thibaut & Sylviane" },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      // Police du grand titre : préchargée car c'est le premier élément visible.
      { rel: "preload", href: greatVibes, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SiteNav />
      <main className="overflow-x-clip">
        <Outlet />
      </main>
      <SiteFooter />
      <PreviewBanner />
    </QueryClientProvider>
  );
}
