# Projet Frontend - Jeu de Cartes

Bienvenue dans le projet frontend de notre site de jeu de cartes.

## Fonctionnalités

- **Profil utilisateur** : Gestion des informations personnelles et des statistiques.
- **Cartes** :
  - Achat de cartes sur le marché.
  - Création de nouvelles cartes personnalisées.
  - Vente de cartes à d'autres joueurs.
- **Combat** : Système de duel entre deux joueurs et chat intégré.

## Prérequis

- **Node.js**
- **npm**
- **Docker** et **Docker Compose**

## Installation et Lancement en Développement

1. Clonez le dépôt :
   ```bash
   git clone <URL_DU_DEPOT>
   cd <NOM_DU_REPERTOIRE>
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

4. Accédez à l'application : [http://localhost:5173](http://localhost:5173)

## Build et Déploiement avec Docker

Ce projet peut être déployé dans un conteneur Docker. L'image inclut un serveur Nginx qui agit comme reverse proxy pour servir l'application.

### Étapes de Build

1. **Build de l'image Docker** :
   ```bash
   docker build -t jeu-cartes-frontend .
   ```

2. **Lancement du conteneur** :
   ```bash
   docker run -d -p 8080:8080 jeu-cartes-frontend
   ```

3. Accédez à l'application via [http://localhost:8080](http://localhost:8080).

## Technologies Utilisées

- **React** : Framework pour la création d'interfaces utilisateur.
- **Vite** : Outil de build rapide pour le développement web moderne.
- **Nginx** : Serveur web pour exposer l'application.
- **Docker** : Conteneurisation pour un déploiement simplifié.
