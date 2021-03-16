module.exports = (sequelize, Sequelize) => {
    const Closure = sequelize.define('Closure', {
        id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER,
        },
       
        transactionId: {
            type: Sequelize.STRING,
        },
        gpsAccuracy: {
            type: Sequelize.DECIMAL(10, 2),
        },
        lat: {
            type: Sequelize.DECIMAL(10, 8),
        },
        lng: {
            type: Sequelize.DECIMAL(10, 8),
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

    Closure.associate = (models) => {
        Closure.belongsTo(models.User, { foreignKey: 'userId' });
        Closure.belongsTo(models.Transaction, { foreignKey: 'transactionId' });

    };
    Closure.sync({ force: false });

    return Closure;
};
