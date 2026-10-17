/**
 * Contenu du site — source unique. Modifier ici, pas dans les pages.
 * `aConfirmer: true` = affiché avec la mention « à confirmer ».
 * Voir docs/DECISIONS_A_VALIDER.md.
 */

export type Photo = {
  src: string;
  alt: string;
  /** Photo d'illustration libre de droits (Unsplash) — à remplacer par les photos des mariés. */
  placeholder?: boolean;
  /** Point de cadrage quand la photo est recadrée (CSS object-position), ex. "50% 20%" pour garder les visages. */
  position?: string;
};

/** Image Unsplash (licence libre) redimensionnée. */
function unsplash(id: string, w = 1600) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`;
}

export const couple = {
  display: { first: "Thibaut", second: "Sylviane" },
  bride: "Sylviane Flore",
  groom: "Gilles Thibaut",
};

/** Bandeau « version de travail » affiché pour la relecture des mariés. Mettre `banner: null` pour le retirer. */
export const preview = {
  banner: "Version de travail : photos provisoires, certaines informations restent à confirmer." as string | null,
  /** Version courte affichée sur téléphone. */
  bannerShort: "Version de travail · photos provisoires",
};

export const credit = { label: "Model Technologie", url: "https://model-technologie.com" };

/** Référencement : seule la page d'accueil publique (/acces) est indexée par les moteurs de recherche. */
export const seo = {
  title: "Mariage de Thibaut & Sylviane — 20 & 21 novembre 2026 · Foumban",
  description:
    "Thibaut & Sylviane se marient les 20 et 21 novembre 2026 à Foumban, au Cameroun. Le site des invités : programme, lieux, dress code, liste de mariage et livre d’or.",
  /** Aperçu affiché quand le lien est partagé (WhatsApp, Facebook…), 1200 × 630, dans public/. */
  shareImage: "/photos/partage.jpg",
  shareImageAlt: "Thibaut & Sylviane",
  city: "Foumban",
  country: "CM",
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
  /** Lien Google Maps exact fourni par le couple (ne pas inventer). */
  mapUrl?: string;
  /** Adresse utilisée pour la carte intégrée tant que `mapUrl` n'est pas fourni. */
  mapQuery: string;
  image: Photo;
};

/** Horaires et libellés repris du faire-part imprimé. */
export const events: WeddingEvent[] = [
  {
    id: "dot",
    day: "Vendredi 20 novembre 2026",
    time: "15h00",
    title: "Cérémonie traditionnelle (dot)",
    place: "Njincha, par Foumbot",
    mapQuery: "Njincha, Foumbot, Cameroun",
    image: { src: unsplash("1770562325818-45c1f4cd2a84"), alt: "Case traditionnelle entourée de bananiers", placeholder: true },
  },
  {
    id: "civil",
    day: "Samedi 21 novembre 2026",
    time: "09h00",
    title: "Union civile",
    place: "Lac municipal de Foumban",
    aConfirmer: true,
    mapQuery: "Lac municipal de Foumban, Cameroun",
    image: { src: unsplash("1785081088443-8bb3657d4992"), alt: "Lac bordé de palmiers", placeholder: true },
  },
  {
    id: "religieux",
    day: "Samedi 21 novembre 2026",
    time: "13h00",
    title: "Bénédiction nuptiale",
    place: "Paroisse EECD du Lac Jourdain",
    placeDetail: "Sise au lac municipal de Foumban",
    aConfirmer: true,
    mapQuery: "Paroisse EECD Lac Jourdain, Foumban, Cameroun",
    image: { src: unsplash("1788550439605-8793f4c528d4"), alt: "Allée centrale d’une église lumineuse", placeholder: true },
  },
  {
    id: "gala",
    day: "Samedi 21 novembre 2026",
    time: "19h00",
    title: "Grande soirée de gala",
    place: "Complexe NJI Panka",
    restricted: true,
    mapQuery: "Complexe NJI Panka, Foumban, Cameroun",
    image: { src: unsplash("1783314863884-be035ed5ed5c"), alt: "Salle de réception aux lumières chaudes", placeholder: true },
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

export type GiftStore = {
  name: string;
  city?: string;
  address?: string;
  /** Lien vers la liste en ligne de l'enseigne, s'il existe. */
  url?: string;
  aConfirmer?: boolean;
};

export const registry = {
  intro: "Votre présence est le plus précieux des cadeaux. Pour celles et ceux qui souhaitent nous gâter, deux possibilités s’offrent à vous.",
  /** Les 3 enseignes où trouver la liste — choix en cours par les mariés. */
  stores: [
    { name: "Enseigne n°1", aConfirmer: true },
    { name: "Enseigne n°2", aConfirmer: true },
    { name: "Enseigne n°3", aConfirmer: true },
  ] as GiftStore[],
  voucher: {
    title: "Le bon cadeau",
    text: "Vous préférez nous laisser choisir ? Offrez-nous un bon cadeau.",
    steps: ["Rendez-vous dans l’enseigne de votre choix.", "Faites établir un bon cadeau du montant qui vous convient.", "Remettez-le aux mariés."],
  },
};

export const guestbook = {
  intro: "Un mot doux, un souvenir, un vœu pour notre avenir… Laissez-nous un message, nous le garderons précieusement.",
  moderationNote: "Votre message sera publié ici après validation par les mariés.",
  thanks: "Merci pour votre message ! Il apparaîtra ici dès que les mariés l’auront lu.",
  empty: "Soyez le premier ou la première à nous laisser un mot.",
};

/** Lien Google Maps : le lien exact s'il est fourni, sinon une recherche sur l'adresse. */
export function mapsLink(e: WeddingEvent) {
  return e.mapUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.mapQuery)}`;
}

