# Étape 1 — Image de base Node
FROM node:20

# Étape 2 — Dossier de travail dans le conteneur
WORKDIR /app

# Étape 3 — Copier les fichiers de configuration npm
COPY package*.json ./

# Étape 4 — Installer les dépendances
RUN npm install

# Étape 5 — Copier le reste du code
COPY . .

# Étape 6 — Exposer le port de l’application
EXPOSE 3000

# Étape 7 — Lancer le serveur avec nodemon (mode dev)
CMD ["npm", "run", "dev"]
