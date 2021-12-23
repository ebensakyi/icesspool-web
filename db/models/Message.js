module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define(
    "Message",
    {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },

      type: {
        type: Sequelize.STRING,
      },
      to: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sentBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deleted: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
  Message.associate = (models) => {
    Message.belongsTo(models.User, { foreignKey: "sentBy" });
  };

  Message.sync({ force: false });

  return Message;
};
