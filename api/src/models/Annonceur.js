// ============================================================
// MODELE SEQUELIZE : Annonceur
// ============================================================

module.exports = (sequelize, DataTypes) => {
  const Annonceur = sequelize.define('Annonceur', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom_entreprise: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: true
    },
    utilisateur_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'utilisateurs', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    tableName: 'annonceurs',
    timestamps: true
  });

  Annonceur.associate = (models) => {
    Annonceur.belongsTo(models.Utilisateur, { foreignKey: 'utilisateur_id', as: 'utilisateur' });
    Annonceur.hasMany(models.Campagne, { foreignKey: 'annonceur_id', as: 'campagnes' });
  };

  return Annonceur;
};
