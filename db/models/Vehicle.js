module.exports = (sequelize, Sequelize) => {
    const Vehicle = sequelize.define('Vehicle', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
     
        userId: {
            type: Sequelize.INTEGER,
        },
        axleClassificationId: {
            type: Sequelize.INTEGER,
        },
        vehicleNumber: {
            type: Sequelize.STRING,
        },
        owner: {
            type: Sequelize.STRING,
        },
        ownerNumber: {
            type: Sequelize.STRING,
        },
        insuranceExpiry: {
            type: Sequelize.STRING,
        },
        insuranceNumber: {
            type: Sequelize.STRING,
        },
        roadWorthyExpiry: {
            type: Sequelize.STRING,
        },
        roadWorthy: {
            type: Sequelize.STRING,
        },
        tankCapacity: {
            type: Sequelize.INTEGER,
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
    Vehicle.associate = (models) => {
        Vehicle.belongsTo(models.AxleClassification, {
            foreignKey: 'axleClassificationId',
        });

        Vehicle.belongsTo(models.User, {
            foreignKey: 'userId',
            // as: 'user',
        });
    };
    Vehicle.sync({ force: false });

    return Vehicle;
};
