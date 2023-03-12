module.exports = (sequelize, Sequelize) => {
    const TamaleBalance = sequelize.define('TamaleBalance', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        balance: {
            type: Sequelize.DECIMAL(10, 2),
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

    TamaleBalance.sync({ force: false }).then(x => {

    }).catch(e => {
        console.log("TamaleBalance ", e)
    })

    return TamaleBalance;

};
