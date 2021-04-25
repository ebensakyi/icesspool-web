module.exports = (sequelize, Sequelize) => {
  const UserType = sequelize.define('UserType', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    deleted: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    createdAt: {
      type: Sequelize.DATE(3)
    },
    updatedAt: {
      type: Sequelize.DATE(3)
    },
  }, {
    freezeTableName: true
  });

  UserType.sync({ force: false });

  return UserType;
};
