import { useRef, type ImgHTMLAttributes } from "react";
import { useNearViewport } from "@/hooks/use-deferred-media";
import { responsive } from "@/lib/images";

/** Image vide (1 × 1 px transparent) affichée tant que la photo n'est pas demandée. */
const EMPTY = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

/**
 * Photo téléchargée seulement lorsqu'elle arrive à l'écran (à 200 px près).
 * Le `loading="lazy"` des navigateurs charge les images jusqu'à 2 500 px à l'avance en connexion lente,
 * soit presque toute la page d'un coup : ici, le premier affichage ne télécharge aucune photo.
 */
export function LazyPhoto({
  src,
  sizes,
  className = "",
  ...rest
}: { src: string; sizes: string } & Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet" | "sizes"
>) {
  const ref = useRef<HTMLImageElement>(null);
  const near = useNearViewport(ref, "200px");
  return (
    <img
      ref={ref}
      {...(near ? responsive(src, sizes) : { src: EMPTY })}
      decoding="async"
      className={`bg-secondary ${className}`}
      {...rest}
    />
  );
}
