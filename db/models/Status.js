module.exports = (sequelize, Sequelize) => {
  const Status = sequelize.define('Status', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    deleted: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    createdAt: {
      type: Sequelize.DATE(3),
    },
    updatedAt: {
      type: Sequelize.DATE(3),
    },
  }, {
    freezeTableName: true
  });


  
  Status.sync({ force: false });

  return Status;

};
