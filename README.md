# Sylviane & Thibaut — site du mariage

Site privé (protégé par mot de passe) du mariage de Sylviane & Thibaut, 20 & 21 novembre 2026 à Foumban.

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

## Livre d'or

Les messages sont stockés dans Netlify Blobs (store `livre-dor`) et ne sont publiés qu'après validation sur `/admin` (statuts : à valider, publié, archivé ; aucune suppression).
En local (`npm run dev`), ils sont gardés en mémoire et disparaissent au redémarrage.

## Déploiement (Netlify)

Le site est relié au dépôt GitHub : chaque `git push` redéploie automatiquement.

- Configuration de build : `netlify.toml` (`npm run build`, dossier publié `dist`).
- Variables d'environnement obligatoires (Site configuration → Environment variables, scope « Functions ») :
  - `SITE_PASSWORD` : mot de passe des invités ;
  - `ADMIN_PASSWORD` : mot de passe des mariés pour valider les messages du livre d'or sur `/admin`.
- Bandeau « version de travail » : `preview.banner` dans `src/content/wedding.ts`.
