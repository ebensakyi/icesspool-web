module.exports = (sequelize, Sequelize) => {
    const TellerEarning = sequelize.define('TellerEarning', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        transactionId: {
            type: Sequelize.STRING,
            allowNull: false,
            unique:true
        },
      
        amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        completionDate: {
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
    TellerEarning.associate = (models) => {

        TellerEarning.belongsTo(models.Transaction, { foreignKey: 'transactionId', });

    };
    TellerEarning.sync({ force: false })
    return TellerEarning;
};
