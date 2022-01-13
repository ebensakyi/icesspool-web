module.exports = (sequelize, Sequelize) => {
<<<<<<< HEAD
    const bcrypt = require('bcryptjs')
=======
    const bcrypt = require('bcrypt')
>>>>>>> 8839d75a1725fc9b4c9ac9a0ed4e043babd22170
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