export function mapsEmbed(e: WeddingEvent) {
  return `https://www.google.com/maps?q=${encodeURIComponent(e.mapQuery)}&output=embed`;
}

/**
 * Photos d'illustration : à remplacer par celles des mariés.
 * Déposer les fichiers dans public/photos/ puis indiquer src: "/photos/xxx.webp" et retirer `placeholder`.
 */
const P = (id: string, alt: string): Photo => ({ src: unsplash(id), alt, placeholder: true });

/** Diaporama plein écran de l'accueil (3 à 6 photos, format paysage ou portrait). */
export const heroSlides: Photo[] = [
  { src: "/photos/accueil-2.png", alt: "Thibaut et Sylviane, tout de blanc vêtus", position: "50% 20%" },
  { src: "/photos/accueil-1.png", alt: "Sylviane en robe bordeaux, Thibaut en costume bleu", position: "50% 15%" },
];

/** Photos de la section « Notre histoire ». */
export const storyPhotos: Photo[] = [
  P("1665258918932-9e358bcfba0f", "Baisemain sur un escalier en bois"),
  P("1507650029083-5092f9b2b2e6", "Échange des alliances"),
];

export const gallery: Photo[] = [
  { src: "/photos/accueil-2.png", alt: "Thibaut et Sylviane, tout de blanc vêtus", position: "50% 20%" },
  { src: "/photos/accueil-1.png", alt: "Sylviane en robe bordeaux, Thibaut en costume bleu", position: "50% 15%" },
  { src: "/photos/galerie-01.png", alt: "Thibaut et Sylviane en famille sur le canapé" },
  P("1790563380253-d4cb4bed4075", "Le couple enlacé en tenue traditionnelle"),
  P("1695281535578-ce371088bb3e", "Les mariés dans un jardin"),
  P("1603214924133-5c2c78471b73", "Portrait des mariés en studio"),
  P("1665416557437-6dd757e90ce8", "La mariée et son diadème"),
  P("1661332517932-2d441bfb2994", "Tenues traditionnelles dorées"),
  P("1790563378465-572d52edf0b1", "Le couple main dans la main"),
  P("1665258918932-9e358bcfba0f", "Baisemain sur un escalier"),
  P("1618999114008-fbf937170cdb", "Parure de perles traditionnelle"),
  P("1695281536457-01f9a07c575b", "Étreinte sous les arbres"),
  P("1790563379927-b68ee9187a8c", "Le couple en tenue de cérémonie"),
  P("1507650029083-5092f9b2b2e6", "Échange des alliances"),
  P("1745231991466-19d41014cc66", "Tendresse au coucher du soleil"),
];
