// ============================================================
// DÉMARRAGE DU SERVEUR HTTP ET BD - ADVISION
// Point d'entrée de l'API Node.js Express.
// ============================================================

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log('[AdVision API] Connexion à PostgreSQL...');
    await db.sequelize.authenticate();
    console.log('[AdVision API] Connexion à PostgreSQL établie avec succès !');

    // Tentative de synchronisation des modeles
    try {
      await db.sequelize.sync();
      console.log('[AdVision API] Modèles Sequelize synchronisés !');
    } catch (syncError) {
      console.warn('[AdVision API] Avertissement synchronisation :', syncError.message);
    }

    app.listen(PORT, () => {
      console.log(`[AdVision API] Serveur démarré avec succès sur le port ${PORT}`);
      console.log(`[AdVision API] Route de santé disponible sur http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('[AdVision API] Erreur critique lors du démarrage :', error);
    process.exit(1);
  }
}

startServer();
