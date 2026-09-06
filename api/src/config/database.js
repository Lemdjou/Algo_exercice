// ============================================================
// CONFIGURATION BASE DE DONNEES POSTGRESQL - SEQUELIZE
// ============================================================

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

module.exports = {
  development: {
    username: process.env.POSTGRES_USER || 'advision_user',
    password: process.env.POSTGRES_PASSWORD || 'advision_password_secret',
    database: process.env.POSTGRES_DB || 'advision_db',
    host: process.env.POSTGRES_HOST || 'postgres',
    port: process.env.POSTGRES_PORT || 5432,
    dialect: 'postgres',
    logging: console.log
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    logging: false
  }
};
