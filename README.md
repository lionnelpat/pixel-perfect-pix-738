# Thibaut & Sylviane — site du mariage

Site privé (protégé par mot de passe) du mariage de Thibaut & Sylviane, 20 & 21 novembre 2026 à Foumban.

Réalisé par [Model Technologie](https://model-technologie.com).

## Stack

TanStack Start (React 19, SSR) · Tailwind CSS 4 · hébergement Netlify (fonctions serveur pour l'accès par mot de passe).

## Développement

Prérequis : Node.js 22 et npm.

```sh
npm install
cp .env.example .env.local   # puis renseigner SITE_PASSWORD
npm run dev
```

## Contenu

Tous les textes, dates, lieux et photos sont dans `src/content/wedding.ts`.
Les points encore à confirmer avec les mariés sont suivis dans `docs/DECISIONS_A_VALIDER.md`.

Pour remplacer les photos d'illustration : déposer les fichiers dans `public/photos/`,
indiquer `src: "/photos/xxx.webp"` et retirer `placeholder`.

## Déploiement (Netlify)

Le site est relié au dépôt GitHub : chaque `git push` redéploie automatiquement.

- Configuration de build : `netlify.toml` (`npm run build`, dossier publié `dist`).
- Variable d'environnement obligatoire : `SITE_PASSWORD` (Site configuration → Environment variables).
- Bandeau « version de travail » : `preview.banner` dans `src/content/wedding.ts`.
