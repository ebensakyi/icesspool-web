module.exports = (sequelize, Sequelize) => {
  const TransactionStatus = sequelize.define(
    "TransactionStatus",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      transactionId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      time: {
        type: Sequelize.TIME,
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
  TransactionStatus.associate = (models) => {
    TransactionStatus.belongsTo(models.Transaction, {
      foreignKey: "transactionId",
      //as: 'transaction',
    });
    TransactionStatus.belongsTo(models.Status, {
      foreignKey: "status",
    });
  };
  TransactionStatus.sync({ force: false });

  return TransactionStatus;
};
