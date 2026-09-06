// ============================================================
// ARCHITECTURE BACKEND - ADVISION
// Application Express principale.
//
// Ce fichier configure les middlewares globaux (CORS, JSON)
// et monte les routes d'authentification et de santé.
// ============================================================

const express = require('express');
const cors = require('cors');

// Import des routes
const authRoutes = require('./routes/authRoutes');

// Initialisation de l'application Express
const app = express();

// ============================================================
// MIDDLEWARES
// ============================================================

// Activation de CORS pour autoriser les requêtes du frontend Angular
app.use(cors());

// Analyseur de corps de requête au format JSON
app.use(express.json());

// Analyseur de corps de requête au format URL-encoded
app.use(express.urlencoded({ extended: true }));

// ============================================================
// ROUTES
// ============================================================

// Route de santé de l'API (Health Check)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    data: {
      status: 'ok',
      timestamp: new Date().toISOString()
    },
    error: null
  });
});

// Montage des routes d'authentification sous /api/auth
app.use('/api/auth', authRoutes);

module.exports = app;
