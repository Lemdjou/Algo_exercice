// ============================================================
// MODELE SEQUELIZE : JournalAction
// ============================================================

module.exports = (sequelize, DataTypes) => {
  const JournalAction = sequelize.define('JournalAction', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    adresse_ip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    utilisateur_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'utilisateurs', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
  }, {
    tableName: 'journaux_actions',
    timestamps: true
  });

  JournalAction.associate = (models) => {
    JournalAction.belongsTo(models.Utilisateur, { foreignKey: 'utilisateur_id', as: 'utilisateur' });
  };

  return JournalAction;
};
