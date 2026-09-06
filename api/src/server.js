// ============================================================
// DÉMARRAGE DU SERVEUR HTTP - ADVISION
// Point d'entrée de l'API Node.js Express.
//
// Ce fichier charge les variables d'environnement (.env)
// et démarre l'écoute HTTP sur le port configuré.
// ============================================================

const path = require('path');
// Chargement des variables d'environnement depuis le fichier .env racine
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const app = require('./app');

// ============================================================
// PERSONNALISATION DU PORT
// Le port d'écoute est défini dans .env (PORT) ou vaut 3000 par défaut.
// ============================================================
const PORT = process.env.PORT || 3000;

// Démarrage du serveur HTTP
app.listen(PORT, () => {
  console.log(`[AdVision API] Serveur démarré avec succès sur le port ${PORT}`);
  console.log(`[AdVision API] Route de santé disponible sur http://localhost:${PORT}/api/health`);
});
