module.exports = (sequelize, Sequelize) => {
    const IcesspoolCommission = sequelize.define('IcesspoolCommission', {
        id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        commission: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            unique: true,
        },
        status: {
            type: Sequelize.INTEGER,
            defaultValue: 1,
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

  
    IcesspoolCommission.sync({force: false});

    return IcesspoolCommission;
};
