module.exports = (sequelize, Sequelize) => {
    const TellerBalance = sequelize.define('TellerBalance', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
     
        balance: {
            type: Sequelize.DECIMAL(10,2),
            defaultValue: 0
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

    TellerBalance.associate = (models) => {
        // TellerBalance.belongsTo(models.Provider, { foreignKey: 'providerId' });
    }


    TellerBalance.sync({ force: false });

    return TellerBalance;

};
