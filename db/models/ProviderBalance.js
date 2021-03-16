module.exports = (sequelize, Sequelize) => {
    const ProviderBalance = sequelize.define('ProviderBalance', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
       providerId: {
            type: Sequelize.STRING,
            allowNull: false,
            unique:true
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

    ProviderBalance.associate = (models) => {
        ProviderBalance.belongsTo(models.Provider, { foreignKey: 'providerId' });
    }


    ProviderBalance.sync({ force: false });

    return ProviderBalance;

};
