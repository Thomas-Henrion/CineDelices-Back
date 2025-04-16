# Cinedelices Backend

API backend pour le projet Cinedelices, une plateforme dédiée au cinéma et à la gastronomie.

## Prérequis

- [Node.js](https://nodejs.org/) (version recommandée : >=18.x)
- [PNPM](https://pnpm.io/) (version 10.7.1 ou supérieure)
- [Docker](https://www.docker.com/) et [Docker Compose](https://docs.docker.com/compose/) (pour l'environnement de développement et de production)
- [MariaDB](https://mariadb.org/) (si exécution locale sans Docker)

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/O-clock-Sigyn/projet-cinedelices.git
   cd projet-cinedelices
   ```

2. Installez les dépendances :
   ```bash
   pnpm install
   ```

3. Créez un fichier `.env` à la racine du projet basé sur l'exemple suivant :
   ```
   DATABASE_HOST=localhost
   DATABASE_USER=root
   DATABASE_PASSWORD=cinedelice
   DATABASE_NAME=cinedelice
   DATABASE_PORT=3306

   CLOUDINARY_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=

   PORT=3000

   JWT_SECRET=votre_secret_jwt_tres_securise
   JWT_REFRESH_SECRET=votre_secret_refresh_tres_securise

   MAIL_APIKEY=votre_cle_api_mailersend
   ```
   > **Note**: Pour les variables JWT_SECRET et JWT_REFRESH_SECRET, générez des chaînes aléatoires sécurisées.
   
   > Pour obtenir une clé API MailerSend, créez un compte sur [MailerSend](https://www.mailersend.com/).

   > Pour obtention de la clé API Cloudinary, créez un compte sur [Cloudinary](https://cloudinary.com/).

## Structure du projet

```
src/
├── @types/          # Types TypeScript
├── controllers/     # Logique de traitement des requêtes
├── database/        # Configuration de la base de données, modèles et associations Sequelize
├── middlewares/     # Middlewares Express (authentification, etc.)
├── routes/          # Définition des routes de l'API
├── utils/           # Fonctions utilitaires
├── validators/      # Schémas de validation (Joi)
└── index.ts         # Point d'entrée de l'application
```

## Commandes disponibles

- `pnpm dev` : Lance le serveur en mode développement avec hot-reload
- `pnpm build` : Compile le code TypeScript
- `pnpm start` : Démarre le serveur en production (nécessite une compilation préalable)
- `pnpm seed` : Remplit la base de données avec des données initiales
- `pnpm format` : Vérifie le formatage du code avec Biome
- `pnpm format:write` : Formate automatiquement le code avec Biome
- `pnpm lint` : Analyse le code pour détecter les problèmes potentiels

## Développement local

### Avec Docker

1. Assurez-vous que Docker et Docker Compose sont installés et en cours d'exécution.
2. Lancez la base de donnée :
   ```bash
   docker compose up -d
   ```
3. Vous pourriez ensuite lancé le projet avec 
   ```bash
   pnpm dev
   ```

## Déploiement en production

Pour déployer l'application en production :

1. Configurez correctement votre fichier `.env` avec les secrets de production.
2. Utilisez Docker Compose pour le déploiement :
   ```bash
   docker compose -f docker-compose.prod.yaml up -d --build
   ```