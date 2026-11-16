import variants from "@/content/photo-variants.json";

/** Photos de public/photos disposant de versions allégées (-480, -720), créées par `npm run photos`. */
const OPTIMIZED = new Set<string>(variants);

const variant = (src: string, width: number) => src.replace(/\.jpg$/, `-${width}.jpg`);

/** URL d'une photo à une largeur approchée (les photos sans version allégée sont servies telles quelles). */
export function atWidth(src: string, width: number) {
  if (!OPTIMIZED.has(src)) return src;
  return width <= 480 ? variant(src, 480) : width <= 720 ? variant(src, 720) : src;
}

/**
 * Attributs <img> responsives : le téléphone télécharge une image à sa taille au lieu de la version complète.
 * `sizes` : largeur d'affichage de l'image selon l'écran (syntaxe HTML).
 */
export function responsive(src: string, sizes: string) {
  if (!OPTIMIZED.has(src)) return { src };
  return { src: variant(src, 720), srcSet: `${variant(src, 480)} 480w, ${variant(src, 720)} 720w, ${src} 960w`, sizes };
}
