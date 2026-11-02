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
  banner: null as string | null,
  /** Version courte affichée sur téléphone. */
  bannerShort: "Version de travail",
};

export const credit = { label: "Model Technologie", url: "https://model-technologie.com" };

/** Référencement : seule la page d'accueil est indexée par les moteurs de recherche. */
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
  date: "18 octobre 2022",
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
    { title: "Soirée de gala", text: "Tenues chic et glamour." },
  ],
  fabricNote: "Un tissu commun est prévu pour certains invités : rapprochez-vous des mariés pour les précisions.",
};

export const practical = {
  /** Souhait prioritaire du couple, mis en avant en tête de page. */
  timing: {
    title: "Respect du timing",
    text: "C’est très important pour nous : merci d’arriver à l’heure à chaque étape de la célébration. Le programme est minuté, et votre ponctualité nous permettra de vivre pleinement chaque moment avec vous.",
  },
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
  /** Téléphone public de l'enseigne, ex. "+237 233 00 00 00". */
  phone?: string;
  /** Recherche Google Maps (nom + ville) : ouvre la fiche de l'enseigne et ses magasins. */
  mapQuery?: string;
  /** Lien vers la liste en ligne de l'enseigne, s'il existe. */
  url?: string;
  aConfirmer?: boolean;
};

export function storeMapsLink(s: GiftStore) {
  return s.mapQuery && `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mapQuery)}`;
}

export const registry = {
  intro: "Votre présence est le plus précieux des cadeaux. Pour celles et ceux qui souhaitent nous gâter, deux possibilités s’offrent à vous.",
  /** Les 3 enseignes choisies par les mariés. Téléphones : non publiés tant que non vérifiés (voir docs/DECISIONS_A_VALIDER.md). */
  stores: [
    { name: "Supermarché Mahima", city: "Douala", mapQuery: "Supermarché Mahima Douala" },
    { name: "ORCA", city: "Douala", mapQuery: "ORCA Douala" },
    { name: "PLACE", city: "Yaoundé", aConfirmer: true },
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
 * Photos des mariés, dans public/photos/.
 * Pour en ajouter une : déposer le fichier (nom sans espaces), la déclarer ici, puis l'ajouter à `gallery`.
 */
const photos = {
  blanc: { src: "/photos/accueil-2.png", alt: "Thibaut et Sylviane, tout de blanc vêtus", position: "50% 20%" },
  bordeaux: { src: "/photos/accueil-1.png", alt: "Sylviane en robe bordeaux, Thibaut en costume bleu", position: "50% 15%" },
  pagneArche: { src: "/photos/couple-pagne-arche.jpg", alt: "Thibaut et Sylviane enlacés, en pagne, sous une arche fleurie", position: "50% 18%" },
  pagneFleurs: { src: "/photos/couple-pagne-fleurs.jpg", alt: "Thibaut et Sylviane en pagne, devant un décor de fleurs blanches", position: "50% 18%" },
  chic: { src: "/photos/couple-chic.jpg", alt: "Sylviane en robe verte au bras de Thibaut", position: "50% 15%" },
  canape: { src: "/photos/couple-canape.jpg", alt: "Sylviane cache les yeux de Thibaut, sur le canapé", position: "50% 25%" },
  alliances: { src: "/photos/souvenir-alliances.jpg", alt: "Montage souvenir : le couple sur le canapé et les alliances", position: "50% 30%" },
  thibaut: { src: "/photos/thibaut-costume.jpg", alt: "Thibaut en costume bleu et gris", position: "50% 15%" },
  sylviane: { src: "/photos/sylviane-robe-rouge.jpg", alt: "Sylviane en robe rouge", position: "50% 15%" },
  familleSalon: { src: "/photos/famille-salon.jpg", alt: "Thibaut et Sylviane en famille dans le salon", position: "50% 40%" },
  familleCanape: { src: "/photos/galerie-01.png", alt: "Thibaut et Sylviane en famille sur le canapé", position: "50% 25%" },
} satisfies Record<string, Photo>;

/** Diaporama plein écran de l'accueil (3 à 6 photos, format paysage ou portrait). */
export const heroSlides: Photo[] = [photos.pagneArche, photos.blanc, photos.chic, photos.bordeaux];

/** Photos de la section « Notre histoire » (accueil et page Notre histoire, une par paragraphe). */
export const storyPhotos: Photo[] = [photos.canape, photos.alliances, photos.pagneFleurs];

/** Photo choisie pour chaque page (bandeau du haut et vignettes). */
export const pagePhotos = {
  welcome: photos.pagneFleurs,
  countdown: photos.blanc,
  histoire: photos.chic,
  programme: photos.blanc,
  dressCode: photos.pagneArche,
  liste: photos.bordeaux,
  galerie: photos.pagneArche,
  livreDor: photos.familleCanape,
} satisfies Record<string, Photo | Photo[]>;

export const gallery: Photo[] = [
  photos.pagneArche,
  photos.blanc,
  photos.chic,
  photos.canape,
  photos.sylviane,
  photos.thibaut,
  photos.bordeaux,
  photos.pagneFleurs,
  photos.familleSalon,
  photos.alliances,
  photos.familleCanape,
];
