module.exports = (sequelize, Sequelize) => {
    const bcrypt = require('bcrypt')
    const ScannerUser = sequelize.define('ScannerUser', {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true,
        },
        userId: {
            type: Sequelize.INTEGER
        },
        tipoffPointId: {
            type: Sequelize.INTEGER
        },
        activated: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        deleted: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
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

    ScannerUser.associate = (models) => {
        ScannerUser.belongsTo(models.User, {
            foreignKey: 'userId',
        });
        ScannerUser.belongsTo(models.TipoffPoint, {
            foreignKey: 'tipoffPointId',
        });

    };
    ScannerUser.sync({ force: false });

    return ScannerUser;
};
