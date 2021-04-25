module.exports = (sequelize, Sequelize) => {
    const IcesspoolBalance = sequelize.define('IcesspoolBalance', {
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

    IcesspoolBalance.sync({ force: false }).then(x => {

    }).catch(e => {
        console.log("IcesspoolBalance ", e)
    })

    return IcesspoolBalance;

};
