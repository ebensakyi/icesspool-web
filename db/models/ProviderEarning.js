module.exports = (sequelize, Sequelize) => {
    const ProviderEarning = sequelize.define('ProviderEarning', {
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
        providerId: {
            type: Sequelize.STRING,
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
    ProviderEarning.associate = (models) => {

        ProviderEarning.belongsTo(models.Transaction, { foreignKey: 'transactionId', });
        ProviderEarning.belongsTo(models.Provider, { foreignKey: 'providerId', });

    };
    ProviderEarning.sync({ force: false })
    return ProviderEarning;
};
