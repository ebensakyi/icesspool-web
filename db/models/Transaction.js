module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define('Transaction', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        },

        providerId: {
            type: Sequelize.STRING,
        },
        clientId: {
            type: Sequelize.STRING,
        },
        unitCost: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        discountedTotalCost: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        actualTotalCost: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        districtId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        community: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false,
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
        axle: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        trips: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        paymentStatus: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        currentStatus: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        requestTypeId: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        toiletType: {
            type: Sequelize.STRING,
        },
        requestSource: {
            type: Sequelize.INTEGER,

            defaultValue: 1

        },

        fullName: {
            type: Sequelize.STRING,


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
    Transaction.associate = (models) => {
        Transaction.hasMany(models.TransactionStatus);
        Transaction.belongsTo(models.Provider, { foreignKey: 'providerId' });
        Transaction.belongsTo(models.Client, { foreignKey: 'clientId' });
        Transaction.hasOne(models.Rating);
        Transaction.hasOne(models.Payment);
        Transaction.belongsTo(models.AxleClassification,{ foreignKey: 'axle' });

        Transaction.belongsTo(models.District);
        Transaction.belongsTo(models.Status, { foreignKey: 'currentStatus' });

    };

    Transaction.sync({ force: false })
    return Transaction;
};
