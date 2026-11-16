import { useEffect, useState, type RefObject } from "react";

/** Attente maximale après l'affichage de la page : l'événement `load` attend aussi les photos du bas de page. */
const MAX_WAIT = 1500;

/**
 * Vrai une fois la page chargée (texte, styles, scripts), ou au plus tard MAX_WAIT ms après son affichage.
 * Les grandes photos décoratives attendent ce signal : en 3G, le contenu s'affiche d'abord.
 */
export function useAfterLoad() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const go = () => setReady(true);
    if (document.readyState === "complete") {
      go();
      return;
    }
    window.addEventListener("load", go, { once: true });
    const id = setTimeout(go, MAX_WAIT);
    return () => {
      window.removeEventListener("load", go);
      clearTimeout(id);
    };
  }, []);
  return ready;
}

/** Vrai dès que l'élément approche de l'écran (une seule fois) : sert aux images de fond CSS, que `loading="lazy"` ne couvre pas. */
export function useNearViewport(ref: RefObject<Element | null>, rootMargin = "300px") {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, near]);
  return near;
}
