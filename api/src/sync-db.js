// ============================================================
// SCRIPT DE SYNCHRONISATION BASE DE DONNEES - ADVISION
// Permet de tester la connexion et de synchroniser
// les 7 entités de la base de données PostgreSQL.
// ============================================================

const db = require('./models');

async function syncDatabase() {
  try {
    console.log('[AdVision DB] Connexion à PostgreSQL en cours...');
    await db.sequelize.authenticate();
    console.log('[AdVision DB] Connexion à PostgreSQL réussie !');

    console.log('[AdVision DB] Synchronisation des tables Sequelize...');
    await db.sequelize.sync({ alter: true });
    console.log('[AdVision DB] Les 7 tables ont été synchronisées avec succès !');

    process.exit(0);
  } catch (error) {
    console.error('[AdVision DB] Erreur lors de la synchronisation :', error);
    process.exit(1);
  }
}

syncDatabase();
