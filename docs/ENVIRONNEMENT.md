# ENVIRONNEMENT ADVISION — PHASE 0

## 1. PRESENTATION ET ARCHITECTURE TECHNIQUE

AdVision est une application web de gestion publicitaire destinée au portail captif Wi-Fi public du Grand Mall de Douala.

### Architecture globale :
```text
                         VISITEUR
                            │
                            ▼
                         Wi-Fi
                            │
                            ▼
                         pfSense
                            │
                     redirection HTTP
                            │
                            ▼
                    ┌───────────────┐
                    │    NGINX      │
                    └───────┬───────┘
                            │
                 ┌──────────┴──────────┐
                 ▼                     ▼
            Angular Web           Node.js API
                                       │
                                       ▼
                                  PostgreSQL
```

- **Visiteur** : Se connecte au réseau Wi-Fi public du Grand Mall.
- **pfSense** : Gère le portail captif Wi-Fi et redirige l'utilisateur vers la page d'affichage AdVision (`/diffusion`).
- **Nginx** : Serveur web / reverse proxy central distribuait l'application Angular pour le frontend et redirigeant les requêtes `/api` vers Node.js.
- **Angular Web** : Interface utilisateur pour les visiteurs, annonceurs et administrateurs.
- **Node.js API (Express)** : API Backend centralisant la logique métier, la gestion des campagnes, l'authentification (JWT) et le suivi des statistiques.
- **PostgreSQL (Sequelize)** : Base de données relationnelle persistance stockant les utilisateurs, annonceurs, campagnes, publicités et journaux d'actions.

---

## 2. OUTILS NÉCESSAIRES ET LEUR RÔLE

1. **Ubuntu Server (24.04 LTS)** : Système d'exploitation Linux hôte hébergeant l'application et les conteneurs.
2. **Git** : Gestionnaire de version pour télécharger et mettre à jour le code source de l'application.
3. **Docker Engine** : Moteur de conteneurisation permettant d'exécuter les services d'AdVision de manière isolée et reproductible.
4. **Docker Compose** : Outil d'orchestration permettant de démarrer et gérer l'ensemble des conteneurs (Nginx, API Node.js, PostgreSQL) en une seule commande.
5. **Node.js LTS (v20+ / v22+) & npm** : Environnement d'exécution JavaScript pour développer, exécuter et tester l'API backend et construire le frontend.
6. **PostgreSQL** : Système de gestion de base de données relationnelle robuste (exécuté en conteneur Docker avec volume persistant).
7. **Nginx** : Serveur web hautes performances faisant office de reverse proxy et de serveur de fichiers statiques publicitaires.

---

## 3. PRÉREQUIS ET VÉRIFICATION DE L'ENVIRONNEMENT

Pour vérifier la présence et les versions des outils sur votre **Serveur Ubuntu**, exécutez les commandes suivantes :

### 1. Vérification du système d'exploitation
```bash
lsb_release -a
```
*Explication* : Affiche la version d'Ubuntu Server installée. (Version recommandée : Ubuntu 22.04 LTS ou 24.04 LTS).

### 2. Vérification de Git
```bash
git --version
```
*Explication* : Vérifie que Git est disponible pour récupérer les sources du projet.

### 3. Vérification de Docker
```bash
docker --version
```
*Explication* : S'assure que le moteur Docker est installé et en cours d'exécution. (Version minimale recommandée : Docker 24.0+).

### 4. Vérification de Docker Compose
```bash
docker compose version
```
*Explication* : S'assure du support du plugin Docker Compose V2.

### 5. Vérification de Node.js et npm (Machine de dev / Build)
```bash
node -v
npm -v
```
*Explication* : Vérifie l'installation de Node.js (LTS v20+ ou v22+) et du gestionnaire de paquets npm.

---

## 4. COMPATIBILITÉ ET RISQUES POTENTIELS

- **Droits Docker** : L'utilisateur Ubuntu exécutant les conteneurs doit appartenir au groupe `docker` pour éviter d'exécuter les commandes en `sudo`.
- **Ports réseau** : Assurez-vous que les ports `80` (HTTP), `443` (HTTPS), et éventuellement `5432` (PostgreSQL en interne) ne sont pas déjà utilisés par un autre service sur le serveur hôte.
- **Volumes de stockage** : Les médias (images/vidéos publicitaires) et les données PostgreSQL doivent impérativement être associés à des volumes Docker persistants pour éviter toute perte de données lors du redémarrage des conteneurs.
