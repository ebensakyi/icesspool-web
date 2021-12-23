module.exports = (sequelize, Sequelize) => {
  const _2fa = sequelize.define(
    "_2fa",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pin: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      email: {
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

  _2fa
    .sync({
      force: false,
    })
    .then(() => {});

  return _2fa;
};
