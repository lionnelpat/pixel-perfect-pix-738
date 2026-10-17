import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestUrl } from "@tanstack/react-start/server";

/**
 * Adresse publique du site (https://…), déduite de la requête : fonctionne sur l'adresse Netlify
 * comme sur le futur nom de domaine, sans rien configurer.
 */
export const getSiteOrigin = createIsomorphicFn()
  .server(() => getRequestUrl({ xForwardedHost: true, xForwardedProto: true }).origin)
  .client(() => window.location.origin);
