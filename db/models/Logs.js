module.exports = (sequelize, Sequelize) => {
  const Logs = sequelize.define(
    "Logs",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      activity: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE(3),
      },
      updatedAt: {
        type: Sequelize.DATE(3),
      },
    },

    {
      freezeTableName: true,
    }
  );

  Logs.associate = (models) => {
    Logs.belongsTo(models.User, { foreignKey: "userId" });
  };

  Logs.sync({
    force: false,
  }).then(() => {});

  return Logs;
};
