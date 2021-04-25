module.exports = (sequelize, Sequelize) => {
    const ProviderRating = sequelize.define('ProviderRating', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        providerId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        rating: {
            type: Sequelize.DECIMAL(2, 1),
            defaultValue: 0.0
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
    ProviderRating.associate = (models) => { ProviderRating.belongsTo(models.Provider, { foreignKey: 'providerId' }) }

    ProviderRating.sync({ force: false }).catch(error => {
        console.log(error)
    })

    return ProviderRating;
};
