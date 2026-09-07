# ENVIRONNEMENT ADVISION — DEPLOIEMENT NATIF SANS DOCKER

## 1. PRESENTATION ET ARCHITECTURE TECHNIQUE

AdVision est une plateforme web de gestion et de diffusion publicitaire destinée au réseau Wi-Fi public du Grand Mall de Douala.

Dans cette architecture **native sans Docker**, l'ensemble des services s'exécute directement sur le système d'exploitation hôte Ubuntu Server.

### Architecture globale :
```text
                     SERVEUR UBUNTU
                           │
             ┌─────────────┼─────────────┐
             │             │             │
           Nginx         Node.js      PostgreSQL
             │             │             │
             ▼             ▼             │
          Angular       Express           │
                           │              │
                           └──────┬───────┘
                                  ▼
                              PostgreSQL
```

- **Visiteur** : Se connecte au réseau Wi-Fi public du Grand Mall.
- **pfSense** : Gère le portail captif Wi-Fi et redirige l'utilisateur vers la page d'affichage AdVision (`/diffusion`).
- **Nginx** : Serveur web natif faisant office de reverse proxy, distribuant l'application Angular pour le frontend, servant les fichiers médias statiques et redirigeant les requêtes `/api` vers Node.js.
- **Angular Web** : Application Frontend monopage (SPA) pour l'interface utilisateur (visiteurs, annonceurs, administrateurs).
- **Node.js API (Express)** : API Backend native exécutée sous contrôle du gestionnaire de services système Ubuntu (`systemd`).
- **PostgreSQL (Sequelize)** : Base de données relationnelle installée en natif sur Ubuntu.

---

## 2. OUTILS NÉCESSAIRES ET LEUR RÔLE

1. **Ubuntu Server (22.04 / 24.04 LTS)** : Système d'exploitation Linux hôte hébergeant l'application.
2. **Git** : Gestionnaire de version pour télécharger et mettre à jour le code source de l'application.
3. **Node.js LTS & npm** : Moteur d'exécution JavaScript pour exécuter l'API backend Express et construire le frontend Angular.
4. **PostgreSQL** : Système de gestion de base de données relationnelle (installé en service natif).
5. **Nginx** : Serveur web hautes performances faisant office de reverse proxy HTTP et de serveur de fichiers médias.
6. **systemd** : Gestionnaire de services d'Ubuntu permettant de maintenir l'API Node.js active et de la redémarrer automatiquement en cas d'erreur ou au démarrage du serveur.

---

## 3. PRÉREQUIS ET VÉRIFICATION DE L'ENVIRONNEMENT

Pour vérifier la présence et les versions des outils sur votre **Serveur Ubuntu**, exécutez les commandes suivantes :

### 1. Vérification du système d'exploitation
```bash
lsb_release -a
```

### 2. Vérification de Git
```bash
git --version
```

### 3. Vérification de Node.js et npm
```bash
node -v
npm -v
```

### 4. Vérification de PostgreSQL
```bash
psql --version
```

### 5. Vérification de Nginx
```bash
nginx -v
```
