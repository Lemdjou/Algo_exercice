// ============================================================
// DÉMARRAGE DU SERVEUR HTTP ET BD - ADVISION
// Point d'entrée de l'API Node.js Express.
// ============================================================

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 3000;
const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 2000;

/**
 * Tente de se connecter a PostgreSQL avec retatives en cas de demarrage lent du conteneur BD
 */
async function connectWithRetry(retries = MAX_RETRIES) {
  while (retries > 0) {
    try {
      console.log(`[AdVision API] Connexion à PostgreSQL (tentatives restantes : ${retries})...`);
      await db.sequelize.authenticate();
      console.log('[AdVision API] Connexion à PostgreSQL établie avec succès !');
      return true;
    } catch (err) {
      console.warn(`[AdVision API] Erreur de connexion BD : ${err.message}`);
      retries -= 1;
      if (retries === 0) {
        throw new Error('Impossible de se connecter à la base de données après plusieurs tentatives.');
      }
      console.log(`[AdVision API] Nouvelle tentative dans ${RETRY_DELAY_MS / 1000}s...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
}

async function startServer() {
  try {
    // Connexion a la base de donnees avec retentatives
    await connectWithRetry();

    // Synchronisation des modeles
    try {
      await db.sequelize.sync();
      console.log('[AdVision API] Modèles Sequelize synchronisés avec succès !');
    } catch (syncError) {
      console.warn('[AdVision API] Avertissement synchronisation :', syncError.message);
    }

    // Demarrage du serveur HTTP Express
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[AdVision API] Serveur démarré avec succès sur le port ${PORT}`);
      console.log(`[AdVision API] Route de santé disponible sur http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('[AdVision API] Erreur critique lors du démarrage :', error.message);
    process.exit(1);
  }
}

startServer();
