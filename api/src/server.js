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

    console.log('[AdVision API] Synchronisation des modèles Sequelize...');
    await db.sequelize.sync({ alter: true });
    console.log('[AdVision API] Base de données et tables synchronisées !');

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
