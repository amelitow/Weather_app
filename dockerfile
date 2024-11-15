# Utiliser une image Node.js de base avec Alpine Linux pour un environnement léger
FROM node:18-alpine

# Définir le dossier de travail
WORKDIR /app

# Installer create-react-app globalement
RUN npm install -g create-react-app

# Créer le projet directement dans le conteneur
RUN create-react-app meteo-app --template typescript

# Définir le dossier de travail dans le nouveau projet
WORKDIR /app/meteo-app

# Exposer le port sur lequel l'application va tourner
EXPOSE 3000

# Lancer l'application en mode développement
CMD ["npm", "start"]

