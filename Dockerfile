# Site statique pour le VPS (Dokploy) : les pages sont pré-générées au build, puis servies par nginx.
# Le livre d'or et l'administration (fonctions serveur) ne sont pas inclus dans cette image.

FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Adresse publique du site : utilisée pour l'aperçu de partage (WhatsApp) et le lien canonique.
ARG SITE_URL=https://thibaut-sylviane.life
ENV URL=$SITE_URL
RUN npm run build

FROM nginx:1.27-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
