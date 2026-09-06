// ============================================================
// MIDDLEWARE D'AUTHENTIFICATION - ADVISION
// Vérification des tokens JWT et contrôle des rôles utilisateurs.
// ============================================================

const jwt = require('jsonwebtoken');
const { Utilisateur } = require('../models');

// Cle secrete JWT lue depuis le fichier .env
const JWT_SECRET = process.env.JWT_SECRET || 'advision_jwt_secret_key_change_in_production';

/**
 * Middleware pour verifier la presence et la validite du token JWT
 */
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        data: null,
        error: 'Accès refusé. Aucun token d\'authentification fourni.'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    // Verification que l'utilisateur existe toujours et est actif
    const utilisateur = await Utilisateur.findByPk(decoded.id);
    if (!utilisateur || !utilisateur.actif) {
      return res.status(401).json({
        data: null,
        error: 'Utilisateur introuvable ou compte désactivé.'
      });
    }

    // Attachement de l'utilisateur a la requete
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      data: null,
      error: 'Token invalide ou expiré.'
    });
  }
};

/**
 * Middleware pour verifier si l'utilisateur possede le role requis
 * @param  {...string} roles - Liste des roles autorises ('admin', 'annonceur')
 */
const checkRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        data: null,
        error: 'Accès interdit. Droits insuffisants pour effectuer cette action.'
      });
    }
    next();
  };
};

module.exports = {
  verifyToken,
  checkRole,
  JWT_SECRET
};
