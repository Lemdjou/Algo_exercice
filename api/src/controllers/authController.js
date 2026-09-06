// ============================================================
// CONTROLEUR D'AUTHENTIFICATION - ADVISION
// Gestion de l'inscription, de la connexion et du profil utilisateur.
// ============================================================

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Utilisateur, Annonceur } = require('../models');
const { JWT_SECRET } = require('../middleware/auth');

/**
 * Inscription d'un nouvel utilisateur (ou annonceur)
 */
exports.register = async (req, res) => {
  try {
    const { nom, email, mot_de_passe, role, nom_entreprise, telephone, adresse } = req.body;

    // Validation des champs obligatoires
    if (!nom || !email || !mot_de_passe) {
      return res.status(400).json({
        data: null,
        error: 'Le nom, l\'email et le mot de passe sont obligatoires.'
      });
    }

    // Verification de l'existence de l'email
    const utilisateurExistant = await Utilisateur.findOne({ where: { email } });
    if (utilisateurExistant) {
      return res.status(400).json({
        data: null,
        error: 'Un compte existe déjà avec cette adresse email.'
      });
    }

    // Hachage du mot de passe avec bcrypt
    const sel = await bcrypt.genSalt(10);
    const motDePasseHache = await bcrypt.hash(mot_de_passe, sel);

    // Attribution du role (annonceur par defaut si non precise)
    const roleAttribue = (role === 'admin') ? 'admin' : 'annonceur';

    // Creation de l'utilisateur
    const nouvelUtilisateur = await Utilisateur.create({
      nom,
      email,
      mot_de_passe: motDePasseHache,
      role: roleAttribue,
      actif: true
    });

    // Si le role est annonceur, creation de la fiche Annonceur liee
    if (roleAttribue === 'annonceur') {
      await Annonceur.create({
        nom_entreprise: nom_entreprise || nom,
        telephone: telephone || null,
        adresse: adresse || null,
        utilisateur_id: nouvelUtilisateur.id
      });
    }

    // Generation du token JWT
    const token = jwt.sign(
      { id: nouvelUtilisateur.id, email: nouvelUtilisateur.email, role: nouvelUtilisateur.role },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    return res.status(201).json({
      data: {
        message: 'Compte créé avec succès.',
        utilisateur: {
          id: nouvelUtilisateur.id,
          nom: nouvelUtilisateur.nom,
          email: nouvelUtilisateur.email,
          role: nouvelUtilisateur.role
        },
        token
      },
      error: null
    });
  } catch (error) {
    console.error('[Auth Register Error] :', error);
    return res.status(500).json({
      data: null,
      error: 'Erreur lors de la création du compte.'
    });
  }
};

/**
 * Connexion d'un utilisateur existant
 */
exports.login = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    if (!email || !mot_de_passe) {
      return res.status(400).json({
        data: null,
        error: 'L\'email et le mot de passe sont obligatoires.'
      });
    }

    // Recherche de l'utilisateur
    const utilisateur = await Utilisateur.findOne({ where: { email } });
    if (!utilisateur) {
      return res.status(401).json({
        data: null,
        error: 'Identifiants de connexion invalides.'
      });
    }

    // Verification du mot de passe avec bcrypt
    const motDePasseValide = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
    if (!motDePasseValide) {
      return res.status(401).json({
        data: null,
        error: 'Identifiants de connexion invalides.'
      });
    }

    // Verification de l'état actif du compte
    if (!utilisateur.actif) {
      return res.status(403).json({
        data: null,
        error: 'Ce compte a été désactivé par l\'administrateur.'
      });
    }

    // Generation du token JWT
    const token = jwt.sign(
      { id: utilisateur.id, email: utilisateur.email, role: utilisateur.role },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    return res.status(200).json({
      data: {
        message: 'Connexion réussie.',
        utilisateur: {
          id: utilisateur.id,
          nom: utilisateur.nom,
          email: utilisateur.email,
          role: utilisateur.role
        },
        token
      },
      error: null
    });
  } catch (error) {
    console.error('[Auth Login Error] :', error);
    return res.status(500).json({
      data: null,
      error: 'Erreur lors de la connexion.'
    });
  }
};

/**
 * Récupération du profil de l'utilisateur connecté
 */
exports.me = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.user.id, {
      attributes: { exclude: ['mot_de_passe'] },
      include: [{ model: Annonceur, as: 'annonceur' }]
    });

    if (!utilisateur) {
      return res.status(404).json({
        data: null,
        error: 'Utilisateur introuvable.'
      });
    }

    return res.status(200).json({
      data: { utilisateur },
      error: null
    });
  } catch (error) {
    console.error('[Auth Me Error] :', error);
    return res.status(500).json({
      data: null,
      error: 'Erreur lors de la récupération du profil.'
    });
  }
};
