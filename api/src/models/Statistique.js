// ============================================================
// MODELE SEQUELIZE : Statistique
// ============================================================

module.exports = (sequelize, DataTypes) => {
  const Statistique = sequelize.define('Statistique', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_impressions: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    nombre_clics: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    publicite_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'publicites', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'statistiques',
    timestamps: true
  });

  Statistique.associate = (models) => {
    Statistique.belongsTo(models.Publicite, { foreignKey: 'publicite_id', as: 'publicite' });
  };

  return Statistique;
};
