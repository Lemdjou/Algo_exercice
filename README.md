# AdVision - Plateforme de Gestion Publicitaire pour Wi-Fi Captif

AdVision est une application web de gestion publicitaire dédiée au réseau Wi-Fi public du Grand Mall de Douala.

## Architecture
- **Web Frontend** : Angular (TypeScript strict)
- **API Backend** : Node.js (Express)
- **Base de données** : PostgreSQL avec ORM Sequelize
- **Reverse Proxy / Serveur Web** : Nginx
- **Portail Captif** : pfSense

## Structure du projet
```text
advision/
├── api/            # Backend Node.js Express
├── web/            # Frontend Angular
├── nginx/          # Configuration Nginx
├── postgres/       # Configuration & Scripts PostgreSQL
├── docs/           # Documentation du projet
├── scripts/        # Scripts d'automatisation
├── tests/          # Tests globaux
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

## Démarrage rapide
Consulter `docs/ENVIRONNEMENT.md` pour vérifier les prérequis système sur Ubuntu Server.
