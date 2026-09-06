// ============================================================
// INITIALISATION DES MODELES SEQUELIZE - ADVISION
// ============================================================

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Chargement explicite des 7 modèles de l'application AdVision
db.Utilisateur = require('./Utilisateur')(sequelize, Sequelize.DataTypes);
db.Annonceur = require('./Annonceur')(sequelize, Sequelize.DataTypes);
db.Tarif = require('./Tarif')(sequelize, Sequelize.DataTypes);
db.Campagne = require('./Campagne')(sequelize, Sequelize.DataTypes);
db.Publicite = require('./Publicite')(sequelize, Sequelize.DataTypes);
db.Statistique = require('./Statistique')(sequelize, Sequelize.DataTypes);
db.JournalAction = require('./JournalAction')(sequelize, Sequelize.DataTypes);

// Initialisation des associations entre les modèles
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
