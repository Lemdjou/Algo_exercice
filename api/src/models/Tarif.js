// ============================================================
// MODELE SEQUELIZE : Tarif
// ============================================================

module.exports = (sequelize, DataTypes) => {
  const Tarif = sequelize.define('Tarif', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom_forfait: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prix_fcfa: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    duree_jours: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'tarifs',
    timestamps: true
  });

  Tarif.associate = (models) => {
    Tarif.hasMany(models.Campagne, { foreignKey: 'tarif_id', as: 'campagnes' });
  };

  return Tarif;
};
