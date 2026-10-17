const WIDTHS = [480, 800, 1200, 1600];

function isResizable(src: string) {
  return src.includes("images.unsplash.com");
}

/** URL d'une photo à une largeur donnée (photos Unsplash ; les photos locales sont servies telles quelles). */
export function atWidth(src: string, width: number) {
  return isResizable(src) ? src.replace(/([?&])w=\d+/, `$1w=${width}`) : src;
}

/**
 * Attributs <img> responsives : le téléphone télécharge une image à sa taille au lieu de la version 1600 px.
 * `sizes` : largeur d'affichage de l'image selon l'écran (syntaxe HTML).
 */
export function responsive(src: string, sizes: string) {
  if (!isResizable(src)) return { src };
  return { src: atWidth(src, 800), srcSet: WIDTHS.map((w) => `${atWidth(src, w)} ${w}w`).join(", "), sizes };
}
