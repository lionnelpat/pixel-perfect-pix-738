/**
 * Contenu du site — source unique. Modifier ici, pas dans les pages.
 * `aConfirmer: true` = affiché avec la mention « à confirmer ».
 * Voir docs/DECISIONS_A_VALIDER.md.
 */

export const couple = {
  display: { first: "Thibaut", second: "Sylviane" },
  bride: "Sylviane Flore",
  groom: "Gilles Thibaut",
};

/** Début de la dot, heure du Cameroun (UTC+1). */
export const countdownTarget = "2026-11-20T15:00:00+01:00";

export const welcome = [
  "Bienvenue dans notre histoire…",
  "Après tant de beaux moments partagés, nous avons décidé d’écrire ensemble un nouveau chapitre : celui de notre mariage.",
  "Nous sommes impatients de célébrer cette journée unique avec ceux qui occupent une place particulière dans nos vies.",
  "Ce site est votre petit guide pour découvrir notre histoire, les détails de la célébration et, surtout, vous préparer à faire la fête avec nous !",
];

export const story = {
  date: "18 septembre 2022",
  paragraphs: [
    "Ce jour-là, j’accompagnais mes parents à l’église, à Yaoundé. À notre arrivée, à l’entrée du temple, nous avons aperçu celle qui allait devenir ma promise.",
    "Dans la voiture, personne n’a prononcé un mot, mais, au fond de moi, une conviction profonde venait de naître. Je me suis dit intérieurement : « Cette fille sera la femme de ma vie et la mère de mes enfants. »",
    "Depuis cet instant, notre histoire a suivi son cours, jusqu’à nous conduire aujourd’hui à ce jour si spécial : le jour de notre mariage, qui marque le début d’un nouveau chapitre de notre vie à deux.",
  ],
  /** Dates clés : n'en ajouter que sur validation du couple. */
  timeline: [] as { date: string; label: string }[],
};

export type WeddingEvent = {
  id: string;
  day: string;
  time: string;
  title: string;
  place: string;
  placeDetail?: string;
  restricted?: boolean;
  aConfirmer?: boolean;
  /** Lien cartographique validé par le couple (ne pas inventer). */
  mapUrl?: string;
};

/** Horaires et libellés repris du faire-part imprimé. */
export const events: WeddingEvent[] = [
  {
    id: "dot",
    day: "Vendredi 20 novembre 2026",
    time: "15h00",
    title: "Cérémonie traditionnelle (dot)",
    place: "Njincha, par Foumbot",
  },
  {
    id: "civil",
    day: "Samedi 21 novembre 2026",
    time: "09h00",
    title: "Union civile",
    place: "Lac municipal de Foumban",
    aConfirmer: true,
  },
  {
    id: "religieux",
    day: "Samedi 21 novembre 2026",
    time: "13h00",
    title: "Bénédiction nuptiale",
    place: "Paroisse EECD du Lac Jourdain",
    placeDetail: "Sise au lac municipal de Foumban",
    aConfirmer: true,
  },
  {
    id: "gala",
    day: "Samedi 21 novembre 2026",
    time: "19h00",
    title: "Grande soirée de gala",
    place: "Complexe NJI Panka",
    restricted: true,
  },
];

export const dressCode = {
  colors: [
    { name: "Bleu nuit", token: "bg-navy" },
    { name: "Terracotta", token: "bg-terracotta" },
    { name: "Crème", token: "bg-cream" },
  ],
  style: "Tenue de soirée",
  rules: [
    { title: "Union civile & bénédiction nuptiale", text: "Tenues confectionnées dans les tissus du mariage." },
    { title: "Soirée de gala", text: "Tenues aux couleurs du mariage." },
  ],
  fabricNote: "Un tissu commun est prévu pour certains invités : rapprochez-vous des mariés pour les précisions.",
};

export const practical = {
  /** Mentionnés dans le 1er entretien, non reconfirmés. */
  accommodation: [{ name: "Complexe NJI Panka", note: "Hébergement suggéré", aConfirmer: true }],
  parking: { text: "Parking disponible sur place (complexe NJI Panka).", aConfirmer: true },
  children: "Les enfants sont les bienvenus à certains événements seulement — précisions à venir.",
  /** Ne mettre le numéro qu'après accord explicite pour publication. */
  contact: { name: "Gaelle Magnerou", phone: null as string | null },
};

export const registry = {
  message: null as string | null,
  url: null as string | null,
};

export type Photo = { src: string; alt: string };
/** Ajouter ici les photos validées (idéalement en .webp optimisé). */
export const gallery: Photo[] = [];
