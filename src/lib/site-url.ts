import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestUrl } from "@tanstack/react-start/server";

/**
 * Adresse publique du site (https://…). Les pages étant pré-générées au build, on lit d'abord la
 * variable `URL` fournie par Netlify (adresse principale du site, nom de domaine compris) ;
 * à défaut (développement local), on la déduit de la requête.
 */
export const getSiteOrigin = createIsomorphicFn()
  .server(() => process.env["URL"]?.replace(/\/$/, "") || getRequestUrl({ xForwardedHost: true, xForwardedProto: true }).origin)
  .client(() => window.location.origin);
