// ============================================================
// ROUTES D'AUTHENTIFICATION - ADVISION
// ============================================================

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

// Inscription d'un utilisateur
router.post('/register', authController.register);

// Connexion
router.post('/login', authController.login);

// Récupération du profil (protégé par JWT)
router.get('/me', verifyToken, authController.me);

module.exports = router;
