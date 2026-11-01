# Décisions à valider — Mariage Thibaut & Sylviane

Tout le contenu se modifie dans `src/content/wedding.ts`.

## Contradictions
1. **Horaires du 21/11** — Faire-part : union civile 09h00, bénédiction 13h00. Entretien du 14/10 : 10h et 14h. **Le site affiche les horaires du faire-part**, marqués « à confirmer ».
2. **Lieu de la dot** — Faire-part : « Njincha par Foumbot ». Entretien : « Mangoum / Njincha ». Le site suit le faire-part.
3. **Nom du marié** — Faire-part : NJUPTAVOUI ; entretien : Njutapvoui. Non affiché sur le site (prénoms seuls).
4. **Date principale** — 14/10 : 21/11 ; 15/10 : 20/11. Le compte à rebours vise le 20/11 à 15h (début de la dot).
5. **Récit** — l'entretien évoque un temple à Yaoundé ; le faire-part nomme la paroisse EECD du Lac Jourdain (lieu de la bénédiction, distinct). OK.

## À confirmer
- Hébergement Complexe NJI Panka et parking (entretien 14/10 uniquement).
- Dress code (tissus du mariage / couleurs / tissu commun : qui, comment se le procurer).
- Publication du numéro de Gaelle Magnerou (non affiché tant que non validé).
- Enfants : à quels événements ?
- Dates clés pour une chronologie (rencontre famille 27/10/2022, etc.) — à valider avant affichage (données personnelles, enfants).
- Liens cartographiques précis pour chaque lieu.
- Liste de mariage : enseignes connues (Mahima et ORCA à Douala, PLACE à Yaoundé). Reste à confirmer : quel magasin pour Mahima (Akwa ou Bonamoussadi) et ORCA (Akwa rue Joffre ou Youpwè), leurs téléphones (les annuaires en ligne se contredisent), et l’adresse de PLACE (introuvable en ligne).
- Programme détaillé (annoncé par les mariés).
- Soirée de gala : faut-il une restriction nominative sur le site ? Actuellement : mention « sur invitation ».

## Décidé
- Livre d'or : messages publics après validation par les mariés sur `/admin` (mot de passe `ADMIN_PASSWORD`). Aucun message n'est supprimé : on l'archive.
- Photos du couple : 11 photos réparties (accueil, pages, galerie) le 01/11/2026. Les photos des lieux restent des illustrations.
- Bandeau « version de travail » retiré pour la publication (01/11/2026).
- Invitations numériques au gala (envoi e-mail/WhatsApp, suivi des confirmations) : abandonné par les mariés (17/10/2026).

## Non développé (en attente)
- Playlist / suggestions : absente de la liste du 15/10 — à confirmer.
- Ajout de photos par interface d'administration (actuellement : ajout dans le fichier de contenu).

## Sécurité
- Mot de passe unique stocké côté serveur (secret `SITE_PASSWORD`), cookie httpOnly signé, toutes les pages vérifiées côté serveur. Changer le mot de passe déconnecte tous les invités.
- Limitation des tentatives : 5 essais / 15 min par IP, au mieux (mémoire par instance).
- Site non indexé (`noindex`, robots.txt).
