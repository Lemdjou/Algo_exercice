// ============================================================
// MODELE SEQUELIZE : Campagne
// ============================================================

module.exports = (sequelize, DataTypes) => {
  const Campagne = sequelize.define('Campagne', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom_campagne: {
      type: DataTypes.STRING,
      allowNull: false
    },
    statut: {
      type: DataTypes.ENUM('brouillon', 'en_attente', 'validee', 'refusee', 'active', 'terminee'),
      allowNull: false,
      defaultValue: 'brouillon'
    },
    motif_refus: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    annonceur_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'annonceurs', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    tarif_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'tarifs', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
  }, {
    tableName: 'campagnes',
    timestamps: true
  });

  Campagne.associate = (models) => {
    Campagne.belongsTo(models.Annonceur, { foreignKey: 'annonceur_id', as: 'annonceur' });
    Campagne.belongsTo(models.Tarif, { foreignKey: 'tarif_id', as: 'tarif' });
    Campagne.hasMany(models.Publicite, { foreignKey: 'campagne_id', as: 'publicites' });
  };

  return Campagne;
};
