// ============================================================
// MODELE SEQUELIZE : Publicite
// ============================================================

module.exports = (sequelize, DataTypes) => {
  const Publicite = sequelize.define('Publicite', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type_media: {
      type: DataTypes.ENUM('image', 'video'),
      allowNull: false
    },
    url_fichier: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duree_secondes: {
      type: DataTypes.INTEGER,
      defaultValue: 30
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    campagne_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'campagnes', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    tableName: 'publicites',
    timestamps: true
  });

  Publicite.associate = (models) => {
    Publicite.belongsTo(models.Campagne, { foreignKey: 'campagne_id', as: 'campagne' });
    Publicite.hasMany(models.Statistique, { foreignKey: 'publicite_id', as: 'statistiques' });
  };

  return Publicite;
};
