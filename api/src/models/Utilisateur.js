// ============================================================
// MODELE SEQUELIZE : Utilisateur
// ============================================================

module.exports = (sequelize, DataTypes) => {
  const Utilisateur = sequelize.define('Utilisateur', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    mot_de_passe: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'annonceur'),
      allowNull: false,
      defaultValue: 'annonceur'
    },
    actif: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'utilisateurs',
    timestamps: true
  });

  Utilisateur.associate = (models) => {
    Utilisateur.hasOne(models.Annonceur, { foreignKey: 'utilisateur_id', as: 'annonceur' });
    Utilisateur.hasMany(models.JournalAction, { foreignKey: 'utilisateur_id', as: 'journaux' });
  };

  return Utilisateur;
};
